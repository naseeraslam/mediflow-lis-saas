import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const categories = await db.testCategory.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json({ categories });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, description } = await req.json();

    if (!name || name.trim() === "") {
      return NextResponse.json({ error: "Department / Category name is required." }, { status: 400 });
    }

    const trimmedName = name.trim();

    const existing = await db.testCategory.findFirst({
      where: { name: trimmedName },
    });

    if (existing) {
      return NextResponse.json({ success: true, category: existing });
    }

    const category = await db.testCategory.create({
      data: {
        name: trimmedName,
        description: description || `${trimmedName} Clinical Diagnostic Department`,
      },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        orgId: session.orgId,
        userId: session.userId,
        userEmail: session.email,
        action: "category.create",
        entity: "TestCategory",
        entityId: category.id,
        details: `Created new department/category ${category.name}`,
      },
    });

    return NextResponse.json({ success: true, category });
  } catch (error: any) {
    console.error("Create Department Error:", error);
    return NextResponse.json({ error: "Failed to create department." }, { status: 500 });
  }
}
