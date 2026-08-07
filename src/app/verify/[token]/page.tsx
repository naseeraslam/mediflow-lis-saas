import { db } from "@/lib/db";
import { CheckCircle2, AlertTriangle, ShieldCheck, Building2, Calendar, FileText, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Report Authenticity Verification | MediFlow LIS",
  description: "Cryptographically verified medical laboratory report authenticity page.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function VerifyReportPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const report = await db.report.findUnique({
    where: { verificationToken: token },
    include: {
      organization: {
        select: {
          displayName: true,
          legalName: true,
          licenseNo: true,
          registrationNo: true,
          city: true,
          country: true,
          primaryColor: true,
        },
      },
      branch: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!report) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-rose-500/30 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-rose-500/10 text-rose-400 rounded-full flex items-center justify-center mx-auto border border-rose-500/20">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Invalid Token</h1>
            <p className="text-sm text-slate-400 mt-2">
              This report verification token could not be authenticated in the MediFlow multi-tenant registry.
            </p>
          </div>
          <div className="p-4 bg-slate-950/60 rounded-xl text-xs text-rose-300 font-mono border border-rose-900/40">
            Token: {token}
          </div>
          <Link
            href="/patient-search"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-400 text-slate-950 text-xs font-bold hover:bg-teal-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Patient Search
          </Link>
        </div>
      </div>
    );
  }

  const isAuthorized = report.status === "Authorized" || report.status === "Amended";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-8 space-y-6">
      {/* Top Navigation Bar */}
      <div className="max-w-lg w-full flex items-center justify-between no-print">
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

      <div className="max-w-lg w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-8 shadow-2xl">
        {/* Verification Status Header */}
        <div className="text-center space-y-3">
          {isAuthorized ? (
            <div className="w-16 h-16 bg-teal-500/10 text-teal-400 rounded-full flex items-center justify-center mx-auto border border-teal-500/30 animate-pulse">
              <ShieldCheck className="w-10 h-10" />
            </div>
          ) : (
            <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/30">
              <AlertTriangle className="w-10 h-10" />
            </div>
          )}

          <div>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
              isAuthorized
                ? "bg-teal-500/10 text-teal-400 border-teal-500/30"
                : "bg-amber-500/10 text-amber-400 border-amber-500/30"
            }`}>
              {isAuthorized ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
              {isAuthorized ? "VERIFIED AUTHENTIC REPORT" : `STATUS: ${report.status.toUpperCase()}`}
            </span>
            <h1 className="text-2xl font-bold text-slate-100 mt-2">Laboratory Report Verification</h1>
            <p className="text-xs text-slate-400 mt-1">
              Issued by accredited medical facility via MediFlow SaaS
            </p>
          </div>
        </div>

        {/* Verification Details Grid */}
        <div className="space-y-4 bg-slate-950/80 p-5 rounded-xl border border-slate-800/80 text-sm">
          <div className="flex items-start justify-between pb-3 border-b border-slate-800">
            <span className="text-slate-400 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-teal-400" /> Facility:
            </span>
            <span className="font-semibold text-right text-slate-200">
              {report.organization.displayName}
            </span>
          </div>

          <div className="flex items-start justify-between pb-3 border-b border-slate-800">
            <span className="text-slate-400 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-500" /> Branch:
            </span>
            <span className="text-slate-300 font-medium">{report.branch.name}</span>
          </div>

          <div className="flex items-start justify-between pb-3 border-b border-slate-800">
            <span className="text-slate-400 flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-400" /> Report Number:
            </span>
            <span className="font-mono text-teal-300 font-bold">{report.reportNumber}</span>
          </div>

          <div className="flex items-start justify-between pb-3 border-b border-slate-800">
            <span className="text-slate-400 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500" /> Authorized Date:
            </span>
            <span className="text-slate-300 font-medium">
              {report.authorizedAt
                ? new Date(report.authorizedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Pending Authorization"}
            </span>
          </div>

          <div className="flex items-start justify-between">
            <span className="text-slate-400">Version:</span>
            <span className="text-slate-300 font-medium">v{report.version}</span>
          </div>
        </div>

        {/* Security Compliance Note */}
        <div className="p-3.5 bg-slate-900/60 rounded-lg border border-slate-800/60 text-xs text-slate-400 text-center leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-teal-400 inline mr-1 -mt-0.5" />
          HIPAA & GDPR Privacy Compliance Active. Full clinical diagnostic details are restricted to authorized patient and clinical practitioner portals.
        </div>
      </div>
    </div>
  );
}
