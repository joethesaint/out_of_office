# Out of Office — Lagos escape brand site

A Svelte 5 + Three.js site for **Out of Office**, a real Lagos event brand
(events so far: "The Post-NYSC Hangout" at Tarkwa Bay Beach, and "Open
Canvas" at Jaekel House Garden — flyers in `docs/brand-reference/`). The
project started as a technical prototype cloned from an unrelated Pinterest
video (a rotating Rubik's cube — see [Legacy: Pinterest cube prototype](#legacy-pinterest-cube-prototype)
for that history) and is now being re-skinned to the real Out of Office
brand. The cube mechanics (real 27-cubie twists, scramble/solve, glossy
material technique) carry over; the **colors, typography, and narrative
concept** are being replaced with the real brand described below.

## Status

scramble/solve loop, recolored to the Out of Office brand palette (see
[Brand identity](#brand-identity-out-of-office-lagos)) instead of the
original Pinterest-derived pink/white. Also built (structure from a
concurrent branch, content re-skinned to the real brand in this merge):
header bar, footer bar, floating heart/share icons, and a headline
typography block with the cube overlapping the wordmark, in `App.svelte` +
`src/lib/HeaderBar.svelte` + `src/lib/FooterBar.svelte`. See
[Implementation notes](#implementation-notes) for how it's built.

**Not built**: the full multi-section site described in
[Brand identity](#brand-identity-out-of-office-lagos) and
[Cube narrative](#cube-narrative) — boot/auto-reply sequence, scroll-linked
cube solving, escape metrics, community/polaroids, memory timeline,
playlist, tickets. Also not done: font self-hosting if this ships publicly
(currently loaded from Google Fonts). See
[TODO](#todo--replication-checklist).

## Brand identity: Out of Office (Lagos)

### Positioning

Out of Office is not selling a beach hangout — it's selling **permission to
disconnect**. In Lagos, "out of office" doesn't mean "I'm travelling to
Santorini," it means "I'm intentionally disconnecting from Lagos madness for
a moment": the traffic, the hustle, the notifications, the pressure to
always grind. The brand's core line:

> Auto-reply for real life. I am currently away from emails,
> responsibilities, and Lagos stress. I will return when my soul battery is
> charged.

The site should feel like **leaving yellow Lagos and entering blue Lagos** —
mainland chaos (danfos, deadlines, notifications) traded for island/coastal
reset (ocean sounds, slower time, community, no hierarchy). Concretely this
plays out as: **Mainland** (leave: traffic, deadlines, stress) →
**Island/Escape** (arrive: community, music, art, rest).

### Real events (for the memory-timeline / "OOO 00X" numbering)

- **OOO 001 — Open Canvas**, Jaekel House Garden, outdoor painting, ₦5,000
  (`docs/brand-reference/flyer-open-canvas-jaekel-house.png`)
- **OOO 002 — The Post-NYSC Hangout**, Tarkwa Bay Beach, 11 April 2026,
  12pm till daybreak (`docs/brand-reference/flyer-post-nysc-hangout-tarkwa-bay.png`)
- A "Save the Date" teaser for a follow-up outdoor painting event
  (`docs/brand-reference/flyer-save-the-date-painting.png`)

These three flyers are the actual, currently-in-use brand assets — treat
them as ground truth over anything invented earlier in this doc.

### Color palette — sampled from the flyers

| Role | Sampled hex | Source |
|---|---|---|
| Wordmark blue | `#00bfff` | "Out of Office" logotype, Tarkwa Bay flyer |
| Teal (mid) | `#37999d` – `#59b7b0` | "Save the Date" handwritten text/calendar |
| Teal (vivid, paint) | `#08cabd` | "Open Canvas" paint-stroke photo |
| Paper/cream background | `#f6f4f1` – `#f6f6f6` | consistent across all three flyers |
| Pink accent (splat) | `#fc9ce0` | paint-splat graphics |
| Yellow-green accent (paint) | `#c2c100` | "Open Canvas" paint-stroke photo |
| Ink | near-black, e.g. `#181818` | body copy, serif headline |

This **replaces** the pink/white palette in
[Legacy: Pinterest cube prototype](#legacy-pinterest-cube-prototype) — the
cube should be recolored to blue/teal/cream, not pink/white.

### Typography direction

The flyers use three distinct type treatments; none of the exact typefaces
are known/licensed, so use close free equivalents:

- **Wordmark / big headline** ("Out of Office"): bold, rounded, tall
  x-height display sans with a slight italic lean — approximate with
  **Fredoka** or **Baloo 2** (bold/black weight).
- **Sub-event names** ("Open Canvas"): elegant, high-contrast serif —
  approximate with **Playfair Display** or **Fraunces** (black weight).
- **Tags / date badges** ("MAY 30TH", "The Post-NYSC Hangout" pixel logo):
  blocky, rounded-pixel arcade display face — approximate with **Bungee**.
- **Handwritten notes** ("Save the Date!!", "D-day!!"): bold marker/brush
  script — approximate with **Permanent Marker** or **Caveat** (bold).
- **Body/meta copy** (dates, times, fine print, vertical spine labels):
  plain, confident grotesk — approximate with **Inter** or **Space Grotesk**.

### Texture & layout devices

- Flat cream/paper background (`#f6f4f1`), with a **subtle grain/noise**
  texture on handwritten and paint sections (fake via SVG `feTurbulence`,
  no image asset needed) — not on the clean ticket-style sections, which
  stay flat.
- Ticket/zine layout devices seen across the flyers: vertical spine text
  rotated 90° along page edges (dates, venue, "terms and conditions
  apply"), a barcode graphic, a QR code with the brand mark inset, small
  "care label"-style icon rows, plus-sign (`+`) accents, smiley-flower
  stickers, and paint-splat graphics as scatter decoration.
- Numbered stamps for each event/memory: `OOO 001`, `OOO 002`, `OOO 003`…

## Cube narrative

Of the five cube concepts discussed, **Concept 1 — the cube solves itself
as you scroll** is the chosen direction: the cube starts fully scrambled
(representing Lagos-life chaos/complexity), and as the user scrolls down
the page, notifications/traffic-sound UI fades away and the cube
progressively un-scrambles. At full scroll, one face reads solved and
"OUT OF OFFICE ACTIVATED" reveals — the moment of disconnecting.

**Not implemented yet.** The current cube still runs its own autonomous,
time-based scramble → rest → solve → rest loop (see
[Implementation notes](#implementation-notes)) — this round of work only
recolored it to the brand palette. Wiring it to scroll instead of time is
future work; the mechanism would be:
- Replace `nextTwistAt`/time-driven `queueNextTwist` with a **scroll
  progress value** (0 = top of page/fully scrambled, 1 = bottom/solved).
- Pre-generate the scramble move list once (as today), then instead of
  playing moves on a timer, map scroll progress directly to "how many moves
  into the solve sequence" — i.e. drive `t` in `updateTwist` from scroll
  delta instead of `performance.now()`.
- This requires an actual scrollable page (the current `App.svelte` is a
  single fixed viewport) — out of scope until the multi-section site scope
  is picked up.

## Legacy: Pinterest cube prototype

*Superseded by [Brand identity](#brand-identity-out-of-office-lagos) above
— kept as a reference for the cube's underlying build technique
(checkerboard/gradient stickers, face-spanning decals, glossy material,
rounded edges, twist motion blur), not for its color palette or narrative.*

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

## Matching the source cube's look (legacy, technique reference only)

*The color values in this section are Pinterest/BOW-derived and have been
superseded by the [Brand identity](#brand-identity-out-of-office-lagos)
palette above. Keep this section for the reusable **technique** — baked
per-tile gradients, face-spanning decals, bright seams, glossy material,
rounded geometry, twist motion blur — which the brand-recolor reuses
directly, just with different hex values.*

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
  match. The **motion blur** on fast-moving edges in the source clip is
  implemented as trailing ghost meshes (see [Implementation notes](#implementation-notes))
  rather than a true velocity-buffer post-process pass, which three.js
  doesn't provide out of the box.

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
genuine layer twists, using the Out of Office blue/cream palette (see
[Brand identity](#brand-identity-out-of-office-lagos)) and the
checkerboard/gradient/decal material technique originally developed for
[Matching the source cube's look](#matching-the-source-cubes-look-legacy-technique-reference-only)
against the Pinterest video — the technique carried over, the colors did
not. It runs a scramble → rest → solve → rest loop (14 moves, recorded and
replayed inverted so it returns to solved with no drift), plus auto-tumble,
drag-to-spin, and pointer parallax on the whole assembly.

How the brand look is built:
- **Checkerboard + gradient stickers**: `makeTileTexture(i, j, decalKey)`
  generates one canvas texture per sticker (54 total — one per exterior
  cubie face). Each tile alternates blue/cream by `(i + j) % 2`, and its
  fill is a `LIGHT_BLUE → DEEP_BLUE` (or cream equivalent) linear gradient
  defined in whole-face ("atlas") coordinates, then the canvas is
  `translate()`-shifted so only that tile's window gets drawn — this is
  what makes the gradient and the big glyph decal (see below) continue
  seamlessly from tile to tile without needing a real texture atlas.
- **Face-spanning decals**: `drawHeart` / `drawRing` / `drawBowtie` draw
  one big shape per face (mapped via `FACE_AXES[dir].decal`) at whole-face
  scale, semi-transparent — white on blue tiles, brand teal
  (`rgba(8,202,189,…)`) on cream tiles — so it reads as a decal sitting over
  the checkerboard rather than a per-tile icon.
- **Bright seams**: the base/seam color (`SEAM`, paper cream `#f6f4f1`) and
  interior (non-exterior) faces are light, not dark plastic, and each
  sticker gets a translucent white stroke around its rounded-rect inset to
  fake a bright bevel highlight.
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
- **Motion blur on twists**: each cubie gets 3 extra "ghost" meshes
  (`TRAIL_STEPS`, defined by `lagMs`/`opacity` pairs), created once at
  startup with cloned transparent materials sharing the same textures
  (`gm.transparent = true`, `depthWrite = false`, `opacity` driven per
  frame) and `visible = false` until needed. During a twist, each ghost's
  transform is computed by **re-evaluating the twist's motion function at
  an earlier timestamp** (`now - lagMs`) rather than recording a runtime
  history buffer — since a cubie's position during a twist is a pure
  function of elapsed time (`theta = dir * (PI/2) * easeInOutQuad(t)`), the
  "position N ms ago" is just that same function called with an earlier
  `t`. Opacity is further scaled by `sin(t * PI)` so the blur peaks mid-twist
  (where angular speed is highest under the ease curve) and fades out near
  the start/end of the move, and all ghosts are hidden (`visible = false`)
  the instant a twist completes, so there's zero render cost while idle.

Other implementation details for whoever extends this:
- `UNIT` / `CUBIE` constants control cubie spacing/size (gap = UNIT - CUBIE);
  the gap is intentionally small/near-seamless to match the source.
- Layer twists use exact integer grid rotation (`rotateGrid`) so repeated
  twists never accumulate floating-point drift — logical cubie position is
  tracked separately from the rendered `mesh.position`/`quaternion`.
- The scramble history is stored and replayed in reverse with inverted
  direction to solve exactly, rather than re-scrambling toward a fresh
  random solved-looking state.

`src/App.svelte` and `index.html` carry the rest of the rebrand: cream
(`#f6f4f1`) background with a low-opacity SVG `feTurbulence` grain layer
(no image asset — generated inline as a data URI), the "Out of Office"
wordmark set in **Fredoka** (bold, brand blue `#00bfff`) with **Space
Grotesk** for the eyebrow/tagline, both loaded via a Google Fonts `<link>`
in `index.html`. (If a headless/sandboxed environment can't reach
`fonts.googleapis.com`, the fonts fail closed to the `system-ui` fallback
declared in each `font-family` — verify against a real browser, not just a
sandboxed headless one, before concluding fonts are broken.)

## TODO / replication checklist

- [x] Recolor the cube from the legacy pink/white palette to the Out of
      Office blue/teal/cream palette (see
      [Brand identity](#brand-identity-out-of-office-lagos)) — same
      checkerboard/gradient/decal/glossy technique, new hex values.
- [x] Swap the page background from the legacy dark theme to brand cream,
      with a subtle SVG-noise grain texture.
- [x] Header bar, footer bar, and floating heart/share icons — structure
      reused from the earlier Pinterest-spec build (`HeaderBar.svelte`,
      `FooterBar.svelte`), content and colors replaced with real Out of
      Office copy (see [Implementation notes](#implementation-notes)).
- [x] Headline typography block: "OUT / OF / OFFICE" wordmark stack, cube
      anchored at the OF/OFFICE boundary (same anchoring technique as the
      original CRUSH/ON/BOW build — cube stays put regardless of
      tagline/subhead height), subhead referencing the next real event,
      tagline "Release. Unwind. Reconnect."
- [x] Typography: Fredoka (rounded display, wordmark/headline) + Space
      Grotesk (body/labels/tags), per the
      [Brand identity](#brand-identity-out-of-office-lagos) direction —
      replaces the Archivo Black + Inter used in the Pinterest-spec build.
- [x] Responsive layout: centered phone-frame card on wide viewports, true
      full-bleed single viewport under 480px width (kept from the
      Pinterest-spec build).
- [ ] Wire the cube's scramble/solve to scroll progress instead of an
      autonomous timer — see [Cube narrative](#cube-narrative) for the plan.
      Needs an actual scrollable page first.
- [ ] Boot/auto-reply loading sequence ("Sending auto-reply… ✓ Emails
      muted… ✓ Notifications paused… Redirecting to Out of Office…") before
      the hero, fading into ocean ambience.
- [ ] Full multi-section site: escape metrics, community/polaroids, memory
      timeline (`OOO 001`, `OOO 002`, …), playlist, tickets — see
      [Brand identity](#brand-identity-out-of-office-lagos) for the section
      list and copy direction.
- [ ] Ticket/zine layout devices beyond what's in the header/footer: full
      vertical spine text, barcode, QR code, care-label icon row,
      smiley-flower stickers, paint-splat scatter graphics (see flyers in
      `docs/brand-reference/`).
- [ ] Self-host the Fredoka/Space Grotesk fonts if this ships publicly
      (currently loaded from Google Fonts via `index.html`).

### Legacy Pinterest-spec items (superseded, kept for context)

- [x] ~~Header bar component (3-block strip: brand lockup, trend tag,
      logo)~~ — structure kept, content replaced (see rebrand items above).
- [x] ~~Footer bar component (party callout + Suzhou label + mini cube
      mark)~~ — structure kept, content replaced.
- [x] ~~Floating heart / share-arrow icons~~ — kept, recolored to brand.
- [x] ~~Headline typography block (eyebrow, CRUSH/ON/BOW stack, subhead,
      bilingual tagline)~~ — structure kept, replaced with the Out of
      Office wordmark/copy above.
- [x] Rework the cube's material/color/lighting to match the *Pinterest*
      source — done; palette has since been superseded by the rebrand item
      above, but the technique (checkerboard gradient stickers,
      face-spanning decals, bright seams, glossy `MeshPhysicalMaterial`,
      rounded cubie edges, twist motion blur) carries forward unchanged.

## Development

```bash
npm install
npm run dev      # start dev server
npm run build     # production build
npm run preview   # preview the production build
```

## Project structure

```
docs/
  brand-reference/        # real Out of Office event flyers (ground truth
                           # for brand identity — see that section)
src/
  App.svelte              # page shell: phone-frame, header/footer, headline
                           # stack, cube stage, grain texture
  app.css                 # fonts (Fredoka/Space Grotesk), brand color variables
  lib/
    HeaderBar.svelte      # 3-block header strip
    FooterBar.svelte      # footer callout + fine print
    RotatingCube.svelte   # Three.js hero object (see Implementation notes)
  main.js                 # Svelte app entry point
index.html                 # Google Fonts (Fredoka, Space Grotesk) loaded here
```
