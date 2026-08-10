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

    const report = await db.report.create({
      data: {
        orgId: session.orgId,
        branchId,
        patientId,
        doctorId: resolvedDoctorId,
        reportNumber,
        status: body.status || "Processing",
        verificationToken,
        notes: notes || null,
        results: {
          create: testResults.map((tr: any) => ({
            testId: tr.testId,
            testNameSnapshot: tr.testName,
            unitSnapshot: tr.unit,
            refRangeSnapshot: tr.refRange,
            numericValue: tr.numericValue !== undefined ? Number(tr.numericValue) : null,
            stringValue: tr.stringValue || null,
            flag: tr.flag || "Normal",
            notes: tr.notes || null,
          })),
        },
      },
      include: {
        patient: true,
        results: true,
      },
    });

    // Audit Log
    await db.auditLog.create({
      data: {
        orgId: session.orgId,
        userId: session.userId,
        userEmail: session.email,
        action: "report.create",
        entity: "Report",
        entityId: report.id,
        details: `Created draft report ${report.reportNumber} for patient ${report.patient.fullName}`,
      },
    });

    return NextResponse.json({ success: true, report });
  } catch (error: any) {
    console.error("Create Report Error:", error);
    return NextResponse.json({ error: "Failed to create report." }, { status: 500 });
  }
}
