"use client";

import Image from "next/image";
import { siteConfig } from "@/lib/site";

const LOGO = {
  src: "/images/brand/logo-mark.png",
  width: 223,
  height: 209,
} as const;

const sizeClass = {
  compact: "h-12 w-auto sm:h-14",
  nav: "h-14 w-auto sm:h-16 md:h-[4.25rem]",
  footer: "h-16 w-auto md:h-[4.5rem]",
} as const;

export function BrandWordmark({
  compact = false,
  size,
}: {
  compact?: boolean;
  size?: "compact" | "nav" | "footer";
}) {
  const variant = size ?? (compact ? "compact" : "nav");
  const tight = variant === "compact";

  return (
    <div className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
      <Image
        src={LOGO.src}
        alt=""
        width={LOGO.width}
        height={LOGO.height}
        priority
        className={`block shrink-0 object-contain ${sizeClass[variant]}`}
      />
      <div className="min-w-0 leading-none">
        <span
          className={`block truncate font-medium tracking-[0.01em] text-mist ${
            tight ? "text-[0.95rem]" : "text-base md:text-[1.05rem]"
          }`}
          translate="no"
        >
          {siteConfig.name}
        </span>
        <div
          className={`mt-1.5 items-center gap-2 ${
            tight ? "opacity-80" : ""
          } ${variant === "footer" ? "flex" : "hidden sm:flex"}`}
        >
          <span
            className={`h-px shrink-0 bg-gradient-to-r from-cyan to-gold/80 ${
              tight ? "w-3" : "w-4"
            }`}
            aria-hidden
          />
          <span
            className={`truncate tracking-[0.18em] text-mist-muted ${
              tight ? "text-[0.5rem]" : "text-[0.58rem]"
            }`}
          >
            {siteConfig.tagline}
          </span>
        </div>
      </div>
    </div>
  );
}
