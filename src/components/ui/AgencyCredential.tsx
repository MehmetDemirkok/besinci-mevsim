"use client";

import { siteConfig } from "@/lib/site";
import { useLanguage } from "@/i18n/LanguageProvider";

export function AgencyCredential({
  className = "",
}: {
  className?: string;
}) {
  const { t } = useLanguage();
  const { name, tursabNo } = siteConfig.agency;

  return (
    <p className={`leading-relaxed ${className}`}>
      <span className="text-mist-muted">{name}</span>
      <span className="mx-2.5 text-mist-soft/50" aria-hidden>
        ·
      </span>
      <span className="tracking-[0.08em] text-mist-soft">
        {t.footer.tursab} {tursabNo}
      </span>
    </p>
  );
}
