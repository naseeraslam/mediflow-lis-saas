import { NextResponse } from "next/server";

// Global 2FA Policy Store (In-memory & API setting)
let global2FAEnforced = true;

export async function GET() {
  return NextResponse.json({
    success: true,
    enforced: global2FAEnforced,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (typeof body.enforced === "boolean") {
      global2FAEnforced = body.enforced;
    }
    return NextResponse.json({
      success: true,
      enforced: global2FAEnforced,
      message: global2FAEnforced
        ? "2FA Enforcement is now ENABLED globally."
        : "2FA Enforcement is now DISABLED globally (Direct Password Login Enabled).",
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
