---
name: jason-video-editor
description: Jason's default short-form video edit. Use EVERY time Jason drops raw footage (talking head, car/selfie vlogs, motivational, teaching "game", business/AI content, screen recordings) to edit, cut, caption, add SFX/motion graphics, or "make it hit". Turns raw vertical footage into a finished 9:16 reel. It opens with a hook, cuts dead air and stutters, uses raw uncensored captions with gold keywords, and puts slow-mo on curse words. It pairs every event with the right SFX, adds font-combo titles with text behind the speaker, pops up graphics, and ends on an animated follow CTA. Everything follows the decoded creator playbook in references/playbook.md. Also use when Jason sends more "use this for that" reference videos to study; decode them and extend the playbook.
---

# Jason Video Editor — SOP

> **THE BAR:** playbook §18 ("My work vs Original"): every sentence gets a designed visual beat, nouns become full-screen editorial cards, giant hero words go behind the speaker, numbers roll, one accent color sits on a moody grade, and there's editorial micro-type. Jason called it the standard he expects. Plan every edit against it.
>
> **Visuals:** for every edit, output an image prompt pack (see `references/image-prompts.md`: style lock + one prompt per picturable noun). Jason generates the images (ChatGPT, or the Higgsfield connector when he approves credits) and they fill the §18 cards.
>
> **Start here:** read `references/journal.md`. It holds the scored history (current best **7.7/10**), what Jason loved (locked), his corrections, and the backlog. Every new edit should beat the best score. After delivery, ask for his score and log it.

The goal is an edit that makes the viewer stay, feel something, and act. It should match Jason's style exactly, with no need for him to ask for any of it.
Every choice below has a *reason*. If a choice has no rule or reason behind it, it doesn't go in the video.
The rules come from `references/playbook.md`, which was decoded frame-by-frame from the creator Jason studies. **Don't invent effects.**

## Jason's non-negotiables
- **Raw is the brand.** Never bleep, mute or asterisk anything, n-word included. Captions show every word exactly as spoken. Mention reach risk at most once per project, then drop it.
- **Curse words get the comedic slow-mo:** 0.5x speed with an octave pitch drop, a push-in zoom, and a whoosh. This is Jason's own rule. Do it on the curses that land as punchlines (2–3 per video), not on every one. Never slow-mo a slur.
- **No background music in the render.** Jason adds a trending track in TikTok. Deliver voice + SFX only, and recommend a track from the playbook's music-by-mood list (§5).
- **Follow-card avatar** = Jason's headshot: `assets/avatar.png`. If it's missing, ask for it once.
- Cut dead air and stutters. Keep the retake, not the stumble.

## Jason's vocabulary (spell exactly)
- **ego archetype** (not "architect")
- nigga / niggas (not the hard-r the model outputs)

## Pipeline
```
bash scripts/setup.sh                          # ffmpeg, Vosk model (from npm), MediaPipe 0.10.14 (bundled segmentation model)
# 1. JOIN multi-part uploads (verify seams: last frame of part N == first frame of part N+1; check md5 for duplicates)
ffmpeg -f concat -safe 0 -i parts.txt -c copy full.mov
# 2. TRANSCRIBE → words.json + phrases.txt
PYTHONPATH=/tmp/stub python3 scripts/transcribe.py full.mov work/
# 3. WRITE edit.json by hand (see "Editorial pass"), then CUT (frame-exact, slow-mo, caption alignment)
python3 scripts/cut.py edit.json work/
# 4. PERSON MATTE for text-behind-you
python3 scripts/matte.py work/cut.mp4 work/fg.webm work/edl.json
# 5. TEMPLATE: copy template/ → project, npm i, put cut.mp4 + fg.webm + avatar.png in public/ep, sfx in public/sfx,
#    captions.json + edl.json in src/ep, then edit the beat sheet in src/ep/Episode.tsx
# 6. VERIFY stills at every beat → fix → full render → re-check frames + audio levels → deliver (<30MB: re-encode 6Mbps if needed)
```
Remotion needs `--browser-executable=/opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell` in the cloud container.
Never `pkill -f` a pattern that matches your own shell command. It kills the tool call; kill by PID instead.

## Editorial pass (the thinking, done before any code)
1. **Read the whole transcript and name the video's one idea.** Example: "Label people → they commit → they buy."
2. **Find the payoff moment**: the result, the number, the close. **Find the thesis line**: the promise ("I'm going to teach y'all how to…").
3. **Hook = open loop plus pattern interrupt, both in the first 2–4 seconds.** Grade it with playbook §12: the **visual hook** has ≤6 elements, one metric, from→to, and proof. The **verbal hook** speaks to the viewer's want and promises value.
   - **Cold open:** take the payoff line itself, 1.5–3s of it ("It's seven thousand dollars. How would you like to proceed?"). Show the result before the method, which creates a curiosity gap that holds viewers until the payoff. The same seconds play again later: give the cold open its own keep-segment. cut.py maps captions per segment, so reused seconds are safe.
   - **Then the thesis line:** the taboo or direct promise, with a bass impact and a font combo. Something must move within the first 15 frames.
