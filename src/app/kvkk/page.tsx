import type { Metadata } from "next";
import { KvkkContent } from "@/components/legal/KvkkContent";
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
  title: tr.legal.kvkkTitle,
  description: tr.legal.kvkkIntro,
  path: "/kvkk",
});

export default function KvkkPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          organizationJsonLd(),
          webPageJsonLd({
            path: "/kvkk",
            title: tr.legal.kvkkTitle,
            description: tr.legal.kvkkIntro,
          }),
          breadcrumbJsonLd([
            { name: tr.servicePage.back, path: "/" },
            { name: tr.legal.kvkkTitle, path: "/kvkk" },
          ]),
        ])}
      />
      <KvkkContent />
    </>
  );
}
