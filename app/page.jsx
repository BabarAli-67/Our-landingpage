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
 * HomePage — problem-solver landing:
 *   Hero → Website problems → App problems → Why Us → Process → Reviews → CTA
 */
export default function HomePage() {
  return (
    <>
      <ScrollExpansionHero />

      <ServiceProjects
        id="web"
        eyebrow="Website problems"
        title="Sites that were costing you money, fixed"
        lead="Slow load times, dead conversion funnels, portals nobody could use — this is what we walked in to fix, and what we replaced it with."
        projects={webProjects}
        accent="primary"
        askLabel="Got a similar problem? Ask us about it."
      />

      <ServiceProjects
        id="apps"
        eyebrow="App problems"
        title="Apps people actually keep using"
        lead="A missing app, a clunky one, or a process still running on paper and group chats — we've turned each into something people open every day."
        projects={appProjects}
        accent="accent"
        askLabel="Got a similar problem? Ask us about it."
      />

      <WhyUs />

      <section id="process" className="section">
        <SectionHeading
          align="center"
          eyebrow="How we work"
          title={'From "here\'s what\'s broken" to launch'}
          lead="Tell us the problem, we build the fix — in the open, in weekly demos."
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
