"use client";

import { useState } from "react";
import Link from "next/link";
import { FlaskConical, Search, BookOpen, Shield, LogIn, Sparkles, Menu, X } from "lucide-react";
import { LanguageToggle, useLanguage } from "@/components/i18n/LanguageToggle";
import { ThemeToggle } from "@/components/theme/ThemeProvider";

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 dark:bg-slate-950/90 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo - Clean, Single Brand Identity */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-teal-500 via-emerald-500 to-sky-500 text-slate-950 flex items-center justify-center shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <FlaskConical className="w-5 h-5 fill-slate-950" />
            </div>
            <div className="flex flex-col">
              <div className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1.5 leading-none">
                <span>MediFlow</span>
                <span className="text-[10px] font-extrabold text-teal-700 dark:text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20 uppercase tracking-wider">
                  LIS SaaS
                </span>
              </div>
              <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase mt-0.5">
                Clinical Diagnostics
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links - Spacious, Modern & Clean */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold text-slate-700 dark:text-slate-300">
            <Link
              href="/patient-search"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 hover:bg-teal-500/20 border border-teal-500/20 transition-all"
            >
              <Search className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>{t("patientSearchPortal")}</span>
            </Link>

            <Link href="/pricing" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              {t("pricing")}
            </Link>

            <Link href="/security" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              {t("security")}
            </Link>

            <Link href="/user-guide" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-teal-500" />
              <span>User Guide</span>
            </Link>
          </nav>

          {/* Clean Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />
            <LanguageToggle />

            <Link
              href="/login"
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 border border-slate-300 dark:border-slate-800 hover:border-teal-500 transition-all shadow-sm flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> {t("staffLogin")}
            </Link>

            <Link
              href="/register"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-md shadow-teal-500/20 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> {t("registerLab")}
            </Link>
          </div>

          {/* Mobile Drawer Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden p-4 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 space-y-3 text-xs font-bold shadow-xl animate-in slide-in-from-top-2">
          <Link
            href="/patient-search"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 p-3 rounded-xl bg-teal-500/10 text-teal-700 dark:text-teal-300"
          >
            <Search className="w-4 h-4 text-teal-600 dark:text-teal-400" /> {t("patientSearchPortal")}
          </Link>
          <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="block p-2.5 text-slate-700 dark:text-slate-300">
            {t("pricing")}
          </Link>
          <Link href="/security" onClick={() => setMobileMenuOpen(false)} className="block p-2.5 text-slate-700 dark:text-slate-300">
            {t("security")}
          </Link>
          <Link href="/user-guide" onClick={() => setMobileMenuOpen(false)} className="block p-2.5 text-slate-700 dark:text-slate-300">
            User Guide
          </Link>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2.5 text-center rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
            >
              {t("staffLogin")}
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2.5 text-center rounded-xl bg-teal-600 text-white"
            >
              {t("registerLab")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
