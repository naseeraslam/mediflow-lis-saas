"use client";

import Link from "next/link";
import { Shield, Activity, Lock, UserPlus, Search, Sparkles, Microscope, Dna, HeartPulse, Award } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeProvider";

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top Clinical Announcement Bar */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-800 to-sky-800 text-teal-50 text-[11px] font-medium py-1.5 px-4 border-b border-teal-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-white font-bold text-[10px] border border-teal-300/30">
              <Microscope className="w-3.5 h-3.5 text-teal-200" /> ISO 15189 ACCREDITED
            </span>
            <span className="hidden sm:inline text-teal-100">
              Enterprise Medical Laboratory Information System & Baseline Diagnostics
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px]">
            <span className="text-teal-200 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-300" /> Platform Architect: <strong className="text-white font-sans">Sher Muhammad</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Medical Navbar */}
      <div className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-200 dark:border-teal-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Medical Brand Emblem Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-500 via-emerald-400 to-sky-500 flex items-center justify-center text-slate-950 font-extrabold shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-all relative overflow-hidden">
              <Dna className="w-6 h-6 text-slate-950 stroke-[2.5] animate-pulse" />
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                  MediFlow <span className="text-teal-600 dark:text-teal-400">LIS</span>
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 font-bold uppercase tracking-wider">
                  SaaS Platform
                </span>
              </div>
              <span className="text-[10px] text-teal-700 dark:text-teal-400 font-mono block -mt-0.5 tracking-wider font-semibold">
                CLINICAL DIAGNOSTICS & MULTI-TENANT INFRASTRUCTURE
              </span>
            </div>
          </Link>

          {/* Clean Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <Link
              href="/patient-search"
              className="px-3 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-700 dark:text-teal-300 transition-all flex items-center gap-2 shadow-sm font-bold"
            >
              <Search className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Patient Search Portal</span>
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

          {/* Action CTAs & Theme Toggle */}
          <div className="flex items-center gap-3">
            {/* THEME TOGGLE BUTTON */}
            <ThemeToggle />

            <Link
              href="/login"
              className="text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/90 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all shadow-sm"
            >
              <Lock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Staff Login
            </Link>

            <Link
              href="/register"
              className="text-xs font-extrabold text-slate-950 bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400 hover:from-teal-300 hover:to-sky-300 px-5 py-2.5 rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/35 transition-all flex items-center gap-2 group"
            >
              <UserPlus className="w-4 h-4 fill-slate-950 group-hover:scale-110 transition-transform" />
              <span>Register Laboratory</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
