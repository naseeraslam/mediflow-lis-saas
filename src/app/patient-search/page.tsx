"use client";

import { useState } from "react";
import Link from "next/link";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";
import { LanguageToggle, useLanguage } from "@/components/i18n/LanguageToggle";
import { ThemeToggle } from "@/components/theme/ThemeProvider";
import { Search, Phone, ShieldCheck, FileText, Building2, Lock, AlertTriangle, KeyRound, Clock } from "lucide-react";

export default function PatientSearchPage() {
  const [reportNumber, setReportNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any[] | null>(null);
  const { t } = useLanguage();

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!reportNumber.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch("/api/reports/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportNumber, phone }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Dual-factor verification failed.");
        setLoading(false);
        return;
      }

      setResults(data.reports);
    } catch (err: any) {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
      <PublicNavbar />

      <main className="max-w-4xl mx-auto px-4 py-16 space-y-8">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/20 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Dual-Factor Patient Privacy Protection Active
            </div>
            <ThemeToggle />
            <LanguageToggle />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            {t("searchTitle")}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs max-w-lg mx-auto font-medium">
            {t("searchSubtitle")}
          </p>
        </div>

        {/* Dual-Factor Search Form */}
        <form onSubmit={handleSearch} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 space-y-6 shadow-xl transition-colors">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-800 dark:text-slate-300 font-bold mb-1 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400" /> {t("reportOrMrn")}
              </label>
              <input
                type="text"
                value={reportNumber}
                onChange={(e) => setReportNumber(e.target.value)}
                required
                placeholder="e.g. LAB-2026-08001 or MRN-2026-8801"
                className="w-full p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono font-bold focus:border-teal-500 outline-none text-xs shadow-sm"
              />
            </div>

            <div>
              <label className="block text-slate-800 dark:text-slate-300 font-bold mb-1 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-sky-600 dark:text-sky-400" /> {t("phoneOptional")}
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 03062403761 or +923062403761"
                className="w-full p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono focus:border-teal-500 outline-none text-xs shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium flex flex-wrap items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" /> Quick Demo Codes: 
              <button type="button" onClick={() => { setReportNumber("LAB-2026-08001"); setPhone("03062403761"); }} className="text-teal-700 dark:text-teal-400 underline font-mono font-bold">LAB-2026-08001 (03062403761)</button>
              <span>•</span>
              <button type="button" onClick={() => { setReportNumber("LAB-2026-00001"); setPhone("+923062403761"); }} className="text-sky-700 dark:text-sky-400 underline font-mono font-bold">LAB-2026-00001 (+923062403761)</button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 text-white font-bold text-xs shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Search className="w-4 h-4 text-white" />
              {loading ? t("verifyingCredentials") : t("verifyUnlockBtn")}
            </button>
          </div>
        </form>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-400 text-xs font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Search Results Display */}
        {results && (
          <div className="space-y-4 animate-in fade-in-50 duration-300">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-teal-600 dark:text-teal-400" /> Authenticated Report Records ({results.length} Found)
              </h2>
            </div>

            {results.map((r) => (
              <div key={r.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400">Report No: {r.reportNumber}</span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{r.patientName}</h3>
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">MRN: {r.patientMrn}</div>
                  </div>

                  <div className="text-left sm:text-right space-y-1">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-teal-500/10 text-teal-800 dark:text-teal-300 border border-teal-500/30 inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                      {r.status || "Sample Collected"}
                    </span>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Order Date: {new Date(r.date).toLocaleDateString()}</div>
                  </div>
                </div>

                {/* REAL-TIME 4-STAGE DIAGNOSTIC PROGRESS TRACKER */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-300">
                    <span className="flex items-center gap-1.5 text-teal-700 dark:text-teal-400">
                      <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" /> Diagnostic Lifecycle Status
                    </span>
                    <span className="text-[11px] font-mono text-sky-800 dark:text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20">
                      ⏱️ Estimated Turnaround Time: {r.tatHours || 4} Hours
                    </span>
                  </div>

                  {/* 4-Step Visual Progress Bar */}
                  <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                    <div className={`p-2 rounded-lg text-[10px] font-bold border transition-colors ${['Sample Collected', 'Testing in Progress', 'Result Entry Completed', 'Pending Authorization', 'Authorized'].includes(r.status) ? 'bg-teal-500/20 border-teal-500/40 text-teal-800 dark:text-teal-300' : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'}`}>
                      1. Sample Received
                    </div>
                    <div className={`p-2 rounded-lg text-[10px] font-bold border transition-colors ${['Testing in Progress', 'Result Entry Completed', 'Pending Authorization', 'Authorized'].includes(r.status) ? 'bg-teal-500/20 border-teal-500/40 text-teal-800 dark:text-teal-300' : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'}`}>
                      2. In Progress
                    </div>
                    <div className={`p-2 rounded-lg text-[10px] font-bold border transition-colors ${['Result Entry Completed', 'Pending Authorization', 'Authorized'].includes(r.status) ? 'bg-teal-500/20 border-teal-500/40 text-teal-800 dark:text-teal-300' : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'}`}>
                      3. Pathologist Review
                    </div>
                    <div className={`p-2 rounded-lg text-[10px] font-bold border transition-colors ${['Authorized', 'Published'].includes(r.status) ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-800 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'}`}>
                      4. Final Report Ready
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                  <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                    <Building2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span>Issued by <strong className="text-slate-900 dark:text-slate-200">{r.organizationName}</strong></span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/verify/${r.verificationToken}`}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" /> Public Verification
                    </Link>

                    <Link
                      href={`/share/${r.activeShareToken || r.verificationToken || r.id}`}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 text-white text-xs font-bold shadow-md shadow-teal-500/20 flex items-center gap-1.5 transition-all"
                    >
                      <FileText className="w-4 h-4 text-white" /> View Official Patient Report
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}
