import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";
import { HomeHeroClient } from "@/components/public/HomeHeroClient";
import { HomeComparisonClient } from "@/components/public/HomeComparisonClient";
import { generatePageMetadata, getOrganizationSchema, getSoftwareAppSchema } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "MediFlow LIS — Multi-Tenant Laboratory SaaS",
  description:
    "Enterprise Multi-Tenant Laboratory Information System (LIS) with baseline test comparison engine, white-label PDF reports & QR-signed verification.",
  path: "",
});

export default function PublicHomePage() {
  const orgSchema = getOrganizationSchema();
  const appSchema = getSoftwareAppSchema();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950">
      {/* Schema.org JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([orgSchema, appSchema]) }}
      />

      <PublicNavbar />

      {/* Hero Section */}
      <HomeHeroClient />

      {/* Feature Showcase: Previous vs Current Comparison Table */}
      <HomeComparisonClient />

      <PublicFooter />
    </div>
  );
}
