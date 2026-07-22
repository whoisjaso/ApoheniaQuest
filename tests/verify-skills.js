/* Verification harness (Defect A): loads the real save.js in a vm with
   stubbed localStorage/window and confirms all 6 dialogueSkills evaluate
   unlockable exactly when their machine-rule target is met. */
"use strict";
const vm = require("vm");
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

function makeCtx(saveRaw) {
  const store = {};
  if (saveRaw) store["sq.save.v1"] = JSON.stringify(saveRaw);
  const window = {
    __SQ_PARTS: {},
    console,
    localStorage: {
      getItem: (k) => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v); },
      removeItem: (k) => { delete store[k]; }
    }
  };
  const ctx = vm.createContext({ window, console, localStorage: window.localStorage });
  for (const f of ["data/parts/00-meta.js", "data/parts/10-levels-a.js", "data/parts/11-levels-b.js",
                   "data/parts/20-bosses.js", "data/parts/21-practice.js",
                   "assets/js/mock-data.js", "data/game-data.js", "assets/js/save.js"]) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx, { filename: f });
  }
  return ctx;
}

const LV = ["lv-opening-1","lv-intent-2","lv-experience-3","lv-process-4","lv-gap-5",
            "lv-impact-6","lv-future-7","lv-recommend-8","lv-objection-9","lv-closing-10"];
function maxedSave() {
  const levelStars = {}; LV.forEach((l) => { levelStars[l] = 3; }); // 30 stars
  return {
    xp: 9500, levelStars, levelBest: {}, bossWins: ["boss-think-about-it","boss-costs-too-much","boss-speak-with-partner","boss-already-have-website","boss-build-with-ai","boss-guarantee-leads","boss-lower-price"],
    achievements: [], skills: [], streakBest: 0, drillsDone: {},
    unlockedLevels: LV.slice(), started: true, lastLevel: "lv-closing-10"
  };
}

let fails = [];
function expect(label, cond) {
  console.log((cond ? "PASS" : "FAIL") + "  " + label);
  if (!cond) fails.push(label);
}

// --- 1. maxed save: every skill rule satisfied ---
// NOTE: achievement-gated rules require checkUnlocks() to have awarded the
// achievements first (exactly what completeLevel/recordBossWin do in-game).
let ctx = makeCtx(maxedSave());
let firstGrant = vm.runInContext("window.SQ.save.checkUnlocks().skills.map(s=>s.id)", ctx);
let skills = vm.runInContext("window.SALES_QUEST.meta.dialogueSkills", ctx);
for (const sk of skills) {
  const ok = vm.runInContext(`window.SQ.save.unlockSatisfied(${JSON.stringify(sk.unlockAt)})`, ctx);
  expect(`maxed save satisfies ${sk.id} (${sk.unlockAt})`, ok === true);
}
// checkUnlocks actually granted all 6 skills on the maxed save
expect("checkUnlocks grants all 6 skills on maxed save", firstGrant.length === 6);
// achievements also granted (2nd-pass gating works)
let ach = vm.runInContext("window.SQ.save.get().achievements.length", ctx);
expect("achievements granted on maxed save (" + ach + ")", ach >= 10);

// --- 2. targeted thresholds ---
// stars:9 skill: false at 8 stars, true at 9
let s8 = { xp: 0, levelStars: { "lv-opening-1": 3, "lv-intent-2": 3, "lv-experience-3": 2 }, levelBest: {}, bossWins: [], achievements: [], skills: [], streakBest: 0, drillsDone: {}, unlockedLevels: ["lv-opening-1"], started: true, lastLevel: null };
ctx = makeCtx(s8);
expect("stars:9 false at 8 stars", vm.runInContext('window.SQ.save.unlockSatisfied("stars:9")', ctx) === false);
s8.levelStars["lv-experience-3"] = 3;
ctx = makeCtx(s8);
expect("stars:9 true at 9 stars", vm.runInContext('window.SQ.save.unlockSatisfied("stars:9")', ctx) === true);

// rank:3 (Frame Keeper, minXP 1500): false at 1499, true at 1500
ctx = makeCtx(Object.assign(maxedSave(), { xp: 1499 }));
expect("rank:3 false at 1499 xp", vm.runInContext('window.SQ.save.unlockSatisfied("rank:3")', ctx) === false);
ctx = makeCtx(Object.assign(maxedSave(), { xp: 1500 }));
expect("rank:3 true at 1500 xp (Frame Keeper)", vm.runInContext('window.SQ.save.unlockSatisfied("rank:3")', ctx) === true);

// level:lv-opening-1: false fresh, true after 1 star
ctx = makeCtx(null);
expect("level:lv-opening-1 false on fresh save", vm.runInContext('window.SQ.save.unlockSatisfied("level:lv-opening-1")', ctx) === false);
ctx = makeCtx({ xp: 0, levelStars: { "lv-opening-1": 1 }, levelBest: {}, bossWins: [], achievements: [], skills: [], streakBest: 0, drillsDone: {}, unlockedLevels: ["lv-opening-1"], started: true, lastLevel: null });
expect("level:lv-opening-1 true after 1 star", vm.runInContext('window.SQ.save.unlockSatisfied("level:lv-opening-1")', ctx) === true);

// achievement-gated skills: false without achievement, true with
for (const a of ["ach-boss-1", "ach-boss-3", "ach-boss-7"]) {
  ctx = makeCtx(maxedSave());
  expect(`achievement:${a} false when missing`, vm.runInContext(`window.SQ.save.unlockSatisfied("achievement:${a}")`, ctx) === false);
  const sv = maxedSave(); sv.achievements = [a];
  ctx = makeCtx(sv);
  expect(`achievement:${a} true when earned`, vm.runInContext(`window.SQ.save.unlockSatisfied("achievement:${a}")`, ctx) === true);
}

// cosmetic level rules resolve (Defect B sanity): fresh save -> locked, completed -> unlocked
ctx = makeCtx(null);
for (const rule of ["level:lv-intent-2", "level:lv-gap-5", "level:lv-experience-3"]) {
  expect(`${rule} locked on fresh save`, vm.runInContext(`window.SQ.save.unlockSatisfied(${JSON.stringify(rule)})`, ctx) === false);
}
ctx = makeCtx(maxedSave());
for (const rule of ["level:lv-intent-2", "level:lv-gap-5", "level:lv-experience-3"]) {
  expect(`${rule} unlocked on maxed save`, vm.runInContext(`window.SQ.save.unlockSatisfied(${JSON.stringify(rule)})`, ctx) === true);
}
// human-readable rule text renders
ctx = makeCtx(maxedSave());
for (const sk of skills) {
  const t = vm.runInContext(`window.SQ.save.unlockRuleText(${JSON.stringify(sk.unlockAt)})`, ctx);
  expect(`unlockRuleText(${sk.unlockAt}) -> "${t}"`, typeof t === "string" && t.length > 3 && t !== sk.unlockAt);
}

console.log(fails.length ? `\n${fails.length} FAILURES` : "\nALL SKILL UNLOCK CHECKS PASS");
process.exit(fails.length ? 1 : 0);
