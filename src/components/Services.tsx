"use client";

import { services } from "@/data/services";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Services() {
  const { t } = useLanguage();

  const items = services.map((service) => {
    const copy = t.services.items.find((item) => item.id === service.id);
    return {
      ...service,
      number: copy?.number ?? "",
      title: copy?.title ?? "",
      description: copy?.description ?? "",
    };
  });

  return (
    <section
      id="services"
      className="relative bg-ink py-20 md:py-28"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-[1440px] safe-px md:px-8 lg:px-10">
        <Reveal>
          <p className="text-eyebrow text-cyan">{t.services.eyebrow}</p>
          <h2 id="services-heading" className="mt-4 text-display-sm text-mist">
            {t.services.titleLine1}
            <br />
            {t.services.titleLine2}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-0 border-t border-line md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {items.map((service, index) => (
            <Reveal
              key={service.id}
              delay={0.04 * index}
              className="border-b border-line px-0 py-8 md:border-r md:px-6 md:py-10 md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
            >
              <p className="text-eyebrow text-gold">{service.number}</p>
              <h3 className="mt-4 text-xl font-medium tracking-tight text-mist md:text-2xl">
                {service.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist-muted">
                {service.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
