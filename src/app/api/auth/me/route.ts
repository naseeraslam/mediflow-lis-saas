import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const organization = await db.organization.findUnique({
    where: { id: session.orgId },
    select: {
      id: true,
      slug: true,
      legalName: true,
      displayName: true,
      type: true,
      primaryColor: true,
      secondaryColor: true,
      logoUrl: true,
      currency: true,
    },
  });

  return NextResponse.json({
    authenticated: true,
    user: session,
    organization,
  });
}
