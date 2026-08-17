"use client";

import Link from "next/link";
import { BrandWordmark } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { InstagramLink } from "@/components/ui/InstagramLink";
import { AgencyCredential } from "@/components/ui/AgencyCredential";
import { useLanguage } from "@/i18n/LanguageProvider";

export function LegalShell({
  title,
  intro,
  updatedAt,
  sections,
}: {
  title: string;
  intro: string;
  updatedAt: string;
  sections: { title: string; paragraphs: string[] }[];
}) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-void text-mist">
      <header className="border-b border-line safe-pt">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 safe-px py-4 md:px-8">
          <Link href="/" aria-label={t.nav.home} className="min-w-0">
            <BrandWordmark compact />
          </Link>
          <div className="flex shrink-0 items-center gap-2">
            <InstagramLink className="hidden sm:inline-flex" />
            <LanguageSwitcher variant="inline" />
          </div>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-3xl safe-px py-14 md:px-8 md:py-20">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-sm tracking-[0.06em] text-cyan transition-colors hover:text-mist"
        >
          ← {t.legal.back}
        </Link>

        <h1 className="mt-8 text-3xl font-medium tracking-tight text-mist md:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-mist-soft">{updatedAt}</p>
        <p className="mt-8 text-base leading-relaxed text-mist-muted md:text-lg">
          {intro}
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-medium tracking-tight text-mist md:text-2xl">
                {section.title}
              </h2>
              <div className="mt-4 space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-sm leading-relaxed text-mist-muted md:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 safe-px pt-8 pb-fab text-sm text-mist-soft md:px-8">
          <AgencyCredential />
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy" className="inline-flex min-h-11 items-center hover:text-mist">
              {t.footer.privacy}
            </Link>
            <Link href="/kvkk" className="inline-flex min-h-11 items-center hover:text-mist">
              {t.footer.kvkk}
            </Link>
            <Link href="/#contact" className="inline-flex min-h-11 items-center hover:text-mist">
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
