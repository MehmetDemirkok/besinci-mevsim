import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { CinematicJourney } from "@/components/cinematic/CinematicJourney";
import { VitoShowcase } from "@/components/VitoShowcase";
import { Fleet } from "@/components/Fleet";
import { Services } from "@/components/Services";
import { Accommodation } from "@/components/Accommodation";
import { About } from "@/components/About";
import { TrustSection } from "@/components/TrustSection";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { siteConfig } from "@/lib/site";
import { getDictionary } from "@/i18n";

const tr = getDictionary("tr");

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  alternateName: ["Besinci Mevsim", "5. Mevsim"],
  description: tr.meta.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}${siteConfig.logo}`,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  email: siteConfig.contact.email ?? undefined,
  telephone: siteConfig.contact.phone ?? undefined,
  inLanguage: ["tr", "en"],
  areaServed: {
    "@type": "Country",
    name: "Turkey",
  },
  knowsAbout: [
    "VIP transfer",
    "Havaalanı transferi",
    "Kurumsal taşımacılık",
    "Turizm taşımacılığı",
    "Konaklama hizmetleri",
    "Mercedes Vito",
  ],
  contactPoint: siteConfig.contact.email
    ? [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: siteConfig.contact.email,
          availableLanguage: ["Turkish", "English"],
        },
      ]
    : undefined,
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  description: tr.meta.description,
  inLanguage: ["tr-TR", "en-US"],
  publisher: { "@id": `${siteConfig.url}/#organization` },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationLd, websiteLd]),
        }}
      />
      <Navbar />
      <main id="top">
        <Hero />
        <Manifesto />
        <CinematicJourney />
        <VitoShowcase />
        <Fleet />
        <Services />
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
