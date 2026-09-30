# Edit Journal — scores, what landed, what to beat

Every delivered video gets an entry: Jason's score, what he called out, what's locked, and the backlog.
**Read this before starting any new edit.** The goal of each new video is to beat the best score here.

---

## #1 · "Ego / Label" (car, green blazer) · 2026-09-27 · **7.7 / 10** (baseline)
**Raw → final:** 3 uploads (3:36 raw) → 1:47 final. Cold open on the $7,000 close, then "how to MANIPULATE".

**Jason loved (LOCKED, never change without him asking):**
- **Two-tier captions with the yellow keyword**: small white lowercase setup, then the BOLD YELLOW UPPERCASE keyword on its own line. "The yellow part within the captions to colorify and bold it — I love it."
- Overall direction, the psychology-driven structure, and the raw captions.

**Corrections Jason made during this edit (now rules):**
- Captions must never duplicate on-screen text (combos/pop-ups): captions step aside.
- Transcript terms are his: "ego **archetype**" (the model was right; don't override a clearly heard word).
- Follow card uses his headshot, not a video frame.
- No music in the render; he adds it in TikTok.
- Follow the reference creator's rules to the tee; invent nothing (no grain/vignette/progress bar/flashes/letterbox).
- Text behind him is expected by default on the biggest title moments.

**Why it's 7.7 and not 10 (backlog to close):**
1. The SFX are synthesized stand-ins. Swap in his exact CapCut sounds (names are in the playbook) as soon as he exports them.
2. Transcription uses the small offline model, so some captions were hand-guessed. Push for Whisper (the HuggingFace network allowance).
3. Visual layer is only captions, combos and pop-ups. No B-roll, images or screen visuals yet. **Spec now exists (playbook §10):** recreated tool UIs with typed prompts, staggered result cards, green counters, brand-logo stickers, split screens, and face↔B-roll every 3–6s.
4. Text-behind edges are soft (256px matte). Fine on the hat; weak on hair or hands.
5. A camera shutter on every jump cut may be too much at 40+ cuts. Confirm with Jason or with a reference example.
6. The pop-up look is one style. Build variety from his future examples.

**Next iteration protocol:** Jason will send examples (edits, captions, cues, SFX). For each: decode it (frames at 15fps, labels, audio), add the rule to `playbook.md` with its source, apply it on the next video, then log the new score here.

**DECIDED 2026-09-27 (Jason: yes):** keyword color = meaning. Yellow is the default, green = money/wins, red = problems/pain. It's layered on the locked yellow two-tier style. Applies from episode #2.

**2026-09-30: The standard defined.** Jason pointed to reel 22 ("My work vs Original") as *the* standard. The gap from 7.7 is now concrete:
- episode #1 had captions, combos and small pop-ups;
- the standard has a **full designed scene per sentence** (image collages, editorial cards, rolling numbers, cinematic B-roll), a **moody grade with one accent**, and **callbacks**.
- Next edit: plan a beat sheet with one visual per sentence *before* rendering.
- Needs from Jason: images/B-roll for his nouns (or approval to use stock/AI-generated images, e.g. via Higgsfield), and his logo/brand assets.

## Episode #2: "You ARE disciplined" (Iman Gadzhi × iOS). Cut 2026-09-30
- **Source:** 5 parts, 4:31 raw → **1:41** cut, 40 keep segments, 5 slow-mo curse punchlines (bitch ×2, bullshit, fuck, nigga, loser).
- **Confirmed words:** Jason corrected 3 spots the transcription got wrong. Always ask for unclear words before cutting; never guess captions.
  - "get slutted the fuck out, you stupid bitch"
  - "created in the image of God"
  - "because I'm not a bitch and I'm not weak and my dick is big as fuck"
- **10 in-depth AI images:** all 9+/10 on the first try. The in-depth prompt rule works.
- **Image color system across the set:**
  - Gold = the way out: 01, 03, 07, 08, 10.
  - Red = the trap: 12.
  - Green = the win: 11, 15.
- **iOS layer:**
  - Dynamic-Island notification on the hook.
  - Collapsing notification stack (newest in front; never stack cards over the face).
  - Screen Time toggle flip, Fitness rings closing.
- **Text-behind hero words:** ARE (yellow, behind the hat), AUTHORITY, REDIRECT (green).
- **Rules learned:**
  - Hero words on this footage sit at top ≤ 170, where the hat starts at ~340.
  - 8–9-letter words max out at a Nunito 900 size of ~160–175.
  - Caption position follows the image card's reserved text zone (the `tops` prop).
- **Code:** `examples/discipline-episode/`.
- **Score:** pending Jason.

### Episode #2 v1 score: **7/10** (Jason). His notes are now rules:
1. **Captions need more motion.**
   - Every word pops with overshoot and a slight rotation, and blurs in.
   - The spoken word lifts; keywords slam in from 2× with a shake and a glow pulse.
   - The line floats gently and exits upward with a blur.
2. **iOS sounds must be 1:1 real.**
   - Never synthesize. Use Apple's own system sounds (`assets/sfx/ios/`): Tri-tone (sms-received1) for notifications, iMessage received, Tink (toggle), Activity goal attained (rings), Apple Pay success.
   - Source: github extratone/iOSSystemSounds and macOSsystemsounds. Git clone works where websites are blocked.
3. **Too many cuts hurt coherency. Cleaner is better.**
   - Keep whole sentences.
   - Only trim pauses over 0.55s (down to 0.3s) and cut true flubs or unclear words.
   - Same-thought jump cuts get no transition and no SFX, just alternating framing.
   - Zoom transitions and shutter sounds only on section changes.
   - Image cards crossfade, never hit-zoom.
4. **Hook = the cleanest, boldest line, as-is.**
   - This episode opens on "I'm black as fuck, and my dick is big as fuck." (Jason's wording for part 04 ~0:21–22.)
   - No notification or graphic on the hook when the line carries itself.

### Episode #2 v2 score: **7/10**. Note: the caption wasn't his exact words.
- He confirmed "I'm not weak, and my dick is big as fuck." v2 wrongly captioned "I'm black as fuck", from his loose paraphrase of the hook request.
- **Rule:** captions follow the **confirmed words**. When a new message paraphrases a line that was already confirmed, keep the confirmed wording and flag the difference; never overwrite it.
- **Rule:** align confirmed words to recognizer mis-hears with an alias map ("week"→weak, "pick"→dick, "biggest"→big as, "work"→fuck). Then spread merged tokens, so no two words pop on the same frame.

## Episode #3 brief ("what to do with your life"). Jason's direction, 2026-09-30
- **Motion graphics over AI images.** Use designed, animated explainers that *show* what he's saying (v9-style UI/card takeovers, v19-style clean kinetic type), not photo B-roll.
- **Pauses are part of the delivery.**
  - His silences are often intentional, for impact. Do NOT auto-trim every gap.
  - Only cut stutters, restarts and true dead air (roughly >1.5s with no dramatic intent), and even then leave ~0.6–0.8s.
- **Never drop key words**, and never reorder or break his logic.
  - The sequence must flow hook → argument → payoff → CTA exactly as he builds it.
  - The hook is the first line when the first line is already a hook.
- **iOS notification sounds:** he is bullish on them, so use them generously and 1:1 real.
- **QA against references before sending.**
  - Compare the render frame by frame with v9 (motion-graphics talking head), v19 (kinetic iOS type) and v21 (the "My work vs Original" standard).
  - Fix anything below them first.
