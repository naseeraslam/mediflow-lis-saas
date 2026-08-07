import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const session = await getSession();
  const orgSlug = session?.orgSlug || "demo-diagnostics";

  const org = await db.organization.findFirst({
    where: { slug: orgSlug },
  });

  if (!org) {
    return NextResponse.json({ error: "Organization not found." }, { status: 404 });
  }

  const patients = await db.patient.findMany({
    where: { orgId: org.id },
    include: {
      reports: { select: { id: true, reportNumber: true, createdAt: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ success: true, patients });
}

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
    const { fullName, dateOfBirth, gender, phone, email, address, mrn } = await req.json();

    if (!fullName || !gender || !phone) {
      return NextResponse.json({ error: "Patient Full Name, Gender, and Phone Number are required." }, { status: 400 });
    }

    // Auto-generate MRN if not provided
    const generatedMrn = mrn || `MRN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const patient = await db.patient.create({
      data: {
        orgId: org.id,
        mrn: generatedMrn,
        fullName,
        dateOfBirth: dateOfBirth || "1990-01-01",
        gender,
        phone,
        email: email || null,
        address: address || null,
      },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        orgId: org.id,
        userId: session?.userId || null,
        userEmail: session?.email || "Reception Desk",
        action: "patient.create",
        entity: "Patient",
        entityId: patient.id,
        details: `Registered new patient ${patient.fullName} (${patient.mrn})`,
      },
    });

    return NextResponse.json({ success: true, patient });
  } catch (error: any) {
    console.error("Register Patient Error:", error);
    return NextResponse.json({ error: "Failed to register new patient." }, { status: 500 });
  }
}
