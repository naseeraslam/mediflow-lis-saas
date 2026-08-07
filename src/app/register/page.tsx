"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";
import { Building2, ShieldCheck, Sparkles, User, Mail, Lock, Phone, Palette, ArrowRight, KeyRound, ShieldAlert } from "lucide-react";

export default function RegisterLabPage() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "2fa">("form");
  const [otpCode, setOtpCode] = useState("");
  const [demoOtp, setDemoOtp] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    displayName: "",
    legalName: "",
    type: "DiagnosticLab",
    licenseNo: "",
    email: "",
    phone: "",
    primaryColor: "#0f766e",
    secondaryColor: "#0284c7",
    adminName: "",
    adminEmail: "",
    adminPassword: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Step 1: Submit Details & Request 2FA OTP
  async function handleInitialSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Send 2FA Code to adminEmail
      const res2fa = await fetch("/api/auth/2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.adminEmail, action: "send" }),
      });
      const data2fa = await res2fa.json();

      if (data2fa.success) {
        setDemoOtp(data2fa.demoOtp);
        setStep("2fa");
      } else {
        setError(data2fa.error || "Failed to send 2FA OTP code.");
      }
    } catch (err: any) {
      setError("Network connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Step 2: Verify 2FA OTP & Perform Registration
  async function handle2faRegisterSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Verify 2FA Code
      const res2fa = await fetch("/api/auth/2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.adminEmail, otpCode, action: "verify" }),
      });
      const data2fa = await res2fa.json();

      if (!res2fa.ok || data2fa.error) {
        setError(data2fa.error || "Invalid 2FA Passcode.");
        setLoading(false);
        return;
      }

      // 2. Complete Registration
      const resReg = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const dataReg = await resReg.json();

      if (!resReg.ok || dataReg.error) {
        setError(dataReg.error || "Registration failed. Please check input fields.");
        setLoading(false);
        return;
      }

      // Success -> Redirect to Private Dashboard
      router.push("/app/dashboard");
    } catch (err: any) {
      setError("Network connection error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <PublicNavbar />

      <main className="max-w-4xl mx-auto px-4 py-16 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" /> Lab Owner Self-Service Onboarding
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            Register Your Diagnostic Laboratory
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Initialize your multi-tenant laboratory workspace with custom branding, 2FA security, and report engines
          </p>
        </div>

        {step === "form" ? (
          <form onSubmit={handleInitialSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-8 shadow-2xl">
            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-semibold text-center">
                ⚠️ {error}
              </div>
            )}

            {/* Step 1: Organization Details */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-teal-400 uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4" /> 1. Organization & Facility Metadata
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Laboratory Display Name *</label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Metro Diagnostic Pathology"
                    className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 focus:border-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Legal Entity Name *</label>
                  <input
                    type="text"
                    name="legalName"
                    value={formData.legalName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Metro Healthcare Private Ltd."
                    className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 focus:border-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Facility Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 focus:border-teal-500 outline-none"
                  >
                    <option value="DiagnosticLab">Diagnostic Laboratory</option>
                    <option value="Hospital">Hospital Pathology</option>
                    <option value="Pathology">Pathology Network</option>
                    <option value="Clinic">Medical Clinic Center</option>
                    <option value="Radiology">Imaging & Radiology Center</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">CLIA / Accreditation License No</label>
                  <input
                    type="text"
                    name="licenseNo"
                    value={formData.licenseNo}
                    onChange={handleChange}
                    placeholder="e.g. CLIA-99201-TX"
                    className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 font-mono focus:border-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Business Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="contact@metrolab.com"
                    className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 focus:border-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Facility Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (800) 555-9000"
                    className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 focus:border-teal-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Branding Colors */}
            <div className="pt-6 border-t border-slate-800 space-y-4">
              <h2 className="text-sm font-bold text-teal-400 uppercase tracking-wider flex items-center gap-2">
                <Palette className="w-4 h-4" /> 2. White-Label Report Theme Colors
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Primary Theme Accent Color</label>
                  <input
                    type="color"
                    name="primaryColor"
                    value={formData.primaryColor}
                    onChange={handleChange}
                    className="w-full h-11 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer p-1"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Secondary Theme Accent Color</label>
                  <input
                    type="color"
                    name="secondaryColor"
                    value={formData.secondaryColor}
                    onChange={handleChange}
                    className="w-full h-11 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer p-1"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Administrator Account */}
            <div className="pt-6 border-t border-slate-800 space-y-4">
              <h2 className="text-sm font-bold text-teal-400 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4" /> 3. Lab Owner / Pathologist Admin Account
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Owner Full Name *</label>
                  <input
                    type="text"
                    name="adminName"
                    value={formData.adminName}
                    onChange={handleChange}
                    required
                    placeholder="Dr. Arthur Pendelton, MD"
                    className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 focus:border-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Admin Login Email *</label>
                  <input
                    type="email"
                    name="adminEmail"
                    value={formData.adminEmail}
                    onChange={handleChange}
                    required
                    placeholder="owner@metrolab.com"
                    className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 focus:border-teal-500 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Admin Password *</label>
                  <input
                    type="password"
                    name="adminPassword"
                    value={formData.adminPassword}
                    onChange={handleChange}
                    required
                    placeholder="••••••••••••"
                    className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 focus:border-teal-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Link href="/login" className="text-xs text-slate-400 hover:text-teal-400 underline">
                Already registered? Sign in to your portal
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="py-4 px-8 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-bold text-sm shadow-xl shadow-teal-500/20 hover:from-teal-300 hover:to-sky-300 transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-5 h-5" />
                {loading ? "Sending 2FA OTP Code..." : "Register & Continue to 2FA Verification"}
              </button>
            </div>
          </form>
        ) : (
          /* STEP 2: REGISTRATION 2FA VERIFICATION FORM */
          <form onSubmit={handle2faRegisterSubmit} className="max-w-md mx-auto bg-slate-900 border border-teal-500/30 rounded-2xl p-8 space-y-6 shadow-2xl text-xs">
            <div className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl space-y-1">
              <div className="font-bold text-teal-300 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-teal-400" /> 2FA Verification Code Sent
              </div>
              <p className="text-slate-400 text-[11px]">
                A 6-digit passcode has been sent to your email <strong className="text-slate-200">{formData.adminEmail}</strong>.
              </p>

              {demoOtp && (
                <div className="pt-2 text-slate-300 font-mono text-[11px] flex items-center justify-between border-t border-teal-500/20 mt-2">
                  <span>Generated Demo 2FA OTP:</span>
                  <button
                    type="button"
                    onClick={() => setOtpCode(demoOtp)}
                    className="px-2 py-0.5 rounded bg-teal-400 text-slate-950 font-bold hover:bg-teal-300 transition-colors"
                  >
                    Auto-Fill ({demoOtp})
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 font-semibold text-center">
                ⚠️ {error}
              </div>
            )}

            <div>
              <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-teal-400" /> Enter 6-Digit 2FA OTP Passcode *
              </label>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                required
                placeholder="e.g. 482910"
                className="w-full p-4 bg-slate-950 rounded-xl border border-slate-800 text-teal-300 font-mono font-bold text-lg text-center tracking-widest focus:border-teal-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep("form")}
                className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 font-semibold hover:bg-slate-800 transition-colors"
              >
                Back
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 hover:from-teal-300 hover:to-sky-300 transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                {loading ? "Completing Registration..." : "Verify 2FA & Launch Dashboard"}
              </button>
            </div>
          </form>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}
