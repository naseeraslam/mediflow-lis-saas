# 🧬 MediFlow LIS SaaS — Multi-Tenant Medical Laboratory Information System

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.9-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Resend API](https://img.shields.io/badge/Resend-Email_2FA-000000?style=flat-square&logo=resend)](https://resend.com/)
[![ISO 15189](https://img.shields.io/badge/ISO_15189-Accredited-0d9488?style=flat-square)](https://mediflow-saas.com)

> **Enterprise-grade Multi-Tenant Laboratory Information System (LIS)** engineered for diagnostic centers, pathology networks, and hospital health systems. Features automated baseline diagnostic comparison, row-level tenant data isolation, WHO & Urology test batteries, multi-currency subscription management, and cryptographic QR code report verification.

---

## 👨‍💻 Platform Architect & Founder
* **Lead Visionary & Architect**: **Sher Muhammad**
* **Contact Email**: [`naseeraslamkhan016@gmail.com`](mailto:naseeraslamkhan016@gmail.com)
* **GitHub Repository**: [`https://github.com/naseeraslam/mediflow-lis-saas.git`](https://github.com/naseeraslam/mediflow-lis-saas.git)

---

## 🚀 Key Features & Capabilities

### 🔐 1. Multi-Tenant Architecture & Enforced Data Security
- **Strict Row-Level Scoping**: Database queries are hard-scoped to `where: { orgId }`. Zero cross-tenant data leakage.
- **Mandatory 2FA OTP Email Authentication**: 6-digit One-Time Passcode (OTP) sent via **Resend API** to target email addresses.
- **Dual-Factor Public Verification**: Public report lookup (`/patient-search`) requires BOTH **Report Number** AND **Patient Phone Number** to prevent unauthorized record harvesting.

### 🔬 2. Urology & Accredited Test Catalog Batteries
- **Y-Chromosome Semen Microdeletion Panel**: Multiplex PCR screening for AZFa, AZFb, and AZFc locus microdeletions in male infertility evaluation.
- **WHO 6th Edition Semen Analysis**: Concentration, Total Motility, Progressive Motility, Kruger Strict Morphology, Sperm DNA Fragmentation Index (DFI).
- **Comprehensive Clinical Batteries**: Endocrinology, Hematology (CBC), Diabetes Glycemic Panel, Lipid Cardiovascular Battery, Serum Testosterone, Total/Free PSA Ratio.
- **Dynamic Department Creation**: Add custom departments (*Urology & Andrology*, *Histopathology*, *Molecular Genetics*, *Toxicology*, *Microbiology*).

### 💳 3. Multi-Currency SaaS Pricing Engine
- **Super Admin Governance**: Managed by Super Admin Sher Muhammad (`naseeraslamkhan016@gmail.com`).
- **Country-Wise Multi-Currency Support**:
  - **PKR** (Pakistani Rupee — `Rs.`)
  - **INR** (Indian Rupee — `₹`)
  - **USD** (US Dollar — `$`)
  - **GBP** (British Pound — `£`)
  - **EUR** (Euro — `€`)
  - **PHP** (Philippine Peso — `₱`)
  - **AED** (UAE Dirham)
  - **SAR** (Saudi Riyal)

### 📊 4. Baseline Diagnostic Comparison Engine
- **Automated Visit Tracking**: Matches historical patient test results across previous laboratory visits (`LAB-2026-01045` vs `LAB-2026-08001`).
- **Delta Calculations**: Computes absolute and percentage changes, unit consistency, and flags elevated/declining trends.

### 🔎 5. Patient Master Registry & Internal Search
- **CNIC & Phone Search**: Staff can search patient records by **Phone Number**, **CNIC / National Identity Card Number**, **MRN Number**, **Report Number**, or **Full Name**.
- **Interactive Registration Modal**: Register new patients directly inside the workspace (`/app/patients`).

---

## 🌐 Free Live Deployment Guide (Netlify & Vercel)

### Option 1: Deploy to Netlify / Vercel (100% Free)
1. Push repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Deploy MediFlow LIS SaaS Platform"
   git branch -M production
   git remote add origin https://github.com/naseeraslam/mediflow-lis-saas.git
   git push -u origin production
   ```
2. Log in to **[Netlify](https://app.netlify.com)** or **[Vercel](https://vercel.com)**.
3. Import `naseeraslam/mediflow-lis-saas` project. Build command: `npm run build`.

### Option 2: Free 2FA Email Configuration (Resend API)
Set environment variable on Netlify / Vercel:
```env
RESEND_API_KEY="YOUR_RESEND_API_KEY"
EMAIL_FROM="onboarding@resend.dev"
```

---

## 💻 Local Development Setup

```bash
# 1. Clone Repository
git clone https://github.com/naseeraslam/mediflow-lis-saas.git
cd mediflow-lis-saas

# 2. Install Dependencies
npm install

# 3. Initialize SQLite Database & Seed Data
npx prisma db push
npx tsx prisma/seed.ts

# 4. Launch Next.js Development Server
npm run dev -p 3005
```

Open [http://localhost:3005](http://localhost:3005) in your browser.

---

## 📜 License & Copyright
© 2026 **MediFlow LIS SaaS**. Architectural Vision by **Sher Muhammad** (`naseeraslamkhan016@gmail.com`). All rights reserved.
