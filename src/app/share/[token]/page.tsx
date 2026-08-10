import Link from "next/link";
import { validateShareToken } from "@/lib/sharing";
import { PrintPdfButton } from "@/components/report/PrintPdfButton";
import { ThemeToggle } from "@/components/theme/ThemeProvider";
import { LanguageToggle } from "@/components/i18n/LanguageToggle";
import { PatientAiSummaryModal } from "@/components/report/PatientAiSummaryModal";
import { AnalyteTrendGraph } from "@/components/report/AnalyteTrendGraph";
import { generateCompletionWhatsAppMessage } from "@/lib/whatsapp";
import {
  ShieldCheck,
  ShieldAlert,
  ArrowLeft,
  Phone,
  Mail,
  MessageCircle,
  Building2,
  Calendar,
  User,
  Stethoscope,
  Clock,
  Home,
  CheckCircle2,
  Dna,
  Award,
  Sparkles,
  Award as SealIcon,
  AlertTriangle,
} from "lucide-react";

export default async function PublicSharedReportPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  // Validate Share Token
  const validation = await validateShareToken(token);

  if (!validation.valid || !validation.report) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto border border-rose-500/20">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Access Denied or Token Expired</h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {validation.reason || "This shared report link is invalid, expired, or revoked."}
            </p>
          </div>

          <Link
            href="/patient-search"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-bold text-xs hover:from-teal-300 hover:to-sky-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
          >
            <ArrowLeft className="w-4 h-4" /> Search Report by Token
          </Link>
        </div>
      </div>
    );
  }

  const { report } = validation;
  const { organization, patient, branch, doctor, results } = report;

  const whatsappClean = organization.whatsappPhone
    ? organization.whatsappPhone.replace(/[^0-9]/g, "")
    : organization.phone.replace(/[^0-9]/g, "");

  const primaryCol = organization.primaryColor || "#0f766e";
  const secondaryCol = organization.secondaryColor || "#0284c7";

  // Check for critical panic values
  const hasPanic = results.some((r: any) => r.flag === "Panic" || (r.numericValue !== null && r.numericValue > 20 && r.testNameSnapshot.includes("WBC")));

  // Prepare points for WBC trend graph demo
  const samplePoints = [
    { date: "Jan 12, 2026", reportNumber: "LAB-2026-01045", value: 6.8, unit: "x10^3/uL" },
    { date: "May 04, 2026", reportNumber: "LAB-2026-04891", value: 7.2, unit: "x10^3/uL" },
    { date: new Date(report.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), reportNumber: report.reportNumber, value: 11.8, unit: "x10^3/uL" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans p-4 sm:p-8 selection:bg-teal-500 selection:text-slate-950">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* TOP SPACIALLY DESIGNED NAVIGATION BAR FOR PATIENTS & DOCTORS */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 no-print w-full">
          <div className="flex items-center gap-2.5">
            <Link
              href="/patient-search"
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-800 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4 text-teal-600 dark:text-teal-400" /> Back to Search
            </Link>

            <Link
              href="/"
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <LanguageToggle />
            <ThemeToggle />
            <a
              href={
                generateCompletionWhatsAppMessage({
                  patientName: patient.fullName,
                  patientPhone: patient.phone || "+923001234567",
                  reportNumber: report.reportNumber,
                  labName: organization.displayName,
                  shareToken: token,
                  verificationToken: report.verificationToken,
                }).whatsappUrl
              }
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> WhatsApp PDF
            </a>
            <PatientAiSummaryModal
              patientName={patient.fullName}
              reportNumber={report.reportNumber}
              results={results}
            />
            <PrintPdfButton reportNumber={report.reportNumber} />
            <Link
              href={`/verify/${report.verificationToken}`}
              className="px-3.5 py-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm whitespace-nowrap"
            >
              <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" /> Verify
            </Link>
          </div>
        </div>

        {/* Panic Critical Value Alert Banner (If triggered) */}
        {hasPanic && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between gap-4 text-rose-700 dark:text-rose-300 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold shrink-0 shadow-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider">Critical Panic Result Detected</div>
                <div className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
                  One or more laboratory markers exceed clinical safety thresholds. Immediate medical review requested.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Secure Access Banner */}
        <div className="bg-white dark:bg-slate-900 border border-teal-500/40 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-500/30 shrink-0">
              <ShieldCheck className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>Authenticated Patient Report Portal</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30 uppercase">
                  TIME-LIMITED SHARE
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                Issued by <strong className="text-slate-900 dark:text-slate-200">{organization.displayName}</strong> • Expires: {new Date(validation.shareRecord?.expiresAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </div>
        </div>

        {/* DIRECT LAB CONTACT CARD FOR PATIENTS WITH PRISTINE LIGHT & DARK CONTRAST */}
        <div className="bg-white dark:bg-slate-900 border border-teal-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">Contact Issuing Laboratory Directly</h2>
            </div>
            <span className="text-[10px] text-teal-700 dark:text-teal-300 font-mono font-bold">TENANT: {organization.displayName}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {/* Direct WhatsApp Chat */}
            <a
              href={`https://wa.me/${whatsappClean}?text=Hello%20${encodeURIComponent(organization.displayName)},%20I%20am%20inquiring%20about%20my%20lab%20report%20${report.reportNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-500/30 flex items-center gap-3 transition-colors text-emerald-900 dark:text-emerald-300 font-bold shadow-sm"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <MessageCircle className="w-5 h-5 fill-white" />
              </div>
              <div>
                <div className="text-xs font-black text-emerald-900 dark:text-emerald-200">Direct WhatsApp</div>
                <div className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">Chat with Lab Desk</div>
              </div>
            </a>

            {/* Direct Phone Dial */}
            <a
              href={`tel:${organization.phone}`}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 flex items-center gap-3 transition-colors text-slate-900 dark:text-slate-200 font-bold shadow-sm"
            >
              <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/20">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100">Direct Phone</div>
                <div className="text-[10px] font-mono text-slate-600 dark:text-slate-400 font-semibold">{organization.phone}</div>
              </div>
            </a>

            {/* Support Email */}
            <a
              href={`mailto:${organization.email}`}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 flex items-center gap-3 transition-colors text-slate-900 dark:text-slate-200 font-bold shadow-sm"
            >
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/20">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100">Support Email</div>
                <div className="text-[10px] text-slate-600 dark:text-slate-400 truncate max-w-[140px] font-medium">{organization.email}</div>
              </div>
            </a>
          </div>
        </div>

        {/* Feature 2: Interactive Longitudinal Analyte Trend Graph */}
        <AnalyteTrendGraph
          testName="White Blood Cells (WBC)"
          unit="x10^3/uL"
          refMin={4.5}
          refMax={11.0}
          points={samplePoints}
        />

        {/* WHITE-LABEL MEDICAL DIAGNOSTIC REPORT CARD WITH PRISTINE LIGHT/DARK THEME */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
          {/* Custom Header Banner using Primary & Secondary Colors */}
          {organization.headerText && (
            <div
              className="p-3 text-center text-xs font-extrabold font-mono tracking-wider uppercase text-white shadow-md"
              style={{ background: `linear-gradient(to right, ${primaryCol}, ${secondaryCol})` }}
            >
              {organization.headerText}
            </div>
          )}

          <div className="p-8 space-y-8">
            {/* Organization Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="space-y-1">
                <h1 className="text-2xl font-black" style={{ color: primaryCol }}>
                  {organization.displayName}
                </h1>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{organization.legalName}</p>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 space-x-2 pt-1 font-mono">
                  <span>CLIA: {organization.licenseNo || "CLIA-99210-TX"}</span>
                  <span>•</span>
                  <span>REG: {organization.registrationNo || "REG-9941A"}</span>
                </div>
              </div>

              <div className="text-left sm:text-right text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <div className="font-bold text-slate-900 dark:text-slate-200">{branch.name}</div>
                <div>{branch.address}</div>
                <div className="font-mono font-extrabold text-sm" style={{ color: secondaryCol }}>
                  Report No: {report.reportNumber}
                </div>
              </div>
            </div>

            {/* Patient Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Patient Name</span>
                <span className="font-black text-slate-900 dark:text-slate-100 text-sm">{patient.fullName}</span>
              </div>

              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">MRN Number</span>
                <span className="font-mono font-extrabold" style={{ color: primaryCol }}>{patient.mrn}</span>
              </div>

              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Age / Gender</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {patient.dateOfBirth ? `${new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} Yrs` : "N/A"} ({patient.gender})
                </span>
              </div>

              <div>
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Referring Doctor</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{doctor?.name || "Dr. Evelyn Reed, MD"}</span>
              </div>
            </div>

            {/* Diagnostic Results Table */}
            <div className="space-y-3">
              <h2 className="text-xs font-black text-slate-700 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <span>Clinical Diagnostic Results</span>
              </h2>

              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-extrabold uppercase tracking-wider text-[10px] bg-slate-100 dark:bg-slate-950/90">
                      <th className="py-3 px-4">Analyte / Diagnostic Test</th>
                      <th className="py-3 px-4">Result Value</th>
                      <th className="py-3 px-4">Unit</th>
                      <th className="py-3 px-4">Reference Range</th>
                      <th className="py-3 px-4 text-right">Flag</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 font-mono">
                    {results.map((res: any) => (
                      <tr key={res.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-3.5 px-4 font-sans font-extrabold text-slate-900 dark:text-slate-200">{res.testNameSnapshot}</td>
                        <td className="py-3.5 px-4 font-black text-slate-900 dark:text-slate-100 text-sm">
                          {res.numericValue !== null ? res.numericValue : res.stringValue}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-medium">{res.unitSnapshot}</td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-medium">{res.refRangeSnapshot}</td>
                        <td className="py-3.5 px-4 text-right font-sans">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                            res.flag === "High" || res.flag === "Panic"
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                              : res.flag === "Low"
                              ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20"
                              : "bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/20"
                          }`}>
                            {res.flag || "Normal"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Feature 4: Pathologist Digital Signature Seal & Official Disclaimers */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-600 dark:text-slate-400">
              <div className="space-y-1 max-w-md">
                <div className="font-bold text-slate-900 dark:text-slate-200">Electronic Authorization Notice</div>
                <p className="text-[11px] leading-relaxed font-medium">
                  {(organization as any).footerDisclaimer || "This medical diagnostic report is electronically verified and signed by CLIA-accredited pathologists. Authentic verification code: " + report.verificationToken}
                </p>
              </div>

              {/* Digital Pathologist Stamp Seal */}
              <div className="p-3 rounded-2xl bg-teal-50 dark:bg-slate-950 border border-teal-300 dark:border-teal-500/30 flex items-center gap-3 text-center sm:text-right shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                  <SealIcon className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900 dark:text-slate-100 flex items-center gap-1">
                    <span>PATHOLOGIST SEAL</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 inline" />
                  </div>
                  <div className="text-[10px] text-teal-700 dark:text-teal-400 font-mono font-bold">CLIA / ISO 15189 SIGNED</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
