import ServiceProjects from '@/components/sections/ServiceProjects';
import WhyUs from '@/components/sections/WhyUs';
import ProcessTimeline from '@/components/sections/ProcessTimeline';
import Testimonials from '@/components/sections/Testimonials';
import CTASection from '@/components/sections/CTASection';
import ScrollExpansionHero from '@/components/sections/ScrollExpansionHero';
import WhatsAppFloat from '@/components/sections/WhatsAppFloat';
import SectionHeading from '@/components/ui/SectionHeading';
import { webProjects, appProjects } from '@/lib/content';

/**
 * HomePage — AI engineering & full-stack studio landing:
 *   Hero → Platforms → Apps → Why Us → Process → Reviews → CTA
 */
export default function HomePage() {
  return (
    <>
      <ScrollExpansionHero />

      <ServiceProjects
        id="web"
        eyebrow="Intelligent platforms"
        title="High-performance systems that compound advantage"
        lead="From AI-assisted products to enterprise web architectures — platforms engineered for speed, automation, and measurable business lift."
        projects={webProjects}
        accent="primary"
        askLabel="Building something similar? Brief us."
      />

      <ServiceProjects
        id="apps"
        eyebrow="Mobile & product apps"
        title="Apps built for real usage, not demos"
        lead="Cross-platform Flutter products with production auth, realtime data, payments, and ops dashboards — designed to ship and scale."
        projects={appProjects}
        accent="accent"
        askLabel="Need a production mobile build? Talk to us."
      />

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
