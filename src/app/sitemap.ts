import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { services, servicePath } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = siteConfig.url;

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${base}/images/hero/hero-vito.png`, `${base}${siteConfig.ogImage}`],
    },
    {
      url: `${base}/hizmetler`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      images: services.map((service) => `${base}${service.image}`),
    },
    ...services.map((service) => ({
      url: `${base}${servicePath(service.slug)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      images: [`${base}${service.image}`],
    })),
    {
      url: `${base}/vizyon-misyon`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [`${base}/images/about/atmosphere.png`],
    },
    {
      url: `${base}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${base}/kvkk`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
