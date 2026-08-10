"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ShieldCheck, Sparkles, Check, FileText, User, Building2, FlaskConical, Award, CreditCard, DollarSign, MessageCircle } from "lucide-react";
import { generateRegistrationWhatsAppMessage } from "@/lib/whatsapp";

export interface PatientOpt {
  id: string;
  fullName: string;
  mrn: string;
  gender: string;
  dateOfBirth: string;
  phone?: string;
}

export interface BranchOpt {
  id: string;
  name: string;
  code: string;
}

export interface TestOpt {
  id: string;
  code: string;
  name: string;
  category: string;
  unit: string;
  refRangeMale: string;
  refRangeFemale: string;
  minValue: number | null;
  maxValue: number | null;
}

// WHO & Urology Pre-loaded Standard Sample Templates
const WHO_SAMPLE_TEMPLATES = [
  {
    name: "Urology Y-Chromosome Semen Microdeletion Panel",
    code: "URO-YDEL",
    source: "WHO & Urology Molecular Genetics Standard",
    items: [
      { testName: "Y-Chromosome Microdeletion (AZFa Locus)", unit: "PCR", refRange: "No Deletion Detected", numericValue: "", stringValue: "No Deletion (Normal)", flag: "Normal" },
      { testName: "Y-Chromosome Microdeletion (AZFb Locus)", unit: "PCR", refRange: "No Deletion Detected", numericValue: "", stringValue: "No Deletion (Normal)", flag: "Normal" },
      { testName: "Y-Chromosome Microdeletion (AZFc Locus)", unit: "PCR", refRange: "No Deletion Detected", numericValue: "", stringValue: "No Deletion (Normal)", flag: "Normal" },
      { testName: "Sperm Concentration", unit: "M/mL", refRange: "≥ 16.0 M/mL (WHO)", numericValue: "24.5", stringValue: "", flag: "Normal" },
      { testName: "Sperm DNA Fragmentation Index (DFI)", unit: "%", refRange: "< 15.0%", numericValue: "11.2", stringValue: "", flag: "Normal" },
      { testName: "Serum Total Testosterone", unit: "ng/dL", refRange: "300 - 1000 (WHO)", numericValue: "580", stringValue: "", flag: "Normal" },
    ],
  },
  {
    name: "WHO Standard Hematology (CBC) Battery",
    code: "WHO-CBC",
    source: "WHO Technical Report Series No. 1042",
    items: [
      { testName: "White Blood Cells (WBC)", unit: "x10^3/uL", refRange: "4.5 - 11.0 (WHO)", numericValue: "6.8", stringValue: "", flag: "Normal" },
      { testName: "Red Blood Cells (RBC)", unit: "x10^6/uL", refRange: "4.3 - 5.9 (WHO)", numericValue: "4.8", stringValue: "", flag: "Normal" },
      { testName: "Hemoglobin (HGB)", unit: "g/dL", refRange: "13.8 - 17.2 (WHO)", numericValue: "15.1", stringValue: "", flag: "Normal" },
      { testName: "Platelets (PLT)", unit: "x10^3/uL", refRange: "150 - 450 (WHO)", numericValue: "240", stringValue: "", flag: "Normal" },
    ],
  },
  {
    name: "WHO Metabolic & Glycemic Panel (Diabetes)",
    code: "WHO-GLU",
    source: "WHO Global Diabetes Diagnostic Standard",
    items: [
      { testName: "Fasting Blood Glucose", unit: "mg/dL", refRange: "70 - 99 (WHO)", numericValue: "112", stringValue: "", flag: "High" },
      { testName: "HbA1c (Glycated Hemoglobin)", unit: "%", refRange: "< 5.7 (WHO Normal)", numericValue: "6.2", stringValue: "", flag: "High" },
      { testName: "Serum Creatinine", unit: "mg/dL", refRange: "0.74 - 1.35 (WHO)", numericValue: "0.95", stringValue: "", flag: "Normal" },
      { testName: "Blood Urea Nitrogen (BUN)", unit: "mg/dL", refRange: "7 - 20 (WHO)", numericValue: "14", stringValue: "", flag: "Normal" },
    ],
  },
  {
    name: "WHO Lipid Profile & Cardiovascular Battery",
    code: "WHO-LIPID",
    source: "WHO Cardiovascular Risk Guidelines",
    items: [
      { testName: "Total Cholesterol", unit: "mg/dL", refRange: "< 200 (WHO)", numericValue: "215", stringValue: "", flag: "High" },
      { testName: "HDL Cholesterol (Good)", unit: "mg/dL", refRange: "> 40 (WHO)", numericValue: "45", stringValue: "", flag: "Normal" },
      { testName: "LDL Cholesterol (Bad)", unit: "mg/dL", refRange: "< 100 (WHO)", numericValue: "138", stringValue: "", flag: "High" },
      { testName: "Triglycerides", unit: "mg/dL", refRange: "< 150 (WHO)", numericValue: "160", stringValue: "", flag: "High" },
    ],
  },
];

