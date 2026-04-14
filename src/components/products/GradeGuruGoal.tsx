"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";

const E = colors.ember;

const PRINCIPLES = [
  "Academic data captured as activities happen",
  "Evidence structured against defined accreditation criteria",
  "Metrics tracked year-over-year, not per cycle",
  "Reports generated from validated system records, not ad-hoc documents",
  "Reduced dependency on manual data compilation",
];

export function GradeGuruGoal() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const calloutRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const fadeIn = (el: HTMLElement, delay = 0) =>
        gsap.fromTo(el, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.7, delay, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", toggleActions: "play none none none" },
        });

      if (labelRef.current) fadeIn(labelRef.current);
      if (calloutRef.current) fadeIn(calloutRef.current, 0.05);
      if (principlesRef.current) fadeIn(principlesRef.current, 0.08);

      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll(".split-char");
        gsap.fromTo(chars, { y: "110%", opacity: 0 }, {
          y: "0%", opacity: 1, stagger: 0.01, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: headlineRef.current, start: "top 85%", toggleActions: "play none none none" },
        });
      }
    },
    { scope: sectionRef }
  );

  const words = "From Last-Minute Reporting to Continuous Readiness".split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32"
      style={{ borderTop: `1px solid ${colors.stone[600]}18` }}
    >
      <Container>
        <div ref={labelRef} className="mb-5" style={{ opacity: 0 }}>
          <span className="font-mono text-xs tracking-[0.28em] uppercase" style={{ color: colors.stone[600] }}>
            Core Principle
          </span>
        </div>

        <div ref={headlineRef} className="mb-10 max-w-3xl">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: core principle callout */}
          <div ref={calloutRef} style={{ opacity: 0 }}>
            <div
              className="p-7 md:p-8 rounded-sm mb-5"
              style={{
                border: `1px solid ${E}28`,
                backgroundColor: `${E}07`,
              }}
            >
              <p
                className="font-mono text-[10px] tracking-[0.22em] uppercase mb-4"
                style={{ color: E }}
              >
                GRADEguru is built around a simple but powerful idea
              </p>
              <p
                className="font-display text-chalk leading-snug"
                style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)" }}
              >
                If academic data is structured correctly during everyday operations,
                accreditation and ranking reports should be a{" "}
                <span style={{ color: E }}>by-product</span> — not a separate project.
              </p>
            </div>
            <p className="text-stone-400 type-small leading-relaxed">
              Instead of building software just to generate reports, GRADEguru
              embeds accreditation intelligence directly into academic workflows.
            </p>
          </div>

          {/* Right: what report-ready by design means */}
          <div ref={principlesRef} style={{ opacity: 0 }}>
            <div
              className="p-6 md:p-7 rounded-sm"
              style={{
                border: `1px solid ${colors.stone[600]}22`,
                backgroundColor: colors.surface,
              }}
            >
              <p
                className="font-mono text-[10px] tracking-[0.22em] uppercase mb-5"
                style={{ color: `${E}80` }}
              >
                What "Report-Ready by Design" Means
              </p>
              <ul className="space-y-3.5">
                {PRINCIPLES.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 type-small text-stone-400">
                    <span
                      className="mt-[7px] shrink-0 w-1 h-1 rounded-full"
                      style={{ backgroundColor: E }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
