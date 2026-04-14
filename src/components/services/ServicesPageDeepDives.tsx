"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";

/* ─── Data ─── */

const DEEP_DIVES = [
  {
    sectionNum: "04",
    accentColor: colors.accent,
    label: "Deep Dive",
    headline: "Sales & Marketing Automation Systems",
    intro:
      "Most revenue problems aren't caused by lack of leads — they're caused by fragmented systems, manual processes, and poor handoffs between marketing and sales. We design automation systems that ensure every lead is handled consistently, intelligently, and at scale.",
    areasTitle: "Core Areas We Typically Address",
    areas: [
      {
        title: "Lead Capture & Ingestion",
        desc: "Ensuring leads from all sources enter your system cleanly, with context intact.",
      },
      {
        title: "Follow-ups & Response Logic",
        desc: "Automating timely, consistent responses without sacrificing personalization.",
      },
      {
        title: "Qualification & Routing",
        desc: "Using rules and AI-assisted logic to prioritize leads and route them to the right teams.",
      },
      {
        title: "Sales Handoffs & Lifecycle Management",
        desc: "Designing workflows that move leads smoothly from marketing to sales to close.",
      },
      {
        title: "Revenue Visibility & Feedback Loops",
        desc: "Creating systems that surface what's converting, what's stalling, and why.",
      },
    ],
    areaNote:
      "These are designed as one connected system, not isolated automations.",
    outcomesTitle: "After Implementation, Teams Typically See",
    outcomes: [
      "Fewer leads falling through the cracks",
      "Faster and more consistent response times",
      "Reduced manual work for sales teams",
      "Clear visibility into pipeline health and bottlenecks",
      "Revenue operations that scale without adding headcount",
    ],
    outcomesNote: "No promises. Just operational shifts.",
    differentiatorLabel: "How This Is Different",
    differentiators: [
      "Design automation around your sales reality",
      "Integrate with your existing stack",
      "Build systems meant to evolve as your business grows",
    ],
    differentiatorHeading:
      "We don't install tools and walk away. We:",
    differentiatorClose: "This is systems engineering — not task automation.",
    ctaSubtext:
      "Every engagement starts with a discovery call to understand your revenue workflows.",
  },
  {
    sectionNum: "05",
    accentColor: colors.accentMuted,
    label: "Deep Dive",
    headline: "CRM & Revenue Workflow Engineering",
    intro:
      "Most CRMs fail not because of the tool, but because they were never designed around how revenue actually flows through the business. We re-engineer CRM and revenue workflows to align teams, data, and decision-making around a single, reliable system of record.",
    areasTitle: "Core Areas of Focus",
    areas: [
      {
        title: "Pipeline Architecture",
        desc: "Designing stages, rules, and transitions that reflect real sales behavior — not generic templates.",
      },
      {
        title: "Cross-Team Workflows",
        desc: "Aligning marketing, sales, and operations so handoffs are clear and accountability is built into the system.",
      },
      {
        title: "Data Flow & Integrity",
        desc: "Ensuring clean, structured data across tools so reporting and automation actually work.",
      },
      {
        title: "Lifecycle & Status Logic",
        desc: "Defining how leads, opportunities, and accounts evolve over time — without manual guesswork.",
      },
      {
        title: "Revenue Visibility & Reporting",
        desc: "Building dashboards and views that show what's moving, what's stuck, and why.",
      },
    ],
    areaNote:
      "Everything is designed as part of a connected revenue system, not isolated CRM tweaks.",
    outcomesTitle: "Teams Typically Gain",
    outcomes: [
      "A CRM that sales teams actually use",
      "Clear ownership at every stage of the pipeline",
      "Fewer manual updates and workarounds",
      "Reliable reporting instead of conflicting numbers",
      "Confidence in forecasts and pipeline health",
    ],
    outcomesNote: "This is about control and clarity — not complexity.",
    differentiatorLabel: "How We Approach CRM Differently",
    differentiators: [
      "Start from your revenue motion, not the tool",
      "Design workflows before configuration",
      "Treat CRM as infrastructure, not software",
      "Build for scale, not just current headcount",
    ],
    differentiatorHeading: "We don't 'set up' CRMs. We:",
    differentiatorClose:
      "This mindset is what keeps systems usable long-term.",
    ctaSubtext: "CRM redesigns begin with a discovery call to map revenue workflows.",
  },
  {
    sectionNum: "06",
    accentColor: colors.ember,
    label: "Deep Dive",
    headline: "AI-Powered Automation & Intelligence",
    intro:
      "AI is most effective when embedded into well-designed systems. We integrate AI into revenue and operational workflows to support better prioritization, decision-making, and efficiency — always grounded in real business context.",
    areasTitle: "Common Use Areas",
    areas: [
      {
        title: "Lead Scoring & Prioritization",
        desc: "Using data signals and AI-assisted models to help teams focus on the right opportunities first.",
      },
      {
        title: "Intelligent Routing & Assignment",
        desc: "Supporting smarter lead and task routing based on behavior, context, and historical outcomes.",
      },
      {
        title: "Signal Detection & Insights",
        desc: "Identifying patterns across pipelines, conversations, and activity that are hard to spot manually.",
      },
      {
        title: "Operational Decision Support",
        desc: "Providing internal teams with summaries, recommendations, and insights that reduce cognitive load.",
      },
    ],
    areaNote:
      "AI is always integrated into existing workflows — not bolted on as a standalone feature.",
    outcomesTitle: "When AI Is Applied Correctly, Teams Experience",
    outcomes: [
      "Better focus on high-value opportunities",
      "Reduced noise and manual triage",
      "Faster internal decision cycles",
      "More consistent application of rules and logic",
      "Systems that improve as data quality improves",
    ],
    outcomesNote: "These are compounding gains — not instant hacks.",
    differentiatorLabel: "How We Approach AI Differently",
    differentiators: [
      "System-first, AI-second",
      "Research-informed, not trend-driven",
      "Scoped to real workflows",
      "Designed to evolve over time",
    ],
    differentiatorHeading: "Our approach is:",
    differentiatorClose: "AI is a layer — not the foundation.",
    ctaSubtext:
      "AI integrations are scoped during discovery based on data quality and workflow maturity.",
    clarityNote: {
      heading: "What This Is Not",
      items: [
        "We don't sell generic AI tools",
        "We don't promise autonomous decision-making",
        "We don't replace sales or operations teams",
      ],
      close: "AI is used to augment judgment, not remove it.",
    },
  },
  {
    sectionNum: "07",
    accentColor: colors.accent,
    label: "Deep Dive",
    headline: "Agency Automation Infrastructure",
    intro:
      "Many agencies struggle to scale not because of demand, but because internal systems don't keep up. We work behind the scenes with marketing and growth agencies to design and build automation and internal infrastructure that improves delivery efficiency, consistency, and client ROI.",
    areasTitle: "Typical Engagement Areas",
    areas: [
      {
        title: "Internal Workflow Automation",
        desc: "Automating lead intake, onboarding, reporting, and internal handoffs to reduce operational load.",
      },
      {
        title: "White-Label System Builds",
        desc: "Designing systems agencies can deploy across clients without rebuilding from scratch each time.",
      },
      {
        title: "Delivery Infrastructure",
        desc: "Creating repeatable, scalable backend systems that support campaign execution and reporting.",
      },
      {
        title: "Integration Across Client Stacks",
        desc: "Ensuring tools used across marketing, sales, and operations actually work together.",
      },
    ],
    areaNote:
      "Everything is designed to support agency strategy, not override it.",
    outcomesTitle: "Agencies Typically See",
    outcomes: [
      "Faster client onboarding",
      "More consistent delivery",
      "Reduced manual ops work",
      "Higher margins through efficiency",
      "Stronger client retention due to better systems",
    ],
    outcomesNote: "This positions systems as a profit multiplier.",
    differentiatorLabel: "How This Partnership Works",
    differentiators: [
      "A technical extension of your team",
      "A systems architect, not a campaign executor",
      "A long-term partner, not a one-off vendor",
    ],
    differentiatorHeading: "We operate as:",
    differentiatorClose:
      "We do not pitch your clients, run ads or campaigns, or interfere with client-facing strategy.",
    ctaSubtext:
      "Agency engagements are structured to fit your delivery model and client relationships.",
  },
  {
    sectionNum: "08",
    accentColor: colors.stone[600],
    label: "Supporting Capability",
    headline: "Custom Software & Platform Development",
    intro:
      "Custom software is rarely the goal — it's often the mechanism. We build custom software and internal platforms when existing tools can't support the workflows, automation, or scale a system requires.",
    areasTitle: "Typical Scenarios",
    areas: [
      {
        title: "Complex or Non-Standard Workflows",
        desc: "When business processes don't fit off-the-shelf tools without heavy compromise.",
      },
      {
        title: "Internal Revenue or Operations Platforms",
        desc: "Dashboards, control systems, or tools that support sales, marketing, or operations teams.",
      },
      {
        title: "Deep Integrations Across Systems",
        desc: "When multiple tools need to behave like one coherent system.",
      },
      {
        title: "Long-Term Platform Needs",
        desc: "When reliability, maintainability, and scale matter more than speed alone.",
      },
    ],
    areaNote: "Software is built only when it strengthens the overall system.",
    outcomesTitle: "This Capability Connects to",
    outcomes: [
      "Revenue automation and CRM systems",
      "AI integrations requiring custom data pipelines",
      "Agency platforms serving multiple clients",
      "Long-term scalability requirements",
    ],
    outcomesNote:
      "Custom software is always part of a broader system engagement.",
    differentiatorLabel: "How We Approach Software Differently",
    differentiators: [
      "Architecture-first",
      "Designed for long-term use, not demos",
      "Integrated into automation and workflows",
      "Built with ownership, security, and scale in mind",
    ],
    differentiatorHeading: "Our software work is:",
    differentiatorClose:
      "We do not offer generic website development, isolated app builds, or compete as a low-cost development vendor.",
    ctaSubtext: "Custom software is scoped only after system-level discovery.",
  },
];

