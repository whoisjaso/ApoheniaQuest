// APOHENIA: SALES QUEST — data/parts/11-levels-b.js
// Levels 6–10 (Impact City → Closing Summit). Defines window.__SQ_PARTS["levels-b"].
// One master frame, translated per NPC archetype. Offer facts are fixed and never bend.

window.__SQ_PARTS = window.__SQ_PARTS || {};

window.__SQ_PARTS["levels-b"] = {
  levels: [
    // ────────────────────────────────────────────────────────────────────────
    // LEVEL 6 — IMPACT CITY — "Ripple Effects"
    // NPC: established law-firm owner. Primary: status. Secondary: certainty.
    // Drills: the impact side of `gap` — what the gap costs, opportunity-cost
    // track allowed, never manufacturing pain.
    // ────────────────────────────────────────────────────────────────────────
    {
      id: "lv-impact-6",
      region: "impact-city",
      name: "Ripple Effects",
      subtitle: "What the gap actually costs",
      intro: "A prestigious law firm is leaking the very reputation it spent 31 years earning.",
      npc: {
        id: "margaret-hale",
        name: "Margaret Hale",
        business: "Hale & Whitfield Law",
        role: "Managing Partner, 31 years",
        primary: "status",
        secondary: "certainty",
        personality: "Crisp, formal, and precise. Proud of the firm's standing, allergic to exaggeration — she discounts anything that sounds inflated.",
        portrait: { skin: "#e8b48c", hair: "silver-bun", hairColor: "#c9c9c9", outfit: "#3d2f52", accessory: "glasses", bg: "#b9c8e8" }
      },
      teaches: ["gap"],
      beats: [
        { t: "say", who: "npc", emotion: "neutral",
          text: "Thirty-one years, three named partners, and a waiting list for our estate work. I didn't call because we're struggling — a two-year-old firm just took a client we deserved." },
        { t: "say", who: "npc", emotion: "thinking",
          text: "Our reputation is excellent, and our follow-up is… uneven. Some weeks a referral waits two days for a reply. I don't like uneven. Uneven is how standing erodes." },
        { t: "identify", prompt: "Who are you talking to?",
          options: ["status", "certainty", "intelligence", "growth", "contribution"],
          answer: { primary: "status", secondary: "certainty" },
          feedbackWin: "You caught both layers! 'A client we deserved' and 'waiting list' = status. 'I don't like uneven' and 'standing erodes' = certainty. She's tracking perception AND predictability. +80",
          feedbackLose: "Re-listen: 'a client we deserved' is about standing, not systems — that's status. And 'uneven… some weeks' is a predictability worry — that's certainty. The clues are in her nouns.",
          points: 80 },
        { t: "choose", stage: "gap", tool: null,
          setup: "You've heard the gap: referrals sometimes wait two days. Now ask the impact question — in her language.",
          options: [
            { text: "How does that affect the way the firm is perceived, compared with the quality of the work?", quality: 3,
              feedback: "Perfect translation. The impact question, aimed at perception and earned standing — her exact frequency. She leans in. +20" },
            { text: "What is that costing you the most — time, missed inquiries, follow-up, credibility, or growth?", quality: 2, tags: ["wrong-archetype"],
              feedback: "The right master question, but in neutral dialect. She'll answer it — politely, and with less of herself. Translate for the driver. +8" },
            { text: "Doesn't it sting, watching a younger firm take what should have been yours?", quality: 1, tags: ["manipulation"],
              feedback: "That's manufactured pain — poking a bruise she didn't show you. She mentioned one lost client; you built a wound. Her guard snaps up. -25" },
            { text: "A two-day wait is exactly what my websites fix — let me show you the packages.", quality: 1, tags: ["premature-pitch"],
              feedback: "Whoa — the gap isn't even quantified yet. Pitching here tells her you were never listening, just waiting to talk. -15" }
          ],
          teaching: "The impact side of the gap asks what the gap costs — in the prospect's own currency. For status drivers, that currency is perception and standing." },
        { t: "say", who: "npc", emotion: "annoyed",
          text: "Perception is the cost. A referred client expects white-glove treatment; a two-day silence says otherwise. We've lost two matters this year that I can trace to it." },
        { t: "choose", stage: "gap", tool: "probe",
          setup: "Quantify the impact — carefully. She discounts anything inflated.",
          options: [
            { text: "How long has that been happening — and in the worst case, what happens when that step fails?", quality: 3,
              feedback: "Textbook certainty probe: duration plus worst case, no drama added. She can answer this precisely, and precision is her love language. +20" },
            { text: "Can you quantify that at all — even a rough range?", quality: 2, tags: ["wrong-archetype"],
              feedback: "A valid master probe, but it's the intelligence dialect. She'll tolerate it; she just won't light up. Match her frequency. +8" },
            { text: "If it's costing you clients every week, why has it gone on this long?", quality: 1, tags: ["pressure"],
              feedback: "Two fouls: you inflated 'two matters this year' into 'every week,' then added a 'why haven't you' scolding. Never amplify beyond what they stated. -25" },
            { text: "So we're probably talking tens of thousands in lost fees — shall we call it fifty?", quality: 1, tags: ["manipulation"],
              feedback: "You just put words — and a number — in her mouth. Certainty drivers catch inflated estimates instantly and discount everything else you say. -25" }
          ],
          teaching: "Probe the impact with duration and worst-case questions. Let their number stand — inflating an estimate is manufacturing pain by arithmetic." },
        { t: "say", who: "npc", emotion: "thinking",
          text: "Two years, roughly. Worst case? A referral from a judge's office waited over a weekend. That one keeps me up — you never know which inquiry was the important one." },
        { t: "choose", stage: "gap", tool: "mirror",
          setup: "Mirror the impact back — both layers: the lost matters and the standing.",
          options: [
            { text: "So the cost isn't only the lost matters — it's standing eroding at the exact point your reputation gets tested. Accurate?", quality: 3,
              feedback: "That's a mirror with depth — her consequence, her words ('standing,' 'reputation'), checked with 'Accurate?' rather than asserted. +20" },
            { text: "So the real issue isn't the website; it's the follow-up?", quality: 2, tags: ["off-frame"],
              feedback: "A true mirror, but only of the surface. You dropped the layer she cares about — perception. Half a mirror earns half the trust. +8" },
            { text: "So basically your whole reputation is hanging by a thread.", quality: 1, tags: ["manipulation"],
              feedback: "You took 'two matters this year' and returned 'hanging by a thread.' Mirrors shrink nothing and inflate nothing — they reflect. -25" },
            { text: "Honestly, you're in great shape compared to most firms I see!", quality: 1, tags: ["flattery"],
              feedback: "Empty comfort instead of a mirror. She didn't describe a compliment-shaped gap; she described a cost. Reflect it, don't paint over it. -10" }
          ],
          teaching: "A strong mirror returns the consequence at exactly the depth the prospect stated it — then checks accuracy instead of asserting." },
        { t: "say", who: "npc", emotion: "impressed",
          text: "…Yes. That's precisely it, and I haven't heard it said back to me that cleanly. Nothing here is broken — but something earned is quietly leaking." },
        { t: "choose", stage: "gap", tool: "anchor",
          setup: "Anchor the impact stage honestly before moving forward. She just told you the firm is healthy.",
          options: [
            { text: "I'm not here to invent problems — this firm is healthy. I only want the consequences you've already noticed, in your numbers, on the table.", quality: 3,
              feedback: "The honest anchor: opportunity-cost track, stated openly. No wound manufactured, her numbers invited. This is what ethical impact work sounds like. +20" },
            { text: "Noted — and for the record, your number was two matters a year, not fifty.", quality: 2, tags: ["off-frame"],
              feedback: "Accurate and precise — she'd appreciate it — but it's a correction, not an anchor. The anchor names your purpose and standards for this stage. +8" },
            { text: "Whatever it's costing, we'll fix it fast — you won't remember this problem by spring.", quality: 1, tags: ["premature-pitch"],
              feedback: "Solution talk during discovery, plus a breezy implied promise. Anchors stabilize the conversation; they don't sprint to the close. -15" },
            { text: "For a firm of your caliber, I'm sure whatever you decide will be the right call.", quality: 1, tags: ["flattery"],
              feedback: "A compliment where an anchor should be. 'Your caliber' is decoration — she asked for substance and got wallpaper. -10" }
          ],
          teaching: "The anchor for the impact stage: 'I am not here to invent problems.' A functioning business with uncaptured opportunity gets the opportunity-cost track, not a wound." },
        { t: "say", who: "npc", emotion: "happy",
          text: "Good. Then the record is accurate — which is more than I can say for most sales calls. Ask your next question. I'm still listening." },
        { t: "end", outcome: "next-step", emotion: "impressed",
          text: "Impact mapped, pain count: zero manufactured. Margaret's guard is down and her numbers are on the table — the future questions will land now." }
      ],
      starThresholds: [0.55, 0.8],
      unlockAfter: "lv-gap-5"
    },

    // ────────────────────────────────────────────────────────────────────────
    // LEVEL 7 — FUTURE FIELDS — "Six Months From Now"
    // NPC: creative bakery-café owner expanding to retail. Primary: novelty.
    // Secondary: growth. Drills: `future` — desired future + realistic cost of
    // inaction. No emotion-manufacturing, no family/fear pressure.
    // ────────────────────────────────────────────────────────────────────────
    {
      id: "lv-future-7",
      region: "future-fields",
      name: "Six Months From Now",
      subtitle: "Paint the future in their words",
      intro: "A wildly original bakery-café is about to knock down a wall — but online, it looks like everyone else.",
      npc: {
        id: "poppy-alder",
        name: "Poppy Alder",
        business: "The Crumb & Kettle",
        role: "Owner & Head Baker",
        primary: "novelty",
        secondary: "growth",
        personality: "Fizzy, idea-a-minute, allergic to beige. Loves a bold vision but keeps a quiet tally of milestones and numbers.",
        portrait: { skin: "#8d5a3b", hair: "curly-puffs", hairColor: "#7a3fd4", outfit: "#e8639a", accessory: "earring", bg: "#ffd9a0" }
      },
      teaches: ["future"],
      beats: [
        { t: "say", who: "npc", emotion: "happy",
          text: "Okay so — we do a 'mystery crumb box' every Friday, flavors nobody in this county has attempted. The café's packed. And in spring we knock down that wall and add a retail shelf." },
        { t: "say", who: "npc", emotion: "annoyed",
          text: "But online? We look like every other café with a cupcake clip-art site. People find our Instagram, then land on… beige. And every pre-order still comes through my DMs at midnight." },
        { t: "identify", prompt: "Who are you talking to?",
          options: ["novelty", "growth", "connection", "status", "efficiency"],
          answer: { primary: "novelty", secondary: "growth" },
          feedbackWin: "Yes! 'Flavors nobody in this county has attempted' and 'looks like every other café' = novelty. 'Knock down that wall, add a retail shelf' = growth. Distinctive AND expanding. +80",
          feedbackLose: "Re-listen: she didn't ask to be admired (status) — she wants to be unlike anyone else: novelty. And the wall coming down in spring is an expansion plan: growth.",
          points: 80 },
        { t: "choose", stage: "future", tool: null,
          setup: "Open the future stage. She lives in ideas — ask the future question in her dialect.",
          options: [
            { text: "If the way people find and order from you felt as distinctive as the bakery itself — without creating chaos — what would become possible?", quality: 3,
              feedback: "Perfect: the novelty future translation, complete with the 'no operational chaos' guardrail. Her eyes just lit up like a proofing oven. +20" },
            { text: "If this worked exactly the way you wanted six months from now, what would be tangibly different?", quality: 2, tags: ["wrong-archetype"],
              feedback: "The master question, word for word — and it works. But 'tangibly different' is neutral dialect; 'distinctive' is her word. Same purpose, sharper key. +8" },
            { text: "Picture the grand opening — the ribbon, the crowd, the local news! How does that future feel?", quality: 1, tags: ["manipulation"],
              feedback: "You manufactured an emotion reel she never described. The future stage asks for tangible differences — behaviors, numbers, weeks — not a feelings montage. -25" },
            { text: "What happens to this business when the café across the street copies your ideas first?", quality: 1, tags: ["pressure"],
              feedback: "Fear pressure dressed as a question. Cost of inaction must come from trends SHE already described — never from a threat you invented. -25" }
          ],
          teaching: "The future question asks for a specific, tangible future state — in the prospect's dialect. Novelty drivers answer 'what would become possible if it were as distinctive as the work?'" },
        { t: "say", who: "npc", emotion: "happy",
          text: "Oh — everything. A stranger could taste the menu with their eyes, build a custom box online, pick it up Friday. The retail shelf would get its own little page. Limited runs! Waitlists!" },
        { t: "choose", stage: "future", tool: "probe",
          setup: "Attach the vision to something countable. Her secondary driver keeps score.",
          options: [
            { text: "What would make you say this was worth doing — what's the milestone?", quality: 3,
              feedback: "Exactly the growth probe: their goal, their number, not your forecast. Every future answer should end in a number, a hire, or a milestone. +20" },
            { text: "What would a normal week look like in that version?", quality: 2, tags: ["wrong-archetype"],
              feedback: "A legitimate master probe — concrete and calm — but it's the neutral 'softer' line. For her, aim at the milestone the expansion hangs on. +8" },
            { text: "Don't you owe it to everyone who believed in you to make this huge?", quality: 1, tags: ["manipulation"],
              feedback: "Identity pressure — banned move. Never use obligation, family, or 'owe it to yourself' framing to add weight. Her milestone doesn't need guilt fuel. -25" },
            { text: "If this could triple revenue by Christmas, would you sign today?", quality: 1, tags: ["pressure"],
              feedback: "A promised outcome AND a close, in discovery, in one line. Apohenia never guarantees revenue — and the future stage never closes. -25" }
          ],
          teaching: "Growth translations of the future question end in a milestone — never in your forecast. You define their goal; you don't sell them a prediction." },
        { t: "say", who: "npc", emotion: "thinking",
          text: "Milestone: two hundred pre-orders a month through the site, sustained for a quarter — that's what pays for the second oven. And I stop being the midnight DM department." },
        { t: "choose", stage: "future", tool: "mirror",
          setup: "Mirror both layers back: the distinctive thing AND the milestone.",
          options: [
            { text: "So the distinctive part is the build-your-own box online — and two hundred pre-orders a month is what buys the second oven?", quality: 3,
              feedback: "Both layers, her exact words, question mark at the end. That's a mirror she'd frame and hang next to the bread shelf. +20" },
            { text: "So basically you want the website to feel less beige?", quality: 2, tags: ["off-frame"],
              feedback: "Cute, and technically her word — but you mirrored the vibe and dropped the milestone. Growth drivers need their numbers reflected back too. +8" },
            { text: "So the dream is to become the most famous bakery in the state!", quality: 1, tags: ["flattery"],
              feedback: "You inflated '200 pre-orders a month' into fame. Mirrors don't upgrade the dream — they return it exactly as received. -10" },
            { text: "Got it — so with the right site, the second oven basically pays for itself.", quality: 1, tags: ["manipulation"],
              feedback: "Careful: that's a causal promise ('site → oven pays for itself'). You can mirror her milestone; you can't guarantee the outcome that funds it. -25" }
          ],
          teaching: "Mirror the future the prospect described — vision plus milestone — without upgrading, shrinking, or attaching promises to it." },
        { t: "say", who: "npc", emotion: "thinking",
          text: "And look — if nothing changes, we survive. The café stays full. We just stay… interchangeable online, and the shelf expansion slips a season at a time." },
        { t: "choose", stage: "future", tool: "anchor",
          setup: "She just stated the realistic cost of inaction herself. Anchor it analytically — no doom, no drama.",
          options: [
            { text: "That's the honest math — growth plans rarely fail loudly; they slip a season at a time. Your numbers, not my enthusiasm.", quality: 3,
              feedback: "The accountant's anchor: calm projection of a trend SHE acknowledged, credit for the numbers given to her. No stakes-raising, no theatrics. +20" },
            { text: "So staying as-is is a real option — it just has a price. Are you okay paying it?", quality: 2, tags: ["off-frame"],
              feedback: "Right principle — staying flat is a real option with a calculable price. But 'are you okay paying it?' nudges toward a verdict. This stage defines, it doesn't close. +8" },
            { text: "Imagine explaining in five years why the bakery never became what it could have been.", quality: 1, tags: ["manipulation"],
              feedback: "Regret theater. The rule: sound like an accountant reviewing a trend, not a motivator raising stakes. She gave you the honest math — use it. -25" },
            { text: "Then let's fix it right now — I can start Monday if you commit today.", quality: 1, tags: ["pressure"],
              feedback: "Fake-urgency close in the middle of discovery. The future stage isn't finished, and pressure here poisons everything you built. -25" }
          ],
          teaching: "Cost of inaction stays realistic and analytical — a calm projection of the trend the prospect already described. If doing nothing is genuinely fine, that's data. Accept it." },
        { t: "say", who: "npc", emotion: "impressed",
          text: "Ha — 'slips a season at a time.' That's exactly what's been happening and I never said it out loud. Okay, what's next — what have I already tried? Honestly, not much." },
        { t: "end", outcome: "next-step", emotion: "happy",
          text: "The future is now specific enough to measure a recommendation against — 200 pre-orders, one second oven, zero manufactured doom. Onward to the castle." }
      ],
      starThresholds: [0.55, 0.8],
      unlockAfter: "lv-impact-6"
    },

    // ────────────────────────────────────────────────────────────────────────
    // LEVEL 8 — RECOMMENDATION CASTLE — "The Three Pillars"
    // NPC: autonomy-loving real-estate broker. Primary: freedom.
    // Secondary: intelligence. Drills: `recommend` — diagnostic summary,
    // correct offer (managed), and the three-pillar formula:
    // "Because you mentioned [problem], we [action], so [outcome]."
    // ────────────────────────────────────────────────────────────────────────
    {
      id: "lv-recommend-8",
      region: "recommendation-castle",
      name: "The Three Pillars",
      subtitle: "Recommend from their words, not your brochure",
      intro: "A broker who's been locked in by three agencies wants reasoning before slides. Give him three pillars.",
      npc: {
        id: "gavin-cross",
        name: "Gavin Cross",
        business: "Cross Keys Realty",
        role: "Broker-Owner",
        primary: "freedom",
        secondary: "intelligence",
        personality: "Brisk and self-directed. Allergic to lock-in and vendor dependence, but genuinely delighted by clean logic that holds together.",
        portrait: { skin: "#d9a066", hair: "slick-back", hairColor: "#3a2a1a", outfit: "#24566b", accessory: "none", bg: "#c7e3d2" }
      },
      teaches: ["recommend"],
      beats: [
        { t: "say", who: "npc", emotion: "neutral",
          text: "Let's save each other time. I need the website and the follow-up handled — properly — without becoming my own web department. And to be clear: my domain and my client list stay in my name." },
        { t: "say", who: "npc", emotion: "skeptical",
          text: "Three agencies pitched me this year. All three led with a slideshow and ended with a contract that locked me into something. This time I want the reasoning first." },
        { t: "identify", prompt: "Who are you talking to?",
          options: ["freedom", "intelligence", "status", "certainty", "efficiency"],
          answer: { primary: "freedom", secondary: "intelligence" },
          feedbackWin: "Nailed it. 'Without becoming my own web department' and 'stay in my name' = freedom. 'I want the reasoning first' = intelligence. Autonomy with a logic check. +80",
          feedbackLose: "Re-listen: his hot buttons are control and dependence ('locked me into something') — that's freedom. And 'reasoning first' is the intelligence tell, not a status play.",
          points: 80 },
        { t: "choose", stage: "recommend", tool: null,
          setup: "Build the diagnostic summary in his words — then confirm it BEFORE recommending anything.",
          options: [
            { text: "Let me check the picture: inquiries wait on you, you want that handled, and the domain and client list stay yours. Accurate?", quality: 3,
              feedback: "The freedom-flavored summary: what comes off his plate, what stays in his hands, ending in 'Accurate?' — a hypothesis to check, not a pitch to applaud. +20" },
            { text: "Here's my working model of your situation — where does it diverge from reality?", quality: 2, tags: ["off-frame"],
              feedback: "The right ritual (confirm before recommending) but with no summary inside it. A model-shaped box with nothing in it. Say what you actually heard. +8" },
            { text: "You clearly need us, so let's skip the recap — I'll show you the package that fits.", quality: 1, tags: ["skips-discovery"],
              feedback: "The summary isn't a formality — it's how he confirms the problem before hearing the solution. Skipping it turns your recommendation into a pitch. -15" },
            { text: "Great broker, great business — honestly, this is the easiest fit I've seen all month.", quality: 1, tags: ["flattery"],
              feedback: "He asked for reasoning and got confetti. Three agencies already tried charm on him; be the first one with substance. -10" }
          ],
          teaching: "Never recommend before the prospect confirms the summary is accurate. People trust conclusions they helped articulate." },
        { t: "say", who: "npc", emotion: "neutral",
          text: "That's accurate. Every inquiry currently waits on me between showings, and I want it off my week — with my domain and client list untouched. So what do you recommend, and why?" },
        { t: "offer",
          setup: "Discovery is complete: he wants inquiries handled, zero maintenance duties, and full control of his domain, content, and client data — with reasoning that holds up.",
          options: ["managed", "ownership", "custom", "none"],
          answer: "managed",
          feedback: {
            managed: "Correct. $197/mo, six initial monthly billing periods then month-to-month, no upfront build fee. Strategy, build, hosting, security, monitoring, maintenance, and support are handled — while his domain, content, and client data stay in his name. Work removed, control kept. +40",
            ownership: "Tempting for an autonomy lover — but ownership is a defined build plus handoff: ongoing hosting, maintenance, and updates are NOT included. He explicitly said he doesn't want to be his own web department. Wrong fit for HIS stated needs.",
            custom: "Premature. Nothing he described sits outside the defined website scope — no CRM, no complex automation. Custom work starts with a separate audit and a written scope, and there's nothing to audit here.",
            none: "Honest instinct, wrong case. A clean no-fit is a win when needs and offers genuinely don't match — but his stated needs map directly onto the managed structure. That's a missed fit, not a qualified no."
          } },
        { t: "say", who: "npc", emotion: "thinking",
          text: "Managed. Hmh. I expected you to push the expensive thing. Give me the reasoning — and not brochure reasoning. My reasoning." },
        { t: "choose", stage: "recommend", tool: null,
          setup: "Pillar one. Formula: Because you mentioned [his problem], we [Apohenia action], so [his outcome].",
          options: [
            { text: "First: because you said inquiries wait between showings, we build one clear path that answers each one, so nothing depends on your memory.", quality: 3,
              feedback: "A textbook pillar — stated problem, specific action, HIS outcome, nothing else. Every claim tethered to something he actually said. +20" },
            { text: "The managed plan includes hosting, security, monitoring, maintenance, basic lead delivery, and ongoing support.", quality: 2, tags: ["off-frame"],
              feedback: "All true — and all brochure. A feature list isn't a pillar until it's tied to a problem he stated. Connect or omit. +8" },
            { text: "Because you're sharp, you'll see this pays for itself within weeks.", quality: 1, tags: ["manipulation"],
              feedback: "'Pays for itself' is an implied revenue promise, wrapped in a compliment. Two violations in one sentence. Pillars carry facts, not vibes. -25" },
            { text: "Reason one: every top broker in your market is doing this — you don't want to be the last.", quality: 1, tags: ["pressure"],
              feedback: "Bandwagon pressure, and it invented a market trend you don't have. He asked for HIS reasoning, not everyone else's. -25" }
          ],
          teaching: "The three-pillar formula: 'Because you mentioned [problem], we [action], so [outcome].' If a claim can't be tethered to something the prospect said, leave it out." },
        { t: "say", who: "npc", emotion: "skeptical",
          text: "That one tracks — the memory thing is the real bottleneck. But I've been burned by 'we handle everything' before. What exactly stays mine?" },
        { t: "choose", stage: "recommend", tool: "anchor",
          setup: "Pillar two — the control pillar. State what stays his, plainly. No sweetening, no bending.",
          options: [
            { text: "Second: because you said the domain and client list are non-negotiable, both stay in your name — only who does the work changes.", quality: 3,
              feedback: "The control anchor, exactly as the terms stand: he keeps domain, content, customer data, payment accounts. Freedom drivers exhale at this line. +20" },
            { text: "You keep full control of everything that matters to you — I've made a note of it.", quality: 2, tags: ["off-frame"],
              feedback: "Warm but vague. 'Everything that matters' isn't a boundary — name the domain, the content, the client data. Vagueness reads as risk. +8" },
            { text: "And to make it easy, I'll drop you to three initial billing periods instead of six.", quality: 1, tags: ["terms-change"],
              feedback: "TERMS FOUL. The managed structure is six initial monthly billing periods, then month-to-month. You just rewrote Apohenia's agreement to win a smile. Biggest penalty in the game. -30" },
            { text: "Technically it all stays yours — but you won't want to leave once you see the results.", quality: 1, tags: ["manipulation"],
              feedback: "A lock-in wink plus a results promise. He was burned by exactly this line from the last three agencies. You just sounded like agency number four. -25" }
          ],
          teaching: "For autonomy drivers, state the control and exit points plainly — domain, content, data, and the month-to-month continuation after six initial billing periods. Never bend terms to close." },
        { t: "say", who: "npc", emotion: "impressed",
          text: "Six initial months, then month-to-month, and everything stays in my name. You're the first one to say the exit out loud. What's the third reason?" },
        { t: "choose", stage: "recommend", tool: null,
          setup: "Pillar three — then the check-back question that hands him the verdict.",
          options: [
            { text: "Third: because you don't want to be your own web department, hosting, security, and maintenance are included. Match the outcome you wanted?", quality: 3,
              feedback: "Third pillar tied to his stated dread, then 'Does that match the outcome you were looking for?' — his verdict, invited. Castle cleared. +20" },
            { text: "Third is reliability — the managed structure keeps everything running so you can focus on selling houses.", quality: 2, tags: ["off-frame"],
              feedback: "A decent pillar, but it paraphrases instead of quoting his stated problem, and it skips the check-back question. The pillars end with HIS verdict. +8" },
            { text: "Third — a broker of your stature will finally have a presence worthy of the name Cross Keys.", quality: 1, tags: ["flattery"],
              feedback: "Wrong driver AND empty praise. He's freedom-plus-logic; 'your stature' is a status play with no stated problem underneath it. -10" },
            { text: "That's the full case — shall we get you signed today? I only take on two builds a month.", quality: 1, tags: ["pressure"],
              feedback: "Fake scarcity to force the close, and it skips 'Does that match the outcome?' Pressure here would undo three perfect pillars. -25" }
          ],
          teaching: "Close the recommendation with 'Does that match the outcome you were looking for?' The prospect renders the verdict; the pillars just present the evidence." },
        { t: "say", who: "npc", emotion: "happy",
          text: "It matches. Bring the agreement Thursday — I'll read every line, and I expect it to say exactly what you just said." },
        { t: "end", outcome: "next-step", emotion: "impressed",
          text: "Three pillars, zero brochure-speak, and the fixed terms survived contact with a contract-reader. The Arena awaits." }
      ],
      starThresholds: [0.55, 0.8],
      unlockAfter: "lv-future-7"
    },

    // ────────────────────────────────────────────────────────────────────────
    // LEVEL 9 — OBJECTION ARENA — "Arena Qualifier"
    // NPC: service-business owner who values giving back. Primary: contribution.
    // Secondary: recognition. One full objection: "I already have a website."
    // Five steps: receive → clarify → isolate → resolve → decide.
    // ────────────────────────────────────────────────────────────────────────
    {
      id: "lv-objection-9",
      region: "objection-arena",
      name: "Arena Qualifier",
      subtitle: "Five steps, zero pressure",
      intro: "A beloved local shop owner thinks her old website settles the matter. It doesn't — unless it does.",
      npc: {
        id: "rosa-aguilar",
        name: "Rosa Aguilar",
        business: "Aguilar Plumbing & Heating",
        role: "Owner, 19 years",
        primary: "contribution",
        secondary: "recognition",
        personality: "Warm, plain-spoken, community-first. Judges every business — including hers — by how it treats people, and wants hers to look as good as it behaves.",
        portrait: { skin: "#a0684a", hair: "long-braid", hairColor: "#2b2b2b", outfit: "#b3541e", accessory: "none", bg: "#f6c8a8" }
      },
      teaches: ["decide"],
      beats: [
        { t: "say", who: "npc", emotion: "happy",
          text: "We're the shop that sponsors the youth league and checks Mrs. Abernathy's furnace for free every October. Nineteen years. Most of our work comes from folks who already know us." },
        { t: "say", who: "npc", emotion: "thinking",
          text: "I want the business to look the way it treats people. Right now someone new finds us online and sees… I don't know what they see. Something small." },
        { t: "identify", prompt: "Who are you talking to?",
          options: ["contribution", "recognition", "connection", "certainty", "status"],
          answer: { primary: "contribution", secondary: "recognition" },
          feedbackWin: "Right on both counts. 'Sponsors the youth league' and 'furnace for free' = contribution. 'Look the way it treats people' = recognition — she wants the outside to match the inside. +80",
          feedbackLose: "Re-listen: her proof points are all service — sponsorships, free furnace checks (contribution). And 'look the way it treats people' is about being seen accurately (recognition), not climbing above rivals (status).",
          points: 80 },
        { t: "choose", stage: "process", tool: null,
          setup: "Walk the current customer path — in the language of someone who measures a business by how it treats people.",
          options: [
            { text: "Walk me through what happens from the moment someone hears about you to the moment they're taken care of — and how folks feel at each step.", quality: 3,
              feedback: "Same master process question, translated: the path runs through how people are treated, because that's her yardstick. She settles in to tell you everything. +20" },
            { text: "What channels are currently bringing people in, and how long has it worked that way?", quality: 2, tags: ["wrong-archetype"],
              feedback: "A valid process question in neutral dialect — but 'channels' is plumbing talk about marketing, not people. For her, the path is about the folks walking it. +8" },
            { text: "Don't your neighbors deserve a business that looks as good as it treats them?", quality: 1, tags: ["manipulation"],
              feedback: "Guilt framing — using her own community values as leverage. Identity guides language; it never becomes a weapon. Ask, don't indict. -25" },
            { text: "Your site is probably costing you customers — let me show you what we'd build instead.", quality: 1, tags: ["premature-pitch"],
              feedback: "You assumed the site fails AND pitched, before walking a single step of the path. Diagnose before recommending — always. -15" }
          ],
          teaching: "Contribution drivers hear the process question through the people on it: how customers are treated at each step. Same frame, warmer key." },
        { t: "say", who: "npc", emotion: "annoyed",
          text: "Word of mouth, mostly. They call, we come, we fix it right. But the website form emails an address nobody's checked in two years. Folks who don't know us yet probably just give up." },
        { t: "choose", stage: "gap", tool: "mirror",
          setup: "Mirror the gap back at the depth she gave it — the people, not the plumbing.",
          options: [
            { text: "So the folks who don't know you yet — the ones the site is supposed to serve — are the ones quietly giving up. Accurate?", quality: 3,
              feedback: "Her exact words, human layer intact, checked with 'Accurate?' She feels heard, not handled. That's a mirror. +20" },
            { text: "So the contact form goes to an unchecked inbox — the core issue is follow-up?", quality: 2, tags: ["off-frame"],
              feedback: "Factually true, but you mirrored the mechanism and dropped the meaning. For her the gap isn't a mailbox — it's neighbors going unanswered. +8" },
            { text: "So every day that form sits broken, your community gets let down. How does that sit with you?", quality: 1, tags: ["manipulation"],
              feedback: "You twisted her service values into a guilt lever. Mirror what she said — never add shame she didn't bring. -25" },
            { text: "Honestly, for someone who does this much good, that's a heartbreaking gap.", quality: 1, tags: ["flattery"],
              feedback: "Praise with a sympathetic face is still praise. She stated a fact about her business; reflect the fact, skip the halo. -10" }
          ],
          teaching: "Mirror the human consequence the prospect stated — at their depth. Adding guilt or flattery distorts the reflection." },
        { t: "say", who: "npc", emotion: "thinking",
          text: "…Accurate. I don't love hearing it, but it's accurate. If someone reaches out for help and hears nothing, that's not who we are. So — what would this cost?" },
        { t: "choose", stage: "recommend", tool: "anchor",
          setup: "She jumped to price. Answer it honestly — but anchor the diagnosis first, in one breath.",
          options: [
            { text: "Before the numbers: what I heard is a shop that treats people right, with a site that doesn't. Is that accurate?", quality: 3,
              feedback: "The diagnostic check before any commercial answer — her own words, offered for confirmation. Now the numbers will land as a response, not a pitch. +20" },
            { text: "Fair question — you'll get exact numbers. Two structures, clear terms, in just a moment.", quality: 2, tags: ["off-frame"],
              feedback: "Calm and honest about the numbers, but it skips the confirm-the-summary beat. Diagnosis confirmed = recommendation trusted. +8" },
            { text: "The real question isn't what it costs — it's what doing nothing is already costing your community.", quality: 1, tags: ["pressure"],
              feedback: "Dodging a direct price question while pressing the guilt button. She asked a fair question; answer it straight after the check. -25" },
            { text: "Less than your last redesign — and this one will actually bring people in.", quality: 1, tags: ["manipulation"],
              feedback: "You quoted a price you don't know and promised an outcome nobody controls. Two inventions in one line. -25" }
          ],
          teaching: "Even at the price question, confirm the diagnosis first. Terms are fixed facts — deliver them plainly, right after the summary is confirmed." },
        { t: "say", who: "player", emotion: "neutral",
          text: "The managed structure is $197 a month for an initial six monthly billing periods, then month-to-month — no upfront build fee. Build, hosting, maintenance, and a working inquiry path included." },
        { t: "objection", objectionText: "I already have a website.",
          steps: [
            { step: "receive",
              npcLine: "Here's the thing — I already have a website. My nephew built the first one, and I paid real money for the last redesign.",
              options: [
                { text: "Understood — and I won't assume it's failing just because it's been a few years. Having a site is a starting point, not a verdict.", quality: 3,
                  feedback: "Clean receive: acknowledged, zero assumptions. Having a website says nothing about whether it works — and you said so out loud. +15" },
                { text: "That's fair — most established businesses have one by now.", quality: 2, tags: ["off-frame"],
                  feedback: "Polite, but you received the sentence instead of the concern. She's testing whether you'll respect what she already paid for. Acknowledge that. +8" },
                { text: "Sites built by nephews are usually the problem, honestly.", quality: 1, tags: ["manipulation"],
                  feedback: "You invented a problem with her site — and insulted her nephew — to create an opening. Never disparage the existing site. -25" }
              ] },
            { step: "clarify",
              npcLine: "I mean, it works. Mostly. I think? People who know us just call.",
              options: [
                { text: "Setting the site itself aside — how well is it taking care of the folks who find you cold, the ones who don't call?", quality: 3,
                  feedback: "The clarify question in her dialect: performance measured by how it treats strangers. 'Setting the site aside' keeps it non-personal. +15" },
                { text: "Do you know roughly how many inquiries it produces each month?", quality: 2, tags: ["wrong-archetype"],
                  feedback: "A legitimate clarify, but a cold metric for a warm driver. She measures the site by the people it serves, not the count it produces. +8" },
                { text: "It isn't really working, though, is it? You just said 'I think.'", quality: 1, tags: ["forced-agreement"],
                  feedback: "You grabbed her hedge and welded it into a concession. Clarify means finding out — not winning the sentence. -12" }
              ] },
            { step: "isolate",
              npcLine: "Honestly? New folks probably don't get far on it. But it exists, and I already paid for it once.",
              options: [
                { text: "If the site were consistently taking care of the people who find you, would there be any other reason to change anything?", quality: 3,
                  feedback: "Perfect isolate: one clean variable. If the site served people, stand down; if not, that's the whole case. Nothing else smuggled in. +15" },
                { text: "Is the real concern the site — or is it spending money twice on the same thing?", quality: 2, tags: ["off-frame"],
                  feedback: "Reasonable instinct, but you guessed at a second objection instead of isolating the first. Let her confirm the single sticking point. +8" },
                { text: "So we're agreed the site is the only issue — great, let's talk solutions.", quality: 1, tags: ["forced-agreement"],
                  feedback: "'We're agreed' — she agreed to nothing. Isolate is a question, not a lasso. -12" }
              ] },
            { step: "resolve",
              npcLine: "If it actually served people the way we do in person, no — no other reason. But it doesn't. The form's been broken for two years.",
              options: [
                { text: "Then the gap is real — and fixable. A rebuilt path means every neighbor who reaches out gets an answer. If it did, I'd say keep it.", quality: 3,
                  feedback: "The ethical resolve: address the stated gap factually, and state the stand-down condition out loud. If it worked, keep it — that's honesty she can feel. +15" },
                { text: "A rebuild would put your reviews, your story, and the youth league front and center.", quality: 2, tags: ["off-frame"],
                  feedback: "Appealing content — but it resolves with features instead of the gap she named. The broken form and unanswered neighbors are the case. +8" },
                { text: "Two years of a broken form — imagine how many people gave up on you. We have to fix this now.", quality: 1, tags: ["pressure"],
                  feedback: "Catastrophe math you invented, plus urgency. Resolve factually or don't resolve at all. -25" }
              ] },
            { step: "decide",
              npcLine: "…Okay. That's fair. So what happens now — do I have to decide today?",
              options: [
                { text: "Is it worth looking at what a rebuild involves — or is the honest conclusion that the current site is doing its job?", quality: 3,
                  feedback: "Both doors open, no thumb on the scale. A qualified no is a valid outcome — offering it is exactly why she'll say yes. +15" },
                { text: "No rush at all — I can send some information and we'll pick this up next week.", quality: 2, tags: ["off-frame"],
                  feedback: "Kind, but you abandoned the decision question she was ready to answer. Invite the clear decision; don't schedule around it. +8" },
                { text: "I can hold this exact pricing if you commit before Friday — after that, no promises.", quality: 1, tags: ["pressure"],
                  feedback: "Manufactured deadline AND a hint that fixed terms move. Apohenia's prices don't have a shot clock. -25" }
              ] }
          ] },
        { t: "say", who: "npc", emotion: "impressed",
          text: "No — it is not doing its job, and we both know it now. Show me what a rebuild involves. And I read agreements, so make sure it matches what you say." },
        { t: "end", outcome: "next-step", emotion: "happy",
          text: "Qualifier cleared: received, clarified, isolated, resolved, decided — with zero pressure and zero invented problems. The Summit is next." }
      ],
      starThresholds: [0.55, 0.8],
      unlockAfter: "lv-recommend-8"
    },

    // ────────────────────────────────────────────────────────────────────────
    // LEVEL 10 — CLOSING SUMMIT — "The Clean Close"
    // NPC: quality-driven custom-furniture maker. Primary: recognition.
    // Secondary: status. Mini capstone: say → identify → one choose per stage
    // pair → offer (ownership — he stated one defined build + full control
    // afterward) → objection ("Can you guarantee leads?") → clean close.
    // A clean no-fit would have been an equal win.
    // ────────────────────────────────────────────────────────────────────────
    {
      id: "lv-closing-10",
      region: "closing-summit",
      name: "The Clean Close",
      subtitle: "The whole funnel, one craftsman, no shortcuts",
      intro: "A master craftsman has heard every pitch and every promise. Bring the whole frame — and nothing but the frame.",
      npc: {
        id: "elias-thorn",
        name: "Elias Thorn",
        business: "Thorn & Timber Fine Furniture",
        role: "Master Craftsman & Owner",
        primary: "recognition",
        secondary: "status",
        personality: "Gruff, exacting, quietly proud. Detects flattery instantly and respects only evidence, precision, and straight answers.",
        portrait: { skin: "#caa07a", hair: "short-crop", hairColor: "#6e6e6e", outfit: "#4a3b2a", accessory: "beard", bg: "#d8c9a8" }
      },
      teaches: ["open", "experience", "gap", "recommend", "decide"],
      beats: [
        { t: "say", who: "npc", emotion: "neutral",
          text: "Every joint hand-cut, every finish rubbed for a week. Clients send me photos of tables I built their grandfathers. My website shows three blurry pictures and a phone number." },
        { t: "say", who: "npc", emotion: "guarded",
          text: "And I'll save you the pitch: I want one project, one price, and I own the thing when it's done. My apprentice handles our computers — I don't need a landlord for a website." },
        { t: "identify", prompt: "Who are you talking to?",
          options: ["recognition", "status", "intelligence", "freedom", "certainty"],
          answer: { primary: "recognition", secondary: "status" },
          feedbackWin: "Summit-level read. 'Photos of tables I built their grandfathers' vs 'three blurry pictures' = recognition — real quality going unseen. 'I'll save you the pitch' and 'a landlord for a website' = status. +80",
          feedbackLose: "Re-listen: the sting in his story is quality going UNSEEN — that's recognition. The crisp 'one project, one price, I'll save you the pitch' is authority — status. Freedom is close, but he leads with the work, not the control.",
          points: 80 },
        { t: "choose", stage: "open", tool: null,
          setup: "Set the frame. He respects precision and punishes flattery. (Open + intent pair)",
          options: [
            { text: "Agenda: how customers find you, what the site must say about your quality, where it falls short — then a straight yes-or-no on fit. Fair?", quality: 3,
              feedback: "The recognition-flavored open: permission, transparency, purpose — all aimed at 'the quality you've built.' He gives a single nod. That's a parade, from him. +20" },
            { text: "I'd like to ask a few questions about your current setup and what you want the site to accomplish. Sound fair?", quality: 2, tags: ["wrong-archetype"],
              feedback: "The neutral open — honest and structured, but it could be said to anyone. He asked for substance; season it with the quality gap he just described. +8" },
            { text: "Your work is clearly the best in the region — I already know exactly what you need.", quality: 1, tags: ["flattery"],
              feedback: "He warned you: the flattery-to-substance ratio is being measured. You opened with dessert and claimed the diagnosis for free. -10" },
            { text: "I only work with elite craftsmen, so let's keep this quick — which package do you want?", quality: 1, tags: ["premature-pitch"],
              feedback: "Status-bait flattery plus a package pitch in the OPEN. You skipped the entire funnel in one sentence. -15" }
          ],
          teaching: "The open is the same for every archetype — permission, transparency, purpose. Recognition drivers need it aimed at the gap between their quality and its presentation." },
        { t: "say", who: "npc", emotion: "guarded",
          text: "Fair. Ask your questions. But know I've sat through four of these calls, and the flattery-to-substance ratio has been grim." },
        { t: "choose", stage: "experience", tool: "probe",
          setup: "Evidence time: get the underestimation incidents. (Experience + process pair)",
          options: [
            { text: "What have you seen or heard that confirms customers aren't recognizing the quality you've actually built?", quality: 3,
              feedback: "The recognition experience question, verbatim from the master frame. He can't answer this without giving you evidence — and evidence is his native tongue. +20" },
            { text: "How do customers currently find and contact the business?", quality: 2, tags: ["wrong-archetype"],
              feedback: "A valid process question — but neutral, and it skips the evidence hunt. With him, go straight for the underestimation incidents. +8" },
            { text: "It must be frustrating, being that good and still getting overlooked.", quality: 1, tags: ["flattery"],
              feedback: "Validation instead of a question. Recognition drivers validate through evidence, not sympathy — ask for the incident, skip the pat on the back. -10" },
            { text: "Competitors with worse work and better sites are eating your lunch, aren't they?", quality: 1, tags: ["pressure"],
              feedback: "Invented rivalry plus a leading 'aren't they.' You have no evidence for that claim — and he notices claims without evidence. -25" }
          ],
          teaching: "Recognition drivers hand you proof when you ask for it: underestimation incidents, surprise moments, hidden evidence. Compliments are a counterfeit of that." },
        { t: "say", who: "npc", emotion: "annoyed",
          text: "A client drove ninety minutes to the workshop. Said she'd almost commissioned a factory piece because my site 'looked like a hobby.' Ninety minutes, to tell me my life's work looked like a hobby." },
        { t: "choose", stage: "gap", tool: "mirror",
          setup: "Mirror the gap AND what it costs going forward — his version, not a horror film. (Gap + future pair)",
          options: [
            { text: "So the craft is there, but the site undersells it — and collectors comparing you online would never know the difference until they visit?", quality: 3,
              feedback: "The recognition mirror: reality vs. presentation, with the future cost stated as a calm projection, not a threat. He taps the table — his version of applause. +20" },
            { text: "So the real issue is the photos — the site needs to show the work better?", quality: 2, tags: ["off-frame"],
              feedback: "Surface mirror. The photos are the symptom; the gap is master-level work being read as a hobby at the moment of first contact. Go deeper. +8" },
            { text: "So every month this continues, your legacy quietly goes to factory furniture.", quality: 1, tags: ["manipulation"],
              feedback: "You turned one client's comment into a legacy funeral. Cost of inaction must stay analytical — this is grief marketing. -25" },
            { text: "That's criminal. A craftsman of your stature, humiliated by a website.", quality: 1, tags: ["flattery"],
              feedback: "Outrage-flattery is still flattery. He gave you evidence; reflect the evidence, don't embroider it. -10" }
          ],
          teaching: "Mirror the recognition gap at the depth it was stated: real quality, unseen at the moment it matters. No dramatizing, no decorating." },
        { t: "say", who: "npc", emotion: "neutral",
          text: "Right. So — one defined build. Fixed price. I own it after, and my apprentice runs it. If that's not how you work, tell me now and we'll part as gentlemen." },
        { t: "offer",
          setup: "Stated needs: ONE defined build at a fixed price, then full ownership — his apprentice will handle hosting, maintenance, and updates in-house.",
          options: ["managed", "ownership", "custom", "none"],
          answer: "ownership",
          feedback: {
            managed: "Wrong fit THIS time. Managed is $197/mo for strategy, build, hosting, security, monitoring, maintenance, and support — ongoing management he just explicitly declined. Fit the offer to stated needs, not to habit.",
            ownership: "Correct. $1,000 one time: a defined client-specific build, responsive design, basic SEO foundation, two consolidated revision rounds, then launch or handoff to hosting HE controls. Ongoing hosting, maintenance, and updates are not included — which is exactly what he asked for. +40",
            custom: "Premature. Nothing he described sits outside the defined website scope — no CRM, no automation, no unscoped integrations. Custom means a separate audit and written scope, and there's nothing here to scope.",
            none: "A clean no-fit is a real win — when there's no fit. Here his needs map one-to-one onto the ownership structure. Declining this would be a missed fit, not an honest one."
          } },
        { t: "say", who: "npc", emotion: "skeptical",
          text: "Good — you listened. One more thing, and answer straight: can you guarantee leads? Because the last fellow promised me the moon." },
        { t: "objection", objectionText: "Can you guarantee leads?",
          steps: [
            { step: "receive",
              npcLine: "Can you guarantee leads? Straight answer — I've heard every promise there is.",
              options: [
                { text: "A straight question — and you'll get the same standard of honesty from me that you put into your work.", quality: 3,
                  feedback: "Received with respect, in his currency: standards. You set up a plain answer instead of a dodge or a promise. +15" },
                { text: "Fair to ask before committing to anything.", quality: 2, tags: ["off-frame"],
                  feedback: "Harmless, but generic — it doesn't meet his demand for a straight answer. He asked a yes/no question; prepare a yes/no answer. +8" },
                { text: "If I couldn't guarantee results, I wouldn't be standing here.", quality: 1, tags: ["manipulation"],
                  feedback: "That's a guarantee — the one thing Apohenia never gives. Leads, revenue, rankings: no honest provider promises them. -25" }
              ] },
            { step: "clarify",
              npcLine: "I want to know this thing earns its keep. A thousand dollars is a week of walnut.",
              options: [
                { text: "When you say leads — a specific number per month, or confidence the site is built to turn interest into real inquiries?", quality: 3,
                  feedback: "The exact clarify: contract number vs. a well-built asset. Now you know which question you're actually answering. +15" },
                { text: "Is this about protecting the business from wasted spend?", quality: 2, tags: ["off-frame"],
                  feedback: "Close, but you guessed at the motive instead of clarifying the ask. 'Guarantee' can mean a number or a standard — find out which. +8" },
                { text: "What if I told you a site like this could double your commissions within a year?", quality: 1, tags: ["manipulation"],
                  feedback: "An invented revenue projection offered as bait. Apohenia never guarantees leads, revenue, or rankings — not even softly, not even to save a deal. -25" }
              ] },
            { step: "isolate",
              npcLine: "A number would be nice, but mostly I don't want to be made a fool of again.",
              options: [
                { text: "If I'm completely straight about what we control and what we don't, is that the main thing standing between you and a decision?", quality: 3,
                  feedback: "Clean isolate: one variable — honesty about the line. If yes, resolve it and the deal decides itself. +15" },
                { text: "So the guarantee is the sticking point — or is the price still open as well?", quality: 2, tags: ["off-frame"],
                  feedback: "Reasonable probe, but you're adding variables at the isolate step. Pin the ONE thing first; the price is already on the table. +8" },
                { text: "So if I say yes, we have a deal — yes? Great.", quality: 1, tags: ["forced-agreement"],
                  feedback: "You answered FOR him and shook your own hand. Isolate is a question; this was a lasso. -12" }
              ] },
            { step: "resolve",
              npcLine: "…Alright. Give me the straight version.",
              options: [
                { text: "No — Apohenia doesn't guarantee leads or revenue; no honest provider can. What's controlled: the defined build, launch, and SEO foundation.", quality: 3,
                  feedback: "The plain no, then the pivot to what IS controlled — scope, not outcomes. We control the quality of the asset; the market controls the outcome. +15" },
                { text: "No one can promise numbers. What I can promise is a site that tells the truth about your work.", quality: 2, tags: ["off-frame"],
                  feedback: "Right spirit — but he asked a yes/no question and you opened with 'no one can.' Say the plain NO first, then pivot to what's controlled. +8" },
                { text: "Between us — the leads basically guarantee themselves once the site looks this good.", quality: 1, tags: ["manipulation"],
                  feedback: "A guarantee in a trench coat. 'Basically guarantee' is a guarantee, and it's the line that burns craftsmen like him. -25" }
              ] },
            { step: "decide",
              npcLine: "Hmh. That's the first honest answer I've gotten on that question.",
              options: [
                { text: "Knowing exactly where the line is — what we build and stand behind versus what no one can promise — does the structure still make sense?", quality: 3,
                  feedback: "The decide question, built on the honesty itself. He can say yes to the structure or no to the fit — both are clean outcomes. +15" },
                { text: "Would you like to move forward with the ownership structure?", quality: 2, tags: ["off-frame"],
                  feedback: "A fair decision question — it just doesn't bank the honesty you just earned. Connect the decision to the line you drew. +8" },
                { text: "Tell you what — I'll pencil in a 'lead guarantee' and knock it to $900 if we shake on it today.", quality: 1, tags: ["terms-change"],
                  feedback: "Double foul: an invented guarantee AND an invented discount. Terms are fixed — $1,000 one time, and no guarantees exist at any price. -30" }
              ] }
          ] },
        { t: "say", who: "npc", emotion: "impressed",
          text: "It does. Send the agreement — one project, one price, my name on everything when it's done. Elias Thorn doesn't shake on anything less than exactly that." },
        { t: "end", outcome: "close", emotion: "happy",
          text: "Closed — clean: no pressure, no promises, no bent terms. And had his needs matched neither structure, an honest 'we're not your fit' would have been the same kind of win. SUMMIT CONQUERED." }
      ],
      starThresholds: [0.55, 0.8],
      unlockAfter: "lv-objection-9"
    }
  ]
};
