import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import { STANDARD_HUMAN_TEST_BATTERIES } from "../src/lib/defaultCatalog";

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

  // 5. EXHAUSTIVE STANDARD HUMAN TEST CATALOG & MULTI-PARAMETER BATTERIES
  for (const battery of STANDARD_HUMAN_TEST_BATTERIES) {
    // Create/Upsert Category
    await prisma.testCategory.upsert({
      where: { name: battery.category },
      update: {},
      create: { name: battery.category, description: `${battery.category} Standard Battery` },
    });

    // Create Report Template
    const template = await prisma.reportTemplate.create({
      data: {
        orgId: orgA.id,
        name: battery.name,
        code: battery.code,
        category: battery.category,
        description: battery.description,
      },
    });

    // Create Test Definitions & Template Parameters
    for (let idx = 0; idx < battery.items.length; idx++) {
      const item = battery.items[idx];

      // Upsert Test Definition
      const existingTest = await prisma.testDefinition.findFirst({
        where: { orgId: orgA.id, code: item.code },
      });

      if (!existingTest) {
        await prisma.testDefinition.create({
          data: {
            orgId: orgA.id,
            code: item.code,
            name: item.testName,
            category: battery.category,
            unit: item.unit,
            refRangeMale: item.refRangeMale,
            refRangeFemale: item.refRangeFemale,
            version: 1,
          },
        });
      }

      // Add Template Parameter
      await prisma.templateParameter.create({
        data: {
          templateId: template.id,
          parameterName: item.testName,
          code: item.code,
          unit: item.unit,
          refRangeMale: item.refRangeMale,
          refRangeFemale: item.refRangeFemale,
          displayOrder: idx + 1,
        },
      });
    }
  }

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

  // 8. Sample Diagnostic Report
  const testAzfa = await prisma.testDefinition.findFirst({ where: { orgId: orgA.id, code: "URO-YDEL-AZFA" } });
  const testAzfb = await prisma.testDefinition.findFirst({ where: { orgId: orgA.id, code: "URO-YDEL-AZFB" } });
  const testAzfc = await prisma.testDefinition.findFirst({ where: { orgId: orgA.id, code: "URO-YDEL-AZFC" } });
  const testConc = await prisma.testDefinition.findFirst({ where: { orgId: orgA.id, code: "URO-SEMEN-CONC" } });
  const testDfi = await prisma.testDefinition.findFirst({ where: { orgId: orgA.id, code: "URO-DFI" } });

  if (testAzfa && testAzfb && testAzfc && testConc && testDfi) {
    await prisma.report.create({
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
            { testId: testAzfa.id, testNameSnapshot: testAzfa.name, unitSnapshot: "PCR", refRangeSnapshot: "No Deletion Detected", stringValue: "No Deletion (Normal)", flag: "Normal" },
            { testId: testAzfb.id, testNameSnapshot: testAzfb.name, unitSnapshot: "PCR", refRangeSnapshot: "No Deletion Detected", stringValue: "No Deletion (Normal)", flag: "Normal" },
            { testId: testAzfc.id, testNameSnapshot: testAzfc.name, unitSnapshot: "PCR", refRangeSnapshot: "No Deletion Detected", stringValue: "No Deletion (Normal)", flag: "Normal" },
            { testId: testConc.id, testNameSnapshot: testConc.name, unitSnapshot: "M/mL", refRangeSnapshot: "≥ 16.0 M/mL", numericValue: 24.5, flag: "Normal" },
            { testId: testDfi.id, testNameSnapshot: testDfi.name, unitSnapshot: "%", refRangeSnapshot: "< 15.0%", numericValue: 11.2, flag: "Normal" },
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
  }

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
