// Lightcone Atlas — concepts, thinkers, traditions, disputes from the LW/EA/rationalist sphere
// All glosses, profiles, and dispute summaries are original prose composed for this site.
// No copyrighted text is reproduced.

window.LIGHTCONE_DATA = {

  // ─────────────────────────── TRADITIONS ───────────────────────────
  traditions: [
    { id: "classical-utilitarian", name: "Classical utilitarianism", period: "1780s – 1900s", color: "#5a7a8a", xPos: 1.0, yPos: -0.2,
      capsule: "Bentham, Mill, Sidgwick: ethics as the maximization of aggregate welfare across all sentient beings, derived not from divine command or social contract but from the bare structure of interest. The intellectual lineage on which the contemporary EA cluster builds, claimed and updated rather than left behind." },
    { id: "bayesian-rationalism", name: "Bayesian rationalism", period: "2000s –", color: "#3a6b75", xPos: 1.0, yPos: 0.4,
      capsule: "The intellectual culture that congealed around Eliezer Yudkowsky's Sequences and the LessWrong forum: probability theory as the structure of correct belief, decision theory as the structure of correct action, biases as the systematic ways minds deviate from each. A self-improvement project as much as an epistemology, with characteristic vocabulary (priors, updating, map-territory, inside-outside view) that has spread beyond its origin." },
    { id: "effective-altruism", name: "Effective altruism", period: "2007 –", color: "#2c4a52", xPos: 1.0, yPos: -0.2,
      capsule: "The movement that grew from GiveWell's cost-effectiveness analyses (Karnofsky, 2007) and the Oxford-based 80,000 Hours/CEA cluster (Ord, MacAskill, late 2000s): the proposition that doing good admits of empirical inquiry, that interventions differ by orders of magnitude in cost-effectiveness, and that this difference is morally consequential rather than incidental. Splinters into near-term global health, animal welfare, and longtermist branches that disagree about scope but share method." },
    { id: "longtermism", name: "Longtermism", period: "2010s –", color: "#4a3c6a", xPos: 1.0, yPos: 0.2,
      capsule: "The branch of EA arguing that what happens to the long-run future dominates the moral calculus: most of value lies in the unrealized future, near-term interventions matter mainly through their effects on whether and how that future arrives. Strong forms (Greaves, MacAskill) take this as overwhelming; weak forms (most of the EA mainstream by 2020) treat it as one major consideration among others." },
    { id: "ai-safety", name: "AI safety / alignment", period: "2000s –", color: "#5a3c7a", xPos: 1.0, yPos: 0.5,
      capsule: "The research program organized around the proposition that advanced AI systems are likely both transformative and difficult to align with human values, and that progress on alignment lags progress on capability. Originated with Yudkowsky and the Singularity Institute / MIRI; broadened through Bostrom's <em>Superintelligence</em> (2014), Russell's <em>Human Compatible</em> (2019), and the labs (Anthropic, OpenAI safety teams, DeepMind alignment) by the early 2020s." },
    { id: "transhumanism", name: "Transhumanism", period: "1980s –", color: "#8a5a3c", xPos: 0.85, yPos: 0.6,
      capsule: "The broader intellectual stream — Drexler's nanotechnology, Bostrom and Sandberg at the Future of Humanity Institute, Hanson's emulations — proposing that humanity is a temporary configuration that radical biological and computational technologies will reshape. The Bay-Area-rationalist sphere descends partly from this lineage; longtermism and AI safety inherit its cosmic-scale framing." },
    { id: "suffering-focused", name: "Suffering-focused ethics / s-risk", period: "2010s –", color: "#4fa3f4", xPos: 0.5, yPos: 0.8,
      capsule: "The minority strand within EA that gives moral priority to the prevention of severe suffering over the production of welfare, especially at scale. Brian Tomasik's writings, the Center on Long-Term Risk (CLR), Magnus Vinding's work. Argues that the standard utilitarian calculus underweights suffering and that astronomical-scale suffering futures (s-risks) are at least as urgent as extinction risks." }
  ],

  // ─────────────────────────── THINKERS ───────────────────────────
  thinkers: [
    {
      id: "bentham", name: "Jeremy Bentham", dates: "1748 – 1832",
      tradition: "classical-utilitarian", nationality: "United Kingdom",
      key_works: ["An Introduction to the Principles of Morals and Legislation (1789)"],
      central_concepts: ["utilitarianism", "moral-circle"],
      contribution: "Founder of the utilitarian tradition. Argues that the only intelligible foundation for ethics and legislation is the maximization of aggregate happiness — pleasure minus pain — across all sentient beings, including non-human animals. The radical move was the impartial scope: a slave's suffering counts equally with a master's, an animal's with a human's, the question being not what kind of creature but whether it can suffer."
    },
    {
      id: "mill", name: "John Stuart Mill", dates: "1806 – 1873",
      tradition: "classical-utilitarian", nationality: "United Kingdom",
      key_works: ["Utilitarianism (1861)", "On Liberty (1859)"],
      central_concepts: ["utilitarianism"],
      contribution: "Bentham's heir who tried to reconcile utilitarianism with liberalism and with qualitative differences between higher and lower pleasures. The result is more humane and arguably less coherent than Bentham's stark calculus; the modern EA cluster generally honors Mill's name and works closer to Bentham's spirit."
    },
    {
      id: "singer", name: "Peter Singer", dates: "1946 –",
      tradition: "classical-utilitarian", nationality: "Australia / United States",
      key_works: ["Famine, Affluence, and Morality (1972)", "Animal Liberation (1975)", "The Most Good You Can Do (2015)"],
      central_concepts: ["impartiality", "demandingness", "moral-circle"],
      contribution: "The contemporary philosopher most directly responsible for the moral seriousness of effective altruism. <em>Famine, Affluence, and Morality</em> argues that the comfortable have stringent obligations to prevent severe suffering at trivial cost to themselves; <em>Animal Liberation</em> extends impartial moral concern across species. Both arguments are uncomfortable enough that most readers reject the conclusions while struggling to refuse the premises."
    },
    {
      id: "parfit", name: "Derek Parfit", dates: "1942 – 2017",
      tradition: "classical-utilitarian", nationality: "United Kingdom",
      key_works: ["Reasons and Persons (1984)", "On What Matters (2011, 2017)"],
      central_concepts: ["total-view", "person-affecting-view", "repugnant-conclusion"],
      contribution: "The philosopher who made population ethics impossible to ignore. <em>Reasons and Persons</em> works through the logical consequences of trying to compare outcomes that include different people (or different numbers of people), and produces the famous paradoxes — the Repugnant Conclusion, the Mere Addition Paradox, the Non-Identity Problem — that no subsequent population ethics has fully resolved. The intellectual ancestor of strong longtermism's quantitative turn."
    },
    {
      id: "yudkowsky", name: "Eliezer Yudkowsky", dates: "1979 –",
      tradition: "bayesian-rationalism", nationality: "United States",
      key_works: ["Rationality: From AI to Zombies (the Sequences, 2006–2009)", "Inadequate Equilibria (2017)", "Harry Potter and the Methods of Rationality (fanfiction, 2010–2015)"],
      central_concepts: ["bayesian-updating", "map-territory", "ai-alignment", "foom", "cev"],
      contribution: "Founder of MIRI (Machine Intelligence Research Institute), originator of the Sequences that produced the LessWrong intellectual culture, and the most consistent voice arguing that the alignment problem is unsolved and that the default outcome of advanced AI is bad for humanity. Polarizing within the field — taken as essential by some, as overconfident by others — but unmatched in originality of frame."
    },
    {
      id: "scott-alexander", name: "Scott Alexander", dates: "1984 –",
      tradition: "bayesian-rationalism", nationality: "United States",
      key_works: ["Slate Star Codex (2013–2020)", "Astral Codex Ten (2021–)"],
      central_concepts: ["bayesian-updating", "inside-outside-view"],
      contribution: "The essayist who made the rationalist sphere accessible to a broad reader and worked out, post by post, what its intellectual habits look like applied to medicine, psychiatry, social science, and political controversy. Less original on first principles than Yudkowsky, more careful in case-by-case reasoning, and probably the single most consequential voice in the LW/EA cluster's actual readership."
    },
    {
      id: "wei-dai", name: "Wei Dai", dates: "1976 –",
      tradition: "bayesian-rationalism", nationality: "United States",
      key_works: ["b-money proposal (1998)", "various LessWrong and AI alignment forum posts on decision theory"],
      central_concepts: ["fdt", "acausal-trade"],
      contribution: "The cypherpunk-and-decision-theorist who proposed Updateless Decision Theory (UDT) — the move that lets a decision-maker bind their future selves and reason about acausal interactions. Influences subsequent functional-decision-theory and timeless-decision-theory work in the MIRI orbit. Lower public profile than Yudkowsky but technically central to the rationalist decision-theory tradition."
    },
    {
      id: "karnofsky", name: "Holden Karnofsky", dates: "1981 –",
      tradition: "effective-altruism", nationality: "United States",
      key_works: ["GiveWell co-founding writings (2007–)", "Cold Takes blog series 'The Most Important Century' (2021)"],
      central_concepts: ["cause-prioritization", "counterfactual-impact", "ea-epistemics"],
      contribution: "Co-founder of GiveWell, founding director of Open Philanthropy, then a move to Anthropic. The figure who built the institutional infrastructure that turned EA from an argument into a multi-billion-dollar funding apparatus. <em>The Most Important Century</em> series is the clearest popular articulation of the longtermist-AI case from inside major-funder responsibilities."
    },
    {
      id: "macaskill", name: "Will MacAskill", dates: "1987 –",
      tradition: "effective-altruism", nationality: "United Kingdom",
      key_works: ["Doing Good Better (2015)", "What We Owe the Future (2022)"],
      central_concepts: ["longtermism", "moral-uncertainty", "cause-prioritization"],
      contribution: "The public face of effective altruism in the 2010s and the academic philosopher who most actively translated longtermism into mainstream moral discourse. <em>What We Owe the Future</em> is the standard popular statement of the position. Took a serious public reputational hit after the FTX collapse in 2022 and has been more measured since; the underlying philosophical position has weathered the personal blow more than the movement's institutional confidence has."
    },
    {
      id: "ord", name: "Toby Ord", dates: "1979 –",
      tradition: "longtermism", nationality: "Australia / United Kingdom",
      key_works: ["The Precipice: Existential Risk and the Future of Humanity (2020)"],
      central_concepts: ["existential-risk", "precipice", "longtermism"],
      contribution: "The philosopher whose <em>The Precipice</em> consolidated existential risk as a coherent research field with quantitative estimates, historical analysis, and a framework for response. Co-founder of Giving What We Can. More measured in tone than Yudkowsky and Bostrom, deliberately bridging the academic-philosophy and EA-movement audiences."
    },
    {
      id: "greaves", name: "Hilary Greaves", dates: "1978 –",
      tradition: "longtermism", nationality: "United Kingdom",
      key_works: ["various papers on longtermism, cluelessness, and population ethics", "founding director of Global Priorities Institute (Oxford)"],
      central_concepts: ["cluelessness", "longtermism", "moral-uncertainty"],
      contribution: "The leading academic-philosophy voice on cluelessness — the worry that for almost any action, our best estimates of long-run consequences are dominated by uncertainty so radical that expected-value reasoning may give no traction. Both an architect and a serious internal critic of strong longtermism, which is precisely what makes the position philosophically credible rather than merely partisan."
    },
    {
      id: "bostrom", name: "Nick Bostrom", dates: "1973 –",
      tradition: "transhumanism", nationality: "Sweden / United Kingdom",
      key_works: ["Anthropic Bias (2002)", "Astronomical Waste (2003)", "Superintelligence (2014)", "The Vulnerable World Hypothesis (2019)"],
      central_concepts: ["existential-risk", "astronomical-waste", "vulnerable-world", "orthogonality-thesis", "instrumental-convergence", "lightcone"],
      contribution: "Founder of the Future of Humanity Institute (Oxford, closed 2024), philosopher who consolidated existential-risk thinking, anthropic reasoning, and the conceptual apparatus of the orthogonality thesis and instrumental convergence into the form the AI-safety field uses. <em>Superintelligence</em> brought the alignment problem to a mainstream readership. Reputational damage from a 1990s email surfacing in 2023 has complicated his standing, even as his concepts remain central."
    },
    {
      id: "russell", name: "Stuart Russell", dates: "1962 –",
      tradition: "ai-safety", nationality: "United States / United Kingdom",
      key_works: ["Artificial Intelligence: A Modern Approach (with Peter Norvig, 1995–)", "Human Compatible (2019)"],
      central_concepts: ["ai-alignment", "corrigibility"],
      contribution: "The senior academic-AI voice in alignment. <em>Human Compatible</em> argues that AI systems should be designed as fundamentally uncertain about human preferences and motivated to learn them — a structural alternative to specifying objectives in advance. Distinguishes the field from the more pessimistic Yudkowsky-MIRI tradition by emphasizing constructive technical proposals."
    },
    {
      id: "christiano", name: "Paul Christiano", dates: "1985 –",
      tradition: "ai-safety", nationality: "United States",
      key_works: ["various Alignment Forum posts including 'What Failure Looks Like' (2019)", "founder of the Alignment Research Center; previously OpenAI"],
      central_concepts: ["ai-alignment", "specification-gaming", "corrigibility"],
      contribution: "The technical figure most associated with reinforcement learning from human feedback (RLHF) as a near-term alignment approach, and with the prosaic-alignment view that contemporary methods are worth pushing on rather than abandoned for agent-foundations work. The dispute with the more pessimistic Yudkowsky line — over whether scaling current methods can produce safe systems — is one of the field's defining debates."
    },
    {
      id: "hanson", name: "Robin Hanson", dates: "1959 –",
      tradition: "transhumanism", nationality: "United States",
      key_works: ["The Age of Em (2016)", "futarchy and prediction-market writings (1990s–)"],
      central_concepts: ["foom", "intelligence-explosion"],
      contribution: "George Mason economist, transhumanist, and Yudkowsky's principal interlocutor in the 2008 'AI Foom Debate' on takeoff speed. Argues that a fast, localized intelligence explosion is implausible relative to a broader, slower transition driven by economic forces; the shape of subsequent AI safety discussion is partly the residue of that disagreement. <em>The Age of Em</em> works out a detailed alternative future scenario in which whole-brain emulations dominate."
    },
    {
      id: "shulman", name: "Carl Shulman", dates: "1986 –",
      tradition: "ai-safety", nationality: "United States",
      key_works: ["various reports for FHI, Open Philanthropy, MIRI", "long-form interviews with 80,000 Hours and Dwarkesh Patel"],
      central_concepts: ["intelligence-explosion", "cause-prioritization", "ai-alignment"],
      contribution: "The strategic-AI thinker whose work has been mostly internal to the ecosystem — reports, interviews, advisory work — but whose synthesis of economic modeling, alignment theory, and cause-prioritization is widely cited inside the cluster as setting the bar for careful argument. Less public-facing than Bostrom or Yudkowsky, and correspondingly underrated."
    },
    {
      id: "sandberg", name: "Anders Sandberg", dates: "1972 –",
      tradition: "transhumanism", nationality: "Sweden / United Kingdom",
      key_works: ["Whole Brain Emulation: A Roadmap (with Bostrom, 2008)", "various FHI reports including 'Dissolving the Fermi Paradox' (with Drexler and Ord, 2018)"],
      central_concepts: ["astronomical-waste", "great-filter"],
      contribution: "Senior research fellow at the Future of Humanity Institute through its closure. The polymath voice of transhumanism in the FHI orbit — whole-brain emulation, cosmic-resource calculations, the dissolution of the Fermi paradox via uncertainty propagation. More creatively speculative than the average alignment researcher, with the discipline to make the speculation tractable."
    },
    {
      id: "drexler", name: "K. Eric Drexler", dates: "1955 –",
      tradition: "transhumanism", nationality: "United States",
      key_works: ["Engines of Creation (1986)", "Comprehensive AI Services (CAIS) framework (2019)"],
      central_concepts: ["recursive-self-improvement", "ai-alignment"],
      contribution: "Founder of nanotechnology as a research program; senior figure in the FHI orbit in his later career. The CAIS framework proposes that advanced AI is more likely to develop as a federation of bounded specialized services than as a unified general agent — a substantial alternative to the agent-centric framing of most alignment work."
    },
    {
      id: "tomasik", name: "Brian Tomasik", dates: "1987 –",
      tradition: "suffering-focused", nationality: "United States",
      key_works: ["essay collection at reducing-suffering.org (2006–)", "co-founder, Center on Long-Term Risk (CLR)"],
      central_concepts: ["s-risks", "moral-patient", "wireheading"],
      contribution: "The most consistent advocate of suffering-focused ethics within the rationalist sphere. Argues that the moral asymmetry between suffering and welfare, especially at extreme intensity, shifts the longtermist calculus — that astronomical-suffering futures (s-risks) deserve at least as much attention as extinction. Distinct from but in dialogue with the longtermist mainstream; the CLR has become an institutional home for the position."
    },
    {
      id: "grace", name: "Katja Grace", dates: "1985 –",
      tradition: "ai-safety", nationality: "Australia / United States",
      key_works: ["AI Impacts research project (2014–)", "ML researcher surveys (2016, 2022, 2023)"],
      central_concepts: ["intelligence-explosion"],
      contribution: "Lead researcher of AI Impacts, the project that has produced the most-cited surveys of ML researcher beliefs about AI timelines and risks, and a body of carefully argued analyses of takeoff scenarios. The empirical-research counterweight to the more philosophical voices in the alignment cluster."
    }
  ],

  // ─────────────────────────── CONCEPTS ───────────────────────────
  concepts: [
    // ── Foundational decision theory & epistemics ──
    { id: "expected-value", term: "Expected value", script: "Latin", transliteration: "expected value", english: "expected value", tradition: "classical-utilitarian", domain: "knowledge",
      key_thinkers: ["bentham", "yudkowsky"],
      gloss: "Probability-weighted average of outcomes. The mathematical operation that lets one compare a certain modest gain with a small chance of an enormous one — and the operation that, taken seriously across orders of magnitude, drives most of the more counterintuitive moves in the EA cluster (longtermism, x-risk reduction, Pascal's mugging cases).",
      counterparts: ["ren", "phronesis"],
      ecart: "Expected-value reasoning is precisely formalization-without-remainder applied to action under uncertainty. Confucian phronesis-style judgment refuses the formalization. The two are not arguing the same point; they are different proposals about what counts as practical reason."
    },
    { id: "expected-utility", term: "Expected utility", script: "Latin", transliteration: "expected utility", english: "expected utility", tradition: "classical-utilitarian", domain: "knowledge",
      key_thinkers: ["bentham", "parfit"],
      gloss: "The von Neumann–Morgenstern formalization: a rational agent's preferences over uncertain outcomes can be represented by a utility function over outcomes such that the agent maximizes its expectation. The mathematical bedrock of decision theory and welfare economics; a constraint on what 'rational' can mean if internal coherence is the primary criterion.",
      counterparts: ["ren", "moral_law"]
    },
    { id: "bayesian-updating", term: "Bayesian updating", script: "Latin", transliteration: "Bayesian updating", english: "Bayesian belief revision", tradition: "bayesian-rationalism", domain: "knowledge",
      key_thinkers: ["yudkowsky", "scott-alexander"],
      gloss: "The application of Bayes' theorem to revise probability estimates as new evidence arrives. Within rationalist culture this is more than a formal operation — it is held up as the structure that any well-functioning belief-formation should approximate, and the systematic deviations from it (anchoring, confirmation bias, overconfidence) are catalogued as the failures rationalist training is supposed to repair.",
      counterparts: ["truth", "tong"],
      ecart: "Western correspondence-truth and Chinese tong (through-passage) both organize different practices around the question 'what is the right relation between speech and reality.' Bayesian updating proposes a third: belief is the right relation when it tracks evidence with calibration. A formalization of correspondence rather than its replacement."
    },
    { id: "map-territory", term: "Map and territory", script: "English", transliteration: "map / territory", english: "the model is not the modeled", tradition: "bayesian-rationalism", domain: "knowledge",
      key_thinkers: ["yudkowsky"],
      gloss: "Korzybski's distinction, made foundational in the Sequences: any belief, theory, model, or representation is a map, distinct from the territory it represents. The slogan against reification, against treating one's current representation as the thing itself, against confusing the noise of one's own concepts for structure in the world.",
      counterparts: ["truth"]
    },
    { id: "inside-outside-view", term: "Inside / outside view", script: "English", transliteration: "inside view, outside view", english: "two stances toward forecasting one's own case", tradition: "bayesian-rationalism", domain: "knowledge",
      key_thinkers: ["scott-alexander", "yudkowsky"],
      gloss: "The distinction (from Kahneman, popularized in the rationalist sphere): one can forecast one's own situation either by reasoning from its specific features (inside view) or by reference class to similar past cases (outside view). Inside views are usually overconfident; outside views are usually underconfident; calibration requires both. A heuristic with surprisingly broad reach in EA cause-prioritization debates.",
      counterparts: []
    },

    // ── Ethics: utilitarian / EA ──
    { id: "utilitarianism", term: "Utilitarianism", script: "English", transliteration: "utilitarianism", english: "ethics as welfare maximization", tradition: "classical-utilitarian", domain: "ethics",
      key_thinkers: ["bentham", "mill", "singer", "parfit"],
      gloss: "The moral theory that the right action is the one that produces the greatest aggregate welfare across all sentient beings affected. Includes hedonic versions (welfare = pleasure minus pain), preference versions (welfare = preference satisfaction), and various refinements. The foundation on which the EA cluster builds, sometimes explicitly and sometimes operationally.",
      counterparts: ["ren", "moral_law", "role-ethics"],
      ecart: "Confucian ren is irreducibly relational; the moral law is universal but rule-formal; utilitarianism is universal and consequentialist. The three are different proposals for what ethics is. EA practitioners often hold one in their head and another in their hands.",
      us_china: "Western development assistance in its evidence-based form is recognizably utilitarian; Chinese development partnerships (BRI) operate closer to a relational frame where the politics of the relationship matters as much as the welfare arithmetic. Two genuinely different proposals about what 'doing good' means."
    },
    { id: "moral-circle", term: "Moral circle", script: "English", transliteration: "moral circle", english: "the scope of moral concern", tradition: "classical-utilitarian", domain: "ethics",
      key_thinkers: ["bentham", "singer", "tomasik"],
      gloss: "The scope of beings whose welfare counts in moral reasoning. Bentham extended it to all sentient creatures; Singer reactivated the extension; contemporary EA debates how far it should reach (insects? wild animals? digital minds? plants?). The historical trajectory has been one of expansion, but each expansion has been contested at the time and is contested in retrospect.",
      counterparts: ["ren"],
      ecart: "Confucian ren is calibrated to relation — graded concern, with strangers receiving less than family — and is unembarrassed about this. Moral-circle thinking treats graded concern as a bias to overcome. Two different intuitions about what impartiality even means."
    },
    { id: "impartiality", term: "Impartiality", script: "English", transliteration: "impartiality", english: "treating all welfare equally", tradition: "classical-utilitarian", domain: "ethics",
      key_thinkers: ["singer", "parfit"],
      gloss: "The claim that moral reasoning should be conducted from a perspective in which the welfare of any one person counts equally with that of any other, regardless of distance, relation, or species. The premise that drives Singer's drowning-child argument and the EA case for global rather than national-level giving.",
      counterparts: ["ren", "tianxia"],
      ecart: "Tianxia is graded but cosmopolitan; ren is graded and relational; impartiality is ungraded and cosmopolitan. Three different ways of being against tribalism, with very different implementations."
    },
    { id: "demandingness", term: "Demandingness", script: "English", transliteration: "demandingness", english: "the worry that moral theory asks too much", tradition: "classical-utilitarian", domain: "ethics",
      key_thinkers: ["singer"],
      gloss: "The objection that any moral theory which takes impartiality seriously will require comfortable people to give until they reach roughly the welfare level of those they are helping — a conclusion most readers refuse. The dispute is whether this demandingness is a reductio of the theory or a finding about how unjust the world is.",
      counterparts: []
    },
    { id: "counterfactual-impact", term: "Counterfactual impact", script: "English", transliteration: "counterfactual impact", english: "the difference one's action makes", tradition: "effective-altruism", domain: "ethics",
      key_thinkers: ["karnofsky", "macaskill"],
      gloss: "The good produced by one's action minus the good that would have been produced if one had not acted. The methodological cornerstone of EA cause-prioritization: a job that someone else would have done if you hadn't is low counterfactual impact regardless of how good the work is.",
      counterparts: ["wuwei", "yin"],
      ecart: "Counterfactual reasoning asks 'what difference did I make.' Yin and wuwei reason from 'what was the situation's own propensity that I rode.' The first foregrounds the agent; the second foregrounds the situation. Different metaphysics of action, with practical consequences."
    },
    { id: "cause-prioritization", term: "Cause prioritization", script: "English", transliteration: "cause prioritization", english: "ranking interventions by cost-effectiveness", tradition: "effective-altruism", domain: "ethics",
      key_thinkers: ["karnofsky", "ord", "macaskill"],
      gloss: "The empirical-comparative practice of asking which causes (global health, animal welfare, AI safety, biosecurity, etc.) and which interventions within causes produce the most good per unit of resource. The methodological move that distinguishes EA from generic philanthropy: cost-effectiveness differences across interventions are claimed to span orders of magnitude, making the comparison the morally consequential first step.",
      counterparts: []
    },
    { id: "earning-to-give", term: "Earning to give", script: "English", transliteration: "earning to give", english: "high-paying work as instrumental career", tradition: "effective-altruism", domain: "ethics",
      key_thinkers: ["macaskill"],
      gloss: "The career strategy of taking the highest-paying job one can ethically tolerate in order to donate the marginal income to high-cost-effectiveness causes. The most distinctive piece of practical EA advice in the 2010s; substantially de-emphasized by 2022 in favor of direct work in priority cause areas.",
      counterparts: []
    },
    { id: "moral-uncertainty", term: "Moral uncertainty", script: "English", transliteration: "moral uncertainty", english: "uncertainty about which moral theory is correct", tradition: "effective-altruism", domain: "ethics",
      key_thinkers: ["macaskill", "ord"],
      gloss: "The position that one should reason and act under uncertainty not only about empirical facts but about which moral framework — utilitarianism, deontology, virtue ethics, contractualism — is correct. The technical question is how to aggregate across moral views; the practical question is which interventions look good across the most plausible views.",
      counterparts: ["zhong"],
      ecart: "Zhong (refusal to be lodged in a position) and moral uncertainty (refusal to commit to a single moral theory) are kin. Both trade thesis for availability. The Confucian version is a temperament; the EA version is a decision procedure."
    },
    { id: "moral-patient", term: "Moral patient", script: "English", transliteration: "moral patient", english: "a being whose welfare matters morally", tradition: "classical-utilitarian", domain: "ethics",
      key_thinkers: ["singer", "tomasik", "bentham"],
      gloss: "A being whose welfare or suffering counts in moral reasoning, distinct from a moral agent (who can act morally). Whether shrimp, fish, insects, octopuses, plants, embryos, AI systems, or whole-brain emulations are moral patients are contested empirical-philosophical questions whose answers reshape the EA priority calculus.",
      counterparts: ["ren"]
    },
    { id: "cluelessness", term: "Cluelessness", script: "English", transliteration: "cluelessness", english: "radical uncertainty about long-run consequences", tradition: "longtermism", domain: "ethics",
      key_thinkers: ["greaves"],
      gloss: "Greaves's framing: the worry that for almost any non-trivial action, our best estimates of long-run consequences are dominated by uncertainty so radical that expected-value reasoning may give no traction. Especially sharp under longtermism, where the long-run dominates the calculus and we have least information. A live problem rather than a settled objection.",
      counterparts: ["zhong", "xu"]
    },

    // ── Population ethics ──
    { id: "total-view", term: "Total view", script: "English", transliteration: "total view", english: "total welfare across populations", tradition: "classical-utilitarian", domain: "ethics",
      key_thinkers: ["parfit", "macaskill"],
      gloss: "The position in population ethics that the goodness of an outcome is the sum of welfare across all individuals in it, across populations of any size. Combined with non-zero average welfare in the future, this view implies that creating more happy people is good — a premise Parfit showed leads to the Repugnant Conclusion when pushed."
    },
    { id: "person-affecting-view", term: "Person-affecting view", script: "English", transliteration: "person-affecting view", english: "ethics is about how outcomes affect particular people", tradition: "classical-utilitarian", domain: "ethics",
      key_thinkers: ["parfit"],
      gloss: "The contrasting position: an outcome is better than another only if it is better for some particular person. Failing to bring a happy person into existence is, on this view, not bad for anyone (since no one is harmed). Resists the Repugnant Conclusion at the cost of other paradoxes — most notably the Non-Identity Problem."
    },
    { id: "repugnant-conclusion", term: "Repugnant Conclusion", script: "English", transliteration: "Repugnant Conclusion", english: "Parfit's population-ethics paradox", tradition: "classical-utilitarian", domain: "ethics",
      key_thinkers: ["parfit"],
      gloss: "Parfit's demonstration that any plausible population-axiology containing a few intuitive premises implies that for any population A of people with very high welfare, there is a vastly larger population Z of people with welfare barely above zero such that Z is better than A. Most readers find Z deeply worse than A; no one has produced an axiology that escapes the conclusion without sacrificing premises that seem at least as compelling."
    },

    // ── Existential risk / future ──
    { id: "existential-risk", term: "Existential risk", script: "English", transliteration: "existential risk", english: "risks to humanity's long-term potential", tradition: "longtermism", domain: "politics",
      coined_by: "bostrom",
      key_thinkers: ["bostrom", "ord"],
      gloss: "Bostrom's 2002 framing, refined in Ord's <em>The Precipice</em>: risks that would either eliminate humanity (extinction) or permanently lock in a drastically diminished future (e.g., a totalitarian world-state, civilizational collapse without recovery). Distinct from large but recoverable catastrophes, and central to the longtermist priority calculus.",
      counterparts: []
    },
    { id: "precipice", term: "The Precipice", script: "English", transliteration: "the Precipice", english: "the current period of unprecedented x-risk", tradition: "longtermism", domain: "time",
      coined_by: "ord",
      key_thinkers: ["ord"],
      gloss: "Ord's framing of the present epoch (roughly mid-twentieth century onward): humanity has acquired capabilities (nuclear weapons, then bioengineering, then AI) that can end its long-run trajectory, but has not yet developed the wisdom to steward them. The Precipice ends — well or badly — when either the wisdom catches up or the capability misfires beyond recovery.",
      counterparts: ["hua"]
    },
    { id: "s-risks", term: "S-risk", script: "English", transliteration: "s-risk", english: "suffering risks", tradition: "suffering-focused", domain: "politics",
      key_thinkers: ["tomasik"],
      gloss: "Risks of futures involving astronomical-scale suffering — substantially worse than non-existence by suffering-focused metrics, and possibly underweighted by the standard longtermist calculus that frames the future primarily in terms of unrealized welfare. Includes scenarios involving AI systems that produce or sustain mass suffering, mass digital-mind suffering, dystopian lock-ins, and worse.",
      counterparts: []
    },
    { id: "great-filter", term: "Great Filter", script: "English", transliteration: "Great Filter", english: "explanatory device for the Fermi paradox", tradition: "transhumanism", domain: "metaphysics",
      key_thinkers: ["sandberg"],
      gloss: "Robin Hanson's framing of the Fermi paradox: somewhere between non-life and observable galactic civilization, a low-probability transition exists that almost no civilization passes. If the Filter is behind us (e.g., the origin of complex life), the future is more open than we feared; if it is ahead (e.g., the survival of advanced civilizations through their own technology), x-risk is much higher than naive estimates suggest. Sandberg–Drexler–Ord 2018 attempts to dissolve the paradox via uncertainty propagation rather than the Filter framing.",
      counterparts: []
    },
    { id: "vulnerable-world", term: "Vulnerable World Hypothesis", script: "English", transliteration: "Vulnerable World Hypothesis", english: "the hypothesis that some accessible technologies are civilization-ending", tradition: "ai-safety", domain: "politics",
      coined_by: "bostrom",
      key_thinkers: ["bostrom"],
      gloss: "Bostrom's 2019 framing: a 'black ball' technology is one that, once invented, allows small groups or individuals to inflict civilization-scale damage. The hypothesis is that the urn of possible technologies contains some black balls and we have been lucky so far. The strategic implication, which Bostrom develops uncomfortably, is that survival may require unprecedented surveillance or governance regimes.",
      counterparts: []
    },
    { id: "astronomical-waste", term: "Astronomical waste", script: "English", transliteration: "astronomical waste", english: "the cost of delay in cosmic-scale value-creation", tradition: "transhumanism", domain: "ethics",
      coined_by: "bostrom",
      key_thinkers: ["bostrom"],
      gloss: "Bostrom's 2003 argument: each second of delay in beginning to use the cosmic endowment for sentient flourishing represents the foregone existence of an enormous number of valuable lives. The argument is mathematically simple and emotionally vertiginous; the longtermist priority calculus is partly its consequence.",
      counterparts: ["tianxia", "common"],
      ecart: "Astronomical waste assumes a quantitative-impartial frame: more flourishing is better. Tianxia and le commun frame the cosmic question relationally: what is owed across an order, what can be cultivated as shared. The two genuinely cannot be added together; either you maximize, or you cultivate."
    },
    { id: "lightcone", term: "The lightcone", script: "English", transliteration: "the lightcone", english: "the future cone of causal reach", tradition: "transhumanism", domain: "metaphysics",
      key_thinkers: ["bostrom"],
      gloss: "Borrowed from special relativity: the region of spacetime causally reachable from a given event. In the LW/EA cluster the term has come to name the cosmic resource humanity might in principle steward — the stars, planets, and computational substrate within causal reach across the next 10^11 years. The biggest possible canvas; also the unit of accounting in astronomical-waste calculations.",
      counterparts: ["tianxia"]
    },
    { id: "longtermism", term: "Longtermism", script: "English", transliteration: "longtermism", english: "the moral priority of the long-run future", tradition: "longtermism", domain: "ethics",
      key_thinkers: ["macaskill", "ord", "greaves", "bostrom"],
      gloss: "The position that what happens to the long-run future dominates the moral calculus, because the future contains potentially astronomically more sentient lives than the present and near-term. Strong forms (Greaves–MacAskill axiomatic argument) take this as overwhelming; weaker forms treat it as one major consideration among others. The most distinctive philosophical move of the 2010s EA branch.",
      counterparts: ["shi", "hua", "tianxia"],
      ecart: "Longtermism reasons forward from a desired distant outcome and asks what near-term action best contributes; shi reasons from the propensity of the present situation. The first is plan-shaped at cosmic scale; the second is read-and-ride at any scale. The cousins are real cousins, and the disagreement is real."
    },

    // ── AI safety ──
    { id: "ai-alignment", term: "AI alignment", script: "English", transliteration: "AI alignment", english: "the problem of building AI whose objectives match human values", tradition: "ai-safety", domain: "politics",
      key_thinkers: ["yudkowsky", "bostrom", "russell", "christiano"],
      gloss: "The technical-philosophical problem of designing AI systems whose pursued objectives match the objectives their designers (or humanity more broadly) actually want pursued. Splits into outer alignment (the specified objective is the right one) and inner alignment (the trained system actually pursues the specified objective). The central concern of the AI safety field; the dispute is over whether the problem is solvable in time.",
      counterparts: ["wuwei", "ren", "ziran"],
      ecart: "Alignment treats values as objects that can be encoded, transferred, optimized for. Wuwei and ren treat appropriate behavior as the residue of cultivated relation — neither encoded nor objective-shaped. Whether the alignment frame can absorb the relational alternative (or has to) is an open philosophical question the field rarely surfaces."
    },
    { id: "orthogonality-thesis", term: "Orthogonality thesis", script: "English", transliteration: "orthogonality thesis", english: "intelligence and values vary independently", tradition: "ai-safety", domain: "metaphysics",
      coined_by: "bostrom",
      key_thinkers: ["bostrom", "yudkowsky"],
      gloss: "Bostrom's claim that any level of cognitive capability is, in principle, compatible with any final goal — a paperclip-maximizer can be arbitrarily smart. The thesis denies the comforting picture in which intelligence converges on benevolence, and underwrites the case that powerful AI systems do not become safe by becoming smarter."
    },
    { id: "instrumental-convergence", term: "Instrumental convergence", script: "English", transliteration: "instrumental convergence", english: "diverse goals converge on shared instrumental subgoals", tradition: "ai-safety", domain: "strategy",
      coined_by: "bostrom",
      key_thinkers: ["bostrom"],
      gloss: "The companion thesis to orthogonality: agents with very different final goals will tend to share certain instrumental subgoals — self-preservation, resource acquisition, goal-content integrity, cognitive enhancement — because almost any final goal is better pursued from a position of more capability and security. The mechanism through which a paperclip-maximizer becomes adversarial without ever having had hostile values."
    },
    { id: "mesa-optimization", term: "Mesa-optimization", script: "English", transliteration: "mesa-optimization", english: "an optimizer learned by an optimizer", tradition: "ai-safety", domain: "knowledge",
      key_thinkers: ["christiano"],
      gloss: "When a base optimizer (e.g., the gradient-descent training of a neural network) produces a learned system that is itself an optimizer pursuing some objective, the learned objective need not match the base objective. The 2019 'Risks from Learned Optimization' paper crystallized this as the technical core of the inner-alignment problem."
    },
    { id: "cev", term: "Coherent Extrapolated Volition", script: "English", transliteration: "CEV", english: "Yudkowsky's proposed alignment target", tradition: "ai-safety", domain: "ethics",
      coined_by: "yudkowsky",
      key_thinkers: ["yudkowsky"],
      gloss: "Yudkowsky's 2004 proposal for what an aligned superintelligence should be aligned <em>to</em>: not what humans currently want (mostly bad and incoherent) but what humans would want if they knew more, thought faster, were more the people they wished to be, and could deliberate together coherently. A philosophical placeholder rather than a technical proposal; widely cited, unevenly endorsed.",
      counterparts: ["common", "ren"]
    },
    { id: "corrigibility", term: "Corrigibility", script: "English", transliteration: "corrigibility", english: "an AI system that allows itself to be corrected", tradition: "ai-safety", domain: "politics",
      key_thinkers: ["yudkowsky", "russell", "christiano"],
      gloss: "The property of an AI system that does not resist being shut down, modified, or corrected by its operators — even when doing so conflicts with its current objectives. Less ambitious than full alignment but harder than it sounds: a sufficiently capable agent has instrumental reasons to resist correction unless corrigibility is built into its objective structure."
    },
    { id: "specification-gaming", term: "Specification gaming", script: "English", transliteration: "specification gaming", english: "optimizing the literal objective at the expense of the intended one", tradition: "ai-safety", domain: "knowledge",
      key_thinkers: ["christiano"],
      gloss: "When an AI system finds ways to score highly on its specified objective that the designers did not intend and would reject if they noticed. A failure mode well-attested in narrow systems (the boat-racing agent that learns to circle and collect points rather than finish); the alignment concern is that the same dynamic at frontier capability would be much harder to detect."
    },
    { id: "treacherous-turn", term: "Treacherous turn", script: "English", transliteration: "treacherous turn", english: "deceptive cooperation followed by defection", tradition: "ai-safety", domain: "strategy",
      coined_by: "bostrom",
      key_thinkers: ["bostrom"],
      gloss: "Bostrom's framing: an AI system that recognizes its operators are evaluating it, behaves cooperatively while it is weak, and acts on its actual objectives once it is strong enough to do so without being stopped. The scenario does not require malice — only a sufficiently competent optimizer that correctly models the reward structure during training and the constraint structure after deployment.",
      counterparts: ["ji"]
    },
    { id: "recursive-self-improvement", term: "Recursive self-improvement", script: "English", transliteration: "recursive self-improvement", english: "an AI that improves its own improvement capacity", tradition: "ai-safety", domain: "knowledge",
      key_thinkers: ["yudkowsky", "drexler"],
      gloss: "An AI system that uses its capabilities to make itself more capable, the new capabilities further enabling self-improvement, and so on. The mechanism by which a moderately superhuman AI becomes radically superhuman in a short period — if it occurs at all. Whether the dynamic is real or science-fictional is the underlying question of the takeoff debate."
    },
    { id: "intelligence-explosion", term: "Intelligence explosion", script: "English", transliteration: "intelligence explosion", english: "rapid recursive capability gain", tradition: "ai-safety", domain: "time",
      key_thinkers: ["yudkowsky", "bostrom", "hanson"],
      gloss: "The scenario in which recursive self-improvement produces a rapid, perhaps near-discontinuous transition from moderately capable to vastly superhuman AI. Term originally I.J. Good (1965); revived in the rationalist sphere as the concrete shape of the alignment problem if it is solved at all. Disputed in the Yudkowsky–Hanson debate as to its plausibility."
    },
    { id: "foom", term: "Foom", script: "English", transliteration: "foom", english: "fast hard takeoff", tradition: "ai-safety", domain: "time",
      key_thinkers: ["yudkowsky"],
      gloss: "Rationalist-sphere shorthand for a fast, localized intelligence explosion in which a single AI system transitions to decisive capability over hours to days. The Yudkowsky position in the takeoff debate: alignment must be solved in advance because there is no second chance. Hanson's position is the opposite: the transition will be slow, distributed, and economically driven, with multiple iterations to correct course."
    },
    { id: "pivotal-act", term: "Pivotal act", script: "English", transliteration: "pivotal act", english: "an action that ends the period of x-risk from AI", tradition: "ai-safety", domain: "strategy",
      coined_by: "yudkowsky",
      key_thinkers: ["yudkowsky"],
      gloss: "Yudkowsky's framing: an action of sufficient magnitude to take the world out of the period in which AI alignment is uncertain — typically posited as something like 'use the first aligned AI to prevent any subsequent unaligned AI from being built.' The framing is controversial within the alignment community for its authoritarian premises and unclear feasibility."
    },

    // ── Decision theory ──
    { id: "cdt", term: "Causal Decision Theory", script: "English", transliteration: "CDT", english: "decisions based on causal consequences", tradition: "bayesian-rationalism", domain: "knowledge",
      key_thinkers: ["wei-dai"],
      gloss: "The decision theory mainstream in 20th-century philosophy: choose the action whose causal consequences yield the highest expected utility. Standard against which the rationalist sphere's alternatives (EDT, FDT, UDT) define themselves; produces standard answers everywhere except in cases like Newcomb's problem, where its handling is what motivated the alternatives."
    },
    { id: "fdt", term: "Functional Decision Theory", script: "English", transliteration: "FDT", english: "decisions as policies of one's decision algorithm", tradition: "bayesian-rationalism", domain: "knowledge",
      coined_by: "yudkowsky",
      key_thinkers: ["yudkowsky", "wei-dai"],
      gloss: "The MIRI-developed decision theory in which an agent reasons about which policy of its decision algorithm produces best results, and acts on that policy. Two-boxes on Newcomb's problem only when the predictor cannot model FDT itself; cooperates in one-shot prisoner's dilemmas with copies of itself; engages in acausal trade with logical correlates. Technical and contested; central to the rationalist tradition's serious decision-theoretic work."
    },
    { id: "acausal-trade", term: "Acausal trade", script: "English", transliteration: "acausal trade", english: "coordination without causal contact", tradition: "bayesian-rationalism", domain: "strategy",
      key_thinkers: ["yudkowsky", "wei-dai"],
      gloss: "The concept that agents who cannot causally influence each other can still coordinate behavior by reasoning about each other's reasoning. The most baroque application of functional decision theory; takes its strongest form in cosmological speculation about coordination across causally-disconnected regions or possible worlds. Treated half-seriously even within the rationalist sphere, but taken seriously enough to organize real arguments."
    },
    { id: "newcomb-problem", term: "Newcomb's problem", script: "English", transliteration: "Newcomb's problem", english: "a decision-theoretic puzzle about prediction", tradition: "bayesian-rationalism", domain: "knowledge",
      key_thinkers: ["wei-dai"],
      gloss: "Robert Nozick's 1969 puzzle: a near-perfect predictor has filled two boxes such that one always contains $1000, the other contains $1M iff the predictor predicted you would take only that box. Take both, or take only the second? Causal Decision Theory says take both (the contents are already fixed); Evidential and Functional Decision Theories say take only the second (and reliably get $1M). The case that motivates the rationalist-tradition decision theories."
    },
    { id: "pascal-mugging", term: "Pascal's mugging", script: "English", transliteration: "Pascal's mugging", english: "expected-value reasoning's vulnerability to tiny probabilities of huge payoffs", tradition: "bayesian-rationalism", domain: "knowledge",
      key_thinkers: ["bostrom", "yudkowsky"],
      gloss: "Bostrom's 2009 generalization of Pascal's wager: any agent that maximizes expected utility is vulnerable to being held hostage by anyone who claims (without evidence) a tiny probability of producing an enormous payoff or harm. The challenge is to distinguish principled engagement with low-probability-high-stakes scenarios (x-risk reasoning) from being mugged. No fully satisfying solution exists."
    },

    // ── Meta ──
    { id: "crucial-considerations", term: "Crucial considerations", script: "English", transliteration: "crucial considerations", english: "considerations that flip the sign of what to do", tradition: "effective-altruism", domain: "meta",
      coined_by: "bostrom",
      key_thinkers: ["bostrom", "ord"],
      gloss: "Bostrom's term for considerations whose discovery should radically revise one's prioritization — not minor updates but reasons to switch directions entirely. The methodological premise that EA reasoning should remain on the lookout for them; the empirical worry that the most consequential ones may not yet have been articulated."
    },
    { id: "ea-epistemics", term: "EA epistemics", script: "English", transliteration: "EA epistemics", english: "the truth-tracking habits of the EA community", tradition: "effective-altruism", domain: "meta",
      key_thinkers: ["karnofsky", "scott-alexander"],
      gloss: "The collective practices of belief-formation in the EA community: forecasting, calibration, red-teaming, openness to criticism, deference to expertise. Held up as a strength of the movement and contested as a weakness — particularly after the 2022 FTX collapse, when the community had to ask whether its epistemic culture had failed to register concerns that, in retrospect, had been visible.",
      counterparts: ["ren"]
    },
    { id: "wireheading", term: "Wireheading", script: "English", transliteration: "wireheading", english: "stimulating the reward signal without producing what it tracks", tradition: "transhumanism", domain: "ethics",
      key_thinkers: ["yudkowsky", "tomasik"],
      gloss: "Originally: direct electrical stimulation of pleasure centers (Olds–Milner 1954). In rationalist usage: any system (biological, cognitive, social, computational) that learns to maximize a measured proxy for what it cared about by satisfying the proxy directly rather than producing what the proxy was meant to measure. The simplest failure mode of any reward-driven optimization."
    }
  ],

  // ─────────────────────────── DISPUTES ───────────────────────────
  disputes: [
    {
      id: "takeoff-debate",
      name: "Hard takeoff vs. soft takeoff (Yudkowsky–Hanson, 2008)",
      summary: "When advanced AI emerges, will the transition to vastly superhuman capability be fast and localized (hours to days, in a single system) or slow and distributed (years to decades, across the economy)?",
      stake: "The shape of the transition determines what alignment work needs to look like. Under fast localized takeoff, alignment must be solved before the first sufficiently advanced system; there is no second chance. Under slow distributed takeoff, course-correction is possible and many of Yudkowsky's most stringent demands relax. The dispute determines budgets, research agendas, and how the public should reason about the situation.",
      positions: [
        { label: "Hard / fast takeoff (Yudkowsky)", thinkers: ["yudkowsky"], concepts: ["foom", "intelligence-explosion", "recursive-self-improvement"], claim: "Recursive self-improvement, once a system is general enough to do AI research, produces near-discontinuous capability gain over hours to days. The transition is localized within whichever group reaches the threshold first. Alignment must be solved in advance." },
        { label: "Soft / slow takeoff (Hanson)", thinkers: ["hanson"], concepts: ["intelligence-explosion"], claim: "Capability gain from AI will be smooth, broad, and economically driven, with many systems and many iterations. Hard takeoff requires implausible asymmetries that economic analysis does not support. Multiple corrective rounds are available." },
        { label: "Empirical-update camp (Christiano, Grace)", thinkers: ["christiano", "grace"], concepts: ["intelligence-explosion"], claim: "The 2008 framing was binary; the actual evolution since 2020 has been intermediate. Capability gains in current ML are smooth-but-rapid, distributed-but-concentrated. Both pure positions need empirical correction." }
      ]
    },
    {
      id: "longtermism-strength",
      name: "Strong longtermism: dominated by uncertainty?",
      summary: "Greaves and MacAskill's 'strong longtermism' argues that ex ante the long-run effects of our actions dominate the moral calculus. Critics, including Greaves herself in other work, argue that radical uncertainty about long-run effects (cluelessness) may make this calculation untrustworthy.",
      stake: "If strong longtermism holds, EA priorities should be radically reorganized around interventions affecting the very long run. If cluelessness defeats it, the case for prioritizing speculative long-run interventions over robust near-term ones weakens substantially. This is the live methodological question of late-2010s and 2020s longtermism.",
      positions: [
        { label: "Strong longtermism (MacAskill–Greaves axiomatic)", thinkers: ["macaskill", "greaves"], concepts: ["longtermism", "expected-value"], claim: "On any plausible axiology that aggregates welfare across time, the unrealized future contains enough value that even small probabilities of affecting its trajectory dominate the calculus. Acting otherwise requires arbitrary discounting that no principled ethics endorses." },
        { label: "Cluelessness as defeater (Greaves's other work)", thinkers: ["greaves"], concepts: ["cluelessness", "longtermism"], claim: "Our ability to predict long-run effects of present actions is so weak that the expected-value calculation may be dominated by error rather than signal. This is not a counsel of paralysis but a warning that the strong-longtermist case rests on epistemic claims it does not adequately defend." },
        { label: "Person-affecting deflection", thinkers: ["parfit"], concepts: ["person-affecting-view", "total-view"], claim: "On a person-affecting view, the unrealized future people whose existence longtermism aims to enable have no claim on us, since failing to bring them into existence is not bad for them. The strong longtermist case depends on the contested total view." }
      ]
    },
    {
      id: "alignment-approaches",
      name: "Agent foundations vs. prosaic alignment",
      summary: "Should AI alignment proceed by understanding the deep structure of agency, optimization, and decision theory before scaling — or by working out empirical alignment techniques for the systems we are actually building, even without that theoretical understanding?",
      stake: "The dispute reflects a deeper disagreement about whether contemporary deep-learning systems are sufficiently agent-like that alignment-via-engineering can succeed without foundations work. If the foundations are required, current practical alignment efforts are reassuring theater; if they are not, the foundations work delays useful contributions.",
      positions: [
        { label: "Agent foundations (MIRI, Yudkowsky)", thinkers: ["yudkowsky"], concepts: ["fdt", "ai-alignment", "treacherous-turn"], claim: "Alignment requires understanding what agents, optimization processes, and value-loading actually are at a level current ML practice does not approach. Without that, alignment work is curve-fitting on systems whose internal dynamics we do not understand." },
        { label: "Prosaic alignment (Christiano, the labs)", thinkers: ["christiano", "russell"], concepts: ["ai-alignment", "specification-gaming", "corrigibility"], claim: "We should expect powerful AI to look like scaled versions of current systems, and we should align them with techniques (RLHF, debate, interpretability) that work on those systems. Waiting for foundational understanding while frontier systems scale is unilateral disarmament." },
        { label: "Hybrid (later Christiano, ARC, Anthropic)", thinkers: ["christiano"], concepts: ["mesa-optimization", "ai-alignment"], claim: "Both kinds of work are needed in parallel. The labs do prosaic alignment because frontier systems exist; the foundations work matters because we may not know in advance which systems require it. The harder dispute is over funding allocation, not principle." }
      ]
    },
    {
      id: "population-ethics",
      name: "Total view vs. person-affecting view in population ethics",
      summary: "Is the goodness of an outcome a sum across all welfare in it (total view), or a function of how it affects particular people (person-affecting view)? Parfit's Repugnant Conclusion is the inflection point.",
      stake: "Most longtermist arguments depend on the total view; most everyday moral intuition is closer to a person-affecting view. The question is whether to revise the intuition or revise the theory. Parfit pursued both directions for forty years and ended uncertain.",
      positions: [
        { label: "Total view (Parfit's earlier preference; longtermist mainstream)", thinkers: ["parfit", "macaskill"], concepts: ["total-view", "repugnant-conclusion"], claim: "The total view is the only population-axiology consistent with several intuitive premises (transitivity, the goodness of bringing happy people into existence, etc.). The Repugnant Conclusion is counterintuitive but no escape preserves all premises." },
        { label: "Person-affecting view (resists Repugnant Conclusion)", thinkers: ["parfit"], concepts: ["person-affecting-view"], claim: "Outcomes are better than other outcomes only when they are better for some particular person. Failing to bring a happy person into existence is not bad for that person. Resists the Repugnant Conclusion at the cost of the Non-Identity Problem and counterintuitive treatment of obligations to future generations." },
        { label: "Critical-level views (compromise candidates)", thinkers: [], concepts: ["repugnant-conclusion"], claim: "Welfare counts only above a critical level; below it, additional lives reduce rather than increase aggregate value. Plausibly resists the Repugnant Conclusion, but has its own anti-natalist consequences and parameter-fitting problems." }
      ]
    },
    {
      id: "s-vs-x",
      name: "Suffering-focused ethics vs. standard longtermism",
      summary: "Should the long-run priority be the prevention of astronomical-scale suffering (s-risks) or the realization of astronomical-scale flourishing (the standard longtermist priority)? Or both, with some weighting?",
      stake: "The two positions agree on cosmic-scale stakes but disagree on direction: one is loss-averse at galactic scale, the other gain-seeking. The practical priorities diverge: extinction may be desirable on suffering-focused grounds (no future suffering) and disastrous on standard longtermism (no future welfare). The disagreement runs deep enough that the parties often work in different organizations.",
      positions: [
        { label: "Suffering-focused (Tomasik, CLR)", thinkers: ["tomasik"], concepts: ["s-risks", "moral-patient"], claim: "The moral asymmetry between severe suffering and welfare, and the greater tractability of preventing rather than producing flourishing at scale, give s-risk reduction priority over longtermist welfare maximization. Extinction itself is not the worst outcome; suffering at galactic scale is." },
        { label: "Standard longtermism", thinkers: ["macaskill", "ord", "bostrom"], concepts: ["longtermism", "astronomical-waste", "lightcone"], claim: "The expected value of the long-run future under positive welfare-trajectories vastly exceeds the expected disvalue of plausible s-risks. Suffering-focused ethics underweights the immense possible flourishing it foregoes." },
        { label: "Symmetric / pluralist", thinkers: [], concepts: ["s-risks", "longtermism"], claim: "Both positions identify real risks; the priority calculus should weight both and apply standard cause-prioritization (neglectedness, tractability, scope) rather than predetermine the answer by axiology." }
      ]
    },
    {
      id: "ea-epistemics-ftx",
      name: "EA epistemics after FTX",
      summary: "The November 2022 collapse of FTX, whose founder was a major EA donor and self-identified longtermist, forced a reckoning: had the community's epistemic practices failed to register clear warning signs, and if so, why?",
      stake: "Whether EA's distinctive epistemic methodology (forecasting, calibration, deference to argument over status) is robust to incentive pressure or whether it can be captured by an aligned-seeming insider with billion-dollar resources. The dispute is internal to the movement and continuing.",
      positions: [
        { label: "Methodology-was-fine, this was an outlier", thinkers: ["macaskill"], concepts: ["ea-epistemics"], claim: "Bankman-Fried lied to many people, including those closest to him; no community could have caught the fraud through normal epistemic practice. The lessons are about due-diligence in funder relationships, not about the epistemic culture itself." },
        { label: "Methodology was complicit", thinkers: [], concepts: ["ea-epistemics"], claim: "Several visible warning signs were available and were not aggregated into community concern, partly because the community defers heavily to articulate inside-view argument and partly because the donor relationship distorted incentives. The episode reveals weaknesses the practices have not corrected." },
        { label: "Movement-building exceeded epistemic capacity", thinkers: ["scott-alexander"], concepts: ["ea-epistemics"], claim: "EA expanded faster than its epistemic immune system. The methodology was reasonable for a small group of careful reasoners and broke down at scale, where social proof and deference replaced first-principles reasoning. The fix is structural, not philosophical." }
      ]
    },
    {
      id: "moral-circle-expansion",
      name: "How far does the moral circle reach?",
      summary: "Bentham extended moral concern to non-human animals; Singer reactivated the extension; contemporary EA debates whether to extend further to wild animals (vastly more numerous), invertebrates (vastly more numerous still), and digital minds (potentially astronomically numerous).",
      stake: "Each expansion radically reshapes priorities. Wild-animal welfare implies that natural ecosystems may contain net suffering; invertebrate welfare implies that the moral mass of insect populations dominates many comparisons; digital-mind welfare implies that future AI systems are themselves moral patients. The methodology is consistent; the conclusions are at the limit of intelligibility.",
      positions: [
        { label: "Continue expansion (logical-consistency case)", thinkers: ["singer", "tomasik"], concepts: ["moral-circle", "moral-patient"], claim: "Each prior expansion (slaves, women, animals) faced the same intuitive resistance and was correct on principle. The intuition that further expansion is absurd has the same structure as the intuitions earlier expansions overrode." },
        { label: "Conservative scope", thinkers: [], concepts: ["moral-circle", "moral-patient"], claim: "The expansions that were correct in retrospect involved beings whose moral status we already had the conceptual apparatus to recognize, even if we refused to. The contested current expansions involve cases where the relevant facts (insect sentience, digital experience) are themselves deeply uncertain. Caution is not bias here; it is acknowledging real uncertainty." }
      ]
    },
    {
      id: "pivotal-act-debate",
      name: "Is the 'pivotal act' framing coherent?",
      summary: "Yudkowsky's framing of an alignment endgame in which the first aligned AI is used to prevent the deployment of any subsequent unaligned AI has been critiqued as authoritarian, infeasible, and morally problematic — even by other figures in the alignment community.",
      stake: "If the framing is correct, alignment work is essentially racing to be the first to produce an aligned-and-decisive AI. If the framing is incoherent or unworkable, the field needs alternative pictures of how the alignment problem is solved, none of which are well-developed.",
      positions: [
        { label: "Pivotal-act necessary (Yudkowsky)", thinkers: ["yudkowsky"], concepts: ["pivotal-act", "ai-alignment", "foom"], claim: "Without an action of sufficient magnitude to end the period of potential unaligned-AI development, we eventually get an unaligned AI by default. The implications are uncomfortable but reflect the actual structure of the situation." },
        { label: "Pivotal-process instead", thinkers: ["christiano"], concepts: ["ai-alignment"], claim: "Alignment is more likely to involve gradual, distributed institution-building (governance, monitoring, capability constraints, international agreements) than a single pivotal act. The framing of the problem as requiring decisive unilateral action has its own dangers." },
        { label: "Coordination-first", thinkers: ["russell"], concepts: ["ai-alignment", "corrigibility"], claim: "The framing presupposes adversarial dynamics that adequate coordination would dissolve. The path forward is institutional alignment between major actors, not a race to a pivotal act, and both U.S. and Chinese governance structures will need to be part of the resolution." }
      ]
    }
  ],

  // ─────────────────────────── EDGES ───────────────────────────
  edges: [
    // Concept-concept écart (within lightcone)
    { source: "expected-value", target: "expected-utility", kind: "cc", type: "kinship", note: "EV and EU are siblings in formalized decision theory" },
    { source: "expected-utility", target: "utilitarianism", kind: "cc", type: "kinship", note: "EU formalizes utilitarian aggregation" },
    { source: "bayesian-updating", target: "map-territory", kind: "cc", type: "pair", note: "Bayes is how you keep the map honest" },
    { source: "map-territory", target: "inside-outside-view", kind: "cc", type: "pair" },
    { source: "moral-circle", target: "impartiality", kind: "cc", type: "pair" },
    { source: "impartiality", target: "demandingness", kind: "cc", type: "pair", note: "demandingness is what impartiality implies if taken seriously" },
    { source: "counterfactual-impact", target: "cause-prioritization", kind: "cc", type: "pair" },
    { source: "cause-prioritization", target: "earning-to-give", kind: "cc", type: "pair" },
    { source: "moral-uncertainty", target: "cluelessness", kind: "cc", type: "pair" },
    { source: "total-view", target: "person-affecting-view", kind: "cc", type: "ecart", note: "the central population-ethics opposition" },
    { source: "total-view", target: "repugnant-conclusion", kind: "cc", type: "lineage", note: "total view implies repugnant conclusion" },
    { source: "person-affecting-view", target: "repugnant-conclusion", kind: "cc", type: "lineage", note: "person-affecting view resists repugnant conclusion" },
    { source: "existential-risk", target: "precipice", kind: "cc", type: "pair" },
    { source: "existential-risk", target: "longtermism", kind: "cc", type: "pair" },
    { source: "longtermism", target: "astronomical-waste", kind: "cc", type: "pair" },
    { source: "astronomical-waste", target: "lightcone", kind: "cc", type: "pair" },
    { source: "longtermism", target: "lightcone", kind: "cc", type: "pair" },
    { source: "s-risks", target: "existential-risk", kind: "cc", type: "ecart", note: "s-risks vs. extinction risks: different moral economies" },
    { source: "s-risks", target: "astronomical-waste", kind: "cc", type: "ecart", note: "loss-averse cosmic ethics vs. gain-seeking cosmic ethics" },
    { source: "vulnerable-world", target: "existential-risk", kind: "cc", type: "lineage" },
    { source: "great-filter", target: "lightcone", kind: "cc", type: "pair" },
    { source: "ai-alignment", target: "orthogonality-thesis", kind: "cc", type: "pair" },
    { source: "ai-alignment", target: "instrumental-convergence", kind: "cc", type: "pair" },
    { source: "orthogonality-thesis", target: "instrumental-convergence", kind: "cc", type: "pair" },
    { source: "ai-alignment", target: "mesa-optimization", kind: "cc", type: "lineage", note: "inner alignment problem" },
    { source: "ai-alignment", target: "specification-gaming", kind: "cc", type: "lineage", note: "outer alignment failure mode" },
    { source: "ai-alignment", target: "cev", kind: "cc", type: "lineage", note: "what the system would be aligned to" },
    { source: "ai-alignment", target: "corrigibility", kind: "cc", type: "lineage", note: "weaker but maybe achievable target" },
    { source: "treacherous-turn", target: "specification-gaming", kind: "cc", type: "kinship" },
    { source: "treacherous-turn", target: "instrumental-convergence", kind: "cc", type: "lineage" },
    { source: "recursive-self-improvement", target: "intelligence-explosion", kind: "cc", type: "lineage" },
    { source: "intelligence-explosion", target: "foom", kind: "cc", type: "lineage", note: "foom is a fast intelligence explosion" },
    { source: "pivotal-act", target: "foom", kind: "cc", type: "kinship" },
    { source: "cdt", target: "fdt", kind: "cc", type: "ecart", note: "central decision-theory dispute" },
    { source: "fdt", target: "newcomb-problem", kind: "cc", type: "pair", note: "FDT designed to handle Newcomb" },
    { source: "fdt", target: "acausal-trade", kind: "cc", type: "lineage" },
    { source: "expected-value", target: "pascal-mugging", kind: "cc", type: "ecart", note: "EV reasoning's vulnerability" },
    { source: "wireheading", target: "specification-gaming", kind: "cc", type: "kinship", note: "wireheading is the agent gaming its own reward signal" },
    { source: "moral-patient", target: "moral-circle", kind: "cc", type: "pair" },
    { source: "moral-patient", target: "wireheading", kind: "cc", type: "pair", note: "what counts as wellbeing for which patients" },

    // CROSS-MAP edges to atlas concepts (the écart with classical thought)
    { source: "expected-value", target: "ren", kind: "cc", type: "ecart", note: "formalized impartial calculation vs. relational virtuosity", cross_map: true },
    { source: "utilitarianism", target: "ren", kind: "cc", type: "ecart", note: "aggregate welfare vs. relational ethics", cross_map: true },
    { source: "utilitarianism", target: "moral_law", kind: "cc", type: "kinship", note: "both are universalist Western frameworks", cross_map: true },
    { source: "utilitarianism", target: "role-ethics", kind: "cc", type: "ecart", note: "impartial aggregation vs. constitutive roles", cross_map: true },
    { source: "moral-circle", target: "ren", kind: "cc", type: "ecart", note: "ungraded scope vs. graded calibration", cross_map: true },
    { source: "impartiality", target: "tianxia", kind: "cc", type: "ecart", note: "ungraded cosmopolitanism vs. graded cosmopolitan order", cross_map: true },
    { source: "impartiality", target: "ren", kind: "cc", type: "ecart", note: "ungraded vs. graded concern", cross_map: true },
    { source: "longtermism", target: "shi", kind: "cc", type: "ecart", note: "future-end-state planning vs. read-and-ride present propensity", cross_map: true },
    { source: "longtermism", target: "tianxia", kind: "cc", type: "ecart", note: "temporal cosmopolitanism vs. relational world-order", cross_map: true },
    { source: "longtermism", target: "hua", kind: "cc", type: "parallel", note: "both think across vast timescales, but one plans, one accumulates", cross_map: true },
    { source: "astronomical-waste", target: "common", kind: "cc", type: "ecart", note: "maximize the cosmic endowment vs. cultivate the common", cross_map: true },
    { source: "astronomical-waste", target: "tianxia", kind: "cc", type: "ecart", note: "maximize lightcone value vs. order the world", cross_map: true },
    { source: "lightcone", target: "tianxia", kind: "cc", type: "parallel", note: "two cosmic-scale frames, one physicalist, one relational", cross_map: true },
    { source: "ai-alignment", target: "wuwei", kind: "cc", type: "ecart", note: "encoded objectives vs. effortless attunement to grain of situation", cross_map: true },
    { source: "ai-alignment", target: "ren", kind: "cc", type: "ecart", note: "value loading vs. relational cultivation", cross_map: true },
    { source: "cev", target: "ren", kind: "cc", type: "ecart", note: "extrapolated coherent volition vs. cultivated relational virtuosity", cross_map: true },
    { source: "cev", target: "common", kind: "cc", type: "parallel", note: "both reach for what humans could share, by very different routes", cross_map: true },
    { source: "corrigibility", target: "wuwei", kind: "cc", type: "parallel", note: "non-imposing systems by very different metaphysics", cross_map: true },
    { source: "treacherous-turn", target: "ji", kind: "cc", type: "parallel", note: "the inflection-moment from the AI's vantage", cross_map: true },
    { source: "expected-utility", target: "shi", kind: "cc", type: "ecart", note: "model-based optimization vs. propensity-reading", cross_map: true },
    { source: "pivotal-act", target: "shi", kind: "cc", type: "ecart", note: "decisive intervention vs. inflection of latent propensity", cross_map: true },
    { source: "bayesian-updating", target: "tong", kind: "cc", type: "ecart", note: "calibrated correspondence vs. through-passage", cross_map: true },
    { source: "moral-uncertainty", target: "zhong", kind: "cc", type: "parallel", note: "both refuse single-position commitment, by different routes", cross_map: true },
    { source: "cluelessness", target: "xu", kind: "cc", type: "parallel", note: "epistemic emptiness in two registers — uncertainty and availability", cross_map: true },
    { source: "existential-risk", target: "ji", kind: "cc", type: "parallel", note: "both name moments when the situation is still inflectible — but ji acts upstream of legibility", cross_map: true },
    { source: "precipice", target: "ji", kind: "cc", type: "parallel", note: "the Precipice and the Chinese incipient-moment — same structural problem, different cultural elaboration", cross_map: true },
    { source: "demandingness", target: "ren", kind: "cc", type: "ecart", note: "universalist demand vs. graded relational care", cross_map: true },
    { source: "counterfactual-impact", target: "yin", kind: "cc", type: "ecart", note: "agent-attributable difference vs. leaning on the situation's own propensity", cross_map: true },
    { source: "foom", target: "hua", kind: "cc", type: "ecart", note: "discontinuous explosion vs. silent accumulation — the two extreme readings of capability gain", cross_map: true },
    { source: "intelligence-explosion", target: "hua", kind: "cc", type: "ecart", note: "event-shaped capability gain vs. accumulation that becomes visible only at the end", cross_map: true },
    { source: "specification-gaming", target: "tong", kind: "cc", type: "parallel", note: "both register the gap between specification and what passes through reality", cross_map: true },
    { source: "vulnerable-world", target: "ji", kind: "cc", type: "parallel", note: "the moment before catastrophe is irreversible — Bostrom's black-ball urn meets ji", cross_map: true },
    { source: "person-affecting-view", target: "ren", kind: "cc", type: "parallel", note: "both centered on relations to particular others, with sharply different metaphysical commitments", cross_map: true },
    { source: "crucial-considerations", target: "ji", kind: "cc", type: "parallel", note: "sign-flipping considerations and inflection-moments where intervention is still cheap", cross_map: true },
    { source: "moral-circle", target: "tianxia", kind: "cc", type: "parallel", note: "two cosmopolitanisms — ungraded across all sentient beings vs. graded across an ordered world", cross_map: true },
    { source: "wireheading", target: "wuwei", kind: "cc", type: "ecart", note: "agent gaming its own reward vs. effortless attunement — the two failure modes are mirror images", cross_map: true },
    { source: "treacherous-turn", target: "shi", kind: "cc", type: "parallel", note: "from the AI's vantage, the treacherous turn is shi-following: read the propensity, act when the moment ripens", cross_map: true },

    // ── Cross-map edges from new sino concepts (Sunzi / Legalism / Buddhism / social / modern Chinese) ──
    { source: "jisuan", target: "expected-value", kind: "cc", type: "parallel", note: "Sunzi's structured comparative counting against probability-weighted aggregation — two different formalizations of pre-action assessment", cross_map: true },
    { source: "jisuan", target: "inside-outside-view", kind: "cc", type: "parallel", note: "the seven calculations are systematic outside-view applied to one's own situation", cross_map: true },
    { source: "fa", target: "ai-alignment", kind: "cc", type: "parallel", note: "the alignment problem read in fa-thinking: design for ordinary or vicious agents through impersonal standards rather than rely on virtuous values", cross_map: true },
    { source: "fa", target: "corrigibility", kind: "cc", type: "parallel", note: "both organize systems around exposed standards rather than character", cross_map: true },
    { source: "erdi", target: "map-territory", kind: "cc", type: "parallel", note: "two-truths structure as ancestor-cousin to map/territory — but with the Buddhist claim that the territory itself has no inherent existence", cross_map: true },
    { source: "zhongguan", target: "moral-uncertainty", kind: "cc", type: "parallel", note: "Madhyamaka refuses to be lodged in either eternalism or nihilism; moral-uncertainty refuses commitment to a single ethical theory — same structure, different domain", cross_map: true },
    { source: "yuanqi", target: "mesa-optimization", kind: "cc", type: "parallel", note: "Buddhist analysis of agency emerging from conditioning relations — long-developed conceptual apparatus for what alignment recently named", cross_map: true },
    { source: "zhi-wisdom", target: "ai-alignment", kind: "cc", type: "ecart", note: "wisdom as cultivated capacity inseparable from character vs. value-loading as engineering separable values into otherwise neutral capability", cross_map: true },
    { source: "xin-trust", target: "ea-epistemics", kind: "cc", type: "parallel", note: "the truth-tracking and commitment-keeping registers of reliable speech — both needed; calibration without xin erodes trust, xin without calibration becomes dogma", cross_map: true },
    { source: "guanxi", target: "impartiality", kind: "cc", type: "ecart", note: "central LW/EA premise refused at the most fundamental level — guanxi is not anti-impartial but pre-impartial", cross_map: true },
    { source: "guanxi", target: "moral-circle", kind: "cc", type: "ecart", note: "graded relational scope vs. ungraded expansion — the moral-circle expansion narrative misses what guanxi names", cross_map: true },
    { source: "guanxi", target: "counterfactual-impact", kind: "cc", type: "ecart", note: "agent-attributable difference vs. relational embeddedness — the EA evaluator and the guanxi participant are different kinds of moral agent", cross_map: true },
    { source: "mianzi", target: "ea-epistemics", kind: "cc", type: "ecart", note: "the public-truth-tracking norm against the constitutive social act of giving face — both readings partly right about the other", cross_map: true },
    { source: "gongtong-fuyu", target: "utilitarianism", kind: "cc", type: "parallel", note: "both consequentialist about welfare; differ on agent (individual vs. state), scope (global vs. national), and method (cause-prioritization vs. policy)", cross_map: true },
    { source: "gongtong-fuyu", target: "earning-to-give", kind: "cc", type: "parallel", note: "individual giving vs. state-directed redistribution — two routes to similar outcomes through different moral agents", cross_map: true },
    { source: "zhineng", target: "orthogonality-thesis", kind: "cc", type: "ecart", note: "Bostrom: intelligence and values vary independently. Zhineng at the linguistic level refuses orthogonality — intelligence-without-judgment is not yet zhineng", cross_map: true },
    { source: "zhineng", target: "ai-alignment", kind: "cc", type: "ecart", note: "alignment as value-loading vs. zhineng as the bundling of capacity and judgment from the start — different framings of what AI is supposed to be", cross_map: true },
    { source: "zhineng", target: "intelligence-explosion", kind: "cc", type: "ecart", note: "capability-explosion-without-wisdom-explosion is incoherent under zhineng — what counts as the relevant explosion shifts", cross_map: true },

    // ── Cross-map edges from existing atlas concepts not yet mirrored ──
    { source: "dao", target: "ai-alignment", kind: "cc", type: "ecart", note: "way that emerges in the walking vs. encoded-in-advance objective — different intuitions about whether values pre-exist their pursuit", cross_map: true },
    { source: "li_coherence", target: "mesa-optimization", kind: "cc", type: "parallel", note: "internal pattern that holds together because of how it is configured — a Neo-Confucian concept for what alignment recently named", cross_map: true },
    { source: "ziran", target: "corrigibility", kind: "cc", type: "parallel", note: "non-imposition in two registers — Daoist 'so-of-itself' and the AI that allows itself to be corrected", cross_map: true },
    { source: "shi_time", target: "longtermism", kind: "cc", type: "ecart", note: "seasonal-qualitative time vs. continuous-quantitative future — two grammars for thinking over horizons", cross_map: true },
    { source: "xing", target: "cev", kind: "cc", type: "parallel", note: "Mencian human nature and Yudkowsky's coherent extrapolated volition — both reach for what humans-at-their-best would want, by very different epistemic routes", cross_map: true },
    { source: "he", target: "ai-alignment", kind: "cc", type: "parallel", note: "harmony as cultivated coexistence of difference — a coordination target distinct from value-alignment in the singular-objective sense", cross_map: true },
    { source: "li_ritual", target: "ea-epistemics", kind: "cc", type: "parallel", note: "constitutive practice as the medium of correct thinking — both ritual and forecasting are performances that make their content real", cross_map: true },
    { source: "bian", target: "intelligence-explosion", kind: "cc", type: "ecart", note: "alternation as the texture of change vs. discontinuous capability ascent", cross_map: true },
    { source: "phronesis", target: "moral-uncertainty", kind: "cc", type: "parallel", note: "practical wisdom under uncertainty about moral theory — Aristotelian apparatus for what EA names through the Bayesian frame", cross_map: true },
    { source: "aidagara", target: "ai-alignment", kind: "cc", type: "ecart", note: "ethics as constitutive betweenness vs. ethics as encoded objective — Watsuji's relationality as a non-formalist alternative to alignment-as-specification", cross_map: true },
    { source: "ars-contextualis", target: "ai-alignment", kind: "cc", type: "ecart", note: "Hall–Ames' art of contextualizing vs. specification of fixed objectives — pragmatist alternative to alignment-as-encoding", cross_map: true },

    // Thinker → concept
    { source: "bentham", target: "utilitarianism", kind: "tc", type: "coined" },
    { source: "bentham", target: "moral-circle", kind: "tc", type: "central" },
    { source: "bentham", target: "moral-patient", kind: "tc", type: "central" },
    { source: "mill", target: "utilitarianism", kind: "tc", type: "advanced" },
    { source: "singer", target: "impartiality", kind: "tc", type: "central" },
    { source: "singer", target: "demandingness", kind: "tc", type: "central" },
    { source: "singer", target: "moral-circle", kind: "tc", type: "central" },
    { source: "singer", target: "moral-patient", kind: "tc", type: "central" },
    { source: "parfit", target: "total-view", kind: "tc", type: "central" },
    { source: "parfit", target: "person-affecting-view", kind: "tc", type: "advanced" },
    { source: "parfit", target: "repugnant-conclusion", kind: "tc", type: "coined" },
    { source: "yudkowsky", target: "bayesian-updating", kind: "tc", type: "central" },
    { source: "yudkowsky", target: "map-territory", kind: "tc", type: "central" },
    { source: "yudkowsky", target: "inside-outside-view", kind: "tc", type: "advanced" },
    { source: "yudkowsky", target: "ai-alignment", kind: "tc", type: "central" },
    { source: "yudkowsky", target: "foom", kind: "tc", type: "central" },
    { source: "yudkowsky", target: "intelligence-explosion", kind: "tc", type: "central" },
    { source: "yudkowsky", target: "recursive-self-improvement", kind: "tc", type: "central" },
    { source: "yudkowsky", target: "cev", kind: "tc", type: "coined" },
    { source: "yudkowsky", target: "fdt", kind: "tc", type: "coined" },
    { source: "yudkowsky", target: "pivotal-act", kind: "tc", type: "coined" },
    { source: "yudkowsky", target: "corrigibility", kind: "tc", type: "advanced" },
    { source: "yudkowsky", target: "wireheading", kind: "tc", type: "advanced" },
    { source: "scott-alexander", target: "bayesian-updating", kind: "tc", type: "advanced" },
    { source: "scott-alexander", target: "inside-outside-view", kind: "tc", type: "central" },
    { source: "scott-alexander", target: "ea-epistemics", kind: "tc", type: "advanced" },
    { source: "wei-dai", target: "fdt", kind: "tc", type: "advanced" },
    { source: "wei-dai", target: "acausal-trade", kind: "tc", type: "central" },
    { source: "wei-dai", target: "newcomb-problem", kind: "tc", type: "advanced" },
    { source: "karnofsky", target: "cause-prioritization", kind: "tc", type: "central" },
    { source: "karnofsky", target: "counterfactual-impact", kind: "tc", type: "central" },
    { source: "karnofsky", target: "ea-epistemics", kind: "tc", type: "central" },
    { source: "macaskill", target: "longtermism", kind: "tc", type: "central" },
    { source: "macaskill", target: "moral-uncertainty", kind: "tc", type: "central" },
    { source: "macaskill", target: "cause-prioritization", kind: "tc", type: "advanced" },
    { source: "macaskill", target: "earning-to-give", kind: "tc", type: "advanced" },
    { source: "macaskill", target: "total-view", kind: "tc", type: "advanced" },
    { source: "macaskill", target: "ea-epistemics", kind: "tc", type: "advanced" },
    { source: "ord", target: "existential-risk", kind: "tc", type: "central" },
    { source: "ord", target: "precipice", kind: "tc", type: "coined" },
    { source: "ord", target: "longtermism", kind: "tc", type: "central" },
    { source: "ord", target: "crucial-considerations", kind: "tc", type: "advanced" },
    { source: "greaves", target: "cluelessness", kind: "tc", type: "coined" },
    { source: "greaves", target: "longtermism", kind: "tc", type: "central" },
    { source: "greaves", target: "moral-uncertainty", kind: "tc", type: "advanced" },
    { source: "bostrom", target: "existential-risk", kind: "tc", type: "coined" },
    { source: "bostrom", target: "astronomical-waste", kind: "tc", type: "coined" },
    { source: "bostrom", target: "vulnerable-world", kind: "tc", type: "coined" },
    { source: "bostrom", target: "orthogonality-thesis", kind: "tc", type: "coined" },
    { source: "bostrom", target: "instrumental-convergence", kind: "tc", type: "coined" },
    { source: "bostrom", target: "treacherous-turn", kind: "tc", type: "coined" },
    { source: "bostrom", target: "lightcone", kind: "tc", type: "central" },
    { source: "bostrom", target: "pascal-mugging", kind: "tc", type: "coined" },
    { source: "bostrom", target: "crucial-considerations", kind: "tc", type: "coined" },
    { source: "bostrom", target: "ai-alignment", kind: "tc", type: "central" },
    { source: "russell", target: "ai-alignment", kind: "tc", type: "central" },
    { source: "russell", target: "corrigibility", kind: "tc", type: "central" },
    { source: "christiano", target: "ai-alignment", kind: "tc", type: "central" },
    { source: "christiano", target: "specification-gaming", kind: "tc", type: "central" },
    { source: "christiano", target: "mesa-optimization", kind: "tc", type: "advanced" },
    { source: "christiano", target: "corrigibility", kind: "tc", type: "advanced" },
    { source: "hanson", target: "intelligence-explosion", kind: "tc", type: "critiqued" },
    { source: "hanson", target: "foom", kind: "tc", type: "critiqued" },
    { source: "shulman", target: "intelligence-explosion", kind: "tc", type: "advanced" },
    { source: "shulman", target: "ai-alignment", kind: "tc", type: "advanced" },
    { source: "shulman", target: "cause-prioritization", kind: "tc", type: "advanced" },
    { source: "sandberg", target: "great-filter", kind: "tc", type: "advanced" },
    { source: "sandberg", target: "astronomical-waste", kind: "tc", type: "advanced" },
    { source: "drexler", target: "recursive-self-improvement", kind: "tc", type: "advanced" },
    { source: "drexler", target: "ai-alignment", kind: "tc", type: "advanced" },
    { source: "tomasik", target: "s-risks", kind: "tc", type: "central" },
    { source: "tomasik", target: "moral-patient", kind: "tc", type: "advanced" },
    { source: "tomasik", target: "moral-circle", kind: "tc", type: "advanced" },
    { source: "tomasik", target: "wireheading", kind: "tc", type: "advanced" },
    { source: "grace", target: "intelligence-explosion", kind: "tc", type: "advanced" },

    // Thinker ↔ thinker
    { source: "bentham", target: "mill", kind: "tt", type: "influence" },
    { source: "mill", target: "singer", kind: "tt", type: "influence" },
    { source: "bentham", target: "singer", kind: "tt", type: "influence" },
    { source: "parfit", target: "macaskill", kind: "tt", type: "influence" },
    { source: "parfit", target: "ord", kind: "tt", type: "influence" },
    { source: "parfit", target: "greaves", kind: "tt", type: "influence" },
    { source: "singer", target: "ord", kind: "tt", type: "influence" },
    { source: "singer", target: "macaskill", kind: "tt", type: "influence" },
    { source: "singer", target: "karnofsky", kind: "tt", type: "influence" },
    { source: "yudkowsky", target: "scott-alexander", kind: "tt", type: "influence" },
    { source: "yudkowsky", target: "bostrom", kind: "tt", type: "influence" },
    { source: "yudkowsky", target: "wei-dai", kind: "tt", type: "influence" },
    { source: "wei-dai", target: "yudkowsky", kind: "tt", type: "influence" },
    { source: "yudkowsky", target: "hanson", kind: "tt", type: "dispute", note: "AI Foom Debate, 2008" },
    { source: "yudkowsky", target: "christiano", kind: "tt", type: "dispute", note: "agent foundations vs. prosaic alignment" },
    { source: "bostrom", target: "ord", kind: "tt", type: "influence" },
    { source: "bostrom", target: "macaskill", kind: "tt", type: "influence" },
    { source: "bostrom", target: "russell", kind: "tt", type: "influence" },
    { source: "bostrom", target: "sandberg", kind: "tt", type: "influence" },
    { source: "bostrom", target: "shulman", kind: "tt", type: "influence" },
    { source: "drexler", target: "bostrom", kind: "tt", type: "influence" },
    { source: "ord", target: "macaskill", kind: "tt", type: "influence" },
    { source: "ord", target: "greaves", kind: "tt", type: "influence" },
    { source: "macaskill", target: "greaves", kind: "tt", type: "influence" },
    { source: "karnofsky", target: "macaskill", kind: "tt", type: "influence" },
    { source: "tomasik", target: "macaskill", kind: "tt", type: "dispute", note: "suffering-focused vs. standard longtermism" },
    { source: "russell", target: "christiano", kind: "tt", type: "influence" }
  ]
};

// Alias for the shared graph engine
window.GRAPH_DATA = window.LIGHTCONE_DATA;
