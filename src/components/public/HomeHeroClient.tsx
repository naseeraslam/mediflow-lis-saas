"use client";

import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageToggle";
import { DynamicHealthQuotes } from "@/components/public/DynamicHealthQuotes";
import {
  Activity,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Database,
  FlaskConical,
  FileCheck2,
  QrCode,
  Dna,
} from "lucide-react";

export function HomeHeroClient() {
  const { t } = useLanguage();

  return (
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
            <Sparkles className="w-4 h-4 text-teal-500" /> {t("heroBadge")}
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white">
            {t("homeTitle1")}<span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-sky-500 bg-clip-text text-transparent">{t("homeTitle2")}</span>
          </h1>

          <p className="text-slate-700 dark:text-slate-300 text-base sm:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            {t("homeSubtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400 text-slate-950 font-black text-sm shadow-xl shadow-teal-500/25 hover:from-teal-300 hover:to-sky-300 transition-all flex items-center justify-center gap-2 group"
            >
              <Activity className="w-5 h-5 fill-slate-950 group-hover:rotate-12 transition-transform" />
              <span>{t("exploreSaaS")}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/features/report-comparison"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <TrendingUp className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>{t("seeComparison")}</span>
            </Link>
          </div>
        </div>

        {/* Key Metrics / Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-16">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-teal-500/30 backdrop-blur-md shadow-xl hover:scale-105 transition-transform">
            <div className="text-3xl font-black text-teal-600 dark:text-teal-400 flex items-center gap-2">
              <Database className="w-6 h-6 text-teal-600 dark:text-teal-400" /> 100%
            </div>
            <div className="text-xs font-extrabold text-slate-900 dark:text-slate-200 mt-1.5">{t("tenantIsolation")}</div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">{t("tenantDesc")}</div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-sky-500/30 backdrop-blur-md shadow-xl hover:scale-105 transition-transform">
            <div className="text-3xl font-black text-sky-600 dark:text-sky-400 flex items-center gap-2">
              <FlaskConical className="w-6 h-6 text-sky-600 dark:text-sky-400" /> WHO Standard
            </div>
            <div className="text-xs font-extrabold text-slate-900 dark:text-slate-200 mt-1.5">{t("whoStandard")}</div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">{t("whoDesc")}</div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-500/30 backdrop-blur-md shadow-xl hover:scale-105 transition-transform">
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <FileCheck2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" /> v1 → v2
            </div>
            <div className="text-xs font-extrabold text-slate-900 dark:text-slate-200 mt-1.5">{t("immutableAmendments")}</div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">{t("immutableDesc")}</div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-purple-500/30 backdrop-blur-md shadow-xl hover:scale-105 transition-transform">
            <div className="text-3xl font-black text-purple-600 dark:text-purple-400 flex items-center gap-2">
              <QrCode className="w-6 h-6 text-purple-600 dark:text-purple-400" /> QR Signed
            </div>
            <div className="text-xs font-extrabold text-slate-900 dark:text-slate-200 mt-1.5">{t("qrSigned")}</div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">{t("qrDesc")}</div>
          </div>
        </div>

        {/* DYNAMIC HEALTH & CLINICAL WISDOM QUOTES BANNER */}
        <div className="pt-8 max-w-4xl mx-auto">
          <DynamicHealthQuotes />
        </div>
      </div>
    </section>
  );
}
