"use client";

import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";

export function TrustSection() {
  const { t } = useLanguage();

  return (
    <section
      className="relative overflow-hidden bg-void py-20 md:py-28"
      aria-labelledby="trust-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 10% 0%, rgba(24,187,208,0.12), transparent 42%), radial-gradient(ellipse at 90% 100%, rgba(244,181,27,0.08), transparent 40%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] safe-px md:px-8 lg:px-10">
        <Reveal>
          <p className="text-eyebrow text-gold">{t.trust.eyebrow}</p>
          <h2
            id="trust-heading"
            className="mt-5 max-w-4xl text-display-sm text-mist"
          >
            {t.trust.titleLine1}
            <br />
            {t.trust.titleLine2}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-0 border-t border-line md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {t.trust.principles.map((item, index) => (
            <Reveal
              key={item.title}
              delay={0.06 * index}
              className="group relative border-b border-line px-0 py-10 md:border-b-0 md:border-r md:px-7 md:py-12 md:last:border-r-0 lg:min-h-[300px] lg:px-8"
            >
              <div
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-cyan/80 to-transparent transition-transform duration-500 group-hover:scale-x-100 md:inset-y-0 md:left-0 md:top-auto md:h-full md:w-px md:bg-gradient-to-b"
                aria-hidden
              />
              <p className="text-eyebrow text-mist-soft">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-6 text-2xl font-medium tracking-tight text-mist transition-colors group-hover:text-cyan md:text-3xl">
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
