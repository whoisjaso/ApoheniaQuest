// Validation script for APOHENIA: SALES QUEST content data.
// Run: node validate.js
global.window = {};
require("./data/parts/00-meta.js");
require("./data/parts/20-bosses.js");
require("./data/parts/21-practice.js");

const P = window.__SQ_PARTS;
let failures = 0;
const ok = (cond, msg) => { if (!cond) { failures++; console.error("FAIL: " + msg); } };
const len = (s) => (s || "").length;

// ---------- META ----------
const meta = P.meta;
ok(meta, "meta part exists");
const ARCH = ["intelligence","status","certainty","freedom","growth","connection","recognition","novelty","contribution","efficiency"];
const metaArch = Object.keys(meta.archetypes || {});
ok(metaArch.length === 10, "meta: 10 archetypes (got " + metaArch.length + ")");
ARCH.forEach(a => {
  const arch = meta.archetypes[a];
  ok(arch, "meta: archetype " + a + " present");
  if (arch) {
    ok(arch.id === a && typeof arch.name === "string" && arch.name.includes("/"), "meta: " + a + " has id + paired name");
    ok(Array.isArray(arch.tells) && arch.tells.length >= 3 && arch.tells.length <= 4, "meta: " + a + " has 3-4 tells");
    ok(/^#[0-9a-fA-F]{6}$/.test(arch.color), "meta: " + a + " has hex color");
  }
});
const colors = new Set(metaArch.map(a => meta.archetypes[a].color));
ok(colors.size === 10, "meta: archetype colors distinct (got " + colors.size + ")");

const REGION_ORDER = ["opening-village","intent-gardens","experience-trail","process-forest","gap-caverns","impact-city","future-fields","recommendation-castle","objection-arena","closing-summit"];
const ICONS = ["village","garden","trail","forest","cave","city","fields","castle","arena","summit"];
ok(Array.isArray(meta.regions) && meta.regions.length === 10, "meta: 10 regions");
(meta.regions || []).forEach((r, i) => {
  ok(r.id === REGION_ORDER[i], "meta: region " + i + " id is " + REGION_ORDER[i] + " (got " + r.id + ")");
  ok(typeof r.name === "string" && r.name.length > 0, "meta: region " + r.id + " has name");
  ok(typeof r.mapBlurb === "string" && r.mapBlurb.length > 0, "meta: region " + r.id + " has mapBlurb");
  ok(r.theme && /^#/.test(r.theme.sky) && /^#/.test(r.theme.ground) && /^#/.test(r.theme.accent), "meta: region " + r.id + " theme colors");
  ok(ICONS.includes(r.icon), "meta: region " + r.id + " valid icon (got " + r.icon + ")");
  if (r.id === "objection-arena") ok(r.bossRegion === true, "meta: objection-arena bossRegion:true");
  else ok(r.bossRegion !== true, "meta: region " + r.id + " not bossRegion");
});

const S = meta.scoring;
ok(S && S.IDENTIFY_PRIMARY === 50 && S.IDENTIFY_SECONDARY === 30 && S.CHOICE_BEST === 20 && S.CHOICE_OK === 8, "meta: scoring core constants");
ok(S && S.OFFER_CORRECT === 40 && S.OBJECTION_STEP_BEST === 15 && S.BOSS_WIN === 150 && S.STREAK_BONUS === 5, "meta: scoring extended constants");
const PEN = { "wrong-archetype":-8,"off-frame":-12,"flattery":-10,"forced-agreement":-12,"manipulation":-25,"premature-pitch":-15,"terms-change":-30,"skips-discovery":-15,"pressure":-25 };
Object.keys(PEN).forEach(k => ok(S.penalties[k] === PEN[k], "meta: penalty " + k + " === " + PEN[k]));

ok(Array.isArray(meta.ranks) && meta.ranks.length === 8, "meta: 8 ranks");
ok(meta.ranks[0].minXP === 0 && meta.ranks[0].name === "New Voice", "meta: rank 1 is New Voice @0");
ok(meta.ranks[7].name === "Pattern Master", "meta: top rank is Pattern Master");
for (let i = 1; i < meta.ranks.length; i++) ok(meta.ranks[i].minXP > meta.ranks[i-1].minXP, "meta: ranks ascending minXP at index " + i);

ok(Array.isArray(meta.achievements) && meta.achievements.length === 15, "meta: 15 achievements (got " + (meta.achievements||[]).length + ")");
const RULE_TYPES = ["stars","xp","streak","bosses","levels","drills"];
(meta.achievements || []).forEach(a => {
  ok(a.id && a.name && a.desc, "meta: achievement complete fields: " + a.id);
  ok(a.rule && RULE_TYPES.includes(a.rule.type) && typeof a.rule.n === "number", "meta: achievement " + a.id + " valid rule");
});

ok(Array.isArray(meta.dialogueSkills) && meta.dialogueSkills.length === 6, "meta: 6 dialogueSkills");
(meta.dialogueSkills || []).forEach(s => ok(s.id && s.name && s.desc && s.unlockAt, "meta: skill fields complete: " + s.id));

const C = meta.avatarCatalog || {};
ok((C.skinTones||[]).length === 6 && C.skinTones.every(h => /^#[0-9a-fA-F]{6}$/.test(h)), "meta: 6 skinTones hex");
ok((C.faces||[]).length === 5, "meta: 5 faces");
ok((C.hairs||[]).length === 8, "meta: 8 hairs");
ok((C.hairColors||[]).length === 6, "meta: 6 hairColors");
ok((C.outfits||[]).length === 6, "meta: 6 outfits");
ok((C.accessories||[]).length === 6, "meta: 6 accessories");
ok((C.notebooks||[]).length === 5, "meta: 5 notebooks");
ok((C.dialogueThemes||[]).length === 4, "meta: 4 dialogueThemes");
ok((C.titles||[]).length === 6, "meta: 6 titles");
const gatedGroups = ["hairs","outfits","accessories","notebooks","dialogueThemes","titles"];
let totalItems = 0, startItems = 0;
gatedGroups.forEach(g => (C[g]||[]).forEach(item => {
  totalItems++;
  ok(item.id && item.label && typeof item.unlockAt === "string", "meta: " + g + " item complete: " + item.id);
  if (item.unlockAt === "start") startItems++;
  else ok(/^(level:lv-|stars:\d+|rank:\d+|achievement:ach-)/.test(item.unlockAt), "meta: " + g + " " + item.id + " unlockAt format (got " + item.unlockAt + ")");
}));
ok(totalItems > 0 && startItems / totalItems >= 0.4, "meta: >=40% avatar items unlockAt start (" + startItems + "/" + totalItems + ")");
(C.outfits||[]).forEach(o => ok(/^#[0-9a-fA-F]{6}$/.test(o.color), "meta: outfit " + o.id + " color hex"));
(C.notebooks||[]).forEach(n => ok(/^#[0-9a-fA-F]{6}$/.test(n.color), "meta: notebook " + n.id + " color hex"));
const D = meta.defaults;
ok(D && D.avatar && D.avatar.name === "Jason" && typeof D.avatar.skin === "number" && typeof D.avatar.theme === "number", "meta: defaults.avatar present with indexes");

// ---------- BOSSES ----------
const EXPECTED = [
  ["boss-think-about-it", "I need to think about it."],
  ["boss-costs-too-much", "It costs too much."],
  ["boss-speak-with-partner", "I need to speak with my partner."],
  ["boss-already-have-website", "I already have a website."],
  ["boss-build-with-ai", "I can build it with AI."],
  ["boss-guarantee-leads", "Can you guarantee leads?"],
  ["boss-lower-price", "Can you lower the price?"]
];
const bosses = P.bosses && P.bosses.bosses;
ok(Array.isArray(bosses) && bosses.length === 7, "bosses: exactly 7 (got " + (bosses||[]).length + ")");
const STEP_ORDER = ["receive","clarify","isolate","resolve","decide"];
const NPC_KEYS = ["id","name","business","role","primary","secondary","personality","portrait"];
function checkNpc(npc, where) {
  NPC_KEYS.forEach(k => ok(npc && npc[k], where + ": npc has " + k));
  if (npc) {
    ok(ARCH.includes(npc.primary) && (npc.secondary === null || ARCH.includes(npc.secondary)), where + ": npc archetypes valid");
    ok(npc.portrait && /^#[0-9a-fA-F]{6}$/.test(npc.portrait.skin) && /^#[0-9a-fA-F]{6}$/.test(npc.portrait.outfit) && /^#[0-9a-fA-F]{6}$/.test(npc.portrait.bg), where + ": portrait colors");
  }
}
function checkOptionSet(options, where, allow4) {
  ok(Array.isArray(options) && (options.length === 3 || (allow4 && options.length === 4)), where + ": 3-4 options (got " + (options||[]).length + ")");
  const q3 = (options||[]).filter(o => o.quality === 3);
  ok(q3.length === 1, where + ": exactly one quality:3 (got " + q3.length + ")");
  (options||[]).forEach((o, i) => {
    ok(typeof o.text === "string" && len(o.text) > 0, where + " opt" + i + " text present");
    ok(len(o.text) <= 140, where + " opt" + i + " text <=140 (" + len(o.text) + "): " + (o.text||"").slice(0,50));
    ok(typeof o.feedback === "string" && o.feedback.length > 0, where + " opt" + i + " feedback present");
    ok([1,2,3].includes(o.quality), where + " opt" + i + " quality 1-3");
    ok(Array.isArray(o.tags), where + " opt" + i + " tags array");
    if (o.quality >= 2) ok(o.tags.length === 0, where + " opt" + i + " quality>=2 has no flaw tags");
    (o.tags||[]).forEach(t => ok(Object.keys(PEN).includes(t), where + " opt" + i + " known tag: " + t));
  });
}
(bosses||[]).forEach((b, i) => {
  ok(b.id === EXPECTED[i][0], "bosses: #" + i + " id " + EXPECTED[i][0] + " (got " + b.id + ")");
  ok(b.objectionText === EXPECTED[i][1], "bosses: #" + i + " objection \"" + EXPECTED[i][1] + "\" (got \"" + b.objectionText + "\")");
  ok(typeof b.name === "string" && b.name.startsWith("The "), "bosses: " + b.id + " has boss name");
  checkNpc(b.npc, "boss " + b.id);
  ok(Array.isArray(b.intro) && b.intro.length >= 2 && b.intro.length <= 3, "bosses: " + b.id + " intro 2-3 beats");
  (b.intro||[]).forEach(s => { ok(s.t === "say", "bosses: " + b.id + " intro beat is say"); ok(len(s.text) <= 220, "bosses: " + b.id + " intro say <=220 (" + len(s.text) + ")"); });
  ok(Array.isArray(b.rounds) && b.rounds.length === 5, "bosses: " + b.id + " 5 rounds");
  (b.rounds||[]).forEach((r, j) => {
    ok(r.step === STEP_ORDER[j], "bosses: " + b.id + " round " + j + " step " + STEP_ORDER[j] + " (got " + r.step + ")");
    ok(len(r.npcLine) <= 220, "bosses: " + b.id + " round " + j + " npcLine <=220 (" + len(r.npcLine) + ")");
    checkOptionSet(r.options, "boss " + b.id + " " + r.step, true);
  });
  ok(typeof b.winText === "string" && b.winText.length > 0, "bosses: " + b.id + " winText");
  ok(typeof b.loseText === "string" && b.loseText.length > 0, "bosses: " + b.id + " loseText");
  ok(typeof b.ethicalNote === "string" && b.ethicalNote.length > 0, "bosses: " + b.id + " ethicalNote");
});

// ---------- PRACTICE ----------
const pr = P.practice;
ok(pr && pr.drills && pr.simCalls && pr.randomNpcPool, "practice: drills/simCalls/randomNpcPool present");
ok((pr.drills.archetype||[]).length === 12, "practice: 12 archetype drills");
const primaries = new Set();
(pr.drills.archetype||[]).forEach((d, i) => {
  primaries.add(d.answer && d.answer.primary);
  ok(len(d.npcLine) <= 220, "practice: archetype drill " + i + " npcLine <=220 (" + len(d.npcLine) + ")");
  ok(typeof d.clue === "string" && d.clue.length > 0, "practice: archetype drill " + i + " clue");
  ok(Array.isArray(d.options) && d.options.length === 4 && d.options.every(o => ARCH.includes(o)), "practice: archetype drill " + i + " 4 valid options");
  ok(d.answer && ARCH.includes(d.answer.primary), "practice: archetype drill " + i + " answer primary valid");
  ok(d.answer.secondary === null || ARCH.includes(d.answer.secondary), "practice: archetype drill " + i + " answer secondary valid/null");
  ok(d.options.includes(d.answer.primary), "practice: archetype drill " + i + " options include answer");
  ok(typeof d.explain === "string" && d.explain.length > 0, "practice: archetype drill " + i + " explain");
});
ARCH.forEach(a => ok(primaries.has(a), "practice: archetype drills cover " + a + " as primary"));

ok((pr.drills.recall||[]).length === 10, "practice: 10 recall drills");
(pr.drills.recall||[]).forEach((d, i) => {
  ok(typeof d.stage === "string" && typeof d.prompt === "string", "practice: recall " + i + " stage+prompt");
  ok(Array.isArray(d.options) && d.options.length === 4, "practice: recall " + i + " 4 options");
  ok(Number.isInteger(d.answerIndex) && d.answerIndex >= 0 && d.answerIndex < 4, "practice: recall " + i + " answerIndex valid");
  ok(typeof d.explain === "string" && d.explain.length > 0, "practice: recall " + i + " explain");
});
ok((pr.drills.mirror||[]).length === 8, "practice: 8 mirror drills");
ok((pr.drills.anchor||[]).length === 8, "practice: 8 anchor drills");
(pr.drills.mirror||[]).forEach((d, i) => {
  ok(len(d.npcLine) <= 220, "practice: mirror " + i + " npcLine <=220");
  ok(Array.isArray(d.options) && d.options.length === 4, "practice: mirror " + i + " 4 options");
  d.options.forEach((t, j) => ok(len(t) <= 140, "practice: mirror " + i + " opt" + j + " <=140 (" + len(t) + ")"));
  ok(Number.isInteger(d.answerIndex) && d.answerIndex >= 0 && d.answerIndex < 4, "practice: mirror " + i + " answerIndex");
  ok(typeof d.explain === "string" && d.explain.length > 0, "practice: mirror " + i + " explain");
});
(pr.drills.anchor||[]).forEach((d, i) => {
  ok(typeof d.situation === "string" && d.situation.length > 0, "practice: anchor " + i + " situation");
  ok(Array.isArray(d.options) && d.options.length === 4, "practice: anchor " + i + " 4 options");
  d.options.forEach((t, j) => ok(len(t) <= 140, "practice: anchor " + i + " opt" + j + " <=140 (" + len(t) + ")"));
  ok(Number.isInteger(d.answerIndex) && d.answerIndex >= 0 && d.answerIndex < 4, "practice: anchor " + i + " answerIndex");
  ok(typeof d.explain === "string" && d.explain.length > 0, "practice: anchor " + i + " explain");
});

ok(Array.isArray(pr.simCalls) && pr.simCalls.length === 2, "practice: 2 simCalls");
const SIM_IDS = ["sim-garage", "sim-florist"];
const SIM_ANSWERS = { "sim-garage": "managed", "sim-florist": "ownership" };
(pr.simCalls||[]).forEach((lv, i) => {
  ok(lv.id === SIM_IDS[i], "simCall " + i + " id " + SIM_IDS[i]);
  ok(lv.region === "closing-summit", "simCall " + lv.id + " region closing-summit");
  ok(Array.isArray(lv.beats) && lv.beats.length >= 12 && lv.beats.length <= 16, "simCall " + lv.id + " 12-16 beats (got " + (lv.beats||[]).length + ")");
  ok(Array.isArray(lv.teaches) && lv.teaches.length > 0, "simCall " + lv.id + " teaches");
  ok(JSON.stringify(lv.starThresholds) === JSON.stringify([0.55, 0.8]), "simCall " + lv.id + " starThresholds");
  ok("unlockAfter" in lv, "simCall " + lv.id + " unlockAfter key");
  checkNpc(lv.npc, "simCall " + lv.id);
  let hasIdentify = false, hasOffer = false, hasObjection = false, hasEnd = false;
  (lv.beats||[]).forEach((bt, j) => {
    const where = "simCall " + lv.id + " beat" + j + "(" + bt.t + ")";
    if (bt.t === "say") ok(len(bt.text) <= 220, where + " say <=220 (" + len(bt.text) + ")");
    if (bt.t === "identify") {
      hasIdentify = true;
      ok(Array.isArray(bt.options) && bt.options.length >= 4 && bt.options.length <= 5, where + " 4-5 options");
      ok(bt.answer && ARCH.includes(bt.answer.primary), where + " answer primary valid");
      ok(bt.feedbackWin && bt.feedbackLose && bt.points === 80, where + " feedbacks + points 80");
    }
    if (bt.t === "choose") {
      ok(typeof bt.stage === "string" && typeof bt.setup === "string" && typeof bt.teaching === "string", where + " stage/setup/teaching");
      checkOptionSet(bt.options, where, true);
    }
    if (bt.t === "offer") {
      hasOffer = true;
      ok(JSON.stringify(bt.options) === JSON.stringify(["managed","ownership","custom","none"]), where + " 4 offer ids");
      ok(bt.answer === SIM_ANSWERS[lv.id], where + " answer is " + SIM_ANSWERS[lv.id]);
      ["managed","ownership","custom","none"].forEach(k => ok(typeof bt.feedback[k] === "string", where + " feedback." + k));
    }
    if (bt.t === "objection") {
      hasObjection = true;
      ok(typeof bt.objectionText === "string", where + " objectionText");
      ok(Array.isArray(bt.steps) && bt.steps.length === 5, where + " 5 steps");
      (bt.steps||[]).forEach((st, k) => {
        ok(st.step === STEP_ORDER[k], where + " step " + k + " is " + STEP_ORDER[k]);
        ok(len(st.npcLine) <= 220, where + " step " + k + " npcLine <=220");
        checkOptionSet(st.options, where + " " + st.step, false);
      });
    }
    if (bt.t === "end") { hasEnd = true; ok(["close","no-fit","next-step"].includes(bt.outcome), where + " valid outcome"); ok(len(bt.text) <= 220, where + " text <=220"); }
  });
  ok(hasIdentify && hasOffer && hasObjection && hasEnd, "simCall " + lv.id + " has identify+offer+objection+end");
});

ok(Array.isArray(pr.randomNpcPool) && pr.randomNpcPool.length === 6, "practice: 6 random NPCs");
(pr.randomNpcPool||[]).forEach(n => checkNpc(n, "pool " + (n && n.id)));

console.log(failures === 0 ? "ALL CHECKS PASSED" : failures + " FAILURES");
process.exit(failures === 0 ? 0 : 1);
