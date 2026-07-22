# APOHENIA: SALES QUEST

A playful browser learning game that teaches a fixed ethical sales funnel through
Pokémon-style NPC conversations. Journey across a 10-region adventure map, face
7 objection "boss battles", customize your avatar, and sharpen your skills with
practice drills — all inside a single HTML page with zero build tooling.

## How to run

Open `index.html` in any modern browser, or serve the folder with any static
server (e.g. `python3 -m http.server`). No build step, no dependencies.
Progress is saved in `localStorage`.

## Project structure

- `data/parts/` — content data (levels, bosses, practice drills, meta)
- `assets/js/` — game engine (app, dialogue, map, save, audio, portrait, practice)
- `assets/css/` — styling
- `data/game-data.js` — merges the content parts into the final game data
- `tests/`, `validate.js` — data validation and skill verification scripts

## Art & music

All artwork and music in this project is original and code-generated
(Canvas/WebAudio) — no external assets.
