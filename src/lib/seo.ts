/**
 * SEO Metadata & Structured Data (Schema.org JSON-LD) Engine
 * Enterprise Multi-Tenant Medical Reporting SaaS Platform
 */

export const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://mediflow-saas.com";

export interface SEOProps {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
}

export function generatePageMetadata({ title, description, path, ogType = "website" }: SEOProps) {
  const url = `${BASE_URL}${path}`;
  return {
    title: `${title} | MediFlow Medical LIS SaaS`,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | MediFlow`,
      description,
      url,
      siteName: "MediFlow LIS SaaS",
      type: ogType,
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "MediFlow Medical Laboratory SaaS Platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | MediFlow`,
      description,
      images: [`${BASE_URL}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MediFlow LIS SaaS Platform",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: "Enterprise Multi-Tenant Medical Laboratory Reporting, Historical Comparison, and LIS SaaS Infrastructure.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-555-LABS",
      contactType: "Customer Support",
      availableLanguage: ["English"],
    },
  };
}

export function getSoftwareAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MediFlow LIS",
    operatingSystem: "Web",
    applicationCategory: "HealthApplication",
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1280",
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${BASE_URL}${crumb.item}`,
    })),
  };
}
