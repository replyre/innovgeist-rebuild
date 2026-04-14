import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, CASE_STUDY_DETAILS } from "@/lib/case-studies";
import { CaseStudyDetailPage } from "@/components/case-studies/CaseStudyDetailPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CASE_STUDY_DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return {};

  return {
    title: `${cs.title} | Innovgeist Case Studies`,
    description: cs.oneLiner,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);

  if (!cs) notFound();

  return <CaseStudyDetailPage data={cs} />;
}
