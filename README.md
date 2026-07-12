# out_of_office — Rubik's Cube Hero

A Svelte 5 + Three.js recreation of the hero visual from a Pinterest-saved
promo video (source: https://pin.it/6MuNrvSwE — a Xiaohongshu/RedNote post
for a brand campaign called "CRUSH ON BOW"). This README is the design spec
extracted from that video, written so an agent (or a human) can pick up the
project and build out the remaining page around the cube that's already
implemented.

## Status

**Built**: the 3D hero object (`src/lib/RotatingCube.svelte`) — a real
27-cubie Rubik's cube that auto-tumbles, drag-rotates, and runs a
scramble/solve loop. See [Implementation notes](#implementation-notes) for
how it intentionally diverges from the source video.

**Not built**: everything else on the page — header bar, floating icons,
headline typography, tagline, footer bar. See [TODO](#todo--replication-checklist).

## Source design spec

The reference is a 12s vertical video (720×1440, 9:16), effectively a
single-viewport hero section with one animated element (the cube) and
everything else static.

### Canvas
- Vertical mobile frame, 720×1440, no scroll — a single hero viewport.
- Background: flat warm light-gray, roughly `#EAE9E6`. No imagery.

### Header bar (sticky strip at the top)
Three blocks in one continuous horizontal strip:
1. **Left** — black background, white two-line bold condensed type:
   "CRUSH ON / BOW"
2. **Center** — black background, "BUTTERFLY" in larger bold type with a
   small "NEW TREND" tag above it, "ORIGINAL WILD" in smaller type below
3. **Right** — light background, "bow" wordmark (lowercase, rounded) next
   to a small pink/white butterfly-bow logomark, tiny Chinese sub-label
   underneath

### Floating icon row
Sit directly on the background, no container, positioned like absolute nav
buttons:
- Top-left: solid pink heart (like/favorite)
- Top-right: black curved hook-shaped arrow (share/forward)

### Hero typography
- **Eyebrow**: small pink bold caps, top-left of the headline —
  "CHINESE VALENTINE'S DAY"
- **Headline**: huge, ultra-bold, tight-tracked display grotesk, stacked
  across three lines with the middle line interrupted by the cube:
  `CRUSH` / `ON` / *[cube]* / `BOW`
- **Subhead**: "2020 COMING SOON" — "2020" in the same heavy weight,
  "COMING SOON" in a lighter weight beside it
- **Tagline**: two small centered-left lines, uppercase, letter-spaced —
  "LOVE IS SUPREME, PLAYERS GATHER" / "热爱至上 玩家集结"

The headline is the only content block; everything else is chrome around it.

### The hero object (cube)
This is the piece that's implemented so far:
- Cube with visible 3×3 grid lines per face — reads as a Rubik's-style
  puzzle. **In the source video it only uses two colors** (hot pink +
  white/cream), not six — it stays on-brand rather than reading as a toy.
- Each face carries **one large brand glyph** rather than a plain color:
  a heart outline, a butterfly silhouette (the logomark), a ring/smile
  motif — different marks rotate into view as it tumbles.
- **Positioned absolutely over the headline text**, larger than its column
  — it visually breaks the grid (overlaps "ON" above, "BOW" below), which
  is what sells the "floating 3D object" effect rather than an inline image.
- **Motion**: continuous multi-axis tumble (not single-axis spin), heavier
  and more physical than a simple Y rotate, visible motion blur on fast
  edges, soft ambient shadow underneath.

### Footer bar (mirrors the header)
- **Left**: pink down-left arrow icon + bold two-line text
  "SURPRISE MAKER PARTY"
- **Right**: small pink Chinese characters "苏绝场" over "SUZHOU", plus a
  tiny low-poly faceted cube/diamond icon (a miniature echo of the hero
  cube, used as a secondary logomark)
- **Fine print**: one line of small tracked-out caps along the bottom edge
  — "SHOWING THE MARKED DEPARTURE FROM PREVIOUS EXPERIENCE"

### Behavior / timeline
Header, footer, headline, and tagline are all static for the full 12s loop.
The cube is the only animated element, auto-playing continuously with no
user-driven trigger — a static page with one auto-rotating 3D hero object.

### Recording artifacts (not part of the design, ignore when rebuilding)
Part of the source clip has the Xiaohongshu/RedNote app's own UI bar
(app icon, username, avatar) faded in at the top, and the clip ends by
cutting into the app's loading splash screen (blurred avatar, account ID,
search bar, app logo + tagline). Those are from whoever screen-recorded the
post inside the app — not part of the ad's own design.

## Implementation notes

`src/lib/RotatingCube.svelte` deliberately diverges from the source spec in
one way: it's a **real 27-cubie Rubik's cube** with a classic **six-color**
scheme (pink / off-white / gold / charcoal / teal / violet, one per face
direction) and genuine layer twists, rather than the source's two-tone
single-textured cube with brand glyphs. It runs a scramble → rest → solve
→ rest loop (14 moves, recorded and replayed inverted so it returns to
solved with no drift), plus auto-tumble, drag-to-spin, and pointer parallax
on the whole assembly.

Key implementation details for whoever extends this:
- `UNIT` / `CUBIE` constants control cubie spacing/size (gap = UNIT - CUBIE).
- Stickers are canvas-generated textures (`makeStickerTexture`), cached per
  color; non-exterior faces reuse a single shared plastic texture.
- Layer twists use exact integer grid rotation (`rotateGrid`) so repeated
  twists never accumulate floating-point drift — logical cubie position is
  tracked separately from the rendered `mesh.position`/`quaternion`.
- The scramble history is stored and replayed in reverse with inverted
  direction to solve exactly, rather than re-scrambling toward a fresh
  random solved-looking state.

## TODO / replication checklist

To bring the page in line with the full source spec:

- [ ] Header bar component (3-block strip: brand lockup, trend tag, logo)
- [ ] Footer bar component (party callout + Suzhou label + mini cube mark)
- [ ] Floating heart / share-arrow icons
- [ ] Headline typography block (eyebrow, CRUSH/ON/BOW stack, subhead,
      bilingual tagline), laid out so the cube overlaps it (`z-index`,
      negative margins or `position: absolute` for the `<RotatingCube>`)
- [ ] Pick/license real display typeface for the headline (source uses a
      tight-tracked black grotesk — something like Archivo Black or a
      similar condensed sans)
- [ ] Decide whether to keep the six-color "real Rubik's cube" or switch
      the cube back to the source's two-tone + brand-glyph look
- [ ] Responsive layout beyond the current centered square stage in
      `App.svelte`

## Development

```bash
npm install
npm run dev      # start dev server
npm run build     # production build
npm run preview   # preview the production build
```

## Project structure

```
src/
  App.svelte              # page shell, mounts the cube stage
  app.css                 # global styles (currently empty)
  lib/
    RotatingCube.svelte   # Three.js hero object (see Implementation notes)
  main.js                 # Svelte app entry point
```
