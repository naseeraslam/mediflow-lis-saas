"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";
import { useLanguage } from "@/components/i18n/LanguageToggle";
import { Lock, Mail, ShieldCheck, KeyRound, Sparkles, Check, ArrowRight, ShieldAlert, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [dispatchedCode, setDispatchedCode] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [step, setStep] = useState<"credentials" | "2fa">("credentials");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1: Verify Credentials & Request 2FA OTP Code
  async function handleCredentialsSubmit(e?: React.FormEvent, customEmail?: string, customPassword?: string) {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    const loginEmail = customEmail || email;
    const loginPassword = customPassword || password;

    try {
      // 1. VERIFY CREDENTIALS FIRST & SEND 2FA OTP IF VALID
      const res2fa = await fetch("/api/auth/2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword, action: "send" }),
      });
      const data2fa = await res2fa.json();

      if (!res2fa.ok || data2fa.error) {
        setError(data2fa.error || "Invalid email address or password.");
        setLoading(false);
        return;
      }

      // 2. CHECK SUPER ADMIN 2FA POLICY
      const resPolicy = await fetch("/api/super-admin/2fa-policy");
      const policyData = await resPolicy.json();

      // If 2FA Enforcement is OFF from Super Admin, perform direct login & launch dashboard!
      if (policyData.success && policyData.enforced === false) {
        const resLogin = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: loginEmail, password: loginPassword }),
        });
        const dataLogin = await resLogin.json();
        if (resLogin.ok && dataLogin.success) {
          router.push("/app/dashboard");
          return;
        } else {
          setError(dataLogin.error || "Authentication failed.");
          setLoading(false);
          return;
        }
      }

      // If 2FA Enforcement is ON, move to Step 2 (2FA OTP Entry Form)
      setEmail(loginEmail);
      setPassword(loginPassword);
      setDispatchedCode(data2fa.otpCode || null);
      setStep("2fa");
    } catch (err: any) {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Step 2: Verify 2FA OTP & Authenticate Session
  async function handle2faSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Verify 2FA Code
      const res2fa = await fetch("/api/auth/2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otpCode, action: "verify" }),
      });
      const data2fa = await res2fa.json();

      if (!res2fa.ok || data2fa.error) {
        setError(data2fa.error || "Invalid 2FA Passcode.");
        setLoading(false);
        return;
      }

      // 2. Perform Session Login
      const resLogin = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const dataLogin = await resLogin.json();
      if (!resLogin.ok || dataLogin.error) {
        setError(dataLogin.error || "Authentication failed.");
        setLoading(false);
        return;
      }

      router.push("/app/dashboard");
    } catch (err: any) {
      setError("2FA Verification error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <PublicNavbar />

      <main className="max-w-md mx-auto px-4 py-16 space-y-6">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-teal-500/10 text-teal-400 rounded-2xl flex items-center justify-center mx-auto border border-teal-500/20">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-100">{t("staffLogin")}</h1>
          <p className="text-xs text-slate-400">
            Enforced 2FA Two-Factor Authentication for all laboratory personnel and org owners
          </p>
        </div>

        {step === "credentials" ? (
          <>
            {/* 1-Click Quick Demo Sign In Shortcuts */}
            <div className="p-4 bg-slate-900 border border-teal-500/30 rounded-2xl space-y-3 shadow-xl">
              <div className="text-xs font-bold text-teal-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-400" /> 1-Click Quick Demo Login Shortcuts
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleCredentialsSubmit(undefined, "admin@apex.com", "demo1234")}
                  className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-all space-y-0.5"
                >
                  <div className="text-[11px] font-bold text-slate-200">Org Owner</div>
                  <div className="text-[9px] text-teal-400 font-mono">admin@apex.com</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleCredentialsSubmit(undefined, "pathologist@apex.com", "demo1234")}
                  className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-all space-y-0.5"
                >
                  <div className="text-[11px] font-bold text-slate-200">Pathologist</div>
                  <div className="text-[9px] text-teal-400 font-mono">pathologist@apex.com</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleCredentialsSubmit(undefined, "tech@apex.com", "demo1234")}
                  className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-all space-y-0.5"
                >
                  <div className="text-[11px] font-bold text-slate-200">Technician</div>
                  <div className="text-[9px] text-teal-400 font-mono">tech@apex.com</div>
                </button>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleCredentialsSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl text-xs">
              {error && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 font-semibold text-center">
                  ⚠️ {error}
                </div>
              )}

              <div>
                <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-teal-400" /> {t("accountEmail")}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="user@yourlab.com"
                  className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 focus:border-teal-500 outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-teal-400" /> {t("password")}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 focus:border-teal-500 outline-none font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 hover:from-teal-300 hover:to-sky-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                {loading ? "Sending 2FA OTP Code..." : t("continue2FA")}
              </button>
            </form>
          </>
        ) : (
          /* STEP 2: 2FA OTP ENTRY FORM */
          <form onSubmit={handle2faSubmit} className="bg-slate-900 border border-teal-500/30 rounded-2xl p-6 space-y-6 shadow-2xl text-xs">
            <div className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl space-y-2">
              <div className="font-bold text-teal-300 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-teal-400" /> 2FA Security Passcode Dispatched
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                A 6-digit passcode has been sent to <strong className="text-slate-200">{email}</strong>. Please check your inbox and enter the passcode below.
              </p>

              {dispatchedCode && (
                <div className="pt-2 border-t border-teal-500/20 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowCode(!showCode)}
                    className="text-[10px] text-teal-400 font-bold flex items-center gap-1 hover:underline"
                  >
                    {showCode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {showCode ? "Hide Passcode" : "Show Dispatched Passcode (Testing)"}
                  </button>

                  {showCode && (
                    <button
                      type="button"
                      onClick={() => setOtpCode(dispatchedCode)}
                      className="px-2 py-0.5 rounded bg-teal-400 text-slate-950 font-mono font-bold text-[10px] hover:bg-teal-300"
                    >
                      Fill ({dispatchedCode})
                    </button>
                  )}
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
                onClick={() => setStep("credentials")}
                className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 font-semibold hover:bg-slate-800 transition-colors"
              >
                {t("cancel")}
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 hover:from-teal-300 hover:to-sky-300 transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                {loading ? "Authenticating Session..." : "Verify 2FA & Launch Dashboard"}
              </button>
            </div>
          </form>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}
