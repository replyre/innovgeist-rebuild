"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";

const A = colors.accent;

const CAPABILITIES = [
  {
    title: "Personalized Learning Structures",
    desc: "Support for varied learning paths, pacing, and outcomes — designed around how students actually progress.",
  },
  {
    title: "Assessment & Feedback Integration",
    desc: "Academic activities linked to measurable learning outcomes, with feedback loops that inform future instruction.",
  },
  {
    title: "Faculty-Centric Academic Workflows",
    desc: "Designed around how educators plan, deliver, and assess learning — not how software vendors think they should.",
  },
  {
    title: "Student Progress Visibility",
    desc: "Clear views of engagement, progress, and academic patterns that enable timely intervention.",
  },
  {
    title: "Scoped AI-Assisted Insights",
    desc: "Early AI support for identifying engagement signals and learning gaps — grounded in real usage data.",
  },
];

export function GradeGuruLMS() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const noteRef = useRef<HTMLParagraphElement>(null);

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
      if (statusRef.current) fadeIn(statusRef.current, 0.08);
      if (noteRef.current) fadeIn(noteRef.current);

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
          opacity: 1, y: 0, duration: 0.7, delay: (i % 2) * 0.12, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none none" },
        });
      });
    },
    { scope: sectionRef }
  );

  const words = "AI-Integrated LMS Focused on Personalized Learning".split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32"
      style={{ borderTop: `1px solid ${colors.stone[600]}18` }}
    >
      <Container>
        <div ref={labelRef} className="mb-5 flex items-center gap-3" style={{ opacity: 0 }}>
          <span className="font-mono text-xs tracking-[0.28em] uppercase" style={{ color: colors.stone[600] }}>
            GRADEguru Today
          </span>
          <span className="text-stone-600 font-mono text-xs">/</span>
          <span className="font-mono text-xs tracking-[0.22em] uppercase" style={{ color: A }}>
            LMS
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

        {/* Live status banner */}
        <div
          ref={statusRef}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-sm mb-6"
          style={{
            border: `1px solid ${A}30`,
            backgroundColor: `${A}09`,
            opacity: 0,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: A, animation: "pulse-live 2s infinite" }}
          />
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: A }}>
            Live in Pilot with Select Institutions
          </span>
        </div>

        <p
          ref={introRef}
          className="text-stone-400 type-body leading-relaxed max-w-2xl mb-10 md:mb-12"
          style={{ opacity: 0 }}
        >
          In GRADEguru, the LMS is not positioned as a standalone teaching tool.
          It functions as the{" "}
          <span className="text-chalk">primary academic activity capture layer</span>{" "}
          — feeding structured data directly into accreditation-aligned evidence and metrics.
        </p>

        {/* Capabilities grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-8 md:mb-10">
          {CAPABILITIES.map((cap, i) => (
            <div
              key={cap.title}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`relative p-6 rounded-sm ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
              style={{
                opacity: 0,
                border: `1px solid ${A}20`,
                backgroundColor: colors.surface,
              }}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-sm"
                style={{ backgroundColor: A }}
              />
              <h3
                className="text-chalk font-medium mb-2 pl-1"
                style={{ fontSize: "clamp(0.875rem, 1.4vw, 1rem)" }}
              >
                {cap.title}
              </h3>
              <p className="text-stone-400 type-small leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>

        <p
          ref={noteRef}
          className="font-mono text-[11px] text-stone-600"
          style={{ opacity: 0 }}
        >
          LMS data feeds directly into accreditation-aligned evidence and metrics.
        </p>
      </Container>
    </section>
  );
}
