# APOHENIA: SALES QUEST — Engine Guide

A polished, playful, browser-based learning game. Vanilla HTML/CSS/JS — **zero dependencies, no backend, no external URLs/fonts/analytics**. Saves live in `localStorage` under `sq.save.v1`.

## Run it

```bash
cd apohenia-sales-quest
python3 -m http.server 8080
# open http://localhost:8080/index.html
```

## Architecture

| File | Role |
|---|---|
| `index.html` | Screen shells + script order. Content parts → mock fallback → merge → engine. |
| `data/parts/*.js` | **Content (other team).** Each sets `window.__SQ_PARTS[key]`. Missing files 404 harmlessly. |
| `assets/js/mock-data.js` | **Engine-team fallback content** (full meta, 1 level, 1 boss, small drills). Only fills *missing* part keys — real parts always win. |
| `data/game-data.js` | Merges `__SQ_PARTS` → `window.SALES_QUEST = { meta, levels[10], bosses[7], practice }`. Never throws on missing parts; inserts "coming soon" placeholder levels and `console.warn`s. |
| `assets/js/save.js` | Save contract, XP/ranks, stars, achievements, skills, `unlockAt` rule evaluator. |
| `assets/js/audio.js` | Procedural WebAudio music (adventure/soft moods) + SFX. No audio files. Starts on first user gesture. |
| `assets/js/portrait.js` | Generative flat-shape SVG portraits (NPCs, 8 emotions) + player avatar compositor. |
| `assets/js/dialogue.js` | Dialogue engine: all beat types, scoring, streaks, results, boss battles. |
| `assets/js/map.js` | Original SVG adventure map: winding dotted path, 10 region bands, nodes, stars, locks, flags, boss panel, avatar token. |
| `assets/js/practice.js` | Practice hub + drill runners + boss/sim/random-NPC launchers. |
| `assets/js/app.js` | Screen manager, title screen, avatar screen, notebook, options, toasts, modals, keyboard. |
| `tests/vm-lint.js` | Node vm lint: merge degradation + save/progression rules. Run `node tests/vm-lint.js`. |

## Unlock gating (documented decision)

1. **Levels** unlock via the contract's `unlockAfter` chain: completing level X (≥1 star) unlocks the level whose `unlockAfter === X`. Placeholder levels chain onto the previous *merged* level id.
2. **Bosses** unlock when the boss-region level (`region.bossRegion === true`, i.e. Objection Arena) is completed. Practice-mode Objection Battles are always open (they're practice).
3. **Closing Summit** (final level) additionally requires **all bosses won** — even after its `unlockAfter` fires. Replay access is kept once earned.

## Scoring

All constants come from `meta.scoring`:
- `identify`: +IDENTIFY_PRIMARY (50) primary, +IDENTIFY_SECONDARY (30) secondary.
- `choose`: quality 3 → +CHOICE_BEST (20); quality 2 → +CHOICE_OK (8); quality 1 → **penalty of its worst tag** from `scoring.penalties` (min value; −8 fallback).
- `offer`: correct → +OFFER_CORRECT (40); wrong → 0 with feedback. Offer cards include the real facts ($197/mo managed, $1,000 ownership, custom scoped, honest no-fit).
- `objection` steps: quality 3 → +OBJECTION_STEP_BEST (15), quality 2 → CHOICE_OK, quality 1 → worst-tag penalty.
- **Streak**: consecutive quality-3 answers add +STREAK_BONUS (5) from the 2nd consecutive best onward; any quality < 3 resets. Best streak persists for achievements.
- Boss win (≥4 of 5 rounds quality ≥ 2) → +BOSS_WIN (150), `bossWins` recorded, `ethicalNote` shown win or lose.
- Stars: 1 for completion, +1 at `starThresholds[0]` of max, +1 at `[1]`. Best kept. Streak bonuses can push score past nominal max — that's intentional.

## Beats

`say` (narrator/npc/player, emotions swap the portrait) · `identify` (archetype chip picker: primary + secondary + optional "none") · `choose` (2–4 buttons, color-coded feedback + teaching) · `offer` (4 offer cards, per-option feedback) · `objection` (5-step R→C→I→R→D mini-battle with step banner) · `end` (→ results screen). Boss mode = intro `say` beats + one 5-round objection + win/lose screen.

## Controls

`Space`/`Enter` advance · `1–4` pick answer · `↑↓←→` move between answers · `Esc` close map panel · click/tap works everywhere · map nodes are focusable (`tabindex`, Enter/Space activates).

## Accessibility & quality bar

- `prefers-reduced-motion`: typewriter becomes instant; CSS animation/parallax disabled.
- Visible `:focus-visible` outlines; aria-labels on interactive SVG; live-region toasts.
- Responsive: map scrolls/pans on phone, dialogue box bottom-anchored, panels dock to bottom on small screens.
- No layout shift (fixed screen shells), system font stack, everything inline/local.

## Saves

`localStorage["sq.save.v1"]` — exactly the contract shape (xp, levelStars, levelBest, bossWins, achievements, skills, streakBest, drillsDone, avatar, options, unlockedLevels, started, lastLevel). New Game confirms before wiping; Options → Reset Save wipes with confirm. Cosmetics unlock **only by progress** (stars/levels/ranks/achievements/bosses) — never payment.

## Self-tests

```bash
node --check assets/js/*.js data/game-data.js   # syntax
node tests/vm-lint.js                            # merge degradation + progression rules
python3 -m http.server 8931 &                    # then curl each file (all 200)
grep -rnoE "https?://" index.html assets/ data/game-data.js   # only w3.org SVG namespace
```
