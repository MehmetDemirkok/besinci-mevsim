"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { BrandImage } from "@/components/ui/BrandImage";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const cabinScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden on-media"
    >
      <motion.div style={{ scale: cabinScale }} className="absolute inset-0">
        <CabinBackground reduce={!!reduce} alt={t.hero.imageAlt} />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-[1440px] safe-px pb-14 pt-32 md:px-8 md:pb-20 md:pt-36 lg:px-10"
      >
        <motion.p
          className="text-eyebrow text-cyan"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {t.hero.eyebrow}
        </motion.p>

        <motion.h1
          className="mt-5 max-w-5xl text-display text-mist"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.hero.titleLine1}
          <br />
          <span className="text-mist">{t.hero.titleLine2}</span>
        </motion.h1>

        <motion.p
          className="mt-3 text-sm tracking-[0.14em] text-mist-muted md:text-[0.8rem] md:tracking-[0.18em]"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28 }}
        >
          {t.hero.offer}
        </motion.p>

        <motion.p
          className="mt-6 max-w-xl text-base leading-relaxed text-mist-muted md:mt-7 md:text-lg"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
        >
          {t.hero.body}
        </motion.p>

        <motion.div
          className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 border border-mist/20 bg-mist px-7 py-3.5 text-sm tracking-[0.08em] text-void transition-colors hover:border-cyan hover:bg-cyan"
          >
            {t.hero.ctaContact}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#fleet"
            className="group inline-flex items-center justify-center gap-2 px-2 py-3.5 text-sm tracking-[0.08em] text-mist-muted transition-colors hover:text-mist"
          >
            {t.hero.ctaFleet}
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </motion.div>

        <motion.div
          className="mt-10 hidden items-center gap-x-3 text-[0.62rem] tracking-[0.2em] text-mist-muted md:mt-14 md:flex"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          aria-hidden
        >
          {t.hero.chips.map((chip, index) => (
            <span key={chip} className="inline-flex items-center gap-3">
              {index > 0 ? <span className="h-px w-4 bg-cyan/40" /> : null}
              <span>{chip}</span>
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        aria-hidden
      >
        <motion.div
          className="flex h-12 w-7 items-start justify-center rounded-full border border-mist/25 p-1.5"
          animate={reduce ? undefined : { y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          <span className="h-2 w-1 rounded-full bg-cyan" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function CabinBackground({
  reduce,
  alt,
}: {
  reduce: boolean;
  alt: string;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-void">
      <motion.div
        className="absolute inset-[-10%] will-change-transform"
        animate={
          reduce
            ? undefined
            : {
                x: [0, 5, -3, 0],
                y: [0, -4, 2, 0],
              }
        }
        transition={
          reduce
            ? undefined
            : { duration: 22, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <BrandImage
          src="/travel/ankara/cabin.jpg"
          alt={alt}
          atmosphere="city"
          priority
          className="h-full w-full"
          sizes="100vw"
          imageClassName="object-cover object-[center_40%]"
        />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 opacity-25 mix-blend-screen"
        aria-hidden
        style={{
          background:
            "linear-gradient(118deg, transparent 8%, rgba(244,181,27,0.12) 28%, transparent 42%, transparent 70%, rgba(24,187,208,0.06) 88%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_58%_36%,transparent_42%,rgba(7,16,20,0.58)_100%)]"
        aria-hidden
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,16,20,0.72)_0%,rgba(7,16,20,0.38)_34%,rgba(7,16,20,0.12)_58%,rgba(7,16,20,0.48)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,20,0.5)_0%,rgba(7,16,20,0.08)_24%,rgba(7,16,20,0.2)_52%,rgba(7,16,20,0.9)_100%)]" />
    </div>
  );
}
