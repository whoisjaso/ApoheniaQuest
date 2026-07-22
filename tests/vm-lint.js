/* vm-based lint: loads game-data.js with mock parts and with missing parts. */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const ROOT = path.join(__dirname, "..");

function load(files) {
  const sandbox = {
    window: {},
    console: { log() {}, info() {}, warn() { sandbox.__warns.push([].join.call(arguments, " ")); }, error() {} },
    __warns: []
  };
  sandbox.window.console = sandbox.console;
  vm.createContext(sandbox);
  for (const f of files) {
    const code = fs.readFileSync(path.join(ROOT, f), "utf8");
    vm.runInContext(code, sandbox, { filename: f });
  }
  return sandbox;
}

let fails = 0;
function assert(cond, msg) {
  if (cond) console.log("  PASS " + msg);
  else { fails++; console.log("  FAIL " + msg); }
}

/* Scenario 1: mock-data fills everything */
console.log("Scenario 1: only mock-data (all real parts missing)");
let s = load(["assets/js/mock-data.js", "data/game-data.js"]);
let Q = s.window.SALES_QUEST;
assert(!!Q, "SALES_QUEST exists");
assert(Q.meta && Q.meta.archetypes && Object.keys(Q.meta.archetypes).length === 10, "meta has 10 archetypes");
assert(Q.meta.regions.length === 10, "meta has 10 regions");
assert(Q.levels.length === 10, "levels array has 10 entries (region order)");
assert(Q.levels.filter(l => l.placeholder).length === 9, "9 placeholder levels for missing regions");
assert(Q.levels[0].region === "opening-village" && Q.levels[0].beats.length >= 8, "mock level in region 1 with beats");
assert(Q.levels[9].region === "closing-summit", "last level is closing-summit");
assert(Q.bosses.length === 1 && Q.bosses[0].rounds.length === 5, "1 mock boss with 5 rounds");
const steps = Q.bosses[0].rounds.map(r => r.step).join(",");
assert(steps === "receive,clarify,isolate,resolve,decide", "boss rounds in R-C-I-R-D order");
assert(Q.practice.drills.archetype.length >= 3, "fallback archetype drills present");
assert(s.__warns.length > 0, "warns about missing parts");
// verify every level unlock chain: exactly one unlockAfter null
assert(Q.levels.filter(l => l.unlockAfter === null).length >= 1, "at least one level with unlockAfter null");
// every choose beat has exactly one quality:3
let q3ok = true;
Q.levels.forEach(l => (l.beats || []).forEach(b => {
  if (b.t === "choose") {
    const n = b.options.filter(o => o.quality === 3).length;
    if (n !== 1) q3ok = false;
  }
}));
assert(q3ok, "every choose beat has exactly one quality:3 option");

/* Scenario 2: meta + real levels-a present, others missing */
console.log("Scenario 2: partial parts (meta + levels-a real, rest missing)");
const s2 = vm.createContext(Object.assign(sandbox2 = {
  window: {}, console: { log() {}, info() {}, warn() {}, error() {} }
}, {}));
s2.window.console = s2.console;
vm.runInContext(`window.__SQ_PARTS = {};
  window.__SQ_PARTS["meta"] = ${JSON.stringify(s.window.__SQ_PARTS["meta"])};
  window.__SQ_PARTS["levels-a"] = { levels: [
    { id:"lv-test-a", region:"opening-village", name:"A", beats:[], starThresholds:[0.5,0.8], unlockAfter:null },
    { id:"lv-test-b", region:"intent-gardens", name:"B", beats:[], starThresholds:[0.5,0.8], unlockAfter:"lv-test-a" }
  ]};`, s2);
vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/js/mock-data.js"), "utf8"), s2);
vm.runInContext(fs.readFileSync(path.join(ROOT, "data/game-data.js"), "utf8"), s2);
const Q2 = s2.window.SALES_QUEST;
assert(Q2.levels[0].id === "lv-test-a", "real level used for region 1 (not mock)");
assert(Q2.levels[1].id === "lv-test-b", "real level used for region 2");
assert(Q2.levels[2].placeholder, "region 3 falls back to placeholder");
assert(Q2.levels[2].unlockAfter === "lv-test-b", "placeholder chains unlockAfter to previous region level id... (documented caveat)");
assert(Q2.bosses.length === 1, "mock boss still fills missing bosses part");

/* Scenario 3: nothing at all (even mock-data absent) */
console.log("Scenario 3: no parts at all (emergency meta)");
const s3 = { window: {}, console: { log() {}, info() {}, warn() {}, error() {} }, __w: 0 };
s3.window.console = s3.console;
vm.createContext(s3);
vm.runInContext(fs.readFileSync(path.join(ROOT, "data/game-data.js"), "utf8"), s3);
const Q3 = s3.window.SALES_QUEST;
assert(!!Q3 && Q3.levels.length === 10, "emergency meta still yields 10 placeholder levels");
assert(Q3.levels.every(l => l.placeholder), "all levels placeholders");

/* Scenario 4: engine/save logic with mock DOM-free parts */
console.log("Scenario 4: save + progression logic");
const s4 = {
  window: {}, console, localStorage: null,
};
s4.window.console = console;
const store = {};
s4.localStorage = s4.window.localStorage = {
  getItem: k => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: k => { delete store[k]; }
};
s4.window.matchMedia = undefined;
vm.createContext(s4);
vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/js/mock-data.js"), "utf8"), s4);
vm.runInContext(fs.readFileSync(path.join(ROOT, "data/game-data.js"), "utf8"), s4);
vm.runInContext("window.SQ = window.SQ || {};", s4);
vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/js/save.js"), "utf8"), s4);
vm.runInContext(`
  var SQ = window.SQ, SALES_QUEST = window.SALES_QUEST;
  var S = SQ.save;
  S.newGame();
  var lv1 = SALES_QUEST.levels[0];
  __t = [];
  __t.push(["fresh save: only first level unlocked", S.isLevelUnlocked(lv1) === true]);
  __t.push(["region 2 locked at start", S.isLevelUnlocked(SALES_QUEST.levels[1]) === false]);
  S.completeLevel(lv1.id, 100, 2);
  __t.push(["stars persist", S.get().levelStars[lv1.id] === 2]);
  S.completeLevel(lv1.id, 50, 1);
  __t.push(["best stars kept on worse replay", S.get().levelStars[lv1.id] === 2]);
  S.addXP(400);
  __t.push(["rank progresses", S.rank().name === "Frame Keeper"]);
  __t.push(["xp achievement earned", S.get().achievements.indexOf("first-steps") !== -1]);
  var u = S.unlockSatisfied("stars:2");
  __t.push(["stars:2 rule satisfied", u === true]);
  __t.push(["level:lv-opening-1 rule satisfied", S.unlockSatisfied("level:lv-opening-1") === true]);
  __t.push(["boss gate: arena incomplete", S.isBossUnlocked() === false]);
  __t.push(["summit gated until bosses won", S.isLevelUnlocked(SALES_QUEST.levels[9]) === false]);
  S.recordBossWin("boss-think-about-it");
  SALES_QUEST.bosses.forEach(function(b){ S.recordBossWin(b.id); });
  __t.push(["boss wins recorded", S.get().bossWins.length === 1]);
  S.wipe();
  __t.push(["wipe clears storage", S.hasSave() === false]);
`, s4);
s4.__t.forEach(([msg, ok]) => assert(ok, msg));

console.log(fails === 0 ? "\nALL LINT CHECKS PASSED" : "\n" + fails + " CHECKS FAILED");
process.exit(fails === 0 ? 0 : 1);
