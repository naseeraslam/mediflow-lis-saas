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

export async function PUT(req: Request) {
  const session = await getSession();
  const orgSlug = session?.orgSlug || "demo-diagnostics";

  const org = await db.organization.findFirst({
    where: { slug: orgSlug },
  });

  if (!org) {
    return NextResponse.json({ error: "Organization not found." }, { status: 404 });
  }

  try {
    const { id, fullName, dateOfBirth, gender, phone, email, address, mrn } = await req.json();

    if (!id || !fullName || !gender || !phone) {
      return NextResponse.json({ error: "Patient ID, Full Name, Gender, and Phone Number are required." }, { status: 400 });
    }

    const patient = await db.patient.update({
      where: { id, orgId: org.id },
      data: {
        fullName,
        dateOfBirth: dateOfBirth || "1990-01-01",
        gender,
        phone,
        email: email || null,
        address: address || null,
        mrn: mrn || undefined,
      },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        orgId: org.id,
        userId: session?.userId || null,
        userEmail: session?.email || "Reception Desk",
        action: "patient.update",
        entity: "Patient",
        entityId: patient.id,
        details: `Updated details for patient ${patient.fullName} (${patient.mrn})`,
      },
    });

    return NextResponse.json({ success: true, patient });
  } catch (error: any) {
    console.error("Update Patient Error:", error);
    return NextResponse.json({ error: "Failed to update patient details." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getSession();
  const orgSlug = session?.orgSlug || "demo-diagnostics";

  const org = await db.organization.findFirst({
    where: { slug: orgSlug },
  });

  if (!org) {
    return NextResponse.json({ error: "Organization not found." }, { status: 404 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Patient ID is required." }, { status: 400 });
    }

    const patient = await db.patient.delete({
      where: { id, orgId: org.id },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        orgId: org.id,
        userId: session?.userId || null,
        userEmail: session?.email || "Reception Desk",
        action: "patient.delete",
        entity: "Patient",
        entityId: id,
        details: `Deleted patient record ${patient.fullName} (${patient.mrn})`,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete Patient Error:", error);
    return NextResponse.json({ error: "Failed to delete patient record." }, { status: 500 });
  }
}
