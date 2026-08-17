import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Beşinci Mevsim — Seyahat & Turizm Taşımacılık";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoBytes = await readFile(
    join(process.cwd(), "public/images/brand/logo-mark.png"),
  );
  const logoSrc = `data:image/png;base64,${logoBytes.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(145deg, #071014 0%, #0B151A 48%, #101A1F 100%)",
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
        <img src={logoSrc} width={340} height={318} alt="" />
      </div>
    ),
    { ...size },
  );
}
