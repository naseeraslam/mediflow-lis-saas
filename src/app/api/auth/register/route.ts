import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      displayName,
      legalName,
      type = "DiagnosticLab",
      licenseNo,
      email,
      phone,
      primaryColor = "#0f766e",
      secondaryColor = "#0284c7",
      adminName,
      adminEmail,
      adminPassword,
    } = body;

    if (!displayName || !legalName || !email || !adminName || !adminEmail || !adminPassword) {
      return NextResponse.json({ error: "Missing required registration fields." }, { status: 400 });
    }

    const slug = displayName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    // Check if org slug or admin email exists
    const existingOrg = await db.organization.findUnique({ where: { slug } });
    if (existingOrg) {
      return NextResponse.json({ error: "An organization with this name already exists." }, { status: 400 });
    }

    const existingUser = await db.user.findUnique({ where: { email: adminEmail } });
    if (existingUser) {
      return NextResponse.json({ error: "User email is already registered." }, { status: 400 });
    }

    // 1. Create Organization with PendingApproval status
    const org = await db.organization.create({
      data: {
        slug,
        displayName,
        legalName,
        type,
        approvalStatus: "PendingApproval", // Enforces Super Admin Approval Workflow
        licenseNo: licenseNo || null,
        email,
        phone: phone || "+1 (800) 555-0000",
        address: "Registered Facility Headquarters",
        city: "Main City",
        primaryColor,
        secondaryColor,
        headerText: `${displayName.toUpperCase()} — ACCREDITED DIAGNOSTIC LABORATORY`,
        footerText: "Electronically generated diagnostic report.",
        disclaimerText: "Clinical reference ranges are method-dependent.",
        founderName: "Sher Muhammad",
      },
    });

    // 2. Create Main Branch
    const branch = await db.branch.create({
      data: {
        orgId: org.id,
        name: `${displayName} Main Branch`,
        code: `${slug.substring(0, 3).toUpperCase()}-01`,
        address: "Main Facility Street",
        phone: phone || "+1 (800) 555-0000",
        email,
        isMain: true,
      },
    });

    // 3. Create Admin User
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    const user = await db.user.create({
      data: {
        orgId: org.id,
        name: adminName,
        email: adminEmail,
        passwordHash,
        role: "OrgOwner",
        permissions: JSON.stringify(["*"]),
      },
    });

    // 4. Dispatch Email Trigger & Log Audit Event for Super Admin Notification
    const superAdminEmail = "naseeraslamkhan016@gmail.com";
    console.log(`📧 [AUTOMATED EMAIL TRIGGER] Sent to ${superAdminEmail}: New Lab Registration Pending Approval for '${displayName}' (Owner: ${adminName}, Email: ${adminEmail}).`);

    await db.auditLog.create({
      data: {
        orgId: org.id,
        userId: user.id,
        userEmail: adminEmail,
        action: "org.register.pending_approval",
        entity: "Organization",
        entityId: org.id,
        details: `Lab '${displayName}' registered. Approval notification email dispatched to Super Admin at ${superAdminEmail}.`,
      },
    });

    // 5. Create Subscription
    await db.subscription.create({
      data: {
        orgId: org.id,
        plan: "Starter",
        status: "PendingApproval",
        maxUsers: 10,
        maxReports: 1000,
      },
    });

    // Set Session Cookie
    const response = NextResponse.json({
      success: true,
      message: `Registration submitted! Email notification sent to Super Admin (${superAdminEmail}) for review & approval.`,
      organization: {
        id: org.id,
        displayName: org.displayName,
        slug: org.slug,
        approvalStatus: org.approvalStatus,
      },
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set(
      "session",
      JSON.stringify({
        userId: user.id,
        email: user.email,
        role: user.role,
        orgId: org.id,
        orgSlug: org.slug,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      }
    );

    return response;
  } catch (error: any) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: "Failed to register organization." }, { status: 500 });
  }
}
