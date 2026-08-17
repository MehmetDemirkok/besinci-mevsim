"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandImage } from "@/components/ui/BrandImage";
import { Reveal } from "@/components/motion/Reveal";
import { AgencyCredential } from "@/components/ui/AgencyCredential";
import { useLanguage } from "@/i18n/LanguageProvider";

export function VisionPage() {
  const { t } = useLanguage();
  const page = t.visionPage;

  return (
    <main id="main">
      <section className="relative min-h-[78svh] overflow-hidden">
        <BrandImage
          src="/images/about/atmosphere.png"
          alt={page.imageAlt}
          atmosphere="abstract"
          priority
          className="absolute inset-0 h-full w-full"
          sizes="100vw"
          imageClassName="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,20,0.58)_0%,rgba(7,16,20,0.32)_38%,rgba(7,16,20,0.88)_78%,rgba(7,16,20,0.98)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(24,187,208,0.14),transparent_42%)]" />

        <div className="relative z-10 mx-auto flex min-h-[78svh] max-w-[1440px] flex-col justify-end safe-px pb-14 pt-28 md:px-8 md:pb-20 lg:px-10">
          <nav
            aria-label={page.breadcrumb}
            className="text-sm tracking-[0.06em] text-mist-muted"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-mist">
                  {t.servicePage.back}
                </Link>
              </li>
              <li aria-hidden className="text-mist-muted/50">
                /
              </li>
              <li className="text-mist">{t.nav.vision}</li>
            </ol>
          </nav>

          <p className="mt-8 text-eyebrow text-gold">{page.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-display-sm text-mist md:text-display">
            {page.titleLine1}
            <br />
            {page.titleLine2}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist-muted md:text-lg">
            {page.lead}
          </p>
        </div>
      </section>

      <section className="relative bg-void py-16 md:py-24" aria-labelledby="vision-heading">
        <div className="mx-auto grid max-w-[1440px] gap-12 safe-px md:px-8 lg:grid-cols-2 lg:gap-0 lg:px-10">
          <Reveal className="lg:pr-14">
            <p className="text-eyebrow text-cyan">{page.visionLabel}</p>
            <h2
              id="vision-heading"
              className="mt-5 text-display-sm text-mist"
            >
              {page.visionTitle}
            </h2>
            <div className="mt-8 space-y-5">
              {page.visionBody.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="max-w-xl text-base leading-relaxed text-mist-muted md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal
            delay={0.08}
            className="border-t border-line pt-12 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0"
          >
            <p className="text-eyebrow text-gold">{page.missionLabel}</p>
            <h2 className="mt-5 text-display-sm text-mist">
              {page.missionTitle}
            </h2>
            <div className="mt-8 space-y-5">
              {page.missionBody.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="max-w-xl text-base leading-relaxed text-mist-muted md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <AgencyCredential className="mt-10 max-w-md text-sm" />
          </Reveal>
        </div>
      </section>

      <section
        className="relative bg-ink py-16 md:py-24"
        aria-labelledby="commitments-heading"
      >
        <div className="mx-auto max-w-[1440px] safe-px md:px-8 lg:px-10">
          <Reveal>
            <p className="text-eyebrow text-gold">{page.commitmentsLabel}</p>
            <h2 id="commitments-heading" className="sr-only">
              {page.commitmentsLabel}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-0 border-t border-line md:grid-cols-3">
            {page.commitments.map((item, index) => (
              <Reveal
                key={item.title}
                delay={0.06 * index}
                className="border-b border-line px-0 py-10 md:border-b-0 md:border-r md:px-8 md:py-12 md:last:border-r-0"
              >
                <p className="text-eyebrow text-cyan">{item.kicker}</p>
                <h3 className="mt-5 text-2xl font-medium tracking-tight text-mist">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist-muted md:text-base">
                  {item.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line bg-void">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 safe-px py-16 md:flex-row md:items-end md:px-8 md:py-20 lg:px-10">
          <Reveal>
            <p className="text-eyebrow text-cyan">{t.contact.eyebrow}</p>
            <h2 className="mt-4 max-w-xl text-display-sm text-mist">
              {page.ctaLabel}
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-mist-muted md:text-base">
              {page.ctaHint}
            </p>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#contact"
              className="group inline-flex items-center justify-center gap-2 bg-mist px-7 py-4 text-sm tracking-[0.1em] text-void transition-colors hover:bg-cyan"
            >
              {t.nav.contactCta}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/hizmetler"
              className="inline-flex items-center justify-center border border-line px-7 py-4 text-sm tracking-[0.1em] text-mist transition-colors hover:border-cyan/40"
            >
              {t.nav.services}
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
