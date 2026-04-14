"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";
import type { CaseStudyDetailData, DetailSection, SectionBlock } from "@/lib/case-studies";

/* ─── Block renderers ─── */

function ParagraphBlock({ text, color }: { text: string; color: string }) {
  const isLabel =
    text.length < 60 && !text.includes(",") && !text.endsWith(".");
  if (isLabel) {
    return (
      <p
        className="font-mono text-[10px] tracking-[0.22em] uppercase mb-3"
        style={{ color: color + "90" }}
      >
        {text}
      </p>
    );
  }
  return (
    <p className="text-stone-400 type-body leading-relaxed mb-0">{text}</p>
  );
}

function ListBlock({ items, color }: { items: string[]; color: string }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-stone-400 type-body">
          <span
            className="mt-[8px] shrink-0 w-1 h-1 rounded-full"
            style={{ backgroundColor: color }}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ComponentsBlock({
  items,
  color,
}: {
  items: { title: string; desc: string }[];
  color: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item) => (
        <div
          key={item.title}
          className="p-4 md:p-5 rounded-sm"
          style={{
            border: `1px solid ${color}20`,
            backgroundColor: `${color}05`,
          }}
        >
          <p
            className="text-chalk type-small font-medium mb-1.5 pl-3"
            style={{ borderLeft: `2px solid ${color}60` }}
          >
            {item.title}
          </p>
          <p className="text-stone-400 type-small leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

function renderBlock(block: SectionBlock, color: string, idx: number) {
  switch (block.type) {
    case "paragraph":
      return <ParagraphBlock key={idx} text={block.text} color={color} />;
    case "list":
      return <ListBlock key={idx} items={block.items} color={color} />;
    case "components":
      return <ComponentsBlock key={idx} items={block.items} color={color} />;
  }
}

/* ─── Single section ─── */

function SectionItem({
  section,
  color,
  isLast,
}: {
  section: DetailSection;
  color: string;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
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

  return (
    <div
      ref={ref}
      className={`relative py-10 md:py-12 ${!isLast ? "border-b" : ""}`}
      style={{ borderColor: `${colors.stone[600]}18`, opacity: 0 }}
    >
      {/* Large background number */}
      <div
        className="absolute top-8 right-0 font-display select-none pointer-events-none hidden lg:block"
        style={{
          fontSize: "clamp(4rem, 8vw, 7rem)",
          lineHeight: 1,
          color: `${color}07`,
          letterSpacing: "-0.03em",
        }}
      >
        {section.num}
      </div>

      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <span
          className="font-mono text-xs tracking-[0.22em]"
          style={{ color }}
        >
          {section.num}
        </span>
        <div
          className="h-px w-6"
          style={{ backgroundColor: `${color}40` }}
        />
        <h3 className="font-display text-chalk" style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}>
          {section.title}
        </h3>
      </div>

      {/* Blocks */}
      <div className="flex flex-col gap-5 max-w-2xl">
        {section.blocks.map((block, bi) => renderBlock(block, color, bi))}
      </div>
    </div>
  );
}

/* ─── Hero ─── */

function DetailHero({ data }: { data: CaseStudyDetailData }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const oneLinerRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!heroRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });

      if (labelRef.current) {
        tl.fromTo(labelRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
      }

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.2"
        );
      }

      if (oneLinerRef.current) {
        tl.fromTo(
          oneLinerRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.3"
        );
      }

      if (metaRef.current) {
        tl.fromTo(
          metaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2"
        );
      }
    },
    { scope: heroRef }
  );

  const META = [
    { label: "Industry", value: data.industry },
    { label: "Company Type", value: data.companyType },
    { label: "Engagement Type", value: data.engagementType },
    { label: "Status", value: data.status },
  ];

  return (
    <div
      ref={heroRef}
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
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 80% 20%, ${data.color}09 0%, transparent 70%)`,
        }}
      />

      <Container className="relative z-10 pt-16 md:pt-24">
        {/* Back link + label */}
        <div ref={labelRef} className="flex items-center gap-4 mb-8" style={{ opacity: 0 }}>
          <a
            href="/case-studies"
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
            Case Studies
          </a>
          <span className="text-stone-600 font-mono text-xs">/</span>
          <span
            className="font-mono text-xs tracking-[0.22em] uppercase"
            style={{ color: data.color }}
          >
            Case Study
          </span>
        </div>

        {/* Title */}
        <div ref={titleRef} className="mb-6 max-w-3xl" style={{ opacity: 0 }}>
          <h1
            className="font-display text-chalk"
            style={{
              fontSize: "clamp(1.6rem, 4vw, 3rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            {data.title}
          </h1>
        </div>

        {/* One-liner */}
        <p
          ref={oneLinerRef}
          className="text-stone-400 max-w-2xl leading-relaxed mb-10 md:mb-12"
          style={{ fontSize: "clamp(0.9375rem, 1.4vw, 1.0625rem)", opacity: 0 }}
        >
          {data.oneLiner}
        </p>

        {/* Metadata grid */}
        <div
          ref={metaRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-6 md:p-7 rounded-sm"
          style={{
            opacity: 0,
            border: `1px solid ${data.color}20`,
            backgroundColor: colors.surface,
          }}
        >
          {META.map((m) => (
            <div key={m.label}>
              <p
                className="font-mono text-[10px] tracking-[0.2em] uppercase mb-1.5"
                style={{ color: `${data.color}80` }}
              >
                {m.label}
              </p>
              <p className="text-chalk type-small font-medium">{m.value}</p>
            </div>
          ))}
        </div>
      </Container>

      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${colors.void})` }}
      />
    </div>
  );
}

