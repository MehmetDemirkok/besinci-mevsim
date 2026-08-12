import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Beşinci Mevsim — Seyahat & Turizm Taşımacılık";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoBytes = await readFile(
    join(process.cwd(), "public/images/brand/logo.png"),
  );
  const logoSrc = `data:image/png;base64,${logoBytes.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(145deg, #071014 0%, #0B151A 48%, #101A1F 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(24,187,208,0.18), transparent 45%), radial-gradient(ellipse at 75% 80%, rgba(244,181,27,0.12), transparent 40%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 36,
            padding: 48,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- OG ImageResponse requires raw img */}
          <img
            src={logoSrc}
            width={220}
            height={182}
            alt=""
            style={{
              borderRadius: 999,
              background: "#f7fafb",
              padding: 18,
              border: "2px solid rgba(24,187,208,0.45)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                fontSize: 64,
                fontWeight: 600,
                color: "#F5F7F8",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              Beşinci Mevsim
            </div>
            <div
              style={{
                fontSize: 22,
                color: "rgba(245,247,248,0.55)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              Seyahat & Turizm Taşımacılık
            </div>
            <div
              style={{
                marginTop: 8,
                width: 72,
                height: 2,
                background: "#18BBD0",
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
