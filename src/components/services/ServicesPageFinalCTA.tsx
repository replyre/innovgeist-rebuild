"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";

export function ServicesPageFinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLParagraphElement>(null);
  const trustRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const fadeIn = (el: HTMLElement, delay = 0) => {
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
              start: "top 87%",
              toggleActions: "play none none none",
            },
          }
        );
      };

      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll(".split-char");
        gsap.fromTo(
          chars,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            stagger: 0.01,
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

      if (supportRef.current) fadeIn(supportRef.current, 0.05);
      if (ctaRef.current) fadeIn(ctaRef.current, 0.1);
      if (microRef.current) fadeIn(microRef.current, 0.18);
      if (trustRef.current) fadeIn(trustRef.current, 0.25);
    },
    { scope: sectionRef }
  );

  const words =
    "Ready to Build Systems That Scale With Your Business?".split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{
        borderTop: `1px solid ${colors.stone[600]}18`,
        backgroundImage: `
          linear-gradient(to right, rgba(92,81,74,0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(92,81,74,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "72px 72px",
      }}
    >
      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 100%, ${colors.accent}07 0%, transparent 70%)`,
        }}
      />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <div ref={headlineRef} className="mb-6 md:mb-8">
            <h2 className="flex flex-wrap justify-center font-display type-heading text-chalk">
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

          {/* Supporting line */}
          <p
            ref={supportRef}
            className="text-stone-400 type-body max-w-xl mx-auto mb-10 md:mb-12 leading-relaxed"
            style={{ opacity: 0 }}
          >
            If your growth is being limited by manual processes, fragmented
            tools, or unclear revenue workflows, a focused conversation can help
            determine whether automation and system redesign make sense for your
            business.
          </p>

          {/* Primary CTA */}
          <div
            ref={ctaRef}
            className="flex justify-center mb-5"
            style={{ opacity: 0 }}
          >
            <Button variant="primary" size="lg" href="/contact">
              Discuss Automation
            </Button>
          </div>

          {/* Microcopy */}
          <p
            ref={microRef}
            className="font-mono text-xs tracking-wider text-stone-600 mb-8 md:mb-10"
            style={{ opacity: 0 }}
          >
            Consultative &middot; Selective engagements &middot; No fixed
            pricing
          </p>

          {/* Divider */}
          <div
            className="h-px mb-8 md:mb-10 mx-auto max-w-[120px]"
            style={{ backgroundColor: `${colors.stone[600]}30` }}
          />

          {/* Trust line */}
          <p
            ref={trustRef}
            className="text-stone-600 type-small"
            style={{ opacity: 0 }}
          >
            We work with a limited number of partners at a time to ensure
            depth, focus, and long-term impact.
          </p>
        </div>
      </Container>
    </section>
  );
}
