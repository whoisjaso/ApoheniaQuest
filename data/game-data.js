/* ============================================================
   game-data.js — merges window.__SQ_PARTS into window.SALES_QUEST
   Load AFTER data/parts/*.js and assets/js/mock-data.js.
   Tolerates missing parts: console.warn + graceful placeholders.
   ============================================================ */
(function () {
  "use strict";
  var P = (window.__SQ_PARTS = window.__SQ_PARTS || {});

  function warn(msg) { if (window.console && console.warn) console.warn("[game-data] " + msg); }

  /* --- meta ------------------------------------------------ */
  var meta = P["meta"] || null;
  if (!meta) {
    warn('part "meta" missing — using emergency minimal meta (game will be sparse).');
    meta = {
      title: { gameName: "APOHENIA: SALES QUEST", tagline: "One frame. Every call.", menuLabels: {} },
      archetypes: {},
      regions: [
        { id: "opening-village", name: "Opening Village", mapBlurb: "", icon: "village", theme: { sky: "#9fd8ff", ground: "#8ecb6d", accent: "#ff8a5c" } },
        { id: "intent-gardens", name: "Intent Gardens", mapBlurb: "", icon: "garden", theme: { sky: "#bdf0d0", ground: "#5fbf7a", accent: "#ff6f91" } },
        { id: "experience-trail", name: "Experience Trail", mapBlurb: "", icon: "trail", theme: { sky: "#ffe9a8", ground: "#d9a85c", accent: "#8a6de0" } },
        { id: "process-forest", name: "Process Forest", mapBlurb: "", icon: "forest", theme: { sky: "#a8e6cf", ground: "#3f8f5f", accent: "#ffd93d" } },
        { id: "gap-caverns", name: "Gap Caverns", mapBlurb: "", icon: "cave", theme: { sky: "#c9c3e8", ground: "#6a5f9e", accent: "#ffb84d" } },
        { id: "impact-city", name: "Impact City", mapBlurb: "", icon: "city", theme: { sky: "#ffd1dc", ground: "#8f9bb3", accent: "#ff5c5c" } },
        { id: "future-fields", name: "Future Fields", mapBlurb: "", icon: "fields", theme: { sky: "#d8f3ff", ground: "#a5d66d", accent: "#4d96ff" } },
        { id: "recommendation-castle", name: "Recommendation Castle", mapBlurb: "", icon: "castle", theme: { sky: "#e8d8ff", ground: "#9e8ac9", accent: "#ffd93d" } },
        { id: "objection-arena", name: "Objection Arena", mapBlurb: "", icon: "arena", theme: { sky: "#ffe0b3", ground: "#c96f4a", accent: "#7a2e2e" }, bossRegion: true },
        { id: "closing-summit", name: "Closing Summit", mapBlurb: "", icon: "summit", theme: { sky: "#cfe8ff", ground: "#e8f4ff", accent: "#4d96ff" } }
      ],
      scoring: {
        IDENTIFY_PRIMARY: 50, IDENTIFY_SECONDARY: 30, CHOICE_BEST: 20, CHOICE_OK: 8,
        penalties: { "wrong-archetype": -8, "off-frame": -12, "flattery": -10, "forced-agreement": -12, "manipulation": -25, "premature-pitch": -15, "terms-change": -30, "skips-discovery": -15, "pressure": -25 },
        OFFER_CORRECT: 40, OBJECTION_STEP_BEST: 15, BOSS_WIN: 150, STREAK_BONUS: 5
      },
      ranks: [{ minXP: 0, name: "New Voice" }],
      achievements: [], dialogueSkills: [],
      avatarCatalog: { skinTones: ["#f7d7b8"], faces: ["round"], hairs: [{ id: "buzz", label: "Buzz", unlockAt: "start" }], hairColors: ["#2b2b2b"], outfits: [{ id: "tee", label: "Tee", color: "#4d96ff", unlockAt: "start" }], accessories: [{ id: "none", label: "None", unlockAt: "start" }], notebooks: [{ id: "red", label: "Red", color: "#d95757", unlockAt: "start" }], dialogueThemes: [{ id: "dawn", label: "Dawn", unlockAt: "start" }], titles: [{ id: "founder", label: "Founder", unlockAt: "start" }] },
      defaults: { avatar: { name: "Jason", title: "Founder", skin: 0, face: 0, hair: 0, hairColor: 0, outfit: 0, accessory: 0, notebook: 0, theme: 0 } }
    };
  }

  /* --- levels ---------------------------------------------- */
  function extractLevels(part, key) {
    if (!part) { warn('part "' + key + '" missing.'); return []; }
    if (Array.isArray(part)) return part;
    if (Array.isArray(part.levels)) return part.levels;
    warn('part "' + key + '" has unexpected shape (no levels array).');
    return [];
  }
  var pool = extractLevels(P["levels-a"], "levels-a").concat(extractLevels(P["levels-b"], "levels-b"));

  var regions = meta.regions || [];
  var levels = regions.map(function (region, i) {
    var lv = null;
    for (var k = 0; k < pool.length; k++) { if (pool[k] && pool[k].region === region.id) { lv = pool[k]; break; } }
    if (!lv) {
      warn('no level for region "' + region.id + '" — placeholder "coming soon" card inserted.');
      lv = {
        id: "lv-placeholder-" + region.id, region: region.id,
        name: region.name, subtitle: "Coming soon…",
        intro: "This trail is still being paved. Check back soon!",
        placeholder: true,
        npc: null, teaches: [], beats: [],
        starThresholds: [0.55, 0.8],
        unlockAfter: i === 0 ? null : "lv-placeholder-" + regions[i - 1].id
      };
    }
    return lv;
  });
  // chain placeholders onto the actual previous level id so unlocking stays coherent
  levels.forEach(function (lv, i) {
    if (lv.placeholder && i > 0) lv.unlockAfter = levels[i - 1].id;
  });

  /* --- bosses ---------------------------------------------- */
  var bosses = [];
  if (P["bosses"]) {
    bosses = Array.isArray(P["bosses"]) ? P["bosses"] : (P["bosses"].bosses || []);
  }
  if (!bosses.length) warn('part "bosses" missing or empty — Objection Arena will be quiet.');

  /* --- practice -------------------------------------------- */
  var practice = P["practice"] || null;
  if (!practice) {
    warn('part "practice" missing — Practice Mode will offer what it can.');
    practice = { drills: { archetype: [], recall: [], mirror: [], anchor: [] }, simCalls: [], randomNpcPool: [] };
  }
  practice.drills = practice.drills || {};
  ["archetype", "recall", "mirror", "anchor"].forEach(function (k) {
    if (!Array.isArray(practice.drills[k])) practice.drills[k] = [];
  });
  if (!Array.isArray(practice.simCalls)) practice.simCalls = [];
  if (!Array.isArray(practice.randomNpcPool)) practice.randomNpcPool = [];

  window.SALES_QUEST = { meta: meta, levels: levels, bosses: bosses, practice: practice };
  if (window.console && console.info) {
    console.info("[game-data] merged: " + levels.filter(function (l) { return !l.placeholder; }).length +
      "/10 levels, " + bosses.length + " bosses, " +
      (practice.drills.archetype.length + practice.drills.recall.length + practice.drills.mirror.length + practice.drills.anchor.length) + " drills.");
  }
})();
