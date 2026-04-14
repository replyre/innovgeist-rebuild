"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";

export function InsightsHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });

      if (labelRef.current) {
        tl.fromTo(labelRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 });
      }

      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll(".hero-line");
        tl.fromTo(
          lines,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.85 },
          "-=0.2"
        );
      }

      if (subRef.current) {
        tl.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4");
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative pt-[72px] pb-14 md:pb-18 overflow-hidden"
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
          background: `radial-gradient(ellipse 60% 50% at 80% 20%, ${colors.accent}07 0%, transparent 70%)`,
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
              Insights
            </span>
          </div>

          {/* Headline */}
          <div ref={headlineRef} className="mb-6">
            <h1
              className="font-display text-chalk"
              style={{
                fontSize: "clamp(1.9rem, 4.5vw, 3.75rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.01em",
              }}
            >
              <span className="hero-line block" style={{ opacity: 0 }}>
                Insights on Systems,
              </span>
              <span
                className="hero-line block"
                style={{ opacity: 0, color: colors.accent }}
              >
                Automation &amp; Education Technology
              </span>
            </h1>
          </div>

          {/* Sub */}
          <p
            ref={subRef}
            className="text-stone-400 max-w-xl leading-relaxed"
            style={{ fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)", opacity: 0 }}
          >
            Perspectives from our work building revenue systems, automation
            infrastructure, and research-informed academic platforms.
          </p>
        </div>
      </Container>

      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${colors.void})` }}
      />
    </section>
  );
}
