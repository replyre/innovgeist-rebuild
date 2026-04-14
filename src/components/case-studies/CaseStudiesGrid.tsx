"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";
import { CASE_STUDY_LIST } from "@/lib/case-studies";

export function CaseStudiesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bridgeRef = useRef<HTMLParagraphElement>(null);
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
            duration: 0.75,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      };

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const col = i % 2;
        gsap.fromTo(
          card,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: col * 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      if (bridgeRef.current) fadeIn(bridgeRef.current);
      if (ctaRef.current) fadeIn(ctaRef.current, 0.1);
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-12 md:py-16 pb-24 md:pb-32">
      <Container>
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-16 md:mb-20">
          {CASE_STUDY_LIST.map((cs, i) => (
            <div
              key={cs.slug}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="group relative flex flex-col rounded-sm overflow-hidden"
              style={{
                opacity: 0,
                border: `1px solid ${cs.available ? cs.color + "28" : colors.stone[600] + "20"}`,
                backgroundColor: colors.surface,
              }}
            >
              {/* Top accent bar */}
              <div
                className="h-[2px] w-full"
                style={{
                  backgroundColor: cs.available ? cs.color : colors.stone[600] + "60",
                }}
              />

              <div className="flex flex-col flex-1 p-7 md:p-8">
                {/* Context */}
                <p
                  className="font-mono text-[10px] tracking-[0.22em] uppercase mb-4"
                  style={{ color: cs.available ? cs.color + "90" : colors.stone[600] }}
                >
                  {cs.context}
                </p>

                {/* Title */}
                <h2
                  className={`font-display mb-3 leading-snug transition-colors duration-300 ${
                    cs.available
                      ? "text-chalk group-hover:text-accent"
                      : "text-stone-400"
                  }`}
                  style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}
                >
                  {cs.title}
                </h2>

                {/* Summary */}
                <p className="text-stone-400 type-small leading-relaxed mb-6 flex-1">
                  {cs.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {cs.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] tracking-[0.15em] px-2.5 py-1 rounded-sm"
                      style={{
                        color: cs.available ? cs.color : colors.stone[600],
                        border: `1px solid ${cs.available ? cs.color + "28" : colors.stone[600] + "25"}`,
                        backgroundColor: cs.available
                          ? `${cs.color}06`
                          : "transparent",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer link */}
                <div
                  className="pt-4"
                  style={{ borderTop: `1px solid ${colors.stone[600]}20` }}
                >
                  {cs.available ? (
                    <a
                      href={`/case-studies/${cs.slug}`}
                      className="inline-flex items-center gap-2 font-mono text-xs transition-all duration-300"
                      style={{ color: cs.color }}
                    >
                      View Case Study
                      <svg
                        width={12}
                        height={12}
                        viewBox="0 0 12 12"
                        fill="none"
                        className="transition-transform duration-300 group-hover:translate-x-1"
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
                  ) : (
                    <span
                      className="font-mono text-xs"
                      style={{ color: colors.stone[600] }}
                    >
                      Details Available Soon
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bridge + CTA */}
        <div
          className="pt-10 md:pt-12"
          style={{ borderTop: `1px solid ${colors.stone[600]}18` }}
        >
          <p
            ref={bridgeRef}
            className="text-stone-600 type-small font-mono max-w-2xl mb-6"
            style={{ opacity: 0 }}
          >
            Each case highlights a different context, but the same underlying
            approach: understand the system, design deliberately, and build for
            long-term use.
          </p>

          <div ref={ctaRef} style={{ opacity: 0 }}>
            <p className="text-stone-400 type-small mb-3">
              Interested in discussing a similar system?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 font-mono text-sm transition-colors duration-300"
              style={{ color: colors.accent }}
            >
              Discuss Automation
              <svg width={14} height={14} viewBox="0 0 12 12" fill="none">
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
      </Container>
    </section>
  );
}
