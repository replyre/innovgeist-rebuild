import type { Metadata } from "next";
import { ServicesPageHero } from "@/components/services/ServicesPageHero";
import { ServicesPageQualifier } from "@/components/services/ServicesPageQualifier";
import { ServicesPageCoreAreas } from "@/components/services/ServicesPageCoreAreas";
import { ServicesPageDeepDives } from "@/components/services/ServicesPageDeepDives";
import { ServicesPageProcess } from "@/components/services/ServicesPageProcess";
import { ServicesPageCaseStudies } from "@/components/services/ServicesPageCaseStudies";
import { ServicesPageFinalCTA } from "@/components/services/ServicesPageFinalCTA";

export const metadata: Metadata = {
  title: "Services — Revenue Automation & Systems Engineering | Innovgeist",
  description:
    "Innovgeist partners with growing businesses to design and build automated sales and marketing systems. We combine software engineering, AI, and workflow automation to improve conversion efficiency, operational clarity, and long-term scalability.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesPageHero />
      <ServicesPageQualifier />
      <ServicesPageCoreAreas />
      <ServicesPageDeepDives />
      <ServicesPageProcess />
      <ServicesPageCaseStudies />
      <ServicesPageFinalCTA />
    </main>
  );
}
