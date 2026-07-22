# GAME-DATA.md — Apohenia: Sales Quest — Single Source of Truth

Standalone vanilla-JS game. All content is data in `window.__SQ_PARTS`, merged by `data/game-data.js` into `window.SALES_QUEST`. App code never hard-codes content.

## Load order (index.html)
```
data/parts/00-meta.js  →  __SQ_PARTS["meta"]
data/parts/10-levels-a.js → __SQ_PARTS["levels-a"]
data/parts/11-levels-b.js → __SQ_PARTS["levels-b"]
data/parts/20-bosses.js   → __SQ_PARTS["bosses"]
data/parts/21-practice.js → __SQ_PARTS["practice"]
data/game-data.js → merges → window.SALES_QUEST = { meta, levels:[10 in region order], bosses:[7], practice:{...} }
assets/js/*.js
```
Every part file: `window.__SQ_PARTS = window.__SQ_PARTS || {}; window.__SQ_PARTS["<key>"] = {...};`
Merge must tolerate missing parts (console warn + graceful "coming soon" level card).

## Canonical IDs
- Archetypes (10): `intelligence`, `status`, `certainty`, `freedom`, `growth`, `connection`, `recognition`, `novelty`, `contribution`, `efficiency`
- Regions (10, in order): `opening-village`, `intent-gardens`, `experience-trail`, `process-forest`, `gap-caverns`, `impact-city`, `future-fields`, `recommendation-castle`, `objection-arena`, `closing-summit`
- Stages (master frame, 9): `open`, `intent`, `experience`, `process`, `gap`, `future`, `priority`, `recommend`, `decide` (region Impact City covers the impact questions of `gap`; Objection Arena = `decide`-adjacent)
- Offers: `managed`, `ownership`, `custom`, plus `none` (honest no-fit)
- Emotions (portrait states): `neutral`, `happy`, `thinking`, `skeptical`, `guarded`, `annoyed`, `impressed`, `surprised`

## NPC object (embedded in each level/boss)
```js
npc: {
  id:"marcus-vale", name:"Marcus Vale", business:"Vale & Sons Roofing", role:"Owner, 25 years",
  primary:"intelligence", secondary:"status",
  personality:"1–2 sentences of voice guidance for writers/portraits",
  portrait: { skin:"#8d5a3b", hair:"short-crop", hairColor:"#2b2b2b", outfit:"#31456b",
              accessory:"glasses"|"cap"|"none"|"earring"|"beard", bg:"#ffd9a0" }
}
```

## Level object
```js
{
  id:"lv-opening-1", region:"opening-village", name:"The First Hello", subtitle:"...",
  intro:"1-line map tooltip", npc: NPC,
  teaches:["open"],                       // master stages this level drills
  beats: [ Beat, ... ],                   // 10–14 beats
  starThresholds:[0.55, 0.8],             // fraction of maxPoints → 2nd/3rd star
  unlockAfter:null | "lv-..."             // null for region 1 only
}
```

## Beat types (rendered generically by the engine; `t` discriminates)
```js
{ t:"say", who:"npc"|"narrator"|"player", text:"...", emotion:"thinking" }        // player = scripted line Jason says
{ t:"identify", prompt:"Who are you talking to?", options:[4–5 archetype ids],
  answer:{ primary:"intelligence", secondary:"status" },                          // secondary may be null
  feedbackWin:"...evidence cited from the NPC's own words...", feedbackLose:"...", points:80 }   // primary 50 + secondary 30
{ t:"choose", stage:"intent", tool:null|"probe"|"mirror"|"anchor",
  setup:"short scene framing shown above choices",
  options:[ { text:"exact line the player would say", quality:3|2|1,
              feedback:"why strong/weak — specific, kind, instructional",
              tags:["wrong-archetype"|"off-frame"|"flattery"|"forced-agreement"|"manipulation"|"premature-pitch"|"terms-change"|"skips-discovery"|"pressure"] } // 3–4 options
  ], teaching:"1–2 sentence takeaway after answering" }      // exactly ONE quality:3 per choose beat; quality3 = master question in the NPC's archetype language
{ t:"offer", setup:"...", options:[4 offer ids shown with short labels], answer:"managed",
  feedback:{ managed:"...", ownership:"...", custom:"...", none:"..." } }
{ t:"objection", objectionText:"I need to think about it.",
  steps:[ { step:"receive"|"clarify"|"isolate"|"resolve"|"decide", npcLine:"...",
            options:[ {text, quality:3|2|1, feedback, tags} ×3 ] } ×5 ] }          // mini-battle inside a level
{ t:"end", outcome:"close"|"no-fit"|"next-step", text:"narrator wrap-up", emotion:"happy" }
```
Scoring of choices: quality 3 → +CHOICE_BEST, 2 → +CHOICE_OK, 1 → PENALTY by worst tag (see meta.scoring).

## Boss battle object (data/parts/20-bosses.js → { bosses:[...7] })
```js
{ id:"boss-think-about-it", name:"The Hesitation Wall", objectionText:"I need to think about it.",
  npc: NPC, intro:[ say beats ×2–3 ],
  rounds:[ { step:"receive"|"clarify"|"isolate"|"resolve"|"decide", npcLine:"...",
             options:[ {text, quality:3|2|1, feedback, tags} ×3–4 ] } ×5 in R→C→I→R→D order ],
  winText:"...", loseText:"...2+ poor answers", ethicalNote:"the boundary this boss teaches (shown after)" }
```

