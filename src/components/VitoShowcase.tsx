"use client";

import { BrandImage } from "@/components/ui/BrandImage";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";

export function VitoShowcase() {
  const { t } = useLanguage();

  return (
    <section
      className="relative overflow-hidden bg-ink"
      aria-labelledby="vito-heading"
    >
      <div className="relative min-h-[70svh] md:min-h-[75svh]">
        <BrandImage
          src="/images/fleet/vito-detail.png"
          alt={t.vito.imageAlt}
          atmosphere="vehicle"
          label="MERCEDES-BENZ VITO"
          className="absolute inset-0 h-full w-full"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,16,20,0.88)_0%,rgba(7,16,20,0.4)_50%,rgba(7,16,20,0.7)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,20,0.25)_0%,transparent_35%,rgba(7,16,20,0.88)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-[1440px] items-end px-5 py-16 md:min-h-[75svh] md:px-8 md:py-20 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="text-eyebrow text-gold">{t.vito.eyebrow}</p>
            <h2 id="vito-heading" className="mt-4 text-display-sm text-mist">
              {t.vito.titleLine1}
              <br />
              {t.vito.titleLine2}
            </h2>
            <h3 className="mt-6 text-xl font-medium tracking-tight text-cyan md:text-2xl">
              Mercedes-Benz Vito
            </h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-mist-muted">
              {t.vito.body}
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6">
              {t.vito.points.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2 text-sm tracking-[0.06em] text-mist"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
