// APOHENIA: SALES QUEST — Bosses part (20-bosses.js)
// Plain JS, no modules. Defines window.__SQ_PARTS["bosses"].
// Every boss: Receive → Clarify → Isolate → Resolve → Decide. Exactly one quality:3 per round.

window.__SQ_PARTS = window.__SQ_PARTS || {};

window.__SQ_PARTS["bosses"] = { bosses: [

  {
    id: "boss-think-about-it",
    name: "The Hesitation Wall",
    objectionText: "I need to think about it.",
    npc: {
      id: "walt-dempsey",
      name: "Walt Dempsey",
      business: "Dempsey's Hardware",
      role: "Owner, 30 years",
      primary: "certainty",
      secondary: "intelligence",
      personality: "Deliberate and exact. Walt measures twice and cuts once; he relaxes only when terms, responsibility, and sequence are spelled out in writing.",
      portrait: { skin: "#e9b98d", hair: "side-part", hairColor: "#b8b8c0", outfit: "#31456b", accessory: "glasses", bg: "#cfe3f5" }
    },
    intro: [
      { t: "say", who: "narrator", text: "The Arena gates grind open. A brick wall of pure hesitation blocks the path — and behind it, Walt Dempsey, arms folded, reading the agreement line by line.", emotion: "neutral" },
      { t: "say", who: "npc", text: "Everything you've said makes sense. The scope is clear, the price is clear. And still — I need to think about it.", emotion: "thinking" }
    ],
    rounds: [
      {
        step: "receive",
        npcLine: "I need to think about it.",
        options: [
          { text: "That is reasonable. Clarity should come before commitment — it deserves real thought.", quality: 3, feedback: "Perfect receive. You honored the hesitation instead of fighting it — Walt's shoulders drop an inch. For a certainty-driven owner, permission to think is respect. +15", tags: [] },
          { text: "Of course — no pressure at all. I'll check back with you sometime soon.", quality: 2, feedback: "Warm and harmless, but 'sometime soon' is a fog. You received the objection without anchoring what happens next. +8", tags: ["off-frame"] },
          { text: "What is there to think about? We just went over everything in detail.", quality: 1, feedback: "Ouch. That calls his caution a flaw — and caution is Walt's whole operating system. The Wall grows a foot taller. Challenging his process is pressure in disguise.", tags: ["pressure"] },
          { text: "Most owners find the first month pays for itself — want me to just get you started?", quality: 1, feedback: "That's a steamroll, not a receive. You invented an ROI claim AND skipped his concern entirely. The Wall is now load-bearing.", tags: ["pressure", "manipulation"] }
        ]
      },
      {
        step: "clarify",
        npcLine: "I just want to be sure I'm not missing something before I commit to a monthly arrangement.",
        options: [
          { text: "Which risk or responsibility still feels insufficiently clear?", quality: 3, feedback: "Exact clarify, in Walt's own certainty language. You turned a vague cloud into a named variable he can hand you. The Wall develops a visible crack. +15", tags: [] },
          { text: "Is it the price, or the commitment?", quality: 2, feedback: "A real question, but you guessed two options for him instead of asking what's unresolved. Narrow menus miss the true variable. +8", tags: ["skips-discovery"] },
          { text: "Is it because you're not sure it'll bring customers? Because it definitely will.", quality: 1, feedback: "You answered a question he never asked — with a promise no one can keep. Apohenia never guarantees outcomes, and Walt just wrote that down.", tags: ["manipulation"] },
          { text: "Everyone feels this way right before they sign. It's completely normal.", quality: 1, feedback: "Forced agreement dressed as reassurance. You told him his caution is a formality — he hears that as disrespect for a 30-year decision process.", tags: ["forced-agreement"] }
        ]
      },
      {
        step: "isolate",
        npcLine: "Mostly what happens if the site ever needs fixing, and what exactly I'm locked into.",
        options: [
          { text: "If we clarified those two points in writing, would anything else prevent you from making a decision?", quality: 3, feedback: "Textbook isolate. Now there are exactly two variables — not a fog of doubt — and Walt has confirmed the whole battlefield. +15", tags: [] },
          { text: "Both of those are covered in the agreement, don't worry. Anything else?", quality: 2, feedback: "Right destination, wrong route — you reassured before isolating. 'Don't worry' is not documentation, and he almost said a third thing. +8", tags: ["skips-discovery"] },
          { text: "If I answer those two things, you'll sign today, right?", quality: 1, feedback: "Isolation is a diagnostic tool, not a trap. Walt hears a closing ambush and the shutters come down.", tags: ["pressure"] },
          { text: "Honestly the lock-in is basically nothing. You can leave whenever you want.", quality: 1, feedback: "That misstates the terms — there are six initial billing periods, then month-to-month. Blurring terms to soothe is how deals become disputes.", tags: ["manipulation"] }
        ]
      },
      {
        step: "resolve",
        npcLine: "Yes — if I know who's responsible when something breaks, and exactly how the term works, I believe I'd be settled.",
        options: [
          { text: "In writing: Apohenia handles hosting, security, monitoring, and maintenance. Six initial billing periods, then month-to-month.", quality: 3, feedback: "Precise, documented, sequential — the exact resolve a certainty archetype needs. You fixed the variable with facts, not comfort. The crack widens. +15", tags: [] },
          { text: "All of that's covered by the managed plan — you won't be left figuring anything out alone.", quality: 2, feedback: "True and warm, but vague. 'Covered' isn't the same as named responsibility and exact terms. Walt almost relaxes. +8", tags: ["wrong-archetype"] },
          { text: "Honestly, nothing ever breaks. Our sites are bulletproof.", quality: 1, feedback: "A claim you cannot support — monitoring and maintenance exist precisely because things DO happen. False certainty is the one thing Walt can't buy.", tags: ["manipulation"] },
          { text: "Tell you what — for you, I'll drop the six-month term entirely.", quality: 1, feedback: "Terms are identical for every client; that consistency is what keeps the process fair. Trading terms for a signature teaches Walt your word bends.", tags: ["terms-change"] }
        ]
      },
      {
        step: "decide",
        npcLine: "Alright. That does settle it. So what happens now?",
        options: [
          { text: "I send the agreement today, we schedule onboarding, and the build starts. Would you like to move forward?", quality: 3, feedback: "Clean decide: mechanical next step, calm direct question, no confetti. Walt nods once — the highest honor a hardware man bestows. +15", tags: [] },
          { text: "I'll email you the agreement — take a look and let me know.", quality: 2, feedback: "Reasonable, but 'let me know' leaves the decision floating. A specific next step would serve him better. +8", tags: ["off-frame"] },
          { text: "Great — I'll start the build tonight and we can sort the paperwork later.", quality: 1, feedback: "Work begins under the agreement — for every client, without exception. Starting informally erases the structure that protects you both.", tags: ["off-frame"] },
          { text: "Before you change your mind, I can take a card payment over the phone right now.", quality: 1, feedback: "That punishes his clarity with a rush. He earned this decision through process — let him keep it. Pressure here poisons a clean yes.", tags: ["pressure"] }
        ]
      }
    ],
    winText: "The Hesitation Wall crumbles — not from force, but from clarity. Walt signs with both eyes open and shakes your hand like a contract clause.",
    loseText: "The Wall stands. Too many answers pushed or blurred, and Walt retreats behind 'I'll think about it' — possibly forever. Study the five steps and challenge it again.",
    ethicalNote: "Reflection is not resistance. Never manufacture urgency or treat 'I need to think about it' as a brush-off to defeat — clarify the real variable, or set an exact follow-up date."
  },

  {
    id: "boss-costs-too-much",
    name: "The Sticker-Shock Golem",
    objectionText: "It costs too much.",
    npc: {
      id: "rex-banner",
      name: "Rex Banner",
      business: "Ironworks Fitness",
      role: "Founder & Head Coach",
      primary: "growth",
      secondary: "status",
      personality: "Booming, competitive, allergic to stagnation. Rex counts everything — reps, members, dollars — and respects people who don't flinch.",
      portrait: { skin: "#c98a5e", hair: "buzz", hairColor: "#2b2b2b", outfit: "#e8590c", accessory: "none", bg: "#ffd9a0" }
    },
    intro: [
      { t: "say", who: "narrator", text: "Deeper in the Arena, a golem made of price tags blocks the bridge. Rex Banner cracks his knuckles on top of it, grinning like this is cardio.", emotion: "neutral" },
      { t: "say", who: "npc", text: "Look, I like the plan. I like YOU. But $197 a month? It costs too much.", emotion: "skeptical" }
    ],
    rounds: [
      {
        step: "receive",
        npcLine: "It costs too much.",
        options: [
          { text: "Understood. Spending should produce movement, not just cost.", quality: 3, feedback: "Perfect receive in Rex's growth language — you treated his money like fuel that must earn its burn. He stops grinning and starts listening. +15", tags: [] },
          { text: "That's a fair reaction. The price should make sense relative to what it produces.", quality: 2, feedback: "Solid neutral receive — honest and calm — but not yet translated into Rex's forward-motion language. +8", tags: ["wrong-archetype"] },
          { text: "Actually, $197 is really cheap compared to what most agencies charge.", quality: 1, feedback: "'Cheap' defends the number instead of examining the value — and it subtly dismisses his judgment. Rex hears weakness, not savings.", tags: ["off-frame"] },
          { text: "If you sign today, I can knock 20% off.", quality: 1, feedback: "Invented discounts are never on the table — terms are the same for every client. You just taught the Golem its favorite trick: haggling.", tags: ["terms-change"] }
        ]
      },
      {
        step: "clarify",
        npcLine: "I'm pouring money into a second location. Every dollar has to justify itself.",
        options: [
          { text: "Is the concern that the return is unclear, or that the money is better deployed elsewhere right now?", quality: 3, feedback: "Exact clarify. 'Expensive' splits into two very different problems — unclear value or competing priority — and now you know which fight you're in. +15", tags: [] },
          { text: "Compared to what — a different solution, a past project, or more than you expected to invest?", quality: 2, feedback: "A real clarifying question, but the neutral version. It frames the comparison, not the return Rex actually cares about. +8", tags: ["wrong-archetype"] },
          { text: "You can't afford NOT to do this — think of the members you're losing every day.", quality: 1, feedback: "Manufactured fear and a fake urgency lever. You invented losses he never reported. The Golem eats pressure for breakfast.", tags: ["pressure"] },
          { text: "So it's not really about the price, is it?", quality: 1, feedback: "You told him what he means instead of asking. Even when the guess is right, seizing the diagnosis off-frames the whole conversation.", tags: ["off-frame"] }
        ]
      },
      {
        step: "isolate",
        npcLine: "The return, honestly. I need to know this moves the needle, not just looks pretty.",
        options: [
          { text: "If the price made complete sense relative to what's included, is there anything else holding the decision back?", quality: 3, feedback: "Clean isolate. One variable on the table: value. Rex confirmed nothing else is lurking — now you can resolve with precision. +15", tags: [] },
          { text: "Fair enough. And besides the return question, we're good on everything else?", quality: 2, feedback: "The right instinct with a wobble — 'we're good?' invites a reflex yes instead of a real check. Isolate, don't assume. +8", tags: ["forced-agreement"] },
          { text: "If I show you the return on paper, you commit right now. Deal?", quality: 1, feedback: "Isolation is a flashlight, not a handcuff. Turning his answer into a closing trap is pressure, and Rex can smell a trap from across the gym.", tags: ["pressure"] },
          { text: "The return will be huge, trust me.", quality: 1, feedback: "'Trust me' plus an invented outcome — two banned moves in six words. Apohenia promises a foundation, never a revenue number.", tags: ["manipulation"] }
        ]
      },
      {
        step: "resolve",
        npcLine: "Alright, coach. Show me what $197 a month actually buys.",
        options: [
          { text: "It builds a site designed to turn interest into inquiries, with basic lead delivery — and honestly, no one can promise revenue results.", quality: 3, feedback: "Growth resolve done right: momentum framing plus the honest ceiling. You sold the foundation without selling a fantasy. The Golem staggers. +15", tags: [] },
          { text: "Strategy, design, build, hosting, security, maintenance, and support — all covered monthly, no upfront fee.", quality: 2, feedback: "Accurate scope, but a parts list isn't an argument. Connect it to what it BUILDS for the second location. +8", tags: ["wrong-archetype"] },
          { text: "Most clients double their inquiries in the first few months.", quality: 1, feedback: "Invented statistics are guarantees wearing a lab coat. No one can promise lead volume — Rex's BS detector just hit a new max.", tags: ["manipulation"] },
          { text: "For you, I'll throw in six months of paid ads, free.", quality: 1, feedback: "Paid ads are separately scoped services — never folded into a website plan to sweeten it. You just broke scope AND terms in one rep.", tags: ["terms-change"] }
        ]
      },
      {
        step: "decide",
        npcLine: "Okay. The second location still comes first — but I can see what it builds.",
        options: [
          { text: "Now that the full scope is on the table, does the structure make sense at $197 — or is the honest answer not right now?", quality: 3, feedback: "A decide that permits either answer. No flinch, no push — and 'honest answer' gives Rex a dignified door either way. He respects that. +15", tags: [] },
          { text: "Would it help to set a specific date to revisit once the second location is settled?", quality: 2, feedback: "Legitimate move, but you steered to delay before asking for a decision. Let him choose the branch. +8", tags: ["off-frame"] },
          { text: "The second location will fail without a proper website — you need this first.", quality: 1, feedback: "Predicting his business fails without you is fearmongering, and it insults his judgment. The Golem regenerates completely.", tags: ["pressure"] },
          { text: "Let me start you at $97 for the first six months, then we revisit.", quality: 1, feedback: "Invented price reduction. Terms are identical for every client — that consistency is the product's integrity, not a negotiation tactic.", tags: ["terms-change"] }
        ]
      }
    ],
    winText: "The Sticker-Shock Golem collapses into a pile of receipts. Rex signs, then immediately asks if you do personal training for sales teams.",
    loseText: "The Golem holds the bridge. Too much pressure or fuzzy value-talk, and Rex chalks his hands and walks. Value first, decision second — try again.",
    ethicalNote: "Never reduce price, invent discounts, or create deadline pressure to make the number feel smaller. If the value cannot be established honestly, say so."
  },

  {
    id: "boss-speak-with-partner",
    name: "The Third Chair Phantom",
    objectionText: "I need to speak with my partner.",
    npc: {
      id: "dana-whitfield",
      name: "Dana Whitfield",
      business: "Whitfield's Café & Bakery",
      role: "Co-owner",
      primary: "connection",
      secondary: "certainty",
      personality: "Warm, thorough, and fiercely loyal to her business partner and wife, June. Dana decides jointly and trusts slowly — but completely, once trust lands.",
      portrait: { skin: "#f6d7b8", hair: "bun", hairColor: "#5b3a1e", outfit: "#d6336c", accessory: "earring", bg: "#ffe3ec" }
    },
    intro: [
      { t: "say", who: "narrator", text: "At the Arena's center, an empty chair floats beside Dana Whitfield. A translucent phantom sits in it, sipping invisible coffee. It does not look hostile. It looks... consulted.", emotion: "neutral" },
      { t: "say", who: "npc", text: "This all sounds genuinely lovely. But June and I decide these things together — I need to speak with my partner.", emotion: "thinking" }
    ],
    rounds: [
      {
        step: "receive",
        npcLine: "I need to speak with my partner.",
        options: [
          { text: "Of course. Decisions made together hold together.", quality: 3, feedback: "Perfect receive. You treated the partnership as a strength, not a speed bump — Dana visibly relaxes. For a connection archetype, that sentence is everything. +15", tags: [] },
          { text: "Absolutely — a decision that affects the business should include everyone it affects.", quality: 2, feedback: "Respectful and true, though slightly formal for someone who leads with warmth. Good receive, not yet in her language. +8", tags: ["wrong-archetype"] },
          { text: "Is your partner really involved in decisions like this, though?", quality: 1, feedback: "You just questioned her partner's seat at the table. Partners are invited into the process, never audited as obstacles. The Phantom hisses.", tags: ["manipulation"] },
          { text: "You seem like the one who really runs this place — you could just decide.", quality: 1, feedback: "Flattery with a knife in it: you're coaching her to bypass June. A solo yes here becomes a cancelled agreement later.", tags: ["manipulation", "flattery"] }
        ]
      },
      {
        step: "clarify",
        npcLine: "She handles the books and the contracts. She'll want to know exactly what we'd be signing up for.",
        options: [
          { text: "What would your partner need to feel comfortable and genuinely included in this?", quality: 3, feedback: "Exact clarify in Dana's language — comfort and inclusion, not just information. She leans in; June is already halfway won. +15", tags: [] },
          { text: "What questions is she most likely to raise — cost, terms, or the timeline?", quality: 2, feedback: "A useful, specific question — but it treats June as a checklist to satisfy rather than a person to include. +8", tags: ["wrong-archetype"] },
          { text: "Just tell her it's $197 a month and that it's a great deal. She'll be fine.", quality: 1, feedback: "That's a retelling, not information — vague facts relayed secondhand are how partner conversations die. Equip, don't summarize.", tags: ["off-frame"] },
          { text: "And if she says no, what will you do?", quality: 1, feedback: "You're gaming out a conflict between them before one exists. Cornering Dana against her own partner is pressure with extra steps.", tags: ["pressure"] }
        ]
      },
      {
        step: "isolate",
        npcLine: "Honestly, I think she'll be fine if the terms are clear. I just don't want any surprises at home.",
        options: [
          { text: "Setting the partner conversation aside, is there anything on your side that still feels unresolved about the fit?", quality: 3, feedback: "Textbook isolate. You separated her decision from the joint one — now you know whether 'partner' is the only open variable. +15", tags: [] },
          { text: "Good instinct. And for you personally — the offer itself feels right?", quality: 2, feedback: "The right idea in softer form. It checks her side but doesn't cleanly isolate it from June's. +8", tags: ["off-frame"] },
          { text: "Then let's get you signed today, and she can read the agreement after.", quality: 1, feedback: "That's closing around June — the exact bypass this boss exists to punish. A signature that surprises a partner is a refund request in waiting.", tags: ["manipulation"] },
          { text: "Partners always say yes when the numbers work. Let's not overthink it.", quality: 1, feedback: "Forced agreement, plus you dismissed the person she loves most as a formality. Dana's warmth drops ten degrees.", tags: ["forced-agreement"] }
        ]
      },
      {
        step: "resolve",
        npcLine: "No, the fit feels right to me. I just want her to hear it properly — not my half-remembered version.",
        options: [
          { text: "I'll put the scope, price, term, and ownership in writing, so she reviews the facts — not a summary from memory.", quality: 3, feedback: "Exact resolve: you made the partner conversation evidence-based. Dana nearly applauds — nothing depends on her reciting details at the dinner table. +15", tags: [] },
          { text: "I'll send a one-pager covering the basics that you can show her.", quality: 2, feedback: "Helpful, but 'the basics' is thin. June handles contracts — she'll want scope, price, term, and ownership exactly. +8", tags: ["wrong-archetype"] },
          { text: "Just tell her all the other cafés in town are already doing it.", quality: 1, feedback: "A social-proof bluff — and an unverifiable one. Coaching a client on what to say to their partner is manipulation, full stop.", tags: ["manipulation"] },
          { text: "Tell her if she's not happy in a month, we'll refund everything.", quality: 1, feedback: "You just invented a refund policy that doesn't exist. Facts are the same for every client — never improvise terms to ease a conversation.", tags: ["terms-change"] }
        ]
      },
      {
        step: "decide",
        npcLine: "That would help a lot. When could something like that actually happen?",
        options: [
          { text: "Would it help to include her in a short follow-up, so she hears the exact scope, terms, and trade-offs directly? Thursday works.", quality: 3, feedback: "The clean decide: June invited IN, a specific time named, facts firsthand. The Phantom solidifies, smiles, and shakes your hand. +15", tags: [] },
          { text: "I'll call you Friday afternoon to hear what came up — does that work?", quality: 2, feedback: "A real next step with a date — but June still hears everything secondhand. The joint call is stronger. +8", tags: ["off-frame"] },
          { text: "Let's just sign now and surprise her with the new website.", quality: 1, feedback: "A surprise is not a gift when it comes with a contract. Bypassing June detonates the trust you spent the whole call building.", tags: ["manipulation"] },
          { text: "If she has doubts, send her to me and I'll handle her.", quality: 1, feedback: "'Handle her.' You turned a respected partner into a problem to be managed. Dana heard it. The Phantom heard it. Everyone heard it.", tags: ["manipulation"] }
        ]
      }
    ],
    winText: "The Third Chair Phantom takes solid form — it's June, and she brought pastries. The follow-up call is booked for Thursday, with everyone in the same room.",
    loseText: "The Phantom fades, unimpressed. You treated the partnership as friction, and Dana politely shows you the door. Partners are invited in — never worked around.",
    ethicalNote: "A partner is invited into the process, never bypassed. Never coach the prospect on how to 'handle' a partner or close around them — offer a joint follow-up where everyone hears the same facts."
  },

  {
    id: "boss-already-have-website",
    name: "The Invisible Fence",
    objectionText: "I already have a website.",
    npc: {
      id: "victor-ashford",
      name: "Victor Ashford",
      business: "Ashford & Reed Accounting",
      role: "Managing Partner",
      primary: "status",
      secondary: "intelligence",
      personality: "Composed, precise, quietly proud of the firm he built. Victor speaks in measured sentences and expects to be addressed as a peer, never pitched at.",
      portrait: { skin: "#e9b98d", hair: "side-part", hairColor: "#2b2b2b", outfit: "#31456b", accessory: "glasses", bg: "#dce4f2" }
    },
    intro: [
      { t: "say", who: "narrator", text: "A pristine glass fence shimmers across the Arena floor — you can see through it, but you can't pass. Victor Ashford stands behind it, adjusting his cufflinks.", emotion: "neutral" },
      { t: "say", who: "npc", text: "I should save you some time. The firm already has a website.", emotion: "guarded" }
    ],
    rounds: [
      {
        step: "receive",
        npcLine: "I already have a website.",
        options: [
          { text: "Of course. A firm at your level has a presence — the question is whether it keeps pace with the firm.", quality: 3, feedback: "Perfect receive: you accepted the fact AND reframed it around his standard, not your pitch. Victor's eyebrow rises — respectfully. +15", tags: [] },
          { text: "Understood — having a site in place is a starting point, not a verdict.", quality: 2, feedback: "Calm and correct, but generic. It doesn't yet speak to the thing Victor actually protects: the firm's standing. +8", tags: ["wrong-archetype"] },
          { text: "When did you last update it? Sites that old are usually hurting you.", quality: 1, feedback: "You assumed a problem he never described. Having a website says nothing about whether it works — diagnose, don't declare.", tags: ["off-frame"] },
          { text: "That's fine — what I build will be better anyway.", quality: 1, feedback: "A pitch where a question belongs. You skipped the entire diagnosis and disrespected something his firm paid for. The Fence thickens.", tags: ["premature-pitch"] }
        ]
      },
      {
        step: "clarify",
        npcLine: "We had it built four years ago. It has our services, our history, our credentials.",
        options: [
          { text: "Does the current site still represent the firm at the standard you operate at today?", quality: 3, feedback: "Exact clarify in Victor's language. 'Today' does the work — firms grow past their brochures. He actually pauses to think. +15", tags: [] },
          { text: "Setting the site aside — how is it performing at turning visitors into actual inquiries?", quality: 2, feedback: "A strong diagnostic question, but framed on performance mechanics rather than the standard-and-representation angle he'd feel. +8", tags: ["wrong-archetype"] },
          { text: "Four years old? Then it's definitely costing you clients.", quality: 1, feedback: "You invented pain with zero evidence. Age isn't failure — if the site serves the firm, the honest answer is to stand down.", tags: ["manipulation"] },
          { text: "Do you know how many prospects it's losing you every month? I can show you.", quality: 1, feedback: "Fear-as-a-service. You can't know that number, and pretending you can is pressure wrapped in false precision.", tags: ["pressure"] }
        ]
      },
      {
        step: "isolate",
        npcLine: "Represent... I suppose it doesn't show the awards, or the size of the clients we handle now.",
        options: [
          { text: "If the site accurately reflected the firm's current standard, would there be any other reason to change anything?", quality: 3, feedback: "Clean isolate. One named gap — representation — and nothing else on the field. Victor has now stated the problem himself. +15", tags: [] },
          { text: "So besides that gap, is there anything else about the site you'd want different?", quality: 2, feedback: "Reasonable isolation, though 'want different' invites a wishlist instead of testing whether anything else blocks a decision. +8", tags: ["off-frame"] },
          { text: "Right — so it's costing you prestige clients. We should fix that immediately.", quality: 1, feedback: "Two sins: you invented a consequence he didn't state, then sprinted to a fix. Expand existing consequences only, never fabricate them.", tags: ["manipulation", "pressure"] },
          { text: "Awards aside, the design probably looks dated too. Let's talk redesign.", quality: 1, feedback: "You brushed past his actual admission to pitch a solution. The gap he named deserves resolution, not decoration.", tags: ["premature-pitch"] }
        ]
      },
      {
        step: "resolve",
        npcLine: "No — if it reflected the firm properly, I'd have no complaint. Everything else works.",
        options: [
          { text: "Then the case is specific: a rebuild shows the awards and client caliber it hides. If it didn't undersell you, I'd tell you to keep it.", quality: 3, feedback: "Resolve with integrity: the named gap addressed, and the honest stand-down stated aloud. That's the sentence status buyers trust most. +15", tags: [] },
          { text: "A rebuild would close that specific gap — strategy and design fitted to the firm's real standing.", quality: 2, feedback: "True and relevant, but missing the honest counterpart: if there were no gap, you'd say so. That sentence is what makes it credible. +8", tags: ["off-frame"] },
          { text: "Your competitors' sites are embarrassing yours — let me show you the comparisons.", quality: 1, feedback: "Manufactured shame via competitor comparisons you haven't examined. That's fear leverage, not diagnosis — and Victor despises it.", tags: ["manipulation"] },
          { text: "We could keep the old site AND build a new one — two for the price of one.", quality: 1, feedback: "That's not an offer Apohenia makes. Inventing bundles to close is terms-changing in a party hat.", tags: ["terms-change"] }
        ]
      },
      {
        step: "decide",
        npcLine: "Alright. I'm listening — what would looking at this properly involve?",
        options: [
          { text: "Based on what you've described, is it worth reviewing what a rebuild would involve — or is the site doing its job?", quality: 3, feedback: "A decide with a real door both ways. You gave a managing partner a verdict to make, not a hook to escape. The Fence dissolves. +15", tags: [] },
          { text: "I'll put together a written scope, and we can meet next week to review it properly.", quality: 2, feedback: "Professional and concrete, but you answered for him before he decided the review was worth having. +8", tags: ["forced-agreement"] },
          { text: "Sign today and I'll have a draft before your partners even notice the old one.", quality: 1, feedback: "Rushing a status buyer reads as low-standard behavior — and hiding the process from his partners compounds it. Victor is no longer listening.", tags: ["pressure"] },
          { text: "Frankly, at your level you can't afford to wait another quarter.", quality: 1, feedback: "Status-flavored urgency is still urgency. You manufactured a deadline to corner a man who decides on his own authority.", tags: ["pressure", "manipulation"] }
        ]
      }
    ],
    winText: "The Invisible Fence shimmers and parts like a curtain. Victor extends a hand: 'A proper review. Thursday. Bring the scope — in writing.'",
    loseText: "The Fence turns opaque. Too many assumptions and shortcuts, and Victor concludes you're like every other vendor. Diagnose, don't declare — challenge it again.",
    ethicalNote: "Never invent problems with the current site or exaggerate its weaknesses. If the site genuinely serves the business, a qualified no is the correct outcome."
  },

  {
    id: "boss-build-with-ai",
    name: "The Shortcut Siren",
    objectionText: "I can build it with AI.",
    npc: {
      id: "kai-moreno",
      name: "Kai Moreno",
      business: "Feral Bloom Tattoo Studio",
      role: "Owner & Lead Artist",
      primary: "novelty",
      secondary: "intelligence",
      personality: "Restless, creative, tool-curious. Kai tries every new app the week it launches and gets bored by anything that smells like a template.",
      portrait: { skin: "#8d5a3b", hair: "mohawk", hairColor: "#d94f2b", outfit: "#74b816", accessory: "earring", bg: "#e9f7c9" }
    },
    intro: [
      { t: "say", who: "narrator", text: "A winged figure circles the Arena spire, humming a tune that sounds suspiciously like a startup jingle. Kai Moreno waves a phone at you from below.", emotion: "neutral" },
      { t: "say", who: "npc", text: "Gotta be honest — I can probably just build this with AI. Have you seen these tools lately?", emotion: "happy" }
    ],
    rounds: [
      {
        step: "receive",
        npcLine: "Honestly, I can probably just build this with AI.",
        options: [
          { text: "Fair — these tools are genuinely interesting, and it makes sense to explore them.", quality: 3, feedback: "Perfect receive: honest acknowledgment, zero defensiveness, in Kai's novelty language. The Siren's song falters — you agreed with the fun part. +15", tags: [] },
          { text: "You can, and it's a fair point — AI tools can produce a real starting site quickly.", quality: 2, feedback: "Honest and disarming, but framed on capability rather than the appeal of exploration that actually drives Kai. +8", tags: ["wrong-archetype"] },
          { text: "AI sites all look the same and break constantly.", quality: 1, feedback: "Disparaging the tools — and inaccurately. Many produce decent pages. The rule: never exaggerate AI's failures to create fear.", tags: ["manipulation"] },
          { text: "Sure, but you'll be back in three months when it doesn't convert.", quality: 1, feedback: "A fear prediction dressed as wisdom. You don't know that, and Kai hears a threatened vendor, not a helpful one.", tags: ["pressure"] }
        ]
      },
      {
        step: "clarify",
        npcLine: "I played with one last weekend. It made a whole page in like ten minutes.",
        options: [
          { text: "What appeals more: experimenting with the tools, or getting to a finished, differentiated presence without the experimentation cost?", quality: 3, feedback: "Exact clarify — you split the fun of the process from the value of the outcome. Kai has to pick what they actually want. +15", tags: [] },
          { text: "What would you want the finished result to handle — existing online, or actively turning visitors into inquiries?", quality: 2, feedback: "A solid neutral clarify about function. Strong, but it skips the motivation question that matters to a novelty archetype. +8", tags: ["wrong-archetype"] },
          { text: "And did that page include hosting, security, monitoring, and lead delivery? Didn't think so.", quality: 1, feedback: "A gotcha. Right facts, smug delivery — you mocked the thing they're excited about instead of examining it together.", tags: ["off-frame"] },
          { text: "Ten minutes of fun now, ten hours of maintenance every week forever.", quality: 1, feedback: "Exaggerated doom-math. The upkeep trade-off is real, but inflating it into a scare tactic is manipulation, not diagnosis.", tags: ["manipulation"] }
        ]
      },
      {
        step: "isolate",
        npcLine: "I mean, the experimenting is fun. But I don't want to become my own IT department.",
        options: [
          { text: "If the strategy, upkeep, and lead-handling side were covered, would building it yourself still be the preferred route?", quality: 3, feedback: "Clean isolate. The build was never the issue — the operating responsibility is. Kai just admitted the real variable out loud. +15", tags: [] },
          { text: "Got it — so the build isn't the worry; everything after it is. Anything else?", quality: 2, feedback: "Good read, but you stated their position for them instead of testing it. Close, just not as clean as asking. +8", tags: ["forced-agreement"] },
          { text: "Nobody should DIY their own website. It's basically malpractice.", quality: 1, feedback: "Absolutist and false — plenty of owners can build something decent. Overstating the case to win is still manipulation.", tags: ["manipulation"] },
          { text: "If it's fun, why not just do it yourself? You don't need me at all.", quality: 1, feedback: "Passive-aggressive surrender. A clean no-fit is a legitimate outcome — but it's earned through diagnosis, not sarcasm.", tags: ["off-frame"] }
        ]
      },
      {
        step: "resolve",
        npcLine: "No — if someone else handled the ongoing stuff properly, I'd rather spend my studio time on clients.",
        options: [
          { text: "Then the honest split: AI makes pages. The managed plan covers strategy, hosting, security, monitoring, upkeep, and basic lead delivery.", quality: 3, feedback: "Factual differentiation — build versus operating responsibility — with zero exaggeration. The Siren lands and folds her wings. +15", tags: [] },
          { text: "The managed plan exists so you run the studio while Apohenia runs the site — delegation, not doubt about your ability.", quality: 2, feedback: "Warm and true, though it frames the trade-off without itemizing what's actually covered. Specifics carry this one. +8", tags: ["off-frame"] },
          { text: "AI can't do SEO. You'd be invisible on Google without us.", quality: 1, feedback: "Two unsupported claims in one breath — about AI AND about rankings, which no one may promise. The honesty rules apply even when you're winning.", tags: ["manipulation"] },
          { text: "Since you're tech-savvy, I'll give you the managed plan at the DIY price.", quality: 1, feedback: "Invented pricing. Terms are identical for every client — flattery doesn't unlock a secret menu.", tags: ["terms-change"] }
        ]
      },
      {
        step: "decide",
        npcLine: "That distinction actually makes sense. So what would comparing the two routes look like?",
        options: [
          { text: "Given what you want the site to do, does DIY plus the upkeep make sense — or should we compare it against the managed structure directly?", quality: 3, feedback: "A clean decide: the comparison is HIS to weigh, with both routes kept honest. Kai grabs a sketchbook to take notes — the ultimate yes-signal. +15", tags: [] },
          { text: "I'll send you a side-by-side of responsibilities, and we can talk it through Thursday.", quality: 2, feedback: "Concrete and useful — but it defers the decision question Kai just invited. Ask, then schedule. +8", tags: ["off-frame"] },
          { text: "The comparison is simple: DIY fails, managed wins. Sign here.", quality: 1, feedback: "A verdict you can't honestly deliver, plus a demand. Even a playful prospect deserves the real trade-off, not a coronation.", tags: ["pressure", "manipulation"] },
          { text: "Try the AI route first, and call me when it falls apart.", quality: 1, feedback: "Snark in place of a next step. If self-build genuinely fits, say so warmly — don't wish failure on them.", tags: ["off-frame"] }
        ]
      }
    ],
    winText: "The Shortcut Siren lands, bows, and dissolves into sparkles. Kai books onboarding — and asks if the new site can have a hidden tattoo-flash gallery. (That's a separately scoped conversation.)",
    loseText: "The Siren's song swells. Somewhere between the gotchas and the guarantees, Kai stopped trusting the messenger. Facts only, no fear — challenge it again.",
    ethicalNote: "Never disparage AI tools or exaggerate their failures to create fear. Acknowledge what they do well and differentiate only on facts Apohenia actually delivers — the build versus the ongoing operating responsibility."
  },

  {
    id: "boss-guarantee-leads",
    name: "The Promise Leech",
    objectionText: "Can you guarantee leads?",
    npc: {
      id: "gloria-pruitt",
      name: "Gloria Pruitt",
      business: "Pruitt Peak Realty",
      role: "Broker-Owner",
      primary: "growth",
      secondary: "certainty",
      personality: "Numbers-first and battle-scarred by vendors who overpromised. Gloria respects anyone willing to say 'no' to her face.",
      portrait: { skin: "#c98a5e", hair: "long-flow", hairColor: "#5b3a1e", outfit: "#b8860b", accessory: "earring", bg: "#fff1c9" }
    },
    intro: [
      { t: "say", who: "narrator", text: "Something slick and hungry clings to the Arena wall, feeding on every hollow promise ever spoken here. Gloria Pruitt flicks it off her shoe and squares up.", emotion: "neutral" },
      { t: "say", who: "npc", text: "One question before we go any further, and I want a straight answer. Can you guarantee leads?", emotion: "skeptical" }
    ],
    rounds: [
      {
        step: "receive",
        npcLine: "Can you guarantee leads?",
        options: [
          { text: "The right question for someone focused on results — and I'll answer it plainly.", quality: 3, feedback: "Perfect receive: you honored the question AND pre-committed to honesty. Gloria's guard drops a notch — she expected a dance. +15", tags: [] },
          { text: "That's the right question to ask. Let me be completely straight with you.", quality: 2, feedback: "Honest framing, good tone — just a touch generic compared to naming her results-focus directly. +8", tags: ["wrong-archetype"] },
          { text: "Absolutely — we guarantee twenty leads a month, minimum.", quality: 1, feedback: "There it is — the lie the Leech feeds on. Apohenia never guarantees leads, revenue, or any financial outcome. Ever.", tags: ["manipulation"] },
          { text: "If I say yes, do we have a deal?", quality: 1, feedback: "You treated a trust test as a closing lever. She asked for honesty and you offered a transaction. The Leech grows.", tags: ["pressure"] }
        ]
      },
      {
        step: "clarify",
        npcLine: "I've been burned before. A guy promised me the phone would ring off the hook.",
        options: [
          { text: "Is the goal a committed number, or confidence that the foundation can actually support growth?", quality: 3, feedback: "Exact clarify — you separated 'a promised figure' from 'a foundation that earns results.' Two different asks, two different answers. +15", tags: [] },
          { text: "When you say leads — a specific number per month, or a system built to turn interest into inquiries?", quality: 2, feedback: "The right fork, framed on definitions rather than her growth motive. Solid, slightly less tuned. +8", tags: ["wrong-archetype"] },
          { text: "That guy was an amateur. We're nothing like him.", quality: 1, feedback: "Disparaging another vendor is not differentiation — and 'we're different, promise' is exactly what the last guy said.", tags: ["off-frame"] },
          { text: "The phone WILL ring. You have my personal guarantee.", quality: 1, feedback: "A personal guarantee of a market outcome is still a false guarantee — the thing that burned her, now with your name on it.", tags: ["manipulation"] }
        ]
      },
      {
        step: "isolate",
        npcLine: "A committed number, if I'm honest. That's the only thing that would make me sign.",
        options: [
          { text: "If I'm completely straight about what we control and what we don't, is that the main thing between you and a decision?", quality: 3, feedback: "Clean isolate with integrity built in. One variable: the guarantee question. Resolve it honestly and the decision is live. +15", tags: [] },
          { text: "Understood. And apart from the number, the structure itself fits what you need?", quality: 2, feedback: "Good isolation instinct, though 'fits what you need?' invites a reflex yes instead of a real check. +8", tags: ["forced-agreement"] },
          { text: "What if I put 'guaranteed leads' in writing? Would that close you?", quality: 1, feedback: "Offering a written false promise is worse than a spoken one — now it's fraud-adjacent. The Leech is doing backflips.", tags: ["manipulation"] },
          { text: "Everyone asks for a number. The smart ones sign anyway.", quality: 1, feedback: "Identity pressure: you're calling her stupid if she holds her boundary. That's shaming, and it's never acceptable.", tags: ["pressure"] }
        ]
      },
      {
        step: "resolve",
        npcLine: "Alright. Give me the straight version, then.",
        options: [
          { text: "No one honest guarantees leads — the market controls outcomes. We control the asset: build, hosting, monitoring, basic lead delivery.", quality: 3, feedback: "The honest line, drawn plainly, with the pivot to what IS controlled. Gloria writes it down verbatim — respect earned the hard way. +15", tags: [] },
          { text: "We don't promise leads or revenue. We deliver a properly built, maintained site with basic lead delivery infrastructure.", quality: 2, feedback: "Honest and accurate — just missing the 'no credible provider can' framing that turns your no into a trust signal. +8", tags: ["off-frame"] },
          { text: "Off the record — you'll probably get more leads than you can handle.", quality: 1, feedback: "An implied guarantee whispered is still a guarantee. 'Off the record' is where the Leech nests. Never hint at outcomes.", tags: ["manipulation"] },
          { text: "We guarantee leads, but only for clients who sign this week.", quality: 1, feedback: "A false guarantee AND fake urgency — the Leech's two favorite foods. This is the fastest way to lose Gloria and the point.", tags: ["manipulation", "pressure"] }
        ]
      },
      {
        step: "decide",
        npcLine: "I don't love it, but I believe you. You're the first one who just said no to me.",
        options: [
          { text: "Knowing exactly where the line is — what we build and stand behind — does the structure still make sense for the business?", quality: 3, feedback: "The clean decide: the honesty IS the pitch, and the choice is hers. Gloria extends her hand. The Leech starves. +15", tags: [] },
          { text: "Would it help to walk through exactly what's included, so the decision rests on the actual scope, not promises?", quality: 2, feedback: "A good next step, but it's more discovery when she's asking to decide. Take the win cleanly. +8", tags: ["off-frame"] },
          { text: "Since you trust me now — between us, the leads will come. Sign today.", quality: 1, feedback: "You rebuilt the lie on top of earned trust. This is the single worst answer in the Arena: honesty as a setup for the guarantee.", tags: ["manipulation"] },
          { text: "Let's start you on a trial month with a small lead guarantee attached.", quality: 1, feedback: "Invented trial terms plus a guarantee — two boundary violations. The terms are the terms: $197 managed or $1,000 ownership.", tags: ["terms-change"] }
        ]
      }
    ],
    winText: "The Promise Leech shrivels and drops off the wall with a tiny splat. Gloria signs the agreement, then asks for two extra copies — 'for the next vendor who promises me the moon.'",
    loseText: "The Leech feasts. Somewhere in there you promised, hinted, or pressured — and Gloria has a whole shelf of vendors who did the same. Honesty is the win condition. Try again.",
    ethicalNote: "Apohenia never guarantees leads, revenue, rankings, ad performance, conversion, growth, or any financial outcome — even softly, even to save a deal. State the line plainly and pivot to what is included and controlled. The win here IS the honesty."
  },

  {
    id: "boss-lower-price",
    name: "The Discount Hydra",
    objectionText: "Can you lower the price?",
    npc: {
      id: "sal-ferrante",
      name: "Sal Ferrante",
      business: "Ferrante's Pizzeria",
      role: "Owner, 20 years",
      primary: "efficiency",
      secondary: "status",
      personality: "Blunt, time-poor, proud of running a tight ship. Sal hates waste, hates games, and tests every vendor the same way: ask for a discount and watch what happens.",
      portrait: { skin: "#e9b98d", hair: "bald-shine", hairColor: "#2b2b2b", outfit: "#495057", accessory: "beard", bg: "#f0e6d2" }
    },
    intro: [
      { t: "say", who: "narrator", text: "The final Arena gate opens onto a creature with seven heads, each wearing a different percentage-off sticker. Sal Ferrante wipes flour off his hands and points at the biggest one.", emotion: "neutral" },
      { t: "say", who: "npc", text: "Everything sounds fine. One thing, though — can you lower the price?", emotion: "skeptical" }
    ],
    rounds: [
      {
        step: "receive",
        npcLine: "Can you lower the price?",
        options: [
          { text: "I appreciate you asking directly — a straight question deserves a straight answer.", quality: 3, feedback: "Perfect receive for Sal: no offense taken, no squirming, no instant fold. You matched his directness beat for beat. +15", tags: [] },
          { text: "Fair to ask. Let me give you a plain answer.", quality: 2, feedback: "Calm and unbothered — right energy, slightly less complete than acknowledging the directness itself. +8", tags: ["wrong-archetype"] },
          { text: "For you? Sure — I'll take 15% off right now.", quality: 1, feedback: "Head one of the Hydra: the instant discount. Now Sal knows your price was padded, and everything else you said is suspect too.", tags: ["terms-change"] },
          { text: "It's already basically free for what you get.", quality: 1, feedback: "Dismissing the question instead of answering it. 'Basically free' is hype-talk, and a man who counts flour costs hears it instantly.", tags: ["off-frame"] }
        ]
      },
      {
        step: "clarify",
        npcLine: "No offense — I just don't pay sticker for anything. It's how I've run this place for twenty years.",
        options: [
          { text: "Is the question whether the price itself is flexible, or whether the value justifies it?", quality: 3, feedback: "Exact clarify. 'Lower the price' often means 'justify this' — and now you know which conversation you're actually in. +15", tags: [] },
          { text: "Is it the number itself, or whether the structure matches the standard you run the place by?", quality: 2, feedback: "A good fork tuned to his pride in the shop. Real clarify, slightly softer than the flexibility-versus-value split. +8", tags: ["off-frame"] },
          { text: "Everyone tries that line. The price is the price.", quality: 1, feedback: "True content, hostile delivery. You called his twenty-year habit a 'line' — that's a status insult, and Sal doesn't forget those.", tags: ["off-frame"] },
          { text: "What price WOULD you pay? Name a number.", quality: 1, feedback: "You just opened a bidding war against yourself. Fixed terms are not an opening offer — never turn them into one.", tags: ["off-frame"] }
        ]
      },
      {
        step: "isolate",
        npcLine: "Honestly, if the price is the price, fine — but I want to know it's worth it before I stop pushing.",
        options: [
          { text: "If the price were settled, is everything else about the scope and structure a fit for what you need?", quality: 3, feedback: "Clean isolate. Price is now the only open variable, and Sal confirmed it — one head left on the Hydra. +15", tags: [] },
          { text: "Understood. Besides the price, anything else giving you pause?", quality: 2, feedback: "Serviceable isolation, though 'giving you pause?' is vaguer than testing the fit directly. +8", tags: ["off-frame"] },
          { text: "If I can't move the price, are you walking?", quality: 1, feedback: "You turned his question into a standoff. Cornering a prospect about walking is pressure — and Sal calls bluffs for a living.", tags: ["pressure"] },
          { text: "It IS worth it, trust me. Best money you'll ever spend.", quality: 1, feedback: "'Trust me' plus superlatives — the two things a pragmatist discounts to zero. Answer the value question with facts or don't answer it.", tags: ["manipulation"] }
        ]
      },
      {
        step: "resolve",
        npcLine: "Yeah, the scope fits. I just hate feeling like I left money on the table.",
        options: [
          { text: "Same terms for every client — that keeps it fair. What I can offer is a different structure: the $1,000 one-time ownership build.", quality: 3, feedback: "The exact resolve: no discount, but a real structural alternative, framed as fairness not stubbornness. Sal nods slowly. +15", tags: [] },
          { text: "Same price for every client — nobody gets a better deal than you. The other route is the $1,000 one-time build.", quality: 2, feedback: "Right substance, but 'nobody gets a better deal' frames it as deal-hunting, which is his frame, not yours. Fairness, not winning. +8", tags: ["off-frame"] },
          { text: "Okay, okay — $175 a month, but don't tell anyone.", quality: 1, feedback: "Head two of the Hydra: the secret discount. You just told him your terms are theater and other clients pay more than they should.", tags: ["terms-change"] },
          { text: "You left money on the table every month you waited — don't do it again.", quality: 1, feedback: "Shaming him with invented losses to force a close. Fear and embarrassment are never levers — in any archetype, at any point.", tags: ["manipulation", "pressure"] }
        ]
      },
      {
        step: "decide",
        npcLine: "Heh. Twenty years, first vendor who didn't fold. So what are my actual options?",
        options: [
          { text: "Which is closest to what you want — the managed plan at $197 a month, the $1,000 ownership build, or no fit at this price right now?", quality: 3, feedback: "The full decide: both structures, plus a dignified no-fit door. Sal laughs once and pulls out a pen. The Hydra's last head drops. +15", tags: [] },
          { text: "Managed at $197 a month, or ownership at $1,000 once — want the side-by-side in writing?", quality: 2, feedback: "Clear options and a concrete artifact — but 'want it in writing?' defers the decision question he just asked for. +8", tags: ["off-frame"] },
          { text: "Last chance: I'll do $150 a month if you sign before I leave.", quality: 1, feedback: "Head three: the expiring secret discount. Terms-change plus fake urgency — the Hydra grows two heads back and eats your credibility.", tags: ["terms-change", "pressure"] },
          { text: "The options don't matter — you know you need this.", quality: 1, feedback: "You erased his choice and told him his own mind. Twenty years of running that shop says otherwise.", tags: ["pressure"] }
        ]
      }
    ],
    winText: "The Discount Hydra's last head bows and dissolves. Sal signs the agreement, then slides a pizza box across the table: 'For holding the line. Nobody does that anymore.'",
    loseText: "The Hydra regenerates. Every discount you offered grew two new heads of doubt. Terms never change — offer structure or a clean no-fit, and challenge it again.",
    ethicalNote: "Terms never change — no invented discounts, deadlines, or urgency. The honest moves are: present the $1,000 ownership structure, or offer a clean no-fit. Identical terms for every client is what keeps the process fair."
  }
] };
