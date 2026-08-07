import Link from "next/link";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";
import { getBreadcrumbSchema } from "@/lib/seo";
import { Lock, ShieldCheck, ArrowRight, Activity, TrendingUp, Download, Smartphone } from "lucide-react";

export const metadata = {
  title: "HIPAA Patient Portal & Health Trends | MediFlow LIS",
  description:
    "Secure HIPAA-compliant patient portal for downloading medical lab reports, viewing historical blood work trends, and sharing diagnostic records with doctors.",
  alternates: {
    canonical: "https://mediflow-saas.com/features/patient-portal",
  },
};

export default function FeaturePatientPortalPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Features", item: "/features/patient-portal" },
    { name: "Patient Portal & Health Trends", item: "/features/patient-portal" },
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <PublicNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold">
            <Lock className="w-4 h-4" /> Patient Portal Feature
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight leading-tight">
            Secure Patient Portal & Historical Health Trends
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Give your patients instant, 24/7 encrypted access to their diagnostic lab results. Patients can view historical blood work progression, compare current lab panels against previous visits, and download signed PDF reports on mobile or desktop.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/app/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal-400 text-slate-950 font-bold text-sm hover:bg-teal-300 transition-colors shadow-lg shadow-teal-500/20"
            >
              <span>Explore Patient View</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-800 pt-16">
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">Visual Longitudinal Trends</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Patients can view multi-year biomarker trends for Glucose, Lipid Panels, Thyroid (TSH), and CBC with normal reference band overlays.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">Instant PDF Download & Sharing</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Download high-resolution white-label medical PDFs complete with QR authenticity tokens and pathologist signatures.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">Mobile Responsive Access</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Zero app installation required. Patients access their records securely via mobile browser with biometric PIN or OTP login.
            </p>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
