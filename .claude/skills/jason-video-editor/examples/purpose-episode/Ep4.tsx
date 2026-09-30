import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import "@fontsource/nunito-sans/600.css";
import "@fontsource/nunito-sans/900.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import { Captions, PAGES } from "./Captions";
import { FollowCard } from "./Graphics";
import { HeroWord, R, Y } from "../ep3/Ios";
import { BannerStack, Banner, Chess, Counter, CtaPurpose, DoingStack, Doors, Execute, Goldfish, Grades, Graduate, Loop, MoneyResearch, Notes, Overwhelm, Paths, SameWeek, SellTiles, ThinkDo, Walk } from "./Mg";
import { ALLCAPS, CUT, EDL } from "./timeline";
import { Video } from "./Video";

export const OUTRO = 160;
const FLIP = CUT + 118;
/** frame of the n-th spoken `word` inside section `tag` (every graphic is timed to his words) */
const at = (tag: string, word: string, n = 1) => {
  const hits = ALLCAPS.filter((c) => c.tag === tag && c.t.replace(/[^A-Z0-9']/g, "") === word);
  if (!hits[n - 1]) throw new Error(`word not found: ${tag}/${word} #${n}`);
  return hits[n - 1].f0;
};
const sec = (tag: string) => [EDL.find((e) => e.tag === tag)!.f0, [...EDL].reverse().find((e) => e.tag === tag)!.f1] as const;

const A = {
  always: at("grades", "ALWAYS"), told: at("grades", "TOLD"), doG: at("grades", "DO"), first: at("grades", "FIRST"), second: at("grades", "SECOND"), third: at("grades", "THIRD"),
  tenth: at("grades", "TENTH"), eleventh: at("grades", "ELEVENTH"), twelfth: at("grades", "TWELFTH"), but: at("grades", "BUT"), graduate: at("grades", "GRADUATE"),
  goldfish: at("ocean", "GOLDFISH"), released: at("ocean", "RELEASED"), ocean: at("ocean", "OCEAN"), theres: at("ocean", "THERE'S"), destination: at("ocean", "DESTINATION"),
  lets: at("ocean", "LET'S"), scenario: at("ocean", "SCENARIO"), two: at("ocean", "TWO"), million: at("ocean", "MILLION"), month: at("ocean", "MONTH"),
  rubber: at("sell", "RUBBER"), cars: at("sell", "CARS"), service: at("sell", "SERVICE"), pocket: at("sell", "POCKET"), anything: at("sell", "ANYTHING", 1), anything2: at("sell", "ANYTHING", 2),
  options: at("problem", "OPTIONS"), overwhelmed: at("problem", "OVERWHELMED"), nothing: at("problem", "ANYTHING"), and: at("problem", "AND"), problem: at("problem", "PROBLEM"),
  money: at("me", "MONEY"), research: at("me", "RESEARCH"), never: at("me", "NEVER"), doM: at("me", "DO", 2), andMe: at("me", "AND", 1), pondering: at("me", "PONDERING"),
  q1: at("me", "WHAT", 2), q2: at("me", "WHAT", 3), q3: at("me", "WHAT", 4), realize: at("me", "YOU", 1),
  thinking: at("doors", "THINKING"), doing: at("doors", "DOING", 2), anythingD: at("doors", "ANYTHING", 2), like: at("doors", "LIKE", 1), chess: at("doors", "CHESS"), every: at("doors", "EVERY", 1),
  purposeC: at("doors", "PURPOSE", 5), butD: at("doors", "BUT"), live: at("doors", "LIVE"), youre: at("doors", "YOU'RE", 1), because: at("doors", "BECAUSE"),
  paradigm: at("doors", "PARADIGM"), script: at("doors", "SCRIPT"), cycle: at("doors", "CYCLE", 1), change: at("doors", "CHANGE"), take: at("doors", "TAKE"), five: at("doors", "FIVE"),
  promise: at("doors", "PROMISE"), somebody: at("doors", "SOMEBODY", 1), that: at("doors", "THAT", 2), doors: at("doors", "DOORS"), changes: at("doors", "CHANGES"),
  neverN: at("never", "NEVER"), still: at("execute", "STILL"), doing1: at("execute", "DOING", 1), doing2: at("execute", "DOING", 2), doing3: at("execute", "DOING", 3),
  come: at("execute", "COMMIT"), god: at("execute", "GOD"), plans: at("execute", "PLANS"), actions: at("execute", "ACTIONS"), execute: at("execute", "EXECUTE"),
};
const [, hook1] = sec("hook"), [ocean0] = sec("ocean"), [sell0] = sec("sell"), [prob0, prob1] = sec("problem"), [me0] = sec("me"), [, doors1] = sec("doors");

const HERO = [
  { text: "PROBLEM", at: A.problem - 1, until: prob1 - 4, color: R, size: 195, top: 600 },
  { text: "ANYTHING", at: A.anythingD - 1, until: A.like - 2, color: Y, size: 168, top: 610 },
  { text: "CHANGE", at: A.change - 1, until: A.change + 80, color: Y, size: 215, top: 590 },
  { text: "NEVER", at: A.neverN - 1, until: A.neverN + 58, color: R, size: 255, top: 570 },
];
// captions hide while a graphic already carries those words (never show the same words twice)
const HIDE: [number, number][] = [
  [A.ocean - 1, A.theres], [A.two - 1, sell0], [A.q1 - 1, A.realize], [A.purposeC - 1, A.butD], [A.paradigm - 1, A.change], [A.doing1 - 1, A.come], [A.execute - 1, CUT], [CUT, CUT + OUTRO],
  ...HERO.map((h) => [h.at - 1, h.until] as [number, number]),
];
const TOPS: [number, number, number][] = [
  [A.goldfish - 10, A.theres, 1560], [A.theres, A.lets, 1660], [sell0 - 6, prob0, 1640], [A.like - 2, A.butD, 1590], [A.because - 2, A.change, 1500], [A.that - 2, doors1, 1460],
];

const Sfx: React.FC<{ f: number; name: string; v?: number }> = ({ f, name, v = 0.6 }) => (
  <Sequence from={Math.max(0, Math.round(f))} durationInFrames={150} layout="none"><Audio src={staticFile(name)} volume={v} /></Sequence>
);
const S = {
  tritone: "sx/ios_tritone.wav", received: "sx/ios_received.wav", tink: "sx/ios_tink.wav", rings: "sx/ios_rings.wav", paid: "sx/ios_success.wav", key: "sx/ios_key.wav",
  whoosh: "pack/whoosh.wav", swoosh: "pack/swoosh.wav", pop: "sfx/pop.wav", click: "sfx/click.wav", typing: "sfx/typing.wav", riser: "sx/riser.wav", hit: "sx/reverb_hit.wav",
  cine: "sx/cinestrike.wav", crack: "sx/basscrack.wav", neg: "sx/negative_glitch_1.wav", data: "sx/data_loading.wav", shine: "sx/shine.wav", tape: "sfx/tapestop.wav",
  kaching: "sfx/kaching.wav", bass: "pack/deep_bass.wav", shutter: "sfx/camera_shutter.wav", bell: "sfx/ding.wav", success: "sx/success_ui.wav", ui: "sx/ui_02.wav",
};
const Sound: React.FC = () => {
  const starts = PAGES.filter((p, i) => i === 0 || p.words[0].k !== PAGES[i - 1].words[0].k).map((p) => p.from);
  const cuts = EDL.slice(1).filter((e, i) => !(EDL[i].p === e.p && Math.abs(EDL[i].b - e.a) < 0.02)).map((e) => e.f0);
  return (
    <>
      <Audio src={staticFile("ep4/cut.mp4")} />
      {/* hook: the real iPhone Tri-tone as the empty Notes page appears */}
      <Sfx f={2} name={S.tritone} v={0.6} />
      {[A.always, A.told, A.doG].map((f) => <Sfx key={`t${f}`} f={f - 2} name={S.tritone} v={0.45} />)}
      {[A.first, A.second, A.third, A.tenth, A.eleventh, A.twelfth].map((f) => <Sfx key={`k${f}`} f={f} name={S.tink} v={0.9} />)}
      <Sfx f={A.graduate - 2} name={S.success} v={0.45} />
      <Sfx f={A.goldfish - 10} name={S.whoosh} v={0.35} />
      <Sfx f={A.released - 2} name={S.swoosh} v={0.5} />
      <Sfx f={A.ocean - 1} name={S.hit} v={0.45} />
      <Sfx f={A.destination - 40} name={S.riser} v={0.3} />
      <Sfx f={A.destination} name={S.shine} v={0.5} />
      <Sfx f={A.million + 14} name={S.paid} v={0.55} />
      {[A.rubber, A.cars, A.service, A.pocket, A.anything].map((f) => [<Sfx key={`p${f}`} f={f - 1} name={S.pop} v={0.45} />, <Sfx key={`c${f}`} f={f + 1} name={S.click} v={0.35} />])}
      <Sfx f={A.anything2} name={S.data} v={0.3} />
      <Sfx f={A.overwhelmed - 2} name={S.neg} v={0.3} />
      {[0, 6, 13, 21].map((d) => <Sfx key={`ow${d}`} f={A.options + d} name={S.tritone} v={0.25} />)}
      <Sfx f={A.nothing} name={S.tape} v={0.45} />
      <Sfx f={A.problem - 1} name={S.cine} v={0.5} />
      <Sfx f={A.money} name={S.kaching} v={0.45} />
      {[0, 5, 10, 15, 20, 25].map((d) => <Sfx key={`kb${d}`} f={A.research - 14 + d} name={S.key} v={0.8} />)}
      <Sfx f={A.doM} name={S.neg} v={0.3} />
      {[A.q1, A.q2, A.q3].map((f) => <Sfx key={`q${f}`} f={f} name={S.typing} v={0.35} />)}
      <Sfx f={A.thinking - 6} name={S.data} v={0.25} />
      <Sfx f={A.doing} name={S.paid} v={0.55} />
      <Sfx f={A.anythingD - 1} name={S.cine} v={0.45} />
      <Sfx f={A.chess - 2} name={S.tritone} v={0.5} />
      <Sfx f={A.every} name={S.success} v={0.35} />
      <Sfx f={A.live} name={S.ui} v={0.4} />
      <Sfx f={A.because - 2} name={S.whoosh} v={0.35} />
      <Sfx f={A.cycle - 1} name={S.neg} v={0.3} />
      <Sfx f={A.change - 1} name={S.crack} v={0.5} />
      <Sfx f={A.five + 12} name={S.rings} v={0.55} />
      <Sfx f={A.somebody - 2} name={S.received} v={0.6} />
      <Sfx f={A.doors - 1} name={S.shine} v={0.5} />
      <Sfx f={A.changes} name={S.hit} v={0.4} />
      <Sfx f={A.neverN - 1} name={S.crack} v={0.45} />
      <Sfx f={A.still} name={S.tape} v={0.45} />
      {[A.doing1, A.doing2, A.doing3].map((f) => <Sfx key={`d${f}`} f={f - 1} name={S.pop} v={0.5} />)}
      <Sfx f={A.plans} name={S.tink} v={0.9} />
      <Sfx f={A.actions} name={S.tink} v={0.9} />
      <Sfx f={A.god - 1} name={S.shine} v={0.5} />
      <Sfx f={A.execute - 1} name={S.cine} v={0.55} />
      <Sfx f={A.execute - 1} name={S.bass} v={0.5} />
      <Sfx f={CUT + 46} name={S.pop} v={0.45} />
      <Sfx f={CUT + 70} name={S.received} v={0.6} />
      <Sfx f={FLIP} name={S.bell} v={0.55} />
      {cuts.map((f) => <Sfx key={`sh${f}`} f={f - 1} name={S.shutter} v={0.18} />)}
      {starts.map((f) => <Sfx key={`ty${f}`} f={f} name={S.typing} v={0.08} />)}
    </>
  );
};

export const Ep4: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <Video punches={[A.overwhelmed, A.problem, A.doM, A.change, A.neverN, A.execute]} freeze={[A.still, A.still + 22]}
      behind={HERO.map((h) => <HeroWord key={h.at} {...h} />)} fgRanges={HERO.map((h) => [h.at - 2, h.until] as [number, number])} />
    {/* 1 — hook: the empty Notes page */}
    <Notes from={3} to={hook1 - 8} title="What I want to do with my life" lines={[]} empty />
    {/* 2 — told what to do: messages from everyone */}
    <BannerStack until={A.first - 3} items={[
      { at: A.always - 2, logo: "imessage", color: "#34DA50", logoBg: "#34DA50", app: "MESSAGES", title: "Mom", body: "Do your homework before you go out." },
      { at: A.told - 2, logo: "imessage", color: "#34DA50", logoBg: "#34DA50", app: "MESSAGES", title: "Coach", body: "Practice at 6. Don’t be late." },
      { at: A.doG - 2, logo: "imessage", color: "#34DA50", logoBg: "#34DA50", app: "MESSAGES", title: "Mr. Davis", body: "Assignment due 8:00 AM." },
    ]} />
    <Grades from={A.first - 4} to={A.but} items={[
      { label: "1st grade", n: 1, at: A.first }, { label: "2nd grade", n: 2, at: A.second }, { label: "3rd grade", n: 3, at: A.third },
      { label: "10th grade", n: 10, at: A.tenth }, { label: "11th grade", n: 11, at: A.eleventh }, { label: "12th grade", n: 12, at: A.twelfth }]} />
    <Graduate at={A.graduate - 2} until={ocean0 + 6} />
    <Goldfish from={A.goldfish - 8} release={A.released} ocean={A.ocean} to={A.theres + 4} />
    <Paths from={A.theres} to={A.lets} words={[]} dest={A.destination} />
    <Counter from={A.scenario - 6} to={sell0} steps={[{ at: A.two, dur: 18, value: 200000 }, { at: A.million, dur: 16, value: 1000000 }]} suffix=" /month" />
    <SellTiles from={sell0 - 4} to={prob0 + 2} flood={A.anything2} tiles={[
      { emoji: "➰", label: "Rubber bands", at: A.rubber }, { emoji: "🚗", label: "Cars", sub: "like I do", at: A.cars },
      { emoji: "🤝", label: "A service", sub: "like I do", at: A.service }, { emoji: "⌚", label: "Pocket watches", at: A.pocket }, { emoji: "✨", label: "Anything", at: A.anything }]} />
    <Overwhelm from={A.options} freeze={A.nothing} to={A.and} />
    <MoneyResearch money={A.money - 4} research={A.research} never={A.never} doAt={A.doM} to={A.andMe} />
    <Notes from={A.pondering - 4} to={A.realize} title="Me, figuring it out" lines={[
      { text: "What are the things that I like?", at: A.q1 }, { text: "What are the things that I want to do?", at: A.q2 }, { text: "What am I good at?", at: A.q3 }]} />
    <ThinkDo think={A.thinking - 12} doAt={A.doing} to={A.doing + 60} />
    <Chess from={A.like - 2} chess={A.chess} streak={A.every} purpose={A.purposeC} to={A.butD} />
    <SameWeek from={A.live - 4} to={A.because - 2} />
    <Loop from={A.because - 2} to={A.change - 1} words={[{ text: "PARADIGM", at: A.paradigm }, { text: "SCRIPT", at: A.script }, { text: "CYCLE", at: A.cycle }]} />
    <Walk at={A.take - 4} five={A.five} to={A.promise} />
    <Banner at={A.somebody - 2} until={A.that - 2} logo="imessage" color="#34DA50" logoBg="#34DA50" app="MESSAGES" title="Unknown number" body="Yo, we met on the walk earlier. Let’s link 🤝" />
    <Doors from={A.that - 2} open={A.doors} life={A.changes} to={doors1 + 4} />
    <DoingStack ats={[A.doing1, A.doing2, A.doing3]} to={A.come} />
    <Execute plans={A.plans} actions={A.actions} god={A.god} exec={A.execute} to={CUT} />
    <Captions hide={HIDE} tops={TOPS} />
    <CtaPurpose from={CUT} dm={CUT + 70} to={CUT + OUTRO} />
    <FollowCard flipAt={FLIP} />
    <Sound />
  </AbsoluteFill>
);
