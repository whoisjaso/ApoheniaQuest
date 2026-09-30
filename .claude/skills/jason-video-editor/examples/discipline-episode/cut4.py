"""Episode #2 'You ARE disciplined' — frame-exact cut + word-timed captions.
Markup in text: !WORD = red keyword, +WORD = green, ^WORD = yellow. Slow ranges are part-local seconds."""
import json, subprocess, os, re, difflib
OFF = {"a01": 0, "a02": 59.91, "a03": 120.09, "a04": 179.82, "a05": 239.46}
EP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = f"{EP}/full.mov"; SLOW = 0.5
# (part, a, b, text, tag, [slow ranges])
KEEP = [
 ("a04", 21.84, 24.78, "I'm black as fuck, and my dick is big as fuck.", "hook", [(24.35, 24.78)]),
 ("a01", 18.0, 19.28, "A lot of people believe that", "succ", []),
 ("a01", 21.8, 25.95, "in order to be successful, you need to be ^disciplined, which is true.", "succ", []),
 ("a01", 27.0, 28.45, "But they're saying that", "arent", []),
 ("a01", 29.85, 35.3, "from a mindset that they !aren't currently disciplined. But you actually ^ARE disciplined.", "arent", []),
 ("a01", 36.05, 41.6, "Right? The only difference is ^where you're concentrating your discipline.", "where", []),
 ("a02", 1.05, 11.6, "Your discipline when you !overeat. Your discipline when you !smoke every single day. Your discipline when you go to a fucking !club every single week.", "list", []),
 ("a02", 13.3, 17.3, "Your discipline when you get !slutted the fuck out, you stupid bitch.", "list", [(16.85, 17.3)]),
 ("a02", 25.75, 31.85, "You're concentrating your discipline, your energy, your power, to !bullshit.", "bs", [(31.1, 31.85)]),
 ("a02", 33.3, 41.95, "So you might be asking, why the fuck is it that the things I want to do, I don't do, but the things I !don't want to do, I do?", "why", []),
 ("a02", 45.65, 54.7, "Your brain is literally structured by the things, and the discipline, and the ^habits, and the actions that you're currently doing every single day.", "brain", []),
 ("a03", 6.65, 9.4, "Your brain's objective is to keep you ^alive.", "alive", []),
 ("a03", 12.05, 14.15, "But luckily for us, we're created in the ^image ^of ^God.", "god", []),
 ("a03", 15.4, 16.55, "We have consciousness.", "god", []),
 ("a03", 26.2, 28.6, "We have that fucking +authority.", "auth", []),
 ("a03", 31.98, 34.75, "We have that governance over our minds.", "auth", []),
 ("a03", 36.2, 37.9, "So instead of being a fucking !loser", "loser", []),
 ("a03", 40.45, 43.7, "who !smokes every single day, !drinks every single day,", "loser", []),
 ("a04", 4.35, 6.4, "+Redirect your discipline", "redirect", []),
 ("a04", 7.6, 11.15, "to actually benefit your fucking future. Make it ^fun.", "redirect", []),
 ("a04", 16.0, 24.78, "When I started the habit of going to the gym every single day of the week, because I'm not a bitch, and I'm black as fuck, and my dick is big as fuck.", "gym", [(24.35, 24.78)]),
 ("a04", 27.35, 35.35, "The way I started it was just buying +new fucking +clothes, because now it's given me a fucking reason to go to the gym, to be a fly-ass young nigga.", "clothes", [(35.0, 35.35)]),
 ("a04", 37.95, 38.95, "Make it ^fun.", "fun2", []),
 ("a04", 39.75, 40.95, "The reason why you quit", "reward", []),
 ("a04", 43.05, 44.56, "is because it's not intriguing for you,", "reward", []),
 ("a04", 46.05, 48.6, "you're not seeing immediate +reward from it.", "reward", []),
 ("a04", 52.25, 53.9, "Stop being a fucking !loser.", "close", [(53.16, 53.9)]),
 ("a04", 56.95, 58.75, "Stop being a dumb !smoker.", "close", []),
 ("a05", 0.18, 2.68, "Stop being a stupid !alcoholic bitch.", "close", [(2.02, 2.68)]),
 ("a05", 25.38, 27.6, "It's over. It's over.", "over", []),
 ("a05", 28.84, 30.98, "Get over it.", "over", []),
]
CURSE = {"fuck", "fucking", "bullshit", "bitch", "nigga"}
def spans(p, a, b):
    W = json.load(open(f"{EP}/{p}_words.json"))
    ws = [x for x in W if x["start"] >= a - 0.05 and x["end"] <= b + 0.05]
    out = []; t = a
    for x, y in zip(ws, ws[1:]):
        if y["start"] - x["end"] > 0.55:
            out.append((t, x["end"] + 0.15)); t = y["start"] - 0.15
    out.append((t, b)); return out
pieces = []
for kk, (p, a0, b0, txt, tag, slows) in enumerate(KEEP):
  for a, b in spans(p, a0, b0):
    t = a
    for s, e in slows:
        if not (a <= s and e <= b + 1e-6): continue
        if s - t > 0.02: pieces.append((p, t, s, 1, tag, kk))
        pieces.append((p, s, e, SLOW, tag, kk)); t = e
    if b - t > 0.02: pieces.append((p, t, b, 1, tag, kk))
