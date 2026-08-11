"use client";

import Link from "next/link";
import { useState } from "react";
import { FlaskConical, Search, BookOpen, Shield, CreditCard, LogIn, Sparkles, ChevronDown, Menu, X } from "lucide-react";
import { LanguageToggle } from "@/components/i18n/LanguageToggle";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/85 dark:bg-slate-950/85 border-b border-slate-200/70 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo - Clean, Uncluttered */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <FlaskConical className="w-5 h-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                MediFlow <span className="text-xs font-extrabold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">LIS</span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 tracking-wider">
                CLINICAL DIAGNOSTICS
              </span>
            </div>
          </Link>

          {/* Navigation Links - Spacious & Elegant */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold text-slate-700 dark:text-slate-300">
            <Link
              href="/patient-search"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 hover:bg-teal-500/20 border border-teal-500/20 transition-all font-bold"
            >
              <Search className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Patient Track & Search</span>
            </Link>

            <Link href="/pricing" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1">
              <span>Pricing</span>
            </Link>

            <Link href="/security" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1">
              <span>Security</span>
            </Link>

            <Link href="/user-guide" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1">
              <span>User Guide</span>
            </Link>
          </nav>

          {/* Action Buttons & Theme Controls */}
          <div className="hidden sm:flex items-center gap-3">
            <LanguageToggle />

            <Link
              href="/login"
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 border border-slate-300 dark:border-slate-800 hover:border-teal-500 transition-all shadow-sm flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" /> Staff Login
            </Link>

            <Link
              href="/register"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-md shadow-teal-500/20 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Register Lab
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden p-4 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 space-y-3 text-xs font-bold">
          <Link
            href="/patient-search"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 p-3 rounded-xl bg-teal-500/10 text-teal-700 dark:text-teal-300"
          >
            <Search className="w-4 h-4" /> Patient Track & Search Portal
          </Link>
          <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="block p-2 text-slate-700 dark:text-slate-300">
            Pricing
          </Link>
          <Link href="/security" onClick={() => setMobileMenuOpen(false)} className="block p-2 text-slate-700 dark:text-slate-300">
            Security & Compliance
          </Link>
          <Link href="/user-guide" onClick={() => setMobileMenuOpen(false)} className="block p-2 text-slate-700 dark:text-slate-300">
            User Guide
          </Link>
          <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2.5 text-center rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100"
            >
              Staff Login
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2.5 text-center rounded-xl bg-teal-600 text-white"
            >
              Register Lab
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
