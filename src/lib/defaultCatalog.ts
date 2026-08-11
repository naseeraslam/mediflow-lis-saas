export interface StandardTestItem {
  testName: string;
  code: string;
  unit: string;
  refRangeMale: string;
  refRangeFemale: string;
  defaultNumericValue?: string;
  defaultStringValue?: string;
  flag?: string;
}

export interface StandardTestBattery {
  code: string;
  name: string;
  category: string;
  description: string;
  items: StandardTestItem[];
}

export const STANDARD_HUMAN_TEST_BATTERIES: StandardTestBattery[] = [
  {
    code: "TMPL-CBC",
    name: "Complete Blood Count (CBC) Battery",
    category: "Hematology & Coagulation",
    description: "Standard WHO Complete Blood Count with differential leucocyte count and red cell indices.",
    items: [
      { testName: "Hemoglobin (HGB)", code: "CBC-HGB", unit: "g/dL", refRangeMale: "13.8 - 17.2", refRangeFemale: "12.1 - 15.1", defaultNumericValue: "14.5", flag: "Normal" },
      { testName: "Red Blood Cells (RBC Count)", code: "CBC-RBC", unit: "x10^6/uL", refRangeMale: "4.3 - 5.9", refRangeFemale: "3.8 - 5.2", defaultNumericValue: "4.8", flag: "Normal" },
      { testName: "White Blood Cells (WBC Count)", code: "CBC-WBC", unit: "x10^3/uL", refRangeMale: "4.5 - 11.0", refRangeFemale: "4.5 - 11.0", defaultNumericValue: "7.2", flag: "Normal" },
      { testName: "Platelet Count (PLT)", code: "CBC-PLT", unit: "x10^3/uL", refRangeMale: "150 - 450", refRangeFemale: "150 - 450", defaultNumericValue: "245", flag: "Normal" },
      { testName: "Hematocrit (HCT / PCV)", code: "CBC-HCT", unit: "%", refRangeMale: "40.7 - 50.3", refRangeFemale: "36.1 - 44.3", defaultNumericValue: "44.0", flag: "Normal" },
      { testName: "Mean Corpuscular Volume (MCV)", code: "CBC-MCV", unit: "fL", refRangeMale: "80.0 - 96.0", refRangeFemale: "80.0 - 96.0", defaultNumericValue: "88.0", flag: "Normal" },
      { testName: "Mean Corpuscular Hemoglobin (MCH)", code: "CBC-MCH", unit: "pg", refRangeMale: "27.0 - 33.0", refRangeFemale: "27.0 - 33.0", defaultNumericValue: "30.0", flag: "Normal" },
      { testName: "Mean Corpuscular HGB Conc (MCHC)", code: "CBC-MCHC", unit: "g/dL", refRangeMale: "32.0 - 36.0", refRangeFemale: "32.0 - 36.0", defaultNumericValue: "33.5", flag: "Normal" },
      { testName: "Neutrophils", code: "CBC-NEUT", unit: "%", refRangeMale: "40.0 - 75.0", refRangeFemale: "40.0 - 75.0", defaultNumericValue: "60.0", flag: "Normal" },
      { testName: "Lymphocytes", code: "CBC-LYMPH", unit: "%", refRangeMale: "20.0 - 45.0", refRangeFemale: "20.0 - 45.0", defaultNumericValue: "32.0", flag: "Normal" },
      { testName: "Monocytes", code: "CBC-MONO", unit: "%", refRangeMale: "2.0 - 10.0", refRangeFemale: "2.0 - 10.0", defaultNumericValue: "5.0", flag: "Normal" },
      { testName: "Eosinophils", code: "CBC-EOS", unit: "%", refRangeMale: "1.0 - 6.0", refRangeFemale: "1.0 - 6.0", defaultNumericValue: "2.5", flag: "Normal" },
      { testName: "Basophils", code: "CBC-BASO", unit: "%", refRangeMale: "0.0 - 1.0", refRangeFemale: "0.0 - 1.0", defaultNumericValue: "0.5", flag: "Normal" },
      { testName: "Erythrocyte Sedimentation Rate (ESR)", code: "CBC-ESR", unit: "mm/1st hr", refRangeMale: "0 - 15", refRangeFemale: "0 - 20", defaultNumericValue: "8", flag: "Normal" },
    ],
  },
  {
    code: "TMPL-LFT",
    name: "Liver Function Test (LFT) Panel",
    category: "Liver Function Battery",
    description: "Hepatic enzymes, bilirubin fractions, and plasma protein profile.",
    items: [
      { testName: "Total Bilirubin", code: "LFT-TBIL", unit: "mg/dL", refRangeMale: "0.2 - 1.2", refRangeFemale: "0.2 - 1.2", defaultNumericValue: "0.8", flag: "Normal" },
      { testName: "Direct Bilirubin (Conjugated)", code: "LFT-DBIL", unit: "mg/dL", refRangeMale: "0.0 - 0.3", refRangeFemale: "0.0 - 0.3", defaultNumericValue: "0.2", flag: "Normal" },
      { testName: "Indirect Bilirubin (Unconjugated)", code: "LFT-IBIL", unit: "mg/dL", refRangeMale: "0.2 - 0.8", refRangeFemale: "0.2 - 0.8", defaultNumericValue: "0.6", flag: "Normal" },
      { testName: "SGPT / ALT (Alanine Aminotransferase)", code: "LFT-ALT", unit: "U/L", refRangeMale: "7 - 56", refRangeFemale: "7 - 45", defaultNumericValue: "28", flag: "Normal" },
      { testName: "SGOT / AST (Aspartate Aminotransferase)", code: "LFT-AST", unit: "U/L", refRangeMale: "10 - 40", refRangeFemale: "9 - 32", defaultNumericValue: "22", flag: "Normal" },
      { testName: "Alkaline Phosphatase (ALP)", code: "LFT-ALP", unit: "U/L", refRangeMale: "44 - 147", refRangeFemale: "44 - 147", defaultNumericValue: "85", flag: "Normal" },
      { testName: "Total Protein", code: "LFT-TP", unit: "g/dL", refRangeMale: "6.0 - 8.3", refRangeFemale: "6.0 - 8.3", defaultNumericValue: "7.2", flag: "Normal" },
      { testName: "Serum Albumin", code: "LFT-ALB", unit: "g/dL", refRangeMale: "3.5 - 5.0", refRangeFemale: "3.5 - 5.0", defaultNumericValue: "4.3", flag: "Normal" },
      { testName: "Serum Globulin", code: "LFT-GLOB", unit: "g/dL", refRangeMale: "2.3 - 3.4", refRangeFemale: "2.3 - 3.4", defaultNumericValue: "2.9", flag: "Normal" },
      { testName: "Albumin / Globulin Ratio (A/G Ratio)", code: "LFT-AGR", unit: "Ratio", refRangeMale: "1.1 - 2.2", refRangeFemale: "1.1 - 2.2", defaultNumericValue: "1.48", flag: "Normal" },
      { testName: "Gamma-Glutamyl Transferase (GGT)", code: "LFT-GGT", unit: "U/L", refRangeMale: "9 - 48", refRangeFemale: "9 - 38", defaultNumericValue: "25", flag: "Normal" },
    ],
  },
  {
    code: "TMPL-KFT",
    name: "Renal & Kidney Function Test (KFT / RFT) Panel",
    category: "Renal & Electrolyte Battery",
    description: "Renal clearance parameters, blood urea nitrogen, serum uric acid, and serum electrolytes.",
    items: [
      { testName: "Serum Creatinine", code: "KFT-CREAT", unit: "mg/dL", refRangeMale: "0.7 - 1.3", refRangeFemale: "0.6 - 1.1", defaultNumericValue: "0.95", flag: "Normal" },
      { testName: "Blood Urea Nitrogen (BUN)", code: "KFT-BUN", unit: "mg/dL", refRangeMale: "7 - 20", refRangeFemale: "7 - 20", defaultNumericValue: "14.0", flag: "Normal" },
      { testName: "Serum Urea", code: "KFT-UREA", unit: "mg/dL", refRangeMale: "15 - 45", refRangeFemale: "15 - 45", defaultNumericValue: "30.0", flag: "Normal" },
      { testName: "Serum Uric Acid", code: "KFT-URIC", unit: "mg/dL", refRangeMale: "3.5 - 7.2", refRangeFemale: "2.6 - 6.0", defaultNumericValue: "5.2", flag: "Normal" },
      { testName: "Serum Sodium (Na+)", code: "KFT-NA", unit: "mmol/L", refRangeMale: "136 - 145", refRangeFemale: "136 - 145", defaultNumericValue: "140", flag: "Normal" },
      { testName: "Serum Potassium (K+)", code: "KFT-K", unit: "mmol/L", refRangeMale: "3.5 - 5.1", refRangeFemale: "3.5 - 5.1", defaultNumericValue: "4.2", flag: "Normal" },
      { testName: "Serum Chloride (Cl-)", code: "KFT-CL", unit: "mmol/L", refRangeMale: "98 - 107", refRangeFemale: "98 - 107", defaultNumericValue: "102", flag: "Normal" },
      { testName: "Bicarbonate (HCO3-)", code: "KFT-HCO3", unit: "mmol/L", refRangeMale: "22 - 29", refRangeFemale: "22 - 29", defaultNumericValue: "25", flag: "Normal" },
      { testName: "eGFR (Estimated Glomerular Filtration Rate)", code: "KFT-EGFR", unit: "mL/min/1.73m2", refRangeMale: "> 90 (Normal)", refRangeFemale: "> 90 (Normal)", defaultNumericValue: "105", flag: "Normal" },
    ],
  },
  {
    code: "TMPL-LIPID",
    name: "Lipid Profile & Cardiovascular Panel",
    category: "Lipid & Cardiovascular Panel",
    description: "Fasting serum lipid battery for cardiovascular risk and dyslipidemia assessment.",
    items: [
      { testName: "Total Cholesterol", code: "LIPID-CHOL", unit: "mg/dL", refRangeMale: "< 200 (Desirable)", refRangeFemale: "< 200 (Desirable)", defaultNumericValue: "185", flag: "Normal" },
      { testName: "Serum Triglycerides", code: "LIPID-TRIG", unit: "mg/dL", refRangeMale: "< 150 (Normal)", refRangeFemale: "< 150 (Normal)", defaultNumericValue: "135", flag: "Normal" },
      { testName: "HDL Cholesterol (Good)", code: "LIPID-HDL", unit: "mg/dL", refRangeMale: "> 40", refRangeFemale: "> 50", defaultNumericValue: "52", flag: "Normal" },
      { testName: "LDL Cholesterol (Bad)", code: "LIPID-LDL", unit: "mg/dL", refRangeMale: "< 100", refRangeFemale: "< 100", defaultNumericValue: "98", flag: "Normal" },
      { testName: "VLDL Cholesterol", code: "LIPID-VLDL", unit: "mg/dL", refRangeMale: "5 - 30", refRangeFemale: "5 - 30", defaultNumericValue: "22", flag: "Normal" },
      { testName: "Cholesterol / HDL Ratio", code: "LIPID-RATIO", unit: "Ratio", refRangeMale: "< 5.0", refRangeFemale: "< 4.5", defaultNumericValue: "3.5", flag: "Normal" },
    ],
  },
  {
    code: "TMPL-THYROID",
    name: "Thyroid Profile & Diabetes Glycemic Panel",
    category: "Endocrinology & Hormones",
    description: "Serum TSH, Free T3, Free T4, Fasting Blood Sugar, and Glycated Hemoglobin (HbA1c).",
    items: [
      { testName: "HbA1c (Glycated Hemoglobin)", code: "ENDO-HBA1C", unit: "%", refRangeMale: "< 5.7 (Normal)", refRangeFemale: "< 5.7 (Normal)", defaultNumericValue: "5.4", flag: "Normal" },
      { testName: "Fasting Blood Glucose (FBG)", code: "CHEM-GLU", unit: "mg/dL", refRangeMale: "70 - 99 (Normal)", refRangeFemale: "70 - 99 (Normal)", defaultNumericValue: "88", flag: "Normal" },
      { testName: "TSH (Thyroid Stimulating Hormone)", code: "ENDO-TSH", unit: "uIU/mL", refRangeMale: "0.45 - 4.50", refRangeFemale: "0.45 - 4.50", defaultNumericValue: "2.10", flag: "Normal" },
      { testName: "Free T3 (Triiodothyronine)", code: "ENDO-FT3", unit: "pg/mL", refRangeMale: "2.0 - 4.4", refRangeFemale: "2.0 - 4.4", defaultNumericValue: "3.1", flag: "Normal" },
      { testName: "Free T4 (Thyroxine)", code: "ENDO-FT4", unit: "ng/dL", refRangeMale: "0.82 - 1.77", refRangeFemale: "0.82 - 1.77", defaultNumericValue: "1.25", flag: "Normal" },
    ],
  },
  {
    code: "TMPL-URINE",
    name: "Urinalysis Routine & Microscopic Battery",
    category: "Urinalysis & Kidney Screening",
    description: "Physical, chemical, and microscopic examination of clean-catch midstream urine sample.",
    items: [
      { testName: "Color", code: "URINE-COL", unit: "Visual", refRangeMale: "Pale Yellow / Straw", refRangeFemale: "Pale Yellow / Straw", defaultStringValue: "Straw Yellow", flag: "Normal" },
      { testName: "Appearance / Clarity", code: "URINE-CLAR", unit: "Visual", refRangeMale: "Clear", refRangeFemale: "Clear", defaultStringValue: "Clear", flag: "Normal" },
      { testName: "Specific Gravity", code: "URINE-SG", unit: "g/mL", refRangeMale: "1.005 - 1.030", refRangeFemale: "1.005 - 1.030", defaultNumericValue: "1.015", flag: "Normal" },
      { testName: "pH Level", code: "URINE-PH", unit: "pH", refRangeMale: "4.6 - 8.0", refRangeFemale: "4.6 - 8.0", defaultNumericValue: "6.0", flag: "Normal" },
      { testName: "Urine Protein / Albumin", code: "URINE-PROT", unit: "Qualitative", refRangeMale: "Negative", refRangeFemale: "Negative", defaultStringValue: "Nil (Negative)", flag: "Normal" },
      { testName: "Urine Glucose / Sugar", code: "URINE-GLU", unit: "Qualitative", refRangeMale: "Negative", refRangeFemale: "Negative", defaultStringValue: "Nil (Negative)", flag: "Normal" },
      { testName: "Urine Ketones", code: "URINE-KET", unit: "Qualitative", refRangeMale: "Negative", refRangeFemale: "Negative", defaultStringValue: "Nil (Negative)", flag: "Normal" },
      { testName: "Urine Bilirubin", code: "URINE-BIL", unit: "Qualitative", refRangeMale: "Negative", refRangeFemale: "Negative", defaultStringValue: "Nil (Negative)", flag: "Normal" },
      { testName: "Nitrite", code: "URINE-NIT", unit: "Qualitative", refRangeMale: "Negative", refRangeFemale: "Negative", defaultStringValue: "Negative", flag: "Normal" },
      { testName: "Leukocyte Esterase", code: "URINE-LEUK", unit: "Qualitative", refRangeMale: "Negative", refRangeFemale: "Negative", defaultStringValue: "Negative", flag: "Normal" },
      { testName: "Pus Cells (WBC / HPF)", code: "URINE-PUS", unit: "/HPF", refRangeMale: "0 - 5", refRangeFemale: "0 - 5", defaultStringValue: "1 - 2 /HPF", flag: "Normal" },
      { testName: "Red Blood Cells (RBC / HPF)", code: "URINE-RBC", unit: "/HPF", refRangeMale: "0 - 2", refRangeFemale: "0 - 2", defaultStringValue: "Nil /HPF", flag: "Normal" },
      { testName: "Epithelial Cells", code: "URINE-EPITH", unit: "/HPF", refRangeMale: "Few / Occasional", refRangeFemale: "Few / Occasional", defaultStringValue: "Few", flag: "Normal" },
    ],
  },
  {
    code: "TMPL-VITAMINS",
    name: "Vitamins & Minerals Deficiency Battery",
    category: "Clinical Biochemistry",
    description: "Serum 25-OH Vitamin D3, Vitamin B12, Serum Ferritin, Iron profile, and Calcium.",
    items: [
      { testName: "Vitamin D (25-Hydroxyvitamin D)", code: "VIT-VITD", unit: "ng/mL", refRangeMale: "30 - 100 (Sufficient)", refRangeFemale: "30 - 100 (Sufficient)", defaultNumericValue: "42.5", flag: "Normal" },
      { testName: "Vitamin B12 (Cobalamin)", code: "VIT-B12", unit: "pg/mL", refRangeMale: "200 - 900", refRangeFemale: "200 - 900", defaultNumericValue: "480", flag: "Normal" },
      { testName: "Serum Ferritin", code: "VIT-FERR", unit: "ng/mL", refRangeMale: "30 - 400", refRangeFemale: "15 - 150", defaultNumericValue: "120", flag: "Normal" },
      { testName: "Serum Iron", code: "VIT-IRON", unit: "ug/dL", refRangeMale: "65 - 175", refRangeFemale: "50 - 170", defaultNumericValue: "110", flag: "Normal" },
      { testName: "Total Iron Binding Capacity (TIBC)", code: "VIT-TIBC", unit: "ug/dL", refRangeMale: "250 - 450", refRangeFemale: "250 - 450", defaultNumericValue: "340", flag: "Normal" },
      { testName: "Serum Calcium", code: "VIT-CA", unit: "mg/dL", refRangeMale: "8.5 - 10.5", refRangeFemale: "8.5 - 10.5", defaultNumericValue: "9.4", flag: "Normal" },
    ],
  },
  {
    code: "TMPL-SEROLOGY",
    name: "Infectious Serology & Rapid Screen Panel",
    category: "Immunology & Serology",
    description: "Rapid immunochromatographic screening for Typhoid, Dengue, Hepatitis B, Hepatitis C, HIV, and CRP.",
    items: [
      { testName: "C-Reactive Protein (CRP)", code: "SERO-CRP", unit: "mg/L", refRangeMale: "< 6.0", refRangeFemale: "< 6.0", defaultNumericValue: "2.4", flag: "Normal" },
      { testName: "Typhoid Widal TO", code: "SERO-WIDAL-O", unit: "Titration", refRangeMale: "< 1:80 (Negative)", refRangeFemale: "< 1:80 (Negative)", defaultStringValue: "< 1:40 (Negative)", flag: "Normal" },
      { testName: "Typhoid Widal TH", code: "SERO-WIDAL-H", unit: "Titration", refRangeMale: "< 1:80 (Negative)", refRangeFemale: "< 1:80 (Negative)", defaultStringValue: "< 1:40 (Negative)", flag: "Normal" },
      { testName: "Dengue NS1 Antigen", code: "SERO-DENG-NS1", unit: "Qualitative", refRangeMale: "Negative", refRangeFemale: "Negative", defaultStringValue: "Negative", flag: "Normal" },
      { testName: "HBsAg (Hepatitis B Surface Antigen)", code: "SERO-HBSAG", unit: "Qualitative", refRangeMale: "Non-Reactive", refRangeFemale: "Non-Reactive", defaultStringValue: "Non-Reactive", flag: "Normal" },
      { testName: "Anti-HCV (Hepatitis C Antibody)", code: "SERO-HCV", unit: "Qualitative", refRangeMale: "Non-Reactive", refRangeFemale: "Non-Reactive", defaultStringValue: "Non-Reactive", flag: "Normal" },
      { testName: "HIV 1 & 2 Rapid Screening", code: "SERO-HIV", unit: "Qualitative", refRangeMale: "Non-Reactive", refRangeFemale: "Non-Reactive", defaultStringValue: "Non-Reactive", flag: "Normal" },
    ],
  },
  {
    code: "TMPL-URO-YDEL",
    name: "Urology Y-Chromosome Semen Microdeletion & Male Infertility Panel",
    category: "Urology & Andrology Genetics",
    description: "Multiplex PCR screening for AZFa, AZFb, and AZFc microdeletions, WHO semen parameters, and hormones.",
    items: [
      { testName: "Y-Chromosome Microdeletion (AZFa Locus)", code: "URO-YDEL-AZFA", unit: "PCR Qualitative", refRangeMale: "No Deletion Detected", refRangeFemale: "N/A", defaultStringValue: "No Deletion (Normal)", flag: "Normal" },
      { testName: "Y-Chromosome Microdeletion (AZFb Locus)", code: "URO-YDEL-AZFB", unit: "PCR Qualitative", refRangeMale: "No Deletion Detected", refRangeFemale: "N/A", defaultStringValue: "No Deletion (Normal)", flag: "Normal" },
      { testName: "Y-Chromosome Microdeletion (AZFc Locus)", code: "URO-YDEL-AZFC", unit: "PCR Qualitative", refRangeMale: "No Deletion Detected", refRangeFemale: "N/A", defaultStringValue: "No Deletion (Normal)", flag: "Normal" },
      { testName: "Semen Volume (WHO 6th Ed)", code: "URO-SEMEN-VOL", unit: "mL", refRangeMale: "≥ 1.4 mL (WHO)", refRangeFemale: "N/A", defaultNumericValue: "2.8", flag: "Normal" },
      { testName: "Sperm Concentration", code: "URO-SEMEN-CONC", unit: "M/mL", refRangeMale: "≥ 16.0 M/mL (WHO)", refRangeFemale: "N/A", defaultNumericValue: "38.5", flag: "Normal" },
      { testName: "Total Sperm Motility (PR + NP)", code: "URO-SEMEN-MOT", unit: "%", refRangeMale: "≥ 42.0% (WHO)", refRangeFemale: "N/A", defaultNumericValue: "55.0", flag: "Normal" },
      { testName: "Sperm DNA Fragmentation Index (DFI)", code: "URO-DFI", unit: "%", refRangeMale: "< 15.0% (Low Risk)", refRangeFemale: "N/A", defaultNumericValue: "11.2", flag: "Normal" },
      { testName: "Serum Total Testosterone", code: "ENDO-TESTO", unit: "ng/dL", refRangeMale: "300 - 1000 (WHO)", refRangeFemale: "15 - 70 (WHO)", defaultNumericValue: "580", flag: "Normal" },
      { testName: "Follicle Stimulating Hormone (FSH)", code: "ENDO-FSH", unit: "mIU/mL", refRangeMale: "1.5 - 12.4", refRangeFemale: "3.5 - 12.5", defaultNumericValue: "4.8", flag: "Normal" },
    ],
  },
];
