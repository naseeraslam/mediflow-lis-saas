import { db } from "@/lib/db";
import { NewTemplateBuilder } from "@/components/template/NewTemplateBuilder";

export default async function NewTemplatePage() {
  const categoriesFromDb = await db.testCategory.findMany({
    orderBy: { name: "asc" },
  });

  const categoryNames = categoriesFromDb.length > 0
    ? categoriesFromDb.map((c: any) => c.name)
    : [
        "Urology & Andrology Genetics",
        "Clinical Chemistry",
        "Hematology & Coagulation",
        "Endocrinology & Hormones",
        "Lipid & Cardiovascular Panel",
        "Renal & Electrolyte Battery",
        "Urinalysis & Kidney Screening",
      ];

  return <NewTemplateBuilder categories={categoryNames} />;
}
