import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import "@fontsource/bebas-neue/400.css";
import "@fontsource/marcellus/400.css";
import "@fontsource/bodoni-moda/500-italic.css";
import "@fontsource/jost/200.css";
import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/hanken-grotesk/800.css";
import "@fontsource/great-vibes/400.css";
import "@fontsource/archivo-black/400.css";
import "@fontsource/inter/500.css";
import { ComboTitle, ComboName } from "../ComboTitle";
import { Captions, PAGES } from "./Captions";
import { FollowCard, PopRow, PopText } from "./Graphics";
import { CUT, EDL, SLOW, tagSpan, w } from "./timeline";
import { Video } from "./Video";

export const OUTRO = 90;

// every frame below is derived from the spoken words
const B = {
  manip: w("MANIPULATE"), label: w("LABEL"), ego1: w("EGO", 1), ego2: w("EGO", 2), assume: w("ASSUMPTION", 1),
  corp1: w("CORPORATE", 1), against: w("AGAINST"), no: w("NO"), yes1: w("YES", 1), won: w("WON"), type: w("TYPE"),
  seven: w("SEVEN", 2), dollars: w("DOLLARS", 2), proceed: w("PROCEED", 2),
  seven0: w("SEVEN", 1), dollars0: w("DOLLARS", 1), proceed0: w("PROCEED", 1), fast: w("FAST"), labeled: w("LABELED"),
  confirmed: w("CONFIRMED"), yes2: w("YES", 2), ego3: w("EGO", 3), identity: w("IDENTITY"), weed: w("WEED"),
  underlying: w("UNDERLYING", 1), ego4: w("EGO", 4), ego5: w("EGO", 5),
};
const [, corpB] = tagSpan("corp");
const [, coldB] = tagSpan("cold");
const [, afterB] = tagSpan("after");
const FLIP = CUT + 48;

// reel 5: zoom in on key lines (each zoom gets a whoosh — reels 6, 9)
const PUNCHES = [B.seven0, B.manip, B.label, B.assume, B.against, B.won, B.seven, B.weed, B.ego5];

// reel 8 font pairings, only on significant lines; words are the speaker's own
// behind: true → text sits BEHIND the speaker (reel 7 masking); used on the 3 biggest title moments
const COMBOS: { combo: ComboName; big: string; small: string; at: number; exit: number; size?: number; behind?: boolean; top?: number }[] = [
  { combo: "modern", small: "how to", big: "MANIPULATE", at: B.manip - 2, exit: B.label - 16, size: 128, behind: true, top: 300 },
  { combo: "mozart", big: "Label", small: "people", at: B.label - 2, exit: B.ego1 - 14 },
  { combo: "tempting", small: "a thing called", big: "ego", at: B.ego1 - 2, exit: B.ego2 - 4, size: 250, behind: true, top: 50 },
  { combo: "modern", small: "use that", big: "AGAINST 'EM", at: B.against - 2, exit: B.against + 70, size: 110 },
  { combo: "modern", small: "you already", big: "WON", at: B.won - 2, exit: B.type - 10, size: 150 },
  { combo: "sugary", big: "fast", small: "decision", at: B.fast - 2, exit: B.labeled - 8, size: 130 },
  { combo: "mozart", big: "Ego", small: "architect", at: B.ego5 - 2, exit: CUT + OUTRO - 4, size: 230, behind: true, top: 30 },
];

// pop-ups (reel 5 pop-up transition; reels 3/6/9 pop + click)
const POPS = [B.seven0, B.ego2, B.assume, B.corp1, B.no, B.yes1, B.type - 4, B.seven, B.proceed, B.labeled, B.confirmed, B.yes2, B.ego3, B.identity, B.underlying, B.ego4];

const Sfx: React.FC<{ f: number; name: string; v?: number }> = ({ f, name, v = 0.6 }) => (
  <Sequence from={Math.max(0, Math.round(f))} durationInFrames={150} layout="none">
    <Audio src={staticFile(name)} volume={v} />
  </Sequence>
);
// stand-ins for his CapCut sounds (named in the playbook master map)
const S = {
  bassImpact: "sfx/deep_bass.wav",          // "Bass impact" — hooks / statements
  whoosh: "sfx/whoosh.wav",                 // "swish_whoosh (large)" — zooms
  shutter: "sfx/camera_shutter.wav",         // "click (camera shutter sound single shot)" — transitions
  pop: "sfx/pop.wav", click: "sfx/click.wav",// "pop! (mouth tap)" + "Click! Mouse single-click" — pop-ups
  typing: "sfx/typing.wav",                  // "Keyboard Typing 01" — captions
  riser: "sfx/riser.wav",                    // "RISER_01" / "Metallic Riser" — suspense, reveals
  reveal: "sfx/synth_hit.wav",              // "Magic reveal" — big reveals
  metal: "sfx/metallic_hit.wav",            // "Metallic Riser" hit — reveals
  money: "sfx/kaching.wav",                  // "Money" — money talk
  bell: "sfx/ding.wav",                      // "Bell ding" — CTA
};

