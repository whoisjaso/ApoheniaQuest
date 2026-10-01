import caps from "./captions.json";
import edl from "./edl.json";
/** One spoken word. `hide` = a graphic carries this word, so no caption (marked {..} in sections.json). */
export type Cap = { k: number; t: string; f0: number; f1: number; emph: boolean; curse: boolean; tag: string; end: boolean; hide?: boolean; tone?: "gold" | "green" | "red" };
export type Piece = { p?: string; a: number; b: number; speed: number; tag: string; k?: number; f0: number; f1: number };
/** every spoken word (use for timing graphics) */
export const ALLCAPS = caps as Cap[];
/** words that get a caption */
export const CAPS = ALLCAPS.filter((c) => !c.hide);
export const EDL = edl as Piece[];
export const CUT = EDL[EDL.length - 1].f1;
export const SLOW = EDL.filter((p) => p.speed < 1);
const key = (s: string) => s.toUpperCase().replace(/[^A-Z0-9']/g, "");
/** frame of the n-th spoken `word` inside section `tag`. Every graphic is timed to his words, never to hard-coded frames. */
export const at = (tag: string, word: string, n = 1) => {
  const hits = ALLCAPS.filter((c) => c.tag === tag && key(c.t) === key(word));
  if (!hits[n - 1]) throw new Error(`word not found: ${tag}/${word} #${n}`);
  return hits[n - 1].f0;
};
/** frame of the n-th occurrence of a word anywhere */
export const w = (word: string, n = 1) => {
  const hits = ALLCAPS.filter((c) => key(c.t) === key(word));
  if (!hits[n - 1]) throw new Error(`word not found: ${word} #${n}`);
  return hits[n - 1].f0;
};
/** [first frame, last frame] of a section */
export const sec = (tag: string) => {
  const p = EDL.filter((e) => e.tag === tag);
  if (!p.length) throw new Error(`section not found: ${tag}`);
  return [p[0].f0, p[p.length - 1].f1] as const;
};
export const tagSpan = sec;
