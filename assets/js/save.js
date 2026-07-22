/* ============================================================
   save.js — localStorage save + progression rules
   Key: sq.save.v1 (per GAME-DATA.md contract)
   Unlock gating decision (documented in README-GUIDE.md):
     - Levels unlock via their unlockAfter chain (complete level X
       with >=1 star -> unlock the level whose unlockAfter === X).
     - Bosses unlock when the objection-arena region level is complete.
     - The closing-summit level ALSO requires all bosses won.
   ============================================================ */
(function () {
  "use strict";
  var SQ = (window.SQ = window.SQ || {});
  var KEY = "sq.save.v1";

  function data0() {
    return window.SALES_QUEST;
  }
  function meta() { return data0() ? data0().meta : null; }

  function defaultAvatar() {
    var m = meta();
    var d = (m && m.defaults && m.defaults.avatar) || {};
    return {
      name: d.name || "Jason", title: d.title || "founder",
      skin: d.skin || 0, face: d.face || 0, hair: d.hair || 0, hairColor: d.hairColor || 0,
      outfit: d.outfit || 0, accessory: d.accessory || 0, notebook: d.notebook || 0, theme: d.theme || 0
    };
  }

  function freshSave() {
    var first = data0() && data0().levels[0];
    return {
      xp: 0,
      levelStars: {},          // lvId -> 0..3
      levelBest: {},           // lvId -> best score
      bossWins: [],            // boss ids
      achievements: [],        // ids
      skills: [],              // dialogue skill ids
      streakBest: 0,
      drillsDone: {},          // type -> count
      avatar: defaultAvatar(),
      options: { music: true, sfx: true, textSpeed: 1 },
      unlockedLevels: first ? [first.id] : [],
      started: true,
      lastLevel: null
    };
  }

  var save = null;

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) { save = null; return null; }
      var parsed = JSON.parse(raw);
      save = Object.assign(freshSave(), parsed);
      save.avatar = Object.assign(defaultAvatar(), parsed.avatar || {});
      save.options = Object.assign({ music: true, sfx: true, textSpeed: 1 }, parsed.options || {});
      return save;
    } catch (e) {
      console.warn("[save] corrupt save ignored:", e);
      save = null; return null;
    }
  }
  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(save)); } catch (e) { console.warn("[save] persist failed:", e); }
  }
  function hasSave() { return !!load(); }
  function get() { return save || load() || (save = freshSave()); }
  function newGame() { save = freshSave(); persist(); return save; }
  function wipe() { try { localStorage.removeItem(KEY); } catch (e) {} save = null; }

  /* ---------- progression queries ---------- */
  function totalStars() {
    var s = get(), t = 0;
    for (var k in s.levelStars) t += s.levelStars[k] || 0;
    return t;
  }
  function levelsCompleted() {
    var s = get(), t = 0;
    for (var k in s.levelStars) if ((s.levelStars[k] || 0) >= 1) t++;
    return t;
  }
  function drillsTotal() {
    var s = get(), t = 0;
    for (var k in s.drillsDone) t += s.drillsDone[k] || 0;
    return t;
  }
  function rankIndex(xp) {
    var ranks = (meta() && meta().ranks) || [{ minXP: 0, name: "New Voice" }];
    var idx = 0;
    for (var i = 0; i < ranks.length; i++) if (xp >= (ranks[i].minXP || 0)) idx = i;
    return idx;
  }
  function rank(xp) {
    var ranks = (meta() && meta().ranks) || [{ minXP: 0, name: "New Voice" }];
    return ranks[rankIndex(xp == null ? get().xp : xp)];
  }

  function arenaLevel() {
    var d = data0(); if (!d) return null;
    for (var i = 0; i < d.levels.length; i++) {
      var r = regionOf(d.levels[i].region);
      if (r && r.bossRegion) return d.levels[i];
    }
    return null;
  }
  function regionOf(id) {
    var rs = (meta() && meta().regions) || [];
    for (var i = 0; i < rs.length; i++) if (rs[i].id === id) return rs[i];
    return null;
  }
  function arenaComplete() {
    var al = arenaLevel();
    return !!(al && (get().levelStars[al.id] || 0) >= 1);
  }
  function allBossesWon() {
    var d = data0(); if (!d || !d.bosses.length) return false;
    var wins = get().bossWins;
    return d.bosses.every(function (b) { return wins.indexOf(b.id) !== -1; });
  }
  function summitLevel() {
    var d = data0(); if (!d) return null;
    return d.levels[d.levels.length - 1] || null;
  }
  function isLevelUnlocked(lv) {
    if (!lv) return false;
    var s = get();
    if (s.unlockedLevels.indexOf(lv.id) !== -1) {
      // summit also requires all bosses won (arena gating)
      var sm = summitLevel();
      if (sm && lv.id === sm.id && !lv.placeholder) {
        return allBossesWon() || (s.levelStars[lv.id] || 0) >= 1;
      }
      return true;
    }
    return false;
  }
  function isBossUnlocked() { return arenaComplete(); }
  function currentLevel() {
    var d = data0(); if (!d) return null;
    var s = get();
    // first unlocked-but-not-completed level; else last level
    for (var i = 0; i < d.levels.length; i++) {
      var lv = d.levels[i];
      if (!lv.placeholder && isLevelUnlocked(lv) && (s.levelStars[lv.id] || 0) < 1) return lv;
    }
    return s.lastLevel ? d.levels.filter(function (l) { return l.id === s.lastLevel; })[0] || d.levels[d.levels.length - 1] : d.levels[d.levels.length - 1];
  }

  /* ---------- unlockAt rule evaluator ---------- */
  function unlockSatisfied(rule) {
    if (!rule || rule === "start") return true;
    var s = get();
    var parts = String(rule).split(":");
    var kind = parts[0], val = parts.slice(1).join(":");
    if (kind === "level") return (s.levelStars[val] || 0) >= 1;
    if (kind === "stars") return totalStars() >= parseInt(val, 10);
    if (kind === "rank") return rankIndex(s.xp) >= parseInt(val, 10);
    if (kind === "achievement") return s.achievements.indexOf(val) !== -1;
    if (kind === "boss") return s.bossWins.indexOf(val) !== -1;
    if (kind === "drills") return drillsTotal() >= parseInt(val, 10);
    return false;
  }
  function unlockRuleText(rule) {
    if (!rule || rule === "start") return "Available from the start";
    var parts = String(rule).split(":");
    var kind = parts[0], val = parts.slice(1).join(":");
    var d = data0();
    if (kind === "level") {
      var lv = d && d.levels.filter(function (l) { return l.id === val; })[0];
      return "Complete “" + (lv ? lv.name : val) + "”";
    }
    if (kind === "stars") return "Earn " + val + " stars";
    if (kind === "rank") {
      var r = (meta() && meta().ranks || [])[parseInt(val, 10)];
      return "Reach rank “" + (r ? r.name : val) + "”";
    }
    if (kind === "achievement") {
      var a = (meta() && meta().achievements || []).filter(function (x) { return x.id === val; })[0];
      return "Earn achievement “" + (a ? a.name : val) + "”";
    }
    if (kind === "boss") {
      var b = d && d.bosses.filter(function (x) { return x.id === val; })[0];
      return "Defeat “" + (b ? b.name : val) + "”";
    }
    if (kind === "drills") return "Finish " + val + " drills";
    return rule;
  }

  /* ---------- achievements & skills ---------- */
  function metricFor(type) {
    if (type === "stars") return totalStars();
    if (type === "xp") return get().xp;
    if (type === "streak") return get().streakBest;
    if (type === "bosses") return get().bossWins.length;
    if (type === "levels") return levelsCompleted();
    if (type === "drills") return drillsTotal();
    return 0;
  }
  // returns newly earned achievements (and newly unlocked skills)
  function checkUnlocks() {
    var s = get();
    var out = { achievements: [], skills: [] };
    ((meta() && meta().achievements) || []).forEach(function (a) {
      if (s.achievements.indexOf(a.id) === -1 && metricFor(a.rule.type) >= a.rule.n) {
        s.achievements.push(a.id);
        out.achievements.push(a);
      }
    });
    // second pass: achievement-based skills/cosmetics may depend on just-earned achievements
    ((meta() && meta().dialogueSkills) || []).forEach(function (sk) {
      if (s.skills.indexOf(sk.id) === -1 && unlockSatisfied(sk.unlockAt)) {
        s.skills.push(sk.id);
        out.skills.push(sk);
      }
    });
    if (out.achievements.length || out.skills.length) persist();
    return out;
  }

  /* ---------- mutations ---------- */
  function addXP(n) {
    var s = get();
    var before = rankIndex(s.xp);
    s.xp = Math.max(0, s.xp + n);
    var after = rankIndex(s.xp);
    persist();
    return { xp: s.xp, rankedUp: after > before, rank: rank(s.xp) };
  }
  // Complete a level: stars persist (best kept), best score kept, chain-unlock next.
  function completeLevel(lvId, score, stars) {
    var s = get();
    s.levelStars[lvId] = Math.max(s.levelStars[lvId] || 0, stars);
    s.levelBest[lvId] = Math.max(s.levelBest[lvId] || 0, score);
    s.lastLevel = lvId;
    var d = data0();
    if (d && stars >= 1) {
      d.levels.forEach(function (lv) {
        if (lv.unlockAfter === lvId && s.unlockedLevels.indexOf(lv.id) === -1) {
          // summit additionally gated on bosses; still record unlock, gate is checked in isLevelUnlocked
          s.unlockedLevels.push(lv.id);
        }
      });
    }
    persist();
    return checkUnlocks();
  }
  function recordBossWin(bossId) {
    var s = get();
    if (s.bossWins.indexOf(bossId) === -1) s.bossWins.push(bossId);
    persist();
    return checkUnlocks();
  }
  function recordStreak(n) {
    var s = get();
    if (n > s.streakBest) { s.streakBest = n; persist(); }
  }
  function recordDrill(type) {
    var s = get();
    s.drillsDone[type] = (s.drillsDone[type] || 0) + 1;
    persist();
    return checkUnlocks();
  }
  function setAvatar(av) { get().avatar = Object.assign(get().avatar, av); persist(); }
  function setOptions(op) { get().options = Object.assign(get().options, op); persist(); }

  SQ.save = {
    KEY: KEY,
    load: load, persist: persist, hasSave: hasSave, get: get,
    newGame: newGame, wipe: wipe,
    totalStars: totalStars, levelsCompleted: levelsCompleted, drillsTotal: drillsTotal,
    rank: rank, rankIndex: rankIndex,
    regionOf: regionOf, arenaLevel: arenaLevel, arenaComplete: arenaComplete,
    allBossesWon: allBossesWon, summitLevel: summitLevel,
    isLevelUnlocked: isLevelUnlocked, isBossUnlocked: isBossUnlocked, currentLevel: currentLevel,
    unlockSatisfied: unlockSatisfied, unlockRuleText: unlockRuleText,
    checkUnlocks: checkUnlocks,
    addXP: addXP, completeLevel: completeLevel, recordBossWin: recordBossWin,
    recordStreak: recordStreak, recordDrill: recordDrill,
    setAvatar: setAvatar, setOptions: setOptions
  };
})();
