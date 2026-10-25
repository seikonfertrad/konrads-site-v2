/* The learning path for konrads.link/learn, curated from Fractal Bootcamp's curriculum
   (github.com/fractal-nyc/bootcamp-monorepo, folder curriculum/) for one person working alone,
   at their own pace.

   The bootcamp ran several cohorts and kept each one's material side by side, so week folders
   repeat numbers (04-drills and 04-ambition) and some weeks have fa2025 and sp2026 versions. This
   path follows the Spring 2026 cohort where it exists, with older material as optional extras.

   Paths are relative to the repo root. `check` says which list items become checkboxes:
     steps     top-level list items under step-like headings (Steps, Steel Thread, Go Deeper, …)
     links     every list item with a link (reading lists)
     sections  none; you tick off each section heading instead (long tutorials)
   Every lesson also gets a "done" toggle on each section heading. `hours` is a rough estimate
   for a solo learner, used to suggest what fits the time you have. */

export const SOURCE = {
  repo: "fractal-nyc/bootcamp-monorepo",
  /* Pinned so the encrypted bundle, checkbox ids and your progress stay stable. Bump it on
     purpose to pull in curriculum updates. */
  commit: "41558ff3c498431695de0e5d45c59b17b15a7371"
};

const W = "curriculum/weeks/";

