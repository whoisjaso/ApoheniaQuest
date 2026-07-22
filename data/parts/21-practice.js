// APOHENIA: SALES QUEST — Practice part (21-practice.js)
// Plain JS, no modules. Defines window.__SQ_PARTS["practice"].

window.__SQ_PARTS = window.__SQ_PARTS || {};

window.__SQ_PARTS["practice"] = {

  drills: {

    // Archetype identification drills — read the tells, name the drivers.
    archetype: [
      {
        npcLine: "I researched three providers before this call. I've been in this industry twenty-five years — most developers don't understand the technical side of what we do.",
        clue: "Research, experience, and a challenge to prove you understand.",
        options: ["intelligence", "novelty", "connection", "efficiency"],
        answer: { primary: "intelligence", secondary: "status" },
        explain: "\"I researched\" and \"twenty-five years\" are classic Intelligence tells — decisions through understanding. \"Most developers don't understand us\" carries a status edge: he expects to be treated as an authority."
      },
      {
        npcLine: "My company sets the standard in this market. I built it from one truck to forty employees, and at our level, I expect the website to reflect that.",
        clue: "Position, scale, and expectations.",
        options: ["status", "growth", "certainty", "contribution"],
        answer: { primary: "status", secondary: null },
        explain: "\"My company\", \"I built\", \"at our level, I expect\" — pure Status language. He decides through standards and position. No second driver is strongly evidenced yet, so secondary is null."
      },
      {
        npcLine: "Before we go further: what happens if the site goes down? Who owns the domain? What exactly is included each month, and what's the timeline?",
        clue: "A rapid-fire checklist of conditions and ownership questions.",
        options: ["certainty", "intelligence", "efficiency", "freedom"],
        answer: { primary: "certainty", secondary: null },
        explain: "\"What happens if...\", \"who owns\", \"what is included\", \"timeline\" — textbook Certainty tells. She decides through predictability. The questions seek documentation, not control or logic for its own sake."
      },
      {
        npcLine: "I'm tired of doing everything myself, but I don't want to be tied down to some vendor either. I want control of my stuff and I want options.",
        clue: "Exhaustion with DIY plus fear of dependence.",
        options: ["freedom", "efficiency", "certainty", "connection"],
        answer: { primary: "freedom", secondary: "efficiency" },
        explain: "\"Tied down\", \"control\", \"options\" are Freedom tells — independence is the driver. \"Tired of doing everything myself\" adds an Efficiency undertone: his time matters too."
      },
      {
        npcLine: "We're opening a second location in the spring. I need more leads, better conversion, and a site that can scale — next level, not maintenance mode.",
        clue: "Targets, expansion, momentum words.",
        options: ["growth", "status", "novelty", "certainty"],
        answer: { primary: "growth", secondary: null },
        explain: "\"More leads\", \"scale\", \"next level\" — Growth decides through forward movement and measurable progress. The fear underneath is stagnation, not risk."
      },
      {
        npcLine: "My customers aren't transactions — they know my kids' names. I need someone I can trust, and honestly, communication matters more to me than the technology.",
        clue: "Relationships first, technology second.",
        options: ["connection", "recognition", "contribution", "intelligence"],
        answer: { primary: "connection", secondary: "certainty" },
        explain: "\"My customers\", \"someone I can trust\", \"communication matters\" — Connection decides through relationship. Wanting to be kept informed adds a Certainty undertone about being left in the dark."
      },
      {
        npcLine: "People don't realize how good our work is. We win awards, and the website doesn't show any of it. We are better than we look — the quality is there, but nobody sees it.",
        clue: "A gap between real quality and public presentation.",
        options: ["recognition", "status", "growth", "novelty"],
        answer: { primary: "recognition", secondary: null },
        explain: "\"People don't realize\", \"we are better than we look\", \"the quality is there, but...\" — pure Recognition tells. She wants accurate representation and proper credit, not hype."
      },
      {
        npcLine: "Everything in our industry looks identical. I want something different — creative, a little bold. I'm bored with templates. What new tools are you working with?",
        clue: "Boredom with sameness plus excitement about new tools.",
        options: ["novelty", "intelligence", "growth", "efficiency"],
        answer: { primary: "novelty", secondary: null },
        explain: "\"Something different\", \"bored with\", \"what new tools\" — Novelty decides through possibility and differentiation. Note the fear: sameness, not risk or cost."
      },
      {
        npcLine: "We sponsor the little league and donate every Thanksgiving. Profit matters, but what I really care about is whether this town is better because we're in it.",
        clue: "Community impact as the measure of success.",
        options: ["contribution", "connection", "recognition", "status"],
        answer: { primary: "contribution", secondary: "connection" },
        explain: "Giving back, community, impact on neighbors' lives — Contribution tells. The warmth toward people (\"they know my kids' names\" style) carries a Connection undertone, but impact is the driver."
      },
      {
        npcLine: "Skip the pitch. How long does this take, what do I have to do, and what's the practical return on my time? I don't have hours to waste on meetings.",
        clue: "Time-counting, jargon-cutting, blunt practicality.",
        options: ["efficiency", "status", "certainty", "freedom"],
        answer: { primary: "efficiency", secondary: null },
        explain: "\"How long\", \"what do I have to do\", \"return on my time\", \"hours to waste\" — Efficiency/Pragmatism tells. He wants simple, practical answers with no wasted steps."
      },
      {
        npcLine: "Last quarter we grew 30% and I'm not slowing down. But every hour I spend fiddling with the website is an hour I'm not closing contracts.",
        clue: "Growth numbers plus time-leverage math.",
        options: ["growth", "efficiency", "intelligence", "novelty"],
        answer: { primary: "growth", secondary: "efficiency" },
        explain: "\"Grew 30%\", \"not slowing down\" — Growth is the engine. \"Every hour I spend... is an hour I'm not closing\" is the Efficiency undertone: time as leverage."
      },
      {
        npcLine: "I need flexibility — my nephew can host it, my daughter does our social. But if something breaks, I need to know exactly who fixes it and what it costs.",
        clue: "Family-run control plus a demand for defined responsibility.",
        options: ["freedom", "certainty", "connection", "efficiency"],
        answer: { primary: "freedom", secondary: "certainty" },
        explain: "\"Flexibility\" and keeping the work with family = Freedom (control, no dependence). \"Who fixes it and what it costs\" = the Certainty undertone wanting defined terms."
      }
    ],

    // Fixed-script recall drills — one master frame, remembered cold.
    recall: [
      {
        stage: "intent",
        prompt: "Which line is the master INTENT question?",
        options: [
          "What made you reach out now?",
          "What budget did you have in mind for this project?",
          "Can I tell you quickly about our two packages?",
          "How long have you had your current website?"
        ],
        answerIndex: 0,
        explain: "INTENT learns why now — the trigger behind the inquiry. Budget is a PRIORITY topic, packages are a premature pitch, and website history belongs to PROCESS."
      },
      {
        stage: "gap",
        prompt: "In GAP, what does the master question try to learn?",
        options: [
          "What the prospect would change about the current process — the gap, in their own words",
          "How much the prospect is willing to invest in a solution",
          "Which Apohenia offer is the best fit for the business",
          "Who else needs to be comfortable with the decision"
        ],
        answerIndex: 0,
        explain: "GAP asks \"What would you change about the current process if you could?\" — the prospect names the problem. Budget is PRIORITY, the offer comes at RECOMMEND, and decision-makers are PRIORITY."
      },
      {
        stage: "process",
        prompt: "Which line is the master PROCESS question?",
        options: [
          "Walk me through what happens today from the moment someone hears about the business to the moment they contact or book with you.",
          "Walk me through your pricing so I can see where you make your margin.",
          "Tell me about the worst customer you've ever had.",
          "If you could wave a wand, what would your dream website look like?"
        ],
        answerIndex: 0,
        explain: "PROCESS maps the real current journey, step by step — first hearing of the business to contact or booking. The other lines wander off-frame into pricing, war stories, or premature design."
      },
      {
        stage: "future",
        prompt: "Which line is the master FUTURE question?",
        options: [
          "If this worked exactly the way you wanted six months from now, what would be tangibly different?",
          "Where do you see yourself in five years?",
          "What would you do with a million dollars in new revenue?",
          "If you say yes today, when would you want launch day to be?"
        ],
        answerIndex: 0,
        explain: "FUTURE makes the prospect describe a concrete, tangible better state — which later anchors the recommendation. The others are daydreams, hype, or a premature close."
      },
      {
        stage: "experience",
        prompt: "Which line is the master EXPERIENCE question?",
        options: [
          "What have you seen that tells you the current setup isn't producing that?",
          "How do you feel about your current website, emotionally speaking?",
          "Don't you think the current setup is failing you?",
          "What have your competitors done that you wish you'd done first?"
        ],
        answerIndex: 0,
        explain: "EXPERIENCE asks for observed evidence, not feelings or leading claims. Option three plants a conclusion; option four shifts focus to competitors instead of their own situation."
      },
      {
        stage: "priority",
        prompt: "Which line is the master PRIORITY question?",
        options: [
          "How important is fixing this compared with the other priorities in the business?",
          "So are you ready to buy, or do you need more convincing?",
          "What's the maximum you'd be willing to spend?",
          "Who is the real decision-maker here? It had better be you."
        ],
        answerIndex: 0,
        explain: "PRIORITY ranks the problem against competing priorities — calmly, as a business fact. The others pressure the decision, interrogate the budget, or challenge authority."
      },
      {
        stage: "recommend",
        prompt: "What must Jason do immediately BEFORE recommending an offer?",
        options: [
          "Summarize the situation in the prospect's own words and confirm: \"Is that accurate?\"",
          "List every feature of the managed plan so nothing is missed",
          "Offer a small discount to sweeten the recommendation",
          "Ask the prospect to commit verbally before hearing the details"
        ],
        answerIndex: 0,
        explain: "People trust conclusions they helped articulate. The summary — current process, gap, impact, future state, timing — must be confirmed accurate before any recommendation. Never pitch first."
      },
      {
        stage: "decide",
        prompt: "Which line presents the managed terms correctly?",
        options: [
          "$197 per month for an initial six monthly billing periods, then month-to-month under the agreement, with no upfront build fee.",
          "$197 per month, and if you sign today I'll waive the first three months.",
          "$197 per month, locked in for two years so your rate never changes.",
          "It's about $200 a month, give or take — we'll figure out the details later."
        ],
        answerIndex: 0,
        explain: "The terms are operating facts: $197/month, six initial billing periods, then month-to-month, no upfront fee. Never invent discounts, invent lock-ins, or leave terms vague."
      },
      {
        stage: "open",
        prompt: "What is the purpose of the OPEN stage?",
        options: [
          "Set the frame: a few questions, a straight answer on fit either way, and permission to proceed",
          "Build rapport with small talk so the prospect likes you before you sell",
          "Deliver a two-minute pitch about Apohenia so the prospect knows the product",
          "Find out how much the prospect can afford before asking anything else"
        ],
        answerIndex: 0,
        explain: "OPEN sets the contract for the call: questions first, honesty about fit, no obligation. Rapport, pitching, and budget-fishing all belong later — or nowhere."
      },
      {
        stage: "recommend",
        prompt: "Which statement about Apohenia's offers is accurate at RECOMMEND?",
        options: [
          "Ownership is $1,000 one time for the defined build and handoff; ongoing hosting, maintenance, and future updates are not included.",
          "Ownership is $1,000 one time and includes lifetime hosting and maintenance.",
          "The managed plan is $197 per month and Apohenia takes over your domain for safekeeping.",
          "Custom features are folded into the managed plan at no extra charge if the client asks nicely."
        ],
        answerIndex: 0,
        explain: "Ownership = $1,000 one-time build with handoff to client-controlled hosting; ongoing work stays with the client. The client always keeps the domain, and custom work is separately scoped — never folded in."
      }
    ],

    // Mirror drills — pick the reflection that keeps them talking.
    mirror: [
      {
        npcLine: "We mostly rely on word of mouth.",
        options: [
          "Mostly word of mouth?",
          "What do you mean by that?",
          "How many referrals would you estimate per month?",
          "So the real issue is that you have no online presence. Is that accurate?"
        ],
        answerIndex: 0,
        explain: "Simple mirror: repeat the last meaningful words as a question. It invites expansion with zero interpretation. The meaning mirror jumps to a conclusion you haven't earned yet."
      },
      {
        npcLine: "The website just isn't working.",
        options: [
          "What do you mean by that?",
          "Isn't working?",
          "Let's look at what's broken and I'll quote the fix.",
          "So the real issue is lead flow. Is that accurate?"
        ],
        answerIndex: 0,
        explain: "\"Isn't working\" is vague and loaded — the clarifying mirror converts it into something examinable. A simple mirror would just echo; quoting a fix skips diagnosis entirely."
      },
      {
        npcLine: "People reach out and then disappear.",
        options: [
          "Can you walk me through a specific example?",
          "Disappear?",
          "How often does that happen?",
          "What do you mean by disappear?"
        ],
        answerIndex: 0,
        explain: "A specific story carries more diagnostic value than a general impression — that's the example mirror. Quantifying and clarifying are decent, but one concrete case reveals the actual mechanism."
      },
      {
        npcLine: "We lose a lot of inquiries.",
        options: [
          "How many inquiries would you estimate?",
          "A lot?",
          "That's terrible. We can definitely fix that.",
          "What do you mean by a lot of inquiries?"
        ],
        answerIndex: 0,
        explain: "Quantifying mirror: turn the vague quantity into their estimate — numbers make the gap discussable. Promising a fix on zero evidence is premature; echoes and definitions add less here."
      },
      {
        npcLine: "The website looks dated and nobody fills out the form.",
        options: [
          "So the real issue is not only the design; it is that interested people have no clear path to contact you. Is that accurate?",
          "Nobody fills out the form?",
          "What do you mean by dated?",
          "How many people visit the site each month?"
        ],
        answerIndex: 0,
        explain: "There's enough evidence for a meaning mirror: reflect the deeper issue and check accuracy — never as a verdict, always as a hypothesis they can correct."
      },
      {
        npcLine: "I need to know exactly who owns what before I sign anything.",
        options: [
          "It sounds like maintaining control matters to you.",
          "Who owns what?",
          "Don't worry, our contracts are very standard.",
          "How much ownership are we talking about, percentage-wise?"
        ],
        answerIndex: 0,
        explain: "Identity mirror: name the value they just demonstrated — control — as an observation, never a compliment with a hook. \"Don't worry\" dodges a question that deserves documentation."
      },
      {
        npcLine: "Referrals keep us plenty busy. Honestly, inquiries have been slow for months.",
        options: [
          "Earlier you mentioned referrals keep you busy, but now I'm hearing inquiries have been slow. Help me understand how those fit together.",
          "Slow for months?",
          "So referrals are NOT actually working. Is that accurate?",
          "What do you mean by busy?"
        ],
        answerIndex: 0,
        explain: "Contradiction mirror: surface the two statements curiously, never accusatory — the tension is theirs to resolve. The verdict version puts words in their mouth."
      },
      {
        npcLine: "Yeah, we do a bit of everything online. (You asked what happens step by step after someone shows interest.)",
        options: [
          "I may not have asked that clearly. What I'm trying to understand is what happens step by step after someone first shows interest.",
          "A bit of everything?",
          "That's not what I asked. Please answer the question.",
          "Let's move on — we'll circle back to the process later."
        ],
        answerIndex: 0,
        explain: "Non-answer mirror: take responsibility for the ask and rephrase — honest without blame. Echoing stalls, scolding shames, and moving on abandons the stage."
      }
    ],

    // Anchor drills — pick the anchor that holds the frame.
    anchor: [
      {
        situation: "The prospect asks: \"Can you start the build before I sign or pay anything?\"",
        options: [
          "Apohenia uses the same agreement and onboarding order for every client — work begins under the agreement, with scope and terms in writing.",
          "You retain ownership of your domain, content, customer data, and payment accounts.",
          "Based on what you described, this delay is costing you inquiries every week.",
          "(Say nothing and wait for them to answer their own question.)"
        ],
        answerIndex: 0,
        explain: "Process anchor: exceptions to the process get the same calm answer — consistency protects both sides. The silence anchor here would just feel evasive."
      },
      {
        situation: "A freedom-driven prospect says: \"I'm worried about getting locked in with you people.\"",
        options: [
          "You retain ownership and control of your domain, business content, customer data, and payment accounts.",
          "Apohenia uses the same agreement for every client, so there's nothing to worry about.",
          "You said maintaining control matters, so you should sign today while you're thinking about it.",
          "$197 per month for six initial billing periods, then month-to-month."
        ],
        answerIndex: 0,
        explain: "Ownership anchor: a factual boundary stated plainly whenever lock-in comes up. Option three twists their value into pressure — identity shaming, never acceptable."
      },
      {
        situation: "The prospect says: \"Can you also throw in paid ads with the website plan?\"",
        options: [
          "Anything outside the defined website scope — like paid advertising — is audited and quoted separately before work begins.",
          "Sure, we can bundle a little ad spend into the monthly price.",
          "You retain ownership of your domain, content, customer data, and payment accounts.",
          "Based on what you described, ads would pay for themselves quickly."
        ],
        answerIndex: 0,
        explain: "Scope anchor: never fold extra work into the offer to be agreeable. Separate audit, written scope, payment structure, timeline — that's what protects the prospect from surprise costs."
      },
      {
        situation: "The prospect told you they lose several quote requests a week, and now hesitates at the price.",
        options: [
          "Based on what you described, the current process is costing you those quote requests every week. The recommendation addresses that directly.",
          "Most clients earn back the fee in the first month, guaranteed.",
          "Apohenia uses the same agreement and onboarding order for every client.",
          "(Say nothing. The silence will close them.)"
        ],
        answerIndex: 0,
        explain: "Value anchor: connect the recommendation to the cost THEY stated — never invent ROI or guarantees. Silence is for after price presentation, not for dodging a value question."
      },
      {
        situation: "A freedom-driven prospect — who said earlier that control matters — is weighing the managed plan.",
        options: [
          "You said maintaining control matters. That's why the domain and core business assets remain in your name.",
          "If you were truly a serious owner, you'd move forward today.",
          "You retain ownership of your domain, content, customer data, and payment accounts.",
          "$197 per month for six initial billing periods, then month-to-month."
        ],
        answerIndex: 0,
        explain: "Identity anchor: connect the solution to a value they stated in their own words. Option two is identity shaming — the banned dark mirror of this exact move."
      },
      {
        situation: "Diagnosis is confirmed. It's time to state the commercial structure.",
        options: [
          "Managed is $197 per month for six initial billing periods, then month-to-month. Ownership is $1,000 one time; ongoing work not included.",
          "It's only $197 a month — cheaper than your daily coffee habit, right?",
          "Normally it's $297, but for you I can do $197 if you commit this week.",
          "The price depends on how much value you think you'll get."
        ],
        answerIndex: 0,
        explain: "Terms anchor: price and boundaries stated as calm operating facts. No minimizing ('only'), no invented discounts, no price-as-negotiation."
      },
      {
        situation: "Jason has just stated the full price and terms. The prospect goes quiet and looks at the ceiling.",
        options: [
          "(Hold the pause. State it. Pause. Let them think.)",
          "...and of course that includes free hosting for the first year.",
          "Let me re-explain everything in case that was unclear.",
          "You agree that's manageable, right?"
        ],
        answerIndex: 0,
        explain: "Silence anchor: the pause belongs to the prospect. Every filler — bonus, re-explanation, leading question — signals doubt in the offer and buries what they'd have said next."
      },
      {
        situation: "The prospect mentioned the website eats about five hours of their week, and asks why the managed plan is worth it.",
        options: [
          "Based on what you described, the current setup costs you about five hours a week. The managed plan removes exactly that from your plate.",
          "Time is money, and this will make you rich — that's just math.",
          "Apohenia uses the same onboarding order for every client.",
          "(Say nothing and let the five hours sink in.)"
        ],
        answerIndex: 0,
        explain: "Value anchor using THEIR number, not an invented one — the five hours came from them, so the anchor is honest. Hype about getting rich is a banned promise."
      }
    ]
  },

  simCalls: [
    {
      id: "sim-garage",
      region: "closing-summit",
      name: "Simulated Call: The Garage",
      subtitle: "A full call with an efficiency-first shop owner",
      intro: "Run the complete master frame against Hank — identify, translate, recommend, resolve.",
      npc: {
        id: "hank-alvarez",
        name: "Hank Alvarez",
        business: "Alvarez Garage",
        role: "Owner, 18 years",
        primary: "efficiency",
        secondary: "connection",
        personality: "Blunt, warm underneath, always mid-job. Hank counts minutes like bolts and treats his regulars like family.",
        portrait: { skin: "#8d5a3b", hair: "buzz", hairColor: "#2b2b2b", outfit: "#495057", accessory: "beard", bg: "#dfe6ea" }
      },
      teaches: ["open", "intent", "process", "gap", "recommend", "decide"],
      beats: [
        { t: "say", who: "narrator", text: "Practice simulation — Closing Summit. A full call, start to finish. Hank Alvarez wipes his hands on a rag and gives you exactly one nod.", emotion: "neutral" },
        { t: "say", who: "npc", text: "Make it quick — I've got a lift full of brake jobs. You're the website fellow, right? My sister keeps telling me our Facebook page isn't enough.", emotion: "annoyed" },
        { t: "identify", prompt: "Who are you talking to?",
          options: ["efficiency", "status", "novelty", "certainty"],
          answer: { primary: "efficiency", secondary: "connection" },
          feedbackWin: "\"Make it quick\" and \"a lift full of brake jobs\" — Efficiency: time is his currency. \"My sister\" hints at the Connection undertone: his world runs on people. +80",
          feedbackLose: "Look at the clock-talk: \"make it quick\", a lift full of jobs. That's Efficiency, not Status or Certainty. The sister mention is your Connection clue. Watch the tells and try again.",
          points: 80 },
        { t: "say", who: "npc", text: "Alright, you get it. So what do you want to know?", emotion: "neutral" },
        { t: "choose", stage: "intent", tool: null,
          setup: "OPEN is done. Ask the master INTENT question — translated for Hank.",
          options: [
            { text: "What made you reach out now? Short version is fine — I know the bay is full.", quality: 3, feedback: "The master INTENT question, efficiency-tuned: you honored his clock while asking why now. Hank's guard drops. +20", tags: [] },
            { text: "What made you reach out now?", quality: 2, feedback: "The correct master question, untranslated. In-frame, but you missed the chance to speak his language of time. +8", tags: [] },
            { text: "Let me quickly show you our two packages — saves us both time.", quality: 1, feedback: "A pitch in stage one. You skipped the entire discovery frame; 'saving time' by skipping diagnosis is how wrong fits get sold.", tags: ["premature-pitch"] },
            { text: "How much are you currently spending on marketing?", quality: 1, feedback: "Budget is a PRIORITY-stage topic, and this skips discovery entirely. One frame, in order — no shortcuts.", tags: ["skips-discovery", "off-frame"] }
          ],
          teaching: "INTENT learns why now. Same question every call — only the language adapts to the archetype." },
        { t: "say", who: "npc", text: "Honestly? A customer said she almost didn't call because she couldn't find our hours online. That bugged me. Regulars are family here.", emotion: "thinking" },
        { t: "choose", stage: "process", tool: "probe",
          setup: "Now map the current customer path — the master PROCESS question, tuned for Hank.",
          options: [
            { text: "Walk me through what happens today — from someone hearing about the garage to booking. Which steps eat your time?", quality: 3, feedback: "PROCESS, efficiency-translated: the full path plus the time-cost lens. Hank starts mapping immediately. +20", tags: [] },
            { text: "Walk me through what happens today from the moment someone hears about the business to the moment they contact or book with you.", quality: 2, feedback: "The exact neutral master question — correct frame, zero translation. Solid, not sharp. +8", tags: [] },
            { text: "How many cars do you service a week, and what's your average ticket?", quality: 1, feedback: "Interesting numbers, wrong stage. You're collecting trivia instead of mapping the customer journey — off-frame.", tags: ["off-frame"] },
            { text: "Do your customers complain about the website a lot?", quality: 1, feedback: "A leading question that plants a problem. Never create pain that doesn't exist — let the evidence surface itself.", tags: ["off-frame", "manipulation"] }
          ],
          teaching: "PROCESS maps the real journey, step by step. Probes zoom in; they never steer." },
        { t: "say", who: "npc", text: "They call, or they DM the Facebook page, or they just show up. Half the DMs I answer at ten at night from my couch. My wife loves that, as you can imagine.", emotion: "annoyed" },
        { t: "choose", stage: "gap", tool: "mirror",
          setup: "Hank just handed you a loaded detail. Mirror it to open the GAP.",
          options: [
            { text: "Ten at night, from your couch?", quality: 3, feedback: "Simple mirror on the costly phrase. He'll now describe the gap himself — in his own words, which is the only kind that counts. +20", tags: [] },
            { text: "What do you mean by that?", quality: 2, feedback: "A valid clarifying mirror, but the sharper target was the specific phrase carrying the cost. +8", tags: [] },
            { text: "So the real issue is your marriage. Is that accurate?", quality: 1, feedback: "A meaning mirror gone rogue — you leapt past the business problem to a personal verdict. Mirrors reflect; they never psychoanalyze.", tags: ["off-frame"] },
            { text: "We can automate those DMs for an extra monthly fee.", quality: 1, feedback: "Pitching a fix before the gap is even named. Also, custom automation is separately scoped — not a bolt-on you invent mid-call.", tags: ["premature-pitch"] }
          ],
          teaching: "In GAP, mirrors let the prospect name the cost. Their words, their conclusion, your frame." },
        { t: "say", who: "npc", text: "Yeah. Two, three hours a week, easy — and I still miss some. Those folks end up at the shop across town with the fancy site.", emotion: "annoyed" },
        { t: "choose", stage: "recommend", tool: "anchor",
          setup: "Confirm the full picture in Hank's compact language before recommending anything.",
          options: [
            { text: "Let me make sure I have this right: hours missing online, DMs at 10pm, missed folks going elsewhere. Accurate?", quality: 3, feedback: "The RECOMMEND confirmation, efficiency-tight: current state, gap, impact — checked, not assumed. He confirms; you've earned the recommendation. +20", tags: [] },
            { text: "Here's my understanding: no clear info online, inquiries in late-night DMs, some slipping away. Did I get that right?", quality: 2, feedback: "A good neutral summary-and-check — just less compact than his wiring prefers. +8", tags: [] },
            { text: "So basically you need a website, right?", quality: 1, feedback: "Forced agreement: you told him his conclusion instead of confirming the facts. People trust conclusions they help articulate — not ones you hand them.", tags: ["forced-agreement"] },
            { text: "You definitely need the managed plan — it's perfect for garages.", quality: 1, feedback: "Recommending before the summary is confirmed. Diagnose before prescribing — one frame, in order.", tags: ["premature-pitch", "skips-discovery"] }
          ],
          teaching: "RECOMMEND starts with \"Let me make sure I have this right... Is that accurate?\" — never with the offer." },
        { t: "offer",
          setup: "Recommend the correct structure for Hank: wants inquiries handled and zero website chores, keeps his domain, content, data, and payment accounts.",
          options: ["managed", "ownership", "custom", "none"],
          answer: "managed",
          feedback: {
            managed: "Correct. Strategy, build, hosting, security, monitoring, maintenance, basic lead delivery, and support — Hank never becomes his own web team, and he keeps his domain and data. +40",
            ownership: "Ownership hands him the build — and the hosting, maintenance, and updates with it. Those are exactly the chores he wants gone. Wrong fit.",
            custom: "Nothing he described sits outside the defined website scope. A separate audit solves a problem he doesn't have.",
            none: "There IS a fit: a named gap and a structure that removes it. A clean no-fit is a win — but only when it's true."
          } },
        { t: "objection", objectionText: "I had a bad experience with another developer.",
          steps: [
            { step: "receive", npcLine: "Last guy I hired took a deposit and vanished for four months.",
              options: [
                { text: "I'm sorry that happened. An experience like that makes caution reasonable, not difficult.", quality: 3, feedback: "Perfect receive: you validated the scar instead of defending the category. Hank nods slowly. +15", tags: [] },
                { text: "That's rough — sadly, I hear stories like that a lot.", quality: 2, feedback: "Sympathetic, but 'I hear that a lot' vaguely indicts your own profession — including you. +8", tags: [] },
                { text: "Trust me, I'm nothing like that guy — I actually deliver.", quality: 1, feedback: "'Trust me' is a banned phrase, and promises aren't structure. Differentiate by process, never by assurance.", tags: ["manipulation"] }
              ] },
            { step: "clarify", npcLine: "So you'll understand if I'm careful with deposits now.",
              options: [
                { text: "What actually went wrong — communication, deadlines, or what happened after the site was delivered?", quality: 3, feedback: "Exact clarify: you asked for the specific failure so you can answer it with a specific structure. +15", tags: [] },
                { text: "Careful makes sense. What would need to be different this time?", quality: 2, feedback: "A fair question, but it asks him to design the safeguard instead of first naming what failed. +8", tags: [] },
                { text: "How much did you lose? Ballpark figure.", quality: 1, feedback: "Prying into his losses isn't diagnosis — it's rubbernecking. The failure pattern matters; the dollar amount doesn't.", tags: ["off-frame"] }
              ] },
            { step: "isolate", npcLine: "Deadlines, mostly. Then silence. I'd text, nothing for weeks.",
              options: [
                { text: "If that failure — silence and missed deadlines — were structurally prevented here, would anything else make you hesitant?", quality: 3, feedback: "Clean isolate: the named failure versus everything else. One variable left on the table. +15", tags: [] },
                { text: "Got it. And besides that, anything else worrying you?", quality: 2, feedback: "Right instinct, looser phrasing — 'worrying you' invites drift instead of testing the fit. +8", tags: [] },
                { text: "If I promise weekly updates, you'll sign today, right?", quality: 1, feedback: "Isolation is a flashlight, not a handcuff — and 'I promise' is assurance instead of structure. Pressure plus promises: double fault.", tags: ["pressure", "manipulation"] }
              ] },
            { step: "resolve", npcLine: "No, that's really it. I can't chase another contractor. I've got cars to fix.",
              options: [
                { text: "Then the structural answer: defined scope in writing, exact price and term, stated support obligations — you never chase anyone.", quality: 3, feedback: "Resolve by structure, not by criticism of the other developer. The safeguard is documented, not promised. +15", tags: [] },
                { text: "Under the managed plan, support and maintenance are included — I'm accountable, and you can always reach me.", quality: 2, feedback: "True and warm, but 'you can always reach me' is a personal assurance where written terms would be stronger. +8", tags: [] },
                { text: "I guarantee I'll answer every text within the hour.", quality: 1, feedback: "An overpromise you can't sustain — the same species of claim that burned him last time. Structure, not vows.", tags: ["manipulation"] }
              ] },
            { step: "decide", npcLine: "Alright. Writing it down works for me. What now?",
              options: [
                { text: "I send the agreement today, we schedule onboarding, and the build starts. Ready to move forward with the managed plan?", quality: 3, feedback: "Clean decide: mechanical next step, direct question, zero confetti. Hank extends a greasy hand. +15", tags: [] },
                { text: "I'll email the agreement — look it over when the shop's quiet.", quality: 2, feedback: "Reasonable, but it leaves the decision floating without a defined next step. +8", tags: [] },
                { text: "Let's skip the paperwork and I'll start tonight — saves us both time.", quality: 1, feedback: "Work begins under the agreement, for every client. Informal starts erase the protection that just won him over.", tags: ["off-frame"] }
              ] }
          ] },
        { t: "say", who: "npc", text: "Ha. Straight answers and no runaround. My sister's going to take all the credit for this, you know.", emotion: "impressed" },
        { t: "end", outcome: "close", text: "Hank signs between brake jobs. The garage gets a site that works as hard as he does — and his couch gets its evenings back.", emotion: "happy" }
      ],
      starThresholds: [0.55, 0.8],
      unlockAfter: null
    },

    {
      id: "sim-florist",
      region: "closing-summit",
      name: "Simulated Call: The Flower Shop",
      subtitle: "A full call with an independence-first florist",
      intro: "Run the complete master frame with Petra — and land the one-time structure where it belongs.",
      npc: {
        id: "petra-lindqvist",
        name: "Petra Lindqvist",
        business: "Lindqvist Flowers",
        role: "Owner, 12 years",
        primary: "freedom",
        secondary: "novelty",
        personality: "Independent, creative, allergic to recurring commitments. Petra's family helps run the shop, and she wants her assets in her own hands.",
        portrait: { skin: "#f6d7b8", hair: "long-flow", hairColor: "#8a5a2b", outfit: "#74b816", accessory: "earring", bg: "#f3e5f5" }
      },
      teaches: ["open", "intent", "process", "gap", "priority", "recommend", "decide"],
      beats: [
        { t: "say", who: "narrator", text: "Practice simulation — Closing Summit. Lindqvist Flowers smells like eucalyptus and independence. Petra waves you past a wall of tulip buckets.", emotion: "neutral" },
        { t: "say", who: "npc", text: "Thanks for coming by — mind the buckets. I'll be honest: I don't want to be tied down to anyone, but our site is from 2014. I want something fresh — not another florist template.", emotion: "neutral" },
        { t: "identify", prompt: "Who are you talking to?",
          options: ["freedom", "certainty", "status", "connection"],
          answer: { primary: "freedom", secondary: "novelty" },
          feedbackWin: "\"Don't want to be tied down\" is the Freedom tell — control and independence. \"Fresh, not another template\" is the Novelty undertone. +80",
          feedbackLose: "\"Tied down\" is the key — that's Freedom, not Certainty. Certainty asks 'what if it breaks'; Freedom says 'don't box me in.' The template complaint is your Novelty clue. Try again.",
          points: 80 },
        { t: "say", who: "npc", text: "Exactly. So — what do you need from me?", emotion: "happy" },
        { t: "choose", stage: "intent", tool: null,
          setup: "OPEN is done. Ask the master INTENT question — in Petra's freedom language.",
          options: [
            { text: "What made you start looking for a setup that gives you more control and less day-to-day friction?", quality: 3, feedback: "The master INTENT question, freedom-translated. You asked why now through the lens of control — exactly her wiring. +20", tags: [] },
            { text: "What made you reach out now?", quality: 2, feedback: "The correct master question, untranslated. In-frame, but it doesn't speak to what she actually protects. +8", tags: [] },
            { text: "Are you ready to finally commit to a proper monthly plan?", quality: 1, feedback: "Two fouls: pressure, plus presuming the managed plan for someone who just told you she hates being tied down.", tags: ["pressure", "wrong-archetype"] },
            { text: "What's your marketing budget for this quarter?", quality: 1, feedback: "Budget is a PRIORITY-stage topic. Asking it at INTENT skips discovery and breaks the fixed frame.", tags: ["skips-discovery", "off-frame"] }
          ],
          teaching: "INTENT learns why now. For freedom archetypes, 'why now' is usually about control or friction." },
        { t: "say", who: "npc", text: "My daughter runs our Instagram and keeps begging me to fix the site. And I don't want to depend on an agency forever — I want to own my stuff outright.", emotion: "thinking" },
        { t: "choose", stage: "process", tool: "probe",
          setup: "Map the current path — the master PROCESS question, tuned to what Petra personally touches.",
          options: [
            { text: "Walk me through what happens today from someone hearing about the shop to ordering — especially which parts require you personally.", quality: 3, feedback: "PROCESS, freedom-translated: the journey plus her personal involvement. She maps it eagerly — she FEELS those steps. +20", tags: [] },
            { text: "Walk me through what happens today from the moment someone hears about the business to the moment they contact or book with you.", quality: 2, feedback: "The exact neutral master question — correct frame, no translation. +8", tags: [] },
            { text: "Who built the 2014 site, and why did you let it slide for a decade?", quality: 1, feedback: "Shaming a past decision isn't discovery. Normalize the situation; never make the prospect feel foolish for where the business is.", tags: ["off-frame"] },
            { text: "How many online orders do you do? Ballpark revenue?", quality: 1, feedback: "Numbers without a journey. You're harvesting data instead of understanding the process — off-frame.", tags: ["off-frame", "skips-discovery"] }
          ],
          teaching: "PROCESS reveals who touches what. For freedom archetypes, that map IS the pain map." },
        { t: "say", who: "npc", text: "Phone, mostly, and Instagram DMs my daughter juggles between classes. Orders get lost when we're slammed before Mother's Day. It's creative chaos — fun, but messy.", emotion: "thinking" },
        { t: "choose", stage: "gap", tool: "mirror",
          setup: "Petra just named a loaded detail. Mirror it to open the GAP.",
          options: [
            { text: "Orders get lost?", quality: 3, feedback: "Simple mirror on the costliest phrase. She'll now size the gap herself — and her own words are the ones she'll trust later. +20", tags: [] },
            { text: "How many orders would you estimate you lose in a busy week?", quality: 2, feedback: "A fair quantifying mirror — good instinct, but it jumps to numbers before she's finished feeling the problem. +8", tags: [] },
            { text: "So the real issue is your daughter can't keep up. Is that accurate?", quality: 1, feedback: "You pointed the gap at her daughter. Never blame a family member or employee — reflect the process, not a person.", tags: ["off-frame", "manipulation"] },
            { text: "We should automate all of that immediately.", quality: 1, feedback: "Pitching a fix before the gap is named. And custom automation is separately scoped — you just invented a bundle.", tags: ["premature-pitch"] }
          ],
          teaching: "GAP is where the prospect names the cost. Mirrors open the door; never assign blame to people." },
        { t: "say", who: "npc", text: "Enough that it stings. But listen — whatever we do, I'm not renting my own website forever. Monthly bills creep up like weeds.", emotion: "guarded" },
        { t: "choose", stage: "priority", tool: "anchor",
          setup: "Handle the 'no renting' signal inside PRIORITY — anchor the control points, then rank the problem.",
          options: [
            { text: "You keep your domain, content, and data under either structure — so how important is fixing this before the next rush?", quality: 3, feedback: "Ownership anchor plus the master PRIORITY question. You answered the control fear factually, then ranked the problem. +20", tags: [] },
            { text: "What would make this an easy yes without tying you down?", quality: 2, feedback: "A strong freedom-tuned priority question, but it leaves the ownership fear hanging unanswered. +8", tags: [] },
            { text: "The monthly plan is basically ownership after a while.", quality: 1, feedback: "False. The managed plan never transfers reusable source code, and blurring that line is exactly how trust dies.", tags: ["manipulation"] },
            { text: "Everyone pays monthly these days — it's just how it works.", quality: 1, feedback: "Forced agreement plus 'everyone does it' — the two things a freedom archetype is most allergic to.", tags: ["forced-agreement"] }
          ],
          teaching: "Anchors hold the frame when fear surfaces. Facts about control first, then the stage question." },
        { t: "offer",
          setup: "Recommend the correct structure for Petra: wants to own outright, has family who can host and maintain, allergic to recurring commitments.",
          options: ["managed", "ownership", "custom", "none"],
          answer: "ownership",
          feedback: {
            managed: "The recurring structure is precisely what she said creeps up like weeds. Recommending it here ignores her stated criteria. Wrong fit.",
            ownership: "Correct. $1,000 one time for the defined build and handoff to hosting she controls; ongoing work stays with her family — exactly the independence she asked for. +40",
            custom: "Nothing she described sits outside the defined build scope. A separate audit solves a problem she doesn't have.",
            none: "There IS a genuine fit — just on the one-time structure. No-fit is for when nothing honest serves them."
          } },
        { t: "objection", objectionText: "I am worried about ownership.",
          steps: [
            { step: "receive", npcLine: "Hang on — if you build it, who actually owns what? I've heard horror stories.",
              options: [
                { text: "That's an important question, and it deserves a precise answer rather than reassurance.", quality: 3, feedback: "Perfect receive: you elevated her ownership question instead of soothing it away. Petra uncrosses her arms. +15", tags: [] },
                { text: "Fair worry — let's get it completely clear before anything else.", quality: 2, feedback: "Warm and accepting, though 'let's get it clear' promises without yet valuing the question itself. +8", tags: [] },
                { text: "Don't worry about that stuff — it's all standard legal boilerplate.", quality: 1, feedback: "Ownership is never boilerplate to someone who's heard the horror stories. Dismissing it reads as hiding it.", tags: ["off-frame"] }
              ] },
            { step: "clarify", npcLine: "My cousin paid for a site once and the developer kept the domain. Took a lawyer to get it back.",
              options: [
                { text: "Is the worry about being locked in, or about losing assets you've built?", quality: 3, feedback: "Exact clarify in her freedom language — lock-in versus asset loss are different fears with different answers. +15", tags: [] },
                { text: "Which part matters most — the domain, your content and customer data, or owning the code itself?", quality: 2, feedback: "A precise neutral clarify — excellent question, slightly less tuned to the control frame she speaks. +8", tags: [] },
                { text: "That would never happen with me, so let's not dwell on it.", quality: 1, feedback: "An assurance in place of an answer. Her cousin got assurances too — she needs documents, not vibes.", tags: ["manipulation"] }
              ] },
            { step: "isolate", npcLine: "Both, honestly. I want the domain, the photos, the customer list — and the site itself, in my hands.",
              options: [
                { text: "If the ownership lines were settled in writing — domain, content, data, and the code itself — would that resolve it?", quality: 3, feedback: "Clean isolate: written ownership lines versus everything else. She's just defined her own win condition. +15", tags: [] },
                { text: "Understood. And if ownership were completely clear, you'd be comfortable moving ahead?", quality: 2, feedback: "Good isolation instinct, but 'comfortable moving ahead?' is softer than testing resolution directly. +8", tags: [] },
                { text: "If I promise all of that right now, we're done?", quality: 1, feedback: "Promises again — and a closing trap on top. She wants written lines, not verbal vows under pressure.", tags: ["pressure"] }
              ] },
            { step: "resolve", npcLine: "Yes. If it's mine — really mine — I'm happy.",
              options: [
                { text: "Then the facts: the ownership build is $1,000 one time — the defined build, handed off to hosting you control. The code is the deliverable.", quality: 3, feedback: "Resolve with exact facts: price, structure, handoff, and what the deliverable is. That's what 'really mine' means in writing. +15", tags: [] },
                { text: "Under ownership, the site is yours outright — domain, content, and code — with hosting and upkeep in your family's hands.", quality: 2, feedback: "Accurate and warm, but it skips the price and the defined scope — the facts that make it verifiable. +8", tags: [] },
                { text: "And if you ever want changes later, I'll do them free, forever.", quality: 1, feedback: "An invented promise — ongoing work is excluded from the ownership build, and 'free forever' is a terms change you can never honor.", tags: ["manipulation", "terms-change"] }
              ] },
            { step: "decide", npcLine: "That is exactly what I wanted to hear. What happens next?",
              options: [
                { text: "I send the agreement today, we schedule the build, and at handoff everything sits on hosting you control. Shall we start?", quality: 3, feedback: "Clean decide: concrete sequence, control reaffirmed, direct question. Petra picks up a pen like a bouquet. +15", tags: [] },
                { text: "I'll email the agreement — review it with your daughter and we'll talk this week.", quality: 2, feedback: "A real next step, though it adds a delay she didn't ask for. She's ready — let her decide. +8", tags: [] },
                { text: "Great — pay half now in cash and I'll squeeze you in before Mother's Day.", quality: 1, feedback: "Invented payment terms plus urgency pressure. The process is the same for every client — agreement first, then work.", tags: ["pressure", "terms-change"] }
              ] }
          ] },
        { t: "say", who: "npc", text: "Fresh flowers, fresh site, and nobody's landlord. My daughter's going to be insufferable about being right, you know.", emotion: "impressed" },
        { t: "end", outcome: "close", text: "Petra signs the ownership agreement between bouquet orders. The shop gets a site it owns outright — and the 2014 site is finally composted.", emotion: "happy" }
      ],
      starThresholds: [0.55, 0.8],
      unlockAfter: null
    }
  ],

  randomNpcPool: [
    {
      id: "marta-kowalski",
      name: "Marta Kowalski",
      business: "Kowalski Bakery",
      role: "Owner, 15 years",
      primary: "contribution",
      secondary: "connection",
      personality: "Community pillar who measures success in fed neighbors. Sponsors the little league; remembers every regular's order.",
      portrait: { skin: "#e9b98d", hair: "bun", hairColor: "#b8b8c0", outfit: "#c92a2a", accessory: "none", bg: "#ffe8d6" }
    },
    {
      id: "devon-reece",
      name: "Devon Reece",
      business: "Reece Cycling Co.",
      role: "Founder",
      primary: "growth",
      secondary: "efficiency",
      personality: "Ex-racer chasing the shop's next level. Talks in split times and conversion rates; has zero patience for fluff.",
      portrait: { skin: "#6b4226", hair: "short-crop", hairColor: "#2b2b2b", outfit: "#e8590c", accessory: "cap", bg: "#fff3c9" }
    },
    {
      id: "anita-sharma",
      name: "Dr. Anita Sharma",
      business: "Sharma Dental Studio",
      role: "Owner & Lead Dentist",
      primary: "certainty",
      secondary: "intelligence",
      personality: "Methodical and precise. Reads every clause, asks what happens if things break, and respects anyone who says 'I don't know' honestly.",
      portrait: { skin: "#c98a5e", hair: "side-part", hairColor: "#2b2b2b", outfit: "#0c8599", accessory: "glasses", bg: "#d6f5f5" }
    },
    {
      id: "tommy-wu",
      name: "Tommy Wu",
      business: "Wu & Sons Seafood",
      role: "Third-generation Owner",
      primary: "status",
      secondary: "recognition",
      personality: "Proud guardian of a family name on the waterfront. Expects peer-level respect and wants the market to finally see the quality his grandfather built.",
      portrait: { skin: "#e9b98d", hair: "side-part", hairColor: "#2b2b2b", outfit: "#31456b", accessory: "none", bg: "#dbe9f7" }
    },
    {
      id: "lena-fischer",
      name: "Lena Fischer",
      business: "Fischer Pottery Studio",
      role: "Owner & Artist",
      primary: "novelty",
      secondary: "contribution",
      personality: "Bored by anything beige. Wants a site as distinctive as her glazes — and one that helps her teach free weekend classes for kids.",
      portrait: { skin: "#f6d7b8", hair: "curly", hairColor: "#d94f2b", outfit: "#74b816", accessory: "earring", bg: "#f7e8ff" }
    },
    {
      id: "ray-delgado",
      name: "Ray Delgado",
      business: "Delgado Landscaping",
      role: "Owner, 9 years",
      primary: "freedom",
      secondary: "efficiency",
      personality: "Self-made and self-reliant. Wants every asset in his name, every process simple, and zero vendors he can't walk away from.",
      portrait: { skin: "#8d5a3b", hair: "bald-shine", hairColor: "#2b2b2b", outfit: "#2b8a3e", accessory: "cap", bg: "#e2f4d9" }
    }
  ]
};
