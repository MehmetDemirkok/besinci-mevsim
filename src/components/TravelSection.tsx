"use client";

import { BrandImage } from "@/components/ui/BrandImage";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";

const frameAssets = [
  {
    src: "/images/travel/journey-01.png",
    atmosphere: "travel" as const,
  },
  {
    src: "/images/travel/journey-02.png",
    atmosphere: "road" as const,
  },
  {
    src: "/images/travel/journey-03.png",
    atmosphere: "city" as const,
  },
];

export function TravelSection() {
  const { t } = useLanguage();

  const frames = frameAssets.map((asset, index) => ({
    ...asset,
    alt: t.travel.frames[index]?.alt ?? "",
    label: t.travel.frames[index]?.label ?? "",
  }));

  return (
    <section
      id="travel"
      className="relative overflow-hidden bg-void py-28 md:py-36"
      aria-labelledby="travel-heading"
    >
      <div className="mx-auto max-w-[1440px] safe-px md:px-8 lg:px-10">
        <Reveal>
          <p className="text-eyebrow text-cyan">{t.travel.eyebrow}</p>
          <h2 id="travel-heading" className="mt-5 max-w-4xl text-display-sm text-mist">
            {t.travel.titleLine1}
            <br />
            {t.travel.titleLine2}
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mist-muted">
            {t.travel.body}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-4 md:mt-24 md:grid-cols-12 md:gap-5">
          <Reveal className="md:col-span-7" y={36}>
            <div className="relative aspect-[4/5] overflow-hidden md:aspect-[16/11]">
              <BrandImage
                src={frames[0].src}
                alt={frames[0].alt}
                atmosphere={frames[0].atmosphere}
                label={frames[0].label}
                className="h-full w-full"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
          </Reveal>

          <div className="grid gap-4 md:col-span-5 md:grid-rows-2">
            {frames.slice(1).map((frame, index) => (
              <Reveal key={frame.src} delay={0.1 * (index + 1)} y={28}>
                <div className="relative aspect-[16/11] overflow-hidden md:h-full md:aspect-auto">
                  <BrandImage
                    src={frame.src}
                    alt={frame.alt}
                    atmosphere={frame.atmosphere}
                    label={frame.label}
                    className="h-full w-full"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
