import PortfolioShowcase from '@/components/sections/PortfolioShowcase';
import ServicesShowcase from '@/components/sections/ServicesShowcase';
import WhyUs from '@/components/sections/WhyUs';
import ProcessTimeline from '@/components/sections/ProcessTimeline';
import Testimonials from '@/components/sections/Testimonials';
import CTASection from '@/components/sections/CTASection';
import ScrollExpansionHero from '@/components/sections/ScrollExpansionHero';
import WhatsAppFloat from '@/components/sections/WhatsAppFloat';
import SectionHeading from '@/components/ui/SectionHeading';

/**
 * HomePage — AI engineering & full-stack studio landing:
 *   Hero → Services → Work → Why Us → Process → Reviews → CTA
 */
export default function HomePage() {
  return (
    <>
      <ScrollExpansionHero />

      <ServicesShowcase />

      <PortfolioShowcase />

      <WhyUs />

      <section id="process" className="section">
        <SectionHeading
          align="center"
          eyebrow="Engagement model"
          title="From discovery to production intelligence"
          lead="A senior engineering loop — architecture first, AI & stack implementation next, then deployment and continuous optimization."
          className="mb-16"
        />
        <ProcessTimeline />
      </section>

      <Testimonials />

      <CTASection id="contact" />

      <WhatsAppFloat />
    </>
  );
}
