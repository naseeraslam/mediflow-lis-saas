import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mediflow-saas.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/app/", "/api/", "/verify/", "/patient-portal/", "/doctor-portal/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
