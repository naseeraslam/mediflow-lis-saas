import { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

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
