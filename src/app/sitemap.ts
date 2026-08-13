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
    },
    {
      url: `${base}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/kvkk`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...services.map((service) => ({
      url: `${base}${servicePath(service.slug)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
