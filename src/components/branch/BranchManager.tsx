"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Plus, Edit2, Trash2, MapPin, Phone, Mail, X, Check, ShieldCheck } from "lucide-react";

export interface BranchItem {
  id: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  email: string | null;
  isMain: boolean;
  reportsCount?: number;
}

export function BranchManager({ initialBranches }: { initialBranches: BranchItem[] }) {
  const router = useRouter();
  const [branches, setBranches] = useState<BranchItem[]>(initialBranches);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<BranchItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    address: "",
    phone: "",
    email: "",
    isMain: false,
  });

  function openCreateModal() {
    setEditingBranch(null);
    setFormData({
      name: "",
      code: "",
      address: "",
      phone: "",
      email: "",
      isMain: false,
    });
    setError(null);
    setIsModalOpen(true);
  }

  function openEditModal(branch: BranchItem) {
    setEditingBranch(branch);
    setFormData({
      name: branch.name,
      code: branch.code,
      address: branch.address,
      phone: branch.phone,
      email: branch.email || "",
      isMain: branch.isMain,
    });
    setError(null);
    setIsModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (editingBranch) {
        // PUT Update
        const res = await fetch(`/api/branches/${editingBranch.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok || data.error) {
          setError(data.error || "Failed to update branch.");
          setLoading(false);
          return;
        }

        // Update state
        setBranches(
          branches.map((b) =>
            b.id === editingBranch.id
              ? { ...b, ...formData, isMain: formData.isMain }
              : formData.isMain
              ? { ...b, isMain: false }
              : b
          )
        );
      } else {
        // POST Create
        const res = await fetch("/api/branches", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok || data.error) {
          setError(data.error || "Failed to create branch.");
          setLoading(false);
          return;
        }

        // Add to state
        setBranches([...branches, data.branch]);
      }

      setIsModalOpen(false);
      router.refresh();
    } catch (err: any) {
      setError("Network connection error.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this satellite branch?")) return;

    try {
      const res = await fetch(`/api/branches/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        alert(data.error || "Failed to delete branch.");
        return;
      }

      setBranches(branches.filter((b) => b.id !== id));
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="space-y-8">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-teal-400" />
            <span>Multi-Branch & Collection Center Network</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Register new satellite branch locations and update facility contact details
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-bold text-xs hover:from-teal-300 hover:to-sky-300 transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" /> Register New Branch
        </button>
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <div key={branch.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl relative">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-teal-400">{branch.code}</span>
                <h2 className="text-lg font-bold text-slate-100">{branch.name}</h2>
              </div>

              {branch.isMain ? (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20 uppercase">
                  Main Facility
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700 uppercase">
                  Satellite Hub
                </span>
              )}
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>{branch.address}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-mono">{branch.phone}</span>
              </div>

              {branch.email && (
                <div className="flex items-center gap-2 text-slate-400">
                  <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="truncate">{branch.email}</span>
                </div>
              )}
            </div>

            {/* Edit / Delete Bar */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <button
                onClick={() => openEditModal(branch)}
                className="text-teal-400 hover:text-teal-300 font-bold flex items-center gap-1.5 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit Details
              </button>

              {!branch.isMain && (
                <button
                  onClick={() => handleDelete(branch.id)}
                  className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CREATE / EDIT BRANCH MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-xl font-bold text-slate-100">
                {editingBranch ? "Edit Satellite Branch Details" : "Register New Laboratory Branch"}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Configure facility location, phone contact, and main branch status
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {error && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 font-semibold text-center">
                  ⚠️ {error}
                </div>
              )}

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Branch Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="e.g. Austin Downtown Collection Center"
                  className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 font-bold focus:border-teal-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Branch Code (Unique) *</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    required
                    placeholder="e.g. ATX-02"
                    className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 font-mono font-bold focus:border-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Facility Phone *</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    placeholder="+1 (555) 300-9900"
                    className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 font-mono focus:border-teal-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Street Address *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                  placeholder="200 Congress Ave, Suite 100, Austin TX"
                  className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 focus:border-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Branch Contact Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="austin@apexdiagnostics.com"
                  className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 focus:border-teal-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isMainToggle"
                  checked={formData.isMain}
                  onChange={(e) => setFormData({ ...formData, isMain: e.target.checked })}
                  className="w-4 h-4 rounded accent-teal-500 cursor-pointer"
                />
                <label htmlFor="isMainToggle" className="text-slate-300 font-semibold cursor-pointer">
                  Mark as Primary Headquarters Facility
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 font-semibold hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-bold shadow-lg shadow-teal-500/20 hover:from-teal-300 hover:to-sky-300 transition-all flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  {loading ? "Saving Branch..." : editingBranch ? "Update Branch Details" : "Register Branch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
