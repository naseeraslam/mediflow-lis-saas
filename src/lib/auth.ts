import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";

const JWT_SECRET = process.env.SESSION_SECRET || "mediflow-super-secret-key-32-chars-minimum";

export interface UserSession {
  userId: string;
  email: string;
  name: string;
  role: "OrgOwner" | "Admin" | "Pathologist" | "Technician" | "Receptionist" | "Doctor" | "Patient";
  orgId: string;
  orgSlug: string;
  orgName: string;
  permissions: string[];
}

export async function createSessionCookie(payload: UserSession) {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
  const cookieStore = await cookies();
  cookieStore.set("mediflow_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
}

export async function getSession(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("mediflow_session")?.value;
    if (!token) return null;
    const decoded = jwt.verify(token, JWT_SECRET) as UserSession;
    return decoded;
  } catch {
    return null;
  }
}

export async function getCurrentOrgId(): Promise<string> {
  const session = await getSession();
  if (session?.orgId) {
    return session.orgId;
  }

  // Demo fallback when exploring default demo workspace
  const demoOrg = await db.organization.findFirst({
    where: { slug: "demo-diagnostics" },
  });
  return demoOrg?.id || "";
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("mediflow_session");
}

export function hasPermission(session: UserSession | null, permission: string): boolean {
  if (!session) return false;
  if (session.role === "OrgOwner" || session.role === "Admin") return true;
  return session.permissions.includes(permission);
}
