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
  alcoholic: w("ALCOHOLIC"), successful: w("SUCCESSFUL"), disciplined: w("DISCIPLINED"), from: w("FROM", 1), arent: w("AREN'T"),
  are: w("ARE"), where: w("WHERE"), overeat: w("OVEREAT"), smoke: w("SMOKE"), club: w("CLUB"), slutted: w("SLUTTED"),
  bullshit: w("BULLSHIT"), dont: w("DON'T", 2), habits: w("HABITS"), alive: w("ALIVE"), luckily: w("LUCKILY"), god: w("GOD"),
  authority: w("AUTHORITY"), loser1: w("LOSER", 1), redirect: w("REDIRECT"), actually: w("ACTUALLY", 2), gym: w("GYM", 1),
  fuck: w("FUCK", 3), because3: w("BECAUSE", 2), reward: w("REWARD"), loser2: w("LOSER", 2), smoker: w("SMOKER"), over: w("GET", 2),
};
const [cold0, cold1] = T("cold"), [, succ1] = T("succ"), [arent0, arent1] = T("arent"), [, are1] = T("are"), [, where1] = T("where");
const [list0, list1] = T("list"), [why0, why1] = T("why"), [brain0, brain1] = T("brain"), [alive0, alive1] = T("alive");
const [god0, god1] = T("god"), [auth0, auth1] = T("auth"), [loser0, loser1] = T("loser"), [red0, red1] = T("redirect");
const [fun0, fun1] = T("fun"), [cl0, cl1] = T("clothes"), [fun20, fun21] = T("fun2"), [rw0, rw1] = T("reward");

// full-screen editorial cards (§18: one designed visual per sentence)
const CARDS: { src: string; from: number; to: number; shade?: "top" | "bottom"; capTop: number }[] = [
  { src: "ep3/img/01.jpg", from: B.successful - 4, to: succ1, shade: "top", capTop: 1600 },
  { src: "ep3/img/02.jpg", from: B.from, to: arent1, capTop: 1590 },
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
  { big: "Make it", small: "fun", at: fun0 + 1, exit: fun1 + 6, top: 300, size: 170 },
  { big: "Make it", small: "fun", at: fun20 + 1, exit: fun21 + 6, top: 300, size: 170 },
];
// giant words behind the speaker (text-behind-you)
const HERO = [
  { text: "ARE", at: B.are - 1, until: are1 + 12, color: Y, size: 470, top: 10 },
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
  notif: "sx/notification.wav", bass: "pack/deep_bass.wav", whoosh: "pack/whoosh.wav", shutter: "sfx/camera_shutter.wav",
  pop: "sfx/pop.wav", click: "sfx/click.wav", typing: "sfx/typing.wav", riser: "sx/riser.wav", hit: "sx/reverb_hit.wav",
  cine: "sx/cinestrike.wav", ripple: "sx/ripple_textures.wav", tap: "sx/ui_01.wav", neg: "sx/negative_glitch_1.wav",
  neg2: "sx/negative_glitch_2.wav", data: "sx/data_loading.wav", gears: "sx/gears.wav", shine: "sx/shine.wav", sw: "sx/switch.wav",
  success: "sx/success_ui.wav", glitch: "sx/glitch_transition.wav", bell: "sfx/ding.wav",
};
const Sound: React.FC = () => {
  const starts = PAGES.filter((p, i) => i === 0 || p.words[0].k !== PAGES[i - 1].words[0].k).map((p) => p.from);
  return (
    <>
      {/* hook: iPhone notification (stop the scroll) → bass impact on the keyword */}
      <Sfx f={cold0 + 1} name={S.notif} v={0.55} />
      <Sfx f={B.alcoholic - 1} name={S.bass} v={0.7} />
      {/* slow-mo push-ins: whoosh */}
      {SLOW.map((s) => <Sfx key={`w${s.f0}`} f={s.f0 - 3} name={S.whoosh} v={0.35} />)}
      {/* every clip cut: camera shutter */}
      {EDL.slice(1).filter((e, i) => EDL[i].speed === 1 && e.speed === 1).map((e) => <Sfx key={`sh${e.f0}`} f={e.f0 - 1} name={S.shutter} v={0.22} />)}
      {/* image cards: ripple transition */}
      {CARDS.map((c) => <Sfx key={`c${c.from}`} f={c.from - 2} name={S.ripple} v={0.3} />)}
      {/* combos: pop + click */}
      {COMBOS.map((c) => [<Sfx key={`p${c.at}`} f={c.at - 1} name={S.pop} v={0.45} />, <Sfx key={`k${c.at}`} f={c.at + 1} name={S.click} v={0.4} />])}
      {/* hero words: CineStrike */}
      {HERO.map((h) => <Sfx key={`h${h.at}`} f={h.at - 1} name={S.cine} v={0.5} />)}
      {/* negatives */}
      {[B.arent, B.bullshit, B.loser1, B.loser2, B.smoker].map((f) => <Sfx key={`n${f}`} f={f - 1} name={S.neg} v={0.3} />)}
      {/* iOS cards: soft tap */}
      {[B.overeat, B.smoke, B.club, B.slutted, B.actually - 8, B.gym].map((f) => <Sfx key={`t${f}`} f={f - 2} name={S.tap} v={0.5} />)}
      {/* captions: typing as each line starts */}
      {starts.map((f) => <Sfx key={`ty${f}`} f={f} name={S.typing} v={0.14} />)}
      {/* build-up → payoff */}
      <Sfx f={B.where - 40} name={S.riser} v={0.35} />
      <Sfx f={B.where} name={S.hit} v={0.45} />
      <Sfx f={B.habits - 2} name={S.data} v={0.3} />
      <Sfx f={B.alive - 4} name={S.gears} v={0.35} />
      <Sfx f={B.god - 2} name={S.shine} v={0.45} />
      <Sfx f={B.actually} name={S.sw} v={0.55} />
      <Sfx f={cl1 - 140} name={S.success} v={0.4} />
      <Sfx f={B.reward - 1} name={S.success} v={0.45} />
      <Sfx f={B.over - 1} name={S.bass} v={0.6} />
      <Sfx f={FLIP} name={S.bell} v={0.55} />
    </>
  );
};

export const Ep3: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Video punches={[B.alcoholic, B.arent, B.bullshit, B.slutted, B.fuck, B.loser2, B.smoker, B.over]}
      behind={HERO.map((h) => <HeroWord key={h.at} {...h} />)} fgRanges={HERO.map((h) => [h.at - 2, h.until] as [number, number])} />
    {CARDS.map((c) => <ImageCard key={c.from} {...c} />)}
    <Notif at={cold0 + 2} until={cold1} app="SCREEN TIME" icon="⏳" tint="linear-gradient(135deg,#5E5CE6,#7D7AFF)" title="Weekly report" body="You drank 5 days this week." />
    <CardStack until={list1} cards={[
      { at: B.overeat - 2, label: "🍔  ORDERS · LAST 30 DAYS", big: <>47 <span style={{ fontSize: 38, color: "rgba(255,255,255,.6)" }}>deliveries</span></> },
      { at: B.smoke - 2, label: "❤️  HEALTH · STREAK", big: <>Smoked · <span style={{ color: R }}>312 days</span> 🔥</> },
      { at: B.club - 2, label: "📅  CALENDAR · FRI 11:00 PM", big: "Club", sub: "Repeats every week", bar: R },
      { at: B.slutted - 2, label: "💬  MESSAGES · 3:12 AM", big: "“u up?”", sub: "4 new messages", bar: R },
    ]} />
    <ToggleCard at={B.actually - 10} until={red1} flip={B.actually} />
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
