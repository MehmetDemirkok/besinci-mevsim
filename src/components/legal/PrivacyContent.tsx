"use client";

import { LegalShell } from "@/components/legal/LegalShell";
import { useLanguage } from "@/i18n/LanguageProvider";

export function PrivacyContent() {
  const { t } = useLanguage();

  return (
    <LegalShell
      title={t.legal.privacyTitle}
      intro={t.legal.privacyIntro}
      updatedAt={t.legal.updatedAt}
      sections={t.legal.privacySections}
    />
  );
}
