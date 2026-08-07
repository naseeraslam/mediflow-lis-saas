"use client";

import Link from "next/link";
import { Shield, Lock, UserPlus, Search, Microscope, Dna, HeartPulse, Award, Sparkles, FlaskConical, Stethoscope } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeProvider";

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 shadow-lg">
      {/* Top Clinical Announcement Bar with Micro Animations */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-800 to-sky-900 text-teal-50 text-[11px] font-medium py-1.5 px-4 border-b border-teal-500/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-200 font-bold text-[10px] border border-teal-400/30 shadow-sm animate-pulse">
              <Microscope className="w-3.5 h-3.5 text-teal-300" /> ISO 15189 ACCREDITED
            </span>
            <span className="hidden sm:inline text-teal-100 font-medium flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5 text-sky-300" /> Enterprise Medical Laboratory Information System & Baseline Diagnostics
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px]">
            <span className="text-teal-200 flex items-center gap-1.5 font-sans">
              <Award className="w-3.5 h-3.5 text-amber-300" /> Platform Architect: <strong className="text-white font-bold">Sher Muhammad</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Extraordinary Medical Navbar */}
      <div className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-200 dark:border-teal-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Animated Medical Emblem & Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 via-emerald-400 to-sky-500 flex items-center justify-center text-slate-950 font-black shadow-xl shadow-teal-500/25 group-hover:scale-105 transition-all relative overflow-hidden animate-pulse-glow">
              <Dna className="w-6 h-6 text-slate-950 stroke-[2.5] animate-spin-slow" />
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                  MediFlow <span className="text-teal-600 dark:text-teal-400 font-black">LIS</span>
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-gradient-to-r from-teal-500/10 to-sky-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30 font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-teal-500" /> SaaS Platform
                </span>
              </div>
              <span className="text-[10px] text-teal-700 dark:text-teal-400 font-mono block -mt-0.5 tracking-wider font-bold">
                CLINICAL DIAGNOSTICS & MULTI-TENANT INFRASTRUCTURE
              </span>
            </div>
          </Link>

          {/* Clean Modern Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-bold text-slate-800 dark:text-slate-200">
            <Link
              href="/patient-search"
              className="px-3.5 py-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-700 dark:text-teal-300 transition-all flex items-center gap-2 shadow-sm group"
            >
              <Search className="w-4 h-4 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform" />
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

          {/* Actions & Theme Switcher */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Link
              href="/login"
              className="text-xs font-extrabold text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/90 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all shadow-sm"
            >
              <Lock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Staff Login
            </Link>

            <Link
              href="/register"
              className="text-xs font-black text-slate-950 bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400 hover:from-teal-300 hover:to-sky-300 px-5 py-2.5 rounded-xl shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all flex items-center gap-2 group"
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
