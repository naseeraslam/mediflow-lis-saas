import { db } from "@/lib/db";
import crypto from "crypto";

export type ReportLifecycleStatus =
  | "Sample Collected"
  | "Testing in Progress"
  | "Result Entry Completed"
  | "Pending Authorization"
  | "Authorized"
  | "Published"
  | "Amended";

export interface CreateReportInput {
  orgId: string;
  branchId: string;
  patientId: string;
  doctorId?: string | null;
  status?: string;
  notes?: string;
  tatHours?: number;
  testResults: Array<{
    testId: string;
    testName: string;
    unit: string;
    refRange: string;
    numericValue?: number | null;
    stringValue?: string | null;
    flag?: string;
  }>;
}

export class ReportService {
  /**
   * Create a new laboratory report with estimated TAT completion timestamp
   */
  static async createReport(data: CreateReportInput) {
    const year = new Date().getFullYear();
    const count = await db.report.count({ where: { orgId: data.orgId } });
    const reportNumber = `LAB-${year}-${String(count + 1001).padStart(5, "0")}`;
    const verificationToken = `VERIFY-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;

    const tatHours = data.tatHours || 4;
    const estimatedCompletionAt = new Date();
    estimatedCompletionAt.setHours(estimatedCompletionAt.getHours() + tatHours);

    const status = data.status || "Sample Collected";

    return db.report.create({
      data: {
        orgId: data.orgId,
        branchId: data.branchId,
        patientId: data.patientId,
        doctorId: data.doctorId || null,
        reportNumber,
        status,
        tatHours,
        sampleCollectedAt: new Date(),
        estimatedCompletionAt,
        verificationToken,
        notes: data.notes || null,
        results: {
          create: data.testResults.map((r) => ({
            testId: r.testId,
            testNameSnapshot: r.testName,
            unitSnapshot: r.unit,
            refRangeSnapshot: r.refRange,
            numericValue: r.numericValue !== undefined ? r.numericValue : null,
            stringValue: r.stringValue || null,
            flag: r.flag || "Normal",
          })),
        },
      },
      include: {
        patient: true,
        branch: true,
        doctor: true,
        results: true,
      },
    });
  }

  /**
   * Search for report by reportNumber, verificationToken, MRN or patient phone
   */
  static async findReportByQuery(query: string) {
    const trimmed = query.trim();
    if (!trimmed) return null;

    return db.report.findFirst({
      where: {
        OR: [
          { reportNumber: { equals: trimmed } },
          { verificationToken: { equals: trimmed } },
          { patient: { mrn: { equals: trimmed } } },
          { patient: { phone: { equals: trimmed } } },
        ],
      },
      include: {
        patient: true,
        branch: true,
        doctor: true,
        organization: true,
        results: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }
}
