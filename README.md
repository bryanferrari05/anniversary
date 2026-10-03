# La nostra storia

An Italian, mobile-first anniversary experience built with React, TypeScript, Vite and Framer Motion. All rabbit and rose illustrations are original SVGs. Fonts are bundled locally; the site needs no backend or external image services.

## Run locally

Install Node.js 22.12+ (or 24 LTS), then open a terminal in this `anniversary` folder:

```sh
npm install
npm run dev
```

Open the URL printed by Vite. To check the final output:

```sh
npm test
npm run build
npm run preview
```

## Personalize

Every personal text and asset path is in **`src/data/loveData.ts`**.

| Content                              | Edit or add                                                                                                                       |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Relationship date                    | `relationshipStart` (currently `2024-10-04T00:00:00`)                                                                             |
| Opening message                      | `introMessage`                                                                                                                    |
| Envelope letter                      | `envelopeLetter` (multiline text between backticks)                                                                               |
| Six photographs                      | `photos[].src` points to the original files in `public/photos/`; `preview` points to a small version in `public/photos/previews/` |
| Photo captions and handwritten notes | `photos`, keeping exactly six entries                                                                                             |
| Star messages                        | `starMessages` (three positioned stars: CACCAPUPU, CIU', Furby)                                                                   |
| Heart messages                       | `loveMessages` (the twelve supplied inside jokes)                                                                                 |
| Final letter                         | `finalLetter` (multiline text between backticks)                                                                                  |
| Your song                            | Add `our-song.mp3` to `public/music/`; change `music` if needed                                                                   |
| Small dedication                     | `dedication`                                                                                                                      |

The scrapbook uses the original filenames you placed in `public/photos/`, with lightweight WebP previews for scrolling. Both the scrapbook and fullscreen viewer keep each photo uncropped. If a preview is missing, the original photo loads instead; illustrations appear only when both fail. Six slots currently show five unique photographs because `image.jpg` and `image(5).jpg` are identical. When replacing a photo, update its `src` and `preview` paths together. Music loads only after a tap, never autoplays, and a missing file leaves the rest of the experience working normally.

Do not include a timezone suffix in the relationship date if you want the requested browser-local midnight. Calendar years and months are calculated from whole calendar anniversaries, clamped at month ends. Calendar days follow local dates; total hours count actual elapsed time, including daylight-saving changes. The live clock refreshes every second and when the tab becomes visible.

On October 4 the opening counter shows only the number of completed years, with no months, days or ticking clock: **“2 anni” for all of October 4, 2026**. At local midnight on October 5 it resumes with **“2 anni · 1 giorno”** and live hours, minutes and seconds. Zero-valued month/day units are omitted. The rule repeats each anniversary with the dynamically calculated year. Timers align to wall-clock seconds and refresh after returning to the tab. Unit and browser checks cover both midnight transitions, midday October 4, October 5 and the following anniversary.

## Interactions

- Hold the envelope's wax-seal heart for 1.8 seconds. On a keyboard, focus it and hold Space or Enter. Releasing early drains progress.
- Tap any photo. Swipe horizontally, use the previous/next buttons or keyboard arrow keys. Escape, the close button or the surrounding backdrop closes the viewer.
- Tap three different stars to reveal the heart constellation.
- Tap the large heart for a new message; the previous message cannot repeat immediately.
- The final button opens the second letter. Dialogs trap focus, restore it on close, and scroll for long letters.
- The device's reduced-motion preference disables decorative animation and scroll motion.

## Deploy to Cloudflare Pages

This is a plain static Vite site. In Cloudflare Pages, use:

- Root directory: `anniversary` if deploying the parent directory, or leave blank if the repository root is this folder.
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js: 22.12+ or 24 LTS

No backend, secrets, database, environment variables, or Workers are required. You can also upload the built `dist` directory to any static host. `.openai/hosting.json` is only for the optional private Sites deployment; it does not affect Cloudflare Pages.

`noindex,nofollow` discourages indexing but is not access control. Configure your chosen host's access settings if the final photographs and letters should be private.

## Structure

`src/components/` contains each story scene, the reusable modal, reveal animation, and SVG illustrations. `src/hooks/useRelationship.ts` handles the live clock. `src/lib/calendar.ts` contains the calendar math, with boundary tests in `tests/calendar.test.ts`. `src/styles.css` contains the complete responsive visual theme.
