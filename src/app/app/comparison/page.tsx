import { db } from "@/lib/db";
import { compareReports } from "@/lib/comparison";
import { TrendingUp, Users, Calendar, ArrowRight, ShieldCheck, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default async function ComparisonPage({
  searchParams,
}: {
  searchParams: Promise<{ patientId?: string; currentReportId?: string }>;
}) {
  const { patientId, currentReportId } = await searchParams;

  const org = await db.organization.findFirst({
    where: { slug: "demo-diagnostics" },
  });
  const orgId = org?.id || "";

  const patients = await db.patient.findMany({
    where: { orgId },
    include: {
      reports: {
        where: { status: { in: ["Authorized", "Amended"] } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  const selectedPatient = patientId
    ? patients.find((p: any) => p.id === patientId)
    : patients[0];

  const patientReports = selectedPatient?.reports || [];
  const currentReport = currentReportId
    ? patientReports.find((r: any) => r.id === currentReportId) || patientReports[0]
    : patientReports[0];

  const previousReport = patientReports.find((r: any) => r.id !== currentReport?.id) || patientReports[1];

  let comparisonResults: any[] = [];
  let currentReportData: any = null;
  let previousReportData: any = null;

  if (currentReport && previousReport) {
    [currentReportData, previousReportData] = await Promise.all([
      db.report.findUnique({
        where: { id: currentReport.id },
        include: { results: { include: { test: true } } },
      }),
      db.report.findUnique({
        where: { id: previousReport.id },
        include: { results: { include: { test: true } } },
      }),
    ]);

    if (currentReportData && previousReportData) {
      const currentPrepared = currentReportData.results.map((r: any) => ({
        testCode: r.test.code,
        testName: r.testNameSnapshot,
        category: r.test.category,
        unit: r.unitSnapshot,
        numericValue: r.numericValue,
        stringValue: r.stringValue,
        refRange: r.refRangeSnapshot,
        flag: r.flag,
      }));

      const previousPrepared = previousReportData.results.map((r: any) => ({
        testCode: r.test.code,
        testName: r.testNameSnapshot,
        category: r.test.category,
        unit: r.unitSnapshot,
        numericValue: r.numericValue,
        stringValue: r.stringValue,
        refRange: r.refRangeSnapshot,
        flag: r.flag,
      }));

      comparisonResults = compareReports(currentPrepared, previousPrepared);
    }
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <span>Previous vs Current Report Comparison Engine</span>
          </h1>
          <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">
            Automated longitudinal baseline tracking, unit parity verification, and percentage delta calculation
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-800 dark:text-teal-300 border border-teal-500/20 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" /> 100% Deterministic Calculations
        </div>
      </div>

      {/* Patient & Report Selector Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl text-slate-900 dark:text-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-400 mb-2 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-teal-600 dark:text-teal-400" /> Select Patient
            </label>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-200">
              {selectedPatient ? `${selectedPatient.fullName} (${selectedPatient.mrn})` : "No Patients Available"}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-400 mb-2 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400" /> Baseline / Previous Report
            </label>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
              {previousReportData ? `${previousReportData.reportNumber} (${new Date(previousReportData.createdAt).toLocaleDateString()})` : "N/A Baseline"}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-400 mb-2 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400" /> Current Follow-Up Report
            </label>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-teal-700 dark:text-teal-300">
              {currentReportData ? `${currentReportData.reportNumber} (${new Date(currentReportData.createdAt).toLocaleDateString()})` : "N/A Current"}
            </div>
          </div>
        </div>
      </div>

      {/* COMPARISON RESULTS TABLE */}
      {comparisonResults.length > 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl space-y-4">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Comparative Analyte Analysis</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Comparing <span className="font-mono font-bold text-slate-900 dark:text-slate-200">{previousReportData?.reportNumber}</span> baseline against <span className="font-mono font-bold text-teal-700 dark:text-teal-300">{currentReportData?.reportNumber}</span> current
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 font-semibold uppercase tracking-wider text-[10px] bg-slate-100 dark:bg-slate-950/80">
                  <th className="py-3.5 px-5">Diagnostic Test</th>
                  <th className="py-3.5 px-5">Category</th>
                  <th className="py-3.5 px-5">Baseline Value</th>
                  <th className="py-3.5 px-5">Current Value</th>
                  <th className="py-3.5 px-5">Unit</th>
                  <th className="py-3.5 px-5">Ref Range</th>
                  <th className="py-3.5 px-5">Absolute Delta</th>
                  <th className="py-3.5 px-5">% Change</th>
                  <th className="py-3.5 px-5 text-right">Trend Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 font-mono">
                {comparisonResults.map((row: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-5 font-sans font-semibold text-slate-900 dark:text-slate-200">{row.testName}</td>
                    <td className="py-4 px-5 text-slate-600 dark:text-slate-400 font-sans">{row.category}</td>
                    <td className="py-4 px-5 text-slate-700 dark:text-slate-300">{row.previousValue ?? "N/A"}</td>
                    <td className="py-4 px-5 font-bold text-slate-900 dark:text-slate-100 text-sm">{row.currentValue ?? "N/A"}</td>
                    <td className="py-4 px-5 text-slate-600 dark:text-slate-400">{row.currentUnit}</td>
                    <td className="py-4 px-5 text-slate-600 dark:text-slate-400">{row.currentRefRange}</td>
                    <td className="py-4 px-5 font-bold">
                      {row.absoluteChange !== null ? (
                        <span className={row.absoluteChange > 0 ? "text-amber-600 dark:text-amber-400" : row.absoluteChange < 0 ? "text-sky-600 dark:text-sky-400" : "text-slate-700 dark:text-slate-300"}>
                          {row.absoluteChange > 0 ? `+${row.absoluteChange}` : row.absoluteChange}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-sans text-[11px]">—</span>
                      )}
                    </td>
                    <td className="py-4 px-5 font-bold">
                      {row.percentageChange !== null ? (
                        <span className={row.percentageChange > 0 ? "text-amber-600 dark:text-amber-400" : row.percentageChange < 0 ? "text-sky-600 dark:text-sky-400" : "text-slate-700 dark:text-slate-300"}>
                          {row.percentageChange > 0 ? `+${row.percentageChange}%` : `${row.percentageChange}%`}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-sans text-[11px]">—</span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-right font-sans">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        row.status === "Elevated"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                          : row.status === "Decreased"
                          ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20"
                          : row.status === "Incompatible"
                          ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                          : "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20"
                      }`}>
                        {row.status === "Elevated" ? "Elevated ↑" : row.status === "Decreased" ? "Decreased ↓" : row.status === "Incompatible" ? "Unit Mismatch" : "Stable ↔"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-xl text-slate-900 dark:text-slate-100">
          <AlertTriangle className="w-8 h-8 text-amber-500 dark:text-amber-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-200">Comparison Data Unavailable</h3>
          <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Selected patient requires at least two authorized medical lab reports to calculate historical baseline deltas.
          </p>
        </div>
      )}
    </div>
  );
}
