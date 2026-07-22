/* ============================================================
   portrait.js — generative flat-shape SVG portraits.
   - npcSVG(portrait, emotion, size): NPC from contract params
       { skin, hair, hairColor, outfit, accessory, bg }
     emotion: neutral|happy|thinking|skeptical|guarded|annoyed|impressed|surprised
   - avatarSVG(avatar, size): player avatar from avatarCatalog indices
       (skin tone, face, hair, outfit, accessory, notebook in hand)
   All original flat vector art, built as SVG strings.
   ============================================================ */
(function () {
  "use strict";
  var SQ = (window.SQ = window.SQ || {});

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function shade(hex, amt) {
    // amt -1..1, darken/lighten
    var m = /^#?([0-9a-f]{6})$/i.exec(hex || "#888888");
    if (!m) return hex || "#888888";
    var n = parseInt(m[1], 16), r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    function adj(v) { return Math.max(0, Math.min(255, Math.round(v + 255 * amt))); }
    return "#" + ((1 << 24) + (adj(r) << 16) + (adj(g) << 8) + adj(b)).toString(16).slice(1);
  }

  /* ---------- hair (shared style ids) ---------- */
  function hairSVG(style, color) {
    var c = esc(color), d = esc(shade(color, -0.12));
    switch (style) {
      case "bald": return "";
      case "buzz":
        return '<path d="M34 46 Q34 22 60 22 Q86 22 86 46 Q86 34 60 33 Q34 34 34 46 Z" fill="' + c + '"/>';
      case "short-crop":
        return '<path d="M33 50 Q31 20 60 19 Q89 20 87 50 Q85 32 60 31 Q35 32 33 50 Z" fill="' + c + '"/>' +
               '<path d="M33 50 Q35 33 60 32 L60 26 Q33 27 33 50 Z" fill="' + d + '" opacity=".5"/>';
      case "side-part":
        return '<path d="M32 52 Q30 18 61 18 Q90 19 88 52 Q87 34 68 31 Q44 28 39 38 Q34 44 32 52 Z" fill="' + c + '"/>' +
               '<rect x="56" y="19" width="3" height="12" rx="1.5" fill="' + d + '"/>';
      case "curly":
        return '<g fill="' + c + '"><circle cx="40" cy="30" r="10"/><circle cx="54" cy="23" r="11"/><circle cx="69" cy="24" r="10"/><circle cx="81" cy="33" r="9"/><circle cx="33" cy="42" r="8"/><circle cx="88" cy="44" r="8"/></g>';
      case "long":
        return '<path d="M31 52 Q28 16 60 15 Q92 16 89 52 L91 82 Q91 90 84 88 L82 52 Q80 33 60 32 Q40 33 38 52 L36 88 Q29 90 29 82 Z" fill="' + c + '"/>';
      case "bun":
        return '<circle cx="60" cy="14" r="9" fill="' + c + '"/>' +
               '<path d="M33 50 Q31 20 60 19 Q89 20 87 50 Q85 33 60 32 Q35 33 33 50 Z" fill="' + c + '"/>';
      case "mohawk":
        return '<path d="M53 40 Q50 10 60 8 Q70 10 67 40 Q63 34 60 34 Q57 34 53 40 Z" fill="' + c + '"/>';
      case "wizard":
        return '<path d="M30 54 Q26 14 60 13 Q94 14 90 54 L94 96 Q80 90 76 70 L74 50 Q72 33 60 32 Q48 33 46 50 L44 70 Q40 90 26 96 Z" fill="' + c + '"/>' +
               '<path d="M46 78 Q60 96 74 78 Q72 100 60 104 Q48 100 46 78 Z" fill="' + c + '" opacity=".85"/>';
      case "wavy":
        return '<path d="M32 52 Q28 18 60 17 Q92 18 88 52 Q86 40 78 35 Q84 46 76 40 Q70 30 60 30 Q46 30 40 40 Q34 46 32 52 Z" fill="' + c + '"/>';
      case "parted":
        return '<path d="M33 51 Q31 19 60 18 Q89 19 87 51 Q85 36 73 32 Q80 40 70 35 Q62 29 52 31 Q38 34 33 51 Z" fill="' + c + '"/>';
      case "afro":
        return '<circle cx="60" cy="30" r="24" fill="' + c + '"/><circle cx="38" cy="40" r="12" fill="' + c + '"/><circle cx="82" cy="40" r="12" fill="' + c + '"/>';
      default: // unknown style -> short-crop
        return hairSVG("short-crop", color);
    }
  }

  /* ---------- emotion faces ---------- */
  function faceSVG(emotion, skinDark) {
    // eyes around (48,52) & (72,52); mouth ~ (60,69); brows above eyes
    var ink = "#2b2b2b";
    var out = "";
    function eye(cx, mode) {
      if (mode === "happy") return '<path d="M' + (cx - 5) + ' 53 Q' + cx + ' 47 ' + (cx + 5) + ' 53" stroke="' + ink + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
      if (mode === "closed") return '<line x1="' + (cx - 5) + '" y1="52" x2="' + (cx + 5) + '" y2="52" stroke="' + ink + '" stroke-width="2.6" stroke-linecap="round"/>';
      if (mode === "wide") return '<circle cx="' + cx + '" cy="52" r="4.6" fill="#fff"/><circle cx="' + cx + '" cy="52" r="4.6" fill="none" stroke="' + ink + '" stroke-width="1.6"/><circle cx="' + cx + '" cy="52" r="2.1" fill="' + ink + '"/>';
      if (mode === "side") return '<circle cx="' + cx + '" cy="52" r="4" fill="#fff"/><circle cx="' + (cx + 1.6) + '" cy="52" r="2" fill="' + ink + '"/>';
      return '<circle cx="' + cx + '" cy="52" r="2.9" fill="' + ink + '"/>';
    }
    function brow(cx, dy, tilt) {
      return '<line x1="' + (cx - 6) + '" y1="' + (44 + dy + tilt) + '" x2="' + (cx + 6) + '" y2="' + (44 + dy - tilt) + '" stroke="' + ink + '" stroke-width="2.4" stroke-linecap="round"/>';
    }
    function mouth(kind) {
      if (kind === "smile") return '<path d="M51 67 Q60 75 69 67" stroke="' + ink + '" stroke-width="2.8" fill="none" stroke-linecap="round"/>';
      if (kind === "bigsmile") return '<path d="M50 66 Q60 78 70 66 Q60 71 50 66 Z" fill="' + ink + '"/>';
      if (kind === "frown") return '<path d="M52 71 Q60 65 68 71" stroke="' + ink + '" stroke-width="2.8" fill="none" stroke-linecap="round"/>';
      if (kind === "open") return '<ellipse cx="60" cy="69" rx="5" ry="6" fill="' + ink + '"/>';
      if (kind === "flat") return '<line x1="53" y1="69" x2="67" y2="69" stroke="' + ink + '" stroke-width="2.6" stroke-linecap="round"/>';
      return '<path d="M53 69 Q60 72 67 69" stroke="' + ink + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    }
    switch (emotion) {
      case "happy":     out = eye(48, "happy") + eye(72, "happy") + brow(48, -2, 0) + brow(72, -2, 0) + mouth("smile"); break;
      case "thinking":  out = eye(48, "dot") + eye(72, "side") + brow(48, 0, 2) + brow(72, -2, -2) + mouth("flat"); break;
      case "skeptical": out = eye(48, "dot") + eye(72, "dot") + brow(48, 1, 0) + brow(72, -4, 0) + mouth("flat"); break;
      case "guarded":   out = eye(48, "dot") + eye(72, "dot") + brow(48, 1, -2) + brow(72, 1, 2) + mouth("flat"); break;
      case "annoyed":   out = eye(48, "dot") + eye(72, "dot") + brow(48, 2, -3) + brow(72, 2, 3) + mouth("frown"); break;
      case "impressed": out = eye(48, "wide") + eye(72, "wide") + brow(48, -4, 0) + brow(72, -4, 0) + mouth("smile"); break;
      case "surprised": out = eye(48, "wide") + eye(72, "wide") + brow(48, -5, 0) + brow(72, -5, 0) + mouth("open"); break;
      default:          out = eye(48, "dot") + eye(72, "dot") + brow(48, -1, 0) + brow(72, -1, 0) + mouth("soft"); break;
    }
    // subtle nose
    out += '<path d="M60 56 Q62 61 59 62" stroke="' + esc(skinDark) + '" stroke-width="2" fill="none" stroke-linecap="round"/>';
    return out;
  }

  /* ---------- accessories ---------- */
  function accessorySVG(kind, emotion) {
    switch (kind) {
      case "glasses":
        return '<g stroke="#2b2b2b" stroke-width="2.4" fill="rgba(255,255,255,.18)">' +
               '<circle cx="48" cy="52" r="8.5"/><circle cx="72" cy="52" r="8.5"/>' +
               '<line x1="56.5" y1="52" x2="63.5" y2="52"/><line x1="39.5" y1="51" x2="32" y2="48"/><line x1="80.5" y1="51" x2="88" y2="48"/></g>';
      case "cap":
        return '<path d="M31 44 Q30 16 60 15 Q90 16 89 44 Q75 34 60 34 Q45 34 31 44 Z" fill="#d95757"/>' +
               '<path d="M30 42 Q14 44 12 50 Q30 52 44 44 Z" fill="#b84545"/>';
      case "earring":
        return '<circle cx="88" cy="60" r="3" fill="#e0b53d" stroke="#a8842a" stroke-width="1"/>';
      case "beard":
        return '<path d="M42 62 Q44 84 60 86 Q76 84 78 62 Q72 74 60 74 Q48 74 42 62 Z" fill="#4a3626"/>';
      case "scarf":
        return '<path d="M38 86 Q60 96 82 86 L84 96 Q60 106 36 96 Z" fill="#e0913d"/>';
      case "headset":
        return '<g stroke="#2b2b2b" stroke-width="3" fill="none"><path d="M34 52 Q34 22 60 21 Q86 22 86 52"/></g>' +
               '<rect x="30" y="48" width="8" height="12" rx="3" fill="#2b2b2b"/><rect x="82" y="48" width="8" height="12" rx="3" fill="#2b2b2b"/>' +
               '<path d="M84 60 Q84 70 72 71" stroke="#2b2b2b" stroke-width="2.4" fill="none"/><circle cx="71" cy="71" r="2.6" fill="#2b2b2b"/>';
      default: return "";
    }
  }

  /* ---------- face shapes (player avatar) ---------- */
  function headPath(face) {
    switch (face) {
      case "oval":    return "M60 24 Q80 24 80 50 Q80 76 60 78 Q40 76 40 50 Q40 24 60 24 Z";
      case "square":  return "M37 34 Q37 24 47 24 L73 24 Q83 24 83 34 L83 62 Q83 76 60 77 Q37 76 37 62 Z";
      case "soft":    return "M60 25 Q79 25 80 48 Q81 70 60 77 Q39 70 40 48 Q41 25 60 25 Z";
      case "angular": return "M60 23 L80 34 L78 62 L60 78 L42 62 L40 34 Z";
      case "heart":   return "M60 26 Q78 22 80 44 Q81 64 60 78 Q39 64 40 44 Q42 22 60 26 Z";
      case "long":    return "M60 22 Q79 24 79 52 Q79 80 60 82 Q41 80 41 52 Q41 24 60 22 Z";
      default:        return "M60 24 Q81 24 81 51 Q81 77 60 77 Q39 77 39 51 Q39 24 60 24 Z"; // round
    }
  }

  /* ---------- NPC portrait ---------- */
  function npcSVG(p, emotion, sizePx) {
    p = p || {};
    var skin = p.skin || "#d9a066", outfit = p.outfit || "#4d96ff",
        bg = p.bg || "#ffd9a0", hairC = p.hairColor || "#2b2b2b";
    var svg =
      '<svg viewBox="0 0 120 120" width="' + (sizePx || 120) + '" height="' + (sizePx || 120) + '" role="img" aria-label="portrait" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="0" y="0" width="120" height="120" rx="18" fill="' + esc(bg) + '"/>' +
      '<circle cx="18" cy="20" r="7" fill="' + esc(shade(bg, 0.12)) + '"/><circle cx="102" cy="30" r="5" fill="' + esc(shade(bg, 0.12)) + '"/>' +
      // body / outfit
      '<path d="M28 120 Q30 92 60 90 Q90 92 92 120 Z" fill="' + esc(outfit) + '"/>' +
      '<path d="M52 91 L60 100 L68 91 L60 89 Z" fill="' + esc(shade(outfit, 0.25)) + '"/>' +
      // neck + head
      '<rect x="54" y="72" width="12" height="14" rx="5" fill="' + esc(shade(skin, -0.08)) + '"/>' +
      '<circle cx="60" cy="52" r="27" fill="' + esc(skin) + '"/>' +
      '<circle cx="33" cy="54" r="5" fill="' + esc(skin) + '"/><circle cx="87" cy="54" r="5" fill="' + esc(skin) + '"/>' +
      hairSVG(p.hair || "short-crop", hairC) +
      faceSVG(emotion || "neutral", shade(skin, -0.25)) +
      accessorySVG(p.accessory || "none", emotion) +
      "</svg>";
    return svg;
  }

  /* ---------- player avatar (from catalog indices) ---------- */
  function avatarSVG(av, sizePx) {
    var cat = (window.SALES_QUEST && SALES_QUEST.meta.avatarCatalog) || {};
    av = av || {};
    var skins = cat.skinTones || ["#f7d7b8"];
    var faces = cat.faces || ["round"];
    var hairs = cat.hairs || [{ id: "buzz" }];
    var hairColors = cat.hairColors || ["#2b2b2b"];
    var outfits = cat.outfits || [{ id: "tee", color: "#4d96ff" }];
    var accs = cat.accessories || [{ id: "none" }];
    var notebooks = cat.notebooks || [{ id: "red", color: "#d95757" }];
    function pick(arr, i) { return arr[Math.max(0, Math.min(arr.length - 1, i || 0))]; }
    var skin = pick(skins, av.skin), face = pick(faces, av.face),
        hair = pick(hairs, av.hair), hairC = pick(hairColors, av.hairColor),
        outfit = pick(outfits, av.outfit), acc = pick(accs, av.accessory),
        nb = pick(notebooks, av.notebook);
    var svg =
      '<svg viewBox="0 0 120 120" width="' + (sizePx || 120) + '" height="' + (sizePx || 120) + '" role="img" aria-label="your avatar" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="0" y="0" width="120" height="120" rx="18" fill="#cdeaff"/>' +
      '<circle cx="20" cy="22" r="7" fill="#b5e0ff"/><circle cx="100" cy="32" r="5" fill="#b5e0ff"/>' +
      // body
      '<path d="M26 120 Q28 92 60 90 Q92 92 94 120 Z" fill="' + esc(outfit.color || "#4d96ff") + '"/>' +
      '<path d="M52 91 L60 100 L68 91 L60 89 Z" fill="' + esc(shade(outfit.color || "#4d96ff", 0.25)) + '"/>' +
      // notebook held at chest
      '<g transform="rotate(-8 78 104)"><rect x="66" y="96" width="26" height="20" rx="3" fill="' + esc(nb.color || "#d95757") + '" stroke="' + esc(shade(nb.color || "#d95757", -0.2)) + '" stroke-width="1.5"/><line x1="70" y1="96" x2="70" y2="116" stroke="' + esc(shade(nb.color || "#d95757", -0.2)) + '" stroke-width="1.5"/></g>' +
      // neck + head with face shape
      '<rect x="54" y="72" width="12" height="14" rx="5" fill="' + esc(shade(skin, -0.08)) + '"/>' +
      '<path d="' + headPath(face) + '" fill="' + esc(skin) + '"/>' +
      hairSVG(hair.id || "buzz", hairC) +
      faceSVG("happy", shade(skin, -0.25)) +
      accessorySVG(acc.id || "none") +
      "</svg>";
    return svg;
  }

  SQ.portrait = { npcSVG: npcSVG, avatarSVG: avatarSVG, shade: shade };
})();
