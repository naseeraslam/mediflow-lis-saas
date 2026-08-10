/**
 * MediFlow Bilingual Language Engine (English & Urdu - اردو)
 * Multi-Tenant Medical Laboratory Reporting SaaS Platform
 */

export type Language = "en" | "ur";

export const translations = {
  en: {
    // Navigation & Common
    platformTitle: "MediFlow LIS SaaS",
    isoBadge: "ISO 15189 ACCREDITED",
    patientSearchPortal: "Patient Search Portal",
    features: "Features",
    pricing: "Pricing",
    security: "Security",
    staffLogin: "Staff Login",
    registerLab: "Register Laboratory",
    
    // Patient Search
    searchTitle: "Patient Diagnostic Report Portal",
    searchSubtitle: "Enter your Medical Record Number (MRN), Phone, or CNIC to securely access verified lab reports",
    mrnPlaceholder: "Enter MRN or CNIC (e.g., MRN-2026-8801 or 35202-xxxxxxx-x)...",
    searchBtn: "Search Reports",
    searchResultFound: "Diagnostic Report Records Found",

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

    // Report Page
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

    // WhatsApp Alerts
    sendWhatsappReceipt: "Send WhatsApp Receipt",
    notifyWhatsappReport: "Send WhatsApp PDF Report",
    whatsappSentSuccess: "WhatsApp Notification Sent Successfully!",
  },
  ur: {
    // Navigation & Common
    platformTitle: "میڈی فلو لیب سسٹمز",
    isoBadge: "آئی ایس او 15189 تصدیق شدہ",
    patientSearchPortal: "مریض کی رپورٹ پورٹل",
    features: "خصوصیات",
    pricing: "قیمتیں",
    security: "سیکیورٹی و تحفظ",
    staffLogin: "اسٹاف لاگ ان",
    registerLab: "نئی لیبارٹری رجسٹر کریں",
    
    // Patient Search
    searchTitle: "مریض کی طبی ٹیسٹ رپورٹ پورٹل",
    searchSubtitle: "اپنی لیبارٹری رپورٹ اور نتائج دیکھنے کے لیے ایم آر این (MRN) یا شناختی کارڈ نمبر درج کریں",
    mrnPlaceholder: "ایم آر این نمبر یا شناختی کارڈ نمبر درج کریں...",
    searchBtn: "رپورٹ تلاش کریں",
    searchResultFound: "طبی رپورٹس کے نتائج موصول ہو گئے",

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

    // Report Page
    reportNumber: "رپورٹ نمبر",
    patientName: "مریض کا نام",
    referringDoctor: "معالج / لیڈی ڈاکٹر",
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

    // WhatsApp Alerts
    sendWhatsappReceipt: "واٹس ایپ پر رسید بھیجیں",
    notifyWhatsappReport: "واٹس ایپ پر پی ڈی ایف رپورٹ بھیجیں",
    whatsappSentSuccess: "واٹس ایپ میسج کامیابی سے ارسال کر دیا گیا!",
  },
};

export function getTranslation(lang: Language, key: keyof typeof translations["en"]): string {
  return translations[lang]?.[key] || translations["en"][key] || key;
}
