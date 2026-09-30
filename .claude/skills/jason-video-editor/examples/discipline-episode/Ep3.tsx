import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import "@fontsource/marcellus/400.css";
import "@fontsource/bodoni-moda/500-italic.css";
import "@fontsource/nunito-sans/600.css";
import "@fontsource/nunito-sans/900.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import { ComboTitle } from "../ComboTitle";
import { Captions, Overlay, PAGES } from "./Captions";
import { FollowCard } from "./Graphics";
import { CardStack, G, HeroWord, ImageCard, Notif, R, RingsCard, ToggleCard, Y } from "./Ios";
import { CUT, EDL, SLOW, tagSpan, w } from "./timeline";
import { Video } from "./Video";

export const OUTRO = 90;
const FLIP = CUT + 48;
const T = (tag: string) => tagSpan(tag);
// every frame is derived from the spoken words
const B = {
  hookFuck: w("FUCK", 1), successful: w("SUCCESSFUL"), disciplined: w("DISCIPLINED"), from: w("FROM", 1), arent: w("AREN'T"),
  actually1: w("ACTUALLY", 1), are: w("ARE"), where: w("WHERE"), overeat: w("OVEREAT"), smoke: w("SMOKE"), club: w("CLUB"), slutted: w("SLUTTED"),
  bullshit: w("BULLSHIT"), habits: w("HABITS"), alive: w("ALIVE"), god: w("GOD"),
  authority: w("AUTHORITY"), loser1: w("LOSER", 1), redirect: w("REDIRECT"), actually: w("ACTUALLY", 2), make1: w("MAKE", 1), gym: w("GYM", 1),
  gymFuck: w("FUCK", 4), because3: w("BECAUSE", 2), reward: w("REWARD"), loser2: w("LOSER", 2), smoker: w("SMOKER"), alcoholic: w("ALCOHOLIC"), over: w("GET", 2),
};
const [, succ1] = T("succ"), [arent0] = T("arent"), [, where1] = T("where");
const [list0, list1] = T("list"), [why0, why1] = T("why"), [brain0, brain1] = T("brain"), [alive0, alive1] = T("alive");
const [god0, god1] = T("god"), [auth0, auth1] = T("auth"), [loser0, loser1] = T("loser"), [, red1] = T("redirect");
const [cl0, cl1] = T("clothes"), [fun20, fun21] = T("fun2"), [, rw1] = T("reward"), [, close1] = T("close");

// full-screen editorial cards (§18: one designed visual per sentence)
const CARDS: { src: string; from: number; to: number; shade?: "top" | "bottom"; capTop: number }[] = [
  { src: "ep3/img/01.jpg", from: B.successful - 4, to: succ1, shade: "top", capTop: 1600 },
  { src: "ep3/img/02.jpg", from: B.from, to: B.actually1 - 2, capTop: 1590 },
  { src: "ep3/img/03.jpg", from: B.where - 3, to: where1, capTop: 1560 },
  { src: "ep3/img/07.jpg", from: why0, to: why1, capTop: 250 },
  { src: "ep3/img/08.jpg", from: brain0, to: brain1, capTop: 1640 },
  { src: "ep3/img/09.png", from: alive0, to: alive1, capTop: 1400 },
  { src: "ep3/img/10.png", from: god0, to: god1, capTop: 1560 },
  { src: "ep3/img/11.png", from: auth0, to: B.authority - 1, capTop: 300 },
  { src: "ep3/img/12.png", from: loser0, to: loser1, capTop: 230 },
  { src: "ep3/img/15.png", from: cl0, to: B.because3 - 1, shade: "bottom", capTop: 1580 },
];
// font combos (Mozart = his favorite) — captions hide underneath (never show the same words twice)
const COMBOS = [
  { big: "Discipline", small: "equals success", at: B.disciplined - 2, exit: succ1 - 2, top: 230, size: 150 },
  { big: "Where", small: "you put it", at: B.where + 2, exit: where1 - 2, top: 1110, size: 190 },
  { big: "Habits", small: "build the brain", at: B.habits - 2, exit: brain1 - 2, top: 330, size: 190 },
  { big: "Make it", small: "fun", at: B.make1 - 1, exit: red1 + 4, top: 300, size: 170 },
  { big: "Make it", small: "fun", at: fun20 + 1, exit: fun21 + 6, top: 300, size: 170 },
];
// giant words behind the speaker (text-behind-you)
const HERO = [
  { text: "ARE", at: B.are - 1, until: B.are + 40, color: Y, size: 470, top: 10 },
  { text: "AUTHORITY", at: B.authority, until: auth1, color: G, size: 158, top: 170 },
  { text: "REDIRECT", at: B.redirect - 1, until: B.actually - 10, color: G, size: 172, top: 170 },
];
const OVERLAYS: Overlay[] = [
  { from: list0, to: list1, text: "OVEREAT SMOKE CLUB SLUTTED" }, // cards carry these words — captions keep them (keyword colours), dedupe off by design
];

