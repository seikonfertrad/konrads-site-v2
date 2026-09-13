// Axes — the problems the two atlases configure differently.
// Each axis is a question with two poles; each pole lists the concepts (from either map)
// that configure the problem that way. A concept may sit on several axes, but never on
// both poles of one. Cross-map edge types are derived from these positions:
//   écart    = the two concepts sit on opposite poles of the edge's axis
//   parallel = the two concepts sit on the same pole, reached from different lineages
//   kinship  = shared lineage (asserted, not derived; carries a `lineage` label instead of an axis)
// The audit script (tools/atlas-audit.mjs) enforces this.

window.ATLAS_AXES = {
  axes: [
    { id: "agency", question: "How does effective action relate to the situation it acts on?",
      poleA: { id: "imposition", label: "Imposition", gloss: "The agent, the plan, or the objective imposes a form on circumstance and is credited for the imposition.",
        concepts: ["will", "plan", "telos", "praxis", "method", "pivotal-act", "counterfactual-impact", "expected-utility", "ai-alignment", "corrigibility", "longtermism", "wireheading", "instrumental-convergence", "cev"] },
      poleB: { id: "riding", label: "Riding the propensity", gloss: "Action leans on the situation's own tendency; the highest competence disappears into what it inflects.",
        concepts: ["shi", "yin", "wuwei", "ziran", "dao", "hua", "treacherous-turn"] } },

    { id: "moral-unit", question: "What is the unit of moral evaluation?",
      poleA: { id: "individual", label: "The individual", gloss: "The welfare, will, or entitlement of individuals — counted one by one, then perhaps aggregated.",
        concepts: ["utilitarianism", "expected-value", "moral-patient", "total-view", "person-affecting-view", "rights", "moral_law", "subject", "counterfactual-impact", "earning-to-give", "li-benefit"] },
      poleB: { id: "relation", label: "The relation", gloss: "The relation, role, or collective body from which persons precipitate; ethics is the cultivation of that relation.",
        concepts: ["ren", "li_ritual", "junzi", "role-ethics", "ars-contextualis", "aidagara", "guanxi", "gongtong-fuyu", "he"] } },

    { id: "scope", question: "How graded may moral concern be?",
      poleA: { id: "ungraded", label: "Ungraded", gloss: "Concern owed equally regardless of distance or relation; gradation is a bias to overcome.",
        concepts: ["impartiality", "moral-circle", "demandingness", "utilitarianism", "astronomical-waste", "jian-ai", "universal", "pov-universe"] },
      poleB: { id: "graded", label: "Graded", gloss: "Concern calibrated to the relation, unembarrassed about the calibration; the near comes before the far.",
        concepts: ["ren", "guanxi", "tianxia", "mianzi", "li_ritual"] } },

    { id: "formalization", question: "Does practical reason admit formalization without remainder?",
      poleA: { id: "formal", label: "Formal", gloss: "A procedure, calculus, or specification carries the reasoning; what it leaves out was not reasoning.",
        concepts: ["expected-value", "expected-utility", "bayesian-updating", "cdt", "fdt", "moral-uncertainty", "cause-prioritization", "inside-outside-view", "jisuan", "fa", "moral_law", "ai-alignment", "cev", "li-benefit", "probability-as-logic"] },
      poleB: { id: "judgment", label: "Cultivated judgment", gloss: "Judgment formed in practice carries the reasoning; every formalization leaves a remainder that is the ethical part.",
        concepts: ["ren", "phronesis", "zhi-wisdom", "ars-contextualis", "junzi", "virtue", "wuwei", "aidagara", "li_ritual", "ea-epistemics", "zhong"] } },

    { id: "commitment", question: "Should the mind be lodged in a position?",
      poleA: { id: "thesis", label: "Thesis", gloss: "The thinker is the one who claims X; the self is defined by what it holds.",
        concepts: ["subject", "eidos", "being", "moral_law"] },
      poleB: { id: "availability", label: "Availability", gloss: "Refusal to be lodged in any position in advance, so as to stay available to what the situation calls for.",
        concepts: ["zhong", "xu", "zhongguan", "moral-uncertainty", "cluelessness", "erdi"] } },

    { id: "change", question: "How does change happen, and what texture does time have?",
      poleA: { id: "event", label: "Event", gloss: "Marked events against a homogeneous continuum: the rupture, the takeoff, the moment that dates.",
        concepts: ["event", "kairos", "chronos", "praxis", "foom", "intelligence-explosion", "recursive-self-improvement", "longtermism", "pivotal-act"] },
      poleB: { id: "accumulation", label: "Accumulation", gloss: "Alternation and silent accumulation; no backdrop time, only the times-of-things.",
        concepts: ["hua", "bian", "shi_time", "ji"] } },

    { id: "timing", question: "When is intervention possible?",
      poleA: { id: "incipient", label: "Upstream", gloss: "Before the situation is legible, when inflection is cheap and nobody can yet see why it matters.",
        concepts: ["ji", "treacherous-turn", "existential-risk", "precipice", "vulnerable-world", "crucial-considerations"] },
      poleB: { id: "decisive", label: "At the moment", gloss: "At the manifest, decisive moment — theatrical, creditable, and usually expensive.",
        concepts: ["kairos", "event", "pivotal-act"] } },

    { id: "intelligence-value", question: "Does intelligence entail anything about value?",
      poleA: { id: "orthogonal", label: "Orthogonal", gloss: "Capability and values vary independently; a fact entails no value; a smarter system is not thereby a better one.",
        concepts: ["orthogonality-thesis", "ai-alignment", "instrumental-convergence", "intelligence-explosion", "is-ought"] },
      poleB: { id: "bundled", label: "Bundled", gloss: "Capacity without judgment is not yet intelligence; the order of things is already normative.",
        concepts: ["zhineng", "zhi-wisdom", "xin", "intellectual-intuition", "tian", "li_coherence", "junzi"] } },

    { id: "emergence", question: "Is what-is a substance or a configuration?",
      poleA: { id: "substance", label: "Substance", gloss: "Things are what they are in virtue of a form or essence; the territory is there behind the map.",
        concepts: ["being", "eidos", "subject", "map-territory"] },
      poleB: { id: "configuration", label: "Configuration", gloss: "What looks like a thing is the stable signature of dense conditioning relations; pattern is the thing.",
        concepts: ["yuanqi", "li_coherence", "qi", "organic-naturalism", "aidagara", "basho", "mesa-optimization", "erdi"] } },

    { id: "speech", question: "What makes speech or belief reliable?",
      poleA: { id: "correspondence", label: "Correspondence", gloss: "Reliable speech tracks the world: the proposition matches, the estimate is calibrated, the specification is met.",
        concepts: ["truth", "bayesian-updating", "map-territory", "ea-epistemics", "specification-gaming"] },
      poleB: { id: "passage", label: "Passage", gloss: "Reliable speech is what passes through — unblocked, durable, honored over time and between persons.",
        concepts: ["tong", "xin-trust", "mianzi"] } },

    { id: "order", question: "What is one responsible for at the largest scale?",
      poleA: { id: "maximize", label: "Maximize a quantity", gloss: "A quantity of value over a physical domain — the lightcone, the cosmic endowment, the extrapolated volition — to be made as large as possible.",
        concepts: ["lightcone", "astronomical-waste", "longtermism", "cev", "s-risks", "ai-alignment"] },
      poleB: { id: "cultivate", label: "Cultivate an order", gloss: "A shared world to be ordered and cultivated as common across genuine difference.",
        concepts: ["tianxia", "common", "he", "gongtong-fuyu"] } },

    { id: "human-nature", question: "Is the good already in human nature, or made?",
      poleA: { id: "given", label: "Given", gloss: "The good is in the endowment — sprouts to be grown, a volition to be extrapolated; cultivation removes what stunts it.",
        concepts: ["xing", "xin", "ziran", "cev"] },
      poleB: { id: "made", label: "Made", gloss: "The good is artifice: standards, ritual, engineering, designed for agents who cannot be relied on to be good.",
        concepts: ["wei-artifice", "fa", "ai-alignment", "corrigibility"] } }
  ],

  // Ideal agents — the figure each configuration holds up as what a good agent is.
  figures: [
    { tradition: "Confucian", figure: "君子 junzi / 聖人 sage", gloss: "The exemplary person whose cultivated comportment makes appropriateness legible to others.", concepts: ["junzi", "ren"] },
    { tradition: "Daoist", figure: "聖人 shengren, the sage", gloss: "Empty, available, acting so lightly that the situation seems to have moved itself.", concepts: ["wuwei", "xu"] },
    { tradition: "Mohist", figure: "賢 the worthy", gloss: "The impartial administrator who benefits all under heaven by standard and measure, not by kinship.", concepts: ["jian-ai", "li-benefit"] },
    { tradition: "Legalist", figure: "The ruler of standards", gloss: "The ruler who need not be virtuous because the standards are exposed and the enforcement certain.", concepts: ["fa"] },
    { tradition: "Xunzi", figure: "The sage-artificer", gloss: "The maker of ritual who straightens a crooked nature by deliberate effort.", concepts: ["wei-artifice", "li_ritual"] },
    { tradition: "Aristotelian", figure: "φρόνιμος phronimos", gloss: "The person of practical wisdom who perceives what the particular case requires.", concepts: ["phronesis", "virtue"] },
    { tradition: "Kantian", figure: "The rational agent", gloss: "The will that legislates the universal law to itself and acts from duty.", concepts: ["moral_law", "subject"] },
    { tradition: "Bayesian rationalism", figure: "The ideal Bayesian agent", gloss: "The coherent updater whose beliefs track evidence and whose choices maximize expected utility.", concepts: ["bayesian-updating", "expected-utility"] },
    { tradition: "Effective altruism", figure: "The effective altruist", gloss: "The impartial donor-or-worker who ranks causes by counterfactual good per unit of resource.", concepts: ["cause-prioritization", "counterfactual-impact"] },
    { tradition: "AI safety", figure: "The aligned AI", gloss: "A system whose pursued objective matches what its designers actually want — the only tradition whose ideal agent is a machine.", concepts: ["ai-alignment", "corrigibility"] }
  ]
};
