import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const session = await getSession();
  const orgSlug = session?.orgSlug || "demo-diagnostics";

  const org = await db.organization.findFirst({
    where: { slug: orgSlug },
  });

  if (!org) {
    return NextResponse.json({ error: "Organization not found." }, { status: 404 });
  }

  try {
    // 1. Fetch all patients in the org with their report counts
    const patients = await db.patient.findMany({
      where: { orgId: org.id },
      include: {
        _count: { select: { reports: true } },
      },
      orderBy: { createdAt: "asc" },
    });

    // 2. Group patients by normalized phone number
    const phoneGroups: Record<string, typeof patients> = {};
    for (const p of patients) {
      if (!p.phone) continue;
      const cleanPhone = p.phone.replace(/[^0-9]/g, "");
      if (!cleanPhone) continue;

      if (!phoneGroups[cleanPhone]) {
        phoneGroups[cleanPhone] = [];
      }
      phoneGroups[cleanPhone].push(p);
    }

    let mergedCount = 0;
    let deletedCount = 0;

    // 3. Merge duplicate groups
    for (const [phone, group] of Object.entries(phoneGroups)) {
      if (group.length <= 1) continue;

      // Primary patient is the one with the most reports, or the first registered
      const sortedGroup = [...group].sort((a, b) => b._count.reports - a._count.reports);
      const primary = sortedGroup[0];
      const duplicates = sortedGroup.slice(1);

      // Find best/fullest name among duplicates
      const bestName = group.reduce((longest, p) => (p.fullName.length > longest.length ? p.fullName : longest), primary.fullName);

      // Update primary patient with best name
      await db.patient.update({
        where: { id: primary.id },
        data: { fullName: bestName },
      });

      for (const dup of duplicates) {
        // Move all reports from duplicate to primary
        await db.report.updateMany({
          where: { patientId: dup.id },
          data: { patientId: primary.id },
        });

        // Delete duplicate patient record
        await db.patient.delete({
          where: { id: dup.id },
        });

        deletedCount++;
      }

      mergedCount++;

      // Audit Log for Patient Merge
      await db.auditLog.create({
        data: {
          orgId: org.id,
          userId: session?.userId || null,
          userEmail: session?.email || "System Admin",
          action: "patient.merge",
          entity: "Patient",
          entityId: primary.id,
          details: `Merged ${duplicates.length} duplicate records for phone ${phone} into primary MRN ${primary.mrn} (${bestName})`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      mergedGroupsCount: mergedCount,
      deletedDuplicatesCount: deletedCount,
      message: mergedCount > 0
        ? `Successfully merged ${deletedCount} duplicate patient records into primary profile!`
        : "No duplicate patient phone numbers found. All records are clean!",
    });
  } catch (error: any) {
    console.error("Merge Patients Error:", error);
    return NextResponse.json({ error: "Failed to merge duplicate patient records." }, { status: 500 });
  }
}
