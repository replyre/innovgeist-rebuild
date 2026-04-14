"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";

const E = colors.ember;
const A = colors.accent;

export function GradeGuruFinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      if (innerRef.current)
        tl.fromTo(innerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });

      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll(".split-char");
        tl.fromTo(chars, { y: "110%", opacity: 0 }, {
          y: "0%", opacity: 1, stagger: 0.009, duration: 0.65,
        }, "-=0.3");
      }

      if (subRef.current)
        tl.fromTo(subRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");

      if (ctaRef.current) {
        const btns = ctaRef.current.querySelectorAll("a");
        tl.fromTo(btns, { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, "-=0.2");
      }

      if (microRef.current)
        tl.fromTo(microRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.1");
    },
    { scope: sectionRef }
  );

  const words = "Start Your Accreditation Readiness Journey".split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ borderTop: `1px solid ${colors.stone[600]}18` }}
    >
      {/* Ember glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 100%, ${E}0a 0%, transparent 60%)`,
        }}
      />
      {/* Teal glow top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 80% at 50% 0%, ${A}05 0%, transparent 70%)`,
        }}
      />

      <Container className="relative z-10">
        <div
          ref={innerRef}
          className="max-w-2xl mx-auto text-center"
          style={{ opacity: 0 }}
        >
          {/* Label */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <span
              className="font-mono text-xs tracking-[0.28em] uppercase"
              style={{ color: colors.stone[600] }}
            >
              GRADEguru
            </span>
            <span className="text-stone-700 font-mono text-xs">/</span>
            <span
              className="font-mono text-xs tracking-[0.22em] uppercase"
              style={{ color: E }}
            >
              Get Started
            </span>
          </div>

          {/* Headline */}
          <div ref={headlineRef} className="mb-6">
            <h2
              className="font-display text-chalk flex flex-wrap justify-center"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 3.25rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              {words.map((word, wi) => (
                <span key={wi} className="inline-block overflow-hidden mr-[0.25em]">
                  {word.split("").map((char, ci) => (
                    <span key={ci} className="split-char inline-block" style={{ opacity: 0 }}>{char}</span>
                  ))}
                </span>
              ))}
            </h2>
          </div>

          <p
            ref={subRef}
            className="text-stone-400 leading-relaxed mb-10"
            style={{ fontSize: "clamp(0.9375rem, 1.4vw, 1.0625rem)", opacity: 0 }}
          >
            Whether you&apos;re preparing for NAAC, NBA, or NIRF — or simply want to
            reduce the burden of your next accreditation cycle — a conversation is
            the right starting point.
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          >
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 font-sans font-semibold text-sm px-8 py-3.5 rounded-sm transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: E, color: colors.void }}
            >
              Request Institutional Overview
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 font-sans font-semibold text-sm px-8 py-3.5 rounded-sm transition-all duration-300"
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
              Discuss a Pilot Engagement
            </a>
          </div>

          {/* Microcopy */}
          <div
            ref={microRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            style={{ opacity: 0 }}
          >
            {[
              "No commitment at discovery stage",
              "Pilot-first engagement model",
              "Designed for Indian higher education",
            ].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] uppercase"
                style={{ color: colors.stone[600] }}
              >
                <span
                  className="w-1 h-1 rounded-full shrink-0"
                  style={{ backgroundColor: `${E}50` }}
                />
                {item}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
