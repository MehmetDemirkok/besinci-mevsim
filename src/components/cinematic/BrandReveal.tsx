"use client";

type BrandRevealProps = {
  line: string;
  brand: string;
  progress: number; // 0–1
};

export function BrandReveal({ line, brand, progress }: BrandRevealProps) {
  const visible = progress > 0.08;
  const opacity = Math.min(1, Math.max(0, (progress - 0.05) / 0.35));
  const y = (1 - Math.min(1, progress / 0.5)) * 28;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center px-6"
      style={{ opacity }}
      aria-hidden={!visible}
    >
      <div
        className="text-center"
        style={{ transform: `translateY(${y}px)` }}
      >
        <p className="text-[clamp(1.05rem,5.5vw,2.75rem)] font-medium leading-snug tracking-[0.04em] text-mist sm:tracking-[0.08em]">
          {line}
        </p>
        <p className="mt-5 text-eyebrow text-cyan sm:mt-8">{brand}</p>
      </div>
    </div>
  );
}
