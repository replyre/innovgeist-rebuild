"use client";

import { useRef, useState, useCallback } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";

/* ─── Types ─── */

interface FormData {
  fullName: string;
  workEmail: string;
  companyName: string;
  role: string;
  roleOther: string;
  revenue: string;
  teamSize: string;
  industry: string;
  improvements: string[];
  currentChallenge: string;
  timeline: string;
  investment: string;
  promptReason: string;
  confirmed: boolean;
}

interface Errors {
  [key: string]: string;
}

/* ─── Static data ─── */

const ROLES = [
  "Founder / Co-founder",
  "CEO / Managing Director",
  "Head of Sales",
  "Head of Marketing / Growth",
  "Operations / RevOps",
  "Agency Owner",
  "Other",
];

const REVENUES = [
  { value: "", label: "Select revenue range" },
  { value: "<$1M", label: "Less than $1M" },
  { value: "$1–5M", label: "$1M – $5M" },
  { value: "$5–10M", label: "$5M – $10M" },
  { value: "$10M+", label: "$10M+" },
];

const TEAM_SIZES = [
  { value: "", label: "Select team size" },
  { value: "1–10", label: "1 – 10 people" },
  { value: "11–25", label: "11 – 25 people" },
  { value: "26–50", label: "26 – 50 people" },
  { value: "50+", label: "50+ people" },
];

const IMPROVEMENTS = [
  "Lead handling & follow-ups",
  "Sales conversion consistency",
  "CRM & pipeline clarity",
  "Marketing → sales handoff",
  "Internal workflow automation",
  "AI-assisted prioritization or insights",
  "Agency delivery infrastructure",
  "Other",
];

const TIMELINES = [
  { value: "", label: "Select your timeline" },
  { value: "Immediately / Next 30 days", label: "Immediately / Next 30 days" },
  { value: "1–3 months", label: "1 – 3 months" },
  { value: "3–6 months", label: "3 – 6 months" },
  { value: "Exploring / Research phase", label: "Exploring / Research phase" },
];

const INVESTMENTS = [
  { value: "", label: "Select an option" },
  { value: "Open to consultative pricing", label: "Open to consultative pricing" },
  { value: "Have a range in mind", label: "Have a range in mind" },
  { value: "Not sure yet", label: "Not sure yet" },
  { value: "Looking for low-cost execution", label: "Looking for low-cost execution" },
];

/* ─── Shared input class builder ─── */

const inputBase =
  "w-full bg-void border rounded-sm px-4 py-3 text-sm text-chalk placeholder:text-stone-600 focus:outline-none transition-colors duration-200 font-sans";

function inputCls(hasError: boolean) {
  return `${inputBase} ${
    hasError
      ? "border-red-500/60 focus:border-red-500/80"
      : `border-stone-600/30 focus:border-accent/50`
  }`;
}

/* ─── Progress indicator ─── */

