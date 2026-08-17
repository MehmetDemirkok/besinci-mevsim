"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HEADER_OFFSET = -96;
const SCROLL_DURATION = 1.45;
const ease = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

function headerOffset() {
  return window.matchMedia("(max-width: 768px)").matches ? -112 : HEADER_OFFSET;
}

function prefersNativeScroll() {
  return (
    window.matchMedia("(max-width: 768px)").matches ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

function nativeScrollTo(target: HTMLElement, immediate: boolean) {
  const top = Math.max(
    0,
    target.getBoundingClientRect().top + window.scrollY + headerOffset(),
  );
  window.scrollTo({
    top,
    behavior: immediate ? "auto" : "smooth",
  });
}

/**
 * Lenis on desktop only. Phones keep native momentum — Lenis + iOS chrome
 * refresh fights the finger and feels like the page bouncing back.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const native = reduce || prefersNativeScroll();

    const scrollToHash = (hash: string, immediate = false) => {
      const id = hash.replace(/^#/, "");
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      if (native || !lenisRef.current) {
        nativeScrollTo(target, immediate || native);
        return;
      }
      lenisRef.current.scrollTo(target, {
        offset: headerOffset(),
        duration: immediate ? 0 : SCROLL_DURATION,
        easing: ease,
      });
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as HTMLElement | null)?.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      let hash = "";
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname && url.hash) {
          hash = url.hash;
        }
      } catch {
        if (href.startsWith("#")) hash = href;
      }

      if (!hash) return;
      const target = document.getElementById(hash.slice(1));
      if (!target) return;

      event.preventDefault();
      history.pushState(null, "", hash);
      scrollToHash(hash);
    };

    document.addEventListener("click", onClick);

    let lastWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    const tHash = window.setTimeout(() => {
      if (window.location.hash) scrollToHash(window.location.hash, true);
    }, 180);

    if (native) {
      return () => {
        window.clearTimeout(tHash);
        document.removeEventListener("click", onClick);
        window.removeEventListener("resize", onResize);
      };
    }

    document.documentElement.classList.add("lenis", "lenis-smooth");
    document.documentElement.style.scrollBehavior = "auto";

    const lenis = new Lenis({
      duration: 1.15,
      easing: ease,
      smoothWheel: true,
      touchMultiplier: 1,
      syncTouch: false,
      autoRaf: false,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    requestAnimationFrame(refresh);
    const t1 = window.setTimeout(refresh, 120);
    const t2 = window.setTimeout(refresh, 600);

    return () => {
      window.clearTimeout(tHash);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
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
