"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";

const E = colors.ember;
const A = colors.accent;

export function GradeGuruHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctxRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });

      if (labelRef.current)
        tl.fromTo(labelRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 });

      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll(".hero-line");
        tl.fromTo(lines, { opacity: 0, y: 38 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.85 }, "-=0.2");
      }

      if (subRef.current)
        tl.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4");

      if (ctxRef.current)
        tl.fromTo(ctxRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");

      if (ctaRef.current)
        tl.fromTo(ctaRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");

      if (statusRef.current) {
        const items = statusRef.current.querySelectorAll(".status-pill");
        tl.fromTo(items, { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.5 }, "-=0.2");
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center pt-[72px] overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(92,81,74,0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(92,81,74,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "72px 72px",
      }}
    >
      {/* Ember glow */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[600px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 85% 15%, ${E}0c 0%, transparent 65%)`,
        }}
      />
      {/* Teal glow bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[300px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 0% 100%, ${A}07 0%, transparent 70%)`,
        }}
      />

      <Container className="relative z-10 py-16 md:py-24 lg:py-28">
        <div className="max-w-4xl">
          {/* Label */}
          <div ref={labelRef} className="mb-8 flex items-center gap-3" style={{ opacity: 0 }}>
            <span className="font-mono text-xs tracking-[0.28em] uppercase text-stone-600">
              Products
            </span>
            <span className="text-stone-600 font-mono text-xs">/</span>
            <span
              className="font-mono text-xs tracking-[0.28em] uppercase"
              style={{ color: E }}
            >
              GRADEguru
            </span>
          </div>

          {/* Headline */}
          <div ref={headlineRef} className="mb-7">
            <h1
              className="font-display text-chalk"
              style={{
                fontSize: "clamp(2rem, 5vw, 4.25rem)",
                lineHeight: 1.07,
                letterSpacing: "-0.01em",
              }}
            >
              <span className="hero-line block" style={{ opacity: 0 }}>
                GRADEguru
              </span>
              <span
                className="hero-line block"
                style={{ opacity: 0, color: E }}
              >
                An Academic Operating System
              </span>
              <span className="hero-line block text-chalk" style={{ opacity: 0 }}>
                for Continuous Accreditation
              </span>
              <span className="hero-line block text-chalk" style={{ opacity: 0 }}>
                &amp; Ranking Readiness
              </span>
            </h1>
          </div>

          {/* Subheadline */}
          <p
            ref={subRef}
            className="text-stone-400 max-w-2xl leading-relaxed mb-7"
            style={{ fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)", opacity: 0 }}
          >
            An AI-integrated academic platform designed to help colleges and
            universities stay continuously prepared for accreditation and ranking
            frameworks such as NAAC, NBA, and NIRF — not just at submission
            time, but every academic year.
          </p>

          {/* Context line */}
          <div
            ref={ctxRef}
            className="max-w-xl mb-9 pl-5 py-3"
            style={{ borderLeft: `2px solid ${E}50`, opacity: 0 }}
          >
            <p className="text-stone-400 type-small leading-relaxed">
              GRADEguru combines personalized learning, academic workflow
              management, and compliance-aligned data systems into a single{" "}
              <span className="text-chalk">Academic Operating System (AOS)</span>.
            </p>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 mb-10" style={{ opacity: 0 }}>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 font-sans font-semibold text-sm px-7 py-3 rounded-sm transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: E, color: colors.void }}
            >
              Request Institutional Overview
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 font-sans font-semibold text-sm px-7 py-3 rounded-sm transition-all duration-300"
              style={{
                border: `1px solid ${colors.stone[600]}50`,
                color: colors.chalk,
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = `${colors.stone[400]}80`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = `${colors.stone[600]}50`;
              }}
            >
              Discuss Accreditation-Ready Pilot
            </a>
          </div>

          {/* Status pills */}
          <div ref={statusRef} className="flex flex-wrap gap-3">
            <div
              className="status-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm"
              style={{
                border: `1px solid ${A}30`,
                backgroundColor: `${A}08`,
                opacity: 0,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: A, animation: "pulse-live 2s infinite" }}
              />
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: A }}>
                LMS · Live in Pilot
              </span>
            </div>
            <div
              className="status-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm"
              style={{
                border: `1px solid ${E}28`,
                backgroundColor: `${E}07`,
                opacity: 0,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-sm"
                style={{ border: `1px solid ${E}`, backgroundColor: "transparent" }}
              />
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: E }}>
                AOS · In Active Development
              </span>
            </div>
          </div>
        </div>
      </Container>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${colors.void})` }}
      />
    </section>
  );
}
