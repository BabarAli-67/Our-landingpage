import PageHero from '@/components/sections/PageHero';
import ServicesGrid from '@/components/sections/ServicesGrid';
import TechStackSection from '@/components/sections/TechStackSection';
import ProcessTimeline from '@/components/sections/ProcessTimeline';
import CTASection from '@/components/sections/CTASection';
import SectionHeading from '@/components/ui/SectionHeading';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';

export const metadata = {
  title: 'Services',
  description:
    'Web apps, mobile, AI integrations, workflow automation, WordPress/CMS, and SEO performance from Nexus Dev Studio.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Capabilities engineered for modern products"
        lead="From full-stack platforms and mobile apps to AI integrations, automation, CMS, and performance — senior engineering across the stack."
      >
        <div className="mt-8">
          <LiquidGlassButton href="/contact" size="lg">
            Scope your project
          </LiquidGlassButton>
        </div>
      </PageHero>

      <section className="section pt-10">
        <ServicesGrid />
      </section>

      {/* Tech stack lives here too — it's a capabilities argument */}
      <TechStackSection />

      <section className="section">
        <SectionHeading
          align="center"
          eyebrow="Engagement"
          title="How a project runs with us"
          className="mb-16"
        />
        <ProcessTimeline />
      </section>

      <CTASection />
    </>
  );
}
