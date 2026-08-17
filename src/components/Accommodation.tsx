"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandImage } from "@/components/ui/BrandImage";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Accommodation() {
  const { t } = useLanguage();

  return (
    <section
      id="accommodation"
      className="relative overflow-hidden"
      aria-labelledby="accommodation-heading"
    >
      <div className="relative min-h-[42svh] md:min-h-[48svh]">
        <BrandImage
          src="/images/services/accommodation.png"
          alt={t.accommodation.imageAlt}
          atmosphere="hotel"
          label={t.accommodation.label}
          className="absolute inset-0 h-full w-full"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,20,0.5)_0%,rgba(7,16,20,0.72)_50%,rgba(7,16,20,0.94)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[42svh] max-w-[1440px] items-end safe-px py-16 md:min-h-[48svh] md:px-8 md:py-20 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="text-eyebrow text-gold">{t.accommodation.eyebrow}</p>
            <h2
              id="accommodation-heading"
              className="mt-4 text-display-sm text-mist"
            >
              {t.accommodation.titleLine1}
              <br />
              {t.accommodation.titleLine2}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-mist-muted">
              {t.accommodation.body}
            </p>
            <Link
              href="/hizmetler/konaklama"
              className="group mt-8 inline-flex items-center gap-2 text-sm tracking-[0.1em] text-mist transition-colors hover:text-cyan"
            >
              {t.accommodation.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
