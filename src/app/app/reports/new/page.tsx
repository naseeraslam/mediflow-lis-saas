import Link from "next/link";
import { db } from "@/lib/db";
import { NewReportForm } from "@/components/report/NewReportForm";
import { FileText, ArrowLeft } from "lucide-react";

export default async function NewReportPage() {
  const org = await db.organization.findFirst({
    where: { slug: "demo-diagnostics" },
  });
  const orgId = org?.id || "";

  const [patients, branches, tests] = await Promise.all([
    db.patient.findMany({
      where: { orgId },
      orderBy: { createdAt: "desc" },
      select: { id: true, fullName: true, mrn: true, gender: true, dateOfBirth: true, phone: true },
    }),
    db.branch.findMany({
      where: { orgId },
      select: { id: true, name: true, code: true },
    }),
    db.testDefinition.findMany({
      where: { orgId },
      select: {
        id: true,
        code: true,
        name: true,
        category: true,
        unit: true,
        refRangeMale: true,
        refRangeFemale: true,
        minValue: true,
        maxValue: true,
      },
    }),
  ]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link
          href="/app/reports"
          className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <FileText className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <span>Create New Clinical Diagnostic Report</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
            Order entry with dynamic parameter creation and 1-click WHO standard sample templates
          </p>
        </div>
      </div>

      <NewReportForm patients={patients} branches={branches} testCatalog={tests} />
    </div>
  );
}
