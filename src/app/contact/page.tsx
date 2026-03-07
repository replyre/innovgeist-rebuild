"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";

const CONTACT_INFO = [
  {
    label: "Our Location",
    lines: ["Lucknow, Uttar Pradesh, India", "Kanpur, Uttar Pradesh, India"],
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    ),
  },
  {
    label: "Phone Number",
    lines: ["+91-9305602733 / +91-8127273162"],
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
      />
    ),
  },
  {
    label: "Email Address",
    lines: ["sales@innovgeist.com", "hello@innovgeist.com"],
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
      />
    ),
  },
  {
    label: "Social",
    lines: ["LinkedIn: /innovgeist", "Instagram: /innovgeist"],
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
      />
    ),
  },
];

const SERVICE_OPTIONS = [
  { value: "", label: "Select Service" },
  { value: "revenue-automation", label: "Revenue Automation" },
  { value: "academic-os", label: "Academic Operating System" },
  { value: "custom-engineering", label: "Custom Engineering" },
  { value: "web-development", label: "Web Development" },
  { value: "mobile-app", label: "Mobile App Development" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "brand-identity", label: "Brand Identity & Design" },
  { value: "other", label: "Other" },
];

const inputClasses =
  "w-full bg-surface border border-stone-600/40 rounded-lg px-4 py-3 text-sm text-chalk placeholder:text-stone-600 focus:outline-none focus:border-accent/60 transition-colors duration-200";

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!pageRef.current) return;

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
            delay: 0.2,
          }
        );
      }

      if (infoRef.current) {
        const items = infoRef.current.querySelectorAll(".info-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.5,
            delay: 0.4,
          }
        );
      }

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.5,
          }
        );
      }
    },
    { scope: pageRef }
  );

  const headlineWords = "Contact Us".split(" ");

  return (
    <div
      ref={pageRef}
      className="min-h-screen pt-[72px] bg-void"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(92,81,74,0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(92,81,74,0.05) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    >
      <Container className="py-16 md:py-24">
        {/* Headline */}
        <div ref={headlineRef} className="mb-4">
          <h1 className="flex flex-wrap font-display type-display text-chalk">
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
          </h1>
        </div>

        <p className="text-stone-400 text-sm md:text-base max-w-2xl mb-16 animate-fade-in">
          Ready to start your next project? Get in touch with us today and
          let&apos;s discuss how we can help transform your digital presence and
          grow your business.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-2 space-y-1">
            <div
              className="p-6 md:p-8 rounded-sm"
              style={{
                backgroundColor: colors.surface,
                border: `1px solid ${colors.accent}40`,
              }}
            >
              <h3 className="font-display text-xl text-chalk mb-2">
                Contact Info
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed mb-8">
                We&apos;re here to answer your questions and help you take the
                next step towards digital success.
              </p>

              <div className="space-y-6">
                {CONTACT_INFO.map((item) => (
                  <div key={item.label} className="info-item flex gap-4" style={{ opacity: 0 }}>
                    <div
                      className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${colors.accent}15` }}
                    >
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={colors.accent}
                        strokeWidth={1.5}
                      >
                        {item.icon}
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-wider text-stone-600 mb-1">
                        {item.label}
                      </h4>
                      {item.lines.map((line) => (
                        <p key={line} className="text-sm text-stone-400">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${colors.stone[600]}20` }}>
                <a
                  href="https://wa.me/919305602733"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-muted transition-colors"
                >
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            ref={formRef}
            className="lg:col-span-3 p-6 md:p-8 rounded-sm"
            style={{
              opacity: 0,
              backgroundColor: colors.surface,
              border: `1px solid ${colors.ember}40`,
            }}
          >
            <h3 className="font-display text-xl text-chalk mb-2">
              Get Your Free Consultation
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed mb-8">
              Tell us about your project and goals. We&apos;ll get back to you
              within 24 hours with a customized proposal and next steps to bring
              your vision to life.
            </p>

            <form
              action="https://formsubmit.co/replyrgupta@gmail.com"
              method="POST"
              className="space-y-5"
            >
              <input
                type="hidden"
                name="_subject"
                value="New Contact Form Submission from Innovgeist Website"
              />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className={inputClasses}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className={inputClasses}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  className={inputClasses}
                />
                <select
                  name="service"
                  required
                  className={inputClasses}
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Project Title / Subject"
                required
                className={inputClasses}
              />

              <textarea
                name="message"
                rows={6}
                placeholder="Tell us about your project, timeline, and any specific requirements..."
                required
                className={`${inputClasses} resize-none`}
              />

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Button type="submit" variant="primary">
                  Send Message
                </Button>
                <span className="text-xs text-stone-600 font-mono">
                  We&apos;ll get back to you within 24 hours
                </span>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
