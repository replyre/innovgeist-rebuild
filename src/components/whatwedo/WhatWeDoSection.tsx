"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { WhatWeDoTetris } from "./WhatWeDoTetris";

const SERVICES = [
  {
    keyword: "AUTO",
    title: "Automated Lead Handling & Follow-ups",
    color: "#2DD4BF",
    desc: "Inbound leads get routed, scored, and followed up instantly — no manual babysitting, no dropped opportunities.",
    progressStart: 0.14,
  },
  {
    keyword: "FLOW",
    title: "Sales Workflow & CRM Architecture",
    color: "#2DD4BF",
    desc: "Pipeline stages, deal routing, and activity tracking — designed as a system, not a spreadsheet someone forgot to update.",
    progressStart: 0.30,
  },
  {
    keyword: "QUAL",
    title: "AI-Assisted Qualification & Routing",
    color: "#14B8A6",
    desc: "Machine learning scores and routes leads based on real signals — so sales talks to the right people at the right time.",
    progressStart: 0.46,
  },
  {
    keyword: "TOOL",
    title: "Custom Internal Tools That Support Scale",
    color: "#F59E0B",
    desc: "Dashboards, admin panels, and workflow apps built for your team — replacing the duct-tape stack of disconnected SaaS tools.",
    progressStart: 0.62,
  },
];

const DONT_DO = [
  "We don\u2019t run ads or manage media budgets.",
  "We don\u2019t do branding, design, or creative campaigns.",
];

