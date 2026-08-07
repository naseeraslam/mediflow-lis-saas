"use client";

import { useState } from "react";
import { SUPPORTED_CURRENCIES } from "@/lib/currency";
import { Building2, Palette, ShieldCheck, Check, Save, Phone, MessageCircle, Lock, Mail, Send, KeyRound, Globe, DollarSign } from "lucide-react";

export function OrgSettingsForm({ organization }: { organization: any }) {
  const [formData, setFormData] = useState({
    displayName: organization?.displayName || "",
    legalName: organization?.legalName || "",
    licenseNo: organization?.licenseNo || "",
    taxId: organization?.taxId || "",
    phone: organization?.phone || "",
    whatsappPhone: organization?.whatsappPhone || "",
    address: organization?.address || "",
    city: organization?.city || "",
    currency: organization?.currency || "USD",
    primaryColor: organization?.primaryColor || "#0f766e",
    secondaryColor: organization?.secondaryColor || "#0284c7",
    headerText: organization?.headerText || "",
    disclaimerText: organization?.disclaimerText || "",
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [twoFactorEmail, setTwoFactorEmail] = useState(organization?.email || "naseeraslamkhan016@gmail.com");
  const [testOtpStatus, setTestOtpStatus] = useState<string | null>(null);
  const [testingOtp, setTestingOtp] = useState(false);

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Trigger Live 2FA OTP Test Email
  async function handleSendTestOtp() {
    setTestingOtp(true);
    setTestOtpStatus(null);

    try {
      const res = await fetch("/api/auth/2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: twoFactorEmail, action: "send" }),
      });
      const data = await res.json();
      if (data.success) {
        setTestOtpStatus(`✅ Live 2FA OTP Code sent to ${twoFactorEmail}! (Check email inbox or terminal output)`);
      } else {
        setTestOtpStatus("❌ Failed to send 2FA test email.");
      }
    } catch (err) {
      setTestOtpStatus("❌ Network error sending test 2FA OTP.");
    } finally {
      setTestingOtp(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMsg(false);

    try {
      const res = await fetch("/api/organization/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, twoFactorEnabled, twoFactorEmail }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Failed to update settings.");
        setSaving(false);
        return;
      }

      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    } catch (err: any) {
      setError("Network connection error.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 rounded-2xl border border-slate-800 p-8 space-y-8 shadow-xl">
      {successMsg && (
        <div className="p-4 bg-teal-500/10 border border-teal-500/30 rounded-xl text-teal-300 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-teal-400" />
          <span>Organization Branding, Currency & 2FA Settings Successfully Updated!</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-semibold">
          ⚠️ {error}
        </div>
      )}

      {/* 2FA SECURITY & AUTHENTICATION CONFIGURATION CARD */}
      <div className="p-6 bg-slate-950 border border-teal-500/30 rounded-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-teal-400" />
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              2FA Two-Factor Security & Email OTP Settings
            </h2>
          </div>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">
            ENFORCED PRIVACY
          </span>
        </div>

        <p className="text-xs text-slate-400">
          Enforce mandatory 6-digit One-Time Passcode (OTP) two-factor verification on every staff login and lab owner registration.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-2">
            <label className="block text-slate-300 font-semibold">2FA Enforcement Status</label>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="toggle2FA"
                checked={twoFactorEnabled}
                onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                className="w-5 h-5 rounded accent-teal-500 cursor-pointer"
              />
              <label htmlFor="toggle2FA" className="text-slate-200 font-bold cursor-pointer">
                {twoFactorEnabled ? "2FA Enabled for All Staff Logins" : "2FA Disabled"}
              </label>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-teal-400" /> 2FA Notification Email Address
            </label>
            <input
              type="email"
              value={twoFactorEmail}
              onChange={(e) => setTwoFactorEmail(e.target.value)}
              placeholder="e.g. naseeraslamkhan016@gmail.com"
              className="w-full p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-100 font-mono font-bold focus:border-teal-500 outline-none"
            />
          </div>
        </div>

        {/* Live 2FA Test Button */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-[11px] text-slate-400">
            Test 2FA OTP email dispatch directly to <strong className="text-slate-200 font-mono">{twoFactorEmail}</strong>
          </div>

          <button
            type="button"
            onClick={handleSendTestOtp}
            disabled={testingOtp}
            className="px-4 py-2.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-300 font-bold text-xs flex items-center gap-2 transition-colors shrink-0"
          >
            <Send className="w-3.5 h-3.5 text-teal-400" />
            {testingOtp ? "Sending 2FA OTP Email..." : "Send Test 2FA OTP Code"}
          </button>
        </div>

        {testOtpStatus && (
          <div className="p-3 bg-slate-900 border border-teal-500/30 rounded-xl text-teal-300 text-xs font-mono font-bold">
            {testOtpStatus}
          </div>
        )}
      </div>

      {/* Facility & Accreditation Details */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-teal-400 uppercase tracking-wider flex items-center gap-2">
          <Building2 className="w-4 h-4" /> 1. Facility Metadata & Multi-Currency Billing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Laboratory Display Name *</label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              required
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 font-bold focus:border-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Legal Registered Name *</label>
            <input
              type="text"
              name="legalName"
              value={formData.legalName}
              onChange={handleChange}
              required
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 focus:border-teal-500 outline-none"
            />
          </div>

          {/* COUNTRY-WISE MULTI-CURRENCY SELECTOR */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-teal-400" /> Facility Operating Currency *
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-teal-300 font-bold focus:border-teal-500 outline-none"
            >
              {Object.values(SUPPORTED_CURRENCIES).map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} ({c.symbol})
                </option>
              ))}
            </select>
            <p className="text-[10px] text-slate-400 mt-1">
              Selected currency formats all report billing fees and patient receipts
            </p>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">CLIA / Accreditation License No</label>
            <input
              type="text"
              name="licenseNo"
              value={formData.licenseNo}
              onChange={handleChange}
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-teal-300 font-mono font-bold focus:border-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Facility Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 focus:border-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Patient WhatsApp Desk Phone</label>
            <input
              type="text"
              name="whatsappPhone"
              value={formData.whatsappPhone}
              onChange={handleChange}
              placeholder="+1 (800) 555-2739"
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-emerald-400 font-mono font-bold focus:border-teal-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Report Theme Colors */}
      <div className="pt-6 border-t border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-teal-400 uppercase tracking-wider flex items-center gap-2">
          <Palette className="w-4 h-4" /> 2. White-Label Report Theme Colors
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Primary Accent Theme Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                name="primaryColor"
                value={formData.primaryColor}
                onChange={handleChange}
                className="w-12 h-11 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer p-1"
              />
              <input
                type="text"
                name="primaryColor"
                value={formData.primaryColor}
                onChange={handleChange}
                className="flex-1 p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Secondary Accent Theme Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                name="secondaryColor"
                value={formData.secondaryColor}
                onChange={handleChange}
                className="w-12 h-11 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer p-1"
              />
              <input
                type="text"
                name="secondaryColor"
                value={formData.secondaryColor}
                onChange={handleChange}
                className="flex-1 p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-slate-200"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-300 font-semibold mb-1">PDF Report Header Text</label>
            <textarea
              name="headerText"
              rows={2}
              value={formData.headerText}
              onChange={handleChange}
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 font-mono outline-none focus:border-teal-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-300 font-semibold mb-1">PDF Disclaimer & Legal Notice</label>
            <textarea
              name="disclaimerText"
              rows={3}
              value={formData.disclaimerText}
              onChange={handleChange}
              className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 outline-none focus:border-teal-500"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 hover:from-teal-300 hover:to-sky-300 transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving Settings..." : "Save Organization Settings"}
        </button>
      </div>
    </form>
  );
}
