"use client";

import { journeyAssets } from "@/data/journey";

type WindshieldFrameProps = {
  compact?: boolean;
  pullOut?: number;
};

export function WindshieldFrame({
  compact = false,
  pullOut = 0,
}: WindshieldFrameProps) {
  const frameScale = 1 + pullOut * 0.1;
  const frameOpacity = Math.max(0, 1 - pullOut * 0.92);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      style={{
        opacity: frameOpacity,
        transform: `scale(${frameScale})`,
        transformOrigin: "50% 45%",
      }}
      aria-hidden
    >
      {/* Cabin vignette — keep scenery readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_48%,rgba(5,9,12,0.35)_78%,rgba(5,9,12,0.82)_100%)]" />

      {/* Soft A-pillars — thinner on phones so scenery stays wide */}
      <div className="absolute inset-y-0 left-0 w-[7%] bg-gradient-to-r from-[#05090c]/95 via-[#071014]/50 to-transparent sm:w-[10%] md:w-[12%]" />
      <div className="absolute inset-y-0 right-0 w-[7%] bg-gradient-to-l from-[#05090c]/95 via-[#071014]/50 to-transparent sm:w-[10%] md:w-[12%]" />
      <div className="absolute inset-x-0 top-0 h-[8%] bg-gradient-to-b from-[#05090c]/90 to-transparent sm:h-[10%] md:h-[12%]" />

      {/* Glass reflection */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-screen"
        style={{
          background:
            "linear-gradient(118deg, transparent 0%, rgba(255,255,255,0.07) 26%, transparent 40%, transparent 62%, rgba(24,187,208,0.04) 78%, transparent 92%)",
        }}
      />

      {/* Dashboard — lighter coverage so destinations stay hero */}
      <div
        className={`absolute inset-x-0 bottom-0 ${
          compact ? "h-[18%]" : "h-[22%] md:h-[24%]"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={journeyAssets.car.dashboard}
          alt=""
          className="h-full w-full object-cover object-bottom opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-transparent" />
      </div>
    </div>
  );
}
