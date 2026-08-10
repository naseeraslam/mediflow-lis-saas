import Link from "next/link";
import { db } from "@/lib/db";
import { ShareModal } from "@/components/report/ShareModal";
import { PrintPdfButton } from "@/components/report/PrintPdfButton";
import {
  FileText,
  ShieldCheck,
  Building2,
  Calendar,
  User,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  History,
  TrendingUp,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Award,
} from "lucide-react";
import { generateCompletionWhatsAppMessage } from "@/lib/whatsapp";

export default async function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const report = await db.report.findUnique({
    where: { id },
    include: {
      patient: true,
      branch: true,
      doctor: true,
      organization: true,
      shares: true,
      results: {
        include: {
          test: true,
        },
      },
      amendments: {
        orderBy: { changedAt: "desc" },
      },
    },
  });

  if (!report) {
    return (
      <div className="p-8 text-center space-y-4">
        <h1 className="text-xl font-bold text-rose-400">Report Not Found</h1>
        <p className="text-xs text-slate-400">The requested report ID does not exist in your tenant scope.</p>
        <Link href="/app/reports" className="text-xs font-semibold text-teal-400 underline">
          Back to Reports
        </Link>
      </div>
    );
  }

  const { organization, patient, branch, doctor, results, amendments } = report;

  const whatsappClean = organization.whatsappPhone
    ? organization.whatsappPhone.replace(/[^0-9]/g, "")
    : organization.phone.replace(/[^0-9]/g, "");

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 font-mono">Report: {report.reportNumber}</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
              report.status === "Authorized"
                ? "bg-teal-500/10 text-teal-400 border-teal-500/20"
                : report.status === "Amended"
                ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                : "bg-amber-500/10 text-amber-400 border-amber-500/20"
            }`}>
              {report.status} (v{report.version})
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-100 mt-1">Medical Diagnostic Report</h1>
        </div>

        <div className="flex items-center gap-3 no-print">
          <a
            href={
              generateCompletionWhatsAppMessage({
                patientName: patient.fullName,
                patientPhone: patient.phone || "+923001234567",
                reportNumber: report.reportNumber,
                labName: organization.displayName,
                shareToken: report.shares?.[0]?.shareToken || report.id,
                verificationToken: report.verificationToken,
              }).whatsappUrl
            }
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold flex items-center gap-1.5 transition-colors shadow-sm whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" /> Dispatch WhatsApp PDF
          </a>
          <PrintPdfButton reportNumber={report.reportNumber} />
          <ShareModal reportId={report.id} reportNumber={report.reportNumber} />

          <Link
            href={`/app/comparison?patientId=${patient.id}&currentReportId=${report.id}`}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-semibold text-teal-400 flex items-center gap-1.5 transition-colors"
          >
            <TrendingUp className="w-4 h-4" /> Baseline Comparison
          </Link>
        </div>
      </div>

      {/* STEP 1 PENDING RESULTS BANNER */}
      {report.status !== "Authorized" && report.status !== "Amended" && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-amber-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-lg">
              🧪
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider">Step 1 Complete: Patient Registered (Lab Results Pending)</div>
              <div className="text-[11px] font-medium text-slate-300">
                Patient booking receipt sent via WhatsApp. Enter test results below when ready to authorize & dispatch final PDF.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DIRECT LAB CONTACT CARD FOR PATIENTS */}
      <div className="bg-teal-50/80 dark:bg-slate-950/90 border border-teal-200 dark:border-teal-500/30 rounded-2xl p-5 space-y-3 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-200">
            <Building2 className="w-4 h-4 text-teal-400" /> Patient Support & Direct Laboratory Desk
          </div>
          <span className="text-[10px] text-teal-400 font-mono font-semibold">FACILITY: {organization.displayName}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <a
            href={`https://wa.me/${whatsappClean}?text=Hello%20${encodeURIComponent(organization.displayName)},%20I%20have%20a%20question%20regarding%20report%20${report.reportNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 flex items-center gap-3 transition-colors text-emerald-300 font-bold"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4 fill-slate-950" />
            </div>
            <div>
              <div>Direct Lab WhatsApp</div>
              <div className="text-[10px] text-emerald-400 font-mono font-normal">Contact Desk</div>
            </div>
          </a>

          <a
            href={`tel:${organization.phone}`}
            className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 flex items-center gap-3 transition-colors text-slate-200"
          >
            <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="font-semibold">Lab Direct Phone</div>
              <div className="text-[10px] text-slate-400 font-mono">{organization.phone}</div>
            </div>
          </a>

          <a
            href={`mailto:${organization.email}`}
            className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 flex items-center gap-3 transition-colors text-slate-200"
          >
            <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="font-semibold">Lab Email Desk</div>
              <div className="text-[10px] text-slate-400 truncate max-w-[130px]">{organization.email}</div>
            </div>
          </a>
        </div>
      </div>

      {/* WHITE-LABEL REPORT CARD */}
      <div
        className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-8 shadow-2xl relative"
        style={{ borderTop: `4px solid ${organization.primaryColor || "#0f766e"}` }}
      >
        {/* Organization Header & Branding */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-slate-950 text-xs"
                style={{ backgroundColor: organization.primaryColor || "#0f766e" }}
              >
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-100">{organization.displayName}</h2>
            </div>
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
            <div>Phone: {branch.phone}</div>
            <div className="text-teal-400 font-mono pt-1 font-bold">Verification: {report.verificationToken}</div>
          </div>
        </div>

        {/* Patient Demographics & Order Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Patient Name</span>
            <span className="font-bold text-slate-100 text-sm">{patient.fullName}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">MRN Number</span>
            <span className="font-mono text-teal-300 font-bold">{patient.mrn}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Age / Gender</span>
            <span className="font-medium text-slate-200">{patient.dateOfBirth} ({patient.gender})</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Referring Doctor</span>
            <span className="font-medium text-slate-200">{doctor?.name || "Self / Direct Order"}</span>
          </div>
        </div>

        {/* Diagnostic Test Results Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-teal-400 uppercase tracking-wider">Clinical Results</h3>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px] bg-slate-950/90">
                  <th className="py-3 px-4">Analyte / Diagnostic Test</th>
                  <th className="py-3 px-4">Result Value</th>
                  <th className="py-3 px-4">Unit</th>
                  <th className="py-3 px-4">Reference Interval</th>
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

        {/* Pathologist Signature Section */}
        <div className="pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-4">
            <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center text-teal-400 shrink-0">
              <QrCode className="w-10 h-10" />
            </div>
            <div className="space-y-1 text-xs">
              <div className="font-bold text-slate-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> Public Verification
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Scan QR code or visit <span className="text-teal-300 font-mono">/verify/{report.verificationToken}</span> to verify report authenticity online.
              </p>
            </div>
          </div>

          <div className="text-right space-y-1.5 text-xs">
            <div className="text-slate-400 text-[10px] uppercase font-semibold">Authorized By Pathologist</div>
            <div className="font-bold text-slate-100 text-sm">{report.authorizedBy || "Dr. Robert Vance, MD"}</div>
            <div className="text-slate-400 text-[11px]">
              {report.authorizedAt ? new Date(report.authorizedAt).toLocaleDateString() : "Signed Online"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
