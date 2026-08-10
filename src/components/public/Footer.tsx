"use client";

import Link from "next/link";
import { ShieldCheck, Lock, Award, Dna, Sparkles, Microscope, FlaskConical, Search, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageToggle";

export function PublicFooter() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 text-xs relative overflow-hidden transition-colors py-12">
      {/* Ambient Glowing Background Lights */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-gradient-to-tr from-teal-500/10 via-emerald-500/10 to-sky-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Centered Modern Section Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Main Content Grid */}
        <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 backdrop-blur-xl shadow-xl space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            
            {/* Brand & Architecture Column (Spans 2 Columns on LG) */}
            <div className="lg:col-span-2 space-y-5">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-500 via-emerald-400 to-sky-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
                  <Dna className="w-6 h-6 text-slate-950 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                    MediFlow <span className="text-teal-600 dark:text-teal-400 font-black">{t("platformTitle")}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30 font-extrabold uppercase tracking-wider">
                      {t("saasTag")}
                    </span>
                  </span>
                  <span className="text-[10px] text-teal-700 dark:text-teal-400 font-mono block -mt-0.5 tracking-wider font-bold">
                    CLINICAL DIAGNOSTICS & MULTI-TENANT INFRASTRUCTURE
                  </span>
                </div>
              </Link>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs max-w-md font-medium">
                Enterprise-grade Multi-Tenant Laboratory Information System (LIS), version-controlled clinical reporting, automated analyte baseline trend comparison, and cryptographic QR verification.
              </p>

              {/* Platform Architect Glassmorphism Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-teal-500/30 space-y-2 backdrop-blur-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-teal-700 dark:text-teal-300 font-bold text-xs flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-500" /> {t("architectTitle")}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-200 font-mono text-[9px] font-bold border border-teal-500/30">
                    ISO 15189 LEAD
                  </span>
                </div>
                <p className="text-slate-800 dark:text-slate-200 text-xs font-semibold">
                  Designed & Spearheaded by <strong className="text-slate-950 dark:text-white font-extrabold underline decoration-teal-500 decoration-2">{t("architectName")}</strong>
                </p>
                <div className="flex items-center gap-3 text-[10px] text-slate-600 dark:text-slate-400 pt-1 font-mono">
                  <span className="flex items-center gap-1 text-teal-700 dark:text-teal-300"><ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> ISO 15189 Certified</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-sky-700 dark:text-sky-300"><Lock className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" /> Row-Level DB Isolated</span>
                </div>
              </div>
            </div>

            {/* Column 1: Solutions */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Microscope className="w-4 h-4 text-teal-600 dark:text-teal-400" /> {t("solutions")}
              </h4>
              <ul className="space-y-2 font-medium text-slate-600 dark:text-slate-300">
                <li>
                  <Link href="/solutions/diagnostic-laboratories" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                    {t("diagnosticLabs")}
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/hospitals" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                    {t("pathologyHospitals")}
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/clinics" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                    {t("polyclinics")}
                  </Link>
                </li>
                <li>
                  <Link href="/features/pdf-reports" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                    {t("pdfReports")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Platform Features */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                <FlaskConical className="w-4 h-4 text-sky-600 dark:text-sky-400" /> {t("features")}
              </h4>
              <ul className="space-y-2 font-medium text-slate-600 dark:text-slate-300">
                <li>
                  <Link href="/patient-search" className="text-teal-700 dark:text-teal-400 font-bold hover:text-teal-600 dark:hover:text-teal-300 transition-colors flex items-center gap-1">
                    <Search className="w-3.5 h-3.5" /> {t("patientSearchPortal")}
                  </Link>
                </li>
                <li>
                  <Link href="/features/report-comparison" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                    Baseline Comparison Engine
                  </Link>
                </li>
                <li>
                  <Link href="/features/patient-portal" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                    Patient Self-Service Portal
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                    {t("pricing")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Security & Portals */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> {t("compliance")}
              </h4>
              <ul className="space-y-2 font-medium text-slate-600 dark:text-slate-300">
                <li>
                  <Link href="/security" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                    {t("security")}
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                    {t("staffLogin")}
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-teal-700 dark:text-teal-400 font-bold hover:text-teal-600 dark:hover:text-teal-300 transition-colors flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> {t("registerLab")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Live System Operational Status Bar */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-slate-900 dark:text-slate-100 font-bold">{t("operationalStatus")}</span>
            </div>

            <Link
              href="/patient-search"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-black text-xs hover:from-teal-300 hover:to-sky-300 transition-all flex items-center gap-2 shadow-lg shadow-teal-500/20 group"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{t("patientSearchPortal")}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Bottom Rights & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-400 px-2">
          <p>© {new Date().getFullYear()} MediFlow Medical LIS SaaS Platform. Architectural Vision by <strong className="text-slate-900 dark:text-slate-200 font-bold">{t("architectName")}</strong>.</p>
          <div className="flex items-center gap-4 font-mono">
            <span className="text-teal-700 dark:text-teal-400 font-bold">ISO 15189 ACCREDITED</span>
            <span>•</span>
            <span className="text-slate-700 dark:text-slate-300">CLIA COMPLIANT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
