"use client";

import { useState } from "react";
import { Check, X, ShieldCheck, RefreshCw } from "lucide-react";

export function SuperAdminApprovalButtons({ orgId, currentStatus }: { orgId: string; currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  async function handleUpdateStatus(newStatus: "Approved" | "Rejected") {
    setLoading(true);
    try {
      const res = await fetch("/api/super-admin/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orgId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus(newStatus);
      }
    } catch (err) {
      console.error("Approval error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      {status === "PendingApproval" ? (
        <>
          <button
            onClick={() => handleUpdateStatus("Approved")}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-teal-400 text-slate-950 text-xs font-bold shadow-md hover:bg-teal-300 transition-colors flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" /> Approve Tenant
          </button>

          <button
            onClick={() => handleUpdateStatus("Rejected")}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold hover:bg-rose-500/20 transition-colors flex items-center gap-1.5"
          >
            <X className="w-4 h-4" /> Reject Request
          </button>
        </>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-300">
            {status === "Approved" ? "✅ Approved Tenant" : "❌ Rejected Request"}
          </span>
          <button
            onClick={() => handleUpdateStatus(status === "Approved" ? "Rejected" : "Approved")}
            className="p-1 rounded text-slate-400 hover:text-slate-200"
            title="Toggle Status"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
