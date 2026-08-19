"use client";

import {
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Mail, Menu, X } from "lucide-react";
import { BrandWordmark } from "@/components/ui/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { InstagramLink } from "@/components/ui/InstagramLink";
import { services, servicePath } from "@/data/services";
import { siteConfig } from "@/lib/site";
import { homeHref, menuHref, resolveNavHref, visionPath } from "@/lib/nav";
import { useLanguage } from "@/i18n/LanguageProvider";

const SECTION_BY_KEY: Record<string, string> = {
  about: "about",
  services: "services",
  fleet: "fleet",
  travel: "journey",
};

export function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const onSubpage = pathname !== "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<"services" | "about" | null>(
    null,
  );
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const condensed = scrolled || onSubpage || open;
  const [mounted, setMounted] = useState(false);

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
    setMounted(true);
  }, []);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const sync = () => {
      document.documentElement.style.setProperty(
        "--vv-top",
        `${vv.offsetTop}px`,
      );
      document.documentElement.style.setProperty(
        "--vv-height",
        `${vv.height}px`,
      );
    };

    sync();
    vv.addEventListener("resize", sync);
    vv.addEventListener("scroll", sync);
    window.addEventListener("orientationchange", sync);
    return () => {
      vv.removeEventListener("resize", sync);
      vv.removeEventListener("scroll", sync);
      window.removeEventListener("orientationchange", sync);
      document.documentElement.style.removeProperty("--vv-top");
      document.documentElement.style.removeProperty("--vv-height");
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const { body, documentElement } = document;
    const prev = {
      bodyOverflow: body.style.overflow,
      bodyTouch: body.style.touchAction,
      htmlOverflow: documentElement.style.overflow,
    };

    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";
    body.style.touchAction = "none";
    body.dataset.nav = "open";

    return () => {
      body.style.overflow = prev.bodyOverflow;
      body.style.touchAction = prev.bodyTouch;
      documentElement.style.overflow = prev.htmlOverflow;
      delete body.dataset.nav;
    };
  }, [open]);

  useEffect(() => {
    if (!open) setMobileOpen(null);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
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
    const href = menuHref(item, pathname, "nav");
    const sectionId = SECTION_BY_KEY[item.key];
    const active =
      item.key === "about"
        ? pathname.startsWith(visionPath) || activeSection === "about"
        : item.key === "services"
          ? pathname.startsWith("/hizmetler") || activeSection === "services"
          : activeSection === sectionId;
    return {
      key: item.key,
      href,
      label: t.nav[item.key],
      active,
    };
  });

  const serviceLinks = services.map((service) => {
    const copy = t.services.items.find((item) => item.id === service.id);
    const href = servicePath(service.slug);
    return {
      href,
      title: copy?.title ?? service.slug,
      number: copy?.number ?? "",
      active: pathname === href,
    };
  });

  const aboutLinks: {
    href: string;
    title: string;
    active: boolean;
    number?: string;
  }[] = [
    {
      href: menuHref({ key: "about", href: "#about" }, pathname, "nav"),
      title: t.nav.aboutStory,
      active: pathname === "/" && activeSection === "about",
    },
    {
      href: visionPath,
      title: t.about.visionCta,
      active: pathname.startsWith(visionPath),
    },
  ];

  const closeDrawer = () => setOpen(false);

  const ui = (
    <>
      <header
        className={`pointer-events-auto fixed inset-x-0 z-[100] isolate safe-pt transition-[background-color,border-color,padding,backdrop-filter,box-shadow] duration-500 ${
          condensed
            ? "header-solid border-b border-line bg-void/80 py-2.5 backdrop-blur-xl"
            : "on-media border-b border-transparent bg-transparent py-3 sm:py-4"
        }`}
        style={{ top: "var(--vv-top, 0px)" }}
      >
        {!condensed ? (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-void/70 via-void/25 to-transparent"
            aria-hidden
          />
        ) : null}

        <div className="relative mx-auto flex max-w-[1440px] items-center justify-between gap-2 safe-px md:px-8 lg:px-12">
          <a
            href={homeHref(pathname)}
            className="relative z-0 min-w-0 max-w-[calc(100%-7.5rem)] shrink overflow-hidden transition-opacity hover:opacity-90"
            aria-label={t.nav.home}
          >
            <BrandWordmark compact={condensed} />
          </a>

          <nav
            className="absolute left-1/2 z-50 hidden -translate-x-1/2 items-center gap-1 lg:flex"
            aria-label={t.nav.primary}
          >
            {navItems.map((item) => {
              if (item.key === "services") {
                return (
                  <FlyoutNavItem
                    key={item.key}
                    href={item.href}
                    label={item.label}
                    active={item.active}
                    align="start"
                    onNavigate={closeDrawer}
                  >
                    <div className="flex flex-col gap-0.5">
                      {serviceLinks.map((link) => (
                        <FlyoutLink
                          key={link.href}
                          href={link.href}
                          active={link.active}
                          onNavigate={closeDrawer}
                        >
                          <span className="w-7 shrink-0 text-[0.62rem] tracking-[0.14em] text-mist-muted">
                            {link.number}
                          </span>
                          <span>{link.title}</span>
                        </FlyoutLink>
                      ))}
                      <FlyoutLink
                        href="/hizmetler"
                        active={pathname === "/hizmetler"}
                        onNavigate={closeDrawer}
                        className="mt-1 border-t border-glass-border pt-1"
                      >
                        <span className="flex-1">{t.servicePage.allServices}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-mist-muted" />
                      </FlyoutLink>
                    </div>
                  </FlyoutNavItem>
                );
              }

              if (item.key === "about") {
                return (
                  <FlyoutNavItem
                    key={item.key}
                    href={item.href}
                    label={item.label}
                    active={item.active}
                    align="center"
                    onNavigate={closeDrawer}
                  >
                    <div className="flex flex-col gap-0.5">
                      {aboutLinks.map((link) => (
                        <FlyoutLink
                          key={link.href}
                          href={link.href}
                          active={link.active}
                          onNavigate={closeDrawer}
                        >
                          {link.title}
                        </FlyoutLink>
                      ))}
                    </div>
                  </FlyoutNavItem>
                );
              }

              return (
                <NavItem
                  key={item.key}
                  href={item.href}
                  label={item.label}
                  active={item.active}
                />
              );
            })}
          </nav>

          <div className="relative z-10 flex shrink-0 items-center gap-1.5 sm:gap-2">
            <div className="hidden h-11 items-center rounded-full border border-glass-border bg-glass pl-0.5 pr-1 backdrop-blur-sm sm:flex">
              <InstagramLink
                variant="ghost"
                className="hidden lg:inline-flex"
              />
              <span
                className="mx-0.5 hidden h-4 w-px bg-glass-border lg:block"
                aria-hidden
              />
              <LanguageSwitcher variant="inline" className="px-2" />
            </div>

            <a
              href={resolveNavHref("#contact", pathname)}
              className="group inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full bg-mist px-3 text-[0.68rem] tracking-[0.1em] text-void transition-colors hover:bg-cyan sm:px-4 sm:text-[0.72rem] sm:tracking-[0.12em]"
              aria-label={t.nav.contactCta}
            >
              <Mail className="h-4 w-4 sm:hidden" aria-hidden />
              <span className="hidden sm:inline">{t.nav.contactCta}</span>
              <ArrowUpRight className="hidden h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:block" />
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              className="relative z-10 inline-flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-glass-border bg-glass text-mist backdrop-blur-sm transition-colors hover:border-cyan/40 hover:text-cyan lg:hidden"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={open}
              aria-controls={titleId}
              onClick={(event) => {
                event.stopPropagation();
                setOpen((v) => !v);
              }}
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
            className="fixed inset-x-0 z-[90] overscroll-contain bg-void lg:hidden"
            style={{
              top: "var(--vv-top, 0px)",
              height: "var(--vv-height, 100dvh)",
            }}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(24,187,208,0.12),transparent_42%)]" />
            <div className="relative flex h-full flex-col justify-between overflow-y-auto overscroll-contain touch-pan-y safe-px pt-[calc(6.75rem+env(safe-area-inset-top))] pb-[max(2.5rem,env(safe-area-inset-bottom))]">
              <nav className="flex flex-col" aria-label={t.nav.mobile}>
                {navItems.map((item, index) => {
                  if (item.key === "services" || item.key === "about") {
                    const isServices = item.key === "services";
                    const expanded = mobileOpen === item.key;
                    const links = isServices ? serviceLinks : aboutLinks;
                    const panelId = `${titleId}-${item.key}`;
                    return (
                      <motion.div
                        key={item.key}
                        className="border-b border-line"
                        initial={reduce ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * index, duration: 0.45 }}
                      >
                        <div className="flex items-center gap-2">
                          {isHashHref(item.href) ? (
                            <a
                              href={item.href}
                              onClick={closeDrawer}
                              className="min-w-0 flex-1 py-4 text-[1.65rem] font-medium leading-tight tracking-tight text-mist sm:py-5 sm:text-4xl"
                            >
                              {item.label}
                            </a>
                          ) : (
                            <Link
                              href={item.href}
                              onClick={closeDrawer}
                              className="min-w-0 flex-1 py-4 text-[1.65rem] font-medium leading-tight tracking-tight text-mist sm:py-5 sm:text-4xl"
                            >
                              {item.label}
                            </Link>
                          )}
                          <button
                            type="button"
                            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-mist-muted transition-colors hover:text-mist"
                            aria-label={
                              isServices ? t.nav.servicesMenu : t.nav.aboutMenu
                            }
                            aria-expanded={expanded}
                            aria-controls={panelId}
                            onClick={() =>
                              setMobileOpen(
                                expanded
                                  ? null
                                  : isServices
                                    ? "services"
                                    : "about",
                              )
                            }
                          >
                            <ChevronDown
                              className={`h-6 w-6 transition-transform duration-300 ${
                                expanded ? "rotate-180" : ""
                              }`}
                              aria-hidden
                            />
                          </button>
                        </div>
                        {expanded ? (
                          <ul id={panelId} className="flex flex-col pb-4">
                            {links.map((link) => (
                              <li key={link.href}>
                                <DrawerSubLink
                                  href={link.href}
                                  active={link.active}
                                  onClick={closeDrawer}
                                >
                                  {link.number ? (
                                    <span className="w-7 text-[0.68rem] tracking-[0.14em]">
                                      {link.number}
                                    </span>
                                  ) : null}
                                  {link.title}
                                </DrawerSubLink>
                              </li>
                            ))}
                            {isServices ? (
                              <li>
                                <Link
                                  href="/hizmetler"
                                  onClick={closeDrawer}
                                  className="mt-1 inline-flex min-h-11 items-center gap-2 py-2 text-lg text-mist-muted transition-colors hover:text-mist"
                                >
                                  {t.servicePage.allServices}
                                  <ArrowUpRight className="h-4 w-4" />
                                </Link>
                              </li>
                            ) : null}
                          </ul>
                        ) : null}
                      </motion.div>
                    );
                  }

                  return (
                    <motion.a
                      key={item.key}
                      href={item.href}
                      onClick={closeDrawer}
                      className="group flex items-center justify-between border-b border-line py-4 text-[1.65rem] font-medium leading-tight tracking-tight text-mist sm:py-5 sm:text-4xl"
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
                  );
                })}
              </nav>

              <div className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href={resolveNavHref("#contact", pathname)}
                  onClick={closeDrawer}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-mist px-5 text-sm tracking-[0.1em] text-void transition-colors hover:bg-cyan sm:w-auto"
                >
                  {t.nav.contactCta}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <div className="flex items-center justify-between gap-2 sm:justify-end">
                  <InstagramLink
                    variant="ghost"
                    className="border border-glass-border"
                    onClick={closeDrawer}
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

  if (mounted) return createPortal(ui, document.body);
  return ui;
}

