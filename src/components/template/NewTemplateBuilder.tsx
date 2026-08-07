"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sliders, ArrowLeft, Plus, ShieldCheck, Trash2, FlaskConical, Check } from "lucide-react";

export interface CategoryOpt {
  name: string;
}

export function NewTemplateBuilder({ categories }: { categories: string[] }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    category: categories[0] || "Clinical Chemistry",
    description: "",
  });

  const [parameters, setParameters] = useState<
    Array<{
      parameterName: string;
      code: string;
      unit: string;
      refRangeMale: string;
      refRangeFemale: string;
    }>
  >([
    { parameterName: "Alanine Aminotransferase (ALT)", code: "LFT-ALT", unit: "U/L", refRangeMale: "7 - 56", refRangeFemale: "7 - 45" },
    { parameterName: "Aspartate Aminotransferase (AST)", code: "LFT-AST", unit: "U/L", refRangeMale: "8 - 48", refRangeFemale: "8 - 40" },
    { parameterName: "Total Bilirubin", code: "LFT-TBIL", unit: "mg/dL", refRangeMale: "0.1 - 1.2", refRangeFemale: "0.1 - 1.2" },
    { parameterName: "Serum Albumin", code: "LFT-ALB", unit: "g/dL", refRangeMale: "3.4 - 5.4", refRangeFemale: "3.4 - 5.4" },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleAddParameterRow() {
    const nextIdx = parameters.length + 1;
    setParameters([
      ...parameters,
      {
        parameterName: `Custom Parameter ${nextIdx}`,
        code: `PARAM-0${nextIdx}`,
        unit: "mg/dL",
        refRangeMale: "70 - 110",
        refRangeFemale: "70 - 110",
      },
    ]);
  }

  function handleRemoveParameterRow(index: number) {
    setParameters(parameters.filter((_, i) => i !== index));
  }

  function handleUpdateParameter(index: number, field: string, value: string) {
    const copy = [...parameters];
    (copy[index] as any)[field] = value;
    setParameters(copy);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          parameters,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Failed to create template.");
        setLoading(false);
        return;
      }

      router.push("/app/templates");
      router.refresh();
    } catch (err) {
      setError("Network connection error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/app/templates"
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Sliders className="w-6 h-6 text-teal-400" />
            <span>Create Custom Diagnostic Template</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Build custom parameter batteries with dynamic custom parameter rows and org-scoped reference intervals
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-8 shadow-2xl">
        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-semibold text-center">
            ⚠️ {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Template Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="e.g. Liver Function Test (LFT) Panel"
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 font-bold focus:border-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Template Code (Unique) *</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              required
              placeholder="e.g. TMPL-LFT-01"
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-teal-300 font-mono font-bold focus:border-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Diagnostic Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 font-bold focus:border-teal-500 outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Template Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Comprehensive liver enzyme and bilirubin diagnostic battery"
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 focus:border-teal-500 outline-none"
            />
          </div>
        </div>

        {/* Dynamic Parameter Battery Section */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-teal-400 uppercase tracking-wider flex items-center gap-2">
                <FlaskConical className="w-4 h-4" /> Parameter Battery Definitions ({parameters.length} Parameters)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Add, edit, or remove custom parameters dynamically for this template
              </p>
            </div>

            {/* DYNAMIC "+ ADD CUSTOM PARAMETER ROW" BUTTON */}
            <button
              type="button"
              onClick={handleAddParameterRow}
              className="px-4 py-2.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-bold flex items-center gap-2 transition-colors shrink-0 shadow-sm"
            >
              <Plus className="w-4 h-4 text-teal-400" /> + Add Custom Parameter Row
            </button>
          </div>

          {/* Dynamic Parameter Rows */}
          <div className="space-y-3">
            {parameters.map((param, index) => (
              <div key={index} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-teal-400 uppercase">
                    Parameter #{index + 1}
                  </span>
                  {parameters.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveParameterRow(index)}
                      className="text-rose-400 hover:text-rose-300 text-xs font-semibold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  {/* Parameter Name */}
                  <div className="sm:col-span-4">
                    <label className="block text-[10px] text-slate-400 mb-1">Parameter / Analyte Name *</label>
                    <input
                      type="text"
                      value={param.parameterName}
                      onChange={(e) => handleUpdateParameter(index, "parameterName", e.target.value)}
                      required
                      placeholder="e.g. Alanine Aminotransferase (ALT)"
                      className="w-full p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-slate-100 font-semibold focus:border-teal-500 outline-none text-xs"
                    />
                  </div>

                  {/* Parameter Code */}
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-slate-400 mb-1">Code</label>
                    <input
                      type="text"
                      value={param.code}
                      onChange={(e) => handleUpdateParameter(index, "code", e.target.value.toUpperCase())}
                      placeholder="LFT-ALT"
                      className="w-full p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-teal-300 font-mono focus:border-teal-500 outline-none text-xs"
                    />
                  </div>

                  {/* Unit */}
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-slate-400 mb-1">Unit *</label>
                    <input
                      type="text"
                      value={param.unit}
                      onChange={(e) => handleUpdateParameter(index, "unit", e.target.value)}
                      required
                      placeholder="U/L or mg/dL"
                      className="w-full p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 font-mono focus:border-teal-500 outline-none text-xs"
                    />
                  </div>

                  {/* Male Ref Interval */}
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-slate-400 mb-1">Male Ref Interval *</label>
                    <input
                      type="text"
                      value={param.refRangeMale}
                      onChange={(e) => handleUpdateParameter(index, "refRangeMale", e.target.value)}
                      required
                      placeholder="7 - 56"
                      className="w-full p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 font-mono focus:border-teal-500 outline-none text-xs"
                    />
                  </div>

                  {/* Female Ref Interval */}
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-slate-400 mb-1">Female Ref Interval *</label>
                    <input
                      type="text"
                      value={param.refRangeFemale}
                      onChange={(e) => handleUpdateParameter(index, "refRangeFemale", e.target.value)}
                      required
                      placeholder="7 - 45"
                      className="w-full p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 font-mono focus:border-teal-500 outline-none text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-4 flex items-center justify-between border-t border-slate-800">
          <button
            type="button"
            onClick={handleAddParameterRow}
            className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-teal-300 text-xs font-bold flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-teal-400" /> + Add Another Parameter Row
          </button>

          <div className="flex items-center gap-3">
            <Link
              href="/app/templates"
              className="px-5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 hover:from-teal-300 hover:to-sky-300 transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              {loading ? "Saving Template..." : "Save Template Battery"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
