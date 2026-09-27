"""Frame-exact cut + caption alignment from an edit spec.
Usage: python3 cut.py edit.json workdir
edit.json = {
  "source": "full.mov",                       # joined raw footage
  "keep": [[a, b, "corrected caption text", "section-tag"], ...],   # in playback order; a cold-open may reuse later seconds
  "slow": [[s, e], ...],                      # curse words → 0.5x + octave pitch drop (source seconds)
  "keys": [["WORD", occurrence], ...],        # gold two-tier keywords (occurrence counted in playback order)
  "curse": ["fuck", "fucking", "bullshit"]
}
Outputs in workdir: cut.mp4 (1080x1920 30fps), edl.json, captions.json  → copy into template public/ep + src/ep."""
import json, os, re, subprocess, sys, difflib
spec = json.load(open(sys.argv[1])); wd = sys.argv[2]; os.makedirs(f"{wd}/pieces", exist_ok=True)
W = json.load(open(f"{wd}/words.json")); SRC = spec["source"]; SLOW = 0.5; SLOWW = [tuple(x) for x in spec.get("slow", [])]
KEEP = spec["keep"]; CURSE = set(spec.get("curse", ["fuck", "fucking", "bullshit", "shit"]))
pieces = []
for ki, (a, b, txt, tag) in enumerate(KEEP):
    t = a
    for s, e in [(s, e) for s, e in SLOWW if a <= s and e <= b]:
        if s - t > 0.02: pieces.append((t, s, 1, tag, ki))
        pieces.append((s, e, SLOW, tag, ki)); t = e
    if b - t > 0.02: pieces.append((t, b, 1, tag, ki))
edl = []; f = 0
for i, (a, b, sp, tag, ki) in enumerate(pieces):
    out = f"{wd}/pieces/p{i:03d}.mp4"; d = b - a; N = round(d / sp * 30); T = N / 30
    vf = f"scale=1080:1920:flags=lanczos,setpts=(PTS-STARTPTS)/{sp},fps=30"
    if sp < 1: vf += ",minterpolate=fps=30:mi_mode=blend"
    vf += f",tpad=stop=10:stop_mode=clone,trim=end_frame={N},setpts=N/30/TB"
    af = "asetpts=PTS-STARTPTS" + (f",asetrate=44100*{sp},aresample=44100" if sp < 1 else "")
    af += f",apad,atrim=0:{T},afade=t=in:d=0.012,afade=t=out:st={T-0.02}:d=0.02"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(a), "-t", str(d + 0.5), "-i", SRC, "-filter_complex",
        f"[0:v]{vf}[v];[0:a]atrim=0:{d},{af}[a]", "-map", "[v]", "-map", "[a]", "-r", "30", "-c:v", "libx264", "-crf", "15",
        "-preset", "fast", "-pix_fmt", "yuv420p", "-c:a", "pcm_s16le", "-ar", "44100", out], check=True, timeout=300)
    edl.append({"a": a, "b": b, "speed": sp, "tag": tag, "k": ki, "f0": f, "f1": f + N}); f += N
ins, fc = [], ""
for i in range(len(pieces)): ins += ["-i", f"{wd}/pieces/p{i:03d}.mp4"]; fc += f"[{i}:v][{i}:a]"
subprocess.run(["ffmpeg", "-v", "error", "-y", *ins, "-filter_complex", fc + f"concat=n={len(pieces)}:v=1:a=1[v][a]", "-map", "[v]", "-map", "[a]",
    "-r", "30", "-c:v", "libx264", "-crf", "15", "-preset", "fast", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "256k", f"{wd}/cut.mp4"], check=True)
json.dump(edl, open(f"{wd}/edl.json", "w"))
def mapt(t, k):  # map a source second to an output frame WITHIN keep-segment k (cold opens reuse seconds)
    for e in edl:
        if e["k"] == k and e["a"] - 1e-6 <= t <= e["b"] + 1e-6: return e["f0"] + (t - e["a"]) / e["speed"] * 30
norm = lambda s: re.sub(r"[^a-z0-9']", "", s.lower())
caps = []
for ki, (a, b, txt, tag) in enumerate(KEEP):
    vw = [x for x in W if x["start"] >= a - 0.02 and x["end"] <= b + 0.02]; cw = txt.split()
    tim = [None] * len(cw); sm = difflib.SequenceMatcher(None, [norm(c) for c in cw], [norm(x["word"]) for x in vw], autojunk=False)
    for blk in sm.get_matching_blocks():
        for j in range(blk.size): tim[blk.a + j] = (vw[blk.b + j]["start"], vw[blk.b + j]["end"])
    known = [(i, t) for i, t in enumerate(tim) if t]; st = [0.0] * len(cw)
    for i in range(len(cw)):
        if tim[i]: st[i] = max(a, tim[i][0]); continue
        pv = max([k for k in known if k[0] < i], default=None, key=lambda z: z[0]); nx = min([k for k in known if k[0] > i], default=None, key=lambda z: z[0])
        s0 = pv[1][1] if pv else a; s1 = nx[1][0] if nx else b; n0 = pv[0] if pv else -1; n1 = nx[0] if nx else len(cw)
        st[i] = s0 + (s1 - s0) * (i - n0) / (n1 - n0)
    for i, c in enumerate(cw):
        s = min(max(st[i], a), b - 0.01); e = st[i + 1] if i + 1 < len(cw) else b
        caps.append({"k": ki, "t": c.upper(), "f0": round(mapt(s, ki)), "f1": round(mapt(min(max(e, s + 0.05), b), ki)), "tag": tag,
                     "curse": norm(c) in CURSE and any(ss - 0.05 <= s <= ee for ss, ee in SLOWW), "emph": False, "end": i == len(cw) - 1})
keys = {(w.upper(), n) for w, n in spec.get("keys", [])}; seen = {}
for x in caps:
    k = re.sub(r"[^A-Z0-9]", "", x["t"]); seen[k] = seen.get(k, 0) + 1; x["emph"] = (k, seen[k]) in keys
json.dump(caps, open(f"{wd}/captions.json", "w"))
print(f"cut: {f} frames ({f/30:.1f}s), {len(pieces)} pieces, {len(caps)} caption words, {sum(c['emph'] for c in caps)} gold keys")
