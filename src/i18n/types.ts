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
    vision: string;
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
    language: string;
    skipToContent: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    offer: string;
    body: string;
    ctaContact: string;
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
    vehicleName: string;
    body: string;
    points: string[];
    imageAlt: string;
  };
  fleet: {
    eyebrow: string;
    title: string;
    subtitle: string;
    swipeHint: string;
    requestCta: string;
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
    readMore: string;
    items: {
      id: string;
      number: string;
      title: string;
      description: string;
    }[];
  };
  servicePage: {
    back: string;
    breadcrumb: string;
    allServices: string;
    explore: string;
    suitableLabel: string;
    highlightsLabel: string;
    relatedLabel: string;
    fleetLabel: string;
    ctaLabel: string;
    ctaHint: string;
    indexTitle: string;
    indexDescription: string;
    pages: {
      id: string;
      metaTitle: string;
      metaDescription: string;
      imageAlt: string;
      lead: string;
      body: string[];
      highlights: { title: string; text: string }[];
      suitable: string[];
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
    skip: string;
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
    agency: string;
    visionCta: string;
  };
  visionPage: {
    metaTitle: string;
    metaDescription: string;
    breadcrumb: string;
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    lead: string;
    imageAlt: string;
    visionLabel: string;
    visionTitle: string;
    visionBody: string[];
    missionLabel: string;
    missionTitle: string;
    missionBody: string[];
    commitmentsLabel: string;
    commitments: { kicker: string; title: string; text: string }[];
    ctaLabel: string;
    ctaHint: string;
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
    writeUs: string;
    emailHint: string;
    topicsLabel: string;
    topicHint: string;
    topics: { id: string; label: string; subject: string }[];
    responseNote: string;
    copy: string;
    copied: string;
    name: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    formHint: string;
    mailtoFallback: string;
  };
  footer: {
    blurb: string;
    rights: string;
    privacy: string;
    kvkk: string;
    navLabel: string;
    tursab: string;
  };
  notFound: {
    title: string;
    description: string;
    home: string;
    services: string;
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
  instagram: string;
};
