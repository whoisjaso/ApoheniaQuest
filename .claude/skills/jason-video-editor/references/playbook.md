# Content Engine Playbook — v0.6 (study notes → future skill)

Source material so far: 8 "use this for that" reels from the same creator + his SFX pack reel + his music-by-mood reel.
Every rule below is tied to what he actually demonstrates on screen, with timestamps where it matters.

---

## 1. Transition ↔ SFX pairing (reel 1: "With This → Use This")

| Transition (CapCut) | Length | SFX (CapCut library) | Why it works |
|---|---|---|---|
| Matte Popshots | 0.7s | Click (camera shutter single) — LEOPARD | photo-style flash → single shutter |
| Film Flare | 0.4s | Camera burst shutter (9 shots) — LEOPARD | light burst → rapid shutter burst |
| Paper Ball | 0.6s | Paper bag rough 14 — Takumi Toitani | paper crumple visual → paper crumple sound |
| Film Erase | 0.5s | Futuristic "click" puzzle / robot — Quetzal BGM | digital wipe → robotic click |

**Rule:** the sound is the *physical material* of the visual. Match material (paper→paper, camera→shutter, digital→robotic) and match length (SFX ≈ transition duration, hit lands on the cut frame).

## 2. Fonts by job (reel 2)

| Use | His picks | Character | In my kit now |
|---|---|---|---|
| Hooks & titles | Bebas Neue, Vanguard, Archivo, Impact | condensed, heavy, all-caps | Bebas Neue, Archivo/Archivo Black, Anton (Impact stand-in) |
| Captions | Sequel, Montserrat, Switzer, Helvetica | clean grotesk/geometric, max legibility | Montserrat, Inter, Hanken Grotesk (Helvetica stand-in) |
| Storytelling | Playfair Display, Inter, Syne, Garamond | serif + modern sans = cinematic/literary | Playfair Display, Inter, Syne, EB Garamond |
| Talking head | Futura, Gotham, "tempting" (script), Poppins | friendly geometric + script accent | Jost (Futura), Montserrat (Gotham), Poppins, Great Vibes (script) |
| Carousels | Coolvetica, Outfit, Lexend, Haas Grot | rounded/modern sans | Outfit, Lexend, Inter |
| Daily vlogs | Tahoma, Mojito, Elegant Typewriter, Clash | casual + typewriter texture | Special Elite (typewriter), Unbounded |
| **Never** | Comic Sans, Arial, Papyrus | — | banned in engine |

Missing (commercial/Fontshare, not reachable here): Vanguard, Sequel, Switzer, Clash, Coolvetica, Mojito, Gotham, Futura, Haas Grotesk, "tempting". Substitutes listed above; real files needed from you if we want exact.

### 2b. Font pairings, "use this with this" (reel 8)

| Combo | Big word | Small accent | How it's stacked | Engine preset (free fonts) |
|---|---|---|---|---|
| **Mozart** ★ (your favorite) | "Tangerine": flared medium serif, **gold** | "Mozart": high-contrast italic serif, **white** | small word tucked under the right side of the big word, overlapping its descender line | Marcellus (+3px stroke) + Bodoni Moda Italic |
| Sugary | "Futura": thin geometric sans, white | "Sugary": elegant italic serif, **gold**, *bigger* | thin word on top, fat italic below, overlapping | Jost 200 + Playfair Display Italic |
| Tempting | "switzer": bold lowercase sans, white, big | "tempting": script, small, above | script floats above the bold word | Hanken Grotesk 800 + Great Vibes |
| Modern | "MODERN": heavy extended caps, big | "Open Sans": small regular | small label sits on top like a kicker | Archivo Black/Unbounded + Inter |

**Pairing rules:**
1. Always contrast two axes at once: size (big vs. small) plus style (sans vs. serif or script).
2. One word gold, the other white.
3. The two words overlap or touch; they're never spaced apart.
4. Soft dark drop shadow on both.

The combos are for titles and hook cards, not running captions.

**When to use a combo (your observation, confirmed across his reels):** only on *significant* lines: the thesis, the key term, the payoff, a number. Normal lines get normal captions. Budget about 1 combo per 5–8 seconds, so each one feels like an event.