/* ─── Tags ─── */

function DetailTags({ tags, color }: { tags: string[]; color: string }) {
  return (
    <div className="flex flex-wrap gap-2 mb-10 md:mb-12">
      {tags.map((tag) => (
        <span
          key={tag}
          className="font-mono text-[11px] tracking-[0.15em] px-3 py-1 rounded-sm"
          style={{
            color,
            border: `1px solid ${color}28`,
            backgroundColor: `${color}07`,
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

/* ─── Final CTA ─── */

function DetailCTA({ color }: { color: string }) {
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
      className="py-16 md:py-20"
      style={{
        borderTop: `1px solid ${colors.stone[600]}18`,
        opacity: 0,
      }}
    >
      <p
        className="font-display text-chalk mb-3"
        style={{ fontSize: "clamp(1.25rem, 2.5vw, 2rem)" }}
      >
        Interested in building a similar system?
      </p>
      <p className="text-stone-400 type-body mb-7 max-w-xl">
        Every engagement starts with a focused discovery conversation to
        understand your revenue workflows and system needs.
      </p>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button variant="primary" href="/contact">
          Discuss Automation
        </Button>
        <p className="font-mono text-xs text-stone-600">
          Consultative &middot; Selective engagements
        </p>
      </div>
    </div>
  );
}

/* ─── Main export ─── */

export function CaseStudyDetailPage({ data }: { data: CaseStudyDetailData }) {
  return (
    <main>
      <DetailHero data={data} />

      <section
        className="relative"
        style={{ borderTop: `1px solid ${colors.stone[600]}18` }}
      >
        <Container className="py-4 md:py-6">
          {/* System tags */}
          <div className="pt-10 md:pt-12">
            <p
              className="font-mono text-[10px] tracking-[0.22em] uppercase mb-4"
              style={{ color: colors.stone[600] }}
            >
              System Tags
            </p>
            <DetailTags tags={data.tags} color={data.color} />
          </div>

          {/* Divider */}
          <div
            className="h-px mb-0"
            style={{ backgroundColor: `${colors.stone[600]}18` }}
          />

          {/* All sections */}
          {data.sections.map((section, i) => (
            <SectionItem
              key={section.num}
              section={section}
              color={data.color}
              isLast={i === data.sections.length - 1}
            />
          ))}

          {/* CTA */}
          <DetailCTA color={data.color} />
        </Container>
      </section>
    </main>
  );
}
