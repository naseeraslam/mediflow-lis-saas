import Link from "next/link";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";
import { FileText, ShieldCheck, QrCode, Palette, ArrowRight } from "lucide-react";

export const metadata = {
  title: "White-Label PDF Reports & QR Signing | MediFlow LIS",
  description:
    "Generate customizable, high-resolution white-label medical lab PDF reports with custom headers, pathologist signatures, and QR verification.",
  alternates: {
    canonical: "https://mediflow-saas.com/features/pdf-reports",
  },
};

export default function FeaturePdfReportsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <PublicNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold">
            <FileText className="w-4 h-4" /> PDF Engine Feature
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight leading-tight">
            White-Label Medical PDF Generator & QR Authenticity Signing
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Produce publication-quality A4 & Letter medical laboratory reports tailored to your facility's exact branding. Includes repeating headers, CLIA/ISO license numbers, dynamic color themes, and QR-signed verification.
          </p>
          <div className="pt-4">
            <Link
              href="/app/reports/new"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal-400 text-slate-950 font-bold text-sm hover:bg-teal-300 transition-colors shadow-lg shadow-teal-500/20"
            >
              <span>Generate Sample PDF Report</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-800 pt-16">
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">Dynamic Branding & Accent Themes</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Match your laboratory primary and secondary brand palette across all generated PDF headers, tables, and footers.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">Cryptographic QR Verification Token</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Third-party physicians and verification agencies can scan the embedded QR code to verify report validity online.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">Digital Pathologist Signature</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Include signed pathologist sign-offs with authorized date/timestamp and legal disclaimer footers.
            </p>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
