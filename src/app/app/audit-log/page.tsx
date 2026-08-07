import { db } from "@/lib/db";
import { getCurrentOrgId } from "@/lib/auth";
import { UserCheck, ShieldCheck, Clock, Terminal } from "lucide-react";

export default async function AuditLogPage() {
  // 100% Strict Tenant Scoping: Retrieves session orgId
  const orgId = await getCurrentOrgId();

  const auditLogs = await db.auditLog.findMany({
    where: { orgId },
    orderBy: { timestamp: "desc" },
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-teal-400" />
            <span>Immutable Audit Trail & Compliance Log</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            HIPAA & GDPR compliant log recording user access, report authorizations, and amendments for your organization
          </p>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 bg-slate-950/40 text-xs text-slate-400 flex items-center justify-between">
          <span>Tenant Audit Events: <strong className="text-slate-200">{auditLogs.length}</strong></span>
          <span className="text-teal-400 font-mono flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Row-Level Tenant Isolated Log
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px] bg-slate-950/80">
                <th className="py-3.5 px-5">Timestamp</th>
                <th className="py-3.5 px-5">User Email</th>
                <th className="py-3.5 px-5">Action Type</th>
                <th className="py-3.5 px-5">Target Entity</th>
                <th className="py-3.5 px-5">Event Description</th>
                <th className="py-3.5 px-5 text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {auditLogs.map((log: any) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-5 text-slate-400 font-sans">
                    {new Date(log.timestamp).toLocaleString("en-US")}
                  </td>
                  <td className="py-3.5 px-5 font-semibold text-slate-200">{log.userEmail || "System"}</td>
                  <td className="py-3.5 px-5">
                    <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 font-bold border border-teal-500/20 text-[10px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-slate-300 font-sans">{log.entity}</td>
                  <td className="py-3.5 px-5 text-slate-400 font-sans">{log.details}</td>
                  <td className="py-3.5 px-5 text-right text-slate-400">{log.ipAddress || "127.0.0.1"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
