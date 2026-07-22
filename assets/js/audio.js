/* ============================================================
   audio.js — procedural WebAudio music + SFX. No audio files.
   Music starts only after the first user gesture (autoplay-safe),
   respects save options (music/sfx), kept at low volume.
   Moods: "adventure" (title/map), "soft" (dialogue/menus in-game).
   ============================================================ */
(function () {
  "use strict";
  var SQ = (window.SQ = window.SQ || {});

  var ctx = null, master = null, musicGain = null, sfxGain = null;
  var mood = null, timer = null, nextT = 0, step = 0;
  var gestureHooked = false;

  function opts() { return (SQ.save && SQ.save.get().options) || { music: true, sfx: true }; }

  function ensureCtx() {
    if (ctx) return true;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    try {
      ctx = new AC();
      master = ctx.createGain(); master.gain.value = 0.9; master.connect(ctx.destination);
      musicGain = ctx.createGain(); musicGain.gain.value = 0.16; musicGain.connect(master);
      sfxGain = ctx.createGain(); sfxGain.gain.value = 0.22; sfxGain.connect(master);
      return true;
    } catch (e) { return false; }
  }
  function resume() { if (ctx && ctx.state === "suspended") ctx.resume(); }

  /* ---------------- music ---------------- */
  // A-minor-ish friendly loop. Each chord = 2 bars of 8th steps (16 steps).
  var CHORDS = {
    adventure: [
      [220.0, 261.63, 329.63], // Am
      [174.61, 220.0, 261.63], // F
      [196.0, 261.63, 329.63], // C/G-ish
      [196.0, 246.94, 293.66]  // G
    ],
    soft: [
      [174.61, 220.0, 261.63],
      [196.0, 261.63, 329.63],
      [220.0, 261.63, 329.63],
      [164.81, 220.0, 261.63]
    ]
  };
  var MELODY = [0, 2, 4, 7, 4, 2, 0, -1, 0, 2, 4, 9, 7, 4, 2, 0]; // scale degrees over chord root
  var SCALE = [1, 9 / 8, 5 / 4, 4 / 3, 3 / 2, 5 / 3, 2, 9 / 4, 5 / 2, 8 / 3];

  function stepDur() { return mood === "soft" ? 0.34 : 0.26; }

  function scheduleStep(t, i) {
    if (!ctx) return;
    var chords = CHORDS[mood] || CHORDS.adventure;
    var chord = chords[Math.floor(i / 16) % chords.length];
    var bar = i % 16;
    // pad: chord tones at start of each bar, soft triangle, long envelope
    if (bar % 8 === 0) {
      chord.forEach(function (f, k) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.type = "triangle"; o.frequency.value = f / 2;
        var v = mood === "soft" ? 0.05 : 0.065;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.linearRampToValueAtTime(v * (1 - k * 0.2), t + 0.06);
        g.gain.exponentialRampToValueAtTime(0.0001, t + stepDur() * 8);
        o.connect(g); g.connect(musicGain);
        o.start(t); o.stop(t + stepDur() * 8 + 0.05);
      });
    }
    // melody pluck on 8ths, sparse in soft mood
    var playMelody = mood === "soft" ? (bar % 4 === 2) : (bar % 2 === 0);
    if (playMelody) {
      var deg = MELODY[bar];
      if (deg >= 0) {
        var root = chord[0];
        var ratio = SCALE[deg % SCALE.length] * Math.pow(2, Math.floor(deg / SCALE.length));
        var o2 = ctx.createOscillator(), g2 = ctx.createGain();
        o2.type = mood === "soft" ? "sine" : "square";
        o2.frequency.value = root * ratio * 2;
        var v2 = mood === "soft" ? 0.035 : 0.045;
        g2.gain.setValueAtTime(0.0001, t);
        g2.gain.linearRampToValueAtTime(v2, t + 0.015);
        g2.gain.exponentialRampToValueAtTime(0.0001, t + stepDur() * 1.8);
        o2.connect(g2); g2.connect(musicGain);
        o2.start(t); o2.stop(t + stepDur() * 2);
      }
    }
  }

  function tick() {
    if (!ctx || !mood) return;
    var ahead = ctx.currentTime + 0.25;
    while (nextT < ahead) {
      scheduleStep(nextT, step);
      nextT += stepDur();
      step++;
    }
  }

  function startMusic(newMood) {
    if (!opts().music) newMood = null;
    if (newMood === mood) return;
    mood = newMood;
    if (timer) { clearInterval(timer); timer = null; }
    if (!mood) return;
    if (!ensureCtx()) return;
    resume();
    step = 0; nextT = ctx.currentTime + 0.05;
    timer = setInterval(tick, 120);
  }

  function setMusicOn(on) {
    if (on) { var m = mood || "adventure"; mood = null; startMusic(m); }
    else { startMusic(null); }
  }

  /* ---------------- sfx ---------------- */
  function blip(freq, dur, type, vol, slide) {
    if (!opts().sfx || !ensureCtx()) return;
    resume();
    var t = ctx.currentTime;
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || "sine"; o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol || 0.5, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(sfxGain);
    o.start(t); o.stop(t + dur + 0.02);
  }
  function seq(notes, gap, type, vol) {
    if (!opts().sfx || !ensureCtx()) return;
    resume();
    notes.forEach(function (f, i) {
      setTimeout(function () { blip(f, 0.14, type, vol); }, i * (gap || 70));
    });
  }
  var sfx = {
    advance: function () { blip(660, 0.06, "sine", 0.35); },
    click:   function () { blip(520, 0.05, "triangle", 0.3); },
    correct: function () { seq([523.25, 659.25, 783.99], 70, "triangle", 0.4); },
    ok:      function () { seq([440, 523.25], 80, "triangle", 0.35); },
    wrong:   function () { blip(180, 0.25, "sawtooth", 0.25, -80); },
    unlock:  function () { seq([392, 523.25, 659.25, 783.99], 85, "square", 0.3); },
    star:    function () { seq([783.99, 1046.5, 1318.5], 90, "sine", 0.35); },
    streak:  function () { seq([659.25, 783.99], 55, "square", 0.3); },
    boss:    function () { seq([196, 146.83, 196], 140, "sawtooth", 0.25); },
    toast:   function () { seq([587.33, 880], 90, "sine", 0.32); }
  };
  function playSfx(name) { if (sfx[name]) sfx[name](); }

  /* ---------------- gesture bootstrap ---------------- */
  function hookGesture() {
    if (gestureHooked) return;
    gestureHooked = true;
    function on() {
      ensureCtx(); resume();
      if (SQ.audio._pendingMood) { var m = SQ.audio._pendingMood; SQ.audio._pendingMood = null; startMusic(m); }
    }
    ["pointerdown", "keydown", "touchstart"].forEach(function (ev) {
      window.addEventListener(ev, on, { passive: true });
    });
  }
  hookGesture();

  SQ.audio = {
    music: function (moodName) {
      // request a mood; if no gesture yet, defer
      if (!ctx && moodName && opts().music) { SQ.audio._pendingMood = moodName; mood = moodName; return; }
      startMusic(moodName);
    },
    setMusicOn: setMusicOn,
    refresh: function () { if (mood) { var m = mood; mood = null; startMusic(opts().music ? m : null); } },
    sfx: playSfx,
    _pendingMood: null
  };
})();
