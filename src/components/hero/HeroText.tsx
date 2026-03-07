"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { SplitTextReveal } from "./SplitTextReveal";

export function HeroText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!subRef.current || !ctaRef.current) return;

      // Subheadline fades up after entrance animation completes (~4.2s + headline ~1.2s)
      gsap.fromTo(
        subRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 4.5, ease: "power3.out" }
      );

      // CTAs slide up with spring
      gsap.fromTo(
        ctaRef.current.children,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          delay: 4.8,
          ease: "back.out(1.4)",
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex flex-col gap-6 lg:gap-8">
      {/* Eyebrow */}
      <div className="overflow-hidden">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent animate-fade-in">
          Revenue Automation Engineering
        </p>
      </div>

      {/* Headline */}
      <SplitTextReveal
        text="We Engineer Revenue Automation Systems That Drive Real Conversions"
        className="font-display type-display tracking-tight text-chalk"
        delay={3.5}
        stagger={0.04}
      />

      {/* Subheadline */}
      <p
        ref={subRef}
        className="max-w-lg type-body text-stone-200"
        style={{ opacity: 0 }}
      >
        Innovgeist partners with growth-focused companies to architect intelligent
        automation pipelines — from lead capture to scaled revenue.
      </p>

      {/* CTAs */}
      <div ref={ctaRef} className="flex flex-wrap items-center gap-4 pt-2">
        <div style={{ opacity: 0 }}>
          <Button variant="primary" size="lg" href="#contact">
            Discuss Automation
          </Button>
        </div>
        <div style={{ opacity: 0 }}>
          <Button variant="ghost" size="lg" href="https://drive.google.com/file/d/1VZObTvD3YZXDUmTCJUNsGGyEwFZvMFTx/view?usp=sharing" target="_blank" rel="noopener noreferrer">
            Explore Our Work
          </Button>
        </div>
      </div>
    </div>
  );
}
