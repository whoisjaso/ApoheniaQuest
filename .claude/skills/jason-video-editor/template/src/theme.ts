import { Easing } from "remotion";
export const theme = {
  colors: {
    bg: "#07070A",
    gold: "#FFC83D", // hero — money / active word
    red: "#FF2D3A", // curse moments only
    emerald: "#19E3A7", // accent, matches the blazer
    text: "#FFFFFF",
    dim: "#B9B9C3",
    glass: "rgba(12,12,18,0.72)",
    stroke: "rgba(255,255,255,0.12)",
  },
  fonts: {
    display: "Anton",
    cap: "Montserrat",
    mono: "JetBrains Mono",
  },
  ease: {
    out: Easing.bezier(0.16, 1, 0.3, 1),
    inOut: Easing.bezier(0.83, 0, 0.17, 1),
    in: Easing.bezier(0.7, 0, 0.84, 0),
  },
  spring: {
    snappy: { damping: 14, stiffness: 160, mass: 0.6 },
    smooth: { damping: 20, stiffness: 90, mass: 1 },
    bouncy: { damping: 11, stiffness: 170, mass: 0.7 },
    slam: { damping: 9, stiffness: 260, mass: 0.8 },
  },
  outroFrames: 66,
} as const;