const Sfx: React.FC<{ f: number; name: string; v?: number }> = ({ f, name, v = 0.6 }) => (
  <Sequence from={Math.max(0, Math.round(f))} durationInFrames={150} layout="none"><Audio src={staticFile(name)} volume={v} /></Sequence>
);
const S = {
  tritone: "sx/ios_tritone.wav", received: "sx/ios_received.wav", tink: "sx/ios_tink.wav", rings: "sx/ios_rings.wav", paid: "sx/ios_success.wav",
  bass: "pack/deep_bass.wav", whoosh: "pack/whoosh.wav", shutter: "sfx/camera_shutter.wav",
  pop: "sfx/pop.wav", click: "sfx/click.wav", typing: "sfx/typing.wav", riser: "sx/riser.wav", hit: "sx/reverb_hit.wav",
  cine: "sx/cinestrike.wav", ripple: "sx/ripple_textures.wav", neg: "sx/negative_glitch_1.wav",
  data: "sx/data_loading.wav", gears: "sx/gears.wav", shine: "sx/shine.wav", bell: "sfx/ding.wav",
};
const Sound: React.FC = () => {
  const starts = PAGES.filter((p, i) => i === 0 || p.words[0].k !== PAGES[i - 1].words[0].k).map((p) => p.from);
  return (
    <>
      {/* hook: clean — bass impact under the line, slow-mo push on the punchline */}
      <Sfx f={0} name={S.bass} v={0.6} />
      {SLOW.map((s) => <Sfx key={`w${s.f0}`} f={s.f0 - 3} name={S.whoosh} v={0.3} />)}
      {/* section changes only: camera shutter (no sound on same-thought jump cuts) */}
      {EDL.slice(1).filter((x, i) => EDL[i].tag !== x.tag && EDL[i].speed === 1 && x.speed === 1).map((x) => <Sfx key={`sh${x.f0}`} f={x.f0 - 1} name={S.shutter} v={0.22} />)}
      {CARDS.map((c) => <Sfx key={`c${c.from}`} f={c.from - 2} name={S.ripple} v={0.25} />)}
      {COMBOS.map((c) => [<Sfx key={`p${c.at}`} f={c.at - 1} name={S.pop} v={0.45} />, <Sfx key={`k${c.at}`} f={c.at + 1} name={S.click} v={0.4} />])}
      {HERO.map((h) => <Sfx key={`h${h.at}`} f={h.at - 1} name={S.cine} v={0.5} />)}
      {[B.arent, B.bullshit, B.loser1, B.loser2, B.smoker].map((f) => <Sfx key={`n${f}`} f={f - 1} name={S.neg} v={0.28} />)}
      {/* iOS: the real iPhone sounds, 1:1 — Tri-tone on notifications, iMessage received on messages */}
      {[B.overeat, B.smoke, B.club, B.reward - 44, B.alcoholic - 8].map((f) => <Sfx key={`tt${f}`} f={f - 2} name={S.tritone} v={0.55} />)}
      {[B.slutted, B.reward].map((f) => <Sfx key={`rc${f}`} f={f - 2} name={S.received} v={0.6} />)}
      <Sfx f={B.reward - 22} name={S.paid} v={0.4} />
      <Sfx f={B.actually} name={S.tink} v={0.8} />
      <Sfx f={B.because3 + 8} name={S.rings} v={0.5} />
      {starts.map((f) => <Sfx key={`ty${f}`} f={f} name={S.typing} v={0.12} />)}
      <Sfx f={B.where - 40} name={S.riser} v={0.35} />
      <Sfx f={B.where} name={S.hit} v={0.45} />
      <Sfx f={B.habits - 2} name={S.data} v={0.3} />
      <Sfx f={B.alive - 4} name={S.gears} v={0.35} />
      <Sfx f={B.god - 2} name={S.shine} v={0.45} />
      <Sfx f={B.over - 1} name={S.bass} v={0.6} />
      <Sfx f={FLIP} name={S.bell} v={0.55} />
    </>
  );
};