os.makedirs("pieces", exist_ok=True)
edl = []; f = 0
for i, (p, a, b, sp, tag, kk) in enumerate(pieces):
    out = f"pieces/p{i:03d}.mp4"; d = b - a; N = round(d / sp * 30); T = N / 30; g = OFF[p] + a
    vf = f"scale=1080:1920:flags=lanczos,setpts=(PTS-STARTPTS)/{sp},fps=30"
    if sp < 1: vf += ",minterpolate=fps=30:mi_mode=blend"
    vf += f",tpad=stop=10:stop_mode=clone,trim=end_frame={N},setpts=N/30/TB"
    af = "asetpts=PTS-STARTPTS"
    if sp < 1: af += f",asetrate=44100*{sp},aresample=44100"
    af += f",apad,atrim=0:{T},afade=t=in:d=0.012,afade=t=out:st={T-0.02}:d=0.02"
    if not os.path.exists(out) or os.environ.get("FORCE"):
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(g), "-t", str(d + 0.5), "-i", SRC, "-filter_complex",
            f"[0:v]{vf}[v];[0:a]atrim=0:{d},{af}[a]", "-map", "[v]", "-map", "[a]", "-r", "30",
            "-c:v", "libx264", "-crf", "15", "-preset", "fast", "-pix_fmt", "yuv420p", "-c:a", "pcm_s16le", "-ar", "44100", out], check=True, timeout=300)
    edl.append({"p": p, "a": a, "b": b, "speed": sp, "tag": tag, "k": kk, "f0": f, "f1": f + N}); f += N
ins = []; fc = ""
for i in range(len(pieces)): ins += ["-i", f"pieces/p{i:03d}.mp4"]; fc += f"[{i}:v][{i}:a]"
subprocess.run(["ffmpeg", "-v", "error", "-y", *ins, "-filter_complex", fc + f"concat=n={len(pieces)}:v=1:a=1[v][a]", "-map", "[v]", "-map", "[a]", "-r", "30",
    "-c:v", "libx264", "-crf", "15", "-preset", "fast", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "256k", "cut.mp4"], check=True)
json.dump(edl, open("edl.json", "w"), indent=0)
def mapt(t, k):
    for e in edl:
        if e["k"] == k and e["a"] - 1e-6 <= t <= e["b"] + 1e-6: return e["f0"] + (t - e["a"]) / e["speed"] * 30
    for e in edl:  # inside a trimmed pause → snap to the next kept piece
        if e["k"] == k and e["a"] >= t: return e["f0"]
    return [e for e in edl if e["k"] == k][-1]["f1"]
norm = lambda s: re.sub(r"[^a-z0-9']", "", s.lower())
TONE = {"!": "red", "+": "green", "^": "gold"}
caps = []
for ki, (p, a, b, txt, tag, slows) in enumerate(KEEP):
    W = json.load(open(f"{EP}/{p}_words.json"))
    vw = [x for x in W if x["start"] >= a - 0.05 and x["end"] <= b + 0.05]
    cw = txt.split(); vn = [norm(x["word"]) for x in vw]; cn = [norm(c.lstrip("!+^")) for c in cw]
    tim = [None] * len(cw)
    for blk in difflib.SequenceMatcher(None, cn, vn, autojunk=False).get_matching_blocks():
        for j in range(blk.size): tim[blk.a + j] = (vw[blk.b + j]["start"], vw[blk.b + j]["end"])
    known = [(i, t) for i, t in enumerate(tim) if t]
    starts = [None] * len(cw)
    for i in range(len(cw)):
        if tim[i]: starts[i] = max(a, tim[i][0]); continue
        prev = max([q for q in known if q[0] < i], default=None, key=lambda z: z[0]); nxt = min([q for q in known if q[0] > i], default=None, key=lambda z: z[0])
        s0 = prev[1][1] if prev else a; s1 = nxt[1][0] if nxt else b
        n0 = prev[0] if prev else -1; n1 = nxt[0] if nxt else len(cw)
        starts[i] = s0 + (s1 - s0) * (i - n0) / (n1 - n0)
    for i, c in enumerate(cw):
        s = min(max(starts[i], a), b - 0.01); e = starts[i + 1] if i + 1 < len(cw) else b
        mark = c[0] if c[0] in TONE else ""; word = c.lstrip("!+^"); base = norm(word).strip("'")
        insl = any(ss - 0.08 <= s <= ee for ss, ee in slows)
        caps.append({"k": ki, "t": word.upper(), "f0": round(mapt(s, ki)), "f1": round(mapt(min(max(e, s + 0.05), b), ki)),
                     "emph": bool(mark), "tone": TONE.get(mark, "gold"), "curse": base in CURSE and insl, "tag": tag, "end": i == len(cw) - 1})
json.dump(caps, open("captions.json", "w"), indent=0)
print("frames", f, round(f / 30, 2), "pieces", len(pieces), "words", len(caps))
