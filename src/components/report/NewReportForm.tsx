"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ShieldCheck, Sparkles, FileText, User, Building2, FlaskConical, Award, CreditCard, MessageCircle } from "lucide-react";
import { generateRegistrationWhatsAppMessage } from "@/lib/whatsapp";
import { useLanguage } from "@/components/i18n/LanguageToggle";

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
  const { t } = useLanguage();
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || "");
  const [selectedBranchId, setSelectedBranchId] = useState(branches[0]?.id || "");
  const [notes, setNotes] = useState("Routine diagnostic wellness screening.");
  const [submitting, setSubmitting] = useState(false);

  // 2-Step Workflow Mode
  const [workflowStep, setWorkflowStep] = useState<"registration_only" | "full_results">("registration_only");

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
          status: workflowStep === "registration_only" ? "Processing" : "Authorized",
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
        // Automatic Server-Side & Client-Side WhatsApp Receipt Dispatch
        if (selectedPatient?.phone) {
          fetch("/api/reports/whatsapp-dispatch", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "registration",
              patientName: selectedPatient.fullName,
              patientPhone: selectedPatient.phone,
              mrn: selectedPatient.mrn,
              reportNumber: data.report.reportNumber,
              labName: "Apex Demo Diagnostics",
              paymentMode,
              paymentStatus,
              amountPaid,
            }),
          }).catch((err) => console.error("Background WhatsApp dispatch error:", err));

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
      {/* 2-STEP WORKFLOW MODE SELECTOR (Patient Registration vs Full Diagnostic Entry) */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-950/60 via-slate-900 to-sky-950/60 border border-teal-500/40 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-teal-400" />
            <h3 className="text-sm font-black text-slate-100 uppercase tracking-wider">Select Laboratory Workflow Mode</h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-teal-300 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/30">
            2-STEP CLINICAL WORKFLOW
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <button
            type="button"
            onClick={() => setWorkflowStep("registration_only")}
            className={`p-4 rounded-xl border text-left transition-all space-y-1.5 cursor-pointer ${
              workflowStep === "registration_only"
                ? "bg-teal-500/20 border-teal-400 text-teal-200 shadow-lg shadow-teal-500/10 ring-2 ring-teal-400/30"
                : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
            }`}
          >
            <div className="text-xs font-bold text-slate-100 flex items-center justify-between">
              <span>Step 1: Patient Sample Registration Only</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-300">Results Pending</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
              Register patient & booked tests when patient arrives. Sends WhatsApp Booking Receipt. Results will be uploaded later.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setWorkflowStep("full_results")}
            className={`p-4 rounded-xl border text-left transition-all space-y-1.5 cursor-pointer ${
              workflowStep === "full_results"
                ? "bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-lg shadow-emerald-500/10 ring-2 ring-emerald-400/30"
                : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
            }`}
          >
            <div className="text-xs font-bold text-slate-100 flex items-center justify-between">
              <span>Step 2: Full Entry (Results Ready Immediately)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Authorized</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
              Enter test values & reference ranges immediately. Authorizes report & dispatches WhatsApp Verified PDF Report.
            </p>
          </button>
        </div>
      </div>
      {/* WHO / UROLOGY SAMPLE TEMPLATES 1-CLICK LOADER */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-teal-950/40 via-slate-950 to-sky-950/40 border border-teal-500/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-teal-400" />
            <h3 className="text-sm font-bold text-slate-100">{t("loadWhoBattery")}</h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
            WHO Technical Reference Ranges
          </span>
        </div>
        <p className="text-xs text-slate-400">
          {t("loadWhoDesc")}
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
            <User className="w-4 h-4 text-teal-400" /> {t("selectPatientRecord")}
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
            <Building2 className="w-4 h-4 text-sky-400" /> {t("selectBranchRecord")}
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
            <CreditCard className="w-4 h-4 text-teal-400" /> {t("paymentBillingOptions")}
          </h3>
          <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            {t("autoWhatsappReceipt")}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">{t("paymentMethod")}</label>
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value as any)}
              className="w-full p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-100 font-bold focus:border-teal-500 outline-none"
            >
              <option value="Cash">{t("cashOption")}</option>
              <option value="Online">{t("onlineOption")}</option>
              <option value="Bank Transfer">{t("bankOption")}</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">{t("paymentStatusLabel")}</label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value as any)}
              className="w-full p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-100 font-bold focus:border-teal-500 outline-none"
            >
              <option value="Paid">{t("paidOption")}</option>
              <option value="Pending">{t("pendingOption")}</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">{t("totalFeeBilled")}</label>
            <input
              type="number"
              value={amountBilled}
              onChange={(e) => setAmountBilled(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-teal-300 font-mono font-bold focus:border-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">{t("amountPaidLabel")}</label>
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
              <FlaskConical className="w-4 h-4" /> {t("reportParameters")} ({parameters.length} Parameters)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {t("parameterDesc")}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddCustomParameter}
            className="px-3.5 py-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4 text-teal-400" /> {t("addCustomParameter")}
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
                  <label className="block text-[10px] text-slate-400 mb-1">{t("parameterName")}</label>
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
                  <label className="block text-[10px] text-slate-400 mb-1">{t("resultValueText")}</label>
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
                  <label className="block text-[10px] text-slate-400 mb-1">{t("unitLabel")}</label>
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
                  <label className="block text-[10px] text-slate-400 mb-1">{t("refInterval")}</label>
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
                  <label className="block text-[10px] text-slate-400 mb-1">{t("flagStatus")}</label>
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
          {t("cancel")}
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400 text-slate-950 font-black text-xs shadow-xl shadow-teal-500/20 hover:from-teal-300 hover:to-sky-300 transition-all flex items-center gap-2 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-slate-950" />
          <span>{submitting ? "Processing Booking..." : t("saveAndGenerate")}</span>
        </button>
      </div>
    </form>
  );
}
