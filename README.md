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

| Content                              | Edit or add                                                     |
| ------------------------------------ | --------------------------------------------------------------- |
| Relationship date                    | `relationshipStart` (currently `2024-10-04T00:00:00`)           |
| Opening message                      | `introMessage`                                                  |
| Envelope letter                      | `envelopeLetter` (multiline text between backticks)             |
| Six photographs                      | Add `photo-1.jpg` through `photo-6.jpg` to `public/photos/`     |
| Photo captions and handwritten notes | `photos`, keeping exactly six entries                           |
| Star messages                        | `starMessages` (five positioned stars)                          |
| Heart messages                       | `loveMessages` (32 examples included)                           |
| Final letter                         | `finalLetter` (multiline text between backticks)                |
| Your song                            | Add `our-song.mp3` to `public/music/`; change `music` if needed |
| Small dedication                     | `dedication`                                                    |

The original images in the parent folder are untouched. Per the brief, the project initially uses six attractive illustrated placeholders. Replace them with your chosen six photographs. JPEGs around 1200–1600px on the long edge and under 300KB each are ideal. The scrapbook crops to portrait format; the fullscreen viewer shows each complete image. Missing images automatically fall back to the illustrations. Music loads only after a tap, never autoplays, and a missing file leaves the rest of the experience working normally.

Do not include a timezone suffix in the relationship date if you want the requested browser-local midnight. Calendar years and months are calculated from whole calendar anniversaries, clamped at month ends. Calendar days follow local dates; total hours count actual elapsed time, including daylight-saving changes. The live clock refreshes every second and when the tab becomes visible.

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
