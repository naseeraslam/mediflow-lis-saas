"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, LayoutDashboard, ChevronDown, ChevronUp, ShieldAlert } from "lucide-react";

export default function GlobalAppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    console.error("Global Application Error Captured:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-slate-900 dark:text-slate-100">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-xl w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" /> Service Notice
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">Unexpected Operation Exception</h2>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
          An unexpected system exception occurred while processing this diagnostic workspace view. The platform session remains secure and isolated.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-teal-500/20 hover:from-teal-300 hover:to-sky-300 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Try Again / Reload View
          </button>

          <Link
            href="/app/dashboard"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center justify-center gap-2 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 text-teal-600 dark:text-teal-400" /> Return to Dashboard
          </Link>
        </div>

        {/* Technical Diagnostic Details Accordion */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          >
            <span>🛠️ View Technical Diagnostic Details</span>
            {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showDetails && (
            <div className="p-4 rounded-xl bg-slate-950 text-rose-300 font-mono text-[11px] space-y-2 overflow-x-auto border border-rose-500/30">
              <div className="font-bold text-rose-400">Exception Message:</div>
              <div>{error.message || "Unknown client/server runtime error."}</div>
              {error.digest && (
                <div className="text-slate-400 text-[10px]">
                  Error Digest Token: <code>{error.digest}</code>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
