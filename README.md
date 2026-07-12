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
scramble/solve loop, styled with the source video's sampled pink/white
palette, checkerboard stickers, face-spanning glyph decals, and glossy
lighting. See [Implementation notes](#implementation-notes) for how it's
built and what's still approximated rather than exact.

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
This is the piece that's implemented so far — see
[Matching the source cube's look](#matching-the-source-cubes-look) for the
full lighting/color/material breakdown, sampled directly from video frames.
- Cube reads as a Rubik's-style puzzle, but **only uses two hues** (magenta
  pink + white), not six — it stays on-brand rather than reading as a toy.
- Each sticker tile is **checkered pink/white**, and on top of that
  checkerboard sits **one large, soft-edged, semi-transparent brand glyph**
  per face (heart outline, butterfly silhouette, ring/smile motif) that
  spans multiple cubies like a projected decal, not a per-tile icon.
- **Positioned absolutely over the headline text**, larger than its column
  — it visually breaks the grid (overlaps "ON" above, "BOW" below), which
  is what sells the "floating 3D object" effect rather than an inline image.
- **Motion**: continuous multi-axis tumble (not single-axis spin), heavier
  and more physical than a simple Y rotate, with visible motion blur on
  fast-moving edges.
- **Finish**: glossy plastic/candy-coat, not matte — strong gradient shading
  across each facet and blown-out specular hotspots, rather than flat color
  fills. No strong cast shadow is visible under the cube in the source
  frames — the background stays a flat, uniform gray.

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

## Matching the source cube's look

The current `RotatingCube.svelte` cube does **not** match the source video —
it's flatter, more evenly lit, and uses six arbitrary hues instead of the
source's cohesive pink/white scheme. This section documents exactly what
needs to change, based on pixel sampling of the actual video frames (not
guesswork), so it's actionable without re-watching the clip.

### Color — sampled swatches
Colors below were averaged from small patches on decompressed video frames
(`ffmpeg -vf fps=2`, then sampled with Pillow). The source is a compressed,
motion-blurred phone video, so treat these as a target *range*, not exact
brand hex values:

| Region | Sampled hex | Notes |
|---|---|---|
| Background | `#e4e4e4` | flat, uniform, no visible gradient or vignette |
| Pink cubie, lit | `#f5c3e1` – `#f7a6d0` | light, slightly desaturated pink where the key light hits |
| Pink cubie, shadowed | `#c4467b` – `#c44f80` | same hue, deeper and more saturated in shadow — **it's one pink hue shading light→dark, not two different pinks** |
| White cubie | `#f2ecee` – `#ffffff` | reads as white but pulls very slightly warm/pink from bounce light |
| Specular hotspot | `#ffffff` (blown out) | small, sharp, on the top-lit facet edges |
| Glyph decal overlay | `#e086b0` | mid pink, sits at ~50–60% opacity over the checkerboard beneath it |

Key takeaway: **each facet is a gradient, not a flat fill** — the same pink
hue runs from a light, slightly washed-out pink at the top-left (toward the
key light) down to a deep saturated magenta in shadow, plus a hard white
specular bloom. The current implementation's flat `MeshStandardMaterial`
per sticker with ambient + one directional light reads much flatter than
this because there's no per-facet gradient and no strong specular response.

### Sticker pattern & decals
- Every face is a **checkerboard of pink and white tiles** (alternating per
  cubie), not one solid color per face like a real Rubik's cube and not the
  single-icon-per-face approach currently implemented.
- On top of the checkerboard, each face carries **one oversized brand glyph**
  (heart / butterfly / ring-smile) rendered soft-edged and semi-transparent,
  large enough to span most of the 3×3 grid rather than sit inside one tile.
  It reads like a decal projected over the sticker grid, letting the
  checkerboard show through faintly.
- Seams between cubies are **bright/light, not dark** — thin highlighted
  bevel lines catching specular light, which is a big part of why it reads
  as glossy candy-like plastic rather than a physical toy with black gaps.
  The current implementation's dark plastic base color between stickers
  works against this — it should be light/white, not `#141416`.

### Geometry
- Cubie corners and edges are **visibly rounded**, not sharp — soft
  highlight curvature is visible along every edge. Uses `RoundedBoxGeometry`
  from `three/examples/jsm/geometries/`. It extends `BoxGeometry` and never
  reassigns `this.groups`, so the original 6 per-face material groups (set
  up index-based by the `super()` `BoxGeometry` call) survive the
  indexed→non-indexed conversion unchanged — multi-material cubies work with
  it with no extra plumbing needed.
- Cubie gap should stay small — the source cube reads as almost seamless,
  with the "gap" mostly expressed as a highlight bevel rather than a visible
  dark gutter.

### Lighting & shading
- One large, soft **key light from the upper-left/front**, strong enough to
  blow out small specular highlights on lit edges.
- A gentle **fill light** keeps shadow-side facets from going near-black —
  they bottom out around the deep magenta swatch above, not black.
- No strong rim/back light needed; the "glow" on far edges in the video is
  more likely fill light + the glossy material's specular response than a
  dedicated rim light.
- To get this in three.js: use `MeshPhysicalMaterial` (not
  `MeshStandardMaterial`) with low `roughness` (~0.2–0.35) and a touch of
  `clearcoat` (~0.3–0.5) for the glossy plastic response, one large soft key
  `DirectionalLight` or `RectAreaLight`, one dim fill light, and bake the
  light→dark gradient directly into each sticker's canvas texture (radial
  or diagonal gradient from light pink to deep magenta) rather than relying
  on flat-color materials plus real-time lighting alone — the source's look
  is closer to a pre-lit/baked gradient than a physically simulated one.
