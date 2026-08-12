"use client";

import { useMemo, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { BrandImage } from "@/components/ui/BrandImage";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * Scroll story stages:
 * Vehicle → Road → Destination → Hotel
 * Assets live in /public/images/journey/
 */
const stageAssets = [
  { src: "/images/journey/vehicle.png", atmosphere: "vehicle" as const },
  { src: "/images/journey/road.png", atmosphere: "road" as const },
  { src: "/images/journey/destination.png", atmosphere: "city" as const },
  { src: "/images/journey/hotel.png", atmosphere: "hotel" as const },
];

export function VisualTransition() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const stages = useMemo(
    () =>
      stageAssets.map((asset, index) => ({
        ...asset,
        label: t.transition.stages[index] ?? "",
      })),
    [t.transition.stages],
  );

  const headlineOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.28, 0.4],
    [0, 1, 1, 0],
  );
  const headlineY = useTransform(
    scrollYProgress,
    [0, 0.2],
    reduce ? [0, 0] : [40, 0],
  );

  return (
    <section
      ref={ref}
      className="relative h-[280svh] bg-void"
      aria-label={t.transition.aria}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div
          style={{ opacity: headlineOpacity, y: headlineY }}
          className="absolute inset-0 z-20 flex items-center justify-center px-5"
        >
          <h2 className="text-center text-display text-mist">
            {t.transition.titleLine1}
            <br />
            {t.transition.titleLine2}
          </h2>
        </motion.div>

        {stages.map((stage, index) => {
          const start = 0.18 + index * 0.18;
          const mid = start + 0.08;
          const end = start + 0.2;
          return (
            <StageLayer
              key={`${stage.label}-${index}`}
              stage={stage}
              progress={scrollYProgress}
              start={start}
              mid={mid}
              end={end}
              reduce={!!reduce}
            />
          );
        })}

        <div className="absolute inset-x-0 bottom-10 z-30 mx-auto flex max-w-3xl justify-between px-8">
          {stages.map((stage, index) => {
            const activeStart = 0.18 + index * 0.18;
            return (
              <StageLabel
                key={`${stage.label}-label-${index}`}
                label={stage.label}
                progress={scrollYProgress}
                activeStart={activeStart}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StageLayer({
  stage,
  progress,
  start,
  mid,
  end,
  reduce,
}: {
  stage: {
    label: string;
    src: string;
    atmosphere: "vehicle" | "road" | "city" | "hotel";
  };
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  mid: number;
  end: number;
  reduce: boolean;
}) {
  const opacity = useTransform(progress, [start, mid, end], [0, 1, 0]);
  const scale = useTransform(
    progress,
    [start, mid, end],
    reduce ? [1, 1, 1] : [1.08, 1, 1.04],
  );

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div style={{ scale }} className="h-full w-full">
        <BrandImage
          src={stage.src}
          alt={stage.label}
          atmosphere={stage.atmosphere}
          label={stage.label.toUpperCase()}
          className="h-full w-full"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-void/45" />
      </motion.div>
    </motion.div>
  );
}

function StageLabel({
  label,
  progress,
  activeStart,
}: {
  label: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  activeStart: number;
}) {
  const color = useTransform(
    progress,
    [activeStart - 0.05, activeStart, activeStart + 0.15],
    ["rgba(245,247,248,0.28)", "#18BBD0", "rgba(245,247,248,0.28)"],
  );

  return (
    <motion.span
      style={{ color }}
      className="text-[0.65rem] tracking-[0.24em] uppercase"
    >
      {label}
    </motion.span>
  );
}
