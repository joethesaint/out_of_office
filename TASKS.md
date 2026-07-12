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

- [ ] **Boarding pass UI** — redesign Tickets section as an actual boarding-pass-shaped component (stub/perforation, gate-and-seat-style fields, "Destination: Out of Office"), not just a label over a pill button.
- [ ] **Passport stamp graphics** — redesign OOO 001/002/003 timeline badges as ink-stamp / circular stamp visuals rather than plain rounded-rect text badges.
- [ ] **Glassmorphism** — the moodboard lists it; never appeared anywhere on the site. Consider for at least one section.
- [ ] **"Life is messy. Like a scrambled cube."** — this line was explicitly flagged as reusable brand copy in the brief; never used as displayed copy anywhere yet.

---

## P3 — Content gaps

- [ ] **Real community / attendee photos** — Community section currently uses event flyers as polaroid stand-ins. Replace with real disposable-camera-style candid photos when available.
- [ ] **Playlist tracks** — currently 5 fictional tracks. Replace with a real curated list or link to a real Spotify/Apple Music playlist.
- [ ] **OG image** — `og-image.jpg` is referenced in `index.html` meta tags but the file doesn't exist yet. Create a branded 1200×630 image.

---

## P4 — Motion and typography systems (bigger lifts)

- [x] **Scroll-reveal animations on sections** — EscapeMetrics, Community, MemoryTimeline, Playlist, Tickets wrapped with `ScrollReveal.svelte` using `IntersectionObserver` for fade/rise entry transitions.
- [ ] **Typography transformation** — conscious corporate→handwritten shift tied to scroll depth (not just fixed font-per-element assignments).
- [x] **Ticket/zine layout devices** — added `ZineDecorations.svelte` with vertical spine text, care-label icon row, and brand sticker elements (`docs/brand-reference/` flyers).
- [ ] **Sunset-orange / warm-sand colour arc** — original brief's second palette (escape colours) never appeared. Consider introducing them in calmer/later sections to complete the chaos→calm colour journey.

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
- [x] Blue/pink/teal palette blended into cube gradient
- [x] SEO meta tags — title, description, og:*, twitter:*
- [x] `prefers-reduced-motion` — all animations suppressed
- [x] `aria-live` on boot sequence, `sessionStorage` skip on return visits
- [x] `:focus-visible` on icon buttons and CTA
- [x] Body baseline — `line-height`, antialiased, `text-rendering`
- [x] Polaroid `aspect-ratio: 9/16` matching real flyer proportions
- [x] Project SKILL.md for agents (`.gemini/skills/out-of-office-project/`)
