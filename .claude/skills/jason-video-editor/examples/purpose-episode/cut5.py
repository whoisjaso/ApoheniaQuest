"""Episode #3 'Find your purpose': cut that respects Jason's pauses.
Only dead air > GAP_MAX is shortened (to GAP_KEEP); every word stays; order = his order.
Video from the phone clip, audio from the enhanced voice track (DeepFilterNet3 + EQ + comp + -14 LUFS).
Markup: ^gold  +green  !red   {..} = caption hidden (a graphic carries those words)."""
import json, os, re, subprocess, difflib
EP = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = {"p1": (f"{EP}/p1.mov", f"{EP}/p1_voice.wav"), "p2": (f"{EP}/p2.mov", f"{EP}/p2_voice.wav")}
WORDS = {p: json.load(open(f"{EP}/{p}c/words.json")) for p in SRC}
GAP_MAX, GAP_KEEP = 1.4, 0.75
KEEP = [
 ("p1", 0.62, 10.45, "A lot of y'all do not know what the fuck it is that you want to do with your ^life. If you're watching this video, then you understand exactly what the fuck I'm talking about, and I don't blame you.", "hook"),
 ("p1", 10.45, 23.3, "Right, all your life you have been always told what to do, you know, from {first grade, second grade, third grade, tenth grade, eleventh grade, twelfth grade.} But once you hit twelfth grade and you ^graduate,", "grades"),
 ("p1", 23.3, 40.9, "you're like a goldfish that's in a bowl and got released into the fucking ^ocean. There's so many different options, so many different things to do, so many ways to do something to get to the same ^destination you want to get. Let's say in this scenario you want to get +two +hundred +thousand, a +million dollars a month.", "ocean"),
 ("p1", 40.9, 54.45, "You can sell rubber bands, sell cars like I do, you can sell a service like I do, you can sell fucking pocket watches, you can sell anything, you can do anything to get you to that destination.", "sell"),
 ("p1", 54.45, 66.2, "So because there's so much options, you get !overwhelmed. So much so that you end up not doing !anything. And this is the main !problem, right?", "problem"),
 ("p1", 67.63, 89.95, "A lot of people have money saved up. A lot of people, they do so much !research, but they never actually !do. And I'm here to tell y'all niggas, because I was once in that position, right, where I didn't know what I want, wanted to do with my life. I was kind of confused. I was always sitting down and pondering on what are the things that I like, what are the things that I want to do, what am I good at. You have to realize that you", "me"),
 ("p2", 0.0, 54.75, "will never find your purpose by not doing anything. You will never find your purpose by !thinking of your purpose. You will only find your ^purpose by +doing. You just have to do shit, literally anything, bro. Like, you go wake up one day and say, you know what, let me play ^chess every single day, and through that you will find your purpose, like, believe it or not. But if you live the same life, if you repeat the same things you do every single day, the same actions you do every single day, you're not changing shit, because you're living in the same !paradigm, you're living in the same !script, you're living in the same !cycle. Change the fucking ^cycle, my nigga, and it's not hard. If you don't fucking do anything, take a +walk every single day for five minutes, bro. I promise you, you just don't know. You may meet somebody random and just have the spirit to talk to somebody, and that may be the person that gets you into the ^doors you want to get into, that changes your fucking life.", "doors"),
 ("p2", 54.75, 57.58, "But you will never, ever, ever, ever, ever", "never"),
 ("p2", 80.5, 91.45, "you will never find your purpose by being !still. You will always find your purpose by +doing, and doing, and doing. Commit all your plans and actions onto ^God, then ^execute.", "execute"),
]
CURSE = {"fuck", "fucking", "shit", "nigga", "niggas"}
def spans(p, a, b):
    ws = [x for x in WORDS[p] if x["start"] >= a - 0.05 and x["end"] <= b + 0.05]
    out, t = [], a
    for x, y in zip(ws, ws[1:]):
        if y["start"] - x["end"] > GAP_MAX:
            h = GAP_KEEP / 2; out.append((t, x["end"] + h)); t = y["start"] - h
    out.append((t, b)); return out
pieces = [(p, a, b, tag, k) for k, (p, a0, b0, txt, tag) in enumerate(KEEP) for a, b in spans(p, a0, b0)]
os.makedirs("pieces", exist_ok=True)
edl, f = [], 0
for i, (p, a, b, tag, k) in enumerate(pieces):
    out = f"pieces/q{i:03d}.mp4"; d = b - a; N = round(d * 30); T = N / 30; vsrc, asrc = SRC[p]
    if not os.path.exists(out) or os.environ.get("FORCE"):
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(a), "-t", str(d + 0.5), "-i", vsrc, "-ss", str(a), "-t", str(d + 0.5), "-i", asrc,
            "-filter_complex", f"[0:v]scale=1080:1920:flags=lanczos,setpts=PTS-STARTPTS,fps=30,tpad=stop=10:stop_mode=clone,trim=end_frame={N},setpts=N/30/TB[v];"
            f"[1:a]atrim=0:{d},asetpts=PTS-STARTPTS,apad,atrim=0:{T},afade=t=in:d=0.015,afade=t=out:st={T-0.03}:d=0.03[a]",
            "-map", "[v]", "-map", "[a]", "-r", "30", "-c:v", "libx264", "-crf", "15", "-preset", "fast", "-pix_fmt", "yuv420p",
            "-c:a", "pcm_s16le", "-ar", "48000", out], check=True, timeout=300)
    edl.append({"p": p, "a": a, "b": b, "speed": 1, "tag": tag, "k": k, "f0": f, "f1": f + N}); f += N
