"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Lock, UserPlus, Search, Microscope, Dna, HeartPulse, Award, Sparkles, FlaskConical, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeProvider";

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-md w-full max-w-full overflow-x-hidden">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-800 to-sky-900 text-teal-50 text-[10px] sm:text-[11px] font-medium py-1 px-3 sm:px-4 border-b border-teal-500/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-hidden">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-200 font-bold text-[9px] sm:text-[10px] border border-teal-400/30 shrink-0">
              <Microscope className="w-3 h-3 text-teal-300" /> ISO 15189 ACCREDITED
            </span>
            <span className="hidden sm:inline text-teal-100 font-medium truncate">
              Enterprise Medical LIS & Baseline Diagnostics
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] shrink-0">
            <span className="text-teal-200 font-sans">
              Architect: <strong className="text-white font-bold">Sher Muhammad</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Medical Navbar */}
      <div className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-200 dark:border-teal-500/20 w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
          {/* Mobile Optimized Emblem & Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-teal-500 via-emerald-400 to-sky-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-teal-500/25 shrink-0">
              <Dna className="w-4 h-4 sm:w-6 sm:h-6 text-slate-950 stroke-[2.5]" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  MediFlow <span className="text-teal-600 dark:text-teal-400 font-black">LIS</span>
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30 font-extrabold uppercase hidden sm:inline-block">
                  SaaS
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
              <Search className="w-4 h-4 text-teal-600 dark:text-teal-400" /> Patient Search
            </Link>

            <Link href="/features/patient-portal" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-sky-500" /> Features
            </Link>

            <Link href="/pricing" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Pricing
            </Link>

            <Link href="/security" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Security
            </Link>
          </nav>

          {/* Right Action Bar (Mobile Responsive) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <ThemeToggle />

            {/* Desktop Only Buttons (>= sm) */}
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="text-xs font-extrabold text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/90 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all shadow-sm"
              >
                <Lock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Staff Login
              </Link>

              <Link
                href="/register"
                className="text-xs font-black text-slate-950 bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400 hover:from-teal-300 hover:to-sky-300 px-3.5 py-2 rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/35 transition-all flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5 fill-slate-950" />
                <span>Register Lab</span>
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

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200 w-full">
            <nav className="space-y-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Link
                href="/patient-search"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20"
              >
                <Search className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Patient Search Portal</span>
              </Link>

              <Link
                href="/features/patient-portal"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                <HeartPulse className="w-4 h-4 text-sky-500" /> Features & Patient Portal
              </Link>

              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                <Sparkles className="w-4 h-4 text-amber-500" /> Multi-Currency Pricing
              </Link>

              <Link
                href="/security"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Security & ISO Standards
              </Link>
            </nav>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-center text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center justify-center gap-1"
              >
                <Lock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Staff Login
              </Link>

              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-center text-xs font-black text-slate-950 flex items-center justify-center gap-1 shadow-md"
              >
                <UserPlus className="w-3.5 h-3.5 fill-slate-950" /> Register Lab
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
