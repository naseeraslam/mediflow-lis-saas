import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { ThemeToggle } from "@/components/theme/ThemeProvider";
import {
  Activity,
  LayoutDashboard,
  FileText,
  Users,
  TrendingUp,
  FlaskConical,
  ShieldAlert,
  Settings,
  LogOut,
  UserCheck,
  Building2,
  Sliders,
} from "lucide-react";

export const metadata = {
  title: "MediFlow SaaS App Portal",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PrivateAppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  // STRICT AUTHENTICATION GUARD: If no active session, redirect to /login
  if (!session) {
    redirect("/login");
  }

  const organization = await db.organization.findFirst({
    where: { slug: session.orgSlug },
    select: {
      displayName: true,
      legalName: true,
      primaryColor: true,
      secondaryColor: true,
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col selection:bg-teal-500 selection:text-slate-950">
      {/* Security Tenant Banner */}
      <div className="bg-teal-900 text-teal-100 font-bold text-xs py-1 px-4 text-center tracking-wider uppercase flex items-center justify-between border-b border-teal-500/30">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <span className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-teal-300" />
            <span>AUTHENTICATED TENANT WORKSPACE — STRICT ROW-LEVEL DATA ISOLATION ACTIVE</span>
          </span>
          <ThemeToggle />
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between p-4 shrink-0 shadow-sm">
          <div className="space-y-6">
            {/* Org Tenant Header */}
            <div className="p-3 bg-slate-50 dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-slate-950 text-xs"
                  style={{ backgroundColor: organization?.primaryColor || "#0f766e" }}
                >
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                    {organization?.displayName || session.orgName}
                  </div>
                  <div className="text-[10px] text-teal-600 dark:text-teal-400 font-mono font-bold">
                    TENANT: {session.orgSlug}
                  </div>
                </div>
              </div>
            </div>

            {/* Nav Menu Links */}
            <nav className="space-y-1 text-xs font-semibold">
              <Link
                href="/app/dashboard"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Dashboard</span>
              </Link>

              <Link
                href="/app/reports"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
              >
                <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Lab Reports</span>
              </Link>

              <Link
                href="/app/comparison"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
              >
                <TrendingUp className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Report Comparison</span>
              </Link>

              <Link
                href="/app/patients"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
              >
                <Users className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Patients Registry</span>
              </Link>

              <Link
                href="/app/templates"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
              >
                <Sliders className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Report Templates</span>
              </Link>

              <Link
                href="/app/branches"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
              >
                <Building2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Lab Branches</span>
              </Link>

              <Link
                href="/app/test-catalog"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
              >
                <FlaskConical className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Test Catalog</span>
              </Link>

              <Link
                href="/app/audit-log"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
              >
                <UserCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Audit Logs</span>
              </Link>

              <Link
                href="/app/super-admin"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-slate-800/80 transition-colors font-bold"
              >
                <ShieldAlert className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Super Admin Governance</span>
              </Link>

              <Link
                href="/app/settings"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
              >
                <Settings className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Org Settings</span>
              </Link>
            </nav>
          </div>

          {/* User Session Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-full bg-teal-50 dark:bg-slate-800 border border-teal-200 dark:border-slate-700 flex items-center justify-center font-bold text-xs text-teal-700 dark:text-teal-400">
                {session.name ? session.name.charAt(0) : "U"}
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{session.name || session.email}</div>
                <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 uppercase">
                  {session.role}
                </span>
              </div>
            </div>

            <Link
              href="/api/auth/logout"
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-400 text-xs font-semibold border border-slate-300 dark:border-slate-800 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-8 text-slate-900 dark:text-slate-100">
          {children}
        </main>
      </div>
    </div>
  );
}
