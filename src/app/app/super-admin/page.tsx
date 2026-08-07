import { db } from "@/lib/db";
import { SuperAdminApprovalButtons } from "@/components/admin/SuperAdminApprovalButtons";
import { PricingPlanManager } from "@/components/super-admin/PricingPlanManager";
import { ShieldCheck, Mail, Building2, UserCheck, AlertTriangle, Clock, Award } from "lucide-react";

export default async function SuperAdminPortalPage() {
  const pendingOrgs = await db.organization.findMany({
    include: {
      users: { select: { name: true, email: true, role: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const pricingPlans = (db as any).pricingPlan
    ? await (db as any).pricingPlan.findMany({
        orderBy: { price: "asc" },
      })
    : [];

  const formattedPlans = pricingPlans.map((p: any) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    billing: p.billing,
    description: p.description,
    maxReports: p.maxReports,
    maxUsers: p.maxUsers,
    features: p.features,
    isPopular: p.isPopular,
  }));

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Super Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-teal-400" /> SaaS Operator & Platform Governance
          </div>
          <h1 className="text-2xl font-bold text-slate-100 mt-2 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-teal-400" />
            <span>Super Admin Registration Approval & Pricing Portal</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Platform Architect: <strong className="text-slate-200">Sher Muhammad</strong> • Notifications: <strong className="text-teal-300 font-mono">naseeraslamkhan016@gmail.com</strong>
          </p>
        </div>

        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-0.5">
          <div className="text-slate-400">Super Admin Contact</div>
          <div className="font-mono text-teal-400 font-bold">naseeraslamkhan016@gmail.com</div>
        </div>
      </div>

      {/* SUPER ADMIN PRICING PLAN MANAGEMENT SECTION */}
      <PricingPlanManager initialPlans={formattedPlans} />

      {/* ORGANIZATIONS APPROVAL SECTION */}
      <div className="space-y-4 pt-6 border-t border-slate-800">
        <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
          Registered Laboratory Organizations ({pendingOrgs.length})
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {pendingOrgs.map((org: any) => {
            const owner = org.users.find((u: any) => u.role === "OrgOwner") || org.users[0];

            return (
              <div key={org.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-teal-400 uppercase">{org.type}</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          org.approvalStatus === "Approved"
                            ? "bg-teal-500/10 text-teal-400 border-teal-500/20"
                            : org.approvalStatus === "Rejected"
                            ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        STATUS: {org.approvalStatus}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-100">{org.displayName}</h3>
                    <p className="text-xs text-slate-400">{org.legalName}</p>
                  </div>

                  <SuperAdminApprovalButtons orgId={org.id} currentStatus={org.approvalStatus} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-300">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-sans uppercase">Lab Owner Account</div>
                    <div className="font-bold text-slate-200 text-xs font-sans mt-0.5">{owner?.name || "Admin"}</div>
                    <div className="text-teal-400 text-[11px] truncate">{owner?.email}</div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-sans uppercase">CLIA / License</div>
                    <div className="font-bold text-slate-200 text-xs mt-0.5">{org.licenseNo || "CLIA-PENDING"}</div>
                    <div className="text-slate-400 text-[11px]">{org.phone}</div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-sans uppercase">Notification Trigger</div>
                    <div className="text-teal-400 text-[11px] font-bold">Email Dispatched</div>
                    <div className="text-slate-400 text-[10px]">{new Date(org.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
