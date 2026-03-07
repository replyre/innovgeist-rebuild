"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

interface SplitTextRevealProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  delay?: number;
  stagger?: number;
}

export function SplitTextReveal({
  text,
  className,
  as: Component = "h1",
  delay = 0,
  stagger = 0.04,
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const words = text.split(" ");

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const chars = containerRef.current.querySelectorAll(".split-char");

      gsap.fromTo(
        chars,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.6,
          stagger,
          ease: "power3.out",
          delay,
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <Component className={cn("flex flex-wrap", className)}>
        {words.map((word, wi) => (
          <span key={wi} className="inline-block overflow-hidden mr-[0.3em]">
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
      </Component>
    </div>
  );
}
