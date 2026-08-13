import type { Metadata } from "next";
import { PrivacyContent } from "@/components/legal/PrivacyContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/i18n";
import {
  breadcrumbJsonLd,
  jsonLdGraph,
  organizationJsonLd,
  pageMetadata,
  webPageJsonLd,
} from "@/lib/seo";

const tr = getDictionary("tr");

export const metadata: Metadata = pageMetadata({
  title: tr.legal.privacyTitle,
  description: tr.legal.privacyIntro,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          organizationJsonLd(),
          webPageJsonLd({
            path: "/privacy",
            title: tr.legal.privacyTitle,
            description: tr.legal.privacyIntro,
          }),
          breadcrumbJsonLd([
            { name: tr.servicePage.back, path: "/" },
            { name: tr.legal.privacyTitle, path: "/privacy" },
          ]),
        ])}
      />
      <PrivacyContent />
    </>
  );
}
