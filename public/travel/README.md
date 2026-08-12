# Travel Cinema Assets

Replace these placeholders with final footage / photography.

## Structure

```text
/public/travel
  /istanbul
    view.png          ← main windshield view (or view.mp4)
    poster.png        ← poster / fallback
  /ankara
    view.png
    poster.png
  /cappadocia
    view.png
    poster.png
  /izmir
    view.png
    poster.png
  /transitions
    highway.png       ← between-city road atmosphere
  /car
    windshield-overlay.svg
    dashboard.svg
```

## Optional video

If you add videos later, place them as:

- `view.mp4` (desktop)
- `view-mobile.mp4` (mobile)

Then update `src/data/journey.ts` media paths.

## Audio (optional, later)

- `/public/travel/audio/engine.mp3`
- `/public/travel/audio/road.mp3`
- `/public/travel/audio/wind.mp3`
