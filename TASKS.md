# Out of Office — Agent Task Board

> **Protocol for agents:**
> 1. `git fetch` + `git pull` before reading this file — another agent may have updated it
> 2. Pick an unclaimed item (`[ ]`), change it to `[~] In progress — <brief description> — <date>`
> 3. Commit + push the TASKS.md change **before** starting the code work (so other agents see it claimed)
> 4. When done, change to `[x]` and commit with the implementation

Legend: `[ ]` not started · `[~]` in progress · `[x]` done

---

## P0 — Explicit brief items that were simply never built

- [x] **"Activate Auto Reply →" CTA button** in the hero — exact button from brief added right under the hero tagline, smoothly scrolling user down into the 220vh activated zone.
- [x] **Notification counter** (999+ → 412 → 87 → 12 → 0 muted) wired directly to `progress` in the hero headline (`App.svelte`).
- [x] **Boat animation** — horizontal scroll-tied boat crossing the screen, representing arrival at Tarkwa Bay (danfo bus = leaving, boat = arriving). The two take turns crossing the hero.
- [x] **Scene 1 chaos-desktop layer** — Slack/WhatsApp/calendar/battery-low/email popups overlaid in the hero (`ChaosLayer.svelte`) that scatter, blur, and dissolve (`opacity: 1 - progress * 1.85`) as the cube solves.

---

## P1 — Cube narrative decisions / interaction gaps

- [x] **Click-cube easter egg** — click counter in `RotatingCube.svelte`; at 10 clicks triggers an Auto-Reply Generator modal overlay with copyable, Lagos-themed/OOO auto-reply quotes.
- [x] **Cube idle / sleep mode** — after 5s of no pointer movement, cube dims and enters a gentle breathing scale + zZz sleep badge. Resets immediately on pointer movement or drag.
- [x] **OOO favicon / logo** — replaced default Vite scaffold favicon with an isometric 3D cube mark SVG featuring brand colors, heart decal, ocean wave, and OOO dots (`public/favicon.svg`).
- [ ] **Concept 4 architectural decision** — cube as persistent cross-section progress tracker (one face solves per section visited: Escape/Community/Activities/Memories/Playlist/Tickets). Needs design decision before more sections are added. If yes, cube must persist/reappear across scroll; current one-shot-hero pattern does not support this.
- [x] **Dissolving UI layer alongside cube solve** — digital clutter UI (`ChaosLayer.svelte`) decays *simultaneously* with the cube unscrambling and notification count reaching 0.

---

## P2 — Visual-metaphor fidelity (currently shallow nods)

- [x] **Boarding pass UI** — redesigned Tickets section (`Tickets.svelte`) as an authentic, tactile boarding pass (`LOS → OOO` route, perforated tear notch, gate `TB-01`, `OOO-2026` flight header, and barcode stub).
- [x] **Passport stamp graphics** — `MemoryTimeline.svelte` OOO 001/002/003 badges redesigned as circular ink-stamp visuals (double ring, dashed outer border, rotated, per-event color) replacing the plain rounded-rect text badges.
- [x] **Glassmorphism** — frosted glass panel (`backdrop-filter: blur(14px) saturate(160%)`) added behind the docked floating cube (`App.svelte` `.cube-floating-container.is-floating::before`) — the one place a translucent-canvas UI element makes it read as an affordance rather than decoration.
- [x] **"Life is messy. Like a scrambled cube."** — added as `.activated-note` right under the "Out of Office Activated" reveal, styled in marker font — the natural landing spot since it's literally the moment the cube finishes unscrambling.

---

## P3 — Content gaps

- [ ] **Real community / attendee photos** — Community section currently uses event flyers as polaroid stand-ins. Replace with real disposable-camera-style candid photos when available.
- [ ] **Playlist tracks** — currently 5 fictional tracks. Replace with a real curated list or link to a real Spotify/Apple Music playlist.
- [x] **OG image** — added `public/og-image.jpg` (1200×630), reusing the favicon's isometric cube mark for brand consistency.

---

## P4 — Motion and typography systems (bigger lifts)

- [x] **Scroll-reveal animations on sections** — EscapeMetrics, Community, MemoryTimeline, Playlist, Tickets wrapped with `ScrollReveal.svelte` using `IntersectionObserver` for fade/rise entry transitions.
- [x] **Typography transformation** (2026-07-13) — `MorphText.svelte` + `scrollProgress.js` (a whole-document scroll-fraction store, separate from the hero-only `progress`) crossfade each post-activation section's eyebrow label from tracked-out grotesk caps to lowercase Permanent Marker script as the *page*, not just the hero, scrolls — genuinely continuous and driven by scroll depth, not a fixed per-element font assignment. Wired into Postcard, EscapeMetrics, Community, MemoryTimeline, Playlist, and Tickets; hero/activated eyebrows deliberately left corporate since that's the "before" state the brief describes. `boost` prop lets later sections (Playlist, Tickets) lean handwritten sooner than raw page fraction alone would give.
- [x] **Ticket/zine layout devices** — added `ZineDecorations.svelte` with vertical spine text, care-label icon row, and brand sticker elements (`docs/brand-reference/` flyers).
- [x] **Sunset-orange / warm-sand colour arc** (2026-07-13) — added `--chaos-yellow`/`--chaos-red` (mainland/pre-activation) and `--sunset-orange`/`--warm-sand`/`--muted-green` (escape/post-activation) to `app.css`. Chaos colors drive the notification pill's red→yellow→blue taper as `progress` climbs (`App.svelte` `notifStage`). Escape colors are woven into `EscapeMetrics` stat tiles, `MemoryTimeline` passport-stamp colors, and a warm-sand radial wash behind `Tickets`. Flyer-sampled blue/pink/teal stays the brand-identity layer (header, wordmark, CTA); it was never replaced, just no longer the only palette in play. Resolves the open question from the first audit (P4 #18).

