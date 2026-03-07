"use client";

import { useRef, useCallback } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { colors } from "@/lib/theme";
import { Container } from "@/components/ui/Container";
import { HeroText } from "./HeroText";
import { Laptop3D } from "./Laptop3D";
import type { TetrisGameHandle } from "./TetrisGame";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const mirrorCanvasRef = useRef<HTMLCanvasElement>(null);
  const tetrisRef = useRef<TetrisGameHandle>(null);

  // Feature 1: Logo entrance refs
  const logoOverlayRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const rightBgRef = useRef<HTMLCanvasElement>(null);
  const laptopControlsRef = useRef<{ flipIn: () => gsap.core.Timeline } | null>(null);
  const mobileOverlayRef = useRef<HTMLDivElement>(null);

  const onLaptopReady = useCallback((controls: { flipIn: () => gsap.core.Timeline }) => {
    laptopControlsRef.current = controls;
  }, []);

  // Feature 2: Background fading on window close/open
  const onWindowChange = useCallback(
    (state: { dashboardVisible: boolean; tetrisVisible: boolean }) => {
      if (rightBgRef.current) {
        gsap.to(rightBgRef.current, {
          opacity: state.tetrisVisible ? 0.7 : 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    },
    []
  );

  // Feature 1: Master entrance timeline
  useGSAP(
    () => {
      if (!logoOverlayRef.current || !logoImgRef.current) return;

      // Set backgrounds to invisible initially
      if (rightBgRef.current) gsap.set(rightBgRef.current, { opacity: 0 });

      const tl = gsap.timeline();

      // (0–1.2s) Logo visible, slight scale pulse
      tl.fromTo(
        logoImgRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
      tl.to(logoImgRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1,
      });

      // (1.2–2.2s) Logo shrinks + moves to laptop position
      tl.to(
        logoImgRef.current,
        {
          scale: 0.3,
          opacity: 0.7,
          duration: 1.0,
          ease: "power2.inOut",
          onStart: () => {
            // Move to laptop center
            if (carouselRef.current && logoImgRef.current) {
              const rect = carouselRef.current.getBoundingClientRect();
              const centerX = rect.left + rect.width / 2;
              const centerY = rect.top + rect.height / 2;
              gsap.to(logoImgRef.current, {
                x: centerX - window.innerWidth / 2,
                y: centerY - window.innerHeight / 2,
                duration: 1.0,
                ease: "power2.inOut",
              });
            }
          },
        },
        "+=0"
      );

      // (2.2–2.4s) Overlay bg fades to transparent
      tl.to(
        logoOverlayRef.current,
        {
          backgroundColor: "transparent",
          duration: 0.2,
          ease: "power1.out",
        },
        "-=0.2"
      );
      tl.to(logoImgRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power1.out",
      }, "<");

      // (2.4–3.8s) Flip laptop from back to front
      tl.add(() => {
        if (laptopControlsRef.current) {
          laptopControlsRef.current.flipIn();
        }
      });

      // Mobile blur overlay fades in after flip
      if (mobileOverlayRef.current) {
        tl.to(mobileOverlayRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        }, "+=0.6");
      }

      // (3.8–4.2s) Right background fades in
      tl.to(
        rightBgRef.current,
        { opacity: 0.7, duration: 0.4, ease: "power1.out" },
        "+=1.2"
      );

      // Cleanup overlay
      tl.set(logoOverlayRef.current, { display: "none", pointerEvents: "none" });
    },
    { scope: sectionRef }
  );

  // Parallax on scroll
  useGSAP(
    () => {
      if (!textRef.current) return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
        onUpdate: (self) => {
          if (textRef.current) {
            gsap.set(textRef.current, { y: self.progress * -60 });
          }
          if (carouselRef.current && window.innerWidth >= 768) {
            gsap.set(carouselRef.current, { y: self.progress * -30 });
          }
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-start md:items-center pt-[72px] overflow-hidden"
    >
      {/* Feature 1: Logo entrance overlay */}
      <div
        ref={logoOverlayRef}
        className="absolute inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: colors.void, pointerEvents: "none" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={logoImgRef}
          src="/images/logo.png"
          alt="innovgeist"
          className="w-40 h-40 object-contain"
          style={{ filter: "brightness(0) invert(1)", opacity: 0 }}
        />
      </div>

      {/* Tetris mirror background — right side, shifted up (hidden on mobile) */}
      <canvas
        ref={(el) => {
          rightBgRef.current = el;
          (mirrorCanvasRef as React.MutableRefObject<HTMLCanvasElement | null>).current = el;
        }}
        className="hidden md:block absolute right-0 pointer-events-none overflow-hidden"
        style={{ opacity: 0, width: "50%", height: "120%", bottom: "-10%", filter: "blur(5.5px)" }}
      />

      <Container className="relative z-10 pt-16 pb-6 md:py-12 lg:py-20 md:-mt-8 lg:-mt-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-6">
          {/* Text — left */}
          <div ref={textRef} className="relative z-[3] w-full lg:w-[52%] lg:pr-8 xl:pr-12 order-2 lg:order-1">
            <HeroText />

            {/* Hint pointers — desktop only */}
            <div
              className="hidden mt-6 items-center gap-4 px-4 pt-3 pb-2 rounded-lg w-fit"
              style={{
                background: "rgba(0,0,0,0.6)",
                border: `1px solid ${colors.stone[600]}30`,
                backdropFilter: "blur(8px)",
                color: colors.chalk,
              }}
            >
              <div className="flex items-center gap-1.5">
                <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5">
                  <path d="M4 10H16M16 10L12 6M16 10L12 14M4 10L8 6M4 10L8 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-mono text-[9px] uppercase tracking-wider opacity-80">Drag</span>
              </div>
              <div className="w-px h-3" style={{ background: `${colors.stone[400]}40` }} />
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-[1px]">
                  <div className="w-[12px] h-[10px] rounded-[2px] flex items-center justify-center" style={{ background: `${colors.stone[600]}40`, border: `0.5px solid ${colors.stone[600]}30` }}>
                    <span className="text-[6px] leading-none">▲</span>
                  </div>
                  <div className="flex gap-[1px]">
                    <div className="w-[12px] h-[10px] rounded-[2px] flex items-center justify-center" style={{ background: `${colors.stone[600]}40`, border: `0.5px solid ${colors.stone[600]}30` }}><span className="text-[6px] leading-none">◀</span></div>
                    <div className="w-[12px] h-[10px] rounded-[2px] flex items-center justify-center" style={{ background: `${colors.stone[600]}40`, border: `0.5px solid ${colors.stone[600]}30` }}><span className="text-[6px] leading-none">▼</span></div>
                    <div className="w-[12px] h-[10px] rounded-[2px] flex items-center justify-center" style={{ background: `${colors.stone[600]}40`, border: `0.5px solid ${colors.stone[600]}30` }}><span className="text-[6px] leading-none">▶</span></div>
                  </div>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider opacity-80">Play</span>
              </div>
              <div className="w-px h-3" style={{ background: `${colors.stone[400]}40` }} />
              <div className="flex items-center gap-1.5">
                <div className="flex gap-[3px]">
                  <div className="w-[5px] h-[5px] rounded-full" style={{ background: "#FF5F57" }} />
                  <div className="w-[5px] h-[5px] rounded-full" style={{ background: "#FEBC2E" }} />
                  <div className="w-[5px] h-[5px] rounded-full" style={{ background: "#28C840" }} />
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider opacity-80">Window</span>
              </div>
            </div>
          </div>

          {/* 3D Laptop — right */}
          <div
            ref={carouselRef}
            className="absolute left-0 right-0 bottom-[-240px] h-[50vh] z-[1] md:relative md:left-auto md:right-auto md:bottom-auto md:h-[400px] md:z-auto md:w-full lg:w-[48%] md:order-1 lg:order-2 lg:h-[480px] xl:h-[560px]"
          >
            {/* Glow behind laptop */}
            <div
              className="hidden md:block absolute inset-0 -inset-x-12 -inset-y-8 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 70% 60% at 50% 55%, ${colors.accent}22 0%, ${colors.accent}0d 40%, transparent 70%)`,
                filter: "blur(30px)",
              }}
            />

            {/* Caption above laptop (hidden on mobile — shown inline below text) */}
            <div className="hidden md:block absolute -top-8 sm:-top-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-sm text-center pointer-events-none">
              <p className="type-small text-stone-300">
                Leaked leads, manual busywork, siloed tools — revenue blockers
                stack up fast.{" "}
                <span className="font-medium" style={{ color: colors.accent }}>
                  We automate the clears before you hit game over.
                </span>
              </p>
            </div>

            <Laptop3D
              mirrorCanvasRef={mirrorCanvasRef}
              tetrisRef={tetrisRef}
              onReady={onLaptopReady}
              onWindowChange={onWindowChange}
            />
          </div>

          {/* Mobile blur overlay — fades in after laptop flip */}
          <div
            ref={mobileOverlayRef}
            className="md:hidden absolute inset-0 z-[2] pointer-events-none"
            style={{ opacity: 0, backgroundColor: 'rgba(12,10,9,0.5)', backdropFilter: 'blur(1.5px)' }}
          />
        </div>
      </Container>
    </section>
  );
}
