import Link from "next/link";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";
import { Building2, ShieldCheck, ArrowRight, Activity } from "lucide-react";

export const metadata = {
  title: "Hospital Pathology Infrastructure | MediFlow LIS",
  description: "Enterprise multi-tenant LIS infrastructure for hospital systems, pathology departments, and regional health networks.",
  alternates: {
    canonical: "https://mediflow-saas.com/solutions/hospitals",
  },
};

export default function HospitalsSolutionPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <PublicNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold">
            <Building2 className="w-4 h-4" /> Solutions for Hospitals
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight leading-tight">
            High-Capacity Multi-Tenant LIS for Hospital Networks
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Scale across hospital departments, satellite clinics, and regional emergency centers with isolated tenant scoping, role-based pathologist sign-offs, and automated historical patient comparisons.
          </p>
          <div className="pt-4">
            <Link
              href="/app/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal-400 text-slate-950 font-bold text-sm hover:bg-teal-300 transition-colors shadow-lg shadow-teal-500/20"
            >
              <span>Request Hospital Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
