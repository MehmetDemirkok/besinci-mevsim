"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { BrandWordmark } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { siteConfig } from "@/lib/site";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navItems = siteConfig.nav.map((item) => ({
    href: item.href,
    label: t.nav[item.key],
  }));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-void/75 py-3 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between safe-px md:px-8 lg:px-10">
          <a
            href="#top"
            className="relative z-50 transition-opacity hover:opacity-90"
            aria-label={t.nav.home}
          >
            <BrandWordmark compact={scrolled} />
          </a>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex"
            aria-label={t.nav.primary}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.8rem] tracking-[0.14em] text-mist-muted transition-colors hover:text-mist"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher className="hidden sm:inline-flex" />
            <a
              href="#contact"
              className="group hidden items-center gap-2 text-[0.8rem] tracking-[0.12em] text-mist transition-colors hover:text-cyan md:inline-flex"
            >
              {t.nav.contactCta}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-mist lg:hidden"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 bg-void lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex h-full flex-col justify-between safe-px pb-10 pt-28 safe-pb">
              <nav className="flex flex-col gap-2" aria-label={t.nav.mobile}>
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-line py-4 text-3xl font-medium tracking-tight text-mist sm:py-5 sm:text-4xl"
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.45 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <div className="flex items-center justify-between gap-4">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 text-lg text-cyan"
                >
                  {t.nav.contactCta}
                  <ArrowUpRight className="h-5 w-5" />
                </a>
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
