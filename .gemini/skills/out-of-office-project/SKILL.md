---
name: out-of-office-project
description: >
  Context, rules, and conventions for working on the Out of Office Lagos
  brand site (Svelte 5 + Vite + Three.js). Activate whenever opening,
  editing, or discussing this repository.
---

# Out of Office — Project Skill

## ALWAYS do this first (multi-agent repo rule)

```bash
git branch --show-current   # confirm which branch you're actually on
git fetch origin
git status   # if behind/diverged: stash -> pull -> pop -> resolve -> verify
```

If you have local edits and discover new remote commits:
1. `git stash -u -m "<description>"`
2. `git pull origin <branch>`
3. `git stash pop`
4. Resolve conflicts explicitly after reviewing both sides; preserve upstream and local intent without automatically favoring or discarding either side. Read what each side actually changed and reconcile intentionally.
5. Confirm your active branch dynamically (`git branch --show-current`); do not hardcode or assume a fixed branch name.
6. Verify app still runs before committing.
7. Re-fetch immediately before every push.

---

## Project Structure

```text
src/
  App.svelte              # Page shell: scroll-pin hero, scroll progress, section list
  app.css                 # Brand CSS vars + self-hosted @font-face rules
  lib/
    HeaderBar.svelte      # 3-block top strip (STATUS/AWAY | ESCAPE | ooo logo)
    FooterBar.svelte      # Footer (AUTO REPLY | LAGOS | fine print)
    BootSequence.svelte   # Animated boot/auto-reply loading screen
    RotatingCube.svelte   # Three.js 27-cubie Rubik cube (scroll-driven)
    DanfoBus.svelte       # Animated danfo bus hero bg element
    EscapeMetrics.svelte  # Escape metrics data section
    Community.svelte      # Community/polaroids section
    MemoryTimeline.svelte # OOO 001 / 002 / ... memory timeline
    Playlist.svelte       # Playlist section
    Tickets.svelte        # Tickets CTA section
docs/
  brand-reference/        # Real event flyers — GROUND TRUTH for brand
public/fonts/             # Self-hosted woff2: fredoka, space-grotesk,
                          # bungee, fraunces, permanent-marker
```

---

## Brand Identity (treat flyers as ground truth)

### Colours

| Role              | Hex                   |
|-------------------|-----------------------|
| Wordmark blue     | #00bfff               |
| Teal vivid        | #08cabd               |
| Teal mid          | #37999d to #59b7b0    |
| Paper/cream bg    | #f6f4f1               |
| Pink accent       | #fc9ce0               |
| Yellow-green      | #c2c100               |
| Ink (near-black)  | #181818               |

CSS vars: --blue, --teal, --accent, --pink, --bg, --ink (in app.css)

### Typography

| Role                  | Font               | CSS var      |
|-----------------------|--------------------|--------------|
| Wordmark / headline   | Fredoka Bold       | --display    |
| Sub-event names       | Fraunces Black     | --serif      |
| Tags / date badges    | Bungee             | --bungee     |
| Handwritten notes     | Permanent Marker   | --marker     |
| Body / meta / labels  | Space Grotesk      | --sans       |

### Texture & layout devices
- Flat cream bg + SVG feTurbulence grain (no image asset needed)
- Ticket/zine devices: vertical spine text, barcode, QR, care-label icons,
  + accents, smiley-flower stickers, paint-splat scatter
- Numbered event stamps: OOO 001, OOO 002, OOO 003 ...

---

## Architecture

### Scroll-pin hero
- .scroll-track -> height: 220vh (scroll room)
- .pinned -> position: sticky; top: 0; height: 100vh (pins the hero)
- progress (0->1) from .scroll-track position -> passed to <RotatingCube {progress}/>
- activated at progress >= 0.995 -> "Out of Office Activated" reveal

### Layout (desktop-first, full-bleed — NO phone-card)
- .frame fills 100% x 100% of .pinned
- NO border-radius, box-shadow, aspect-ratio, or max-width on .frame
- Header/footer bars stretch full width

### RotatingCube
- progress=0 -> scrambled (Lagos chaos); progress=1 -> solved (OOO activated)
- Six solid brand-color faces (`#00bfff` blue, `#e0568f` pink, `#08cabd` teal, `#e8c9a0` sand, `#ff7b4d` orange, `#7c9473` green), chaos-tinted checkerboard (`#ffc72c` yellow / `#d92b2b` red) while scrambled, face-spanning decals, `MeshPhysicalMaterial`
- 27 cubies with ghost-mesh motion blur on layer twists; drag-to-spin + pointer parallax

---

## Rules for AI agents working here

1. Always git fetch before starting and before every push
2. Never overwrite upstream changes — stash, pull, reapply, resolve
3. Treat docs/brand-reference/ flyers as ground truth
4. No phone-card layout — the site is full-bleed on all screen sizes
5. Fonts are self-hosted in public/fonts/ — do not switch back to CDN links
6. Commit messages: "scope: what\n\nwhy + merge decisions"
7. Before any layout change, understand the scroll-pin architecture first
