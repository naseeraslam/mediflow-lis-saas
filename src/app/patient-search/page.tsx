"use client";

import { useState } from "react";
import Link from "next/link";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";
import { LanguageToggle, useLanguage } from "@/components/i18n/LanguageToggle";
import { Search, Phone, ShieldCheck, FileText, Building2, Lock, AlertTriangle, KeyRound } from "lucide-react";

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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <PublicNavbar />

      <main className="max-w-4xl mx-auto px-4 py-16 space-y-8">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5 text-teal-400" /> Dual-Factor Patient Privacy Protection Active
            </div>
            <LanguageToggle />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            {t("searchTitle")}
          </h1>
          <p className="text-slate-400 text-xs max-w-lg mx-auto">
            {t("searchSubtitle")}
          </p>
        </div>

        {/* Dual-Factor Search Form */}
        <form onSubmit={handleSearch} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-teal-400" /> {t("reportOrMrn")}
              </label>
              <input
                type="text"
                value={reportNumber}
                onChange={(e) => setReportNumber(e.target.value)}
                required
                placeholder="e.g. LAB-2026-08001 or MRN-2026-8801"
                className="w-full p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 font-mono font-bold focus:border-teal-500 outline-none text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-sky-400" /> {t("phoneOptional")}
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +1 (555) 234-5678"
                className="w-full p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 font-mono focus:border-teal-500 outline-none text-xs"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-400" /> {t("demoCodePrompt")} <button type="button" onClick={() => { setReportNumber("LAB-2026-08001"); setPhone("+1 (555) 234-5678"); }} className="text-teal-400 underline font-mono">LAB-2026-08001</button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 hover:from-teal-300 hover:to-sky-300 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4 text-slate-950" />
              {loading ? t("verifyingCredentials") : t("verifyUnlockBtn")}
            </button>
          </div>
        </form>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-center space-y-1 text-xs">
            <AlertTriangle className="w-6 h-6 text-rose-400 mx-auto" />
            <div className="font-bold text-rose-300">Access Denied</div>
            <p className="text-slate-400">{error}</p>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="space-y-4">
            <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Verified Report Instance</span>
              <span className="text-teal-400 font-mono text-[11px]">DUAL-FACTOR VERIFIED</span>
            </div>

            {results.map((r) => (
              <div key={r.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-teal-400">Report No: {r.reportNumber}</span>
                    <h3 className="text-base font-bold text-slate-100">{r.patientName}</h3>
                    <div className="text-xs text-slate-400">MRN: {r.patientMrn}</div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">
                      {r.status}
                    </span>
                    <div className="text-[11px] text-slate-400 mt-1">{new Date(r.date).toLocaleDateString()}</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-teal-400" />
                    <span>Issued by <strong>{r.organizationName}</strong></span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/verify/${r.verificationToken}`}
                      className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-teal-400" /> Public Verification
                    </Link>

                    {r.activeShareToken ? (
                      <Link
                        href={`/share/${r.activeShareToken}`}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 text-xs font-bold shadow-md shadow-teal-500/20 flex items-center gap-1.5 hover:from-teal-300 hover:to-sky-300 transition-all"
                      >
                        <FileText className="w-4 h-4 text-slate-950" /> Open Full Report
                      </Link>
                    ) : (
                      <Link
                        href={`/app/reports/${r.id}`}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 text-xs font-bold shadow-md shadow-teal-500/20 flex items-center gap-1.5 hover:from-teal-300 hover:to-sky-300 transition-all"
                      >
                        <FileText className="w-4 h-4 text-slate-950" /> View Portal Report
                      </Link>
                    )}
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
