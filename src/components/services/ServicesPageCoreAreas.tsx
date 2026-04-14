"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";

const SERVICE_AREAS = [
  {
    num: "01",
    title: "Sales & Marketing Automation Systems",
    desc: "We design automated systems that manage lead capture, follow-ups, qualification, and sales handoffs — reducing manual effort and improving conversion consistency across the funnel.",
    outcomes: ["Faster response times", "Fewer dropped leads", "More predictable conversions"],
    color: colors.accent,
    primary: true,
  },
  {
    num: "02",
    title: "CRM & Revenue Workflow Engineering",
    desc: "We architect and customize CRM pipelines and revenue workflows that align sales, marketing, and operations — giving teams clarity into how deals move and where bottlenecks exist.",
    outcomes: ["Pipeline visibility", "Clean handoffs", "Operational clarity"],
    color: colors.accentMuted,
    primary: true,
  },
  {
    num: "03",
    title: "AI-Powered Automation & Intelligence",
    desc: "We integrate AI into revenue operations to support smarter lead scoring, routing, prioritization, and internal insights — always scoped to practical, real-world use cases.",
    outcomes: ["Better prioritization", "Reduced noise", "Decision support"],
    color: colors.ember,
    primary: true,
  },
  {
    num: "04",
    title: "Agency Automation Infrastructure",
    desc: "We partner with marketing and growth agencies to build internal automation and white-label systems that improve delivery efficiency, scalability, and client ROI.",
    outcomes: ["Scalable delivery", "Reduced ops load", "Stronger client outcomes"],
    color: colors.accent,
    primary: true,
  },
  {
    num: "05",
    title: "Custom Software & Platform Development",
    desc: "When existing tools fall short, we build custom internal software and platforms to support complex workflows, integrations, and long-term system needs.",
    outcomes: ["System flexibility", "Reduced tool sprawl", "Long-term reliability"],
    color: colors.stone[600],
    primary: false,
  },
];

export function ServicesPageCoreAreas() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const transitionRef = useRef<HTMLDivElement>(null);

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
              start: "top 86%",
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
            stagger: 0.012,
            duration: 0.6,
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
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 87%",
              toggleActions: "play none none none",
            },
            delay: (i % 2) * 0.12,
          }
        );
      });

      if (transitionRef.current) fadeIn(transitionRef.current);
    },
    { scope: sectionRef }
  );

  const words = "Core Service Areas".split(" ");

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
            What We Build
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
          className="text-stone-400 type-body max-w-2xl mb-12 md:mb-16"
          style={{ opacity: 0 }}
        >
          Our work centers around designing and engineering systems that support
          scalable revenue operations. Below are the core areas where we
          typically engage.
        </p>

        {/* Service area cards */}
        <div className="flex flex-col gap-4 mb-12 md:mb-16">
          {SERVICE_AREAS.map((area, i) => (
            <div
              key={area.num}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="relative p-6 md:p-8 rounded-sm"
              style={{
                opacity: 0,
                border: area.primary
                  ? `1px solid ${colors.stone[600]}28`
                  : `1px solid ${colors.stone[600]}16`,
                backgroundColor: colors.surface,
              }}
            >
              {/* Left accent */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-sm"
                style={{ backgroundColor: area.color }}
              />

              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 pl-1">
                {/* Number + Title */}
                <div className="md:w-[55%]">
                  <div className="flex items-baseline gap-3 mb-2.5">
                    <span
                      className="font-mono text-xs tracking-[0.2em]"
                      style={{ color: area.color }}
                    >
                      {area.num}
                    </span>
                    {!area.primary && (
                      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-stone-600">
                        Supporting
                      </span>
                    )}
                  </div>
                  <h3
                    className={`font-display type-subheading mb-2 ${
                      area.primary ? "text-chalk" : "text-stone-400"
                    }`}
                  >
                    {area.title}
                  </h3>
                  <p className="text-stone-400 type-small leading-relaxed">
                    {area.desc}
                  </p>
                </div>

                {/* Outcomes */}
                <div className="md:w-[45%] md:pt-6">
                  <p
                    className="font-mono text-[10px] tracking-[0.22em] uppercase mb-3"
                    style={{ color: area.color + "80" }}
                  >
                    Outcome Focus
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {area.outcomes.map((outcome) => (
                      <span
                        key={outcome}
                        className="font-mono text-[11px] px-2.5 py-1 rounded-sm"
                        style={{
                          color: area.color,
                          border: `1px solid ${area.color}30`,
                          backgroundColor: `${area.color}08`,
                        }}
                      >
                        {outcome}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Transition line */}
        <div ref={transitionRef} style={{ opacity: 0 }}>
          <div
            className="h-px mb-6"
            style={{ backgroundColor: `${colors.stone[600]}20` }}
          />
          <p className="text-stone-600 type-small font-mono">
            Each of these service areas is approached as part of a broader
            system — not as isolated tasks or one-off builds.
          </p>
        </div>
      </Container>
    </section>
  );
}
