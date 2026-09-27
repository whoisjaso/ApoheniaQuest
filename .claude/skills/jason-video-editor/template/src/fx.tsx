import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "./theme";

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 0→1 entrance spring, 1→0 fast exit. Use for every overlay element. */
type SpringCfg = { damping: number; stiffness: number; mass: number };
export const useInOut = (start: number, stop: number, cfg: SpringCfg = theme.spring.smooth, exitLen = 9) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inP = spring({ frame: frame - start, fps, config: cfg });
  const outP = interpolate(frame, [stop - exitLen, stop], [1, 0], { ...clamp, easing: theme.ease.in });
  return { p: inP * outP, inP, outP, visible: frame >= start - 1 && frame <= stop, local: frame - start };
};

export const Grade: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <AbsoluteFill style={{ backgroundColor: "#2a1a05", mixBlendMode: "soft-light", opacity: 0.35 }} />
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.45), transparent 22%, transparent 58%, rgba(0,0,0,0.55))",
      }}
    />
  </AbsoluteFill>
);

export const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const noise = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        backgroundImage: noise,
        backgroundSize: "220px",
        backgroundPosition: `${(frame * 7) % 220}px ${(frame * 13) % 220}px`,
        opacity: 0.09,
        mixBlendMode: "overlay",
      }}
    />
  );
};

export const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background: "radial-gradient(ellipse at 50% 42%, transparent 52%, rgba(0,0,0,0.55) 100%)",
    }}
  />
);

export const Flash: React.FC<{ at: number; color?: string; len?: number; max?: number }> = ({
  at,
  color = "#fff",
  len = 8,
  max = 0.7,
}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [at, at + 1, at + len], [0, max, 0], { ...clamp, easing: theme.ease.out });
  if (o <= 0) return null;
  return <AbsoluteFill style={{ background: color, opacity: o, mixBlendMode: "screen", pointerEvents: "none" }} />;
};

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const w = interpolate(frame, [0, durationInFrames - 1], [0, 100], { ...clamp, easing: theme.ease.inOut });
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 10, background: "rgba(255,255,255,0.12)" }}>
      <div
        style={{
          width: `${w}%`,
          height: "100%",
          background: theme.colors.gold,
          boxShadow: `0 0 18px ${theme.colors.gold}`,
        }}
      />
    </div>
  );
};

/** Glass card used for every B-roll graphic in the lower zone. */
export const Glass: React.FC<{ style?: React.CSSProperties; children: React.ReactNode }> = ({ style, children }) => (
  <div
    style={{
      background: theme.colors.glass,
      border: `2px solid ${theme.colors.stroke}`,
      borderRadius: 36,
      boxShadow: "0 40px 90px -20px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.08)",
      backdropFilter: "blur(18px)",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Mono: React.FC<{ children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties }> = ({
  children,
  color = theme.colors.dim,
  size = 30,
  style,
}) => (
  <div
    style={{
      fontFamily: theme.fonts.mono,
      fontWeight: 700,
      fontSize: size,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color,
      ...style,
    }}
  >
    {children}
  </div>
);
