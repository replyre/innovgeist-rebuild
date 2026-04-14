"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";

export function CaseStudiesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });

      if (labelRef.current) {
        tl.fromTo(labelRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 });
      }

      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll(".hero-line");
        tl.fromTo(lines, { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.9 }, "-=0.2");
      }

      if (subRef.current) {
        tl.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4");
      }

      if (ctaRef.current) {
        tl.fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative pt-[72px] pb-16 md:pb-20 overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(92,81,74,0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(92,81,74,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "72px 72px",
      }}
    >
      <div
        className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 80% 20%, ${colors.accent}08 0%, transparent 70%)`,
        }}
      />

      <Container className="relative z-10 pt-16 md:pt-24">
        <div className="max-w-3xl">
          {/* Label */}
          <div ref={labelRef} className="mb-7" style={{ opacity: 0 }}>
            <span
              className="font-mono text-xs tracking-[0.3em] uppercase"
              style={{ color: colors.accent }}
            >
              Case Studies
            </span>
          </div>

          {/* Headline */}
          <div ref={headlineRef} className="mb-6">
            <h1
              className="font-display text-chalk"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                lineHeight: 1.07,
                letterSpacing: "-0.01em",
              }}
            >
              <span className="hero-line block" style={{ opacity: 0 }}>
                Systems Built in
              </span>
              <span
                className="hero-line block"
                style={{ opacity: 0, color: colors.accent }}
              >
                Real-World Environments
              </span>
            </h1>
          </div>

          {/* Sub */}
          <p
            ref={subRef}
            className="text-stone-400 max-w-xl leading-relaxed mb-9"
            style={{ fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)", opacity: 0 }}
          >
            A selection of engagements where we designed and deployed automation,
            internal platforms, and revenue systems that operate reliably in
            production.
          </p>

          {/* Optional CTA */}
          <div ref={ctaRef} style={{ opacity: 0 }}>
            <Button variant="secondary" href="/contact">
              Discuss Automation
            </Button>
          </div>
        </div>
      </Container>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${colors.void})` }}
      />
    </section>
  );
}
