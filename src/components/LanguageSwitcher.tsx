"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import type { Locale } from "@/i18n/types";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage();

  const options: { id: Locale; label: string }[] = [
    { id: "tr", label: "TR" },
    { id: "en", label: "EN" },
  ];

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-line-strong p-1 ${className}`}
      role="group"
      aria-label={t.nav.language}
    >
      {options.map((option) => {
        const active = locale === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setLocale(option.id)}
            className={`min-w-9 rounded-full px-2.5 py-1 text-[0.7rem] tracking-[0.14em] transition-colors ${
              active
                ? "bg-mist text-void"
                : "text-mist-muted hover:text-mist"
            }`}
            aria-pressed={active}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
