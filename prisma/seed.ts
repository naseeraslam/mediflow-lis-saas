import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding MediFlow Comprehensive Urology & WHO Accredited Test Catalog...");

  // Seed Default SaaS Pricing Plans
  await prisma.pricingPlan.deleteMany().catch(() => {});
  
  await prisma.pricingPlan.createMany({
    data: [
      {
        name: "Starter Plan",
        price: 99,
        billing: "per month",
        description: "Essential LIS reporting for single-doctor diagnostic laboratories & clinics.",
        maxReports: 500,
        maxUsers: 5,
        features: JSON.stringify([
          "Up to 500 Patient Reports / Mo",
          "5 Personnel Login Accounts",
          "Custom Letterhead & Logo Branding",
          "2FA Security & Email Passcodes",
          "Official Printable A4 PDF Reports",
          "Standard WHO & Urology Test Catalog",
        ]),
        isPopular: false,
      },
      {
        name: "Professional Plan",
        price: 249,
        billing: "per month",
        description: "Full multi-branch reporting engine for growing pathology centers & hospitals.",
        maxReports: 2500,
        maxUsers: 25,
        features: JSON.stringify([
          "Up to 2,500 Patient Reports / Mo",
          "25 Personnel Login Accounts",
          "Multi-Branch Collection Hub Network",
          "Time-Limited Patient Share Links",
          "Cryptographic QR Code Verification",
          "Patient Diagnostic Comparison Engine",
          "HIPAA & GDPR Audit Trail Logs",
        ]),
        isPopular: true,
      },
      {
        name: "Enterprise Plan",
        price: 599,
        billing: "per month",
        description: "Unlimited diagnostic capacity with dedicated HL7/FHIR EHR integrations.",
        maxReports: 999999,
        maxUsers: 999,
        features: JSON.stringify([
          "Unlimited Patient Reports & Storage",
          "Unlimited Multi-Branch Facilities",
          "Dedicated Pathologist Digital Signature Engine",
          "Custom Domain (reports.yourlab.com)",
          "Super Admin Governance Portal",
          "24/7 Priority Clinical Support Desk",
        ]),
        isPopular: false,
      },
    ],
  });

  // Clean previous records for clean re-seeding
  await prisma.reportShare.deleteMany().catch(() => {});
  await prisma.reportAmendment.deleteMany().catch(() => {});
  await prisma.testResult.deleteMany().catch(() => {});
  await prisma.report.deleteMany().catch(() => {});
  await prisma.templateParameter.deleteMany().catch(() => {});
  await prisma.reportTemplate.deleteMany().catch(() => {});
  await prisma.testDefinition.deleteMany().catch(() => {});

  // 1. Create Organization
  const orgA = await prisma.organization.upsert({
    where: { slug: "demo-diagnostics" },
    update: {
      whatsappPhone: "+1 (800) 555-2739",
      founderName: "Sher Muhammad",
    },
    create: {
      slug: "demo-diagnostics",
      legalName: "Apex Medical & Diagnostic Laboratories Ltd.",
      displayName: "Apex Demo Diagnostics",
      type: "DiagnosticLab",
      approvalStatus: "Approved",
      registrationNo: "REG-2026-9941A",
      licenseNo: "CLIA-99210-TX",
      taxId: "TX-99-1234567",
      email: "info@apexdiagnostics.com",
      phone: "+1 (800) 555-APEX",
      whatsappPhone: "+1 (800) 555-2739",
      website: "https://apexdiagnostics.com",
      googleMapsUrl: "https://maps.google.com/?q=Houston+Medical+Center",
      address: "100 Medical Center Blvd, Suite 400",
      city: "Houston",
      state: "TX",
      country: "USA",
      postalCode: "77030",
      currency: "USD",
      timeZone: "America/Chicago",
      primaryColor: "#0f766e",
      secondaryColor: "#0284c7",
      headerText: "APEX CLINICAL DIAGNOSTICS LABORATORY NETWORK — ACCREDITED ISO 15189",
      footerText: "This report is generated electronically under signed pathologist verification.",
      disclaimerText: "Clinical reference ranges are method-dependent. Results should be interpreted by a licensed physician.",
      founderName: "Sher Muhammad",
    },
  });

  // 2. Create Branches
  const mainBranch = await prisma.branch.findFirst({ where: { orgId: orgA.id, isMain: true } }) ||
    await prisma.branch.create({
      data: {
        orgId: orgA.id,
        name: "Houston Main Diagnostic Center",
        code: "HOU-01",
        address: "100 Medical Center Blvd, Suite 400, Houston TX",
        phone: "+1 (800) 555-APEX",
        email: "houston@apexdiagnostics.com",
        isMain: true,
      },
    });

  // 3. Users
  const passwordHash = await bcrypt.hash("demo1234", 10);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@apex.com" },
    update: {},
    create: {
      orgId: orgA.id,
      email: "admin@apex.com",
      passwordHash,
      name: "Dr. Sarah Jenkins",
      role: "OrgOwner",
      permissions: JSON.stringify(["*"]),
    },
  });

  const pathologistUser = await prisma.user.upsert({
    where: { email: "pathologist@apex.com" },
    update: {},
    create: {
      orgId: orgA.id,
      email: "pathologist@apex.com",
      passwordHash,
      name: "Dr. Robert Vance, MD (Chief Pathologist)",
      role: "Pathologist",
      permissions: JSON.stringify(["report.view", "report.authorize", "report.edit", "report.compare"]),
    },
  });

  // 4. Categories including Urology & Andrology
  const categories = [
    "Urology & Andrology Genetics",
    "Hematology & Coagulation",
    "Clinical Biochemistry",
    "Endocrinology & Hormones",
    "Lipid & Cardiovascular Panel",
    "Renal & Electrolyte Battery",
    "Liver Function Battery",
    "Immunology & Serology",
    "Urinalysis & Kidney Screening",
  ];

  for (const cat of categories) {
    await prisma.testCategory.upsert({
      where: { name: cat },
      update: {},
      create: { name: cat, description: `${cat} Standard Diagnostic Battery` },
    });
  }

  // 5. EXHAUSTIVE TEST CATALOG WITH UROLOGY & MOLECULAR GENETICS
  const testDefs = [
    // UROLOGY & ANDROLOGY MOLECULAR GENETICS
    { code: "URO-YDEL-AZFA", name: "Y-Chromosome Microdeletion (AZFa Locus)", category: "Urology & Andrology Genetics", unit: "PCR Qualitative", refMale: "No Deletion Detected (Normal)", refFemale: "N/A" },
    { code: "URO-YDEL-AZFB", name: "Y-Chromosome Microdeletion (AZFb Locus)", category: "Urology & Andrology Genetics", unit: "PCR Qualitative", refMale: "No Deletion Detected (Normal)", refFemale: "N/A" },
    { code: "URO-YDEL-AZFC", name: "Y-Chromosome Microdeletion (AZFc Locus)", category: "Urology & Andrology Genetics", unit: "PCR Qualitative", refMale: "No Deletion Detected (Normal)", refFemale: "N/A" },
    { code: "URO-SEMEN-VOL", name: "Semen Volume (WHO 6th Ed)", category: "Urology & Andrology Genetics", unit: "mL", refMale: "≥ 1.4 mL (WHO)", refFemale: "N/A" },
    { code: "URO-SEMEN-CONC", name: "Sperm Concentration", category: "Urology & Andrology Genetics", unit: "M/mL", refMale: "≥ 16.0 M/mL (WHO)", refFemale: "N/A" },
    { code: "URO-SEMEN-MOT", name: "Total Sperm Motility (PR + NP)", category: "Urology & Andrology Genetics", unit: "%", refMale: "≥ 42.0% (WHO)", refFemale: "N/A" },
    { code: "URO-SEMEN-PRMOT", name: "Progressive Sperm Motility (PR)", category: "Urology & Andrology Genetics", unit: "%", refMale: "≥ 30.0% (WHO)", refFemale: "N/A" },
    { code: "URO-SEMEN-MORPH", name: "Normal Sperm Morphology (Kruger Strict)", category: "Urology & Andrology Genetics", unit: "%", refMale: "≥ 4.0% (WHO)", refFemale: "N/A" },
    { code: "URO-DFI", name: "Sperm DNA Fragmentation Index (DFI)", category: "Urology & Andrology Genetics", unit: "%", refMale: "< 15.0% (Low Risk)", refFemale: "N/A" },
    { code: "URO-PSA-TOT", name: "Total Prostate Specific Antigen (TPSA)", category: "Urology & Andrology Genetics", unit: "ng/mL", refMale: "< 4.0 (WHO)", refFemale: "N/A" },
    { code: "URO-PSA-FREE", name: "Free PSA / Total PSA Ratio", category: "Urology & Andrology Genetics", unit: "%", refMale: "> 25.0% (Low Malignancy Risk)", refFemale: "N/A" },
    { code: "ENDO-TESTO", name: "Serum Total Testosterone", category: "Endocrinology & Hormones", unit: "ng/dL", refMale: "300 - 1000 (WHO)", refFemale: "15 - 70 (WHO)" },
    { code: "ENDO-FSH", name: "Follicle Stimulating Hormone (FSH)", category: "Endocrinology & Hormones", unit: "mIU/mL", refMale: "1.5 - 12.4 (WHO)", refFemale: "3.5 - 12.5 (WHO)" },
    { code: "ENDO-LH", name: "Luteinizing Hormone (LH)", category: "Endocrinology & Hormones", unit: "mIU/mL", refMale: "1.7 - 8.6 (WHO)", refFemale: "2.4 - 12.6 (WHO)" },

    // Hematology
    { code: "CBC-WBC", name: "White Blood Cells (WBC Count)", category: "Hematology & Coagulation", unit: "x10^3/uL", refMale: "4.5 - 11.0 (WHO)", refFemale: "4.5 - 11.0 (WHO)" },
    { code: "CBC-RBC", name: "Red Blood Cells (RBC Count)", category: "Hematology & Coagulation", unit: "x10^6/uL", refMale: "4.3 - 5.9 (WHO)", refFemale: "3.8 - 5.2 (WHO)" },
    { code: "CBC-HGB", name: "Hemoglobin (HGB Concentration)", category: "Hematology & Coagulation", unit: "g/dL", refMale: "13.8 - 17.2 (WHO)", refFemale: "12.1 - 15.1 (WHO)" },
    { code: "CBC-PLT", name: "Platelet Count (PLT)", category: "Hematology & Coagulation", unit: "x10^3/uL", refMale: "150 - 450 (WHO)", refFemale: "150 - 450 (WHO)" },

    // Biochemistry
    { code: "CHEM-GLU", name: "Fasting Blood Glucose (FBG)", category: "Clinical Biochemistry", unit: "mg/dL", refMale: "70 - 99 (WHO)", refFemale: "70 - 99 (WHO)" },
    { code: "LIPID-CHOL", name: "Total Cholesterol", category: "Lipid & Cardiovascular Panel", unit: "mg/dL", refMale: "< 200 (WHO)", refFemale: "< 200 (WHO)" },
  ];

  const createdTests: Record<string, any> = {};
  for (const t of testDefs) {
    const test = await prisma.testDefinition.create({
      data: {
        orgId: orgA.id,
        code: t.code,
        name: t.name,
        category: t.category,
        unit: t.unit,
        refRangeMale: t.refMale,
        refRangeFemale: t.refFemale,
        version: 1,
      },
    });
    createdTests[t.code] = test;
  }

  // 6. Custom Report Templates (Urology & Semen Microdeletion Battery)
  await prisma.reportTemplate.create({
    data: {
      orgId: orgA.id,
      name: "Urology Y-Chromosome Semen Microdeletion & Male Infertility Panel",
      code: "TMPL-URO-YDEL",
      category: "Urology & Andrology Genetics",
      description: "Multiplex PCR screening for AZFa, AZFb, and AZFc microdeletions in male infertility evaluation.",
      parameters: {
        create: [
          { parameterName: "Y-Chromosome Microdeletion (AZFa Locus)", code: "URO-YDEL-AZFA", unit: "PCR", refRangeMale: "No Deletion Detected", refRangeFemale: "N/A", displayOrder: 1 },
          { parameterName: "Y-Chromosome Microdeletion (AZFb Locus)", code: "URO-YDEL-AZFB", unit: "PCR", refRangeMale: "No Deletion Detected", refRangeFemale: "N/A", displayOrder: 2 },
          { parameterName: "Y-Chromosome Microdeletion (AZFc Locus)", code: "URO-YDEL-AZFC", unit: "PCR", refRangeMale: "No Deletion Detected", refRangeFemale: "N/A", displayOrder: 3 },
          { parameterName: "Sperm Concentration", code: "URO-SEMEN-CONC", unit: "M/mL", refRangeMale: "≥ 16.0 M/mL", refRangeFemale: "N/A", displayOrder: 4 },
          { parameterName: "Sperm DNA Fragmentation Index (DFI)", code: "URO-DFI", unit: "%", refRangeMale: "< 15.0%", refRangeFemale: "N/A", displayOrder: 5 },
          { parameterName: "Serum Total Testosterone", code: "ENDO-TESTO", unit: "ng/dL", refRangeMale: "300 - 1000", refRangeFemale: "15 - 70", displayOrder: 6 },
        ],
      },
    },
  });

  // 7. Patients
  const patient1 = await prisma.patient.findFirst({ where: { orgId: orgA.id, mrn: "MRN-2026-8801" } }) ||
    await prisma.patient.create({
      data: {
        orgId: orgA.id,
        mrn: "MRN-2026-8801",
        fullName: "Alexander Wright",
        dateOfBirth: "1984-05-14",
        gender: "Male",
        phone: "+1 (555) 234-5678",
        email: "alexander.wright@example.com",
      },
    });

  const doctor1 = await prisma.doctor.findFirst({ where: { orgId: orgA.id } }) ||
    await prisma.doctor.create({
      data: {
        orgId: orgA.id,
        name: "Dr. Evelyn Reed, MD",
        specialty: "Urology & Male Reproductive Health",
      },
    });

  // 8. Follow-up Report with Urology Semen Microdeletion Test
  const reportAug = await prisma.report.create({
    data: {
      orgId: orgA.id,
      branchId: mainBranch.id,
      patientId: patient1.id,
      doctorId: doctor1.id,
      reportNumber: "LAB-2026-08001",
      status: "Authorized",
      version: 1,
      sampleCollectedAt: new Date("2026-08-05T09:00:00Z"),
      authorizedAt: new Date("2026-08-05T15:45:00Z"),
      authorizedBy: pathologistUser.name,
      verificationToken: "VERIFY-AUG-ALEX-8832",
      notes: "Urology & Male Infertility Genetic Evaluation.",
      results: {
        create: [
          { testId: createdTests["URO-YDEL-AZFA"].id, testNameSnapshot: createdTests["URO-YDEL-AZFA"].name, unitSnapshot: "PCR", refRangeSnapshot: "No Deletion Detected", stringValue: "No Deletion (Normal)", flag: "Normal" },
          { testId: createdTests["URO-YDEL-AZFB"].id, testNameSnapshot: createdTests["URO-YDEL-AZFB"].name, unitSnapshot: "PCR", refRangeSnapshot: "No Deletion Detected", stringValue: "No Deletion (Normal)", flag: "Normal" },
          { testId: createdTests["URO-YDEL-AZFC"].id, testNameSnapshot: createdTests["URO-YDEL-AZFC"].name, unitSnapshot: "PCR", refRangeSnapshot: "No Deletion Detected", stringValue: "No Deletion (Normal)", flag: "Normal" },
          { testId: createdTests["URO-SEMEN-CONC"].id, testNameSnapshot: createdTests["URO-SEMEN-CONC"].name, unitSnapshot: "M/mL", refRangeSnapshot: "≥ 16.0 M/mL", numericValue: 24.5, flag: "Normal" },
          { testId: createdTests["URO-DFI"].id, testNameSnapshot: createdTests["URO-DFI"].name, unitSnapshot: "%", refRangeSnapshot: "< 15.0%", numericValue: 11.2, flag: "Normal" },
        ],
      },
      shares: {
        create: {
          shareToken: "SHARE-DEMO-8832",
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          isRevoked: false,
        },
      },
    },
  });

  console.log("✅ Seed completed cleanly with Urology Y-Chromosome Semen Microdeletion catalog!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