const Sound: React.FC = () => {
  const sentenceStarts = PAGES.filter((p, i) => i === 0 || p.words[0].k !== PAGES[i - 1].words[0].k).map((p) => p.from);
  return (
    <>
      {/* cold open (open loop): result first — hook bass impact + money */}
      <Sfx f={B.seven0 - 1} name={S.bassImpact} v={0.7} />
      <Sfx f={B.dollars0} name={S.money} v={0.5} />
      {/* hooks + statements: bass impact */}
      <Sfx f={B.manip - 1} name={S.bassImpact} v={0.75} />
      <Sfx f={B.label - 1} name={S.bassImpact} v={0.55} />
      {/* zooms: whoosh (punches + slow-mo push-ins) */}
      {[...PUNCHES, ...SLOW.map((s) => s.f0)].map((p) => <Sfx key={`w${p}`} f={p - 4} name={S.whoosh} v={0.35} />)}
      {/* transitions between clips: camera shutter on every cut */}
      {EDL.slice(1).filter((e, i) => EDL[i].speed === 1 && e.speed === 1).map((e) => <Sfx key={`sh${e.f0}`} f={e.f0 - 1} name={S.shutter} v={0.28} />)}
      {/* text pops up: pop + click (combos and pop-ups) */}
      {[...COMBOS.map((c) => c.at), ...POPS].map((f) => [<Sfx key={`p${f}`} f={f - 1} name={S.pop} v={0.45} />, <Sfx key={`c${f}`} f={f + 1} name={S.click} v={0.4} />])}
      {/* captions: keyboard typing as each new caption line starts */}
      {sentenceStarts.map((f) => <Sfx key={`t${f}`} f={f} name={S.typing} v={0.16} />)}
      {/* suspense → payoff */}
      <Sfx f={B.seven - 58} name={S.riser} v={0.45} />
      <Sfx f={B.dollars} name={S.money} v={0.5} />
      {/* reveals */}
      <Sfx f={B.won - 40} name={S.riser} v={0.3} />
      <Sfx f={B.won} name={S.metal} v={0.5} />
      <Sfx f={B.ego4} name={S.reveal} v={0.45} />
      <Sfx f={B.ego5 - 50} name={S.riser} v={0.4} />
      <Sfx f={B.ego5} name={S.reveal} v={0.55} />
      {/* CTA: bell ding when the button flips to Following */}
      <Sfx f={FLIP} name={S.bell} v={0.55} />
    </>
  );
};

const renderCombo = (c: (typeof COMBOS)[number]) => (
  <AbsoluteFill key={c.at} style={{ alignItems: "center", paddingTop: c.top ?? 150 }}>
    <ComboTitle combo={c.combo} big={c.big} small={c.small} at={c.at} exitAt={c.exit} size={c.size ?? 140} />
  </AbsoluteFill>
);

export const Episode: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Video punches={PUNCHES} behind={COMBOS.filter((c) => c.behind).map(renderCombo)} fgRanges={COMBOS.filter((c) => c.behind).map((c) => [c.at - 2, Math.min(c.exit + 8, CUT)] as [number, number])} />
    {COMBOS.filter((c) => !c.behind).map((c) => (
      <AbsoluteFill key={c.at} style={{ alignItems: "center", paddingTop: c.big === "Ego" ? 200 : 150 }}>
        <ComboTitle combo={c.combo} big={c.big} small={c.small} at={c.at} exitAt={c.exit} size={c.size ?? 140} />
      </AbsoluteFill>
    ))}
    <PopText at={B.seven0} until={coldB - 1} head="$7,000" gold size={200} />
    <PopText at={B.ego2} until={B.assume - 2} head="EGO" sub="how you think other people perceive you" />
    <PopText at={B.assume} until={B.assume + 32} head="AN ASSUMPTION" gold />
    <PopText at={B.corp1} until={corpB - 4} head="WHITE CORPORATE VOICE" size={96} />
    <PopRow items={[{ label: "NO", at: B.no }, { label: "YES", at: B.yes1 }]} until={B.won + 50} />
    <PopText at={B.type - 4} until={B.type + 40} head="THAT TYPE OF PERSON" size={100} />
    <PopText at={B.seven} until={B.proceed - 2} head="$7,000" gold size={200} />
    <PopText at={B.proceed} until={B.proceed + 50} head="HOW WOULD YOU LIKE TO PROCEED?" size={76} />
    <PopRow items={[{ label: "LABELED", at: B.labeled }, { label: "CONFIRMED", at: B.confirmed }, { label: "YES", at: B.yes2 }]} until={afterB + 8} top={1250} column />
    <PopRow items={[{ label: "EGO", at: B.ego3 }, { label: "IDENTITY", at: B.identity }]} until={B.identity + 34} check={false} />
    <PopText at={B.underlying} until={B.ego4 - 2} head="UNDERLYING MESSAGE" size={100} />
    <PopText at={B.ego4} until={B.ego4 + 34} head="EGO" gold size={180} />
    <Captions hide={[[CUT, CUT + OUTRO]]} />
    <FollowCard flipAt={FLIP} />
    <Sound />
  </AbsoluteFill>
);
