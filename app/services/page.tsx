import type { Metadata } from 'next';

import JsonLd from '@/components/seo/JsonLd';
import CTASection from '@/components/sections/CTASection';
import PageHero from '@/components/sections/PageHero';
import ProcessTimeline from '@/components/sections/ProcessTimeline';
import ServicesGrid from '@/components/sections/ServicesGrid';
import TechStackSection from '@/components/sections/TechStackSection';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import SectionHeading from '@/components/ui/SectionHeading';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Services',
  description:
    'Web apps, mobile, AI integrations, workflow automation, WordPress/CMS, and SEO performance from Nexus Dev Studio.',
  path: '/services',
});

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

      <section className="section pt-10" aria-labelledby="services-grid-title">
        <h2 id="services-grid-title" className="sr-only">
          What we build
        </h2>
        <ServicesGrid />
      </section>

      {/* Tech stack lives here too — it's a capabilities argument */}
      <TechStackSection />

      <section className="section" aria-labelledby="engagement-title">
        <SectionHeading
          id="engagement-title"
          align="center"
          eyebrow="Engagement"
          title="How a project runs with us"
          className="mb-16"
        />
        <ProcessTimeline />
      </section>

      <CTASection />

      <JsonLd
        id="ld-services"
        nodes={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
        ]}
      />
    </>
  );
}
