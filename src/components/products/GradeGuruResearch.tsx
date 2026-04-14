"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";

const E = colors.ember;

const RESEARCH_INPUTS = [
  {
    num: "01",
    title: "Direct Faculty Interviews",
    desc: "Structured conversations with faculty across disciplines to understand how academic work actually gets done — not how it is assumed to happen.",
  },
  {
    num: "02",
    title: "Accreditation Officer Workflow Mapping",
    desc: "Deep-dives with the staff responsible for NAAC, NBA, and NIRF submissions — documenting every step of their current process.",
  },
  {
    num: "03",
    title: "Existing Data System Audits",
    desc: "Analysis of what institutions currently use — LMS platforms, spreadsheets, ERPs — and where the gaps in structured data appear.",
  },
  {
    num: "04",
    title: "Framework Requirements Analysis",
    desc: "Granular mapping of NAAC criteria, NBA program outcomes, and NIRF data points to identify what structured data each framework requires.",
  },
  {
    num: "05",
    title: "Pilot Institution Feedback Loops",
    desc: "Continuous input from institutions running GRADEguru in active pilot — validating assumptions against real usage in real academic environments.",
  },
];

export function GradeGuruResearch() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const closingRef = useRef<HTMLDivElement>(null);

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

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el, { opacity: 0, x: -20 }, {
          opacity: 1, x: 0, duration: 0.65, delay: i * 0.08, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });
    },
    { scope: sectionRef }
  );

  const words = "Built Through Institutional Research & Real Pilots".split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32"
      style={{ borderTop: `1px solid ${colors.stone[600]}18` }}
    >
      <Container>
        <div ref={labelRef} className="mb-5" style={{ opacity: 0 }}>
          <span className="font-mono text-xs tracking-[0.28em] uppercase" style={{ color: colors.stone[600] }}>
            Foundation
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: headline + intro */}
          <div>
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

            <p
              ref={introRef}
              className="text-stone-400 type-body leading-relaxed mb-6"
              style={{ opacity: 0 }}
            >
              GRADEguru is not built from assumptions about how higher education institutions
              work. Every product decision traces back to direct research with faculty,
              administrators, and accreditation staff at Indian colleges and universities.
            </p>

            <div
              ref={closingRef}
              className="p-6 rounded-sm"
              style={{
                border: `1px solid ${E}28`,
                backgroundColor: `${E}07`,
                opacity: 0,
              }}
            >
              <p className="font-display" style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", color: E }}>
                Research continues throughout development — pilot feedback directly shapes
                each product release.
              </p>
            </div>
          </div>

          {/* Right: research inputs list */}
          <div className="space-y-4">
            {RESEARCH_INPUTS.map((item, i) => (
              <div
                key={item.num}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="flex gap-5 p-5 rounded-sm"
                style={{
                  opacity: 0,
                  border: `1px solid ${colors.stone[600]}18`,
                  backgroundColor: colors.surface,
                }}
              >
                <span
                  className="font-mono text-xs shrink-0 mt-0.5"
                  style={{ color: `${E}70`, letterSpacing: "0.1em" }}
                >
                  {item.num}
                </span>
                <div>
                  <h3
                    className="text-chalk font-medium mb-1.5"
                    style={{ fontSize: "clamp(0.875rem, 1.3vw, 0.9375rem)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-stone-400 type-small leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