**Entrance, measured frame by frame at 15fps:**
- **letterFade** (his default): letters appear in *random order*, each fading from a 10px blur to sharp with a tiny settle. Total about 8 frames (0.27s).
- **Accent timing:** the small word starts 3 frames after the hero word.
- **After landing:** dead still, no drifting or floating.
- **Exit:** blur-out in 6 frames.
- **riseUp** (alt): letters stagger left to right, rising 40px from below, with the same blur-to-sharp.
- **Speed:** fast in, still hold, fast out. Never a slow fade.
- **SFX:** a very light whoosh at about 0.18 volume, or none. The text is the moment, not the sound.
- **Placement:** the clean negative space above or beside the head. Never over the face. Mozart and Sugary read luxury/cinematic, Tempting reads lifestyle, Modern reads tech/business.

## 3. SFX by purpose (reel 3) — the trigger map

He says "Use ___", pauses, and the sound plays in the gap. Bottom half demos it under a caption.

| Moment in the script | SFX | Placement rule |
|---|---|---|
| Make a statement hit harder | **Core** (sub/bass impact) | on the key word, same frame the keyword caption lands |
| Reveal something unexpected | **Among Us** reveal sting | on the reveal, after a beat of silence |
| Build suspense | **Riser** (~2s rising sweep) | starts ~2s before the payoff, *ends* exactly on the reveal |
| Pop-ups (text/graphic appears) | **Pop + Click** layered | on the element's first frame |
| Transition between clips | **Glitch** (~0.4s) | centered on the cut |
| Talking about money | **Money** (register/coins) | on the number or money word |

### 3b. Exact CapCut library names (reel 6: confirms and extends the trigger map)

Search these verbatim in CapCut → Audio → Sound effects:

| Use it for | CapCut name | Artist · length |
|---|---|---|
| Pop-ups (layer both) | **pop! (tapping the mouth with a hand)** + **Click! Mouse single-click sound** | LEOPARD 0:01 · Lanka 0:01 |
| Zooms | **Simple Whoosh sound** | Andrew 0:03 |
| Suspense | **RISER_01** | R.M 0:05 |
| Transitions | **click (camera shutter sound single shot)** | LEOPARD 0:01 |
| Big reveals | **Magic reveal** | Official Sound Studio 0:02 |

New rule: **every zoom gets a whoosh.** Across reels 3, 5 and 6, "pop-ups = pop + click" is repeated three times. It's his most-used pairing, so it's the engine's default for any element entrance.

### 3c. MASTER SFX MAP: all reels merged, duplicates collapsed (reel 9 added)

Reel 9 ("For This / Use This") names seven more CapCut sounds. Several are the same sound, or the same *job*, as earlier reels. That's the signal that tells us what's a real rule. ×N = the number of his reels that show it.

| Job | ×N | CapCut sound(s) he names (verbatim) | Engine default |
|---|---|---|---|
| **Pop-ups / text appears** | ×4 | **pop! (mouth tap)** · LEOPARD, the same file as "pop! (tapping the mouth with a hand)"; + **Click! Mouse single-click sound** · Lanka | pop + click layered |
| **Transitions** | ×4 | **click (camera shutter sound single shot)** · LEOPARD · **Camera flash sound** · TannY's · Camera burst shutter (9 shots) · Glitch | camera shutter (default), glitch (tech/edgy) |
| **Zoom-ins** | ×3 | **swish_whoosh (large)** · satak · **Simple Whoosh sound** · Andrew | whoosh on every zoom |
| **Hooks / statements** | ×2 | **Bass impact** · MiyaOnMusic · "Core" | bass impact on the hook word |
| **Reveals** | ×3 | **Metallic Riser** · **Magic reveal** · Official Sound Studio · Among Us reveal | riser → reveal sting |
| **Suspense** | ×2 | **RISER_01** · R.M · Riser | riser ending exactly on the payoff |
| **Captions** | ×1 | **Keyboard Typing 01** · 佐藤 | soft typing under word-by-word captions (sparingly) |
| **Money** | ×1 | Money | register/coins on numbers |
| **CTA / follow** | ×1 | **Bell ding** · viewcci library | ding when the follow button flips to "Following" |

**Proven rules (3+ reels):** pop+click on appearances, camera shutter on transitions, whoosh on zooms, a riser/sting on reveals.
**Newly confirmed:** the follow-card CTA shows up again (Follow → Following), now with its sound: **Bell ding**. It's his standard outro.

## 4. His caption + layout system (observed)