export const Ep3: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Video punches={[B.hookFuck, B.arent, B.bullshit, B.slutted, B.gymFuck, B.loser2, B.smoker, B.alcoholic, B.over]}
      behind={HERO.map((h) => <HeroWord key={h.at} {...h} />)} fgRanges={HERO.map((h) => [h.at - 2, h.until] as [number, number])} />
    {CARDS.map((c) => <ImageCard key={c.from} {...c} />)}
    <Notif at={B.alcoholic - 8} until={close1} app="SCREEN TIME" icon="⏳" tint="linear-gradient(135deg,#5E5CE6,#7D7AFF)" title="Weekly report" body="You drank 5 days this week." />
    <CardStack until={list1} cards={[
      { at: B.overeat - 2, label: "🍔  ORDERS · LAST 30 DAYS", big: <>47 <span style={{ fontSize: 38, color: "rgba(255,255,255,.6)" }}>deliveries</span></> },
      { at: B.smoke - 2, label: "❤️  HEALTH · STREAK", big: <>Smoked · <span style={{ color: R }}>312 days</span> 🔥</> },
      { at: B.club - 2, label: "📅  CALENDAR · FRI 11:00 PM", big: "Club", sub: "Repeats every week", bar: R },
      { at: B.slutted - 2, label: "💬  MESSAGES · 3:12 AM", big: "“u up?”", sub: "4 new messages", bar: R },
    ]} />
    <ToggleCard at={B.actually - 10} until={B.make1 - 2} flip={B.actually} />
    <RingsCard at={B.because3} until={cl1} />
    <CardStack until={rw1} cards={[
      { at: B.reward - 44, label: "🏋️  FITNESS · NEW PR", big: "Bench 225 lb", bar: G },
      { at: B.reward - 22, label: "📸  INSTAGRAM", big: <><span style={{ color: G }}>1,204</span> likes</>, sub: "on your gym fit" },
      { at: B.reward, label: "💬  MESSAGES", big: "“bro you look different”", bar: G },
    ]} />
    {COMBOS.map((c) => (
      <div key={c.at} style={{ position: "absolute", top: c.top, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <ComboTitle combo="mozart" big={c.big} small={c.small} at={c.at} exitAt={c.exit} size={c.size} />
      </div>
    ))}
    <Captions
      hide={[[CUT, CUT + OUTRO], ...COMBOS.map((c) => [c.at - 1, c.exit + 7] as [number, number]), ...HERO.map((h) => [h.at - 1, h.until] as [number, number])]}
      dedupe={OVERLAYS.filter(() => false)}
      tops={CARDS.map((c) => [c.from - 2, c.to, c.capTop] as [number, number, number]).concat([[arent0, B.from, 1590]])}
    />
    <FollowCard flipAt={FLIP} />
    <Sound />
  </AbsoluteFill>
);
