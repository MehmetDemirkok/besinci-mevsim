"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  activeSceneIndex,
  holdOpacity,
  journeyScenes,
  journeyScrollVh,
  journeyScrollVhMobile,
} from "@/data/journey";
import { useLanguage } from "@/i18n/LanguageProvider";
import { WindshieldFrame } from "@/components/cinematic/WindshieldFrame";
import { JourneyViewport } from "@/components/cinematic/JourneyViewport";
import { CityTitle } from "@/components/cinematic/CityTitle";
import { BrandReveal } from "@/components/cinematic/BrandReveal";

gsap.registerPlugin(ScrollTrigger);

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

export function CinematicJourney() {
  const reduce = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  if (reduce) return <JourneyReduced />;
  return <JourneyPinned isMobile={isMobile} />;
}

function JourneyReduced() {
  const { t } = useLanguage();

  return (
    <section
      id="journey"
      className="bg-ink"
      aria-labelledby="journey-heading"
    >
      <h2 id="journey-heading" className="sr-only">
        {t.journey.reducedTitle}
      </h2>
      <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-8 md:py-24 lg:px-10">
        <p className="text-eyebrow text-cyan">{t.journey.reducedTitle}</p>
        <p className="mt-5 max-w-2xl text-lg text-mist-muted">
          {t.journey.reducedBody}
        </p>
      </div>
      <ol>
        {journeyScenes.map((scene, index) => {
          const copy =
            t.journey.scenes.find((s) => s.id === scene.id) ?? t.journey.scenes[0];
          return (
            <li key={scene.id} className="relative min-h-[70svh] overflow-hidden">
              <Image
                src={scene.media.image}
                alt={copy.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,20,0.35)_0%,rgba(7,16,20,0.72)_100%)]" />
              <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-[1100px] items-end px-5 py-16 md:px-8">
                <div>
                  <p className="text-eyebrow text-gold">
                    {t.journey.chapterLabel} {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-4xl font-medium tracking-tight text-mist md:text-6xl">
                    {copy.title}
                  </h3>
                  <p className="mt-3 text-mist-muted">{copy.subtitle}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="border-t border-line py-16 text-center">
        <p className="text-2xl font-medium tracking-[0.06em] text-mist md:text-3xl">
          {t.journey.revealLine}
        </p>
        <p className="mt-6 text-eyebrow text-cyan">{t.journey.revealBrand}</p>
      </div>
    </section>
  );
}

function JourneyPinned({ isMobile }: { isMobile: boolean }) {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);

  const activeIndex = useMemo(() => activeSceneIndex(progress), [progress]);
  const revealProgress = Math.max(0, (progress - 0.82) / 0.18);
  const pullOut = Math.max(0, (progress - 0.8) / 0.2);

  // Tall track + sticky viewport (no GSAP pin — reliable with Lenis)
  const trackVh = isMobile ? journeyScrollVhMobile : journeyScrollVh;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.45,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const next = self.progress;
          // Skip tiny deltas to keep React renders from fighting Lenis
          if (Math.abs(next - progressRef.current) < 0.0015) return;
          progressRef.current = next;
          setProgress(next);
        },
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    const t1 = window.setTimeout(refresh, 80);
    const t2 = window.setTimeout(refresh, 500);
    const t3 = window.setTimeout(refresh, 1200);
    window.addEventListener("load", refresh);

    // Images loading can shift layout above the journey
    const images = Array.from(document.images);
    images.forEach((img) => {
      if (!img.complete) img.addEventListener("load", refresh, { once: true });
    });

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [trackVh]);

  const copyFor = (id: string) =>
    t.journey.scenes.find((s) => s.id === id) ?? t.journey.scenes[0];

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative z-10 scroll-mt-24 bg-void"
      style={{ height: `${trackVh}vh` }}
      aria-labelledby="journey-heading"
    >
      <h2 id="journey-heading" className="sr-only">
        {t.journey.reducedTitle}
      </h2>
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <JourneyViewport
          scenes={journeyScenes}
          progress={progress}
          activeIndex={activeIndex}
          alts={Object.fromEntries(
            t.journey.scenes.map((scene) => [scene.id, scene.title]),
          )}
        />

        <WindshieldFrame compact={isMobile} pullOut={pullOut} />

        {journeyScenes.map((scene, index) => {
          const copy = copyFor(scene.id);
          const visibility = holdOpacity(progress, scene.hold);
          const visible = visibility > 0.35 && revealProgress < 0.15;

          return (
            <CityTitle
              key={scene.id}
              title={copy.title}
              subtitle={copy.subtitle}
              chapterLabel={t.journey.chapterLabel}
              chapterIndex={index}
              visible={visible}
            />
          );
        })}

        <BrandReveal
          line={t.journey.revealLine}
          brand={t.journey.revealBrand}
          progress={revealProgress}
        />

        <a
          href="#fleet"
          className="absolute right-4 top-[max(5.5rem,env(safe-area-inset-top))] z-40 rounded-full border border-white/15 bg-void/55 px-3 py-2 text-[0.65rem] tracking-[0.14em] text-mist backdrop-blur-sm transition-colors hover:border-cyan/40 hover:text-cyan sm:right-6 sm:top-28"
        >
          {t.journey.skip}
        </a>

        <div className="absolute bottom-[9%] left-1/2 z-30 w-[min(480px,88vw)] -translate-x-1/2">
          <div className="h-px w-full bg-mist/15">
            <div
              className="h-px bg-cyan"
              style={{ width: `${Math.min(100, progress * 100)}%` }}
            />
          </div>
          <div className="mt-3 hidden justify-between text-[0.65rem] tracking-[0.18em] text-mist-muted md:flex">
            {t.journey.scenes.map((s, i) => {
              const active = activeIndex === i && revealProgress < 0.2;
              return (
                <span
                  key={s.id}
                  className={active ? "text-cyan" : undefined}
                >
                  {s.title}
                </span>
              );
            })}
          </div>
          <div className="mt-3 flex justify-center gap-1.5 md:hidden" aria-hidden>
            {t.journey.scenes.map((s, i) => (
              <span
                key={s.id}
                className={`h-1.5 w-1.5 rounded-full ${
                  activeIndex === i && revealProgress < 0.2
                    ? "bg-cyan"
                    : "bg-mist/25"
                }`}
              />
            ))}
          </div>
        </div>

        <p
          className={`absolute bottom-5 left-1/2 z-30 w-[90%] -translate-x-1/2 text-center text-[0.65rem] tracking-[0.16em] text-mist-muted transition-opacity duration-500 safe-pb sm:bottom-6 sm:text-[0.7rem] sm:tracking-[0.22em] ${
            progress < 0.03 ? "opacity-80" : "opacity-0"
          }`}
        >
          {t.journey.scrollHint}
        </p>
      </div>
    </section>
  );
}
