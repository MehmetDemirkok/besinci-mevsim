"use client";

import { siteConfig, whatsappHref } from "@/lib/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/** Floating WhatsApp CTA — only rendered when a real number is configured. */
export function WhatsAppFloat() {
  const { t } = useLanguage();
  const number = siteConfig.contact.whatsapp;
  if (!number) return null;

  return (
    <a
      href={whatsappHref(number)}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float fixed z-30 inline-flex h-14 w-14 items-center justify-center rounded-full border border-cyan/30 bg-panel text-cyan shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-transform hover:scale-105"
      style={{
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
        right: "max(1.25rem, env(safe-area-inset-right))",
      }}
      aria-label={t.whatsapp}
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