/* ─── Single deep dive section ─── */

interface DeepDiveSectionProps {
  data: (typeof DEEP_DIVES)[0];
  isLast: boolean;
}

function DeepDiveSection({ data, isLast }: DeepDiveSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const areasRef = useRef<HTMLDivElement>(null);
  const outcomesRef = useRef<HTMLDivElement>(null);
  const diffRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const fadeIn = (el: HTMLElement, delay = 0) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 87%",
              toggleActions: "play none none none",
            },
          }
        );
      };

      if (labelRef.current) fadeIn(labelRef.current);

      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll(".split-char");
        gsap.fromTo(
          chars,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            stagger: 0.01,
            duration: 0.55,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 86%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (introRef.current) fadeIn(introRef.current, 0.05);
      if (areasRef.current) fadeIn(areasRef.current);
      if (outcomesRef.current) fadeIn(outcomesRef.current, 0.1);
      if (diffRef.current) fadeIn(diffRef.current);
      if (ctaRef.current) fadeIn(ctaRef.current);
    },
    { scope: sectionRef }
  );

  const words = data.headline.split(" ");
  const color = data.accentColor;

  return (
    <div
      ref={sectionRef}
      className={`relative py-16 md:py-20 ${!isLast ? "border-b" : ""}`}
      style={{ borderColor: `${colors.stone[600]}18` }}
    >
      {/* Section number — large background */}
      <div
        className="absolute top-12 right-0 font-display select-none pointer-events-none hidden lg:block"
        style={{
          fontSize: "clamp(5rem, 10vw, 9rem)",
          lineHeight: 1,
          color: `${color}06`,
          letterSpacing: "-0.03em",
        }}
      >
        {data.sectionNum}
      </div>

      {/* Header */}
      <div ref={labelRef} className="mb-5 flex items-center gap-3" style={{ opacity: 0 }}>
        <span
          className="font-mono text-xs tracking-[0.28em] uppercase"
          style={{ color }}
        >
          {data.label}
        </span>
        <span className="font-mono text-xs text-stone-600">/</span>
        <span className="font-mono text-xs tracking-wider text-stone-600">
          {data.sectionNum}
        </span>
      </div>

      {/* Headline */}
      <div ref={headlineRef} className="mb-6 max-w-3xl">
        <h2 className="flex flex-wrap font-display type-heading text-chalk">
          {words.map((word, wi) => (
            <span
              key={wi}
              className="inline-block overflow-hidden mr-[0.28em]"
            >
              {word.split("").map((char, ci) => (
                <span
                  key={ci}
                  className="split-char inline-block"
                  style={{ opacity: 0 }}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h2>
      </div>

      {/* Intro */}
      <p
        ref={introRef}
        className="text-stone-400 type-body max-w-2xl mb-10 md:mb-12 leading-relaxed"
        style={{ opacity: 0 }}
      >
        {data.intro}
      </p>

      {/* Areas + Outcomes — two-column on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-10">
        {/* Areas */}
        <div
          ref={areasRef}
          className="p-6 md:p-7 rounded-sm"
          style={{
            opacity: 0,
            border: `1px solid ${color}20`,
            backgroundColor: colors.surface,
          }}
        >
          <p
            className="font-mono text-[10px] tracking-[0.22em] uppercase mb-5"
            style={{ color }}
          >
            {data.areasTitle}
          </p>
          <ul className="space-y-4">
            {data.areas.map((area) => (
              <li key={area.title}>
                <p
                  className="text-chalk type-small font-medium mb-0.5"
                  style={{ borderLeft: `2px solid ${color}40`, paddingLeft: "10px" }}
                >
                  {area.title}
                </p>
                <p className="text-stone-600 type-small pl-[14px]">{area.desc}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 type-small text-stone-600 italic">{data.areaNote}</p>
        </div>

        {/* Outcomes */}
        <div
          ref={outcomesRef}
          className="p-6 md:p-7 rounded-sm"
          style={{
            opacity: 0,
            border: `1px solid ${colors.stone[600]}22`,
            backgroundColor: colors.surface,
          }}
        >
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-stone-600 mb-5">
            {data.outcomesTitle}
          </p>
          <ul className="space-y-3">
            {data.outcomes.map((outcome, oi) => (
              <li
                key={oi}
                className="flex items-start gap-3 type-small"
                style={{ color: colors.stone[100] }}
              >
                <span
                  className="mt-[6px] shrink-0 w-1 h-1 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {outcome}
              </li>
            ))}
          </ul>
          <p className="mt-5 type-small text-stone-600 italic">
            {data.outcomesNote}
          </p>

          {/* Optional clarity note (AI section) */}
          {data.clarityNote && (
            <div
              className="mt-6 pt-5"
              style={{ borderTop: `1px solid ${colors.stone[600]}20` }}
            >
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-stone-600 mb-3">
                {data.clarityNote.heading}
              </p>
              <ul className="space-y-2">
                {data.clarityNote.items.map((item, ii) => (
                  <li
                    key={ii}
                    className="flex items-start gap-2 type-small text-stone-400"
                  >
                    <span className="font-mono text-stone-600 text-xs mt-[2px]">—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 type-small text-stone-600 italic">
                {data.clarityNote.close}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* How we're different */}
      <div
        ref={diffRef}
        className="p-6 md:p-7 rounded-sm mb-8 md:mb-10"
        style={{
          opacity: 0,
          border: `1px solid ${colors.stone[600]}18`,
          backgroundColor: `${color}06`,
        }}
      >
        <p
          className="font-mono text-[10px] tracking-[0.22em] uppercase mb-4"
          style={{ color }}
        >
          {data.differentiatorLabel}
        </p>
        <p className="text-chalk type-body mb-3">{data.differentiatorHeading}</p>
        <ul className="space-y-2 mb-4">
          {data.differentiators.map((d, di) => (
            <li
              key={di}
              className="flex items-start gap-3 type-small text-stone-400"
            >
              <span
                className="mt-[6px] shrink-0 w-1 h-1 rounded-full"
                style={{ backgroundColor: color }}
              />
              {d}
            </li>
          ))}
        </ul>
        <p
          className="type-small font-medium"
          style={{ color }}
        >
          {data.differentiatorClose}
        </p>
      </div>

      {/* CTA */}
      <div ref={ctaRef} className="flex flex-col sm:flex-row sm:items-center gap-4" style={{ opacity: 0 }}>
        <Button variant="primary" href="/contact">
          Discuss Automation
        </Button>
        <p className="text-stone-600 type-small">{data.ctaSubtext}</p>
      </div>
    </div>
  );
}

/* ─── Wrapper ─── */

export function ServicesPageDeepDives() {
  const wrapperRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!labelRef.current) return;
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: labelRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: wrapperRef }
  );

  return (
    <section
      ref={wrapperRef}
      className="relative"
      style={{ borderTop: `1px solid ${colors.stone[600]}18` }}
    >
      <Container>
        {/* Section label */}
        <div ref={labelRef} className="pt-16 md:pt-24 mb-2" style={{ opacity: 0 }}>
          <span
            className="font-mono text-xs tracking-[0.28em] uppercase"
            style={{ color: colors.stone[600] }}
          >
            Service Deep Dives
          </span>
        </div>

        {DEEP_DIVES.map((dive, i) => (
          <DeepDiveSection
            key={dive.sectionNum}
            data={dive}
            isLast={i === DEEP_DIVES.length - 1}
          />
        ))}
      </Container>
    </section>
  );
}
