import type { Metadata } from "next";
import { CaseStudiesHero } from "@/components/case-studies/CaseStudiesHero";
import { CaseStudiesGrid } from "@/components/case-studies/CaseStudiesGrid";

export const metadata: Metadata = {
  title: "Case Studies — Systems Built in Real-World Environments | Innovgeist",
  description:
    "A selection of engagements where Innovgeist designed and deployed automation, internal platforms, and revenue systems that operate reliably in production.",
};

export default function CaseStudiesPage() {
  return (
    <main>
      <CaseStudiesHero />
      <CaseStudiesGrid />
    </main>
  );
}
