"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";

export function ServicesPageHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const qualRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });

      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 }
        );
      }

      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll(".hero-line");
        tl.fromTo(
          lines,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.9 },
          "-=0.2"
        );
      }

      if (subRef.current) {
        tl.fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
        );
      }

      if (qualRef.current) {
        tl.fromTo(
          qualRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2"
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-[72px] overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(92,81,74,0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(92,81,74,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "72px 72px",
      }}
    >
      {/* Subtle top-right glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 80% 20%, ${colors.accent}0a 0%, transparent 70%)`,
        }}
      />

      <Container className="relative z-10 py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl">
          {/* Section label */}
          <div ref={labelRef} className="mb-8 md:mb-10" style={{ opacity: 0 }}>
            <span
              className="font-mono text-xs tracking-[0.3em] uppercase"
              style={{ color: colors.accent }}
            >
              Services
            </span>
          </div>

          {/* Headline */}
          <div ref={headlineRef} className="mb-7 md:mb-9">
            <h1
              className="font-display text-chalk"
              style={{
                fontSize: "clamp(2.25rem, 5.5vw, 4.75rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.01em",
              }}
            >
              <span className="hero-line block" style={{ opacity: 0 }}>
                Revenue Automation &amp;
              </span>
              <span
                className="hero-line block"
                style={{ opacity: 0, color: colors.accent }}
              >
                Systems Engineering
              </span>
            </h1>
          </div>

          {/* Subheadline */}
          <p
            ref={subRef}
            className="text-stone-400 max-w-2xl leading-relaxed mb-8 md:mb-10"
            style={{ fontSize: "clamp(0.9375rem, 1.5vw, 1.125rem)", opacity: 0 }}
          >
            Innovgeist partners with growing businesses to design and build
            automated sales and marketing systems. We combine software
            engineering, AI, and workflow automation to improve conversion
            efficiency, operational clarity, and long-term scalability.
          </p>

          {/* Qualification line */}
          <div
            ref={qualRef}
            className="max-w-xl mb-9 md:mb-11 pl-5 py-3"
            style={{
              borderLeft: `2px solid ${colors.accent}50`,
              opacity: 0,
            }}
          >
            <p
              className="text-stone-400 leading-relaxed"
              style={{ fontSize: "clamp(0.8125rem, 1.2vw, 0.9375rem)" }}
            >
              Our services are best suited for businesses with active sales
              processes, growing teams, and a need for scalable systems —{" "}
              <span className="text-chalk">not one-off builds.</span>
            </p>
          </div>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="flex flex-wrap gap-4 items-center"
            style={{ opacity: 0 }}
          >
            <Button variant="primary" size="lg" href="/contact">
              Discuss Automation
            </Button>
            <Button variant="secondary" size="lg" href="/case-studies">
              View Case Studies
            </Button>
          </div>
        </div>
      </Container>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, ${colors.void})`,
        }}
      />
    </section>
  );
}
