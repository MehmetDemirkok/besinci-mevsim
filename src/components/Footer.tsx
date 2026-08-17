"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandWordmark } from "@/components/ui/Logo";
import { InstagramLink } from "@/components/ui/InstagramLink";
import { AgencyCredential } from "@/components/ui/AgencyCredential";
import { siteConfig, telHref, whatsappHref, mapsHref } from "@/lib/site";
import { homeHref, menuHref } from "@/lib/nav";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const year = new Date().getFullYear();

  const navItems = siteConfig.footerNav.map((item) => ({
    key: item.key,
    href: menuHref(item, pathname, "footer"),
    label: t.nav[item.key],
  }));

  return (
    <footer className="border-t border-line bg-void">
      <div className="mx-auto max-w-[1440px] safe-px py-16 md:px-8 lg:px-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <a href={homeHref(pathname)} aria-label={t.nav.home}>
              <BrandWordmark />
            </a>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist-muted">
              {t.footer.blurb}
            </p>
            <AgencyCredential className="mt-5 max-w-sm text-sm" />
            {siteConfig.contact.phone ? (
              <a
                href={telHref(siteConfig.contact.phone)}
                className="mt-5 block text-sm tracking-[0.04em] text-mist-muted transition-colors hover:text-mist"
              >
                {siteConfig.contact.phone}
              </a>
            ) : null}
            {siteConfig.contact.whatsapp ? (
              <a
                href={whatsappHref(siteConfig.contact.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm tracking-[0.04em] text-mist-muted transition-colors hover:text-mist"
              >
                {t.contact.whatsappCta}
              </a>
            ) : null}
            {siteConfig.contact.address ? (
              <a
                href={mapsHref(siteConfig.contact.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block max-w-sm text-sm leading-relaxed tracking-[0.02em] text-mist-muted transition-colors hover:text-mist"
              >
                {siteConfig.contact.address}
              </a>
            ) : null}
            <InstagramLink className="mt-6" />
          </div>

          <nav aria-label={t.footer.navLabel}>
            <ul className="flex flex-wrap gap-x-8 gap-y-4">
              {navItems.map((item) => (
                <li key={item.key}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-sm text-mist-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name} · {siteConfig.agency.name}. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-mist">
              {t.footer.privacy}
            </Link>
            <Link href="/kvkk" className="transition-colors hover:text-mist">
              {t.footer.kvkk}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  const className =
    "text-sm tracking-[0.08em] text-mist-muted transition-colors hover:text-mist";

  if (href.startsWith("#") || href.startsWith("/#")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
