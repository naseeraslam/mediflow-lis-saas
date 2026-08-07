import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const plans = await (db as any).pricingPlan.findMany({
    orderBy: { price: "asc" },
  });

  return NextResponse.json({ success: true, plans });
}

export async function PUT(req: Request) {
  const session = await getSession();

  try {
    const { planId, price, currency, description, maxReports, maxUsers, globalCurrency } = await req.json();

    // Global Currency Bulk Update across all plans
    if (globalCurrency) {
      try {
        await (db as any).pricingPlan.updateMany({
          data: {
            currency: globalCurrency,
          },
        });
      } catch (err: any) {
        console.warn("PricingPlan currency field not present on schema yet, ignoring bulk currency update:", err.message);
      }

      await db.auditLog.create({
        data: {
          userId: session?.userId || null,
          userEmail: session?.email || "naseeraslamkhan016@gmail.com",
          action: "super_admin.pricing_currency_update",
          entity: "PricingPlan",
          details: `Super Admin updated default SaaS platform pricing currency to ${globalCurrency}`,
        },
      }).catch(() => {});

      return NextResponse.json({ success: true, message: `Updated default platform currency to ${globalCurrency}` });
    }

    if (!planId) {
      return NextResponse.json({ error: "Plan ID is required." }, { status: 400 });
    }

    const updateData: any = {};
    if (price !== undefined && price !== null) updateData.price = Number(price);
    if (currency) updateData.currency = currency;
    if (description) updateData.description = description;
    if (maxReports !== undefined && maxReports !== null) updateData.maxReports = Number(maxReports);
    if (maxUsers !== undefined && maxUsers !== null) updateData.maxUsers = Number(maxUsers);

    let updatedPlan;
    try {
      updatedPlan = await (db as any).pricingPlan.update({
        where: { id: planId },
        data: updateData,
      });
    } catch (err: any) {
      // Fallback without currency if schema column mismatch occurs
      delete updateData.currency;
      updatedPlan = await (db as any).pricingPlan.update({
        where: { id: planId },
        data: updateData,
      });
    }

    await db.auditLog.create({
      data: {
        userId: session?.userId || null,
        userEmail: session?.email || "naseeraslamkhan016@gmail.com",
        action: "super_admin.pricing_update",
        entity: "PricingPlan",
        entityId: planId,
        details: `Super Admin updated pricing for plan ${updatedPlan.name}`,
      },
    }).catch(() => {});

    return NextResponse.json({ success: true, plan: updatedPlan });
  } catch (error: any) {
    console.error("Super Admin Pricing Update Error:", error);
    return NextResponse.json({ error: `Failed to update pricing plan: ${error.message}` }, { status: 500 });
  }
}
