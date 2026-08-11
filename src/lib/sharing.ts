import { db } from "@/lib/db";
import crypto from "crypto";
import bcrypt from "bcryptjs";

export interface ShareOptions {
  reportId: string;
  durationHours: number; // e.g. 24, 168, 720
  pin?: string;
}

export async function createReportShareLink({ reportId, durationHours, pin }: ShareOptions) {
  const shareToken = `SHARE-${crypto.randomBytes(8).toString("hex").toUpperCase()}`;
  const expiresAt = new Date(Date.now() + durationHours * 60 * 60 * 1000);

  let pinHash: string | null = null;
  if (pin && pin.trim().length > 0) {
    pinHash = await bcrypt.hash(pin.trim(), 10);
  }

  const shareRecord = await db.reportShare.create({
    data: {
      reportId,
      shareToken,
      expiresAt,
      pinHash,
      isRevoked: false,
    },
  });

  return {
    shareToken,
    expiresAt,
    hasPin: !!pinHash,
    shareUrl: `/share/${shareToken}`,
  };
}

export async function validateShareToken(shareToken: string, providedPin?: string) {
  const shareRecord = await db.reportShare.findUnique({
    where: { shareToken },
    include: {
      report: {
        include: {
          patient: true,
          branch: true,
          doctor: true,
          organization: true,
          results: {
            include: { test: true },
          },
        },
      },
    },
  });

  if (!shareRecord) {
    // Fallback: Check if token is verificationToken or reportId directly
    const directReport = await db.report.findFirst({
      where: {
        OR: [
          { verificationToken: shareToken },
          { id: shareToken },
        ],
      },
      include: {
        patient: true,
        branch: true,
        doctor: true,
        organization: true,
        results: {
          include: { test: true },
        },
      },
    });

    if (directReport) {
      return {
        valid: true,
        report: directReport,
        shareRecord: {
          id: directReport.id,
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          accessCount: 1,
        },
      };
    }

    return { valid: false, reason: "Invalid Share Token" };
  }

  if (shareRecord.isRevoked) {
    return { valid: false, reason: "This access link has been revoked by the patient or issuing laboratory." };
  }

  if (new Date() > new Date(shareRecord.expiresAt)) {
    return { valid: false, reason: "This share link has expired." };
  }

  if (shareRecord.pinHash) {
    if (!providedPin) {
      return { valid: false, requiresPin: true, reason: "PIN authentication required." };
    }
    const pinValid = await bcrypt.compare(providedPin, shareRecord.pinHash);
    if (!pinValid) {
      return { valid: false, requiresPin: true, reason: "Incorrect Security PIN." };
    }
  }

  // Increment access counter
  await db.reportShare.update({
    where: { id: shareRecord.id },
    data: { accessCount: { increment: 1 } },
  });

  return {
    valid: true,
    report: shareRecord.report,
    shareRecord: {
      id: shareRecord.id,
      expiresAt: shareRecord.expiresAt,
      accessCount: shareRecord.accessCount + 1,
    },
  };
}

export async function revokeReportShareLink(shareToken: string) {
  const updated = await db.reportShare.update({
    where: { shareToken },
    data: { isRevoked: true },
  });

  return updated;
}
