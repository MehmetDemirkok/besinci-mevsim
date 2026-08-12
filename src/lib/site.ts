export const siteConfig = {
  name: "Beşinci Mevsim",
  tagline: "SEYAHAT & TURİZM TAŞIMACILIK",
  title: "Beşinci Mevsim | VIP Transfer & Turizm Taşımacılık",
  description:
    "Beşinci Mevsim ile VIP transfer, havaalanı transferi, turizm taşımacılığı, kurumsal seyahat ve konaklama hizmetleri. Konforlu ve güvenilir yolculuk deneyimi.",
  url: "https://besincimevsim.com",
  /** Production / preview host used in sitemap & canonicals */
  locale: "tr_TR",
  logo: "/images/brand/logo.png",
  ogImage: "/images/brand/og.png",
  nav: [
    { key: "about" as const, href: "#about" },
    { key: "services" as const, href: "#services" },
    { key: "fleet" as const, href: "#fleet" },
    { key: "travel" as const, href: "#journey" },
    { key: "contact" as const, href: "#contact" },
  ],
  /**
   * İletişim bilgileri — telefon / WhatsApp / adres geldiğinde ekleyin.
   */
  contact: {
    email: "info@besincimevsim.com" as string | null,
    phone: null as string | null,
    whatsapp: null as string | null,
    address: null as string | null,
  },
} as const;
