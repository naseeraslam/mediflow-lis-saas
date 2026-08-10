"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users, Plus, Search, UserPlus, FileText, Phone, Mail, Calendar, MapPin, X, Check, ShieldCheck, Edit3, Trash2 } from "lucide-react";

export interface PatientItem {
  id: string;
  mrn: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string | null;
  address: string | null;
  reportsCount: number;
}

export function PatientManager({ initialPatients }: { initialPatients: PatientItem[] }) {
  const router = useRouter();
  const [patients, setPatients] = useState<PatientItem[]>(initialPatients);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<PatientItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    id: "",
    fullName: "",
    dateOfBirth: "",
    gender: "Male",
    phone: "",
    email: "",
    address: "",
    mrn: "",
  });

  const filteredPatients = patients.filter(
    (p) =>
      p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.mrn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery)
  );

  function openCreateModal() {
    setEditingPatient(null);
    setFormData({
      id: "",
      fullName: "",
      dateOfBirth: "",
      gender: "Male",
      phone: "",
      email: "",
      address: "",
      mrn: "",
    });
    setError(null);
    setIsModalOpen(true);
  }

  function openEditModal(patient: PatientItem) {
    setEditingPatient(patient);
    setFormData({
      id: patient.id,
      fullName: patient.fullName,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email || "",
      address: patient.address || "",
      mrn: patient.mrn,
    });
    setError(null);
    setIsModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const isEdit = !!editingPatient;
    const url = "/api/patients";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || `Failed to ${isEdit ? "update" : "register"} patient.`);
        setLoading(false);
        return;
      }

      if (isEdit) {
        setPatients(
          patients.map((p) => (p.id === data.patient.id ? { ...data.patient, reportsCount: p.reportsCount } : p))
        );
      } else {
        setPatients([{ ...data.patient, reportsCount: 0 }, ...patients]);
      }

      setIsModalOpen(false);
      router.refresh();
    } catch (err: any) {
      setError("Network connection error.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(patient: PatientItem) {
    if (!confirm(`Are you sure you want to delete patient "${patient.fullName}" (${patient.mrn})? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/patients?id=${patient.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        alert(data.error || "Failed to delete patient.");
        return;
      }

      setPatients(patients.filter((p) => p.id !== patient.id));
      router.refresh();
    } catch (err) {
      alert("Failed to delete patient record.");
    }
  }

  const [merging, setMerging] = useState(false);
  const [mergeStatus, setMergeStatus] = useState<string | null>(null);

  async function handleMergeDuplicates() {
    if (!confirm("Are you sure you want to merge all duplicate patient profiles sharing the same phone number into single master profiles?")) {
      return;
    }

    setMerging(true);
    setMergeStatus(null);

    try {
      const res = await fetch("/api/patients/merge", { method: "POST" });
      const data = await res.json();

      if (data.success) {
        setMergeStatus(`✅ ${data.message}`);
        setTimeout(() => setMergeStatus(null), 5000);
        router.refresh();
        window.location.reload();
      } else {
        alert(data.error || "Failed to merge duplicate records.");
      }
    } catch (err) {
      alert("Network error during patient merge.");
    } finally {
      setMerging(false);
    }
  }

  return (
    <div className="space-y-8">
      {mergeStatus && (
        <div className="p-4 bg-teal-500/10 border border-teal-500/30 rounded-xl text-teal-700 dark:text-teal-300 text-xs font-bold flex items-center justify-between">
          <span>{mergeStatus}</span>
          <button onClick={() => setMergeStatus(null)} className="text-teal-500 hover:text-teal-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Users className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <span>Patients Master Registry</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
            Register new patients, edit demographic details, assign Medical Record Numbers (MRN), and view historical diagnostic reports
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleMergeDuplicates}
            disabled={merging}
            className="px-3.5 py-2.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-800 dark:text-teal-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Users className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            {merging ? "Merging Duplicates..." : "🔀 Merge Duplicates by Phone"}
          </button>

          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-black text-xs hover:from-teal-300 hover:to-sky-300 transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <UserPlus className="w-4 h-4 fill-slate-950" /> Register New Patient
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patients by Full Name, MRN Number, or Phone..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:border-teal-500 outline-none font-medium"
          />
        </div>
        <div className="text-xs text-slate-600 dark:text-slate-400 px-2 hidden sm:block font-bold">
          Showing <strong className="text-slate-900 dark:text-slate-200">{filteredPatients.length}</strong> Patients
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-extrabold uppercase tracking-wider text-[10px] bg-slate-100 dark:bg-slate-950/80">
                <th className="py-3.5 px-5">MRN Number</th>
                <th className="py-3.5 px-5">Patient Name</th>
                <th className="py-3.5 px-5">Gender</th>
                <th className="py-3.5 px-5">Date of Birth</th>
                <th className="py-3.5 px-5">Phone Number</th>
                <th className="py-3.5 px-5">Reports Count</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 font-mono">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-5 font-black text-teal-700 dark:text-teal-300">{patient.mrn}</td>
                  <td className="py-3.5 px-5 font-sans font-black text-slate-900 dark:text-slate-100 text-sm">{patient.fullName}</td>
                  <td className="py-3.5 px-5 text-slate-700 dark:text-slate-300 font-sans">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                      patient.gender === "Male"
                        ? "bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20"
                        : "bg-pink-500/10 text-pink-700 dark:text-pink-400 border border-pink-500/20"
                    }`}>
                      {patient.gender}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-slate-600 dark:text-slate-400 font-sans font-medium">{patient.dateOfBirth}</td>
                  <td className="py-3.5 px-5 text-slate-800 dark:text-slate-200 font-semibold">{patient.phone}</td>
                  <td className="py-3.5 px-5 font-sans">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-teal-700 dark:text-teal-300 border border-slate-300 dark:border-slate-700">
                      {patient.reportsCount} Reports
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right font-sans space-x-3">
                    <button
                      onClick={() => openEditModal(patient)}
                      className="p-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30 transition-colors cursor-pointer inline-flex items-center gap-1 text-xs font-bold"
                      title="Edit Patient Details"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </button>

                    <button
                      onClick={() => handleDelete(patient)}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-500/30 transition-colors cursor-pointer inline-flex items-center gap-1 text-xs font-bold"
                      title="Delete Patient Record"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>

                    <Link
                      href={`/app/comparison?patientId=${patient.id}`}
                      className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-500 underline"
                    >
                      Compare Visits
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* REGISTER / EDIT PATIENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative text-slate-900 dark:text-slate-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <span>{editingPatient ? "Edit Patient Record" : "Register New Patient"}</span>
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                {editingPatient ? "Update patient demographic details" : "Enter demographic details to generate MRN and initialize patient record"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {error && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-600 dark:text-rose-300 font-semibold text-center">
                  ⚠️ {error}
                </div>
              )}

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Patient Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  placeholder="e.g. Tariq Mehmood"
                  className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold focus:border-teal-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold focus:border-teal-500 outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold focus:border-teal-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Phone Number *</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    placeholder="+92 300 1234567"
                    className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono font-bold focus:border-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">MRN Number</label>
                  <input
                    type="text"
                    value={formData.mrn}
                    onChange={(e) => setFormData({ ...formData, mrn: e.target.value })}
                    placeholder="Auto-generated if blank"
                    className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-800 text-teal-700 dark:text-teal-300 font-mono font-bold focus:border-teal-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="patient@example.com"
                  className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:border-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Residential Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street 14, Sector F-8/3, Islamabad"
                  className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:border-teal-500 outline-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-400 font-bold hover:bg-slate-200 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-black shadow-lg shadow-teal-500/20 hover:from-teal-300 hover:to-sky-300 transition-all flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  {loading ? "Saving..." : editingPatient ? "Save Changes" : "Register Patient"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
