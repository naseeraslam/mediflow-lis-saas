import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tests = await db.testDefinition.findMany({
    where: { orgId: session.orgId },
    orderBy: { category: "asc" },
  });

  return NextResponse.json({ tests });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const {
      code,
      name,
      category,
      unit,
      method,
      refRangeMale,
      refRangeFemale,
      refRangePed,
      minValue,
      maxValue,
    } = await req.json();

    if (!code || !name || !category || !unit || !refRangeMale || !refRangeFemale) {
      return NextResponse.json(
        { error: "Code, Name, Category, Unit, and Male/Female Reference Ranges are required." },
        { status: 400 }
      );
    }

    const existingTest = await db.testDefinition.findFirst({
      where: { orgId: session.orgId, code: code.toUpperCase() },
    });

    if (existingTest) {
      return NextResponse.json(
        { error: `Test code '${code.toUpperCase()}' already exists in your organization.` },
        { status: 400 }
      );
    }

    const test = await db.testDefinition.create({
      data: {
        orgId: session.orgId,
        code: code.toUpperCase(),
        name,
        category,
        unit,
        method: method || "Automated Analyzer Method",
        refRangeMale,
        refRangeFemale,
        refRangePed: refRangePed || null,
        minValue: minValue !== undefined && minValue !== "" ? Number(minValue) : null,
        maxValue: maxValue !== undefined && maxValue !== "" ? Number(maxValue) : null,
        version: 1,
      },
    });

    // Audit Log
    await db.auditLog.create({
      data: {
        orgId: session.orgId,
        userId: session.userId,
        userEmail: session.email,
        action: "test.create",
        entity: "TestDefinition",
        entityId: test.id,
        details: `Created new catalog test ${test.code} (${test.name})`,
      },
    });

    return NextResponse.json({ success: true, test });
  } catch (error: any) {
    console.error("Test Creation Error:", error);
    return NextResponse.json({ error: "Failed to create test definition." }, { status: 500 });
  }
}
