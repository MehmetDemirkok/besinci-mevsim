export const siteConfig = {
  name: "Beşinci Mevsim",
  tagline: "SEYAHAT & TURİZM TAŞIMACILIK",
  title: "Beşinci Mevsim | Seyahat & Turizm Taşımacılık",
  description:
    "Beşinci Mevsim; VIP transfer, turizm taşımacılığı, kurumsal seyahat ve konaklama hizmetleri.",
  url: "https://besincimevsim.com",
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
