"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { colors } from "@/lib/theme";

/** Map progress p into a sub-range [start, end] → 0..1 */
function range(p: number, start: number, end: number): number {
  return Math.max(0, Math.min(1, (p - start) / (end - start)));
}

// ============================================================
// Visual 0: AUTOMATE — Sequential Pipeline
// ============================================================

function AutomateVisual({ progress }: { progress: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const refsReady = useRef(false);
  const elRefs = useRef<{
    nameInput: HTMLElement | null;
    emailInput: HTMLElement | null;
    submitBtn: HTMLElement | null;
    dots: HTMLElement[];
    emails: HTMLElement[];
    scoreNum: HTMLElement | null;
    scoreBar: HTMLElement | null;
    calSlots: HTMLElement[];
    confirmed: HTMLElement | null;
  }>({ nameInput: null, emailInput: null, submitBtn: null, dots: [], emails: [], scoreNum: null, scoreBar: null, calSlots: [], confirmed: null });

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    elRefs.current = {
      nameInput: el.querySelector(".name-input"),
      emailInput: el.querySelector(".email-input"),
      submitBtn: el.querySelector(".submit-btn"),
      dots: Array.from(el.querySelectorAll(".flow-dot")),
      emails: Array.from(el.querySelectorAll(".email-card")),
      scoreNum: el.querySelector(".score-num"),
      scoreBar: el.querySelector(".score-bar-fill"),
      calSlots: Array.from(el.querySelectorAll<HTMLElement>(".cal-slot")),
      confirmed: el.querySelector(".confirm-pulse"),
    };
    refsReady.current = true;
  }, []);

  useEffect(() => {
    if (!refsReady.current) return;
    const r = elRefs.current;

    // 0.00–0.10: name types in
    const nameP = range(progress, 0.00, 0.10);
    const nameText = "John Smith";
    const nameChars = Math.round(nameP * nameText.length);
    if (r.nameInput) {
      r.nameInput.textContent = nameChars > 0 ? nameText.slice(0, nameChars) + (nameP < 1 ? "|" : "") : "";
    }

    // 0.10–0.22: email types in
    const emailP = range(progress, 0.10, 0.22);
    const emailText = "lead@company.com";
    const emailChars = Math.round(emailP * emailText.length);
    if (r.emailInput) {
      r.emailInput.textContent = emailChars > 0 ? emailText.slice(0, emailChars) + (emailP < 1 ? "|" : "") : "";
    }

    // 0.22–0.32: submit button glows + presses
    const submitP = range(progress, 0.22, 0.32);
    if (r.submitBtn) {
      const pressing = submitP > 0 && submitP < 1;
      gsap.set(r.submitBtn, {
        scale: pressing ? 1 - submitP * 0.06 : 1,
        borderColor: submitP > 0 ? colors.accent : colors.stone[600] + "40",
        boxShadow: submitP > 0.3 ? `0 0 ${Math.round(submitP * 14)}px ${colors.accent}50` : "none",
      });
    }

    // 0.32–0.42: flow dots travel along connector
    const dotP = range(progress, 0.32, 0.42);
    r.dots.forEach((dot, i) => {
      const localP = range(dotP, i * 0.25, i * 0.25 + 0.5);
      gsap.set(dot, {
        x: localP * 120,
        opacity: localP > 0 && localP < 1 ? Math.sin(localP * Math.PI) : 0,
      });
    });

    // 0.42–0.68: emails glow + matching booking slots light up together
    // Day 1 (i=0) + slot 0, Day 3 (i=1) + slot 2, Day 7 (i=2) + slot 6
    const EMAIL_TO_SLOT = [0, 2, 6];
    const emailColors = [colors.accent, colors.accentMuted, colors.ember];
    const dripP = range(progress, 0.42, 0.68);
    r.emails.forEach((email, i) => {
      const localP = range(dripP, i * 0.28, i * 0.28 + 0.3);
      const active = localP > 0.5;
      const c = emailColors[i];
      gsap.set(email, {
        borderColor: active ? c + "60" : colors.stone[600] + "20",
        boxShadow: active ? `0 0 6px ${c}30` : "none",
      });
      const slot = r.calSlots[EMAIL_TO_SLOT[i]];
      if (slot) {
        gsap.set(slot, {
          backgroundColor: active ? c : colors.stone[600] + "15",
          boxShadow: active ? `0 0 4px ${c}30` : "none",
        });
      }
    });

    // 0.68–0.78: Day 10 slot lights up (purple) + confirmed appears with flash — together
    const day10P = range(progress, 0.68, 0.78);
    const slot10 = r.calSlots[9];
    if (slot10) {
      const active10 = day10P > 0.3;
      gsap.set(slot10, {
        backgroundColor: active10 ? "#A78BFA" : colors.stone[600] + "15",
        boxShadow: active10 ? `0 0 4px #A78BFA30` : "none",
      });
    }
    if (r.confirmed) {
      const flashP = range(day10P, 0.5, 1.0);
      const flashIntensity = flashP > 0 && flashP < 1 ? Math.sin(flashP * Math.PI) : 0;
      gsap.set(r.confirmed, {
        opacity: day10P > 0.3 ? 1 : 0,
        scale: day10P > 0.3 ? 1 : 0.8,
        filter: flashIntensity > 0 ? `brightness(${1 + flashIntensity * 1.5})` : "none",
        boxShadow: flashIntensity > 0 ? `0 0 ${Math.round(flashIntensity * 20)}px ${colors.accent}60` : "none",
      });
    }

    // 0.78–0.92: score counts 0→87, bar fills
    const scoreP = range(progress, 0.78, 0.92);
    if (r.scoreNum) {
      r.scoreNum.textContent = String(Math.round(scoreP * 87));
    }
    if (r.scoreBar) {
      gsap.set(r.scoreBar, { scaleX: scoreP * 0.87 });
    }
  }, [progress]);

  return (
    <div ref={containerRef} className="relative h-full w-full flex flex-col items-center justify-center gap-3 p-4 md:p-6">
      {/* Top row: Form + connector + Email Drip */}
      <div className="w-full flex items-center justify-between gap-2 relative">
        {/* Form mock */}
        <div className="flex-1 border border-stone-600/30 rounded-[2px] p-2 md:p-3" style={{ backgroundColor: colors.surface }}>
          <div className="font-mono text-[8px] md:text-[9px] tracking-[0.15em] text-stone-600 mb-2">CAPTURE FORM</div>
          <div className="flex flex-col gap-1.5">
            {/* Name field */}
            <div className="h-4 md:h-5 border border-stone-600/20 rounded-[1px] px-1.5 flex items-center">
              <span className="name-input font-mono text-[7px] md:text-[8px] text-stone-400"></span>
            </div>
            {/* Email field */}
            <div className="h-4 md:h-5 border border-stone-600/20 rounded-[1px] px-1.5 flex items-center">
              <span className="email-input font-mono text-[7px] md:text-[8px] text-stone-400"></span>
            </div>
            {/* Submit — border-only CTA */}
            <div
              className="submit-btn h-5 md:h-6 rounded-[1px] flex items-center justify-center border"
              style={{ borderColor: colors.stone[600] + "40", backgroundColor: "transparent" }}
            >
              <span className="font-mono text-[7px] md:text-[8px] font-bold" style={{ color: colors.accent }}>SUBMIT</span>
            </div>
          </div>
        </div>

        {/* Arrow connector with flow dots */}
        <div className="relative w-8 md:w-12 flex items-center justify-center overflow-hidden">
          <div className="w-full h-px" style={{ backgroundColor: colors.stone[600] + "40" }} />
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flow-dot absolute w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: colors.accent, opacity: 0, left: -6 }}
            />
          ))}
        </div>

        {/* Email drip stack */}
        <div className="flex-1 flex flex-col gap-1" style={{ minWidth: 0 }}>
          <div className="font-mono text-[8px] md:text-[9px] tracking-[0.15em] text-stone-600 mb-1">EMAIL DRIP</div>
          {[
            { day: "Day 1", label: "Welcome", status: colors.accent },
            { day: "Day 3", label: "Case Study", status: colors.accentMuted },
            { day: "Day 7", label: "Offer", status: colors.ember },
          ].map((email) => (
            <div
              key={email.day}
              className="email-card flex items-center gap-1.5 border border-stone-600/20 rounded-[1px] px-1.5 py-1"
              style={{ backgroundColor: colors.surface }}
            >
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: email.status }} />
              <span className="font-mono text-[7px] md:text-[8px] text-stone-400 truncate">
                {email.day}: {email.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row: Score + Booking */}
      <div className="w-full flex items-stretch gap-2">
        {/* Lead Score */}
        <div className="flex-1 border border-stone-600/30 rounded-[2px] p-2 md:p-3" style={{ backgroundColor: colors.surface }}>
          <div className="font-mono text-[8px] md:text-[9px] tracking-[0.15em] text-stone-600 mb-2">LEAD SCORE</div>
          <div className="flex items-baseline gap-1">
            <span className="score-num font-mono text-xl md:text-2xl font-bold" style={{ color: colors.accent }}>0</span>
            <span className="font-mono text-[9px] text-stone-600">/100</span>
          </div>
          <div className="w-full h-1.5 rounded-full mt-1.5" style={{ backgroundColor: colors.stone[600] + "30" }}>
            <div
              className="score-bar-fill h-full rounded-full origin-left"
              style={{ backgroundColor: colors.accent, transform: "scaleX(0)" }}
            />
          </div>
          <div
            className="inline-block font-mono text-[7px] md:text-[8px] tracking-[0.1em] px-1.5 py-0.5 rounded-[1px] mt-1.5"
            style={{ backgroundColor: colors.accent + "20", color: colors.accent }}
          >
            HOT LEAD
          </div>
        </div>

        {/* Booking calendar */}
        <div className="flex-1 border border-stone-600/30 rounded-[2px] p-2 md:p-3" style={{ backgroundColor: colors.surface }}>
          <div className="font-mono text-[8px] md:text-[9px] tracking-[0.15em] text-stone-600 mb-2">BOOKING</div>
          <div className="grid grid-cols-5 gap-0.5 mb-1.5">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="cal-slot h-2.5 md:h-3 rounded-[1px]"
                style={{ backgroundColor: colors.stone[600] + "15" }}
              />
            ))}
          </div>
          <div className="confirm-pulse flex items-center gap-1" style={{ opacity: 0 }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.accent }} />
            <span className="font-mono text-[7px] md:text-[8px]" style={{ color: colors.accent }}>CONFIRMED</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Visual 1: PIPELINE — Kanban with Moving Cards
