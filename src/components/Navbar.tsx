"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { BrandWordmark } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { siteConfig } from "@/lib/site";
import { homeHref, resolveNavHref } from "@/lib/nav";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const onSubpage = pathname !== "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

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

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const navItems = siteConfig.nav.map((item) => {
    const href = resolveNavHref(item.href, pathname);
    const active =
      item.key === "services"
        ? pathname.startsWith("/hizmetler")
        : false;
    return {
      href,
      label: t.nav[item.key],
      active,
    };
  });

  return (
    <>
      <a href="#main" className="skip-link">
        {t.nav.skipToContent}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || onSubpage
            ? "border-b border-line bg-void/75 py-3 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between safe-px md:px-8 lg:px-10">
          <a
            href={homeHref(pathname)}
            className="relative z-50 transition-opacity hover:opacity-90"
            aria-label={t.nav.home}
          >
            <BrandWordmark compact={scrolled || onSubpage} />
          </a>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex"
            aria-label={t.nav.primary}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-[0.8rem] tracking-[0.14em] transition-colors hover:text-mist ${
                  item.active ? "text-mist" : "text-mist-muted"
                }`}
                aria-current={item.active ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher className="hidden sm:inline-flex" />
            <a
              href={resolveNavHref("#contact", pathname)}
              className="group hidden items-center gap-2 text-[0.8rem] tracking-[0.12em] text-mist transition-colors hover:text-cyan md:inline-flex"
            >
              {t.nav.contactCta}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-mist lg:hidden"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={open}
              aria-controls={titleId}
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
            ref={panelRef}
            id={titleId}
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.mobile}
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
                  href={resolveNavHref("#contact", pathname)}
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
