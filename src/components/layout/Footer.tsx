import { Container } from "@/components/ui/Container";
import { colors } from "@/lib/theme";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

const serviceLinks = [
  { label: "Revenue Automation", href: "/services#revenue-automation" },
  { label: "Academic OS", href: "/services#academic-os" },
  { label: "Custom Engineering", href: "/services#custom-engineering" },
];

const connectLinks = [
  { label: "sales@innovgeist.com", href: "mailto:sales@innovgeist.com" },
  { label: "+91-9305602733 / +91-8127273162", href: "tel:+919305602733" },
  { label: "WhatsApp", href: "https://wa.me/919305602733" },
  { label: "LinkedIn", href: "https://linkedin.com/company/innovgeist" },
  { label: "Instagram", href: "https://instagram.com/innovgeist" },
];

const tetrisColors = [colors.accent, colors.ember, colors.accentMuted, colors.accent, colors.ember];

export function Footer() {
  return (
    <footer
      className="bg-surface border-t"
      style={{ borderColor: `${colors.stone[600]}30` }}
    >
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="/" className="flex items-center gap-2.5 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt=""
                className="h-7 w-7 object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <span className="font-display text-xl text-chalk tracking-tight">
                Innovgeist
              </span>
            </a>
            <p className="font-mono text-xs text-stone-400 leading-relaxed mb-3">
              Systems that generate revenue.
              <br />
              Not just software.
            </p>
            <p className="text-xs text-stone-600 leading-relaxed">
              Lucknow, Uttar Pradesh, India
              <br />
              Kanpur, Uttar Pradesh, India
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-stone-600 mb-4">
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-chalk transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-stone-600 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-chalk transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Connect */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-stone-600 mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-chalk transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: `${colors.stone[600]}20` }}
      >
        <Container className="py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-stone-600">
            <span>&copy; 2026 Innovgeist. All rights reserved.</span>
            <a href="/privacy" className="hover:text-stone-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-stone-400 transition-colors">Terms</a>
          </div>

          {/* Tetris signature — row of tiny outlined blocks */}
          <div className="flex items-center gap-1">
            {tetrisColors.map((color, i) => (
              <svg key={i} width={8} height={8} viewBox="0 0 8 8">
                <rect
                  x={0.5}
                  y={0.5}
                  width={7}
                  height={7}
                  fill="none"
                  stroke={color}
                  strokeWidth={1}
                  opacity={0.5}
                />
              </svg>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
