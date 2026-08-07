import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { compareReports } from "@/lib/comparison";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { currentReportId, previousReportId } = await req.json();

    if (!currentReportId || !previousReportId) {
      return NextResponse.json({ error: "Both current and previous report IDs are required." }, { status: 400 });
    }

    const currentReport = await db.report.findFirst({
      where: { id: currentReportId, orgId: session.orgId },
      include: {
        patient: true,
        results: { include: { test: true } },
      },
    });

    const previousReport = await db.report.findFirst({
      where: { id: previousReportId, orgId: session.orgId },
      include: {
        patient: true,
        results: { include: { test: true } },
      },
    });

    if (!currentReport || !previousReport) {
      return NextResponse.json({ error: "One or both reports were not found in your organization." }, { status: 404 });
    }

    if (currentReport.patientId !== previousReport.patientId) {
      return NextResponse.json({ error: "Clinical safety violation: Reports belong to different patients." }, { status: 400 });
    }

    const currentPrepared = currentReport.results.map((r) => ({
      testCode: r.test.code,
      testName: r.testNameSnapshot,
      category: r.test.category,
      unit: r.unitSnapshot,
      numericValue: r.numericValue,
      stringValue: r.stringValue,
      refRange: r.refRangeSnapshot,
      flag: r.flag,
    }));

    const previousPrepared = previousReport.results.map((r) => ({
      testCode: r.test.code,
      testName: r.testNameSnapshot,
      category: r.test.category,
      unit: r.unitSnapshot,
      numericValue: r.numericValue,
      stringValue: r.stringValue,
      refRange: r.refRangeSnapshot,
      flag: r.flag,
    }));

    const comparisonRows = compareReports(currentPrepared, previousPrepared);

    // Log comparison audit
    await db.auditLog.create({
      data: {
        orgId: session.orgId,
        userId: session.userId,
        userEmail: session.email,
        action: "report.compare",
        entity: "Report",
        entityId: currentReport.id,
        details: `Compared report ${currentReport.reportNumber} with baseline ${previousReport.reportNumber}`,
      },
    });

    return NextResponse.json({
      patient: currentReport.patient,
      currentReport: {
        id: currentReport.id,
        reportNumber: currentReport.reportNumber,
        date: currentReport.authorizedAt || currentReport.createdAt,
      },
      previousReport: {
        id: previousReport.id,
        reportNumber: previousReport.reportNumber,
        date: previousReport.authorizedAt || previousReport.createdAt,
      },
      comparison: comparisonRows,
    });
  } catch (error: any) {
    console.error("Comparison Error:", error);
    return NextResponse.json({ error: "Comparison execution failed." }, { status: 500 });
  }
}
