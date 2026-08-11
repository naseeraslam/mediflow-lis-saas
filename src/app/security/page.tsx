import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";
import { ShieldCheck, Lock, Database, UserCheck, Server, Key } from "lucide-react";

export const metadata = {
  title: "HIPAA & GDPR Security Architecture | MediFlow LIS",
  description: "Enterprise healthcare security, multi-tenant row-level isolation, encryption at rest and in transit.",
  alternates: {
    canonical: "https://mediflow-saas.com/security",
  },
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
      <PublicNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/20 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" /> Security First Infrastructure
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            HIPAA & GDPR Architectural Security Controls
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Data security and patient privacy are foundational to MediFlow. Our multi-tenant architecture is engineered with row-level tenant scoping, stateless JWT auth, and tamper-evident audit logging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-200 dark:border-slate-800 pt-16">
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Row-Level Tenant Scoping</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Queries explicitly enforce organization context filtering. Server-side validation guarantees zero cross-tenant record exposure.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl transition-colors">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Granular Role-Based Access</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Permissions are scope-restricted for Pathologists, Technicians, Receptionists, Doctors, and Patients.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Tamper-Evident Audit Trails</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Every report authorization, amendment, and user login is recorded in an immutable audit log with IP and timestamp data.
            </p>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
