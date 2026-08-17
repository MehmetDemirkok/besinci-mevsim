"use client";

import Image from "next/image";
import { siteConfig } from "@/lib/site";

export function LogoMark({
  className = "h-11 w-11",
}: {
  className?: string;
}) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center ${className}`}
      aria-hidden
    >
      <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(24,187,208,0.35),transparent_60%)] opacity-80" />
      <span className="absolute -inset-[2px] rounded-full bg-[conic-gradient(from_210deg,#18BBD0,#F4B51B,#18BBD0)] opacity-70" />
      <span className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#f7fafb] p-[7%]">
        <Image
          src="/images/brand/logo.png"
          alt=""
          width={96}
          height={80}
          className="h-full w-full object-contain"
          priority
        />
      </span>
      <span className="absolute -right-[1px] top-[8%] h-2 w-2 rounded-full bg-gold shadow-[0_0_10px_rgba(244,181,27,0.7)]" />
    </span>
  );
}

export function BrandWordmark({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div className="group flex items-center gap-3 md:gap-3.5">
      <LogoMark
        className={
          compact
            ? "h-9 w-9 transition-transform duration-500 group-hover:scale-[1.03]"
            : "h-11 w-11 md:h-12 md:w-12 transition-transform duration-500 group-hover:scale-[1.03]"
        }
      />

      <div className="min-w-0 leading-none">
        <span
          className={`block font-medium tracking-[0.01em] text-mist ${
            compact ? "text-[0.95rem]" : "text-base md:text-[1.05rem]"
          }`}
          translate="no"
        >
          {siteConfig.name}
        </span>
        <div
          className={`mt-1.5 hidden items-center gap-2 sm:flex ${
            compact ? "opacity-80" : ""
          }`}
        >
          <span
            className={`h-px bg-gradient-to-r from-cyan to-gold/80 ${
              compact ? "w-3" : "w-4"
            }`}
            aria-hidden
          />
          <span
            className={`tracking-[0.2em] text-mist-muted ${
              compact ? "text-[0.5rem]" : "text-[0.58rem]"
            }`}
          >
            {siteConfig.tagline}
          </span>
        </div>
      </div>
    </div>
  );
}
