"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import type { Locale } from "@/i18n/types";

type LanguageSwitcherProps = {
  className?: string;
  variant?: "pill" | "inline";
};

export function LanguageSwitcher({
  className = "",
  variant = "pill",
}: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useLanguage();

  const options: { id: Locale; label: string }[] = [
    { id: "tr", label: "TR" },
    { id: "en", label: "EN" },
  ];

  if (variant === "inline") {
    return (
      <div
        className={`inline-flex items-center gap-0.5 ${className}`}
        role="group"
        aria-label={t.nav.language}
      >
        {options.map((option, index) => {
          const active = locale === option.id;
          return (
            <span key={option.id} className="inline-flex items-center">
              {index > 0 ? (
                <span className="mx-1 text-[0.65rem] text-mist-muted" aria-hidden>
                  /
                </span>
              ) : null}
              <button
                type="button"
                onClick={() => setLocale(option.id)}
                className={`rounded-sm px-1 py-1 text-[0.68rem] tracking-[0.16em] transition-colors ${
                  active
                    ? "text-cyan"
                    : "text-mist-muted hover:text-mist"
                }`}
                aria-pressed={active}
              >
                {option.label}
              </button>
            </span>
          );
        })}
      </div>
    );
  }

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
