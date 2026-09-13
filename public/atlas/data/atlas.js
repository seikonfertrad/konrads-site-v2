// East ↔ West Atlas — concepts, thinkers, traditions, disputes
// All glosses, profiles, and dispute summaries are original prose composed for this site.
// No copyrighted text is reproduced. Citations to published works are factual references.

window.ATLAS_DATA = {

  // ─────────────────────────── TRADITIONS ───────────────────────────
  traditions: [
    { id: "chinese-classical",    name: "Chinese classical",    period: "Spring & Autumn through Han (~600 BCE – 220 CE)", color: "#8a3324", xPos: -1.0, yPos: 0.0, capsule: "The pre-imperial and early imperial schools — Confucian, Daoist, Mohist, Legalist, naturalist — in which the master concepts of the Chinese repertoire (dao, ren, shi, li, wuwei, qi, tian) were forged. The lineage is plural and argues with itself; later traditions read it as a shared inheritance." },
    { id: "chinese-buddhist",     name: "Chinese Buddhist",     period: "Han through Tang (~100 – 900 CE)", color: "#a86c4d", xPos: -1.0, yPos: 0.0, capsule: "The reception and transformation of Indian Buddhism within a Chinese intellectual culture already shaped by Daoism and Confucianism. The Tiantai, Huayan, and Chan schools produce distinctive contributions to philosophy of mind and metaphysics that later flow back into Confucian thought." },
    { id: "chinese-neoconfucian", name: "Neo-Confucian (Song-Ming)", period: "Song through late Ming (~1000 – 1600)", color: "#b88a3e", xPos: -1.0, yPos: 0.0, capsule: "The Confucian revival under Buddhist and Daoist influence — Zhu Xi's synthesis of li (coherence) and qi (vital energy), Wang Yangming's intuitionism. The framework Western missionaries first encountered, and the one against which 'principle'-based mistranslations took hold." },
    { id: "chinese-modern",       name: "Modern Chinese",       period: "Late Qing onward (1850 –)", color: "#c0392b", xPos: -0.85, yPos: 0.2, capsule: "From late-Qing reformist appropriation of Western thought through twentieth-century New Confucianism (Mou Zongsan, Tang Junyi) to Boston Confucianism (Tu Weiming) and contemporary tianxia theorizing (Zhao Tingyang). A tradition reading itself in dialogue with — and resistance to — Western modernity." },
    { id: "greek-classical",      name: "Greek classical",      period: "Pre-Socratic through Hellenistic (~600 BCE – 200 BCE)", color: "#2c4a52", xPos: 1.0, yPos: 0.0, capsule: "The Greek philosophical tradition from Parmenides through Plato and Aristotle to the Stoics. Source of the Western metaphysical hinges that comparative philosophy regularly contrasts with the Chinese repertoire: being, form, telos, logos, alētheia, kairos." },
    { id: "modern-european",      name: "Modern European",      period: "Cartesian through 20c (~1600 – 2000)", color: "#3a6b75", xPos: 1.0, yPos: 0.2, capsule: "The European philosophical tradition from Descartes onward — German idealism (Kant, Hegel), phenomenology (Husserl, Heidegger), French post-Heideggerian thought (Foucault, Deleuze, Derrida). Contains both the universalist apparatus comparative philosophy contests and the resources from which the contestation is mounted." },
    { id: "kyoto-school",         name: "Kyoto School",         period: "20th century (1910 –)", color: "#5a7a8a", xPos: -0.4, yPos: -0.4, capsule: "Japanese philosophical movement centered on Kyoto Imperial University: Nishida Kitarō, Watsuji Tetsurō, Nishitani Keiji, Tanabe Hajime. Distinct from the Chinese comparative project: works through engagement with German philosophy (Hegel, Heidegger) to reconfigure Buddhist and Confucian categories for the modern world." },
    { id: "comparative",          name: "Comparative philosophy", period: "20th–21st century", color: "#5a3c7a", xPos: 0.0, yPos: -1.0, capsule: "The field of philosophers and sinologists working explicitly across the Asia–West écart: Granet, Needham, Graham, Schwartz, Hall–Ames, Jullien, Billeter, Slingerland, Cheng, Chenyang Li. Distinct intellectual styles, sometimes incompatible methods, but shared problem." }
  ],

  // ─────────────────────────── THINKERS ───────────────────────────
  thinkers: [
    {
      id: "confucius", name: "Confucius (Kǒng Fūzǐ)", dates: "551 – 479 BCE",
      tradition: "chinese-classical", nationality: "Lu (China)",
      key_works: ["Analects (论语) — compiled by disciples"],
      central_concepts: ["ren", "li_ritual", "junzi", "xin-trust", "dao"],
      contribution: "The conversational founder of the Confucian repertoire. The Analects work by example and aphorism rather than by treatise: ren (humaneness), li (ritual), junzi (the exemplary person), and zhèng míng (rectifying names) emerge as recurring touchstones, not as defined doctrines. The text's allergy to systematic statement is itself a position."
    },
    {
      id: "mencius", name: "Mencius (Mèngzǐ)", dates: "~372 – 289 BCE",
      tradition: "chinese-classical", nationality: "Zou (China)",
      key_works: ["Mencius (孟子)"],
      central_concepts: ["xing", "ren", "xin"],
      contribution: "The systematic Confucian. Argues that human nature (xing) tends spontaneously toward goodness — the 'four sprouts' that mature into ren, yi, li, and zhì if not stunted by circumstance. Two millennia later, Mou Zongsan reads this against Kant: where Kant denies humans intellectual intuition, Mencius affirms it as the moral mind's native power."
    },
    {
      id: "laozi", name: "Laozi (Lǎozǐ) [traditional attribution]", dates: "~6th–4th c. BCE (textual; figure legendary)",
      tradition: "chinese-classical", nationality: "Chu (China)",
      key_works: ["Daodejing (道德经)"],
      central_concepts: ["dao", "wuwei", "ziran", "xu"],
      contribution: "The text that organizes Daoist thought, regardless of whether 'Laozi' was a person. Dao as the way that cannot be named; wuwei as the action that does not act; ziran (so-of-itself) as the texture of things when not interfered with. The book's compression makes it the most translated Chinese philosophical work and the most contested in interpretation."
    },
    {
      id: "zhuangzi", name: "Zhuangzi (Zhuāngzǐ)", dates: "~369 – 286 BCE",
      tradition: "chinese-classical", nationality: "Song (China)",
      key_works: ["Zhuangzi (庄子)"],
      central_concepts: ["dao", "ziran", "wuwei", "xu"],
      contribution: "The literary Daoist. Where the Daodejing is gnomic, the Zhuangzi is narrative, ironic, sometimes comic — the butterfly dream, the cook cutting up the ox, the useless tree. The strategy is not doctrine but the systematic dissolution of doctrinal certainty. Slingerland and others read his account of skill as a resource for cognitive science."
    },
    {
      id: "plato", name: "Plato", dates: "~428 – 348 BCE",
      tradition: "greek-classical", nationality: "Athens",
      key_works: ["Republic", "Phaedo", "Timaeus", "Sophist"],
      central_concepts: ["eidos", "being", "truth"],
      contribution: "The hinge on which Western metaphysics installs its primary distinctions: form (eidos) versus appearance, being versus becoming, the intelligible versus the sensible. Comparative philosophers regularly take Plato as the index of what classical Chinese thought did not produce — and what could not have been produced in a tradition organized around immanent process."
    },
    {
      id: "aristotle", name: "Aristotle", dates: "384 – 322 BCE",
      tradition: "greek-classical", nationality: "Stagira / Athens",
      key_works: ["Metaphysics", "Nicomachean Ethics", "Politics", "De Anima"],
      central_concepts: ["telos", "eidos", "praxis", "phronesis", "virtue"],
      contribution: "The Western tradition's principal architect of practical reason. Final causation (telos), virtue ethics (aretē), practical wisdom (phronesis), and the distinction between praxis and poiesis are all his. Hall–Ames and others note that the Aristotelian 'practical wisdom' tradition is the closest Western neighbor of Confucian ethics — closer than the Kantian moral law that descends from him through different lines."
    },
    {
      id: "kant", name: "Immanuel Kant", dates: "1724 – 1804",
      tradition: "modern-european", nationality: "Königsberg (Prussia)",
      key_works: ["Critique of Pure Reason (1781)", "Groundwork of the Metaphysics of Morals (1785)", "Critique of Practical Reason (1788)"],
      central_concepts: ["moral_law", "universal", "subject"],
      contribution: "The Western interlocutor against whom most twentieth-century Confucian philosophy positions itself. Kant's denial that humans have intellectual intuition — that we know things only as they appear, never as they are — is precisely the doctrine Mou Zongsan claims the Confucian-Buddhist tradition refutes. Kant's universalist moral law is the doctrine against which Confucian role ethics defines itself."
    },
    {
      id: "heidegger", name: "Martin Heidegger", dates: "1889 – 1976",
      tradition: "modern-european", nationality: "Germany",
      key_works: ["Being and Time (1927)", "On the Way to Language (1959)"],
      central_concepts: ["being", "event"],
      contribution: "The European philosopher most often connected to East Asian thought, despite (and partly because of) his ambivalence about it. His 1953 'Dialogue on Language' with a Japanese inquirer, and the documented Daoist resonances in his late thought, are extensively studied. Reinhard May's <em>Heidegger's Hidden Sources</em> (1996) traces the actual textual debts."
    },
    {
      id: "nishida", name: "Nishida Kitarō (西田幾多郎)", dates: "1870 – 1945",
      tradition: "kyoto-school", nationality: "Japan",
      key_works: ["An Inquiry into the Good (1911)", "From the Acting to the Seeing (1927)", "The Logic of Place (1926-)"],
      central_concepts: ["basho", "mu", "subject"],
      contribution: "Founder of the Kyoto School. The 'logic of place' (basho 場所) proposes that what Western philosophy locates in subjects, Japanese thought can locate in places that contain subjects — a topology in which 'absolute nothingness' (絶対無) is the encompassing place of all determination. A serious philosophical alternative to subject-centered metaphysics, developed in dialogue with Hegel."
    },
    {
      id: "watsuji", name: "Watsuji Tetsurō (和辻哲郎)", dates: "1889 – 1960",
      tradition: "kyoto-school", nationality: "Japan",
      key_works: ["Climate and Culture / Fūdo (1935)", "Ethics / Rinrigaku (1937–49)"],
      central_concepts: ["aidagara", "ren", "li_ritual"],
      contribution: "The Kyoto School's principal ethicist. Argues that ethics is not a matter of individual subjects in possession of obligations but of <em>aidagara</em> (間柄) — betweenness, the constitutive relationality from which selves emerge. The closest pre-existing Japanese kin to what Jullien half a century later calls <em>l'entre</em>, developed through engagement with Heidegger's analysis of Dasein and the Confucian tradition Watsuji read alongside it."
    },
    {
      id: "mou-zongsan", name: "Mou Zongsan (牟宗三)", dates: "1909 – 1995",
      tradition: "chinese-modern", nationality: "China / Hong Kong / Taiwan",
      key_works: ["Intellectual Intuition and Chinese Philosophy (1971)", "Phenomenon and Thing-in-Itself (1975)", "On the Summum Bonum (1985)"],
      central_concepts: ["intellectual-intuition", "xing", "ren"],
      contribution: "The most ambitious New Confucian engagement with Western philosophy. Argues that the Confucian-Buddhist tradition affirms what Kant denied: that human beings have intellectual intuition — direct, non-sensible cognitive access to ultimate reality — and that the moral mind (Mencius's xin) is the seat of this capacity. A serious philosophical claim, not a culturalist boast, and the central reference for any debate about Confucianism and modern epistemology."
    },
    {
      id: "li-zehou", name: "Li Zehou (李泽厚)", dates: "1930 – 2021",
      tradition: "chinese-modern", nationality: "China / United States",
      key_works: ["The Path of Beauty (1981)", "A History of Chinese Aesthetics (multiple volumes)", "Reading the Analects Today (1998)"],
      central_concepts: ["he", "ren"],
      contribution: "The dominant aesthetic philosopher of post-Mao China and a complicated political figure. Synthesizes Confucian ethics, Marxian materialism, and Kantian aesthetics into what he calls 'sedimentation' — the way historical practice deposits cognitive forms in subjective experience. Influential on a generation of Chinese intellectuals; controversially silent during 1989 and ambivalent in his later years about post-2012 ideological shifts."
    },
    {
      id: "tu-weiming", name: "Tu Weiming (杜维明)", dates: "1940 –",
      tradition: "chinese-modern", nationality: "China / United States",
      key_works: ["Centrality and Commonality (1976)", "Confucian Thought: Selfhood as Creative Transformation (1985)"],
      central_concepts: ["ren", "xin", "junzi"],
      contribution: "Boston Confucianism's principal voice. Argues for a 'spiritual humanism' in which Confucian self-cultivation can be a global resource for ethical life, not a parochial Chinese inheritance. Distinct from the more strongly relational Confucianism of Hall–Ames: emphasizes the cultivating individual where Hall–Ames emphasize the constitutive role-network."
    },
    {
      id: "zhao-tingyang", name: "Zhao Tingyang (赵汀阳)", dates: "1961 –",
      tradition: "chinese-modern", nationality: "China",
      key_works: ["The Tianxia System (2005)", "All Under Heaven (2011)", "Redefining a Philosophy for World Governance (2019)"],
      central_concepts: ["tianxia"],
      contribution: "The contemporary philosopher most associated with the tianxia (天下, 'all under heaven') framework as a proposed alternative to the Westphalian international order. Western critics read tianxia as imperial nostalgia repackaged for soft power; Zhao's reply is that the Westphalian order's universalism is itself imperial, and that tianxia at minimum names a problem the existing order cannot solve. The dispute is live."
    },
    {
      id: "granet", name: "Marcel Granet", dates: "1884 – 1940",
      tradition: "comparative", nationality: "France",
      key_works: ["Festivals and Songs of Ancient China (1919)", "Chinese Civilization (1929)", "La pensée chinoise (1934)"],
      central_concepts: ["bian", "shi_time"],
      contribution: "Durkheimian sinologist; the first serious French effort to read the Chinese repertoire on its own conceptual terms rather than as raw material for European categories. Categories of yin–yang, concrete time as alternation rather than abstract duration, the 'concrete' character of Chinese thought against Western abstraction. Jullien's most-cited French predecessor; criticized in turn for over-systematizing what he found."
    },
    {
      id: "needham", name: "Joseph Needham", dates: "1900 – 1995",
      tradition: "comparative", nationality: "United Kingdom",
      key_works: ["Science and Civilisation in China (1954–) — twenty-seven volumes"],
      central_concepts: ["organic-naturalism", "li_coherence"],
      contribution: "The single most consequential English-language sinological project of the twentieth century. The 'Needham question' — why modern science arose in Europe rather than China, despite China's prior technological lead — frames a generation of comparative debate. His own answer, organic naturalism in China against mechanical reductionism in Europe, is contested but generative; his core insight, that Chinese natural philosophy was sophisticated and not pre-scientific, is now consensus."
    },
    {
      id: "graham", name: "A. C. Graham", dates: "1919 – 1991",
      tradition: "comparative", nationality: "United Kingdom",
      key_works: ["Disputers of the Tao (1989)", "Studies in Chinese Philosophy and Philosophical Literature (1986)", "Chuang-Tzŭ: The Inner Chapters (1981)"],
      central_concepts: ["dao", "wuwei"],
      contribution: "The Anglophone analytic counterpart to Jullien's program — closer to the texts, less programmatic in his East–West contrast. <em>Disputers of the Tao</em> is the standard intellectual history of the classical Chinese 'hundred schools' period; his Zhuangzi translations are a benchmark. Where Jullien hovers above the texts to extract civilizational contrasts, Graham works inside them to reconstruct arguments."
    },
    {
      id: "schwartz", name: "Benjamin Schwartz", dates: "1916 – 1999",
      tradition: "comparative", nationality: "United States",
      key_works: ["The World of Thought in Ancient China (1985)", "In Search of Wealth and Power (1964)"],
      central_concepts: ["axial-age"],
      contribution: "The Harvard-based historian of Chinese thought who placed the classical Chinese repertoire within Karl Jaspers's 'axial age' framework alongside ancient Greece, Israel, and India — emphasizing both the comparability of these axial breakthroughs and the irreducible distinctness of each. Less polemical than Needham, less programmatic than Jullien, more historically situated than either."
    },
    {
      id: "anne-cheng", name: "Anne Cheng", dates: "1955 –",
      tradition: "comparative", nationality: "France",
      key_works: ["Histoire de la pensée chinoise (1997)", "various edited volumes from her Collège de France chair"],
      central_concepts: ["ren", "li_ritual"],
      contribution: "Holder of the Collège de France chair in Chinese intellectual history. Her single-volume <em>Histoire de la pensée chinoise</em> is the standard French-language reference: more measured than Jullien, more philosophical than Granet's heirs, attentive to the internal disputes within the Chinese tradition that programmatic East–West contrast tends to flatten."
    },
    {
      id: "jullien", name: "François Jullien", dates: "1951 –",
      tradition: "comparative", nationality: "France",
      key_works: ["La Propension des choses (1992)", "Traité de l'efficacité (1996)", "Du Temps (2001)", "Les Transformations silencieuses (2009)", "De l'universel, de l'uniforme, du commun (2008)", "L'Écart et l'entre (2012)"],
      central_concepts: ["ecart_meta", "common", "decoincidence", "shi", "hua", "wuwei", "dan"],
      contribution: "The most prolific contemporary French comparative philosopher of the China–West écart. Develops a sustained method (the détour through China to access the unthought of European thought) and a vocabulary (écart, l'entre, le commun, dé-coïncidence) that has become widely cited in business, strategy, and policy circles beyond academic philosophy. Polarizing within sinology — Billeter's <em>Contre François Jullien</em> is the principal indictment — but unmatched in the breadth of the comparative apparatus he has built."
    },
    {
      id: "billeter", name: "Jean-François Billeter", dates: "1939 –",
      tradition: "comparative", nationality: "Switzerland",
      key_works: ["Contre François Jullien (2006)", "Leçons sur Tchouang-tseu (2002)", "Études sur Tchouang-tseu (2004)"],
      central_concepts: ["dao", "wuwei"],
      contribution: "The principal scholarly critic of Jullien's program. Argues that Jullien's contrast between an 'immanent' Chinese tradition and a 'transcendent' Western one essentializes both — the Chinese tradition was riven by debate about transcendence, the Western tradition has its own immanent strands — and that reading classical texts requires philological precision Jullien systematically bypasses. The dispute is methodologically substantive, not merely a feud."
    },
    {
      id: "hall-ames", name: "David L. Hall + Roger T. Ames", dates: "Hall: 1937 – 2001 · Ames: 1947 –",
      tradition: "comparative", nationality: "United States / Canada",
      key_works: ["Thinking Through Confucius (1987)", "Anticipating China (1995)", "Thinking from the Han (1998)", "Democracy of the Dead (1999)"],
      central_concepts: ["ars-contextualis", "role-ethics", "ren", "li_ritual"],
      contribution: "The principal Anglophone comparative-philosophy partnership of the late twentieth century, sustained until Hall's death. Argue for a process-pragmatist reading of Confucianism as <em>ars contextualis</em> (the art of contextualizing): ethical and political life as the cultivation of contextual relationships rather than the application of universal rules. Closer to Dewey than to Kant, closer to relational ontology than to substance metaphysics. Their project is partly parallel to Jullien's and partly in tension with it: more textually argued, less programmatic, philosophically pragmatist where Jullien remains broadly phenomenological."
    },
    {
      id: "slingerland", name: "Edward Slingerland", dates: "1968 –",
      tradition: "comparative", nationality: "United States / Canada",
      key_works: ["Effortless Action: Wu-wei as Conceptual Metaphor and Spiritual Ideal in Early China (2003)", "Trying Not to Try (2014)", "What Science Offers the Humanities (2008)"],
      central_concepts: ["wuwei"],
      contribution: "The cognitive-science wing of comparative philosophy. Reads wuwei not primarily as Daoist mysticism but as a culturally elaborated solution to a perennial problem of cognitive control: how to act spontaneously and effectively without the friction of explicit deliberation. Brings empirical psychology and conceptual-metaphor theory to texts that comparative philosophers had previously read in interpretive registers only."
    },
    {
      id: "chenyang-li", name: "Chenyang Li (李晨阳)", dates: "1956 –",
      tradition: "comparative", nationality: "China / Singapore",
      key_works: ["The Tao Encounters the West (1999)", "The Confucian Philosophy of Harmony (2014)"],
      central_concepts: ["he", "ren"],
      contribution: "The most sustained contemporary philosophical analysis of <em>he</em> (和, harmony) as a Confucian concept distinct from sameness, agreement, or compromise. Argues that harmony as cultivated difference is a viable alternative organizing principle for ethics and political philosophy, and that its conflation with the state-rhetoric of 'harmonious society' is a parochialism Western readers (and recent Chinese state actors) should not be allowed to install."
    },
    {
      id: "sun-zi", name: "Sun Zi (Sūnzǐ)", dates: "~544 – 496 BCE",
      tradition: "chinese-classical", nationality: "Wu (China)",
      key_works: ["The Art of War (孫子兵法 Bīngfǎ)"],
      central_concepts: ["jisuan", "shi", "wuwei"],
      contribution: "The strategic-thought figure traditionally credited with the Bingfa (Art of War). Whether the historical Sun Zi composed the text or it consolidates a tradition under his name, the work is the founding statement of a strategic logic organized around shi (propensity), jisuan (structured calculation), and the supreme excellence of winning without battle. Cited by Mao, Liddell Hart, and contemporary PLA strategic writers in approximately equal measure."
    },
    {
      id: "han-fei", name: "Han Feizi (Hán Fēi)", dates: "~280 – 233 BCE",
      tradition: "chinese-classical", nationality: "Han (China)",
      key_works: ["Han Feizi (韓非子)"],
      central_concepts: ["fa", "shi"],
      contribution: "The synthetic Legalist whose work consolidates fa (impersonal standard), shu (technique of rule), and shi (positional power) into a complete theory of political administration. Argues, against the Confucians, that good governance cannot rely on virtuous rulers and must be designed for ordinary or vicious ones. The intellectual basis of Qin unification (221 BCE), and a perennial counterpoint to Confucian governance theory in subsequent Chinese political thought."
    },
    {
      id: "nagarjuna", name: "Nāgārjuna (龍樹)", dates: "~150 – 250 CE",
      tradition: "chinese-buddhist", nationality: "South India / transmission to China",
      key_works: ["Mūlamadhyamakakārikā (中論, Verses on the Middle Way)"],
      central_concepts: ["zhongguan", "erdi", "yuanqi"],
      contribution: "Founder of the Madhyamaka school of Mahāyāna Buddhist philosophy. Through Kumārajīva's translations into Chinese (~400 CE), Nāgārjuna's analysis of emptiness, dependent origination, and the two truths becomes foundational to Chinese Buddhist philosophy and, through it, to East Asian thought generally. The most rigorous philosophical refusal of substance-metaphysics produced anywhere in classical antiquity, and a permanent point of reference for any tradition that wants to think about emergence and emptiness together."
    },
    {
      id: "mozi", name: "Mozi (Mòzǐ)", dates: "~470 – 391 BCE",
      tradition: "chinese-classical", nationality: "Lu or Song (China)",
      key_works: ["Mozi (墨子) — compiled by the school"],
      central_concepts: ["jian-ai", "li-benefit", "fa"],
      contribution: "Founder of the Mohist school, the first organized rival to the Confucians and the classical tradition's consequentialists. Argues that the standard for any practice is whether it benefits all under heaven — measured in wealth, population, and order — and that concern should be impartial (jian'ai): the same care for a stranger's parent as for one's own. Attacks Confucian graded love, ritual expense, and fatalism on exactly that standard. The Mohists were also the classical tradition's logicians and engineers; the later Mohist canons are its most rigorous work on definition and inference. The school vanished under the Han and was rediscovered as a philosophical partner for utilitarianism only in the twentieth century."
    },
    {
      id: "xunzi", name: "Xunzi (Xúnzǐ)", dates: "~310 – 235 BCE",
      tradition: "chinese-classical", nationality: "Zhao (China)",
      key_works: ["Xunzi (荀子)"],
      central_concepts: ["wei-artifice", "xing", "li_ritual"],
      contribution: "The third great classical Confucian and Mencius's principal opponent on human nature. Argues that xing is bad — not evil, but a bundle of desires that, left to itself, produces strife — and that everything good in human life is wei (偽): deliberate artifice, the ritual and standards that the sages invented and that each person must acquire by effort. Ritual is therefore a technology, not the unfolding of an endowment. Teacher of Han Feizi and Li Si, and so the bridge from Confucian ritual to Legalist law; marginalized by the Song–Ming orthodoxy that canonized Mencius, and rehabilitated by modern readers who find in him the tradition's most systematic thinker."
    }
  ],

  // ─────────────────────────── CONCEPTS ───────────────────────────
  // Categories (domain): strategy, ethics, governance, time, aesthetics, knowledge, self, politics, metaphysics, meta
  concepts: [
    // ── Chinese-classical (Confucian + Daoist) ──
    { id: "shi", term: "勢", script: "Chinese", transliteration: "shì", english: "propensity / situational disposition", tradition: "chinese-classical", domain: "strategy",
      key_thinkers: ["jullien", "graham"],
      gloss: "The tendency inherent in any configuration of forces. A landscape, an army formation, a political moment, a brushstroke — each has a shi that, properly read, indicates how it will unfold and where it can be inflected. Reality is approached not as substance with attributes but as disposition with directionality.",
      counterparts: ["telos", "plan", "eidos"],
      ecart: "Where Western strategic reason organizes around end-states (telos) reached through plans, the shi-frame organizes around the situational propensity to be read and ridden. Jullien's most developed concept; debated by Billeter as overstated.",
      us_china: "U.S. national-security strategy formulates end-states and articulates ways and means; PLA strategic writing on 'comprehensive national power' and 'shaping the strategic environment' operates closer to a shi-logic of accumulating latent advantage until the situation tips."
    },
    { id: "dao", term: "道", script: "Chinese", transliteration: "dào", english: "way / path", tradition: "chinese-classical", domain: "metaphysics",
      key_thinkers: ["laozi", "zhuangzi", "confucius", "graham", "billeter"],
      gloss: "Not a route laid out in advance but a way that emerges in the walking — viable, viable-making, viable because it is being walked. Daoist and Confucian uses of the term differ in tone but share an immanent direction: the dao is not a transcendent ground behind appearances but the regulation of process itself.",
      counterparts: ["being", "method"],
      ecart: "Western 'method' (μέθοδος) is a way pursued after a goal — the goal precedes the road. Dao reverses the direction. Western 'Being' supplies the ontological floor that dao does without.",
      us_china: "Chinese policy discourse routinely invokes 'a Chinese path' (中国道路) for development. Read against dao, this is a stronger claim than ideology or branding: the path is generative, not instrumental."
    },
    { id: "ren", term: "仁", script: "Chinese", transliteration: "rén", english: "humaneness / co-humanity", tradition: "chinese-classical", domain: "ethics",
      key_thinkers: ["confucius", "mencius", "tu-weiming", "hall-ames", "anne-cheng", "watsuji"],
      gloss: "The Confucian master-virtue. A relational disposition of attentiveness to the other, calibrated to the relation. The character is glossed in the tradition as 'two persons together'; humanness is humanness in relation. Cannot be reduced to a rule without remainder.",
      counterparts: ["moral_law", "virtue", "rights"],
      ecart: "The Kantian moral law is universal, formal, contextless. Ren is irreducibly contextual. The disagreement is not about which produces better ethics in a given case; it is about whether ethics is the kind of thing that admits of formalization without remainder.",
      us_china: "Human-rights debates between U.S. and Chinese officials run aground partly here. The Western frame asks whether practices violate universal rights; the Chinese counter-frame, when not merely defensive, sometimes operates with a residual ethics of relation that the universalist frame is structurally unable to recognize as ethics."
    },
    { id: "li_ritual", term: "禮", script: "Chinese", transliteration: "lǐ", english: "ritual propriety", tradition: "chinese-classical", domain: "ethics",
      key_thinkers: ["confucius", "xunzi", "hall-ames", "anne-cheng", "watsuji"],
      gloss: "The performed gesture that constitutes social reality — not etiquette (superficial) and not law (binding from outside), but the choreography that makes a relation what it is. The bow, the seating order, the cup poured first for the elder.",
      counterparts: ["moral_law"],
      ecart: "Modernity sorts performative behavior into superficial etiquette or binding law. 禮 sits between and refuses the distinction: ritual is constitutive without being legal. Hall–Ames's 'role ethics' is in part a Western philosophical recuperation of this register.",
      us_china: "Diplomatic protocol carries far more substantive weight in Chinese practice than Western counterparts typically register. The choreography is read as load-bearing communication on one side, theater on the other; both sides are then surprised."
    },
    { id: "junzi", no_counterpart: "The LW/EA cluster has no exemplary-person concept: its ideal agent is a procedure (the coherent updater) or a machine, not a cultivated figure whose comportment teaches.", term: "君子", script: "Chinese", transliteration: "jūnzǐ", english: "exemplary person", tradition: "chinese-classical", domain: "ethics",
      key_thinkers: ["confucius", "tu-weiming", "hall-ames"],
      gloss: "Classical Confucian honorific often translated as 'gentleman' or 'superior person'; better rendered as 'exemplary person' to avoid both class and gender connotations. The junzi is the cultivated counterpart of moral law: not the rule-follower but the person whose comportment makes ethics legible to those around them.",
      counterparts: ["virtue", "moral_law"],
      ecart: "Aristotelian aretē shares territory; Kantian moral agent does not. The junzi is not the agent of a rule but the medium through which appropriate response becomes available — closer to phronesis than to deontology.",
      us_china: "U.S. political culture's premium on 'character' and 'leadership' has structural overlap with junzi-thinking but is regularly trapped between charisma-talk (sublime-shaped) and rule-talk (moral-law-shaped). The cultivated middle register is harder to articulate in modern English than in modern Chinese."
    },
    { id: "wuwei", term: "無為", script: "Chinese", transliteration: "wúwéi", english: "non-action / effortless action", tradition: "chinese-classical", domain: "strategy",
      key_thinkers: ["laozi", "zhuangzi", "jullien", "slingerland", "graham"],
      gloss: "Not idleness, but the maximally efficacious action that goes with the grain of the situation. The ruler whose governance has internalized itself in the order; the general who wins the battle that did not need to be fought.",
      counterparts: ["praxis", "will"],
      ecart: "Western action is decisive, identifiable, attributable. Wuwei is the systematic preference for action whose effectiveness is precisely not eventful. Slingerland reframes it as a culturally elaborated cognitive-control strategy; classical philologists insist on the texts' more demanding senses.",
      us_china: "American presidents campaign on action; Chinese leadership prefers the appearance of effortless continuity over visible disruption, even when the underlying reorientation is enormous."
    },
    { id: "ziran", term: "自然", script: "Chinese", transliteration: "zìrán", english: "so-of-itself / spontaneity / nature", tradition: "chinese-classical", domain: "metaphysics",
      key_thinkers: ["laozi", "zhuangzi", "graham", "slingerland"],
      gloss: "Literally 'self-so' — that which is so of itself, without external imposition. Often translated as 'spontaneity' but the connotation is more ontological than psychological: the way things are when they are not interfered with. Modern Chinese reuses the term for 'nature' (i.e. the natural world) but the philosophical sense is older and more general.",
      counterparts: ["will", "plan"],
      ecart: "Where the Western moral subject achieves character by the imposition of will against natural inclination, the Daoist sage realizes ziran by the relaxation of imposition. Two opposed moral-psychological architectures, each with its own internal coherence."
    },
    { id: "yin", term: "因", script: "Chinese", transliteration: "yīn", english: "relying-on / conformity to circumstance", tradition: "chinese-classical", domain: "strategy",
      key_thinkers: ["jullien", "graham"],
      gloss: "The methodological principle that follows from shi: act by leaning on the situation's own propensity rather than imposing a foreign design. To rely on the enemy's strength to defeat him; to rely on the river's current to move the boat; to rely on the people's spontaneous tendencies to govern.",
      counterparts: ["will", "plan"],
      ecart: "Western political and strategic thought valorizes the will that imposes form on circumstance — the founder, the legislator, the commander. Yin reverses this: the highest competence is the one that disappears into the situation it bends.",
      us_china: "U.S. foreign policy formulates objectives and asks what means will achieve them. PLA strategic writing more often asks what the situation's tendencies will permit, then formulates objectives that ride those tendencies."
    },
    { id: "ji", term: "機", script: "Chinese", transliteration: "jī", english: "incipience / barely-perceptible inflection", tradition: "chinese-classical", domain: "time",
      key_thinkers: ["jullien"],
      gloss: "The point at which a tendency has not yet become a reality but is no longer reversible by the time it has. The sage acts at the ji, when intervention is still cheap and effective; by the time the situation is manifest, intervention is expensive and usually too late.",
      counterparts: ["kairos", "event"],
      ecart: "Greek kairos is the moment of decisive action — the right time to strike. Ji is earlier and quieter: the moment of barely-discernible inflection, before the situation is even legible to non-sages. Kairos is theatrical; ji is invisible.",
      us_china: "Chinese strategic writing on technology competition repeatedly emphasizes 'seizing the initiative' (掌握主动权) at upstream chokepoints — standards bodies, materials, talent pipelines — long before the downstream market is contested."
    },
    { id: "zhong", term: "中", script: "Chinese", transliteration: "zhōng", english: "median / centrality / availability", tradition: "chinese-classical", domain: "self",
      key_thinkers: ["confucius", "jullien", "tu-weiming"],
      gloss: "Not the moderate compromise (the standard mistranslation), but the refusal of any fixed prior position. The sage holds no idea; he stays available to any side that the situation calls for. Discrimination in context, not relativism.",
      counterparts: ["subject", "moral_law"],
      ecart: "The Western philosopher is defined by his thesis: he is the one who claims X. Confucian centrality is defined by the refusal to be lodged in any X in advance.",
      us_china: "Chinese diplomacy's preference for ambiguity, deferred commitment, and 'principles' over positions reads to Western counterparts as evasion. Through zhong, it functions as a different mode of intelligence — one that treats premature articulation as strategic loss."
    },
    { id: "xu", term: "虛", script: "Chinese", transliteration: "xū", english: "emptiness / availability", tradition: "chinese-classical", domain: "self",
      key_thinkers: ["laozi", "zhuangzi", "jullien"],
      gloss: "The empty cup, ready to receive. Not lack but capacity. The mind that is not pre-filled with positions can register the situation; the mind that is pre-filled cannot.",
      counterparts: ["subject"],
      ecart: "The modern Cartesian-Kantian subject is substantial, characterful, defined by what it possesses. Xu names a subjectivity organized around what it does not pre-possess.",
      us_china: "The cultural premium on 'authenticity' and 'having a voice' that organizes Western public life maps poorly onto a tradition that prizes the cultivated reserve of xu."
    },
    { id: "xin", no_counterpart: "Heart-mind names the refusal of the cognition/affect split that the rationalist vocabulary presupposes; nothing on that side is formulated without already assuming the split.", term: "心", script: "Chinese", transliteration: "xīn", english: "heart-mind", tradition: "chinese-classical", domain: "self",
      key_thinkers: ["mencius", "mou-zongsan", "tu-weiming"],
      gloss: "The seat of cognition and feeling, refusing the modern Western distinction between intellect and affect. For Mencius, xin is the moral mind: spontaneously responsive to suffering, the source of the 'four sprouts' of virtue. For Mou Zongsan, xin is the seat of intellectual intuition that Kant denied to humans.",
      counterparts: ["subject"],
      ecart: "Where the modern Western subject is split into faculties (cognition, will, feeling), xin is integrative. The integration is not pre-philosophical naïveté; it is itself a philosophical position about what the human is."
    },
    { id: "xing", term: "性", script: "Chinese", transliteration: "xìng", english: "human nature / disposition", tradition: "chinese-classical", domain: "ethics",
      key_thinkers: ["mencius", "xunzi", "mou-zongsan"],
      gloss: "The endowment of a thing — what it is given to be when allowed to grow. For Mencius, human xing tends toward goodness: the four sprouts mature unless stunted. For Xunzi, human xing tends toward selfishness and must be reshaped by ritual. The dispute is internal to early Confucianism and never fully resolved.",
      counterparts: ["virtue"],
      ecart: "Aristotelian phusis (nature) is similar in form, very different in content: human nature has a telos for Aristotle, a tendency for Mencius, a deficit for Xunzi."
    },
    { id: "tian", term: "天", script: "Chinese", transliteration: "tiān", english: "heaven / sky / mandate", tradition: "chinese-classical", domain: "metaphysics",
      key_thinkers: ["confucius", "mencius", "zhao-tingyang"],
      gloss: "Not a theistic heaven and not merely the physical sky. Tian is the encompassing order — moral, political, cosmic — that grounds the legitimacy of rule and the moral fabric of the world. The 'mandate of heaven' (天命 tiānmìng) is the warrant by which a ruler holds power; when it passes, the dynasty falls.",
      counterparts: ["being"],
      ecart: "Tian is not the Christian God: it does not love, command, or enter history as a person. It is not Greek Being either: it is moral-political as well as cosmic. A category Western metaphysics has trouble recognizing."
    },
    { id: "tianxia", term: "天下", script: "Chinese", transliteration: "tiānxià", english: "all under heaven", tradition: "chinese-modern", domain: "politics",
      key_thinkers: ["zhao-tingyang"],
      gloss: "Classically: the world as the moral-political order beneath heaven. Contemporarily: Zhao Tingyang's proposal that tianxia names a non-Westphalian framework for international order — one organized not around state sovereignty but around shared cosmopolitan responsibility. Whether this is a genuine philosophical alternative or a soft-power dressing of Chinese hegemony is the live debate.",
      counterparts: ["universal", "common"],
      ecart: "Westphalian order presupposes equal sovereign states; tianxia presupposes a graded, relationally organized 'world.' The two cannot coexist without one giving way to the other in concept; in practice both are operating constantly.",
      us_china: "PRC official rhetoric of a 'community of common destiny for mankind' (人类命运共同体) borrows tianxia framing. Whether this is le commun in Jullien's sense or l'uniforme in tianxia clothing is the right question, and the answer is contested even on the Chinese side."
    },
    { id: "he", term: "和", script: "Chinese", transliteration: "hé", english: "harmony / cultivated difference", tradition: "chinese-classical", domain: "politics",
      key_thinkers: ["confucius", "chenyang-li"],
      gloss: "Harmony as the cultivated coexistence of difference, distinct from sameness (同 tóng) and from compromise. The Confucian classic line — 'the junzi harmonizes but does not conform; the petty person conforms but does not harmonize' — fixes the stakes: harmony is the achievement that conformity is precisely not.",
      counterparts: ["universal", "common"],
      ecart: "Modern Western political philosophy oscillates between consensus (a kind of conformity) and pluralism (a kind of bare coexistence). He names a third operation: difference cultivated into mutual support without dissolving into agreement. Chenyang Li's central claim is that this is a viable global organizing principle, not a parochialism.",
      us_china: "The PRC state's invocation of 'harmonious society' (和谐社会) and 'harmonious world' (和谐世界) is regularly read as repression-with-decoration. Chenyang Li's philosophical argument for he is independent of and largely ignored by that state usage."
    },
    { id: "qi", no_counterpart: "A configuring substance-energy has no place in a physicalist metaphysics that inherits matter and energy silently from physics.", term: "氣", script: "Chinese", transliteration: "qì", english: "vital energy / configuring force", tradition: "chinese-classical", domain: "metaphysics",
      key_thinkers: ["needham"],
      gloss: "The configuring substance-energy that pervades and constitutes things. Untranslatable as 'matter' or 'energy' — neither captures the way qi crosses what Western metaphysics splits into mind/body, animate/inanimate. Central to Neo-Confucian metaphysics (Zhang Zai's qi-monism), to traditional Chinese medicine, to martial arts, to landscape painting.",
      counterparts: ["being", "li_coherence"],
      ecart: "Needham takes qi as the master concept of the Chinese 'organic' worldview that he contrasts with European mechanism. His thesis is contested in detail but the core observation — that Chinese natural philosophy was not pre-scientific, just differently philosophical — is now consensus."
    },
    { id: "hua", term: "化", script: "Chinese", transliteration: "huà", english: "silent transformation", tradition: "chinese-classical", domain: "time",
      key_thinkers: ["jullien"],
      gloss: "The kind of change that becomes visible only at its end. Aging, the seasons, climate, a forest growing back, a society reorganizing — none of these can be located at a moment; they accumulate.",
      counterparts: ["event", "telos"],
      ecart: "Western thinking — Greek crisis-moment, Christian revelation, modern revolution — is event-shaped. The rupture is what we see; the slow continuum producing it slips beneath notice. Hua names exactly that continuum and gives it analytic priority over the event it eventually outputs.",
      us_china: "China's rise was a silent transformation. Western media kept waiting for a discrete event of arrival and so kept missing what was happening in the absence of any such event."
    },
    { id: "bian", term: "變", script: "Chinese", transliteration: "biàn", english: "transformation / alternation", tradition: "chinese-classical", domain: "time",
      key_thinkers: ["granet", "jullien"],
      gloss: "Change conceived as the alternation of polarities — yin and yang, expansion and contraction. Granet's classic study made the alternating-not-progressive structure of bian central to French sinology. Distinguished from huà: bian is the texture of alternation; hua the silent accumulation alternation produces.",
      counterparts: ["event"],
      ecart: "Western 'becoming' historically requires an underlying being to undergird it. Bian needs no such substrate; alternation is itself the texture of reality."
    },
    { id: "shi_time", term: "時", script: "Chinese", transliteration: "shí", english: "seasonality / right-timing", tradition: "chinese-classical", domain: "time",
      key_thinkers: ["granet", "jullien"],
      gloss: "Time as the alternation of seasons, the time-for-this-thing, the moment-fit-for. Classical Chinese thought has no abstract Time as a homogeneous backdrop; it has only the times-of-things.",
      counterparts: ["chronos", "kairos"],
      ecart: "The Greek pair chronos / kairos presupposes the first to think the second. Shí refuses both abstractions. There is no chronos under the seasons; the seasons are time."
    },
    { id: "li_coherence", term: "理", script: "Chinese", transliteration: "lǐ", english: "coherence / internal pattern", tradition: "chinese-neoconfucian", domain: "metaphysics",
      key_thinkers: ["needham", "jullien", "graham"],
      gloss: "The veins of stone, the grain of wood, the weft of fabric: lǐ is what holds together because of how it is configured, not because of any external law. Translated as 'principle' since the Jesuits, but the translation imports a Western legalism the term does not carry. Central to Zhu Xi's twelfth-century Neo-Confucian synthesis.",
      counterparts: ["eidos", "moral_law"],
      ecart: "Western 'principle' (Latin principium, Greek archē) names a starting point or governing law, often transcendent to what it governs. Lǐ is wholly immanent: the pattern is the thing.",
      us_china: "Debates about the 'rule of law' between Western and Chinese officials regularly mistake their respective objects. Western interlocutors hear a question about supremacy of codified law; Chinese interlocutors often answer in terms of governance whose coherence is meant to be immanent — closer to lǐ than to law."
    },
    { id: "tong", term: "通", script: "Chinese", transliteration: "tōng", english: "through-passage / fluency", tradition: "chinese-classical", domain: "knowledge",
      key_thinkers: ["jullien"],
      gloss: "What flows through. A pipe is tong when nothing blocks it; an argument is tong when it can pass without rupture. Chinese 'truth' is closer to tong than to correspondence: not what mirrors reality but what can flow through it.",
      counterparts: ["truth"],
      ecart: "Western truth-as-correspondence asks: does this proposition mirror the world? Tong asks: does this pass through? Two different discursive economies funding different practices."
    },
    { id: "dan", no_counterpart: "The LW/EA cluster has no aesthetics; blandness names a value in a register the cluster does not possess.", term: "淡", script: "Chinese", transliteration: "dàn", english: "blandness / fadeur", tradition: "chinese-classical", domain: "aesthetics",
      key_thinkers: ["jullien"],
      gloss: "The quality of holding all flavors in potential without committing to any. Blandness is not insipidity; it is inexhaustibility. The diluted ink-wash; the long-decaying tone; the scholar-official who is not striking and therefore not exhausted by his strikingness.",
      counterparts: ["sublime"],
      ecart: "Western aesthetics has oscillated between the beautiful (form) and the sublime (excess). Both are attention-arresting. Blandness names a third axis the Western pair does not contain — value located in restraint, in the inexhaustible reserve."
    },

    // ── Modern Chinese coinages ──
    { id: "intellectual-intuition", no_counterpart: "Mou's claim is aimed at Kant; the rationalist epistemology never posed the question of non-sensible access to reality, so there is nothing to set opposite it.", term: "智的直覺", script: "Chinese", transliteration: "zhì de zhíjué", english: "intellectual intuition", tradition: "chinese-modern", domain: "knowledge",
      coined_by: "mou-zongsan",
      key_thinkers: ["mou-zongsan"],
      gloss: "Mou Zongsan's claim that the Confucian-Buddhist tradition affirms what Kant denied: that humans have direct, non-sensible cognitive access to ultimate reality. Not a culturalist boast but a philosophical thesis with apparatus — the moral mind (Mencius's xin) is the seat of this capacity.",
      counterparts: ["moral_law"],
      ecart: "The dispute with Kant is technical and important. If Mou is right, the Kantian limit on human cognition does not hold universally; Confucian and Buddhist traditions instantiate a possibility Kant ruled out. Western reception has been thin; the dispute remains alive in Sinophone philosophy."
    },

    // ── Japanese / Kyoto School ──
    { id: "basho", no_counterpart: "A logic of place that contains subject and object has no counterpart in a tradition whose agents are bounded utility-maximizers by construction.", term: "場所", script: "Japanese", transliteration: "basho", english: "place / locus", tradition: "kyoto-school", domain: "metaphysics",
      coined_by: "nishida",
      key_thinkers: ["nishida"],
      gloss: "Nishida Kitarō's 'logic of place.' Where Western philosophy locates determinations in subjects (the I that has properties, performs acts, knows objects), Nishida proposes a logic in which determinations are located in encompassing 'places' that contain both subject and object. The ultimate basho is 'absolute nothingness' (絶対無, mu).",
      counterparts: ["subject", "being"],
      ecart: "A serious philosophical alternative to subject-centered metaphysics, developed in dialogue with Hegel. Rare in Western reception because it requires both the German philosophical apparatus and the Buddhist metaphysical background to be read fairly."
    },
    { id: "aidagara", term: "間柄", script: "Japanese", transliteration: "aidagara", english: "betweenness / constitutive relationality", tradition: "kyoto-school", domain: "ethics",
      coined_by: "watsuji",
      key_thinkers: ["watsuji"],
      gloss: "Watsuji Tetsurō's central ethical category. Persons are not prior atoms that subsequently enter relations; persons are the precipitates of constitutive relations (parent-child, neighbor, citizen, friend). Ethics is the rinrigaku of these aidagara, not the deontology of the abstract person.",
      counterparts: ["moral_law", "subject"],
      ecart: "Strikingly close in conceptual function to what Jullien half a century later names <em>l'entre</em>, derived from the Chinese 間 jiān. Watsuji reaches the position from Heidegger's analysis of Dasein and his own reading of Confucian ethics; Jullien reaches it through the détour through China. Same neighborhood, different routes."
    },
    { id: "mu", no_counterpart: "Absolute nothingness as the encompassing place plays no role in a metaphysics that takes the physical lightcone as the outermost frame.", term: "無", script: "Japanese / Chinese", transliteration: "mu", english: "absolute nothingness", tradition: "kyoto-school", domain: "metaphysics",
      key_thinkers: ["nishida"],
      gloss: "The Kyoto School's reformulation of the Buddhist 'emptiness' (śūnyatā) as 'absolute nothingness': not a privation of being but the encompassing place from which all determinations emerge. Distinct from European nihilism (which thinks nothingness as a privation) and from European negative theology (which thinks it as transcendence).",
      counterparts: ["being"],
      ecart: "Western metaphysics has Being; the Kyoto School proposes that Nothingness can play the analogous structural role — and produce different metaphysics, different ethics, different aesthetics."
    },

    // ── Comparative-method coinages ──
    { id: "ecart_meta", no_counterpart: "A term of the comparative method itself: it is the instrument of the mapping, not something the mapping maps.", term: "Écart", script: "French", transliteration: "écart", english: "gap / divergence", tradition: "comparative", domain: "meta",
      coined_by: "jullien",
      key_thinkers: ["jullien"],
      gloss: "Jullien's central methodological term. Cultural difference is not opposition (which would presuppose a shared space and pre-organize the disagreement) but écart — a gap that opens a tension between configurations, each of which becomes legible by virtue of its non-coincidence with the other.",
      counterparts: ["aidagara"],
      ecart: "Opposition closes; écart opens. Opposition asks which is right; écart asks what each becomes when seen against the other."
    },
    { id: "common", term: "Le commun", script: "French", transliteration: "le commun", english: "the common (as cultivated, vs. universal)", tradition: "comparative", domain: "politics",
      coined_by: "jullien",
      key_thinkers: ["jullien"],
      gloss: "Distinguished from <em>l'universel</em> (Western intellectual construct, often imposed) and <em>l'uniforme</em> (globalization's flattening). Le commun is what can actually be cultivated as shared across genuine difference, not asserted prior to inquiry.",
      counterparts: ["universal", "tianxia", "he"],
      ecart: "L'universel claims a shared space prior to inquiry. Le commun produces a shared space through inquiry. The first is foundationalist; the second is laborious."
    },
    { id: "decoincidence", no_counterpart: "An instrument of the comparative method rather than a configuration of any shared problem.", term: "Dé-coïncidence", script: "French", transliteration: "dé-coïncidence", english: "de-coincidence", tradition: "comparative", domain: "meta",
      coined_by: "jullien",
      key_thinkers: ["jullien"],
      gloss: "Jullien's late concept. To live is to de-coincide with oneself: to open a gap between what one is and what one has been. Where coincidence with oneself is death, dé-coïncidence is the principle of the living.",
      counterparts: ["ecart_meta"],
      ecart: "Cultures and selves that fully coincide with their own self-image become ideological, brittle. The discipline of dé-coïncidence — opening internal écart with one's own positions — is a condition of remaining alive to what is happening."
    },
    { id: "ars-contextualis", term: "Ars contextualis", script: "Latin", transliteration: "ars contextualis", english: "the art of contextualizing", tradition: "comparative", domain: "meta",
      coined_by: "hall-ames",
      key_thinkers: ["hall-ames"],
      gloss: "David Hall and Roger Ames's name for the form of practical reason they read out of the Confucian tradition: ethical and political life as the cultivation of contextual relationships, not the application of universal rules. Drawn together with the American pragmatist tradition (Dewey above all).",
      counterparts: ["moral_law", "phronesis", "ren"],
      ecart: "Closer to Aristotelian phronesis than to the Kantian moral law; closer to Deweyan situational reasoning than to Rawlsian principles. A pragmatist recovery of relational ethics that is at once a reading of Confucianism and a Western philosophical proposal."
    },
    { id: "role-ethics", term: "Role ethics", script: "English", transliteration: "role ethics", english: "ethics of constitutive roles", tradition: "comparative", domain: "ethics",
      coined_by: "hall-ames",
      key_thinkers: ["hall-ames"],
      gloss: "Ames's later articulation: persons are constituted by the roles they inhabit (parent, child, friend, teacher, citizen) and the ethical question is the appropriate cultivation of those roles, not the application of rules to abstract persons. A Western philosophical recuperation of li (ritual propriety) and ren as ethical primitives.",
      counterparts: ["moral_law", "rights", "ren", "li_ritual"],
      ecart: "Sharp dispute with rights-based liberalism: if persons are constituted by relations, the prior-and-individual rights-bearer is a fiction. Ames's claim is that this is not anti-liberal but post-liberal, available as a global ethics."
    },
    { id: "organic-naturalism", no_counterpart: "Needham's frame for the Chinese–European science contrast; the LW/EA cluster inherits that history as settled rather than holding a position in it.", term: "Organic naturalism", script: "English", transliteration: "organic naturalism", english: "organic naturalism", tradition: "comparative", domain: "metaphysics",
      coined_by: "needham",
      key_thinkers: ["needham"],
      gloss: "Needham's name for the metaphysical orientation he reads out of classical Chinese thought: reality as a self-regulating, internally patterned organic process, contrasted with European mechanical reductionism. The thesis frames his Needham question — why a culture rich in organic-naturalist resources did not produce the European Scientific Revolution.",
      counterparts: ["being", "qi"],
      ecart: "Mechanism explains by isolating parts and showing how they couple. Organic naturalism explains by showing how parts emerge from a configurational whole. Both have done immense work; Needham's claim is that they are not stages but alternatives."
    },
    { id: "axial-age", no_counterpart: "A historiographic frame, not a concept the traditions themselves hold; it is used to compare, not compared.", term: "Axial age", script: "English", transliteration: "axial age", english: "axial age", tradition: "comparative", domain: "meta",
      coined_by: "schwartz",
      key_thinkers: ["schwartz"],
      gloss: "Karl Jaspers's frame, brought into sinology by Schwartz: the period roughly 800–200 BCE during which transformative breakthroughs occurred in parallel across China (Confucius, the Daoist canon), India (the Buddha, Upanishadic thought), Israel (the Prophets), and Greece (the pre-Socratics through Plato). The frame is comparative without being assimilationist.",
      counterparts: [],
      ecart: "The axial-age frame allows comparability without identity. Each axial breakthrough opened a new register of human reflection; none reduces to the others."
    },

    // ── Greek / Modern European ──
    { id: "eidos", no_counterpart: "Inherited silently: the LW/EA cluster takes the form/matter and model/thing apparatus for granted and never argues for it.", term: "εἶδος", script: "Greek", transliteration: "eidos", english: "form / idea", tradition: "greek-classical", domain: "metaphysics",
      key_thinkers: ["plato", "aristotle"],
      gloss: "Plato's intelligible form; Aristotle's what-it-is. The principle by which a thing is what it is, distinguishable from its matter. Foundation of Western metaphysics: things are knowable in virtue of their form.",
      counterparts: ["li_coherence", "shi"],
      ecart: "Where eidos thinks the thing through its form (a stable what-it-is), Chinese coherence thinks the thing through its immanent grain. Form is imposed and identifying; coherence is internal and configurative."
    },
    { id: "telos", no_counterpart: "Inherited silently through consequentialism as the end-state to be realized; no LW/EA concept names the teleological reflex it embodies.", term: "τέλος", script: "Greek", transliteration: "telos", english: "end / final cause", tradition: "greek-classical", domain: "strategy",
      key_thinkers: ["aristotle", "jullien"],
      gloss: "Aristotle's final cause; the end toward which a thing tends because of its nature. Foundation of Western practical reason: action is rational by reference to a telos.",
      counterparts: ["shi"],
      ecart: "Where telos pre-positions the end to be realized, shi reads the end out of the propensity. Strategy under telos is plan-and-execute; strategy under shi is read-and-ride."
    },
    { id: "praxis", no_counterpart: "The Aristotelian noble deed has no descendant in a tradition that evaluates action by its consequences rather than by the excellence it displays.", term: "πρᾶξις", script: "Greek", transliteration: "praxis", english: "action", tradition: "greek-classical", domain: "strategy",
      key_thinkers: ["aristotle"],
      gloss: "Aristotelian noble doing: the action that is its own end, the deed that bears the agent's excellence in itself. Modernity narrows praxis toward the decisive, identifiable, attributable act.",
      counterparts: ["wuwei"],
      ecart: "Praxis is the eventful act, marked and creditable. Wuwei is the systematic preference for action whose efficacity is precisely not eventful."
    },
    { id: "phronesis", term: "φρόνησις", script: "Greek", transliteration: "phronesis", english: "practical wisdom", tradition: "greek-classical", domain: "ethics",
      key_thinkers: ["aristotle", "hall-ames"],
      gloss: "Aristotle's practical wisdom: the capacity to act well in specific circumstances, irreducible to rule-following. The closest Western neighbor of Confucian relational ethics, and the resource through which Hall–Ames recover the Confucian register inside Western philosophy.",
      counterparts: ["moral_law", "ren"],
      ecart: "Where the Kantian moral law takes ethics as rule-application, phronesis takes ethics as cultivated judgment in context. Hall–Ames argue this is closer to Confucianism than the Kantian framework that has dominated comparative ethics."
    },
    { id: "virtue", no_counterpart: "The LW/EA cluster treats virtue ethics as one contested theory among several under moral uncertainty; it has no virtue concept of its own.", term: "ἀρετή", script: "Greek", transliteration: "aretē", english: "virtue / excellence", tradition: "greek-classical", domain: "ethics",
      key_thinkers: ["aristotle", "hall-ames"],
      gloss: "Aretē is excellence at being the kind of thing one is — the virtue of a knife is to cut well, of a citizen to participate well, of a person to live well. Aristotelian ethics is virtue ethics in this register; modern virtue ethics revives it.",
      counterparts: ["ren", "junzi", "moral_law"],
      ecart: "Closer to Confucian junzi-ethics than the Kantian moral law is. Both Greek aretē and Confucian junzi take ethics as the cultivation of excellent character through habituation in roles and relations."
    },
    { id: "kairos", no_counterpart: "Inherited silently: the marked moment within continuous time is the unexamined backdrop of every x-risk timeline.", term: "καιρός", script: "Greek", transliteration: "kairos", english: "the right moment", tradition: "greek-classical", domain: "time",
      key_thinkers: ["aristotle"],
      gloss: "The moment qualitatively distinguished within continuous time — the right time to strike, to speak, to commit. Paired with chronos (continuous, homogeneous time), each presupposing the other.",
      counterparts: ["ji", "shi_time"],
      ecart: "Kairos is the marked moment within an unmarked continuum. Shí refuses the continuum; ji is earlier, quieter, and acts before the kairos becomes legible."
    },
    { id: "chronos", no_counterpart: "Inherited silently: homogeneous continuous time is the assumed frame of longtermist accounting, never a position within it.", term: "χρόνος", script: "Greek", transliteration: "chronos", english: "continuous time", tradition: "greek-classical", domain: "time",
      key_thinkers: ["aristotle"],
      gloss: "Greek time as continuous, homogeneous, abstract — the time of clocks and physics, a backdrop against which events occur and durations measure. The companion of kairos: kairos is qualitatively marked time within a chronos that is itself qualitatively flat.",
      counterparts: ["shi_time"],
      ecart: "Classical Chinese has no exact analog of chronos. There is no abstract continuous backdrop time waiting to be filled by seasons; there are only the times-of-things."
    },
    { id: "method", no_counterpart: "Inherited silently: the goal-before-road reflex is the water the cluster swims in.", term: "μέθοδος", script: "Greek", transliteration: "methodos", english: "method", tradition: "greek-classical", domain: "knowledge",
      key_thinkers: ["plato", "aristotle"],
      gloss: "Literally 'pursuit-after-something': a way taken with a goal in view, where the goal precedes the road. The Western intellectual reflex of asking 'what's the method' before working a problem.",
      counterparts: ["dao"],
      ecart: "Dao reverses the direction: the way regulates itself, generates its own viability, has no exterior end."
    },
    { id: "being", no_counterpart: "Inherited silently as the physicalist what-is; no LW/EA concept names it because none contests it.", term: "Being", script: "Latin / Greek", transliteration: "esse / l'Être", english: "being / what-is", tradition: "greek-classical", domain: "metaphysics",
      key_thinkers: ["plato", "aristotle", "heidegger", "jullien"],
      gloss: "The hinge of Western metaphysics from Parmenides forward. To think reality is to think it as being — substance, presence, what-is. Even modernity's critiques of metaphysics are organized by this hinge.",
      counterparts: ["dao", "qi", "mu", "tian"],
      ecart: "Classical Chinese has no real equivalent of 'Being' as a metaphysical hinge. The closest term, 有 yǒu (having), contrasts with 無 wú (not-having) rather than with non-being. The Kyoto School proposes mu as the analogous hinge in a non-Being-based metaphysics."
    },
    { id: "truth", term: "Truth", script: "Greek / Latin", transliteration: "alētheia / veritas", english: "truth", tradition: "greek-classical", domain: "knowledge",
      key_thinkers: ["plato", "aristotle", "heidegger"],
      gloss: "Greek alētheia as un-veiling; Latin veritas as correspondence; modern truth as adequation between proposition and world. The constant: truth as a relation between a saying and a what-is.",
      counterparts: ["tong"],
      ecart: "Where Western truth-talk asks 'does this match what-is,' Chinese discourse leans toward 'does this pass through' (tong). Different discursive economies funding different practices."
    },
    { id: "subject", no_counterpart: "Inherited silently as the bounded agent of decision theory; contested from the Kyoto and Chinese material, never from within the cluster.", term: "Subject", script: "Latin / French", transliteration: "subjectum / sujet", english: "subject / self", tradition: "modern-european", domain: "self",
      key_thinkers: ["kant", "heidegger", "nishida"],
      gloss: "The substantial, bounded, characterful I that modernity inherits from Descartes through Kant. The center of consciousness, the bearer of rights, the agent of action.",
      counterparts: ["xu", "zhong", "basho", "aidagara"],
      ecart: "Where the subject is full (defined by what it possesses), East Asian alternatives — Chinese xu (emptiness), Japanese basho (the encompassing place), Watsuji's aidagara — locate the determinate not in the substantial self but in capacity, place, or relation."
    },
    { id: "will", no_counterpart: "The willing subject is absorbed without remainder into the utility-maximizing agent; there is no separate LW/EA concept of will to map.", term: "Will", script: "Latin / French", transliteration: "voluntas / volonté", english: "will", tradition: "modern-european", domain: "self",
      key_thinkers: ["kant"],
      gloss: "The faculty of self-determination, central from Augustine through Kant to Schopenhauer and Nietzsche. The willing subject as the engine of moral and historical agency.",
      counterparts: ["yin", "wuwei", "ziran"],
      ecart: "Will imposes itself on circumstance and is celebrated for the imposition. Yin leans on circumstance, wuwei lets the situation move itself, ziran lets things be so-of-themselves. Three different proposals for what a non-imposing agency would look like."
    },
    { id: "moral_law", term: "Moral law", script: "German / French", transliteration: "Sittengesetz / loi morale", english: "moral law", tradition: "modern-european", domain: "ethics",
      key_thinkers: ["kant", "mou-zongsan", "hall-ames"],
      gloss: "The Kantian categorical imperative: act so that the maxim of your action could be universalized. Universal, formal, contextless. The shape of modern Western moral reason in its purest form.",
      counterparts: ["ren", "li_ritual", "phronesis", "role-ethics"],
      ecart: "Where moral law is formal and contextless, Confucian ren is irreducibly contextual. The disagreement is not about which produces better ethics in a given case; it is about whether ethics admits of formalization without remainder.",
      us_china: "Disputes about 'human rights' across U.S.–China lines reproduce this écart almost exactly. The Western frame derives rights from a universal moral law; the Chinese counter-frame, when not merely defensive, sometimes operates with a residual ethics of relation that the universalist frame is structurally unable to recognize as ethics."
    },
    { id: "rights", no_counterpart: "Inherited silently as the entitlements of the decision-theoretic individual; the LW/EA cluster reasons past rights to welfare and never argues with them, so there is nothing to set opposite them.", term: "Rights", script: "English / French", transliteration: "rights / droits", english: "rights", tradition: "modern-european", domain: "politics",
      key_thinkers: ["kant", "hall-ames"],
      gloss: "Modern entitlements held by individuals in virtue of their being individuals: liberty, property, due process, free expression. Derive in standard liberal theory from the universal moral law applied to the rational person.",
      counterparts: ["ren", "role-ethics", "tianxia"],
      ecart: "Hall–Ames and Rosemont's role ethics is the principal contemporary philosophical critique: if persons are constituted by relations, the prior-and-individual rights-bearer is a fiction. Whether this collapses rights or grounds them differently is the dispute."
    },
    { id: "universal", term: "Universal", script: "Latin / French", transliteration: "universalis / universel", english: "universal", tradition: "modern-european", domain: "politics",
      key_thinkers: ["kant", "jullien"],
      gloss: "What holds for all, regardless of locality or relation. Roman law, Christian salvation, Enlightenment reason, human rights — Western universalism has many sources, and exports them all.",
      counterparts: ["common", "tianxia", "he"],
      ecart: "Jullien distinguishes l'universel, l'uniforme (globalization's flattening), and le commun (cultivable shared norms). Tianxia and he propose other framings of the same problem from a Chinese vantage. The post-1945 order claims l'universel and produces l'uniforme; the question is whether le commun, tianxia, or he can name a third path."
    },
    { id: "event", no_counterpart: "Inherited silently: the event-shape of change is presupposed by 'takeoff', 'precipice', and 'pivotal act' rather than named.", term: "Event", script: "French / English", transliteration: "événement", english: "event", tradition: "modern-european", domain: "time",
      key_thinkers: ["heidegger", "jullien"],
      gloss: "What interrupts the order of things, what arrives, what dates. From Greek crisis-moment through Christian revelation to modern philosophy of the event (Heidegger, Badiou).",
      counterparts: ["hua", "ji", "shi_time"],
      ecart: "The event is what the silent transformation eventually outputs. Western analysis sees the output and misses the producing continuum."
    },
    { id: "plan", no_counterpart: "Inherited silently: the plan-and-execute reflex is constitutive of cause prioritization and alignment-as-specification, and therefore invisible to them.", term: "Plan", script: "Latin / English", transliteration: "planum", english: "plan / model / design", tradition: "modern-european", domain: "strategy",
      key_thinkers: ["jullien"],
      gloss: "The pre-figured representation of an end-state, against which action is measured. From Plato's pattern-in-the-mind to modern strategic planning. The cultural reflex of asking 'what's the plan' before acting.",
      counterparts: ["shi", "yin"],
      ecart: "Where plan pre-positions the model, shi reads the situation. The two are not strict opposites but the cultural defaults run different ways."
    },
    { id: "sublime", no_counterpart: "The LW/EA cluster has no aesthetics; astronomical stakes produce vertigo, but vertigo is not a category there.", term: "Sublime", script: "Latin", transliteration: "sublimis", english: "sublime", tradition: "modern-european", domain: "aesthetics",
      key_thinkers: ["kant"],
      gloss: "The Romantic aesthetic of overwhelming magnitude, terror, the unrepresentable. Kant's mathematical and dynamic sublime. The complement to the beautiful, marking the limit of form.",
      counterparts: ["dan"],
      ecart: "Sublime and beautiful both privilege the marked: the form that arrests the eye, or the magnitude that overwhelms it. Blandness names a third axis the Western pair does not contain."
    },

    // ── Sunzi strategic tradition ──
    { id: "jisuan", term: "計", script: "Chinese", transliteration: "jì", english: "strategic calculation", tradition: "chinese-classical", domain: "strategy",
      key_thinkers: ["sun-zi"],
      gloss: "Sun Zi's opening category in the Bingfa, often translated as 'estimations' or 'calculations.' The disciplined comparative assessment of one's own and the enemy's situation across structured factors (the way, weather, terrain, leadership, doctrine; seven comparative calculations). Not arithmetic but systematic situational counting that produces strategic discrimination before action.",
      counterparts: ["expected-value", "shi"],
      ecart: "Western expected-value reasoning is probability-weighted aggregation over outcomes. Jisuan is structured comparative judgment over situations. Both formalize 'thinking before acting' but produce different objects — one a number to maximize, the other a discrimination to read. The Chinese strategic tradition is the most developed pre-modern tradition of formal pre-action reasoning that does not collapse into expected-value."
    },

    // ── Legalism (Han Feizi) ──
    { id: "fa", term: "法", script: "Chinese", transliteration: "fǎ", english: "Legalist law / impersonal standard", tradition: "chinese-classical", domain: "politics",
      key_thinkers: ["han-fei", "mozi"],
      gloss: "The Legalist tradition's central concept: an impersonal, public, prior standard against which actions and persons are measured — explicitly opposed to Confucian li (ritual) and ren (humaneness), which depend on virtuous judgment. Han Feizi's premise is that competent governance cannot rely on virtuous rulers and must be designed for ordinary or vicious ones; fa is what makes such a design possible.",
      counterparts: ["moral_law", "rights"],
      ecart: "Fa's premise — that impersonal standards are needed precisely because no ruler is reliably virtuous — runs closer to liberal-constitutional thinking than Confucian role-ethics does, but the Legalist conclusion (rule by harsh, exposed standards with severe enforcement) is illiberal. The position has no clean Western analog and is regularly mistranslated by both Confucian-leaning sympathizers (who soften it into rule-of-law) and liberal critics (who hear only the harshness)."
    },

    // ── Madhyamaka Buddhist ──
    { id: "erdi", term: "二諦", script: "Chinese / Sanskrit", transliteration: "èrdì / dvasatya", english: "two truths", tradition: "chinese-buddhist", domain: "knowledge",
      key_thinkers: ["nagarjuna"],
      gloss: "Mahāyāna Buddhist doctrine, central to Madhyamaka: there are two levels of truth, conventional (世俗諦, what works for everyday purposes and discourse) and ultimate (勝義諦, the lack of inherent existence in all phenomena). The two are not contradictory but constitutively complementary — emptiness is itself dependently arising; the conventional cannot be dropped without losing the ultimate, the ultimate cannot be reached without the conventional.",
      counterparts: ["truth"],
      ecart: "The Buddhist two-truths structure is ancestor-cousin to the rationalist map/territory distinction, with the further claim that the territory itself has no inherent existence — there is no thing-in-itself behind the conventional appearance. This makes the structure stronger and stranger than its modern descendants, and gives Chinese Buddhist epistemology an apparatus for ultimate-conventional differentiation that secular Western philosophy has had to laboriously reinvent."
    },
    { id: "zhongguan", term: "中觀", script: "Chinese / Sanskrit", transliteration: "zhōngguān / madhyamaka", english: "middle way", tradition: "chinese-buddhist", domain: "knowledge",
      key_thinkers: ["nagarjuna"],
      gloss: "Nāgārjuna's middle-way teaching: refusing both eternalism (asserting the inherent existence of phenomena) and nihilism (denying that anything exists in any sense). The 'middle' is not a compromise between the two but a structural refusal to be lodged in either pole. Central to Chinese and East Asian Buddhism through the Sanlun school and later schools.",
      counterparts: ["zhong"],
      ecart: "Madhyamaka's refusal-of-extremes parallels both Confucian zhong (refusal to be lodged in a position) and contemporary moral-uncertainty reasoning across theories. The Buddhist version is more radical: the refusal extends to the metaphysical foundations themselves, not just to ethical commitments. A polity or research program operating in the zhongguan register would refuse not just to commit to one ethical theory but to commit to the very framework within which ethical theories are evaluated."
    },
    { id: "yuanqi", term: "緣起", script: "Chinese / Sanskrit", transliteration: "yuánqǐ / pratītyasamutpāda", english: "dependent origination", tradition: "chinese-buddhist", domain: "metaphysics",
      key_thinkers: ["nagarjuna"],
      gloss: "Buddhist doctrine that all phenomena arise in dependence on conditions and have no independent self-existence. In the Chinese reception (especially Huayan Buddhism), elaborated into a metaphysics of mutual interpenetration: each phenomenon contains and is contained by every other in an unending net of conditioning relations.",
      counterparts: ["being"],
      ecart: "Western metaphysics from Parmenides forward has organized around substance and what-is. Yuanqi proposes that what looks like substance is the stable signature of dense conditioning relations — emergence rather than essence. The doctrine has technical applications in Buddhist logic (Nāgārjuna's tetralemma) and renewed contemporary relevance for emergent agentic systems whose behavior is not reducible to constituent parts."
    },

    // ── Confucian virtues (additional) ──
    { id: "zhi-wisdom", term: "智", script: "Chinese", transliteration: "zhì", english: "wisdom (Confucian virtue)", tradition: "chinese-classical", domain: "ethics",
      key_thinkers: ["confucius", "mencius"],
      gloss: "One of the four Mencian cardinal virtues (with ren, yi, li). Distinct from mere knowledge (zhī 知) or cleverness — implies the capacity to apply learning appropriately in context. Closer to Aristotelian phronesis than to sophia, with the additional Confucian emphasis that zhi cannot be separated from moral character: a clever person without humaneness has not yet achieved zhi.",
      counterparts: ["phronesis"],
      ecart: "Modern Western traditions have largely separated intelligence (cognitive capacity), wisdom (good judgment), and character (moral disposition); zhi insists they are inseparable. The premise has direct consequences for what 'making something intelligent' even means — a system with capacity but without integrated judgment has not yet reached zhi."
    },
    { id: "xin-trust", term: "信", script: "Chinese", transliteration: "xìn", english: "trustworthiness", tradition: "chinese-classical", domain: "ethics",
      key_thinkers: ["confucius"],
      gloss: "The fifth Confucian virtue (after ren, yi, li, zhi). Reliability of word matched by deed across time. Distinct from honesty as truth-telling: xin emphasizes the durability of commitment, the consistency between past assurance and present action, what makes one a person whose statements can be relied on without verification.",
      counterparts: ["truth"],
      ecart: "Modern epistemic norms (calibration, public updates, willingness to disagree publicly with one's prior self) approach reliable speech from the truth-tracking side. Xin approaches the same territory from the commitment-keeping side. They produce overlapping but non-identical practices: Bayesian updating can erode xin if performed without care for the durability of commitment."
    },

    // ── Modern Chinese social and political concepts ──
    { id: "guanxi", term: "關係", script: "Chinese", transliteration: "guānxi", english: "network of relations", tradition: "chinese-modern", domain: "ethics",
      key_thinkers: [],
      gloss: "The cultivated network of personal relationships within which obligations, favors, trust, and information circulate in Chinese social life. Roots in classical relational ethics (especially the five Confucian relationships); modern usage extends to professional and political contexts. Western analysts often code as corruption-adjacent; the tradition codes it as the relational substrate of social and economic life that impartial-formal mechanisms presuppose without acknowledging.",
      counterparts: ["ren", "li_ritual"],
      ecart: "Liberal universalism treats relational embeddedness as a bias to be overcome. Guanxi treats it as the medium in which obligation actually lives. The disagreement is not about whether favoritism is bad (both agree it can be) but about whether relational ethics admits the impartial frame as a complete description.",
      us_china: "U.S. anti-corruption frames and Chinese guanxi practices regularly produce mutual incomprehension. The U.S. side sees graft where the Chinese side sees obligation; the Chinese side sees alienation where the U.S. side sees professional impartiality. Neither reading exhausts the territory."
    },
    { id: "mianzi", term: "面子", script: "Chinese", transliteration: "miànzi", english: "face / social standing", tradition: "chinese-modern", domain: "ethics",
      key_thinkers: [],
      gloss: "The public dimension of one's social standing — the recognition one is given and that one extends to others. Distinct from honor (internal) or reputation (informational): face is performative, reciprocal, and consequentially real even when its informational content is small. To 'give face' is a constitutive social act, not merely a polite one.",
      counterparts: ["li_ritual"],
      ecart: "Norms that require speaking one's actual beliefs in public read, from the mianzi register, as a willingness to inflict social damage to satisfy a private epistemic value. The mianzi register, from the truth-tracking vantage, reads as preference-falsification masquerading as politeness. Both readings are partly right; the disagreement is over whether the social act of giving face is an externality of communication or constitutive of it."
    },
    { id: "gongtong-fuyu", term: "共同富裕", script: "Chinese", transliteration: "gòngtóng fùyù", english: "common prosperity", tradition: "chinese-modern", domain: "politics",
      key_thinkers: ["zhao-tingyang"],
      gloss: "Chinese policy slogan with classical roots, revived under Xi Jinping (2021–) in the era of high inequality. Concrete content varies by usage — redistribution of wealth, regulation of platform monopolies, cooling of housing speculation, expansion of social services — and is coupled with civilizational-rejuvenation rhetoric distinct from Western redistributive frames.",
      counterparts: ["common", "tianxia"],
      ecart: "Western redistributive arguments from Rawls forward operate through the individual moral subject and impartial principle. Gongtong fuyu operates through the relational-political body within a national-civilizational frame. Both target inequality; their justificatory architectures barely overlap, and the gap matters for whether the policies can travel.",
      us_china: "U.S. observers regularly read 'common prosperity' as either soft socialism or rhetorical cover for Party consolidation. Read against gongtong fuyu's classical lineage and contemporary policy specifics, the framing names something both sides need a vocabulary for — large-scale redistribution within a polity that retains capitalist mechanisms — but reaches it through a non-liberal architecture."
    },
    { id: "zhineng", term: "智能", script: "Chinese", transliteration: "zhìnéng", english: "intelligence (Chinese sense)", tradition: "chinese-modern", domain: "knowledge",
      key_thinkers: [],
      gloss: "The contemporary Chinese term for 'intelligence' in the cognitive and AI sense (人工智能 = artificial intelligence). The compound is 智 (wisdom, contextual judgment) + 能 (capacity, capability), bundling into one term what modern English splits between 'intelligence' (cognitive capacity) and 'wisdom' (judgment). The character composition is not a translation choice but a structural feature of the modern Chinese lexicon.",
      counterparts: ["zhi-wisdom"],
      ecart: "At the level of vocabulary, modern Chinese refuses what Anglophone AI safety calls the orthogonality thesis. Intelligence-without-judgment is not yet zhineng; it is zhi without neng or neng without zhi. The disagreement is not just terminological — it reshapes what 'making AI safe' can mean: alignment-as-value-loading reads as a Western response to a problem the Chinese frame would not have stated this way.",
      us_china: "Chinese AI ethics discourse often reads to Western AI safety researchers as soft on alignment because it is — by the standards of orthogonality-thesis-shaped alignment. From the zhineng vantage, the question 'will the system have good values' is malformed; a system without good judgment is not yet intelligent in the relevant sense. Whether the linguistic-conceptual move tracks anything in the actual technical practice is the live empirical question."
    },

    // ── Mohist ──
    { id: "jian-ai", term: "兼愛", script: "Chinese", transliteration: "jiān'ài", english: "impartial care", tradition: "chinese-classical", domain: "ethics",
      key_thinkers: ["mozi", "mencius"],
      gloss: "The Mohist master-principle: care extended without gradation — to regard other states, families, and persons as one regards one's own. Mozi's argument is consequentialist: partial care is the root of aggression and disorder, impartial care the condition of benefit for all under heaven. Not affective love but a policy of regard, and the classical tradition's one sustained refusal of graded concern.",
      counterparts: ["ren", "impartiality", "moral-circle"],
      ecart: "Mencius's attack — that impartial care 'denies the father' — is the ancient rehearsal of the modern objection that impartiality dissolves the relations in which obligation actually lives. The Mohist reply is the drowning-child argument two millennia early: if your care is graded, explain why the stranger's child counts less. The dispute was never settled inside the tradition; it was won politically by the Confucians.",
      us_china: "Impartialist premises in Western humanitarian and human-rights discourse are usually read in China as foreign. Mohism shows they are not: the refusal of graded concern has a native Chinese lineage, one the Confucian mainstream outlasted rather than answered."
    },
    { id: "li-benefit", term: "利", script: "Chinese", transliteration: "lì", english: "benefit / utility (Mohist criterion)", tradition: "chinese-classical", domain: "ethics",
      key_thinkers: ["mozi", "mencius"],
      gloss: "The Mohist criterion for judging any doctrine or practice: does it benefit the people — enrich the poor, increase the population, bring order? Applied with three tests (precedent, observation, consequences in use) to music, funerals, war, and fatalism alike. The same character Mencius refuses at the opening of his book: 'why must the king speak of benefit?'",
      counterparts: ["ren", "utilitarianism", "cause-prioritization"],
      ecart: "Mohist benefit is aggregate welfare as a public standard, applied by comparison across practices — the nearest classical Chinese analog of a cost-effectiveness criterion. What it lacks is the calculus: benefit is measured in kinds (wealth, people, order), not in a common unit, so it discriminates practices without summing them. The Confucian objection is not that benefit is bad but that making it the criterion corrupts the motive it is supposed to serve."
    },

    // ── Xunzi ──
    { id: "wei-artifice", term: "偽", script: "Chinese", transliteration: "wěi", english: "deliberate artifice / conscious effort", tradition: "chinese-classical", domain: "ethics",
      key_thinkers: ["xunzi"],
      gloss: "Xunzi's term for everything in human goodness that is made rather than given: ritual, standards, learning, the straightening of a crooked nature by effort. Not 'falseness' (the character's later sense) but artifice in the craftsman's sense — the sages invented ritual as a potter makes a vessel. Goodness is an achievement of design applied to a nature that would not produce it alone.",
      counterparts: ["xing", "ziran", "ai-alignment", "cev"],
      ecart: "Against Mencius's sprouts and the Daoist so-of-itself, wei says the good is engineered. It is the classical tradition's own version of the alignment premise — that a capable agent is not thereby a good one and must be shaped by constructed standards — and the reason Xunzi's students became Legalists. Whether the shaping is education (Xunzi) or law (Han Feizi) is the fork inside the position."
    }
  ],

  // ─────────────────────────── DISPUTES ───────────────────────────
  disputes: [
    {
      id: "needham-question",
      name: "The Needham question",
      summary: "Why did modern science emerge in early-modern Europe rather than in classical-medieval China, given that China had a substantial technological lead through much of that period?",
      stake: "Whether the absence is explained by something internal to Chinese culture (worldview, language, institutions), by something external (markets, autonomous universities, mercantile capital), or whether the question itself is malformed — presupposing a developmental teleology in which Western modern science is the universal endpoint.",
      positions: [
        { label: "Worldview-internalism (Needham's own answer)", thinkers: ["needham"], concepts: ["organic-naturalism", "qi"], claim: "Chinese organic naturalism, rich in resources for natural philosophy, did not produce the mechanical-reductionist abstractions modern physics required. The orientation was not pre-scientific but differently philosophical." },
        { label: "Institutional explanation", thinkers: [], concepts: [], claim: "Modern science required autonomous universities, mercantile capital, and the church-state-merchant settlement of late medieval Europe. Chinese imperial bureaucracy concentrated talent in a different direction. (Joel Mokyr, Justin Lin, and others, in different keys.)" },
        { label: "The question is malformed", thinkers: ["hall-ames"], concepts: [], claim: "The question presupposes Western modern science as the universal target every culture should approach. Once we drop the teleology, the absence is no more puzzling than the absence of Confucian ritual in Renaissance Italy." }
      ]
    },
    {
      id: "asian-values",
      name: "The Asian Values debate",
      summary: "Are human-rights claims genuinely universal, or are they Western particulars overclaiming their universality?",
      stake: "The post-1945 international human-rights order rests on universalist premises. Asian Values discourse — Lee Kuan Yew, Mahathir, Mahbubani in the policy register; Ames, Rosemont, Hall in the philosophical register — argues that this universalism imports Western individualism. The debate is not settled and recurs in every cycle of the China–West conversation.",
      positions: [
        { label: "Universalist (mainstream liberal)", thinkers: ["kant"], concepts: ["moral_law", "rights", "universal"], claim: "Human rights are derivable from the moral law applied to persons as such; their first historical articulation in Western institutions does not impeach their universality. Critics of this view risk apologizing for authoritarian repression." },
        { label: "Role-ethics critique", thinkers: ["hall-ames"], concepts: ["role-ethics", "ren", "li_ritual"], claim: "Persons are constituted by relations and roles, not prior to them. A rights-talk that presupposes the prior-and-individual rights-bearer is not universal but a particular metaphysical proposal masquerading as universal. A genuine global ethics would have to be rebuilt." },
        { label: "Le commun", thinkers: ["jullien"], concepts: ["common", "universal"], claim: "Both universalism and identitarian counter-claims overclaim. What can be made common across the écart is real but smaller than universalism asserts and larger than identitarianism allows. Cultivation, not assertion." }
      ]
    },
    {
      id: "billeter-jullien",
      name: "Billeter vs. Jullien on method",
      summary: "Does the comparative project require sustained East–West contrast or close textual reading? Billeter's <em>Contre François Jullien</em> (2006) is the principal dispute.",
      stake: "If Billeter is right, much of comparative philosophy in Jullien's mode is methodologically unsound — projecting unity onto traditions that contained internal disputes, contrasting an idealized China with an idealized West, and bypassing the philological work that should ground any such comparison. If Jullien is right, philological purism forecloses the method (the détour) by which comparative philosophy yields anything beyond restatement of what is already in the texts.",
      positions: [
        { label: "Philological precision (Billeter)", thinkers: ["billeter", "graham", "anne-cheng"], concepts: ["dao", "wuwei"], claim: "Read the texts; respect the internal disputes; resist the temptation to turn the Chinese tradition into the photographic negative of European thought. The contrast Jullien produces is partly an artifact of his method." },
        { label: "Productive écart (Jullien)", thinkers: ["jullien"], concepts: ["ecart_meta", "decoincidence"], claim: "Comparative philosophy is not philology in another key. The détour through China is meant to illuminate the unthought of European thought, not to reproduce internal Chinese debates. The method is its own justification when it produces yield." }
      ]
    },
    {
      id: "mou-kant",
      name: "Mou Zongsan on intellectual intuition",
      summary: "Does the Confucian-Buddhist tradition affirm what Kant denied — that humans have intellectual intuition, direct cognitive access to ultimate reality?",
      stake: "If Mou's argument holds, the Kantian limit on human cognition is not universal: a major non-European tradition demonstrates the alternative he ruled out. The implications cross epistemology, ethics, and the philosophy of religion. The dispute is alive in Sinophone philosophy and thinly attended in Anglophone.",
      positions: [
        { label: "Mou's thesis", thinkers: ["mou-zongsan"], concepts: ["intellectual-intuition", "xin", "xing", "ren"], claim: "Mencius's xin (the moral mind) and Buddhist tathāgatagarbha thinking instantiate exactly what Kant denied: non-sensible cognitive access to ultimate reality, available to humans in cultivated states. The Confucian tradition affirmed this and built its ethics around it." },
        { label: "Kantian defense", thinkers: ["kant"], concepts: ["moral_law", "subject"], claim: "Kant's critical limits remain universal. What Mou calls intellectual intuition is, on this reading, either a description of moral feeling (Kantian-permissible) or a metaphysical overreach that the Critique was meant to forbid. The dispute is technical and continues." }
      ]
    },
    {
      id: "tianxia-order",
      name: "Tianxia and the international order",
      summary: "Does Zhao Tingyang's tianxia framework offer a genuine philosophical alternative to the Westphalian order, or is it imperial nostalgia repackaged for soft power?",
      stake: "If tianxia is a genuine alternative, the Westphalian framework has competition that is not merely strategic. If it is mostly soft power dressed in classical garb, its uptake in policy circles is a mistake. The dispute is recent and live.",
      positions: [
        { label: "Tianxia as genuine alternative", thinkers: ["zhao-tingyang"], concepts: ["tianxia", "common"], claim: "Westphalian sovereignty cannot solve the global commons problems (climate, pandemic, AI risk) it was not designed for. Tianxia names an organizing principle — graded relational responsibility for the world — that is at minimum a real philosophical option, regardless of what any particular state does with it." },
        { label: "Imperial nostalgia critique", thinkers: [], concepts: ["universal", "rights"], claim: "The Westphalian order's flaws do not validate a framework descended from a system that was, historically, an imperial hierarchy with client states. Tianxia in modern dress repeats the structure with new vocabulary." },
        { label: "Le commun as the actual object", thinkers: ["jullien", "chenyang-li"], concepts: ["common", "he"], claim: "Both 'tianxia' and 'liberal universalism' overclaim. What is actually wanted is a cultivated common across the écart. Both classical-Chinese harmony (he) and Jullien's commun name candidate framings; the work is unfinished." }
      ]
    },
    {
      id: "role-rights",
      name: "Role ethics vs. rights",
      summary: "Can a relational ethics of constitutive roles (Confucian li and ren, recovered as Western philosophy by Hall–Ames and Rosemont) serve as a global ethics, or is it dependent on a metaphysics of personhood incompatible with modern individualism?",
      stake: "The contemporary debate is most active in Anglophone Confucian philosophy (Ames, Rosemont, Sarkissian, Tan) and matters because role ethics is the most developed non-Western philosophical alternative to rights-based liberalism currently in circulation.",
      positions: [
        { label: "Role ethics as post-liberal global ethics", thinkers: ["hall-ames"], concepts: ["role-ethics", "ren", "li_ritual"], claim: "Persons are constituted by relations; a rights-discourse that presupposes the prior individual is not anti-relational by neglect, it is anti-relational by design. Role ethics is post-liberal, not pre-liberal, and available as a global resource." },
        { label: "Liberal defense", thinkers: ["kant"], concepts: ["rights", "moral_law", "universal"], claim: "Rights protect persons against the relations that constitute them — which often oppress them. To dispense with the prior-individual is to dispense with the protection. The rights-frame is universal not despite its abstraction but because of it." },
        { label: "Spiritual humanism middle path", thinkers: ["tu-weiming"], concepts: ["ren", "junzi"], claim: "Confucian self-cultivation does not require the role-ethics dissolution of the prior-individual. The cultivating person is real and irreducibly individual, and Confucian ethics is the cultivation of that person within and through relations. A different reading of the same tradition." }
      ]
    },
    {
      id: "wuwei-debate",
      name: "Wuwei: Daoist mysticism, ethical ideal, or cognitive strategy?",
      summary: "How should classical wuwei be read — as religious mysticism, as an ethical ideal of effortless virtue, or as a culturally elaborated solution to a perennial problem of cognitive control?",
      stake: "The dispute matters for whether wuwei is exportable as a global concept (Slingerland's claim) or requires the larger Daoist apparatus to be intelligible at all. It also matters for whether the cognitive-science methodology is illuminating or reductive.",
      positions: [
        { label: "Cognitive science", thinkers: ["slingerland"], concepts: ["wuwei", "ziran"], claim: "Wuwei names a real problem (how to act spontaneously and effectively without explicit deliberation) that early Chinese culture elaborated more thoroughly than the Western tradition. The cognitive-metaphor analysis travels; the religious dressing is detachable." },
        { label: "Philological-philosophical", thinkers: ["graham", "billeter"], concepts: ["wuwei", "dao"], claim: "Wuwei is intelligible only in the larger Daoist apparatus of dao, ziran, and xu. The cognitive-science framing dissolves the philosophical content and recovers an empirically tractable but philosophically thin remainder." },
        { label: "Strategic-comparative (Jullien)", thinkers: ["jullien"], concepts: ["wuwei", "shi", "yin"], claim: "Wuwei is the action that follows from reading shi correctly. The cognitive-control framing misses what makes wuwei a strategic concept and not merely a psychological one." }
      ]
    },
    {
      id: "immanence-transcendence",
      name: "Is the immanence/transcendence contrast real?",
      summary: "Comparative philosophy regularly contrasts an 'immanent' Chinese tradition with a 'transcendent' Western one. Is this contrast genuine, or an artifact of selective reading on both sides?",
      stake: "The contrast organizes much of Jullien, Hall–Ames, and the broader comparative literature. If it is genuine, the East–West écart has a single deep axis. If it is artifactual, comparative philosophy has been over-reading a single ridge of difference into a continental divide.",
      positions: [
        { label: "Genuine and structuring (Jullien, Hall–Ames)", thinkers: ["jullien", "hall-ames", "needham"], concepts: ["dao", "li_coherence", "qi", "being"], claim: "The Chinese tradition's master concepts (dao, li, qi, ziran, hua) are systematically immanent; the Western tradition's master concepts (Being, telos, eidos, the moral law) are systematically transcendence-tending. The pattern is too consistent to be coincidence." },
        { label: "Artifact of selective reading (Billeter)", thinkers: ["billeter"], concepts: [], claim: "The Chinese tradition contains transcendence-claims (Mohist Heaven, certain Buddhist schools, neo-Confucian heaven-pattern); the Western tradition contains immanence-claims (Stoicism, Spinoza, Deleuze). Each tradition is plural enough that the supposed contrast can be made to disappear by counter-selection." },
        { label: "Local rather than civilizational (Schwartz, Anne Cheng)", thinkers: ["schwartz", "anne-cheng"], concepts: ["axial-age"], claim: "The contrast is real for specific authors and periods but not as a master civilizational difference. The axial-age framework allows comparability without the over-reach of programmatic East–West contrast." }
      ]
    },
    {
      id: "graded-vs-impartial-love",
      name: "Graded love vs. impartial care (Mencius vs. Mozi)",
      summary: "Should moral concern be calibrated to relation — family first, then outward — or extended impartially to all? The classical tradition's founding dispute about the scope of ethics.",
      stake: "Whether the relational ethics that became the Chinese mainstream was an argument or a victory. If Mencius answered Mozi, graded concern is a considered position; if the Confucians merely outlasted the Mohists, the impartialist premise the West is now thought to import has a native lineage that was suppressed, not refuted. The modern EA debate over impartiality replays the same dispute with a calculus added.",
      positions: [
        { label: "Impartial care (Mozi)", thinkers: ["mozi"], concepts: ["jian-ai", "li-benefit"], claim: "Partial concern is the cause of aggression between families and states. Regard others' parents as your own and the disorder stops. The standard is benefit to all under heaven, and graded love fails it." },
        { label: "Graded love (Mencius)", thinkers: ["mencius"], concepts: ["ren", "xing"], claim: "Impartial care denies the father: it asks for a concern that no human nature produces and would dissolve the relations in which humaneness is actually cultivated. Ren extends outward from the near by degrees; that extension is the moral life, not a bias in it." },
        { label: "Ritual as the mediation (Xunzi)", thinkers: ["xunzi"], concepts: ["li_ritual", "wei-artifice"], claim: "Neither nature nor impartial principle settles the scope of concern; ritual does, as a constructed order that allocates regard by role. The question is one of design, not of endowment or of calculation." }
      ]
    },
    {
      id: "xing-debate",
      name: "Is human nature good? (Mencius vs. Xunzi)",
      summary: "Does human xing tend spontaneously toward goodness, needing only cultivation to grow, or toward disorder, needing artifice to correct it?",
      stake: "The dispute fixes what cultivation is for: releasing an endowment or constructing a second nature. It determines whether ritual is expressive or corrective, whether the sage is gardener or artificer — and it is the classical form of the question every project that wants to build a good agent has to answer: is the good already in the material, to be extrapolated, or must it be put there?",
      positions: [
        { label: "Nature is good (Mencius)", thinkers: ["mencius", "mou-zongsan", "tu-weiming"], concepts: ["xing", "xin", "ren"], claim: "The four sprouts — compassion, shame, deference, the sense of right — are native to the heart-mind and mature into the virtues unless stunted. Anyone who sees a child about to fall into a well feels alarm before any calculation. Cultivation is the removal of what stunts." },
        { label: "Nature is bad; goodness is artifice (Xunzi)", thinkers: ["xunzi"], concepts: ["wei-artifice", "li_ritual"], claim: "Left to itself, xing is desire and it produces strife. Whatever is good in people was made — by the sages who invented ritual and by each learner's deliberate effort. To call the good natural is to mistake the finished vessel for the clay." },
        { label: "The dispute is about 'nature', not about people (later readings)", thinkers: ["anne-cheng"], concepts: ["xing"], claim: "Mencius describes the endowment's direction; Xunzi its raw state. Read carefully the two are less contradictory than the tradition made them, and the Song canonization of Mencius was a choice about orthodoxy rather than a verdict on the argument." }
      ]
    }
  ],

  // ─────────────────────────── EDGES ───────────────────────────
  // kind: "cc" (concept↔concept), "tc" (thinker↔concept), "tt" (thinker↔thinker)
  edges: [
    // Concept ↔ Concept (cross-tradition écart)
    { source: "shi", target: "telos", kind: "cc", type: "ecart", note: "propensity vs. final cause" },
    { source: "shi", target: "plan", kind: "cc", type: "ecart", note: "read-and-ride vs. model-and-execute" },
    { source: "shi", target: "eidos", kind: "cc", type: "ecart", note: "disposition vs. form" },
    { source: "hua", target: "event", kind: "cc", type: "ecart", note: "silent transformation vs. event" },
    { source: "wuwei", target: "praxis", kind: "cc", type: "ecart", note: "non-action vs. decisive action" },
    { source: "wuwei", target: "will", kind: "cc", type: "ecart", note: "going with the grain vs. imposing" },
    { source: "yin", target: "will", kind: "cc", type: "ecart", note: "leaning on vs. imposing" },
    { source: "ziran", target: "will", kind: "cc", type: "ecart", note: "self-so vs. imposed" },
    { source: "zhong", target: "subject", kind: "cc", type: "ecart", note: "available without position vs. substantial self" },
    { source: "xu", target: "subject", kind: "cc", type: "ecart", note: "empty availability vs. full character" },
    { source: "li_coherence", target: "eidos", kind: "cc", type: "ecart", note: "immanent grain vs. imposed form" },
    { source: "li_coherence", target: "moral_law", kind: "cc", type: "ecart", note: "internal coherence vs. external law" },
    { source: "ren", target: "moral_law", kind: "cc", type: "ecart", note: "relational virtuosity vs. universal rule" },
    { source: "ren", target: "rights", kind: "cc", type: "ecart", note: "relational ethics vs. individual entitlement" },
    { source: "li_ritual", target: "moral_law", kind: "cc", type: "ecart", note: "constitutive ritual vs. binding law" },
    { source: "ji", target: "kairos", kind: "cc", type: "ecart", note: "incipience vs. decisive moment" },
    { source: "shi_time", target: "chronos", kind: "cc", type: "ecart", note: "seasonality vs. continuous time" },
    { source: "tong", target: "truth", kind: "cc", type: "ecart", note: "through-passage vs. correspondence" },
    { source: "dan", target: "sublime", kind: "cc", type: "ecart", note: "blandness vs. sublime" },
    { source: "dao", target: "being", kind: "cc", type: "ecart", note: "way vs. what-is" },
    { source: "dao", target: "method", kind: "cc", type: "ecart", note: "self-regulating way vs. designed route" },
    { source: "tianxia", target: "universal", kind: "cc", type: "ecart", note: "graded relational world vs. abstract universal" },
    { source: "he", target: "universal", kind: "cc", type: "ecart", note: "cultivated harmony vs. asserted universality" },
    { source: "qi", target: "being", kind: "cc", type: "ecart", note: "configuring force vs. substantial what-is" },
    { source: "tian", target: "being", kind: "cc", type: "ecart", note: "moral-political cosmos vs. ontological hinge" },
    { source: "basho", target: "subject", kind: "cc", type: "ecart", note: "encompassing place vs. central self" },
    { source: "aidagara", target: "subject", kind: "cc", type: "ecart", note: "constitutive betweenness vs. substantial individual" },
    { source: "aidagara", target: "moral_law", kind: "cc", type: "ecart", note: "ethics from relation vs. ethics from rule" },
    { source: "mu", target: "being", kind: "cc", type: "ecart", note: "absolute nothingness vs. presence-as-such" },
    { source: "ars-contextualis", target: "moral_law", kind: "cc", type: "ecart", note: "art of context vs. application of rule" },
    { source: "role-ethics", target: "rights", kind: "cc", type: "ecart", note: "constitutive roles vs. prior individuals" },
    { source: "intellectual-intuition", target: "moral_law", kind: "cc", type: "ecart", note: "Mou's recovery vs. Kant's critical limit" },
    { source: "common", target: "universal", kind: "cc", type: "ecart", note: "cultivable shared vs. asserted universal" },
    { source: "organic-naturalism", target: "being", kind: "cc", type: "ecart", note: "configurational process vs. substantial reality" },

    // Concept-concept parallels (resonance, lineage)
    { source: "ren", target: "phronesis", kind: "cc", type: "parallel", note: "relational practical wisdom" },
    { source: "junzi", target: "virtue", kind: "cc", type: "parallel", note: "exemplary person and aretē" },
    { source: "phronesis", target: "moral_law", kind: "cc", type: "parallel", note: "practical wisdom vs. rule-based duty within Western ethics" },
    { source: "aidagara", target: "ecart_meta", kind: "cc", type: "parallel", note: "Watsuji and Jullien on the between, half a century apart" },
    { source: "he", target: "common", kind: "cc", type: "parallel", note: "harmony and the cultivable common as paired framings" },
    { source: "tianxia", target: "common", kind: "cc", type: "parallel", note: "tianxia and le commun as alternative non-universalist orderings" },

    // Internal Chinese pairs
    { source: "shi", target: "yin", kind: "cc", type: "pair", note: "shi is read; yin is the action that follows" },
    { source: "shi", target: "wuwei", kind: "cc", type: "pair", note: "wuwei is what shi-following looks like in action" },
    { source: "wuwei", target: "ziran", kind: "cc", type: "pair", note: "non-action and so-of-itself" },
    { source: "hua", target: "bian", kind: "cc", type: "pair", note: "silent accumulation and alternating texture" },
    { source: "zhong", target: "xu", kind: "cc", type: "pair", note: "non-fixation and emptiness" },
    { source: "ji", target: "shi_time", kind: "cc", type: "pair", note: "the inflection-moment within seasonal time" },
    { source: "ren", target: "li_ritual", kind: "cc", type: "pair", note: "Confucian inner virtue and constitutive ritual" },
    { source: "ren", target: "junzi", kind: "cc", type: "pair", note: "humaneness and the exemplary person" },
    { source: "li_coherence", target: "qi", kind: "cc", type: "pair", note: "Neo-Confucian pairing: pattern and configuring force" },
    { source: "tong", target: "dao", kind: "cc", type: "pair", note: "what the way passes through" },
    { source: "tian", target: "tianxia", kind: "cc", type: "pair", note: "heaven and all-under-heaven" },
    { source: "xin", target: "xing", kind: "cc", type: "pair", note: "Mencian heart-mind and human nature" },

    // Internal Western kinships
    { source: "eidos", target: "telos", kind: "cc", type: "kinship", note: "Plato's form and Aristotle's end" },
    { source: "being", target: "truth", kind: "cc", type: "kinship", note: "Parmenidean welding" },
    { source: "subject", target: "will", kind: "cc", type: "kinship", note: "modern subject as bearer of will" },
    { source: "universal", target: "moral_law", kind: "cc", type: "kinship", note: "Kantian universality" },
    { source: "moral_law", target: "rights", kind: "cc", type: "kinship", note: "rights derived from moral law" },
    { source: "plan", target: "telos", kind: "cc", type: "kinship", note: "plan as articulated path to telos" },
    { source: "praxis", target: "event", kind: "cc", type: "kinship", note: "decisive action as event-shaped" },
    { source: "phronesis", target: "virtue", kind: "cc", type: "kinship", note: "practical wisdom and virtue ethics" },
    { source: "kairos", target: "chronos", kind: "cc", type: "kinship", note: "Greek time-pair" },
    { source: "method", target: "plan", kind: "cc", type: "kinship", note: "way-toward-goal" },

    // Internal Kyoto School pairs
    { source: "basho", target: "mu", kind: "cc", type: "pair", note: "Nishida: place culminates in absolute nothingness" },
    { source: "basho", target: "aidagara", kind: "cc", type: "pair", note: "Kyoto School: place and betweenness" },

    // Comparative meta
    { source: "ecart_meta", target: "common", kind: "cc", type: "lineage", note: "Jullien: écart cultivated yields the common" },
    { source: "ecart_meta", target: "decoincidence", kind: "cc", type: "lineage", note: "internal écart with one's own positions" },
    { source: "ars-contextualis", target: "role-ethics", kind: "cc", type: "lineage", note: "Hall–Ames: art of context develops into role ethics" },
    { source: "axial-age", target: "ecart_meta", kind: "cc", type: "parallel", note: "comparable breakthroughs across cultures vs. productive gap between them" },

    // Thinker → Concept
    { source: "confucius", target: "ren", kind: "tc", type: "central" },
    { source: "confucius", target: "li_ritual", kind: "tc", type: "central" },
    { source: "confucius", target: "junzi", kind: "tc", type: "central" },
    { source: "confucius", target: "he", kind: "tc", type: "advanced" },
    { source: "confucius", target: "dao", kind: "tc", type: "advanced" },
    { source: "mencius", target: "xing", kind: "tc", type: "central" },
    { source: "mencius", target: "xin", kind: "tc", type: "central" },
    { source: "mencius", target: "ren", kind: "tc", type: "advanced" },
    { source: "laozi", target: "dao", kind: "tc", type: "central" },
    { source: "laozi", target: "wuwei", kind: "tc", type: "central" },
    { source: "laozi", target: "ziran", kind: "tc", type: "central" },
    { source: "laozi", target: "xu", kind: "tc", type: "central" },
    { source: "zhuangzi", target: "dao", kind: "tc", type: "advanced" },
    { source: "zhuangzi", target: "wuwei", kind: "tc", type: "advanced" },
    { source: "zhuangzi", target: "xu", kind: "tc", type: "central" },
    { source: "zhuangzi", target: "ziran", kind: "tc", type: "advanced" },
    { source: "plato", target: "eidos", kind: "tc", type: "coined" },
    { source: "plato", target: "being", kind: "tc", type: "central" },
    { source: "plato", target: "method", kind: "tc", type: "central" },
    { source: "plato", target: "truth", kind: "tc", type: "central" },
    { source: "aristotle", target: "telos", kind: "tc", type: "coined" },
    { source: "aristotle", target: "eidos", kind: "tc", type: "advanced" },
    { source: "aristotle", target: "praxis", kind: "tc", type: "central" },
    { source: "aristotle", target: "phronesis", kind: "tc", type: "coined" },
    { source: "aristotle", target: "virtue", kind: "tc", type: "central" },
    { source: "aristotle", target: "kairos", kind: "tc", type: "advanced" },
    { source: "aristotle", target: "chronos", kind: "tc", type: "advanced" },
    { source: "kant", target: "moral_law", kind: "tc", type: "coined" },
    { source: "kant", target: "universal", kind: "tc", type: "central" },
    { source: "kant", target: "subject", kind: "tc", type: "central" },
    { source: "kant", target: "sublime", kind: "tc", type: "central" },
    { source: "kant", target: "rights", kind: "tc", type: "advanced" },
    { source: "heidegger", target: "being", kind: "tc", type: "central" },
    { source: "heidegger", target: "event", kind: "tc", type: "central" },
    { source: "nishida", target: "basho", kind: "tc", type: "coined" },
    { source: "nishida", target: "mu", kind: "tc", type: "central" },
    { source: "nishida", target: "subject", kind: "tc", type: "critiqued" },
    { source: "watsuji", target: "aidagara", kind: "tc", type: "coined" },
    { source: "watsuji", target: "ren", kind: "tc", type: "advanced" },
    { source: "watsuji", target: "li_ritual", kind: "tc", type: "advanced" },
    { source: "mou-zongsan", target: "intellectual-intuition", kind: "tc", type: "coined" },
    { source: "mou-zongsan", target: "ren", kind: "tc", type: "advanced" },
    { source: "mou-zongsan", target: "xin", kind: "tc", type: "central" },
    { source: "mou-zongsan", target: "xing", kind: "tc", type: "central" },
    { source: "li-zehou", target: "he", kind: "tc", type: "advanced" },
    { source: "li-zehou", target: "ren", kind: "tc", type: "advanced" },
    { source: "tu-weiming", target: "ren", kind: "tc", type: "central" },
    { source: "tu-weiming", target: "junzi", kind: "tc", type: "central" },
    { source: "tu-weiming", target: "xin", kind: "tc", type: "advanced" },
    { source: "zhao-tingyang", target: "tianxia", kind: "tc", type: "central" },
    { source: "granet", target: "bian", kind: "tc", type: "central" },
    { source: "granet", target: "shi_time", kind: "tc", type: "central" },
    { source: "needham", target: "organic-naturalism", kind: "tc", type: "coined" },
    { source: "needham", target: "qi", kind: "tc", type: "central" },
    { source: "needham", target: "li_coherence", kind: "tc", type: "advanced" },
    { source: "graham", target: "dao", kind: "tc", type: "advanced" },
    { source: "graham", target: "wuwei", kind: "tc", type: "advanced" },
    { source: "schwartz", target: "axial-age", kind: "tc", type: "central" },
    { source: "anne-cheng", target: "ren", kind: "tc", type: "advanced" },
    { source: "anne-cheng", target: "li_ritual", kind: "tc", type: "advanced" },
    { source: "jullien", target: "ecart_meta", kind: "tc", type: "coined" },
    { source: "jullien", target: "common", kind: "tc", type: "coined" },
    { source: "jullien", target: "decoincidence", kind: "tc", type: "coined" },
    { source: "jullien", target: "shi", kind: "tc", type: "advanced" },
    { source: "jullien", target: "hua", kind: "tc", type: "advanced" },
    { source: "jullien", target: "wuwei", kind: "tc", type: "advanced" },
    { source: "jullien", target: "dan", kind: "tc", type: "advanced" },
    { source: "billeter", target: "dao", kind: "tc", type: "critiqued" },
    { source: "billeter", target: "wuwei", kind: "tc", type: "advanced" },
    { source: "billeter", target: "ecart_meta", kind: "tc", type: "critiqued" },
    { source: "hall-ames", target: "ars-contextualis", kind: "tc", type: "coined" },
    { source: "hall-ames", target: "role-ethics", kind: "tc", type: "coined" },
    { source: "hall-ames", target: "ren", kind: "tc", type: "advanced" },
    { source: "hall-ames", target: "li_ritual", kind: "tc", type: "advanced" },
    { source: "hall-ames", target: "phronesis", kind: "tc", type: "advanced" },
    { source: "slingerland", target: "wuwei", kind: "tc", type: "advanced" },
    { source: "slingerland", target: "ziran", kind: "tc", type: "advanced" },
    { source: "chenyang-li", target: "he", kind: "tc", type: "central" },
    { source: "chenyang-li", target: "ren", kind: "tc", type: "advanced" },

    // Thinker ↔ Thinker
    { source: "confucius", target: "mencius", kind: "tt", type: "influence" },
    { source: "laozi", target: "zhuangzi", kind: "tt", type: "influence" },
    { source: "plato", target: "aristotle", kind: "tt", type: "influence" },
    { source: "kant", target: "mou-zongsan", kind: "tt", type: "critique", note: "Mou critiques Kant's denial of intellectual intuition" },
    { source: "heidegger", target: "watsuji", kind: "tt", type: "influence" },
    { source: "heidegger", target: "nishida", kind: "tt", type: "influence" },
    { source: "kant", target: "li-zehou", kind: "tt", type: "influence" },
    { source: "confucius", target: "tu-weiming", kind: "tt", type: "influence" },
    { source: "confucius", target: "hall-ames", kind: "tt", type: "influence" },
    { source: "mencius", target: "mou-zongsan", kind: "tt", type: "influence" },
    { source: "granet", target: "jullien", kind: "tt", type: "influence" },
    { source: "needham", target: "graham", kind: "tt", type: "influence" },
    { source: "graham", target: "slingerland", kind: "tt", type: "influence" },
    { source: "graham", target: "hall-ames", kind: "tt", type: "influence" },
    { source: "billeter", target: "jullien", kind: "tt", type: "critique", note: "Contre François Jullien (2006)" },
    { source: "tu-weiming", target: "hall-ames", kind: "tt", type: "dispute", note: "spiritual humanism vs. role ethics within contemporary Confucianism" },
    { source: "zhuangzi", target: "billeter", kind: "tt", type: "influence", note: "Billeter's Leçons sur Tchouang-tseu is a major work" },
    { source: "zhuangzi", target: "graham", kind: "tt", type: "influence", note: "Graham's translation a benchmark" },
    { source: "zhuangzi", target: "slingerland", kind: "tt", type: "influence" },

    // ── Thinker → concept edges for new thinkers and concepts ──
    { source: "sun-zi", target: "jisuan", kind: "tc", type: "central" },
    { source: "sun-zi", target: "shi", kind: "tc", type: "central" },
    { source: "sun-zi", target: "wuwei", kind: "tc", type: "advanced" },
    { source: "han-fei", target: "fa", kind: "tc", type: "central" },
    { source: "han-fei", target: "shi", kind: "tc", type: "advanced" },
    { source: "nagarjuna", target: "zhongguan", kind: "tc", type: "central" },
    { source: "nagarjuna", target: "erdi", kind: "tc", type: "central" },
    { source: "nagarjuna", target: "yuanqi", kind: "tc", type: "central" },
    { source: "confucius", target: "zhi-wisdom", kind: "tc", type: "central" },
    { source: "mencius", target: "zhi-wisdom", kind: "tc", type: "advanced" },
    { source: "confucius", target: "xin-trust", kind: "tc", type: "central" },
    { source: "zhao-tingyang", target: "gongtong-fuyu", kind: "tc", type: "advanced" },

    // ── Within-atlas concept-concept edges for new concepts ──
    { source: "jisuan", target: "shi", kind: "cc", type: "pair", note: "calculation precedes the reading of propensity in Sun Zi" },
    { source: "fa", target: "moral_law", kind: "cc", type: "kinship", note: "both impersonal universal standards (different traditions, different politics)" },
    { source: "fa", target: "rights", kind: "cc", type: "ecart", note: "Legalist impersonal standard and liberal individual entitlement — both anti-personal in opposite directions" },
    { source: "fa", target: "ren", kind: "cc", type: "ecart", note: "Han Feizi against the Confucians: standards over virtue" },
    { source: "fa", target: "li_ritual", kind: "cc", type: "ecart", note: "Legalism explicitly displaces ritual with law" },
    { source: "erdi", target: "zhongguan", kind: "cc", type: "pair", note: "two truths and middle way as paired Madhyamaka doctrines" },
    { source: "yuanqi", target: "zhongguan", kind: "cc", type: "pair", note: "dependent origination and middle way mutually constitutive" },
    { source: "yuanqi", target: "li_coherence", kind: "cc", type: "parallel", note: "both name immanent configurational arising rather than substance" },
    { source: "zhi-wisdom", target: "ren", kind: "cc", type: "pair", note: "Confucian virtues, mutually constitutive" },
    { source: "zhi-wisdom", target: "phronesis", kind: "cc", type: "parallel", note: "practical wisdom across traditions" },
    { source: "xin-trust", target: "ren", kind: "cc", type: "pair", note: "fifth virtue paired with the master-virtue" },
    { source: "guanxi", target: "ren", kind: "cc", type: "lineage", note: "modern social practice with classical relational roots" },
    { source: "guanxi", target: "li_ritual", kind: "cc", type: "lineage", note: "the relational substrate ritual is meant to organize" },
    { source: "mianzi", target: "li_ritual", kind: "cc", type: "lineage", note: "the constitutive performance of social standing" },
    { source: "gongtong-fuyu", target: "tianxia", kind: "cc", type: "lineage", note: "modern policy-rhetoric drawing on classical world-order vocabulary" },
    { source: "gongtong-fuyu", target: "he", kind: "cc", type: "parallel", note: "harmony as substantive distributive achievement" },
    { source: "zhineng", target: "zhi-wisdom", kind: "cc", type: "lineage", note: "modern AI term carrying the classical wisdom-virtue inside its compound" },

    // ── Thinker ↔ thinker for new thinkers ──
    { source: "sun-zi", target: "han-fei", kind: "tt", type: "influence", note: "Han Feizi adopts and adapts the Sunzi shi-and-jisuan apparatus" },
    { source: "confucius", target: "han-fei", kind: "tt", type: "critique", note: "Han Feizi argues Confucian virtue-reliance is impractical for governance" },
    { source: "nagarjuna", target: "nishida", kind: "tt", type: "influence", note: "Madhyamaka emptiness as a deep source for Kyoto School absolute nothingness" },

    // ── Mohist and Xunzi additions ──
    { source: "mozi", target: "jian-ai", kind: "tc", type: "coined" },
    { source: "mozi", target: "li-benefit", kind: "tc", type: "central" },
    { source: "mozi", target: "fa", kind: "tc", type: "advanced", note: "Mohist 法 (standards, models) precedes and feeds the Legalist use" },
    { source: "mencius", target: "jian-ai", kind: "tc", type: "critiqued" },
    { source: "mencius", target: "li-benefit", kind: "tc", type: "critiqued" },
    { source: "xunzi", target: "wei-artifice", kind: "tc", type: "coined" },
    { source: "xunzi", target: "xing", kind: "tc", type: "critiqued" },
    { source: "xunzi", target: "li_ritual", kind: "tc", type: "central" },
    { source: "jian-ai", target: "ren", kind: "cc", type: "ecart", note: "impartial care vs. graded humaneness — the classical tradition's own scope dispute" },
    { source: "jian-ai", target: "li_ritual", kind: "cc", type: "ecart", note: "Mohists attack ritual expense; ritual allocates concern by role" },
    { source: "li-benefit", target: "ren", kind: "cc", type: "ecart", note: "benefit as public criterion vs. humaneness as cultivated motive" },
    { source: "jian-ai", target: "li-benefit", kind: "cc", type: "pair", note: "Mohist principle and Mohist criterion" },
    { source: "wei-artifice", target: "xing", kind: "cc", type: "ecart", note: "Xunzi: what is made vs. what is given" },
    { source: "wei-artifice", target: "li_ritual", kind: "cc", type: "pair", note: "ritual is the paradigm of artifice" },
    { source: "wei-artifice", target: "ziran", kind: "cc", type: "ecart", note: "artifice vs. so-of-itself" },
    { source: "wei-artifice", target: "fa", kind: "cc", type: "lineage", note: "Xunzi's constructed ritual becomes Han Feizi's constructed law" },
    { source: "confucius", target: "mozi", kind: "tt", type: "critique", note: "Mozi attacks Confucian graded love, ritual expense, and fatalism" },
    { source: "mozi", target: "mencius", kind: "tt", type: "critique", note: "Mencius: impartial care 'denies the father'" },
    { source: "mencius", target: "xunzi", kind: "tt", type: "critique", note: "Xunzi rejects the goodness of human nature" },
    { source: "confucius", target: "xunzi", kind: "tt", type: "influence" },
    { source: "xunzi", target: "han-fei", kind: "tt", type: "influence", note: "Han Feizi studied under Xunzi" }
  ]
};

// Alias for the shared graph engine
window.GRAPH_DATA = window.ATLAS_DATA;
