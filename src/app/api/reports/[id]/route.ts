import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const report = await db.report.findFirst({
    where: {
      id,
      orgId: session.orgId,
    },
    include: {
      patient: true,
      branch: true,
      doctor: true,
      results: {
        include: {
          test: true,
        },
      },
      amendments: {
        orderBy: { changedAt: "desc" },
      },
      organization: {
        select: {
          displayName: true,
          legalName: true,
          primaryColor: true,
          secondaryColor: true,
          logoUrl: true,
          headerText: true,
          footerText: true,
          disclaimerText: true,
          phone: true,
          email: true,
          website: true,
          address: true,
          city: true,
          state: true,
        },
      },
    },
  });

  if (!report) {
    return NextResponse.json({ error: "Report not found or access denied." }, { status: 404 });
  }

  return NextResponse.json({ report });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const { action, status, notes, amendmentReason, results } = body;

    const existingReport = await db.report.findFirst({
      where: { id, orgId: session.orgId },
      include: { results: true },
    });

    if (!existingReport) {
      return NextResponse.json({ error: "Report not found." }, { status: 404 });
    }

    // Action: AUTHORIZE
    if (action === "authorize") {
      const updated = await db.report.update({
        where: { id },
        data: {
          status: "Authorized",
          authorizedAt: new Date(),
          authorizedBy: session.name,
        },
      });

      await db.auditLog.create({
        data: {
          orgId: session.orgId,
          userId: session.userId,
          userEmail: session.email,
          action: "report.authorize",
          entity: "Report",
          entityId: id,
          details: `Authorized report ${existingReport.reportNumber}`,
        },
      });

      return NextResponse.json({ success: true, report: updated });
    }

    // Action: AMEND (If authorized previously)
    if (action === "amend") {
      if (!amendmentReason) {
        return NextResponse.json({ error: "Amendment reason is required for medical compliance." }, { status: 400 });
      }

      const nextVersion = existingReport.version + 1;

      // Log immutable amendment diff
      await db.reportAmendment.create({
        data: {
          reportId: id,
          previousVersion: existingReport.version,
          newVersion: nextVersion,
          reason: amendmentReason,
          changedBy: session.name,
          diffSnapshot: JSON.stringify({
            previousResults: existingReport.results,
            newResults: results,
          }),
        },
      });

      // Update test results
      if (Array.isArray(results)) {
        for (const res of results) {
          if (res.id) {
            await db.testResult.update({
              where: { id: res.id },
              data: {
                numericValue: res.numericValue !== undefined ? Number(res.numericValue) : null,
                stringValue: res.stringValue || null,
                flag: res.flag || "Normal",
                notes: res.notes || null,
              },
            });
          }
        }
      }

      const updated = await db.report.update({
        where: { id },
        data: {
          version: nextVersion,
          status: "Amended",
          notes: notes || existingReport.notes,
        },
      });

      await db.auditLog.create({
        data: {
          orgId: session.orgId,
          userId: session.userId,
          userEmail: session.email,
          action: "report.amend",
          entity: "Report",
          entityId: id,
          details: `Amended report ${existingReport.reportNumber} (v${existingReport.version} -> v${nextVersion}). Reason: ${amendmentReason}`,
        },
      });

      return NextResponse.json({ success: true, report: updated });
    }

    return NextResponse.json({ error: "Invalid action." }, { status: 400 });
  } catch (error: any) {
    console.error("Update Report Error:", error);
    return NextResponse.json({ error: "Failed to update report." }, { status: 500 });
  }
}
