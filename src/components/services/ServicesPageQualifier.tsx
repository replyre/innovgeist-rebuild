"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";

const FIT_LIST = [
  "Are a 7–8 figure business (or scaling toward it)",
  "Have an active sales process with real lead volume",
  "Struggle with conversion consistency",
  "Rely on manual follow-ups, handoffs, or reporting",
  "Use multiple tools that don't integrate cleanly",
  "Want long-term systems, not short-term fixes",
  "Prefer a behind-the-scenes technical partner over a public-facing agency",
];

const NOT_FIT_LIST = [
  "Are looking for a simple website or app build",
  "Need ad management, content, or branding services",
  "Want a fixed-price, one-off development project",
  "Are still experimenting with basic product–market fit",
  "Expect quick wins without process or system changes",
];

export function ServicesPageQualifier() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const fadeIn = (
        el: HTMLElement,
        delay = 0
      ) => {
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

      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftColRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rightColRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (closingRef.current) fadeIn(closingRef.current);
    },
    { scope: sectionRef }
  );

  const words = "Designed for Teams That Take Systems Seriously".split(" ");

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
            Who This Is For
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
          Our services are built for businesses where growth is constrained by
          systems and execution — not by demand.
        </p>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-12 md:mb-16">
          {/* Left: Strong Fit */}
          <div
            ref={leftColRef}
            className="p-7 md:p-9 rounded-sm"
            style={{
              opacity: 0,
              border: `1px solid ${colors.accent}25`,
              backgroundColor: colors.surface,
            }}
          >
            <div className="flex items-center gap-2.5 mb-6">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: colors.accent }}
              />
              <span
                className="font-mono text-[11px] tracking-[0.22em] uppercase"
                style={{ color: colors.accent }}
              >
                Strong Fit
              </span>
            </div>

            <p className="text-chalk type-body font-medium mb-5">
              This Is a Strong Fit If You…
            </p>

            <ul className="space-y-3.5">
              {FIT_LIST.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-stone-400 type-small"
                >
                  <span
                    className="mt-[6px] shrink-0 w-1 h-1 rounded-full"
                    style={{ backgroundColor: colors.accent }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Not a Fit */}
          <div
            ref={rightColRef}
            className="p-7 md:p-9 rounded-sm"
            style={{
              opacity: 0,
              border: `1px solid ${colors.stone[600]}28`,
              backgroundColor: colors.surface,
            }}
          >
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-600" />
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-stone-600">
                Probably Not a Fit
              </span>
            </div>

            <p className="text-chalk type-body font-medium mb-5">
              This Is Probably Not a Fit If You…
            </p>

            <ul className="space-y-3.5">
              {NOT_FIT_LIST.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-stone-400 type-small"
                >
                  <span className="mt-[3px] shrink-0 font-mono text-stone-600 text-xs leading-none">
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-6 type-small text-stone-600 italic">
              This is not negative — it&apos;s clarity.
            </p>
          </div>
        </div>

        {/* Closing line */}
        <p
          ref={closingRef}
          className="font-display text-base md:text-lg"
          style={{ color: colors.accent, opacity: 0 }}
        >
          We work best with teams that view systems as strategic assets — not
          just tools.
        </p>
      </Container>
    </section>
  );
}