- **Two-tier emphasis caption** (reel 3): small white lowercase setup ("to make a") + big bold **yellow UPPERCASE keyword** ("STATEMENT"). Only the keyword gets size/color. SFX fires when the keyword lands.
- Framework headers: "For this: / Use these:" and "With This / Use This" — white + gold/outlined contrast, rounded chips, one accent color (gold).
- Split-screen demo: asset card with waveform on top, real-use example below.
- **Every reel ends in a comment-keyword CTA**: "Comment SFX / SONGS / FONTS / SOUNDS". That's a ManyChat-style lead funnel. It's the monetization play behind the format, and it applies directly to your content.

## 5. Music by mood (reel 4)

Informational: New Computers – Girlfriends · Not Like Us – Kendrick · Blade Runner 2049 OST
Challenge: Summer – Vivaldi · As Time Flies – Ty's Music · Feeling Blue – Caleb A.
Motivational: Flashing Lights – Kanye · I Wanna Be Yours – Arctic Monkeys · Experience – Einaudi
Deep: comet – Frank Saint · Ylang Ylang – FKJ · Dimensions – Arcade Fire
→ Added in-app at post time (licensed); engine outputs the pick, not the file.

## 6. Asset inventory

**Have, clean:** Essential SFX pack (11): gunshot, gear, charge, flash, whoosh, snap, deep bass, rewind, swoosh, metallic hit, synth hit. Plus my synthesized kit (whoosh, riser, pop, click, boom, tape-stop, ka-ching, glitch, scratch, coin, impact, typing, ding, buzzer).
**Have, reference-grade only (lifted from his reels, compressed, some voice bleed):** core, among-us reveal, riser, pop+click, glitch, money, camera shutter single, camera burst, paper bag crumple, futuristic robot click.
**Need clean originals:** Core, Among Us reveal, Money, camera shutter single/burst, paper crumple, robotic click. These are free in the CapCut library by the exact names above, or you send the files. This container can't reach Pixabay/Freesound/Mixkit.

## 7. Polish upgrades — the ❌ → ✅ rules (reel 5)

Five "instead of X, do Y" upgrades he says separate amateur from pro. Treat them as **mandatory defaults** in every render:

| ❌ Amateur | ✅ Pro | Engine spec |
|---|---|---|
| Plain text | **Text with a glow** | white text + soft outer glow (text-shadow 0 0 20–30px, ~60% white). Hero words only. |
| Raw pasted image | **Rounded-square mask + drop shadow** | radius ≈ 12–15% of the short side, shadow 0 20px 40px rgba(0,0,0,.5) |
| Static talking shot | **Zoom in** "to create more engagement" | punch-in 1.0 → 1.15–1.25 on the key line, hold, release on the next beat |
| Element just appears | **Pop up with a transition** | scale 0.6 → 1.05 → 1.0 spring + fade, 6–10 frames, + pop/click SFX |
| Ending on nothing | **Animated follow CTA** | profile card (avatar + @handle + Follow button) slides up, button flips "Follow" → "Following" (gold). Plays under "follow for more…" |

Format notes:
- Comparison device: red ❌ left and green ✅ right, both glowing, sitting in the top third above the head. The two versions show side by side at the same size so the difference reads instantly. On the zoom tip the icons go big and centered.
- Audio for tip/education reels: continuous low music bed under the voice, **light SFX** (soft tick/whoosh as each new pair enters). SFX density scales with energy: education = sparse, hype/motivation = dense.
- Each tip is ~3.5s: "instead of X" (❌ shows) → "do Y" (✅ builds). One idea per beat, no dead air.
- Ends with a verbal "follow for more ___ tips" + the animated follow card, with no comment keyword this time. Two CTA types to rotate: **comment-keyword** (lead capture) and **follow** (audience growth).

## 8. Editor techniques (reel 7: CapCut features, mapped to my renderer)

| His tip | Purpose he states | My equivalent |
|---|---|---|
| **Auto captions** | "keep people engaged" | word-timed captions (done) |
| **Keyframes** | smooth movement on a clip | eased/spring transforms (done) |
| **Masking** (auto background removal) | put **text behind you** | needs person segmentation. The model download is blocked here, so this is on the to-do list. It's the biggest visual upgrade still missing. |
| **Velocity** (speed curve) | custom speed ramps on clips | speed ramps (done for curse slow-mo; can do ramp-in/out) |
| **Glow effect** on text | make text pop | text-shadow glow (done) |
| **Zoom transition** | cut smoothly between clips | zoom-blur transition + whoosh (to build) |

Format notes: single-word captions under a fixed "Use" header, with a gold rounded icon card per tool. The animated follow pill (Follow → Following) appears again at the end, confirming it as his standard outro.

