import CTASection from '@/components/sections/CTASection';
import FAQ from '@/components/sections/FAQ';
import PortfolioShowcase from '@/components/sections/PortfolioShowcase';
import ProcessTimeline from '@/components/sections/ProcessTimeline';
import ScrollExpansionHero from '@/components/sections/ScrollExpansionHero';
import ServicesShowcase from '@/components/sections/ServicesShowcase';
import Testimonials from '@/components/sections/Testimonials';
import WhatsAppFloat from '@/components/sections/WhatsAppFloat';
import WhyUs from '@/components/sections/WhyUs';
import JsonLd from '@/components/seo/JsonLd';
import SectionHeading from '@/components/ui/SectionHeading';
import { faqSchema } from '@/lib/seo';

/**
 * HomePage — AI engineering & full-stack studio landing:
 *   Hero → Services → Work → Why Us → Process → Reviews → FAQ → CTA
 *
 * Every section here is a Server Component. The only client islands on this
 * route are the hero's scroll driver, the portfolio filter, the process
 * stepper, the FAQ accordion and the button/card pointer leaves.
 */
export default function HomePage() {
  return (
    <>
      <ScrollExpansionHero />

      <ServicesShowcase />

      <PortfolioShowcase />

      <WhyUs />

      <section id="process" className="section" aria-labelledby="process-title">
        <SectionHeading
          id="process-title"
          align="center"
          eyebrow="Engagement model"
          title="From discovery to production intelligence"
          lead="A senior engineering loop — architecture first, AI & stack implementation next, then deployment and continuous optimization."
          className="mb-16"
        />
        <ProcessTimeline />
      </section>

      <Testimonials />

      <FAQ />

      <CTASection id="contact" />

      <WhatsAppFloat />

      {/* FAQ JSON-LD — mounted here because the FAQ section is now rendered
          on this page. Google requires the schema content to match visible
          page content; see the note in lib/seo.ts. */}
      <JsonLd nodes={[faqSchema()]} id="ld-faq" />
    </>
  );
}

