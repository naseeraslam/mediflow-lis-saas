import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import crypto from "crypto";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const patientId = searchParams.get("patientId");
  const status = searchParams.get("status");

  const whereCondition: any = {
    orgId: session.orgId,
  };

  if (patientId) whereCondition.patientId = patientId;
  if (status) whereCondition.status = status;

  const reports = await db.report.findMany({
    where: whereCondition,
    include: {
      patient: true,
      branch: true,
      doctor: true,
      results: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ reports });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { branchId, patientId, doctorId, referringDoctorName, notes, testResults } = body;

    if (!branchId || !patientId || !testResults || !Array.isArray(testResults)) {
      return NextResponse.json({ error: "Branch, Patient, and Test Results are required." }, { status: 400 });
    }

    let resolvedDoctorId = doctorId || null;

    // Handle custom referring doctor name creation if passed
    if (!resolvedDoctorId && referringDoctorName && referringDoctorName.trim() !== "" && referringDoctorName !== "Self / Direct Order") {
      const existingDoc = await db.doctor.findFirst({
        where: { orgId: session.orgId, name: referringDoctorName.trim() },
      });

      if (existingDoc) {
        resolvedDoctorId = existingDoc.id;
      } else {
        const newDoc = await db.doctor.create({
          data: {
            orgId: session.orgId,
            name: referringDoctorName.trim(),
          },
        });
        resolvedDoctorId = newDoc.id;
      }
    }

    const reportCount = await db.report.count({ where: { orgId: session.orgId } });
    const reportNumber = `LAB-${new Date().getFullYear()}-${String(reportCount + 1).padStart(5, "0")}`;
    const verificationToken = `VERIFY-${crypto.randomBytes(6).toString("hex").toUpperCase()}`;

    const tatHours = Number(body.tatHours) || 4;
    let estimatedCompletionAt = body.estimatedCompletionAt ? new Date(body.estimatedCompletionAt) : null;
    if (!estimatedCompletionAt || isNaN(estimatedCompletionAt.getTime())) {
      estimatedCompletionAt = new Date();
      estimatedCompletionAt.setHours(estimatedCompletionAt.getHours() + tatHours);
    }

    // Validate existing TestDefinition IDs in DB to prevent foreign key constraint violations
    const existingTests = (db as any).testDefinition
      ? await (db as any).testDefinition.findMany({
          where: { orgId: session.orgId },
          select: { id: true },
        })
      : [];
    const validTestIds = new Set(existingTests.map((t: any) => t.id));

    const reportPayload: any = {
      orgId: session.orgId,
      branchId,
      patientId,
      doctorId: resolvedDoctorId,
      reportNumber,
      status: body.status || "Sample Collected",
      tatHours,
      sampleCollectedAt: new Date(),
      estimatedCompletionAt,
      verificationToken,
      notes: notes || null,
      results: {
        create: testResults.map((tr: any) => ({
          testId: tr.testId && validTestIds.has(tr.testId) ? tr.testId : null,
          testNameSnapshot: tr.testName || "Diagnostic Parameter",
          unitSnapshot: tr.unit || "",
          refRangeSnapshot: tr.refRange || "",
          numericValue: tr.numericValue !== undefined && tr.numericValue !== "" && tr.numericValue !== null && !isNaN(Number(tr.numericValue)) ? Number(tr.numericValue) : null,
          stringValue: tr.stringValue || null,
          flag: tr.flag || "Normal",
          notes: tr.notes || null,
        })),
      },
    };

    let report;
    try {
      report = await db.report.create({
        data: reportPayload,
        include: {
          patient: true,
          results: true,
        },
      });
    } catch (err: any) {
      if (err.message && err.message.includes("tatHours")) {
        console.warn("Retrying report creation without tatHours argument due to cached Prisma Client instance...");
        delete reportPayload.tatHours;
        report = await db.report.create({
          data: reportPayload,
          include: {
            patient: true,
            results: true,
          },
        });
      } else {
        throw err;
      }
    }

    // Audit Log
    await db.auditLog.create({
      data: {
        orgId: session.orgId,
        userId: session.userId,
        userEmail: session.email,
        action: "report.create",
        entity: "Report",
        entityId: report.id,
        details: `Created report ${report.reportNumber} for patient ${report.patient.fullName}`,
      },
    });

    return NextResponse.json({ success: true, report });
  } catch (error: any) {
    console.error("Create Report Error Details:", error);
    return NextResponse.json({ error: error.message || "Failed to create report due to a database exception." }, { status: 500 });
  }
}
