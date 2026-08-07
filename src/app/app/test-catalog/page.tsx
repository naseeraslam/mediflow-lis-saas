import { db } from "@/lib/db";
import { getCurrentOrgId } from "@/lib/auth";
import { TestCatalogManager } from "@/components/test-catalog/TestCatalogManager";

export default async function TestCatalogPage() {
  const orgId = await getCurrentOrgId();

  const tests = await db.testDefinition.findMany({
    where: { orgId },
    orderBy: { category: "asc" },
  });

  const categoriesFromDb = await db.testCategory.findMany({
    orderBy: { name: "asc" },
  });

  const categoryNames = Array.from(
    new Set([
      ...categoriesFromDb.map((c) => c.name),
      ...tests.map((t) => t.category),
    ])
  ).sort();

  const formattedTests = tests.map((t) => ({
    id: t.id,
    code: t.code,
    name: t.name,
    category: t.category,
    unit: t.unit,
    refRangeMale: t.refRangeMale,
    refRangeFemale: t.refRangeFemale,
    version: t.version,
  }));

  return (
    <div className="max-w-7xl mx-auto">
      <TestCatalogManager initialTests={formattedTests} initialCategories={categoryNames} />
    </div>
  );
}
