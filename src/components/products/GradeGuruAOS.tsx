"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";

const E = colors.ember;
const A = colors.accent;

const AOS_LAYERS = [
  {
    num: "01",
    title: "Academic Activity & Learning Layer",
    color: A,
    items: [
      "Teaching, learning, assessment, outcomes",
      "Faculty and student academic interactions",
      "Personalized learning data (where applicable)",
    ],
  },
  {
    num: "02",
    title: "Evidence & Documentation Layer",
    color: colors.accentMuted,
    items: [
      "Structured storage of academic artifacts",
      "Time-bound, versioned evidence records",
      "Continuous documentation instead of retrospective uploads",
    ],
  },
  {
    num: "03",
    title: "Criteria & Metrics Mapping Layer",
    color: E,
    items: [
      "Alignment with NAAC criteria and key indicators",
      "NBA program outcomes — POs and PSOs",
      "NIRF data points and performance indicators",
      "Year-wise continuity and traceability",
    ],
  },
  {
    num: "04",
    title: "Reporting & Intelligence Layer",
    color: colors.stone[400],
    items: [
      "Institution-level and program-level views",
      "Longitudinal performance comparisons",
      "Export-ready summaries for accreditation and ranking submissions",
    ],
  },
];

export function GradeGuruAOS() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const closingRef = useRef<HTMLParagraphElement>(null);

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
      if (closingRef.current) fadeIn(closingRef.current);

      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll(".split-char");
        gsap.fromTo(chars, { y: "110%", opacity: 0 }, {
          y: "0%", opacity: 1, stagger: 0.01, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: headlineRef.current, start: "top 85%", toggleActions: "play none none none" },
        });
      }

      layerRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el, { opacity: 0, y: 32 }, {
          opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 87%", toggleActions: "play none none none" },
          delay: (i % 2) * 0.12,
        });
      });
    },
    { scope: sectionRef }
  );

  const words = "An Academic Operating System Aligned to NAAC, NBA & NIRF".split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32"
      style={{ borderTop: `1px solid ${colors.stone[600]}18` }}
    >
      <Container>
        <div ref={labelRef} className="mb-5 flex items-center gap-3" style={{ opacity: 0 }}>
          <span className="font-mono text-xs tracking-[0.28em] uppercase" style={{ color: colors.stone[600] }}>
            Academic Operating System
          </span>
          <span className="text-stone-600 font-mono text-xs">/</span>
          <span
            className="font-mono text-xs tracking-[0.22em] uppercase"
            style={{ color: E }}
          >
            AOS
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
          The LMS alone cannot support accreditation readiness. The Academic
          Operating System builds on LMS data to create a{" "}
          <span className="text-chalk">compliance-ready academic backbone</span>{" "}
          — structured around NAAC, NBA, and NIRF framework requirements.
        </p>

        {/* AOS layers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-8 md:mb-10">
          {AOS_LAYERS.map((layer, i) => (
            <div
              key={layer.num}
              ref={(el) => { layerRefs.current[i] = el; }}
              className="relative p-7 md:p-8 rounded-sm"
              style={{
                opacity: 0,
                border: `1px solid ${layer.color}22`,
                backgroundColor: colors.surface,
              }}
            >
              {/* Left accent */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-sm"
                style={{ backgroundColor: layer.color }}
              />

              {/* Large background number */}
              <div
                className="absolute top-4 right-4 font-display select-none pointer-events-none"
                style={{
                  fontSize: "3.5rem",
                  lineHeight: 1,
                  color: `${layer.color}08`,
                  letterSpacing: "-0.03em",
                }}
              >
                {layer.num}
              </div>

              <div className="flex items-center gap-2.5 mb-4">
                <span
                  className="font-mono text-xs tracking-[0.2em]"
                  style={{ color: layer.color }}
                >
                  {layer.num}
                </span>
                <div className="h-px w-4" style={{ backgroundColor: `${layer.color}30` }} />
              </div>

              <h3
                className="font-display text-chalk mb-4"
                style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)" }}
              >
                {layer.title}
              </h3>

              <ul className="space-y-2.5">
                {layer.items.map((item, ii) => (
                  <li key={ii} className="flex items-start gap-2.5 type-small text-stone-400">
                    <span
                      className="mt-[7px] shrink-0 w-[5px] h-[5px] rounded-full"
                      style={{ backgroundColor: `${layer.color}70` }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p
          ref={closingRef}
          className="font-display text-base md:text-lg"
          style={{ color: E, opacity: 0 }}
        >
          Accreditation frameworks are treated as system constraints, not afterthoughts.
        </p>
      </Container>
    </section>
  );
}
