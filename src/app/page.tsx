import Link from "next/link";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";
import { DynamicHealthQuotes } from "@/components/public/DynamicHealthQuotes";
import { generatePageMetadata, getOrganizationSchema, getSoftwareAppSchema } from "@/lib/seo";
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
  Stethoscope,
  HeartPulse,
} from "lucide-react";

export const metadata = generatePageMetadata({
  title: "MediFlow LIS — Multi-Tenant Laboratory Reporting SaaS",
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

      {/* Hero Section with Extraordinary Medical Laboratory Micro-Animations */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Floating Glowing Ambient Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[450px] bg-gradient-to-tr from-teal-500/20 via-emerald-500/15 to-sky-500/20 blur-[130px] rounded-full pointer-events-none" />

        {/* Floating Animated Laboratory Icons */}
        <div className="absolute left-[8%] top-32 pointer-events-none hidden xl:block animate-float">
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-teal-500/30 shadow-2xl backdrop-blur-md flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Dna className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100">AZFc Microdeletion</div>
              <div className="text-[10px] text-teal-600 dark:text-teal-400 font-mono font-bold">PCR Multiplex</div>
            </div>
          </div>
        </div>

        <div className="absolute right-[8%] top-44 pointer-events-none hidden xl:block animate-float" style={{ animationDelay: "2s" }}>
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-sky-500/30 shadow-2xl backdrop-blur-md flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <FlaskConical className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100">Seminal Biochemistry</div>
              <div className="text-[10px] text-sky-600 dark:text-sky-400 font-mono font-bold">WHO 6th Ed. Compliant</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-sky-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30 text-xs font-extrabold shadow-sm animate-pulse-glow">
              <Sparkles className="w-4 h-4 text-teal-500" /> Next-Gen ISO 15189 Multi-Tenant Medical Laboratory Information System (LIS)
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white">
              Multi-Tenant Clinical Reporting & <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-sky-500 bg-clip-text text-transparent">Baseline Diagnostic Comparison</span>
            </h1>

            <p className="text-slate-700 dark:text-slate-300 text-base sm:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
              Empower diagnostic laboratories, pathology networks, and hospital health systems with isolated white-label reporting, immutable report amendments, WHO & Urology test batteries, and automated analyte trend analysis.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400 text-slate-950 font-black text-sm shadow-xl shadow-teal-500/25 hover:from-teal-300 hover:to-sky-300 transition-all flex items-center justify-center gap-2 group"
              >
                <Activity className="w-5 h-5 fill-slate-950 group-hover:rotate-12 transition-transform" />
                <span>Explore Private SaaS Workspace</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/features/report-comparison"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <TrendingUp className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>See Comparison Engine</span>
              </Link>
            </div>
          </div>

          {/* Key Metrics / Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-16">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-teal-500/30 backdrop-blur-md shadow-xl hover:scale-105 transition-transform">
              <div className="text-3xl font-black text-teal-600 dark:text-teal-400 flex items-center gap-2">
                <Database className="w-6 h-6 text-teal-600 dark:text-teal-400" /> 100%
              </div>
              <div className="text-xs font-extrabold text-slate-900 dark:text-slate-200 mt-1.5">Tenant Data Isolation</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">Enforced at Database Query Layer</div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-sky-500/30 backdrop-blur-md shadow-xl hover:scale-105 transition-transform">
              <div className="text-3xl font-black text-sky-600 dark:text-sky-400 flex items-center gap-2">
                <FlaskConical className="w-6 h-6 text-sky-600 dark:text-sky-400" /> WHO Standard
              </div>
              <div className="text-xs font-extrabold text-slate-900 dark:text-slate-200 mt-1.5">Accredited Catalog</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">Urology, Hematology & Genetics</div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-500/30 backdrop-blur-md shadow-xl hover:scale-105 transition-transform">
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <FileCheck2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" /> v1 → v2
              </div>
              <div className="text-xs font-extrabold text-slate-900 dark:text-slate-200 mt-1.5">Immutable Amendments</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">Full Audit Rationale History</div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-purple-500/30 backdrop-blur-md shadow-xl hover:scale-105 transition-transform">
              <div className="text-3xl font-black text-purple-600 dark:text-purple-400 flex items-center gap-2">
                <QrCode className="w-6 h-6 text-purple-600 dark:text-purple-400" /> QR Signed
              </div>
              <div className="text-xs font-extrabold text-slate-900 dark:text-slate-200 mt-1.5">Report Verification</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">Cryptographic Public Check</div>
            </div>
          </div>

          {/* DYNAMIC HEALTH & CLINICAL WISDOM QUOTES BANNER */}
          <div className="pt-8 max-w-4xl mx-auto">
            <DynamicHealthQuotes />
          </div>
        </div>
      </section>

      {/* Feature Showcase: Previous vs Current Comparison Table */}
      <section className="py-24 bg-slate-100 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs font-black text-teal-600 dark:text-teal-400 tracking-widest uppercase">Core Diagnostic Innovation</h2>
            <h3 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Automated Baseline vs Current Report Comparison
            </h3>
            <p className="text-slate-700 dark:text-slate-400 text-base font-medium">
              Eliminate manual tracking. MediFlow matches historical patient laboratory results across previous diagnostic visits, calculates absolute and percentage deltas, and validates unit consistency.
            </p>
          </div>

          {/* High-Contrast Interactive Mock Table */}
          <div className="bg-white dark:bg-slate-950 rounded-2xl border border-teal-500/30 p-6 shadow-2xl overflow-x-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-teal-500" />
                <span className="font-mono text-slate-700 dark:text-slate-400 ml-2">Patient: Alexander Wright (MRN-2026-8801)</span>
              </div>
              <div className="text-slate-700 dark:text-slate-400">Comparing <span className="text-slate-900 dark:text-slate-200 font-bold">LAB-2026-01045</span> vs <span className="text-teal-600 dark:text-teal-400 font-bold">LAB-2026-08001</span></div>
            </div>

            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="text-slate-600 dark:text-slate-400 font-extrabold uppercase border-b border-slate-200 dark:border-slate-800 text-[10px]">
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
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-4 font-sans font-bold text-slate-900 dark:text-slate-200">White Blood Cells (WBC)</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">6.8</td>
                  <td className="py-3.5 px-4 font-extrabold text-amber-600 dark:text-amber-400">11.8</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">x10^3/uL</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">4.5 - 11.0</td>
                  <td className="py-3.5 px-4 text-amber-600 dark:text-amber-400 font-bold">+5.0</td>
                  <td className="py-3.5 px-4 text-amber-600 dark:text-amber-400 font-bold">+73.5%</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[10px] font-black uppercase font-sans">
                      High Flag
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-4 font-sans font-bold text-slate-900 dark:text-slate-200">Sperm Concentration</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">14.0</td>
                  <td className="py-3.5 px-4 font-extrabold text-teal-600 dark:text-teal-400">22.5</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">M/mL</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">&ge; 16.0</td>
                  <td className="py-3.5 px-4 text-teal-600 dark:text-teal-400 font-bold">+8.5</td>
                  <td className="py-3.5 px-4 text-teal-600 dark:text-teal-400 font-bold">+60.7%</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/20 text-[10px] font-black uppercase font-sans">
                      Improved
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-4 font-sans font-bold text-slate-900 dark:text-slate-200">Hemoglobin (Hb)</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">14.2</td>
                  <td className="py-3.5 px-4 text-slate-900 dark:text-slate-100">14.5</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">g/dL</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">13.5 - 17.5</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">+0.3</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">+2.1%</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20 text-[10px] font-black uppercase font-sans">
                      Stable
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
