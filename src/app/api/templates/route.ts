import { NextResponse } from "next/server";
import { getSession, getCurrentOrgId } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const orgId = await getCurrentOrgId();

  const templates = await db.reportTemplate.findMany({
    where: { orgId },
    include: {
      parameters: { orderBy: { displayOrder: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ templates });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orgId = await getCurrentOrgId();

  try {
    const { name, code, category, description, parameters } = await req.json();

    if (!name || !code || !category || !Array.isArray(parameters) || parameters.length === 0) {
      return NextResponse.json(
        { error: "Template Name, Code, Category, and at least one parameter are required." },
        { status: 400 }
      );
    }

    const uppercaseCode = code.toUpperCase().trim();

    const existing = await db.reportTemplate.findFirst({
      where: { orgId, code: uppercaseCode },
    });

    if (existing) {
      return NextResponse.json(
        { error: `Template code '${uppercaseCode}' already exists.` },
        { status: 400 }
      );
    }

    const template = await db.reportTemplate.create({
      data: {
        orgId,
        name,
        code: uppercaseCode,
        category,
        description: description || null,
        parameters: {
          create: parameters.map((p: any, idx: number) => ({
            parameterName: p.parameterName || p.name,
            code: (p.code || `PARAM-${idx + 1}`).toUpperCase(),
            unit: p.unit || "N/A",
            refRangeMale: p.refRangeMale || p.range || "Normal",
            refRangeFemale: p.refRangeFemale || p.range || "Normal",
            displayOrder: idx + 1,
          })),
        },
      },
      include: {
        parameters: true,
      },
    });

    // Audit Log
    await db.auditLog.create({
      data: {
        orgId,
        userId: session.userId,
        userEmail: session.email,
        action: "template.create",
        entity: "ReportTemplate",
        entityId: template.id,
        details: `Created custom report template ${template.code} (${template.name}) with ${parameters.length} parameters`,
      },
    });

    return NextResponse.json({ success: true, template });
  } catch (error: any) {
    console.error("Create Template Error:", error);
    return NextResponse.json({ error: "Failed to create custom template." }, { status: 500 });
  }
}
