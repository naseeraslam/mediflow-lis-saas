import Link from "next/link";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";
import { HomeHeroClient } from "@/components/public/HomeHeroClient";
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
