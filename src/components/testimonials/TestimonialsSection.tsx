"use client";

import { useRef, useState, useCallback } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import Image from "next/image";
import { VideoModal } from "./VideoModal";
import { colors } from "@/lib/theme";

/* ─── Square block icon ─── */
function BlockIcon({ color }: { color: string }) {
  const sz = 10;
  return (
    <svg width={sz} height={sz} viewBox={`0 0 ${sz} ${sz}`} className="block-icon">
      <rect x={0.5} y={0.5} width={sz - 1} height={sz - 1} fill="none" stroke={color} strokeWidth={1} />
    </svg>
  );
}

/* ─── Testimonials data ─── */
const TESTIMONIALS = [
  {
    name: "Juhi Choksi",
    contextTag: "Production System Implementation",
    thumb: "/images/testimonials/1.png",
    video: "/videos/testimonials/juhi%20choksi.mp4",
    role: "Founder, Consumer Brand",
    quote:
      "Partnered with Innovgeist to design and deploy a production-ready system that streamlined internal workflows and execution.",
    color: colors.accent,
  },
  {
    name: "Shreya Gupta",
    contextTag: "Internal Platform Engineering",
    thumb: "/images/testimonials/2.png",
    video: "/videos/testimonials/shreya.mp4",
    role: "Sales Lead, Growth Agency",
    quote:
      "Worked with Innovgeist to build structured systems that improved process clarity and operational efficiency across teams.",
    color: colors.ember,
  },
  {
    name: "Akshat Gupta",
    contextTag: "Operational Software Deployment",
    thumb: "/images/testimonials/3.png",
    video: "/videos/testimonials/akshat.mp4",
    role: "Founder, Education Startup",
    quote:
      "Collaborated with Innovgeist to translate requirements into a reliable system designed to support scale and long-term use.",
    color: colors.accentMuted,
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const logoGridRef = useRef<HTMLDivElement>(null);
  const bridgeRef = useRef<HTMLParagraphElement>(null);

  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const closeModal = useCallback(() => setActiveVideo(null), []);

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

      // Intro text fade
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

      // Per-card Tetris block assembly
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".testimonial-card");
        cards.forEach((card, i) => {
          const border = card as HTMLElement;
          const ctx = card.querySelector(".card-ctx");
          const thumb = card.querySelector(".card-thumb");
          const name = card.querySelector(".card-name");
          const role = card.querySelector(".card-role");
          const quote = card.querySelector(".card-quote");
          const icon = card.querySelector(".block-icon");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.2,
          });

          tl.fromTo(
            border,
            { borderColor: "transparent" },
            { borderColor: border.dataset.color ? `${border.dataset.color}40` : "transparent", duration: 0.3 },
            0
          );

          if (icon)
            tl.fromTo(
              icon,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" },
              0.15
            );

          if (ctx)
            tl.fromTo(
              ctx,
              { opacity: 0, x: 40 },
              { opacity: 1, x: 0, duration: 0.4 },
              0
            );

          if (thumb)
            tl.fromTo(
              thumb,
              { opacity: 0, y: -60 },
              { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.2)" },
              0.05
            );

          if (name)
            tl.fromTo(
              name,
              { opacity: 0, y: -20 },
              { opacity: 1, y: 0, duration: 0.3 },
              0.4
            );

          if (role)
            tl.fromTo(
              role,
              { opacity: 0, y: -20 },
              { opacity: 1, y: 0, duration: 0.3 },
              0.45
            );

          if (quote)
            tl.fromTo(
              quote,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.4 },
              0.5
            );
        });
      }

      // Logo grid — fill in like Tetris row then line-clear flash
      if (logoGridRef.current) {
        const cells = logoGridRef.current.querySelectorAll(".logo-cell");

        const logoTl = gsap.timeline({
          scrollTrigger: {
            trigger: logoGridRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        logoTl.fromTo(
          cells,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.05,
            duration: 0.3,
            ease: "power2.out",
          }
        );

        const flashOverlays = logoGridRef.current.querySelectorAll(".flash-overlay");
        if (flashOverlays.length) {
          logoTl.fromTo(
            flashOverlays,
            { x: "-100%", opacity: 0 },
            { x: "100%", opacity: 0.4, duration: 0.6, ease: "power2.inOut" },
            `>-0.1`
          );
          logoTl.to(flashOverlays, { opacity: 0, duration: 0.2 });
        }

        // logos stay full color
      }

      // Bridge line fade
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
    },
    { scope: sectionRef }
  );

  const headlineWords =
    "Trusted to Build Systems That Run in Production".split(" ");

  // Each 1x1 cell in the grid is a square. The grid is 8 columns.
  // We use explicit grid-column / grid-row placement so nothing shifts.
  //
  // Layout (desktop):
  //   Row 1: SickSyx [1-4](3x1)  | client-2 [4-6](2x2) | EntryBridge [6-7] | GradeGuru [7-8] | Kull [8-9]
  //   Row 2: client-1 [1-2]      | HouseOfPehr [2-3]    | Scholaraxis [3-4] | (client-2 cont) | filler [6-7] | filler [7-8] | filler [8-9]
  //
  // SickSyx = 3 cols, 1 row (wide horizontal bar)
  // client-2 = 2 cols, 2 rows (big square)
  // everything else = 1x1 square

  return (
    <>
      <section
        id="testimonials"
        ref={sectionRef}
        className="relative py-24 md:py-32 bg-void overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(92,81,74,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(92,81,74,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      >
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

          {/* Intro text */}
          <p
            ref={introRef}
            className="text-stone-400 text-sm md:text-base max-w-2xl mb-12 md:mb-16"
            style={{ opacity: 0 }}
          >
            Real-world execution across complex workflows, internal platforms,
            and production-grade systems. Here&apos;s what our partners have to
            say.
          </p>

          {/* Testimonial cards */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-28"
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="testimonial-card relative p-4 md:p-5 rounded-sm"
                data-color={t.color}
                style={{
                  border: `1px solid transparent`,
                  backgroundColor: colors.surface,
                }}
              >
                {/* Square block icon — top right */}
                <div className="absolute top-3 right-3 opacity-0">
                  <BlockIcon color={t.color} />
                </div>

                {/* Context tag with left border accent */}
                <span
                  className="card-ctx inline-block font-mono text-xs tracking-wider uppercase mb-3 pl-2"
                  style={{ opacity: 0, borderLeft: `2px solid ${t.color}`, color: t.color }}
                >
                  {t.contextTag}
                </span>

                {/* Video thumbnail — portrait 9:16 */}
                <div
                  className="card-thumb aspect-[9/16] relative rounded-sm overflow-hidden mb-4 cursor-pointer group"
                  style={{ opacity: 0 }}
                  onClick={() => setActiveVideo(t.video)}
                >
                  <Image
                    src={t.thumb}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-void/40 group-hover:bg-void/20 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full border-2 border-chalk/70 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg
                        width="18"
                        height="20"
                        viewBox="0 0 18 20"
                        fill="none"
                        className="ml-1"
                      >
                        <path
                          d="M0 0L18 10L0 20V0Z"
                          fill="currentColor"
                          className="text-chalk/90"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Name */}
                <h4
                  className="card-name font-display text-lg text-chalk mb-0.5"
                  style={{ opacity: 0 }}
                >
                  {t.name}
                </h4>

                {/* Role */}
                <p
                  className="card-role font-mono text-xs text-stone-400 mb-3"
                  style={{ opacity: 0 }}
                >
                  {t.role}
                </p>

                {/* Quote */}
                <p
                  className="card-quote text-sm text-stone-400 leading-relaxed"
                  style={{ opacity: 0 }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>

          {/* ── Client logos heading ── */}
          <p className="text-center text-stone-400 text-sm md:text-base font-mono mb-8">&ldquo;Revenue isn&apos;t luck &mdash; it&apos;s systems stacked right, row after row.&rdquo;</p>

          {/* ── Client logos — Tetris grid ── */}
          <div className="relative" ref={logoGridRef}>

            {/* ── MOBILE grid (4 cols, 6 rows) ── */}
            <div
              className="grid md:hidden gap-px relative"
              style={{
                backgroundColor: `${colors.stone[600]}10`,
                gridTemplateColumns: "repeat(4, 1fr)",
                gridTemplateRows: "repeat(6, 1fr)",
              }}
            >
              {/* Row 1: SickSyx (cols 1-3), filler */}
              <div
                className="logo-cell client-logo relative overflow-hidden"
                style={{ gridColumn: "1 / 4", gridRow: "1 / 2", border: `1px solid ${colors.accent}66`, backgroundColor: colors.chalk, opacity: 0 }}
              >
                <Image src="/images/clients/SickSyx11.png" alt="SickSyx" fill className="object-contain" />
              </div>
              <div className="logo-cell aspect-square" style={{ gridColumn: "4 / 5", gridRow: "1 / 2", border: `1px solid ${colors.stone[600]}`, backgroundColor: colors.surface, backgroundImage: `repeating-linear-gradient(45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px), repeating-linear-gradient(-45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px)`, opacity: 0 }} />

              {/* Row 2: Kull, client-1, filler, HouseOfPehr */}
              <div
                className="logo-cell client-logo relative overflow-hidden aspect-square"
                style={{ gridColumn: "1 / 2", gridRow: "2 / 3", border: `1px solid ${colors.ember}66`, backgroundColor: colors.chalk, opacity: 0 }}
              >
                <Image src="/images/clients/Kull.png" alt="Kull" fill className="object-cover" />
              </div>
              <div
                className="logo-cell client-logo relative overflow-hidden aspect-square"
                style={{ gridColumn: "2 / 3", gridRow: "2 / 3", border: `1px solid ${colors.accentMuted}66`, backgroundColor: colors.chalk, opacity: 0 }}
              >
                <Image src="/images/clients/client-1.png" alt="Client" fill className="object-cover" />
              </div>
              <div className="logo-cell aspect-square" style={{ gridColumn: "3 / 4", gridRow: "2 / 3", border: `1px solid ${colors.accent}66`, backgroundColor: colors.surface, backgroundImage: `repeating-linear-gradient(45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px), repeating-linear-gradient(-45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px)`, opacity: 0 }} />
              <div
                className="logo-cell client-logo relative overflow-hidden aspect-square"
                style={{ gridColumn: "4 / 5", gridRow: "2 / 3", border: `1px solid ${colors.accentMuted}66`, backgroundColor: colors.chalk, opacity: 0 }}
              >
                <Image src="/images/clients/houseofpehr.webp" alt="House of Pehr" fill className="object-contain p-2" />
              </div>

              {/* Rows 3-4: Space.Labs (cols 1-3, spans 2 rows), fillers col 4 */}
              <div
                className="logo-cell client-logo relative overflow-hidden"
                style={{ gridColumn: "1 / 4", gridRow: "3 / 5", border: `1px solid ${colors.ember}66`, backgroundColor: colors.chalk, opacity: 0 }}
              >
                <Image src="/images/clients/client-2.png" alt="Space.Labs" fill className="object-contain p-2" />
              </div>
              <div className="logo-cell aspect-square" style={{ gridColumn: "4 / 5", gridRow: "3 / 4", border: `1px solid ${colors.ember}66`, backgroundColor: colors.surface, backgroundImage: `repeating-linear-gradient(45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px), repeating-linear-gradient(-45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px)`, opacity: 0 }} />
              <div className="logo-cell aspect-square" style={{ gridColumn: "4 / 5", gridRow: "4 / 5", border: `1px solid ${colors.accentMuted}66`, backgroundColor: colors.surface, backgroundImage: `repeating-linear-gradient(45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px), repeating-linear-gradient(-45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px)`, opacity: 0 }} />

              {/* Row 5: Scholaraxis, filler, filler, GradeGuru */}
              <div
                className="logo-cell client-logo relative overflow-hidden aspect-square"
                style={{ gridColumn: "1 / 2", gridRow: "5 / 6", border: `1px solid ${colors.ember}66`, backgroundColor: "#FFFFFF", opacity: 0 }}
              >
                <Image src="/images/clients/Scholaraxis.png" alt="Scholaraxis" fill className="object-contain p-2" />
              </div>
              <div className="logo-cell aspect-square" style={{ gridColumn: "2 / 3", gridRow: "5 / 6", border: `1px solid ${colors.accent}66`, backgroundColor: colors.surface, backgroundImage: `repeating-linear-gradient(45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px), repeating-linear-gradient(-45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px)`, opacity: 0 }} />
              <div className="logo-cell aspect-square" style={{ gridColumn: "3 / 4", gridRow: "5 / 6", border: `1px solid ${colors.ember}66`, backgroundColor: colors.surface, backgroundImage: `repeating-linear-gradient(45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px), repeating-linear-gradient(-45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px)`, opacity: 0 }} />
              <div
                className="logo-cell client-logo relative overflow-hidden aspect-square"
                style={{ gridColumn: "4 / 5", gridRow: "5 / 6", border: `1px solid ${colors.accent}66`, backgroundColor: colors.chalk, opacity: 0 }}
              >
                <Image src="/images/clients/GradeGuru11.png" alt="GradeGuru" fill className="object-cover" />
              </div>

              {/* Row 6: EntryBridge, fillers */}
              <div
                className="logo-cell client-logo relative overflow-hidden aspect-square"
                style={{ gridColumn: "1 / 2", gridRow: "6 / 7", border: `1px solid ${colors.accentMuted}66`, backgroundColor: colors.chalk, opacity: 0 }}
              >
                <Image src="/images/clients/EntryBridge.jpg" alt="EntryBridge" fill className="object-cover" />
              </div>
              <div className="logo-cell aspect-square" style={{ gridColumn: "2 / 3", gridRow: "6 / 7", border: `1px solid ${colors.stone[600]}`, backgroundColor: colors.surface, backgroundImage: `repeating-linear-gradient(45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px), repeating-linear-gradient(-45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px)`, opacity: 0 }} />
              <div className="logo-cell aspect-square" style={{ gridColumn: "3 / 4", gridRow: "6 / 7", border: `1px solid ${colors.accent}66`, backgroundColor: colors.surface, backgroundImage: `repeating-linear-gradient(45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px), repeating-linear-gradient(-45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px)`, opacity: 0 }} />
              <div className="logo-cell aspect-square" style={{ gridColumn: "4 / 5", gridRow: "6 / 7", border: `1px solid ${colors.ember}66`, backgroundColor: colors.surface, backgroundImage: `repeating-linear-gradient(45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px), repeating-linear-gradient(-45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px)`, opacity: 0 }} />

              {/* Line-clear flash overlay (mobile) */}
              <div
                className="absolute inset-0 pointer-events-none z-10 flash-overlay"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(45,212,191,0.3), rgba(45,212,191,0.5), rgba(45,212,191,0.3), transparent)",
                  opacity: 0,
                }}
              />
            </div>

            {/* ── DESKTOP grid (11 cols, 2 rows) — unchanged ── */}
            <div
              className="hidden md:grid gap-px relative"
              style={{
                backgroundColor: `${colors.stone[600]}10`,
                gridTemplateColumns: "repeat(11, 1fr)",
                gridTemplateRows: "repeat(2, 1fr)",
              }}
            >
              {/* ── ROW 1 ── */}

              {/* SickSyx — 3x1 */}
              <div
                className="logo-cell client-logo relative overflow-hidden"
                style={{ gridColumn: "1 / 4", gridRow: "1 / 2", border: `1px solid ${colors.accent}66`, backgroundColor: colors.chalk, opacity: 0 }}
              >
                <Image src="/images/clients/SickSyx11.png" alt="SickSyx" fill className="object-contain" />
              </div>

              {/* filler */}
              <div className="logo-cell aspect-square" style={{ gridColumn: "4 / 5", gridRow: "1 / 2", border: `1px solid ${colors.stone[600]}`, backgroundColor: colors.surface, backgroundImage: `repeating-linear-gradient(45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px), repeating-linear-gradient(-45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px)`, opacity: 0 }} />

              {/* Space.Labs — 4x2 */}
              <div
                className="logo-cell client-logo relative overflow-hidden"
                style={{ gridColumn: "5 / 9", gridRow: "1 / 3", border: `1px solid ${colors.ember}66`, backgroundColor: colors.chalk, opacity: 0 }}
              >
                <Image src="/images/clients/client-2.png" alt="Space.Labs" fill className="object-contain p-2" />
              </div>

              {/* filler col 9 */}
              <div className="logo-cell aspect-square" style={{ gridColumn: "9 / 10", gridRow: "1 / 2", border: `1px solid ${colors.ember}66`, backgroundColor: colors.surface, backgroundImage: `repeating-linear-gradient(45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px), repeating-linear-gradient(-45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px)`, opacity: 0 }} />

              {/* Kull — 1x1 */}
              <div
                className="logo-cell client-logo relative overflow-hidden aspect-square"
                style={{ gridColumn: "10 / 11", gridRow: "1 / 2", border: `1px solid ${colors.ember}66`, backgroundColor: colors.chalk, opacity: 0 }}
              >
                <Image src="/images/clients/Kull.png" alt="Kull" fill className="object-cover" />
              </div>

              {/* filler col 11 */}
              <div className="logo-cell aspect-square" style={{ gridColumn: "11 / 12", gridRow: "1 / 2", border: `1px solid ${colors.accentMuted}66`, backgroundColor: colors.surface, backgroundImage: `repeating-linear-gradient(45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px), repeating-linear-gradient(-45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px)`, opacity: 0 }} />

              {/* ── ROW 2 ── (Space.Labs continues cols 5-8) */}

              {/* client-1 — 1x1 */}
              <div
                className="logo-cell client-logo relative overflow-hidden aspect-square"
                style={{ gridColumn: "1 / 2", gridRow: "2 / 3", border: `1px solid ${colors.accentMuted}66`, backgroundColor: colors.chalk, opacity: 0 }}
              >
                <Image src="/images/clients/client-1.png" alt="Client" fill className="object-cover" />
              </div>

              {/* fillers cols 2-3 */}
              <div className="logo-cell aspect-square" style={{ gridColumn: "2 / 3", gridRow: "2 / 3", border: `1px solid ${colors.accent}66`, backgroundColor: colors.surface, backgroundImage: `repeating-linear-gradient(45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px), repeating-linear-gradient(-45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px)`, opacity: 0 }} />
              <div className="logo-cell aspect-square" style={{ gridColumn: "3 / 4", gridRow: "2 / 3", border: `1px solid ${colors.ember}66`, backgroundColor: colors.surface, backgroundImage: `repeating-linear-gradient(45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px), repeating-linear-gradient(-45deg, ${colors.accent}20, ${colors.accent}20 1px, transparent 1px, transparent 6px)`, opacity: 0 }} />

              {/* House of Pehr — 1x1 (col 4) */}
              <div
                className="logo-cell client-logo relative overflow-hidden aspect-square"
                style={{ gridColumn: "4 / 5", gridRow: "2 / 3", border: `1px solid ${colors.accentMuted}66`, backgroundColor: colors.chalk, opacity: 0 }}
              >
                <Image src="/images/clients/houseofpehr.webp" alt="House of Pehr" fill className="object-contain p-2" />
              </div>

              {/* (Space.Labs occupies 5-8) */}

              {/* Scholaraxis — 1x1 */}
              <div
                className="logo-cell client-logo relative overflow-hidden aspect-square"
                style={{ gridColumn: "9 / 10", gridRow: "2 / 3", border: `1px solid ${colors.ember}66`, backgroundColor: "#FFFFFF", opacity: 0 }}
              >
                <Image src="/images/clients/Scholaraxis.png" alt="Scholaraxis" fill className="object-contain p-2" />
              </div>

              {/* GradeGuru — 1x1 */}
              <div
                className="logo-cell client-logo relative overflow-hidden aspect-square"
                style={{ gridColumn: "10 / 11", gridRow: "2 / 3", border: `1px solid ${colors.accent}66`, backgroundColor: colors.chalk, opacity: 0 }}
              >
                <Image src="/images/clients/GradeGuru11.png" alt="GradeGuru" fill className="object-cover" />
              </div>

              {/* EntryBridge — 1x1 */}
              <div
                className="logo-cell client-logo relative overflow-hidden aspect-square"
                style={{ gridColumn: "11 / 12", gridRow: "2 / 3", border: `1px solid ${colors.accentMuted}66`, backgroundColor: colors.chalk, opacity: 0 }}
              >
                <Image src="/images/clients/EntryBridge.jpg" alt="EntryBridge" fill className="object-cover" />
              </div>

              {/* Line-clear flash overlay (desktop) */}
              <div
                className="absolute inset-0 pointer-events-none z-10 flash-overlay"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(45,212,191,0.3), rgba(45,212,191,0.5), rgba(45,212,191,0.3), transparent)",
                  opacity: 0,
                }}
              />
            </div>
          </div>

          {/* Bridge line */}
          <p
            ref={bridgeRef}
            className="text-center text-stone-600 text-sm font-mono mt-12 md:mt-16"
            style={{ opacity: 0 }}
          >
            Systems built. Revenue unlocked. Proof assembled.
          </p>
        </Container>
      </section>

      <VideoModal videoSrc={activeVideo} onClose={closeModal} />
    </>
  );
}