function isHashHref(href: string) {
  return href.startsWith("#") || href.startsWith("/#");
}

function DrawerSubLink({
  href,
  active,
  onClick,
  children,
}: {
  href: string;
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  const className = `flex min-h-11 items-center gap-3 py-2 text-lg text-mist-muted transition-colors hover:text-mist ${
    active ? "text-mist" : ""
  }`;

  if (isHashHref(href)) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={className}
        aria-current={active ? "location" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={className}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

function NavItem({
  href,
  label,
  active,
  open = false,
  hasMenu = false,
  controlsId,
  onKeyDown,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  open?: boolean;
  hasMenu?: boolean;
  controlsId?: string;
  onKeyDown?: (event: ReactKeyboardEvent<HTMLAnchorElement>) => void;
  onClick?: () => void;
}) {
  const className = `group relative inline-flex items-center gap-1 px-2.5 py-2 text-[0.68rem] tracking-[0.12em] transition-colors lg:px-3 ${
    active ? "text-mist" : "text-mist-muted hover:text-mist"
  }`;

  const body = (
    <>
      {label}
      {hasMenu ? (
        <ChevronDown
          className={`h-3 w-3 opacity-70 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      ) : null}
      <span
        className={`absolute bottom-0.5 left-1/2 h-px w-4 -translate-x-1/2 bg-gradient-to-r from-cyan to-gold transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
        aria-hidden
      />
    </>
  );

  const extra = {
    className,
    onKeyDown,
    onClick,
    "aria-current": (active ? "page" : undefined) as "page" | undefined,
    "aria-expanded": hasMenu ? open : undefined,
    "aria-haspopup": hasMenu ? ("true" as const) : undefined,
    "aria-controls": hasMenu ? controlsId : undefined,
  };

  if (isHashHref(href)) {
    return (
      <a href={href} {...extra} aria-current={active ? "location" : undefined}>
        {body}
      </a>
    );
  }

  return (
    <Link href={href} {...extra}>
      {body}
    </Link>
  );
}

function FlyoutNavItem({
  href,
  label,
  active,
  align,
  onNavigate,
  children,
}: {
  href: string;
  label: string;
  active: boolean;
  align: "start" | "center" | "end";
  onNavigate: () => void;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      wrapRef.current?.querySelector<HTMLElement>("a")?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      <NavItem
        href={href}
        label={label}
        active={active}
        open={open}
        hasMenu
        controlsId={panelId}
        onClick={() => {
          setOpen(false);
          onNavigate();
        }}
        onKeyDown={(event) => {
          if (event.key !== "ArrowDown") return;
          event.preventDefault();
          setOpen(true);
          requestAnimationFrame(() => {
            wrapRef.current
              ?.querySelector<HTMLElement>("[data-flyout] a")
              ?.focus();
          });
        }}
      />
      {open ? (
        <div
          id={panelId}
          data-flyout
          className={`absolute top-full z-50 pt-2 ${
            align === "end"
              ? "right-0"
              : align === "center"
                ? "left-1/2 -translate-x-1/2"
                : "left-0"
          }`}
          onClick={() => setOpen(false)}
        >
          <div className="min-w-[16.5rem] rounded-2xl border border-glass-border bg-void/95 p-1.5 backdrop-blur-xl">
            {children}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FlyoutLink({
  href,
  active,
  onNavigate,
  className = "",
  children,
}: {
  href: string;
  active: boolean;
  onNavigate: () => void;
  className?: string;
  children: ReactNode;
}) {
  const composed = `flex items-center gap-2 rounded-xl px-3 py-2.5 text-[0.78rem] leading-snug tracking-normal transition-colors ${
    active ? "bg-mist/[0.08] text-mist" : "text-mist hover:bg-mist/[0.06]"
  } ${className}`;

  if (isHashHref(href)) {
    return (
      <a
        href={href}
        className={composed}
        aria-current={active ? "location" : undefined}
        onClick={onNavigate}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={composed}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
    >
      {children}
    </Link>
  );
}
