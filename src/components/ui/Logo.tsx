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
        <p
          className={`font-medium tracking-tight text-mist ${
            compact ? "text-[0.95rem]" : "text-base md:text-lg"
          }`}
        >
          {siteConfig.name}
        </p>
        {!compact ? (
          <div className="mt-1.5 hidden items-center gap-2 sm:flex">
            <span className="h-px w-4 bg-cyan/70" aria-hidden />
            <p className="text-[0.58rem] tracking-[0.18em] text-mist-soft sm:tracking-[0.2em]">
              {siteConfig.tagline}
            </p>
          </div>
        ) : (
          <p className="mt-1 hidden text-[0.52rem] tracking-[0.16em] text-mist-soft/90 sm:block">
            {siteConfig.tagline}
          </p>
        )}
      </div>
    </div>
  );
}
