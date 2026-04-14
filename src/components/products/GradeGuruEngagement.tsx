"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";

const E = colors.ember;
const A = colors.accent;

const STEPS = [
  {
    num: "01",
    title: "Discovery Conversation",
    desc: "We begin with a structured call to understand your institution's accreditation status, current data systems, and upcoming submission timelines.",
    color: A,
  },
  {
    num: "02",
    title: "Institutional Workflow Assessment",
    desc: "A brief audit of how academic data is currently captured and stored — identifying where GRADEguru can integrate most effectively.",
    color: A,
  },
  {
    num: "03",
    title: "Pilot Scope Definition",
    desc: "Together, we define a focused pilot — typically one department or program — with clear success criteria and a realistic timeline.",
    color: E,
  },
  {
    num: "04",
    title: "Configured Pilot Deployment",
    desc: "GRADEguru is configured to your institution's structure and deployed for the pilot scope. Onboarding is collaborative, not a handoff.",
    color: E,
  },
  {
    num: "05",
    title: "Review & Expansion Decision",
    desc: "After the pilot period, we review outcomes together. Expansion to additional departments or modules is based on demonstrated value.",
    color: E,
  },
];

export function GradeGuruEngagement() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const noteRef = useRef<HTMLDivElement>(null);

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
      if (noteRef.current) fadeIn(noteRef.current);

      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll(".split-char");
        gsap.fromTo(chars, { y: "110%", opacity: 0 }, {
          y: "0%", opacity: 1, stagger: 0.01, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: headlineRef.current, start: "top 85%", toggleActions: "play none none none" },
        });
      }

      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el, { opacity: 0, y: 28 }, {
          opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });
    },
    { scope: sectionRef }
  );

  const words = "Collaborative, Pilot-First Institutional Engagement".split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32"
      style={{ borderTop: `1px solid ${colors.stone[600]}18` }}
    >
      <Container>
        <div ref={labelRef} className="mb-5" style={{ opacity: 0 }}>
          <span className="font-mono text-xs tracking-[0.28em] uppercase" style={{ color: colors.stone[600] }}>
            How We Work
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
          className="text-stone-400 type-body leading-relaxed max-w-2xl mb-12 md:mb-14"
          style={{ opacity: 0 }}
        >
          GRADEguru is not sold as an off-the-shelf product. Every engagement begins
          with understanding your institution before configuration begins.
          This is a{" "}
          <span className="text-chalk">long-term partnership model</span>, not a
          software license transaction.
        </p>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="absolute left-[1.75rem] top-10 bottom-10 w-px hidden md:block"
            style={{ backgroundColor: `${colors.stone[600]}20` }}
          />

          <div className="space-y-4 md:space-y-5">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => { stepRefs.current[i] = el; }}
                className="relative flex gap-5 md:gap-7 p-6 md:p-7 rounded-sm"
                style={{
                  opacity: 0,
                  border: `1px solid ${step.color}1a`,
                  backgroundColor: colors.surface,
                }}
              >
                {/* Step number circle */}
                <div
                  className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center relative z-10"
                  style={{
                    border: `1px solid ${step.color}40`,
                    backgroundColor: `${step.color}0c`,
                  }}
                >
                  <span
                    className="font-mono text-[10px]"
                    style={{ color: step.color }}
                  >
                    {step.num}
                  </span>
                </div>

                <div className="flex-1 pt-0.5">
                  <h3
                    className="text-chalk font-medium mb-2"
                    style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-stone-400 type-small leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing note */}
        <div
          ref={noteRef}
          className="mt-10 md:mt-12 flex items-start gap-4 p-6 rounded-sm"
          style={{
            border: `1px solid ${A}22`,
            backgroundColor: `${A}06`,
            opacity: 0,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
            style={{ backgroundColor: A, animation: "pulse-live 2s infinite" }}
          />
          <p className="text-stone-400 type-small leading-relaxed">
            GRADEguru is currently in{" "}
            <span className="text-chalk">active pilot with select institutions</span>.
            Institutions interested in the next cohort can begin with a discovery
            conversation — there is no commitment at that stage.
          </p>
        </div>
      </Container>
    </section>
  );
}
