import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, INSIGHT_POSTS } from "@/lib/insights";
import { InsightDetailPage } from "@/components/insights/InsightDetailPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INSIGHT_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Innovgeist Insights`,
    description: post.deck,
  };
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return <InsightDetailPage post={post} />;
}
