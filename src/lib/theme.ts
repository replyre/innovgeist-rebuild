/**
 * Centralized theme constants for JS-side usage.
 * CSS variables in globals.css are the source of truth —
 * this mirrors them for GSAP animations and inline styles.
 */

export const colors = {
  void: "#0C0A09",
  chalk: "#F5F0EB",
  accent: "#2DD4BF",
  accentMuted: "#14B8A6",
  ember: "#F59E0B",
  surface: "#161412",
  stone: {
    100: "#E7E0D9",
    200: "#D4CBC1",
    400: "#9C8E80",
    600: "#5C514A",
  },
} as const;

export const brandAccents = [colors.accent, colors.ember, colors.accentMuted] as const;
