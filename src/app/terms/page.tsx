import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Service",
};

const LAST_UPDATED = "March 7, 2026";

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-[72px] bg-void">
      <Container className="py-16 md:py-24">
        <h1 className="font-display type-display text-chalk mb-4">
          Terms of Service
        </h1>
        <p className="font-mono text-xs text-stone-600 uppercase tracking-wider mb-12">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="prose-custom space-y-8 max-w-3xl">
          <Section title="1. Acceptance of Terms">
            By accessing and using the Innovgeist website and services, you
            accept and agree to be bound by these Terms of Service. If you do
            not agree to these terms, please do not use our website or services.
          </Section>

          <Section title="2. Services">
            Innovgeist provides technology consulting, revenue automation
            engineering, academic operating system development, custom software
            engineering, and related digital services. The specific scope,
            deliverables, and terms for each engagement are defined in
            individual project agreements between Innovgeist and the client.
          </Section>

          <Section title="3. Use of Website">
            You agree to use our website only for lawful purposes. You must not:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Use the website in any way that violates applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to any part of the website</li>
              <li>Transmit any malicious code, viruses, or harmful data</li>
              <li>Use automated systems to scrape or extract data from the website</li>
              <li>Impersonate any person or entity or misrepresent your affiliation</li>
            </ul>
          </Section>

          <Section title="4. Intellectual Property">
            All content on this website &mdash; including text, graphics,
            logos, images, code, and design &mdash; is the property of
            Innovgeist and is protected by intellectual property laws. You may
            not reproduce, distribute, or create derivative works from our
            content without prior written consent.
          </Section>

          <Section title="5. Client Projects & Deliverables">
            Ownership and licensing of project deliverables are governed by the
            specific agreement executed between Innovgeist and the client for
            each engagement. Unless otherwise specified in writing, Innovgeist
            retains ownership of proprietary tools, frameworks, and
            methodologies developed independently of client projects.
          </Section>

          <Section title="6. Confidentiality">
            Both parties agree to maintain the confidentiality of any
            proprietary or sensitive information shared during the course of an
            engagement. This obligation survives the termination of any
            agreement between the parties.
          </Section>

          <Section title="7. Payment Terms">
            Payment terms, including pricing, milestones, and schedules, are
            defined in individual project agreements. Innovgeist does not
            operate on fixed pricing &mdash; each engagement is scoped and
            priced based on the specific requirements and complexity involved.
          </Section>

          <Section title="8. Limitation of Liability">
            To the maximum extent permitted by law, Innovgeist shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages arising from your use of our website or services.
            Our total liability for any claim shall not exceed the amount paid
            by you for the specific service giving rise to the claim.
          </Section>

          <Section title="9. Disclaimer of Warranties">
            Our website and services are provided &quot;as is&quot; and
            &quot;as available&quot; without warranties of any kind, either
            express or implied. We do not guarantee that the website will be
            uninterrupted, secure, or error-free.
          </Section>

          <Section title="10. Termination">
            We reserve the right to terminate or suspend access to our website
            at any time, without prior notice, for conduct that we believe
            violates these Terms or is harmful to other users or our business.
            Termination of project engagements is governed by individual project
            agreements.
          </Section>

          <Section title="11. Governing Law">
            These Terms are governed by and construed in accordance with the
            laws of India. Any disputes arising from these Terms shall be
            subject to the exclusive jurisdiction of the courts in Lucknow,
            Uttar Pradesh, India.
          </Section>

          <Section title="12. Changes to Terms">
            We may revise these Terms at any time by updating this page. Your
            continued use of the website after any changes constitutes
            acceptance of the new Terms. We encourage you to review this page
            periodically.
          </Section>

          <Section title="13. Contact Us">
            For questions about these Terms of Service, contact us at:
            <br /><br />
            <span className="font-mono text-sm">
              Email:{" "}
              <a
                href="mailto:sales@innovgeist.com"
                className="text-accent hover:text-accent-muted transition-colors"
              >
                sales@innovgeist.com
              </a>
              <br />
              Phone: +91-9305602733
              <br />
              Location: Lucknow, Uttar Pradesh, India
            </span>
          </Section>
        </div>
      </Container>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2
        className="font-display text-lg text-chalk mb-3 pl-3"
        style={{ borderLeft: "2px solid var(--color-accent)" }}
      >
        {title}
      </h2>
      <div className="text-sm text-stone-400 leading-relaxed">{children}</div>
    </div>
  );
}
