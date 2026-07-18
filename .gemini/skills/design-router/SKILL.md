---
name: design-router
description: >
  Use BEFORE starting any new UI/visual-design task on this project (new
  screens, redesigns, component styling, "make this look better", etc.).
  Presents the design skills currently installed (hallmark, and anything
  else found under .gemini/skills or .agents/skills) and asks the user
  which one(s) to use — including a merge of several — before any design
  work begins. Do not auto-attach a design skill silently.
---

# Design Router (Antigravity)

Mirrors the Claude Code `design-router` skill at
`.claude/skills/design-router/SKILL.md` — keep the two in sync if either
changes. This repo has more than one design skill available (e.g.
`hallmark`), and more may be added later via `npx skills add
<owner>/<repo>`. None of them should silently take over a UI task. This
skill is the one-time gate that runs first.

## When to run

Trigger at the *start* of a distinct UI/design task — a new screen, a
redesign pass, "restyle X", a new component's visuals. Do **not** re-run
for every follow-up tweak inside a task you already gated (e.g. "make the
button bigger" mid-task doesn't need to re-ask). A new task later in the
same session does need to re-ask.

## Steps

1. **Discover available design skills.** Look in `.gemini/skills/` and
   `.agents/skills/` for anything design/UI-flavored (check each
   `SKILL.md` description). List what you find — don't assume the set is
   fixed to hallmark, since the user adds more over time.

2. **Ask, don't assume.** Ask the user which to use: each discovered
   skill individually, "merge multiple" (pick several to combine), or
   "none / plain implementation." This is the one-time go-ahead — do not
   proceed past this step without an answer.

3. **If multiple are selected, merge — don't just run them in sequence.**
   Read each selected skill's `SKILL.md` in full, extract the actual
   design principles/rules each one asserts (palette logic, layout
   heuristics, motion/tone rules, etc.), and synthesize one coherent
   direction. Where two skills' guidance conflicts (e.g. one says bold
   maximalist, another says restrained), say so explicitly and either ask
   the user to break the tie or pick the one that fits this project's
   existing brand identity (see
   `.gemini/skills/out-of-office-project/SKILL.md` for ground-truth brand
   rules — colours, typography, texture) and state why.

4. **Apply the resulting merged guidance** to the actual implementation
   work — this skill itself doesn't produce UI, it decides *whose* rules
   govern the UI that follows.

## Notes

- Skills installed via `npx skills add` land in `.agents/skills/<name>/`;
  Antigravity reads that universal location natively, so newly added
  skills should show up here without extra wiring — check `.agents/skills/`
  for anything not yet mirrored into `.gemini/skills/`.
- If only one design skill is installed and the user has a standing
  preference ("always use X, don't ask again"), skip the question — but
  only on that explicit instruction. Otherwise keep asking once per task;
  the friction is the point, it's what gives freedom to try new skills as
  they're added.
