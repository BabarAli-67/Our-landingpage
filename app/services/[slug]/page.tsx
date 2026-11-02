import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

import JsonLd from '@/components/seo/JsonLd';
import CTASection from '@/components/sections/CTASection';
import PageHero from '@/components/sections/PageHero';
import ServiceProjects from '@/components/sections/ServiceProjects';
import Reveal from '@/components/ui/Reveal';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import SectionHeading from '@/components/ui/SectionHeading';
import { servicePages, services, portfolioProjects } from '@/lib/content';
import { breadcrumbSchema, buildMetadata, type JsonLdNode } from '@/lib/seo';
import { siteConfig } from '@/lib/site.config';
import type { ServicePageContent } from '@/lib/content';

interface RouteParams {
  readonly params: { readonly slug: string };
}

const findPage = (slug: string): ServicePageContent | undefined =>
  servicePages.find((page) => page.slug === slug);

/** Statically render every service page at build time. */
export function generateStaticParams(): Array<{ slug: string }> {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: RouteParams): Metadata {
  const page = findPage(params.slug);
  if (!page) return { title: 'Service not found' };

  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/services/${page.slug}`,
  });
}

export default function ServiceDetailPage({ params }: RouteParams) {
  const page = findPage(params.slug);
  if (!page) notFound();

  const service = services.find((s) => s.slug === page.slug);
  const relatedProjects = portfolioProjects.filter((p) =>
    page.relatedProjectIds.includes(p.id)
  );

  const serviceSchema: JsonLdNode = {
    '@type': 'Service',
    '@id': new URL(`/services/${page.slug}#service`, siteConfig.url).toString(),
    name: service?.title ?? page.metaTitle,
    description: page.heroLead,
    serviceType: service?.title ?? page.metaTitle,
    provider: { '@id': new URL('/#organization', siteConfig.url).toString() },
    areaServed: 'Worldwide',
  };

  return (
    <>
      <PageHero
        eyebrow={service?.title ?? 'Service'}
        title={page.heroTitle}
        lead={page.heroLead}
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <LiquidGlassButton href="/contact" size="lg">
            Scope this project
          </LiquidGlassButton>
          <LiquidGlassButton href="#deliverables" size="lg" variant="ghost">
            What you get
          </LiquidGlassButton>
        </div>
      </PageHero>

      {/* Long-form content sections */}
      <article className="section pt-4">
        <div className="mx-auto max-w-3xl">
          {page.sections.map((section, index) => (
            <Reveal key={section.heading} delay={index * 0.06}>
              <div className="mb-12">
                <h2 className="h-display text-balance text-white text-2xl sm:text-3xl">
                  {section.heading}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted-strong">
                  {section.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </article>

      {/* Tech stack */}
      <section className="section pt-0" aria-labelledby="tech-title">
        <SectionHeading
          id="tech-title"
          eyebrow="Technology"
          title="Stack we use for this service"
          className="mb-10"
        />
        <Reveal>
          <ul className="flex flex-wrap gap-3">
            {page.techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-lg bg-white/[0.04] px-4 py-2 font-mono text-sm text-muted-strong ring-1 ring-primary/15 transition-colors hover:ring-primary/40"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Deliverables */}
      <section
        id="deliverables"
        className="section scroll-mt-28 pt-0"
        aria-labelledby="deliverables-title"
      >
        <SectionHeading
          id="deliverables-title"
          eyebrow="Deliverables"
          title="What you get at the end"
          className="mb-10"
        />
        <Reveal>
          <ul className="grid gap-4 sm:grid-cols-2">
            {page.deliverables.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur"
              >
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent-soft"
                />
                <span className="text-sm text-white">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <ServiceProjects
          id="related-work"
          projects={relatedProjects}
          eyebrow="Related work"
          title={`Projects we've shipped in ${service?.title ?? 'this space'}`}
          accent={service?.accent ?? 'primary'}
        />
      )}

      <div className="section pt-0">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 rounded text-sm font-medium text-primary transition-colors hover:text-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          All services
        </Link>
      </div>

      <CTASection
        eyebrow="Ready to start?"
        title={`Let\u2019s build your ${service?.title?.toLowerCase() ?? 'project'}`}
      />

      <JsonLd
        id="ld-service-detail"
        nodes={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service?.title ?? page.metaTitle, path: `/services/${page.slug}` },
          ]),
          serviceSchema,
        ]}
      />
    </>
  );
}