ins, fc = [], ""
for i in range(len(pieces)): ins += ["-i", f"pieces/q{i:03d}.mp4"]; fc += f"[{i}:v][{i}:a]"
subprocess.run(["ffmpeg", "-v", "error", "-y", *ins, "-filter_complex", fc + f"concat=n={len(pieces)}:v=1:a=1[v][a]", "-map", "[v]", "-map", "[a]", "-r", "30",
    "-c:v", "libx264", "-crf", "15", "-preset", "fast", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "256k", "cut.mp4"], check=True)
json.dump(edl, open("edl.json", "w"), indent=0)
def mapt(t, k):
    for e in edl:
        if e["k"] == k and e["a"] - 1e-6 <= t <= e["b"] + 1e-6: return e["f0"] + (t - e["a"]) * 30
    for e in edl:
        if e["k"] == k and e["a"] >= t: return e["f0"]
    return [e for e in edl if e["k"] == k][-1]["f1"]
norm = lambda s: re.sub(r"[^a-z0-9']", "", s.lower())
ALIAS = {"yard": "y'all", "out": "a", "psycho": "cycle", "mcnugget": "nigga", "taste": "change", "shape": "shit", "she": "shit", "that": "have",
         "recession": "service", "pocket": "pocket", "for": "fucking", "comey": "commit", "are": "all", "got": "god", "leg": "right"}
TONE = {"!": "red", "+": "green", "^": "gold"}
caps = []
for k, (p, a, b, txt, tag) in enumerate(KEEP):
    vw = [x for x in WORDS[p] if x["start"] >= a - 0.05 and x["end"] <= b + 0.05]
    hidden = set()
    toks = []
    for m in re.finditer(r"\{([^}]*)\}|(\S+)", txt):
        if m.group(1) is not None:
            for wd in m.group(1).split(): hidden.add(len(toks)); toks.append(wd)
        else: toks.append(m.group(2))
    vn = [norm(x["word"]) for x in vw]; cn = [norm(c.lstrip("!+^")) for c in toks]
    vn2 = [ALIAS.get(v, v) if v not in cn else v for v in vn]
    tim = [None] * len(toks)
    for blk in difflib.SequenceMatcher(None, cn, vn2, autojunk=False).get_matching_blocks():
        for j in range(blk.size): tim[blk.a + j] = (vw[blk.b + j]["start"], vw[blk.b + j]["end"])
    known = [(i, t) for i, t in enumerate(tim) if t]
    starts = []
    for i in range(len(toks)):
        if tim[i]: starts.append(max(a, tim[i][0])); continue
        pv = max([q for q in known if q[0] < i], default=None, key=lambda z: z[0]); nx = min([q for q in known if q[0] > i], default=None, key=lambda z: z[0])
        s0 = pv[1][1] if pv else a; s1 = nx[1][0] if nx else b; n0 = pv[0] if pv else -1; n1 = nx[0] if nx else len(toks)
        starts.append(s0 + (s1 - s0) * (i - n0) / (n1 - n0))
    for i, c in enumerate(toks):
        s = min(max(starts[i], a), b - 0.01); e = starts[i + 1] if i + 1 < len(toks) else b
        mark = c[0] if c[0] in TONE else ""; word = c.lstrip("!+^")
        caps.append({"k": k, "t": word.upper(), "f0": round(mapt(s, k)), "f1": round(mapt(min(max(e, s + 0.05), b), k)),
                     "emph": bool(mark), "tone": TONE.get(mark, "gold"), "curse": False, "hide": i in hidden, "tag": tag, "end": i == len(toks) - 1})
from itertools import groupby
for k, grp in groupby(range(len(caps)), key=lambda i: caps[i]["k"]):
    idx = list(grp)
    for j in range(1, len(idx) - 1):
        a_, b_, n_ = caps[idx[j - 1]], caps[idx[j]], caps[idx[j + 1]]
        if (b_["f0"] - a_["f0"] >= 8 and n_["f0"] - b_["f0"] <= 1) or (b_["f0"] - a_["f0"] <= 0 and n_["f0"] - b_["f0"] >= 8):
            b_["f0"] = round((a_["f0"] + n_["f0"]) / 2)
    for j in range(len(idx) - 1): caps[idx[j]]["f1"] = max(caps[idx[j]]["f0"] + 2, min(caps[idx[j]]["f1"], caps[idx[j + 1]]["f0"] + 6))
json.dump(caps, open("captions.json", "w"), indent=0)
print("frames", f, round(f / 30, 1), "pieces", len(pieces), "words", len(caps))
