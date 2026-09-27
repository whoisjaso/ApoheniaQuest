import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp } from "../fx";
import { theme } from "../theme";
import { CUT } from "./timeline";
import { GOLD } from "./Captions";

/**
 * Pop-up rules applied:
 *  - reel 5: pop up WITH a transition (scale spring), never just appear
 *  - reel 5: rounded square + drop shadow
 *  - reel 5: text with a glow; ✅ green / ❌ red glowing icons
 *  - reel 2: hooks & titles in Bebas Neue, body in Montserrat
 *  - card look = his SFX/Image cards: dark rounded panel, thin gold border
 */
export const LOWER = 1330;
const GREEN = "#2BD66A";
const glowW = "0 4px 14px rgba(0,0,0,0.6), 0 0 24px rgba(255,255,255,0.4)";
const glowG = `0 4px 14px rgba(0,0,0,0.6), 0 0 30px ${GOLD}88`;

const usePop = (at: number, until: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 11, stiffness: 190, mass: 0.7 } }); // 0 → overshoot → 1
  const out = interpolate(frame, [until - 7, until], [1, 0], { ...clamp, easing: theme.ease.in });
  return { s, out, on: frame >= at - 1 && frame <= until };
};

const Panel: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ background: "rgba(20,17,12,0.82)", border: `2px solid ${GOLD}66`, borderRadius: 34,
    boxShadow: "0 22px 44px rgba(0,0,0,0.55)", padding: "26px 42px", ...style }}>{children}</div>
);

/** one text pop-up (headline + optional line) */
export const PopText: React.FC<{ at: number; until: number; head: string; sub?: string; top?: number; gold?: boolean; size?: number }> = ({ at, until, head, sub, top = LOWER, gold, size = 120 }) => {
  const { s, out, on } = usePop(at, until);
  if (!on) return null;
  return (
    <div style={{ position: "absolute", top, left: 70, right: 70, display: "flex", justifyContent: "center", opacity: out }}>
      <div style={{ transform: `scale(${s})`, opacity: Math.min(1, s * 1.4) }}>
        <Panel style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "Bebas Neue", fontSize: size, lineHeight: 1, color: gold ? GOLD : "#fff", textShadow: gold ? glowG : glowW }}>{head}</div>
          {sub && <div style={{ fontFamily: theme.fonts.cap, fontWeight: 800, fontSize: 44, color: "#fff", marginTop: 8, textShadow: glowW }}>{sub}</div>}
        </Panel>
      </div>
    </div>
  );
};

/** row of pop-up items, each popping at its own frame, with ✅ */
export const PopRow: React.FC<{ items: { label: string; at: number }[]; until: number; top?: number; check?: boolean; column?: boolean }> = ({ items, until, top = LOWER, check = true, column }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const out = interpolate(frame, [until - 7, until], [1, 0], { ...clamp, easing: theme.ease.in });
  if (frame < items[0].at - 1 || frame > until) return null;
  return (
    <div style={{ position: "absolute", top, left: 60, right: 60, display: "flex", flexDirection: column ? "column" : "row", alignItems: "center", justifyContent: "center", gap: column ? 18 : 40, opacity: out }}>
      {items.map((it) => {
        const s = spring({ frame: frame - it.at, fps, config: { damping: 11, stiffness: 190, mass: 0.7 } });
        if (frame < it.at - 1) return <div key={it.label} style={{ height: 0 }} />;
        return (
          <div key={it.label} style={{ transform: `scale(${s})` }}>
            <Panel style={{ display: "flex", alignItems: "center", gap: 22, padding: "18px 38px" }}>
              <span style={{ fontFamily: "Bebas Neue", fontSize: 100, lineHeight: 1, color: "#fff", textShadow: glowW }}>{it.label}</span>
              {check && <span style={{ fontFamily: theme.fonts.cap, fontWeight: 900, fontSize: 80, color: GREEN, textShadow: `0 0 26px ${GREEN}` }}>✓</span>}
            </Panel>
          </div>
        );
      })}
    </div>
  );
};

/** reel 5 / reel 9: animated follow CTA — avatar (rounded) + FOLLOW FOR MORE + Follow → ✓ Following */
export const FollowCard: React.FC<{ flipAt: number }> = ({ flipAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const from = CUT + 18;
  if (frame < from) return null;
  const s = spring({ frame: frame - from, fps, config: { damping: 11, stiffness: 190, mass: 0.7 } });
  const flip = spring({ frame: frame - flipAt, fps, config: theme.spring.bouncy });
  const following = frame >= flipAt;
  return (
    <div style={{ position: "absolute", top: 1240, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div style={{ transform: `scale(${s})`, display: "flex", alignItems: "center", gap: 26, padding: "18px 22px 18px 18px", borderRadius: 999,
        background: "rgba(20,17,12,0.88)", border: `2px solid ${GOLD}66`, boxShadow: "0 22px 44px rgba(0,0,0,0.55)" }}>
        <Img src={staticFile("ep/avatar.png")} style={{ width: 120, height: 120, borderRadius: 60, border: `4px solid ${GOLD}` }} />
        <div style={{ fontFamily: theme.fonts.cap, fontWeight: 900, fontSize: 40, color: "#fff", textShadow: glowW, paddingRight: 8 }}>FOLLOW FOR MORE</div>
        <div style={{ padding: "18px 38px", borderRadius: 999, background: following ? GOLD : "#fff", transform: `scale(${following ? interpolate(flip, [0, 1], [0.85, 1]) : 1})` }}>
          <span style={{ fontFamily: theme.fonts.cap, fontWeight: 900, fontSize: 38, color: "#000" }}>{following ? "✓ Following" : "Follow"}</span>
        </div>
      </div>
    </div>
  );
};
