"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ShieldCheck, Sparkles, FileText, User, Building2, FlaskConical, Award, CreditCard, MessageCircle, X } from "lucide-react";
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

export interface DoctorOpt {
  id: string;
  name: string;
  specialty?: string | null;
}

export function NewReportForm({
  patients,
  branches,
  testCatalog,
  doctors = [],
}: {
  patients: PatientOpt[];
  branches: BranchOpt[];
  testCatalog: TestOpt[];
  doctors?: DoctorOpt[];
}) {
  const router = useRouter();
  const { t } = useLanguage();

  // Dynamic Patients State (Allows instant inline patient registration on the fly!)
  const [localPatients, setLocalPatients] = useState<PatientOpt[]>(patients);
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || "");
  const [showNewPatientModal, setShowNewPatientModal] = useState(false);
  const [newPatientForm, setNewPatientForm] = useState({
    fullName: "",
    phone: "",
    gender: "Male",
    dateOfBirth: "1990-01-01",
    address: "",
  });
  const [registeringPatient, setRegisteringPatient] = useState(false);
  const [patientModalError, setPatientModalError] = useState<string | null>(null);

  const [selectedBranchId, setSelectedBranchId] = useState(branches[0]?.id || "");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(doctors[0]?.id || "");
  const [customDoctorName, setCustomDoctorName] = useState<string>("");
  const [isCustomDoctor, setIsCustomDoctor] = useState<boolean>(false);
  const [notes, setNotes] = useState("Routine diagnostic wellness screening.");
  const [submitting, setSubmitting] = useState(false);

  // 2-Step Workflow Mode
  const [workflowStep, setWorkflowStep] = useState<"registration_only" | "full_results">("registration_only");

  // Dynamic Catalog State (Allows adding new tests to master catalog on the fly!)
  const [localCatalog, setLocalCatalog] = useState<TestOpt[]>(testCatalog);
  const [showNewTestModal, setShowNewTestModal] = useState(false);
  const [newTestForm, setNewTestForm] = useState({
    code: "",
    name: "",
    category: "Clinical Biochemistry",
    unit: "mg/dL",
    refRangeMale: "0.5 - 1.2 mg/dL",
    refRangeFemale: "0.5 - 1.2 mg/dL",
  });
  const [creatingTest, setCreatingTest] = useState(false);
  const [testModalError, setTestModalError] = useState<string | null>(null);

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
  const selectedPatient = localPatients.find((p) => p.id === selectedPatientId) || localPatients[0];

  // 1-Click Load WHO / Urology Sample Template
  function loadWHOTemplate(tmplCode: string) {
    const tmpl = WHO_SAMPLE_TEMPLATES.find((t) => t.code === tmplCode);
    if (!tmpl) return;

    const loaded = tmpl.items.map((item) => {
      const match = localCatalog.find((tc) => tc.name.toLowerCase().includes(item.testName.toLowerCase()));
      return {
        testId: match?.id || `custom-${item.testName}`,
        testName: item.testName,
        unit: item.unit,
        refRange: item.refRange,
        numericValue: item.numericValue,
        stringValue: item.stringValue,
        flag: item.flag,
      };
    });

    setParameters(loaded);
  }

  // Create New Test in Master Catalog dynamically
  async function handleCreateNewMasterTest(e: React.FormEvent) {
    e.preventDefault();
    setCreatingTest(true);
    setTestModalError(null);

    try {
      const res = await fetch("/api/tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTestForm),
      });
      const data = await res.json();

      if (data.success && data.test) {
        const createdTest: TestOpt = {
          id: data.test.id,
          code: data.test.code,
          name: data.test.name,
          category: data.test.category,
          unit: data.test.unit,
          refRangeMale: data.test.refRangeMale,
          refRangeFemale: data.test.refRangeFemale,
          minValue: data.test.minValue,
          maxValue: data.test.maxValue,
        };

        setLocalCatalog((prev) => [createdTest, ...prev]);

        // Auto add to parameters array
        setParameters((prev) => [
          ...prev,
          {
            testId: createdTest.id,
            testName: createdTest.name,
            unit: createdTest.unit,
            refRange: createdTest.refRangeMale,
            numericValue: "",
            stringValue: "",
            flag: "Normal",
          },
        ]);

        setShowNewTestModal(false);
        setNewTestForm({
          code: "",
          name: "",
          category: "Clinical Biochemistry",
          unit: "mg/dL",
          refRangeMale: "0.5 - 1.2 mg/dL",
          refRangeFemale: "0.5 - 1.2 mg/dL",
        });
      } else {
        setTestModalError(data.error || "Failed to create new test.");
      }
    } catch (err: any) {
      setTestModalError("Network error. Please try again.");
    } finally {
      setCreatingTest(false);
    }
  }

  // Quick Register New Patient dynamically
  async function handleQuickRegisterPatient(e: React.FormEvent) {
    e.preventDefault();
    setRegisteringPatient(true);
    setPatientModalError(null);

    try {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPatientForm),
      });
      const data = await res.json();

      if (data.success && data.patient) {
        const createdPatient: PatientOpt = {
          id: data.patient.id,
          fullName: data.patient.fullName,
          mrn: data.patient.mrn,
          gender: data.patient.gender,
          dateOfBirth: data.patient.dateOfBirth,
          phone: data.patient.phone,
        };

        setLocalPatients((prev) => [createdPatient, ...prev]);
        setSelectedPatientId(createdPatient.id);
        setShowNewPatientModal(false);
        setNewPatientForm({
          fullName: "",
          phone: "",
          gender: "Male",
          dateOfBirth: "1990-01-01",
          address: "",
        });
      } else {
        setPatientModalError(data.error || "Failed to register patient.");
      }
    } catch (err: any) {
      setPatientModalError("Network error. Please try again.");
    } finally {
      setRegisteringPatient(false);
    }
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
          doctorId: isCustomDoctor ? null : selectedDoctorId,
          referringDoctorName: isCustomDoctor ? customDoctorName : "",
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
    <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-900 dark:text-slate-100">
      {/* 2-STEP WORKFLOW MODE SELECTOR (Patient Registration vs Full Diagnostic Entry) */}
      <div className="p-5 rounded-2xl bg-teal-50/80 dark:bg-slate-950/90 border border-teal-200 dark:border-teal-500/40 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider">Select Laboratory Workflow Mode</h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-teal-800 dark:text-teal-300 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/30">
            2-STEP CLINICAL WORKFLOW
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <button
            type="button"
            onClick={() => setWorkflowStep("registration_only")}
            className={`p-4 rounded-xl border text-left transition-all space-y-1.5 cursor-pointer ${
              workflowStep === "registration_only"
                ? "bg-teal-500/10 dark:bg-teal-500/20 border-teal-500 text-teal-950 dark:text-teal-200 shadow-md ring-2 ring-teal-500/30"
                : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
            }`}
          >
            <div className="text-xs font-extrabold text-slate-900 dark:text-slate-100 flex items-center justify-between">
              <span>Step 1: Patient Sample Registration Only</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-800 dark:text-teal-300">Results Pending</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Register patient & booked tests when patient arrives. Sends WhatsApp Booking Receipt. Results will be uploaded later.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setWorkflowStep("full_results")}
            className={`p-4 rounded-xl border text-left transition-all space-y-1.5 cursor-pointer ${
              workflowStep === "full_results"
                ? "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500 text-emerald-950 dark:text-emerald-200 shadow-md ring-2 ring-emerald-500/30"
                : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
            }`}
          >
            <div className="text-xs font-extrabold text-slate-900 dark:text-slate-100 flex items-center justify-between">
              <span>Step 2: Full Entry (Results Ready Immediately)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">Authorized</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Enter test values & reference ranges immediately. Authorizes report & dispatches WhatsApp Verified PDF Report.
            </p>
          </button>
        </div>
      </div>

      {/* WHO / UROLOGY SAMPLE TEMPLATES 1-CLICK LOADER */}
      <div className="p-5 rounded-xl bg-sky-50/80 dark:bg-slate-950/90 border border-sky-200 dark:border-sky-500/30 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{t("loadWhoBattery")}</h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-sky-800 dark:text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
            WHO Technical Reference Ranges
          </span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
          {t("loadWhoDesc")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {WHO_SAMPLE_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.code}
              type="button"
              onClick={() => loadWHOTemplate(tmpl.code)}
              className="p-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-teal-500 text-left transition-all space-y-1 group shadow-sm"
            >
              <div className="text-xs font-bold text-slate-900 dark:text-slate-200 group-hover:text-teal-600 dark:group-hover:text-teal-300 flex items-center justify-between">
                <span className="truncate max-w-[170px]">{tmpl.name}</span>
                <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">{tmpl.source}</div>
            </button>
          ))}
        </div>
      </div>

      {/* PATIENT & CLINICAL ORDER METADATA CARD */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl relative overflow-hidden">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">Patient & Clinical Order Assignment</h3>
          </div>
          <span className="text-[10px] font-mono text-teal-800 dark:text-teal-300 font-bold bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
            Tenant Data Isolation Active
          </span>
        </div>

        {/* Row 1: Full-Width Patient Selector with Spacious Registration Button */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <label className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <User className="w-4 h-4 text-teal-600 dark:text-teal-400" /> {t("selectPatientRecord")} <span className="text-rose-500">*</span>
            </label>
            <button
              type="button"
              onClick={() => setShowNewPatientModal(true)}
              className="text-xs font-extrabold text-teal-800 dark:text-teal-300 hover:text-teal-900 dark:hover:text-teal-200 flex items-center gap-1.5 bg-teal-500/15 hover:bg-teal-500/25 px-3 py-1.5 rounded-xl border border-teal-500/30 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4 text-teal-600 dark:text-teal-400" /> Register New Patient
            </button>
          </div>

          <select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            required
            className="w-full p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold text-xs sm:text-sm focus:border-teal-500 outline-none shadow-sm transition-colors"
          >
            {localPatients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.fullName} (MRN: {p.mrn}) — {p.gender}, DOB: {p.dateOfBirth} {p.phone ? `(${p.phone})` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Row 2: 2-Column Grid for Facility Branch & Referred By Doctor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs pt-1">
          <div className="space-y-1.5">
            <label className="block text-xs font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-sky-600 dark:text-sky-400" /> {t("selectBranchRecord")} <span className="text-rose-500">*</span>
            </label>
            <select
              value={selectedBranchId}
              onChange={(e) => setSelectedBranchId(e.target.value)}
              required
              className="w-full p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold text-xs sm:text-sm focus:border-teal-500 outline-none shadow-sm transition-colors"
            >
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.code})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Referred By (Doctor / Physician)
            </label>
            <select
              value={isCustomDoctor ? "custom" : selectedDoctorId}
              onChange={(e) => {
                if (e.target.value === "custom") {
                  setIsCustomDoctor(true);
                  setSelectedDoctorId("");
                } else {
                  setIsCustomDoctor(false);
                  setSelectedDoctorId(e.target.value);
                  setCustomDoctorName("");
                }
              }}
              className="w-full p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold text-xs sm:text-sm focus:border-teal-500 outline-none shadow-sm transition-colors"
            >
              <option value="">Self / Direct Order (No Doctor)</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} {doc.specialty ? `(${doc.specialty})` : ""}
                </option>
              ))}
              <option value="custom">➕ Enter Custom Referring Doctor Name...</option>
            </select>
          </div>
        </div>

        {/* Custom Doctor Inline Text Field if custom selected */}
        {isCustomDoctor && (
          <div className="pt-2 animate-in fade-in-50 duration-200">
            <label className="block text-xs font-extrabold text-teal-800 dark:text-teal-300 mb-1">
              Specify Custom Doctor Name & Qualifications:
            </label>
            <input
              type="text"
              value={customDoctorName}
              onChange={(e) => setCustomDoctorName(e.target.value)}
              placeholder="e.g. Dr. Aamir Khan, MBBS, FCPS (Cardiologist)"
              className="w-full p-3.5 bg-white dark:bg-slate-900 rounded-xl border-2 border-teal-500 text-slate-900 dark:text-slate-100 font-extrabold text-xs sm:text-sm outline-none shadow-md focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
        )}
      </div>

      {/* PAYMENT & BILLING OPTIONS (Cash, Online, Bank Transfer) */}
      <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h3 className="text-xs font-black text-teal-700 dark:text-teal-400 uppercase tracking-wider flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-teal-600 dark:text-teal-400" /> {t("paymentBillingOptions")}
          </h3>
          <span className="text-[10px] font-mono text-emerald-800 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            {t("autoWhatsappReceipt")}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-slate-400 font-bold mb-1">{t("paymentMethod")}</label>
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value as any)}
              className="w-full p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold focus:border-teal-500 outline-none shadow-sm"
            >
              <option value="Cash">{t("cashOption")}</option>
              <option value="Online">{t("onlineOption")}</option>
              <option value="Bank Transfer">{t("bankOption")}</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-400 font-bold mb-1">{t("paymentStatusLabel")}</label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value as any)}
              className="w-full p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold focus:border-teal-500 outline-none shadow-sm"
            >
              <option value="Paid">{t("paidOption")}</option>
              <option value="Pending">{t("pendingOption")}</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-400 font-bold mb-1">{t("totalFeeBilled")}</label>
            <input
              type="number"
              value={amountBilled}
              onChange={(e) => setAmountBilled(Number(e.target.value))}
              className="w-full p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 text-teal-700 dark:text-teal-300 font-mono font-bold focus:border-teal-500 outline-none shadow-sm"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-400 font-bold mb-1">{t("amountPaidLabel")}</label>
            <input
              type="number"
              value={amountPaid}
              onChange={(e) => setAmountPaid(Number(e.target.value))}
              className="w-full p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 text-emerald-700 dark:text-emerald-400 font-mono font-bold focus:border-teal-500 outline-none shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* WORKFLOW-BASED TEST / PARAMETER BATTERY */}
      {workflowStep === "registration_only" ? (
        /* STEP 1: PATIENT SAMPLE BOOKED TESTS SELECTOR (TEST NAME ONLY) */
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider flex items-center gap-2">
                <FlaskConical className="w-4 h-4" /> Booked Diagnostic Test Battery ({parameters.length} Tests)
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                Select test names registered for this patient booking. Result values will be entered later.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAddCustomParameter}
                className="px-3.5 py-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-800 dark:text-teal-300 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4 text-teal-600 dark:text-teal-400" /> Add Booked Test
              </button>

              <button
                type="button"
                onClick={() => setShowNewTestModal(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> ➕ Create New Master Test
              </button>
            </div>
          </div>

          {/* Booked Test Name Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {parameters.map((param, index) => (
              <div key={index} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-teal-700 dark:text-teal-400 uppercase">
                    Test #{index + 1}
                  </span>
                  {parameters.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveParameter(index)}
                      className="text-rose-600 dark:text-rose-400 hover:text-rose-700 text-xs font-semibold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] text-slate-700 dark:text-slate-400 font-bold mb-1">Booked Test Name *</label>
                  <select
                    value={localCatalog.find((t) => t.name === param.testName)?.id || ""}
                    onChange={(e) => {
                      const selectedTc = localCatalog.find((tc) => tc.id === e.target.value);
                      if (selectedTc) {
                        handleUpdateParameter(index, "testName", selectedTc.name);
                        handleUpdateParameter(index, "unit", selectedTc.unit);
                        handleUpdateParameter(index, "refRange", selectedTc.refRangeMale);
                      }
                    }}
                    className="w-full p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold text-xs shadow-sm focus:border-teal-500 outline-none mb-2"
                  >
                    <option value="">-- Select Test from Catalog ({localCatalog.length} Available) --</option>
                    {localCatalog.map((tc) => (
                      <option key={tc.id} value={tc.id}>
                        {tc.name} ({tc.category})
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    value={param.testName}
                    onChange={(e) => handleUpdateParameter(index, "testName", e.target.value)}
                    required
                    placeholder="Or enter custom test name"
                    className="w-full p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-semibold focus:border-teal-500 outline-none text-xs shadow-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* STEP 2: FULL DIAGNOSTIC PARAMETER BATTERY (TEST NAME + VALUES + UNITS + REFS + FLAGS) */
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider flex items-center gap-2">
                <FlaskConical className="w-4 h-4" /> {t("reportParameters")} ({parameters.length} Parameters)
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                {t("parameterDesc")}
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddCustomParameter}
              className="px-3.5 py-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-800 dark:text-teal-300 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4 text-teal-600 dark:text-teal-400" /> {t("addCustomParameter")}
            </button>
          </div>

          {/* Dynamic Parameter Rows */}
          <div className="space-y-3">
            {parameters.map((param, index) => (
              <div key={index} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 text-xs shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-teal-700 dark:text-teal-400 uppercase">
                    Parameter #{index + 1}
                  </span>
                  {parameters.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveParameter(index)}
                      className="text-rose-600 dark:text-rose-400 hover:text-rose-700 text-xs font-semibold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  {/* Parameter Name */}
                  <div className="sm:col-span-4">
                    <label className="block text-[10px] text-slate-700 dark:text-slate-400 font-bold mb-1">{t("parameterName")}</label>
                    <input
                      type="text"
                      value={param.testName}
                      onChange={(e) => handleUpdateParameter(index, "testName", e.target.value)}
                      required
                      placeholder="Parameter Name"
                      className="w-full p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-semibold focus:border-teal-500 outline-none text-xs shadow-sm"
                    />
                  </div>

                  {/* Result Value */}
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-slate-700 dark:text-slate-400 font-bold mb-1">{t("resultValueText")}</label>
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
                      className="w-full p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold font-mono focus:border-teal-500 outline-none text-xs shadow-sm"
                    />
                  </div>

                  {/* Unit */}
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-slate-700 dark:text-slate-400 font-bold mb-1">{t("unitLabel")}</label>
                    <input
                      type="text"
                      value={param.unit}
                      onChange={(e) => handleUpdateParameter(index, "unit", e.target.value)}
                      placeholder="Unit"
                      className="w-full p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-mono focus:border-teal-500 outline-none text-xs shadow-sm"
                    />
                  </div>

                  {/* Reference Range */}
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-slate-700 dark:text-slate-400 font-bold mb-1">{t("refInterval")}</label>
                    <input
                      type="text"
                      value={param.refRange}
                      onChange={(e) => handleUpdateParameter(index, "refRange", e.target.value)}
                      placeholder="Ref Range"
                      className="w-full p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-mono focus:border-teal-500 outline-none text-xs shadow-sm"
                    />
                  </div>

                  {/* Flag */}
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-slate-700 dark:text-slate-400 font-bold mb-1">{t("flagStatus")}</label>
                    <select
                      value={param.flag}
                      onChange={(e) => handleUpdateParameter(index, "flag", e.target.value)}
                      className="w-full p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold focus:border-teal-500 outline-none text-xs shadow-sm"
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
      )}

      {/* Submit Button */}
      <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => router.push("/app/reports")}
          className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-400 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
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

      {/* QUICK MASTER TEST CREATION MODAL */}
      {showNewTestModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-teal-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Add New Test to Master Catalog</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Save test definitions dynamically so they appear in all dropdowns</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowNewTestModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {testModalError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-600 dark:text-rose-300 text-xs font-semibold text-center">
                ⚠️ {testModalError}
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Test Code * (e.g. LFT-01, THYROID-01)</label>
                <input
                  type="text"
                  value={newTestForm.code}
                  onChange={(e) => setNewTestForm({ ...newTestForm, code: e.target.value.toUpperCase() })}
                  required
                  placeholder="e.g. TSH-01"
                  className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono font-bold focus:border-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Test / Analyte Full Name *</label>
                <input
                  type="text"
                  value={newTestForm.name}
                  onChange={(e) => setNewTestForm({ ...newTestForm, name: e.target.value })}
                  required
                  placeholder="e.g. Thyroid Stimulating Hormone (TSH)"
                  className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-semibold focus:border-teal-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Category *</label>
                  <select
                    value={newTestForm.category}
                    onChange={(e) => setNewTestForm({ ...newTestForm, category: e.target.value })}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-semibold focus:border-teal-500 outline-none"
                  >
                    <option value="Clinical Biochemistry">Clinical Biochemistry</option>
                    <option value="Endocrinology & Hormones">Endocrinology & Hormones</option>
                    <option value="Hematology & Coagulation">Hematology & Coagulation</option>
                    <option value="Urology & Andrology Genetics">Urology & Andrology Genetics</option>
                    <option value="Lipid & Cardiovascular Panel">Lipid & Cardiovascular Panel</option>
                    <option value="Renal & Electrolyte Battery">Renal & Electrolyte Battery</option>
                    <option value="Liver Function Battery">Liver Function Battery</option>
                    <option value="Immunology & Serology">Immunology & Serology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Unit * (e.g. uIU/mL)</label>
                  <input
                    type="text"
                    value={newTestForm.unit}
                    onChange={(e) => setNewTestForm({ ...newTestForm, unit: e.target.value })}
                    required
                    placeholder="e.g. uIU/mL"
                    className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono focus:border-teal-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Male / Female Reference Range *</label>
                <input
                  type="text"
                  value={newTestForm.refRangeMale}
                  onChange={(e) => setNewTestForm({ ...newTestForm, refRangeMale: e.target.value, refRangeFemale: e.target.value })}
                  required
                  placeholder="e.g. 0.4 - 4.2 uIU/mL"
                  className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono focus:border-teal-500 outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewTestModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateNewMasterTest}
                  disabled={creatingTest}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-bold shadow-lg shadow-teal-500/20 hover:from-teal-300 hover:to-sky-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 fill-slate-950" />
                  <span>{creatingTest ? "Saving to Catalog..." : "Save to Master Catalog"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUICK NEW PATIENT REGISTRATION MODAL */}
      {showNewPatientModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-teal-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <User className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Register New Patient Record</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Instantly register patient without leaving booking screen</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowNewPatientModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {patientModalError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-600 dark:text-rose-300 text-xs font-semibold text-center">
                ⚠️ {patientModalError}
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Patient Full Name *</label>
                <input
                  type="text"
                  value={newPatientForm.fullName}
                  onChange={(e) => setNewPatientForm({ ...newPatientForm, fullName: e.target.value })}
                  required
                  placeholder="e.g. Muhammad Ali Shah"
                  className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold focus:border-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">WhatsApp / Phone Number *</label>
                <input
                  type="text"
                  value={newPatientForm.phone}
                  onChange={(e) => setNewPatientForm({ ...newPatientForm, phone: e.target.value })}
                  required
                  placeholder="e.g. +92 300 1234567"
                  className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono font-bold focus:border-teal-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Gender *</label>
                  <select
                    value={newPatientForm.gender}
                    onChange={(e) => setNewPatientForm({ ...newPatientForm, gender: e.target.value })}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-semibold focus:border-teal-500 outline-none"
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
                    value={newPatientForm.dateOfBirth}
                    onChange={(e) => setNewPatientForm({ ...newPatientForm, dateOfBirth: e.target.value })}
                    className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono focus:border-teal-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Residential Address</label>
                <input
                  type="text"
                  value={newPatientForm.address}
                  onChange={(e) => setNewPatientForm({ ...newPatientForm, address: e.target.value })}
                  placeholder="e.g. House #14, St 5, F-7/2, Islamabad"
                  className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:border-teal-500 outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewPatientModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleQuickRegisterPatient}
                  disabled={registeringPatient}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-bold shadow-lg shadow-teal-500/20 hover:from-teal-300 hover:to-sky-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 fill-slate-950" />
                  <span>{registeringPatient ? "Registering Patient..." : "Register & Auto-Select"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