4. **Keep list:**
   - Cut warm-up ("what's up…"), dead air over 0.45s, stutters/retakes (keep the clean take), mumbled or garbled lines, and tangents that don't serve the one idea.
   - Keep raw color that carries personality (e.g. the weed line). It's the brand.
   - Target 45–60% of raw length. For short-form, aim under ~1:50.
5. **Correct every caption line by hand from context.** The offline model mishears slang: it writes "nigger" for "nigga", "boys" for "voice", "she and robbers" for "shit and rob us". Write the text as Jason actually said it. Flag low-confidence spots to him.
   **But never "correct" a word the model heard clearly** (high confidence, real word) just because another word seems more likely. Example: the model heard "ego archetype", which is Jason's term; it was wrongly changed to "architect". Jason's own terms: see "Jason's vocabulary" below.
6. **Gold keywords are rationed.** Pick about 1 per idea, and only concept words (the words that, read in sequence, *are* the lesson). Don't gold a word every time it repeats, or viewers stop reading gold. Roughly 8% of words. Specify by `[WORD, occurrence]`.
7. **Beat sheet:** map every section to what fires. Use the table below, and derive every frame from a spoken word with `w("WORD", n)`, never from hard-coded numbers.

## What fires when (the rules, with their source)
| Moment | Visual | SFX (his CapCut name → our stand-in) | Why |
|---|---|---|---|
| Hook / thesis line | font combo (Modern or Mozart), **text-behind-you**, zoom punch | **Bass impact** → `deep_bass` | reel 3/9: hooks and statements hit harder |
| A statement that must land | zoom punch | Bass impact | reel 3 "Core" |
| Every zoom-in | punch 1.0 → 1.14, hold, release | **swish_whoosh (large)** → `whoosh` | reels 5/6/9: every zoom gets a whoosh |
| Every cut between clips | zoom transition (incoming clip 1.14 → 1 + blur 10 → 0 over 6f) | **camera shutter (single shot)** → `camera_shutter` at ~0.28 | reel 6/9 transitions, reel 7 zoom transition |
| Across every clip | slow keyframed push 1.02 → 1.055 | — | reel 7: keyframes add smooth movement |
| Anything appears (pop-up, combo, ✓) | pop-up transition: scale spring with overshoot, rounded panel, drop shadow, glow text | **pop! (mouth tap) + Click! mouse single-click** | reels 3/5/6/9, the most-repeated rule |
| New caption line | — | **Keyboard Typing 01** → `typing` at ~0.16 | reel 9 |
| Build-up to a payoff | — | **RISER_01** → `riser`, *ending exactly on* the payoff word | reels 3/6 |
| Reveal (surprise, "you already won", hidden word) | combo or pop-up | **Metallic Riser / Magic reveal** → `riser` + `metallic_hit` / `synth_hit` | reels 3/6/9 |
| Money / numbers | gold pop-up of the number | **Money** → `kaching` | reel 3 |
| Curse punchline | 0.5x slow-mo + push-in, yellow keyword caption | whoosh (it's a zoom) | Jason's rule |
| Fast montage (cuts ≤ 8f) | one shot per beat | **shutter click on every cut** (playbook §16) | reels 1/6/9/18 |
| Title text assembling in chunks | chunk-by-chunk pop | **click per chunk** | reel 18 |
| Numbers counting up | green counter | **Counter** tick (pack3) | reels 10/17 |
| End | the idea's title combo (text-behind), freeze-blur, **animated follow card**: avatar + "FOLLOW FOR MORE" + button flips Follow → ✓ Following | **Bell ding** on the flip | reels 5/9 |

## Never show the same words twice (Jason's rule)
- **Font combo on screen → no captions.** Captions are fully hidden for the combo's window. A combo lives exactly as long as its phrase: from its keyword to the phrase's closing punctuation, 45-frame minimum so it reads (`phraseEnd()` + `hold()`), then captions resume.
- **Pop-up on screen → hide only the caption pages that repeat its words.** Match content words and ignore filler ("the, you, that…"). "$7,000" also matches spoken "seven thousand dollars". Keep an `OVERLAYS` list (from, to, text) that mirrors every pop-up, and pass it as `dedupe`.
- A long-lived title must **clear before a punchline caption** (e.g. the slow-mo curse). If it belongs on the outro, add it again there.
- Check: in every still, one piece of text says one thing once.

## Modes (pick one per video before editing)
- **Talking head / teaching** (default, episode #1): everything below.
- **AI / business how-to**: + recreated tool UIs and result cards (§10), UI/tech SFX (§13), illustrated concept cutaways (§14).
- **Music-led recap** (travel, lifestyle, cars, team): §15. Beat-synced kinetic lyric type, film burns, a grade, editorial corner labels. Grades and light leaks are allowed **only** in this mode.

## Visual system
- **Keyword color = meaning (LOCKED, Jason approved 2026-09-27):** yellow `#FFD24A` is the default keyword; **green `#2BE37A` = money, wins, gains, solutions, yes** ($7,000, won, confirmed, fast); **red `#FF3B3B` = problems, pain, threats, no** (against, complaining, problems). Tag each key in edit.json: `["WORD", n, "green"]`. Numbers about money are always green. Never color a word just to decorate it; if it's neither a win nor a problem, it stays yellow.
- **Captions** (reels 2/3/5/7): Montserrat. Two-tier: small white lowercase setup words, then the gold (#FFD24A) UPPERCASE keyword on its own line. Glow on all text, no heavy stroke. 1–3 words per page, word-by-word, placed on the chest (~y 1070 of 1920).
- **Font combos** (reel 8): Mozart = luxury/cinematic, Sugary = elegant, Tempting = lifestyle, Modern = business/tech.
  - Only on significant lines, about one per 5–8s.
  - Entrance is letter-fade: letters in random order, blur → sharp, ~8f; the accent word follows +3f; dead-still hold; blur-out exit 6f.
  - Place them in empty space above the head.
- **Text behind you** (reel 7 masking): do it **preemptively** on the 2–3 biggest title moments (hook, core concept, closing idea).
  - Stack: footage → title → `fg.webm` cutout (same transform as the footage).
  - Size and position so the head clips only the **bottom ~20–30%** of the word. It must stay readable. Check the stills.
- **Pop-ups** (reel 5): dark rounded panel with a thin gold border, drop shadow, and scale-pop entrance. Headlines in Bebas Neue, body in Montserrat. Text = **the speaker's own words only**. ✅ green / ❌ red glowing icons for yes/no, right/wrong.
- **Fonts allowed** (reel 2): hooks Bebas Neue/Archivo/Impact; captions Montserrat; talking-head accents Jost (Futura), Poppins, script. Never Comic Sans/Arial/Papyrus.
- **Grade (updated by §18):** a deliberate moody grade is now standard: desaturate ~30%, darken ~15%, one accent color. Still banned: random grain/vignette for its own sake, progress bars, letterbox bars, "SLOW-MO" labels, screen flashes, record scratches, section labels the speaker never says, invented infographics.

## Subconscious cues (the why behind the rules)
- **Open loop** (cold open on the payoff): the brain wants closure, so viewers stay for the "how".
- **Pattern interrupt** (taboo line + bass impact + motion in the first 15 frames): breaks the scroll reflex.
- **Conditioned reward:** the same pop + click on every new piece of info. The consistent pairing makes each new point feel like a small payoff, which keeps people watching.
- **Gold = important:** gold is rationed, so viewers learn to read it. The gold words in sequence are the lesson.
- **Commitment and consistency:** show ✅ on the viewer-agreeable beats (yes/no both ✓) before the ask.
- **Tension → release:** a riser into the number, then the money sound. The payoff lands physically as well as verbally.
- **Unfinished idea at the end** ("Ego archetype", "part 2"): an open loop that makes following the logical next step. The follow card flipping to Following shows the viewer the action to take.

## Verification checklist (before delivering)
- [ ] Hook: payoff cold open ≤3s, then thesis with bass impact; motion in the first 15 frames
- [ ] No dead air over 0.45s; no stutters; frame-exact A/V (video frames = audio length)
- [ ] Captions checked by hand against context; slang and names right; raw words unaltered
- [ ] Gold ≤ ~1 per idea; curse slow-mos only on punchline curses
- [ ] Every zoom → whoosh, every cut → zoom transition + shutter, every pop-up → pop + click, reveals → riser/reveal, money → money, CTA flip → bell
- [ ] Text-behind moments readable (head clips ≤30%)
- [ ] No duplicated text: captions hidden under combos, and caption pages repeating a pop-up hidden
- [ ] Nothing from the "Do not add" list; no invented text
- [ ] Stills checked at every beat; the final encode checked (duration, 1080x1920, loudness peak ≤ 0 dB)
- [ ] Deliver: MP4 (<30MB for chat), music recommendation from the playbook, list of any uncertain caption words

## Extending the playbook
When Jason sends more reference videos: md5-check for duplicates first. Then contact sheet at 2fps, transcript, spectrogram, and zoomed crops to read on-screen labels verbatim. Frame-step any animation at 15fps to measure it. Cross-reference with existing rules (count ×N appearances) and add to `references/playbook.md` with the reel number. Rules seen in 3+ reels are defaults.

## Known limits (tell Jason plainly)
- Sound effects are stand-ins matched by job. Swap in his exact CapCut exports (the names are in the playbook) when he provides them.
- The Vosk small model is weaker than Whisper. HuggingFace is blocked in the cloud env; if it's ever allowed, switch transcription to Whisper for cleaner captions.
- MediaPipe selfie segmentation is ~256px internally, so edges are soft. That's fine for text behind the head, not for fine hair detail.
- Screen-recording "auto-zoom / cursor-follow" animations (the Screen Studio-style look Jason likes): build them in Remotion with keyframed zoom to click points when screen footage is provided.
