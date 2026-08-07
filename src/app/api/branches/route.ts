import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  const orgSlug = session?.orgSlug || "demo-diagnostics";
  const org = await db.organization.findFirst({ where: { slug: orgSlug } });

  if (!org) return NextResponse.json({ branches: [] });

  const branches = await db.branch.findMany({
    where: { orgId: org.id },
    orderBy: { isMain: "desc" },
  });

  return NextResponse.json({ branches });
}

export async function POST(req: Request) {
  const session = await getSession();
  const orgSlug = session?.orgSlug || "demo-diagnostics";
  const org = await db.organization.findFirst({ where: { slug: orgSlug } });

  if (!org) return NextResponse.json({ error: "Org not found" }, { status: 404 });

  try {
    const { name, code, address, phone, email, isMain } = await req.json();

    if (!name || !code || !address || !phone) {
      return NextResponse.json({ error: "Name, Code, Address, and Phone are required." }, { status: 400 });
    }

    const branch = await db.branch.create({
      data: {
        orgId: org.id,
        name,
        code: code.toUpperCase(),
        address,
        phone,
        email: email || null,
        isMain: isMain || false,
      },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        orgId: org.id,
        userId: session?.userId || null,
        userEmail: session?.email || "Admin",
        action: "branch.create",
        entity: "Branch",
        entityId: branch.id,
        details: `Created satellite branch ${branch.name} (${branch.code})`,
      },
    });

    return NextResponse.json({ success: true, branch });
  } catch (error: any) {
    console.error("Create Branch Error:", error);
    return NextResponse.json({ error: "Failed to create branch." }, { status: 500 });
  }
}
