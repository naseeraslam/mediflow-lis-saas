import Link from "next/link";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Clinical Laboratory Resources & LIS Guides | MediFlow",
  description: "Best practices, LIS architecture standards, and ISO 15189 reporting compliance guides for medical laboratories.",
  alternates: {
    canonical: "https://mediflow-saas.com/blog",
  },
};

export default function BlogPage() {
  const articles = [
    {
      title: "Best Practices for Longitudinal Blood Work Trend Analysis",
      date: "August 2026",
      category: "Clinical Workflow",
      excerpt: "How deterministic comparison engines prevent diagnostic error by validating measurement unit parity across historical lab visits.",
    },
    {
      title: "Building ISO 15189 & CLIA Compliant White-Label Medical PDF Reports",
      date: "July 2026",
      category: "Laboratory Standards",
      excerpt: "A technical guide to implementing immutable amendment tracking (v1 → v2) and cryptographic QR verification in diagnostic reporting.",
    },
    {
      title: "Multi-Tenant Data Isolation Architecture for Enterprise Healthcare SaaS",
      date: "June 2026",
      category: "Security & SaaS Architecture",
      excerpt: "Why row-level database tenant scoping is required to guarantee zero PHI leaks across independent medical facilities.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <PublicNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold">
            <BookOpen className="w-4 h-4" /> Clinical LIS Resources
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight">
            Healthcare SaaS Engineering & Clinical Standards
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          {articles.map((art, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  {art.category}
                </span>
                <h2 className="text-xl font-bold text-slate-100 leading-snug">{art.title}</h2>
                <p className="text-xs text-slate-400 leading-relaxed">{art.excerpt}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {art.date}</span>
                <span className="text-teal-400 font-semibold flex items-center gap-1">Read Guide <ArrowRight className="w-3.5 h-3.5" /></span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
