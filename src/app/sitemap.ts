import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mediflow-saas.com";

  const publicRoutes = [
    "",
    "/features/report-comparison",
    "/features/patient-portal",
    "/features/pdf-reports",
    "/solutions/diagnostic-laboratories",
    "/solutions/hospitals",
    "/solutions/clinics",
    "/pricing",
    "/security",
    "/blog",
  ];

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