export function NewReportForm({
  patients,
  branches,
  testCatalog,
}: {
  patients: PatientOpt[];
  branches: BranchOpt[];
  testCatalog: TestOpt[];
}) {
  const router = useRouter();
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || "");
  const [selectedBranchId, setSelectedBranchId] = useState(branches[0]?.id || "");
  const [notes, setNotes] = useState("Routine diagnostic wellness screening.");
  const [submitting, setSubmitting] = useState(false);

  // Billing & Payment State
  const [paymentMode, setPaymentMode] = useState<"Cash" | "Online" | "Bank Transfer">("Cash");
  const [paymentStatus, setPaymentStatus] = useState<"Paid" | "Pending">("Paid");
  const [amountBilled, setAmountBilled] = useState<number>(3500);
  const [amountPaid, setAmountPaid] = useState<number>(3500);

  // Dynamic parameters array
  const [parameters, setParameters] = useState<
    Array<{
      testId: string;
      testName: string;
      unit: string;
      refRange: string;
      numericValue: string;
      stringValue: string;
      flag: string;
    }>
  >(
    testCatalog.slice(0, 4).map((t) => ({
      testId: t.id,
      testName: t.name,
      unit: t.unit,
      refRange: t.refRangeMale,
      numericValue: t.minValue ? String(t.minValue + 1) : "10",
      stringValue: "",
      flag: "Normal",
    }))
  );

  // Selected Patient Details
  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  // 1-Click Load WHO / Urology Sample Template
  function loadWHOTemplate(tmplCode: string) {
    const tmpl = WHO_SAMPLE_TEMPLATES.find((t) => t.code === tmplCode);
    if (!tmpl) return;

    const loaded = tmpl.items.map((item) => {
      const match = testCatalog.find((tc) => tc.name.toLowerCase().includes(item.testName.toLowerCase()));
      return {
        testId: match ? match.id : testCatalog[0]?.id || "",
        testName: item.testName,
        unit: item.unit,
        refRange: item.refRange,
        numericValue: item.numericValue,
        stringValue: item.stringValue || "",
        flag: item.flag,
      };
    });

    setParameters(loaded);
  }

  // Add Dynamic Custom Parameter
  function handleAddCustomParameter() {
    setParameters([
      ...parameters,
      {
        testId: testCatalog[0]?.id || "",
        testName: `Custom Parameter ${parameters.length + 1}`,
        unit: "mg/dL",
        refRange: "70 - 110 (WHO Standard)",
        numericValue: "100",
        stringValue: "",
        flag: "Normal",
      },
    ]);
  }

  // Remove Parameter
  function handleRemoveParameter(index: number) {
    setParameters(parameters.filter((_, i) => i !== index));
  }

  // Update Parameter Row
  function handleUpdateParameter(index: number, field: string, value: string) {
    const copy = [...parameters];
    (copy[index] as any)[field] = value;
    setParameters(copy);
  }

  // Submit Form & Trigger WhatsApp Booking Receipt
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: selectedPatientId,
          branchId: selectedBranchId,
          notes: `${notes} [Payment: ${paymentMode} - ${paymentStatus} (${amountPaid} PKR)]`,
          testResults: parameters.map((p) => ({
            testId: p.testId,
            testName: p.testName,
            unit: p.unit,
            refRange: p.refRange,
            numericValue: p.numericValue !== "" ? Number(p.numericValue) : null,
            stringValue: p.stringValue || null,
            flag: p.flag,
          })),
        }),
      });

      const data = await res.json();
      if (data.success && data.report) {
        // Automatic WhatsApp Receipt Prompt
        if (selectedPatient?.phone) {
          const { whatsappUrl } = generateRegistrationWhatsAppMessage({
            patientName: selectedPatient.fullName,
            patientPhone: selectedPatient.phone,
            mrn: selectedPatient.mrn,
            reportNumber: data.report.reportNumber,
            labName: "Apex Demo Diagnostics",
            paymentMode,
            paymentStatus,
            amountPaid,
            currency: "PKR",
          });
          // Auto Open WhatsApp dispatch tab
          window.open(whatsappUrl, "_blank");
        }

        router.push(`/app/reports/${data.report.id}`);
      }
    } catch (err) {
      console.error("Submit Error:", err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-slate-100">
      {/* WHO / UROLOGY SAMPLE TEMPLATES 1-CLICK LOADER */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-teal-950/40 via-slate-950 to-sky-950/40 border border-teal-500/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-teal-400" />
            <h3 className="text-sm font-bold text-slate-100">Load Urology & WHO Accredited Sample Battery (1-Click)</h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
            WHO Technical Reference Ranges
          </span>
        </div>
        <p className="text-xs text-slate-400">
          Click any Urology or WHO clinical template below to populate diagnostic parameters and reference ranges:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {WHO_SAMPLE_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.code}
              type="button"
              onClick={() => loadWHOTemplate(tmpl.code)}
              className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-teal-500/50 text-left transition-all space-y-1 group"
            >
              <div className="text-xs font-bold text-slate-200 group-hover:text-teal-300 flex items-center justify-between">
                <span className="truncate max-w-[170px]">{tmpl.name}</span>
                <Sparkles className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              </div>
              <div className="text-[10px] text-slate-400 font-mono truncate">{tmpl.source}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Patient & Branch Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <User className="w-4 h-4 text-teal-400" /> Select Patient Record *
          </label>
          <select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            required
            className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 font-semibold focus:border-teal-500 outline-none"
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.fullName} ({p.mrn}) — {p.gender}, DOB: {p.dateOfBirth}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-sky-400" /> Select Facility Branch *
          </label>
          <select
            value={selectedBranchId}
            onChange={(e) => setSelectedBranchId(e.target.value)}
            required
            className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 font-semibold focus:border-teal-500 outline-none"
          >
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* PAYMENT & BILLING OPTIONS (Cash, Online, Bank Transfer) */}
      <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-xs font-black text-teal-400 uppercase tracking-wider flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-teal-400" /> Payment & Billing Options (Cash / Online / Bank)
          </h3>
          <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            AUTO WHATSAPP RECEIPT ACTIVE 📲
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Payment Method</label>
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value as any)}
              className="w-full p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-100 font-bold focus:border-teal-500 outline-none"
            >
              <option value="Cash">💵 Cash</option>
              <option value="Online">💳 Online / Card / JazzCash</option>
              <option value="Bank Transfer">🏦 Bank Transfer</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Payment Status</label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value as any)}
              className="w-full p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-100 font-bold focus:border-teal-500 outline-none"
            >
              <option value="Paid">✅ Paid</option>
              <option value="Pending">⏳ Pending Payment</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Total Fee Billed (PKR)</label>
            <input
              type="number"
              value={amountBilled}
              onChange={(e) => setAmountBilled(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-teal-300 font-mono font-bold focus:border-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Amount Paid (PKR)</label>
            <input
              type="number"
              value={amountPaid}
              onChange={(e) => setAmountPaid(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-emerald-400 font-mono font-bold focus:border-teal-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* DYNAMIC PARAMETERS ENTRY BATTERY */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-teal-400 uppercase tracking-wider flex items-center gap-2">
              <FlaskConical className="w-4 h-4" /> Report Parameter Battery ({parameters.length} Parameters)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Add custom test parameters dynamically or edit measurement units and WHO reference intervals
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddCustomParameter}
            className="px-3.5 py-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4 text-teal-400" /> Add Custom Parameter
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
                    onClick={() => handleRemoveParameter(index)}
                    className="text-rose-400 hover:text-rose-300 text-xs font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                {/* Parameter Name */}
                <div className="sm:col-span-4">
                  <label className="block text-[10px] text-slate-400 mb-1">Parameter / Analyte Name</label>
                  <input
                    type="text"
                    value={param.testName}
                    onChange={(e) => handleUpdateParameter(index, "testName", e.target.value)}
                    required
                    placeholder="Parameter Name"
                    className="w-full p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-slate-100 font-semibold focus:border-teal-500 outline-none text-xs"
                  />
                </div>

                {/* Result Value */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] text-slate-400 mb-1">Result Value / Text</label>
                  <input
                    type="text"
                    value={param.numericValue || param.stringValue}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (!isNaN(Number(val)) && val.trim() !== "") {
                        handleUpdateParameter(index, "numericValue", val);
                        handleUpdateParameter(index, "stringValue", "");
                      } else {
                        handleUpdateParameter(index, "numericValue", "");
                        handleUpdateParameter(index, "stringValue", val);
                      }
                    }}
                    placeholder="Value (e.g. 24.5 or Normal)"
                    className="w-full p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-slate-100 font-bold font-mono focus:border-teal-500 outline-none text-xs"
                  />
                </div>

                {/* Unit */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] text-slate-400 mb-1">Unit</label>
                  <input
                    type="text"
                    value={param.unit}
                    onChange={(e) => handleUpdateParameter(index, "unit", e.target.value)}
                    placeholder="Unit"
                    className="w-full p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 font-mono focus:border-teal-500 outline-none text-xs"
                  />
                </div>

                {/* Reference Range */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] text-slate-400 mb-1">Ref Interval (WHO)</label>
                  <input
                    type="text"
                    value={param.refRange}
                    onChange={(e) => handleUpdateParameter(index, "refRange", e.target.value)}
                    placeholder="Ref Range"
                    className="w-full p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 font-mono focus:border-teal-500 outline-none text-xs"
                  />
                </div>

                {/* Flag */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] text-slate-400 mb-1">Flag Status</label>
                  <select
                    value={param.flag}
                    onChange={(e) => handleUpdateParameter(index, "flag", e.target.value)}
                    className="w-full p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-slate-200 font-bold focus:border-teal-500 outline-none text-xs"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High ↑</option>
                    <option value="Low">Low ↓</option>
                    <option value="Critical">Critical ⚠️</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
        <button
          type="button"
          onClick={() => router.push("/app/reports")}
          className="px-5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs font-semibold hover:bg-slate-800 transition-colors"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400 text-slate-950 font-black text-xs shadow-xl shadow-teal-500/20 hover:from-teal-300 hover:to-sky-300 transition-all flex items-center gap-2 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-slate-950" />
          <span>{submitting ? "Processing Booking..." : "Save Report & Dispatch Auto WhatsApp Receipt 📲"}</span>
        </button>
      </div>
    </form>
  );
}
