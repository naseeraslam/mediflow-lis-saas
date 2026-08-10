"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Lock, UserPlus, Search, Dna, HeartPulse, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeProvider";
import { LanguageToggle, useLanguage } from "@/components/i18n/LanguageToggle";

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80 max-w-[100vw] overflow-x-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-teal-500 via-emerald-400 to-sky-500 flex items-center justify-center text-slate-950 font-black shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Dna className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-base sm:text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none flex items-center gap-1">
                MediFlow <span className="text-teal-600 dark:text-teal-400 font-black">{t("platformTitle")}</span>
                <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30 font-extrabold uppercase tracking-wider">
                  {t("saasTag")}
                </span>
              </div>
              <span className="text-[8px] sm:text-[10px] text-teal-700 dark:text-teal-400 font-mono hidden sm:block -mt-0.5 tracking-wider font-bold">
                CLINICAL DIAGNOSTICS & LIS
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (>= lg) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-slate-800 dark:text-slate-200">
            <Link
              href="/patient-search"
              className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1.5"
            >
              <Search className="w-4 h-4 text-teal-600 dark:text-teal-400" /> {t("patientSearchPortal")}
            </Link>

            <Link href="/features/patient-portal" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-sky-500" /> {t("features")}
            </Link>

            <Link href="/pricing" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              {t("pricing")}
            </Link>

            <Link href="/security" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> {t("security")}
            </Link>
          </nav>

          {/* Right Action Bar (Mobile Responsive) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <LanguageToggle />
            <ThemeToggle />

            {/* Desktop Only Buttons (>= sm) */}
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="text-xs font-extrabold text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/90 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all shadow-sm"
              >
                <Lock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> {t("staffLogin")}
              </Link>

              <Link
                href="/register"
                className="text-xs font-black text-slate-950 bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400 hover:from-teal-300 hover:to-sky-300 px-3.5 py-2 rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/35 transition-all flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5 fill-slate-950" />
                <span>{t("registerLab")}</span>
              </Link>
            </div>

            {/* Mobile Hamburger Drawer Toggle (< lg) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 lg:hidden cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 py-5 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 text-sm font-bold text-slate-800 dark:text-slate-200">
            <Link
              href="/patient-search"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-teal-600 dark:text-teal-400" /> {t("patientSearchPortal")}
            </Link>

            <Link
              href="/features/patient-portal"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 flex items-center gap-2"
            >
              <HeartPulse className="w-4 h-4 text-sky-500" /> {t("features")}
            </Link>

            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              {t("pricing")}
            </Link>

            <Link
              href="/security"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 flex items-center gap-2"
            >
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> {t("security")}
            </Link>
          </nav>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2.5">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-extrabold text-xs flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-teal-600 dark:text-teal-400" /> {t("staffLogin")}
            </Link>

            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
            >
              <UserPlus className="w-4 h-4 fill-slate-950" /> {t("registerLab")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
