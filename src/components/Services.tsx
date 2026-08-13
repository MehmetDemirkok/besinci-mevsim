"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services, servicePath } from "@/data/services";
import { BrandImage } from "@/components/ui/BrandImage";
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {items.map((service, index) => (
            <Reveal key={service.id} delay={0.04 * index}>
              <Link
                href={servicePath(service.slug)}
                className="group relative block overflow-hidden border border-line transition-colors hover:border-cyan/30"
                aria-label={`${service.title} — ${t.services.readMore}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <BrandImage
                    src={service.image}
                    alt=""
                    atmosphere={service.atmosphere}
                    className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width:1024px) 50vw, 33vw"
                    imageClassName="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,20,0.05)_0%,rgba(7,16,20,0.55)_70%,rgba(7,16,20,0.92)_100%)]" />
                  <p className="absolute left-4 top-4 text-eyebrow text-gold md:left-5 md:top-5">
                    {service.number}
                  </p>
                </div>
                <div className="border-t border-line bg-void/40 px-4 py-5 md:px-5 md:py-6">
                  <h3 className="text-xl font-medium tracking-tight text-mist md:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-mist-muted">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[0.7rem] tracking-[0.14em] text-cyan">
                    {t.services.readMore}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
