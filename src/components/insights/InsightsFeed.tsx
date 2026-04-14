"use client";

import { useRef, useState, useCallback } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";
import {
  INSIGHT_POSTS,
  INSIGHT_CATEGORIES,
  type InsightPost,
} from "@/lib/insights";

/* ─── Single post card ─── */

function PostCard({
  post,
  index,
}: {
  post: InsightPost;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useGSAP(
    () => {
      if (!cardRef.current || hasAnimated.current) return;
      hasAnimated.current = true;

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          delay: (index % 2) * 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: cardRef }
  );

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col rounded-sm overflow-hidden"
      style={{
        opacity: 0,
        border: `1px solid ${post.color}22`,
        backgroundColor: colors.surface,
      }}
    >
      {/* Top accent */}
      <div className="h-[2px] w-full" style={{ backgroundColor: post.color }} />

      <div className="flex flex-col flex-1 p-7 md:p-8">
        {/* Category */}
        <p
          className="font-mono text-[10px] tracking-[0.22em] uppercase mb-4"
          style={{ color: `${post.color}90` }}
        >
          {post.category}
        </p>

        {/* Title */}
        <h2
          className="font-display text-chalk mb-3 leading-snug transition-colors duration-300 group-hover:text-accent"
          style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)" }}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-stone-400 type-small leading-relaxed mb-6 flex-1 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Meta + link */}
        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: `1px solid ${colors.stone[600]}20` }}
        >
          <p className="font-mono text-[10px] text-stone-600 tracking-wide">
            {post.author}&nbsp;&middot;&nbsp;{post.readingTime}
          </p>

          <a
            href={`/insights/${post.slug}`}
            className="inline-flex items-center gap-1.5 font-mono text-xs transition-all duration-300"
            style={{ color: post.color }}
          >
            Read Article
            <svg
              width={11}
              height={11}
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
    </div>
  );
}

/* ─── Category tabs ─── */

function CategoryTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  const tabsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!tabsRef.current) return;
      gsap.fromTo(
        tabsRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tabsRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: tabsRef }
  );

  return (
    <div
      ref={tabsRef}
      className="flex flex-wrap gap-2 mb-10 md:mb-12"
      style={{ opacity: 0 }}
    >
      {INSIGHT_CATEGORIES.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className="font-mono text-[11px] tracking-[0.15em] px-3.5 py-1.5 rounded-sm transition-all duration-250 cursor-pointer"
            style={{
              border: `1px solid ${
                isActive ? `${colors.accent}60` : `${colors.stone[600]}28`
              }`,
              backgroundColor: isActive ? `${colors.accent}12` : "transparent",
              color: isActive ? colors.accent : colors.stone[600],
            }}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Export ─── */

export function InsightsFeed() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const handleCategory = useCallback((id: string) => {
    setActiveCategory(id);
  }, []);

  const filtered =
    activeCategory === "all"
      ? INSIGHT_POSTS
      : INSIGHT_POSTS.filter((p) => p.categoryId === activeCategory);

  useGSAP(
    () => {
      if (!ctaRef.current) return;
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-10 md:py-14 pb-24 md:pb-32">
      <Container>
        {/* Category tabs */}
        <CategoryTabs active={activeCategory} onChange={handleCategory} />

        {/* Post grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-16 md:mb-20">
            {filtered.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-stone-600 font-mono text-sm">
              No articles in this category yet.
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <div
          ref={ctaRef}
          className="pt-10 md:pt-12"
          style={{
            borderTop: `1px solid ${colors.stone[600]}18`,
            opacity: 0,
          }}
        >
          <p className="text-stone-400 type-body mb-5">
            Interested in how this thinking applies to your systems?
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 font-mono text-sm transition-colors duration-300 group"
              style={{ color: colors.accent }}
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
            <span className="hidden sm:block text-stone-600 font-mono text-sm">·</span>
            <a
              href="https://gradeguru.innovgeist.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm transition-colors duration-300 group"
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
      </Container>
    </section>
  );
}
