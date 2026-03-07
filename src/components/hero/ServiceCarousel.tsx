"use client";

import { useRef, useCallback, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { brandAccents } from "@/lib/theme";

interface ServiceCard {
  title: string;
  metric: string;
  metricLabel: string;
  icon: ReactNode;
}

function IconCapture() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <path d="M20 4L36 12V28L20 36L4 28V12L20 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

function IconNurture() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <path d="M6 20C6 12.268 12.268 6 20 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M34 20C34 27.732 27.732 34 20 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 20C11 15.029 15.029 11 20 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M29 20C29 24.971 24.971 29 20 29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function IconPipeline() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <rect x="4" y="6" width="14" height="11" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="22" y="23" width="14" height="11" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18 11.5H24C26.761 11.5 29 13.739 29 16.5V23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M29 19L32 23H26L29 19Z" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function IconScale() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
      <path d="M6 34V14L14 6L34 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 34V22L20 14L34 14" stroke="currentColor" strokeWidth="1.2" opacity="0.45" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="34" r="2.5" fill="currentColor" opacity="0.5" />
      <circle cx="34" cy="6" r="2.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

const SERVICES: ServiceCard[] = [
  { title: "Lead Capture", metric: "3.2x", metricLabel: "conversion lift", icon: <IconCapture /> },
  { title: "Nurture Flows", metric: "68%", metricLabel: "engagement rate", icon: <IconNurture /> },
  { title: "Pipeline Ops", metric: "41%", metricLabel: "faster close", icon: <IconPipeline /> },
  { title: "Revenue Scale", metric: "2.8x", metricLabel: "ROI average", icon: <IconScale /> },
];

export function ServiceCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const singleSetHeight = useRef(0);

  const allCards = [...SERVICES, ...SERVICES, ...SERVICES];

  const startLoop = useCallback(() => {
    const track = trackRef.current;
    if (!track || !singleSetHeight.current) return;

    tweenRef.current?.kill();
    const h = singleSetHeight.current;

    tweenRef.current = gsap.to(track, {
      y: `-=${h}`,
      duration: 20,
      ease: "none",
      repeat: -1,
      modifiers: {
        y(y: string) {
          return `${gsap.utils.wrap(-h * 2, -h, parseFloat(y))}px`;
        },
      },
    });
  }, []);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const cards = track.querySelectorAll<HTMLElement>(".svc-card");

      requestAnimationFrame(() => {
        let h = 0;
        for (let i = 0; i < SERVICES.length; i++) {
          if (cards[i]) h += cards[i].offsetHeight;
        }
        h += SERVICES.length * 8; // gap-2 = 8px
        singleSetHeight.current = h;

        gsap.set(track, { y: -h });

        gsap.fromTo(
          cards,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.06,
            delay: 4.2,
            ease: "power3.out",
            onComplete: () => startLoop(),
          }
        );
      });
    },
    { scope: containerRef }
  );

  const handleMouseEnter = () => tweenRef.current?.timeScale(0.3);
  const handleMouseLeave = () => tweenRef.current?.timeScale(1);

  return (
    <div
      ref={containerRef}
      className="relative h-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
      }}
    >
      <div ref={trackRef} className="flex flex-col gap-2 will-change-transform p-2">
        {allCards.map((card, i) => {
          const accent = brandAccents[i % brandAccents.length];

          return (
            <div
              key={i}
              className="svc-card rounded-lg px-3 py-2.5 max-w-[250px]"
              style={{
                opacity: 0,
                background: `linear-gradient(135deg, rgba(22,20,18,0.9), rgba(22,20,18,0.6))`,
                border: `1px solid ${accent}20`,
              }}
            >
              <div className="flex items-center gap-2.5">
                {/* Icon */}
                <div
                  className="shrink-0 w-8 h-8 rounded-md p-1.5"
                  style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}25` }}
                >
                  {card.icon}
                </div>

                {/* Title */}
                <span className="flex-1 font-sans font-semibold text-[13px] text-[#F5F0EB] tracking-tight">
                  {card.title}
                </span>

                {/* Metric */}
                <div className="shrink-0 text-right">
                  <span className="font-display text-lg leading-none block" style={{ color: accent }}>
                    {card.metric}
                  </span>
                  <span className="font-mono block mt-0.5" style={{ fontSize: "8px", letterSpacing: "0.08em", color: "#9C8E80" }}>
                    {card.metricLabel}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
