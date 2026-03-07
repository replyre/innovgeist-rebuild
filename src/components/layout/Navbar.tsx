"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/theme";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "/products", hasDropdown: true },
  { label: "Case Studies", href: "#testimonials" },
  { label: "How We Work", href: "#how-we-work" },
  { label: "Contact", href: "#contact" },
];

const productDropdownItems = [
  {
    label: "GradeGuru",
    href: "https://gradeguru.innovgeist.com",
    description: "AI-powered academic assessment & learning platform",
    color: colors.accent,
    logo: "/images/clients/GradeGuru11.png",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const productsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuTimeline = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      start: "top -80",
      end: "max",
      onUpdate: (self) => {
        setIsScrolled(self.progress > 0);
      },
    });
  }, { scope: navRef });

  const openMenu = () => {
    setIsMobileOpen(true);
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      if (!menuRef.current || !menuLinksRef.current) return;

      const tl = gsap.timeline();
      menuTimeline.current = tl;

      tl.fromTo(
        menuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      const links = menuLinksRef.current.children;
      tl.fromTo(
        links,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.out",
        },
        "-=0.1"
      );
    });
  };

  const closeMenu = () => {
    if (menuTimeline.current) {
      menuTimeline.current.kill();
    }

    if (menuRef.current) {
      gsap.to(menuRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          setIsMobileOpen(false);
          document.body.style.overflow = "";
        },
      });
    } else {
      setIsMobileOpen(false);
      document.body.style.overflow = "";
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-colors duration-500",
          isScrolled
            ? "bg-void/90 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        )}
      >
        <Container className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt=""
              className="h-8 w-8 object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <span className="font-display text-2xl text-chalk tracking-tight">
              Innovgeist
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => {
                      if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
                      setIsProductsOpen(true);
                    }}
                    onMouseLeave={() => {
                      productsTimeoutRef.current = setTimeout(() => setIsProductsOpen(false), 150);
                    }}
                  >
                    <button
                      className={cn(
                        "relative text-sm font-medium transition-colors duration-300 py-1 flex items-center gap-1 cursor-pointer",
                        pathname === link.href
                          ? "text-chalk"
                          : "text-stone-400 hover:text-chalk"
                      )}
                    >
                      {link.label}
                      <svg
                        width={10}
                        height={10}
                        viewBox="0 0 12 12"
                        fill="none"
                        className={cn(
                          "transition-transform duration-200",
                          isProductsOpen && "rotate-180"
                        )}
                      >
                        <path d="M3 5l3 3.5L9 5" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {pathname === link.href && (
                        <span className="absolute bottom-0 left-0 right-0 h-px bg-accent" />
                      )}
                    </button>

                    <div
                      className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200",
                        isProductsOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-1 pointer-events-none"
                      )}
                      style={{ minWidth: 260 }}
                    >
                      <div
                        className="rounded-lg border overflow-hidden"
                        style={{
                          backgroundColor: colors.surface,
                          borderColor: `${colors.stone[600]}30`,
                          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                        }}
                      >
                        {productDropdownItems.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 px-4 py-3.5 transition-colors duration-200 hover:bg-white/[0.04]"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.logo} alt={item.label} className="w-7 h-7 rounded-full object-cover shrink-0" />
                            <span className="text-sm text-chalk font-medium group-hover:text-white transition-colors">
                              {item.label}
                            </span>
                            <svg
                              width={14}
                              height={14}
                              viewBox="0 0 14 14"
                              fill="none"
                              className="ml-auto text-stone-600 group-hover:text-chalk group-hover:translate-x-0.5 transition-all duration-200"
                            >
                              <path d="M4 7h7m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative text-sm font-medium transition-colors duration-300 py-1",
                      pathname === link.href
                        ? "text-chalk"
                        : "text-stone-400 hover:text-chalk"
                    )}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <span className="absolute bottom-0 left-0 right-0 h-px bg-accent" />
                    )}
                  </a>
                )
              )}
            </div>
            <Button variant="primary" size="default" href="/contact">
              Discuss Automation
            </Button>
          </div>

          {/* Mobile: CTA + Hamburger */}
          <div className="flex lg:hidden items-center gap-4">
            <Button
              variant="primary"
              size="default"
              href="/contact"
              className="hidden sm:inline-flex"
            >
              Discuss Automation
            </Button>
            <button
              onClick={isMobileOpen ? closeMenu : openMenu}
              className="relative w-10 h-10 flex items-center justify-center text-chalk"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className={cn(
                    "block w-6 h-px bg-chalk transition-all duration-300 origin-center",
                    isMobileOpen && "rotate-45 translate-y-[3.5px]"
                  )}
                />
                <span
                  className={cn(
                    "block w-6 h-px bg-chalk transition-all duration-300 origin-center",
                    isMobileOpen && "-rotate-45 -translate-y-[3.5px]"
                  )}
                />
              </div>
            </button>
          </div>
        </Container>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 bg-void grain flex flex-col"
          style={{ opacity: 0 }}
        >
          <div className="h-[72px] shrink-0" />
          <div className="flex-1 flex flex-col justify-center px-6">
            <div ref={menuLinksRef} className="flex flex-col gap-6">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.href}>
                    <button
                      onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                      className={cn(
                        "type-heading font-display tracking-tight transition-colors flex items-center gap-3 cursor-pointer",
                        pathname === link.href ? "text-chalk" : "text-stone-600 hover:text-chalk"
                      )}
                    >
                      {link.label}
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 12 12"
                        fill="none"
                        className={cn(
                          "transition-transform duration-200",
                          isMobileProductsOpen && "rotate-180"
                        )}
                      >
                        <path d="M3 5l3 3.5L9 5" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {isMobileProductsOpen && (
                      <div className="mt-4 ml-2 flex flex-col gap-4">
                        {productDropdownItems.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeMenu}
                            className="flex items-center gap-3 group"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.logo} alt={item.label} className="w-8 h-8 rounded-full object-cover shrink-0" />
                            <div>
                              <span className="type-subheading font-display text-stone-400 group-hover:text-chalk transition-colors block">
                                {item.label}
                              </span>
                              <span className="text-xs text-stone-600 font-mono">
                                {item.description}
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={cn(
                      "type-heading font-display tracking-tight transition-colors",
                      pathname === link.href ? "text-chalk" : "text-stone-600 hover:text-chalk"
                    )}
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>
          </div>
          <div className="p-6 pb-10">
            <Button variant="primary" size="lg" href="/contact" className="w-full sm:w-auto">
              Discuss Automation
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
