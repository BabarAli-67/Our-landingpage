import ScrollExpansionHero from '@/components/sections/ScrollExpansionHero';
import TrustStats from '@/components/sections/TrustStats';
import WhyUs from '@/components/sections/WhyUs';
import ServicesShowcase from '@/components/sections/ServicesShowcase';
import ProcessTimeline from '@/components/sections/ProcessTimeline';
import HorizontalPortfolioSection from '@/components/sections/HorizontalPortfolioSection';
import ResultsBenefits from '@/components/sections/ResultsBenefits';
import CircularVideoTestimonials from '@/components/sections/CircularVideoTestimonials';
import FAQ from '@/components/sections/FAQ';
import CTASection from '@/components/sections/CTASection';

import { PortfolioProvider } from '@/components/portfolio/PortfolioContext';
import SectionHeading from '@/components/ui/SectionHeading';

import { testimonials } from '@/lib/content';

/**
 * HomePage — section sequence:
 *   Navbar (layout) → Hero → Trust/Stats → About/Why Us → Services →
 *   How We Work → Portfolio → Results/Benefits → Testimonials → FAQ →
 *   Final CTA → Footer (layout)
 *
 * Reused animations:
 *   • ScrollExpansionHero      — the pinned media-expansion Hero (kept as-is)
 *   • HorizontalPortfolioSection — the pinned horizontal slider (Portfolio)
 *   • ContainerScroll          — reused inside WhyUs as the product visual
 *   • Tech marquee             — reused inside ServicesShowcase
 */
export default function HomePage() {
  return (
    <PortfolioProvider>
      {/* 1 · Hero — scroll media-expansion (existing signature animation) */}
      <ScrollExpansionHero />

      {/* 2 · Trust / Stats */}
      <TrustStats />

      {/* 3 · About / Why Us (reuses ContainerScroll product visual) */}
      <WhyUs />

      {/* 4 · Services — the four core offerings */}
      <ServicesShowcase />

      {/* 5 · How We Work */}
      <section id="process" className="section">
        <SectionHeading
          align="center"
          eyebrow="How we work"
          title="A calm, senior process"
          lead="Tight loops, weekly demos, and production from the first sprint."
          className="mb-16"
        />
        <ProcessTimeline />
      </section>

      {/* 6 · Portfolio / Case Studies — pinned horizontal slider (existing) */}
      <HorizontalPortfolioSection />

      {/* 7 · Results / Benefits */}
      <ResultsBenefits />

      {/* 8 · Testimonials — circular video reviews */}
      <section className="section">
        <SectionHeading
          align="center"
          eyebrow="Client reviews"
          title="Real teams. Real results."
          lead="Tap a card to hear it from the people who shipped with us."
          className="mb-16"
        />
        <CircularVideoTestimonials items={testimonials} />
      </section>

      {/* 9 · FAQ */}
      <FAQ />

      {/* 10 · Final CTA */}
      <CTASection id="contact" />
    </PortfolioProvider>
  );
}
