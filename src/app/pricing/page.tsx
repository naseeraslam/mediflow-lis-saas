import { db } from "@/lib/db";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";
import { DynamicPricingCards } from "@/components/pricing/DynamicPricingCards";

export const metadata = {
  title: "SaaS Subscription Pricing & Plans | MediFlow LIS",
  description:
    "Transparent pricing for diagnostic laboratories, hospital networks, and pathology centers. Configured by Super Admin.",
  alternates: {
    canonical: "https://mediflow-saas.com/pricing",
  },
};

export default async function PricingPage() {
  const dbPlans = (db as any).pricingPlan
    ? await (db as any).pricingPlan.findMany({
        orderBy: { price: "asc" },
      })
    : [];

  const defaultCurrency = dbPlans[0]?.currency || "USD";

  const formattedPlans = dbPlans.map((p: any) => {
    let featureList: string[] = [];
    try {
      featureList = JSON.parse(p.features);
    } catch {
      featureList = [p.features];
    }

    return {
      name: p.name,
      priceInUSD: p.price,
      currency: p.currency || "USD",
      billing: p.billing,
      description: p.description,
      features: featureList,
      popular: p.isPopular,
    };
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <PublicNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-xs font-bold text-teal-400 tracking-widest uppercase">Transparent Multi-Currency SaaS Pricing</h1>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight">
            Plans Built for Scaling Clinical Operations
          </h2>
          <p className="text-slate-400 text-base">
            Multi-tenant data isolation, baseline comparisons, and country-wise currency conversion (PKR, INR, USD, GBP, EUR, PHP, AED, SAR) configured by Super Admin.
          </p>
        </div>

        <DynamicPricingCards plans={formattedPlans} defaultCurrency={defaultCurrency} />
      </main>

      <PublicFooter />
    </div>
  );
}
