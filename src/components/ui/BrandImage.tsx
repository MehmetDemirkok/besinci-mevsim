"use client";

import Image from "next/image";
import { useState } from "react";

type BrandImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  atmosphere?: "vehicle" | "travel" | "hotel" | "road" | "city" | "abstract";
  label?: string;
};

const atmospheres: Record<
  NonNullable<BrandImageProps["atmosphere"]>,
  string
> = {
  vehicle:
    "radial-gradient(ellipse 80% 60% at 62% 58%, rgba(24,187,208,0.2), transparent 55%), linear-gradient(145deg, #0b151a 0%, #101a1f 40%, #071014 100%)",
  travel:
    "radial-gradient(ellipse 70% 50% at 28% 38%, rgba(244,181,27,0.11), transparent 50%), linear-gradient(160deg, #0b151a, #122028 50%, #071014)",
  hotel:
    "radial-gradient(circle at 72% 28%, rgba(24,187,208,0.13), transparent 45%), linear-gradient(180deg, #152228, #071014)",
  road:
    "linear-gradient(180deg, #101a1f 0%, #0b151a 45%, #071014 100%), radial-gradient(ellipse at 50% 82%, rgba(24,187,208,0.1), transparent 50%)",
  city:
    "radial-gradient(ellipse at 50% 0%, rgba(24,187,208,0.15), transparent 50%), linear-gradient(200deg, #122028, #071014)",
  abstract:
    "linear-gradient(135deg, #0b151a, #101a1f 40%, #152228 70%, #071014)",
};

function VehicleSilhouette() {
  return (
    <svg
      viewBox="0 0 800 360"
      className="absolute bottom-[12%] left-1/2 w-[88%] max-w-5xl -translate-x-1/2 opacity-[0.18]"
      fill="none"
      aria-hidden
    >
      <path
        d="M90 250c20-18 48-42 78-52 42-14 92-10 138-8 58 2 118 4 176-6 46-8 88-28 128-38 28-7 58-8 86 2 24 8 46 28 62 48l22 34c8 12 6 28-4 36-18 14-48 12-72 10H120c-28 2-52-4-62-20-8-12-2-30 32-46z"
        fill="#F5F7F8"
      />
      <path
        d="M170 198c28-36 62-58 102-62 48-4 96 8 146 12 44 4 90-2 128-18 26-10 52-16 78-8"
        stroke="#18BBD0"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="210" cy="268" r="28" stroke="#F4B51B" strokeWidth="3" />
      <circle cx="620" cy="268" r="28" stroke="#F4B51B" strokeWidth="3" />
    </svg>
  );
}

function Atmosphere({
  atmosphere,
  alt,
  label,
  className,
}: {
  atmosphere: NonNullable<BrandImageProps["atmosphere"]>;
  alt: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{ background: atmospheres[atmosphere] }}
      {...(alt
        ? { role: "img" as const, "aria-label": alt }
        : { "aria-hidden": true })}
    >
      <div className="absolute inset-0 opacity-50">
        <div className="absolute -left-1/4 top-1/3 h-[55%] w-[70%] rounded-full bg-cyan/10 blur-3xl" />
        <div className="absolute -right-1/5 bottom-0 h-[45%] w-[55%] rounded-full bg-gold/10 blur-3xl" />
        {atmosphere === "road" || atmosphere === "travel" ? (
          <div className="absolute inset-x-[8%] bottom-[22%] h-px bg-gradient-to-r from-transparent via-mist/25 to-transparent" />
        ) : null}
      </div>
      {atmosphere === "vehicle" ? <VehicleSilhouette /> : null}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,16,20,0.72),transparent_48%)]" />
      {label ? (
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-eyebrow text-mist-soft">{label}</p>
        </div>
      ) : null}
    </div>
  );
}

export function BrandImage({
  src,
  alt,
  fill = true,
  width,
  height,
  className = "",
  imageClassName = "object-cover",
  priority,
  sizes = "100vw",
  atmosphere = "abstract",
  label,
}: BrandImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <Atmosphere
        atmosphere={atmosphere}
        alt={alt}
        label={label}
        className={className}
      />
    );
  }

  if (fill) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={imageClassName}
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width ?? 1600}
        height={height ?? 1000}
        priority={priority}
        sizes={sizes}
        className={imageClassName}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
