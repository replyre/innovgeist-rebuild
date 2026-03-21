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
      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-10 lg:gap-8">
          {/* Col 1 — Brand */}
          <div>
            <a href="/" className="flex items-center gap-2.5 mb-5 opacity-90 hover:opacity-100 transition-opacity">
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
            <p className="font-mono text-xs text-stone-400 leading-relaxed mb-4 max-w-[200px]">
              Systems that generate revenue.
              <br />
              Not just software.
            </p>
            <p className="text-xs text-stone-600 leading-relaxed">
              Lucknow / Kanpur
              <br />
              Uttar Pradesh, India
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-5">
              Navigate
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[13px] text-stone-400 hover:text-chalk transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[13px] text-stone-400 hover:text-chalk transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Connect */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-5">
              Connect
            </h4>
            <ul className="space-y-3">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[13px] text-stone-400 hover:text-chalk transition-colors duration-200 block truncate sm:whitespace-normal"
                    title={link.label}
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
        style={{ borderColor: `${colors.stone[600]}15` }}
      >
        <Container className="py-6 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-6 text-[11px] text-stone-600 tracking-wide">
            <span className="opacity-80">&copy; 2026 Innovgeist Labs. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <a href="/privacy" className="hover:text-stone-400 transition-colors py-1">Privacy Policy</a>
              <a href="/terms" className="hover:text-stone-400 transition-colors py-1">Terms</a>
            </div>
          </div>

          {/* Tetris signature — row of tiny outlined blocks */}
          <div className="flex items-center gap-1.5 opacity-40">
            {tetrisColors.map((color, i) => (
              <svg key={i} width={7} height={7} viewBox="0 0 8 8">
                <rect
                  x={0.5}
                  y={0.5}
                  width={7}
                  height={7}
                  fill="none"
                  stroke={color}
                  strokeWidth={1}
                />
              </svg>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
