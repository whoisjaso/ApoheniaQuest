// APOHENIA: SALES QUEST — Meta part (00-meta.js)
// Plain JS, no modules. Defines window.__SQ_PARTS["meta"].

window.__SQ_PARTS = window.__SQ_PARTS || {};

window.__SQ_PARTS["meta"] = {

  title: {
    gameName: "APOHENIA: SALES QUEST",
    tagline: "One frame. Ten egos. Read the pattern, win the call.",
    menuLabels: {
      newGame: "New Game",
      continue: "Continue",
      adventure: "Adventure Mode",
      practice: "Practice Mode",
      avatar: "Avatar",
      options: "Options",
      musicOn: "Music On",
      musicOff: "Music Off",
      multiplayer: "Multiplayer — Coming Later"
    }
  },

  archetypes: {
    intelligence: {
      id: "intelligence",
      name: "Intelligence / Competence",
      tells: [
        "Cites research, data, or years of experience: \"I researched...\", \"I've been in this industry...\"",
        "Uses technical or process words: \"technically\", \"the process\", \"the reasoning\"",
        "Wants the logic and evidence before moving; asks how things actually work",
        "Resists hype and wants to feel the decision is one they reasoned through themselves"
      ],
      color: "#3b5bdb"
    },
    status: {
      id: "status",
      name: "Status / Authority",
      tells: [
        "Speaks from position: \"My company...\", \"I built...\", \"My team...\", \"At our level...\"",
        "References reputation, competitors, and being taken seriously",
        "Expects peer-level respect and high standards, not flattery or permission-seeking",
        "Reacts badly to being treated as ordinary or boxed in"
      ],
      color: "#b8860b"
    },
    certainty: {
      id: "certainty",
      name: "Certainty / Security",
      tells: [
        "Asks conditional questions: \"What happens if...\", \"How do I know...\", \"What if something breaks?\"",
        "Wants scope, timeline, terms, and ownership spelled out exactly",
        "Asks who owns what and what support they get after launch",
        "Dislikes vague promises, rushed decisions, and \"we'll figure it out later\""
      ],
      color: "#0c8599"
    },
    freedom: {
      id: "freedom",
      name: "Freedom / Autonomy",
      tells: [
        "Talks about control and independence: \"I don't want to be tied down\", \"I want options\"",
        "Complains about doing everything themselves or depending on a vendor",
        "Worries about lock-in, losing ownership, and rigid systems",
        "Hates being rushed and wants flexibility on timing and commitment"
      ],
      color: "#2b8a3e"
    },
    growth: {
      id: "growth",
      name: "Growth / Achievement",
      tells: [
        "Speaks in forward motion: \"scale\", \"next level\", \"more leads\", \"expand\", \"more revenue\"",
        "Measures everything; wants milestones and momentum, not maintenance",
        "Fears stagnation, lost momentum, and being surpassed by competitors",
        "Connects decisions to targets, seasons, campaigns, and expansion plans"
      ],
      color: "#e8590c"
    },
    connection: {
      id: "connection",
      name: "Connection / Trust",
      tells: [
        "Centers people: \"My customers...\", \"My family...\", \"My team...\", \"I want people to feel...\"",
        "Says communication and trust matter; wants someone they can rely on",
        "Fears abandonment, impersonal service, and poor communication",
        "Decides jointly and mentions partners, spouses, or staff naturally"
      ],
      color: "#d6336c"
    },
    recognition: {
      id: "recognition",
      name: "Recognition / Validation",
      tells: [
        "Feels unseen: \"People don't realize...\", \"We are better than we look\", \"The quality is there, but...\"",
        "Says the website doesn't show what the business is really capable of",
        "Wants customers to understand the real quality; fears being overlooked or underestimated",
        "Values accurate representation and proof, not empty compliments"
      ],
      color: "#862e9c"
    },
    novelty: {
      id: "novelty",
      name: "Novelty / Innovation",
      tells: [
        "Wants difference: \"Something different\", \"unique\", \"I want it to stand out\", \"I'm bored with...\"",
        "Gets excited about new tools, trends, and ideas they want to try",
        "Fears sameness, looking generic, and rigid cookie-cutter systems",
        "Asks what's possible rather than what's standard"
      ],
      color: "#74b816"
    },
    contribution: {
      id: "contribution",
      name: "Contribution / Service",
      tells: [
        "Talks about giving back: community, charity work, sponsoring local events, mentoring",
        "Measures success by impact on customers' and neighbors' lives, not just profit",
        "Asks how the business can serve more people or serve them better",
        "Pride focuses on being useful and trusted in the community, not on status"
      ],
      color: "#c92a2a"
    },
    efficiency: {
      id: "efficiency",
      name: "Efficiency / Pragmatism",
      tells: [
        "Counts time and effort: \"How long will this take?\", \"I don't have hours to waste\"",
        "Wants simple, practical answers; allergic to jargon, meetings, and process for its own sake",
        "Asks about the practical return on effort: what gets done, by whom, how fast",
        "Cuts to the chase; dislikes waste, redundancy, and anything that adds steps"
      ],
      color: "#495057"
    }
  },

  regions: [
    {
      id: "opening-village",
      name: "Opening Village",
      mapBlurb: "Every quest begins with a friendly hello and a fair frame.",
      theme: { sky: "#aee2ff", ground: "#8fcf6e", accent: "#ffcf5c" },
      icon: "village"
    },
    {
      id: "intent-gardens",
      name: "Intent Gardens",
      mapBlurb: "Dig in the flowerbeds to find out why they reached out now.",
      theme: { sky: "#d8f5d0", ground: "#4fae62", accent: "#ff8fb3" },
      icon: "garden"
    },
    {
      id: "experience-trail",
      name: "Experience Trail",
      mapBlurb: "Follow the footprints of what they've actually seen and measured.",
      theme: { sky: "#ffe9c2", ground: "#c98d4e", accent: "#5c8a3a" },
      icon: "trail"
    },
    {
      id: "process-forest",
      name: "Process Forest",
      mapBlurb: "Map every step from first hearing about the business to booking.",
      theme: { sky: "#9fd8b4", ground: "#1f6f43", accent: "#d9f24f" },
      icon: "forest"
    },
    {
      id: "gap-caverns",
      name: "Gap Caverns",
      mapBlurb: "Descend into the dark to name what's broken and what it costs.",
      theme: { sky: "#2e2140", ground: "#4a3350", accent: "#b388ff" },
      icon: "cave"
    },
    {
      id: "impact-city",
      name: "Impact City",
      mapBlurb: "Skyscrapers of consequence: what does the gap do to the business?",
      theme: { sky: "#7fb3e0", ground: "#5a6b7d", accent: "#ffb347" },
      icon: "city"
    },
    {
      id: "future-fields",
      name: "Future Fields",
      mapBlurb: "Golden fields of what life looks like six months after it works.",
      theme: { sky: "#fff3b0", ground: "#d9b64a", accent: "#ff7b54" },
      icon: "fields"
    },
    {
      id: "recommendation-castle",
      name: "Recommendation Castle",
      mapBlurb: "Hold court: summarize in their words, then name the right structure.",
      theme: { sky: "#c3cfe8", ground: "#8d7bb8", accent: "#ffd700" },
      icon: "castle"
    },
    {
      id: "objection-arena",
      name: "Objection Arena",
      mapBlurb: "Seven bosses guard the gates. Receive, clarify, isolate, resolve, decide.",
      theme: { sky: "#3d1f2b", ground: "#7a2e2e", accent: "#ff5c5c" },
      icon: "arena",
      bossRegion: true
    },
    {
      id: "closing-summit",
      name: "Closing Summit",
      mapBlurb: "Thin air, clear terms, calm decisions. The view is worth the climb.",
      theme: { sky: "#dff4ff", ground: "#eef6fa", accent: "#3d9df2" },
      icon: "summit"
    }
  ],

  scoring: {
    IDENTIFY_PRIMARY: 50,
    IDENTIFY_SECONDARY: 30,
    CHOICE_BEST: 20,
    CHOICE_OK: 8,
    penalties: {
      "wrong-archetype": -8,
      "off-frame": -12,
      "flattery": -10,
      "forced-agreement": -12,
      "manipulation": -25,
      "premature-pitch": -15,
      "terms-change": -30,
      "skips-discovery": -15,
      "pressure": -25
    },
    OFFER_CORRECT: 40,
    OBJECTION_STEP_BEST: 15,
    BOSS_WIN: 150,
    STREAK_BONUS: 5
  },

  ranks: [
    { minXP: 0, name: "New Voice" },
    { minXP: 300, name: "Curious Caller" },
    { minXP: 800, name: "Sharp Listener" },
    { minXP: 1500, name: "Frame Keeper" },
    { minXP: 2500, name: "Mirror Adept" },
    { minXP: 4000, name: "Anchor Smith" },
    { minXP: 6000, name: "Deal Shepherd" },
    { minXP: 9000, name: "Pattern Master" }
  ],

  achievements: [
    { id: "ach-first-clear", name: "First Handshake", desc: "Complete your first level in Adventure Mode.", rule: { type: "levels", n: 1 } },
    { id: "ach-path-walker", name: "Path Walker", desc: "Complete 5 levels along the winding path.", rule: { type: "levels", n: 5 } },
    { id: "ach-summit-grad", name: "Summit Graduate", desc: "Complete all 10 levels of the adventure map.", rule: { type: "levels", n: 10 } },
    { id: "ach-stars-3", name: "Three-Star Debut", desc: "Earn your first 3 stars — a perfect clear on any level.", rule: { type: "stars", n: 3 } },
    { id: "ach-stars-12", name: "Constellation", desc: "Collect 12 stars across the map.", rule: { type: "stars", n: 12 } },
    { id: "ach-stars-24", name: "Sky Full of Stars", desc: "Collect 24 stars across the map.", rule: { type: "stars", n: 24 } },
    { id: "ach-frame-keeper", name: "Frame Keeper", desc: "Reach Rank 4 — Frame Keeper (1,500 XP).", rule: { type: "xp", n: 1500 } },
    { id: "ach-deal-shepherd", name: "Deal Shepherd", desc: "Reach Rank 7 — Deal Shepherd (6,000 XP).", rule: { type: "xp", n: 6000 } },
    { id: "ach-streak-5", name: "Hot Streak", desc: "Answer 5 choices perfectly in a row.", rule: { type: "streak", n: 5 } },
    { id: "ach-streak-10", name: "Unstoppable", desc: "Answer 10 choices perfectly in a row.", rule: { type: "streak", n: 10 } },
    { id: "ach-boss-1", name: "First Giant Slain", desc: "Win your first boss battle in the Objection Arena.", rule: { type: "bosses", n: 1 } },
    { id: "ach-boss-3", name: "Arena Contender", desc: "Win 3 boss battles in the Objection Arena.", rule: { type: "bosses", n: 3 } },
    { id: "ach-boss-7", name: "Arena Champion", desc: "Defeat all 7 objection bosses.", rule: { type: "bosses", n: 7 } },
    { id: "ach-drills-20", name: "Gym Rat", desc: "Complete 20 practice drills of any kind.", rule: { type: "drills", n: 20 } },
    { id: "ach-drills-50", name: "Repetition Machine", desc: "Complete 50 practice drills. The frame is becoming reflex.", rule: { type: "drills", n: 50 } }
  ],

  dialogueSkills: [
    {
      id: "skill-clarifying-mirror",
      name: "Clarifying Mirror",
      desc: "Unlocks \"What do you mean by that?\" as a tool option — turns a vague or loaded NPC statement into something you can examine together. How to unlock: complete your first level in Adventure Mode.",
      unlockAt: "level:lv-opening-1"
    },
    {
      id: "skill-meaning-mirror",
      name: "Meaning Mirror",
      desc: "Unlocks meaning mirrors — reflect the deeper issue under the surface statement and check accuracy: \"So the real issue is... Is that accurate?\" How to unlock: collect 9 total stars.",
      unlockAt: "stars:9"
    },
    {
      id: "skill-identity-anchor",
      name: "Identity Anchor",
      desc: "Unlocks identity anchors — connect the offer to a value the NPC stated in their own words. Never identity shaming, always truthful. How to unlock: win your first boss battle in the Objection Arena.",
      unlockAt: "achievement:ach-boss-1"
    },
    {
      id: "skill-silence-anchor",
      name: "Silence Anchor",
      desc: "Unlocks the silence anchor after price or decision questions — state it, pause, let them think. The silence belongs to the NPC. How to unlock: reach Rank 4 — Frame Keeper.",
      unlockAt: "rank:3"
    },
    {
      id: "skill-clean-no-fit",
      name: "Clean No-Fit",
      desc: "Unlocks the honest disqualify line — when nothing fits, say so warmly and leave the door open. A qualified no is a winning outcome. How to unlock: win 3 boss battles in the Objection Arena.",
      unlockAt: "achievement:ach-boss-3"
    },
    {
      id: "skill-partner-bridge",
      name: "Partner Bridge",
      desc: "Unlocks the partner-invitation line — bring spouses and partners into a short follow-up so they hear the exact scope and terms directly. How to unlock: defeat the Third Chair Phantom (boss: \"I need to speak with my partner\") — proven by earning the Arena Champion achievement for defeating all 7 bosses.",
      unlockAt: "achievement:ach-boss-7"
    }
  ],

  avatarCatalog: {
    skinTones: ["#f6d7b8", "#e9b98d", "#c98a5e", "#8d5a3b", "#6b4226", "#4a2c17"],
    faces: ["round", "oval", "square", "heart", "long"],
    hairs: [
      { id: "buzz", label: "Buzz Cut", unlockAt: "start" },
      { id: "short-crop", label: "Short Crop", unlockAt: "start" },
      { id: "curly", label: "Curly Top", unlockAt: "start" },
      { id: "side-part", label: "Side Part", unlockAt: "level:lv-intent-2" },
      { id: "long-flow", label: "Long Flow", unlockAt: "stars:6" },
      { id: "bun", label: "Analyst Bun", unlockAt: "rank:3" },
      { id: "mohawk", label: "Arena Mohawk", unlockAt: "stars:12" },
      { id: "bald-shine", label: "Boss-Slayer Shine", unlockAt: "achievement:ach-boss-3" }
    ],
    hairColors: ["#2b2b2b", "#5b3a1e", "#8a5a2b", "#b8b8c0", "#d94f2b", "#3f6fb5"],
    outfits: [
      { id: "hoodie", label: "Discovery Hoodie", color: "#4a6fa5", unlockAt: "start" },
      { id: "polo", label: "Garden Polo", color: "#2f9e44", unlockAt: "start" },
      { id: "tee", label: "Trail Tee", color: "#e8590c", unlockAt: "start" },
      { id: "blazer", label: "Cavern Blazer", color: "#31456b", unlockAt: "level:lv-gap-5" },
      { id: "flannel", label: "Forest Flannel", color: "#a0522d", unlockAt: "stars:9" },
      { id: "summit-jacket", label: "Summit Jacket", color: "#c92a2a", unlockAt: "rank:5" }
    ],
    accessories: [
      { id: "none", label: "None", unlockAt: "start" },
      { id: "glasses", label: "Analyst Glasses", unlockAt: "start" },
      { id: "cap", label: "Pathfinder Cap", unlockAt: "start" },
      { id: "earring", label: "Signal Earring", unlockAt: "stars:6" },
      { id: "beard", label: "Wise Beard", unlockAt: "level:lv-experience-3" },
      { id: "scarf", label: "Streak Scarf", unlockAt: "achievement:ach-streak-5" }
    ],
    notebooks: [
      { id: "field-notes", label: "Field Notes", color: "#8d5a3b", unlockAt: "start" },
      { id: "pocket-pad", label: "Pocket Pad", color: "#31456b", unlockAt: "start" },
      { id: "crimson-ledger", label: "Crimson Ledger", color: "#c92a2a", unlockAt: "stars:12" },
      { id: "pattern-folio", label: "Pattern Folio", color: "#862e9c", unlockAt: "rank:6" },
      { id: "arena-tome", label: "Arena Tome", color: "#b8860b", unlockAt: "achievement:ach-boss-7" }
    ],
    dialogueThemes: [
      { id: "parchment", label: "Parchment", unlockAt: "start" },
      { id: "night-sky", label: "Night Sky", unlockAt: "start" },
      { id: "forest", label: "Forest", unlockAt: "stars:9" },
      { id: "arena", label: "Arena", unlockAt: "achievement:ach-boss-1" }
    ],
    titles: [
      { id: "founder", label: "Founder", unlockAt: "start" },
      { id: "rookie", label: "Quest Rookie", unlockAt: "start" },
      { id: "mirror-adept", label: "Mirror Adept", unlockAt: "rank:4" },
      { id: "anchor-smith", label: "Anchor Smith", unlockAt: "rank:5" },
      { id: "boss-whisperer", label: "Boss Whisperer", unlockAt: "achievement:ach-boss-3" },
      { id: "pattern-master", label: "Pattern Master", unlockAt: "rank:7" }
    ]
  },

  defaults: {
    avatar: {
      name: "Jason",
      title: "Founder",
      skin: 0,
      face: 0,
      hair: 0,
      hairColor: 0,
      outfit: 0,
      accessory: 0,
      notebook: 0,
      theme: 0
    }
  }
};
