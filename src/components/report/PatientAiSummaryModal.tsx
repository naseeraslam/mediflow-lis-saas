"use client";

import { useState } from "react";
import { Sparkles, Bot, ShieldCheck, X, HeartPulse, CheckCircle2, AlertTriangle, Microscope } from "lucide-react";

export interface ReportResultItem {
  testNameSnapshot: string;
  numericValue: number | null;
  stringValue: string | null;
  unitSnapshot: string;
  refRangeSnapshot: string;
  flag: string | null;
}

export function PatientAiSummaryModal({
  patientName,
  reportNumber,
  results,
}: {
  patientName: string;
  reportNumber: string;
  results: ReportResultItem[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Generate Patient-Friendly Natural Language Insights
  const abnormalResults = results.filter((r) => r.flag === "High" || r.flag === "Low" || r.flag === "Panic");
  const normalResults = results.filter((r) => !r.flag || r.flag === "Normal");

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500/10 to-sky-500/10 hover:from-teal-500/20 hover:to-sky-500/20 border border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-black flex items-center gap-2 transition-all shadow-sm cursor-pointer"
      >
        <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
        <span>AI Diagnostic Report Summary Assistant</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative text-slate-900 dark:text-slate-100">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-500 to-sky-500 text-white flex items-center justify-center font-bold shadow-lg shadow-teal-500/20">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-black flex items-center gap-2">
                  <span>AI Patient Summary: {patientName}</span>
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  Report No: <strong className="font-mono text-teal-700 dark:text-teal-400">{reportNumber}</strong> • Patient-Friendly Plain Language Explanation
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              {/* Overall Summary Card */}
              <div className="p-4 rounded-xl bg-teal-50 dark:bg-slate-950 border border-teal-200 dark:border-teal-500/30 space-y-2">
                <div className="font-bold text-teal-900 dark:text-teal-300 flex items-center gap-2 text-sm">
                  <HeartPulse className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>Clinical Health Overview</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  Out of <strong>{results.length} diagnostic analytes</strong> evaluated, <strong>{normalResults.length}</strong> are strictly within normal physiological reference limits. {abnormalResults.length > 0 ? `Attention requested for ${abnormalResults.length} test value(s) highlighted below.` : "All laboratory markers show optimal physiological stability."}
                </p>
              </div>

              {/* Attention Results */}
              {abnormalResults.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500" /> Values Requiring Physician Review ({abnormalResults.length})
                  </h4>

                  <div className="space-y-2">
                    {abnormalResults.map((r, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-amber-50 dark:bg-slate-950/80 border border-amber-200 dark:border-amber-500/30 flex items-start justify-between gap-3">
                        <div>
                          <div className="font-extrabold text-slate-900 dark:text-slate-100">{r.testNameSnapshot}</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                            Result: <strong className="text-amber-700 dark:text-amber-400 font-mono">{r.numericValue ?? r.stringValue} {r.unitSnapshot}</strong> (Normal Range: {r.refRangeSnapshot})
                          </div>
                        </div>

                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 uppercase shrink-0">
                          {r.flag} Flag
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Normal Results Summary */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Normal Diagnostic Markers ({normalResults.length})</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] font-medium leading-relaxed">
                  {normalResults.map((r) => r.testNameSnapshot).join(" • ")}
                </p>
              </div>

              {/* Disclaimer */}
              <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-950 text-[10px] text-slate-500 dark:text-slate-400 text-center font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 inline mr-1 -mt-0.5" />
                This AI-assisted explanation is for patient educational purposes only. Always consult your referring physician for formal medical diagnosis and treatment plans.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
