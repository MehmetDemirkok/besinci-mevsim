# Beşinci Mevsim

Premium corporate website for **Beşinci Mevsim** — Seyahat & Turizm Taşımacılık.

This is a brand showcase site. There is no booking, reservation, payment, or account system.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Brand assets

1. Place the official logo at `public/images/brand/logo.png`
2. Drop vehicle and travel photography into the folders under `public/images/`
3. See `public/images/README.md` for the expected file names

Until real photography is added, the site uses branded atmospheric placeholders.

## Contact details

Edit `src/lib/site.ts` and set real `email`, `phone`, `whatsapp`, and `address` values. Leave them as `null` until confirmed — the UI shows a clear placeholder instead of inventing data.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — ESLint
