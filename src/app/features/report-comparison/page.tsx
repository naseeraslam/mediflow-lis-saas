import Link from "next/link";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";
import { getBreadcrumbSchema } from "@/lib/seo";
import { TrendingUp, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Clinical Medical Report Comparison Engine | MediFlow LIS",
  description:
    "Automated historical laboratory test comparison engine. Matches past patient results, normalizes units, calculates absolute & percentage deltas, and flags diagnostic trends.",
  alternates: {
    canonical: "https://mediflow-saas.com/features/report-comparison",
  },
};

export default function FeatureReportComparisonPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Features", item: "/features/report-comparison" },
    { name: "Report Comparison Engine", item: "/features/report-comparison" },
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <PublicNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold">
            <TrendingUp className="w-4 h-4" /> Feature Spotlight
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight leading-tight">
            Deterministic Medical Test Comparison Engine
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Eliminate tedious manual calculation when analyzing longitudinal patient blood work. MediFlow automatically matches baseline and follow-up lab panels, validates measurement unit parity, and renders clear trend indicators.
          </p>
          <div className="pt-4">
            <Link
              href="/app/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal-400 text-slate-950 font-bold text-sm hover:bg-teal-300 transition-colors shadow-lg shadow-teal-500/20"
            >
              <span>Test Live Comparison Engine</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Technical Specs List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-800 pt-16">
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-400" /> Unit Parity & Safety Guardrails
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              If a current report uses `mg/dL` and a baseline report uses `g/L`, MediFlow flags the unit mismatch and suppresses speculative math to guarantee clinical safety.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-400" /> Zero Speculative AI Inferences
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every numerical delta (`Current - Baseline`) is calculated deterministically from verified laboratory source entries. No hallucinated health metrics.
            </p>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
