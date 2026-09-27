"""Person cutout (foreground with alpha) for text-behind-you. MediaPipe selfie segmentation (bundled model)."""
import cv2, numpy as np, mediapipe as mp, subprocess, json, sys
src, out = sys.argv[1], sys.argv[2]
edl = json.load(open(sys.argv[3])) if len(sys.argv) > 3 else []
cuts = {e["f0"] for e in edl}
cap = cv2.VideoCapture(src); W = int(cap.get(3)); H = int(cap.get(4))
seg = mp.solutions.selfie_segmentation.SelfieSegmentation(model_selection=0)
ff = subprocess.Popen(["ffmpeg","-v","error","-y","-f","rawvideo","-pix_fmt","rgba","-s",f"{W}x{H}","-r","30","-i","-",
    "-c:v","libvpx-vp9","-pix_fmt","yuva420p","-b:v","5M","-deadline","realtime","-cpu-used","8","-row-mt","1","-auto-alt-ref","0",out], stdin=subprocess.PIPE)
prev = None; i = 0
while True:
    ok, img = cap.read()
    if not ok: break
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    m = seg.process(rgb).segmentation_mask.astype(np.float32)
    if prev is not None and i not in cuts: m = 0.65 * m + 0.35 * prev   # temporal smoothing (reset on every cut)
    prev = m
    a = np.clip((m - 0.35) / 0.3, 0, 1)                                  # soft threshold
    a = cv2.GaussianBlur(a, (0, 0), 2.2)                                  # feathered edge
    rgba = np.dstack([rgb, (a * 255).astype(np.uint8)])
    ff.stdin.write(rgba.tobytes()); i += 1
    if i % 500 == 0: print(i, flush=True)
ff.stdin.close(); ff.wait(); print("frames", i)
