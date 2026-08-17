import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Beşinci Mevsim",
    short_name: "Beşinci Mevsim",
    description:
      "VIP transfer, turizm taşımacılığı, kurumsal seyahat ve konaklama hizmetleri.",
    start_url: "/",
    display: "standalone",
    background_color: "#071014",
    theme_color: "#071014",
    lang: "tr",
    icons: [
      {
        src: "/images/brand/logo-mark.png",
        sizes: "223x209",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
