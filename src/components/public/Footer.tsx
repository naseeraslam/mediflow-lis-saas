import Link from "next/link";
import { Activity, ShieldCheck, Lock, Award, HeartPulse } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-slate-950 font-bold">
              <Activity className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-lg font-bold text-slate-100">MediFlow Medical LIS SaaS</span>
          </div>
          <p className="text-slate-400 leading-relaxed max-w-sm">
            Next-generation multi-tenant laboratory information system, medical report versioning, and clinical baseline trend comparison engine engineered for diagnostic centers, pathology networks, and hospitals.
          </p>
          <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1 text-[11px]">
            <div className="text-teal-400 font-bold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-teal-400" /> Platform Founder & Lead Visionary
            </div>
            <p className="text-slate-300">
              Designed & Spearheaded by <strong className="text-slate-100 font-bold">Sher Muhammad</strong>.
            </p>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-[11px] pt-2">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> ISO 15189 Ready</span>
            <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-teal-400" /> HIPAA / GDPR Isolated</span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-slate-200 text-sm">Platform Navigation</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-teal-400 transition-colors">Home Page</Link></li>
            <li><Link href="/patient-search" className="hover:text-teal-400 transition-colors font-bold text-teal-400">Patient Search Portal</Link></li>
            <li><Link href="/features/patient-portal" className="hover:text-teal-400 transition-colors">Features & Portals</Link></li>
            <li><Link href="/pricing" className="hover:text-teal-400 transition-colors">Subscription Pricing</Link></li>
            <li><Link href="/security" className="hover:text-teal-400 transition-colors">Security & Privacy</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-slate-200 text-sm">Account Portals</h4>
          <ul className="space-y-2">
            <li><Link href="/login" className="hover:text-teal-400 transition-colors">Staff Login Portal</Link></li>
            <li><Link href="/register" className="hover:text-teal-400 transition-colors font-bold text-teal-400">Register New Laboratory</Link></li>
            <li><Link href="/app/dashboard" className="hover:text-teal-400 transition-colors">Laboratory Workspace</Link></li>
            <li><Link href="/app/super-admin" className="hover:text-teal-400 transition-colors text-teal-300">Super Admin Portal</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 mt-12 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-slate-400">
        <p>© {new Date().getFullYear()} MediFlow SaaS Platform. Architectural Vision by Sher Muhammad. All rights reserved.</p>
        <p className="mt-2 md:mt-0 font-mono text-[11px]">Row-Level Multi-Tenant Security Enforced</p>
      </div>
    </footer>
  );
}
