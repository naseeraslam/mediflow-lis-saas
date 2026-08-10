import Link from "next/link";
import { PublicNavbar } from "@/components/public/Navbar";
import { PublicFooter } from "@/components/public/Footer";
import { PrintPdfButton } from "@/components/report/PrintPdfButton";
import {
  BookOpen,
  ShieldCheck,
  Award,
  Microscope,
  Search,
  FileText,
  ArrowLeft,
  Sparkles,
  User,
  Building2,
  Lock,
  MessageCircle,
  TrendingUp,
  CreditCard,
  Globe,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Printer,
  FileCheck2,
} from "lucide-react";

export const metadata = {
  title: "Master User Guide & Operational Manual — MediFlow LIS SaaS",
  description: "Complete detailed operational manual in English & Urdu for Patients, Receptionists, Pathologists, and Laboratory Administrators.",
};

export default function UserGuidePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950">
      <PublicNavbar />

      <main className="max-w-5xl mx-auto px-4 py-16 space-y-12">
        {/* Master Header */}
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
              <span>Master User Guide & Platform Manual</span>
              <span className="text-teal-700 dark:text-teal-400 font-urdu text-2xl font-bold">(مکمل طریقہ کار کتابچہ)</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl font-medium leading-relaxed">
              Exhaustive 7-Module Operational Manual in English & Urdu (اردو) detailing end-to-end workflows for Patients, Receptionists, Pathologists, and Laboratory Administrators.
            </p>
          </div>

          <div className="flex items-center gap-3 no-print shrink-0">
            <PrintPdfButton reportNumber="MediFlow-Master-Manual-v2" />
          </div>
        </div>

        {/* MODULE 1: PLATFORM OVERVIEW & ARCHITECT VISION */}
        <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border-2 border-teal-500/40 space-y-8 shadow-2xl relative overflow-hidden text-slate-900 dark:text-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-800 dark:text-teal-300 border border-teal-500/30 text-xs font-black font-mono uppercase tracking-wider">
                MODULE 1: ARCHITECT VISION & MISSION
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
            <div className="space-y-3 p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-extrabold text-teal-800 dark:text-teal-300 flex items-center gap-2 text-base">
                <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" /> English: Architectural Vision
              </h3>
              <p className="text-slate-800 dark:text-slate-200 font-medium">
                MediFlow LIS SaaS was created by <strong className="text-slate-950 dark:text-white font-extrabold">Sher Muhammad</strong> to revolutionize medical laboratory management. It provides 100% row-level data isolation for every lab tenant, automated 2-step WhatsApp patient messaging, baseline test comparison engine, and cryptographic QR verification.
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm text-right" dir="rtl">
              <h3 className="font-extrabold text-teal-800 dark:text-teal-300 flex items-center gap-2 text-base justify-end">
                <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" /> اردو: میڈی فلو سسٹمز کا بنیادی وژن
              </h3>
              <p className="text-slate-800 dark:text-slate-200 font-urdu text-base">
                میڈی فلو سسٹمز کی بنیاد <strong className="text-slate-950 dark:text-white font-extrabold">شیر محمد</strong> نے رکھی تاکہ پاکستان اور عالمی سطح پر تمام ڈائیگنوسٹک لیبارٹریز اور ہسپتالوں کو خودکار واٹس ایپ پیغام رسانی، کیو آر (QR) کوڈ تصدیق اور بہترین ملٹی ٹیننٹ سافٹ ویئر فراہم کیا جا سکے۔
              </p>
            </div>
          </div>
        </section>

        {/* MODULE 2: PATIENT SEARCH PORTAL & VERIFICATION */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl text-slate-900 dark:text-slate-100">
          <div className="flex items-center gap-3.5 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-700 dark:text-teal-400 flex items-center justify-center font-bold border border-teal-500/30 shrink-0">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-extrabold text-teal-700 dark:text-teal-400 uppercase">MODULE 2</span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Patient Search Portal & Report Retrieval Guide (مریض پورٹل گائیڈ)</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h3 className="font-extrabold text-teal-800 dark:text-teal-300">🇬🇧 Step-by-Step Instructions:</h3>
              <ol className="list-decimal list-inside space-y-2 text-slate-800 dark:text-slate-200 font-medium">
                <li>Click <strong>Patient Search Portal</strong> in the top navigation bar.</li>
                <li>Enter your exact <strong>Report Number</strong> (e.g. <code>LAB-2026-08001</code>) or <strong>Medical Record Number (MRN)</strong>.</li>
                <li>Enter your registered phone number for dual-factor privacy validation.</li>
                <li>Click <strong>Verify & Unlock Report</strong> to view full diagnostic results.</li>
                <li>Click <strong>WhatsApp PDF</strong> to dispatch a copy directly to your phone.</li>
              </ol>
            </div>

            <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-right" dir="rtl">
              <h3 className="font-extrabold text-teal-800 dark:text-teal-300">🇵🇰 اردو میں طریقہ کار:</h3>
              <ol className="list-decimal list-inside space-y-2 text-slate-800 dark:text-slate-200 font-urdu text-base">
                <li>ویب سائٹ کے مینو میں <strong>"مریض رپورٹ پورٹل"</strong> پر کلک کریں۔</li>
                <li>اپنا <strong>رپورٹ نمبر (LAB-2026-08001)</strong> یا ایم آر این (MRN) درج کریں۔</li>
                <li>اپنا رجسٹرڈ موبائل فون نمبر درج کریں۔</li>
                <li><strong>"رپورٹ تصدیق کریں"</strong> کا بٹن دبائیں اور رپورٹ دیکھیں۔</li>
                <li>پی ڈی ایف رپورٹ موبائل پر حاصل کرنے کے لیے <strong>"واٹس ایپ پی ڈی ایف"</strong> پر کلک کریں۔</li>
              </ol>
            </div>
          </div>
        </section>

        {/* MODULE 3: 2-STEP LABORATORY WORKFLOW */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl text-slate-900 dark:text-slate-100">
          <div className="flex items-center gap-3.5 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-700 dark:text-sky-400 flex items-center justify-center font-bold border border-sky-500/30 shrink-0">
              <Microscope className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-extrabold text-sky-700 dark:text-sky-400 uppercase">MODULE 3</span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">2-Step Laboratory Workflow Manual (2-سٹیپ لیب طریقہ کار)</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Step 1 */}
            <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-800 dark:text-teal-300 font-bold text-xs">
                STEP 1: PATIENT SAMPLE REGISTRATION
              </span>
              <p className="text-slate-800 dark:text-slate-200 font-medium">
                When a patient walks into the lab, select <strong>Step 1: Patient Sample Registration Only</strong>. Enter patient info, booked tests, and payment method (Cash, Online, Bank Transfer). Upon clicking save, an automated <strong>WhatsApp Booking Receipt</strong> is sent to the patient (`Status: Processing`).
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-urdu text-right" dir="rtl">
                <strong>اردو:</strong> مریض کی آمد پر "سٹیپ 1: ٹیسٹ رجسٹریشن اور فیس کیش رسید" منتخب کریں۔ تمام ٹیسٹ اور کیش کی معلومات داخل کر کے محفوظ کریں، خودکار واٹس ایپ رسید مریض کو چلی جائے گی۔
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                STEP 2: RESULTS ENTRY & AUTHORIZATION
              </span>
              <p className="text-slate-800 dark:text-slate-200 font-medium">
                Later, when analyzers complete sample processing, staff/pathologist opens the report, inputs test values, reference intervals, and flags (`Normal`, `High ↑`, `Low ↓`, `Critical ⚠️`), then clicks <strong>Authorize & Dispatch WhatsApp PDF Report</strong> (`Status: Authorized`).
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-urdu text-right" dir="rtl">
                <strong>اردو:</strong> بعد میں لیب ٹیسٹ نتائج مکمل ہونے پر رپورٹ کھولیں، ویلیوز داخل کریں اور "واٹس ایپ پی ڈی ایف رپورٹ بھیجیں" پر کلک کریں۔
              </div>
            </div>
          </div>
        </section>

        {/* MODULE 4: BASELINE COMPARISON ENGINE */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl text-slate-900 dark:text-slate-100">
          <div className="flex items-center gap-3.5 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30 shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-extrabold text-emerald-700 dark:text-emerald-400 uppercase">MODULE 4</span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Historical Baseline Comparison Engine (سابقہ رپورٹس موازنہ)</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h3 className="font-extrabold text-emerald-800 dark:text-emerald-300">🇬🇧 Baseline Comparison Workflow:</h3>
              <p className="text-slate-800 dark:text-slate-200 font-medium">
                MediFlow automatically matches patient MRNs across visits (e.g. Jan 2026 vs Aug 2026). It calculates absolute deltas (e.g. <code>+5.0 x10^3/uL</code>), percentage changes (e.g. <code>+73.5%</code>), and generates SVG sparkline analyte trendlines.
              </p>
            </div>

            <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-right" dir="rtl">
              <h3 className="font-extrabold text-emerald-800 dark:text-emerald-300">🇵🇰 اردو میں طریقہ کار:</h3>
              <p className="text-slate-800 dark:text-slate-200 font-urdu text-base">
                سسٹم خودکار طور پر مریض کی سابقہ اور موجودہ لیب رپورٹس کا موازنہ کرتا ہے اور تبدیلی کی فیصد (+73.5%) اور گراف خودکار تیار کرتا ہے۔
              </p>
            </div>
          </div>
        </section>

        {/* MODULE 5: 2FA SECURITY & GOVERNANCE */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl text-slate-900 dark:text-slate-100">
          <div className="flex items-center gap-3.5 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold border border-amber-500/30 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-extrabold text-amber-700 dark:text-amber-400 uppercase">MODULE 5</span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">2FA Security Policy & Governance (2FA سیکیورٹی قوانین)</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h3 className="font-extrabold text-amber-800 dark:text-amber-300">🇬🇧 Security Policy Controls:</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-800 dark:text-slate-200 font-medium">
                <li><strong>2FA Policy Toggle</strong>: Super Admin can toggle 2FA ON (6-digit OTP mandatory) or OFF (Direct password login enabled).</li>
                <li><strong>Tenant Isolation</strong>: Queries filter strictly by session `orgId`.</li>
              </ul>
            </div>

            <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-right" dir="rtl">
              <h3 className="font-extrabold text-amber-800 dark:text-amber-300">🇵🇰 اردو میں طریقہ کار:</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-800 dark:text-slate-200 font-urdu text-base">
                <li>سپر ایڈمن 2FA سیکیورٹی اپشن کو آن یا آف کر سکتا ہے تاکہ لاگ ان آسان ہو سکے۔</li>
              </ul>
            </div>
          </div>
        </section>

        {/* MODULE 6: BILINGUAL URDU ENGINE & RTL CURSOR ALIGNMENT */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl text-slate-900 dark:text-slate-100">
          <div className="flex items-center gap-3.5 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-700 dark:text-purple-400 flex items-center justify-center font-bold border border-purple-500/30 shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-extrabold text-purple-700 dark:text-purple-400 uppercase">MODULE 6</span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Bilingual Language Engine & RTL Urdu Controls (اردو کنٹرولز)</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h3 className="font-extrabold text-purple-800 dark:text-purple-300">🇬🇧 Language Engine:</h3>
              <p className="text-slate-800 dark:text-slate-200 font-medium">
                Clicking <code>🇵🇰 اردو</code> in the top navigation bar translates all headings, form inputs, dropdowns, buttons, and placeholders into Urdu with right-aligned typing cursors (`dir="rtl"`).
              </p>
            </div>

            <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-right" dir="rtl">
              <h3 className="font-extrabold text-purple-800 dark:text-purple-300">🇵🇰 اردو میں طریقہ کار:</h3>
              <p className="text-slate-800 dark:text-slate-200 font-urdu text-base">
                ویب سائٹ کے اوپر <strong>"🇵🇰 اردو"</strong> پر کلک کرنے سے تمام فارمز، بٹن اور لکھی جانے والی تحریر اردو میں تبدیل اور دائیں جانب منتقل ہو جاتی ہے۔
              </p>
            </div>
          </div>
        </section>

        {/* MODULE 7: WHITE-LABEL CUSTOMIZATION & PDF PRINTING */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl text-slate-900 dark:text-slate-100">
          <div className="flex items-center gap-3.5 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-700 dark:text-rose-400 flex items-center justify-center font-bold border border-rose-500/30 shrink-0">
              <Printer className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-extrabold text-rose-700 dark:text-rose-400 uppercase">MODULE 7</span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">White-Label Customization & PDF Printing (پی ڈی ایف پرنٹنگ)</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h3 className="font-extrabold text-rose-800 dark:text-rose-300">🇬🇧 PDF Printing & Branding:</h3>
              <p className="text-slate-800 dark:text-slate-200 font-medium">
                Every report renders clean A4 PDF layouts with custom lab logos, primary/secondary colors, digital pathologist signatures, and QR verification codes.
              </p>
            </div>

            <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-right" dir="rtl">
              <h3 className="font-extrabold text-rose-800 dark:text-rose-300">🇵🇰 اردو میں طریقہ کار:</h3>
              <p className="text-slate-800 dark:text-slate-200 font-urdu text-base">
                ہر رپورٹ اے فور (A4) سائز کے پی ڈی ایف فارمیٹ میں ڈاؤن لوڈ اور پرنٹ کی جا سکتی ہے جس میں لیبارٹری کی مہر اور لوگو شامل ہوتا ہے۔
              </p>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
