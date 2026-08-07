import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { reportNumber, phone, verificationCode, mrn } = await req.json();

    // 1. PRIVACY PROTECTION ENFORCEMENT: Searching by raw phone number alone is strictly blocked
    if (!reportNumber && !mrn && !verificationCode) {
      return NextResponse.json(
        {
          error:
            "PRIVACY PROTECTION ENFORCED: Searching by phone number alone is disabled to prevent unauthorized lookup of other patients' results. You must enter your exact Report Number (e.g. LAB-2026-08001) or Verification Token along with your phone number.",
        },
        { status: 403 }
      );
    }

    const codeTerm = (reportNumber || mrn || verificationCode || "").trim();
    const phoneTerm = (phone || "").trim();

    if (codeTerm.length < 3) {
      return NextResponse.json(
        { error: "Please enter a valid Report Number (e.g. LAB-2026-08001) or MRN code." },
        { status: 400 }
      );
    }

    // 2. Strict Dual-Factor Report Lookup
    const reports = await db.report.findMany({
      where: {
        AND: [
          {
            OR: [
              { reportNumber: { equals: codeTerm } },
              { verificationToken: { equals: codeTerm } },
              { patient: { mrn: { equals: codeTerm } } },
            ],
          },
          // If phone is provided, strictly match patient phone
          phoneTerm
            ? {
                patient: {
                  phone: { contains: phoneTerm },
                },
              }
            : {},
        ],
      },
      include: {
        patient: {
          select: {
            fullName: true,
            mrn: true,
            gender: true,
            dateOfBirth: true,
            phone: true,
          },
        },
        organization: {
          select: {
            displayName: true,
            slug: true,
            phone: true,
            email: true,
          },
        },
        branch: {
          select: {
            name: true,
          },
        },
        shares: {
          where: { isRevoked: false },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (reports.length === 0) {
      return NextResponse.json(
        { error: "Access Denied: Report not found or patient phone number does not match this record." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      count: reports.length,
      reports: reports.map((r: any) => ({
        id: r.id,
        reportNumber: r.reportNumber,
        status: r.status,
        date: r.createdAt,
        patientName: r.patient.fullName,
        patientMrn: r.patient.mrn,
        organizationName: r.organization.displayName,
        verificationToken: r.verificationToken,
        activeShareToken: r.shares[0]?.shareToken || null,
      })),
    });
  } catch (error: any) {
    console.error("Patient Search Error:", error);
    return NextResponse.json({ error: "Failed to verify patient report." }, { status: 500 });
  }
}
