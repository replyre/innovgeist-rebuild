"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";

const E = colors.ember;
const A = colors.accent;

const AI_APPLICATIONS = [
  {
    title: "Learning Gap Detection",
    desc: "Identifies patterns in assessment data that indicate where students are falling behind, before manual review would catch it.",
    color: A,
  },
  {
    title: "Engagement Signal Analysis",
    desc: "Surfaces early signals of disengagement from LMS activity — enabling timely faculty intervention.",
    color: A,
  },
  {
    title: "Evidence Completeness Checks",
    desc: "Flags missing or weak documentation before accreditation windows close — reducing last-minute scrambles.",
    color: E,
  },
  {
    title: "Criteria Alignment Suggestions",
    desc: "Assists in mapping academic activities to NAAC, NBA, and NIRF criteria — reducing manual interpretation work.",
    color: E,
  },
  {
    title: "Longitudinal Trend Highlighting",
    desc: "Surfaces year-over-year shifts in academic performance and compliance metrics automatically.",
    color: A,
  },
  {
    title: "Report Narrative Drafting",
    desc: "Early-stage capability to assist faculty in drafting structured narrative sections for accreditation submissions.",
    color: E,
  },
];

export function GradeGuruAI() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const clarityRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const fadeIn = (el: HTMLElement, delay = 0) =>
        gsap.fromTo(el, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.7, delay, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", toggleActions: "play none none none" },
        });

      if (labelRef.current) fadeIn(labelRef.current);
      if (introRef.current) fadeIn(introRef.current, 0.05);
      if (clarityRef.current) fadeIn(clarityRef.current);

      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll(".split-char");
        gsap.fromTo(chars, { y: "110%", opacity: 0 }, {
          y: "0%", opacity: 1, stagger: 0.01, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: headlineRef.current, start: "top 85%", toggleActions: "play none none none" },
        });
      }

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card, { opacity: 0, y: 28 }, {
          opacity: 1, y: 0, duration: 0.7, delay: (i % 3) * 0.08, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none none" },
        });
      });
    },
    { scope: sectionRef }
  );

  const words = "AI as a Support Layer, Not a Substitute".split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32"
      style={{ borderTop: `1px solid ${colors.stone[600]}18` }}
    >
      <Container>
        <div ref={labelRef} className="mb-5 flex items-center gap-3" style={{ opacity: 0 }}>
          <span className="font-mono text-xs tracking-[0.28em] uppercase" style={{ color: colors.stone[600] }}>
            Intelligence Layer
          </span>
          <span className="text-stone-600 font-mono text-xs">/</span>
          <span className="font-mono text-xs tracking-[0.22em] uppercase" style={{ color: A }}>
            AI Capabilities
          </span>
        </div>

        <div ref={headlineRef} className="mb-5 max-w-3xl">
          <h2 className="flex flex-wrap font-display type-heading text-chalk">
            {words.map((word, wi) => (
              <span key={wi} className="inline-block overflow-hidden mr-[0.28em]">
                {word.split("").map((char, ci) => (
                  <span key={ci} className="split-char inline-block" style={{ opacity: 0 }}>{char}</span>
                ))}
              </span>
            ))}
          </h2>
        </div>

        <p
          ref={introRef}
          className="text-stone-400 type-body leading-relaxed max-w-2xl mb-10 md:mb-12"
          style={{ opacity: 0 }}
        >
          GRADEguru incorporates AI where it adds genuine value — surfacing insights
          from structured academic data that would take faculty and administrators significant
          time to identify manually. AI augments decision-making;{" "}
          <span className="text-chalk">the underlying data and structure are what actually drive accreditation readiness.</span>
        </p>

        {/* AI applications grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-10 md:mb-12">
          {AI_APPLICATIONS.map((app, i) => (
            <div
              key={app.title}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="relative p-6 rounded-sm"
              style={{
                opacity: 0,
                border: `1px solid ${app.color}1a`,
                backgroundColor: colors.surface,
              }}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-sm"
                style={{ backgroundColor: app.color }}
              />
              <h3
                className="text-chalk font-medium mb-2.5 pl-1"
                style={{ fontSize: "clamp(0.875rem, 1.3vw, 0.9375rem)" }}
              >
                {app.title}
              </h3>
              <p className="text-stone-400 type-small leading-relaxed">{app.desc}</p>
            </div>
          ))}
        </div>

        {/* Clarity note */}
        <div
          ref={clarityRef}
          className="p-6 md:p-7 rounded-sm"
          style={{
            border: `1px solid ${E}28`,
            backgroundColor: `${E}06`,
            opacity: 0,
          }}
        >
          <p
            className="font-mono text-[10px] tracking-[0.22em] uppercase mb-3"
            style={{ color: `${E}80` }}
          >
            A Note on AI Scope
          </p>
          <p className="text-stone-400 type-small leading-relaxed max-w-2xl">
            GRADEguru does not position AI as an autonomous accreditation engine. AI
            capabilities are introduced incrementally — validated against real institutional
            workflows before deployment. The platform&apos;s primary value comes from{" "}
            <span className="text-chalk">structured data, not AI alone</span>.
          </p>
        </div>
      </Container>
    </section>
  );
}
