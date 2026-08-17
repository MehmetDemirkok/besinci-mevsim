"use client";

import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { fleet } from "@/data/fleet";
import { BrandImage } from "@/components/ui/BrandImage";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { setContactIntent } from "@/lib/contact-intent";
import { resolveNavHref } from "@/lib/nav";
import { usePathname } from "next/navigation";

export function Fleet() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const contactHref = resolveNavHref("#contact", pathname);
  const [activeIndex, setActiveIndex] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);

  const vehicles = fleet.map((vehicle) => {
    const copy = t.fleet.vehicles.find((item) => item.id === vehicle.id);
    return {
      ...vehicle,
      category: copy?.category ?? "",
      description: copy?.description ?? "",
      characteristics: copy?.characteristics ?? [],
    };
  });

  const onTrackScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const track = event.currentTarget;
    const card = track.querySelector<HTMLElement>("[data-fleet-card]");
    if (!card) return;
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "16") || 16;
    const index = Math.round(track.scrollLeft / (card.offsetWidth + gap));
    setActiveIndex(Math.max(0, Math.min(vehicles.length - 1, index)));
  };

  const scrollToCard = (index: number) => {
    const track = trackRef.current;
    const card = track?.querySelectorAll<HTMLElement>("[data-fleet-card]")[index];
    if (!track || !card) return;
    const pad = Number.parseFloat(getComputedStyle(track).paddingLeft) || 0;
    track.scrollTo({
      left: Math.max(0, card.offsetLeft - pad),
      behavior: "smooth",
    });
  };

  return (
    <section
      id="fleet"
      className="relative bg-void py-20 md:py-28"
      aria-labelledby="fleet-heading"
    >
      <div className="mx-auto max-w-[1440px] safe-px md:px-8 lg:px-10">
        <Reveal>
          <p className="text-eyebrow text-cyan">{t.fleet.eyebrow}</p>
          <h2 id="fleet-heading" className="mt-5 text-display-sm text-mist">
            {t.fleet.title}
          </h2>
          <p className="mt-5 max-w-xl text-base text-mist-muted md:text-lg">
            {t.fleet.subtitle}
          </p>
        </Reveal>

        <div className="mt-12 hidden gap-5 sm:grid sm:grid-cols-2 lg:mt-14 lg:gap-6 xl:grid-cols-3">
          {vehicles.map((vehicle, index) => (
            <FleetPanel
              key={vehicle.id}
              vehicle={vehicle}
              index={index}
              reduce={!!reduce}
              size="desktop"
              href={contactHref}
              requestLabel={t.fleet.requestCta}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 safe-px sm:hidden">
        <p className="text-[0.7rem] tracking-[0.14em] text-mist-muted">
          {t.fleet.swipeHint}
        </p>
        <p className="text-[0.7rem] tabular-nums tracking-[0.12em] text-mist-muted">
          {activeIndex + 1} / {vehicles.length}
        </p>
      </div>
      <div
        ref={trackRef}
        className="relative mt-3 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-3 safe-px sm:hidden"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch", touchAction: "pan-x" }}
        data-lenis-prevent
        aria-label={t.fleet.title}
        onScroll={onTrackScroll}
      >
        {vehicles.map((vehicle, index) => (
          <FleetPanel
            key={vehicle.id}
            vehicle={vehicle}
            index={index}
            reduce={!!reduce}
            size="mobile"
            href={contactHref}
            requestLabel={t.fleet.requestCta}
          />
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-1.5 sm:hidden">
        {vehicles.map((vehicle, index) => (
          <button
            key={vehicle.id}
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${
              index === activeIndex ? "text-cyan" : "text-mist/25"
            }`}
            aria-label={`${index + 1} / ${vehicles.length}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => scrollToCard(index)}
          >
            <span
              className={`mx-auto block h-1.5 w-1.5 rounded-full ${
                index === activeIndex ? "bg-cyan" : "bg-current"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

function FleetPanel({
  vehicle,
  index,
  reduce,
  size,
  href,
  requestLabel,
}: {
  vehicle: {
    id: string;
    name: string;
    image: string;
    category: string;
    description: string;
    characteristics: string[];
  };
  index: number;
  reduce: boolean;
  size: "desktop" | "mobile";
  href: string;
  requestLabel: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [24, -24],
  );

  return (
    <a
      ref={ref}
      data-fleet-card=""
      href={href}
      onClick={() => setContactIntent("fleet", vehicle.name)}
      className={
        size === "desktop"
          ? "group relative block overflow-hidden rounded-2xl on-media"
          : "group relative w-[min(85vw,340px)] shrink-0 snap-center overflow-hidden rounded-2xl border border-line bg-panel on-media"
      }
      aria-label={`${vehicle.name} — ${requestLabel}`}
    >
      <div className="relative aspect-[16/11] overflow-hidden rounded-2xl md:aspect-[5/3]">
        <motion.div style={{ y: imageY }} className="absolute inset-[-8%]">
          <BrandImage
            src={vehicle.image}
            alt={vehicle.name}
            atmosphere="vehicle"
            className="h-full w-full"
            sizes={size === "desktop" ? "(max-width:1280px) 50vw, 33vw" : "85vw"}
            imageClassName="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,20,0.1)_0%,rgba(7,16,20,0.35)_45%,rgba(7,16,20,0.92)_100%)]" />
        {size === "desktop" ? null : (
          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="text-eyebrow text-gold">
              {String(index + 1).padStart(2, "0")} — {vehicle.category}
            </p>
            <h3 className="mt-1.5 text-xl font-medium tracking-tight text-mist">
              {vehicle.name}
            </h3>
          </div>
        )}
      </div>

      {size === "desktop" ? (
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-7">
        <p className="text-eyebrow text-gold">
          {String(index + 1).padStart(2, "0")} — {vehicle.category}
        </p>
        <h3 className="mt-2 text-xl font-medium tracking-tight text-mist sm:mt-3 sm:text-2xl md:text-3xl">
          {vehicle.name}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-mist-muted sm:mt-3">
          {vehicle.description}
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 sm:mt-4 sm:gap-x-4 sm:gap-y-2">
          {vehicle.characteristics.map((item) => (
            <li
              key={item}
              className="text-[0.6rem] uppercase tracking-[0.12em] text-mist-muted sm:text-[0.65rem] sm:tracking-[0.14em]"
            >
              {item}
            </li>
          ))}
        </ul>
        <span className="mt-4 inline-flex text-[0.7rem] tracking-[0.14em] text-cyan">
          {requestLabel}
        </span>
      </div>
      ) : (
      <div className="bg-void/40 px-4 py-4">
        <p className="line-clamp-3 text-sm leading-relaxed text-mist-muted">
          {vehicle.description}
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
          {vehicle.characteristics.slice(0, 3).map((item) => (
            <li
              key={item}
              className="text-[0.6rem] uppercase tracking-[0.12em] text-mist-muted"
            >
              {item}
            </li>
          ))}
        </ul>
        <span className="mt-3 inline-flex min-h-11 items-center text-[0.7rem] tracking-[0.14em] text-cyan">
          {requestLabel}
        </span>
      </div>
      )}
    </a>
  );
}
