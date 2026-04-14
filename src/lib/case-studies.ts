import { colors } from "@/lib/theme";

/* ─── Types ─── */

export interface CaseStudyListItem {
  slug: string;
  context: string;
  title: string;
  summary: string;
  tags: string[];
  color: string;
  available: boolean;
}

export type SectionBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "components"; items: { title: string; desc: string }[] };

export interface DetailSection {
  num: string;
  title: string;
  blocks: SectionBlock[];
}

export interface CaseStudyDetailData extends CaseStudyListItem {
  industry: string;
  companyType: string;
  engagementType: string;
  status: string;
  oneLiner: string;
  sections: DetailSection[];
}

/* ─── Listing data ─── */

export const CASE_STUDY_LIST: CaseStudyListItem[] = [
  {
    slug: "ai-revenue-automation-b2b",
    context: "B2B Services Business · Sales-Driven Organization",
    title: "AI-Enabled Revenue Automation System for a Growing B2B Business",
    summary:
      "Designed and implemented an AI-assisted sales automation system to reduce manual lead handling, improve prioritization, and create clear visibility across the revenue pipeline.",
    tags: ["Revenue Automation", "AI Intelligence", "CRM Workflows"],
    color: colors.accent,
    available: true,
  },
  {
    slug: "agency-automation-infrastructure",
    context: "Growth Marketing Agency · Multi-Client Operations",
    title: "Building a Scalable Automation Infrastructure for a Growth Agency",
    summary:
      "Designed internal automation and workflow systems to support client onboarding, lead handling, and delivery processes across multiple accounts.",
    tags: ["Agency Automation", "Internal Platforms", "Workflow Design"],
    color: colors.accentMuted,
    available: false,
  },
  {
    slug: "crm-sales-workflow-redesign",
    context: "Service Business · Expanding Sales Team",
    title: "Redesigning CRM & Sales Workflows for Pipeline Clarity",
    summary:
      "Re-engineered CRM architecture and sales workflows to eliminate manual updates, clarify ownership, and improve visibility into deal progression.",
    tags: ["CRM Engineering", "Revenue Workflows", "Sales Operations"],
    color: colors.ember,
    available: false,
  },
  {
    slug: "education-platform-development",
    context: "Education Startup · Platform Operations",
    title: "Operational Platform Development for an Education-Focused Startup",
    summary:
      "Built a custom internal platform to support operational workflows, data consistency, and long-term scalability across academic processes.",
    tags: ["Custom Platform", "Operational Systems", "Education Technology"],
    color: colors.accent,
    available: false,
  },
];

/* ─── Detail data ─── */

