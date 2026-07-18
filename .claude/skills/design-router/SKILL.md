---
name: design-router
description: >
  Use BEFORE starting any new UI/visual-design task on this project (new
  screens, redesigns, component styling, "make this look better", etc.).
  Presents the design skills currently installed (hallmark, frontend-design,
  and anything else found under .claude/skills or .agents/skills) and asks
  the user which one(s) to use — including a merge of several — before any
  design work begins. Do not auto-attach a design skill silently.
---

# Design Router

This repo has more than one design skill available (e.g. `hallmark`,
built-in `frontend-design`), and more may be added later via
`npx skills add <owner>/<repo>`. None of them should silently take over a
UI task. This skill is the one-time gate that runs first.

## When to run

Trigger at the *start* of a distinct UI/design task — a new screen, a
redesign pass, "restyle X", a new component's visuals. Do **not** re-run
for every follow-up tweak inside a task you already gated (e.g. "make the
button bigger" mid-task doesn't need to re-ask). A new task later in the
same session does need to re-ask.

## Steps

1. **Discover available design skills.** Look in `.claude/skills/` and
   `.agents/skills/` for anything design/UI-flavored (check each
   `SKILL.md` description), plus note built-in skills that apply
   (`frontend-design`, `dataviz` if the task is chart-shaped). List what
   you find — don't assume the set is fixed to hallmark + frontend-design,
   since the user adds more over time.

2. **Ask, don't assume.** Use a question (AskUserQuestion, multi-select)
   offering: each discovered skill individually, "merge multiple"
   (multi-select the ones to combine), and "none / plain implementation."
   This is the one-time go-ahead — do not proceed past this step without
   an answer.

3. **If multiple are selected, merge — don't just run them in sequence.**
   Read each selected skill's `SKILL.md` in full, extract the actual
   design principles/rules each one asserts (palette logic, layout
   heuristics, motion/tone rules, etc.), and synthesize one coherent
   direction. Where two skills' guidance conflicts (e.g. one says bold
   maximalist, another says restrained), say so explicitly and either ask
   the user to break the tie or pick the one that fits this project's
   existing brand identity (see `.gemini/skills/out-of-office-project/SKILL.md`
   for ground-truth brand rules) and state why.

4. **Apply the resulting merged guidance** to the actual implementation
   work — this skill itself doesn't produce UI, it decides *whose* rules
   govern the UI that follows.

## Notes

- Skills installed via `npx skills add` land in `.agents/skills/<name>/`
  and get symlinked into `.claude/skills/<name>/` for Claude Code — check
  both locations, they're typically the same content.
- If only one design skill is installed and the user has a standing
  preference recorded (see memory / prior conversation), you may skip the
  question only when they've explicitly said "always use X, don't ask
  again" — otherwise keep asking once per task. The friction is the point:
  it's what gives freedom to try new skills as they're added.
