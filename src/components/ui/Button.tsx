"use client";

import { cn } from "@/lib/cn";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "lg";
  asChild?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", href, target, rel, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans font-semibold tracking-tight transition-all duration-300 cursor-pointer select-none";

    const variants = {
      primary:
        "bg-accent text-void hover:bg-accent-muted active:scale-[0.97]",
      secondary:
        "bg-transparent text-chalk border border-stone-600 hover:border-chalk hover:text-white active:scale-[0.97]",
      ghost:
        "bg-transparent text-stone-400 hover:text-chalk underline underline-offset-4 decoration-stone-600 hover:decoration-chalk",
    };

    const sizes = {
      default: "h-11 px-6 text-sm rounded-lg gap-2",
      lg: "h-13 px-8 text-base rounded-lg gap-2.5",
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      return (
        <a href={href} className={classes} target={target} rel={rel}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
