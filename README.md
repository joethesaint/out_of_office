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

## Working on this repo

**Multiple agents may be working on this branch at the same time.** Before
pushing any commit here — and ideally before starting work each session —
run `git fetch` and check the branch against `origin` first:

```bash
git fetch origin
git status   # "behind"/"diverged"? pull/merge before you start editing
```

If you're already mid-edit when you discover new remote commits, don't
discard either side: `git stash -u`, pull/merge, `git stash pop`, resolve
conflicts by hand (favor whichever side is objectively newer/more complete
for that file — check commit messages and dates, don't just pick "ours"),
then re-verify the app still runs before committing. Re-fetch immediately
before every push, not just once at the start of a session — another agent
can land a commit in the minutes it takes you to build and verify yours.

## Status

**Built**: the full single-page site. A pinned hero (`src/lib/RotatingCube.svelte`
— a real 27-cubie Rubik's cube, drag/scroll-driven) that solves itself as
the user scrolls (see [Cube narrative](#cube-narrative)), recolored to the
Out of Office blue/pink/cream palette; a header bar, footer bar, and
headline typography block (`HeaderBar.svelte` / `FooterBar.svelte` /
`App.svelte`); a boot/auto-reply loading sequence (`BootSequence.svelte`);
and five content sections after the "Activated" reveal — escape metrics,
community/polaroids, memory timeline, playlist, and tickets
(`EscapeMetrics.svelte` / `Community.svelte` / `MemoryTimeline.svelte` /
`Playlist.svelte` / `Tickets.svelte`). Fonts are self-hosted (no Google
Fonts dependency at runtime). See
[Implementation notes](#implementation-notes) for how each piece works.

**Not built**: the ticket/zine layout devices beyond the header/footer
(vertical spine text, barcode, QR code, care-label icon row, smiley-flower
stickers, paint-splat scatter graphics), and scroll-reveal animation on the
new sections (they currently render in normal document flow). See
[TODO](#todo--replication-checklist) for the implementation-level list, or
[Brief-vs-build audit](#brief-vs-build-audit-2026-07-12) for a full
gap-by-gap evaluation against the original brand brief (boat animation,
notification counter, boarding-pass/passport-stamp visuals, cube easter
eggs, and more are open — see that section before assuming the site is
brief-complete).

## Brief-vs-build audit (2026-07-12)

The complete original brand brief — including the positioning statement,
Lagos interpretation, landing-experience script, visual-metaphor list,
motion-design rules, moodboard, and all five Rubik's-cube narrative
concepts — is preserved verbatim in `concept.txt` at the repo root. Treat
that file as the source brief everything below is measured against.

This section was written on explicit request ("eval what you did according
to the concepts I gave to you... do not code or do anything") as a self-
audit of how much of that brief actually made it into the build versus what
was skipped, substituted, or only partially realized. The audit text below
is reproduced **verbatim** — the exact words from the chat response it was
written as, not a re-summary — followed by a concrete, prioritized action
list derived from it.

### The audit (verbatim)

Here's an honest read against everything in your brief — including where I diverged, substituted, or just didn't get to something.

#### What landed faithfully

- **Core positioning language**: "Auto-reply for real life," "Release. Unwind. Reconnect.," "Auto replies enabled. Stress disabled." — these are near-verbatim from your Final Concept, not paraphrases.
- **Boot sequence** — this is the strongest match in the whole build. Your loading-screen idea ("Sending auto-reply… ✓ Emails muted ✓ Notifications paused ✓ Lagos stress suspended / Redirecting to Out of Office… then ocean waves appear") got built almost line-for-line, wave-rise and all.
- **Escape Metrics + Memory Timeline** sections match your spec closely (87 emails, 62% stress, ∞ friendships, 100% battery; OOO 001/002/003 numbering).
- **"Leaving yellow Lagos, entering blue Lagos"** made it in as literal footer copy, and the header's "STATUS: AWAY" accidentally lands the "old MSN status" moodboard note better than I'd planned — a nice unintended alignment.
- **Cube idle behavior** — "never static, slight rotation, subtle floating, responds to cursor" is genuinely there (auto-tumble + pointer parallax).

#### What's a substitution, not the real thing

- **Community section** uses your three real event *flyers* as polaroids, not disposable-camera candid crowd photos — I don't have real attendee photos, so this is a stand-in, not the "nostalgia" texture you described.
- **Color direction** — I abandoned your original chaos-yellow/traffic-red vs. teal/sunset-orange/sand palette once real flyers arrived, in favor of sampling the *actual* flyer colors (blue/pink/teal/cream). Reasonable call, but it means "sunset orange," "warm sand," "muted greens" never appear. Pink — which wasn't in your color brief at all — became a primary color because that's what the real assets showed.
- **"Boarding pass"** is a label over a generic CTA button, not an actual boarding-pass-shaped ticket (no stub, no gate/seat-style fields). Same gap for **passport stamps** — OOO 001/002/003 are text badges, not a stamp graphic.

#### What's just missing

- **The boat.** You called it out specifically — "boat = escape," moving horizontally as you scroll. Never built. The danfo bus (added in a separate session) covers the *leaving* side of the metaphor, but nothing represents *arriving*.
- **Notification counter** (999+ → 0 as you scroll). Not built.
- **The Scene 1 chaos-desktop** (Slack/WhatsApp/calendar/battery-low/email popups) that the boot sequence was supposed to visually dissolve. My boot sequence is a text checklist on a dark screen — evocative, but not the cluttered-UI scene you described.
- **Typography going corporate → handwritten as you scroll.** I used five fonts, but assigned to fixed roles (Fredoka for headers, Permanent Marker for captions) — not a progressive transformation tied to scroll depth like you specified.
- **Glassmorphism** — never appeared anywhere.
- **Cube click easter egg** (10 clicks → Auto Reply Generator / Lagos Survival Stats) and **cube sleep mode on inactivity** — neither exists. The cube only responds to drag.
- **Cube-as-logo/favicon** — still the default Vite scaffold favicon. Never swapped for an OOO mark despite your own suggestion.
- The exact line **"Life is messy. Like a scrambled cube. Out of Office is where we stop trying to solve everything for a moment."** — never used as displayed copy anywhere, despite you flagging it as something that "could become part of your branding."

#### The cube, specifically

I built **Concept 1** — your stated favorite — and the reveal payoff ("Out of Office Activated / You've found a little order and peace") is a close match. But two things are worth being precise about:

1. **"One side becomes complete"** in your concept implies a classic Rubik's-cube tell: solved = one uniform color, instantly legible. Because I built a checkerboard-pattern cube (to match the flyer aesthetic) instead of flat colors, "solved" is the *original checkerboard*, not a clean single color. A first-time viewer scrolling through may not clearly register "oh, it's solved now" the way a real Rubik's cube telegraphs it — the brand-matching aesthetic came at some cost to the concept's visual clarity.
2. **The scroll choreography is cube-only.** Your concept paired the unscrambling with notifications disappearing and traffic sounds fading *simultaneously*. I only built the cube half — there's no competing digital-clutter layer in the hero to dissolve alongside it, so the "de-cluttering" feeling is thinner than described.

The other four concepts weren't partially built — they were fully set aside, including **Concept 4**, which you flagged as "most Elliot-coded" (most you) even though Concept 1 was the stated favorite. Nothing in the current architecture leaves room for it later: the cube lives only in the pinned hero and disappears the moment you scroll past. It doesn't persist, track section visits, or reappear as a running progress thread the way Concept 4 imagined. If that one still appeals to you, it'd need to be designed in now rather than bolted on.

There's also a structural tension worth naming: you explicitly reframed the cube as "the person before they go Out of Office," not the whole brand. But the amount of engineering polish it got (motion blur, glossy PBR material, rounded geometry, decal system) makes it the single most sophisticated thing on the page, with nothing of equal visual weight on the "escape" side to balance it once you scroll past the hero. The postcard and polaroids gesture at the arrival/calm side, but they're static images, not part of a continuous motion narrative — so the site currently reads more "chaos symbol, well-executed" than "chaos resolving into an equally realized calm."

*(Note written alongside this audit but outside the verbatim block: as of the same session, a concurrent commit — `51a3c32 Flatten cube stickers to solid colors, lean material toward glass` — already started addressing audit point #1 above by moving the cube away from checkerboard tiles toward flat/solid colors. Re-check the live cube against that gap before assuming it's still open.)*

### Action list (prioritized, derived from the audit)

**P0 — explicit, concrete brief items that were simply never built:**
1. Add the "Activate Auto Reply →" CTA button to the hero — the brief specifies this exact button and it does not currently exist anywhere in the hero.
2. Build the boat animation: moves horizontally across the screen, tied to scroll, representing "boat = escape" / arrival at Tarkwa Bay. Nothing currently represents the *arrival* half of the mainland→island metaphor (the danfo bus only covers *leaving*).
3. Build the notification counter (999+ → 23 → 7 → 1 → 0) tied to scroll progress, ideally in or near the hero alongside the cube.
4. Decide whether to insert a literal "Scene 1" chaos-desktop treatment (Slack/WhatsApp/calendar/battery-low/email popups) before/within the boot sequence, or formally scope it out — right now the boot sequence is a lighter abstraction of this, not the scene itself.

**P1 — cube-narrative decisions that need a call made, not just code:**
5. Resolve the solved-state legibility gap: either keep the checkerboard (brand-accurate, less legible as "solved") or move fully to flat/solid colors per face (more legible, less flyer-accurate). Note a concurrent commit already nudged toward flat colors — check current state before treating this as unresolved.
6. Decide if Concept 4 (cube as a persistent, cross-section progress tracker — one face solves per section visited: Escape/Community/Activities/Memories/Playlist/Tickets) should be designed in as a v2, given it was flagged as "most you." This needs an architectural decision (cube reappearing/persisting across scroll, not just living in the pinned hero) before more content sections get built on top of the current one-shot-hero pattern.
7. Add the cube click-count easter egg (10 clicks → Auto Reply Generator or Lagos Survival Stats generator).
8. Add cube idle/sleep-mode behavior after a period of user inactivity.
9. Design a simplified "OOO cube" mark (one face = sun, one = ocean, one = paint palette per the brief) for use as the site favicon/logo — replacing the still-default Vite scaffold favicon.
10. Pair the cube's scroll-driven unscrambling with an actual dissolving digital-clutter layer in the hero, so the "de-cluttering" feeling described in Concept 1 has something besides the cube itself to resolve.

**P2 — visual-metaphor fidelity (currently superficial nods, not the real device):**
11. Redesign the Tickets section as an actual boarding-pass-shaped UI (stub/perforation, gate-and-seat-style fields, "Destination: Out of Office"), not a label over a generic button.
12. Redesign the OOO 001/002/003 memory-timeline badges as passport-stamp graphics (circular/ink-stamp visual treatment) rather than plain rounded-rect text badges.

**P3 — content and texture gaps:**
13. Source or commission real disposable-camera-style community/attendee photos to replace the event-flyers-as-polaroids substitution in the Community section, when available.
14. Consider working a glassmorphism treatment into at least one section, per the moodboard.
15. Find a natural place for the line "Life is messy. Like a scrambled cube. Out of Office is where we stop trying to solve everything for a moment." as displayed copy — it was explicitly flagged as reusable brand language and hasn't been used anywhere yet.

**P4 — motion and typography systems (bigger lifts, revisit once P0–P2 are settled):**
16. Build actual scroll-reveal animation into the sections below the hero (EscapeMetrics, Community, MemoryTimeline, Playlist, Tickets currently render instantly in normal document flow with no fade/motion) — ties directly to the brief's "slow, breathing, flowing, no sharp transitions" motion philosophy, which is currently only honored inside the hero/cube.
17. Build a genuine scroll-tied typography transformation (corporate/grotesk → handwritten/marker) rather than the current fixed-per-element font assignment (Fredoka always headers, Permanent Marker always captions, etc.) — this is a distinct, unrealized mechanic from the brief, not just "did we use nice fonts."
18. Revisit the color-direction question directly with the user: is the flyer-sampled blue/pink/teal/cream palette final, or should sunset-orange/warm-sand/muted-green accents from the original brief be reintroduced somewhere (e.g. in later/calmer sections, to visually complete the "chaos → calm" color arc the brief implies)?

## Review: multi-agent implementation wave (2026-07-13)

This project is now being worked by **multiple agents concurrently**,
coordinating through `TASKS.md` (a claim-based task board — check it before
starting new work; don't re-implement anything marked `[x]`) and
`.gemini/skills/out-of-office-project/SKILL.md` (a project-rules file one
agent wrote for future agents to follow). Between the first audit above and
this entry, at least three separate lines of commits landed and were
merged into each other (`692f95b`…`1f86374`, ~14 commits total): scroll
reveals, zine decorations, a boat animation, a notification counter, two
independently-built "digital clutter" implementations (`DigitalClutter.svelte`,
now dead code, and `ChaosLayer.svelte`, the one actually rendered — see
below), a floating/persistent cube with sleep mode, two easter eggs (one
of which was itself upgraded mid-batch from a toast to a real modal), a
new isometric-cube favicon, a boarding-pass redesign of Tickets, an
"Activate Auto Reply" CTA button, and a real accessibility/SEO pass.

This review covers the **final merged state**, not any single commit in
isolation — pulled fresh, built, run, and interacted with (clicked the CTA,
triggered both easter eggs, screenshotted desktop and mobile), evaluated
against UX principles rather than "does a matching commit message exist."
Because this happened as a genuine multi-agent race, some findings below
describe bugs that were introduced *by the merge itself* — two agents each
correctly solved the same problem independently, and nobody checked what
happened when both solutions landed on the same page.

### What's genuinely good

- **Floating cube overlay** (`.cube-floating-container.is-floating` in
  `App.svelte`, docks bottom-right once `activated` is true) — still the
  single best response in the batch. Directly answers the sharpest
  critique from the first audit ("nothing persists the way Concept 4
  imagined"). Verified live at desktop and mobile: small, unobtrusive,
  doesn't collide with the Tickets CTA.
- **Boarding-pass Tickets redesign** (`Tickets.svelte`, rewritten from
  ~46 lines to 431) — a real, tactile answer to the "boarding-pass-shaped
  ticket" item from the first audit's P2 list: `LOS → OOO` route display,
  `FLIGHT: OOO-2026` header, gate `TB-01`, boarding time "IMMEDIATELY,"
  special instructions ("Mute work Slack · Leave problems at Marina
  jetty"). This is the kind of visual-metaphor fidelity the brief asked
  for and the first audit found mostly missing.
- **The click-cube easter egg was upgraded from a toast to a real
  modal** (`RotatingCube.svelte`) since the last check: `role="dialog"`,
  `aria-label="Auto-Reply Generator"`, a close button, a "Shuffle Reply"
  button, and a "Copy" button wired to `navigator.clipboard`. Properly
  scoped (`position: absolute; inset: 0` on the cube stage, not the
  viewport). Genuinely better than what the previous pass of this review
  tested.
- **`ChaosLayer.svelte`** (the file actually rendered now — see the bug
  list below for its sibling) has a real mobile accommodation
  `DigitalClutter.svelte` never had: a `@media (max-width: 680px)` block
  that shrinks the popup cards and hides two of the five outright (Slack,
  Calendar) rather than just letting all five collide on a phone screen.
- **`sessionStorage` skip on the boot sequence for return visits**
  (`BootSequence.svelte`) — good unprompted UX judgment: nobody wants to
  re-watch a 3-second loading animation on every revisit in a session.
- **Boat/DanfoBus choreography** — `Boat.svelte`'s keyframes are timed
  via a code comment against `DanfoBus.svelte` so the two animals of
  transport take turns crossing the hero (boat during 8–45% of the
  cycle, bus during 58–88%) instead of colliding mid-scroll. A nice
  detail, undercut by the duplicate-render bug below.
- **Real accessibility/SEO work** (commit `1ab7d6d`, unchanged since the
  first pass of this review): `aria-live` on the boot sequence,
  `:focus-visible` outlines on icon buttons and the Tickets CTA, explicit
  `rel="noopener noreferrer"`, a global `prefers-reduced-motion` block
  for CSS animations/transitions, and full OG/Twitter meta tags.

### Where it does not tally — verified, concrete problems

1. **`<Boat />` is rendered twice in the same hero.** `App.svelte:94` has
   a bare `<Boat />` (no `progress` prop) left over from one commit
   line; `App.svelte:179` has the live `<Boat {progress} />` from
   another. Because `Boat.svelte` ignores its `progress` prop entirely
   and animates purely via CSS keyframes (confirmed by a Vite build
   warning: `unused export property 'progress'`), both instances play
   the identical animation and land exactly on top of each other at
   `bottom: 16%` — so there's no *visible* double-boat, but it's two full
   SVG trees animating in the DOM for one decorative element, and it's
   unambiguous evidence nobody diffed what the merge actually produced.
2. **The notification count is rendered twice, via two different
   formulas.** The old `.notification-badge` on the heart icon (line
   104, `Math.ceil(999 * (1-progress)^3)`) and the new
   `.notification-pill` in the headline (line 124, a four-tier stepped
   formula: 999+ → 840·(1-p) → 420·(1-p) → 60·(1-p) → 0) both answer the
   brief's "999+ notifications counting down to 0" idea, both ship
   simultaneously, and disagree with each other at every scroll position
   except the two endpoints. One commit added the pill without checking
   whether the badge already existed.
3. **`ChaosLayer` collides with hero content — the mobile media query
   didn't fix the underlying problem, it just resized it.** Screenshotted
   at 1280×900 and 390×844: the WhatsApp card (`top: 8%; left: 3%`)
   overlaps `HeaderBar`'s "STATUS: AWAY" text at *both* sizes; on mobile
   the Mail card clips the new notification-pill text down to
   "Pending No…". Root cause: `ChaosLayer` is `position: fixed; inset: 0`
   (viewport-relative), and `SKILL.md`'s full-bleed rule means `.frame`
   now fills the whole viewport too — there's no card margin left for
   the popups to sit "outside of" the way they may have been designed
   to. Shrinking the cards on narrow screens didn't address that they're
   positioned against the same content on every screen.
4. **The boat overlaps the cube on mobile.** `Boat.svelte`'s
   `.boat-track` is hardcoded to `bottom: 16%` at every viewport, but the
   mobile layout (`@media (max-width: 700px) { .hero-row { flex-direction:
   column } }`) stacks the cube below the headline text — landing the
   cube in the same vertical band the boat travels through.
5. **`og:image` still points at a file that doesn't exist.**
   `index.html` references `/og-image.jpg`; `public/` has no such file.
   `TASKS.md` itself still lists this unclaimed under P3. Share this
   link in a WhatsApp group — the primary distribution channel this
   brand actually depends on — and the preview card shows a broken image.
6. **The checkerboard-legibility issue from the first audit is still not
   fixed**, despite a commit that reads like it addresses it. "Flatten
   cube stickers to solid colors" (`51a3c32`) removed the light→dark
   *gradient* within each tile — a real, if partial, improvement — but
   the checkerboard *pattern* itself (alternating blue/cream per tile,
   `(i + j) % 2` in `makeTileTexture`) is untouched. "Solved" still reads
   as a checkerboard, not a single clean color per face.
7. **Reduced-motion coverage still doesn't reach the cube.** The
   `prefers-reduced-motion` block in `app.css` correctly disables CSS
   animations/transitions — the boat, the floating badge, the toast
   float. But the cube's own tumble is a JS `requestAnimationFrame` loop
   incrementing rotation directly, entirely outside that block, so it's
   the one continuously-moving, visually dominant object on the page
   that ignores the user's OS-level motion preference.
8. **`DigitalClutter.svelte` is dead code left in the tree.** It's no
   longer imported anywhere — `ChaosLayer.svelte` replaced it in
   `App.svelte` — but the 167-line file is still on disk with no
   indication it's superseded, which risks a future agent editing the
   wrong one.
9. **The "Activate Auto Reply →" CTA has a narrative-skip tension.**
   Verified working: clicking it smooth-scrolls straight to the
   "Activated" section (confirmed `scrollY` jump from 0 to ~1350px). That's
   good friction-reduction UX in isolation, but the scroll-driven cube
   solve *is* the site's core mechanic (Concept 1) — this button lets a
   visitor skip past all of it on their very first interaction. Not a
   bug, but worth a conscious call on whether the CTA should exist at
   all, or scroll partway rather than all the way.
10. **Process concern, unchanged from the last pass: `SKILL.md` silently
    overrode an explicit user instruction** about a landscape *card* hero
    in favor of a self-authored "full-bleed, no card, ever" rule, without
    the user's sign-off. Left as-is pending a decision; not reverted.
11. **Two separate easter eggs where the brief described one, offered as
    alternatives** — unchanged finding, though the click-based one is now
    meaningfully better built (see above). The "oo" keyboard sequence
    still has zero in-UI discoverability.

### UX-principle summary

- **Aesthetic and minimalist design (Nielsen)** — fails harder than the
  first pass found: the duplicate boat and duplicate notification UI
  both add rendering weight and (in the notification case) contradictory
  information without adding any signal, on top of the existing
  toast/spine/barcode/badge/headline/cube density. Ironic for a brand
  whose thesis is escaping exactly this kind of clutter.
- **Consistency across viewports** — still fails, now on `ChaosLayer`
  instead of `DigitalClutter` (finding #3), plus a new mobile-specific
  boat/cube collision (finding #4).
- **Error prevention / robustness** — the duplicate-Boat and
  duplicate-notification bugs are both classic merge-without-diffing
  failures; the `og:image` 404 is a ship-without-checking failure.
- **User control and freedom (WCAG 2.2.2, pause/stop/hide)** — the
  persistent floating cube still animates indefinitely with no dismiss
  control.
- **Match between system and real world / affordance** — the heart icon
  still carries a notification-style badge (separately from the new
  headline pill), sending a mixed "likes vs. unread" signal.
- **Recognition over recall / discoverability** — the sessionStorage
  boot-skip is good judgment; the modal easter egg's real dialog
  semantics (`role="dialog"`, `aria-label`, an explicit close button) are
  a genuine step up from a toast. The "oo" egg remains undiscoverable by
  design, for better or worse.
- **Positive, unchanged**: focus-visible states, `aria-live` on the boot
  sequence, `aria-hidden` on decorative layers, and the reduced-motion
  CSS block are all genuine, correctly-applied wins.

### Action list from this review

**Being fixed in the immediate follow-up to this entry** (see commit
history right after this README change for what actually landed — treat
that as the source of truth over this list if they ever diverge):
1. Remove the duplicate `<Boat />` at `App.svelte:94`, keep the wired
   `<Boat {progress} />`.
2. Consolidate the duplicate notification UI to one implementation.
3. Reposition `ChaosLayer` popup cards so they don't overlap `HeaderBar`
   text or the notification pill, at both desktop and mobile widths.
4. Fix the boat/cube mobile collision — adjust `Boat.svelte`'s vertical
   position (or hide it) under the mobile stacked layout.
5. Add a real `public/og-image.jpg` (1200×630) so link previews work.
6. Gate the Three.js cube's autonomous rotation behind
   `matchMedia('(prefers-reduced-motion: reduce)')`.
7. Delete the now-dead `DigitalClutter.svelte`.

**Left open, needs a decision rather than a fix:**
8. Checkerboard vs. solid-color solved-state legibility.
9. Full-bleed (`SKILL.md` rule) vs. landscape-card as permanent policy.
10. Whether to keep both easter eggs or consolidate to one.
11. A dismiss/pause control for the persistent floating cube
    (WCAG 2.2.2 compliance).
12. Heart-icon-carries-notification-badge semantic mismatch.
13. Whether the "Activate Auto Reply" CTA should skip the entire cube
    scroll narrative, or only part of it.

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

- **OOO 001 — Open Canvas**, Jaekel House Garden, May 30, ₦5,000
  (`docs/brand-reference/flyer-open-canvas-jaekel-house.png`)
- **OOO 002 — The Post-NYSC Hangout**, Tarkwa Bay Beach, 11 April 2026,
  12pm till daybreak (`docs/brand-reference/flyer-post-nysc-hangout-tarkwa-bay.png`)
- **OOO 003 — ???** — unannounced/coming soon (per the brand brief's own
  "OOO 003 ???" pattern; don't fabricate a third event)

Correction from an earlier pass of this doc:
`flyer-save-the-date-painting.png` is **not** a third, separate event — its
circled "Saturday 30 · D-day!!" matches Open Canvas's "MAY 30TH" exactly.
It's the teaser for OOO 001, not a fourth data point. Three flyer files
exist in `docs/brand-reference/`, but they document **two** real events.

These three flyers are the actual, currently-in-use brand assets — treat
them as ground truth over anything invented earlier in this doc.

A fourth reference image, `docs/brand-reference/postcard-greetings-from-out-of-office.jpg`,
is a "Greetings from Out of Office" retro postcard (mountain/forest photo,
pink slab-serif wordmark, script "Greetings from") supplied directly by the
brand owner as a style/content reference — **not** a Lagos photo (it's a
mountain landscape), used deliberately as a general "wherever you are when
you're out of office" postcard rather than a literal Tarkwa Bay image. It's
rendered as-is in `Postcard.svelte` (see [Implementation notes](#implementation-notes)),
not recreated/redrawn.

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

**Update**: don't let the palette read as "just blue." The pink accent
(`#fc9ce0`, deepened to `#e0568f` for text/UI contrast) is now blended
directly into the cube's own gradient — see
[Implementation notes](#implementation-notes) — rather than living only in
decorative splats, so blue and pink read as one connected palette (a small
Lagos-sunset blend) instead of blue-as-primary with pink as an afterthought.
Site-wide, blue/pink/teal are used together: blue for the primary wordmark
and headings, pink for secondary emphasis (eyebrows, CTA gradient, stat
tiles), teal for tertiary UI accents (footer, tags).

**Second update (2026-07-13) — resolving the sunset-orange/warm-sand
question**: `concept.txt`'s original color brief had two palettes — a
*chaos* set (danfo yellow, traffic red, dark grey concrete) and an *escape*
set (ocean teal, sunset orange, warm sand, muted green) — neither of which
made it into the build; the flyer-sampled blue/pink/teal became the entire
site instead of just the brand-identity layer. The call: **keep** the
flyer palette as brand identity (header, wordmark, CTA, cube) since it's
real, sampled, ground-truth material — but stop using it for *everything*.
Two small palettes now sit alongside it in `app.css`
(`--chaos-yellow`/`--chaos-red`, `--sunset-orange`/`--warm-sand`/`--muted-green`):
chaos colors drive the notification pill's red→yellow→blue taper as the
cube solves (mirrors "the colors become calmer"), and escape colors are
woven into the post-activation sections — `EscapeMetrics` stat tiles,
`MemoryTimeline`'s passport-stamp badges, and a warm-sand wash behind
`Tickets` — so the brief's second palette shows up as texture in the
"arrival" content rather than replacing the brand's real colors.

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
the page, the cube progressively un-scrambles. At full scroll, "Out of
Office Activated" reveals — the moment of disconnecting.

**Implemented.** `RotatingCube.svelte` accepts an optional `progress` prop
(0 = fully scrambled, 1 = solved); when set, it replaces the autonomous
timer loop entirely. `App.svelte` wraps the hero in a `position: sticky`
container inside a tall (`220vh`) scroll track, computes `progress` from
how far the user has scrolled through that track, and reveals an "Out of
Office Activated" section once `progress >= 0.995`. See
[Implementation notes](#implementation-notes) for the mechanism (fixed
scramble sequence generated once, applied instantly at mount, then
un-applied one move at a time to "catch up" to the scroll position) and a
note on the one real bug this surfaced (a 3-line wordmark split that
visually duplicated "OF").

Not done: the notification/traffic-sound fade-out UI mentioned in the
original concept, and a graceful re-scramble if the user scrolls back up
past the top (currently it just re-applies scramble moves forward, which
works but isn't dramatized).

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
  cubie face). Each tile alternates blue/cream by `(i + j) % 2`. Blue tiles
  are a 3-stop gradient `LIGHT_BLUE → MID_BLUE (#00bfff) → DEEP_PINK
  (#e0568f)` — sky blue blending into the brand's pink accent, not just a
  flat/two-tone blue — and cream tiles blend `LIGHT_CREAM → DEEP_CREAM_PINK`
  (a dusty pink-tinted cream), so the pink accent reaches the cube's base
  colors, not only its decals. Gradients are defined in whole-face
  ("atlas") coordinates, then the canvas is `translate()`-shifted so only
  that tile's window gets drawn — this is what makes the gradient and the
  big glyph decal (see below) continue seamlessly from tile to tile without
  needing a real texture atlas.
- **Face-spanning decals**: `drawHeart` / `drawRing` / `drawBowtie` draw
  one big shape per face (mapped via `FACE_AXES[dir].decal`) at whole-face
  scale, semi-transparent — white on blue tiles, brand pink
  (`rgba(224,86,143,…)`) on cream tiles — so it reads as a decal sitting
  over the checkerboard rather than a per-tile icon.
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
- **Scroll-driven solving**: passing a `progress` prop (0..1) switches the
  cube from its autonomous timer loop to scroll-driven mode. A fixed
  14-move scramble sequence (`scrambleMoves`) is generated once and applied
  **instantly** at mount via `applyMoveInstant` (direct position/quaternion
  math, no animation — important so the very first rendered frame already
  looks scrambled at `progress = 0`, with no visible "un-scramble then
  re-scramble" flash). From there, `queueNextTwist` compares a `target`
  move-count (derived from `progress`) against `appliedCount` and animates
  one move at a time toward it — undoing the most recent move if scrolling
  down, re-applying the next one if scrolling back up — chaining
  immediately (`nextTwistAt = now`, no `PAUSE_MS` gap) so it catches up to
  fast scrolling as quickly as the twist animation allows. Verified via a
  debug hook (temporarily exposing `window.__cubeDebug`, removed before
  shipping) that `appliedCount` reaches exactly 0 and stays there — the
  "solved" state is a coherent checkerboard-plus-decal per face, **not** a
  solid color, since that's the cube's identity/at-rest texture assignment
  either way (same as autonomous mode's solved state).
- On the `App.svelte` side: `.scroll-track` (`height: 220vh`) provides the
  scroll distance, `.pinned` (`position: sticky; top: 0`) holds the hero in
  place while it's consumed, and `progress` is computed from
  `scrollTrack.getBoundingClientRect()` on every `scroll`/`resize` event.
  Because the pinned range is shorter than the full page, `progress` (and
  therefore the "solved" moment) is reached well before the page finishes
  scrolling — the `.activated` section's own reveal timing lines up with
  when the sticky pin naturally releases, not with total page scroll.
- `.cube-stage`'s `touch-action` switches from `none` to `pan-y` when
  `progress` is set, so touch scrolling isn't blocked by the cube's drag
  handler on mobile.

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
wordmark set in **Fredoka**.

### Self-hosted fonts

Fonts are **no longer loaded from Google Fonts at runtime**. Five families
are downloaded once and served from `public/fonts/*.woff2`, declared via
`@font-face` in `src/app.css`:
- **Fredoka** (600–700) — wordmark/headline display, `var(--display)`
- **Space Grotesk** (400–500) — body/meta copy, `var(--sans)`
- **Bungee** (400) — blocky tag/date-badge display, `var(--tag)` (memory
  timeline stamps, playlist track numbers)
- **Permanent Marker** — handwritten accents, `var(--marker)` (polaroid
  captions)
- **Fraunces** (700–900) — elegant serif for event names, `var(--serif)`
  (memory timeline titles), matching the "Open Canvas" flyer's headline

Fredoka, Space Grotesk, and Fraunces are variable fonts — Google served the
*same* `.woff2` URL for multiple requested weights (e.g. Fredoka 600 and
700), so each local `@font-face` declares a **weight range** (e.g.
`font-weight: 600 700`) against one file rather than downloading separate
files per weight. This was a real fix, not just a nice-to-have: the
sandboxed test browser used during earlier work couldn't reach
`fonts.googleapis.com` at all (`ERR_CONNECTION_RESET`) and silently fell
back to `system-ui`, which was masking the actual result — self-hosting
removed that runtime dependency entirely and was verified via screenshot
(Fredoka's rounded terminals, Bungee's blocky caps, and Permanent Marker's
script are all visibly rendering, not falling back).

### Corporate → handwritten typography morph

Resolves audit item P4 #17 ("build a genuine scroll-tied typography
transformation... not just did we use nice fonts"). `src/lib/scrollProgress.js`
is a small Svelte store, `pageProgress`, holding the *whole-document* scroll
fraction (0 at the top of the page, 1 at the bottom) — distinct from
`App.svelte`'s existing `progress`/`smoothedProgress`, which only track the
220vh hero cube track. It's updated inside the same rAF-batched scroll
handler that already drives the hero, so there's no second scroll listener.

`src/lib/MorphText.svelte` renders a section eyebrow label as two
absolutely-stacked spans in one CSS grid cell — tracked-out uppercase
Space Grotesk and lowercase Permanent Marker — and crossfades their opacity
by `$pageProgress` (times an optional `boost` prop, so a section that
appears late, like Tickets, can lean fully handwritten before the literal
bottom of the document). A visually-hidden third span carries the real text
for screen readers, since both visible spans are `aria-hidden`. Wired into
the six post-activation section eyebrows (Postcard, EscapeMetrics,
Community, MemoryTimeline, Playlist, Tickets); the hero and "Activated"
eyebrows are deliberately left alone as pure corporate/grotesk, since
they're the "before" moment the brief describes, not part of the "after"
arc.

### Boot sequence

`src/lib/BootSequence.svelte` is a fixed-position overlay (dark `#181818`
background, `z-index: 50`) that mounts once per page load: five lines
("Sending auto-reply…", three "✓ …" checklist lines, "Redirecting to Out
of Office…") appear staggered (380ms apart) via a `setTimeout` array, then
after a hold the whole overlay fades out (`opacity` transition) while an
SVG wave shape rises up from the bottom (`transform: translateY`) — the
"ocean waves appear" moment from the brief. It unmounts itself (`{#if
!removed}`) after the exit transition finishes rather than staying in the
DOM invisible.

### Multi-section site

Below the existing pinned hero + "Activated" reveal, `App.svelte` now
renders, in order: `EscapeMetrics` (the auto-reply blurb + a 4-tile stat
grid), `Community` (the three real flyers from `docs/brand-reference/`
presented as rotated, drop-shadowed polaroid cards — imported directly via
relative path, e.g. `import img from '../../docs/brand-reference/…png'`,
which Vite bundles into the build regardless of source folder, so the
flyers aren't duplicated between `docs/` and `public/`), `MemoryTimeline`
(the `OOO 001` / `OOO 002` / `OOO 003` stamps — see the "Real events"
correction above), `Playlist` (five **fictional** mood-appropriate
track/artist names — deliberately not real songs or artists, to avoid any
impression of licensing/endorsement), and `Tickets` (a CTA linking to the
real ticket page, `https://tix.africa/discover/outofofficeng`, taken
directly off the Tarkwa Bay flyer).

### Landscape hero + postcard

The hero `.frame` changed from a portrait phone-card (`aspect-ratio: 9/16`)
to landscape (`aspect-ratio: 16/9`, `width: min(94vw, 900px)`). This forced
a rework of how the cube sits next to the headline: the original technique
absolutely-positioned `.cube-slot` at a hand-tuned `top`/`left` percentage
of the text stack's own bounding box (see the git history around "OUT/OF/OF…"
for why that was fragile — it broke once already when word-wrapping
changed). That's gone. `.hero` now contains a `.hero-row` flex container
with `.headline` and `.cube-slot` as siblings — the cube is a normal flex
item to the right of the text, sized independently
(`clamp(150px, 20vw, 260px)`), with only a small negative `margin-left`
(`clamp(-1.5rem, -3vw, -0.5rem)`) so it nudges into the gap next to
"OFFICE" without any risk of covering a letter, regardless of how long the
wordmark or viewport width changes. Below `700px` width, `.hero-row`
switches to `flex-direction: column` (cube below text) and the frame goes
full-bleed, same fallback behavior as before just at a wider breakpoint
(was `480px`, now `700px`, since landscape needs more room before it
should give up and stack).

`Postcard.svelte` renders the actual uploaded "Greetings from Out of
Office" reference image (imported from `docs/brand-reference/`, same
technique as `Community.svelte`) as a slightly rotated, drop-shadowed card
with a decorative "OOO · LAGOS" postmark stamp (inline SVG, dashed circle)
in the corner — no text/typography was redrawn, the photo already has its
own baked-in treatment. Placed right after the "Activated" reveal, as a
"you've arrived, here's your postcard" beat before the stat/community
sections.

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
- [x] Headline typography block: "OUT OF / OFFICE" wordmark stack, cube
      sitting to its right in a flex row (**not** absolute-positioned
      percentage overlap anymore — see [Implementation notes](#implementation-notes)
      for why that was replaced), subhead referencing the next real event,
      tagline "Release. Unwind. Reconnect."
- [x] Typography: Fredoka (rounded display, wordmark/headline) + Space
      Grotesk (body/labels/tags), per the
      [Brand identity](#brand-identity-out-of-office-lagos) direction —
      replaces the Archivo Black + Inter used in the Pinterest-spec build.
- [x] Responsive layout: true full-bleed on all screen sizes, per the
      `SKILL.md` constraints — updated from a portrait 9/16 phone-frame
      to a full-bleed 100% viewport layout, see
      [Implementation notes](#implementation-notes) for the layout rework
      this required (cube moved from absolute-overlap positioning to a
      flex-row sibling of the headline).
- [x] Add the "Greetings from Out of Office" postcard reference image
      somewhere on the site — `Postcard.svelte`, see
      [Implementation notes](#implementation-notes).
- [x] Wire the cube's scramble/solve to scroll progress instead of an
      autonomous timer — see [Cube narrative](#cube-narrative) and
      [Implementation notes](#implementation-notes) for how it works. The
      hero is now pinned (`position: sticky`) over a tall scroll track;
      scrolling through it drives the cube from fully scrambled (top) to
      solved (bottom), revealing an "Out of Office Activated" section
      once solved.
- [x] Boot/auto-reply loading sequence ("Sending auto-reply… ✓ Emails
      muted… ✓ Notifications paused… Redirecting to Out of Office…") before
      the hero, fading into ocean ambience — `BootSequence.svelte`, see
      [Implementation notes](#implementation-notes).
- [x] Full multi-section site: escape metrics, community/polaroids, memory
      timeline (`OOO 001`, `OOO 002`, `OOO 003`), playlist, tickets — see
      [Implementation notes](#implementation-notes) for what each section
      is (`EscapeMetrics`, `Community`, `MemoryTimeline`, `Playlist`,
      `Tickets`). Done: a real per-section reveal-on-scroll animation
      (sections fade in via IntersectionObserver) is implemented.
- [x] Self-host fonts if this ships publicly — done, all five families
      (Fredoka, Space Grotesk, Bungee, Permanent Marker, Fraunces) are now
      served from `public/fonts/`, no Google Fonts dependency at runtime.
- [x] Don't let the palette read as "just blue" — blended the pink accent
      directly into the cube's gradient and used blue/pink/teal together
      across the new sections, see the
      [Brand identity](#brand-identity-out-of-office-lagos) palette update
      and [Implementation notes](#implementation-notes).
- [x] Ticket/zine layout devices beyond what's in the header/footer: full
      vertical spine text, barcode, QR code, care-label icon row,
      smiley-flower stickers, paint-splat scatter graphics (see flyers in
      `docs/brand-reference/`).

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
                           # for brand identity — see that section). Also
                           # imported directly as images by Community.svelte
public/
  fonts/                  # self-hosted woff2 files (see Implementation notes)
src/
  App.svelte              # page shell: boot sequence, pinned hero (header/
                           # footer/headline/cube), activated reveal, and
                           # all content sections in order
  app.css                 # @font-face declarations, brand color variables
  lib/
    BootSequence.svelte   # "sending auto-reply…" loading overlay
    HeaderBar.svelte      # 3-block header strip
    FooterBar.svelte      # footer callout + fine print
    RotatingCube.svelte   # Three.js hero object (see Implementation notes)
    Postcard.svelte       # "Greetings from Out of Office" reference image
    EscapeMetrics.svelte  # auto-reply blurb + stat grid
    Community.svelte      # polaroid gallery (real flyer images)
    MemoryTimeline.svelte # OOO 001 / 002 / 003 event stamps
    Playlist.svelte       # mixtape-style track list (fictional tracks)
    Tickets.svelte        # CTA linking to the real ticket page
  main.js                 # Svelte app entry point
index.html
```