// ============================================================

const KANBAN_COLUMNS = [
  {
    label: "NEW LEADS",
    deals: [
      { name: "Acme Corp", amount: "$24K" },
      { name: "Bolt Inc", amount: "$12K" },
      { name: "Zeta AI", amount: "$15K" },
    ],
  },
  {
    label: "QUALIFIED",
    deals: [
      { name: "Nexus Inc", amount: "$18K" },
      { name: "Prism Co", amount: "$9K" },
      { name: "Wave Ltd", amount: "$21K" },
    ],
  },
  {
    label: "PROPOSAL",
    deals: [
      { name: "Atlas Ltd", amount: "$28K" },
      { name: "Forge Co", amount: "$16K" },
      { name: "Helix Inc", amount: "$33K" },
    ],
  },
  {
    label: "CLOSED WON",
    deals: [
      { name: "Orbit Labs", amount: "$32K" },
      { name: "Pulse AI", amount: "$27K" },
      { name: "Apex Ltd", amount: "$19K" },
    ],
  },
];

function PipelineVisual({ progress }: { progress: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const refsReady = useRef(false);
  const elRefs = useRef<{
    allCards: HTMLElement[];
    // Move 1: Acme Corp leaves col0 → arrives col1
    acmeSource: HTMLElement | null;
    col0Remaining: HTMLElement[];
    acmeGhost: HTMLElement | null;
    // Move 2: Atlas Ltd leaves col2 (middle card) → arrives col3
    atlasSource: HTMLElement | null;
    col2Below: HTMLElement[];
    atlasGhost: HTMLElement | null;
    valueEl: HTMLElement | null;
  }>({ allCards: [], acmeSource: null, col0Remaining: [], acmeGhost: null, atlasSource: null, col2Below: [], atlasGhost: null, valueEl: null });

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    elRefs.current = {
      allCards: Array.from(el.querySelectorAll<HTMLElement>(".deal-card")),
      acmeSource: el.querySelector<HTMLElement>(".acme-source"),
      col0Remaining: Array.from(el.querySelectorAll<HTMLElement>(".col0-remaining")),
      acmeGhost: el.querySelector<HTMLElement>(".acme-ghost"),
      atlasSource: el.querySelector<HTMLElement>(".atlas-source"),
      col2Below: Array.from(el.querySelectorAll<HTMLElement>(".col2-below")),
      atlasGhost: el.querySelector<HTMLElement>(".atlas-ghost"),
      valueEl: el.querySelector(".pipeline-value"),
    };
    refsReady.current = true;
  }, []);

  useEffect(() => {
    if (!refsReady.current) return;
    const r = elRefs.current;

    // 0.00–0.25: all static cards fade in staggered (let them fully appear)
    const fadeP = range(progress, 0.00, 0.25);
    r.allCards.forEach((card, i) => {
      const localP = range(fadeP, i * 0.05, i * 0.05 + 0.25);
      gsap.set(card, { opacity: localP, y: (1 - localP) * 10 });
    });

    // 0.30–0.55: Acme Corp rises out of NEW LEADS, drops into QUALIFIED
    const move1P = range(progress, 0.30, 0.55);

    if (r.acmeSource) {
      const exitP = range(move1P, 0, 0.45);
      gsap.set(r.acmeSource, {
        opacity: exitP > 0 ? 1 - exitP : 1,
        y: exitP > 0 ? -exitP * 30 : 0,
      });
    }

    // Col 0 remaining cards slide up
    if (r.col0Remaining.length > 0) {
      const slideUpP = range(move1P, 0.2, 0.6);
      const cardH = r.acmeSource?.offsetHeight || 40;
      for (let i = 0; i < r.col0Remaining.length; i++) {
        gsap.set(r.col0Remaining[i], { y: -(slideUpP * (cardH + 4)) });
      }
    }

    // Acme ghost drops into col 1 bottom
    if (r.acmeGhost) {
      const enterP = range(move1P, 0.45, 1.0);
      gsap.set(r.acmeGhost, {
        opacity: enterP,
        y: enterP > 0 ? (1 - enterP) * -25 : -25,
      });
    }

    // 0.58–0.82: Atlas Ltd rises out of PROPOSAL (middle), drops into CLOSED WON
    const move2P = range(progress, 0.58, 0.82);

    if (r.atlasSource) {
      const exitP = range(move2P, 0, 0.45);
      gsap.set(r.atlasSource, {
        opacity: exitP > 0 ? 1 - exitP : 1,
        y: exitP > 0 ? -exitP * 30 : 0,
      });
    }

    // Cards below Atlas in col 2 slide up
    if (r.col2Below.length > 0) {
      const slideUp2P = range(move2P, 0.2, 0.6);
      const cardH = r.atlasSource?.offsetHeight || 40;
      for (let i = 0; i < r.col2Below.length; i++) {
        gsap.set(r.col2Below[i], { y: -(slideUp2P * (cardH + 4)) });
      }
    }

    // Atlas ghost drops into col 3 bottom with accent glow
    if (r.atlasGhost) {
      const enterP = range(move2P, 0.45, 1.0);
      gsap.set(r.atlasGhost, {
        opacity: enterP,
        y: enterP > 0 ? (1 - enterP) * -25 : -25,
        borderLeftColor: enterP > 0.7 ? colors.accent : colors.stone[600] + "40",
        boxShadow: enterP > 0.7 ? `0 0 8px ${colors.accent}40` : "none",
      });
    }

    // 0.85–1.00: pipeline value ticks up
    const valueP = range(progress, 0.85, 1.00);
    if (r.valueEl) {
      const val = Math.round(123 + valueP * 32);
      r.valueEl.textContent = "$" + val + "K";
    }
  }, [progress]);

  return (
    <div ref={containerRef} className="relative h-full w-full flex flex-col p-3 md:p-5">
      <div className="flex-1 flex gap-1.5 md:gap-2">
        {KANBAN_COLUMNS.map((col, ci) => (
          <div key={col.label} className="kanban-col flex-1 flex flex-col">
            <div className="font-mono text-[7px] md:text-[8px] tracking-[0.12em] text-stone-600 mb-1.5 truncate">
              {col.label}
            </div>
            <div className="flex-1 border border-stone-600/15 rounded-[2px] p-1 md:p-1.5 flex flex-col gap-1 overflow-hidden">
              {col.deals.map((deal, di) => {
                // Acme Corp = col0, card0 (source that moves to QUALIFIED)
                const isAcmeSource = ci === 0 && di === 0;
                const isCol0Remaining = ci === 0 && di > 0;
                // Atlas Ltd = col2, card0 (source that moves to CLOSED WON)
                const isAtlasSource = ci === 2 && di === 0;
                const isCol2Below = ci === 2 && di > 0;

                let extraClass = "";
                if (isAcmeSource) extraClass = "acme-source";
                else if (isCol0Remaining) extraClass = "col0-remaining";
                else if (isAtlasSource) extraClass = "atlas-source";
                else if (isCol2Below) extraClass = "col2-below";

                return (
                  <div
                    key={`${ci}-${di}`}
                    className={`deal-card relative border border-stone-600/30 rounded-[1px] p-1.5 md:p-2 ${extraClass}`}
                    style={{
                      backgroundColor: colors.surface,
                      borderLeftWidth: "2px",
                      borderLeftColor: ci === 3 ? colors.accent : colors.stone[600] + "40",
                      opacity: 0,
                    }}
                  >
                    <div className="flex items-center gap-1 mb-1">
                      <div
                        className="w-3 h-3 md:w-4 md:h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: colors.stone[600] + "30" }}
                      />
                      <span className="font-mono text-[7px] md:text-[8px] text-stone-400 truncate">{deal.name}</span>
                    </div>
                    <span className="font-mono text-[8px] md:text-[9px] font-bold text-chalk">{deal.amount}</span>
                    <div className="w-full h-1 rounded-full mt-1" style={{ backgroundColor: colors.stone[600] + "20" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: ci === 3 ? "100%" : `${30 + ci * 25}%`,
                          backgroundColor: ci === 3 ? colors.accent : colors.accentMuted + "60",
                        }}
                      />
                    </div>
                  </div>
                );
              })}

              {/* Acme ghost — appears at bottom of QUALIFIED (col 1) */}
              {ci === 1 && (
                <div
                  className="acme-ghost relative border border-stone-600/30 rounded-[1px] p-1.5 md:p-2"
                  style={{ backgroundColor: colors.surface, borderLeftWidth: "2px", borderLeftColor: colors.stone[600] + "40", opacity: 0 }}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full flex-shrink-0" style={{ backgroundColor: colors.stone[600] + "30" }} />
                    <span className="font-mono text-[7px] md:text-[8px] text-stone-400 truncate">Acme Corp</span>
                  </div>
                  <span className="font-mono text-[8px] md:text-[9px] font-bold text-chalk">$24K</span>
                  <div className="w-full h-1 rounded-full mt-1" style={{ backgroundColor: colors.stone[600] + "20" }}>
                    <div className="h-full rounded-full" style={{ width: "55%", backgroundColor: colors.accentMuted + "60" }} />
                  </div>
                </div>
              )}

              {/* Atlas ghost — appears at bottom of CLOSED WON (col 3) */}
              {ci === 3 && (
                <div
                  className="atlas-ghost relative border border-stone-600/30 rounded-[1px] p-1.5 md:p-2"
                  style={{ backgroundColor: colors.surface, borderLeftWidth: "2px", borderLeftColor: colors.stone[600] + "40", opacity: 0 }}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full flex-shrink-0" style={{ backgroundColor: colors.stone[600] + "30" }} />
                    <span className="font-mono text-[7px] md:text-[8px] text-stone-400 truncate">Atlas Ltd</span>
                  </div>
                  <span className="font-mono text-[8px] md:text-[9px] font-bold text-chalk">$28K</span>
                  <div className="w-full h-1 rounded-full mt-1" style={{ backgroundColor: colors.stone[600] + "20" }}>
                    <div className="h-full rounded-full" style={{ width: "100%", backgroundColor: colors.accent }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom stats bar */}
      <div
        className="flex items-center justify-between mt-2 px-2 py-1.5 border border-stone-600/20 rounded-[2px]"
        style={{ backgroundColor: colors.surface }}
      >
        <span className="font-mono text-[8px] md:text-[9px] tracking-[0.12em] text-stone-600">PIPELINE VALUE</span>
        <span className="pipeline-value font-mono text-[10px] md:text-xs font-bold" style={{ color: colors.accent }}>
          $123K
        </span>
      </div>
    </div>
  );
}

// ============================================================
// Visual 2: INTEL — Analytics Dashboard
// ============================================================

function IntelVisual({ progress }: { progress: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const refsReady = useRef(false);
  const elRefs = useRef<{
    bars: HTMLElement[];
    metricNums: HTMLElement[];
    insightPanel: HTMLElement | null;
  }>({ bars: [], metricNums: [], insightPanel: null });

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    elRefs.current = {
      bars: Array.from(el.querySelectorAll(".chart-bar")),
      metricNums: Array.from(el.querySelectorAll(".metric-num")),
      insightPanel: el.querySelector(".insight-panel"),
    };
    refsReady.current = true;
  }, []);

  useEffect(() => {
    if (!refsReady.current) return;
    const r = elRefs.current;

    // 0.00–0.30: metrics count up
    const metricP = range(progress, 0.00, 0.30);
    const metricTargets = [14.2, 68, 18.4];
    const prefixes = ["", "", "$"];
    const suffixes = ["%", "%", "K"];
    r.metricNums.forEach((num, i) => {
      const val = metricP * metricTargets[i];
      num.textContent = prefixes[i] + val.toFixed(i === 1 ? 0 : 1) + suffixes[i];
    });

    // 0.30–0.70: bars grow in sequence
    const barP = range(progress, 0.30, 0.70);
    r.bars.forEach((bar, i) => {
      const localP = range(barP, i * 0.1, i * 0.1 + 0.3);
      gsap.set(bar, { scaleY: localP });
    });

    // 0.70–0.90: insight panel slides in
    const insightP = range(progress, 0.70, 0.90);
    if (r.insightPanel) {
      gsap.set(r.insightPanel, {
        opacity: insightP,
        y: (1 - insightP) * 20,
      });
    }
  }, [progress]);

  const barHeights = [35, 45, 40, 55, 60, 72, 80];

  return (
    <div ref={containerRef} className="relative h-full w-full flex flex-col p-3 md:p-5 gap-2">
      {/* Metric cards row */}
      <div className="flex gap-1.5 md:gap-2">
        {[
          { label: "CONVERSION RATE", value: "0%", delta: "+2.3%", deltaColor: colors.accent },
          { label: "MQL \u2192 SQL", value: "0%", delta: "+5%", deltaColor: colors.accent },
          { label: "AVG DEAL SIZE", value: "$0K", delta: "+$2.1K", deltaColor: colors.accent },
        ].map((metric) => (
          <div
            key={metric.label}
            className="flex-1 border border-stone-600/20 rounded-[2px] p-1.5 md:p-2"
            style={{ backgroundColor: colors.surface }}
          >
            <div className="font-mono text-[6px] md:text-[7px] tracking-[0.12em] text-stone-600 mb-1 truncate">
              {metric.label}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="metric-num font-mono text-sm md:text-base font-bold text-chalk">{metric.value}</span>
              <span className="font-mono text-[7px] md:text-[8px]" style={{ color: metric.deltaColor }}>
                {metric.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div
        className="flex-1 border border-stone-600/20 rounded-[2px] p-2 md:p-3"
        style={{ backgroundColor: colors.surface }}
      >
        <div className="font-mono text-[7px] md:text-[8px] tracking-[0.12em] text-stone-600 mb-2">MONTHLY REVENUE</div>
        <div className="flex items-end gap-1 md:gap-1.5 h-[60%]">
          {barHeights.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end h-full">
              <div
                className="chart-bar w-full rounded-t-[1px] origin-bottom"
                style={{
                  height: `${h}%`,
                  backgroundColor: i === barHeights.length - 1 ? colors.accent : colors.accentMuted + "60",
                  transform: "scaleY(0)",
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((m) => (
            <span key={m} className="font-mono text-[6px] text-stone-600 flex-1 text-center">{m}</span>
          ))}
        </div>
      </div>

      {/* AI Insight panel */}
      <div
        className="insight-panel border rounded-[2px] p-2 md:p-2.5 flex items-start gap-2"
        style={{ borderColor: colors.accent + "30", backgroundColor: colors.surface, opacity: 0 }}
      >
        <div
          className="w-2 h-2 rounded-full flex-shrink-0 mt-0.5"
          style={{ backgroundColor: colors.accent }}
        />
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[7px] md:text-[8px] tracking-[0.12em] mb-1" style={{ color: colors.accent }}>
            AI INSIGHT
          </div>
          <p className="font-mono text-[7px] md:text-[8px] text-stone-400 leading-relaxed">
            &ldquo;Leads from organic search convert 3.2x higher than paid — reallocate budget to SEO content.&rdquo;
          </p>
          <div className="flex gap-1.5 mt-1.5">
            <div
              className="font-mono text-[6px] md:text-[7px] px-1.5 py-0.5 rounded-[1px]"
              style={{ backgroundColor: colors.accent + "20", color: colors.accent }}
            >
              APPLY
            </div>
            <div className="font-mono text-[6px] md:text-[7px] px-1.5 py-0.5 rounded-[1px] text-stone-600 border border-stone-600/20">
              DISMISS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Visual 3: AGENCY — Multi-Tenant Dashboard
// ============================================================

const AGENCY_CLIENTS = [
  { name: "Vertex Health", dot: "#2DD4BF" },
  { name: "Peak Finance", dot: "#F59E0B" },
  { name: "Nova Retail", dot: "#A78BFA" },
  { name: "Edge SaaS", dot: "#60A5FA" },
  { name: "Flux Agency", dot: "#F472B6" },
];

const AGENCY_DATA = {
  vertex: { revenue: "$48.2K", leads: "342", conversion: "14.2", delivery: 78, invoice: "$12,400", campaigns: 6 },
  peak: { revenue: "$31.7K", leads: "218", conversion: "11.8", delivery: 64, invoice: "$8,900", campaigns: 4 },
};

const SPARKLINE_VERTEX = [20, 35, 28, 45, 40, 55, 62, 58, 72, 80];
const SPARKLINE_PEAK = [15, 22, 30, 25, 38, 35, 42, 48, 44, 52];

// Line chart data (revenue trend over 8 months)
const LINE_VERTEX = [12, 18, 15, 28, 32, 30, 42, 48];
const LINE_PEAK = [8, 12, 16, 14, 22, 20, 28, 32];
// Donut chart segments
const DONUT_VERTEX = [
  { label: "Organic", pct: 42, color: "#2DD4BF" },
  { label: "Paid", pct: 28, color: "#F59E0B" },
  { label: "Referral", pct: 18, color: "#A78BFA" },
  { label: "Direct", pct: 12, color: "#60A5FA" },
];
const DONUT_PEAK = [
  { label: "Organic", pct: 35, color: "#2DD4BF" },
  { label: "Paid", pct: 38, color: "#F59E0B" },
  { label: "Referral", pct: 15, color: "#A78BFA" },
  { label: "Direct", pct: 12, color: "#60A5FA" },
];

function lineChartPoints(data: number[], w: number, h: number, padY = 4): string {
  const max = Math.max(...data);
  return data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - padY - ((v / max) * (h - padY * 2));
    return `${x},${y}`;
  }).join(" ");
}

function AgencyVisual({ progress }: { progress: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const refsReady = useRef(false);
  const elRefs = useRef<{
    topBar: HTMLElement | null;
    clientList: HTMLElement[];
    activeIndicator: HTMLElement | null;
    statRevenue: HTMLElement | null;
    statLeads: HTMLElement | null;
    statConversion: HTMLElement | null;
    statCards: HTMLElement | null;
    sparkBars: HTMLElement[];
    sparkContainer: HTMLElement | null;
    chartsRow: HTMLElement | null;
    donutCircles: SVGCircleElement[];
    donutCenter: HTMLElement | null;
    lineChartPath: SVGPolylineElement | null;
    lineChartBg: SVGPolygonElement | null;
    invoiceRow: HTMLElement | null;
    paidBadge: HTMLElement | null;
    clientName: HTMLElement | null;
  }>({ topBar: null, clientList: [], activeIndicator: null, statRevenue: null, statLeads: null, statConversion: null, statCards: null, sparkBars: [], sparkContainer: null, chartsRow: null, donutCircles: [], donutCenter: null, lineChartPath: null, lineChartBg: null, invoiceRow: null, paidBadge: null, clientName: null });

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    elRefs.current = {
      topBar: el.querySelector(".agency-topbar"),
      clientList: Array.from(el.querySelectorAll(".agency-client")),
      activeIndicator: el.querySelector(".active-indicator"),
      statRevenue: el.querySelector(".stat-revenue"),
      statLeads: el.querySelector(".stat-leads"),
      statConversion: el.querySelector(".stat-conversion"),
      statCards: el.querySelector(".stat-cards"),
      sparkBars: Array.from(el.querySelectorAll(".spark-bar")),
      sparkContainer: el.querySelector(".spark-container"),
      chartsRow: el.querySelector(".charts-row"),
      donutCircles: Array.from(el.querySelectorAll(".donut-seg")),
      donutCenter: el.querySelector(".donut-center"),
      lineChartPath: el.querySelector(".line-path"),
      lineChartBg: el.querySelector(".line-bg"),
      invoiceRow: el.querySelector(".invoice-row"),
      paidBadge: el.querySelector(".paid-badge"),
      clientName: el.querySelector(".client-name-display"),
    };
    refsReady.current = true;
  }, []);

  useEffect(() => {
    if (!refsReady.current) return;
    const r = elRefs.current;

    // Determine if we're in the client-switch phase
    const switchP = range(progress, 0.88, 1.00);
    const isSwitch = switchP > 0.5;
    const data = isSwitch ? AGENCY_DATA.peak : AGENCY_DATA.vertex;
    const sparkData = isSwitch ? SPARKLINE_PEAK : SPARKLINE_VERTEX;

    // 0.00–0.12: Top bar fades in
    const topP = range(progress, 0.00, 0.12);
    if (r.topBar) {
      gsap.set(r.topBar, { opacity: topP });
    }

    // Update client name display based on switch
    if (r.clientName) {
      r.clientName.textContent = isSwitch ? "Peak Finance" : "Vertex Health";
    }

    // 0.12–0.28: Client sidebar list staggers in
    const listP = range(progress, 0.12, 0.28);
    r.clientList.forEach((el, i) => {
      const localP = range(listP, i * 0.15, i * 0.15 + 0.35);
      gsap.set(el, { opacity: localP, x: (1 - localP) * -8 });
    });
    if (r.activeIndicator) {
      gsap.set(r.activeIndicator, { opacity: listP > 0.3 ? 1 : 0 });
    }

    // 0.28–0.42: Stat cards fade in, numbers count up
    const statP = range(progress, 0.28, 0.42);
    if (r.statCards) {
      gsap.set(r.statCards, { opacity: statP });
    }
    if (r.statRevenue) {
      if (statP <= 0) {
        r.statRevenue.textContent = "$0";
      } else if (progress < 0.88) {
        const val = statP * 48.2;
        r.statRevenue.textContent = "$" + val.toFixed(1) + "K";
      } else {
        r.statRevenue.textContent = data.revenue;
      }
    }
    if (r.statLeads) {
      if (statP <= 0) {
        r.statLeads.textContent = "0";
      } else if (progress < 0.88) {
        r.statLeads.textContent = String(Math.round(statP * 342));
      } else {
        r.statLeads.textContent = data.leads;
      }
    }
    if (r.statConversion) {
      if (statP <= 0) {
        r.statConversion.textContent = "0%";
      } else if (progress < 0.88) {
        r.statConversion.textContent = (statP * 14.2).toFixed(1) + "%";
      } else {
        r.statConversion.textContent = data.conversion + "%";
      }
    }

    // 0.42–0.56: Sparkline bars grow (large chart)
    const sparkP = range(progress, 0.42, 0.56);
    if (r.sparkContainer) {
      gsap.set(r.sparkContainer, { opacity: sparkP > 0 ? 1 : 0 });
    }
    (r.sparkBars || []).forEach((bar, i) => {
      const localP = range(sparkP, i * 0.06, i * 0.06 + 0.3);
      const height = sparkData[i];
      gsap.set(bar, { scaleY: localP, height: height + "%" });
    });

    // 0.56–0.72: Donut + line chart appear
    const chartsP = range(progress, 0.56, 0.72);
    if (r.chartsRow) {
      gsap.set(r.chartsRow, { opacity: chartsP > 0 ? 1 : 0 });
    }
    // Donut segments animate via stroke-dashoffset
    const donutData = isSwitch ? DONUT_PEAK : DONUT_VERTEX;
    const circumference = 2 * Math.PI * 28; // r=28
    (r.donutCircles || []).forEach((circle, i) => {
      const segP = range(chartsP, i * 0.15, i * 0.15 + 0.5);
      const segLen = (donutData[i].pct / 100) * circumference;
      // Calculate offset for this segment
      let offsetBefore = 0;
      for (let j = 0; j < i; j++) offsetBefore += (donutData[j].pct / 100) * circumference;
      circle.style.strokeDasharray = `${segLen} ${circumference - segLen}`;
      circle.style.strokeDashoffset = String(circumference - offsetBefore + (1 - segP) * segLen);
      circle.style.opacity = segP > 0 ? "1" : "0";
    });
    if (r.donutCenter) {
      const totalPct = Math.round(chartsP * 100);
      r.donutCenter.textContent = chartsP > 0 ? totalPct + "%" : "";
    }
    // Line chart path reveal via dashoffset
    if (r.lineChartPath) {
      const lineP = range(chartsP, 0.2, 1.0);
      const pathLen = 200;
      r.lineChartPath.style.strokeDasharray = String(pathLen);
      r.lineChartPath.style.strokeDashoffset = String(pathLen * (1 - lineP));
      r.lineChartPath.style.opacity = lineP > 0 ? "1" : "0";
      // Update points based on switch
      const lineData = isSwitch ? LINE_PEAK : LINE_VERTEX;
      r.lineChartPath.setAttribute("points", lineChartPoints(lineData, 90, 44));
    }
    if (r.lineChartBg) {
      const lineP = range(chartsP, 0.2, 1.0);
      r.lineChartBg.style.opacity = lineP > 0.3 ? "0.15" : "0";
      const lineData = isSwitch ? LINE_PEAK : LINE_VERTEX;
      const pts = lineChartPoints(lineData, 90, 44);
      r.lineChartBg.setAttribute("points", `0,44 ${pts} 90,44`);
    }

    // 0.72–0.85: Invoice row slides in
    const invoiceP = range(progress, 0.72, 0.85);
    if (r.invoiceRow) {
      gsap.set(r.invoiceRow, { opacity: invoiceP, y: (1 - invoiceP) * 12 });
    }
    if (r.paidBadge) {
      const flashP = range(invoiceP, 0.6, 1.0);
      const flash = flashP > 0 && flashP < 1 ? Math.sin(flashP * Math.PI) : 0;
      gsap.set(r.paidBadge, {
        filter: flash > 0 ? `brightness(${1 + flash * 1.2})` : "none",
      });
    }

    // 0.88–1.00: Client switch animation
    if (r.statCards && switchP > 0) {
      const flickerP = range(switchP, 0, 0.3);
      if (flickerP > 0 && flickerP < 1) {
        gsap.set(r.statCards, { opacity: 0.6 + flickerP * 0.4 });
      }
    }
  }, [progress]);

  return (
    <div ref={containerRef} className="relative h-full w-full flex flex-col p-3 md:p-5 gap-0">
      {/* Top bar */}
      <div
        className="agency-topbar flex items-center justify-between px-2 md:px-3 py-1.5 md:py-2 rounded-t-[2px] border border-stone-600/20"
        style={{ backgroundColor: colors.surface, opacity: 0 }}
      >
        <span className="font-mono text-[8px] md:text-[9px] tracking-[0.12em] font-bold" style={{ color: colors.ember }}>
          AGENCY DASHBOARD
        </span>
        <span className="client-name-display font-mono text-[7px] md:text-[8px] text-stone-400">
          Vertex Health
        </span>
      </div>

      {/* Main body */}
      <div className="flex-1 flex border border-t-0 border-stone-600/20 rounded-b-[2px] overflow-hidden" style={{ backgroundColor: colors.surface }}>
        {/* Client sidebar */}
        <div className="w-[70px] md:w-[85px] border-r border-stone-600/15 py-1.5 px-1 md:px-1.5 flex flex-col gap-0.5">
          <div className="font-mono text-[6px] md:text-[7px] tracking-[0.12em] text-stone-600 mb-1 px-1">CLIENTS</div>
          {AGENCY_CLIENTS.map((client, i) => (
            <div
              key={client.name}
              className="agency-client flex items-center gap-1 px-1 py-0.5 rounded-[1px] relative"
              style={{ opacity: 0 }}
            >
              {i === 0 && (
                <div
                  className="active-indicator absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
                  style={{ backgroundColor: colors.accent, opacity: 0 }}
                />
              )}
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: client.dot }} />
              <span className={`font-mono text-[6px] md:text-[7px] truncate ${i === 0 ? "text-chalk" : "text-stone-500"}`}>
                {client.name}
              </span>
            </div>
          ))}
        </div>

        {/* Right panel */}
        <div className="flex-1 p-2 md:p-3 flex flex-col gap-1.5">
          <div className="font-mono text-[7px] md:text-[8px] tracking-[0.12em] text-stone-600">MONTHLY REPORT</div>

          {/* Stat cards — 3 columns */}
          <div className="stat-cards flex gap-1" style={{ opacity: 0 }}>
            <div className="flex-1 border border-stone-600/20 rounded-[1px] p-1 md:p-1.5" style={{ backgroundColor: colors.void }}>
              <div className="font-mono text-[5px] md:text-[6px] text-stone-600 mb-0.5">Revenue</div>
              <span className="stat-revenue font-mono text-[10px] md:text-xs font-bold text-chalk">$0</span>
            </div>
            <div className="flex-1 border border-stone-600/20 rounded-[1px] p-1 md:p-1.5" style={{ backgroundColor: colors.void }}>
              <div className="font-mono text-[5px] md:text-[6px] text-stone-600 mb-0.5">Leads</div>
              <span className="stat-leads font-mono text-[10px] md:text-xs font-bold text-chalk">0</span>
            </div>
            <div className="flex-1 border border-stone-600/20 rounded-[1px] p-1 md:p-1.5" style={{ backgroundColor: colors.void }}>
              <div className="font-mono text-[5px] md:text-[6px] text-stone-600 mb-0.5">Conv.</div>
              <div className="flex items-baseline gap-0.5">
                <span className="stat-conversion font-mono text-[10px] md:text-xs font-bold" style={{ color: colors.accent }}>0%</span>
                <span className="font-mono text-[5px] md:text-[6px]" style={{ color: colors.accent }}>+2.3</span>
              </div>
            </div>
          </div>

          {/* Lead trend bar chart — large */}
          <div
            className="spark-container border border-stone-600/20 rounded-[1px] p-1.5 md:p-2"
            style={{ backgroundColor: colors.void, opacity: 0 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[5px] md:text-[6px] text-stone-600 tracking-[0.1em]">LEAD TREND</span>
              <span className="font-mono text-[5px] md:text-[6px]" style={{ color: colors.accent }}>10 WKS</span>
            </div>
            <div className="flex items-end gap-[3px] h-[40px] md:h-[50px]">
              {SPARKLINE_VERTEX.map((_, i) => (
                <div
                  key={i}
                  className="spark-bar flex-1 rounded-t-[1px] origin-bottom"
                  style={{
                    backgroundColor: i >= 8 ? colors.accent : colors.accentMuted + "50",
                    height: "0%",
                    transform: "scaleY(0)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Donut + Line chart side by side */}
          <div
            className="charts-row flex gap-1.5"
            style={{ opacity: 0 }}
          >
            {/* Donut chart */}
            <div className="flex-1 border border-stone-600/20 rounded-[1px] p-1.5 md:p-2 flex flex-col items-center" style={{ backgroundColor: colors.void }}>
              <span className="font-mono text-[5px] md:text-[6px] text-stone-600 tracking-[0.1em] self-start mb-1">SOURCES</span>
              <div className="relative">
                <svg width="64" height="64" viewBox="0 0 64 64">
                  {DONUT_VERTEX.map((seg, i) => (
                    <circle
                      key={i}
                      className="donut-seg"
                      cx="32" cy="32" r="28"
                      fill="none"
                      stroke={seg.color}
                      strokeWidth="6"
                      strokeLinecap="round"
                      style={{ opacity: 0, transform: "rotate(-90deg)", transformOrigin: "32px 32px" }}
                    />
                  ))}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="donut-center font-mono text-[8px] md:text-[9px] font-bold" style={{ color: colors.chalk }} />
                </div>
              </div>
              <div className="flex gap-2 mt-1">
                {DONUT_VERTEX.map((seg) => (
                  <div key={seg.label} className="flex items-center gap-0.5">
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: seg.color }} />
                    <span className="font-mono text-[4px] md:text-[5px] text-stone-500">{seg.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Line chart */}
            <div className="flex-1 border border-stone-600/20 rounded-[1px] p-1.5 md:p-2" style={{ backgroundColor: colors.void }}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[5px] md:text-[6px] text-stone-600 tracking-[0.1em]">REVENUE</span>
                <span className="font-mono text-[5px] md:text-[6px]" style={{ color: colors.ember }}>8 MO</span>
              </div>
              <svg width="100%" height="44" viewBox="0 0 90 44" preserveAspectRatio="none" className="overflow-visible">
                {/* Grid lines */}
                <line x1="0" y1="11" x2="90" y2="11" stroke={colors.stone[600] + "15"} strokeWidth="0.5"/>
                <line x1="0" y1="22" x2="90" y2="22" stroke={colors.stone[600] + "15"} strokeWidth="0.5"/>
                <line x1="0" y1="33" x2="90" y2="33" stroke={colors.stone[600] + "15"} strokeWidth="0.5"/>
                {/* Fill area */}
                <polygon
                  className="line-bg"
                  points={`0,44 ${lineChartPoints(LINE_VERTEX, 90, 44)} 90,44`}
                  fill={colors.accent}
                  style={{ opacity: 0 }}
                />
                {/* Line */}
                <polyline
                  className="line-path"
                  points={lineChartPoints(LINE_VERTEX, 90, 44)}
                  fill="none"
                  stroke={colors.accent}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: 0 }}
                />
              </svg>
            </div>
          </div>

          {/* Invoice row */}
          <div
            className="invoice-row flex items-center justify-between border border-stone-600/20 rounded-[1px] px-1.5 py-1"
            style={{ backgroundColor: colors.void, opacity: 0 }}
          >
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[6px] md:text-[7px] text-stone-500">INV #1247</span>
              <span className="font-mono text-[7px] md:text-[8px] font-bold text-chalk">$12,400</span>
            </div>
            <span
              className="paid-badge font-mono text-[5px] md:text-[6px] tracking-[0.1em] px-1 py-0.5 rounded-[1px]"
              style={{ backgroundColor: colors.ember + "20", color: colors.ember }}
            >
              PAID
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Visual 4: CUSTOM — Conversation + Stack Fusion + Results
// ============================================================

const CONVO = [
  { from: "client", text: "We need a health portal with scheduling & patient records" },
  { from: "ig",     text: "What's the timeline and budget range?" },
  { from: "client", text: "3 months, mid-range, needs HIPAA compliance" },
  { from: "ig",     text: "Perfect — here's your stack" },
];

const STACK_ITEMS = [
  {
    label: "Next.js",
    color: "#FFFFFF",
    icon: (c: string) => (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 0-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.251 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.7 338.7 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.44.44 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a4492 4492 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.32 12.32 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.86-8.292-8.209-9.695a12.597 12.597 0 0 0-2.498-.523c-.225-.023-1.776-.044-1.97-.024zm4.913 7.26a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054.347 0 .408.005.485.047z" fill={c}/>
      </svg>
    ),
  },
  {
    label: "MongoDB",
    color: "#00ED64",
    icon: (c: string) => (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
        <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.32c.1-.63.33-1.047.53-1.174 4.16-2.46 6.47-5.97 4.43-13.27zM12.29 22.514c-.177-.772-.554-1.433-.766-1.717-.3-.4-.56-1.22-.56-1.22s-.09.58-.42 1.21c-.2.4-.56.97-.67 1.35-.09.37-.2.65-.2.65h2.6s-.02-.27-.02-.28z" fill={c}/>
      </svg>
    ),
  },
  {
    label: "Claude",
    color: "#D4A574",
    icon: (c: string) => (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
        <path d="M4.709 15.955l4.397-10.985a.469.469 0 01.862-.008l4.5 10.993a.75.75 0 01-.692 1.045h-8.38a.75.75 0 01-.687-1.045zM14.635 8.382l3.677 7.573a.75.75 0 01-.671 1.045h-3.088" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "n8n",
    color: "#EA4B71",
    icon: (c: string) => (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
        <circle cx="6" cy="12" r="2.5" stroke={c} strokeWidth="1.5"/>
        <circle cx="18" cy="7" r="2.5" stroke={c} strokeWidth="1.5"/>
        <circle cx="18" cy="17" r="2.5" stroke={c} strokeWidth="1.5"/>
        <line x1="8.5" y1="11" x2="15.5" y2="7.5" stroke={c} strokeWidth="1.2"/>
        <line x1="8.5" y1="13" x2="15.5" y2="16.5" stroke={c} strokeWidth="1.2"/>
      </svg>
    ),
  },
];

const RESULT_STATS = [
  { label: "Sales", value: 340, suffix: "%", prefix: "+", color: colors.ember, bars: [0.3, 0.5, 0.7, 1.0] },
  { label: "Revenue", value: 48.2, suffix: "K", prefix: "$", color: colors.accent, bars: [0.4, 0.6, 0.8, 0.95] },
  { label: "Reach", value: 12.4, suffix: "K", prefix: "", color: colors.accentMuted, bars: [0.2, 0.45, 0.75, 1.0] },
];

function CustomVisual({ progress }: { progress: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const refsReady = useRef(false);
  const elRefs = useRef<{
    topBar: HTMLElement | null;
    liveDot: HTMLElement | null;
    liveLabel: HTMLElement | null;
    msgBubbles: HTMLElement[];
    msgTexts: HTMLElement[];
    msgCursors: HTMLElement[];
    fusionSection: HTMLElement | null;
    fusionTitle: HTMLElement | null;
    fusionContent: HTMLElement | null;
    techIcons: HTMLElement[];
    connectLines: SVGLineElement[];
    fusionCenter: HTMLElement | null;
    resultSection: HTMLElement | null;
    statCards: HTMLElement[];
    statValues: HTMLElement[];
    sparkBars: HTMLElement[];
    progressTrack: HTMLElement | null;
    progressFill: HTMLElement | null;
    progressLabel: HTMLElement | null;
    outerContainer: HTMLElement | null;
  }>({
    topBar: null, liveDot: null, liveLabel: null,
    msgBubbles: [], msgTexts: [], msgCursors: [],
    fusionSection: null, fusionTitle: null, fusionContent: null,
    techIcons: [], connectLines: [], fusionCenter: null,
    resultSection: null, statCards: [], statValues: [], sparkBars: [],
    progressTrack: null, progressFill: null, progressLabel: null,
    outerContainer: null,
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    elRefs.current = {
      topBar: el.querySelector(".cv-topbar"),
      liveDot: el.querySelector(".cv-live-dot"),
      liveLabel: el.querySelector(".cv-live-label"),
      msgBubbles: Array.from(el.querySelectorAll(".cv-msg")),
      msgTexts: Array.from(el.querySelectorAll(".cv-msg-text")),
      msgCursors: Array.from(el.querySelectorAll(".cv-msg-cursor")),
      fusionSection: el.querySelector(".cv-fusion"),
      fusionTitle: el.querySelector(".cv-fusion-title"),
      fusionContent: el.querySelector(".cv-fusion-content"),
      techIcons: Array.from(el.querySelectorAll(".cv-tech-icon")),
      connectLines: Array.from(el.querySelectorAll(".cv-connect-line")) as SVGLineElement[],
      fusionCenter: el.querySelector(".cv-fusion-center"),
      resultSection: el.querySelector(".cv-results"),
      statCards: Array.from(el.querySelectorAll(".cv-stat-card")),
      statValues: Array.from(el.querySelectorAll(".cv-stat-value")),
      sparkBars: Array.from(el.querySelectorAll(".cv-spark-bar")),
      progressTrack: el.querySelector(".cv-progress-track"),
      progressFill: el.querySelector(".cv-progress-fill"),
      progressLabel: el.querySelector(".cv-progress-label"),
      outerContainer: el.querySelector(".cv-outer"),
    };
    refsReady.current = true;
  }, []);

  useEffect(() => {
    if (!refsReady.current) return;
    const r = elRefs.current;

    // Phase 0: Top bar (0.00–0.05)
    const topP = range(progress, 0.00, 0.05);
    if (r.topBar) gsap.set(r.topBar, { opacity: topP });

    // Phase 1: 4 conversation messages (0.05–0.42)
    const msgRanges: [number, number][] = [
      [0.05, 0.15], [0.15, 0.24], [0.24, 0.33], [0.33, 0.42],
    ];
    msgRanges.forEach(([start, end], i) => {
      const p = range(progress, start, end);
      const chars = Math.round(p * CONVO[i].text.length);
      if (r.msgBubbles[i]) gsap.set(r.msgBubbles[i], { opacity: p > 0 ? 1 : 0, y: p > 0 ? 0 : 6 });
      if (r.msgTexts[i]) r.msgTexts[i].textContent = chars > 0 ? CONVO[i].text.slice(0, chars) : "";
      if (r.msgCursors[i]) gsap.set(r.msgCursors[i], { opacity: p > 0 && p < 1 ? 1 : 0 });
    });

    // Phase 2: Stack Fusion (0.42–0.62)
    // 0.42–0.50: Icons appear spread out from center
    const iconPopP = range(progress, 0.42, 0.50);
    if (r.fusionSection) gsap.set(r.fusionSection, { opacity: iconPopP > 0 ? 1 : 0 });
    const startPos = [
      { x: -50, y: -26 },  // Next.js — top-left
      { x: 50, y: -26 },   // MongoDB — top-right
      { x: -50, y: 26 },   // Claude — bottom-left
      { x: 50, y: 26 },    // n8n — bottom-right
    ];
    r.techIcons.forEach((icon, i) => {
      const localP = range(iconPopP, i * 0.12, i * 0.12 + 0.5);
      gsap.set(icon, {
        opacity: localP,
        scale: 0.3 + localP * 0.7,
        x: startPos[i].x,
        y: startPos[i].y,
      });
    });

    // 0.50–0.60: Icons converge to center + fade into fused node
    const convergeP = range(progress, 0.50, 0.60);
    if (convergeP > 0) {
      r.techIcons.forEach((icon, i) => {
        const fadeOut = convergeP > 0.7 ? 1 - range(convergeP, 0.7, 1.0) : 1;
        gsap.set(icon, {
          opacity: fadeOut,
          scale: 1 - convergeP * 0.5,
          x: startPos[i].x * (1 - convergeP),
          y: startPos[i].y * (1 - convergeP),
        });
      });
    }
    // Center fused node emerges
    if (r.fusionCenter) {
      const centerP = range(progress, 0.54, 0.62);
      gsap.set(r.fusionCenter, {
        opacity: centerP,
        scale: 0.1 + centerP * 0.9,
        rotation: centerP * 270,
        boxShadow: centerP > 0.5 ? `0 0 ${Math.round(centerP * 16)}px ${colors.accent}50` : "none",
      });
    }

    // Phase 3: Fusion dissolves → Results appear (0.62–0.92)
    // 0.62–0.68: Fusion content fades out, title changes to RESULTS
    const dissolveP = range(progress, 0.62, 0.68);
    if (r.fusionContent) gsap.set(r.fusionContent, { opacity: 1 - dissolveP, scale: 1 - dissolveP * 0.3 });
    if (r.fusionTitle) {
      r.fusionTitle.textContent = dissolveP > 0.5 ? "RESULTS" : "STACK FUSION";
      if (dissolveP > 0.5) gsap.set(r.fusionTitle, { color: colors.accentMuted });
      else gsap.set(r.fusionTitle, { color: colors.stone[600] });
    }

    // 0.66–0.80: Results container + stat cards fade in
    const statsP = range(progress, 0.66, 0.80);
    if (r.resultSection) gsap.set(r.resultSection, { opacity: statsP > 0 ? 1 : 0 });
    r.statCards.forEach((card, i) => {
      const localP = range(statsP, i * 0.2, i * 0.2 + 0.5);
      gsap.set(card, { opacity: localP, y: (1 - localP) * 8 });
    });
    // Animate counting values
    r.statValues.forEach((el, i) => {
      const localP = range(statsP, i * 0.2, i * 0.2 + 0.5);
      const stat = RESULT_STATS[i];
      const val = localP * stat.value;
      if (el) {
        if (stat.suffix === "%") {
          el.textContent = localP > 0 ? `${stat.prefix}${Math.round(val)}${stat.suffix}` : "";
        } else {
          el.textContent = localP > 0 ? `${stat.prefix}${val.toFixed(1)}${stat.suffix}` : "";
        }
      }
    });
    // Sparkline bars
    r.sparkBars.forEach((bar) => {
      const cardIdx = Number(bar.dataset.card);
      const barIdx = Number(bar.dataset.bar);
      const localP = range(statsP, cardIdx * 0.2, cardIdx * 0.2 + 0.5);
      const barHeight = RESULT_STATS[cardIdx]?.bars[barIdx] ?? 0;
      gsap.set(bar, { scaleY: localP * barHeight, opacity: localP > 0 ? 1 : 0 });
    });

    // 0.80–0.88: Progress bar
    const barP = range(progress, 0.80, 0.88);
    if (r.progressTrack) gsap.set(r.progressTrack, { opacity: barP > 0 ? 1 : 0 });
    if (r.progressFill) gsap.set(r.progressFill, { scaleX: barP * 0.89 });
    if (r.progressLabel) r.progressLabel.textContent = barP > 0 ? `${Math.round(barP * 89)}%` : "";

    // 0.88–0.92: DEPLOYED
    const doneP = range(progress, 0.88, 0.92);
    if (r.liveDot) {
      gsap.set(r.liveDot, {
        backgroundColor: doneP > 0.5 ? colors.accent : colors.stone[600],
        boxShadow: doneP > 0.5 ? `0 0 4px ${colors.accent}` : "none",
      });
    }
    if (r.liveLabel) {
      gsap.set(r.liveLabel, {
        color: doneP > 0.5 ? colors.accent : colors.stone[600],
        textShadow: doneP > 0.5 ? `0 0 6px ${colors.accent}60` : "none",
      });
    }
    if (r.progressLabel && doneP > 0.5) r.progressLabel.textContent = "DEPLOYED";
    if (r.progressFill && doneP > 0.5) gsap.set(r.progressFill, { scaleX: 0.89 });

    // Phase 4: Glow (0.92–1.00)
    const glowP = range(progress, 0.92, 1.00);
    if (r.outerContainer) {
      const g = glowP > 0 && glowP < 1 ? Math.sin(glowP * Math.PI) : 0;
      gsap.set(r.outerContainer, {
        boxShadow: g > 0 ? `0 0 ${Math.round(g * 16)}px ${colors.accent}30, inset 0 0 ${Math.round(g * 8)}px ${colors.accent}10` : "none",
        borderColor: glowP > 0 ? colors.accent + Math.round(30 + g * 40).toString(16) : colors.stone[600] + "30",
      });
    }
  }, [progress]);

  // Helpers for avatar rendering
  const clientAvatar = (
    <div className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: colors.ember + "25", border: `1px solid ${colors.ember}40` }}>
      <svg viewBox="0 0 16 16" width="10" height="10" fill="none">
        <circle cx="8" cy="5.5" r="2.5" stroke={colors.ember} strokeWidth="1.2"/>
        <path d="M3 13.5c0-2.5 2.2-4 5-4s5 1.5 5 4" stroke={colors.ember} strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    </div>
  );

  const igAvatar = (
    <div className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 overflow-hidden" style={{ backgroundColor: colors.void, border: `1px solid ${colors.accent}40` }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/logo.png" alt="" width={10} height={10} className="w-[10px] h-[10px] object-contain" style={{ filter: "brightness(10)" }} />
    </div>
  );

  return (
    <div ref={containerRef} className="relative h-full w-full p-3 md:p-4">
      <div
        className="cv-outer h-full flex flex-col rounded-[2px] border border-stone-600/30 overflow-hidden"
        style={{ backgroundColor: colors.surface }}
      >
        {/* Top bar */}
        <div
          className="cv-topbar flex items-center justify-between px-2.5 md:px-3 py-1.5 border-b border-stone-600/15"
          style={{ opacity: 0 }}
        >
          <span className="font-mono text-[8px] md:text-[9px] tracking-[0.12em]" style={{ color: colors.accentMuted }}>
            CUSTOM BUILD
          </span>
          <div className="flex items-center gap-1.5">
            <div className="cv-live-dot w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.stone[600] }} />
            <span className="cv-live-label font-mono text-[7px] md:text-[8px] tracking-[0.1em]" style={{ color: colors.stone[600] }}>
              LIVE
            </span>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: colors.void }}>

          {/* Conversation */}
          <div className="flex flex-col gap-1 px-2.5 md:px-3 py-2">
            {CONVO.map((msg, i) => {
              const isClient = msg.from === "client";
              return (
                <div
                  key={i}
                  className={`cv-msg flex items-start gap-2 ${isClient ? "" : "self-end flex-row-reverse"}`}
                  style={{ opacity: 0, maxWidth: "88%" }}
                >
                  {isClient ? clientAvatar : igAvatar}
                  <div>
                    <div
                      className={`font-mono text-[6px] md:text-[7px] tracking-[0.08em] mb-0.5 ${isClient ? "" : "text-right"}`}
                      style={{ color: isClient ? colors.stone[600] : colors.accent + "80" }}
                    >
                      {isClient ? "CLIENT" : "INNOVGEIST"}
                    </div>
                    <div
                      className="px-2 py-1.5 rounded-[3px]"
                      style={{
                        backgroundColor: isClient ? colors.surface : colors.accent + "08",
                        border: `1px solid ${isClient ? colors.stone[600] + "25" : colors.accent + "20"}`,
                      }}
                    >
                      <span className="cv-msg-text font-mono text-[7px] md:text-[8px] leading-[1.5]" style={{ color: isClient ? colors.stone[200] : colors.chalk }} />
                      <span className="cv-msg-cursor font-mono text-[8px]" style={{ color: colors.accent, opacity: 0 }}>|</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stack Fusion → transforms into Results */}
          <div className="cv-fusion relative flex-1 px-2.5 md:px-3 py-2 border-t border-stone-600/15 flex flex-col" style={{ opacity: 0 }}>
            <div className="cv-fusion-title font-mono text-[6px] md:text-[7px] tracking-[0.15em] mb-1.5" style={{ color: colors.stone[600] }}>
              STACK FUSION
            </div>

            {/* Fusion content — tech icons + center diamond */}
            <div className="cv-fusion-content relative flex-1 flex items-center justify-center" style={{ minHeight: 80 }}>
              {STACK_ITEMS.map((tech) => (
                <div
                  key={tech.label}
                  className="cv-tech-icon absolute flex flex-col items-center gap-0.5"
                  style={{ opacity: 0, top: "50%", left: "50%", marginTop: -14, marginLeft: -14 }}
                >
                  <div
                    className="w-6 h-6 md:w-7 md:h-7 rounded-[3px] flex items-center justify-center"
                    style={{ backgroundColor: tech.color + "12", border: `1px solid ${tech.color}35` }}
                  >
                    {tech.icon(tech.color)}
                  </div>
                  <span className="font-mono text-[5px] md:text-[6px] whitespace-nowrap" style={{ color: tech.color + "CC" }}>
                    {tech.label}
                  </span>
                </div>
              ))}
              <div
                className="cv-fusion-center absolute w-8 h-8 rounded-[3px] flex items-center justify-center"
                style={{
                  top: "50%", left: "50%", marginTop: -16, marginLeft: -16,
                  backgroundColor: colors.accent + "18",
                  border: `1.5px solid ${colors.accent}50`,
                  transform: "rotate(45deg) scale(0.1)",
                  opacity: 0,
                }}
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.accent, transform: "rotate(-45deg)" }} />
              </div>
            </div>

            {/* Results content — replaces fusion content after animation */}
            <div className="cv-results absolute inset-0 px-2.5 md:px-3 pt-8 pb-2 flex flex-col justify-center" style={{ opacity: 0 }}>
              {/* 3 stat cards */}
              <div className="grid grid-cols-3 gap-2">
                {RESULT_STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="cv-stat-card rounded-[3px] px-1.5 py-1.5 flex items-center justify-between"
                    style={{ opacity: 0, backgroundColor: stat.color + "08", border: `1px solid ${stat.color}20` }}
                  >
                    <div>
                      <span className="cv-stat-value font-mono text-[10px] md:text-[12px] font-bold leading-none" style={{ color: stat.color }} />
                      <div className="font-mono text-[5px] md:text-[6px] tracking-[0.08em] mt-0.5" style={{ color: colors.stone[400] }}>
                        {stat.label}
                      </div>
                    </div>
                    <div className="flex items-end gap-px" style={{ height: 14 }}>
                      {stat.bars.map((_, bi) => (
                        <div
                          key={bi}
                          className="cv-spark-bar w-1.5 origin-bottom rounded-[0.5px]"
                          data-card={i}
                          data-bar={bi}
                          style={{ height: 14, backgroundColor: stat.color + "60", transform: "scaleY(0)" }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery progress bar */}
              <div className="cv-progress-track mt-2.5" style={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-mono text-[5px] md:text-[6px] tracking-[0.1em]" style={{ color: colors.stone[600] }}>DELIVERY PROGRESS</span>
                  <span className="cv-progress-label font-mono text-[6px] md:text-[7px] font-medium" style={{ color: colors.accentMuted }} />
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: colors.stone[600] + "15" }}>
                  <div
                    className="cv-progress-fill h-full rounded-full origin-left"
                    style={{ backgroundColor: colors.accent, transform: "scaleX(0)" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Exported component — picks visual by index
// ============================================================

const VISUALS = [AutomateVisual, PipelineVisual, IntelVisual, AgencyVisual, CustomVisual];

interface ServiceVisualProps {
  index: number;
  progress: number;
}

export function ServiceVisual({ index, progress }: ServiceVisualProps) {
  const Visual = VISUALS[index];
  if (!Visual) return null;
  return <Visual progress={progress} />;
}
