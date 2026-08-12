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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: siteConfig.name,
  description: tr.meta.description,
  url: siteConfig.url,
  inLanguage: ["tr", "en"],
  knowsAbout: [
    "VIP transfer",
    "Havaalanı transferi",
    "Kurumsal taşımacılık",
    "Turizm taşımacılığı",
    "Konaklama hizmetleri",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
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
