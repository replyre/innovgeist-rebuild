"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";

const STEPS = [
  {
    num: "01",
    tag: "DIAGNOSE",
    title: "Discovery & Bottleneck Diagnosis",
    desc: "We start with a focused discovery call to understand your goals, current systems, and revenue challenges. From there, we identify where conversions break down and where automation creates the most impact.",
    color: "#2DD4BF",
    termCmd: "revenue_scan --diagnose",
    termDetail: "mapping revenue flow + bottleneck analysis",
  },
  {
    num: "02",
    tag: "ARCHITECT",
    title: "System Design & Architecture",
    desc: "Based on the diagnosis, we design a tailored automation and software architecture — defining workflows, integrations, and intelligence needed to support scalable revenue operations.",
    color: "#14B8A6",
    termCmd: "sys_design --blueprint",
    termDetail: "workflow design + integration architecture",
  },
  {
    num: "03",
    tag: "DEPLOY",
    title: "Build, Integrate & Optimize",
    desc: "We engineer and integrate the system into your existing stack, then continuously refine it to improve efficiency, visibility, and conversion performance.",
    color: "#F59E0B",
    termCmd: "deploy --optimize --loop",
    termDetail: "build + deploy + continuous optimization",
  },
];

export function EngagementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const chevronGroupRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trustRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const termLineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const termProgressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const termCompleteRef = useRef<HTMLDivElement>(null);

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
          const scrollEnd = isMobile ? "+=150%" : "+=200%";

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: scrollEnd,
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
            },
          });

          // Headline reveal — fires early as section enters viewport
          if (headlineRef.current) {
            const chars =
              headlineRef.current.querySelectorAll(".split-char");
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

          // Intro fade — fires early as section enters viewport
          if (introRef.current) {
            gsap.fromTo(
              introRef.current,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: introRef.current,
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

          // Terminal boot (0.02 - 0.05)
          if (terminalRef.current) {
            tl.fromTo(
              terminalRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.03 },
              0.02
            );
          }

          // Step animations — staggered reveal
          const stepStarts = [0.08, 0.32, 0.52];

          STEPS.forEach((_, i) => {
            const step = stepRefs.current[i];
            const chevrons = chevronGroupRefs.current[i];
            const termLine = termLineRefs.current[i];
            const termProgress = termProgressRefs.current[i];
            const start = stepStarts[i];

            // Terminal line types in
            if (termLine) {
              tl.fromTo(
                termLine,
                { opacity: 0, x: -10 },
                { opacity: 1, x: 0, duration: 0.03 },
                start
              );
            }

            // Progress bar fills
            if (termProgress) {
              tl.fromTo(
                termProgress,
                { scaleX: 0 },
                { scaleX: 1, duration: 0.10, ease: "power1.inOut" },
                start + 0.02
              );
            }

            // Chevron group animates in (staggered individual chevrons)
            if (chevrons) {
              const arrows = chevrons.querySelectorAll(".chevron-arrow");
              tl.fromTo(
                arrows,
                { opacity: 0, x: -8 },
                {
                  opacity: 1,
                  x: 0,
                  stagger: 0.008,
                  duration: 0.03,
                  ease: "power2.out",
                },
                start + 0.03
              );
            }

            // Step card fades in
            if (step) {
              tl.fromTo(
                step,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.06 },
                start + 0.04
              );
            }

            // Dim previous step
            if (!isMobile && i > 0) {
              const prevStep = stepRefs.current[i - 1];
              if (prevStep) {
                tl.to(
                  prevStep,
                  { opacity: 0.3, duration: 0.04 },
                  start + 0.04
                );
              }
            }

            // Terminal line completion marker
            if (termLine) {
              const check = termLine.querySelector(".term-check");
              if (check) {
                tl.fromTo(
                  check,
                  { opacity: 0 },
                  { opacity: 1, duration: 0.02 },
                  start + 0.12
                );
              }
            }
          });

          // Auto-scroll step container (on both mobile and desktop)
          if (cardContainerRef.current) {
            const container = cardContainerRef.current;
            const scrollProxy = { scroll: 0 };

            STEPS.forEach((_, i) => {
              if (i === 0) return;
              const step = stepRefs.current[i];
              if (!step) return;

              tl.to(scrollProxy, {
                scroll: () => Math.max(0, step.offsetTop + step.offsetHeight - container.clientHeight + 16),
                duration: 0.06,
                ease: "none",
                onUpdate: () => {
                  container.scrollTop = scrollProxy.scroll;
                },
              }, stepStarts[i] + 0.04);
            });
          }

          // All steps return to full opacity (0.78)
          stepRefs.current.forEach((step) => {
            if (!step) return;
            tl.to(step, { opacity: 1, duration: 0.04 }, 0.78);
          });

          // Terminal completion line
          if (termCompleteRef.current) {
            tl.fromTo(
              termCompleteRef.current,
              { opacity: 0 },
              { opacity: 1, duration: 0.03 },
              0.78
            );
          }

          // Trust line (0.84)
          if (trustRef.current) {
            tl.fromTo(
              trustRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.04 },
              0.84
            );
          }

          // CTA (0.90)
          if (ctaRef.current) {
            tl.fromTo(
              ctaRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.04 },
              0.90
            );
          }

          return () => {};
        }
      );
    },
    { scope: sectionRef }
  );

  const words =
    "A Structured Approach to Revenue Automation".split(" ");

  // Chevron colors: red → orange → green (5 chevrons per step)
  const chevronColors = [
    ["#EF4444", "#F97316", "#F59E0B", "#84CC16", "#22C55E"],
    ["#EF4444", "#F97316", "#F59E0B", "#84CC16", "#22C55E"],
    ["#EF4444", "#F97316", "#F59E0B", "#84CC16", "#22C55E"],
  ];

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      className="relative min-h-screen bg-void overflow-hidden"
    >
      <Container className="relative z-10 flex flex-col h-screen py-6 sm:py-8 md:py-10 lg:py-14">
        {/* Headline */}
        <div ref={headlineRef} className="mb-3">
          <h2 className="flex flex-wrap font-display type-heading text-chalk">
            {words.map((word, wi) => (
              <span
                key={wi}
                className="inline-block overflow-hidden mr-[0.3em]"
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
          className="text-stone-400 type-small max-w-2xl mb-4 sm:mb-6 md:mb-8"
          style={{ opacity: 0 }}
        >
          Every engagement begins with a discovery conversation. We don&apos;t
          build blindly — we first understand how revenue actually moves
          through your business.
        </p>

        {/* Main content */}
        <div
          ref={contentRef}
          className="relative flex-1 flex flex-col md:flex-row gap-5 md:gap-8 min-h-0 overflow-hidden"
          style={{ opacity: 0 }}
        >
          {/* Left: Terminal display */}
          <div className="absolute inset-0 z-[1] flex flex-col min-h-0 md:relative md:inset-auto md:z-auto md:w-[35%]">
            <div
              ref={terminalRef}
              className="border border-stone-600/20 rounded-sm bg-surface flex-1 flex flex-col overflow-hidden min-h-0"
              style={{ opacity: 0 }}
            >
              {/* Terminal header — colored dots */}
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-stone-600/20 shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                <span className="ml-3 font-mono text-[10px] text-stone-600 tracking-wider">
                  engagement.sh
                </span>
              </div>

              {/* Terminal body */}
              <div className="flex-1 px-4 py-4 font-mono text-xs space-y-5 overflow-y-auto min-h-0">
                {/* Boot line */}
                <div className="text-stone-600">
                  <span className="text-stone-400">$</span> initiating
                  revenue_system --mode=discovery
                </div>

                {/* Step terminal lines */}
                {STEPS.map((step, i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      termLineRefs.current[i] = el;
                    }}
                    className="space-y-2"
                    style={{ opacity: 0 }}
                  >
                    <div className="text-stone-400">
                      <span className="text-stone-400">$</span>{" "}
                      <span style={{ color: step.color }}>{step.termCmd}</span>
                    </div>
                    <div className="text-stone-600 pl-2">
                      {step.termDetail}
                    </div>
                    {/* Progress bar */}
                    <div className="pl-2 flex items-center gap-2">
                      <div className="flex-1 h-1 bg-stone-600/20 rounded-full overflow-hidden">
                        <div
                          ref={(el) => {
                            termProgressRefs.current[i] = el;
                          }}
                          className="h-full rounded-full origin-left"
                          style={{
                            backgroundColor: step.color,
                            transform: "scaleX(0)",
                          }}
                        />
                      </div>
                      <span
                        className="term-check text-[10px] shrink-0"
                        style={{ color: step.color, opacity: 0 }}
                      >
                        DONE
                      </span>
                    </div>
                  </div>
                ))}

                {/* Completion */}
                <div
                  ref={termCompleteRef}
                  className="pt-2 border-t border-stone-600/10"
                  style={{ opacity: 0 }}
                >
                  <div className="text-stone-400">
                    <span>$</span>{" "}
                    <span className="text-[#22C55E]">
                      all systems operational
                    </span>
                  </div>
                  <div className="text-stone-600 pl-2 mt-1">
                    revenue pipeline armed and scaling
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:hidden absolute inset-0 z-[2] pointer-events-none"
            style={{ backgroundColor: 'rgba(12,10,9,0.78)' }} />

          {/* Right: Steps with chevron progress */}
          <div ref={cardContainerRef} className="relative z-[3] w-full md:z-auto md:w-[65%] flex flex-col gap-3 md:gap-4 min-h-0 overflow-hidden scrollbar-hidden">
            {STEPS.map((step, i) => (
              <div key={step.tag}>
                {/* Chevron progress bar */}
                <div
                  ref={(el) => {
                    chevronGroupRefs.current[i] = el;
                  }}
                  className="flex items-center gap-0.5 mb-2 h-5"
                >
                  {chevronColors[i].map((color, ci) => (
                    <span
                      key={ci}
                      className="chevron-arrow font-mono text-lg leading-none"
                      style={{ color, opacity: 0 }}
                    >
                      &#x276F;
                    </span>
                  ))}
                  <span
                    className="ml-2 font-mono text-[10px] tracking-[0.15em] uppercase"
                    style={{ color: step.color }}
                  >
                    step {step.num}
                  </span>
                </div>

                {/* Step card */}
                <div
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className="relative border border-stone-600/30 rounded-sm p-4 md:p-5"
                  style={{ opacity: 0 }}
                >
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-sm"
                    style={{ backgroundColor: step.color }}
                  />

                  <div className="flex items-start gap-4 md:gap-5">
                    {/* Big number */}
                    <span
                      className="font-mono text-2xl md:text-3xl font-bold leading-none shrink-0"
                      style={{ color: step.color }}
                    >
                      {step.num}
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span
                          className="font-mono text-xs tracking-[0.2em] uppercase"
                          style={{ color: step.color }}
                        >
                          {step.tag}
                        </span>
                      </div>

                      <h3 className="font-display text-chalk type-subheading mb-1.5">
                        {step.title}
                      </h3>

                      <p className="text-stone-400 type-small">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom area — fixed height to prevent overlap */}
        <div className="shrink-0 mt-5 md:mt-6">
          {/* Trust line */}
          <p
            ref={trustRef}
            className="font-display text-base md:text-lg text-accent"
            style={{ opacity: 0 }}
          >
            We don&apos;t just build tools. We design systems that make revenue
            operations predictable.
          </p>

          {/* CTA
          <a
            ref={ctaRef}
            href="#contact"
            className="inline-block font-mono text-sm text-accent border border-accent/30 px-6 py-3 rounded-sm mt-3 hover:bg-accent/10 transition-colors w-fit"
            style={{ opacity: 0 }}
          >
            Schedule a Discovery Call &rarr;
          </a>
          */}
        </div>
      </Container>
    </section>
  );
}