## 9. Engine logic (draft)

Input: raw footage + mode (talking head / motivational / storytelling / motion graphics / carousel / vlog).
1. Transcribe → word timings.
2. Tag each line: statement, reveal, suspense setup, number/money, new visual, scene cut, curse (your signature: 0.5x slow-mo + pitch drop + deep bass).
3. Mode → font pair (section 2), music mood (section 5), caption style (section 4).
4. Tags → SFX (section 3) placed by rule; transitions paired by material (section 1).
5. Hook in the first 1.5s, keyword-only emphasis, glow on hero text, rounded+shadow on every image, zoom punches on key lines, pop-in transitions for every element; end with comment-keyword or animated-follow CTA.
6. Render → frame-check → ship.


---

## 10. The visual layer, step-by-step AI/business format (reel 10 · "$1M only using ChatGPT")
This is Jason's lane (AI + business). The reel is voice-led with **almost no SFX** (the spectrogram is nearly all voice). The *visuals* carry the retention.

**Hook**
- Question with stakes: "If you had to make **$1,000,000** only using ChatGPT's Astra, **how would you do it?**"
- The number is a **green rolling counter** in the caption, counting up ($111,111 → $888,889 → $1,000,000) in sync with the words.
- The hook is shot in a **different, more cinematic setup** (other lighting and background), then cuts to the main podcast setup. The visual change signals "a new chapter starts".

**Captions**
- 1–2 short lines, bold rounded sans (Poppins/Montserrat ExtraBold), white with a soft shadow, centered just under the face.
- Two-tier: small setup word, then the big keyword under it.
- **Keyword color = sentiment:**
  - **green** = money, gains, solutions ("$50,000 a month", "fixes", "the people");
  - **red** = problems and pain ("all the problems", "complaining", "steal their hooks");
  - white otherwise.
- Every number is green and counts up.
- Step markers inside the caption: "first step", "Step **2**" with a big numeral.

**Brand stickers**
- When a product is named ("ChatGPT"), its logo pops in as 2–3 tilted, glossy app-icon tiles flanking the word.
- Pop-in with overshoot; they leave with the phrase.

**Full-screen B-roll takeovers (the "how")**
- Every process step cuts away from the face to a **recreated UI**: the ChatGPT prompt box **typing the exact prompt** he says, on a dark background with a faint giant brand-logo watermark and drifting particles.
- **Result cards pop in, staggered** around the prompt: app icons 1-by-1, white rounded revenue cards with line charts ($54,213…), 2-star review cards.
- A **big green counter** sits in the middle of the cards ($23,077 → $42,308 → "$50,000 a month").
- Captions keep running over the B-roll, centered.
- **Evidence B-roll:** real examples whenever he references them (viral TikToks, the competitor app on a laptop screen).
- **Split screen:** a screenshot or tool UI on the top half, the speaker on the bottom half ("put them into ChatGPT → make me 30 scripts").
- Cadence: face → B-roll → face roughly every 3–6s. The face comes back for opinions and emotion; B-roll is for facts and steps.

**CTA:** "Comment the word TIKTOK and I'll DM it to you" (keyword lead capture).

## 11. Scene transitions, cinematic vlog (reel 11 · "Top 5 transitions")
Use these when the **location or scene changes** (not on jump cuts inside one take):

| Transition | What it is | Build |
|---|---|---|
| **Film Burn** | an orange/amber light leak burns across the frame and hides the cut | animated radial gradient, screen blend, 10–14f |
| **Mask Glitch** | an object (pole, person, wall) passes the lens; the cut hides behind it | masked wipe along the object edge |
| **Camera Flash** | a white flash on the cut | 3–5f white hold, fast fade |
| **Blackout** | a hand covers the lens → cut to black → the new scene opens from black | hand-to-lens in shot A, reveal in shot B |
| **Whip Pan** | a fast camera swipe with motion blur, continued into the next shot | directional blur plus 1500px slide, 6–8f |

Look (confirms reel 7 masking):
- The hook title "TRANSITIONS" is a **huge red serif word behind the speaker**, with a small "top five" kicker.
- Chapter titles ("1. Film Burn") are red serif at the top.
- Subtitles are small yellow serif in a dark box at the bottom (documentary style).
- These videos are shot **by** the creator (handheld, moving). The transitions have to be performed while filming, so this is advice for Jason's shoots, not something added only in post.
