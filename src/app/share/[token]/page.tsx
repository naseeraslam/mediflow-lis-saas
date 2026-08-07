import { validateShareToken } from "@/lib/sharing";
import { PrintPdfButton } from "@/components/report/PrintPdfButton";
import {
  ShieldCheck,
  AlertTriangle,
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Lock,
  MessageCircle,
  ArrowLeft,
  Home,
  Search,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Secure Medical Report Portal | MediFlow LIS",
  description: "Authenticated, time-limited diagnostic laboratory report viewer.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SharedReportPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const validation = await validateShareToken(token);

  if (!validation.valid || !validation.report) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-rose-500/30 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-rose-500/10 text-rose-400 rounded-full flex items-center justify-center mx-auto border border-rose-500/20">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Access Denied / Expired</h1>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              {validation.reason || "This secure share link is no longer valid."}
            </p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl text-xs font-mono text-slate-400 border border-slate-800">
            Share Token: {token}
          </div>
          <Link href="/patient-search" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-400 text-slate-950 text-xs font-bold hover:bg-teal-300 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Patient Search
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8 selection:bg-teal-500 selection:text-slate-950">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* TOP NAVIGATION BAR FOR PATIENTS / DOCTORS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 no-print">
          <div className="flex items-center gap-3">
            <Link
              href="/patient-search"
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100 hover:bg-slate-800 text-xs font-bold flex items-center gap-2 transition-all shadow-md"
            >
              <ArrowLeft className="w-4 h-4 text-teal-400" /> Back to Patient Search
            </Link>

            <Link
              href="/"
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <PrintPdfButton reportNumber={report.reportNumber} />
            <Link
              href={`/verify/${report.verificationToken}`}
              className="px-3.5 py-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 hover:text-teal-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-teal-400" /> Verify Authenticity
            </Link>
          </div>
        </div>

        {/* Secure Access Banner */}
        <div className="bg-slate-900 border border-teal-500/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-100 flex items-center gap-2">
                <span>Authenticated Patient Report Portal</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20 uppercase">
                  Time-Limited Share
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Issued by {organization.displayName} • Expires: {new Date(validation.shareRecord?.expiresAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </div>
        </div>

        {/* DIRECT LAB CONTACT CARD FOR PATIENTS */}
        <div className="bg-gradient-to-r from-teal-950/40 via-slate-900 to-sky-950/40 border border-teal-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-teal-400" />
              <h2 className="text-sm font-bold text-slate-100">Contact Issuing Laboratory Directly</h2>
            </div>
            <span className="text-[10px] text-teal-300 font-mono font-semibold">TENANT: {organization.displayName}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {/* Direct WhatsApp Chat */}
            <a
              href={`https://wa.me/${whatsappClean}?text=Hello%20${encodeURIComponent(organization.displayName)},%20I%20am%20inquiring%20about%20my%20lab%20report%20${report.reportNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 flex items-center gap-3 transition-colors text-emerald-300 font-bold"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 fill-slate-950" />
              </div>
              <div>
                <div className="text-xs">Direct WhatsApp</div>
                <div className="text-[10px] font-mono text-emerald-400 font-normal">Chat with Lab Desk</div>
              </div>
            </a>

            {/* Direct Phone Dial */}
            <a
              href={`tel:${organization.phone}`}
              className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 flex items-center gap-3 transition-colors text-slate-200"
            >
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold">Direct Phone</div>
                <div className="text-[10px] font-mono text-slate-400">{organization.phone}</div>
              </div>
            </a>

            {/* Support Email */}
            <a
              href={`mailto:${organization.email}`}
              className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 flex items-center gap-3 transition-colors text-slate-200"
            >
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold">Support Email</div>
                <div className="text-[10px] text-slate-400 truncate max-w-[140px]">{organization.email}</div>
              </div>
            </a>
          </div>
        </div>

        {/* WHITE-LABEL MEDICAL DIAGNOSTIC REPORT CARD WITH DYNAMIC THEME COLORS & HEADER */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
          {/* Custom Header Banner using Primary & Secondary Colors */}
          {organization.headerText && (
            <div
              className="p-3 text-center text-xs font-bold font-mono tracking-wider uppercase text-slate-950 shadow-md"
              style={{ background: `linear-gradient(to right, ${primaryCol}, ${secondaryCol})` }}
            >
              {organization.headerText}
            </div>
          )}

          <div className="p-8 space-y-8">
            {/* Organization Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-800">
              <div className="space-y-1">
                <h1 className="text-2xl font-extrabold" style={{ color: primaryCol }}>
                  {organization.displayName}
                </h1>
                <p className="text-xs text-slate-400 font-medium">{organization.legalName}</p>
                <div className="text-[11px] text-slate-400 space-x-2 pt-1 font-mono">
                  <span>CLIA: {organization.licenseNo || "CLIA-99210-TX"}</span>
                  <span>•</span>
                  <span>REG: {organization.registrationNo || "REG-9941A"}</span>
                </div>
              </div>

              <div className="text-left sm:text-right text-xs text-slate-400 space-y-1">
                <div className="font-semibold text-slate-200">{branch.name}</div>
                <div>{branch.address}</div>
                <div className="font-mono font-bold text-sm" style={{ color: secondaryCol }}>
                  Report No: {report.reportNumber}
                </div>
              </div>
            </div>

            {/* Patient Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Patient Name</span>
                <span className="font-bold text-slate-100 text-sm">{patient.fullName}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">MRN Number</span>
                <span className="font-mono font-bold" style={{ color: primaryCol }}>{patient.mrn}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Age / Gender</span>
                <span className="font-medium text-slate-200">{patient.dateOfBirth} ({patient.gender})</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Referring Doctor</span>
                <span className="font-medium text-slate-200">{doctor?.name || "Direct Patient Request"}</span>
              </div>
            </div>

            {/* Test Results Table */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: primaryCol }}>
                Clinical Diagnostic Results
              </h3>

              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px] bg-slate-950/90">
                      <th className="py-3 px-4">Analyte / Diagnostic Test</th>
                      <th className="py-3 px-4">Result Value</th>
                      <th className="py-3 px-4">Unit</th>
                      <th className="py-3 px-4">Reference Range</th>
                      <th className="py-3 px-4 text-right">Flag</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {results.map((res: any) => (
                      <tr key={res.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3.5 px-4 font-sans font-semibold text-slate-200">{res.testNameSnapshot}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-100 text-sm">
                          {res.numericValue !== null ? res.numericValue : res.stringValue}
                        </td>
                        <td className="py-3.5 px-4 text-slate-400">{res.unitSnapshot}</td>
                        <td className="py-3.5 px-4 text-slate-400">{res.refRangeSnapshot}</td>
                        <td className="py-3.5 px-4 text-right font-sans">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            res.flag === "High"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : res.flag === "Low"
                              ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                              : "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                          }`}>
                            {res.flag}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pathologist Authorization Signature & Dynamic Disclaimer */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs">
              <div className="text-slate-400 leading-relaxed text-[11px] max-w-md">
                {organization.disclaimerText || "Results are intended for interpretation by a licensed physician."}
              </div>

              <div className="text-right space-y-1">
                <div className="text-slate-400 text-[10px] uppercase font-semibold">Authorized By Pathologist</div>
                <div className="font-bold text-slate-100 text-sm">{report.authorizedBy || "Dr. Robert Vance, MD"}</div>
                <div className="text-slate-400 text-[11px]">
                  {report.authorizedAt ? new Date(report.authorizedAt).toLocaleDateString() : "Signed Online"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
