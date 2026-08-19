"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { JourneyScene } from "@/data/journey";
import {
  holdOpacity,
  highwayOpacity,
  journeyAssets,
  sceneDrive,
} from "@/data/journey";

type JourneyViewportProps = {
  scenes: JourneyScene[];
  progress: number;
  activeIndex: number;
  alts?: Record<string, string>;
};

export function JourneyViewport({
  scenes,
  progress,
  activeIndex,
  alts,
}: JourneyViewportProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const swayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(progress);
  const activeRef = useRef(true);
  progressRef.current = progress;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    io.observe(root);

    let frame = 0;
    let raf = 0;
    const el = swayRef.current;

    const tick = () => {
      if (el && activeRef.current && document.visibilityState === "visible") {
        frame += 1;
        const x = Math.sin(frame / 38) * 1.4;
        const y = Math.cos(frame / 29) * 0.7;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const scene = scenes[activeIndex];
  const hw = highwayOpacity(progress);

  const grade =
    scene?.atmosphere === "warm"
      ? "sepia(0.22) saturate(1.14) brightness(1.04)"
      : scene?.atmosphere === "coastal"
        ? "saturate(1.18) brightness(1.06)"
        : scene?.atmosphere === "cool"
          ? "saturate(1.02) contrast(1.06)"
          : "saturate(1.05) contrast(1.03)";

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-void">
      <div
        ref={swayRef}
        className="absolute inset-[-10%] will-change-transform"
        style={{ filter: grade }}
      >
        {scenes.map((item) => {
          const opacity = holdOpacity(progress, item.hold);
          const drive = sceneDrive(progress, item.hold);
          const scale = 1.08 + drive * 0.16;
          const shift = drive * -2.4;

          return (
            <div
              key={item.id}
              className="absolute inset-0"
              style={{
                opacity,
                zIndex: Math.round(opacity * 10),
                transform: `translate3d(0, ${shift}%, 0) scale(${scale})`,
                transformOrigin: "50% 62%",
              }}
            >
              <Image
                src={item.media.image}
                alt={alts?.[item.id] ?? ""}
                fill
                priority={item.id === "istanbul"}
                sizes="100vw"
                className="object-cover object-[center_45%]"
              />
            </div>
          );
        })}

        <div
          className="absolute inset-0"
          style={{
            opacity: hw,
            zIndex: 20,
            transform: `scale(${1.12 + hw * 0.1})`,
            transformOrigin: "50% 70%",
            filter: `blur(${hw * 1.2}px)`,
          }}
        >
          <Image
            src={journeyAssets.highway}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-void/20" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "repeating-linear-gradient(90deg, transparent 0 46%, rgba(245,247,248,0.08) 50%, transparent 54%)",
              backgroundSize: "120% 100%",
              transform: `translateX(${(progress * 180) % 40}%)`,
            }}
          />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-500"
        style={{
          opacity: scene?.id === "cappadocia" ? 0.14 : 0,
          background:
            "radial-gradient(ellipse at 55% 30%, rgba(244,181,27,0.38), transparent 55%)",
        }}
      />
    </div>
  );
}
