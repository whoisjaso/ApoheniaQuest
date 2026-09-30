import React from "react";
import { AbsoluteFill, Freeze, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { clamp } from "../fx";
import { theme } from "../theme";
import { CUT, EDL } from "./timeline";

/**
 * Rules applied (playbook):
 *  - reel 7 "keyframes to add smooth movement": slow keyframed push across every clip
 *  - reel 7 "zoom transition to smoothly cut between clips": every cut enters with a zoom transition
 *  - reel 5 "instead of not moving, zoom in": punch-ins on key lines
 *  - reel 7 "velocity for custom speed": slow-mo pieces (your curse rule)
 *  - reel 7 "masking to put text behind you": `behind` renders between the footage and a person cutout (fg.webm)
 */
export const TRANSITION = 6;
export const Video: React.FC<{ punches: number[]; behind?: React.ReactNode; fgRanges?: [number, number][] }> = ({ punches, behind, fgRanges = [] }) => {
  const frame = useCurrentFrame();
  const idx = Math.max(0, EDL.findIndex((p) => frame >= p.f0 && frame < p.f1));
  const piece = EDL[idx];
  let z = 1.02;
  let blur = 0;
  if (piece) {
    z += interpolate(frame, [piece.f0, piece.f1], [0, 0.035], { ...clamp, easing: theme.ease.inOut }); // keyframed drift
    const t = frame - piece.f0;
    if (idx > 0 && t < TRANSITION) {
      z += interpolate(t, [0, TRANSITION], [0.14, 0], { ...clamp, easing: theme.ease.out }); // zoom transition in
      blur = interpolate(t, [0, TRANSITION], [10, 0], { ...clamp, easing: theme.ease.out });
    }
    if (piece.speed < 1) z += interpolate(frame, [piece.f0, piece.f1], [0.08, 0.3], { ...clamp, easing: theme.ease.inOut });
  }
  for (const p of punches) {
    const t = frame - p;
    if (t >= 0 && t < 45) z += interpolate(t, [0, 5, 45], [0, 0.14, 0.1], { ...clamp, easing: theme.ease.out });
  }
  const outro = frame >= CUT;
  const ob = interpolate(frame, [CUT, CUT + 14], [0, 22], { ...clamp, easing: theme.ease.out });
  const style: React.CSSProperties = {
    width: "100%", height: "100%", objectFit: "cover", transformOrigin: "50% 32%",
    transform: `scale(${outro ? 1.2 : z})`,
    filter: outro ? `blur(${ob}px) brightness(0.45)` : `saturate(0.78) contrast(1.06) brightness(0.9)${blur ? ` blur(${blur}px)` : ""}`,
  };
  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      {outro ? (
        <Freeze frame={CUT - 1}><OffthreadVideo src={staticFile("ep3/cut.mp4")} muted style={style} /></Freeze>
      ) : (
        <OffthreadVideo src={staticFile("ep3/cut.mp4")} style={style} />
      )}
      {behind}
      {!outro && fgRanges.map(([a, b]) => (
        <Sequence key={a} from={a} durationInFrames={b - a} layout="none">
          <AbsoluteFill><OffthreadVideo src={staticFile("ep3/fg.webm")} transparent muted trimBefore={a} style={style} /></AbsoluteFill>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
