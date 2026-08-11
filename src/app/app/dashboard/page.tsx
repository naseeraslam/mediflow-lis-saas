import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentOrgId } from "@/lib/auth";
import {
  Users,
  FileText,
  Clock,
  CheckCircle2,
  TrendingUp,
  Plus,
  ArrowRight,
  ShieldCheck,
  Building2,
  FlaskConical,
} from "lucide-react";

export default async function DashboardPage() {
  const orgId = await getCurrentOrgId();

  const org = await db.organization.findUnique({
    where: { id: orgId },
  });

  const [patientCount, reportCount, pendingCount, authorizedCount, recentReports] = await Promise.all([
    db.patient.count({ where: { orgId } }),
    db.report.count({ where: { orgId } }),
    db.report.count({ where: { orgId, status: { in: ["Draft", "Processing", "Review"] } } }),
    db.report.count({ where: { orgId, status: { in: ["Authorized", "Amended"] } } }),
    db.report.findMany({
      where: { orgId },
      include: { patient: true, branch: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>{org?.displayName || "Apex Demo Diagnostics"}</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/20">
              Active Tenant
            </span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
            Multi-Tenant Clinical LIS • Row-Level Data Isolation Enforced
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/app/reports/new"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-bold text-xs hover:from-teal-300 hover:to-sky-300 transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create Lab Report
          </Link>
          <Link
            href="/app/comparison"
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-semibold text-xs hover:bg-slate-800 transition-colors flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4 text-teal-400" /> Comparison Engine
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Patients</span>
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-100">{patientCount}</div>
          <div className="text-[11px] text-teal-400 font-medium">Tenant Scoped Records</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Reports</span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-100">{reportCount}</div>
          <div className="text-[11px] text-sky-400 font-medium">Generated & Archived</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Pending Review</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-100">{pendingCount}</div>
          <div className="text-[11px] text-amber-400 font-medium">Draft & Technologist Review</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Authorized & Signed</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-100">{authorizedCount}</div>
          <div className="text-[11px] text-emerald-400 font-medium">Cryptographically Verified</div>
        </div>
      </div>

      {/* Recent Laboratory Reports Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-100">Recent Medical Reports</h2>
            <p className="text-xs text-slate-400">Latest diagnostic entries across organization branches</p>
          </div>

          <Link href="/app/reports" className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1">
            <span>View All Reports</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px] bg-slate-950/50">
                <th className="py-3 px-5">Report No</th>
                <th className="py-3 px-5">Patient Name</th>
                <th className="py-3 px-5">Branch</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">Version</th>
                <th className="py-3 px-5">Created Date</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {recentReports.map((report: any) => (
                <tr key={report.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-teal-300">{report.reportNumber}</td>
                  <td className="py-3.5 px-5 font-sans font-semibold text-slate-200">{report.patient.fullName}</td>
                  <td className="py-3.5 px-5 text-slate-400 font-sans">{report.branch.name}</td>
                  <td className="py-3.5 px-5 font-sans">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      report.status === "Authorized"
                        ? "bg-teal-500/10 text-teal-400 border-teal-500/20"
                        : report.status === "Amended"
                        ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-slate-300 font-bold">v{report.version}</td>
                  <td className="py-3.5 px-5 text-slate-400 font-sans">
                    {new Date(report.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="py-3.5 px-5 text-right font-sans">
                    <Link
                      href={`/app/reports/${report.id}`}
                      className="text-xs font-semibold text-teal-400 hover:text-teal-300 underline"
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
