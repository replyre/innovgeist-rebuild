"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";

const E = colors.ember;
const A = colors.accent;

const BEST_FIT = [
  "Colleges and universities preparing for NAAC, NBA, or NIRF cycles",
  "Institutions that want to move from retrospective reporting to continuous readiness",
  "Academic leadership looking to reduce faculty and admin burden during accreditation",
  "Institutions open to a collaborative, pilot-first engagement model",
  "Organizations willing to structure academic data as a long-term institutional asset",
];

const NOT_POSITIONED_FOR = [
  "Institutions looking for a quick-fix report generator without workflow change",
  "Organizations that want a fully automated, hands-off accreditation solution",
  "Schools needing immediate deployment with no configuration or onboarding period",
  "Institutions not open to restructuring existing academic data workflows",
];

export function GradeGuruQualifier() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const fitRef = useRef<HTMLDivElement>(null);
  const notRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const fadeIn = (el: HTMLElement, delay = 0) =>
        gsap.fromTo(el, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.7, delay, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", toggleActions: "play none none none" },
        });

      if (labelRef.current) fadeIn(labelRef.current);

      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll(".split-char");
        gsap.fromTo(chars, { y: "110%", opacity: 0 }, {
          y: "0%", opacity: 1, stagger: 0.01, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: headlineRef.current, start: "top 85%", toggleActions: "play none none none" },
        });
      }

      if (fitRef.current) fadeIn(fitRef.current, 0.05);
      if (notRef.current) fadeIn(notRef.current, 0.12);
    },
    { scope: sectionRef }
  );

  const words = "Who GRADEguru Is Designed For".split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32"
      style={{ borderTop: `1px solid ${colors.stone[600]}18` }}
    >
      <Container>
        <div ref={labelRef} className="mb-5" style={{ opacity: 0 }}>
          <span className="font-mono text-xs tracking-[0.28em] uppercase" style={{ color: colors.stone[600] }}>
            Institutional Fit
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Best fit */}
          <div
            ref={fitRef}
            className="p-7 md:p-8 rounded-sm"
            style={{
              border: `1px solid ${A}28`,
              backgroundColor: `${A}06`,
              opacity: 0,
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${A}18`, border: `1px solid ${A}40` }}
              >
                <span
                  className="block w-2 h-2 rounded-full"
                  style={{ backgroundColor: A }}
                />
              </span>
              <span
                className="font-mono text-[10px] tracking-[0.22em] uppercase"
                style={{ color: A }}
              >
                Best Fit Institutions
              </span>
            </div>
            <ul className="space-y-4">
              {BEST_FIT.map((item, i) => (
                <li key={i} className="flex items-start gap-3 type-small text-stone-300">
                  <span
                    className="mt-[7px] shrink-0 w-1 h-1 rounded-full"
                    style={{ backgroundColor: A }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Not positioned for */}
          <div
            ref={notRef}
            className="p-7 md:p-8 rounded-sm"
            style={{
              border: `1px solid ${colors.stone[600]}22`,
              backgroundColor: colors.surface,
              opacity: 0,
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span
                className="w-5 h-5 rounded-sm flex items-center justify-center shrink-0"
                style={{ border: `1px solid ${colors.stone[600]}50` }}
              >
                <span
                  className="block w-2 h-[1.5px]"
                  style={{ backgroundColor: colors.stone[600] }}
                />
              </span>
              <span
                className="font-mono text-[10px] tracking-[0.22em] uppercase"
                style={{ color: colors.stone[600] }}
              >
                Not Currently Positioned For
              </span>
            </div>
            <ul className="space-y-4">
              {NOT_POSITIONED_FOR.map((item, i) => (
                <li key={i} className="flex items-start gap-3 type-small text-stone-500">
                  <span
                    className="mt-[7px] shrink-0 w-1 h-1 rounded-sm"
                    style={{ backgroundColor: colors.stone[600] }}
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div
              className="mt-6 pt-5"
              style={{ borderTop: `1px solid ${colors.stone[600]}20` }}
            >
              <p className="type-small text-stone-500 leading-relaxed">
                If the fit is unclear,{" "}
                <a
                  href="/contact"
                  className="transition-colors duration-200"
                  style={{ color: E }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  a brief discovery conversation
                </a>{" "}
                can help determine whether GRADEguru is the right starting point for your institution.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
