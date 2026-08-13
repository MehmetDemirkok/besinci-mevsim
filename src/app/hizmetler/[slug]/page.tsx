import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/service/ServicePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getServiceBySlug, services, servicePath } from "@/data/services";
import { getDictionary } from "@/i18n";
import {
  breadcrumbJsonLd,
  jsonLdGraph,
  organizationJsonLd,
  pageMetadata,
  serviceJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

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

  return pageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: servicePath(service.slug),
    image: service.image,
    imageAlt: page.imageAlt,
    keywords: [
      page.metaTitle,
      item.title,
      "Beşinci Mevsim",
      "Besinci Mevsim",
      "VIP transfer",
      "turizm taşımacılığı",
    ],
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const tr = getDictionary("tr");
  const item = tr.services.items.find((entry) => entry.id === service.id);
  const schema = serviceJsonLd(service.slug);

  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          organizationJsonLd(),
          webPageJsonLd({
            path: servicePath(service.slug),
            title: item?.title ?? tr.nav.services,
            description:
              tr.servicePage.pages.find((entry) => entry.id === service.id)
                ?.metaDescription ?? tr.servicePage.indexDescription,
          }),
          ...(schema ? [schema] : []),
          breadcrumbJsonLd([
            { name: tr.servicePage.back, path: "/" },
            { name: tr.nav.services, path: "/hizmetler" },
            {
              name: item?.title ?? tr.nav.services,
              path: servicePath(service.slug),
            },
          ]),
        ])}
      />
      <ServicePage service={service} />
    </>
  );
}
