"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";
import { ServiceVisual } from "./ServiceVisual";

const SERVICES = [
  {
    keyword: "AUTOMATE",
    title: "Sales & Marketing Automation Systems",
    desc: "We design automated systems that handle lead capture, follow-ups, qualification, and handoffs—reducing manual effort while improving conversion consistency.",
    accent: colors.accent,
    primary: true,
  },
  {
    keyword: "PIPELINE",
    title: "CRM & Revenue Workflow Engineering",
    desc: "We architect custom CRM pipelines and revenue workflows that align sales, marketing, and operations—giving teams clarity and control over how deals move.",
    accent: colors.accent,
    primary: true,
  },
  {
    keyword: "INTEL",
    title: "AI-Powered Automation & Intelligence",
    desc: "We integrate AI into revenue operations to support smarter lead scoring, routing, prioritization, and internal decision-making.",
    accent: colors.accentMuted,
    primary: true,
  },
  {
    keyword: "AGENCY",
    title: "Agency Automation Infrastructure",
    desc: "We work with marketing and growth agencies to build internal automation and white-label systems that improve delivery efficiency and ROI for their clients.",
    accent: colors.ember,
    primary: true,
  },
  {
    keyword: "CUSTOM",
    title: "Custom Software & Platform Development",
    desc: "When off-the-shelf tools fall short, we build custom software and internal platforms that support complex workflows and long-term scale.",
    accent: colors.stone[600],
    primary: false,
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const positioningRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [progresses, setProgresses] = useState([0, 0, 0, 0, 0]);
  const progressesRef = useRef([0, 0, 0, 0, 0]);

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

          if (isMobile) {
            // Mobile: make content container visible (desktop timeline handles this)
            if (contentRef.current) {
              gsap.set(contentRef.current, { opacity: 1 });
            }

            // Mobile: simple scroll-triggered fade-in, no pin
            if (headlineRef.current) {
              const chars = headlineRef.current.querySelectorAll(".split-char");
              gsap.fromTo(
                chars,
                { y: "110%", opacity: 0 },
                {
                  y: "0%",
                  opacity: 1,
                  stagger: 0.03,
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

            if (introRef.current) {
              gsap.fromTo(
                introRef.current,
                { opacity: 0, y: 24 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  scrollTrigger: {
                    trigger: introRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                  },
                }
              );
            }

            cardRefs.current.forEach((card) => {
              if (!card) return;
              gsap.fromTo(
                card,
                { opacity: 0, y: 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none none",
                  },
                }
              );
            });

            if (ctaRef.current) {
              gsap.fromTo(
                ctaRef.current,
                { opacity: 0, y: 16 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  scrollTrigger: {
                    trigger: ctaRef.current,
                    start: "top 88%",
                    toggleActions: "play none none none",
                  },
                }
              );
            }

            return () => {};
          }

          // Desktop: pinned parallax
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=600%",
              pin: true,
              scrub: 3,
              anticipatePin: 1,
              onUpdate: (self) => {
                const p = self.progress;
                const VISUAL_WINDOWS = [[0.02,0.14],[0.14,0.26],[0.26,0.38],[0.38,0.57],[0.57,0.73]];
                const next = VISUAL_WINDOWS.map(([start, end]) =>
                  Math.max(0, Math.min(1, (p - start) / (end - start)))
                );
                const changed = next.some((v, i) => Math.abs(v - progressesRef.current[i]) > 0.001);
                if (changed) {
                  progressesRef.current = next;
                  setProgresses(next);
                }
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

          // Intro paragraph — fires early as section enters viewport
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

          // Content area fade in (0.00 - 0.02)
          if (contentRef.current) {
            tl.fromTo(
              contentRef.current,
              { opacity: 0 },
              { opacity: 1, duration: 0.02 },
              0.00
            );
          }

          // Visual and card animations for each service
          const visualStarts = [0.02, 0.14, 0.26, 0.38, 0.57];
          const cardStarts = [0.04, 0.16, 0.28, 0.40, 0.59];

          visualStarts.forEach((start, i) => {
            const visualEl = visualRefs.current[i];
            if (!visualEl) return;

            // Fade in current visual
            tl.fromTo(
              visualEl,
              { opacity: 0 },
              { opacity: 1, duration: 0.04 },
              start
            );

            // Fade out previous visual (cross-fade)
            if (i > 0) {
              const prevVisual = visualRefs.current[i - 1];
              if (prevVisual) {
                tl.to(prevVisual, { opacity: 0, duration: 0.04 }, start);
              }
            }
          });

          cardStarts.forEach((start, i) => {
            const card = cardRefs.current[i];
            if (!card) return;

            // Fade in current card
            tl.fromTo(
              card,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.06 },
              start
            );

            // Dim previous card
            if (i > 0) {
              const prevCard = cardRefs.current[i - 1];
              if (prevCard) {
                tl.to(prevCard, { opacity: 0.3, duration: 0.04 }, start);
              }
            }
          });

          // Auto-scroll card container on small screens (desktop only)
          if (cardContainerRef.current) {
            const container = cardContainerRef.current;
            const scrollProxy = { scroll: 0 };

            cardStarts.forEach((start, i) => {
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
              }, start);
            });
          }

          // All cards restore to full opacity at 0.78
          cardRefs.current.forEach((card) => {
            if (!card) return;
            tl.to(card, { opacity: 1, duration: 0.04 }, 0.78);
          });

          // Positioning line fades in (0.82)
          if (positioningRef.current) {
            tl.fromTo(
              positioningRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.04 },
              0.82
            );
          }

          // CTA fades in (0.88)
          if (ctaRef.current) {
            tl.fromTo(
              ctaRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.04 },
              0.88
            );
          }

          return () => {};
        }
      );
    },
    { scope: sectionRef }
  );

  const words = "Revenue Automation Services Built for Scale".split(" ");

  return (
    <section
      id="what-we-build"
      ref={sectionRef}
      className="relative min-h-screen bg-void overflow-hidden"
    >
      <Container className="relative z-10 flex flex-col min-h-screen md:h-screen py-6 sm:py-8 md:py-12 lg:py-16">
        {/* Headline */}
        <div ref={headlineRef} className="mb-4">
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
          className="text-stone-400 type-small mb-4 sm:mb-6 md:mb-8"
          style={{ opacity: 0 }}
        >
          Our services are designed to remove friction across your sales and
          marketing operations—using automation, intelligence, and custom
          systems to drive measurable outcomes.
        </p>

        {/* Main content: visual panel + cards */}
        <div
          ref={contentRef}
          className="relative flex-1 flex flex-col md:flex-row gap-4 md:gap-6 min-h-0"
          style={{ opacity: 0 }}
        >
          {/* LEFT: Visual panel (hidden on mobile) */}
          <div className="absolute inset-0 z-[1] md:relative md:inset-auto md:z-auto md:block md:w-[50%]">
            <div
              className="absolute inset-0 border border-stone-600/15 rounded-[2px] overflow-hidden"
              style={{ backgroundColor: colors.surface }}
            >
              {SERVICES.map((_, i) => (
                <div
                  key={i}
                  ref={(el) => { visualRefs.current[i] = el; }}
                  className="absolute inset-0"
                  style={{ opacity: 0 }}
                >
                  <ServiceVisual index={i} progress={progresses[i]} />
                </div>
              ))}
            </div>
          </div>
          <div className="md:hidden absolute inset-0 z-[2] pointer-events-none"
            style={{ backgroundColor: 'rgba(12,10,9,0.78)' }} />

          {/* RIGHT: Service cards */}
          <div ref={cardContainerRef} className="relative z-[3] w-full md:z-auto md:w-[50%] flex flex-col gap-3 md:overflow-hidden scrollbar-hidden">
            {SERVICES.map((service, i) => (
              <div
                key={service.keyword}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={`relative border rounded-sm p-3 md:p-5 ${
                  service.primary
                    ? "border-stone-600/30"
                    : "border-stone-600/15"
                }`}
                style={{ opacity: 0 }}
              >
                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-sm"
                  style={{ backgroundColor: service.accent }}
                />

                {/* De-emphasis label */}
                {!service.primary && (
                  <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-stone-600 mb-1">
                    SUPPORTING
                  </span>
                )}

                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className="font-mono text-xs"
                    style={{ color: service.accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="font-mono text-xs tracking-[0.2em] uppercase"
                    style={{ color: service.accent }}
                  >
                    {service.keyword}
                  </span>
                </div>

                <h3
                  className={`font-display type-subheading mb-1.5 ${
                    service.primary ? "text-chalk" : "text-stone-400"
                  }`}
                >
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
          className="font-display text-lg md:text-xl text-accent mt-6 md:mt-8"
          style={{ opacity: 0 }}
        >
          From first touch to closed deal — engineered systems that compound revenue.
        </p>

        {/* CTA
        <a
          ref={ctaRef}
          href="#services"
          className="inline-block font-mono text-sm text-accent border border-accent/30 px-6 py-3 rounded-sm mt-4 hover:bg-accent/10 transition-colors w-fit"
          style={{ opacity: 0 }}
        >
          Explore Our Services &rarr;
        </a>
        */}
      </Container>
    </section>
  );
}
