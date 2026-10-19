import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import JsonLd from '@/components/seo/JsonLd';
import CTASection from '@/components/sections/CTASection';
import PageHero from '@/components/sections/PageHero';
import SqueezeCarousel from '@/components/sections/SqueezeCarousel';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import WaterRippleImage from '@/components/ui/WaterRippleImage';
import { caseStudies } from '@/lib/content';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Work',
  description: 'Case studies and client outcomes from Nexus Dev Studio.',
  path: '/work',
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Work that moved a metric"
        lead="A look at the systems we’ve shipped — and what they changed for the teams running them."
      />

      {/* Featured — squeeze carousel.
          The carousel's panel titles render as `h2` here because this is the
          first block after the page `h1`; leaving them at `h3` skipped a level
          and failed the `heading-order` audit. */}
      <section className="section pt-10" aria-labelledby="featured-work-title">
        <h2 id="featured-work-title" className="sr-only">
          Featured case studies
        </h2>
        <SqueezeCarousel items={caseStudies} headingLevel="h3" />
      </section>

      {/* Full grid with water-ripple imagery */}
      <section className="section pt-0" aria-labelledby="recent-work-title">
        <SectionHeading
          id="recent-work-title"
          eyebrow="More work"
          title="Recent engagements"
          className="mb-12"
        />
        <ul className="grid gap-6 md:grid-cols-2">
          {caseStudies.map((study, index) => (
            <Reveal as="li" key={study.slug} delay={(index % 2) * 0.08}>
              <Link
                href={`/work/${study.slug}`}
                className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-ink-950"
              >
                <WaterRippleImage
                  src={study.image}
                  alt={`${study.title} — ${study.category}`}
                  width={1200}
                  height={800}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="aspect-[16/10]"
                />
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted">
                      {study.category}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-white">
                      {study.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-strong">{study.summary}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-white transition-colors group-hover:bg-white/10"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <span className="mt-3 inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent-soft">
                  {study.result}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <CTASection />

      <JsonLd
        id="ld-work"
        nodes={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Work', path: '/work' },
          ]),
        ]}
      />
    </>
  );
}
