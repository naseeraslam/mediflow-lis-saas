/**
 * Clinical Laboratory Data Comparison & Historical Trend Engine
 * MediFlow Core Deterministic Engine (No-Hallucination Guaranteed)
 */

export interface TestComparisonRow {
  testCode: string;
  testName: string;
  category: string;
  currentValue: number | string | null;
  previousValue: number | string | null;
  currentUnit: string;
  previousUnit: string;
  currentRefRange: string;
  previousRefRange: string;
  currentFlag: string;
  previousFlag: string;
  absoluteChange: number | null;
  percentageChange: number | null;
  status: "Elevated" | "Decreased" | "Stable" | "Incompatible" | "N/A";
  notes: string | null;
}

export interface PatientTrendPoint {
  date: string;
  reportNumber: string;
  numericValue: number | null;
  stringValue: string | null;
  unit: string;
  flag: string;
  refRange: string;
}

export interface PatientTestHistory {
  testCode: string;
  testName: string;
  category: string;
  unit: string;
  points: PatientTrendPoint[];
}

/**
 * Compares two reports for the same patient.
 */
export function compareReports(
  currentResults: Array<{
    testCode: string;
    testName: string;
    category: string;
    unit: string;
    numericValue: number | null;
    stringValue: string | null;
    refRange: string;
    flag: string;
  }>,
  previousResults: Array<{
    testCode: string;
    testName: string;
    category: string;
    unit: string;
    numericValue: number | null;
    stringValue: string | null;
    refRange: string;
    flag: string;
  }>
): TestComparisonRow[] {
  const previousMap = new Map(previousResults.map((item) => [item.testCode, item]));

  return currentResults.map((curr) => {
    const prev = previousMap.get(curr.testCode);

    if (!prev) {
      return {
        testCode: curr.testCode,
        testName: curr.testName,
        category: curr.category,
        currentValue: curr.numericValue ?? curr.stringValue,
        previousValue: null,
        currentUnit: curr.unit,
        previousUnit: "N/A",
        currentRefRange: curr.refRange,
        previousRefRange: "N/A",
        currentFlag: curr.flag,
        previousFlag: "N/A",
        absoluteChange: null,
        percentageChange: null,
        status: "N/A",
        notes: "No prior baseline record for comparison",
      };
    }

    // Check unit compatibility
    const unitsMatch = curr.unit.trim().toLowerCase() === prev.unit.trim().toLowerCase();

    if (!unitsMatch) {
      return {
        testCode: curr.testCode,
        testName: curr.testName,
        category: curr.category,
        currentValue: curr.numericValue ?? curr.stringValue,
        previousValue: prev.numericValue ?? prev.stringValue,
        currentUnit: curr.unit,
        previousUnit: prev.unit,
        currentRefRange: curr.refRange,
        previousRefRange: prev.refRange,
        currentFlag: curr.flag,
        previousFlag: prev.flag,
        absoluteChange: null,
        percentageChange: null,
        status: "Incompatible",
        notes: `Direct comparison disabled: Unit mismatch (${prev.unit} vs ${curr.unit})`,
      };
    }

    if (curr.numericValue !== null && prev.numericValue !== null) {
      const abs = Math.round((curr.numericValue - prev.numericValue) * 100) / 100;
      const pct = prev.numericValue !== 0 ? Math.round(((curr.numericValue - prev.numericValue) / prev.numericValue) * 1000) / 10 : 0;
      
      let status: "Elevated" | "Decreased" | "Stable" = "Stable";
      if (abs > 0.05) status = "Elevated";
      else if (abs < -0.05) status = "Decreased";

      return {
        testCode: curr.testCode,
        testName: curr.testName,
        category: curr.category,
        currentValue: curr.numericValue,
        previousValue: prev.numericValue,
        currentUnit: curr.unit,
        previousUnit: prev.unit,
        currentRefRange: curr.refRange,
        previousRefRange: prev.refRange,
        currentFlag: curr.flag,
        previousFlag: prev.flag,
        absoluteChange: abs,
        percentageChange: pct,
        status,
        notes: null,
      };
    }

    return {
      testCode: curr.testCode,
      testName: curr.testName,
      category: curr.category,
      currentValue: curr.stringValue,
      previousValue: prev.stringValue,
      currentUnit: curr.unit,
      previousUnit: prev.unit,
      currentRefRange: curr.refRange,
      previousRefRange: prev.refRange,
      currentFlag: curr.flag,
      previousFlag: prev.flag,
      absoluteChange: null,
      percentageChange: null,
      status: "Stable",
      notes: "Qualitative value comparison",
    };
  });
}
