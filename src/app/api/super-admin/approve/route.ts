import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { orgId, status } = await req.json(); // status: "Approved" or "Rejected"

    if (!orgId || !["Approved", "Rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid orgId or approval status." }, { status: 400 });
    }

    const updatedOrg = await db.organization.update({
      where: { id: orgId },
      data: { approvalStatus: status },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        orgId: orgId,
        userEmail: "naseeraslamkhan016@gmail.com",
        action: `super_admin.org.${status.toLowerCase()}`,
        entity: "Organization",
        entityId: orgId,
        details: `Super Admin (naseeraslamkhan016@gmail.com) marked lab '${updatedOrg.displayName}' as ${status}`,
      },
    });

    return NextResponse.json({ success: true, organization: updatedOrg });
  } catch (error: any) {
    console.error("Super Admin Approval Error:", error);
    return NextResponse.json({ error: "Failed to update registration approval." }, { status: 500 });
  }
}