export function WhatWeDoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<number>(0);
  const headlineRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dontDoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const strikeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const positioningRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

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
          const scrollEnd = isMobile ? "+=120%" : "+=150%";

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

          // Core paragraph — fires early as section enters viewport
          if (coreRef.current) {
            gsap.fromTo(
              coreRef.current,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: coreRef.current,
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

          // "Don't do" items fade in (0.03 - 0.05)
          dontDoRefs.current.forEach((el) => {
            if (!el) return;
            tl.fromTo(
              el,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.02 },
              0.03
            );
          });

          // Strikethrough animate (0.05 - 0.07)
          strikeRefs.current.forEach((el) => {
            if (!el) return;
            tl.fromTo(
              el,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.02, ease: "power2.inOut" },
              0.05
            );
          });

          // Dim "don't do" items
          if (!isMobile) {
            dontDoRefs.current.forEach((el) => {
              if (!el) return;
              tl.to(el, { opacity: 0.3, duration: 0.02 }, 0.07);
            });
          }

          // Card animations — synced with line clears
          SERVICES.forEach((service, i) => {
            const card = cardRefs.current[i];
            if (!card) return;

            // Fade in current card (at clear flash time = progressStart + 0.06)
            tl.fromTo(
              card,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.06 },
              service.progressStart + 0.06
            );

            // Dim previous card
            if (!isMobile && i > 0) {
              const prevCard = cardRefs.current[i - 1];
              if (prevCard) {
                tl.to(
                  prevCard,
                  { opacity: 0.3, duration: 0.04 },
                  service.progressStart + 0.06
                );
              }
            }
          });

          // Auto-scroll card container (on both mobile and desktop)
          if (cardContainerRef.current) {
            const container = cardContainerRef.current;
            const scrollProxy = { scroll: 0 };

            SERVICES.forEach((service, i) => {
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
              }, service.progressStart + 0.06);
            });
          }

          // Fade out "don't do" items at 0.70
          dontDoRefs.current.forEach((el) => {
            if (!el) return;
            tl.to(el, { opacity: 0, duration: 0.04 }, 0.70);
          });

          // All 4 cards return to full opacity at 0.78
          if (!isMobile) {
            cardRefs.current.forEach((card) => {
              if (!card) return;
              tl.to(card, { opacity: 1, duration: 0.04 }, 0.78);
            });
          }

          // Positioning line fades in (0.78)
          if (positioningRef.current) {
            tl.fromTo(
              positioningRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.04 },
              0.78
            );
          }

          // CTA fades in (0.86)
          if (ctaRef.current) {
            tl.fromTo(
              ctaRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.04 },
              0.86
            );
          }

          return () => {};
        }
      );
    },
    { scope: sectionRef }
  );

  const words =
    "We Build the Systems That Make Revenue Scalable".split(" ");

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative min-h-screen bg-void overflow-hidden"
    >
      <Container className="relative z-10 flex flex-col h-screen py-6 sm:py-8 md:py-10 lg:py-12">
        {/* Headline */}
        <div ref={headlineRef} className="mb-2 md:mb-3">
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

        {/* Core paragraph */}
        <p
          ref={coreRef}
          className="text-stone-400 type-small max-w-2xl mb-3 sm:mb-4 md:mb-6"
          style={{ opacity: 0 }}
        >
          We design and build the operational infrastructure between marketing
          and sales — so leads convert, pipelines move, and revenue compounds.
        </p>

        {/* Main content: canvas + right panel */}
        <div
          ref={contentRef}
          className="relative flex-1 flex flex-col md:flex-row gap-6 md:gap-8 min-h-0"
          style={{ opacity: 0 }}
        >
          {/* Canvas */}
          <div className="absolute inset-0 z-[1] md:relative md:inset-auto md:z-auto md:w-[32%] md:h-auto order-1">
            <WhatWeDoTetris progressRef={progressRef} />
          </div>
          <div className="md:hidden absolute inset-0 z-[2] pointer-events-none"
            style={{ backgroundColor: 'rgba(12,10,9,0.78)' }} />

          {/* Right panel */}
          <div ref={cardContainerRef} className="relative z-[3] w-full md:z-auto md:w-[68%] flex flex-col gap-3 md:gap-4 overflow-hidden scrollbar-hidden order-2">
            {/* "What we don't do" items — hidden on mobile */}
            <div className="hidden md:flex flex-col gap-2 mb-2">
              {DONT_DO.map((text, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    dontDoRefs.current[i] = el;
                  }}
                  className="relative font-mono text-xs text-stone-400"
                  style={{ opacity: 0 }}
                >
                  <span>{text}</span>
                  <div
                    ref={(el) => {
                      strikeRefs.current[i] = el;
                    }}
                    className="absolute left-0 top-1/2 w-full h-[1px] bg-stone-400 origin-left"
                    style={{ transform: "scaleX(0)" }}
                  />
                </div>
              ))}
            </div>

            {/* Service cards */}
            {SERVICES.map((service, i) => (
              <div
                key={service.keyword}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="relative border border-stone-600/30 rounded-sm p-3 md:p-5"
                style={{ opacity: 0 }}
              >
                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-sm"
                  style={{ backgroundColor: service.color }}
                />

                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className="font-mono text-xs"
                    style={{ color: service.color }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="font-mono text-xs tracking-[0.2em] uppercase"
                    style={{ color: service.color }}
                  >
                    {service.keyword}
                  </span>
                </div>

                <h3 className="font-display text-chalk type-subheading mb-1.5">
                  {service.title}
                </h3>

                <p className="text-stone-400 type-small">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Positioning line */}
        <p
          ref={positioningRef}
          className="font-display text-lg md:text-xl text-accent mt-4 md:mt-6"
          style={{ opacity: 0 }}
        >
          Marketing brings attention. Sales close deals. We build the systems
          that connect the two.
        </p>

        {/* CTA
        <a
          ref={ctaRef}
          href="#how-we-work"
          className="inline-block font-mono text-sm text-accent border border-accent/30 px-6 py-3 rounded-sm mt-3 hover:bg-accent/10 transition-colors w-fit"
          style={{ opacity: 0 }}
        >
          Learn How We Work &rarr;
        </a>
        */}
      </Container>
    </section>
  );
}
