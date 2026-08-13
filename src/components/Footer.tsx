"use client";

import { usePathname } from "next/navigation";
import { BrandWordmark } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/site";
import { resolveNavHref, homeHref } from "@/lib/nav";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const year = new Date().getFullYear();

  const navItems = siteConfig.nav.map((item) => ({
    href:
      item.key === "services"
        ? "/hizmetler"
        : resolveNavHref(item.href, pathname),
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
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist-soft">
              {t.footer.blurb}
            </p>
          </div>

          <nav aria-label={t.footer.navLabel}>
            <ul className="flex flex-wrap gap-x-8 gap-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm tracking-[0.08em] text-mist-muted transition-colors hover:text-mist"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-sm text-mist-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="transition-colors hover:text-mist">
              {t.footer.privacy}
            </a>
            <a href="/kvkk" className="transition-colors hover:text-mist">
              {t.footer.kvkk}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