---

## ✅ Done (do not re-implement)

- [x] Scroll-driven cube solve (Concept 1) — `progress` prop, 220vh sticky track
- [x] Boot sequence — lines, wave rise, dark overlay (verbatim from brief)
- [x] Escape Metrics section (87 emails, 62% stress, ∞ friendships, 100% battery)
- [x] Memory Timeline — OOO 001 / 002 / 003 with Bungee stamps
- [x] Community polaroids (real flyers as stand-ins)
- [x] Playlist section (fictional tracks, real structure)
- [x] Tickets CTA — real `tix.africa` URL
- [x] Postcard section — "Greetings from Out of Office" reference image
- [x] Danfo bus animation (leaving-Lagos metaphor)
- [x] Cube idle/tumble + pointer parallax (always-moving, responds to cursor)
- [x] Self-hosted fonts — all 5 families in `public/fonts/`
- [x] 16:9 landscape hero card — replaced portrait phone-card
- [x] Blue/pink/teal palette blended into cube gradient (superseded
  2026-07-13 by six solid per-face brand colors, see below)
- [x] **Cube color rework** (2026-07-13) — replaced the blue/cream
  checkerboard with six solid brand-palette colors, one per face
  (`FACE_COLORS` in `RotatingCube.svelte`), fixing the "solved still
  reads as a checkerboard, not a clean color" legibility gap from the
  first audit. Every tile also blends toward chaos-yellow/chaos-red by
  `chaosT = appliedCount / SCRAMBLE_COUNT` (or `history.length /
  SCRAMBLE_COUNT` in autonomous mode), so the cube itself — not just the
  page chrome — visibly calms from chaos noise to clean brand color as
  it solves. Repainted via a cheap `repaint(chaosT)` closure over the
  existing canvas/texture at each twist completion, not a full
  texture-recreation per frame.
- [x] SEO meta tags — title, description, og:*, twitter:*
- [x] `prefers-reduced-motion` — all animations suppressed
- [x] `aria-live` on boot sequence, `sessionStorage` skip on return visits
- [x] `:focus-visible` on icon buttons and CTA
- [x] Body baseline — `line-height`, antialiased, `text-rendering`
- [x] Polaroid `aspect-ratio: 9/16` matching real flyer proportions
- [x] Project SKILL.md for agents (`.gemini/skills/out-of-office-project/`)
- [x] Merge-artifact cleanup (2026-07-13) — removed the duplicate `<Boat />`
  instance and the duplicate notification-badge/notification-pill UI in
  `App.svelte`; deleted dead `DigitalClutter.svelte` (superseded by
  `ChaosLayer.svelte`, which was still imported and rendering).
- [x] `ChaosLayer` hero collisions — repositioned WhatsApp/Mail cards to
  clear `HeaderBar` and the icon buttons on desktop; hid WhatsApp + Mail
  on mobile alongside the already-hidden Slack/Calendar, since they were
  clipping the notification pill. Verified via screenshot + bounding-box
  checks at 1280×900 and 390×844.
- [x] Boat/cube mobile collision — `Boat.svelte` now drops to `bottom: 2%`
  under `max-width: 700px` so it clears the cube in the stacked layout.
- [x] Reduced-motion for the Three.js cube — the autonomous idle
  tumble/breathing in `RotatingCube.svelte` is now gated behind
  `matchMedia('(prefers-reduced-motion: reduce)')`; drag-to-spin and the
  scroll-driven solve twists are untouched since those are user-initiated.
  Verified: zero pixel diff across 800ms with reduced-motion emulated,
  full-frame diff without it.
- [x] **Taste pass** (2026-07-13) — user rated the site 5/10 and asked for
  a critical pass on quality, not more features, before anything else
  gets added. Fixes:
  - Cube grounding: seam color was `#f6f4f1`, identical to the page's own
    `--bg`, so the "hero object" had almost no contrast edge and visually
    thinned into the background. Changed seam to pure white and added a
    soft blue/pink glow behind `.cube-slot`; also grew the cube's on-screen
    size (`clamp(150px,20vw,260px)` → `clamp(200px,27vw,340px)`).
  - Cut the heart icon-button (pure decoration, no favorite/save function
    ever existed behind it) and the redundant flower sticker in
    `ZineDecorations.svelte` (competed with `HeaderBar`'s own OOO mark for
    the same top-right corner). Wired the share icon-button to
    `navigator.share`/clipboard-copy instead of leaving it inert, so it's
    the one piece of hero chrome that now does something real.
  - `ChaosLayer.svelte` cards used to sit in four separate corners with
    generous gaps — tidy, not chaotic. WhatsApp/Slack and Email/Calendar
    now overlap each other in two piles with more rotation variance, so it
    reads as a stack of competing alerts instead of four neatly placed
    widgets.
  - Not done in this pass, flagged as still open: the six-color cube
    palette itself hasn't been re-judged for whether saturated/pastel is
    the right call, and the header's own 3-block strip vs. `ZineDecorations`'
    barcode+spine+splats still hasn't been consolidated into one visual
    language — see the live site before deciding either is done.
