/**
 * MediFlow Automated WhatsApp Notification Engine
 * Enterprise Multi-Tenant Medical Laboratory Reporting SaaS
 */

export interface RegistrationWhatsAppPayload {
  patientName: string;
  patientPhone: string;
  mrn: string;
  reportNumber: string;
  labName: string;
  paymentMode: "Cash" | "Online" | "Bank Transfer";
  paymentStatus: "Paid" | "Pending";
  amountPaid: number;
  currency?: string;
}

export interface CompletionWhatsAppPayload {
  patientName: string;
  patientPhone: string;
  reportNumber: string;
  labName: string;
  shareToken: string;
  verificationToken: string;
  baseUrl?: string;
}

export function cleanPhoneNumber(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, "");
  // Default to Pakistan format (+92) if local 03xx format
  if (digits.startsWith("03") && digits.length === 11) {
    return "92" + digits.substring(1);
  }
  return digits;
}

/**
 * Trigger 1: Automatic Registration / Booking Confirmation WhatsApp Message
 */
export function generateRegistrationWhatsAppMessage(payload: RegistrationWhatsAppPayload): {
  whatsappUrl: string;
  text: string;
} {
  const phone = cleanPhoneNumber(payload.patientPhone);
  const currency = payload.currency || "PKR";
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://lispk-saas.netlify.app";

  const text =
    `🔬 *${payload.labName} - Laboratory Booking Confirmation*\n\n` +
    `Dear *${payload.patientName}*,\n` +
    `Your diagnostic laboratory registration has been successfully confirmed.\n\n` +
    `📋 *Medical Record No (MRN):* ${payload.mrn}\n` +
    `🧾 *Report Number:* ${payload.reportNumber}\n` +
    `💳 *Payment Method:* ${payload.paymentMode}\n` +
    `STATUS: *${payload.paymentStatus.toUpperCase()}* (${currency} ${payload.amountPaid.toLocaleString()})\n\n` +
    `🔍 *Track Test Status Online:* ${baseUrl}/patient-search?mrn=${payload.mrn}\n\n` +
    `Thank you for choosing ${payload.labName}.`;

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  return { whatsappUrl, text };
}

/**
 * Trigger 2: Automatic Test Results Completed / Verified PDF Report WhatsApp Message
 */
export function generateCompletionWhatsAppMessage(payload: CompletionWhatsAppPayload): {
  whatsappUrl: string;
  text: string;
} {
  const phone = cleanPhoneNumber(payload.patientPhone);
  const baseUrl = payload.baseUrl || process.env.NEXT_PUBLIC_APP_URL || "https://lispk-saas.netlify.app";

  const text =
    `✅ *${payload.labName} - Verified Lab Report Ready*\n\n` +
    `Dear *${payload.patientName}*,\n` +
    `Your diagnostic laboratory results for Report *#${payload.reportNumber}* are now COMPLETE and verified by our pathologist.\n\n` +
    `📄 *View & Download Official PDF Report:*\n` +
    `${baseUrl}/share/${payload.shareToken}\n\n` +
    `🔒 *Pathologist Verification Token:* ${payload.verificationToken}\n\n` +
    `Thank you for trusting ${payload.labName}.`;

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  return { whatsappUrl, text };
}
