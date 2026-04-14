"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { ProblemTetris } from "./ProblemTetris";

const PROBLEMS = [
  {
    keyword: "LEAK",
    title: "Leads Don't Convert Consistently",
    color: "#2DD4BF",
    desc: "Marketing generates interest, but follow-ups are manual, delayed, or inconsistent\u2014causing revenue leakage across the funnel.",
    progressStart: 0.08,
    progressEnd: 0.18,
  },
  {
    keyword: "BUSY",
    title: "Sales Teams Are Buried in Manual Work",
    color: "#F59E0B",
    desc: "Reps spend more time updating tools, tracking leads, and coordinating internally than actually closing deals.",
    progressStart: 0.24,
    progressEnd: 0.36,
  },
  {
    keyword: "SILO",
    title: "Tools Don't Talk to Each Other",
    color: "#14B8A6",
    desc: "CRMs, marketing platforms, and internal tools operate in silos\u2014creating fragmented data and broken workflows.",
    progressStart: 0.42,
    progressEnd: 0.54,
  },
  {
    keyword: "BLIND",
    title: "No Clear Visibility Into What's Driving Revenue",
    color: "#FF5F57",
    desc: "Founders and leaders lack a real-time view of what\u2019s working, what\u2019s not, and where bottlenecks actually exist.",
    progressStart: 0.615,
    progressEnd: 0.73,
  },
];

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<number>(0);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLParagraphElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const mobileGameOverRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isMobile } = context.conditions!;
          const scrollEnd = isMobile ? "+=250%" : "+=300%";

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: scrollEnd,
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              onUpdate: (self) => {
                progressRef.current = self.progress;
              },
            },
          });

          // Headline reveal — fires early as section enters viewport
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
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          // Subtext fade — fires early as section enters viewport
          if (subtextRef.current) {
            gsap.fromTo(
              subtextRef.current,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: subtextRef.current,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          // Content area fade in (0.00 - 0.03)
          if (contentRef.current) {
            tl.fromTo(
              contentRef.current,
              { opacity: 0 },
              { opacity: 1, duration: 0.03 },
              0.00
            );
          }

          // Card animations
          PROBLEMS.forEach((problem, i) => {
            const card = cardRefs.current[i];
            if (!card) return;

            // Fade in current card
            tl.fromTo(
              card,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.06 },
              problem.progressStart
            );

            // Dim previous card
            if (!isMobile && i > 0) {
              const prevCard = cardRefs.current[i - 1];
              if (prevCard) {
                tl.to(prevCard, { opacity: 0.25, duration: 0.04 }, problem.progressStart);
              }
            }
          });

          // Auto-scroll card container (on both mobile and desktop)
          if (cardContainerRef.current) {
            const container = cardContainerRef.current;
            const scrollProxy = { scroll: 0 };

            PROBLEMS.forEach((problem, i) => {
              if (i === 0) return;
              const card = cardRefs.current[i];
              if (!card) return;

              tl.to(scrollProxy, {
                scroll: () => Math.max(0, card.offsetTop + card.offsetHeight - container.clientHeight + 16),
                duration: 0.06,
                ease: "none",
                onUpdate: () => {
                  container.scrollTop = scrollProxy.scroll;
                },
              }, problem.progressStart);
            });
          }

          // Dim last card before closing
          if (!isMobile) {
            const lastCard = cardRefs.current[3];
            if (lastCard) {
              tl.to(lastCard, { opacity: 0.25, duration: 0.04 }, 0.76);
            }
          }

          // Mobile game-over overlay (0.86 - 0.90)
          if (isMobile && mobileGameOverRef.current) {
            tl.fromTo(
              mobileGameOverRef.current,
              { opacity: 0 },
              { opacity: 1, duration: 0.04 },
              0.86
            );
          }

          // Closing line — after game-over overlay (0.88 - 0.96)
          if (closingRef.current) {
            tl.fromTo(
              closingRef.current,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.06 },
              0.88
            );
          }

          return () => {
            // matchMedia cleanup
          };
        }
      );
    },
    { scope: sectionRef }
  );

  const words = "Growth Breaks When Systems Don\u2019t Scale".split(" ");

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative min-h-screen bg-void overflow-hidden"
    >
      <Container className="relative z-10 flex flex-col h-screen py-6 sm:py-8 md:py-12 lg:py-16">
        {/* Headline */}
        <div ref={headlineRef} className="mb-4">
          <h2 className="flex flex-wrap font-display type-heading text-chalk">
            {words.map((word, wi) => (
              <span key={wi} className="inline-block overflow-hidden mr-[0.3em]">
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

        {/* Subtext */}
        <p
          ref={subtextRef}
          className="text-stone-400 type-small max-w-2xl mb-4 sm:mb-6 md:mb-8"
          style={{ opacity: 0 }}
        >
          Most growing businesses don&apos;t struggle with demand — they struggle
          with execution. Leads come in, teams stay busy, tools multiply&hellip;
          yet conversions plateau and revenue becomes unpredictable.
        </p>

        {/* Main content: cards + canvas */}
        <div
          ref={contentRef}
          className="relative flex-1 flex flex-col md:flex-row gap-6 md:gap-8 min-h-0"
          style={{ opacity: 0 }}
        >
          {/* Cards */}
          <div ref={cardContainerRef} className="relative z-[3] w-full md:z-auto md:w-[45%] flex flex-col gap-3 md:gap-4 overflow-hidden scrollbar-hidden order-2 md:order-1">
            {PROBLEMS.map((problem, i) => (
              <div
                key={problem.keyword}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="relative border border-stone-600/30 rounded-sm p-4 md:p-5"
                style={{ opacity: 0 }}
              >
                {/* Active accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-sm"
                  style={{ backgroundColor: problem.color }}
                />

                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className="font-mono text-xs"
                    style={{ color: problem.color }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="font-mono text-xs tracking-[0.2em] uppercase"
                    style={{ color: problem.color }}
                  >
                    {problem.keyword}
                  </span>
                </div>

                <h3 className="font-display text-chalk type-subheading mb-1.5">
                  {problem.title}
                </h3>

                <p className="text-stone-400 type-small">
                  {problem.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Canvas */}
          <div className="absolute inset-0 z-[1] md:relative md:inset-auto md:z-auto md:w-[55%] md:h-auto md:order-2">
            <ProblemTetris progressRef={progressRef} />
          </div>
          <div className="md:hidden absolute inset-0 z-[2] pointer-events-none"
            style={{ backgroundColor: 'rgba(12,10,9,0.78)' }} />

          {/* Mobile game-over overlay — above blur */}
          <div
            ref={mobileGameOverRef}
            className="md:hidden absolute inset-0 z-[4] flex flex-col items-center justify-center pointer-events-none"
            style={{ opacity: 0 }}
          >
            <span
              className="font-mono uppercase tracking-widest font-bold"
              style={{ fontSize: "20px", color: "#FF5F57" }}
            >
              Game Over
            </span>
            <span
              className="font-mono text-center mt-3 leading-relaxed"
              style={{ fontSize: "11px", color: "#9C8E80" }}
            >
              Broken systems stack up.<br />
              Nothing clears. Growth stalls.
            </span>
          </div>
        </div>

        {/* Closing line */}
        <p
          ref={closingRef}
          className="relative z-[3] md:z-auto text-stone-400 text-sm md:text-base mt-6 md:mt-8"
          style={{ opacity: 0 }}
        >
          When systems don&apos;t scale, growth depends on people pushing harder
          instead of processes working smarter.
        </p>
      </Container>
    </section>
  );
}
