import { db } from "@/lib/db";
import { Sliders, Plus, FlaskConical, Layers, ShieldCheck, Tag } from "lucide-react";
import Link from "next/link";

export default async function TemplatesPage() {
  const org = await db.organization.findFirst({
    where: { slug: "demo-diagnostics" },
  });
  const orgId = org?.id || "";

  const templates = (db as any).reportTemplate
    ? await (db as any).reportTemplate.findMany({
        where: { orgId },
        include: {
          parameters: true,
        },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Sliders className="w-6 h-6 text-teal-400" />
            <span>Custom Report Templates & Parameter Batteries</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Build custom multi-parameter test templates (CBC, Biochemistry, Liver Function, Lipid Panel) with org-scoped parameters
          </p>
        </div>

        <Link
          href="/app/templates/new"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-bold text-xs hover:from-teal-300 hover:to-sky-300 transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create Custom Template
        </Link>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((tmpl: any) => (
          <div key={tmpl.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20 uppercase">
                  {tmpl.category}
                </span>
                <h2 className="text-lg font-bold text-slate-100 mt-1">{tmpl.name}</h2>
                <div className="text-xs text-slate-400 font-mono mt-0.5">{tmpl.code}</div>
              </div>
              <div className="px-3 py-1 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono font-bold text-slate-200">
                {tmpl.parameters?.length || 0} Parameters
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {tmpl.description || "Configured multi-analyte clinical testing battery."}
            </p>

            {/* Parameter Badges Preview */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-2">Battery Parameters</div>
              <div className="flex flex-wrap gap-1.5">
                {tmpl.parameters?.map((param: any) => (
                  <span key={param.id} className="px-2 py-1 rounded-md bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-mono">
                    {param.parameterName} ({param.unit})
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
