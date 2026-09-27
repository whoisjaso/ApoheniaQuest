import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp } from "../fx";
import { theme } from "../theme";
import { Cap, CAPS, CUT } from "./timeline";

/**
 * Rules applied:
 *  - reel 2: captions in Montserrat
 *  - reel 3: two-tier emphasis — small white lowercase setup + big bold YELLOW UPPERCASE keyword
 *  - reel 5: text gets a glow
 *  - reel 7: auto captions word-by-word to keep people engaged
 */
export const GOLD = "#FFD24A";
type Page = { words: Cap[]; from: number; to: number };
export const PAGES: Page[] = (() => {
  const pages: Page[] = [];
  let cur: Cap[] = [];
  const flush = () => { if (cur.length) pages.push({ words: cur, from: cur[0].f0, to: 0 }); cur = []; };
  CAPS.forEach((c, k) => {
    const prev = CAPS[k - 1];
    const hasKey = cur.some((x) => x.emph || x.curse);
    if (cur.length && (cur.length >= 3 || hasKey || c.k !== prev.k || c.f0 - prev.f1 > 8 || /[.?:,!]['"]?$/.test(prev.t))) flush();
    cur.push(c);
  });
  flush();
  pages.forEach((p, k) => {
    const last = p.words[p.words.length - 1];
    const next = pages[k + 1];
    p.to = Math.min(next ? next.from : CUT, last.f1 + 14);
  });
  return pages;
})();

const clean = (t: string) => t.replace(/^['"]+|['"]+$/g, "");

const Word: React.FC<{ c: Cap; key2: boolean }> = ({ c, key2 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - c.f0 + 1, fps, config: theme.spring.snappy });
  if (frame < c.f0 - 1) return null;
  const style: React.CSSProperties = key2
    ? { fontSize: 118, fontWeight: 900, color: GOLD, textTransform: "uppercase", letterSpacing: "-0.01em",
        textShadow: `0 6px 16px rgba(0,0,0,0.55), 0 0 30px ${GOLD}88` }
    : { fontSize: 62, fontWeight: 800, color: "#fff", textTransform: "lowercase",
        textShadow: "0 4px 12px rgba(0,0,0,0.6), 0 0 22px rgba(255,255,255,0.45)" };
  return (
    <span style={{ display: "inline-block", opacity: p, transform: `translateY(${interpolate(p, [0, 1], [22, 0])}px) scale(${interpolate(p, [0, 1], [0.8, 1])})`, ...style }}>
      {clean(c.t).replace(/[,.:?!]+$/, "")}
    </span>
  );
};

const STOP = new Set(["THE", "AND", "YOU", "THAT", "THIS", "WITH", "FOR", "ARE", "HOW", "WHAT", "HAVE", "WOULD", "LIKE", "YOUR", "THEY", "THEM", "HIM", "HIS", "OF", "TO", "A", "AN", "IS", "IT", "IN", "ON"]);
const words = (t: string) => t.toUpperCase().split(/\s+/).map((w) => w.replace(/[^A-Z0-9$]/g, "")).filter((w) => w.length > 1 && !STOP.has(w));
export type Overlay = { from: number; to: number; text: string };

/** Never show the same words twice: `hide` = windows with no captions at all (font combos);
 *  `dedupe` = on-screen text — a caption page is hidden while an overlay shows any of its words. */
export const Captions: React.FC<{ hide: [number, number][]; dedupe?: Overlay[] }> = ({ hide, dedupe = [] }) => {
  const frame = useCurrentFrame();
  if (hide.some(([a, b]) => frame >= a && frame < b)) return null;
  const page = PAGES.find((p) => frame >= p.from - 1 && frame < p.to);
  if (!page) return null;
  const pw = new Set(page.words.flatMap((x) => words(x.t)));
  if (dedupe.some((o) => frame >= o.from - 1 && frame <= o.to && words(o.text).some((w) => pw.has(w) || (w === "$7000" && (pw.has("SEVEN") || pw.has("THOUSAND") || pw.has("DOLLARS")))))) return null;
  const exit = interpolate(frame, [page.to - 4, page.to], [1, 0], { ...clamp, easing: theme.ease.in });
  const keys = page.words.filter((x) => x.emph || x.curse);
  const setup = page.words.filter((x) => !(x.emph || x.curse));
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: 1070, left: 60, right: 60, display: "flex", flexDirection: "column", alignItems: "center",
        fontFamily: theme.fonts.cap, lineHeight: 1.02, opacity: exit }}>
        {setup.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", columnGap: 18 }}>
            {setup.map((x, k) => <Word key={`s${x.f0}${k}`} c={x} key2={false} />)}
          </div>
        )}
        {keys.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", columnGap: 24, marginTop: -4 }}>
            {keys.map((x, k) => <Word key={`k${x.f0}${k}`} c={x} key2 />)}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
