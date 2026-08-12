"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Floating WhatsApp CTA — only rendered when a real number is configured. */
export function WhatsAppFloat() {
  const { t } = useLanguage();
  const number = siteConfig.contact.whatsapp;
  if (!number) return null;

  const href = `https://wa.me/${number.replace(/\D/g, "")}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full border border-cyan/30 bg-panel text-cyan shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-transform hover:scale-105 md:bottom-8 md:right-8"
      aria-label={t.whatsapp}
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
