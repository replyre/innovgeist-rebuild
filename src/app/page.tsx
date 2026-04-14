import { HeroSection } from "@/components/hero/HeroSection";
import { ProblemSection } from "@/components/problem/ProblemSection";
import { WhatWeDoSection } from "@/components/whatwedo/WhatWeDoSection";
import { EngagementSection } from "@/components/engagement/EngagementSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { ProductsSection } from "@/components/products/ProductsSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { CTASection } from "@/components/cta/CTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <WhatWeDoSection />
      <EngagementSection />
      <ServicesSection />
      <ProductsSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
