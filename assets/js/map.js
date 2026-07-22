/* ============================================================
   map.js — original SVG adventure map.
   Winding dotted path across 10 themed regions (bottom → top),
   colorful nodes with icons + names + stars, lock/unlock states,
   checkpoint flags, Objection Arena boss sub-panel, avatar token.
   Scrollable/pannable, responsive.
   ============================================================ */
(function () {
  "use strict";
  var SQ = (window.SQ = window.SQ || {});

  var W = 1000, H = 1750, BAND = 170;
  var X_PAT = [500, 270, 500, 730, 500, 270, 500, 730, 500, 500]; // winding x per region index

  function $(s, r) { return (r || document).querySelector(s); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }
  function nodePos(i) { return { x: X_PAT[i % X_PAT.length], y: H - (i + 0.5) * BAND }; }

  /* ---------- region icons (original flat shapes, centered at 0,0) ---------- */
  function icon(kind, c) {
    var a = esc(c || "#2b2b3a");
    switch (kind) {
      case "village": return '<path d="M-16 2 L0 -12 L16 2 Z" fill="' + a + '"/><rect x="-11" y="2" width="22" height="14" rx="2" fill="' + a + '"/><rect x="-3" y="8" width="6" height="8" fill="#fff8ee"/>';
      case "garden": return '<circle cx="0" cy="-6" r="5" fill="' + a + '"/><circle cx="-7" cy="-1" r="5" fill="' + a + '"/><circle cx="7" cy="-1" r="5" fill="' + a + '"/><circle cx="0" cy="2" r="4" fill="#fff8ee"/><rect x="-1.5" y="4" width="3" height="12" fill="' + a + '"/>';
      case "trail": return '<rect x="-2" y="-14" width="4" height="30" fill="' + a + '"/><path d="M2 -12 L16 -8 L2 -4 Z" fill="' + a + '"/><path d="M-2 -2 L-14 2 L-2 6 Z" fill="' + a + '"/>';
      case "forest": return '<path d="M0 -16 L12 0 L5 0 L14 12 L-14 12 L-5 0 L-12 0 Z" fill="' + a + '"/><rect x="-2.5" y="12" width="5" height="6" fill="' + a + '"/>';
      case "cave": return '<path d="M-16 14 Q-16 -12 0 -12 Q16 -12 16 14 Z" fill="' + a + '"/><path d="M-7 14 Q-7 0 0 0 Q7 0 7 14 Z" fill="#fff8ee"/>';
      case "city": return '<rect x="-15" y="-4" width="9" height="18" fill="' + a + '"/><rect x="-4" y="-12" width="10" height="26" fill="' + a + '"/><rect x="8" y="-7" width="8" height="21" fill="' + a + '"/>';
      case "fields": return '<path d="M0 -14 L0 14" stroke="' + a + '" stroke-width="3"/><ellipse cx="-5" cy="-8" rx="4" ry="6" fill="' + a + '" transform="rotate(-25 -5 -8)"/><ellipse cx="5" cy="-8" rx="4" ry="6" fill="' + a + '" transform="rotate(25 5 -8)"/><ellipse cx="-5" cy="2" rx="4" ry="6" fill="' + a + '" transform="rotate(-25 -5 2)"/><ellipse cx="5" cy="2" rx="4" ry="6" fill="' + a + '" transform="rotate(25 5 2)"/>';
      case "castle": return '<rect x="-14" y="-4" width="28" height="18" fill="' + a + '"/><rect x="-16" y="-12" width="8" height="10" fill="' + a + '"/><rect x="-4" y="-14" width="8" height="12" fill="' + a + '"/><rect x="8" y="-12" width="8" height="10" fill="' + a + '"/><rect x="-3" y="4" width="6" height="10" fill="#fff8ee"/>';
      case "arena": return '<path d="M-12 -12 L10 12 M-6 -12 L-12 -6 M12 -12 L-10 12 M6 -12 L12 -6" stroke="' + a + '" stroke-width="3.4" stroke-linecap="round"/><circle cx="0" cy="0" r="4" fill="' + a + '"/>';
      case "summit": return '<path d="M-16 12 L-4 -10 L2 -2 L8 -12 L16 12 Z" fill="' + a + '"/><rect x="6" y="-18" width="2.4" height="9" fill="' + a + '"/><path d="M8 -18 L16 -15.5 L8 -13 Z" fill="' + a + '"/>';
      default: return '<circle cx="0" cy="0" r="10" fill="' + a + '"/>';
    }
  }
  function deco(kind, x, y, c, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + (s || 0.8) + ')" opacity=".35">' + icon(kind, c) + "</g>";
  }

  function starShape(x, y, lit) {
    return '<path transform="translate(' + x + " " + y + ') scale(.9)" d="M0 -7 L2 -2.2 L7 -2.2 L3 1.2 L4.4 6.5 L0 3.4 L-4.4 6.5 L-3 1.2 L-7 -2.2 L-2 -2.2 Z" fill="' + (lit ? "#ffd93d" : "rgba(43,43,58,.18)") + '" stroke="rgba(43,43,58,.4)" stroke-width="1"/>';
  }
  function lockShape(x, y) {
    return '<g transform="translate(' + x + " " + y + ')"><rect x="-8" y="-2" width="16" height="12" rx="3" fill="#55556b"/><path d="M-5 -2 L-5 -6 Q-5 -11 0 -11 Q5 -11 5 -6 L5 -2" fill="none" stroke="#55556b" stroke-width="3"/><circle cx="0" cy="3" r="2" fill="#fff8ee"/></g>';
  }
  function flagShape(x, y, c) {
    return '<g transform="translate(' + x + " " + y + ')"><g class="map-flag"><rect x="-1.5" y="-26" width="3" height="26" fill="#2b2b3a"/><path d="M1.5 -26 L22 -20 L1.5 -14 Z" fill="' + esc(c) + '"/></g></g>';
  }

  function render() {
    var D = window.SALES_QUEST;
    var save = SQ.save.get();
    var regions = D.meta.regions;
    var cur = SQ.save.currentLevel();
    var svg = [];

    // background base
    svg.push('<rect width="' + W + '" height="' + H + '" fill="#aee3ff"/>');

    // region bands
    regions.forEach(function (r, i) {
      var top = H - (i + 1) * BAND;
      svg.push('<rect x="0" y="' + top + '" width="' + W + '" height="' + BAND + '" fill="' + esc(r.theme.sky) + '"/>');
      // rolling ground
      var gy = top + BAND * 0.55;
      svg.push('<path d="M0 ' + (gy + 30) + ' Q 250 ' + (gy - 20) + ' 500 ' + (gy + 20) + ' T 1000 ' + (gy + 10) + ' L1000 ' + (top + BAND) + ' L0 ' + (top + BAND) + ' Z" fill="' + esc(r.theme.ground) + '"/>');
      // decorative icons
      svg.push(deco(r.icon, 120 + (i % 3) * 60, top + 44, SQ.portrait.shade(r.theme.ground, -0.25), 1.4));
      svg.push(deco(r.icon, 880 - (i % 2) * 50, top + 96, SQ.portrait.shade(r.theme.ground, -0.25), 1.1));
      // region name ribbon
      svg.push('<text x="18" y="' + (top + 24) + '" font-size="15" font-weight="900" fill="rgba(43,43,58,.5)" font-family="inherit">' + esc((i + 1) + ". " + r.name) + "</text>");
      // checkpoint flags at band borders
      if (i === 2 || i === 5 || i === 8) svg.push(flagShape(950, top + 4, r.theme.accent));
    });

    // winding dotted path through nodes (level order bottom→top)
    var pts = regions.map(function (r, i) { return nodePos(i); });
    var d = "M" + pts[0].x + " " + (pts[0].y + 90);
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      var prev = i === 0 ? { x: p.x, y: p.y + 90 } : pts[i - 1];
      var midY = (prev.y + p.y) / 2;
      d += " C " + prev.x + " " + midY + ", " + p.x + " " + midY + ", " + p.x + " " + p.y;
    }
    svg.push('<path d="' + d + '" fill="none" stroke="#fff8ee" stroke-width="10" stroke-linecap="round" stroke-dasharray="0.1 22" opacity=".9"/>');
    svg.push('<path d="' + d + '" fill="none" stroke="rgba(43,43,58,.35)" stroke-width="3" stroke-linecap="round" stroke-dasharray="0.1 22"/>');

    // nodes
    regions.forEach(function (r, i) {
      var lv = D.levels[i];
      var p = pts[i];
      var unlocked = SQ.save.isLevelUnlocked(lv);
      var stars = save.levelStars[lv.id] || 0;
      var isCurrent = cur && lv.id === cur.id && unlocked && stars < 1;
      var g = '<g class="map-node' + (unlocked ? "" : " locked") + '" data-level="' + esc(lv.id) + '" transform="translate(' + p.x + " " + p.y + ')" tabindex="0" role="button" aria-label="' + esc(lv.name) + (unlocked ? "" : " (locked)") + '">';
      if (isCurrent) g += '<circle class="pulse" r="58" fill="' + esc(r.theme.accent) + '"/>';
      g += '<circle r="46" fill="' + (unlocked ? "#fff8ee" : "#cfcbe0") + '" stroke="' + (unlocked ? esc(r.theme.accent) : "#8a87a0") + '" stroke-width="6"/>';
      g += '<g transform="scale(1.5)">' + icon(r.icon, unlocked ? SQ.portrait.shade(r.theme.accent, -0.15) : "#8a87a0") + "</g>";
      if (!unlocked) g += lockShape(0, 2);
      if (r.bossRegion) g += '<circle cx="34" cy="-34" r="13" fill="#7a2e2e" stroke="#fff8ee" stroke-width="3"/><text x="34" y="-29" text-anchor="middle" font-size="14" fill="#ffd93d">⚔</text>';
      // stars under node
      g += starShape(-22, 62, stars >= 1) + starShape(0, 66, stars >= 2) + starShape(22, 62, stars >= 3);
      // label
      g += '<text y="92" text-anchor="middle" font-size="17" font-weight="900" fill="#2b2b3a" stroke="#fff8ee" stroke-width="4" paint-order="stroke" font-family="inherit">' + esc(lv.name) + "</text>";
      g += "</g>";
      svg.push(g);
    });

    // avatar token at current node
    if (cur) {
      var ci = D.levels.indexOf(cur);
      if (ci >= 0) {
        var cp = pts[ci];
        svg.push('<g transform="translate(' + (cp.x + 62) + " " + (cp.y - 62) + ')"><g class="map-token">' +
          '<circle r="26" fill="#fff8ee" stroke="#2b2b3a" stroke-width="4"/>' +
          '<g transform="translate(-21 -21) scale(0.35)">' + SQ.portrait.avatarSVG(save.avatar, 120).replace(/<\/?svg[^>]*>/g, "") + "</g>" +
          "</g></g>");
      }
    }

    // quick-play chip for the current level
    var playBtn = document.getElementById("map-play");
    if (playBtn) {
      if (cur && !cur.placeholder) {
        playBtn.disabled = false;
        playBtn.textContent = "▶ " + cur.name;
        playBtn.onclick = function () { SQ.audio.sfx("click"); SQ.engine.startLevel(cur, { returnTo: "map" }); };
      } else {
        playBtn.disabled = true;
        playBtn.textContent = "▶ Play";
        playBtn.onclick = null;
      }
    }

    var wrap = $(".map-svg-wrap", $("#screen-map"));
    if (!wrap) return;
    wrap.innerHTML = '<svg class="map-svg" viewBox="0 0 ' + W + " " + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Adventure map">' + svg.join("") + "</svg>";

    // wire nodes
    wrap.querySelectorAll(".map-node").forEach(function (n) {
      n.addEventListener("click", function () { onNode(n.getAttribute("data-level")); });
      n.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onNode(n.getAttribute("data-level")); }
      });
    });

    // scroll to current node
    setTimeout(function () {
      if (cur) {
        var ci = D.levels.indexOf(cur);
        if (ci >= 0) {
          var scroller = $(".map-scroll", $("#screen-map"));
          var svgEl = $(".map-svg", $("#screen-map"));
          if (scroller && svgEl) {
            var scale = svgEl.clientWidth / W;
            var y = nodePos(ci).y * scale;
            scroller.scrollTop = Math.max(0, y - scroller.clientHeight * 0.55);
          }
        }
      }
    }, 50);
  }

  function onNode(lvId) {
    var D = window.SALES_QUEST;
    var lv = D.levels.filter(function (l) { return l.id === lvId; })[0];
    if (!lv) return;
    var region = SQ.save.regionOf(lv.region);
    if (!SQ.save.isLevelUnlocked(lv)) {
      SQ.audio.sfx("wrong");
      var reason = "";
      if (SQ.save.summitLevel() && lv.id === SQ.save.summitLevel().id && SQ.save.arenaComplete()) {
        reason = "Defeat all 7 bosses of the Objection Arena to open the Summit.";
      } else if (lv.unlockAfter) {
        var prev = D.levels.filter(function (l) { return l.id === lv.unlockAfter; })[0];
        reason = "Complete “" + (prev ? prev.name : lv.unlockAfter) + "” first.";
      } else reason = "This path is not open yet.";
      SQ.app.toast("🔒 Locked", reason);
      return;
    }
    SQ.audio.sfx("click");
    if (region && region.bossRegion) showBossPanel(lv);
    else showLevelPanel(lv, region);
  }

  function panelBase() {
    closePanel();
    var p = document.createElement("div");
    p.className = "floating-panel";
    p.id = "map-panel";
    $("#screen-map").appendChild(p);
    return p;
  }
  function closePanel() { var p = $("#map-panel"); if (p) p.remove(); }

  function showLevelPanel(lv, region) {
    var save = SQ.save.get();
    var stars = save.levelStars[lv.id] || 0;
    var p = panelBase();
    var html = "<h3>" + esc(lv.name) + "</h3><div class='sub'>" + esc(lv.subtitle || (region ? region.mapBlurb : "")) + "</div>";
    if (lv.placeholder) {
      html += "<p style='font-weight:700;color:var(--ink-soft)'>🚧 " + esc(lv.intro || "Coming soon!") + "</p>";
      p.innerHTML = html;
        var c1 = document.createElement("button"); c1.className = "btn btn-sm"; c1.textContent = "Close";
      c1.addEventListener("click", closePanel);
      var pa1 = document.createElement("div"); pa1.className = "panel-actions"; pa1.appendChild(c1); p.appendChild(pa1);
      return;
    }
    html += "<div class='panel-stars'>" + (stars >= 1 ? "★" : "☆") + (stars >= 2 ? "★" : "☆") + (stars >= 3 ? "★" : "☆") + "</div>";
    if (save.levelBest[lv.id] != null) html += "<div class='sub'>Best score: " + save.levelBest[lv.id] + "</div>";
    p.innerHTML = html;
    if (lv.npc) {
      var npcBox = document.createElement("div");
      npcBox.className = "panel-npc";
      npcBox.innerHTML = SQ.portrait.npcSVG(lv.npc.portrait, "neutral", 64) +
        "<div class='who'><b>" + esc(lv.npc.name) + "</b>" + esc(lv.npc.business || "") + (lv.npc.role ? " · " + esc(lv.npc.role) : "") + "</div>";
      p.appendChild(npcBox);
    }
    var intro = document.createElement("p");
    intro.style.cssText = "font-weight:700;color:var(--ink-soft);font-size:.9rem";
    intro.textContent = lv.intro || "";
    p.appendChild(intro);
    var actions = document.createElement("div"); actions.className = "panel-actions";
    var play = document.createElement("button");
    play.className = "btn btn-primary";
    play.textContent = stars >= 1 ? "↻ Replay Call" : "▶ Start Call";
    play.addEventListener("click", function () { closePanel(); SQ.engine.startLevel(lv, { returnTo: "map" }); });
    var close = document.createElement("button"); close.className = "btn"; close.textContent = "Close";
    close.addEventListener("click", closePanel);
    actions.appendChild(play); actions.appendChild(close);
    p.appendChild(actions);
    play.focus();
  }

  function showBossPanel(lv) {
    var D = window.SALES_QUEST;
    var save = SQ.save.get();
    var arenaDone = SQ.save.arenaComplete();
    var stars = save.levelStars[lv.id] || 0;
    var p = panelBase();
    var html = "<h3>⚔ Objection Arena</h3><div class='sub'>Seven walls. One structure: Receive → Clarify → Isolate → Resolve → Decide.</div>";
    html += "<div class='panel-stars'>" + (stars >= 1 ? "★" : "☆") + (stars >= 2 ? "★" : "☆") + (stars >= 3 ? "★" : "☆") + " <span style='font-size:.8rem'>training call</span></div>";
    p.innerHTML = html;

    var actions = document.createElement("div"); actions.className = "panel-actions";
    if (!lv.placeholder) {
      var train = document.createElement("button");
      train.className = "btn btn-blue btn-sm";
      train.textContent = stars >= 1 ? "↻ Arena Training Call" : "▶ Arena Training Call";
      train.addEventListener("click", function () { closePanel(); SQ.engine.startLevel(lv, { returnTo: "map" }); });
      actions.appendChild(train);
    }
    p.appendChild(actions);

    var grid = document.createElement("div"); grid.className = "boss-grid";
    D.bosses.forEach(function (b) {
      var won = save.bossWins.indexOf(b.id) !== -1;
      var cell = document.createElement("button");
      cell.className = "boss-cell";
      cell.disabled = !arenaDone;
      cell.innerHTML = (won ? "<span class='won'>✔</span> " : arenaDone ? "" : "🔒 ") + "<b>" + esc(b.name) + "</b><br><small>“" + esc(b.objectionText) + "”</small>";
      if (arenaDone) cell.addEventListener("click", function () { closePanel(); SQ.engine.startBoss(b, { returnTo: "map" }); });
      grid.appendChild(cell);
    });
    if (!D.bosses.length) grid.innerHTML = "<div class='sub'>Bosses coming soon…</div>";
    p.appendChild(grid);
    if (!arenaDone) {
      var hint = document.createElement("div");
      hint.className = "sub";
      hint.style.marginTop = "8px";
      hint.textContent = lv.placeholder ? "The Arena training call is still being paved — bosses open once it's ready and complete." : "Complete the Arena training call to challenge the bosses.";
      p.appendChild(hint);
    }
    var close = document.createElement("button"); close.className = "btn btn-sm"; close.textContent = "Close";
    close.style.marginTop = "10px";
    close.addEventListener("click", closePanel);
    p.appendChild(close);
  }

  SQ.map = { render: render, closePanel: closePanel };
})();
