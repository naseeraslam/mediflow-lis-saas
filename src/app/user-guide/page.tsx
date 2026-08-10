import Link from "next/link";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";
import { PrintPdfButton } from "@/components/report/PrintPdfButton";
import { BookOpen, ShieldCheck, Award, Microscope, Search, FileText, ArrowLeft, Sparkles, User, Building2, Lock } from "lucide-react";

export const metadata = {
  title: "User Guide & Platform Vision — MediFlow LIS SaaS",
  description: "Comprehensive English & Urdu user manual, operational guidelines, platform architect vision (Sher Muhammad), and step-by-step usage guide.",
};

export default function UserGuidePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950">
      <PublicNavbar />

      <main className="max-w-5xl mx-auto px-4 py-16 space-y-12">
        {/* Header Section with High Contrast */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 no-print"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight flex flex-wrap items-center gap-3">
              <BookOpen className="w-9 h-9 text-teal-600 dark:text-teal-400 shrink-0" />
              <span>Platform User Manual & Guidelines</span>
              <span className="text-teal-700 dark:text-teal-400 font-urdu text-2xl font-bold">(رہنما کتابچہ)</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl font-medium leading-relaxed">
              Step-by-step operational guide in English & Urdu (اردو) for Patients, Receptionists, Pathologists, and Laboratory Administrators.
            </p>
          </div>

          <div className="flex items-center gap-3 no-print shrink-0">
            <PrintPdfButton reportNumber="MediFlow-User-Guide-v1" />
          </div>
        </div>

        {/* SECTION 1: ARCHITECT & VISION (شیر محمد کا وژن) - HIGH CONTRAST EYE-ATTRACTIVE CARD */}
        <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border-2 border-teal-500/40 space-y-8 shadow-2xl relative overflow-hidden text-slate-900 dark:text-slate-100">
          {/* Top Architect Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-800 dark:text-teal-300 border border-teal-500/30 text-xs font-black font-mono uppercase tracking-wider">
                PLATFORM ARCHITECT & VISIONARY
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Designed & Spearheaded by <span className="text-teal-700 dark:text-teal-400 underline decoration-teal-500 decoration-2">Sher Muhammad</span>
              </h2>
              <p className="text-xs text-teal-800 dark:text-teal-300 font-mono font-bold">
                ISO 15189 Accredited Lead Systems Architect • Multi-Tenant SaaS Pioneer
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-teal-500/30 text-xs space-y-1.5 shrink-0 shadow-sm">
              <div className="text-slate-600 dark:text-slate-400 font-semibold">Architect Contact Desk:</div>
              <div className="text-teal-800 dark:text-teal-300 font-mono font-black text-sm">naseeraslamkhan016@gmail.com</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">Sher Muhammad Leadership Studio</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed">
            {/* English Vision */}
            <div className="space-y-3 p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-extrabold text-teal-800 dark:text-teal-300 flex items-center gap-2 text-base">
                <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" /> English: Architectural Vision Behind MediFlow
              </h3>
              <p className="text-slate-800 dark:text-slate-200 font-medium">
                MediFlow LIS SaaS was founded by <strong className="text-slate-950 dark:text-white font-extrabold">Sher Muhammad</strong> to bridge the critical digital divide in medical laboratory infrastructure across South Asia and global healthcare networks.
              </p>
              <p className="text-slate-700 dark:text-slate-300 font-medium">
                Our vision is to empower every diagnostic laboratory, polyclinic, and hospital system with enterprise-grade multi-tenant software that enforces strict row-level data isolation, automated WhatsApp patient notifications, baseline analyte trend comparison, and cryptographic QR verification—at zero prohibitive licensing costs.
              </p>
            </div>

            {/* Urdu Vision (اردو وژن) */}
            <div className="space-y-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm text-right" dir="rtl">
              <h3 className="font-extrabold text-teal-800 dark:text-teal-300 flex items-center gap-2 text-base justify-end">
                <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" /> اردو: میڈی فلو سسٹمز کا بنیادی مقصد اور وژن
              </h3>
              <p className="text-slate-800 dark:text-slate-200 font-urdu text-base">
                میڈی فلو لیب سسٹمز کی بنیاد <strong className="text-slate-950 dark:text-white font-extrabold">شیر محمد</strong> نے رکھی تاکہ پاکستان اور دنیا بھر کی تمام پیتھالوجی لیبارٹریز اور ہسپتالوں کو عالمی معیار کا سیکیور ڈائیگنوسٹک سافٹ ویئر فراہم کیا جا سکے۔
              </p>
              <p className="text-slate-700 dark:text-slate-300 font-urdu text-base">
                ہمارا مقصد ہر لیبارٹری اور کلینک کو خودکار واٹس ایپ نوٹیفیکیشن، کیو آر کوڈ سیکیورٹی چیک، آئی ایس او 15189 کوالٹی سٹینڈرڈز اور اردو اور انگریزی زبانوں میں آسان ترین کنٹرولز فراہم کرنا ہے۔
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: BILINGUAL USER MANUAL (انگریزی اور اردو رہنما ہدایات) */}
        <div className="space-y-8">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <BookOpen className="w-6 h-6 text-teal-600 dark:text-teal-400" /> Complete Role-Based Operational Manual (طبی سافٹ ویئر کے استعمال کا طریقہ)
          </h2>

          {/* Guide Card 1: Patients & Search */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl text-slate-900 dark:text-slate-100">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-teal-500/10 text-teal-700 dark:text-teal-400 flex items-center justify-center font-bold border border-teal-500/30 shrink-0">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">1. Patient Guide: How to Search & View Reports</h3>
                <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">Step-by-step instructions for retrieving verified PDF lab reports online</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="font-extrabold text-teal-800 dark:text-teal-300">🇬🇧 English Instructions:</div>
                <ol className="list-decimal list-inside space-y-2 text-slate-800 dark:text-slate-200 font-medium">
                  <li>Navigate to the <Link href="/patient-search" className="text-teal-700 dark:text-teal-400 font-bold underline">Patient Search Portal</Link>.</li>
                  <li>Enter your exact <strong>Report Number</strong> (e.g. <code>LAB-2026-08001</code>) or <strong>MRN</strong>.</li>
                  <li>Enter your registered phone number (e.g. <code>+1 555 234-5678</code>).</li>
                  <li>Click <strong>Verify & Unlock Report</strong> to view, print, or download your PDF report.</li>
                  <li>Click <strong>WhatsApp PDF</strong> to send a copy directly to your phone.</li>
                </ol>
              </div>

              <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-right" dir="rtl">
                <div className="font-extrabold text-teal-800 dark:text-teal-300">🇵🇰 اردو ہدایات:</div>
                <ol className="list-decimal list-inside space-y-2 text-slate-800 dark:text-slate-200 font-urdu text-base">
                  <li>ویب سائٹ پر دیے گئے <strong>"مریض رپورٹ پورٹل"</strong> کے لنکس پر کلک کریں۔</li>
                  <li>اپنا <strong>رپورٹ نمبر (LAB-2026-08001)</strong> یا ایم آر این نمبر درج کریں۔</li>
                  <li>اپنا رجسٹرڈ موبائل نمبر درج کریں۔</li>
                  <li><strong>"رپورٹ تصدیق کریں"</strong> پر کلک کر کے اپنی رپورٹ دیکھیں یا ڈاؤن لوڈ کریں۔</li>
                  <li>پی ڈی ایف رپورٹ موبائل پر حاصل کرنے کے لیے <strong>"واٹس ایپ پی ڈی ایف"</strong> پر کلک کریں۔</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Guide Card 2: 2-Step Lab Workflow */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl text-slate-900 dark:text-slate-100">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-sky-500/10 text-sky-700 dark:text-sky-400 flex items-center justify-center font-bold border border-sky-500/30 shrink-0">
                <Microscope className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">2. Laboratory Staff Guide: 2-Step Registration Workflow</h3>
                <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">Step 1: Patient Sample Booking → Step 2: Lab Results Authorization</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="font-extrabold text-sky-800 dark:text-sky-300">🇬🇧 English Instructions:</div>
                <ol className="list-decimal list-inside space-y-2 text-slate-800 dark:text-slate-200 font-medium">
                  <li>Go to <strong>Reports → Create New Report</strong>.</li>
                  <li>Select <strong>Step 1: Patient Sample Registration Only</strong>.</li>
                  <li>Select patient, booked tests, and payment method (Cash, Online, Bank Transfer).</li>
                  <li>Click <strong>Save & Dispatch WhatsApp Receipt</strong>. The patient receives an automated WhatsApp booking receipt.</li>
                  <li>Later, when analyzers complete results, open report & click <strong>Authorize & Send WhatsApp PDF Report</strong>.</li>
                </ol>
              </div>

              <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-right" dir="rtl">
                <div className="font-extrabold text-sky-800 dark:text-sky-300">🇵🇰 اردو ہدایات:</div>
                <ol className="list-decimal list-inside space-y-2 text-slate-800 dark:text-slate-200 font-urdu text-base">
                  <li>سافٹ ویئر میں <strong>"نئی ڈائیگنوسٹک رپورٹ بنائیں"</strong> پر جائیں۔</li>
                  <li><strong>"سٹیپ 1: ٹیسٹ رجسٹریشن اور فیس کیش رسید"</strong> کا انتخاب کریں۔</li>
                  <li>مریض کا نام، برانچ اور ادائیگی کا طریقہ (کیش یا آن لائن) منتخب کریں۔</li>
                  <li>محفوظ پر کلک کرتے ہی مریض کے واٹس ایپ پر <strong>خودکار کیش رسید</strong> چلی جائے گی۔</li>
                  <li>بعد میں لیب رزلٹ مکمل ہونے پر رپورٹ کھولیں اور <strong>"واٹس ایپ پی ڈی ایف رپورٹ بھیجیں"</strong> پر کلک کریں۔</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Guide Card 3: 2FA & Language Switcher */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl text-slate-900 dark:text-slate-100">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">3. Security & Language Controls (سیکیورٹی قوانین)</h3>
                <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">2FA Policy Governance & Bilingual Urdu Switching</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="font-extrabold text-emerald-800 dark:text-emerald-300">🇬🇧 English Security Rules:</div>
                <ul className="list-disc list-inside space-y-2 text-slate-800 dark:text-slate-200 font-medium">
                  <li><strong>2FA Toggle</strong>: Super Admin can toggle 2FA ON or OFF in the Super Admin Portal.</li>
                  <li><strong>Language Toggle</strong>: Click <code>🇬🇧 EN</code> / <code>🇵🇰 اردو</code> in the top navigation bar to instantly translate the site and shift input cursors.</li>
                  <li><strong>Cryptographic Verification</strong>: Every report includes a QR code linking to <code>/verify/[token]</code>.</li>
                </ul>
              </div>

              <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-right" dir="rtl">
                <div className="font-extrabold text-emerald-800 dark:text-emerald-300">🇵🇰 اردو سیکیورٹی قوانین:</div>
                <ul className="list-disc list-inside space-y-2 text-slate-800 dark:text-slate-200 font-urdu text-base">
                  <li><strong>2FA سیکیورٹی بٹن</strong>: سپر ایڈمن 2FA کوڈ کے اپشن کو آن یا آف کر سکتا ہے۔</li>
                  <li><strong>اردو زبان کی تبدیلی</strong>: ویب سائٹ کی اوپر والی بار میں <strong>"🇵🇰 اردو"</strong> پر کلک کریں، پوری ویب سائٹ اور ٹائپنگ کرسر اردو میں ہو جائے گی۔</li>
                  <li><strong>کیو آر کوڈ تصدیق</strong>: ہر رپورٹ میں کیو آر کوڈ ہوتا ہے جس سے اصلیت چیک کی جا سکتی ہے۔</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
