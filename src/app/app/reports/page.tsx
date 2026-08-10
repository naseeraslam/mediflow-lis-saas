import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentOrgId } from "@/lib/auth";
import { OrgInternalSearch } from "@/components/search/OrgInternalSearch";
import { FileText, Plus, Search, Filter, ArrowRight, ShieldCheck } from "lucide-react";

export default async function ReportsPage() {
  const orgId = await getCurrentOrgId();

  const reports = await db.report.findMany({
    where: { orgId },
    include: {
      patient: true,
      branch: true,
      doctor: true,
      results: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <FileText className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <span>Laboratory Reports Registry</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
            Search patient records by Phone Number, CNIC (ID), MRN Number, or Report Number
          </p>
        </div>

        <Link
          href="/app/reports/new"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-bold text-xs hover:from-teal-300 hover:to-sky-300 transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create New Report
        </Link>
      </div>

      {/* INTERNAL ORGANIZATION INSTANT MULTI-FIELD SEARCH */}
      <OrgInternalSearch />

      {/* Reports Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-600 dark:text-slate-400">
            Total Organization Reports: <span className="font-bold text-slate-900 dark:text-slate-200">{reports.length}</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Tenant Isolated</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 font-semibold uppercase tracking-wider text-[10px] bg-slate-100 dark:bg-slate-950/80">
                <th className="py-3.5 px-5">Report Number</th>
                <th className="py-3.5 px-5">Patient Name</th>
                <th className="py-3.5 px-5">CNIC / Phone</th>
                <th className="py-3.5 px-5">Branch</th>
                <th className="py-3.5 px-5">Tests Count</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Version</th>
                <th className="py-3.5 px-5">Date</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 font-mono">
              {reports.map((report: any) => (
                <tr key={report.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-teal-700 dark:text-teal-300">{report.reportNumber}</td>
                  <td className="py-3.5 px-5 font-sans font-semibold text-slate-900 dark:text-slate-200">{report.patient.fullName}</td>
                  <td className="py-3.5 px-5 text-slate-700 dark:text-slate-300">
                    <div>{report.patient.phone}</div>
                    {report.patient.cnic && (
                      <div className="text-[10px] text-teal-700 dark:text-teal-400 font-mono">{report.patient.cnic}</div>
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-slate-600 dark:text-slate-400 font-sans">{report.branch.name}</td>
                  <td className="py-3.5 px-5 text-slate-800 dark:text-slate-300 font-bold">{report.results.length} Tests</td>
                  <td className="py-3.5 px-5 font-sans">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      report.status === "Authorized"
                        ? "bg-teal-500/10 text-teal-800 dark:text-teal-400 border-teal-500/20"
                        : report.status === "Amended"
                        ? "bg-purple-500/10 text-purple-800 dark:text-purple-400 border-purple-500/20"
                        : "bg-amber-500/10 text-amber-800 dark:text-amber-400 border-amber-500/20"
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-slate-800 dark:text-slate-300 font-bold">v{report.version}</td>
                  <td className="py-3.5 px-5 text-slate-600 dark:text-slate-400 font-sans">
                    {new Date(report.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="py-3.5 px-5 text-right font-sans space-x-3">
                    <Link
                      href={`/app/reports/${report.id}`}
                      className="text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline"
                    >
                      View Report
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
