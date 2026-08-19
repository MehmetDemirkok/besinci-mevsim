export const siteConfig = {
  name: "Beşinci Mevsim",
  tagline: "SEYAHAT & TURİZM TAŞIMACILIK",
  title: "Beşinci Mevsim | Ankara VIP Transfer ve Turizm Taşımacılık",
  description:
    "Ankara merkezli Beşinci Mevsim — İlkRüzgar Seyahat Acentası (TURSAB 18563). VIP transfer, Esenboğa havaalanı transferi, kurumsal ve turizm taşımacılığı, şoförlü araç ve konaklama.",
  url: "https://www.besincimevsimturizm.com.tr",
  /** Production / preview host used in sitemap & canonicals */
  locale: "tr_TR",
  logo: "/images/brand/logo-mark.png",
  ogImage: "/images/brand/og.png",
  nav: [
    { key: "services" as const, href: "#services" },
    { key: "travel" as const, href: "#journey" },
    { key: "fleet" as const, href: "#fleet" },
    { key: "about" as const, href: "#about" },
  ],
  footerNav: [
    { key: "services" as const, href: "#services" },
    { key: "travel" as const, href: "#journey" },
    { key: "fleet" as const, href: "#fleet" },
    { key: "about" as const, href: "#about" },
    { key: "vision" as const, href: "/vizyon-misyon" },
    { key: "contact" as const, href: "#contact" },
  ],
  /**
   * İletişim bilgileri.
   */
  contact: {
    email: "info@besincimevsimturizm.com.tr" as string | null,
    phone: "+90 533 746 07 98" as string | null,
    whatsapp: "+90 533 746 07 98" as string | null,
    address:
      "Yukarı Bahçelievler Mahallesi Aşkabat Caddesi No:37/6 Bahçelievler / ANKARA" as string | null,
  },
  social: {
    instagram: "https://www.instagram.com/besincimevsimturizm",
    instagramHandle: "besincimevsimturizm",
  },
  agency: {
    name: "İlkRüzgar Seyahat Acentası",
    tursabNo: "18563",
  },
} as const;

export function contactDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function telHref(phone: string) {
  return `tel:+${contactDigits(phone)}`;
}

export function whatsappHref(phone: string) {
  return `https://wa.me/${contactDigits(phone)}`;
}

export function mapsHref(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
