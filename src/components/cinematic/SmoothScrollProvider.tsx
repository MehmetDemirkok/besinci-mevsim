"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HEADER_OFFSET = -88;
const SCROLL_DURATION = 1.45;
const ease = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

/**
 * Lenis smooth scroll synced with GSAP ScrollTrigger.
 * Hash links (header / footer / CTAs) ease down to the section.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    document.documentElement.classList.add("lenis", "lenis-smooth");
    document.documentElement.style.scrollBehavior = "auto";

    const lenis = new Lenis({
      duration: 1.15,
      easing: ease,
      smoothWheel: true,
      touchMultiplier: 1.35,
      syncTouch: false,
      autoRaf: false,
    });
    lenisRef.current = lenis;

    const scrollToHash = (hash: string, immediate = false) => {
      const id = hash.replace(/^#/, "");
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      lenis.scrollTo(target, {
        offset: HEADER_OFFSET,
        duration: immediate ? 0 : SCROLL_DURATION,
        easing: ease,
      });
    };

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as HTMLElement | null)?.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      let hash = "";
      if (href.startsWith("#")) {
        hash = href;
      } else if (href.startsWith("/#") && window.location.pathname === "/") {
        hash = href.slice(1);
      }

      if (!hash) return;
      const target = document.getElementById(hash.slice(1));
      if (!target) return;

      event.preventDefault();
      history.pushState(null, "", hash);
      scrollToHash(hash);
    };

    document.addEventListener("click", onClick);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    window.addEventListener("load", refresh);

    requestAnimationFrame(refresh);
    const t1 = window.setTimeout(refresh, 120);
    const t2 = window.setTimeout(refresh, 600);
    const t3 = window.setTimeout(() => {
      if (window.location.hash) scrollToHash(window.location.hash);
    }, 180);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      document.removeEventListener("click", onClick);
      window.removeEventListener("resize", refresh);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return <>{children}</>;
}
