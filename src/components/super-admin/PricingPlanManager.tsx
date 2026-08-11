"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SUPPORTED_CURRENCIES, formatCurrency } from "@/lib/currency";
import { Award, DollarSign, Check, Edit2, Save, X, Plus, Sparkles, Globe } from "lucide-react";

export interface PricingPlanItem {
  id: string;
  name: string;
  price: number;
  currency?: string;
  billing: string;
  description: string;
  maxReports: number;
  maxUsers: number;
  features: string;
  isPopular: boolean;
}

export function PricingPlanManager({ initialPlans }: { initialPlans: PricingPlanItem[] }) {
  const router = useRouter();
  const [plans, setPlans] = useState<PricingPlanItem[]>(initialPlans);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState(initialPlans[0]?.currency || "USD");

  const [editForm, setEditForm] = useState({
    price: 0,
    description: "",
    maxReports: 0,
    maxUsers: 0,
  });

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // Handle Global Currency Change by Super Admin
  async function handleGlobalCurrencyChange(newCurrency: string) {
    setSelectedCurrency(newCurrency);
    setSaving(true);
    setMsg(null);

    try {
      const res = await fetch("/api/super-admin/pricing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ globalCurrency: newCurrency }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setMsg(`⚠️ ${data.error || "Failed to update platform currency."}`);
      } else {
        setMsg(`✅ Super Admin set default platform currency to '${newCurrency}'!`);
        setTimeout(() => setMsg(null), 3000);
        router.refresh();
      }
    } catch (err: any) {
      setMsg(`⚠️ ${err.message || "Network connection error."}`);
    } finally {
      setSaving(false);
    }
  }

  function handleStartEdit(plan: PricingPlanItem) {
    setEditingId(plan.id);
    setEditForm({
      price: plan.price,
      description: plan.description,
      maxReports: plan.maxReports,
      maxUsers: plan.maxUsers,
    });
  }

  async function handleSave(planId: string) {
    setSaving(true);
    setMsg(null);

    try {
      const res = await fetch("/api/super-admin/pricing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          currency: selectedCurrency,
          ...editForm,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setMsg(`⚠️ ${data.error || "Failed to update pricing."}`);
        setSaving(false);
        return;
      }

      setPlans(plans.map((p) => (p.id === planId ? { ...p, ...editForm, currency: selectedCurrency } : p)));
      setEditingId(null);
      setMsg("✅ Pricing plan updated successfully!");
      setTimeout(() => setMsg(null), 3000);
      router.refresh();
    } catch (err: any) {
      setMsg(`⚠️ ${err.message || "Network connection error."}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Super Admin SaaS Subscription Pricing Engine
            </h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
            Exclusive privileges for Super Admin Sher Muhammad (<strong className="text-teal-700 dark:text-teal-300 font-mono">naseeraslamkhan016@gmail.com</strong>).
          </p>
        </div>

        {/* Super Admin Currency Selector */}
        <div className="flex items-center gap-2 text-xs bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-teal-500/40">
          <Globe className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span className="text-slate-800 dark:text-slate-300 font-bold">Super Admin Platform Currency:</span>
          <select
            value={selectedCurrency}
            onChange={(e) => handleGlobalCurrencyChange(e.target.value)}
            disabled={saving}
            className="p-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-teal-700 dark:text-teal-300 font-extrabold text-xs outline-none cursor-pointer"
          >
            {Object.values(SUPPORTED_CURRENCIES).map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>

      {msg && (
        <div className="p-3 bg-teal-500/10 dark:bg-slate-950 border border-teal-500/30 rounded-xl text-teal-800 dark:text-teal-300 text-xs font-bold text-center">
          {msg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isEditing = editingId === plan.id;
          const formattedDisplay = formatCurrency(isEditing ? editForm.price : plan.price, selectedCurrency);

          return (
            <div
              key={plan.id}
              className={`p-5 rounded-xl border space-y-4 relative transition-colors ${
                plan.isPopular
                  ? "bg-teal-500/5 dark:bg-slate-950/80 border-teal-500/60 shadow-lg shadow-teal-500/10"
                  : "bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-800 dark:text-teal-300 border border-teal-500/30 text-[10px] font-extrabold uppercase">
                  ⭐ Popular Tier
                </div>
              )}

              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{plan.name}</h3>
                {!isEditing ? (
                  <button
                    onClick={() => handleStartEdit(plan)}
                    className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-teal-700 dark:text-teal-400 transition-colors cursor-pointer"
                    title="Edit Plan Price & Limits"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingId(null)}
                    className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[10px] text-slate-600 dark:text-slate-400 font-bold mb-1">Base Price in USD ($)</label>
                    <input
                      type="number"
                      value={editForm.price}
                      onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                      className="w-full p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800 text-teal-700 dark:text-teal-400 font-bold font-mono outline-none"
                    />
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
                      Renders on /pricing as: <strong className="text-teal-700 dark:text-teal-300 font-bold">{formattedDisplay}</strong>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-600 dark:text-slate-400 font-bold mb-1">Description</label>
                    <input
                      type="text"
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="w-full p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-600 dark:text-slate-400 font-bold mb-1">Monthly Reports Quota</label>
                      <input
                        type="number"
                        value={editForm.maxReports}
                        onChange={(e) => setEditForm({ ...editForm, maxReports: Number(e.target.value) })}
                        className="w-full p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono font-bold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-600 dark:text-slate-400 font-bold mb-1">Personnel User Seats</label>
                      <input
                        type="number"
                        value={editForm.maxUsers}
                        onChange={(e) => setEditForm({ ...editForm, maxUsers: Number(e.target.value) })}
                        className="w-full p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono font-bold outline-none"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleSave(plan.id)}
                    disabled={saving}
                    className="w-full py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? "Saving..." : "Save Plan Changes"}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-teal-700 dark:text-teal-400">{formattedDisplay}</span>
                    <span className="text-slate-500 text-xs font-mono">/ {plan.billing}</span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{plan.description}</p>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1 text-xs font-mono font-semibold">
                    <div className="flex justify-between text-slate-700 dark:text-slate-300">
                      <span>Monthly Quota:</span>
                      <span className="text-teal-700 dark:text-teal-400 font-bold">{plan.maxReports.toLocaleString()} Reports</span>
                    </div>
                    <div className="flex justify-between text-slate-700 dark:text-slate-300">
                      <span>Personnel Seats:</span>
                      <span className="text-sky-700 dark:text-sky-400 font-bold">{plan.maxUsers} Users</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
