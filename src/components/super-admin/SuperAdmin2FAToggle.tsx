"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, ShieldAlert, Lock, ToggleLeft, ToggleRight, Sparkles } from "lucide-react";

export function SuperAdmin2FAToggle() {
  const [enforced, setEnforced] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/super-admin/2fa-policy")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && typeof data.enforced === "boolean") {
          setEnforced(data.enforced);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  async function handleToggle() {
    setLoading(true);
    setMessage(null);
    const nextState = !enforced;

    try {
      const res = await fetch("/api/super-admin/2fa-policy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enforced: nextState }),
      });
      const data = await res.json();

      if (data.success) {
        setEnforced(data.enforced);
        setMessage(data.message);
      }
    } catch (err: any) {
      console.error("2FA Toggle Error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 bg-slate-900 border border-teal-500/30 rounded-2xl space-y-4 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
            <Lock className="w-4 h-4 text-teal-400" />
            <span>Super Admin Security Controls</span>
          </div>
          <h2 className="text-base font-extrabold text-slate-100">
            Global 2FA Two-Factor Authentication Policy
          </h2>
          <p className="text-xs text-slate-400 max-w-xl">
            Toggle 2FA passcode enforcement ON or OFF globally for all laboratory personnel and login portals.
          </p>
        </div>

        {/* Toggle Switch Button */}
        <button
          type="button"
          onClick={handleToggle}
          disabled={loading}
          className={`px-5 py-3 rounded-2xl font-black text-xs transition-all flex items-center gap-2.5 shadow-lg cursor-pointer ${
            enforced
              ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-emerald-500/20"
              : "bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30"
          }`}
        >
          {enforced ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5 text-rose-400" />}
          <span>{enforced ? "2FA Enforcement: ON (Strict 6-Digit OTP)" : "2FA Enforcement: OFF (Direct Password Login)"}</span>
        </button>
      </div>

      {message && (
        <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-xl text-teal-300 font-semibold text-xs text-center flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
