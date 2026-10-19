import CTASection from '@/components/sections/CTASection';
import PortfolioShowcase from '@/components/sections/PortfolioShowcase';
import ProcessTimeline from '@/components/sections/ProcessTimeline';
import ScrollExpansionHero from '@/components/sections/ScrollExpansionHero';
import ServicesShowcase from '@/components/sections/ServicesShowcase';
import Testimonials from '@/components/sections/Testimonials';
import WhatsAppFloat from '@/components/sections/WhatsAppFloat';
import WhyUs from '@/components/sections/WhyUs';
import SectionHeading from '@/components/ui/SectionHeading';

/**
 * HomePage — AI engineering & full-stack studio landing:
 *   Hero → Services → Work → Why Us → Process → Reviews → CTA
 *
 * Every section here is a Server Component. The only client islands on this
 * route are the hero's scroll driver, the portfolio filter, the process
 * stepper and the button/card pointer leaves.
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

      <CTASection id="contact" />

      <WhatsAppFloat />
    </>
  );
}
