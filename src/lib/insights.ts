import { colors } from "@/lib/theme";

/* ─── Types ─── */

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "callout"; text: string }
  | { type: "list"; items: string[] };

export interface ArticleSection {
  id: string;
  title: string;
  blocks: ArticleBlock[];
}

export interface InsightPost {
  slug: string;
  categoryId: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readingTime: string;
  color: string;
  deck: string;
  sections: ArticleSection[];
}

/* ─── Categories ─── */

export const INSIGHT_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "revenue-systems", label: "Revenue Systems & Automation" },
  { id: "ai-operations", label: "AI in Operations" },
  { id: "crm-workflow", label: "CRM & Workflow Design" },
  { id: "education-tech", label: "Education Technology & AOS" },
  { id: "build-in-public", label: "Research & Build-in-Public" },
] as const;

/* ─── Posts ─── */

export const INSIGHT_POSTS: InsightPost[] = [
  {
    slug: "why-revenue-automations-fail-at-scale",
    categoryId: "revenue-systems",
    category: "Revenue Systems & Automation",
    title: "Why Most Revenue Automations Fail at Scale",
    excerpt:
      "An analysis of why automation built around tools rather than workflows collapses as teams grow.",
    author: "Innovgeist",
    date: "April 2025",
    readingTime: "6 min read",
    color: colors.accent,
    deck: "A systems-level look at why automation breaks as businesses grow — and what to design instead.",
    sections: [
      {
        id: "context",
        title: "The Pattern",
        blocks: [
          {
            type: "paragraph",
            text: "As businesses grow, automation investments tend to multiply. Tools get added. Workflows get wired together. And at some point, a system that worked cleanly at 100 leads per month starts visibly breaking at 1,000.",
          },
          {
            type: "paragraph",
            text: "This is a predictable failure — and it's almost never about the tool. It's about how the automation was designed in the first place.",
          },
          {
            type: "callout",
            text: "Most revenue automation isn't designed. It's accumulated.",
          },
        ],
      },
      {
        id: "argument",
        title: "The Core Problem",
        blocks: [
          {
            type: "paragraph",
            text: "The most common failure pattern: automation was built around the tools available, not the workflows that actually govern how revenue moves through the business.",
          },
          {
            type: "subheading",
            text: "What tool-first automation looks like",
          },
          {
            type: "paragraph",
            text: "Someone identifies a manual task — say, sending a follow-up email after a demo. They set up an automation in their CRM or email tool. It works. Then someone else does the same for a different task. Then another. Six months later, you have forty separate automations that nobody fully understands, triggered by conditions nobody documented.",
          },
          {
            type: "paragraph",
            text: "Each automation reflects the tool's logic, not the business's reality. When something breaks — and eventually it does — there's no system map to diagnose. Just a list of zaps and sequences.",
          },
          {
            type: "subheading",
            text: "Why this collapses under scale",
          },
          {
            type: "list",
            items: [
              "Automations built in isolation create conflicting triggers as volume increases",
              "No shared logic for how leads progress means inconsistent behavior at every stage",
              "New team members inherit a system they can't reason about",
              "Edge cases multiply faster than the team can patch them",
              "CRM data degrades because automations were never designed to maintain it",
            ],
          },
          {
            type: "paragraph",
            text: "The system creates local efficiency while amplifying systemic friction. The more you automate in this pattern, the worse it gets.",
          },
        ],
      },
      {
        id: "systems",
        title: "What to Design Instead",
        blocks: [
          {
            type: "paragraph",
            text: "Good revenue automation is designed around ownership, information flow, and decision points — not API endpoints.",
          },
          {
            type: "subheading",
            text: "Start with the revenue lifecycle",
          },
          {
            type: "paragraph",
            text: "Before a single automation is built, there should be clear answers to: Who is responsible at each stage? What information is required at each handoff? What defines a lead's progression from one stage to the next? How does the system behave when an exception occurs?",
          },
          {
            type: "paragraph",
            text: "These aren't tool questions. They're system design questions. The automation comes after.",
          },
          {
            type: "subheading",
            text: "Design the exception, not just the rule",
          },
          {
            type: "paragraph",
            text: "Most automations are designed for the ideal path. The lead comes in, gets scored, gets assigned, gets followed up, converts. But real pipelines are full of exceptions — stale leads, mid-funnel re-engagements, leads that touch multiple sequences. A system designed only for the happy path breaks constantly.",
          },
          {
            type: "callout",
            text: "Automation scales what already exists. If the underlying system is fragile, automation makes it fragile at scale.",
          },
        ],
      },
      {
        id: "implications",
        title: "Practical Implications",
        blocks: [
          {
            type: "paragraph",
            text: "For teams building or rebuilding revenue automation:",
          },
          {
            type: "list",
            items: [
              "Map the actual workflow first — not the ideal one, the real one",
              "Identify where manual intervention is necessary versus where it's simply habit",
              "Define explicit ownership at every stage before configuring a single trigger",
              "Treat your CRM as infrastructure, not just a database — its data architecture determines what automation is even possible",
              "Audit existing automations before adding new ones; removal is often more valuable than addition",
            ],
          },
        ],
      },
      {
        id: "connection",
        title: "Perspective",
        blocks: [
          {
            type: "paragraph",
            text: "This is the perspective that shapes how we approach every revenue automation engagement. We start with workflow mapping, not tool selection. The system design precedes the build.",
          },
        ],
      },
      {
        id: "closing",
        title: "Closing Thought",
        blocks: [
          {
            type: "paragraph",
            text: "Systems compound quietly. A well-designed automation system doesn't announce itself — it simply makes the team more effective over time. A poorly designed one does the opposite: it compounds chaos, creates technical debt, and eventually becomes the problem the next hire is brought in to fix.",
          },
          {
            type: "paragraph",
            text: "The sequence matters. Design first. Automate second.",
          },
        ],
      },
    ],
  },
  {
    slug: "where-ai-adds-value-in-sales-operations",
    categoryId: "ai-operations",
    category: "AI in Operations",
    title: "Where AI Actually Adds Value in Sales Operations",
    excerpt:
      "A practical look at using AI to support judgment instead of replacing it.",
    author: "Innovgeist",
    date: "March 2025",
    readingTime: "5 min read",
    color: colors.ember,
    deck: "Most AI deployments in sales operations are misaimed. Here's a clearer picture of where AI actually earns its place.",
    sections: [
      {
        id: "context",
        title: "The Hype vs. The Reality",
        blocks: [
          {
            type: "paragraph",
            text: "AI has entered sales operations largely through a hype cycle. Every platform now claims to be AI-powered. Sales teams are promised that AI will score leads, write follow-ups, predict churn, and close deals — sometimes all at once.",
          },
          {
            type: "paragraph",
            text: "In practice, most AI deployments in revenue operations deliver far less than advertised. Not because the technology is poor, but because the problem framing is wrong.",
          },
          {
            type: "callout",
            text: "AI tools are often deployed before the workflows they're meant to support have been designed.",
          },
        ],
      },
      {
        id: "argument",
        title: "Where AI Genuinely Earns Its Place",
        blocks: [
          {
            type: "paragraph",
            text: "AI adds genuine value at specific, well-defined decision points — primarily where data volume exceeds what humans can reason about in real time.",
          },
          {
            type: "subheading",
            text: "Lead prioritization at scale",
          },
          {
            type: "paragraph",
            text: "When a sales team receives 500 inbound leads per week, no human can evaluate every signal for every lead with equal attention. AI-assisted scoring — trained on historical conversion data, behavioral signals, and firmographic attributes — helps direct human attention where it matters most. This is augmentation, not replacement.",
          },
          {
            type: "subheading",
            text: "Pattern recognition across pipeline data",
          },
          {
            type: "paragraph",
            text: "Humans are good at individual relationships. They're poor at noticing aggregate patterns across hundreds of deals. AI can surface signals that are invisible at the individual level: which lead sources consistently stall at a specific stage, which follow-up sequences correlate with higher win rates, which accounts are showing early disengagement signals.",
          },
          {
            type: "subheading",
            text: "Reducing decision fatigue",
          },
          {
            type: "paragraph",
            text: "Routing decisions, qualification logic, follow-up timing — these are repetitive, rules-based decisions that consume significant cognitive bandwidth. AI handles the routine so that humans can focus on the non-routine.",
          },
          {
            type: "subheading",
            text: "Where AI consistently underperforms",
          },
          {
            type: "list",
            items: [
              "Contextual judgment about individual relationships and novel situations",
              "Anything requiring non-quantified or qualitative factors",
              "Creative or strategic decisions about how to position or communicate",
              "Situations where the training data doesn't represent current reality",
            ],
          },
        ],
      },
      {
        id: "systems",
        title: "The System Has to Come First",
        blocks: [
          {
            type: "paragraph",
            text: "AI should be treated as a layer on top of a well-designed system — not a substitute for one. When the underlying data is poor quality, when workflows are undefined, or when ownership is ambiguous, AI introduces noise rather than signal.",
          },
          {
            type: "paragraph",
            text: "The sequence matters: design the system, clean the data, define success metrics, then layer AI where it produces measurable improvement.",
          },
          {
            type: "callout",
            text: "AI trained on a broken system learns to replicate the breakage at scale.",
          },
        ],
      },
      {
        id: "implications",
        title: "Before Deploying AI",
        blocks: [
          {
            type: "list",
            items: [
              "Ensure data quality meets a minimum threshold for the specific application",
              "Define what 'better' looks like before deployment — a specific, measurable outcome",
              "Build human override mechanisms into every AI-assisted workflow",
              "Start with a narrow, well-defined use case rather than system-wide deployment",
              "Plan for model drift — AI systems require ongoing maintenance as data patterns change",
            ],
          },
        ],
      },
      {
        id: "connection",
        title: "Perspective",
        blocks: [
          {
            type: "paragraph",
            text: "This shapes how we scope AI integrations: after understanding data quality and workflow maturity, not before. AI is a layer in the system, not the foundation of it.",
          },
        ],
      },
      {
        id: "closing",
        title: "Closing Thought",
        blocks: [
          {
            type: "paragraph",
            text: "The most effective AI applications in operations are quiet. They reduce the number of low-quality decisions a human has to make — freeing attention for the high-judgment decisions that actually determine outcomes.",
          },
          {
            type: "paragraph",
            text: "That's augmentation. It's less exciting than the marketing suggests. It's also what actually works.",
          },
        ],
      },
    ],
  },
  {
    slug: "rethinking-the-lms-content-delivery-to-learning-systems",
    categoryId: "education-tech",
    category: "Education Technology & AOS",
    title: "Rethinking the LMS: From Content Delivery to Learning Systems",
    excerpt:
      "Why institutional learning platforms must evolve beyond static LMS models.",
    author: "Innovgeist",
    date: "February 2025",
    readingTime: "7 min read",
    color: colors.accentMuted,
    deck: "Most learning management systems were designed to distribute content, not to support learning. The gap between those two goals is larger than it appears.",
    sections: [
      {
        id: "context",
        title: "The Document Delivery Problem",
        blocks: [
          {
            type: "paragraph",
            text: "The modern LMS was designed around a straightforward metaphor: a document repository with tracking. Upload a PDF, record that a student opened it, mark them complete. This worked when the goal was information transfer and compliance.",
          },
          {
            type: "paragraph",
            text: "It works significantly less well when the goal is actual learning — the kind that results in retained knowledge, developed capability, and measurable outcomes.",
          },
          {
            type: "callout",
            text: "Completion rates are not learning outcomes. They're a proxy for attention — and a weak one.",
          },
        ],
      },
      {
        id: "argument",
        title: "The Gap Between Content and Learning",
        blocks: [
          {
            type: "paragraph",
            text: "Learning is not a linear process. A student who is struggling with a foundational concept doesn't benefit from advancing to the next module on schedule. A student who has already mastered the material doesn't benefit from sitting through it again.",
          },
          {
            type: "subheading",
            text: "What a content delivery system can't do",
          },
          {
            type: "list",
            items: [
              "Identify when a student is at risk before they fail an assessment",
              "Adapt pacing or content based on demonstrated knowledge gaps",
              "Surface actionable insights to instructors rather than raw attendance data",
              "Connect learning activity to institutional outcomes in meaningful ways",
              "Support the kind of personalized feedback that drives retention",
            ],
          },
          {
            type: "subheading",
            text: "The institutional cost of the gap",
          },
          {
            type: "paragraph",
            text: "Institutions that mistake activity for learning tend to optimize the wrong things. They measure completion rates, not competency development. They track logins, not understanding. And because they're measuring the wrong things, they improve the wrong things.",
          },
        ],
      },
      {
        id: "systems",
        title: "What a Learning System Actually Requires",
        blocks: [
          {
            type: "paragraph",
            text: "The difference between an LMS and a true Academic Operating System is the difference between a document repository and a system of record for learning. The latter doesn't just store and distribute — it understands, adapts, and surfaces.",
          },
          {
            type: "subheading",
            text: "A learning system needs to",
          },
          {
            type: "list",
            items: [
              "Maintain a model of what each learner knows and where their gaps are",
              "Adapt the learning environment in response to demonstrated understanding",
              "Provide instructors with actionable, timely insight into learner progression",
              "Integrate into the operational workflows of the institution — not exist as an isolated tool",
              "Generate data that improves over time, not just accumulates",
            ],
          },
          {
            type: "paragraph",
            text: "This requires different architecture from the ground up — not just better features layered onto an existing delivery system.",
          },
        ],
      },
      {
        id: "implications",
        title: "What Institutions Should Reconsider",
        blocks: [
          {
            type: "list",
            items: [
              "Whether their current platform is actually measuring learning, or just measuring attendance",
              "What data they are failing to capture that would allow better intervention",
              "Whether their instructors have the tools to act on learner signals in time to matter",
              "What 'platform success' means — at the institutional level, not just the IT level",
            ],
          },
        ],
      },
      {
        id: "connection",
        title: "Perspective",
        blocks: [
          {
            type: "paragraph",
            text: "GRADEguru was designed as a direct response to this gap — built from research into how learning actually works, not from retrofitting an existing content delivery framework.",
          },
        ],
      },
      {
        id: "closing",
        title: "Closing Thought",
        blocks: [
          {
            type: "paragraph",
            text: "Students don't fail because content is hard to find. They fail because the system doesn't know them well enough to help — and because the people who could help don't get the signal until it's too late.",
          },
          {
            type: "paragraph",
            text: "That's a system design problem. It has a system design solution.",
          },
        ],
      },
    ],
  },
  {
    slug: "designing-gradeguru-lessons-from-institutional-pilots",
    categoryId: "build-in-public",
    category: "Research & Build-in-Public",
    title: "Designing GRADEguru: Lessons from Early Institutional Pilots",
    excerpt:
      "Insights from pilot deployments and research shaping our Academic Operating System.",
    author: "Innovgeist",
    date: "January 2025",
    readingTime: "8 min read",
    color: colors.ember,
    deck: "Building software for institutions is fundamentally different from building for individuals. These are the lessons from our early pilots.",
    sections: [
      {
        id: "context",
        title: "Building for Institutions",
        blocks: [
          {
            type: "paragraph",
            text: "Most software is designed for individuals or small teams where a single user makes adoption decisions quickly. Institutional software is different. The decision-making is distributed, the stakeholder interests diverge, the procurement cycles are long, and the expectations for reliability and longevity are higher.",
          },
          {
            type: "paragraph",
            text: "When we began piloting GRADEguru with institutional partners, we encountered all of this — and several things we hadn't anticipated.",
          },
          {
            type: "callout",
            text: "In institutional environments, the user is rarely the buyer, and the buyer rarely understands the user's problem.",
          },
        ],
      },
      {
        id: "argument",
        title: "What the Pilots Taught Us",
        blocks: [
          {
            type: "subheading",
            text: "The most important design decisions aren't technical",
          },
          {
            type: "paragraph",
            text: "Early in our pilot process, we spent significant time optimizing the AI assessment engine — the core of what GRADEguru does. What moved the needle in pilot outcomes was something else entirely: how instructors were onboarded, how the platform integrated with existing assessment workflows, and how clearly we communicated what the AI was doing and what it wasn't.",
          },
          {
            type: "paragraph",
            text: "Instructors didn't distrust the AI because it was bad. They distrusted it because they didn't understand it. Transparency and explainability turned out to be foundational product requirements, not nice-to-haves.",
          },
          {
            type: "subheading",
            text: "Context variation is larger than expected",
          },
          {
            type: "paragraph",
            text: "Two institutions running the same curriculum will have dramatically different pedagogical approaches, assessment philosophies, and instructor behaviors. A platform that works well in one context can feel entirely wrong in another — not because the core function changed, but because the surrounding context is different.",
          },
          {
            type: "paragraph",
            text: "This pushed us toward a more configurable architecture — not endless settings, but considered flexibility at the points that matter most for different institutional contexts.",
          },
          {
            type: "subheading",
            text: "Students notice things administrators don't",
          },
          {
            type: "list",
            items: [
              "Feedback timing matters more than feedback length — late, thorough feedback is less valuable than timely, focused feedback",
              "The framing of AI-generated feedback affects how it's received and acted upon",
              "Students will engage more deeply with a platform that demonstrates it understands their individual progress",
              "Trust is built through consistency over time, not through feature richness",
            ],
          },
        ],
      },
      {
        id: "systems",
        title: "Platform vs. System",
        blocks: [
          {
            type: "paragraph",
            text: "One of the central realisations from our pilot work: an Academic Operating System isn't a product you install. It's a system you integrate — with curriculum design, instructor workflows, assessment cycles, grading policies, and institutional data architecture.",
          },
          {
            type: "paragraph",
            text: "This changes the nature of the deployment. The question isn't only 'does the software work?' It's 'does this system fit the institution's operational reality?' — and 'how does it change that reality for the better?'",
          },
          {
            type: "callout",
            text: "The system boundary for an Academic Operating System extends far beyond the software itself.",
          },
        ],
      },
      {
        id: "implications",
        title: "What This Changes About How We Build",
        blocks: [
          {
            type: "list",
            items: [
              "Research partnerships precede product decisions — we validate with real instructors and students before building",
              "Pilot data informs architecture, not just feature prioritization",
              "Transparency and explainability are core requirements, not UX improvements",
              "We design for the instructor workflow, not just the student experience",
              "Integration with existing institutional systems is treated as a first-class problem",
            ],
          },
        ],
      },
      {
        id: "connection",
        title: "Perspective",
        blocks: [
          {
            type: "paragraph",
            text: "GRADEguru continues to evolve through active research partnerships with institutions committed to improving learning outcomes. Each pilot cycle produces findings that directly shape the platform's direction.",
          },
        ],
      },
      {
        id: "closing",
        title: "Closing Thought",
        blocks: [
          {
            type: "paragraph",
            text: "The most important lesson from two years of institutional pilot work: technology that genuinely serves learners must be built from an understanding of how learning actually happens — in the specific, messy, context-dependent way it happens in real institutions.",
          },
          {
            type: "paragraph",
            text: "Everything else is infrastructure. Important infrastructure. But infrastructure in service of something more fundamental.",
          },
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string): InsightPost | null {
  return INSIGHT_POSTS.find((p) => p.slug === slug) ?? null;
}
