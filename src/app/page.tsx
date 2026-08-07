import Link from "next/link";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";
import { DynamicHealthQuotes } from "@/components/public/DynamicHealthQuotes";
import { getOrganizationSchema, getSoftwareAppSchema } from "@/lib/seo";
import {
  Activity,
  ShieldCheck,
  Zap,
  TrendingUp,
  FileCheck2,
  Lock,
  Sparkles,
  ArrowRight,
  Database,
  QrCode,
  CheckCircle2,
  Sliders,
  Building2,
  Users,
  Microscope,
  Dna,
  FlaskConical,
  Award,
} from "lucide-react";

export const metadata = {
  title: "MediFlow LIS — Multi-Tenant Medical Laboratory Reporting & Comparison SaaS",
  description:
    "Enterprise-grade Laboratory Information System (LIS) with multi-tenant architecture, historical baseline test comparison engine, white-label PDF reports, and QR-signed verification.",
  alternates: {
    canonical: "https://mediflow-saas.com",
  },
};

export default function PublicHomePage() {
  const orgSchema = getOrganizationSchema();
  const appSchema = getSoftwareAppSchema();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950">
      {/* Schema.org JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([orgSchema, appSchema]) }}
      />

      <PublicNavbar />

      {/* Hero Section with Vibrant Medical Laboratory Aesthetic */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Glowing Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-teal-500/25 via-emerald-500/20 to-sky-500/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-teal-500/40 text-xs font-bold text-teal-300 shadow-2xl shadow-teal-500/20">
            <Microscope className="w-4 h-4 text-teal-400 animate-pulse" />
            <span>Next-Gen ISO 15189 Multi-Tenant Medical Laboratory Information System (LIS)</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-100 max-w-5xl mx-auto leading-[1.1]">
            Multi-Tenant Clinical Reporting &{" "}
            <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-sky-300 bg-clip-text text-transparent">
              Baseline Diagnostic Comparison
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Empower diagnostic laboratories, pathology networks, and hospital health systems with isolated white-label reporting, immutable report amendments, WHO & Urology test batteries, and automated analyte trend analysis.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/app/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400 hover:from-teal-300 hover:to-sky-300 text-slate-950 font-extrabold text-base shadow-2xl shadow-teal-500/30 hover:shadow-teal-500/50 transition-all flex items-center justify-center gap-3 group"
            >
              <Dna className="w-5 h-5 stroke-[2.5]" />
              <span>Explore Private SaaS Workspace</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/features/report-comparison"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-base transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <TrendingUp className="w-5 h-5 text-teal-400" />
              <span>See Comparison Engine</span>
            </Link>
          </div>

          {/* Key Metrics Ribbon */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/30 backdrop-blur-md shadow-xl">
              <div className="text-3xl font-black text-teal-400 flex items-center gap-2">
                <Database className="w-6 h-6 text-teal-400" /> 100%
              </div>
              <div className="text-xs font-bold text-slate-200 mt-1.5">Tenant Data Isolation</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Enforced at Database Query Layer</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-sky-500/30 backdrop-blur-md shadow-xl">
              <div className="text-3xl font-black text-sky-400 flex items-center gap-2">
                <FlaskConical className="w-6 h-6 text-sky-400" /> WHO Standard
              </div>
              <div className="text-xs font-bold text-slate-200 mt-1.5">Accredited Catalog</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Urology, Hematology & Genetics</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/30 backdrop-blur-md shadow-xl">
              <div className="text-3xl font-black text-emerald-400 flex items-center gap-2">
                <FileCheck2 className="w-6 h-6 text-emerald-400" /> v1 → v2
              </div>
              <div className="text-xs font-bold text-slate-200 mt-1.5">Immutable Amendments</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Full Audit Rationale History</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-purple-500/30 backdrop-blur-md shadow-xl">
              <div className="text-3xl font-black text-purple-400 flex items-center gap-2">
                <QrCode className="w-6 h-6 text-purple-400" /> QR Signed
              </div>
              <div className="text-xs font-bold text-slate-200 mt-1.5">Report Verification</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Cryptographic Public Check</div>
            </div>
          </div>

          {/* DYNAMIC HEALTH & CLINICAL WISDOM QUOTES BANNER */}
          <div className="pt-8 max-w-4xl mx-auto">
            <DynamicHealthQuotes />
          </div>
        </div>
      </section>

      {/* Feature Showcase: Previous vs Current Comparison */}
      <section className="py-24 bg-slate-900/60 border-y border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs font-bold text-teal-400 tracking-widest uppercase">Core Diagnostic Innovation</h2>
            <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
              Automated Baseline vs Current Report Comparison
            </h3>
            <p className="text-slate-400 text-base">
              Eliminate manual tracking. MediFlow matches historical patient laboratory results across previous diagnostic visits, calculates absolute and percentage deltas, and validates unit consistency.
            </p>
          </div>

          {/* Interactive Mock Table */}
          <div className="bg-slate-950 rounded-2xl border border-teal-500/30 p-6 shadow-2xl overflow-x-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-teal-500" />
                <span className="font-mono text-slate-400 ml-2">Patient: Alexander Wright (MRN-2026-8801)</span>
              </div>
              <div className="text-slate-400">Comparing <span className="text-slate-200 font-bold">LAB-2026-01045</span> vs <span className="text-teal-400 font-bold">LAB-2026-08001</span></div>
            </div>

            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Diagnostic Test</th>
                  <th className="py-3 px-4">Jan 2026 Baseline</th>
                  <th className="py-3 px-4">Aug 2026 Current</th>
                  <th className="py-3 px-4">Unit</th>
                  <th className="py-3 px-4">Reference Range</th>
                  <th className="py-3 px-4">Absolute Delta</th>
                  <th className="py-3 px-4">% Change</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-4 font-sans font-semibold text-slate-200">Y-Chromosome Microdeletion (AZFc)</td>
                  <td className="py-3.5 px-4 text-slate-400">Normal</td>
                  <td className="py-3.5 px-4 font-bold text-teal-300">No Deletion Detected</td>
                  <td className="py-3.5 px-4 text-slate-400">PCR</td>
                  <td className="py-3.5 px-4 text-slate-400">No Deletion</td>
                  <td className="py-3.5 px-4 text-slate-300">0.00</td>
                  <td className="py-3.5 px-4 text-slate-300">0.0%</td>
                  <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">Normal ↔</span></td>
                </tr>

                <tr className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-4 font-sans font-semibold text-slate-200">White Blood Cells (WBC)</td>
                  <td className="py-3.5 px-4 text-slate-400">6.8</td>
                  <td className="py-3.5 px-4 font-bold text-amber-400">11.8 ↑</td>
                  <td className="py-3.5 px-4 text-slate-400">x10^3/uL</td>
                  <td className="py-3.5 px-4 text-slate-400">4.5 - 11.0</td>
                  <td className="py-3.5 px-4 text-amber-400 font-bold">+5.00</td>
                  <td className="py-3.5 px-4 text-amber-400 font-bold">+73.5%</td>
                  <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">Elevated ↑</span></td>
                </tr>

                <tr className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-4 font-sans font-semibold text-slate-200">Hemoglobin (HGB)</td>
                  <td className="py-3.5 px-4 text-slate-400">15.2</td>
                  <td className="py-3.5 px-4 font-bold text-teal-300">14.8</td>
                  <td className="py-3.5 px-4 text-slate-400">g/dL</td>
                  <td className="py-3.5 px-4 text-slate-400">13.8 - 17.2</td>
                  <td className="py-3.5 px-4 text-slate-300">-0.40</td>
                  <td className="py-3.5 px-4 text-slate-300">-2.6%</td>
                  <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">Stable ↔</span></td>
                </tr>

                <tr className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-4 font-sans font-semibold text-slate-200">Fasting Blood Glucose</td>
                  <td className="py-3.5 px-4 text-slate-400">92.0</td>
                  <td className="py-3.5 px-4 font-bold text-amber-400">115.0 ↑</td>
                  <td className="py-3.5 px-4 text-slate-400">mg/dL</td>
                  <td className="py-3.5 px-4 text-slate-400">70 - 99</td>
                  <td className="py-3.5 px-4 text-amber-400 font-bold">+23.00</td>
                  <td className="py-3.5 px-4 text-amber-400 font-bold">+25.0%</td>
                  <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">Elevated ↑</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Multi-Tenant SaaS Architectural Pillars */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-bold text-teal-400 tracking-widest uppercase">Multi-Tenant Architecture</h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            Engineered for Thousands of Independent Healthcare Tenants
          </h3>
          <p className="text-slate-400 text-base">
            Every organization operates in complete isolation with custom branding, reference ranges, user permissions, and report headers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-teal-500/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-100">Row-Level Tenant Isolation</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Data scoping is enforced strictly on backend database queries. Zero chance of cross-tenant patient record leakage.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-teal-500/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Sliders className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-100">White-Label Branding Engine</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Configure legal facility name, logo, custom header/footer disclaimers, accent colors, and custom report templates for every branch.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-teal-500/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <QrCode className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-100">QR Code Authenticity Token</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every finalized PDF features a cryptographic QR token leading to an authentic verification landing page without exposing full PHI publicly.
            </p>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