export const UNITS = [
  {
    id: "start",
    title: "Start here",
    summary: "How this works, what the bootcamp expected of its students, and the AI tooling it assumes.",
    solo:
      "The bootcamp ran 10am–6pm, six days a week, with a cohort around you. Alone and part-time, the same material takes longer, and that's fine. Keep two of its habits: write an end-of-day note every time you work (the Journal tab is for that), and don't stay stuck for more than 30 minutes; ask Claude, search, or skip ahead and come back.",
    lessons: [
      { id: "how-to", title: "How to use this app", app: "how-to", hours: 0.25 },
      { id: "expectations", title: "Expectations", file: "curriculum/expectations.md", check: "steps-all", hours: 0.25 },
      { id: "ai-readings", title: "AI readings: the Claude Code phase shift", file: W + "01-intro/ai-readings.md", check: "links", hours: 2 },
      { id: "harnesses", title: "Understanding harnesses (Claude Code context)", file: W + "01-intro/UNDERSTANDING_HARNESSES.md", check: "sections", hours: 1.5 }
    ]
  },
  {
    id: "w1",
    title: "Week 1: Tic-tac-toe",
    summary: "Git, TypeScript, React and the reactive model, client/server, multiple games, WebSockets and deployment, all through one small game.",
    solo:
      "Every assignment forks a starter repo from github.com/fractal-bootcamp. Do the forks under your own GitHub account. Where an assignment says to ask a teacher, ask Claude, but follow the bootcamp rule: Claude explains, you write the code.",
    lessons: [
      { id: "w1-objectives", title: "The four fundamentals", file: W + "01-intro/learning-objectives.md", check: "sections", hours: 0.25 },
      { id: "w1-readings", title: "Week 1 readings", file: W + "01-intro/readings.md", check: "links", hours: 3 },
      { id: "w1-simple-game", title: "1 · Simple game (git, TypeScript, React)", file: W + "01-intro/assignments/1-simple-game.md", check: "steps", hours: 6 },
      { id: "w1-styling", title: "2 · Styling and server/client", file: W + "01-intro/assignments/2-styling-server-client.md", check: "steps", hours: 5 },
      { id: "w1-multi-game", title: "3 · Tic-tac-toe on a server", file: W + "01-intro/assignments/3-multi-game.md", check: "steps", hours: 5 },
      { id: "w1-realtime", title: "4 · Real-time game and deployment", file: W + "01-intro/assignments/4-realtime.md", check: "steps", hours: 5 },
      { id: "w1-demo", title: "5 · Demo", file: W + "01-intro/assignments/5-demo.md", check: "steps", hours: 1 },
      {
        id: "w1-lectures",
        title: "Lecture notes",
        files: [
          [W + "01-intro/lectures/1.md", "Lecture 1: The game, git and TypeScript"],
          [W + "01-intro/lectures/2.md", "Lecture 2"],
          [W + "01-intro/lectures/3.md", "Lecture 3"],
          [W + "01-intro/lectures/4.md", "Lecture 4"],
          [W + "01-intro/lectures/5-deployment.md", "Lecture 5: Deployment"],
          [W + "01-intro/lectures/6-writing.md", "Lecture 6: Writing"]
        ],
        check: "sections",
        hours: 0.5,
        optional: true
      }
    ]
  },
  {
    id: "w2",
    title: "Week 2: Full-stack AI chatbot",
    summary: "Call the Claude API, build a chat UI with shadcn, persist conversations (memory → SQLite → Postgres), then add routing and auth.",
    solo: "You'll need an Anthropic API key. Put a small spend limit on it in the Anthropic console before you start.",
    lessons: [
      { id: "w2-readings", title: "Week 2 readings", file: W + "02-chatbot/readings.md", check: "links", hours: 3 },
      { id: "w2-apis", title: "Lecture: APIs", file: W + "02-chatbot/lectures/1-Tuesday-APIs.md", check: "sections", hours: 0.25 },
      { id: "w2-chat", title: "1 · Chatbot: API, shell and shadcn", file: W + "02-chatbot/assignments/sp2026/1-api-shell-shadcn.md", check: "steps", hours: 6 },
      { id: "w2-db-lecture", title: "Lecture: Data persistence", file: W + "02-chatbot/lectures/2-Wednesday-Databases.md", check: "sections", hours: 0.5 },
      { id: "w2-databases", title: "2 · Data persistence", file: W + "02-chatbot/assignments/sp2026/2-databases.md", check: "steps", hours: 6 },
      { id: "w2-routing-auth", title: "3 · Routing and auth", file: W + "02-chatbot/assignments/sp2026/3-routing-auth.md", check: "steps", hours: 6 },
      { id: "w2-tools-mcp", title: "Primer: tool calling vs MCP", file: W + "02-chatbot/assignments/sp2026/tool-calling-vs-mcp-primer.md", check: "sections", hours: 0.75 },
      { id: "w2-tools", title: "4 · Tools (readings)", file: W + "02-chatbot/assignments/4-tools.md", check: "links", hours: 1, optional: true },
      { id: "w2-help-persistence", title: "Help: how Vercel persists messages", file: W + "02-chatbot/assignments/help/1-persistence.md", check: "sections", hours: 0.5, optional: true },
      { id: "w2-help-auth", title: "Help: authentication and authorization guide", file: W + "02-chatbot/assignments/help/3-auth-help.md", check: "sections", hours: 2, optional: true },
      { id: "w2-fa-auth", title: "Fall 2025 version: auth", file: W + "02-chatbot/assignments/1-auth.md", check: "steps", hours: 5, optional: true },
      { id: "w2-fa-chat", title: "Fall 2025 version: a single chat", file: W + "02-chatbot/assignments/2-chat.md", check: "steps", hours: 5, optional: true },
      { id: "w2-fa-persistence", title: "Fall 2025 version: persistence and multiple chats", file: W + "02-chatbot/assignments/3-persistence.md", check: "steps", hours: 5, optional: true }
    ]
  },
  {
    id: "w3",
    title: "Week 3: Build a game with AI, as a team",
    summary: "Write a PRD, design the architecture, and build a game with Claude through steel threads.",
    solo:
      "This was a group week. Alone, play both roles: write the PRD as the manager, then work the tickets as the individual contributor, with Claude agents as your team. The rough plan has the most detail on the game-building prompts.",
    lessons: [
      { id: "w3-plan", title: "The plan: use Claude to build a game", file: W + "03-group-project/sp2026/rough-plan.md", check: "sections", hours: 0.5 },
      { id: "w3-prd", title: "1 · PRD and system architecture", file: W + "03-group-project/sp2026/2-Tuesday-PRD-manager-pattern.md", check: "steps", hours: 6 },
      { id: "w3-ic", title: "2 · Individual contributor guide", file: W + "03-group-project/sp2026/3-Wednesday-Individual-Contributor-guide.md", check: "steps", hours: 12 },
      { id: "w3-fa", title: "Fall 2025 version: group project", file: W + "03-group-project/fa2025/assignment.md", check: "steps", hours: 1, optional: true }
    ]
  },
  {
    id: "w4",
    title: "Week 4: Raise your ambitions",
    summary: "Pitch and build something bigger than you think you can, and learn cloud primitives and containerised deployment.",
    lessons: [
      { id: "w4-challenge", title: "The raise-your-ambitions challenge", file: W + "04-ambition/week-4-raise-your-ambitions-challenge.md", check: "steps", hours: 20 },
      { id: "w4-cloud", title: "Cloud computing and containerised deployment", file: W + "04-ambition/2-Tuesday-cloud-deployment.md", check: "sections", hours: 6 },
      { id: "w4-drills", title: "Fall 2025: drills", file: W + "04-drills/fa2025/drills-assignment.md", check: "steps", hours: 6, optional: true }
    ]
  },
  {
    id: "w5",
    title: "Week 5: The last 10%",
    summary: "Comfort, polish and the art of finishing, with Claude skills for networking, observability and testing.",
    lessons: [
      { id: "w5-finishing", title: "The last 10%: finishing", file: W + "05-finishing/assignment.md", check: "steps", hours: 20 },
      { id: "w5-networking", title: "Skill: networking", file: W + "05-finishing/skills/networking/SKILL.md", check: "sections", hours: 2 },
      { id: "w5-observability", title: "Skill: observability", file: W + "05-finishing/skills/observability/SKILL.md", check: "sections", hours: 2 },
      { id: "w5-qa", title: "Skill: QA harness", file: W + "05-finishing/skills/qa-harness/SKILL.md", check: "sections", hours: 2 },
      { id: "w5-advanced-ai", title: "Older version: advanced AI project", file: W + "05-advanced-ai/5-advanced-ai.md", check: "steps", hours: 1, optional: true }
    ]
  },
  {
    id: "w6",
    title: "Week 6: Models, training and evals",
    summary: "Run small and local models, fine-tune one, train a tiny language model from scratch, and measure models with evals.",
    solo:
      "Each day is a long, self-contained tutorial with a steel thread in the morning and exploration in the afternoon. Tick off sections as you go; it's fine to spread one day over several sittings.",
    lessons: [
      { id: "w6-plan", title: "Week plan", file: W + "06-models-and-evals/sp2026/week-plan.md", check: "sections", hours: 0.5 },
      { id: "w6-local", title: "Day 1 · Non-frontier and local models", file: W + "06-models-and-evals/sp2026/day1.md", check: "sections", hours: 7 },
      { id: "w6-finetune", title: "Day 2 · Fine-tuning a small model", file: W + "06-models-and-evals/sp2026/day2.md", check: "sections", hours: 7 },
      { id: "w6-scratch", title: "Day 3 · Training a language model from scratch", file: W + "06-models-and-evals/sp2026/day3.md", check: "sections", hours: 7 },
      { id: "w6-evals", title: "Day 4 · Evals", file: W + "06-models-and-evals/sp2026/day4.md", check: "sections", hours: 7 },
      { id: "w6-prediction-bot", title: "Older project: prediction market trading bot", file: W + "06-prediction-bot/assignment.md", check: "sections", hours: 20, optional: true }
    ]
  },
  {
    id: "w7",
    title: "Week 7: Career",
    summary: "Know yourself, market yourself, map your network, and go spearfishing for the roles you want.",
    solo: "Adapt the job-search framing to whatever you want next. The journaling and network-mapping exercises work for any career move.",
    lessons: [
      { id: "w7-plan", title: "Week plan", file: W + "07-career/sp2026/week-plan.md", check: "sections", hours: 0.5 },
      { id: "w7-d1", title: "Day 1 · Foundation", file: W + "07-career/sp2026/day-01-monday.md", check: "sections", hours: 5 },
      { id: "w7-d2", title: "Day 2 · Know thyself, market thyself", file: W + "07-career/sp2026/day-02-tuesday.md", check: "sections", hours: 5 },
      { id: "w7-13q", title: "Reading: 13 questions I ask my marketing clients", file: W + "07-career/sp2026/visakanv-marketing.md", check: "sections", hours: 1 },
      { id: "w7-d3", title: "Day 3 · Tap your network", file: W + "07-career/sp2026/day-03-wednesday.md", check: "sections", hours: 5 },
      { id: "w7-d4", title: "Day 4 · Spearfishing, part 1", file: W + "07-career/sp2026/day-04-thursday.md", check: "sections", hours: 5 },
      { id: "w7-d5", title: "Day 5 · Spearfishing, part 2", file: W + "07-career/sp2026/day-05-friday.md", check: "sections", hours: 5 },
      { id: "w7-d6", title: "Day 6 · Career report and peer review", file: W + "07-career/sp2026/day-06-saturday.md", check: "sections", hours: 4 },
      { id: "w7-specialization", title: "Career specialization letter", file: W + "07-career/career-specialization-letter.md", check: "sections", hours: 0.5, optional: true },
      { id: "w7-job-search", title: "Job search plan", file: W + "07-career/assignments/01-job-search-plan.md", check: "sections", hours: 2, optional: true },
      { id: "w7-soft-skills", title: "Soft skills interview", file: W + "07-career/assignments/02-soft-skills.md", check: "sections", hours: 1, optional: true },
      { id: "w7-portfolio", title: "Portfolio and resume", file: W + "07-career/assignments/03-portfolio.md", check: "steps", hours: 3, optional: true },
      { id: "w7-leetcode", title: "Leetcode and technical interviews", file: W + "07-career/assignments/04-leetcode.md", check: "steps", hours: 10, optional: true },
      { id: "w7-leetcode-prep", title: "Leetcode prep questions", file: W + "07-career/assignments/leetcode-prep-questions.md", check: "sections", hours: 3, optional: true },
      { id: "w7-interview-a-thon", title: "Mock technical interviews", file: W + "07-career/assignments/06-interview-a-thon.md", check: "sections", hours: 1.5, optional: true }
    ]
  },
  {
    id: "w8",
    title: "Week 8: Systems engineering",
    summary: "Build five classic system-design problems for real, steel thread first, then load-test and scale them.",
    lessons: [
      { id: "w8-plan", title: "Week plan (concise)", file: W + "08-systems/sp2026/week-plan-concise.md", check: "sections", hours: 0.25 },
      { id: "w8-plan-full", title: "Week plan (full: deliverables, load testing)", file: W + "08-systems/sp2026/week-plan-claude-enhanced.md", check: "sections", hours: 1 },
      { id: "w8-url", title: "1 · URL shortener", file: W + "08-systems/sp2026/01-monday-url-shortener.md", check: "steps", hours: 7 },
      { id: "w8-chat", title: "2 · Chat service", file: W + "08-systems/sp2026/02-tuesday-chat-service.md", check: "steps", hours: 7 },
      { id: "w8-ticketing", title: "3 · Ticketing service", file: W + "08-systems/sp2026/03-wednesday-ticketing-service.md", check: "steps", hours: 7 },
      { id: "w8-rideshare", title: "4 · Ride-share service", file: W + "08-systems/sp2026/04-thursday-ride-share-service.md", check: "steps", hours: 7 },
      { id: "w8-social", title: "5 · Social media app", file: W + "08-systems/sp2026/05-friday-social-media-app.md", check: "steps", hours: 7 },
      { id: "w8-sd-primer", title: "System design primer", file: W + "07-career/assignments/05-system-design-primer.md", check: "links", hours: 3, optional: true },
      { id: "w8-sd-plan", title: "System design track (notes)", file: "curriculum/system-design/system-design-plan.md", check: "sections", hours: 1, optional: true },
      { id: "w8-crawler", title: "Example: a web crawler pipeline", file: "curriculum/system-design/web-crawler/web-crawler.md", check: "sections", hours: 0.5, optional: true }
    ]
  },
  {
    id: "capstone",
    title: "Capstone: Living software",
    summary: "Build software that keeps living after the bootcamp, and build in public while you do it.",
    lessons: [
      { id: "capstone", title: "Capstone: living software", file: W + "10-capstone/assignment.md", check: "steps", hours: 40 },
      { id: "graduation", title: "Graduation sprint: build your dream demo", file: W + "10-internal/10-graduation-sprint.md", check: "steps", hours: 20, optional: true }
    ]
  },
  {
    id: "scales",
    title: "Practice: Scales",
    track: "practice",
    summary: "Short, repeatable exercises, like musical scales. Do one whenever you have 20–45 minutes.",
    solo: "Go chromatically (level 1 of every scale, then level 2, …) or sequentially (one concept all the way through).",
    lessons: [
      { id: "scales-intro", title: "How to do the scales", file: "curriculum/scales/README.md", check: "sections", hours: 0.1 },
      { id: "scale-js1", title: "JavaScript 1: functions", file: "curriculum/scales/js1-functions.md", check: "sections", hours: 0.75 },
      { id: "scale-js2", title: "JavaScript 2: arrays and objects", file: "curriculum/scales/js2-arraysobjects.md", check: "sections", hours: 1.5 },
      { id: "scale-abstraction", title: "Abstraction and substitution", file: "curriculum/scales/abstraction1.md", check: "sections", hours: 1.5 },
      { id: "scale-async", title: "Async vs sync", file: "curriculum/scales/async1-syncvsasync.md", check: "sections", hours: 1.5 },
      { id: "scale-react1", title: "React 1: state", file: "curriculum/scales/react1-state.md", check: "sections", hours: 0.75 },
      { id: "scale-react2", title: "React 2: props, children, controlled components", file: "curriculum/scales/react2-props.md", check: "sections", hours: 1.5 },
      { id: "scale-express1", title: "Express 1: a simple app", file: "curriculum/scales/express1-simpleapp.md", check: "sections", hours: 0.75 },
      { id: "scale-prisma1", title: "Prisma 1: models and Postgres", file: "curriculum/scales/prisma1-models_and_postgres.md", check: "sections", hours: 1 },
      { id: "scale-auth1", title: "Auth 1: React auth", file: "curriculum/scales/auth1-reactauth.md", check: "sections", hours: 1 }
    ]
  },
  {
    id: "library",
    title: "Library",
    track: "practice",
    summary: "Every reading and essay from the bootcamp in one list, and older projects from previous cohorts.",
    lessons: [
      { id: "all-readings", title: "All readings and essays", file: "curriculum/ALL_READINGS.md", check: "links", hours: 30 },
      { id: "ai-week-readings", title: "AI week readings", file: W + "07-ai/readings.md", check: "sections", hours: 2, optional: true },
      { id: "archive-website", title: "Archive: personal website", file: W + "archive/website.md", check: "steps", hours: 6, optional: true },
      { id: "archive-survey", title: "Archive: basic survey app", file: W + "archive/survey.md", check: "steps", hours: 8, optional: true },
      { id: "archive-crud", title: "Archive: full-stack CRUD", file: W + "archive/2-crud/2-crud.md", check: "steps", hours: 8, optional: true },
      { id: "archive-crud-auth", title: "Archive: authentication", file: W + "archive/2-crud/assignments/1-auth.md", check: "steps", hours: 8, optional: true },
      { id: "archive-gallery", title: "Archive: Next.js image gallery", file: W + "archive/gallery.md", check: "sections", hours: 12, optional: true },
      { id: "archive-dream", title: "Archive: the dream app challenge", file: W + "archive/capstone-dream.md", check: "sections", hours: 20, optional: true }
    ]
  }
];
