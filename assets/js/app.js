/* ============================================================
   app.js — screen manager, title screen, avatar screen,
   options, notebook, toasts, confirm modal, global keyboard.
   ============================================================ */
(function () {
  "use strict";
  var SQ = (window.SQ = window.SQ || {});

  var SCREENS = ["title", "map", "dialogue", "practice", "avatar", "options", "notebook"];
  var current = "title";

  function $(s, r) { return (r || document).querySelector(s); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }
  function D() { return window.SALES_QUEST; }
  function cat() { return D().meta.avatarCatalog; }
  function reducedMotion() { return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; }

  /* ================= navigation ================= */
  function show(name) {
    SCREENS.forEach(function (s) {
      var n = $("#screen-" + s);
      if (n) n.style.display = s === name ? "flex" : "none";
    });
    current = name;
  }
  function go(name) {
    if (SQ.refreshHud) SQ.refreshHud(); // keep map HUD chips in sync on every navigation (incl. title-initiated)
    if (name === "title") renderTitle();
    else if (name === "map") { SQ.map.render(); SQ.audio.music("adventure"); }
    else if (name === "practice") { SQ.practice.renderHub(); SQ.audio.music("adventure"); return; } // renderHub calls show()
    else if (name === "avatar") { renderAvatar(); SQ.audio.music("adventure"); }
    else if (name === "options") renderOptions();
    else if (name === "notebook") renderNotebook();
    show(name);
  }

  /* ================= toasts & confirm ================= */
  function toast(title, sub) {
    var box = $("#toasts");
    var t = el("div", "toast", esc(title) + (sub ? "<small>" + esc(sub) + "</small>" : ""));
    box.appendChild(t);
    SQ.audio.sfx("toast");
    setTimeout(function () { t.classList.add("out"); setTimeout(function () { t.remove(); }, 450); }, 3400);
    while (box.children.length > 4) box.firstChild.remove();
  }
  function confirmDlg(title, text, onYes) {
    var veil = el("div", "modal-veil");
    var card = el("div", "modal-card");
    card.appendChild(el("h3", null, esc(title)));
    card.appendChild(el("p", null, esc(text)));
    var actions = el("div", "modal-actions");
    var yes = el("button", "btn btn-primary", "Yes, do it");
    var no = el("button", "btn", "Cancel");
    yes.addEventListener("click", function () { veil.remove(); onYes(); });
    no.addEventListener("click", function () { veil.remove(); });
    veil.addEventListener("click", function (e) { if (e.target === veil) veil.remove(); });
    actions.appendChild(yes); actions.appendChild(no);
    card.appendChild(actions);
    veil.appendChild(card);
    document.body.appendChild(veil);
    no.focus();
  }

  /* ================= TITLE ================= */
  function renderTitle() {
    var root = $("#screen-title");
    root.innerHTML = "";
    var T = D().meta.title;
    var L = T.menuLabels || {};

    // stars
    var stars = el("div", "sky-stars");
    for (var i = 0; i < 40; i++) {
      var st = el("i");
      st.style.left = Math.random() * 100 + "%";
      st.style.top = Math.random() * 100 + "%";
      st.style.animationDelay = (Math.random() * 3) + "s";
      stars.appendChild(st);
    }
    root.appendChild(stars);

    // clouds
    if (!reducedMotion()) {
      for (var c = 0; c < 4; c++) {
        var cl = el("div", "cloud");
        var w = 90 + Math.random() * 130;
        cl.style.cssText = "width:" + w + "px;height:" + (w * 0.32) + "px;top:" + (6 + c * 9 + Math.random() * 4) + "%;left:0;animation-duration:" + (46 + c * 18) + "s;animation-delay:-" + (c * 14) + "s;";
        root.appendChild(cl);
      }
    }

    // winding-path silhouette land
    var land = el("div", "title-land");
    land.innerHTML =
      '<svg viewBox="0 0 1000 460" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M0 220 Q140 120 300 190 Q420 240 520 170 Q660 70 800 150 Q920 210 1000 160 L1000 460 L0 460 Z" fill="#3d5a3f"/>' +
      '<path d="M0 300 Q200 240 420 300 Q640 360 1000 290 L1000 460 L0 460 Z" fill="#2f4a32"/>' +
      '<path d="M120 460 Q180 380 300 390 Q440 400 430 340 Q420 290 520 285 Q640 280 700 330 Q760 380 880 360" fill="none" stroke="#fff8ee" stroke-width="9" stroke-linecap="round" stroke-dasharray="0.1 24" opacity=".8"/>' +
      '<g transform="translate(300 372)"><path d="M-18 0 L0 -16 L18 0 Z" fill="#1e3323"/><rect x="-12" y="0" width="24" height="16" fill="#1e3323"/></g>' +
      '<g transform="translate(700 322)"><path d="M0 -22 L14 4 L6 4 L16 18 L-16 18 L-6 4 L-14 4 Z" fill="#1e3323"/></g>' +
      '<g transform="translate(880 352)"><path d="M0 -22 L14 4 L6 4 L16 18 L-16 18 L-6 4 L-14 4 Z" fill="#1e3323"/></g>' +
      '<g transform="translate(880 240)"><rect x="-2" y="-34" width="4" height="34" fill="#1e3323"/><path d="M2 -34 L26 -26 L2 -18 Z" fill="#ffd93d"/></g>' +
      "</svg>";
    root.appendChild(land);

    // logo + menu
    var inner = el("div", "title-inner");
    inner.appendChild(el("div", "logo", "APOHENIA<br><span>SALES QUEST</span>"));
    inner.appendChild(el("div", "tagline", esc(T.tagline || "")));
    var menu = el("div", "menu");
    var has = SQ.save.hasSave();

    var bNew = el("button", "btn btn-primary", "✦ " + esc(L.newGame || "New Game"));
    bNew.addEventListener("click", function () {
      SQ.audio.sfx("click");
      if (SQ.save.hasSave()) {
        confirmDlg("Start a New Game?", "Your existing save (stars, XP, avatar) will be erased.", function () {
          SQ.save.newGame(); go("map");
        });
      } else { SQ.save.newGame(); go("map"); }
    });
    menu.appendChild(bNew);

    var bCont = el("button", "btn btn-gold", "▶ " + esc(L.continue || "Continue"));
    bCont.disabled = !has;
    bCont.addEventListener("click", function () { SQ.audio.sfx("click"); SQ.save.load(); go("map"); });
    menu.appendChild(bCont);

    var bAdv = el("button", "btn", "🗺 " + esc(L.adventure || "Adventure Mode"));
    bAdv.addEventListener("click", function () {
      SQ.audio.sfx("click");
      if (!SQ.save.hasSave()) SQ.save.newGame();
      go("map");
    });
    menu.appendChild(bAdv);

    var bPrac = el("button", "btn", "🏋 " + esc(L.practice || "Practice Mode"));
    bPrac.addEventListener("click", function () { SQ.audio.sfx("click"); if (!SQ.save.hasSave()) SQ.save.newGame(); go("practice"); });
    menu.appendChild(bPrac);

    var row1 = el("div", "menu-row");
    var bAv = el("button", "btn", "🙂 " + esc(L.avatar || "Avatar"));
    bAv.addEventListener("click", function () { SQ.audio.sfx("click"); if (!SQ.save.hasSave()) SQ.save.newGame(); go("avatar"); });
    var bOpt = el("button", "btn", "⚙ " + esc(L.options || "Options"));
    bOpt.addEventListener("click", function () { SQ.audio.sfx("click"); go("options"); });
    row1.appendChild(bAv); row1.appendChild(bOpt);
    menu.appendChild(row1);

    var row2 = el("div", "menu-row");
    var musicOn = SQ.save.get().options.music;
    var bMus = el("button", "btn", musicOn ? "♪ " + esc(L.musicOn || "Music: On") : "♪ " + esc(L.musicOff || "Music: Off"));
    bMus.addEventListener("click", function () {
      var on = !SQ.save.get().options.music;
      SQ.save.setOptions({ music: on });
      SQ.audio.setMusicOn(on);
      bMus.textContent = on ? "♪ " + (L.musicOn || "Music: On") : "♪ " + (L.musicOff || "Music: Off");
      SQ.audio.sfx("click");
    });
    row2.appendChild(bMus);
    var bMulti = el("button", "btn", "🌐 " + esc(L.multiplayer || "Multiplayer — Coming Later"));
    bMulti.disabled = true;
    var tip = el("div", "tip");
    tip.style.flex = "1";
    tip.appendChild(bMulti);
    tip.appendChild(el("span", "tip-text", "The portal to other worlds is still being built… 🔮"));
    bMulti.style.width = "100%";
    row2.appendChild(tip);
    menu.appendChild(row2);

    inner.appendChild(menu);
    root.appendChild(inner);
    root.appendChild(el("div", "title-foot", "A learning adventure · Space/Enter advance · 1–4 choose · 100% offline, saves in your browser"));
    SQ.audio.music("adventure");
  }

  /* ================= AVATAR ================= */
  function renderAvatar() {
    var root = $("#screen-avatar");
    root.innerHTML = "";
    var bar = el("div", "topbar");
    var back = el("button", "btn btn-sm", "← Title");
    back.addEventListener("click", function () { go("title"); });
    bar.appendChild(back);
    bar.appendChild(el("span", "title-chip", "Your Avatar"));
    var nb = el("button", "btn btn-sm btn-blue", "📖 Notebook");
    nb.addEventListener("click", function () { go("notebook"); });
    var sp = el("div", "spacer"); bar.appendChild(sp);
    bar.appendChild(nb);
    root.appendChild(bar);

    var layout = el("div", "avatar-layout");
    var preview = el("div", "avatar-preview");
    var frame = el("div", "av-frame");
    preview.appendChild(frame);
    var nameEcho = el("div", "hud-chip", "");
    preview.appendChild(nameEcho);
    layout.appendChild(preview);
    var fields = el("div", "avatar-fields");
    layout.appendChild(fields);
    root.appendChild(layout);

    function av() { return SQ.save.get().avatar; }
    function refresh() {
      frame.innerHTML = SQ.portrait.avatarSVG(av(), 200);
      nameEcho.textContent = (av().name || "Jason") + " · " + titleLabel();
    }
    function titleLabel() {
      var t = av().title, titles = cat().titles;
      if (typeof t === "number" && titles[t]) return titles[t].label;
      var match = titles.filter(function (x) { return x.id === t || x.label === t; })[0];
      return match ? match.label : (t || "Founder");
    }

    // name
    var nameBlock = el("div", "field-block", "<b>Name</b>");
    var nameIn = el("input");
    nameIn.type = "text"; nameIn.maxLength = 18; nameIn.value = av().name || "";
    nameIn.setAttribute("aria-label", "Avatar name");
    nameIn.addEventListener("input", function () { SQ.save.setAvatar({ name: nameIn.value.slice(0, 18) }); refresh(); });
    nameBlock.appendChild(nameIn);
    fields.appendChild(nameBlock);

    function block(label) { var b = el("div", "field-block", "<b>" + esc(label) + "</b>"); fields.appendChild(b); return b; }
    function swatchRow(parent, items, getIdx, setIdx, renderItem) {
      var row = el("div", "swatch-row");
      items.forEach(function (it, i) {
        var locked = it.unlockAt != null && !SQ.save.unlockSatisfied(it.unlockAt);
        var s = el("button", "swatch" + (getIdx() === i ? " sel" : ""));
        renderItem(s, it, i);
        s.setAttribute("aria-label", it.label || it);
        if (locked) {
          s.disabled = true;
          s.appendChild(el("span", "lock-ico", "🔒"));
          s.appendChild(el("span", "lock-tip", esc(SQ.save.unlockRuleText(it.unlockAt))));
        } else {
          s.addEventListener("click", function () {
            setIdx(i);
            SQ.audio.sfx("click");
            refresh();
            row.querySelectorAll(".swatch").forEach(function (x) { x.classList.remove("sel"); });
            s.classList.add("sel");
          });
        }
        row.appendChild(s);
      });
      parent.appendChild(row);
    }

    // title picker
    swatchRow(block("Title"), cat().titles, function () { return av().title; }, function (i) { SQ.save.setAvatar({ title: i }); },
      function (s, it) { s.classList.add("text-swatch"); s.textContent = it.label; });
    // skin
    swatchRow(block("Skin Tone"), cat().skinTones.map(function (hex) { return { label: hex, unlockAt: "start", hex: hex }; }), function () { return av().skin; }, function (i) { SQ.save.setAvatar({ skin: i }); },
      function (s, it) { s.style.background = it.hex; });
    // face
    swatchRow(block("Face Shape"), cat().faces.map(function (f) { return { label: f, unlockAt: "start" }; }), function () { return av().face; }, function (i) { SQ.save.setAvatar({ face: i }); },
      function (s, it) { s.classList.add("text-swatch"); s.textContent = it.label; });
    // hair
    swatchRow(block("Hair Style"), cat().hairs, function () { return av().hair; }, function (i) { SQ.save.setAvatar({ hair: i }); },
      function (s, it) { s.classList.add("text-swatch"); s.textContent = it.label; });
    // hair color
    swatchRow(block("Hair Color"), cat().hairColors.map(function (hex) { return { label: hex, unlockAt: "start", hex: hex }; }), function () { return av().hairColor; }, function (i) { SQ.save.setAvatar({ hairColor: i }); },
      function (s, it) { s.style.background = it.hex; });
    // outfit
    swatchRow(block("Outfit"), cat().outfits, function () { return av().outfit; }, function (i) { SQ.save.setAvatar({ outfit: i }); },
      function (s, it) { s.style.background = it.color; s.title = it.label; });
    // accessory
    swatchRow(block("Accessory"), cat().accessories, function () { return av().accessory; }, function (i) { SQ.save.setAvatar({ accessory: i }); },
      function (s, it) { s.classList.add("text-swatch"); s.textContent = it.label; });
    // notebook
    swatchRow(block("Sales Notebook"), cat().notebooks, function () { return av().notebook; }, function (i) { SQ.save.setAvatar({ notebook: i }); },
      function (s, it) { s.style.background = it.color; s.title = it.label; });
    // dialogue theme
    swatchRow(block("Dialogue-Box Theme"), cat().dialogueThemes, function () { return av().theme; }, function (i) { SQ.save.setAvatar({ theme: i }); },
      function (s, it) { s.classList.add("text-swatch"); s.textContent = it.label; });

    refresh();
  }

  /* ================= NOTEBOOK ================= */
  function renderNotebook() {
    var root = $("#screen-notebook");
    root.innerHTML = "";
    root.style.background = "linear-gradient(180deg,#efe9ff,#fff8ee)";
    var bar = el("div", "topbar");
    var back = el("button", "btn btn-sm", "← Avatar");
    back.addEventListener("click", function () { go("avatar"); });
    bar.appendChild(back);
    bar.appendChild(el("span", "title-chip", "📖 Sales Notebook"));
    root.appendChild(bar);

    var wrap = el("div");
    wrap.style.cssText = "flex:1;overflow:auto;display:flex;flex-direction:column;gap:14px;padding-bottom:16px;";
    wrap.appendChild(el("div", "topbar", "<span class='hud-chip'>Dialogue Skills</span>"));
    var skills = el("div", "notebook-list");
    var have = SQ.save.get().skills;
    (D().meta.dialogueSkills || []).forEach(function (sk) {
      var got = have.indexOf(sk.id) !== -1;
      var item = el("div", "notebook-item" + (got ? "" : " locked"));
      item.innerHTML = "<b>" + (got ? "📖 " : "🔒 ") + esc(sk.name) + "</b><small>" + esc(sk.desc) + "</small>" +
        (got ? "" : "<div class='rule'>" + esc(SQ.save.unlockRuleText(sk.unlockAt)) + "</div>");
      skills.appendChild(item);
    });
    if (!skills.children.length) skills.appendChild(el("div", "notebook-item", "<b>Coming soon…</b>"));
    wrap.appendChild(skills);

    wrap.appendChild(el("div", "topbar", "<span class='hud-chip'>Achievements</span>"));
    var ach = el("div", "notebook-list");
    var gotA = SQ.save.get().achievements;
    (D().meta.achievements || []).forEach(function (a) {
      var got = gotA.indexOf(a.id) !== -1;
      var item = el("div", "notebook-item" + (got ? "" : " locked"));
      item.innerHTML = "<b>" + (got ? "🏆 " : "🔒 ") + esc(a.name) + "</b><small>" + esc(a.desc) + "</small>";
      ach.appendChild(item);
    });
    if (!ach.children.length) ach.appendChild(el("div", "notebook-item", "<b>Coming soon…</b>"));
    wrap.appendChild(ach);
    root.appendChild(wrap);
  }

  /* ================= OPTIONS ================= */
  function renderOptions() {
    var root = $("#screen-options");
    root.innerHTML = "";
    var bar = el("div", "topbar");
    var back = el("button", "btn btn-sm", "← Title");
    back.addEventListener("click", function () { go("title"); });
    bar.appendChild(back);
    bar.appendChild(el("span", "title-chip", "Options"));
    root.appendChild(bar);

    var center = el("div", "center-stage");
    var card = el("div", "options-card");

    function segRow(label, desc, options, getIdx, setIdx) {
      var row = el("div", "opt-row");
      var left = el("div", null, esc(label) + "<div class='desc'>" + esc(desc) + "</div>");
      var seg = el("div", "seg");
      options.forEach(function (op, i) {
        var b = el("button", null, esc(op));
        if (getIdx() === i) b.classList.add("on");
        b.addEventListener("click", function () {
          setIdx(i);
          seg.querySelectorAll("button").forEach(function (x) { x.classList.remove("on"); });
          b.classList.add("on");
          SQ.audio.sfx("click");
        });
        seg.appendChild(b);
      });
      row.appendChild(left); row.appendChild(seg);
      card.appendChild(row);
    }

    segRow("Music", "Procedural chiptune loop", ["Off", "On"],
      function () { return SQ.save.get().options.music ? 1 : 0; },
      function (i) { SQ.save.setOptions({ music: i === 1 }); SQ.audio.setMusicOn(i === 1); });
    segRow("Sound FX", "Blips for answers, stars, unlocks", ["Off", "On"],
      function () { return SQ.save.get().options.sfx ? 1 : 0; },
      function (i) { SQ.save.setOptions({ sfx: i === 1 }); });
    segRow("Text Speed", "Typewriter pace in dialogue", ["Slow", "Normal", "Fast"],
      function () { var t = SQ.save.get().options.textSpeed; return t === 0 ? 0 : t === 2 ? 2 : 1; },
      function (i) { SQ.save.setOptions({ textSpeed: i }); });

    var danger = el("div", "opt-row");
    danger.appendChild(el("div", null, "Reset Save<div class='desc'>Erase stars, XP, avatar — everything.</div>"));
    var bReset = el("button", "btn btn-sm", "Reset…");
    bReset.style.borderColor = "#a33";
    bReset.addEventListener("click", function () {
      confirmDlg("Erase your save?", "All progress, cosmetics and settings will be lost forever.", function () {
        SQ.save.wipe();
        toast("Save erased", "A fresh trail awaits.");
        go("title");
      });
    });
    danger.appendChild(bReset);
    card.appendChild(danger);

    card.appendChild(el("div", "controls-ref",
      "<b>Controls</b><br>" +
      "<kbd>Space</kbd>/<kbd>Enter</kbd> advance dialogue · <kbd>1</kbd>–<kbd>4</kbd> pick an answer<br>" +
      "<kbd>↑</kbd><kbd>↓</kbd> move between answers · <kbd>Esc</kbd> close map panel · Mouse/touch works everywhere"));
    center.appendChild(card);
    root.appendChild(center);
  }

  /* ================= global keyboard ================= */
  document.addEventListener("keydown", function (e) {
    if (current === "dialogue" && SQ.engine.active()) {
      SQ.engine.handleKey(e);
      return;
    }
    if (e.key === "Escape" && current === "map") SQ.map.closePanel();
  });

  /* ================= boot ================= */
  function init() {
    SQ.save.load();
    renderTitle();
    show("title");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  SQ.app = { show: show, go: go, toast: toast, confirm: confirmDlg };
})();