function StepIndicator({ step }: { step: 1 | 2 }) {
  const steps = [
    { num: 1, label: "About You & Your Business" },
    { num: 2, label: "Your Challenge & Goals" },
  ];

  return (
    <div className="flex items-center gap-0 mb-10">
      {steps.map((s, i) => {
        const isActive = step === s.num;
        const isDone = step > s.num;

        return (
          <div key={s.num} className="flex items-center">
            <div className="flex items-center gap-2.5">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                style={{
                  backgroundColor: isActive
                    ? colors.accent
                    : isDone
                    ? `${colors.accent}30`
                    : `${colors.stone[600]}25`,
                  border: `1px solid ${
                    isActive ? colors.accent : isDone ? `${colors.accent}50` : `${colors.stone[600]}30`
                  }`,
                }}
              >
                {isDone ? (
                  <svg width={10} height={10} viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke={colors.accent}
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span
                    className="font-mono text-[10px] font-bold"
                    style={{ color: isActive ? colors.void : colors.stone[400] }}
                  >
                    {s.num}
                  </span>
                )}
              </div>
              <span
                className="font-mono text-[11px] tracking-wide hidden sm:block"
                style={{
                  color: isActive ? colors.chalk : colors.stone[600],
                }}
              >
                {s.label}
              </span>
            </div>

            {i < steps.length - 1 && (
              <div
                className="mx-4 flex-shrink-0 h-px w-8 sm:w-16 transition-colors duration-300"
                style={{
                  backgroundColor:
                    step > s.num ? `${colors.accent}50` : `${colors.stone[600]}30`,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Field label ─── */

function FieldLabel({
  children,
  required,
  hint,
}: {
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div className="mb-2">
      <label className="flex items-center gap-1.5 text-sm text-chalk font-medium">
        {children}
        {required && (
          <span style={{ color: colors.accent }} className="text-xs">
            *
          </span>
        )}
      </label>
      {hint && (
        <p className="font-mono text-[11px] text-stone-600 mt-1 leading-snug">
          {hint}
        </p>
      )}
    </div>
  );
}

/* ─── Error message ─── */

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="font-mono text-[11px] mt-1.5" style={{ color: "#EF4444" }}>
      {message}
    </p>
  );
}

/* ─── Section divider ─── */

function SectionDivider({ label }: { label: string }) {
  return (
    <div
      className="flex items-center gap-3 py-1"
      style={{ borderTop: `1px solid ${colors.stone[600]}18` }}
    >
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-stone-600 pt-3">
        {label}
      </span>
    </div>
  );
}

/* ─── Left panel ─── */

function LeftPanel() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.2 }
      );
    },
    { scope: ref }
  );

  const PROCESS = [
    "Fill out this form — it takes about 4 minutes.",
    "We review your request carefully within 1–2 business days.",
    "If there's a potential fit, we'll reach out to schedule a discovery conversation.",
    "Discovery conversations are focused, consultative, and obligation-free.",
  ];

  return (
    <div ref={ref} className="lg:col-span-2 space-y-6" style={{ opacity: 0 }}>
      {/* What to expect */}
      <div
        className="p-6 md:p-7 rounded-sm"
        style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.stone[600]}22`,
        }}
      >
        <p
          className="font-mono text-[10px] tracking-[0.25em] uppercase mb-4"
          style={{ color: colors.accent }}
        >
          What to Expect
        </p>
        <ul className="space-y-3.5">
          {PROCESS.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="font-mono text-[10px] shrink-0 mt-[3px]"
                style={{ color: `${colors.accent}70` }}
              >
                0{i + 1}
              </span>
              <p className="text-stone-400 type-small leading-relaxed">{step}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Selectivity signal */}
      <div
        className="p-6 rounded-sm"
        style={{
          backgroundColor: `${colors.accent}07`,
          border: `1px solid ${colors.accent}18`,
        }}
      >
        <p className="type-small text-stone-400 leading-relaxed">
          We work with a limited number of partners at a time. This form helps
          us understand whether there&apos;s a genuine fit before scheduling a
          call.
        </p>
      </div>

      {/* Contact info */}
      <div
        className="p-6 rounded-sm space-y-4"
        style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.stone[600]}18`,
        }}
      >
        <p
          className="font-mono text-[10px] tracking-[0.25em] uppercase text-stone-600"
        >
          Direct Contact
        </p>
        <div className="space-y-2">
          <p className="type-small text-stone-400">
            sales@innovgeist.com
          </p>
          <p className="type-small text-stone-400">
            hello@innovgeist.com
          </p>
        </div>
        <a
          href="https://wa.me/919305602733"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs transition-colors duration-300"
          style={{ color: colors.accent }}
        >
          <svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}

/* ─── Success state ─── */

function SuccessState() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.1 }
      );
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className="p-8 md:p-12 rounded-sm flex flex-col items-start"
      style={{
        opacity: 0,
        backgroundColor: colors.surface,
        border: `1px solid ${colors.accent}25`,
      }}
    >
      {/* Check icon */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mb-7"
        style={{ backgroundColor: `${colors.accent}15`, border: `1px solid ${colors.accent}30` }}
      >
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
          <path
            d="M4 12l5 5L20 7"
            stroke={colors.accent}
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <p
        className="font-mono text-[10px] tracking-[0.25em] uppercase mb-3"
        style={{ color: colors.accent }}
      >
        Request Received
      </p>

      <h3
        className="font-display text-chalk mb-3"
        style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)" }}
      >
        Thanks for reaching out.
      </h3>

      <p className="text-stone-400 type-body leading-relaxed max-w-md mb-7">
        We review every request carefully. If there&apos;s a potential fit,
        we&apos;ll follow up to schedule a discovery conversation.
      </p>

      <div
        className="h-px w-full mb-7"
        style={{ backgroundColor: `${colors.stone[600]}20` }}
      />

      <p className="font-mono text-xs text-stone-600">
        In the meantime, you can explore our{" "}
        <a href="/case-studies" className="text-stone-400 hover:text-chalk transition-colors underline underline-offset-2">
          case studies
        </a>{" "}
        or read our{" "}
        <a href="/insights" className="text-stone-400 hover:text-chalk transition-colors underline underline-offset-2">
          insights
        </a>
        .
      </p>
    </div>
  );
}

