import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { createReportShareLink, revokeReportShareLink } from "@/lib/sharing";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  const { id } = await params;

  try {
    const { durationHours = 168, pin } = await req.json();

    const report = await db.report.findFirst({
      where: { id },
      include: { organization: true },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found." }, { status: 404 });
    }

    const shareResult = await createReportShareLink({
      reportId: id,
      durationHours: Number(durationHours),
      pin,
    });

    // Log audit event
    await db.auditLog.create({
      data: {
        orgId: report.orgId,
        userId: session?.userId || null,
        userEmail: session?.email || "Patient Portal",
        action: "report.share",
        entity: "ReportShare",
        entityId: report.id,
        details: `Created secure share link for report ${report.reportNumber} (Expires in ${durationHours} hours)`,
      },
    });

    return NextResponse.json({ success: true, share: shareResult });
  } catch (error: any) {
    console.error("Create Share Error:", error);
    return NextResponse.json({ error: "Failed to generate share link." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { shareToken } = await req.json();
    if (!shareToken) {
      return NextResponse.json({ error: "Share token is required." }, { status: 400 });
    }

    await revokeReportShareLink(shareToken);

    return NextResponse.json({ success: true, message: "Share link successfully revoked." });
  } catch (error: any) {
    console.error("Revoke Share Error:", error);
    return NextResponse.json({ error: "Failed to revoke share link." }, { status: 500 });
  }
}
