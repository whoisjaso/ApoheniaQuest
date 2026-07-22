/* ============================================================
   practice.js — Practice Mode hub + drill runners.
   Archetype Drills · Script Recall · Mirror Drills · Anchor Drills
   Objection Battles (any boss) · Full Simulated Calls · Random NPC
   drillsDone counts persist; +5 XP per correct answer.
   ============================================================ */
(function () {
  "use strict";
  var SQ = (window.SQ = window.SQ || {});

  function $(s, r) { return (r || document).querySelector(s); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }
  function D() { return window.SALES_QUEST; }

  /* ================= hub ================= */
  function renderHub() {
    var root = $("#screen-practice");
    root.innerHTML = "";
    root.appendChild(topbar("Practice Mode"));
    var grid = el("div", "hub-grid");
    var drills = D().practice.drills;
    var done = SQ.save.get().drillsDone;

    grid.appendChild(hubCard("🧭", "Archetype Drills", "Read the line, name the ego.", drills.archetype.length, done.archetype, drills.archetype.length ? function () { runDrill("archetype", drills.archetype); } : null));
    grid.appendChild(hubCard("📜", "Script Recall", "The master frame, from memory.", drills.recall.length, done.recall, drills.recall.length ? function () { runDrill("recall", drills.recall); } : null));
    grid.appendChild(hubCard("🪞", "Mirror Drills", "Reflect meaning, not words.", drills.mirror.length, done.mirror, drills.mirror.length ? function () { runDrill("mirror", drills.mirror); } : null));
    grid.appendChild(hubCard("⚓", "Anchor Drills", "Tie next steps to identity.", drills.anchor.length, done.anchor, drills.anchor.length ? function () { runDrill("anchor", drills.anchor); } : null));
    grid.appendChild(hubCard("⚔️", "Objection Battles", "Pick any boss. R→C→I→R→D.", D().bosses.length, done.battles, D().bosses.length ? bossPicker : null));
    grid.appendChild(hubCard("📞", "Full Simulated Calls", "A complete call, start to close.", D().practice.simCalls.length, done.sim, D().practice.simCalls.length ? simPicker : null));
    grid.appendChild(hubCard("🎲", "Random NPC Mode", "A surprise prospect steps up.", D().practice.randomNpcPool.length, done.random, (D().practice.randomNpcPool.length && simSource()) ? randomNpc : null));

    root.appendChild(grid);
    SQ.app.show("practice");
  }

  function topbar(title, backFn) {
    var bar = el("div", "topbar");
    var back = el("button", "btn btn-sm", "← " + (backFn ? "Practice" : "Title"));
    back.addEventListener("click", backFn || function () { SQ.app.go("title"); });
    bar.appendChild(back);
    bar.appendChild(el("span", "title-chip", esc(title)));
    var sp = el("div", "spacer"); bar.appendChild(sp);
    bar.appendChild(el("span", "hud-chip", "⭐ " + SQ.save.totalStars() + " · 🎖 " + SQ.save.rank().name));
    return bar;
  }
  function hubCard(ico, name, desc, total, doneCount, onClick) {
    var c = el("button", "hub-card");
    c.innerHTML = "<span class='ico'>" + ico + "</span><b>" + esc(name) + "</b><small>" + esc(desc) + "</small>" +
      "<span class='count'>" + (total ? total + " challenges · " + (doneCount || 0) + " done" : "Coming soon…") + "</span>";
    if (onClick) c.addEventListener("click", function () { SQ.audio.sfx("click"); onClick(); });
    else c.disabled = true;
    return c;
  }

  /* ================= generic drill runner ================= */
  function runDrill(type, items) {
    var state = { i: 0, right: 0, results: [] };
    var root = $("#screen-practice");
    root.innerHTML = "";
    root.appendChild(topbar(drillName(type), renderHub));
    var prog = el("div", "drill-progress");
    root.appendChild(prog);
    var stage = el("div", "center-stage");
    root.appendChild(stage);
    SQ.app.show("practice");
    renderItem();

    function drillName(t) { return { archetype: "Archetype Drills", recall: "Script Recall", mirror: "Mirror Drills", anchor: "Anchor Drills" }[t] || t; }
    function drawProg() {
      prog.innerHTML = "";
      items.forEach(function (_, k) {
        var cls = "dot";
        if (state.results[k] === true) cls += " right";
        else if (state.results[k] === false) cls += " wrong";
        else if (k === state.i) cls += " now";
        prog.appendChild(el("span", cls));
      });
      prog.appendChild(el("span", "hud-chip", state.right + " correct"));
    }
    function renderItem() {
      drawProg();
      stage.innerHTML = "";
      if (state.i >= items.length) { finish(); return; }
      var item = items[state.i];
      var card = el("div", "result-card");
      card.style.textAlign = "left";
      var qText = item.npcLine || item.prompt || item.situation || "";
      card.appendChild(el("div", "sub", (item.clue ? "💡 " + esc(item.clue) : item.stage ? "Stage: " + esc(item.stage) : "")));
      card.appendChild(el("h2", null, "“" + esc(qText) + "”"));
      stage.appendChild(card);

      if (type === "archetype") renderArchetype(card, item);
      else renderChoiceQuiz(card, item);
    }
    function renderArchetype(card, item) {
      var arch = D().meta.archetypes;
      var list = el("div", "choices");
      list.style.marginTop = "12px";
      item.options.forEach(function (id) {
        var a = arch[id];
        var btn = el("button", "choice-btn", esc(a ? a.name : id));
        btn.addEventListener("click", function () {
          var ok = id === item.answer.primary;
          answer(card, list, btn, ok, item.explain + (item.answer.secondary ? " (Also: " + esc((arch[item.answer.secondary] || {}).name || item.answer.secondary) + ".)" : ""));
        });
        list.appendChild(btn);
      });
      card.appendChild(list);
      focusFirst(list);
    }
    function renderChoiceQuiz(card, item) {
      var list = el("div", "choices");
      list.style.marginTop = "12px";
      item.options.forEach(function (text, k) {
        var btn = el("button", "choice-btn", "<span class='key'>" + (k + 1) + "</span>" + esc(text));
        btn.addEventListener("click", function () {
          answer(card, list, btn, k === item.answerIndex, item.explain);
        });
        list.appendChild(btn);
      });
      card.appendChild(list);
      focusFirst(list);
    }
    function focusFirst(list) { var b = list.querySelector("button"); if (b) setTimeout(function () { b.focus(); }, 60); }
    function answer(card, list, btn, ok, explain) {
      list.querySelectorAll("button").forEach(function (b) { b.disabled = true; b.classList.add(b === btn ? (ok ? "q3" : "q1") : "dim"); });
      state.results[state.i] = ok;
      if (ok) {
        state.right++;
        SQ.audio.sfx("correct");
        SQ.save.addXP(5);
      } else SQ.audio.sfx("wrong");
      var unlocks = SQ.save.recordDrill(type);
      unlocks.achievements.forEach(function (a) { SQ.app.toast("🏆 " + a.name, a.desc); });
      var fb = el("div", "feedback-card " + (ok ? "q3" : "q1"));
      fb.style.marginTop = "10px";
      fb.appendChild(el("div", null, (ok ? "<b>✔ Correct!" : "<b>✖ Not quite.") + "</b> " + esc(explain || "")));
      card.appendChild(fb);
      var next = el("button", "btn btn-primary", state.i + 1 >= items.length ? "Finish ✦" : "Next ▶");
      next.style.marginTop = "10px";
      next.addEventListener("click", function () { SQ.audio.sfx("click"); state.i++; renderItem(); });
      card.appendChild(next);
      next.focus();
      drawProg();
    }
    function finish() {
      stage.innerHTML = "";
      var card = el("div", "result-card");
      card.appendChild(el("h2", null, "Drill Complete!"));
      card.appendChild(el("div", "result-stars", state.right === items.length ? "🌟" : state.right >= items.length / 2 ? "⭐" : "💪"));
      card.appendChild(el("div", "result-score", state.right + " / " + items.length + " correct · +" + state.right * 5 + " XP"));
      var actions = el("div", "result-actions");
      var again = el("button", "btn", "↻ Again");
      again.addEventListener("click", function () { runDrill(type, items); });
      var back = el("button", "btn btn-primary", "Back to Practice");
      back.addEventListener("click", renderHub);
      actions.appendChild(again); actions.appendChild(back);
      card.appendChild(actions);
      stage.appendChild(card);
    }
  }

  /* ================= objection battles ================= */
  function bossPicker() {
    var root = $("#screen-practice");
    root.innerHTML = "";
    root.appendChild(topbar("Objection Battles", renderHub));
    var stage = el("div", "center-stage");
    var card = el("div", "result-card");
    card.appendChild(el("h2", null, "Choose Your Wall"));
    var grid = el("div", "boss-grid");
    D().bosses.forEach(function (b) {
      var won = SQ.save.get().bossWins.indexOf(b.id) !== -1;
      var cell = el("button", "boss-cell", (won ? "<span class='won'>✔</span> " : "") + "<b>" + esc(b.name) + "</b><br><small>“" + esc(b.objectionText) + "”</small>");
      cell.addEventListener("click", function () {
        SQ.save.recordDrill("battles");
        SQ.engine.startBoss(b, { returnTo: "practice" });
      });
      grid.appendChild(cell);
    });
    card.appendChild(grid);
    stage.appendChild(card);
    root.appendChild(stage);
    SQ.app.show("practice");
  }

  /* ================= sim calls ================= */
  function simPicker() {
    var root = $("#screen-practice");
    root.innerHTML = "";
    root.appendChild(topbar("Simulated Calls", renderHub));
    var stage = el("div", "center-stage");
    var card = el("div", "result-card");
    card.appendChild(el("h2", null, "Pick a Simulated Call"));
    var list = el("div", "choices");
    D().practice.simCalls.forEach(function (lv) {
      var btn = el("button", "choice-btn", "<b>" + esc(lv.name) + "</b> — " + esc(lv.subtitle || (lv.npc ? lv.npc.name : "")));
      btn.addEventListener("click", function () {
        SQ.save.recordDrill("sim");
        SQ.engine.startLevel(lv, { returnTo: "practice" });
      });
      list.appendChild(btn);
    });
    card.appendChild(list);
    stage.appendChild(card);
    root.appendChild(stage);
    SQ.app.show("practice");
  }

  /* ================= random NPC ================= */
  function simSource() {
    var p = D().practice;
    if (p.simCalls.length) return p.simCalls[0];
    // graceful fallback: any real level with beats
    for (var i = 0; i < D().levels.length; i++) if (!D().levels[i].placeholder && D().levels[i].beats.length) return D().levels[i];
    return null;
  }
  function randomNpc() {
    var pool = D().practice.randomNpcPool;
    var npc = pool[Math.floor(Math.random() * pool.length)];
    var src = simSource();
    if (!src) return;
    // clone beats; swap NPC; retarget identify answers to this NPC's archetypes
    var clone = {
      id: "sim-random-" + npc.id, region: src.region,
      name: "Random Encounter: " + npc.name,
      subtitle: npc.business || "",
      intro: "A surprise prospect steps up. Read them fresh.",
      npc: npc, teaches: src.teaches,
      starThresholds: src.starThresholds, unlockAfter: null,
      beats: src.beats.map(function (b) {
        if (b.t === "identify") {
          var nb = Object.assign({}, b);
          nb.answer = { primary: npc.primary, secondary: npc.secondary || null };
          return nb;
        }
        return b;
      })
    };
    SQ.save.recordDrill("random");
    SQ.engine.startLevel(clone, { returnTo: "practice" });
  }

  SQ.practice = { renderHub: renderHub };
})();
