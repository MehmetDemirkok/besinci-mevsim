"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

export function LogoMark({
  className = "h-9 w-auto",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="30" stroke="#18BBD0" strokeWidth="1.5" />
      <path
        d="M18 38c4-12 10-18 14-20 4 2 10 8 14 20"
        stroke="#18BBD0"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M22 36c3.5-8 7.5-12 10-13.5C34.5 24 38.5 28 42 36"
        stroke="#F4B51B"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="32" cy="22" r="2.5" fill="#F4B51B" />
    </svg>
  );
}

export function BrandWordmark({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [hasLogo, setHasLogo] = useState(false);

  useEffect(() => {
    let active = true;
    const img = new window.Image();
    img.onload = () => {
      if (active) setHasLogo(true);
    };
    img.onerror = () => {
      if (active) setHasLogo(false);
    };
    img.src = "/images/brand/logo.png";
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="flex items-center gap-3">
      {hasLogo ? (
        <span className={`relative ${compact ? "h-8 w-8" : "h-10 w-10"}`}>
          <Image
            src="/images/brand/logo.png"
            alt=""
            fill
            className="object-contain"
            sizes="40px"
          />
        </span>
      ) : (
        <LogoMark className={compact ? "h-8 w-8" : "h-10 w-10"} />
      )}
      <div className="leading-none">
        <p
          className={`font-medium tracking-tight text-mist ${
            compact ? "text-[0.95rem]" : "text-base md:text-lg"
          }`}
        >
          {siteConfig.name}
        </p>
        {!compact ? (
          <p className="mt-1 hidden text-[0.58rem] tracking-[0.18em] text-mist-soft sm:block sm:tracking-[0.22em]">
            {siteConfig.tagline}
          </p>
        ) : null}
      </div>
    </div>
  );
}
