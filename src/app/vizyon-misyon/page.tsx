import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { VisionPage } from "@/components/VisionPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/i18n";
import {
  breadcrumbJsonLd,
  jsonLdGraph,
  organizationJsonLd,
  pageMetadata,
  webPageJsonLd,
} from "@/lib/seo";
import { visionPath } from "@/lib/nav";

const tr = getDictionary("tr");

export const metadata: Metadata = pageMetadata({
  title: tr.visionPage.metaTitle,
  description: tr.visionPage.metaDescription,
  path: visionPath,
  keywords: [
    "Beşinci Mevsim vizyon",
    "Beşinci Mevsim misyon",
    "Ankara VIP transfer",
    "turizm taşımacılığı",
    "İlkRüzgar Seyahat Acentası",
    "TURSAB 18563",
  ],
});

export default function VisionMissionRoute() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          organizationJsonLd(),
          {
            ...webPageJsonLd({
              path: visionPath,
              title: tr.visionPage.metaTitle,
              description: tr.visionPage.metaDescription,
            }),
            "@type": "AboutPage",
          },
          breadcrumbJsonLd([
            { name: tr.servicePage.back, path: "/" },
            { name: tr.nav.vision, path: visionPath },
          ]),
        ])}
      />
      <Navbar />
      <VisionPage />
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
