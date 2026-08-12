"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Manifesto() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const quoteOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.25],
    [0.45, 1],
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-void px-5 py-16 md:px-8 md:py-24 lg:px-10"
      aria-labelledby="manifesto-heading"
    >
      <div className="mx-auto max-w-[1100px]">
        <motion.p
          style={{ opacity: reduce ? 1 : quoteOpacity }}
          className="max-w-4xl text-display-sm text-mist/90"
        >
          &ldquo;{t.manifesto.quote}&rdquo;
        </motion.p>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {t.manifesto.words.map((word, index) => (
            <Reveal key={word} delay={0.05 * index} y={16}>
              <li className="border-t border-line pt-4">
                <span className="text-xl font-medium tracking-tight text-mist md:text-2xl">
                  {word}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 md:mt-16" delay={0.08}>
          <h2 id="manifesto-heading" className="text-display-sm text-mist">
            {t.manifesto.titleLine1}
            <br />
            {t.manifesto.titleLine2}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist-muted md:text-lg">
            {t.manifesto.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
