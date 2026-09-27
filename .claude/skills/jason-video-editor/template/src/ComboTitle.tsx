import React from "react";
import { interpolate, random, useCurrentFrame } from "remotion";
import { clamp } from "./fx";
import { theme } from "./theme";

/** Font-pair presets decoded from reel 8. */
export const COMBOS = {
  mozart: { big: { family: "Marcellus", weight: 400, italic: false, stroke: 3, color: "#F2DC7C" }, small: { family: "Bodoni Moda", weight: 500, italic: true, color: "#FFFFFF" }, smallScale: 0.6, layout: "under-right" },
  sugary: { big: { family: "Jost", weight: 200, italic: false, stroke: 0, color: "#FFFFFF" }, small: { family: "Playfair Display", weight: 400, italic: true, color: "#F2DC7C" }, smallScale: 1.15, layout: "under-center" },
  tempting: { big: { family: "Hanken Grotesk", weight: 800, italic: false, stroke: 0, color: "#FFFFFF" }, small: { family: "Great Vibes", weight: 400, italic: false, color: "#FFFFFF" }, smallScale: 0.55, layout: "over-center" },
  modern: { big: { family: "Archivo Black", weight: 400, italic: false, stroke: 0, color: "#FFFFFF" }, small: { family: "Inter", weight: 500, italic: false, color: "#FFFFFF" }, smallScale: 0.32, layout: "over-center" },
} as const;
export type ComboName = keyof typeof COMBOS;
export type Entrance = "letterFade" | "riseUp";

const SHADOW = "3px 4px 8px rgba(0,0,0,0.5), 0 0 26px rgba(255,255,255,0.35)";

/** Per-letter reveal. letterFade = scattered order + blur→sharp (his default). riseUp = left→right stagger rising from below. */
const Letters: React.FC<{ text: string; start: number; mode: Entrance; seed: string; style: React.CSSProperties; exitAt?: number }> = ({ text, start, mode, seed, style, exitAt }) => {
  const frame = useCurrentFrame();
  const chars = [...text];
  const exit = exitAt === undefined ? 1 : interpolate(frame, [exitAt, exitAt + 6], [1, 0], { ...clamp, easing: theme.ease.in });
  return (
    <span style={{ ...style, display: "inline-block", whiteSpace: "pre", opacity: exit, filter: exit < 1 ? `blur(${(1 - exit) * 8}px)` : undefined }}>
      {chars.map((c, i) => {
        const delay = mode === "letterFade" ? random(`${seed}${i}`) * 6 : i * 1.2;
        const len = mode === "letterFade" ? 5 : 9;
        const p = interpolate(frame, [start + delay, start + delay + len], [0, 1], { ...clamp, easing: theme.ease.out });
        const y = mode === "riseUp" ? (1 - p) * 40 : (1 - p) * 6;
        return (
          <span key={i} style={{ display: "inline-block", opacity: p, filter: `blur(${(1 - p) * 10}px)`, transform: `translateY(${y}px) scale(${1 + (1 - p) * 0.08})` }}>
            {c}
          </span>
        );
      })}
    </span>
  );
};

export const ComboTitle: React.FC<{ combo: ComboName; big: string; small: string; at: number; size?: number; entrance?: Entrance; exitAt?: number }> = ({
  combo, big, small, at, size = 150, entrance = "letterFade", exitAt,
}) => {
  const frame = useCurrentFrame();
  if (frame < at - 1) return null;
  if (exitAt !== undefined && frame > exitAt + 7) return null;
  const c = COMBOS[combo];
  const bigStyle: React.CSSProperties = {
    fontFamily: c.big.family, fontWeight: c.big.weight, fontStyle: c.big.italic ? "italic" : "normal", fontSize: size, lineHeight: 1,
    color: c.big.color, textShadow: SHADOW, WebkitTextStroke: c.big.stroke ? `${c.big.stroke}px ${c.big.color}` : undefined,
    letterSpacing: combo === "modern" ? "0.02em" : "0.01em", textTransform: combo === "modern" ? "uppercase" : "none",
  };
  const smallSize = size * c.smallScale;
  const smallStyle: React.CSSProperties = {
    fontFamily: c.small.family, fontWeight: c.small.weight, fontStyle: c.small.italic ? "italic" : "normal", fontSize: smallSize,
    lineHeight: 1, color: c.small.color, textShadow: SHADOW,
  };
  const smallAt = at + 3; // accent lands 2–3 frames after the hero word
  const Big = <Letters text={big} start={at} mode={entrance} seed={`b${big}`} style={bigStyle} exitAt={exitAt} />;
  const Small = <Letters text={small} start={smallAt} mode={entrance} seed={`s${small}`} style={smallStyle} exitAt={exitAt} />;
  if (c.layout === "under-right")
    return (
      <div style={{ position: "relative", display: "inline-block" }}>
        {Big}
        <div style={{ position: "absolute", right: -8, top: size * 0.8 }}>{Small}</div>
        <div style={{ height: smallSize * 0.9 }} />
      </div>
    );
  if (c.layout === "under-center")
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {Big}
        <div style={{ marginTop: -size * 0.12 }}>{Small}</div>
      </div>
    );
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ marginBottom: -smallSize * 0.15 }}>{Small}</div>
      {Big}
    </div>
  );
};
