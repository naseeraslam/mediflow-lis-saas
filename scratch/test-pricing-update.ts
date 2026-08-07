import { db } from "../src/lib/db";

async function testUpdate() {
  console.log("Testing PricingPlan update...");
  const plan = await (db as any).pricingPlan.findFirst();
  console.log("Found Plan:", plan?.name, plan?.id);

  if (plan) {
    const updated = await (db as any).pricingPlan.update({
      where: { id: plan.id },
      data: {
        price: 99,
      },
    });
    console.log("✅ Successfully updated pricing plan:", updated.name, updated.price);
  }
}

testUpdate();
