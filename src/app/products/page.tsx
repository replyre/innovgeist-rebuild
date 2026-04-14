import type { Metadata } from "next";
import { GradeGuruHero } from "@/components/products/GradeGuruHero";
import { GradeGuruProblem } from "@/components/products/GradeGuruProblem";
import { GradeGuruGoal } from "@/components/products/GradeGuruGoal";
import { GradeGuruLMS } from "@/components/products/GradeGuruLMS";
import { GradeGuruAOS } from "@/components/products/GradeGuruAOS";
import { GradeGuruAI } from "@/components/products/GradeGuruAI";
import { GradeGuruResearch } from "@/components/products/GradeGuruResearch";
import { GradeGuruQualifier } from "@/components/products/GradeGuruQualifier";
import { GradeGuruEngagement } from "@/components/products/GradeGuruEngagement";
import { GradeGuruFinalCTA } from "@/components/products/GradeGuruFinalCTA";

export const metadata: Metadata = {
  title: "GRADEguru — Academic Operating System for Continuous Accreditation Readiness | Innovgeist",
  description:
    "An AI-integrated academic platform designed to help colleges and universities stay continuously prepared for accreditation and ranking frameworks such as NAAC, NBA, and NIRF — not just at submission time, but every academic year.",
};

export default function ProductsPage() {
  return (
    <main>
      <GradeGuruHero />
      <GradeGuruProblem />
      <GradeGuruGoal />
      <GradeGuruLMS />
      <GradeGuruAOS />
      <GradeGuruAI />
      <GradeGuruResearch />
      <GradeGuruQualifier />
      <GradeGuruEngagement />
      <GradeGuruFinalCTA />
    </main>
  );
}
