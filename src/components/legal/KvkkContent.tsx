"use client";

import { LegalShell } from "@/components/legal/LegalShell";
import { useLanguage } from "@/i18n/LanguageProvider";

export function KvkkContent() {
  const { t } = useLanguage();

  return (
    <LegalShell
      title={t.legal.kvkkTitle}
      intro={t.legal.kvkkIntro}
      updatedAt={t.legal.updatedAt}
      sections={t.legal.kvkkSections}
    />
  );
}
