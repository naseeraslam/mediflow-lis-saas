import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PUT(req: Request) {
  const session = await getSession();
  
  // Scoped to session orgId or default demo org
  const orgSlug = session?.orgSlug || "demo-diagnostics";
  const org = await db.organization.findFirst({
    where: { slug: orgSlug },
  });

  if (!org) {
    return NextResponse.json({ error: "Organization not found." }, { status: 404 });
  }

  try {
    const body = await req.json();
    const {
      displayName,
      legalName,
      licenseNo,
      taxId,
      phone,
      whatsappPhone,
      address,
      city,
      currency,
      primaryColor,
      secondaryColor,
      logoUrl,
      headerText,
      footerText,
      disclaimerText,
      founderName,
    } = body;

    const updatedOrg = await db.organization.update({
      where: { id: org.id },
      data: {
        displayName: displayName || org.displayName,
        legalName: legalName || org.legalName,
        licenseNo: licenseNo !== undefined ? licenseNo : org.licenseNo,
        taxId: taxId !== undefined ? taxId : org.taxId,
        phone: phone || org.phone,
        whatsappPhone: whatsappPhone !== undefined ? whatsappPhone : org.whatsappPhone,
        address: address || org.address,
        city: city || org.city,
        currency: currency || org.currency,
        primaryColor: primaryColor || org.primaryColor,
        secondaryColor: secondaryColor || org.secondaryColor,
        logoUrl: logoUrl !== undefined ? logoUrl : org.logoUrl,
        headerText: headerText !== undefined ? headerText : org.headerText,
        footerText: footerText !== undefined ? footerText : org.footerText,
        disclaimerText: disclaimerText !== undefined ? disclaimerText : org.disclaimerText,
        founderName: founderName || org.founderName,
      },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        orgId: org.id,
        userId: session?.userId || null,
        userEmail: session?.email || "Admin",
        action: "org.settings.update",
        entity: "Organization",
        entityId: org.id,
        details: `Updated organization settings for ${updatedOrg.displayName}`,
      },
    });

    return NextResponse.json({ success: true, organization: updatedOrg });
  } catch (error: any) {
    console.error("Update Org Settings Error:", error);
    return NextResponse.json({ error: "Failed to update organization settings." }, { status: 500 });
  }
}
