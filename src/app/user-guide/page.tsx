import Link from "next/link";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";
import { PrintPdfButton } from "@/components/report/PrintPdfButton";
import { BookOpen, ShieldCheck, Award, Microscope, Search, MessageCircle, FileText, ArrowLeft, Sparkles, CheckCircle2, User, Building2 } from "lucide-react";

export const metadata = {
  title: "User Guide & Platform Vision — MediFlow LIS SaaS",
  description: "Comprehensive English & Urdu user manual, operational guidelines, platform architect vision (Sher Muhammad), and step-by-step usage guide.",
};

export default function UserGuidePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950">
      <PublicNavbar />

      <main className="max-w-5xl mx-auto px-4 py-16 space-y-12">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 hover:text-teal-300 no-print"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-teal-400 shrink-0" />
              <span>Platform User Manual & Guidelines (رہنما کتابچہ)</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl font-medium">
              Step-by-step operational guide in English & Urdu (اردو) for Patients, Receptionists, Pathologists, and Laboratory Administrators.
            </p>
          </div>

          <div className="flex items-center gap-3 no-print">
            <PrintPdfButton reportNumber="MediFlow-User-Guide-v1" />
          </div>
        </div>

        {/* SECTION 1: ARCHITECT & VISION (شیر محمد کا وژن) */}
        <section className="p-8 rounded-3xl bg-gradient-to-r from-teal-950/60 via-slate-900 to-sky-950/60 border border-teal-500/40 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30 text-xs font-bold font-mono">
                PLATFORM ARCHITECT & VISIONARY
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-100">
                Designed & Spearheaded by <span className="text-teal-400 underline decoration-teal-400 decoration-2">Sher Muhammad</span>
              </h2>
              <p className="text-xs text-teal-300 font-mono font-bold">
                ISO 15189 Accredited Lead Systems Architect • Multi-Tenant SaaS Pioneer
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/90 border border-teal-500/30 text-xs space-y-1 shrink-0">
              <div className="text-slate-400">Architect Contact Desk:</div>
              <div className="text-teal-300 font-mono font-bold">naseeraslamkhan016@gmail.com</div>
              <div className="text-[10px] text-slate-400">Sher Muhammad Leadership Studio</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm leading-relaxed">
            {/* English Vision */}
            <div className="space-y-3 p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <h3 className="font-bold text-teal-300 flex items-center gap-2 text-sm">
                <Sparkles className="w-4 h-4 text-teal-400" /> English: Architectural Vision Behind MediFlow
              </h3>
              <p className="text-slate-300">
                MediFlow LIS SaaS was founded by <strong>Sher Muhammad</strong> to bridge the critical digital divide in medical laboratory infrastructure across South Asia and global healthcare networks.
              </p>
              <p className="text-slate-400">
                Our vision is to empower every diagnostic laboratory, polyclinic, and hospital system with enterprise-grade multi-tenant software that enforces strict row-level data isolation, automated WhatsApp patient notifications, baseline analyte trend comparison, and cryptographic QR verification—at zero prohibitive licensing costs.
              </p>
            </div>

            {/* Urdu Vision (اردو وژن) */}
            <div className="space-y-3 p-5 rounded-2xl bg-slate-950/60 border border-slate-800 text-right" dir="rtl">
              <h3 className="font-bold text-teal-300 flex items-center gap-2 text-sm justify-end">
                <Sparkles className="w-4 h-4 text-teal-400" /> اردو: میڈی فلو سسٹمز کا بنیادی مقصد اور وژن
              </h3>
              <p className="text-slate-300 font-sans">
                میڈی فلو لیب سسٹمز کی بنیاد <strong>شیر محمد</strong> نے رکھی تاکہ پاکستان اور بین الاقوامی سطح پر طبی لیبارٹریز کو عالمی معیار کا جدید ترین سافٹ ویئر فراہم کیا جا سکے۔
              </p>
              <p className="text-slate-400 font-sans">
                ہمارا مقصد ہر لیبارٹری، پیتھالوجی ہسپتال اور کلینک کو خودکار واٹس ایپ نوٹیفیکیشن، کیو آر (QR) کوڈ پرنٹنگ، آئی ایس او 15189 سٹینڈرڈز اور آسان اردو اور انگریزی کنٹرولز فراہم کرنا ہے۔
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: BILINGUAL USER MANUAL (انگریزی اور اردو رہنما ہدایات) */}
        <div className="space-y-8">
          <h2 className="text-xl font-black text-slate-100 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <BookOpen className="w-5 h-5 text-teal-400" /> Complete Role-Based Operational Manual (طبی سافٹ ویئر کے استعمال کا طریقہ)
          </h2>

          {/* Guide Card 1: Patients & Search */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold border border-teal-500/20">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">1. Patient Guide: How to Search & View Reports (مریضوں کے لیے ہدایات)</h3>
                <div className="text-xs text-slate-400">Step-by-step instructions for retrieving verified PDF lab reports online</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="font-bold text-teal-300">🇬🇧 English Instructions:</div>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                  <li>Navigate to the <Link href="/patient-search" className="text-teal-400 underline">Patient Search Portal</Link>.</li>
                  <li>Enter your exact <strong>Report Number</strong> (e.g. <code>LAB-2026-08001</code>) or <strong>MRN</strong>.</li>
                  <li>Enter your registered phone number (e.g. <code>+1 555 234-5678</code>).</li>
                  <li>Click <strong>Verify & Unlock Report</strong> to view, print, or download your PDF report.</li>
                  <li>Click <strong>WhatsApp PDF</strong> to send a copy directly to your phone.</li>
                </ol>
              </div>

              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-right" dir="rtl">
                <div className="font-bold text-teal-300">🇵🇰 اردو ہدایات:</div>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300 font-sans">
                  <li>ویب سائٹ پر دیے گئے <strong>"مریض رپورٹ پورٹل"</strong> کے بٹن پر کلک کریں۔</li>
                  <li>اپنا <strong>رپورٹ نمبر (LAB-2026-08001)</strong> یا ایم آر این نمبر درج کریں۔</li>
                  <li>اپنا رجسٹرڈ موبائل نمبر درج کریں۔</li>
                  <li><strong>"رپورٹ تصدیق کریں"</strong> پر کلک کر کے اپنی رپورٹ دیکھیں یا ڈاؤن لوڈ کریں۔</li>
                  <li>پی ڈی ایف رپورٹ موبائل پر حاصل کرنے کے لیے <strong>"واٹس ایپ پی ڈی ایف"</strong> پر کلک کریں۔</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Guide Card 2: 2-Step Lab Workflow */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold border border-sky-500/20">
                <Microscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">2. Laboratory Receptionist & Staff Guide: 2-Step Registration (لیب اسٹاف کے لیے طریقہ کار)</h3>
                <div className="text-xs text-slate-400">Step 1: Patient Sample Booking → Step 2: Lab Results Authorization</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="font-bold text-sky-300">🇬🇧 English Instructions:</div>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                  <li>Go to <strong>Reports → Create New Report</strong>.</li>
                  <li>Select <strong>Step 1: Patient Sample Registration Only</strong>.</li>
                  <li>Select patient, booked tests, and payment method (Cash, Online, Bank Transfer).</li>
                  <li>Click <strong>Save & Dispatch WhatsApp Receipt</strong>. The patient receives an automated WhatsApp booking receipt.</li>
                  <li>Later, when analyzers complete results, open report & click <strong>Authorize & Send WhatsApp PDF Report</strong>.</li>
                </ol>
              </div>

              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-right" dir="rtl">
                <div className="font-bold text-sky-300">🇵🇰 اردو ہدایات:</div>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300 font-sans">
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
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">3. Security & Language Toggle (سیکیورٹی اور زبان کی تبدیلی)</h3>
                <div className="text-xs text-slate-400">2FA Policy Governance & Bilingual Urdu Switching</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="font-bold text-emerald-300">🇬🇧 English Security Rules:</div>
                <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                  <li><strong>2FA Toggle</strong>: Super Admin can toggle 2FA ON or OFF in the Super Admin Portal.</li>
                  <li><strong>Language Toggle</strong>: Click <code>🇬🇧 EN</code> / <code>🇵🇰 اردو</code> in the top navigation bar to instantly translate the site and shift input cursors.</li>
                  <li><strong>Cryptographic Verification</strong>: Every report includes a QR code linking to <code>/verify/[token]</code>.</li>
                </ul>
              </div>

              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-right" dir="rtl">
                <div className="font-bold text-emerald-300">🇵🇰 اردو سیکیورٹی قوانین:</div>
                <ul className="list-disc list-inside space-y-1.5 text-slate-300 font-sans">
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
