"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";
import Image from "next/image";

const FEATURES = [
  "Built around personalized learning pathways, informed by learning science and assessment research",
  "AI-assisted insights designed to support students, faculty, and administrators",
  "Designed with institutional workflows, compliance, and scale in mind",
  "Developed through continuous research, iteration, and pilot feedback",
];

const STATUS_ITEMS = [
  { label: "LMS Module", status: "Live in Pilot", color: colors.accent, dot: true },
  { label: "Academic Operating System", status: "In Research & Active Development", color: colors.ember, dot: false },
];

export function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<(HTMLLIElement | null)[]>([]);
  const statusRef = useRef<HTMLDivElement>(null);
  const bridgeRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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

      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rightRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      featuresRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      if (statusRef.current) {
        const items = statusRef.current.querySelectorAll(".status-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.5,
            scrollTrigger: {
              trigger: statusRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (bridgeRef.current) {
        gsap.fromTo(
          bridgeRef.current,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: bridgeRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }

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
    "We Build Products Grounded in Research, Not Assumptions".split(" ");

  return (
    <section
      id="products-section"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-void overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(92,81,74,0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(92,81,74,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    >
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-stone-600/20" />

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

        {/* Intro */}
        <p
          ref={introRef}
          className="text-stone-400 text-sm md:text-base max-w-2xl mb-12 md:mb-16"
          style={{ opacity: 0 }}
        >
          Beyond client systems, Innovgeist designs and operates its own
          products. Our product work is informed by academic research,
          institutional requirements, and real-world pilots—shaping how we
          approach architecture, automation, and long-term system design.
        </p>

        {/* Product card */}
        <div
          className="relative rounded-sm overflow-hidden mb-12 md:mb-16"
          style={{
            border: `1px solid ${colors.stone[600]}25`,
            backgroundColor: colors.surface,
          }}
        >
          {/* Accent bar top */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: `linear-gradient(90deg, ${colors.ember}, ${colors.accent})`,
            }}
          />

          <div className="flex flex-col lg:flex-row">
            {/* LEFT — product info */}
            <div
              ref={leftRef}
              className="flex-1 p-6 md:p-10 lg:p-12"
              style={{ opacity: 0 }}
            >
              {/* Product tag */}
              <span
                className="inline-block font-mono text-xs tracking-[0.2em] uppercase mb-4 pl-2"
                style={{
                  borderLeft: `2px solid ${colors.ember}`,
                  color: colors.ember,
                }}
              >
                Featured Product
              </span>

              {/* Logo + name */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 relative shrink-0">
                  <Image
                    src="/images/clients/GradeGuru11.png"
                    alt="GRADEguru"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-chalk tracking-tight">
                  GRADEguru
                </h3>
              </div>

              {/* Product positioning */}
              <p className="text-stone-300 text-sm md:text-base leading-relaxed mb-6 max-w-lg">
                GRADEguru is a research-informed, AI-integrated learning
                platform focused on personalized education—currently live in
                pilot and evolving into a full Academic Operating System (AOS)
                for colleges and universities.
              </p>

              {/* Feature list */}
              <ul className="flex flex-col gap-3 mb-8">
                {FEATURES.map((feat, i) => (
                  <li
                    key={i}
                    ref={(el) => { featuresRef.current[i] = el; }}
                    className="flex items-start gap-3 text-sm text-stone-400"
                    style={{ opacity: 0 }}
                  >
                    <span
                      className="mt-[5px] w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: colors.accent }}
                    />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div ref={ctaRef} style={{ opacity: 0 }}>
                <Button
                  variant="secondary"
                  href="https://gradeguru.innovgeist.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  For Colleges &amp; Universities &rarr; Explore Academic Operating System
                </Button>
              </div>
            </div>

            {/* RIGHT — status panel */}
            <div
              ref={rightRef}
              className="lg:w-[340px] xl:w-[380px] shrink-0 p-6 md:p-8 lg:p-10 flex flex-col justify-between"
              style={{
                opacity: 0,
                borderTop: `1px solid ${colors.stone[600]}20`,
              }}
            >
              {/* Status heading */}
              <div>
                <p
                  className="font-mono text-xs tracking-[0.15em] uppercase mb-5"
                  style={{ color: colors.stone[400] }}
                >
                  Product Status
                </p>

                <div ref={statusRef} className="flex flex-col gap-4">
                  {STATUS_ITEMS.map((item, i) => (
                    <div
                      key={i}
                      className="status-item flex flex-col gap-1.5 p-4 rounded-sm"
                      style={{
                        border: `1px solid ${item.color}20`,
                        backgroundColor: `${item.color}08`,
                        opacity: 0,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {item.dot ? (
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
                            style={{ backgroundColor: item.color }}
                          />
                        ) : (
                          <span
                            className="w-1.5 h-1.5 rounded-sm shrink-0"
                            style={{
                              border: `1px solid ${item.color}`,
                              backgroundColor: "transparent",
                            }}
                          />
                        )}
                        <span
                          className="font-mono text-xs tracking-wider"
                          style={{ color: item.color }}
                        >
                          {item.status}
                        </span>
                      </div>
                      <span className="text-chalk text-sm font-display">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bridge note */}
              <p
                ref={bridgeRef}
                className="text-stone-600 text-xs font-mono leading-relaxed mt-8"
                style={{ opacity: 0 }}
              >
                Designing GRADEguru requires deep system thinking, data
                discipline, and automation rigor — the same principles we apply
                when building revenue and operations systems for our clients.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
