import { db } from "@/lib/db";
import { CheckCircle2, AlertTriangle, ShieldCheck, Building2, Calendar, FileText, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeProvider";

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
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-rose-500/30 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto border border-rose-500/20">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">Invalid Token</h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-medium">
              This report verification token could not be authenticated in the MediFlow multi-tenant registry.
            </p>
          </div>
          <div className="p-4 bg-slate-100 dark:bg-slate-950/60 rounded-xl text-xs text-rose-600 dark:text-rose-300 font-mono border border-rose-200 dark:border-rose-900/40">
            Token: {token}
          </div>
          <Link
            href="/patient-search"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 text-xs font-black shadow-lg shadow-teal-500/20"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Patient Search
          </Link>
        </div>
      </div>
    );
  }

  const isAuthorized = report.status === "Authorized" || report.status === "Amended";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-4 sm:p-8 space-y-6">
      {/* Top Navigation Bar */}
      <div className="max-w-lg w-full flex items-center justify-between no-print bg-white dark:bg-slate-900 p-3 px-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <Link
            href="/patient-search"
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-teal-600 dark:text-teal-400" /> Back to Patient Search
          </Link>

          <Link
            href="/"
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
        </div>

        <ThemeToggle />
      </div>

      <div className="max-w-lg w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 space-y-8 shadow-2xl">
        {/* Verification Status Header */}
        <div className="text-center space-y-3">
          {isAuthorized ? (
            <div className="w-16 h-16 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center mx-auto border border-teal-500/30 animate-pulse">
              <ShieldCheck className="w-10 h-10" />
            </div>
          ) : (
            <div className="w-16 h-16 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/30">
              <AlertTriangle className="w-10 h-10" />
            </div>
          )}

          <div>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${
              isAuthorized
                ? "bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/30"
                : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30"
            }`}>
              {isAuthorized ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
              {isAuthorized ? "VERIFIED AUTHENTIC REPORT" : `STATUS: ${report.status.toUpperCase()}`}
            </span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">Laboratory Report Verification</h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
              Issued by accredited medical facility via MediFlow SaaS
            </p>
          </div>
        </div>

        {/* Verification Details Grid */}
        <div className="space-y-4 bg-slate-50 dark:bg-slate-950/80 p-5 rounded-xl border border-slate-200 dark:border-slate-800/80 text-sm">
          <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2 font-medium">
              <Building2 className="w-4 h-4 text-teal-600 dark:text-teal-400" /> Facility:
            </span>
            <span className="font-extrabold text-right text-slate-900 dark:text-slate-200">
              {report.organization.displayName}
            </span>
          </div>

          <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2 font-medium">
              <Building2 className="w-4 h-4 text-slate-500" /> Branch:
            </span>
            <span className="text-slate-800 dark:text-slate-300 font-bold">{report.branch.name}</span>
          </div>

          <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2 font-medium">
              <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400" /> Report Number:
            </span>
            <span className="font-mono text-teal-700 dark:text-teal-300 font-black">{report.reportNumber}</span>
          </div>

          <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2 font-medium">
              <Calendar className="w-4 h-4 text-slate-500" /> Authorized Date:
            </span>
            <span className="text-slate-800 dark:text-slate-300 font-bold">
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
            <span className="text-slate-600 dark:text-slate-400 font-medium">Version:</span>
            <span className="text-slate-800 dark:text-slate-300 font-bold">v{report.version}</span>
          </div>
        </div>

        {/* Security Compliance Note */}
        <div className="p-3.5 bg-slate-100 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800/60 text-xs text-slate-600 dark:text-slate-400 text-center leading-relaxed font-medium">
          <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400 inline mr-1 -mt-0.5" />
          HIPAA & GDPR Privacy Compliance Active. Full clinical diagnostic details are restricted to authorized patient and clinical practitioner portals.
        </div>
      </div>
    </div>
  );
}
