"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";

/* ─── Square block icon ─── */
function BlockIcon({ color }: { color: string }) {
  const sz = 10;
  return (
    <svg width={sz} height={sz} viewBox={`0 0 ${sz} ${sz}`} className="block-icon">
      <rect x={0.5} y={0.5} width={sz - 1} height={sz - 1} fill="none" stroke={color} strokeWidth={1} />
    </svg>
  );
}

const CARDS = [
  {
    title: "For Businesses & Growth Teams",
    context:
      "If you're scaling and need automated sales and marketing systems that improve conversion efficiency and operational clarity.",
    buttonLabel: "Discuss Revenue Automation",
    buttonVariant: "primary" as const,
    buttonHref: "/contact",
    microcopy: "Consultative \u00B7 No fixed pricing \u00B7 Systems-first approach",
    color: colors.accent,
  },
  {
    title: "For Colleges & Universities",
    context:
      "If you're exploring AI-enabled, personalized learning platforms and long-term academic infrastructure.",
    buttonLabel: "Explore Academic Operating System",
    buttonVariant: "secondary" as const,
    buttonHref: "https://gradeguru.innovgeist.com",
    microcopy: "Research-informed \u00B7 Pilot-ready \u00B7 Institutional focus",
    color: colors.ember,
  },
];

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Headline split-char reveal
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

      // Intro text fade
      if (introRef.current) {
        gsap.fromTo(
          introRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: introRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Cards staggered reveal
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".cta-card");
        cards.forEach((card, i) => {
          const el = card as HTMLElement;
          const content = card.querySelector(".card-content");
          const icon = card.querySelector(".block-icon");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.2,
          });

          tl.fromTo(
            el,
            { borderColor: "transparent" },
            { borderColor: el.dataset.color ? `${el.dataset.color}40` : "transparent", duration: 0.3 },
            0
          );

          if (icon)
            tl.fromTo(
              icon,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" },
              0.15
            );

          if (content)
            tl.fromTo(
              content,
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.5 },
              0.15
            );
        });
      }

      // Trust line fade
      if (trustRef.current) {
        gsap.fromTo(
          trustRef.current,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: trustRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  const headlineWords =
    "Let's Build the Right System \u2014 Not Just Another Tool".split(" ");

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-32 bg-void overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(92,81,74,0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(92,81,74,0.05) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    >
      <Container>
        {/* Headline */}
        <div ref={headlineRef} className="mb-4">
          <h2 className="flex flex-wrap font-display type-heading text-chalk">
            {headlineWords.map((word, wi) => (
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

        {/* Supporting line */}
        <p
          ref={introRef}
          className="text-stone-400 text-sm md:text-base max-w-2xl mb-12 md:mb-16"
          style={{ opacity: 0 }}
        >
          Whether you&apos;re looking to improve revenue operations or explore
          institutional technology, the next step starts with a focused
          conversation.
        </p>

        {/* Dual cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16"
        >
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="cta-card relative p-6 md:p-8 rounded-sm"
              data-color={card.color}
              style={{
                border: "1px solid transparent",
                backgroundColor: colors.surface,
              }}
            >
              {/* Block icon — top right */}
              <div className="absolute top-4 right-4 opacity-0">
                <BlockIcon color={card.color} />
              </div>

              <div className="card-content" style={{ opacity: 0 }}>
                {/* Title with left border accent */}
                <h3
                  className="font-display type-subheading text-chalk mb-3 pl-3"
                  style={{ borderLeft: `2px solid ${card.color}` }}
                >
                  {card.title}
                </h3>

                {/* Context */}
                <p className="text-stone-400 text-sm md:text-base leading-relaxed mb-6">
                  {card.context}
                </p>

                {/* Button */}
                <Button
                  variant={card.buttonVariant}
                  href={card.buttonHref}
                  className="mb-4"
                >
                  {card.buttonLabel}
                </Button>

                {/* Microcopy */}
                <p
                  className="font-mono text-xs tracking-wide"
                  style={{ color: colors.stone[400] }}
                >
                  {card.microcopy}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust line */}
        <p
          ref={trustRef}
          className="text-center text-stone-600 text-sm font-mono"
          style={{ opacity: 0 }}
        >
          We work selectively and design every engagement for long-term impact
          &mdash; not short-term outputs.
        </p>
      </Container>
    </section>
  );
}
