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

const CLIENTS = [
  { name: "SickSyx", logo: "/images/clients/SickSyx11.png", color: colors.accent, id: "LOG-01", span: "md:col-span-2 md:row-span-1" },
  { name: "Space.Labs", logo: "/images/clients/client-2.png", color: colors.ember, id: "LOG-02", span: "md:col-span-1 md:row-span-2" },
  { name: "Kull", logo: "/images/clients/Kull.png", color: colors.accent, id: "LOG-03", span: "md:col-span-1 md:row-span-1" },
  { name: "Scholaraxis", logo: "/images/clients/Scholaraxis.png", color: colors.ember, id: "LOG-04", span: "md:col-span-1 md:row-span-1" },
  { name: "GradeGuru", logo: "/images/clients/GradeGuru11.png", color: colors.accentMuted, id: "LOG-05", span: "md:col-span-1 md:row-span-1" },
  { name: "House of Pehr", logo: "/images/clients/houseofpehr.webp", color: colors.accent, id: "LOG-06", span: "md:col-span-1 md:row-span-1" },
  { name: "EntryBridge", logo: "/images/clients/EntryBridge.jpg", color: colors.ember, id: "LOG-07", span: "md:col-span-2 md:row-span-1" },
  { name: "Client 1", logo: "/images/clients/client-1.png", color: colors.accentMuted, id: "LOG-08", span: "md:col-span-2 md:row-span-1" },
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

      // Per-card block assembly
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

      // Logo grid — Technical HUD reveal
      if (logoGridRef.current) {
        const cells = logoGridRef.current.querySelectorAll(".logo-cell");

        gsap.fromTo(
          cells,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: logoGridRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
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

          {/* ── Client logos — Technical HUD Grid ── */}
          <div className="relative mb-8 overflow-hidden rounded-sm">
            {/* Background Neural Glows */}
            <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-ember/5 blur-[120px] rounded-full pointer-events-none" />

            <div 
              ref={logoGridRef}
              className="grid grid-cols-2 md:grid-cols-4 grid-flow-dense gap-3 md:gap-4 relative z-10"
            >
              {CLIENTS.map((client) => (
                <div
                  key={client.id}
                  className={`logo-cell relative group p-6 md:p-8 flex items-center justify-center overflow-hidden rounded-sm transition-all duration-300 hover:z-20 ${client.span}`}
                  style={{
                    backgroundColor: `${colors.surface}40`,
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${colors.stone[600]}20`,
                    minHeight: "160px",
                    opacity: 0, // Animated via GSAP
                  }}
                >
                  {/* Theme-integrated Spotlight */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] group-hover:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] transition-colors duration-500" />
                  
                  {/* HUD Corner Accents */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/5 group-hover:border-accent/60 transition-colors" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/5 group-hover:border-accent/60 transition-colors" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/5 group-hover:border-accent/60 transition-colors" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/5 group-hover:border-accent/60 transition-colors" />

                  {/* Logo with original colors */}
                  <div className="relative w-full h-full max-w-[85%] max-h-[85%] transition-all duration-700 group-hover:scale-105">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>

                  {/* Ambient glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                       style={{ background: `radial-gradient(circle at center, ${client.color}, transparent 70%)` }} />

                  {/* Technical scan line */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/3 w-full -translate-y-full group-hover:animate-scan pointer-events-none" />
                </div>
              ))}
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
