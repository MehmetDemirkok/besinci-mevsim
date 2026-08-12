"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { JourneyScene } from "@/data/journey";
import {
  holdOpacity,
  highwayOpacity,
  journeyAssets,
} from "@/data/journey";

type JourneyViewportProps = {
  scenes: JourneyScene[];
  progress: number;
  activeIndex: number;
  isMobile: boolean;
};

export function JourneyViewport({
  scenes,
  progress,
  activeIndex,
  isMobile,
}: JourneyViewportProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    let frame = 0;
    let raf = 0;
    const el = layerRef.current;
    if (!el) return;

    const tick = () => {
      frame += 1;
      const p = progressRef.current;
      // Soft forward zoom through the whole journey + micro driving sway
      const driveZoom = 1.06 + p * 0.06;
      const x = Math.sin(frame / 42) * 0.9;
      const y = Math.cos(frame / 33) * 0.55;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${driveZoom})`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const scene = scenes[activeIndex];
  const warmth = scene?.warmth ?? 0.2;
  const atmosphere = scene?.atmosphere ?? "neutral";
  const hw = highwayOpacity(progress);

  const grade =
    atmosphere === "warm"
      ? `sepia(${0.18 + warmth * 0.15}) saturate(1.12) brightness(1.04)`
      : atmosphere === "coastal"
        ? `saturate(1.15) brightness(1.06)`
        : atmosphere === "cool"
          ? `saturate(0.98) contrast(1.04)`
          : `saturate(1.02)`;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-void">
      <div
        ref={layerRef}
        className="absolute inset-[-8%] will-change-transform"
        style={{ filter: grade }}
      >
        {scenes.map((item, index) => {
          const opacity = holdOpacity(progress, item.hold);
          const media = isMobile
            ? item.media.videoMobile || item.media.video
            : item.media.video;
          const showVideo = Boolean(media);

          return (
            <div
              key={item.id}
              className="absolute inset-0"
              style={{
                opacity,
                zIndex: Math.round(opacity * 10),
              }}
            >
              {showVideo ? (
                <video
                  className="h-full w-full object-cover"
                  src={media}
                  poster={item.media.poster}
                  muted
                  playsInline
                  loop
                  autoPlay
                  preload={Math.abs(index - activeIndex) <= 1 ? "metadata" : "none"}
                />
              ) : (
                <Image
                  src={item.media.image}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              )}
            </div>
          );
        })}

        <div
          className="absolute inset-0"
          style={{ opacity: hw, zIndex: 20 }}
        >
          <Image
            src={journeyAssets.highway}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-void/25" />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-500"
        style={{
          opacity: scene?.id === "cappadocia" ? 0.16 : 0,
          background:
            "radial-gradient(ellipse at 55% 30%, rgba(244,181,27,0.4), transparent 55%)",
        }}
      />
    </div>
  );
}
