"use client";

import { useRef } from "react";
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

export function Fleet() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const vehicles = fleet.map((vehicle) => {
    const copy = t.fleet.vehicles.find((item) => item.id === vehicle.id);
    return {
      ...vehicle,
      category: copy?.category ?? "",
      description: copy?.description ?? "",
      characteristics: copy?.characteristics ?? [],
    };
  });

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

        {/* Tablet + desktop grid */}
        <div className="mt-12 hidden gap-5 sm:grid sm:grid-cols-2 lg:mt-14 lg:gap-6 xl:grid-cols-3">
          {vehicles.map((vehicle, index) => (
            <FleetPanel
              key={vehicle.id}
              vehicle={vehicle}
              index={index}
              reduce={!!reduce}
              size="desktop"
            />
          ))}
        </div>
      </div>

      {/* Phone only: swipe track */}
      <p className="mt-8 safe-px text-[0.65rem] tracking-[0.16em] text-mist-soft sm:hidden">
        {t.fleet.swipeHint}
      </p>
      <div
        className="mt-3 flex snap-x snap-mandatory gap-4 overflow-x-auto safe-px pb-3 sm:hidden"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        data-lenis-prevent
        aria-label={t.fleet.title}
      >
        {vehicles.map((vehicle, index) => (
          <FleetPanel
            key={vehicle.id}
            vehicle={vehicle}
            index={index}
            reduce={!!reduce}
            size="mobile"
          />
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
}) {
  const ref = useRef<HTMLElement>(null);
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
    <article
      ref={ref}
      className={
        size === "desktop"
          ? "relative overflow-hidden"
          : "relative w-[min(86vw,360px)] shrink-0 snap-center overflow-hidden"
      }
    >
      <div className="relative aspect-[16/11] overflow-hidden md:aspect-[5/3]">
        <motion.div style={{ y: imageY }} className="absolute inset-[-8%]">
          <BrandImage
            src={vehicle.image}
            alt={vehicle.name}
            atmosphere="vehicle"
            label={vehicle.name.toUpperCase()}
            className="h-full w-full"
            sizes={size === "desktop" ? "(max-width:1280px) 50vw, 33vw" : "86vw"}
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,20,0.1)_0%,rgba(7,16,20,0.35)_45%,rgba(7,16,20,0.92)_100%)]" />
      </div>

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
          {vehicle.characteristics.slice(0, size === "mobile" ? 3 : undefined).map((item) => (
            <li
              key={item}
              className="text-[0.6rem] tracking-[0.12em] text-mist-soft uppercase sm:text-[0.65rem] sm:tracking-[0.14em]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
