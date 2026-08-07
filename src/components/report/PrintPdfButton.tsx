"use client";

import { Printer, Download, FileText } from "lucide-react";

export function PrintPdfButton({ reportNumber }: { reportNumber: string }) {
  function handlePrint() {
    window.print();
  }

  return (
    <button
      onClick={handlePrint}
      className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors shadow-md"
    >
      <Printer className="w-4 h-4 text-teal-400" />
      <span>Print / Download Official PDF</span>
    </button>
  );
}
