import { en } from "@/i18n/dictionaries/en";
import { tr } from "@/i18n/dictionaries/tr";
import type { Dictionary, Locale } from "@/i18n/types";
import { defaultLocale } from "@/i18n/types";

export const dictionaries: Record<Locale, Dictionary> = {
  tr,
  en,
};

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function isLocale(value: string): value is Locale {
  return value === "tr" || value === "en";
}

export { defaultLocale, localeStorageKey, locales } from "@/i18n/types";
export type { Dictionary, Locale } from "@/i18n/types";
