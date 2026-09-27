import caps from "./captions.json";
import edl from "./edl.json";
export type Cap = { k: number; t: string; f0: number; f1: number; emph: boolean; curse: boolean; tag: string; end: boolean; tone?: "gold" | "green" | "red" };
export type Piece = { a: number; b: number; speed: number; tag: string; f0: number; f1: number };
export const CAPS = caps as Cap[];
export const EDL = edl as Piece[];
export const CUT = EDL[EDL.length - 1].f1;
export const SLOW = EDL.filter((p) => p.speed < 1);
/** frame of the n-th occurrence (1-based) of a caption word, matched on letters only */
export const w = (word: string, n = 1) => {
  const key = word.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const hits = CAPS.filter((c) => c.t.replace(/[^A-Z0-9]/g, "") === key);
  if (!hits[n - 1]) throw new Error(`caption word not found: ${word} #${n}`);
  return hits[n - 1].f0;
};
export const tagSpan = (tag: string) => {
  const p = EDL.filter((e) => e.tag === tag);
  return [p[0].f0, p[p.length - 1].f1] as const;
};

/** frame where the spoken phrase containing word #n ends (runs to the first word ending in . , ? ! :), capped */
export const phraseEnd = (word: string, n = 1, cap = 75) => {
  const key = word.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const hits = CAPS.map((c, i) => [c, i] as const).filter(([c]) => c.t.replace(/[^A-Z0-9]/g, "") === key);
  const [, i0] = hits[n - 1];
  const start = CAPS[i0].f0;
  let i = i0;
  while (i < CAPS.length - 1 && !/[.,?!:]['"]?$/.test(CAPS[i].t) && CAPS[i + 1].f0 - start < cap && CAPS[i + 1].k === CAPS[i0].k) i++;
  return CAPS[i].f1;
};
