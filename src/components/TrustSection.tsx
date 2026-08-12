"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";

export function TrustSection() {
  const { t } = useLanguage();

  return (
    <section
      className="relative bg-void py-20 md:py-28"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-10">
        <Reveal>
          <p className="text-eyebrow text-gold">{t.trust.eyebrow}</p>
          <h2 id="trust-heading" className="mt-5 max-w-4xl text-display-sm text-mist">
            {t.trust.titleLine1}
            <br />
            {t.trust.titleLine2}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-0 border-t border-line md:mt-24 md:grid-cols-2 lg:grid-cols-4">
          {t.trust.principles.map((item, index) => (
            <Reveal
              key={item.title}
              delay={0.08 * index}
              className="border-b border-line px-0 py-10 md:border-b-0 md:border-r md:px-8 md:py-12 md:last:border-r-0 lg:min-h-[280px]"
            >
              <p className="text-eyebrow text-mist-soft">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-6 text-2xl font-medium tracking-tight text-mist md:text-3xl">
                {item.title}
              </h3>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist-muted md:text-base">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
