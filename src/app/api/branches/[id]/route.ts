import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  const { id } = await params;

  try {
    const { name, code, address, phone, email, isMain } = await req.json();

    const branch = await db.branch.findUnique({ where: { id } });
    if (!branch) {
      return NextResponse.json({ error: "Branch not found." }, { status: 404 });
    }

    // If setting as main branch, reset other branches for this org
    if (isMain) {
      await db.branch.updateMany({
        where: { orgId: branch.orgId },
        data: { isMain: false },
      });
    }

    const updatedBranch = await db.branch.update({
      where: { id },
      data: {
        name: name || branch.name,
        code: code ? code.toUpperCase() : branch.code,
        address: address || branch.address,
        phone: phone || branch.phone,
        email: email !== undefined ? email : branch.email,
        isMain: isMain !== undefined ? isMain : branch.isMain,
      },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        orgId: branch.orgId,
        userId: session?.userId || null,
        userEmail: session?.email || "Admin",
        action: "branch.update",
        entity: "Branch",
        entityId: branch.id,
        details: `Updated satellite branch ${updatedBranch.name} (${updatedBranch.code})`,
      },
    });

    return NextResponse.json({ success: true, branch: updatedBranch });
  } catch (error: any) {
    console.error("Update Branch Error:", error);
    return NextResponse.json({ error: "Failed to update branch details." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  const { id } = await params;

  try {
    const branch = await db.branch.findUnique({ where: { id } });
    if (!branch) {
      return NextResponse.json({ error: "Branch not found." }, { status: 404 });
    }

    if (branch.isMain) {
      return NextResponse.json({ error: "Cannot delete the main facility branch." }, { status: 400 });
    }

    await db.branch.delete({ where: { id } });

    // Audit log
    await db.auditLog.create({
      data: {
        orgId: branch.orgId,
        userId: session?.userId || null,
        userEmail: session?.email || "Admin",
        action: "branch.delete",
        entity: "Branch",
        entityId: id,
        details: `Deleted satellite branch ${branch.name} (${branch.code})`,
      },
    });

    return NextResponse.json({ success: true, message: "Branch successfully deleted." });
  } catch (error: any) {
    console.error("Delete Branch Error:", error);
    return NextResponse.json({ error: "Failed to delete branch." }, { status: 500 });
  }
}
