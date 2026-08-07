import { db } from "@/lib/db";
import { getCurrentOrgId } from "@/lib/auth";
import { PatientManager } from "@/components/patient/PatientManager";

export default async function PatientsPage() {
  const orgId = await getCurrentOrgId();

  const patients = await db.patient.findMany({
    where: { orgId },
    include: {
      reports: { select: { id: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const formattedPatients = patients.map((p) => ({
    id: p.id,
    mrn: p.mrn,
    fullName: p.fullName,
    dateOfBirth: p.dateOfBirth,
    gender: p.gender,
    phone: p.phone,
    email: p.email,
    address: p.address,
    reportsCount: p.reports.length,
  }));

  return (
    <div className="max-w-7xl mx-auto">
      <PatientManager initialPatients={formattedPatients} />
    </div>
  );
}
