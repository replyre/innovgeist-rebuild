"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";

const CASE_STUDIES = [
  {
    context: "Growth agency managing multiple client pipelines",
    challenge:
      "Manual lead handling and fragmented tools created delays and inconsistent execution",
    systemBuilt:
      "Automated lead routing and internal workflow system integrated across tools",
    outcome:
      "Improved response times, reduced operational load, and more consistent delivery",
    tag: "Agency Infrastructure",
    color: colors.accent,
  },
  {
    context: "Service business with a growing sales team",
    challenge:
      "Leads were generated consistently, but conversion tracking and handoffs were unclear",
    systemBuilt:
      "Custom CRM workflows and automation supporting lead qualification and sales handoff",
    outcome:
      "Clear pipeline visibility and reduced reliance on manual follow-ups",
    tag: "CRM & Automation",
    color: colors.accentMuted,
  },
];

const FIELDS = [
  { key: "context" as const, label: "Context" },
  { key: "challenge" as const, label: "Challenge" },
  { key: "systemBuilt" as const, label: "System Built" },
  { key: "outcome" as const, label: "Outcome" },
];

export function ServicesPageCaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bridgeRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const fadeIn = (el: HTMLElement, delay = 0) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
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
      if (introRef.current) fadeIn(introRef.current, 0.05);

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
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 87%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      if (bridgeRef.current) fadeIn(bridgeRef.current);
    },
    { scope: sectionRef }
  );

  const words = "Systems Built for Real-World Operations".split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32"
      style={{ borderTop: `1px solid ${colors.stone[600]}18` }}
    >
      <Container>
        {/* Label */}
        <div ref={labelRef} className="mb-5" style={{ opacity: 0 }}>
          <span
            className="font-mono text-xs tracking-[0.28em] uppercase"
            style={{ color: colors.stone[600] }}
          >
            Case Studies
          </span>
        </div>

        {/* Headline */}
        <div ref={headlineRef} className="mb-5">
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
          className="text-stone-400 type-body max-w-2xl mb-12 md:mb-16 leading-relaxed"
          style={{ opacity: 0 }}
        >
          We&apos;ve partnered with growing businesses and agencies to design
          and deploy systems that operate reliably in production — supporting
          revenue workflows, internal operations, and long-term scale.
        </p>

        {/* Case study cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-10 md:mb-14">
          {CASE_STUDIES.map((cs, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="relative p-7 md:p-8 rounded-sm flex flex-col"
              style={{
                opacity: 0,
                border: `1px solid ${cs.color}22`,
                backgroundColor: colors.surface,
              }}
            >
              {/* Left accent */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-sm"
                style={{ backgroundColor: cs.color }}
              />

              {/* Tag */}
              <div className="mb-5">
                <span
                  className="font-mono text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-sm"
                  style={{
                    color: cs.color,
                    border: `1px solid ${cs.color}30`,
                    backgroundColor: `${cs.color}08`,
                  }}
                >
                  {cs.tag}
                </span>
              </div>

              {/* Fields */}
              <div className="flex flex-col gap-4 flex-1">
                {FIELDS.map((field) => (
                  <div key={field.key}>
                    <p
                      className="font-mono text-[10px] tracking-[0.2em] uppercase mb-1"
                      style={{ color: `${cs.color}80` }}
                    >
                      {field.label}
                    </p>
                    <p className="text-stone-400 type-small leading-relaxed">
                      {cs[field.key]}
                    </p>
                  </div>
                ))}
              </div>

              {/* View case study link */}
              <div className="mt-6 pt-5" style={{ borderTop: `1px solid ${colors.stone[600]}20` }}>
                <a
                  href="/case-studies"
                  className="inline-flex items-center gap-2 font-mono text-xs transition-colors"
                  style={{ color: cs.color }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.opacity = "0.7";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
                  }}
                >
                  View Case Study
                  <svg
                    width={12}
                    height={12}
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M3 6h7m0 0L7 3m3 3L7 9"
                      stroke="currentColor"
                      strokeWidth={1.2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bridge line */}
        <p
          ref={bridgeRef}
          className="text-stone-600 type-small font-mono"
          style={{ opacity: 0 }}
        >
          While each engagement is different, our approach remains the same:
          design systems that teams can rely on in day-to-day operations.
        </p>
      </Container>
    </section>
  );
}
