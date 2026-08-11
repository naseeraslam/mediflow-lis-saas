import { db } from "@/lib/db";

export interface PatientCreateInput {
  orgId: string;
  fullName: string;
  phone?: string;
  gender: string;
  dateOfBirth: string;
  address?: string;
  email?: string;
}

export class PatientService {
  /**
   * Fetch all patients for an organization ordered by newest first
   */
  static async getPatientsForOrg(orgId: string) {
    return db.patient.findMany({
      where: { orgId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        fullName: true,
        mrn: true,
        gender: true,
        dateOfBirth: true,
        phone: true,
        email: true,
        reports: {
          select: {
            id: true,
            reportNumber: true,
            status: true,
            createdAt: true,
          },
          take: 5,
        },
      },
    });
  }

  /**
   * Register a new patient and assign a medical record number (MRN)
   */
  static async registerPatient(data: PatientCreateInput) {
    const year = new Date().getFullYear();
    const count = await db.patient.count({ where: { orgId: data.orgId } });
    const mrn = `MRN-${year}-${String(count + 1).padStart(4, "0")}`;

    return db.patient.create({
      data: {
        orgId: data.orgId,
        mrn,
        fullName: data.fullName,
        phone: data.phone || "N/A",
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        address: data.address || undefined,
        email: data.email || undefined,
      },
    });
  }

  /**
   * Search patient by MRN, phone, or name
   */
  static async searchPatients(orgId: string, query: string) {
    return db.patient.findMany({
      where: {
        orgId,
        OR: [
          { mrn: { contains: query } },
          { fullName: { contains: query } },
          { phone: { contains: query } },
        ],
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
  }
}
