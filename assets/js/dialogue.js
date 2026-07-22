/* ============================================================
   dialogue.js — Pokémon-style dialogue engine + scoring.
   Renders every beat type from GAME-DATA.md:
     say / identify / choose / offer / objection / end
   Boss mode reuses the objection renderer (5 rounds R→C→I→R→D).
   Keyboard: 1–4 select, Space/Enter advance, arrows navigate.
   ============================================================ */
(function () {
  "use strict";
  var SQ = (window.SQ = window.SQ || {});

  var STEP_ORDER = ["receive", "clarify", "isolate", "resolve", "decide"];
  var STEP_LABEL = { receive: "Receive", clarify: "Clarify", isolate: "Isolate", resolve: "Resolve", decide: "Decide" };

  var OFFER_INFO = {
    managed:   { label: "Managed Plan",  price: "$197/mo",          facts: "Six initial billing periods, then month-to-month. No upfront fee. Apohenia runs it for you." },
    ownership: { label: "Ownership",     price: "$1,000 one-time",  facts: "You own the site outright. One payment, yours to keep and host." },
    custom:    { label: "Custom Build",  price: "Scoped separately",facts: "For bigger, unusual needs — separately scoped and quoted." },
    none:      { label: "Honest No-Fit", price: "—",                facts: "Say so plainly and close cleanly. A clean no-fit is a win." }
  };

  var S = null; // active session
  var typing = null; // typewriter interval

  function meta() { return window.SALES_QUEST.meta; }
  function SC() { return meta().scoring; }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }
  function reducedMotion() { return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
  function typeMs() {
    if (reducedMotion()) return 0;
    var spd = SQ.save.get().options.textSpeed;
    return spd === 0 ? 42 : spd === 2 ? 9 : 22;
  }
  function avatarTheme() {
    var cat = meta().avatarCatalog;
    var t = cat.dialogueThemes[SQ.save.get().avatar.theme];
    return t ? t.id : "dawn";
  }
  function playerName() { return SQ.save.get().avatar.name || "Jason"; }

  /* ================= session setup ================= */
  function startLevel(level, opts) {
    opts = opts || {};
    S = {
      mode: "level", level: level, boss: null,
      beats: level.beats || [], idx: -1,
      score: 0, max: computeMax(level.beats || []),
      streak: 0, bestStreak: 0,
      npc: level.npc, emotion: "neutral",
      returnTo: opts.returnTo || "map",
      objState: null, ended: false
    };
    SQ.save.get().lastLevel = level.id; SQ.save.persist();
    SQ.audio.music("soft");
    buildScene();
    nextBeat();
  }

  function startBoss(boss, opts) {
    opts = opts || {};
    var beats = (boss.intro || []).slice();
    beats.push({ t: "objection", objectionText: boss.objectionText, steps: boss.rounds || [], bossBattle: true });
    S = {
      mode: "boss", level: null, boss: boss,
      beats: beats, idx: -1,
      score: 0, max: (boss.rounds || []).length * SC().OBJECTION_STEP_BEST,
      streak: 0, bestStreak: 0, roundGoods: 0,
      npc: boss.npc, emotion: "guarded",
      returnTo: opts.returnTo || "map",
      objState: null, ended: false
    };
    SQ.audio.music("soft");
    SQ.audio.sfx("boss");
    buildScene();
    nextBeat();
  }

  function computeMax(beats) {
    var m = 0;
    beats.forEach(function (b) {
      if (b.t === "identify") m += b.points || (SC().IDENTIFY_PRIMARY + SC().IDENTIFY_SECONDARY);
      else if (b.t === "choose") m += SC().CHOICE_BEST;
      else if (b.t === "offer") m += SC().OFFER_CORRECT;
      else if (b.t === "objection") m += (b.steps || []).length * SC().OBJECTION_STEP_BEST;
    });
    return m || 1;
  }

  /* ================= scene DOM ================= */
  function buildScene() {
    var root = $("#screen-dialogue");
    root.innerHTML = "";
    var sceneBg = sceneBackground();
    root.style.background = sceneBg;

    var stage = el("div", "scene-stage");
    var hud = el("div", "scene-hud");
    hud.appendChild(chip("score-chip", "★ <span id='hud-score'>0</span>"));
    hud.appendChild(chip("streak-chip", "🔥 <span id='hud-streak'>0</span>"));
    var spacer = el("div", "spacer"); hud.appendChild(spacer);
    if (S.mode === "level") hud.appendChild(chip("", esc(regionName(S.level.region))));
    var quit = el("button", "btn btn-sm btn-ghost", "✕ Quit");
    quit.addEventListener("click", confirmQuit);
    hud.appendChild(quit);
    stage.appendChild(hud);

    if (S.mode === "boss") {
      var banner = el("div", "boss-banner", "⚔ " + esc(S.boss.name) + "<small>“" + esc(S.boss.objectionText) + "”</small>");
      stage.appendChild(banner);
    }
    var stepBanner = el("div", "step-banner");
    stepBanner.id = "step-banner";
    stepBanner.style.display = "none";
    stage.appendChild(stepBanner);

    var pw = el("div", "portrait-wrap" + (S.mode === "boss" ? " boss" : ""));
    pw.id = "portrait-wrap";
    pw.innerHTML = S.npc ? SQ.portrait.npcSVG(S.npc.portrait, S.emotion, 240) : "";
    stage.appendChild(pw);
    root.appendChild(stage);

    var dock = el("div", "dlg-dock");
    var interact = el("div"); interact.id = "interact-zone";
    dock.appendChild(interact);
    var box = el("div", "dlg-box theme-" + avatarTheme());
    box.id = "dlg-box";
    box.innerHTML = '<div class="dlg-speaker" id="dlg-speaker">✦</div>' +
      '<div class="dlg-avatar-mini" id="dlg-avatar-mini" style="display:none"></div>' +
      '<div class="dlg-text" id="dlg-text"></div>' +
      '<div class="dlg-advance" id="dlg-advance">▼</div>';
    box.addEventListener("click", advance);
    dock.appendChild(box);
    var nextBtn = el("button", "btn btn-sm btn-primary dlg-next", "Continue ▼");
    nextBtn.setAttribute("aria-label", "Advance dialogue");
    nextBtn.addEventListener("click", function (e) { e.stopPropagation(); advance(); });
    dock.appendChild(nextBtn);
    root.appendChild(dock);

    SQ.app.show("dialogue");
  }
  function chip(cls, html) { return el("span", "hud-chip " + (cls || ""), html); }
  function regionName(rid) { var r = SQ.save.regionOf(rid); return r ? r.name : rid; }
  function sceneBackground() {
    var rid = S.mode === "level" ? S.level.region : "objection-arena";
    var r = SQ.save.regionOf(rid);
    if (!r) return "";
    var t = r.theme;
    return "linear-gradient(180deg, " + t.sky + " 0%, " + SQ.portrait.shade(t.sky, 0.08) + " 55%, " + t.ground + " 55.2%, " + SQ.portrait.shade(t.ground, -0.08) + " 100%)";
  }

  function setPortrait(emotion) {
    S.emotion = emotion || S.emotion;
    var pw = $("#portrait-wrap");
    if (pw && S.npc) pw.innerHTML = SQ.portrait.npcSVG(S.npc.portrait, S.emotion, 240);
  }
  function updateHUD() {
    var s = $("#hud-score"); if (s) s.textContent = S.score;
    var st = $("#hud-streak"); if (st) st.textContent = S.streak;
    var chipEl = $(".streak-chip");
    if (chipEl) { chipEl.classList.remove("hot"); void chipEl.offsetWidth; if (S.streak >= 2) chipEl.classList.add("hot"); }
  }
  function scorePop(delta, suffix) {
    if (reducedMotion()) return;
    var dock = $(".dlg-dock"); if (!dock) return;
    var pop = el("div", "score-pop", (delta > 0 ? "+" + delta : delta) + (suffix || ""));
    pop.style.color = delta > 0 ? "#1f7a4d" : "#a33";
    pop.style.left = (40 + Math.random() * 20) + "%";
    pop.style.top = "-10px";
    dock.appendChild(pop);
    setTimeout(function () { pop.remove(); }, 1200);
  }

  /* ================= typewriter ================= */
  function say(text, speaker, showAvatar, done) {
    var tEl = $("#dlg-text"), sEl = $("#dlg-speaker"), aEl = $("#dlg-avatar-mini"), adv = $("#dlg-advance");
    if (!tEl) return;
    sEl.textContent = speaker || "✦";
    sEl.style.display = speaker ? "" : "none";
    if (showAvatar) { aEl.innerHTML = SQ.portrait.avatarSVG(SQ.save.get().avatar, 56); aEl.style.display = ""; }
    else aEl.style.display = "none";
    adv.style.visibility = "hidden";
    if (typing) { clearInterval(typing); typing = null; }
    var ms = typeMs();
    if (ms === 0) {
      tEl.textContent = text;
      S.typingDone = true;
      adv.style.visibility = "";
      if (done) done();
      return;
    }
    tEl.textContent = "";
    S.typingDone = false;
    var i = 0;
    typing = setInterval(function () {
      i += 1;
      tEl.textContent = text.slice(0, i);
      if (i % 3 === 0) SQ.audio.sfx("advance");
      if (i >= text.length) {
        clearInterval(typing); typing = null;
        S.typingDone = true;
        adv.style.visibility = "";
        if (done) done();
      }
    }, ms);
  }
  function finishTyping() {
    if (typing) {
      clearInterval(typing); typing = null;
      var beat = currentBeat();
      if (beat && beat._fullText) $("#dlg-text").textContent = beat._fullText;
      S.typingDone = true;
      var adv = $("#dlg-advance"); if (adv) adv.style.visibility = "";
    }
  }
  function currentBeat() { return S && S.beats[S.idx]; }

  /* ================= flow ================= */
  function nextBeat() {
    S.idx++;
    var b = S.beats[S.idx];
    clearInteract();
    hideStepBanner();
    if (!b) { finishSession(); return; }
    if (b.t === "say") renderSay(b);
    else if (b.t === "identify") renderIdentify(b);
    else if (b.t === "choose") renderChoose(b);
    else if (b.t === "offer") renderOffer(b);
    else if (b.t === "objection") startObjection(b);
    else if (b.t === "end") renderEnd(b);
    else { console.warn("[engine] unknown beat type", b.t); nextBeat(); }
  }
  function advance() {
    if (!S || S.ended) return;
    if (!S.typingDone && typing) { finishTyping(); return; }
    if (S.waiting) return; // an interactive control is on screen
    SQ.audio.sfx("advance");
    nextBeat();
  }
  function setNextVisible(v) { var n = $(".dlg-next"); if (n) n.style.display = v ? "" : "none"; }
  function clearInteract() { var z = $("#interact-zone"); if (z) z.innerHTML = ""; S.waiting = false; setNextVisible(true); }
  function interact(node) { var z = $("#interact-zone"); if (z) { z.appendChild(node); S.waiting = true; setNextVisible(false); } }

  /* ---- say ---- */
  function renderSay(b) {
    if (b.who === "npc") setPortrait(b.emotion || "neutral");
    var speaker = b.who === "npc" ? (S.npc ? S.npc.name : "???") : b.who === "player" ? playerName() : "";
    b._fullText = b.text;
    S.typingDone = false;
    say(b.text, speaker, b.who === "player");
  }

  /* ---- identify ---- */
  function renderIdentify(b) {
    setPortrait("neutral");
    b._fullText = b.prompt || "Who are you talking to?";
    say(b._fullText, "", false, function () {});
    var arch = meta().archetypes;
    var picked = { primary: "", secondary: "" };
    var wrap = el("div");
    function chipRow(labelTxt, key, allowNone) {
      var lab = el("div", "identify-label", esc(labelTxt));
      var row = el("div", "arch-row");
      function mkChip(id, name, color) {
        var chip = el("button", "arch-chip", esc(name));
        chip.style.setProperty("--arch", color || "#8a87a0");
        chip.setAttribute("data-val", id);
        chip.addEventListener("click", function () {
          picked[key] = id;
          row.querySelectorAll(".arch-chip").forEach(function (c) { c.classList.toggle("sel", c === chip); });
          SQ.audio.sfx("click");
        });
        row.appendChild(chip);
      }
      (b.options || []).forEach(function (id) {
        var a = arch[id];
        mkChip(id, a ? a.name : id, a ? a.color : "#8a87a0");
      });
      if (allowNone) mkChip("__none", "(no strong secondary)", "#8a87a0");
      wrap.appendChild(lab);
      wrap.appendChild(row);
    }
    chipRow("Primary archetype — the loudest signal", "primary", false);
    chipRow("Secondary archetype — the undertone", "secondary", true);
    var btn = el("button", "btn btn-primary", "Lock It In ✔");
    btn.addEventListener("click", function () {
      if (!picked.primary) { SQ.audio.sfx("wrong"); SQ.app.toast("Pick a primary archetype first", "The loudest signal in their words."); return; }
      gradeIdentify(b, picked.primary, picked.secondary || "__none");
    });
    var row2 = el("div", "choices"); row2.appendChild(btn);
    wrap.appendChild(row2);
    interact(wrap);
  }
  function gradeIdentify(b, primary, secondary) {
    document.querySelectorAll("#interact-zone .arch-chip, #interact-zone .btn").forEach(function (c) { c.disabled = true; });
    var ans = b.answer || {};
    var wantSec = ans.secondary || "__none";
    var pOK = primary === ans.primary;
    var sOK = (secondary || "__none") === wantSec;
    var delta = 0;
    if (pOK) delta += SC().IDENTIFY_PRIMARY;
    if (sOK) delta += SC().IDENTIFY_SECONDARY;
    var best = pOK && sOK;
    if (best) { bumpStreak(); delta += streakBonus(); SQ.audio.sfx("correct"); setPortrait("impressed"); }
    else if (pOK) { S.streak = 0; SQ.audio.sfx("ok"); setPortrait("thinking"); }
    else { S.streak = 0; SQ.audio.sfx("wrong"); setPortrait("skeptical"); }
    S.score = Math.max(0, S.score + delta);
    updateHUD(); scorePop(delta);
    var fb = el("div", "feedback-card " + (best ? "q3" : pOK ? "q2" : "q1"));
    fb.appendChild(el("span", "fb-delta", "+" + delta));
    fb.appendChild(el("div", null, "<b>" + (best ? "Perfect read!" : pOK ? "Half right." : "Not quite.") + "</b> " + esc(pOK ? b.feedbackWin : b.feedbackLose)));
    var arch = meta().archetypes;
    fb.appendChild(el("div", "fb-teach", "Answer: <b>" + esc(arch[ans.primary] ? arch[ans.primary].name : ans.primary) + "</b>" +
      (ans.secondary ? " + <b>" + esc(arch[ans.secondary] ? arch[ans.secondary].name : ans.secondary) + "</b>" : " (no secondary)") +
      ". Watch for: " + esc((arch[ans.primary] && arch[ans.primary].tells ? arch[ans.primary].tells[0] : "the clues in their words")) + "."));
    showFeedback(fb);
  }

  /* ---- choose ---- */
  function renderChoose(b, opts2) {
    opts2 = opts2 || {};
    if (!opts2.keepEmotion) setPortrait("thinking");
    var setup = b.setup || b.npcLine || "";
    b._fullText = setup;
    say(setup, b.npcLine && S.npc ? S.npc.name : "", false, function () {
      var list = el("div", "choices");
      (b.options || []).forEach(function (op, i) {
        var btn = el("button", "choice-btn", "<span class='key'>" + (i + 1) + "</span>" + esc(op.text));
        btn.setAttribute("data-idx", i);
        btn.addEventListener("click", function () { gradeChoose(b, i, opts2); });
        list.appendChild(btn);
      });
      interact(list);
      focusChoice(0);
    });
    S.typingDone = false;
  }
  function focusChoice(i) {
    var btns = document.querySelectorAll("#interact-zone .choice-btn, #interact-zone .offer-card");
    if (!btns.length) return;
    i = (i + btns.length) % btns.length;
    btns.forEach(function (b) { b.classList.remove("focused"); });
    btns[i].classList.add("focused");
    btns[i].focus();
    S.focusIdx = i;
  }
  function gradeChoose(b, i, opts2) {
    opts2 = opts2 || {};
    var op = b.options[i];
    var q = op.quality || 1;
    var delta, cls;
    if (q === 3) {
      bumpStreak();
      delta = (opts2.stepBest ? SC().OBJECTION_STEP_BEST : SC().CHOICE_BEST) + streakBonus();
      cls = "q3"; SQ.audio.sfx("correct"); setPortrait(opts2.bossBattle ? "impressed" : "happy");
      if (opts2.bossBattle) S.roundGoods++;
    } else if (q === 2) {
      S.streak = 0;
      delta = SC().CHOICE_OK;
      cls = "q2"; SQ.audio.sfx("ok"); setPortrait("thinking");
      if (opts2.bossBattle) S.roundGoods++;
    } else {
      S.streak = 0;
      delta = worstPenalty(op.tags);
      cls = "q1"; SQ.audio.sfx("wrong"); setPortrait("annoyed");
    }
    S.score = Math.max(0, S.score + delta);
    updateHUD(); scorePop(delta, q === 3 && S.streak >= 2 ? " streak!" : "");
    // mark the picked option
    var btns = document.querySelectorAll("#interact-zone .choice-btn");
    btns.forEach(function (btn, k) {
      btn.disabled = true;
      if (k === i) btn.classList.add(cls);
      else btn.classList.add("dim");
    });
    var fb = el("div", "feedback-card " + cls);
    fb.appendChild(el("span", "fb-delta", (delta > 0 ? "+" : "") + delta));
    fb.appendChild(el("div", null, esc(op.feedback || "")));
    if (b.teaching) fb.appendChild(el("div", "fb-teach", "💡 " + esc(b.teaching)));
    showFeedback(fb, opts2.onDone);
  }
  function worstPenalty(tags) {
    var pens = SC().penalties || {};
    var worst = -8;
    (tags || []).forEach(function (t) { if (pens[t] != null && pens[t] < worst) worst = pens[t]; });
    return worst;
  }
  function bumpStreak() {
    S.streak++;
    if (S.streak > S.bestStreak) S.bestStreak = S.streak;
    if (S.streak >= 2) SQ.audio.sfx("streak");
  }
  function streakBonus() { return S.streak >= 2 ? SC().STREAK_BONUS : 0; }

  function showFeedback(fb, onDone) {
    var zone = $("#interact-zone");
    var btn = el("button", "btn btn-primary", "Continue ▶");
    btn.addEventListener("click", function () {
      SQ.audio.sfx("click");
      if (onDone) onDone(); else { clearInteract(); nextBeat(); }
    });
    var row = el("div", "choices"); row.appendChild(btn);
    if (zone) { zone.appendChild(fb); zone.appendChild(row); S.waiting = true; setNextVisible(false); }
    setTimeout(function () { btn.focus(); }, 60);
  }

  /* ---- offer ---- */
  function renderOffer(b) {
    setPortrait("neutral");
    b._fullText = b.setup || "Time to recommend.";
    say(b._fullText, "", false);
    S.typingDone = false;
    var grid = el("div", "offer-cards");
    (b.options || ["managed", "ownership", "custom", "none"]).forEach(function (id) {
      var info = OFFER_INFO[id] || { label: id, price: "", facts: "" };
      var card = el("button", "offer-card", "<b>" + esc(info.label) + "</b><span class='price'>" + esc(info.price) + "</span><small>" + esc(info.facts) + "</small>");
      card.setAttribute("data-offer", id);
      card.addEventListener("click", function () { gradeOffer(b, id, card); });
      grid.appendChild(card);
    });
    setTimeout(function () { interact(grid); focusChoice(0); }, typeMs() === 0 ? 30 : 400);
  }
  function gradeOffer(b, id, card) {
    var correct = id === b.answer;
    var delta = correct ? SC().OFFER_CORRECT : 0;
    if (correct) { bumpStreak(); delta += streakBonus(); SQ.audio.sfx("correct"); setPortrait("impressed"); }
    else { S.streak = 0; SQ.audio.sfx("wrong"); setPortrait("skeptical"); }
    S.score = Math.max(0, S.score + delta);
    updateHUD(); scorePop(delta);
    document.querySelectorAll("#interact-zone .offer-card").forEach(function (c) {
      c.disabled = true;
      if (c === card) c.classList.add(correct ? "picked-correct" : "picked-wrong");
      else c.classList.add("dim");
    });
    var fbText = (b.feedback && b.feedback[id]) || (correct ? "The right fit." : "Not the right fit here.");
    var fb = el("div", "feedback-card " + (correct ? "q3" : "q1"));
    fb.appendChild(el("span", "fb-delta", (delta > 0 ? "+" : "") + delta));
    fb.appendChild(el("div", null, esc(fbText)));
    showFeedback(fb);
  }

  /* ---- objection (mini-battle & boss rounds) ---- */
  function startObjection(b) {
    S.objState = { beat: b, step: 0 };
    if (b.objectionText && !b.bossBattle) {
      // NPC voices the objection first
      setPortrait("guarded");
      b._fullText = b.objectionText;
      S.typingDone = false;
      say(b.objectionText, S.npc ? S.npc.name : "???", false, function () {
        runObjStep();
      });
    } else runObjStep();
  }
  function showStepBanner(activeStep) {
    var sb = $("#step-banner");
    if (!sb) return;
    sb.style.display = "";
    sb.innerHTML = "";
    STEP_ORDER.forEach(function (st, i) {
      var cur = S.objState ? S.objState.step : -1;
      var cls = "st" + (i === cur ? " on" : i < cur ? " done" : "");
      sb.appendChild(el("span", cls, STEP_LABEL[st]));
    });
  }
  function hideStepBanner() { var sb = $("#step-banner"); if (sb) sb.style.display = "none"; }
  function runObjStep() {
    var os = S.objState;
    var step = os.beat.steps[os.step];
    if (!step) { endObjection(); return; }
    showStepBanner(step.step);
    var fake = { setup: step.npcLine, npcLine: step.npcLine, options: step.options, teaching: null };
    fake._fullText = step.npcLine;
    renderChoose(fake, {
      keepEmotion: false,
      stepBest: true,
      bossBattle: !!os.beat.bossBattle,
      onDone: function () {
        os.step++;
        clearInteract();
        runObjStep();
      }
    });
  }
  function endObjection() {
    var wasBoss = S.objState.beat.bossBattle;
    S.objState = null;
    hideStepBanner();
    clearInteract();
    if (wasBoss) { finishSession(); return; }
    setPortrait("impressed");
    nextBeat();
  }

  /* ---- end ---- */
  function renderEnd(b) {
    setPortrait(b.emotion || "happy");
    b._fullText = b.text;
    S.typingDone = false;
    say(b.text, "", false, function () {
      var btn = el("button", "btn btn-gold", "See Results ✦");
      btn.addEventListener("click", function () { SQ.audio.sfx("click"); finishSession(); });
      var row = el("div", "choices"); row.appendChild(btn);
      interact(row);
      btn.focus();
    });
  }

  /* ================= results ================= */
  function finishSession() {
    if (!S || S.ended) return;
    S.ended = true;
    SQ.save.recordStreak(S.bestStreak);
    if (S.mode === "boss") finishBoss(); else finishLevel();
  }
  function starsFor(score, max, thresholds) {
    var t = thresholds || [0.55, 0.8];
    var stars = 1;
    if (score >= max * t[0]) stars++;
    if (score >= max * t[1]) stars++;
    return Math.min(3, stars);
  }
  function finishLevel() {
    var lv = S.level;
    var stars = starsFor(S.score, S.max, lv.starThresholds);
    var xpGain = Math.max(0, S.score);
    var unlocks = SQ.save.completeLevel(lv.id, S.score, stars);
    var xpRes = SQ.save.addXP(xpGain);
    var unlocks2 = SQ.save.checkUnlocks(); // rank-based unlocks after XP
    var earnedAch = unlocks.achievements.concat(unlocks2.achievements);
    var earnedSkills = unlocks.skills.concat(unlocks2.skills);
    earnedAch.forEach(function (a) { SQ.app.toast("🏆 " + a.name, a.desc); SQ.audio.sfx("unlock"); });
    earnedSkills.forEach(function (sk) { SQ.app.toast("📖 Skill: " + sk.name, sk.desc); SQ.audio.sfx("unlock"); });
    if (xpRes.rankedUp) { SQ.app.toast("🎖 Rank up: " + xpRes.rank.name, "Your voice carries further now."); SQ.audio.sfx("unlock"); }

    var root = $("#screen-dialogue");
    root.innerHTML = "";
    var center = el("div", "center-stage");
    var card = el("div", "result-card");
    card.appendChild(el("h2", null, esc(lv.name)));
    card.appendChild(el("div", "sub", stars >= 3 ? "Flawless frame!" : stars === 2 ? "Strong call!" : "Call complete — replay to sharpen it."));
    var starRow = el("div", "result-stars");
    for (var i = 1; i <= 3; i++) starRow.appendChild(el("span", "st" + (i <= stars ? " lit" : ""), "★"));
    card.appendChild(starRow);
    card.appendChild(el("div", "result-score", "Score " + S.score + " / " + S.max + " &nbsp;·&nbsp; Best streak " + S.bestStreak + " &nbsp;·&nbsp; +" + xpGain + " XP"));
    var bar = el("div", "xpbar"); var fill = el("i"); bar.appendChild(fill); card.appendChild(bar);
    var s = SQ.save.get();
    var ranks = meta().ranks, ri = SQ.save.rankIndex(s.xp);
    var nextRank = ranks[ri + 1];
    card.appendChild(el("div", "xpbar-label", "Rank: " + ranks[ri].name + (nextRank ? " — " + s.xp + " / " + nextRank.minXP + " XP to " + nextRank.name : " — max rank!")));
    var pct = nextRank ? Math.min(100, Math.round(100 * (s.xp - ranks[ri].minXP) / Math.max(1, nextRank.minXP - ranks[ri].minXP))) : 100;
    setTimeout(function () { fill.style.width = pct + "%"; }, 60);

    var earned = el("div", "earned-list");
    if (stars >= 1) earned.appendChild(el("div", "earned-item", "⭐ Stars kept: <b>" + SQ.save.get().levelStars[lv.id] + "/3</b> (best run counts)"));
    earnedAch.forEach(function (a) { earned.appendChild(el("div", "earned-item", "🏆 Achievement: <b>" + esc(a.name) + "</b> — " + esc(a.desc))); });
    earnedSkills.forEach(function (sk) { earned.appendChild(el("div", "earned-item", "📖 Dialogue skill unlocked: <b>" + esc(sk.name) + "</b> — " + esc(sk.desc))); });
    var newly = newlyUnlockedLevels(lv.id);
    newly.forEach(function (n) { earned.appendChild(el("div", "earned-item", "🗺 New path unlocked: <b>" + esc(n) + "</b>")); });
    if (earned.children.length) card.appendChild(earned);

    var actions = el("div", "result-actions");
    var replay = el("button", "btn", "↻ Replay");
    replay.addEventListener("click", function () { startLevel(lv, { returnTo: S.returnTo }); });
    var back = el("button", "btn btn-primary", S.returnTo === "practice" ? "Back to Practice" : "Back to Map");
    back.addEventListener("click", function () { SQ.app.go(S.returnTo === "practice" ? "practice" : "map"); });
    actions.appendChild(replay); actions.appendChild(back);
    card.appendChild(actions);
    center.appendChild(card);
    root.appendChild(center);
    if (stars >= 2) SQ.audio.sfx("star");
  }
  function newlyUnlockedLevels(lvId) {
    var names = [];
    window.SALES_QUEST.levels.forEach(function (l) {
      if (l.unlockAfter === lvId && !l.placeholder) names.push(l.name);
      else if (l.unlockAfter === lvId && l.placeholder) names.push(l.name + " (coming soon)");
    });
    if (SQ.save.arenaComplete() && window.SALES_QUEST.bosses.length && lvId === (SQ.save.arenaLevel() || {}).id) {
      names.push("the Objection Arena bosses");
    }
    return names;
  }
  function finishBoss() {
    var boss = S.boss;
    var won = S.roundGoods >= Math.min(4, (boss.rounds || []).length);
    var earnedAch = [], earnedSkills = [];
    if (won) {
      S.score += SC().BOSS_WIN;
      var u1 = SQ.save.recordBossWin(boss.id);
      var xpRes = SQ.save.addXP(Math.max(0, S.score));
      var u2 = SQ.save.checkUnlocks();
      earnedAch = u1.achievements.concat(u2.achievements);
      earnedSkills = u1.skills.concat(u2.skills);
      if (xpRes.rankedUp) SQ.app.toast("🎖 Rank up: " + xpRes.rank.name, "");
      if (SQ.save.allBossesWon()) SQ.app.toast("🏔 Closing Summit is open!", "All seven walls have fallen.");
    }
    earnedAch.forEach(function (a) { SQ.app.toast("🏆 " + a.name, a.desc); SQ.audio.sfx("unlock"); });
    earnedSkills.forEach(function (sk) { SQ.app.toast("📖 Skill: " + sk.name, sk.desc); SQ.audio.sfx("unlock"); });

    var root = $("#screen-dialogue");
    root.innerHTML = "";
    var center = el("div", "center-stage");
    var card = el("div", "result-card");
    card.appendChild(el("h2", null, won ? "🏆 Wall Broken!" : "🛡 The Wall Holds"));
    card.appendChild(el("div", "sub", esc(boss.name) + " — " + S.roundGoods + " / " + (boss.rounds || []).length + " rounds handled"));
    var starRow = el("div", "result-stars");
    var lit = won ? Math.max(1, S.roundGoods - 2) : 0;
    for (var i = 1; i <= 3; i++) starRow.appendChild(el("span", "st" + (i <= lit ? " lit" : ""), "★"));
    card.appendChild(starRow);
    card.appendChild(el("div", null, esc(won ? boss.winText : boss.loseText)));
    card.appendChild(el("div", "result-score", "Score " + S.score + (won ? " (+" + SC().BOSS_WIN + " boss bonus)" : "")));
    card.appendChild(el("div", "ethical-note", "🧭 <b>Ethical note:</b> " + esc(boss.ethicalNote || "")));
    var actions = el("div", "result-actions");
    var again = el("button", "btn", "↻ Fight Again");
    again.addEventListener("click", function () { startBoss(boss, { returnTo: S.returnTo }); });
    var back = el("button", "btn btn-primary", S.returnTo === "practice" ? "Back to Practice" : "Back to Map");
    back.addEventListener("click", function () { SQ.app.go(S.returnTo === "practice" ? "practice" : "map"); });
    actions.appendChild(again); actions.appendChild(back);
    card.appendChild(actions);
    center.appendChild(card);
    root.appendChild(center);
    if (won) SQ.audio.sfx("star"); else SQ.audio.sfx("wrong");
  }

  function confirmQuit() {
    SQ.app.confirm("Leave this " + (S.mode === "boss" ? "battle" : "call") + "?", "Progress in this attempt will be lost.", function () {
      S = null;
      SQ.app.go("map");
    });
  }

  /* ================= keyboard ================= */
  function handleKey(e) {
    if (!S) return false;
    var k = e.key;
    if (k === " " || k === "Enter") {
      // if a button currently focused inside interact zone, let it handle
      var ae = document.activeElement;
      if (ae && (ae.classList.contains("choice-btn") || ae.classList.contains("offer-card") || ae.classList.contains("btn")) && $("#interact-zone") && $("#interact-zone").contains(ae)) {
        return false; // native click via Enter/Space
      }
      e.preventDefault();
      advance();
      return true;
    }
    if (k >= "1" && k <= "4") {
      var btns = document.querySelectorAll("#interact-zone .choice-btn:not(:disabled), #interact-zone .offer-card:not(:disabled)");
      var i = parseInt(k, 10) - 1;
      if (btns[i]) { e.preventDefault(); btns[i].click(); return true; }
    }
    if (k === "ArrowDown" || k === "ArrowRight") {
      var b2 = document.querySelectorAll("#interact-zone .choice-btn:not(:disabled), #interact-zone .offer-card:not(:disabled)");
      if (b2.length) { e.preventDefault(); focusChoice((S.focusIdx == null ? -1 : S.focusIdx) + 1); return true; }
    }
    if (k === "ArrowUp" || k === "ArrowLeft") {
      var b3 = document.querySelectorAll("#interact-zone .choice-btn:not(:disabled), #interact-zone .offer-card:not(:disabled)");
      if (b3.length) { e.preventDefault(); focusChoice((S.focusIdx == null ? 1 : S.focusIdx) - 1); return true; }
    }
    return false;
  }

  function active() { return !!S; }

  SQ.engine = {
    startLevel: startLevel, startBoss: startBoss,
    handleKey: handleKey, active: active,
    OFFER_INFO: OFFER_INFO, STEP_ORDER: STEP_ORDER
  };
})();
