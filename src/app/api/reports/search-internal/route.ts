import { NextResponse } from "next/server";
import { getSession, getCurrentOrgId } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "UNAUTHORIZED: Internal search requires active staff session." }, { status: 401 });
  }

  const orgId = await getCurrentOrgId();

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() || "";

  if (!q) {
    return NextResponse.json({ patients: [], reports: [] });
  }

  // 1. Search Patients STRICTLY isolated to session's orgId
  const patients = await db.patient.findMany({
    where: {
      orgId,
      OR: [
        { phone: { contains: q } },
        { cnic: { contains: q } },
        { mrn: { contains: q } },
        { fullName: { contains: q } },
        { email: { contains: q } },
      ],
    },
    include: {
      reports: {
        select: {
          id: true,
          reportNumber: true,
          status: true,
          createdAt: true,
        },
      },
    },
    take: 15,
  });

  // 2. Search Diagnostic Reports STRICTLY isolated to session's orgId
  const reports = await db.report.findMany({
    where: {
      orgId,
      OR: [
        { reportNumber: { contains: q } },
        { verificationToken: { contains: q } },
        { patient: { phone: { contains: q } } },
        { patient: { cnic: { contains: q } } },
        { patient: { mrn: { contains: q } } },
        { patient: { fullName: { contains: q } } },
      ],
    },
    include: {
      patient: true,
      branch: true,
      results: true,
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  // Audit Log
  await db.auditLog.create({
    data: {
      orgId,
      userId: session.userId,
      userEmail: session.email,
      action: "report.search_internal",
      entity: "Report",
      details: `Executed internal organization search for query '${q}'`,
    },
  });

  return NextResponse.json({
    success: true,
    query: q,
    patients,
    reports,
  });
}
