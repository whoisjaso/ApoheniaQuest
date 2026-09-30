import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp } from "../fx";
import { theme } from "../theme";

/** §20 Iman × iOS: no-bounce springs, blur-in, frosted glass (28–32px radius, 1px white-10% border). */
export const Y = "#FFD24A", G = "#2BE37A", R = "#FF3B3B";
const IOS = { damping: 26, stiffness: 170, mass: 0.9 }; // smooth, no overshoot
export const glass: React.CSSProperties = {
  background: "rgba(30,30,34,0.62)", backdropFilter: "blur(28px) saturate(1.4)", WebkitBackdropFilter: "blur(28px)",
  border: "1px solid rgba(255,255,255,0.12)", borderRadius: 32, boxShadow: "0 24px 60px rgba(0,0,0,0.45)", fontFamily: "Inter", color: "#fff",
};
const useIn = (at: number, until: number, from = 40) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: f - at, fps, config: IOS });
  const out = interpolate(f, [until - 6, until], [1, 0], { ...clamp, easing: theme.ease.in });
  return { on: f >= at - 1 && f < until, style: { opacity: Math.min(p * 1.3, 1) * out, transform: `translateY(${(1 - p) * from}px) scale(${0.96 + 0.04 * p})`, filter: `blur(${(1 - p) * 12 + (1 - out) * 8}px)` } as React.CSSProperties };
};

