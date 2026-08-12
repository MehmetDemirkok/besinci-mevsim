export type JourneySceneId =
  | "istanbul"
  | "ankara"
  | "cappadocia"
  | "izmir";

export type JourneyScene = {
  id: JourneySceneId;
  hold: [number, number];
  media: {
    image: string;
    poster: string;
    video?: string;
    videoMobile?: string;
  };
  warmth: number;
  atmosphere: "cool" | "neutral" | "warm" | "coastal";
};

/**
 * Compact road-trip timeline (0 → 1).
 * Short holds — designed for ~2 viewport scrolls, not a film epic.
 */
export const journeyScenes: JourneyScene[] = [
  {
    id: "istanbul",
    hold: [0, 0.16],
    media: {
      image: "/travel/istanbul/view.png",
      poster: "/travel/istanbul/poster.png",
    },
    warmth: 0.2,
    atmosphere: "cool",
  },
  {
    id: "ankara",
    hold: [0.22, 0.38],
    media: {
      image: "/travel/ankara/view.png",
      poster: "/travel/ankara/poster.png",
    },
    warmth: 0.15,
    atmosphere: "neutral",
  },
  {
    id: "cappadocia",
    hold: [0.44, 0.6],
    media: {
      image: "/travel/cappadocia/view.png",
      poster: "/travel/cappadocia/poster.png",
    },
    warmth: 0.55,
    atmosphere: "warm",
  },
  {
    id: "izmir",
    hold: [0.66, 0.82],
    media: {
      image: "/travel/izmir/view.png",
      poster: "/travel/izmir/poster.png",
    },
    warmth: 0.4,
    atmosphere: "coastal",
  },
];

export const journeyAssets = {
  highway: "/travel/transitions/highway.png",
  car: {
    windshield: "/travel/car/windshield-overlay.svg",
    dashboard: "/travel/car/dashboard.svg",
  },
} as const;

/**
 * Journey track height in viewport heights.
 * Sticky viewport + scrub — medium pace (~4.5–5 screens).
 */
export const journeyScrollVh = 480;

const FADE = 0.03;

export function holdOpacity(
  progress: number,
  hold: [number, number],
  fade = FADE,
): number {
  const [a, b] = hold;
  if (progress < a - fade || progress > b + fade) return 0;
  if (progress < a) return (progress - (a - fade)) / fade;
  if (progress > b) return 1 - (progress - b) / fade;
  return 1;
}

export function highwayOpacity(progress: number): number {
  const bridges: [number, number][] = [
    [0.16, 0.22],
    [0.38, 0.44],
    [0.6, 0.66],
  ];
  let best = 0;
  for (const [a, b] of bridges) {
    if (progress < a || progress > b) continue;
    const t = (progress - a) / (b - a);
    best = Math.max(best, Math.sin(t * Math.PI));
  }
  return best;
}

export function activeSceneIndex(progress: number): number {
  let best = 0;
  let bestOpacity = -1;
  journeyScenes.forEach((scene, index) => {
    const o = holdOpacity(progress, scene.hold);
    if (o > bestOpacity) {
      bestOpacity = o;
      best = index;
    }
  });
  return best;
}
