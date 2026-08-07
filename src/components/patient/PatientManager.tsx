"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users, Plus, Search, UserPlus, FileText, Phone, Mail, Calendar, MapPin, X, Check, ShieldCheck } from "lucide-react";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Failed to register patient.");
        setLoading(false);
        return;
      }

      setPatients([{ ...data.patient, reportsCount: 0 }, ...patients]);
      setIsModalOpen(false);
      setFormData({
        fullName: "",
        dateOfBirth: "",
        gender: "Male",
        phone: "",
        email: "",
        address: "",
        mrn: "",
      });
      router.refresh();
    } catch (err: any) {
      setError("Network connection error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Users className="w-6 h-6 text-teal-400" />
            <span>Patients Master Registry</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Register new patients, assign Medical Record Numbers (MRN), and view historical diagnostic reports
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-bold text-xs hover:from-teal-300 hover:to-sky-300 transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 shrink-0"
        >
          <UserPlus className="w-4 h-4 fill-slate-950" /> Register New Patient
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex items-center gap-4 bg-slate-900 p-3 rounded-2xl border border-slate-800 shadow-xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patients by Full Name, MRN Number, or Phone..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 text-xs focus:border-teal-500 outline-none"
          />
        </div>
        <div className="text-xs text-slate-400 px-2 hidden sm:block">
          Showing <strong className="text-slate-200">{filteredPatients.length}</strong> Patients
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px] bg-slate-950/80">
                <th className="py-3.5 px-5">MRN Number</th>
                <th className="py-3.5 px-5">Patient Name</th>
                <th className="py-3.5 px-5">Gender</th>
                <th className="py-3.5 px-5">Date of Birth</th>
                <th className="py-3.5 px-5">Phone Number</th>
                <th className="py-3.5 px-5">Reports Count</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-teal-300">{patient.mrn}</td>
                  <td className="py-3.5 px-5 font-sans font-bold text-slate-100 text-sm">{patient.fullName}</td>
                  <td className="py-3.5 px-5 text-slate-300 font-sans">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      patient.gender === "Male"
                        ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                        : "bg-pink-500/10 text-pink-400 border border-pink-500/20"
                    }`}>
                      {patient.gender}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-slate-400 font-sans">{patient.dateOfBirth}</td>
                  <td className="py-3.5 px-5 text-slate-200">{patient.phone}</td>
                  <td className="py-3.5 px-5 font-sans">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-teal-300 border border-slate-700">
                      {patient.reportsCount} Reports
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right font-sans space-x-3">
                    <Link
                      href={`/app/comparison?patientId=${patient.id}`}
                      className="text-xs font-semibold text-teal-400 hover:text-teal-300 underline"
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

      {/* REGISTER NEW PATIENT MODAL */}
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
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-teal-400" /> Register New Patient
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter demographic details to generate MRN and initialize patient record
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {error && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 font-semibold text-center">
                  ⚠️ {error}
                </div>
              )}

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Patient Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  placeholder="e.g. Tariq Mehmood"
                  className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 font-bold focus:border-teal-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 focus:border-teal-500 outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 focus:border-teal-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone Number *</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    placeholder="+92 300 1234567"
                    className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 font-mono focus:border-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">MRN Number (Optional)</label>
                  <input
                    type="text"
                    value={formData.mrn}
                    onChange={(e) => setFormData({ ...formData, mrn: e.target.value })}
                    placeholder="Auto-generated if blank"
                    className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-teal-300 font-mono focus:border-teal-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="patient@example.com"
                  className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 focus:border-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Residential Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street 14, Sector F-8/3, Islamabad"
                  className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 focus:border-teal-500 outline-none"
                />
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
                  {loading ? "Registering..." : "Register Patient"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