/* ─── Main page ─── */

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    workEmail: "",
    companyName: "",
    role: "",
    roleOther: "",
    revenue: "",
    teamSize: "",
    industry: "",
    improvements: [],
    currentChallenge: "",
    timeline: "",
    investment: "",
    promptReason: "",
    confirmed: false,
  });

  useGSAP(
    () => {
      if (!pageRef.current) return;

      if (headerRef.current) {
        const chars = headerRef.current.querySelectorAll(".split-char");
        gsap.fromTo(
          chars,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            stagger: 0.012,
            duration: 0.6,
            ease: "power3.out",
            delay: 0.15,
          }
        );
      }

      if (formCardRef.current) {
        gsap.fromTo(
          formCardRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.3 }
        );
      }
    },
    { scope: pageRef }
  );

  /* ── Field helpers ── */

  const set = useCallback(
    (key: keyof FormData, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    },
    []
  );

  const toggleImprovement = useCallback((item: string) => {
    setFormData((prev) => ({
      ...prev,
      improvements: prev.improvements.includes(item)
        ? prev.improvements.filter((i) => i !== item)
        : [...prev.improvements, item],
    }));
  }, []);

  /* ── Validation ── */

  const validateStep1 = useCallback((): boolean => {
    const errs: Errors = {};
    if (!formData.fullName.trim()) errs.fullName = "Required";
    if (!formData.workEmail.trim()) {
      errs.workEmail = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      errs.workEmail = "Enter a valid email address";
    }
    if (!formData.companyName.trim()) errs.companyName = "Required";
    if (!formData.role) errs.role = "Required";
    if (formData.role === "Other" && !formData.roleOther.trim())
      errs.roleOther = "Please specify your role";
    if (!formData.revenue) errs.revenue = "Required";
    if (!formData.teamSize) errs.teamSize = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [formData]);

  const validateStep2 = useCallback((): boolean => {
    const errs: Errors = {};
    if (!formData.currentChallenge.trim())
      errs.currentChallenge = "Please describe your current challenge";
    if (!formData.promptReason.trim())
      errs.promptReason = "Please tell us what prompted you to reach out";
    if (!formData.confirmed)
      errs.confirmed = "Please confirm before submitting";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [formData]);

  /* ── Navigation ── */

  const goToStep2 = useCallback(() => {
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [validateStep1]);

  /* ── Submit ── */

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateStep2()) return;

      setSubmitting(true);
      setSubmitError("");

      const payload = {
        "Full Name": formData.fullName,
        "Work Email": formData.workEmail,
        "Company Name": formData.companyName,
        Role: formData.role === "Other" ? `Other: ${formData.roleOther}` : formData.role,
        "Annual Revenue": formData.revenue,
        "Team Size": formData.teamSize,
        Industry: formData.industry || "Not specified",
        "Areas to Improve": formData.improvements.join(", ") || "None selected",
        "Current Challenge": formData.currentChallenge,
        Timeline: formData.timeline || "Not specified",
        "Investment Thinking": formData.investment || "Not specified",
        "Prompted By": formData.promptReason,
        _subject: "New Discovery Request from Innovgeist Website",
        _captcha: "false",
        _template: "table",
      };

      try {
        const res = await fetch(
          "https://formsubmit.co/ajax/replyrgupta@gmail.com",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (res.ok) {
          setSubmitted(true);
        } else {
          setSubmitError("Something went wrong. Please try again or email us directly.");
        }
      } catch {
        setSubmitError("Network error. Please try again or email us directly.");
      } finally {
        setSubmitting(false);
      }
    },
    [formData, validateStep2]
  );

  /* ── Shared select style ── */
  const selectCls = (key: string) =>
    `${inputCls(!!errors[key])} appearance-none cursor-pointer`;

  const headlineWords = "Request a Discovery Conversation".split(" ");

  return (
    <div
      ref={pageRef}
      className="min-h-screen pt-[72px] bg-void"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(92,81,74,0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(92,81,74,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "72px 72px",
      }}
    >
      <Container className="py-16 md:py-24">
        {/* Page header */}
        <div className="mb-4">
          <div className="mb-6">
            <span
              className="font-mono text-xs tracking-[0.3em] uppercase"
              style={{ color: colors.accent }}
            >
              Contact
            </span>
          </div>
          <div ref={headerRef} className="mb-4">
            <h1 className="flex flex-wrap font-display type-heading text-chalk">
              {headlineWords.map((word, wi) => (
                <span
                  key={wi}
                  className="inline-block overflow-hidden mr-[0.28em]"
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
            </h1>
          </div>
          <p className="text-stone-400 type-small max-w-xl">
            Tell us about your business and what you&apos;re trying to solve.
            We&apos;ll review carefully and follow up if there&apos;s a fit.
          </p>
        </div>

        {/* Divider */}
        <div
          className="h-px my-10 md:my-12"
          style={{ backgroundColor: `${colors.stone[600]}18` }}
        />

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left panel */}
          <LeftPanel />

          {/* Form card */}
          <div
            ref={formCardRef}
            className="lg:col-span-3"
            style={{ opacity: 0 }}
          >
            {submitted ? (
              <SuccessState />
            ) : (
              <div
                className="p-7 md:p-9 rounded-sm"
                style={{
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.stone[600]}22`,
                }}
              >
                {/* Step indicator */}
                <StepIndicator step={step} />

                {/* ── STEP 1 ── */}
                {step === 1 && (
                  <div>
                    <SectionDivider label="Basic Information" />
                    <div className="mt-5 space-y-5">

                      {/* Full name */}
                      <div>
                        <FieldLabel required>Full Name</FieldLabel>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => set("fullName", e.target.value)}
                          placeholder="Your full name"
                          className={inputCls(!!errors.fullName)}
                        />
                        <FieldError message={errors.fullName} />
                      </div>

                      {/* Work email */}
                      <div>
                        <FieldLabel required>Work Email</FieldLabel>
                        <input
                          type="email"
                          value={formData.workEmail}
                          onChange={(e) => set("workEmail", e.target.value)}
                          placeholder="you@company.com"
                          className={inputCls(!!errors.workEmail)}
                        />
                        <FieldError message={errors.workEmail} />
                      </div>

                      {/* Company name */}
                      <div>
                        <FieldLabel required>Company Name</FieldLabel>
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => set("companyName", e.target.value)}
                          placeholder="Your company"
                          className={inputCls(!!errors.companyName)}
                        />
                        <FieldError message={errors.companyName} />
                      </div>

                      {/* Role */}
                      <div>
                        <FieldLabel required>Your Role</FieldLabel>
                        <div className="relative">
                          <select
                            value={formData.role}
                            onChange={(e) => set("role", e.target.value)}
                            className={selectCls("role")}
                          >
                            <option value="">Select your role</option>
                            {ROLES.map((r) => (
                              <option key={r} value={r}>
                                {r}
                              </option>
                            ))}
                          </select>
                          <svg
                            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                            width={14}
                            height={14}
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M3 5l3 3.5L9 5"
                              stroke={colors.stone[400]}
                              strokeWidth={1.2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <FieldError message={errors.role} />

                        {formData.role === "Other" && (
                          <div className="mt-3">
                            <input
                              type="text"
                              value={formData.roleOther}
                              onChange={(e) => set("roleOther", e.target.value)}
                              placeholder="Please specify your role"
                              className={inputCls(!!errors.roleOther)}
                            />
                            <FieldError message={errors.roleOther} />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-8">
                      <SectionDivider label="Business Context" />
                    </div>
                    <div className="mt-5 space-y-5">

                      {/* Revenue */}
                      <div>
                        <FieldLabel
                          required
                          hint="Our work is typically best suited for $5M+ businesses."
                        >
                          Company Size (Annual Revenue)
                        </FieldLabel>
                        <div className="relative">
                          <select
                            value={formData.revenue}
                            onChange={(e) => set("revenue", e.target.value)}
                            className={selectCls("revenue")}
                          >
                            {REVENUES.map((r) => (
                              <option key={r.value} value={r.value}>
                                {r.label}
                              </option>
                            ))}
                          </select>
                          <svg
                            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                            width={14}
                            height={14}
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M3 5l3 3.5L9 5"
                              stroke={colors.stone[400]}
                              strokeWidth={1.2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <FieldError message={errors.revenue} />
                      </div>

                      {/* Team size */}
                      <div>
                        <FieldLabel required>Team Size</FieldLabel>
                        <div className="relative">
                          <select
                            value={formData.teamSize}
                            onChange={(e) => set("teamSize", e.target.value)}
                            className={selectCls("teamSize")}
                          >
                            {TEAM_SIZES.map((t) => (
                              <option key={t.value} value={t.value}>
                                {t.label}
                              </option>
                            ))}
                          </select>
                          <svg
                            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                            width={14}
                            height={14}
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M3 5l3 3.5L9 5"
                              stroke={colors.stone[400]}
                              strokeWidth={1.2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <FieldError message={errors.teamSize} />
                      </div>

                      {/* Industry */}
                      <div>
                        <FieldLabel>Industry</FieldLabel>
                        <input
                          type="text"
                          value={formData.industry}
                          onChange={(e) => set("industry", e.target.value)}
                          placeholder="e.g. B2B SaaS, Professional Services, E-commerce"
                          className={inputCls(false)}
                        />
                      </div>
                    </div>

                    {/* Next button */}
                    <div className="mt-10 flex items-center gap-4">
                      <button
                        type="button"
                        onClick={goToStep2}
                        className="inline-flex items-center gap-2.5 font-sans font-semibold text-sm px-7 py-3 rounded-sm transition-all duration-300 hover:opacity-90 active:scale-[0.98] cursor-pointer"
                        style={{
                          backgroundColor: colors.accent,
                          color: colors.void,
                        }}
                      >
                        Continue
                        <svg width={14} height={14} viewBox="0 0 12 12" fill="none">
                          <path
                            d="M3 6h7m0 0L7 3m3 3L7 9"
                            stroke="currentColor"
                            strokeWidth={1.4}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <span className="font-mono text-[11px] text-stone-600">
                        Step 1 of 2
                      </span>
                    </div>
                  </div>
                )}

                {/* ── STEP 2 ── */}
                {step === 2 && (
                  <form onSubmit={handleSubmit}>
                    <SectionDivider label="Intent & Problem Definition" />
                    <div className="mt-5 space-y-7">

                      {/* Improvements multi-select */}
                      <div>
                        <FieldLabel>What are you looking to improve right now?</FieldLabel>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {IMPROVEMENTS.map((item) => {
                            const active = formData.improvements.includes(item);
                            return (
                              <button
                                key={item}
                                type="button"
                                onClick={() => toggleImprovement(item)}
                                className="font-mono text-[11px] tracking-[0.12em] px-3 py-1.5 rounded-sm transition-all duration-200 cursor-pointer"
                                style={{
                                  border: `1px solid ${
                                    active
                                      ? `${colors.accent}60`
                                      : `${colors.stone[600]}28`
                                  }`,
                                  backgroundColor: active
                                    ? `${colors.accent}12`
                                    : "transparent",
                                  color: active ? colors.accent : colors.stone[400],
                                }}
                              >
                                {active && (
                                  <span className="mr-1.5" style={{ color: colors.accent }}>
                                    ✓
                                  </span>
                                )}
                                {item}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Current challenge */}
                      <div>
                        <FieldLabel required>
                          What best describes your current challenge?
                        </FieldLabel>
                        <p className="font-mono text-[11px] text-stone-600 mb-2">
                          Briefly describe what&apos;s not working in your current
                          sales, marketing, or operational systems.
                        </p>
                        <textarea
                          value={formData.currentChallenge}
                          onChange={(e) => set("currentChallenge", e.target.value)}
                          rows={4}
                          placeholder="Be specific — this helps us understand whether we can actually help."
                          className={`${inputCls(!!errors.currentChallenge)} resize-none`}
                        />
                        <FieldError message={errors.currentChallenge} />
                      </div>
                    </div>

                    <div className="mt-8">
                      <SectionDivider label="Readiness & Expectations" />
                    </div>
                    <div className="mt-5 space-y-5">

                      {/* Timeline */}
                      <div>
                        <FieldLabel>Timeline</FieldLabel>
                        <div className="relative">
                          <select
                            value={formData.timeline}
                            onChange={(e) => set("timeline", e.target.value)}
                            className={`${selectCls("timeline")}`}
                          >
                            {TIMELINES.map((t) => (
                              <option key={t.value} value={t.value}>
                                {t.label}
                              </option>
                            ))}
                          </select>
                          <svg
                            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                            width={14}
                            height={14}
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M3 5l3 3.5L9 5"
                              stroke={colors.stone[400]}
                              strokeWidth={1.2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Investment */}
                      <div>
                        <FieldLabel
                          hint="Our engagements are custom and system-driven, not fixed-price packages."
                        >
                          How are you thinking about investment for this work?
                        </FieldLabel>
                        <div className="relative">
                          <select
                            value={formData.investment}
                            onChange={(e) => set("investment", e.target.value)}
                            className={`${selectCls("investment")}`}
                          >
                            {INVESTMENTS.map((inv) => (
                              <option key={inv.value} value={inv.value}>
                                {inv.label}
                              </option>
                            ))}
                          </select>
                          <svg
                            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                            width={14}
                            height={14}
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M3 5l3 3.5L9 5"
                              stroke={colors.stone[400]}
                              strokeWidth={1.2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <SectionDivider label="Final Qualifier" />
                    </div>
                    <div className="mt-5 space-y-5">

                      {/* Prompted by */}
                      <div>
                        <FieldLabel required>
                          What prompted you to reach out now?
                        </FieldLabel>
                        <textarea
                          value={formData.promptReason}
                          onChange={(e) => set("promptReason", e.target.value)}
                          rows={4}
                          placeholder="What changed, or what made now the right time to explore this?"
                          className={`${inputCls(!!errors.promptReason)} resize-none`}
                        />
                        <FieldError message={errors.promptReason} />
                      </div>
                    </div>

                    <div className="mt-8">
                      <SectionDivider label="Confirmation" />
                    </div>
                    <div className="mt-5">
                      {/* Consent checkbox */}
                      <label
                        className="flex items-start gap-3.5 cursor-pointer group"
                        onClick={() => set("confirmed", !formData.confirmed)}
                      >
                        <div
                          className="mt-[2px] w-4 h-4 rounded-sm flex-shrink-0 flex items-center justify-center transition-all duration-200"
                          style={{
                            border: `1px solid ${
                              errors.confirmed
                                ? "#EF4444"
                                : formData.confirmed
                                ? colors.accent
                                : `${colors.stone[600]}50`
                            }`,
                            backgroundColor: formData.confirmed
                              ? `${colors.accent}20`
                              : "transparent",
                          }}
                        >
                          {formData.confirmed && (
                            <svg width={10} height={10} viewBox="0 0 12 12" fill="none">
                              <path
                                d="M2 6l3 3 5-5"
                                stroke={colors.accent}
                                strokeWidth={1.6}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <p className="text-stone-400 type-small leading-relaxed">
                          I understand that Innovgeist works through selective,
                          consultative engagements and may not be the right fit
                          for every request.
                        </p>
                      </label>
                      <FieldError message={errors.confirmed} />
                    </div>

                    {/* Submit error */}
                    {submitError && (
                      <p
                        className="font-mono text-xs mt-5"
                        style={{ color: "#EF4444" }}
                      >
                        {submitError}
                      </p>
                    )}

                    {/* Action buttons */}
                    <div className="mt-10 flex flex-wrap items-center gap-4">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center gap-2.5 font-sans font-semibold text-sm px-7 py-3 rounded-sm transition-all duration-300 disabled:opacity-60 cursor-pointer"
                        style={{
                          backgroundColor: colors.accent,
                          color: colors.void,
                        }}
                      >
                        {submitting ? (
                          <>
                            <svg
                              className="animate-spin"
                              width={14}
                              height={14}
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeOpacity="0.3"
                              />
                              <path
                                d="M12 2a10 10 0 0 1 10 10"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                            Sending…
                          </>
                        ) : (
                          "Request Discovery Conversation"
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setStep(1);
                          setErrors({});
                        }}
                        className="font-mono text-xs text-stone-600 hover:text-stone-400 transition-colors cursor-pointer"
                      >
                        ← Back
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