- No visible ground-contact shadow needs to be added — keep the background
  flat, matching the source.

### Motion
- The tumbling motion itself (multi-axis, weighted) is already a reasonable
  match. What's missing is the **motion blur** on fast-moving edges in the
  source clip — a real render/camera artifact. This is the lowest-priority
  item: three.js has no built-in motion blur, and faking it well needs a
  velocity buffer + post-process pass (or a cheaper trick like a trailing
  ghost mesh with fading opacity). Treat as a nice-to-have, not a blocker.

### Summary of concrete changes needed
1. Swap the six-color-per-direction scheme for the sampled pink/white
   palette above.
2. Checkerboard the stickers per face instead of one flat color per cubie.
3. Replace per-tile icons with one large soft-edged translucent glyph per
   face, spanning multiple cubies.
4. Bake a light-to-dark gradient into each sticker texture rather than
   flat-filling it.
5. Change the inter-cubie seam/base color from dark plastic to light/white.
6. Round the cubie edges (rounded-box geometry).
7. Switch to `MeshPhysicalMaterial` with low roughness + clearcoat, and
   restructure lighting to one soft key + one dim fill (no rim light).
8. (Optional/last) approximate motion blur on fast tumbles.

## Implementation notes

`src/lib/RotatingCube.svelte` is a **real 27-cubie Rubik's cube** with
genuine layer twists, using the pink/white palette and material approach
from [Matching the source cube's look](#matching-the-source-cubes-look)
rather than a generic six-color scheme. It runs a scramble → rest → solve
→ rest loop (14 moves, recorded and replayed inverted so it returns to
solved with no drift), plus auto-tumble, drag-to-spin, and pointer parallax
on the whole assembly.

How the source look is approximated:
- **Checkerboard + gradient stickers**: `makeTileTexture(i, j, decalKey)`
  generates one canvas texture per sticker (54 total — one per exterior
  cubie face). Each tile alternates pink/white by `(i + j) % 2`, and its
  fill is a `LIGHT_PINK → DEEP_PINK` (or white equivalent) linear gradient
  defined in whole-face ("atlas") coordinates, then the canvas is
  `translate()`-shifted so only that tile's window gets drawn — this is
  what makes the gradient and the big glyph decal (see below) continue
  seamlessly from tile to tile without needing a real texture atlas.
- **Face-spanning decals**: `drawHeart` / `drawRing` / `drawBowtie` draw
  one big shape per face (mapped via `FACE_AXES[dir].decal`) at whole-face
  scale, semi-transparent, so it reads as a decal sitting over the
  checkerboard rather than a per-tile icon.
- **Bright seams**: the base/seam color (`SEAM`) and interior (non-exterior)
  faces are light (`#f4eef1`), not dark plastic, and each sticker gets a
  translucent white stroke around its rounded-rect inset to fake the bright
  bevel highlight seen in the source.
- **Glossy material + lighting**: stickers use `MeshPhysicalMaterial` with
  low roughness and clearcoat for a candy-plastic specular response, lit by
  a close `PointLight` (its falloff is what produces the specular hotspot
  blob and reinforces the baked gradient) plus a dim fill `DirectionalLight`
  and ambient. Three.js's physically-based light units meant the first pass
  at these intensities rendered almost flat gray — the working values here
  are tuned relatively high (e.g. key `PointLight` intensity `60`) alongside
  `ACESFilmicToneMapping`; if you change light setup, re-check against a
  screenshot rather than assuming "reasonable-looking" intensity values.
- **Rounded cubie edges**: `RoundedBoxGeometry(CUBIE, CUBIE, CUBIE, 3, CUBIE * 0.12)`
  replaces the flat `BoxGeometry`, giving each cubie soft, highlight-catching
  corners. Verified via screenshots that all 6 sticker materials still land
  on the correct faces after the switch.
- **Not attempted**: real motion blur on fast twists — noted as
  lower-priority in the matching-the-look section above.

Other implementation details for whoever extends this:
- `UNIT` / `CUBIE` constants control cubie spacing/size (gap = UNIT - CUBIE);
  the gap is intentionally small/near-seamless to match the source.
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
- [x] Rework the cube's material/color/lighting to match the source — see
      [Matching the source cube's look](#matching-the-source-cubes-look)
      and [Implementation notes](#implementation-notes) for what changed
      (checkerboard gradient stickers, face-spanning decals, bright seams,
      glossy `MeshPhysicalMaterial`, rounded cubie edges). Still open:
      real motion blur on fast twists, noted as lower priority above.
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