export const CASE_STUDY_DETAILS: Record<string, CaseStudyDetailData> = {
  "ai-revenue-automation-b2b": {
    slug: "ai-revenue-automation-b2b",
    context: "B2B Services Business · Sales-Driven Organization",
    title: "AI-Enabled Revenue Automation System for a Growing B2B Business",
    summary:
      "Designed and implemented an AI-assisted sales automation system to reduce manual lead handling, improve prioritization, and create clear visibility across the revenue pipeline.",
    tags: ["Revenue Automation", "AI Intelligence", "CRM Workflows"],
    color: colors.accent,
    available: true,
    industry: "B2B Services",
    companyType: "Sales-Driven Business",
    engagementType: "Revenue Automation & AI-Assisted Systems",
    status: "Live in Production",
    oneLiner:
      "Designed and deployed an AI-assisted sales automation system that reduced manual effort, improved lead prioritization, and created reliable visibility across the revenue pipeline.",
    sections: [
      {
        num: "01",
        title: "Background & Context",
        blocks: [
          {
            type: "paragraph",
            text: "The business was experiencing consistent inbound demand through multiple channels, supported by a growing sales team. While lead volume was healthy, operational strain was increasing as the team scaled.",
          },
          {
            type: "paragraph",
            text: "Sales operations relied heavily on manual processes for lead qualification, follow-ups, and internal coordination. As volume increased, maintaining consistency and visibility became increasingly difficult.",
          },
          {
            type: "paragraph",
            text: "Leadership needed a way to scale revenue operations without adding proportional headcount or operational complexity.",
          },
        ],
      },
      {
        num: "02",
        title: "The Problem",
        blocks: [
          {
            type: "paragraph",
            text: "The core challenges were not about tools, but about system design:",
          },
          {
            type: "list",
            items: [
              "Leads entered from multiple sources with inconsistent context",
              "Manual qualification slowed response times",
              "Sales reps spent excessive time triaging and updating records",
              "No reliable way to prioritize high-intent opportunities",
              "Limited visibility into pipeline health and bottlenecks",
            ],
          },
          {
            type: "paragraph",
            text: "These issues compounded as volume grew, creating revenue leakage and operational friction.",
          },
        ],
      },
      {
        num: "03",
        title: "The Approach",
        blocks: [
          {
            type: "paragraph",
            text: "Instead of adding more tools or surface-level automation, the engagement began with a system-level diagnosis. Key principles guiding the approach:",
          },
          {
            type: "list",
            items: [
              "Design around real sales workflows, not CRM defaults",
              "Reduce cognitive load on sales teams",
              "Use AI to support judgment, not replace it",
              "Build for long-term adaptability",
            ],
          },
          {
            type: "paragraph",
            text: "The focus was on how information, decisions, and responsibility flowed across the revenue lifecycle.",
          },
        ],
      },
      {
        num: "04",
        title: "The System Design",
        blocks: [
          {
            type: "paragraph",
            text: "The solution was designed as an integrated revenue system consisting of:",
          },
          {
            type: "list",
            items: [
              "A centralized lead ingestion layer",
              "Rule-based and AI-assisted qualification logic",
              "Intelligent routing to sales representatives",
              "Automated follow-ups triggered by behavior and context",
              "A CRM workflow redesigned around actual sales motion",
              "Reporting views that reflected pipeline reality, not vanity metrics",
            ],
          },
          {
            type: "paragraph",
            text: "AI was introduced selectively, where it added measurable value.",
          },
        ],
      },
      {
        num: "05",
        title: "The System Built",
        blocks: [
          {
            type: "paragraph",
            text: "Key Components",
          },
          {
            type: "components",
            items: [
              {
                title: "Automated Lead Ingestion",
                desc: "Leads from all sources entered a unified system with structured context preserved.",
              },
              {
                title: "AI-Assisted Lead Scoring",
                desc: "Behavioral and contextual signals were used to support prioritization, helping reps focus on the right opportunities first.",
              },
              {
                title: "Intelligent Routing Logic",
                desc: "Leads were assigned based on predefined rules and AI-supported insights, reducing delays and misrouting.",
              },
              {
                title: "Workflow-Driven Follow-ups",
                desc: "Consistent follow-ups were automated while allowing human intervention where needed.",
              },
              {
                title: "Revenue Visibility Layer",
                desc: "Dashboards and views surfaced pipeline health, stalled deals, and conversion patterns.",
              },
            ],
          },
          {
            type: "paragraph",
            text: "The system was integrated into the existing tool stack, not built as a parallel layer.",
          },
        ],
      },
      {
        num: "06",
        title: "Outcomes & Impact",
        blocks: [
          {
            type: "paragraph",
            text: "After implementation, the business experienced:",
          },
          {
            type: "list",
            items: [
              "Reduced manual lead handling across the sales team",
              "Faster and more consistent response times",
              "Improved focus on high-intent opportunities",
              "Clear ownership at each stage of the pipeline",
              "Greater confidence in pipeline visibility and forecasting",
            ],
          },
          {
            type: "paragraph",
            text: "The system scaled smoothly as volume increased, without adding operational overhead.",
          },
        ],
      },
      {
        num: "07",
        title: "Key Learnings",
        blocks: [
          {
            type: "list",
            items: [
              "AI delivers the most value when layered onto well-designed workflows",
              "Clear system ownership matters more than tool sophistication",
              "Automation should reduce decision fatigue, not add complexity",
              "Revenue systems must evolve alongside sales motion",
            ],
          },
          {
            type: "paragraph",
            text: "These learnings informed subsequent iterations and refinements.",
          },
        ],
      },
      {
        num: "08",
        title: "Closing Reflection",
        blocks: [
          {
            type: "paragraph",
            text: "This engagement reinforced the importance of designing revenue systems around real operational behavior — not theoretical models or generic templates.",
          },
          {
            type: "paragraph",
            text: "The same system-first, research-informed approach underpins every automation platform and product we build at Innovgeist, including our institutional work on GRADEguru.",
          },
        ],
      },
    ],
  },
};

export function getCaseStudyBySlug(slug: string): CaseStudyDetailData | null {
  return CASE_STUDY_DETAILS[slug] ?? null;
}
