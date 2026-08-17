"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail, Menu, X } from "lucide-react";
import { BrandWordmark } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { InstagramLink } from "@/components/ui/InstagramLink";
import { siteConfig } from "@/lib/site";
import { homeHref, resolveNavHref } from "@/lib/nav";
import { useLanguage } from "@/i18n/LanguageProvider";

const SECTION_BY_KEY: Record<string, string> = {
  about: "about",
  services: "services",
  fleet: "fleet",
  travel: "journey",
  contact: "contact",
};

export function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const onSubpage = pathname !== "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const condensed = scrolled || onSubpage || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const ids = Object.values(SECTION_BY_KEY);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.2, 0.45, 0.7] },
    );

    ids.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [pathname]);

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
      const panelFocusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const extra = menuButtonRef.current ? [menuButtonRef.current] : [];
      const focusable = [...extra, ...Array.from(panelFocusable)];
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
    const href =
      item.key === "services"
        ? pathname === "/"
          ? "#services"
          : "/hizmetler"
        : resolveNavHref(item.href, pathname);
    const sectionId = SECTION_BY_KEY[item.key];
    const active =
      item.key === "services"
        ? pathname.startsWith("/hizmetler") || activeSection === "services"
        : activeSection === sectionId;
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
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding,backdrop-filter] duration-500 ${
          condensed
            ? "border-b border-line bg-void/80 py-2.5 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent py-4"
        }`}
      >
        {!condensed ? (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-void/70 via-void/25 to-transparent"
            aria-hidden
          />
        ) : null}

        <div className="relative mx-auto flex max-w-[1440px] items-center justify-between safe-px md:px-8 lg:px-12">
          <a
            href={homeHref(pathname)}
            className="relative z-50 min-w-0 transition-opacity hover:opacity-90"
            aria-label={t.nav.home}
          >
            <BrandWordmark compact={condensed} />
          </a>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex"
            aria-label={t.nav.primary}
          >
            {navItems.map((item) => (
              <NavItem
                key={item.href + item.label}
                href={item.href}
                label={item.label}
                active={item.active}
              />
            ))}
          </nav>

          <div className="relative z-50 flex items-center gap-2">
            <div className="hidden h-11 items-center rounded-full border border-white/12 bg-white/[0.04] pl-0.5 pr-1 backdrop-blur-sm sm:flex">
              <InstagramLink
                variant="ghost"
                className="hidden lg:inline-flex"
              />
              <span
                className="mx-0.5 hidden h-4 w-px bg-white/15 lg:block"
                aria-hidden
              />
              <LanguageSwitcher variant="inline" className="px-2" />
            </div>

            <a
              href={resolveNavHref("#contact", pathname)}
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-mist px-3 text-[0.68rem] tracking-[0.1em] text-void transition-colors hover:bg-cyan sm:px-4 sm:text-[0.72rem] sm:tracking-[0.12em]"
              aria-label={t.nav.contactCta}
            >
              <Mail className="h-4 w-4 min-[400px]:hidden" aria-hidden />
              <span className="hidden min-[400px]:inline sm:hidden">{t.nav.contact}</span>
              <span className="hidden sm:inline">{t.nav.contactCta}</span>
              <ArrowUpRight className="hidden h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:block" />
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-mist backdrop-blur-sm transition-colors hover:border-cyan/40 hover:text-cyan lg:hidden"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={open}
              aria-controls={titleId}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan/35 to-transparent transition-opacity duration-500 ${
            condensed ? "opacity-40" : "opacity-70"
          }`}
          aria-hidden
        />
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            id={titleId}
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.mobile}
            className="fixed inset-0 z-40 overscroll-contain bg-void lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(24,187,208,0.12),transparent_42%)]" />
            <div className="relative flex h-full flex-col justify-between overflow-y-auto overscroll-contain safe-px pb-10 pt-28 safe-pb">
              <nav className="flex flex-col" aria-label={t.nav.mobile}>
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href + item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between border-b border-line py-4 text-3xl font-medium tracking-tight text-mist sm:py-5 sm:text-4xl"
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.45 }}
                  >
                    {item.label}
                    <span
                      className="h-px w-8 bg-gradient-to-r from-cyan/0 to-cyan/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden
                    />
                  </motion.a>
                ))}
              </nav>

              <div className="flex items-center justify-between gap-4 pt-8">
                <a
                  href={resolveNavHref("#contact", pathname)}
                  onClick={() => setOpen(false)}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-mist px-5 text-sm tracking-[0.1em] text-void transition-colors hover:bg-cyan"
                >
                  {t.nav.contactCta}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <div className="flex items-center gap-2">
                  <InstagramLink
                    variant="ghost"
                    className="border border-white/12"
                    onClick={() => setOpen(false)}
                  />
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function NavItem({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  const className = `group relative px-3 py-2 text-[0.72rem] tracking-[0.16em] transition-colors ${
    active ? "text-mist" : "text-mist-muted hover:text-mist"
  }`;

  const body = (
    <>
      {label}
      <span
        className={`absolute bottom-0.5 left-1/2 h-px w-4 -translate-x-1/2 bg-gradient-to-r from-cyan to-gold transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
        aria-hidden
      />
    </>
  );

  if (href.startsWith("#") || href.startsWith("/#")) {
    return (
      <a
        href={href}
        className={className}
        aria-current={active ? "location" : undefined}
      >
        {body}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      aria-current={active ? "page" : undefined}
    >
      {body}
    </Link>
  );
}
