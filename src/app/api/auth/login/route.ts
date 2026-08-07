import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createSessionCookie } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { email },
      include: { organization: true },
    });

    if (!user || !user.active) {
      return NextResponse.json({ error: "Invalid credentials or account inactive." }, { status: 401 });
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    let permissionsArray: string[] = [];
    try {
      permissionsArray = JSON.parse(user.permissions || "[]");
    } catch {
      permissionsArray = [];
    }

    const sessionPayload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role as any,
      orgId: user.organization.id,
      orgSlug: user.organization.slug,
      orgName: user.organization.displayName,
      permissions: permissionsArray,
    };

    await createSessionCookie(sessionPayload);

    // Audit log
    await db.auditLog.create({
      data: {
        orgId: user.organization.id,
        userId: user.id,
        userEmail: user.email,
        action: "user.login",
        entity: "User",
        entityId: user.id,
        details: `Successful authentication for ${user.email}`,
      },
    });

    return NextResponse.json({ success: true, user: sessionPayload });
  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Authentication failed." }, { status: 500 });
  }
}
