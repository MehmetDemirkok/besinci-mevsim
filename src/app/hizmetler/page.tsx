import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Services } from "@/components/Services";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/i18n";
import {
  breadcrumbJsonLd,
  jsonLdGraph,
  organizationJsonLd,
  pageMetadata,
  serviceListJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

const tr = getDictionary("tr");

export const metadata: Metadata = pageMetadata({
  title: tr.servicePage.indexTitle,
  description: tr.servicePage.indexDescription,
  path: "/hizmetler",
  keywords: [
    "Beşinci Mevsim hizmetler",
    "Ankara VIP transfer",
    "Esenboğa transfer",
    "havaalanı transferi",
    "kurumsal taşımacılık",
    "turizm taşımacılığı",
    "şoförlü araç Ankara",
    "konaklama",
  ],
});

export default function ServicesIndexPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          organizationJsonLd(),
          webPageJsonLd({
            path: "/hizmetler",
            title: tr.servicePage.indexTitle,
            description: tr.servicePage.indexDescription,
          }),
          serviceListJsonLd(),
          breadcrumbJsonLd([
            { name: tr.servicePage.back, path: "/" },
            { name: tr.nav.services, path: "/hizmetler" },
          ]),
        ])}
      />
      <Navbar />
      <main id="main" className="bg-ink pt-[calc(8rem+env(safe-area-inset-top))] md:pt-36">
        <Services heading="page" />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