## Practice payload (data/parts/21-practice.js)
```js
{ drills: {
    archetype:[ {npcLine, clue:"what to notice", options:[4 ids], answer:{primary,secondary|null}, explain} ×12 ],
    recall:   [ {stage, prompt, options:[4 texts], answerIndex, explain} ×10 ],     // fixed-script recall
    mirror:   [ {npcLine, options:[4 texts], answerIndex, explain} ×8 ],
    anchor:   [ {situation, options:[4 texts], answerIndex, explain} ×8 ]
  },
  simCalls:[ Level, Level ],        // 2 full simulated calls, same Level schema, region:"closing-summit", id "sim-..."
  randomNpcPool:[ NPC ×6 ]          // for Random NPC mode; engine runs sim-1 beats with swapped NPC+translations
}
```

## Meta payload (data/parts/00-meta.js)
```js
{ title:{ gameName:"APOHENIA: SALES QUEST", tagline, menuLabels:{ newGame, continue, adventure, practice, avatar, options, musicOn, musicOff, multiplayer:"Multiplayer — Coming Later" } },
  archetypes:{ intelligence:{id,name:"Intelligence / Competence", tells:[3–4 observable language clues], color:"#…"} …all 10 },
  regions:[ {id, name, mapBlurb, theme:{sky, ground, accent}, icon:"village|garden|trail|forest|cave|city|fields|castle|arena|summit",
             bossRegion?:false } ×10 in order ],   // objection-arena → bossRegion:true
  scoring:{ IDENTIFY_PRIMARY:50, IDENTIFY_SECONDARY:30, CHOICE_BEST:20, CHOICE_OK:8,
            penalties:{ "wrong-archetype":-8, "off-frame":-12, "flattery":-10, "forced-agreement":-12,
                        "manipulation":-25, "premature-pitch":-15, "terms-change":-30, "skips-discovery":-15, "pressure":-25 },
            OFFER_CORRECT:40, OBJECTION_STEP_BEST:15, BOSS_WIN:150, STREAK_BONUS:5 },
  ranks:[ {minXP:0,name:"New Voice"},{…} ×8 … {minXP:…,name:"Pattern Master"} ],
  achievements:[ {id, name, desc, rule:{type:"stars"|"xp"|"streak"|"bosses"|"levels"|"drills", n}} ×15 ],
  dialogueSkills:[ {id, name, desc, unlockAt:"rule text"} ×6 ],   // e.g. Meaning Mirror, Identity Anchor, Silence Anchor…
  avatarCatalog:{ skinTones:[…6 hex], faces:[…5 ids], hairs:[…8 {id,label,unlockAt}], hairColors:[…6],
                  outfits:[…6 {id,label,color,unlockAt}], accessories:[…6 {id,label,unlockAt}],
                  notebooks:[…5 {id,label,color,unlockAt}], dialogueThemes:[…4 {id,label,unlockAt}],
                  titles:[…6 {id,label,unlockAt}] },               // unlockAt: "start"|"level:lv-x"|"stars:9"|"rank:3"|"achievement:id"
  defaults:{ avatar:{ name:"Jason", title:"Founder", skin:0, face:0, hair:0, hairColor:0, outfit:0, accessory:0, notebook:0, theme:0 } }
}
```

## Save contract (engine)
localStorage key `sq.save.v1`: { xp, levelStars:{lvId:0–3}, levelBest:{lvId:score}, bossWins:[ids], achievements:[ids],
skills:[ids], streakBest, drillsDone:{type:count}, avatar:{…}, options:{music:true, sfx:true, textSpeed:1},
unlockedLevels:[ids], started:true, lastLevel }.
New Game resets (confirm dialog); Continue resumes. No network calls anywhere.

## Writer rules (all content agents)
1. ONE master frame: every "best" option preserves the current stage question's purpose, translated into the NPC's
   primary(+secondary) archetype language. Source translations from /mnt/agents/output/jason-sales-playbook/data/parts/ (read them).
2. Distractors must be plausible but flawed; tag the flaw honestly. Never let a manipulative/pressuring/terms-changing line be quality 3 or 2.
3. Feedback teaches — cite the clue the NPC gave, name the flaw, never mock the player. Playful, warm, game-y tone ("The NPC's guard drops. +20").
4. Jason-voice lines stay calm/curious/precise (no hype, no "trust me", no fake urgency, no guarantee of leads/revenue; offer facts: $197/mo managed w/ six initial billing periods then month-to-month, no upfront fee; $1,000 one-time ownership; custom = separately scoped).
5. A clean "no-fit" or "bring the partner in" outcome can be the winning end — reward it.
6. Every option text ≤ ~140 chars (must fit a dialogue choice button). npcLine/say text ≤ ~220 chars.
7. Use all 10 archetypes across the level set (each region's NPC = distinct primary). Exact counts per schemas; no placeholders, finished copy only.
