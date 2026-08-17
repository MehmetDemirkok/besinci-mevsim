import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { CinematicJourney } from "@/components/cinematic/CinematicJourney";
import { Fleet } from "@/components/Fleet";
import { Services } from "@/components/Services";
import { Accommodation } from "@/components/Accommodation";
import { About } from "@/components/About";
import { TrustSection } from "@/components/TrustSection";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/i18n";
import {
  breadcrumbJsonLd,
  jsonLdGraph,
  organizationJsonLd,
  pageMetadata,
  serviceListJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

const tr = getDictionary("tr");

export const metadata: Metadata = pageMetadata({
  title: tr.meta.title,
  description: tr.meta.description,
  path: "/",
  keywords: tr.meta.keywords,
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          organizationJsonLd(),
          websiteJsonLd(),
          webPageJsonLd({
            path: "/",
            title: tr.meta.title,
            description: tr.meta.description,
          }),
          serviceListJsonLd(),
          breadcrumbJsonLd([{ name: tr.servicePage.back, path: "/" }]),
        ])}
      />
      <Navbar />
      <main id="main">
        <Hero />
        <Manifesto />
        <Services />
        <CinematicJourney />
        <Fleet />
        <Accommodation />
        <About />
        <TrustSection />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
