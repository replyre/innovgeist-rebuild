import type { Metadata } from "next";
import { InsightsHero } from "@/components/insights/InsightsHero";
import { InsightsFeed } from "@/components/insights/InsightsFeed";

export const metadata: Metadata = {
  title: "Insights — Systems, Automation & Education Technology | Innovgeist",
  description:
    "Perspectives from our work building revenue systems, automation infrastructure, and research-informed academic platforms.",
};

export default function InsightsPage() {
  return (
    <main>
      <InsightsHero />
      <InsightsFeed />
    </main>
  );
}
