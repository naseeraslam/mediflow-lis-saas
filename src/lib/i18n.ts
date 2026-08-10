/**
 * MediFlow Bilingual Language Engine (English & Urdu - اردو)
 * Multi-Tenant Medical Laboratory Reporting SaaS Platform
 */

export type Language = "en" | "ur";

export const translations = {
  en: {
    // Navigation & Common
    platformTitle: "MediFlow LIS",
    saasTag: "SaaS",
    isoBadge: "ISO 15189 ACCREDITED",
    patientSearchPortal: "Patient Search Portal",
    features: "Features",
    pricing: "Pricing",
    security: "Security",
    staffLogin: "Staff Login",
    registerLab: "Register Lab",
    home: "Home",

    // Hero Homepage
    heroBadge: "Next-Gen ISO 15189 Multi-Tenant Medical Laboratory Information System (LIS)",
    homeTitle1: "Multi-Tenant Clinical Reporting & ",
    homeTitle2: "Baseline Diagnostic Comparison",
    homeSubtitle: "Empower diagnostic laboratories, pathology networks, and hospital health systems with isolated white-label reporting, immutable report amendments, WHO & Urology test batteries, and automated analyte trend analysis.",
    exploreSaaS: "Explore Private SaaS Workspace",
    seeComparison: "See Comparison Engine",

    // Feature Highlights
    tenantIsolation: "100% Tenant Isolation",
    tenantDesc: "Enforced at Database Query Layer",
    whoStandard: "WHO Standard Catalog",
    whoDesc: "Urology, Hematology & Genetics",
    immutableAmendments: "Immutable Amendments",
    immutableDesc: "Full Audit Rationale History",
    qrSigned: "QR Signed Verification",
    qrDesc: "Cryptographic Public Check",

    // Patient Search Portal
    searchTitle: "Secure Patient Report Verification Portal",
    searchSubtitle: "To protect patient medical privacy, enter your exact Report Number or MRN along with registered phone number.",
    reportOrMrn: "Report Number or MRN *",
    phoneOptional: "Registered Patient Phone Number (Optional)",
    verifyUnlockBtn: "Verify & Unlock Report",
    verifyingCredentials: "Verifying Credentials...",
    demoCodePrompt: "Demo Code:",

    // Shared & Report Page
    backToSearch: "Back to Search",
    whatsappPdf: "WhatsApp PDF",
    verify: "Verify",
    patientReportPortal: "Authenticated Patient Report Portal",
    timeLimitedShare: "TIME-LIMITED SHARE",
    reportNumber: "Report No",
    patientName: "Patient Name",
    referringDoctor: "Referring Doctor",
    testResults: "Clinical Diagnostic Results",
    analyte: "Analyte / Test",
    resultValue: "Result Value",
    unit: "Unit",
    refRange: "Reference Range",
    flag: "Flag",
    downloadPdf: "Print / PDF",
    verifyAuthenticity: "Verify Authenticity",
    aiSummary: "AI Report Summary",
    pathologistSeal: "PATHOLOGIST SEAL",

    // Payment & Registration
    paymentMode: "Payment Method",
    paymentStatus: "Payment Status",
    paidCash: "Cash",
    paidOnline: "Online / Card / JazzCash",
    paidBank: "Bank Transfer",
    paidStatus: "Paid",
    pendingStatus: "Pending",
    amountBilled: "Total Amount Billed",
    amountPaid: "Amount Paid",

    // WhatsApp Alerts
    sendWhatsappReceipt: "Send WhatsApp Receipt",
    notifyWhatsappReport: "Send WhatsApp PDF Report",
    whatsappSentSuccess: "WhatsApp Notification Sent Successfully!",

    // Footer
    solutions: "Solutions",
    diagnosticLabs: "Diagnostic Laboratories",
    pathologyHospitals: "Pathology Hospitals",
    polyclinics: "Polyclinics & Centers",
    pdfReports: "White-Label PDF Reports",
    compliance: "Compliance",
    architectTitle: "Platform Architect & Visionary",
    architectName: "Sher Muhammad",
    operationalStatus: "100% OPERATIONAL: All 48 LIS Endpoints Active & Healthy",
  },
  ur: {
    // Navigation & Common
    platformTitle: "میڈی فلو لیب",
    saasTag: "سافٹ ویئر",
    isoBadge: "آئی ایس او 15189 تصدیق شدہ",
    patientSearchPortal: "مریض رپورٹ پورٹل",
    features: "خصوصیات",
    pricing: "قیمتیں",
    security: "سیکیورٹی و تحفظ",
    staffLogin: "اسٹاف لاگ ان",
    registerLab: "نئی لیب بنائیں",
    home: "ہوم",

    // Hero Homepage
    heroBadge: "جدید ترین آئی ایس او 15189 ملٹی ٹیننٹ میڈیکل لیبارٹری انفارمیشن سسٹم (LIS)",
    homeTitle1: "ملٹی ٹیننٹ کلینیکل رپورٹنگ اور ",
    homeTitle2: "بائیو میڈیکل ٹیسٹ موازنہ سسٹم",
    homeSubtitle: "ڈائیگنوسٹک لیبارٹریز، پیتھالوجی نیٹ ورکس اور ہسپتالوں کے لیے عالمی معیار کی وائٹ لیبل رپورٹنگ، خودکار ٹیسٹ ہسٹری موازنہ، اور آئی ایس او تصدیق شدہ رپورٹس۔",
    exploreSaaS: "سافٹ ویئر ورک سپیس کھولیں",
    seeComparison: "ٹیسٹ موازنہ سسٹم دیکھیں",

    // Feature Highlights
    tenantIsolation: "100% محفوظ ڈیٹا",
    tenantDesc: "ڈیٹا بیس کی سطح پر مکمل علیحدگی",
    whoStandard: "عالمی ادارہ صحت (WHO) کیٹلاگ",
    whoDesc: "یورولوجی، ہیمیٹولوجی و جینیٹکس",
    immutableAmendments: "غیر تبدیل شدہ ترمیم کی ہسٹری",
    immutableDesc: "مکمل آڈٹ اور وجہ کی ریکارڈنگ",
    qrSigned: "کیو آر (QR) تصدیق شدہ",
    qrDesc: "آن لائن عوامی اور سیکیورٹی چیک",

    // Patient Search Portal
    searchTitle: "محفوظ مریض کی ٹیسٹ رپورٹ تصدیقی پورٹل",
    searchSubtitle: "مریض کی طبی راز داری کی تحفظ کے لیے اپنا پورٹل ایم آر این (MRN) یا رپورٹ نمبر اور موبائل نمبر درج کریں۔",
    reportOrMrn: "رپورٹ نمبر یا ایم آر این (MRN) *",
    phoneOptional: "موبائل نمبر (اختیاری)",
    verifyUnlockBtn: "تصدیق کریں اور رپورٹ کھولیں",
    verifyingCredentials: "تصدیق کی جا رہی ہے...",
    demoCodePrompt: "ڈیمو کوڈ:",

    // Shared & Report Page
    backToSearch: "تلاش پر واپس جائیں",
    whatsappPdf: "واٹس ایپ پی ڈی ایف",
    verify: "تصدیق کریں",
    patientReportPortal: "تصدیق شدہ مریض رپورٹ پورٹل",
    timeLimitedShare: "محفوظ رپورٹ لنکس",
    reportNumber: "رپورٹ نمبر",
    patientName: "مریض کا نام",
    referringDoctor: "معالج / ڈاکٹر",
    testResults: "کلینیکل لیبارٹری ٹیسٹ کے نتائج",
    analyte: "ٹیسٹ / معائنہ",
    resultValue: "نتیجہ (ویلیو)",
    unit: "یونٹ",
    refRange: "نارمل رینج",
    flag: "سٹیٹس / تبدیلی",
    downloadPdf: "پرنٹ / پی ڈی ایف ڈاؤن لوڈ",
    verifyAuthenticity: "تصدیق شدہ رپورٹ",
    aiSummary: "خلاصہ رپورٹ (اے آئی)",
    pathologistSeal: "پیتھالوجسٹ کی دفتری مہر",

    // Payment & Registration
    paymentMode: "ادائیگی کا طریقہ",
    paymentStatus: "ادائیگی کی صورتحال",
    paidCash: "نقد (کیش)",
    paidOnline: "آن لائن / کاؤنٹر",
    paidBank: "بینک ٹرانسفر",
    paidStatus: "ادا شدہ",
    pendingStatus: "بقايا جات (بقایا)",
    amountBilled: "کل لیب فیس",
    amountPaid: "وصول شدہ رقم",

    // WhatsApp Alerts
    sendWhatsappReceipt: "واٹس ایپ پر رسید بھیجیں",
    notifyWhatsappReport: "واٹس ایپ پر پی ڈی ایف رپورٹ بھیجیں",
    whatsappSentSuccess: "واٹس ایپ میسج کامیابی سے ارسال کر دیا گیا!",

    // Footer
    solutions: "حل و خدمات",
    diagnosticLabs: "ڈائیگنوسٹک لیبارٹریز",
    pathologyHospitals: "پیتھالوجی ہسپتال",
    polyclinics: "پولی کلینکس و سنٹرز",
    pdfReports: "وائٹ لیبل پی ڈی ایف رپورٹس",
    compliance: "قوانین و رعایت",
    architectTitle: "سسٹم کے سرپرست و آرکیٹیکٹ",
    architectName: "شیر محمد",
    operationalStatus: "100% فعال: تمام 48 سروسز فعال اور بہترین ہیں",
  },
};

export function getTranslation(lang: Language, key: keyof typeof translations["en"]): string {
  return translations[lang]?.[key] || translations["en"][key] || key;
}
