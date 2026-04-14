"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";

const STEPS = [
  {
    num: "01",
    title: "Discovery & System Diagnosis",
    intro:
      "Every engagement starts with a focused discovery call. During this phase, we:",
    items: [
      "Understand your business goals and constraints",
      "Map existing sales, marketing, and operational workflows",
      "Identify conversion bottlenecks and manual friction",
      "Assess data quality and system readiness",
    ],
    close: "The output is clarity, not a rushed proposal.",
    color: colors.accent,
  },
  {
    num: "02",
    title: "System Design & Architecture",
    intro:
      "Based on the diagnosis, we design a system architecture tailored to your reality. This typically includes:",
    items: [
      "Workflow and automation design",
      "Integration planning across tools",
      "AI application scoping (where appropriate)",
      "Clear implementation priorities",
    ],
    close: "Nothing is built until the system makes sense on paper.",
    color: colors.accentMuted,
  },
  {
    num: "03",
    title: "Build, Integrate & Optimize",
    intro:
      "Once the system is designed, we engineer and integrate it into your existing stack. This phase focuses on:",
    items: [
      "Reliability over speed",
      "Clean integrations and data flow",
      "Gradual rollout and validation",
      "Continuous refinement based on real usage",
    ],
    close: "Systems are designed to evolve as your business grows.",
    color: colors.ember,
  },
];

const DIFFERENTIATORS = [
  "We don't sell pre-packaged solutions",
  "We don't jump straight into development",
  "We don't optimize for short-term hacks",
];

export function ServicesPageProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
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

      stepRefs.current.forEach((step, i) => {
        if (!step) return;
        gsap.fromTo(
          step,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 87%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      if (diffRef.current) fadeIn(diffRef.current);
      if (ctaRef.current) fadeIn(ctaRef.current);
    },
    { scope: sectionRef }
  );

  const words = "A Structured, Consultative Engagement Model".split(" ");

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
            How It Works
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
          We don&apos;t start by building. Every engagement begins with
          understanding how your systems, teams, and revenue workflows actually
          operate. From there, we design and engineer solutions intended to
          scale with your business — not just solve today&apos;s problems.
        </p>

        {/* Steps */}
        <div className="flex flex-col gap-5 mb-10 md:mb-14">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="relative p-7 md:p-8 rounded-sm"
              style={{
                opacity: 0,
                border: `1px solid ${step.color}22`,
                backgroundColor: colors.surface,
              }}
            >
              {/* Left accent */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-sm"
                style={{ backgroundColor: step.color }}
              />

              {/* Step indicator */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="font-mono text-2xl md:text-3xl font-bold"
                  style={{ color: step.color }}
                >
                  {step.num}
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ backgroundColor: `${step.color}20` }}
                />
              </div>

              <h3 className="font-display type-subheading text-chalk mb-3">
                {step.title}
              </h3>

              <p className="text-stone-400 type-small mb-3">{step.intro}</p>

              <ul className="space-y-2 mb-4">
                {step.items.map((item, ii) => (
                  <li
                    key={ii}
                    className="flex items-start gap-3 type-small text-stone-400"
                  >
                    <span
                      className="mt-[6px] shrink-0 w-1 h-1 rounded-full"
                      style={{ backgroundColor: step.color }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <p
                className="type-small font-medium"
                style={{ color: step.color }}
              >
                {step.close}
              </p>
            </div>
          ))}
        </div>

        {/* What makes this different */}
        <div
          ref={diffRef}
          className="p-6 md:p-8 rounded-sm mb-10 md:mb-14"
          style={{
            opacity: 0,
            border: `1px solid ${colors.stone[600]}20`,
            backgroundColor: `${colors.accent}05`,
          }}
        >
          <p
            className="font-mono text-[10px] tracking-[0.22em] uppercase mb-4"
            style={{ color: colors.accent }}
          >
            What Makes This Approach Different
          </p>
          <ul className="space-y-2.5 mb-4">
            {DIFFERENTIATORS.map((d, di) => (
              <li
                key={di}
                className="flex items-start gap-3 type-small text-stone-400"
              >
                <span
                  className="mt-[6px] shrink-0 w-1 h-1 rounded-full"
                  style={{ backgroundColor: colors.accent }}
                />
                {d}
              </li>
            ))}
          </ul>
          <p className="text-chalk type-small font-medium">
            Our focus is on durable systems that support long-term performance.
          </p>
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row sm:items-center gap-4"
          style={{ opacity: 0 }}
        >
          <Button variant="primary" href="/contact">
            Discuss Automation
          </Button>
          <p className="text-stone-600 type-small">
            Every engagement begins with a discovery conversation.
          </p>
        </div>
      </Container>
    </section>
  );
}