/** full-screen editorial image card: zoom-blur in, slow push-in (§18) */
export const ImageCard: React.FC<{ src: string; from: number; to: number; shade?: "top" | "bottom" }> = ({ src, from, to, shade }) => {
  const f = useCurrentFrame();
  if (f < from || f >= to) return null;
  const t = f - from;
  const z = interpolate(f, [from, to], [1.0, 1.07], clamp) + interpolate(t, [0, 7], [0.12, 0], { ...clamp, easing: theme.ease.out });
  const blur = interpolate(t, [0, 7], [14, 0], { ...clamp, easing: theme.ease.out });
  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${z})`, filter: `saturate(0.88) contrast(1.05) blur(${blur}px)` }} />
      {shade === "bottom" && <AbsoluteFill style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 30%)" }} />}
      {shade === "top" && <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 35%)" }} />}
    </AbsoluteFill>
  );
};

/** Dynamic-Island notification (hook: iPhone notification → stop the scroll) */
export const Notif: React.FC<{ at: number; until: number; app: string; icon: string; tint: string; title: string; body: string; top?: number }> = ({ at, until, app, icon, tint, title, body, top = 70 }) => {
  const { on, style } = useIn(at, until, -120);
  if (!on) return null;
  return (
    <div style={{ position: "absolute", top, left: 50, right: 50, ...glass, borderRadius: 46, padding: "26px 30px", display: "flex", gap: 24, alignItems: "center", ...style }}>
      <div style={{ width: 88, height: 88, borderRadius: 22, background: tint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 50, flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "rgba(255,255,255,.6)", fontWeight: 600, letterSpacing: "0.02em" }}><span>{app}</span><span>now</span></div>
        <div style={{ fontSize: 38, fontWeight: 700, marginTop: 4 }}>{title}</div>
        <div style={{ fontSize: 34, color: "rgba(255,255,255,.85)" }}>{body}</div>
      </div>
    </div>
  );
};

/** iOS notification stack: newest card in front, older ones collapse behind it (keeps the face clear) */
export type CardSpec = { at: number; label: string; big: React.ReactNode; sub?: string; bar?: string };
export const CardStack: React.FC<{ cards: CardSpec[]; until: number; top?: number }> = ({ cards, until, top = 90 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", top, left: 70, right: 70 }}>
      {cards.map((c, i) => {
        const depth = cards.slice(i + 1).reduce((d, n) => d + spring({ frame: f - n.at, fps, config: IOS }), 0);
        return <StackCard key={c.at} c={c} until={until} depth={depth} z={i} />;
      })}
    </div>
  );
};
const StackCard: React.FC<{ c: CardSpec; until: number; depth: number; z: number }> = ({ c, until, depth, z }) => {
  const { on, style } = useIn(c.at, until, -60);
  if (!on || depth > 2.9) return null;
  const hide = Math.min(1, depth);
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: z }}>
      <div style={{ transform: `translateY(${-depth * 16}px) scale(${1 - depth * 0.05})`, transformOrigin: "50% 0%", opacity: 1 - depth * 0.28 }}>
        <div style={{ ...glass, padding: "24px 30px", display: "flex", gap: 22, alignItems: "center", ...style }}>
          {c.bar && <div style={{ width: 10, alignSelf: "stretch", background: c.bar, borderRadius: 6 }} />}
          <div style={{ opacity: 1 - hide * 0.85 }}>
            <div style={{ fontSize: 28, color: "rgba(255,255,255,.6)", fontWeight: 600, letterSpacing: "0.02em" }}>{c.label}</div>
            <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.1 }}>{c.big}</div>
            {c.sub && <div style={{ fontSize: 32, color: "rgba(255,255,255,.7)" }}>{c.sub}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

/** Screen Time: Instagram → off, Gym → on (toggle flips at `flip`) */
export const ToggleCard: React.FC<{ at: number; until: number; flip: number }> = ({ at, until, flip }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { on, style } = useIn(at, until, -60);
  if (!on) return null;
  const p = spring({ frame: f - flip, fps, config: IOS });
  const rows: [string, number][] = [["Instagram · 6h 12m", 1 - p], ["Gym · every day", p]];
  return (
    <div style={{ position: "absolute", top: 130, left: 70, right: 70, ...glass, padding: 34, ...style }}>
      <div style={{ fontSize: 28, color: "rgba(255,255,255,.6)", fontWeight: 600, letterSpacing: "0.02em" }}>⏳  SCREEN TIME · DISCIPLINE</div>
      {rows.map(([t, v]) => (
        <div key={t} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
          <span style={{ fontSize: 46, fontWeight: 600, color: `rgba(255,255,255,${0.45 + 0.55 * v})` }}>{t}</span>
          <div style={{ width: 112, height: 66, borderRadius: 33, background: v > 0.5 ? G : "rgba(255,255,255,.18)", position: "relative", transition: "none" }}>
            <div style={{ position: "absolute", top: 5, left: 5 + 46 * v, width: 56, height: 56, borderRadius: 28, background: "#fff", boxShadow: "0 3px 8px rgba(0,0,0,.3)" }} />
          </div>
        </div>
      ))}
    </div>
  );
};

/** Apple-Fitness-style rings closing + a "Gym ✓" calendar line */
export const RingsCard: React.FC<{ at: number; until: number }> = ({ at, until }) => {
  const f = useCurrentFrame();
  const { on, style } = useIn(at, until, -60);
  if (!on) return null;
  const rings: [number, string, number][] = [[95, "#FA114F", 1], [72, "#92E82A", 1], [49, "#1EEAEF", 1]];
  return (
    <div style={{ position: "absolute", top: 110, left: 70, right: 70, ...glass, padding: 34, display: "flex", gap: 34, alignItems: "center", ...style }}>
      <svg width="230" height="230" viewBox="0 0 220 220">
        {rings.map(([r, c, p], i) => {
          const q = interpolate(f, [at + 6 + i * 6, at + 36 + i * 6], [0, p], { ...clamp, easing: theme.ease.out });
          return (
            <g key={c}>
              <circle cx="110" cy="110" r={r} stroke={`${c}33`} strokeWidth="20" fill="none" />
              <circle cx="110" cy="110" r={r} stroke={c} strokeWidth="20" fill="none" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * r} strokeDashoffset={2 * Math.PI * r * (1 - q)} transform="rotate(-90 110 110)" />
            </g>
          );
        })}
      </svg>
      <div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,.6)", fontWeight: 600, letterSpacing: "0.02em" }}>📅  GYM · EVERY DAY</div>
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1 }}>All rings closed</div>
        <div style={{ fontSize: 34, color: G, fontWeight: 600 }}>7-day streak ✓</div>
      </div>
    </div>
  );
};

/** giant hero word for text-behind-you (§18), blur-in, no bounce */
export const HeroWord: React.FC<{ text: string; at: number; until: number; color: string; size?: number; top?: number }> = ({ text, at, until, color, size = 460, top = 180 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (f < at - 1 || f >= until) return null;
  const p = spring({ frame: f - at, fps, config: IOS });
  const out = interpolate(f, [until - 6, until], [1, 0], { ...clamp, easing: theme.ease.in });
  return (
    <AbsoluteFill style={{ alignItems: "center" }}>
      <div style={{ marginTop: top, fontFamily: "Nunito Sans", fontWeight: 900, fontSize: size, lineHeight: 1, letterSpacing: "-0.03em", color,
        opacity: p * out, filter: `blur(${(1 - p) * 18}px)`, transform: `scale(${1.12 - 0.12 * p})`, textShadow: `0 0 60px ${color}55`, whiteSpace: "nowrap" }}>{text}</div>
    </AbsoluteFill>
  );
};
