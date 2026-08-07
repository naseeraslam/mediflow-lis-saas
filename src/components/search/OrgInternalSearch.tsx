"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, FileText, Phone, CreditCard, Hash, ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";

export function OrgInternalSearch() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ patients: any[]; reports: any[] } | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/reports/search-internal?q=${encodeURIComponent(query)}`);
      if (!res.ok) {
        console.warn("Internal search HTTP status:", res.status);
        setResults({ patients: [], reports: [] });
        return;
      }
      const data = await res.json();
      if (data.success) {
        setResults({ patients: data.patients || [], reports: data.reports || [] });
      }
    } catch (err) {
      console.error("Internal search error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-teal-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Phone Number, CNIC (ID), MRN Number, Report #, or Patient Name..."
              className="w-full pl-12 pr-4 py-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 text-sm font-semibold focus:border-teal-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-bold text-xs hover:from-teal-300 hover:to-sky-300 transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 shrink-0"
          >
            {loading ? "Searching..." : "Search Organization Records"}
          </button>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-3 px-1">
          <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-teal-400" /> Phone Number</span>
          <span className="flex items-center gap-1"><CreditCard className="w-3 h-3 text-sky-400" /> CNIC / ID Card</span>
          <span className="flex items-center gap-1"><Hash className="w-3 h-3 text-purple-400" /> MRN Number</span>
          <span className="flex items-center gap-1"><FileText className="w-3 h-3 text-emerald-400" /> Report #</span>
        </div>
      </form>

      {/* Results View */}
      {results && (
        <div className="space-y-8">
          {/* Matched Patients */}
          {results.patients.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-teal-400 uppercase tracking-widest flex items-center gap-2">
                <User className="w-4 h-4" /> Matched Patients ({results.patients.length})
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.patients.map((patient) => (
                  <div key={patient.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-100">{patient.fullName}</h3>
                        <div className="text-xs font-mono text-teal-300 mt-0.5">{patient.mrn}</div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        {patient.gender}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300 pt-2 border-t border-slate-800">
                      <div>
                        <span className="text-[10px] text-slate-400 font-sans block">Phone:</span>
                        <span>{patient.phone}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-sans block">CNIC / ID:</span>
                        <span className="text-teal-300">{patient.cnic || "N/A"}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xs text-slate-400">{patient.reports?.length || 0} Diagnostic Reports</span>
                      <Link
                        href={`/app/comparison?patientId=${patient.id}`}
                        className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1"
                      >
                        <TrendingUp className="w-3.5 h-3.5" /> Compare All Visits →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Reports */}
          {results.reports.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-teal-400 uppercase tracking-widest flex items-center gap-2">
                <FileText className="w-4 h-4" /> Matched Diagnostic Reports ({results.reports.length})
              </h2>

              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px] bg-slate-950/80">
                        <th className="py-3.5 px-5">Report Number</th>
                        <th className="py-3.5 px-5">Patient Name</th>
                        <th className="py-3.5 px-5">CNIC / Phone</th>
                        <th className="py-3.5 px-5">Status</th>
                        <th className="py-3.5 px-5">Analyte Count</th>
                        <th className="py-3.5 px-5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono">
                      {results.reports.map((report) => (
                        <tr key={report.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-5 font-bold text-teal-300">{report.reportNumber}</td>
                          <td className="py-3.5 px-5 font-sans font-bold text-slate-100">{report.patient?.fullName}</td>
                          <td className="py-3.5 px-5 text-slate-300">
                            <div>{report.patient?.phone}</div>
                            {report.patient?.cnic && (
                              <div className="text-[10px] text-teal-400">{report.patient.cnic}</div>
                            )}
                          </td>
                          <td className="py-3.5 px-5 font-sans">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">
                              {report.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-5 text-slate-300">{report.results?.length || 0} Analytes</td>
                          <td className="py-3.5 px-5 text-right font-sans">
                            <Link
                              href={`/app/reports/${report.id}`}
                              className="text-xs font-bold text-teal-400 hover:text-teal-300 underline"
                            >
                              View Official PDF →
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {results.patients.length === 0 && results.reports.length === 0 && (
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-2">
              <div className="text-slate-200 font-bold text-sm">No records found for '{query}'</div>
              <p className="text-xs text-slate-400">
                Try searching with partial Phone Number, CNIC, MRN Number, or Patient Name.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
