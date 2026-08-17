"use client";

import { BrandImage } from "@/components/ui/BrandImage";
import { Reveal } from "@/components/motion/Reveal";
import { AgencyCredential } from "@/components/ui/AgencyCredential";
import { useLanguage } from "@/i18n/LanguageProvider";

export function About() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="relative scroll-mt-24 bg-ink py-20 md:py-28"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 safe-px md:px-8 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <Reveal className="lg:col-span-6">
          <p className="text-eyebrow text-cyan">{t.about.eyebrow}</p>
          <h2 id="about-heading" className="mt-5 text-display-sm text-mist">
            {t.about.titleLine1}
            <br />
            {t.about.titleLine2}
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-mist-muted">
            {t.about.body}
          </p>

          <div className="mt-12 border-t border-line pt-8">
            <p className="text-eyebrow text-gold">{t.about.agency}</p>
            <AgencyCredential className="mt-3 max-w-md text-sm md:text-base" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-mist-soft">
              {t.about.note}
            </p>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-6" delay={0.12} y={36}>
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/4]">
            <BrandImage
              src="/images/about/atmosphere.png"
              alt={t.about.imageAlt}
              atmosphere="abstract"
              label="BEŞİNCİ MEVSİM"
              className="h-full w-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
