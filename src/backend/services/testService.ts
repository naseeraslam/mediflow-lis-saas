import { db } from "@/lib/db";
import { STANDARD_HUMAN_TEST_BATTERIES } from "@/lib/defaultCatalog";

export class TestService {
  /**
   * Fetch all test definitions for an organization
   */
  static async getTestCatalog(orgId: string) {
    return db.testDefinition.findMany({
      where: { orgId },
      orderBy: { name: "asc" },
      select: {
        id: true,
        code: true,
        name: true,
        category: true,
        unit: true,
        refRangeMale: true,
        refRangeFemale: true,
        minValue: true,
        maxValue: true,
      },
    });
  }

  /**
   * Fetch all report templates with parameters
   */
  static async getReportTemplates(orgId: string) {
    const dbTemplates = await (db as any).reportTemplate
      ? (db as any).reportTemplate.findMany({
          where: { orgId },
          include: { parameters: { orderBy: { displayOrder: "asc" } } },
        })
      : [];

    if (dbTemplates && dbTemplates.length > 0) {
      return dbTemplates.map((t: any) => ({
        code: t.code,
        name: t.name,
        category: t.category,
        items: t.parameters.map((p: any) => ({
          testName: p.parameterName,
          code: p.code,
          unit: p.unit,
          refRangeMale: p.refRangeMale,
          refRangeFemale: p.refRangeFemale,
          defaultNumericValue: "",
          defaultStringValue: "",
          flag: "Normal",
        })),
      }));
    }

    return STANDARD_HUMAN_TEST_BATTERIES;
  }

  /**
   * Calculate Turnaround Time (TAT) expected completion date
   */
  static calculateEstimatedCompletion(tatHours: number = 4): Date {
    const completion = new Date();
    completion.setHours(completion.getHours() + tatHours);
    return completion;
  }
}
