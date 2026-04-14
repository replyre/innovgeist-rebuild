"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";
import type { InsightPost, ArticleBlock } from "@/lib/insights";

/* ─── Block renderers ─── */

function renderBlock(block: ArticleBlock, color: string, key: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p
          key={key}
          className="text-stone-400 leading-[1.85] mb-0"
          style={{ fontSize: "clamp(0.9375rem, 1.4vw, 1.0625rem)" }}
        >
          {block.text}
        </p>
      );

    case "subheading":
      return (
        <h4
          key={key}
          className="font-display text-chalk mt-2 mb-0"
          style={{ fontSize: "clamp(1rem, 1.6vw, 1.2rem)" }}
        >
          {block.text}
        </h4>
      );

    case "callout":
      return (
        <blockquote
          key={key}
          className="pl-5 py-1 my-0"
          style={{ borderLeft: `3px solid ${color}` }}
        >
          <p
            className="font-display text-chalk"
            style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.3rem)", lineHeight: 1.4 }}
          >
            {block.text}
          </p>
        </blockquote>
      );

    case "list":
      return (
        <ul key={key} className="space-y-3 mb-0">
          {block.items.map((item, ii) => (
            <li
              key={ii}
              className="flex items-start gap-3 text-stone-400 leading-relaxed"
              style={{ fontSize: "clamp(0.9375rem, 1.4vw, 1.0625rem)" }}
            >
              <span
                className="mt-[9px] shrink-0 w-1 h-1 rounded-full"
                style={{ backgroundColor: color }}
              />
              {item}
            </li>
          ))}
        </ul>
      );
  }
}

/* ─── Article section ─── */

function ArticleSection({
  section,
  color,
  isLast,
}: {
  section: InsightPost["sections"][0];
  color: string;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 87%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  /* "connection" and "closing" sections get quieter styling */
  const isReflective =
    section.id === "connection" || section.id === "closing";

  return (
    <div
      ref={ref}
      className={`py-8 md:py-10 ${!isLast ? "border-b" : ""}`}
      style={{ borderColor: `${colors.stone[600]}15`, opacity: 0 }}
    >
      {/* Section title */}
      <p
        className={`font-mono text-[10px] tracking-[0.25em] uppercase mb-5 ${
          isReflective ? "text-stone-600" : ""
        }`}
        style={isReflective ? {} : { color: `${color}80` }}
      >
        {section.title}
      </p>

      {/* Content blocks */}
      <div className="flex flex-col gap-5">
        {section.blocks.map((block, bi) => renderBlock(block, color, bi))}
      </div>
    </div>
  );
}

/* ─── Article header ─── */

function ArticleHeader({ post }: { post: InsightPost }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!headerRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });

      if (labelRef.current) {
        tl.fromTo(labelRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
      }

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.2"
        );
      }

      if (deckRef.current) {
        tl.fromTo(
          deckRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.3"
        );
      }

      if (metaRef.current) {
        tl.fromTo(
          metaRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2"
        );
      }
    },
    { scope: headerRef }
  );

  return (
    <div
      ref={headerRef}
      className="relative pt-[72px] pb-12 md:pb-16 overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(92,81,74,0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(92,81,74,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "72px 72px",
      }}
    >
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 80% 20%, ${post.color}08 0%, transparent 70%)`,
        }}
      />

      <Container className="relative z-10 pt-16 md:pt-24">
        <div className="max-w-2xl">
          {/* Back + category */}
          <div
            ref={labelRef}
            className="flex items-center gap-4 mb-8"
            style={{ opacity: 0 }}
          >
            <a
              href="/insights"
              className="inline-flex items-center gap-2 font-mono text-xs text-stone-600 hover:text-stone-400 transition-colors"
            >
              <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
                <path
                  d="M9 6H2m0 0l3-3M2 6l3 3"
                  stroke="currentColor"
                  strokeWidth={1.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Insights
            </a>
            <span className="text-stone-600 font-mono text-xs">/</span>
            <span
              className="font-mono text-xs tracking-[0.2em] uppercase"
              style={{ color: post.color }}
            >
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="font-display text-chalk mb-5"
            style={{
              fontSize: "clamp(1.7rem, 3.8vw, 2.8rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              opacity: 0,
            }}
          >
            {post.title}
          </h1>

          {/* Deck */}
          <p
            ref={deckRef}
            className="text-stone-400 leading-relaxed mb-7"
            style={{
              fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)",
              opacity: 0,
            }}
          >
            {post.deck}
          </p>

          {/* Meta */}
          <div
            ref={metaRef}
            className="flex items-center gap-3"
            style={{ opacity: 0 }}
          >
            <span
              className="font-mono text-[10px] tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm"
              style={{
                color: post.color,
                border: `1px solid ${post.color}28`,
                backgroundColor: `${post.color}07`,
              }}
            >
              {post.category}
            </span>
            <span className="font-mono text-xs text-stone-600">
              {post.author}&nbsp;&middot;&nbsp;{post.date}&nbsp;&middot;&nbsp;{post.readingTime}
            </span>
          </div>
        </div>
      </Container>

      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${colors.void})` }}
      />
    </div>
  );
}

/* ─── Article CTA ─── */

function ArticleCTA({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className="py-12 md:py-16"
      style={{ borderTop: `1px solid ${colors.stone[600]}18`, opacity: 0 }}
    >
      <p className="font-mono text-xs text-stone-600 tracking-widest uppercase mb-5">
        Continue
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="/contact"
          className="inline-flex items-center gap-2 font-mono text-sm transition-all duration-300 group"
          style={{ color }}
        >
          Discuss Automation
          <svg
            width={13}
            height={13}
            viewBox="0 0 12 12"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            <path
              d="M3 6h7m0 0L7 3m3 3L7 9"
              stroke="currentColor"
              strokeWidth={1.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <span className="hidden sm:block text-stone-600 font-mono text-sm self-center">·</span>
        <a
          href="https://gradeguru.innovgeist.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-sm transition-all duration-300 group"
          style={{ color: colors.ember }}
        >
          Explore Academic Operating System
          <svg
            width={13}
            height={13}
            viewBox="0 0 12 12"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            <path
              d="M3 6h7m0 0L7 3m3 3L7 9"
              stroke="currentColor"
              strokeWidth={1.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ─── Progress bar ─── */

function ReadingProgress({ color }: { color: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!barRef.current) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (barRef.current) {
        barRef.current.style.width = `${progress}%`;
      }
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  });

  return (
    <div
      className="fixed top-[72px] left-0 right-0 h-[2px] z-40 pointer-events-none"
      style={{ backgroundColor: `${color}15` }}
    >
      <div
        ref={barRef}
        className="h-full transition-none"
        style={{ width: "0%", backgroundColor: color }}
      />
    </div>
  );
}

/* ─── Main export ─── */

export function InsightDetailPage({ post }: { post: InsightPost }) {
  return (
    <main>
      <ReadingProgress color={post.color} />
      <ArticleHeader post={post} />

      <section
        className="relative"
        style={{ borderTop: `1px solid ${colors.stone[600]}15` }}
      >
        <Container>
          {/* Article body — narrow reading column */}
          <div className="max-w-2xl py-4 md:py-6">
            {post.sections.map((section, i) => (
              <ArticleSection
                key={section.id}
                section={section}
                color={post.color}
                isLast={i === post.sections.length - 1}
              />
            ))}

            <ArticleCTA color={post.color} />
          </div>
        </Container>
      </section>
    </main>
  );
}
