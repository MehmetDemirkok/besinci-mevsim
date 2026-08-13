import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/service/ServicePage";
import { getServiceBySlug, services, servicePath } from "@/data/services";
import { getDictionary } from "@/i18n";
import { siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const tr = getDictionary("tr");
  const page = tr.servicePage.pages.find((item) => item.id === service?.id);
  const item = tr.services.items.find((entry) => entry.id === service?.id);

  if (!service || !page || !item) {
    return { title: tr.nav.services };
  }

  const url = `${siteConfig.url}${servicePath(service.slug)}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${page.metaTitle} | ${siteConfig.name}`,
      description: page.metaDescription,
      url,
      images: [{ url: service.image, alt: page.imageAlt }],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const tr = getDictionary("tr");
  const page = tr.servicePage.pages.find((item) => item.id === service.id);
  const item = tr.services.items.find((entry) => entry.id === service.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: item?.title ?? page?.metaTitle,
    description: page?.metaDescription,
    url: `${siteConfig.url}${servicePath(service.slug)}`,
    image: `${siteConfig.url}${service.image}`,
    provider: {
      "@type": "TravelAgency",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: { "@type": "Country", name: "Turkey" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePage service={service} />
    </>
  );
}
