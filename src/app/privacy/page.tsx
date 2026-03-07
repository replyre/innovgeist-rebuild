import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const LAST_UPDATED = "March 7, 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-[72px] bg-void">
      <Container className="py-16 md:py-24">
        <h1 className="font-display type-display text-chalk mb-4">
          Privacy Policy
        </h1>
        <p className="font-mono text-xs text-stone-600 uppercase tracking-wider mb-12">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="prose-custom space-y-8 max-w-3xl">
          <Section title="1. Introduction">
            Innovgeist (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;)
            respects your privacy. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our
            website or engage with our services. By using our website you agree
            to the collection and use of information in accordance with this
            policy.
          </Section>

          <Section title="2. Information We Collect">
            <strong className="text-chalk">Personal Information:</strong> When
            you fill out our contact form, we may collect your name, email
            address, phone number, and any other information you choose to
            provide in your message.
            <br /><br />
            <strong className="text-chalk">Usage Data:</strong> We may
            automatically collect information about how you access and use the
            website, including your IP address, browser type, pages visited,
            time spent on pages, and referring URLs.
            <br /><br />
            <strong className="text-chalk">Cookies:</strong> We use minimal
            cookies and similar tracking technologies to enhance your experience.
            These are limited to essential functionality and basic analytics.
          </Section>

          <Section title="3. How We Use Your Information">
            We use the information we collect to:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Respond to your inquiries and provide requested services</li>
              <li>Communicate with you about projects, updates, and promotions</li>
              <li>Improve and optimize our website and services</li>
              <li>Comply with legal obligations</li>
              <li>Detect and prevent fraud or abuse</li>
            </ul>
          </Section>

          <Section title="4. Sharing of Information">
            We do not sell, trade, or rent your personal information to third
            parties. We may share your information with trusted service
            providers who assist us in operating our website and conducting our
            business, provided they agree to keep this information confidential.
            We may also disclose information when required by law.
          </Section>

          <Section title="5. Data Security">
            We implement reasonable security measures to protect your personal
            information. However, no method of transmission over the Internet or
            electronic storage is 100% secure, and we cannot guarantee absolute
            security.
          </Section>

          <Section title="6. Third-Party Services">
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices of these external sites. We
            use FormSubmit for form processing, which has its own privacy
            policy.
          </Section>

          <Section title="7. Your Rights">
            You have the right to access, correct, or delete your personal
            information. You may also opt out of receiving communications from
            us at any time. To exercise these rights, contact us at{" "}
            <a
              href="mailto:sales@innovgeist.com"
              className="text-accent hover:text-accent-muted transition-colors"
            >
              sales@innovgeist.com
            </a>
            .
          </Section>

          <Section title="8. Children's Privacy">
            Our services are not directed to individuals under the age of 18. We
            do not knowingly collect personal information from children.
          </Section>

          <Section title="9. Changes to This Policy">
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated revision date. Your continued
            use of the website after changes constitutes acceptance of the
            revised policy.
          </Section>

          <Section title="10. Contact Us">
            If you have questions about this Privacy Policy, contact us at:
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
