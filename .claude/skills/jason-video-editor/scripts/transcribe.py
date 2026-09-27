"""Word-level transcript (Vosk, offline). Usage: PYTHONPATH=/tmp/stub python3 transcribe.py input.(mov|mp4) outdir
Writes words.json and phrases.txt (phrases split at >0.45s gaps, low-confidence words in [brackets])."""
import json, os, subprocess, sys, wave
from vosk import Model, KaldiRecognizer, SetLogLevel
src, out = sys.argv[1], sys.argv[2]; os.makedirs(out, exist_ok=True)
wav = os.path.join(out, "a16.wav")
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-ac", "1", "-ar", "16000", wav], check=True)
SetLogLevel(-1); wf = wave.open(wav, "rb"); r = KaldiRecognizer(Model(os.path.expanduser("~/.vosk-model")), 16000); r.SetWords(True)
words = []
while True:
    d = wf.readframes(4000)
    if not d: break
    if r.AcceptWaveform(d): words += json.loads(r.Result()).get("result", [])
words += json.loads(r.FinalResult()).get("result", [])
json.dump(words, open(os.path.join(out, "words.json"), "w"))
ph, cur = [], []
for x in words:
    if cur and x["start"] - cur[-1]["end"] > 0.45: ph.append(cur); cur = []
    cur.append(x)
if cur: ph.append(cur)
with open(os.path.join(out, "phrases.txt"), "w") as f:
    for i, p in enumerate(ph):
        f.write(f"P{i:03d} {p[0]['start']:7.2f}-{p[-1]['end']:7.2f}  " + " ".join(q["word"] if q["conf"] > 0.6 else f"[{q['word']}]" for q in p) + "\n")
print(open(os.path.join(out, "phrases.txt")).read())
