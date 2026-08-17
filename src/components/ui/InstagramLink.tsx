"use client";

import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { useLanguage } from "@/i18n/LanguageProvider";

export function InstagramGlyph({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <rect
        x="3.2"
        y="3.2"
        width="17.6"
        height="17.6"
        rx="5.2"
        stroke="currentColor"
        strokeWidth="1.55"
      />
      <circle
        cx="12"
        cy="12"
        r="4.15"
        stroke="currentColor"
        strokeWidth="1.55"
      />
      <circle cx="17.15" cy="6.85" r="1.05" fill="currentColor" />
    </svg>
  );
}

type InstagramLinkProps = {
  variant?: "mark" | "row" | "ghost";
  className?: string;
  onClick?: () => void;
};

export function InstagramLink({
  variant = "mark",
  className = "",
  onClick,
}: InstagramLinkProps) {
  const { t } = useLanguage();
  const href = siteConfig.social.instagram;
  const handle = `@${siteConfig.social.instagramHandle}`;

  if (variant === "ghost") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer me"
        onClick={onClick}
        aria-label={`${t.instagram} (${handle})`}
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-mist-muted transition-colors hover:bg-glass hover:text-cyan ${className}`}
      >
        <InstagramGlyph className="h-4 w-4" />
      </a>
    );
  }

  if (variant === "row") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer me"
        onClick={onClick}
        className={`group flex items-center justify-between gap-4 border border-mist/15 bg-mist/[0.04] px-5 py-5 transition-colors hover:border-cyan/50 hover:bg-cyan/[0.06] ${className}`}
      >
        <span className="min-w-0">
          <span className="flex items-center gap-2 text-eyebrow text-mist-soft">
            <InstagramGlyph className="h-3.5 w-3.5 text-cyan" />
            {t.instagram}
          </span>
          <span className="mt-2 block truncate text-lg font-medium tracking-tight text-mist md:text-xl">
            {handle}
          </span>
        </span>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-cyan transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer me"
      onClick={onClick}
      aria-label={`${t.instagram} (${handle})`}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-mist-muted transition-colors hover:border-cyan/45 hover:text-cyan ${className}`}
    >
      <InstagramGlyph className="h-[1.15rem] w-[1.15rem]" />
    </a>
  );
}
