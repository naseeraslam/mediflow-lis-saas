"use client";

import { Printer } from "lucide-react";

export function PrintPdfButton({ reportNumber }: { reportNumber: string }) {
  function handlePrint() {
    window.print();
  }

  return (
    <button
      onClick={handlePrint}
      type="button"
      className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors shadow-sm whitespace-nowrap cursor-pointer"
    >
      <Printer className="w-4 h-4 text-teal-600 dark:text-teal-400" />
      <span>Print / PDF</span>
    </button>
  );
}
