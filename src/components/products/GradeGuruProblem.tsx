"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";

const E = colors.ember;

const CHALLENGES = [
  "Academic and assessment data scattered across departments",
  "Manual compilation of evidence for NAAC / NBA / NIRF submissions",
  "Difficulty mapping routine academic work to framework criteria",
  "No year-over-year continuity of structured data",
  "Heavy faculty and administrative workload during submission cycles",
];

export function GradeGuruProblem() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const challengeRefs = useRef<(HTMLLIElement | null)[]>([]);
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
      if (bodyRef.current) fadeIn(bodyRef.current, 0.05);

      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll(".split-char");
        gsap.fromTo(chars, { y: "110%", opacity: 0 }, {
          y: "0%", opacity: 1, stagger: 0.01, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: headlineRef.current, start: "top 85%", toggleActions: "play none none none" },
        });
      }

      challengeRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el, { opacity: 0, x: -16 }, {
          opacity: 1, x: 0, duration: 0.6, delay: i * 0.07, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });

      if (closingRef.current) fadeIn(closingRef.current);
    },
    { scope: sectionRef }
  );

  const words = "Why Accreditation & Ranking Reporting Becomes a Crisis".split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32"
      style={{ borderTop: `1px solid ${colors.stone[600]}18` }}
    >
      <Container>
        <div ref={labelRef} className="mb-5" style={{ opacity: 0 }}>
          <span className="font-mono text-xs tracking-[0.28em] uppercase" style={{ color: colors.stone[600] }}>
            The Problem
          </span>
        </div>

        <div ref={headlineRef} className="mb-6">
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
          {/* Left: context paragraphs */}
          <div ref={bodyRef} style={{ opacity: 0 }}>
            <p className="text-stone-400 type-body leading-relaxed mb-5">
              In most institutions, accreditation and ranking exercises turn into
              last-minute, high-pressure projects — not because data is missing,
              but because it is fragmented across departments, tools, and formats.
            </p>
            <p className="text-stone-400 type-body leading-relaxed">
              Academic activities happen continuously, but reporting systems are
              disconnected from day-to-day operations. As a result, institutions
              rely on spreadsheets, manual evidence collection, and retrospective
              mapping close to deadlines.
            </p>
          </div>

          {/* Right: challenges list */}
          <div>
            <p
              className="font-mono text-[10px] tracking-[0.22em] uppercase mb-5"
              style={{ color: `${E}80` }}
            >
              Common Institutional Challenges
            </p>
            <ul className="space-y-3.5">
              {CHALLENGES.map((item, i) => (
                <li
                  key={i}
                  ref={(el) => { challengeRefs.current[i] = el; }}
                  className="flex items-start gap-3 type-small text-stone-400"
                  style={{ opacity: 0 }}
                >
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

        {/* Closing statement */}
        <div
          className="mt-10 md:mt-12 pt-8 md:pt-10"
          style={{ borderTop: `1px solid ${colors.stone[600]}18` }}
        >
          <p
            ref={closingRef}
            className="font-display text-base md:text-lg"
            style={{ color: E, opacity: 0 }}
          >
            Accreditation becomes an event, instead of an outcome of well-designed systems.
          </p>
        </div>
      </Container>
    </section>
  );
}
