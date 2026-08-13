"use client";

type WindshieldFrameProps = {
  compact?: boolean;
  pullOut?: number;
};

export function WindshieldFrame({
  compact = false,
  pullOut = 0,
}: WindshieldFrameProps) {
  const frameOpacity = Math.max(0, 1 - pullOut * 0.94);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      style={{ opacity: frameOpacity }}
      aria-hidden
    >
      {/* Photos already include cabin — only extra glass sheen + edge falloff */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_52%,rgba(5,9,12,0.22)_100%)]" />
      <div
        className="absolute inset-0 opacity-25 mix-blend-screen"
        style={{
          background:
            "linear-gradient(118deg, transparent 0%, rgba(255,255,255,0.08) 24%, transparent 38%, transparent 64%, rgba(24,187,208,0.05) 80%, transparent 94%)",
        }}
      />
      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-void/50 to-transparent ${
          compact ? "h-[10%]" : "h-[12%]"
        }`}
      />
    </div>
  );
}
