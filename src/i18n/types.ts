export type Locale = "tr" | "en";

export const locales: Locale[] = ["tr", "en"];
export const defaultLocale: Locale = "tr";
export const localeStorageKey = "besinci-mevsim-locale";

export type Dictionary = {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  nav: {
    about: string;
    services: string;
    fleet: string;
    travel: string;
    contact: string;
    contactCta: string;
    primary: string;
    mobile: string;
    openMenu: string;
    closeMenu: string;
    home: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    body: string;
    ctaFleet: string;
    ctaServices: string;
    chips: string[];
    imageAlt: string;
  };
  manifesto: {
    quote: string;
    words: string[];
    titleLine1: string;
    titleLine2: string;
    body: string;
  };
  vito: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    body: string;
    points: string[];
    imageAlt: string;
  };
  fleet: {
    eyebrow: string;
    title: string;
    subtitle: string;
    vehicles: {
      id: string;
      category: string;
      description: string;
      characteristics: string[];
    }[];
  };
  services: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    items: {
      id: string;
      number: string;
      title: string;
      description: string;
    }[];
  };
  transition: {
    aria: string;
    titleLine1: string;
    titleLine2: string;
    stages: string[];
  };
  travel: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    body: string;
    frames: { alt: string; label: string }[];
  };
  journey: {
    aria: string;
    chapterLabel: string;
    scrollHint: string;
    audioEnable: string;
    audioDisable: string;
    reducedTitle: string;
    reducedBody: string;
    scenes: {
      id: string;
      title: string;
      subtitle: string;
    }[];
    revealLine: string;
    revealBrand: string;
  };
  accommodation: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    body: string;
    cta: string;
    imageAlt: string;
    label: string;
  };
  about: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    body: string;
    note: string;
    imageAlt: string;
  };
  trust: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    principles: { title: string; description: string }[];
  };
  contact: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    body: string;
    cta: string;
    comingSoon: string;
    phone: string;
    email: string;
    address: string;
    toBeProvided: string;
  };
  footer: {
    blurb: string;
    rights: string;
    privacy: string;
    kvkk: string;
    navLabel: string;
  };
  legal: {
    back: string;
    updatedAt: string;
    privacyTitle: string;
    privacyIntro: string;
    privacySections: { title: string; paragraphs: string[] }[];
    kvkkTitle: string;
    kvkkIntro: string;
    kvkkSections: { title: string; paragraphs: string[] }[];
  };
  whatsapp: string;
};
