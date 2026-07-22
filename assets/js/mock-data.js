/* ============================================================
   MOCK-DATA.JS — FALLBACK CONTENT (engine team)
   ------------------------------------------------------------
   This file provides FALLBACK content so the game is playable
   while real content parts (data/parts/*.js) are being written.
   It ONLY fills keys that are missing from window.__SQ_PARTS —
   real part files, when present, always win.
   Fallback = full meta, 1 level (region 1), 1 boss, small drills.
   ============================================================ */
(function () {
  "use strict";
  var P = (window.__SQ_PARTS = window.__SQ_PARTS || {});
  function fill(key, val) {
    if (!P[key]) {
      P[key] = val;
      if (window.console && console.warn) console.warn('[mock-data] part "' + key + '" missing — fallback content active.');
    }
  }

  /* ================= META (fallback) ================= */
  fill("meta", {
    title: {
      gameName: "APOHENIA: SALES QUEST",
      tagline: "One master frame. Every call. Every prospect.",
      menuLabels: {
        newGame: "New Game", continue: "Continue", adventure: "Adventure Mode",
        practice: "Practice Mode", avatar: "Avatar", options: "Options",
        musicOn: "Music: On", musicOff: "Music: Off",
        multiplayer: "Multiplayer — Coming Later"
      }
    },
    archetypes: {
      intelligence:  { id: "intelligence",  name: "Intelligence / Competence", color: "#5b8def", tells: ["Cites years of experience or technical detail", "Tests whether you understand their craft", "Dismissive of 'sales talk'"] },
      status:        { id: "status",        name: "Status / Authority",        color: "#b06ac9", tells: ["Name-drops, titles, who they know", "Frames everything as their decision", "Sensitive to being treated as an equal, not a subordinate"] },
      certainty:     { id: "certainty",     name: "Certainty / Security",      color: "#4a9e6b", tells: ["Asks about risk, guarantees, what-ifs", "Uses 'safe', 'sure', 'locked in'", "Wants process spelled out step by step"] },
      freedom:       { id: "freedom",       name: "Freedom / Autonomy",        color: "#e0913d", tells: ["Hates being boxed in or locked down", "Talks about options, flexibility, control", "Allergic to long commitments"] },
      growth:        { id: "growth",        name: "Growth / Achievement",      color: "#37b58f", tells: ["Talks in goals, numbers, next levels", "Impatient with the status quo", "Wants the win, not the comfort"] },
      connection:    { id: "connection",    name: "Connection / Trust",        color: "#e86a92", tells: ["Warm, personal, relationship-first", "Asks who you are, not just what you sell", "Decides on feeling of trust"] },
      recognition:   { id: "recognition",   name: "Recognition / Validation",  color: "#e0b53d", tells: ["Wants their taste/work noticed", "Shares wins, waits for applause", "Hurt by being overlooked"] },
      novelty:       { id: "novelty",       name: "Novelty / Innovation",      color: "#7a6ae8", tells: ["Lights up at what's new", "Bored by 'the standard way'", "Early adopter vocabulary"] },
      contribution:  { id: "contribution",  name: "Contribution / Service",    color: "#6aa84f", tells: ["Mission and community first", "Talks about who it helps", "Suspicious of pure profit motives"] },
      efficiency:    { id: "efficiency",    name: "Efficiency / Pragmatism",   color: "#5aa7b8", tells: ["Bottom-line, no fluff", "Asks 'how long, how much, what's involved'", "Hates wasted time"] }
    },
    regions: [
      { id: "opening-village",       name: "Opening Village",       mapBlurb: "Where every call begins.",        icon: "village", theme: { sky: "#9fd8ff", ground: "#8ecb6d", accent: "#ff8a5c" } },
      { id: "intent-gardens",        name: "Intent Gardens",        mapBlurb: "Why now? Find the real reason.",  icon: "garden",  theme: { sky: "#bdf0d0", ground: "#5fbf7a", accent: "#ff6f91" } },
      { id: "experience-trail",      name: "Experience Trail",      mapBlurb: "Walk their past attempts.",       icon: "trail",   theme: { sky: "#ffe9a8", ground: "#d9a85c", accent: "#8a6de0" } },
      { id: "process-forest",        name: "Process Forest",        mapBlurb: "How they buy and decide.",        icon: "forest",  theme: { sky: "#a8e6cf", ground: "#3f8f5f", accent: "#ffd93d" } },
      { id: "gap-caverns",           name: "Gap Caverns",           mapBlurb: "Measure the distance.",           icon: "cave",    theme: { sky: "#c9c3e8", ground: "#6a5f9e", accent: "#ffb84d" } },
      { id: "impact-city",           name: "Impact City",           mapBlurb: "What the gap costs them.",        icon: "city",    theme: { sky: "#ffd1dc", ground: "#8f9bb3", accent: "#ff5c5c" } },
      { id: "future-fields",         name: "Future Fields",         mapBlurb: "Plant the picture of done.",      icon: "fields",  theme: { sky: "#d8f3ff", ground: "#a5d66d", accent: "#4d96ff" } },
      { id: "recommendation-castle", name: "Recommendation Castle", mapBlurb: "Match the right offer.",          icon: "castle",  theme: { sky: "#e8d8ff", ground: "#9e8ac9", accent: "#ffd93d" } },
      { id: "objection-arena",       name: "Objection Arena",       mapBlurb: "Seven walls. One structure.",     icon: "arena",   theme: { sky: "#ffe0b3", ground: "#c96f4a", accent: "#7a2e2e" }, bossRegion: true },
      { id: "closing-summit",        name: "Closing Summit",        mapBlurb: "Decide cleanly — or don't.",      icon: "summit",  theme: { sky: "#cfe8ff", ground: "#e8f4ff", accent: "#4d96ff" } }
    ],
    scoring: {
      IDENTIFY_PRIMARY: 50, IDENTIFY_SECONDARY: 30, CHOICE_BEST: 20, CHOICE_OK: 8,
      penalties: { "wrong-archetype": -8, "off-frame": -12, "flattery": -10, "forced-agreement": -12, "manipulation": -25, "premature-pitch": -15, "terms-change": -30, "skips-discovery": -15, "pressure": -25 },
      OFFER_CORRECT: 40, OBJECTION_STEP_BEST: 15, BOSS_WIN: 150, STREAK_BONUS: 5
    },
    ranks: [
      { minXP: 0,    name: "New Voice" },
      { minXP: 150,  name: "Curious Caller" },
      { minXP: 350,  name: "Frame Keeper" },
      { minXP: 600,  name: "Question Smith" },
      { minXP: 900,  name: "Mirror Adept" },
      { minXP: 1300, name: "Anchor Guide" },
      { minXP: 1800, name: "Objection Tamer" },
      { minXP: 2500, name: "Pattern Master" }
    ],
    achievements: [
      { id: "first-steps",  name: "First Steps",     desc: "Complete your first level.",            rule: { type: "levels", n: 1 } },
      { id: "pathfinder",   name: "Pathfinder",      desc: "Complete 5 levels.",                    rule: { type: "levels", n: 5 } },
      { id: "full-trail",   name: "The Full Trail",  desc: "Complete all 10 levels.",               rule: { type: "levels", n: 10 } },
      { id: "stars-3",      name: "Spark Collector", desc: "Earn 3 stars.",                         rule: { type: "stars", n: 3 } },
      { id: "stars-9",      name: "Star Scout",      desc: "Earn 9 stars.",                         rule: { type: "stars", n: 9 } },
      { id: "stars-15",     name: "Constellation",   desc: "Earn 15 stars.",                        rule: { type: "stars", n: 15 } },
      { id: "stars-21",     name: "Sky Filler",      desc: "Earn 21 stars.",                        rule: { type: "stars", n: 21 } },
      { id: "stars-30",     name: "Star Master",     desc: "Earn all 30 stars.",                    rule: { type: "stars", n: 30 } },
      { id: "xp-500",       name: "Warming Up",      desc: "Reach 500 XP.",                         rule: { type: "xp", n: 500 } },
      { id: "xp-1500",      name: "Seasoned Voice",  desc: "Reach 1,500 XP.",                       rule: { type: "xp", n: 1500 } },
      { id: "streak-5",     name: "On a Roll",       desc: "Hit a 5-answer best streak.",           rule: { type: "streak", n: 5 } },
      { id: "streak-10",    name: "Unstoppable",     desc: "Hit a 10-answer best streak.",          rule: { type: "streak", n: 10 } },
      { id: "boss-1",       name: "Wall Breaker",    desc: "Win your first boss battle.",           rule: { type: "bosses", n: 1 } },
      { id: "boss-all",     name: "Arena Champion",  desc: "Win all 7 boss battles.",               rule: { type: "bosses", n: 7 } },
      { id: "drills-25",    name: "Practice Regular",desc: "Finish 25 practice drills.",            rule: { type: "drills", n: 25 } }
    ],
    dialogueSkills: [
      { id: "meaning-mirror",   name: "Meaning Mirror",   desc: "Reflect the feeling behind the words, not just the words.", unlockAt: "level:lv-opening-1" },
      { id: "identity-anchor",  name: "Identity Anchor",  desc: "Tie the next step to who they already believe they are.", unlockAt: "stars:6" },
      { id: "silence-anchor",   name: "Silence Anchor",   desc: "Ask, then hold the quiet. Let them fill it.",              unlockAt: "stars:12" },
      { id: "gap-ruler",        name: "Gap Ruler",        desc: "Measure the cost of staying put — in their numbers.",      unlockAt: "level:lv-gap-1" },
      { id: "clean-receive",    name: "Clean Receive",    desc: "Take an objection at face value before touching it.",      unlockAt: "boss:boss-think-about-it" },
      { id: "honest-exit",      name: "Honest Exit",      desc: "Name a no-fit out loud. It closes more than it costs.",    unlockAt: "achievement:boss-all" }
    ],
    avatarCatalog: {
      skinTones: ["#f7d7b8", "#eec39a", "#d9a066", "#b8793f", "#8d5a3b", "#5f3d24"],
      faces: ["round", "oval", "square", "soft", "angular"],
      hairs: [
        { id: "buzz",       label: "Buzz Cut",   unlockAt: "start" },
        { id: "short-crop", label: "Short Crop", unlockAt: "start" },
        { id: "side-part",  label: "Side Part",  unlockAt: "start" },
        { id: "curly",      label: "Curly",      unlockAt: "stars:3" },
        { id: "long",       label: "Long Flow",  unlockAt: "stars:9" },
        { id: "bun",        label: "Top Bun",    unlockAt: "rank:3" },
        { id: "mohawk",     label: "Mohawk",     unlockAt: "achievement:boss-1" },
        { id: "wizard",     label: "Wizard Flow",unlockAt: "achievement:boss-all" }
      ],
      hairColors: ["#2b2b2b", "#5a3a22", "#8a5a2e", "#c9a24b", "#b5b5b5", "#e86a92"],
      outfits: [
        { id: "tee",     label: "Lucky Tee",     color: "#4d96ff", unlockAt: "start" },
        { id: "hoodie",  label: "Cozy Hoodie",   color: "#37b58f", unlockAt: "start" },
        { id: "shirt",   label: "Crisp Shirt",   color: "#f2f2f2", unlockAt: "level:lv-opening-1" },
        { id: "blazer",  label: "Quest Blazer",  color: "#31456b", unlockAt: "stars:9" },
        { id: "armor",   label: "Arena Jacket",  color: "#c96f4a", unlockAt: "achievement:boss-1" },
        { id: "royal",   label: "Summit Robe",   color: "#7a6ae8", unlockAt: "achievement:boss-all" }
      ],
      accessories: [
        { id: "none",    label: "None",          unlockAt: "start" },
        { id: "glasses", label: "Specs",         unlockAt: "start" },
        { id: "cap",     label: "Quest Cap",     unlockAt: "stars:3" },
        { id: "earring", label: "Earring",       unlockAt: "stars:6" },
        { id: "scarf",   label: "Scarf",         unlockAt: "rank:2" },
        { id: "headset", label: "Pro Headset",   unlockAt: "achievement:streak-5" }
      ],
      notebooks: [
        { id: "red",    label: "Red Notebook",    color: "#d95757", unlockAt: "start" },
        { id: "blue",   label: "Blue Notebook",   color: "#4d96ff", unlockAt: "start" },
        { id: "green",  label: "Green Notebook",  color: "#37b58f", unlockAt: "stars:6" },
        { id: "gold",   label: "Gold Notebook",   color: "#e0b53d", unlockAt: "stars:15" },
        { id: "arcane", label: "Arcane Notebook", color: "#7a6ae8", unlockAt: "achievement:stars-30" }
      ],
      dialogueThemes: [
        { id: "dawn",   label: "Dawn",    unlockAt: "start" },
        { id: "forest", label: "Forest",  unlockAt: "start" },
        { id: "dusk",   label: "Dusk",    unlockAt: "stars:9" },
        { id: "candy",  label: "Candy",   unlockAt: "achievement:stars-15" }
      ],
      titles: [
        { id: "founder",       label: "Founder",        unlockAt: "start" },
        { id: "guide",         label: "Sales Guide",    unlockAt: "start" },
        { id: "question-smith",label: "Question Smith", unlockAt: "rank:3" },
        { id: "mirror-adept",  label: "Mirror Adept",   unlockAt: "rank:4" },
        { id: "arena-champ",   label: "Arena Champion", unlockAt: "achievement:boss-all" },
        { id: "pattern-master",label: "Pattern Master", unlockAt: "rank:7" }
      ]
    },
    defaults: { avatar: { name: "Jason", title: "founder", skin: 0, face: 0, hair: 0, hairColor: 0, outfit: 0, accessory: 0, notebook: 0, theme: 0 } }
  });

  /* ================= LEVELS-A (fallback: 1 level) ================= */
  fill("levels-a", {
    levels: [{
      id: "lv-opening-1", region: "opening-village",
      name: "The First Hello", subtitle: "Meet Marcus by the fountain.",
      intro: "Your first real prospect. Listen first — the clues are in his words.",
      teaches: ["open"],
      npc: {
        id: "marcus-vale", name: "Marcus Vale", business: "Vale & Sons Roofing", role: "Owner, 25 years",
        primary: "intelligence", secondary: "status",
        personality: "Proud craftsman. Tests whether you understand the technical side before he trusts you.",
        portrait: { skin: "#8d5a3b", hair: "short-crop", hairColor: "#2b2b2b", outfit: "#31456b", accessory: "glasses", bg: "#ffd9a0" }
      },
      beats: [
        { t: "say", who: "narrator", text: "Opening Village. Cobblestones, a fountain, and your first real prospect checking his watch." },
        { t: "say", who: "npc", emotion: "guarded", text: "I have been in this industry for twenty-five years. Most developers do not understand the technical side of our business." },
        { t: "identify", prompt: "Who are you talking to? Read his words, not your hopes.",
          options: ["intelligence", "status", "growth", "connection", "freedom"],
          answer: { primary: "intelligence", secondary: "status" },
          feedbackWin: "Yes — 'twenty-five years' and 'technical side' is competence talking, and 'most developers do not understand' is authority. Speak to both.",
          feedbackLose: "Look again: he led with experience and technical mastery (Intelligence), and positioned himself above 'most developers' (Status).",
          points: 80 },
        { t: "say", who: "npc", emotion: "neutral", text: "So. You have sixty seconds before my next job site. What do you want to know?" },
        { t: "choose", stage: "open", tool: null,
          setup: "Open the call. Keep the master opening question — translated into his language.",
          options: [
            { text: "Twenty-five years of roofing — what made now the moment to look seriously at the website side?", quality: 3,
              feedback: "His guard drops. You kept the opening 'why now' question and honored his experience and expertise. +20", tags: [] },
            { text: "What is your website situation at the moment?", quality: 2,
              feedback: "Inside the frame, but generic — it could be asked of anyone. He answers flatly. +8", tags: [] },
            { text: "Wow, twenty-five years! You must be the best roofer in the county. Ready to buy a website?", quality: 1,
              feedback: "Empty flattery plus a premature pitch — he has heard both a thousand times. His arms cross. -25", tags: ["flattery", "premature-pitch"] }
          ],
          teaching: "The opening question never changes: why is now the time? Only the words change, to match who is hearing it." },
        { t: "say", who: "npc", emotion: "thinking", text: "Honestly? Two competitors just redid their sites. They look… competent. I do not like being out-engineered." },
        { t: "choose", stage: "open", tool: "mirror",
          setup: "Mirror him. Show you heard the meaning, not just the words.",
          options: [
            { text: "Out-engineered — so this is not about looking pretty, it is about your work being judged fairly?", quality: 3,
              feedback: "You mirrored the meaning under his words: competence and standing. He leans in. +20", tags: [] },
            { text: "Two competitors redid their sites.", quality: 2,
              feedback: "A flat parrot-mirror. Accurate, but it hands his own words back without meaning. +8", tags: [] },
            { text: "Sounds like you are worried. Do not worry — our websites beat anyone's.", quality: 1,
              feedback: "You rushed to reassure and pitched. Worry dismissed is trust dismissed. -15", tags: ["premature-pitch", "forced-agreement"] }
          ],
          teaching: "A strong mirror names the meaning underneath the words. A weak one just repeats the words." },
        { t: "say", who: "npc", emotion: "happy", text: "Exactly. Fairly judged. Huh. Most salespeople hear 'twenty-five years' and start flattering me." },
        { t: "choose", stage: "open", tool: "anchor",
          setup: "Anchor the next step to his identity as a craftsman — stay in the frame.",
          options: [
            { text: "A craftsman judges by the work. Can we look at what your site currently says about the work?", quality: 3,
              feedback: "You anchored the next question to who he believes he is — and stayed on discovery. +20", tags: [] },
            { text: "Let us keep talking about your business a bit more.", quality: 2,
              feedback: "Safe and in-frame, but vague. No anchor, no direction. +8", tags: [] },
            { text: "Trust me, I work with tons of roofers. Let me show you our package.", quality: 1,
              feedback: "'Trust me' plus a package is a premature pitch in borrowed authority. He checks his watch. -15", tags: ["premature-pitch", "off-frame"] }
          ],
          teaching: "An anchor ties your next question to something they already believe about themselves." },
        { t: "end", outcome: "next-step", emotion: "impressed", text: "Marcus pockets his watch. 'Walk the job site with me Thursday. Bring your questions.' The frame held. Onward to Intent Gardens!" }
      ],
      starThresholds: [0.55, 0.8],
      unlockAfter: null
    }]
  });

  /* ================= BOSSES (fallback: 1 boss) ================= */
  fill("bosses", {
    bosses: [{
      id: "boss-think-about-it", name: "The Hesitation Wall",
      objectionText: "I need to think about it.",
      npc: {
        id: "dana-hesitance", name: "Dana Wexler", business: "Wexler Interiors", role: "Founder",
        primary: "certainty", secondary: "status",
        personality: "Careful, methodical, hates being rushed. 'Think about it' is her shield.",
        portrait: { skin: "#eec39a", hair: "bun", hairColor: "#5a3a22", outfit: "#7a6ae8", accessory: "earring", bg: "#e8d8ff" }
      },
      intro: [
        { t: "say", who: "narrator", text: "The Arena doors swing open. The first wall rises: polite, reasonable, and deadly to deals." },
        { t: "say", who: "npc", emotion: "guarded", text: "Everything sounds fine. But I need to think about it before I decide anything." }
      ],
      rounds: [
        { step: "receive", npcLine: "I need to think about it.",
          options: [
            { text: "Of course — it is a real decision. So I do not leave you with fog: what exactly will you be thinking about?", quality: 3,
              feedback: "You received it fully, then opened the door to what is underneath. The wall cracks. +15", tags: [] },
            { text: "Sure, take your time.", quality: 2,
              feedback: "Respectful, but you let the door close. Nothing to work with next. +8", tags: [] },
            { text: "What is there to think about? The offer is clear.", quality: 1,
              feedback: "You swatted her shield aside — she grips it tighter. -25", tags: ["pressure"] }
          ] },
        { step: "clarify", npcLine: "Just… whether it is the right move. Whether it is safe.",
          options: [
            { text: "Safe — meaning the money, the process, or whether I will actually deliver what I described?", quality: 3,
              feedback: "You clarified the shape of her fear without guessing. Certainty-minded people relax when things get specific. +15", tags: [] },
            { text: "What do you mean by safe?", quality: 2,
              feedback: "The right instinct, loosely asked. She has to do the work of specifying. +8", tags: [] },
            { text: "It is totally safe. Everyone loves it.", quality: 1,
              feedback: "A blanket guarantee answers nothing and costs credibility. -12", tags: ["forced-agreement"] }
          ] },
        { step: "isolate", npcLine: "Mostly whether you will deliver. The money I can plan for.",
          options: [
            { text: "Got it. If delivery were demonstrably handled — is there anything else that would hold this back?", quality: 3,
              feedback: "You isolated the one real objection. Now there is a single wall to resolve, not a fog. +15", tags: [] },
            { text: "So delivery is the main thing?", quality: 2,
              feedback: "You named it but did not isolate it — other objections may still be hiding. +8", tags: [] },
            { text: "Delivery is no problem. Let us talk price instead.", quality: 1,
              feedback: "You changed the subject mid-structure. The objection stays alive. -12", tags: ["off-frame"] }
          ] },
        { step: "resolve", npcLine: "How would I know delivery is handled before I pay?",
          options: [
            { text: "Fair test. The managed plan is $197/mo after six initial billing periods, then month-to-month — you can stop if I stop delivering. No upfront fee.", quality: 3,
              feedback: "You resolved with real Apohenia terms, unchanged. Facts, not promises. +15", tags: [] },
            { text: "You would see drafts and progress along the way.", quality: 2,
              feedback: "True and helpful, but softer than the actual terms you could have stood on. +8", tags: [] },
            { text: "I can knock the price down and guarantee leads if you sign today.", quality: 1,
              feedback: "Changing terms and promising leads breaks both the frame and the truth. -30", tags: ["terms-change", "manipulation"] }
          ] },
        { step: "decide", npcLine: "Month-to-month after the initial periods… that I can think about clearly.",
          options: [
            { text: "Then decide on the facts, not the fog: start managed, and the risk sits on me to keep delivering. Shall we begin?", quality: 3,
              feedback: "A clean decide: same offer, same terms, her fear answered. She nods. +15", tags: [] },
            { text: "Take a week and let me know.", quality: 2,
              feedback: "Polite, but you handed the momentum back to the fog. +8", tags: [] },
            { text: "This price is only good today.", quality: 1,
              feedback: "Fake urgency is pressure. Her shield slams back up. -25", tags: ["pressure", "manipulation"] }
          ] }
      ],
      winText: "Dana smiles for the first time. 'Thursday works.' The Hesitation Wall crumbles into a doorway.",
      loseText: "The wall holds this time. Dana is not angry — just unresolved. Study the five steps and return.",
      ethicalNote: "Boundary: 'thinking about it' is answered with clarity, never pressure. You resolve fear with facts — you never manufacture urgency."
    }]
  });

  /* ================= PRACTICE (fallback: small drills) ================= */
  fill("practice", {
    drills: {
      archetype: [
        { npcLine: "I have run this shop for thirty years. I can spot shoddy work in seconds — including websites.", clue: "Listen for experience and testing.",
          options: ["intelligence", "novelty", "connection", "freedom"], answer: { primary: "intelligence", secondary: null },
          explain: "Decades of craft plus testing your competence = Intelligence. No second strong signal here." },
        { npcLine: "Before anything else: what happens if it goes wrong? I need to know exactly how this works.", clue: "Listen for risk and process.",
          options: ["certainty", "growth", "recognition", "status"], answer: { primary: "certainty", secondary: null },
          explain: "'If it goes wrong' and 'exactly how' = Certainty / Security." },
        { npcLine: "I do not want to be locked into anything. I like keeping my options open.", clue: "Listen for control and commitment.",
          options: ["freedom", "certainty", "efficiency", "contribution"], answer: { primary: "freedom", secondary: null },
          explain: "Allergic to lock-in = Freedom / Autonomy." },
        { npcLine: "My customers are like family. I need to feel I can trust whoever touches our name.", clue: "Listen for relationship-first language.",
          options: ["connection", "status", "novelty", "intelligence"], answer: { primary: "connection", secondary: null },
          explain: "Family, trust, name = Connection / Trust." }
      ],
      recall: [
        { stage: "open", prompt: "The master frame always opens with which question?",
          options: ["Why is now the time to look at this?", "What is your budget?", "Can I show you our packages?", "Who built your current site?"], answerIndex: 0,
          explain: "The frame opens with intent: why now. Budgets and packages come much later — or never." },
        { stage: "recommend", prompt: "When do you recommend an Apohenia offer?",
          options: ["After the gap and impact are clear", "As early as possible", "Whenever they ask about price", "Before discovery, to save time"], answerIndex: 0,
          explain: "Recommendation follows discovery. Early pitching breaks the frame." },
        { stage: "decide", prompt: "A prospect is clearly a poor fit. The winning move is…",
          options: ["Say so honestly and close cleanly", "Offer a discount", "Push the managed plan anyway", "Ghost them politely"], answerIndex: 0,
          explain: "An honest no-fit is a winning end. It is rewarded, not punished." }
      ],
      mirror: [
        { npcLine: "Every week I am patching something on that site instead of seeing customers.",
          options: ["The site is stealing time from the work that actually pays.", "You patch the site every week.", "Have you tried a different host?", "Websites need maintenance, that is normal."], answerIndex: 0,
          explain: "Mirror the meaning: time theft. Not the words, not advice, not normalizing." },
        { npcLine: "My last developer vanished after launch. I felt stupid for trusting him.",
          options: ["Being left holding the bag once makes trusting again feel risky.", "He vanished after launch.", "I am not like that guy.", "That happens a lot in this industry."], answerIndex: 0,
          explain: "Name the wound (trust feels risky now), do not defend yourself or the industry." },
        { npcLine: "I want the site to look like we are the obvious choice, not just another option.",
          options: ["You want the site to carry the reputation you have already earned.", "You want to look like the obvious choice.", "Design trends are minimal this year.", "Everyone wants to stand out."], answerIndex: 0,
          explain: "The meaning: earned recognition. Mirror that, not the surface words." }
      ],
      anchor: [
        { situation: "A certainty-minded prospect is nervous about starting.",
          options: ["You plan carefully — so let us map exactly what happens in week one.", "Do not worry, it will be fine.", "Most people just sign up and figure it out.", "Let me send you 40 pages of documentation."], answerIndex: 0,
          explain: "Anchor to their identity (careful planner) with a concrete next step. Reassurance and overload both fail." },
        { situation: "A status-minded owner hesitates to book a follow-up.",
          options: ["Owners at your level do not wait on vendors — shall I hold Thursday for your decision?", "Please book a call when you can.", "I will chase you next week.", "My calendar is open anytime, you decide, no pressure, sorry."], answerIndex: 0,
          explain: "Anchor the scheduling to their authority. Chasing and groveling both lower the frame." },
        { situation: "An efficiency-minded prospect is drifting in the conversation.",
          options: ["You value directness — bottom line: next step is a 20-minute scoping call, yes or no?", "Let me tell you our whole company story.", "What are your thoughts so far?", "We could also circle back in a few months."], answerIndex: 0,
          explain: "Match their pace: short, concrete, decision-shaped. Stories and drift lose them." }
      ]
    },
    simCalls: [],
    randomNpcPool: [
      { id: "random-pip", name: "Pip Orona", business: "Orona Bakery", role: "Owner",
        primary: "connection", secondary: "recognition",
        personality: "Warm, chatty, proud of her regulars. Decides on trust.",
        portrait: { skin: "#d9a066", hair: "curly", hairColor: "#5a3a22", outfit: "#e86a92", accessory: "none", bg: "#ffd1dc" } },
      { id: "random-dex", name: "Dex Halden", business: "Halden Logistics", role: "GM",
        primary: "efficiency", secondary: null,
        personality: "Rapid-fire, bottom-line, allergic to fluff.",
        portrait: { skin: "#b8793f", hair: "buzz", hairColor: "#2b2b2b", outfit: "#5aa7b8", accessory: "cap", bg: "#d8f3ff" } }
    ]
  });
})();
