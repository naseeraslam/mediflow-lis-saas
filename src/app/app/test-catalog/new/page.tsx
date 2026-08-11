import Link from "next/link";
import { FlaskConical, ArrowLeft, ShieldCheck, Plus, Sparkles } from "lucide-react";

export default function NewTestPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Link
          href="/app/test-catalog"
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <span>Register New Diagnostic Test</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
            Add custom analyte definition, measurement units, reference ranges, and critical limits to your organization catalog
          </p>
        </div>
      </div>

      <form className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Test Code (Unique ID) *</label>
            <input
              type="text"
              name="code"
              required
              placeholder="e.g. CHEM-LIPID-HDL"
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 font-mono focus:border-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Analyte / Test Name *</label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. High-Density Lipoprotein (HDL)"
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 focus:border-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Diagnostic Category *</label>
            <select
              name="category"
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 focus:border-teal-500 outline-none"
            >
              <option value="Hematology">Hematology</option>
              <option value="Clinical Chemistry">Clinical Chemistry</option>
              <option value="Endocrinology">Endocrinology</option>
              <option value="Urinalysis">Urinalysis</option>
              <option value="Immunology">Immunology</option>
              <option value="Microbiology">Microbiology</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Measurement Unit *</label>
            <input
              type="text"
              name="unit"
              required
              placeholder="e.g. mg/dL"
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 font-mono focus:border-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Male Reference Interval *</label>
            <input
              type="text"
              name="refRangeMale"
              required
              placeholder="e.g. 40 - 60"
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 focus:border-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Female Reference Interval *</label>
            <input
              type="text"
              name="refRangeFemale"
              required
              placeholder="e.g. 50 - 70"
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 focus:border-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Minimum Normal Value</label>
            <input
              type="number"
              step="any"
              name="minValue"
              placeholder="e.g. 40"
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 font-mono focus:border-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Maximum Normal Value</label>
            <input
              type="number"
              step="any"
              name="maxValue"
              placeholder="e.g. 60"
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 font-mono focus:border-teal-500 outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-300 font-semibold mb-1">Analyzer / Testing Method</label>
            <input
              type="text"
              name="method"
              placeholder="e.g. Spectrophotometric Immunoassay"
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 focus:border-teal-500 outline-none"
            />
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end gap-3">
          <Link
            href="/app/test-catalog"
            className="px-5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 hover:from-teal-300 hover:to-sky-300 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Save Test Definition
          </button>
        </div>
      </form>
    </div>
  );
}
