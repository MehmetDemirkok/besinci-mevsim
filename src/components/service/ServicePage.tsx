"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { BrandImage } from "@/components/ui/BrandImage";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { siteConfig } from "@/lib/site";
import { fleet } from "@/data/fleet";
import {
  services,
  servicePath,
  type ServiceItemBase,
} from "@/data/services";

export function ServicePage({ service }: { service: ServiceItemBase }) {
  const { t } = useLanguage();
  const copy = t.services.items.find((item) => item.id === service.id);
  const page = t.servicePage.pages.find((item) => item.id === service.id);
  const topic = t.contact.topics.find((item) => item.id === service.contactTopicId);

  const related = services.filter((item) => item.id !== service.id);
  const relatedFleet = fleet.filter((vehicle) =>
    service.relatedFleetIds.includes(vehicle.id),
  );

  const mailto =
    siteConfig.contact.email && topic
      ? `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(topic.subject)}`
      : siteConfig.contact.email
        ? `mailto:${siteConfig.contact.email}`
        : "/#contact";

  if (!copy || !page) return null;

  return (
    <>
      <Navbar />
      <main id="main">
        <section className="relative min-h-[88svh] overflow-hidden">
          <BrandImage
            src={service.image}
            alt={page.imageAlt}
            atmosphere={service.atmosphere}
            priority
            className="absolute inset-0 h-full w-full"
            sizes="100vw"
            imageClassName="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,20,0.55)_0%,rgba(7,16,20,0.28)_38%,rgba(7,16,20,0.82)_72%,rgba(7,16,20,0.98)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(24,187,208,0.12),transparent_42%)]" />

          <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-[1440px] flex-col justify-end safe-px pb-14 pt-28 md:px-8 md:pb-20 lg:px-10">
            <Link
              href="/#services"
              className="inline-flex w-fit items-center gap-2 text-sm tracking-[0.08em] text-mist-muted transition-colors hover:text-mist"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.servicePage.allServices}
            </Link>

            <p className="mt-8 text-eyebrow text-gold">{copy.number}</p>
            <h1 className="mt-4 max-w-4xl text-display-sm text-mist md:text-display">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist-muted md:text-lg">
              {page.lead}
            </p>
          </div>
        </section>

        <section className="relative bg-void py-16 md:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-14 safe-px md:px-8 lg:grid-cols-12 lg:gap-16 lg:px-10">
            <Reveal className="lg:col-span-7">
              <p className="text-eyebrow text-cyan">{t.services.eyebrow}</p>
              <div className="mt-8 space-y-5">
                {page.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="max-w-2xl text-base leading-relaxed text-mist-muted md:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-5" y={24}>
              <div className="border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
                <p className="text-eyebrow text-gold">
                  {t.servicePage.suitableLabel}
                </p>
                <ul className="mt-6 space-y-0">
                  {page.suitable.map((item, index) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-4 border-b border-line py-4"
                    >
                      <span className="text-eyebrow text-mist-soft">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base text-mist md:text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="relative bg-ink py-16 md:py-24" aria-labelledby="highlights-heading">
          <div className="mx-auto max-w-[1440px] safe-px md:px-8 lg:px-10">
            <Reveal>
              <p className="text-eyebrow text-cyan">{t.servicePage.highlightsLabel}</p>
              <h2 id="highlights-heading" className="sr-only">
                {t.servicePage.highlightsLabel}
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-0 border-t border-line md:grid-cols-3">
              {page.highlights.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={0.06 * index}
                  className="border-b border-line px-0 py-10 md:border-b-0 md:border-r md:px-8 md:py-12 md:last:border-r-0"
                >
                  <p className="text-eyebrow text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </p>
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

        {relatedFleet.length > 0 ? (
          <section className="relative bg-void py-16 md:py-20">
            <div className="mx-auto max-w-[1440px] safe-px md:px-8 lg:px-10">
              <Reveal>
                <p className="text-eyebrow text-gold">{t.servicePage.fleetLabel}</p>
              </Reveal>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {relatedFleet.map((vehicle, index) => (
                  <Reveal key={vehicle.id} delay={0.05 * index}>
                    <Link
                      href="/#fleet"
                      className="group relative block overflow-hidden border border-line transition-colors hover:border-cyan/35"
                    >
                      <div className="relative aspect-[16/10]">
                        <BrandImage
                          src={vehicle.image}
                          alt={vehicle.name}
                          atmosphere="vehicle"
                          className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]"
                          sizes="(max-width:1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(7,16,20,0.88)_100%)]" />
                        <p className="absolute bottom-4 left-4 text-lg font-medium tracking-tight text-mist">
                          {vehicle.name}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section
          className="relative overflow-hidden border-t border-line bg-void"
          aria-labelledby="service-cta-heading"
        >
          <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 safe-px py-16 md:flex-row md:items-end md:px-8 md:py-20 lg:px-10">
            <Reveal>
              <p className="text-eyebrow text-cyan">{t.contact.eyebrow}</p>
              <h2
                id="service-cta-heading"
                className="mt-4 max-w-xl text-display-sm text-mist"
              >
                {copy.title}
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-mist-muted md:text-base">
                {t.servicePage.ctaHint}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <a
                href={mailto}
                className="group inline-flex items-center gap-2 bg-mist px-7 py-4 text-sm tracking-[0.1em] text-void transition-colors hover:bg-cyan"
              >
                {t.servicePage.ctaLabel}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
          </div>
        </section>

        <section className="relative bg-ink py-16 md:py-24" aria-labelledby="related-heading">
          <div className="mx-auto max-w-[1440px] safe-px md:px-8 lg:px-10">
            <Reveal>
              <p className="text-eyebrow text-gold">{t.servicePage.relatedLabel}</p>
              <h2 id="related-heading" className="sr-only">
                {t.servicePage.relatedLabel}
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => {
                const relatedCopy = t.services.items.find((s) => s.id === item.id);
                if (!relatedCopy) return null;
                return (
                  <Reveal key={item.id} delay={0.04 * index}>
                    <Link
                      href={servicePath(item.slug)}
                      className="group flex items-end justify-between gap-4 border border-line px-5 py-6 transition-colors hover:border-cyan/40 hover:bg-mist/[0.03]"
                    >
                      <span>
                        <span className="text-eyebrow text-gold">{relatedCopy.number}</span>
                        <span className="mt-3 block text-lg font-medium tracking-tight text-mist">
                          {relatedCopy.title}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-cyan transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
