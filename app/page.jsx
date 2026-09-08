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
 * HomePage — single landing page:
 *   Hero → Web → Apps → Why Us → Process → Reviews → WhatsApp CTA
 */
export default function HomePage() {
  return (
    <>
      <ScrollExpansionHero />

      <ServiceProjects
        id="web"
        eyebrow="Web Development"
        title="Websites that convert and scale"
        lead="Fast, modern web products — landing pages, SaaS, and portals engineered for performance."
        projects={webProjects}
        accent="primary"
      />

      <ServiceProjects
        id="apps"
        eyebrow="App Development"
        title="Mobile apps people keep using"
        lead="Cross-platform iOS & Android apps with native-grade feel and a maintainable codebase."
        projects={appProjects}
        accent="accent"
      />

      <WhyUs />

      <section id="process" className="section">
        <SectionHeading
          align="center"
          eyebrow="How we work"
          title="Simple path from chat to launch"
          lead="Attention → trust → WhatsApp. Clear steps, weekly demos, no black boxes."
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
