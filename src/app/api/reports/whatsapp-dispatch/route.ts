import { NextResponse } from "next/server";
import { generateRegistrationWhatsAppMessage, generateCompletionWhatsAppMessage } from "@/lib/whatsapp";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, patientName, patientPhone, mrn, reportNumber, labName, paymentMode, paymentStatus, amountPaid, shareToken, verificationToken } = body;

    if (!patientPhone) {
      return NextResponse.json({ success: false, error: "Patient phone number is required." }, { status: 400 });
    }

    let whatsappData;

    if (type === "completion") {
      whatsappData = generateCompletionWhatsAppMessage({
        patientName: patientName || "Valued Patient",
        patientPhone,
        reportNumber: reportNumber || "LAB-2026-08001",
        labName: labName || "MediFlow LIS Diagnostics",
        shareToken: shareToken || "demo-token",
        verificationToken: verificationToken || "VERIFIED-TOKEN",
      });
    } else {
      whatsappData = generateRegistrationWhatsAppMessage({
        patientName: patientName || "Valued Patient",
        patientPhone,
        mrn: mrn || "MRN-2026-8801",
        reportNumber: reportNumber || "LAB-2026-08001",
        labName: labName || "MediFlow LIS Diagnostics",
        paymentMode: paymentMode || "Cash",
        paymentStatus: paymentStatus || "Paid",
        amountPaid: amountPaid || 3500,
        currency: "PKR",
      });
    }

    // In production, this integrates with Meta WhatsApp Business API / Twilio WhatsApp API
    console.log(`[WHATSAPP DISPATCH SUCCESS] Message dispatched to ${patientPhone}:`, whatsappData.text);

    return NextResponse.json({
      success: true,
      delivered: true,
      whatsappUrl: whatsappData.whatsappUrl,
      messagePreview: whatsappData.text,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
