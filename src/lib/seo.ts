import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { fleet } from "@/data/fleet";
import { services, servicePath } from "@/data/services";
import { getDictionary } from "@/i18n";

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, siteConfig.url).toString();
}

export function defaultOgImage(alt?: string) {
  return {
    url: siteConfig.ogImage,
    width: 1200,
    height: 630,
    alt: alt ?? `${siteConfig.name} — ${siteConfig.tagline}`,
  };
}

export function pageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(path);
  const branded = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;
  const ogImage = image
    ? { url: image, width: 1200, height: 630, alt: imageAlt ?? title }
    : defaultOgImage(branded);

  return {
    title: title.includes(siteConfig.name) ? { absolute: title } : title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        "tr-TR": url,
        "en-US": url,
        "x-default": url,
      },
    },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      alternateLocale: ["en_US"],
      url,
      siteName: siteConfig.name,
      title: branded,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: branded,
      description,
      images: [{ url: ogImage.url, alt: ogImage.alt }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function organizationJsonLd() {
  const tr = getDictionary("tr");
  return {
    "@type": "TravelAgency",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.agency.name,
    alternateName: [
      "Besinci Mevsim",
      "5. Mevsim",
      "Besinci Mevsim Seyahat",
      siteConfig.agency.name,
      "IlkRuzgar Seyahat Acentasi",
    ],
    description: tr.meta.description,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.logo),
    },
    image: absoluteUrl(siteConfig.ogImage),
    sameAs: [siteConfig.social.instagram],
    identifier: {
      "@type": "PropertyValue",
      name: "TURSAB",
      value: siteConfig.agency.tursabNo,
    },
    email: siteConfig.contact.email ?? undefined,
    telephone: siteConfig.contact.phone ?? undefined,
    foundingLocation: {
      "@type": "Country",
      name: "Turkey",
    },
    areaServed: {
      "@type": "Country",
      name: "Turkey",
    },
    inLanguage: ["tr", "en"],
    knowsAbout: [
      "VIP transfer",
      "Havaalanı transferi",
      "Kurumsal taşımacılık",
      "Turizm taşımacılığı",
      "Özel araç hizmetleri",
      "Konaklama hizmetleri",
      ...fleet.map((vehicle) => vehicle.name),
    ],
    makesOffer: services.map((service) => {
      const item = tr.services.items.find((entry) => entry.id === service.id);
      return {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item?.title,
          url: absoluteUrl(servicePath(service.slug)),
        },
      };
    }),
    contactPoint: siteConfig.contact.email
      ? [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: siteConfig.contact.email,
            availableLanguage: ["Turkish", "English"],
            url: absoluteUrl("/#contact"),
          },
        ]
      : undefined,
  };
}

export function webPageJsonLd({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}) {
  const url = absoluteUrl(path);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: ["tr-TR", "en-US"],
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function websiteJsonLd() {
  const tr = getDictionary("tr");
  return {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: tr.meta.description,
    inLanguage: ["tr-TR", "en-US"],
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function serviceListJsonLd() {
  const tr = getDictionary("tr");
  return {
    "@type": "ItemList",
    "@id": `${siteConfig.url}/hizmetler#list`,
    name: tr.nav.services,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => {
      const item = tr.services.items.find((entry) => entry.id === service.id);
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item?.title,
        url: absoluteUrl(servicePath(service.slug)),
      };
    }),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(slug: string) {
  const service = services.find((item) => item.slug === slug);
  if (!service) return null;
  const tr = getDictionary("tr");
  const page = tr.servicePage.pages.find((item) => item.id === service.id);
  const item = tr.services.items.find((entry) => entry.id === service.id);
  const url = absoluteUrl(servicePath(service.slug));

  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: item?.title ?? page?.metaTitle,
    description: page?.metaDescription,
    url,
    image: absoluteUrl(service.image),
    serviceType: item?.title,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: { "@type": "Country", name: "Turkey" },
    inLanguage: ["tr", "en"],
  };
}

export function jsonLdGraph(nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}
