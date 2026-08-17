"use client";

type CityTitleProps = {
  title: string;
  subtitle: string;
  chapterLabel: string;
  chapterIndex: number;
  visible: boolean;
};

export function CityTitle({
  title,
  subtitle,
  chapterLabel,
  chapterIndex,
  visible,
}: CityTitleProps) {
  return (
    <div
      aria-hidden={!visible}
      className={`absolute inset-x-0 z-30 px-5 pr-[4.75rem] text-center transition-[opacity,transform] duration-700 top-[calc(5.75rem+env(safe-area-inset-top))] sm:top-[15%] sm:px-6 sm:pr-6 md:top-[18%] ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <p className="text-eyebrow text-gold/90">
        {chapterLabel} {String(chapterIndex + 1).padStart(2, "0")}
      </p>
      <h3 className="mt-3 text-[clamp(2.1rem,10vw,7rem)] font-medium tracking-[-0.04em] text-mist drop-shadow-[0_8px_40px_rgba(0,0,0,0.55)] sm:mt-4">
        {title}
      </h3>
      <div className="mx-auto mt-4 h-px w-12 bg-gradient-to-r from-transparent via-cyan/70 to-transparent sm:mt-5 sm:w-16" />
      <p className="mx-auto mt-4 max-w-md px-2 text-sm leading-relaxed tracking-[0.02em] text-mist-muted sm:mt-5 sm:tracking-[0.04em] md:text-base">
        {subtitle}
      </p>
    </div>
  );
}
