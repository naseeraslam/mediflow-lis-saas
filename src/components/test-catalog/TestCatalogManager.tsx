"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FlaskConical, Tag, Plus, Building2, ShieldCheck, X, Search, Check } from "lucide-react";

export interface TestItem {
  id: string;
  code: string;
  name: string;
  category: string;
  unit: string;
  refRangeMale: string;
  refRangeFemale: string;
  version: number;
}

export function TestCatalogManager({
  initialTests,
  initialCategories,
}: {
  initialTests: TestItem[];
  initialCategories: string[];
}) {
  const router = useRouter();
  const [tests, setTests] = useState<TestItem[]>(initialTests);
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCatFilter, setSelectedCatFilter] = useState<string>("ALL");

  // Department Modal State
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [deptName, setDeptName] = useState("");
  const [deptDesc, setDeptDesc] = useState("");
  const [deptLoading, setDeptLoading] = useState(false);
  const [deptMsg, setDeptMsg] = useState<string | null>(null);

  // Test Modal State
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [testForm, setTestForm] = useState({
    code: "",
    name: "",
    category: categories[0] || "Urology & Andrology Genetics",
    unit: "",
    refRangeMale: "",
    refRangeFemale: "",
  });
  const [testLoading, setTestLoading] = useState(false);
  const [testError, setTestError] = useState<string | null>(null);

  const filteredTests = tests.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCatFilter === "ALL" || t.category === selectedCatFilter;
    return matchesSearch && matchesCat;
  });

  // Handle Add New Department
  async function handleAddDepartment(e: React.FormEvent) {
    e.preventDefault();
    setDeptLoading(true);
    setDeptMsg(null);

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: deptName, description: deptDesc }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setDeptMsg(`⚠️ ${data.error || "Failed to add department."}`);
        setDeptLoading(false);
        return;
      }

      if (!categories.includes(data.category.name)) {
        setCategories([...categories, data.category.name]);
      }
      setDeptMsg(`✅ Department '${data.category.name}' created successfully!`);
      setTimeout(() => {
        setIsDeptModalOpen(false);
        setDeptName("");
        setDeptDesc("");
        setDeptMsg(null);
      }, 1200);
    } catch (err) {
      setDeptMsg("⚠️ Network connection error.");
    } finally {
      setDeptLoading(false);
    }
  }

  // Handle Register New Test
  async function handleRegisterTest(e: React.FormEvent) {
    e.preventDefault();
    setTestLoading(true);
    setTestError(null);

    try {
      const res = await fetch("/api/tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testForm),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setTestError(data.error || "Failed to create test definition.");
        setTestLoading(false);
        return;
      }

      setTests([data.test, ...tests]);
      setIsTestModalOpen(false);
      setTestForm({
        code: "",
        name: "",
        category: categories[0] || "Urology & Andrology Genetics",
        unit: "",
        refRangeMale: "",
        refRangeFemale: "",
      });
      router.refresh();
    } catch (err) {
      setTestError("Network connection error.");
    } finally {
      setTestLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header with Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-teal-400" />
            <span>Organization Test Catalog & Departments</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage clinical departments (Urology, Molecular Genetics, Hematology) and test reference intervals
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDeptModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center gap-2"
          >
            <Tag className="w-4 h-4 text-sky-400" /> + Add New Department
          </button>

          <button
            onClick={() => setIsTestModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-bold text-xs hover:from-teal-300 hover:to-sky-300 transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2"
          >
            <Plus className="w-4 h-4 fill-slate-950" /> Register Custom Test
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900 p-3 rounded-2xl border border-slate-800 shadow-xl">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search test catalog by Analyte Name, Test Code, or Department..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 text-xs focus:border-teal-500 outline-none"
          />
        </div>

        <select
          value={selectedCatFilter}
          onChange={(e) => setSelectedCatFilter(e.target.value)}
          className="w-full sm:w-64 p-2 bg-slate-950 rounded-xl border border-slate-800 text-teal-300 text-xs font-bold focus:border-teal-500 outline-none"
        >
          <option value="ALL">All Clinical Departments ({categories.length})</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Test Catalog Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 bg-slate-950/40 text-xs text-slate-400 flex items-center justify-between">
          <span>Configured Diagnostic Analytes: <strong className="text-slate-200">{filteredTests.length}</strong></span>
          <span className="font-mono text-[10px] text-teal-400">Strict Method Calibration Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px] bg-slate-950/80">
                <th className="py-3.5 px-5">Test Code</th>
                <th className="py-3.5 px-5">Analyte Name</th>
                <th className="py-3.5 px-5">Clinical Department</th>
                <th className="py-3.5 px-5">Unit</th>
                <th className="py-3.5 px-5">Male Ref Interval</th>
                <th className="py-3.5 px-5">Female Ref Interval</th>
                <th className="py-3.5 px-5">Version</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredTests.map((test) => (
                <tr key={test.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-teal-300">{test.code}</td>
                  <td className="py-3.5 px-5 font-sans font-bold text-slate-100">{test.name}</td>
                  <td className="py-3.5 px-5 font-sans">
                    <span className="px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 text-[10px] font-bold">
                      {test.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-slate-300">{test.unit}</td>
                  <td className="py-3.5 px-5 text-slate-400">{test.refRangeMale}</td>
                  <td className="py-3.5 px-5 text-slate-400">{test.refRangeFemale}</td>
                  <td className="py-3.5 px-5 text-slate-300 font-bold">v{test.version}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD NEW DEPARTMENT MODAL */}
      {isDeptModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setIsDeptModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Tag className="w-5 h-5 text-sky-400" /> Create Clinical Department
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Add a new diagnostic department (e.g. Urology & Andrology, Molecular Genetics, Histopathology)
              </p>
            </div>

            <form onSubmit={handleAddDepartment} className="space-y-4 text-xs">
              {deptMsg && (
                <div className="p-3 bg-slate-950 border border-teal-500/30 rounded-xl text-teal-300 font-bold text-center">
                  {deptMsg}
                </div>
              )}

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Department / Category Name *</label>
                <input
                  type="text"
                  value={deptName}
                  onChange={(e) => setDeptName(e.target.value)}
                  required
                  placeholder="e.g. Urology & Andrology Genetics"
                  className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 font-bold focus:border-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description (Optional)</label>
                <textarea
                  rows={2}
                  value={deptDesc}
                  onChange={(e) => setDeptDesc(e.target.value)}
                  placeholder="Clinical scope and diagnostic battery details..."
                  className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 focus:border-teal-500 outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsDeptModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 font-semibold hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={deptLoading}
                  className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold transition-all shadow-lg flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  {deptLoading ? "Creating..." : "Save Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REGISTER CUSTOM TEST MODAL */}
      {isTestModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setIsTestModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-teal-400" /> Register Custom Diagnostic Test
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Configure code, reference intervals, and department mapping
              </p>
            </div>

            <form onSubmit={handleRegisterTest} className="space-y-4 text-xs">
              {testError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 font-semibold text-center">
                  ⚠️ {testError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Test Code *</label>
                  <input
                    type="text"
                    value={testForm.code}
                    onChange={(e) => setTestForm({ ...testForm, code: e.target.value.toUpperCase() })}
                    required
                    placeholder="e.g. URO-YDEL-AZFC"
                    className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-teal-300 font-mono font-bold focus:border-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Department *</label>
                  <select
                    value={testForm.category}
                    onChange={(e) => setTestForm({ ...testForm, category: e.target.value })}
                    className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 font-bold focus:border-teal-500 outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Analyte Name *</label>
                <input
                  type="text"
                  value={testForm.name}
                  onChange={(e) => setTestForm({ ...testForm, name: e.target.value })}
                  required
                  placeholder="e.g. Y-Chromosome Microdeletion (AZFc Locus)"
                  className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 font-bold focus:border-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Measurement Unit *</label>
                <input
                  type="text"
                  value={testForm.unit}
                  onChange={(e) => setTestForm({ ...testForm, unit: e.target.value })}
                  required
                  placeholder="e.g. PCR Qualitative or ng/dL"
                  className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 font-mono focus:border-teal-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Male Ref Interval *</label>
                  <input
                    type="text"
                    value={testForm.refRangeMale}
                    onChange={(e) => setTestForm({ ...testForm, refRangeMale: e.target.value })}
                    required
                    placeholder="e.g. No Deletion Detected"
                    className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 font-mono focus:border-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Female Ref Interval *</label>
                  <input
                    type="text"
                    value={testForm.refRangeFemale}
                    onChange={(e) => setTestForm({ ...testForm, refRangeFemale: e.target.value })}
                    required
                    placeholder="e.g. N/A"
                    className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 font-mono focus:border-teal-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsTestModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 font-semibold hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={testLoading}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-bold shadow-lg flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  {testLoading ? "Saving Test..." : "Save Test Definition"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
