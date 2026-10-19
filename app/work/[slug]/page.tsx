import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import JsonLd from '@/components/seo/JsonLd';
import CTASection from '@/components/sections/CTASection';
import PageHero from '@/components/sections/PageHero';
import Reveal from '@/components/ui/Reveal';
import { caseStudies } from '@/lib/content';
import { breadcrumbSchema, buildMetadata, type JsonLdNode } from '@/lib/seo';
import { siteConfig } from '@/lib/site.config';
import type { CaseStudy } from '@/types';

interface RouteParams {
  readonly params: { readonly slug: string };
}

const findStudy = (slug: string): CaseStudy | undefined =>
  caseStudies.find((study) => study.slug === slug);

/** Statically render every case study at build time. */
export function generateStaticParams(): Array<{ slug: string }> {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }: RouteParams): Metadata {
  const study = findStudy(params.slug);
  if (!study) return { title: 'Case study not found' };

  return buildMetadata({
    title: study.title,
    description: `${study.summary} — ${study.result}.`,
    path: `/work/${study.slug}`,
    image: study.image,
  });
}

/**
 * Case-study detail route.
 *
 * WHY THIS EXISTS
 * `/work` and the squeeze carousel both linked to `/work/<slug>`, and so did
 * `ProjectPanel`, but no such route existed — every one of those links was a
 * 404. Broken internal links are both an SEO problem (crawl budget spent on
 * soft 404s, no indexable destination for the case-study anchors) and a plain
 * bug. The page is built from the same `caseStudies` data the index uses, with
 * the existing design primitives, so it introduces no new visual language.
 */
export default function CaseStudyPage({ params }: RouteParams) {
  const study = findStudy(params.slug);
  if (!study) notFound();

  const articleSchema: JsonLdNode = {
    '@type': 'CreativeWork',
    '@id': new URL(`/work/${study.slug}#case-study`, siteConfig.url).toString(),
    name: study.title,
    headline: study.title,
    description: study.summary,
    about: study.category,
    image: new URL(study.image, siteConfig.url).toString(),
    keywords: study.tags.join(', '),
    creator: { '@id': new URL('/#organization', siteConfig.url).toString() },
  };

  return (
    <>
      <PageHero eyebrow={study.category} title={study.title} lead={study.summary} />

      <article className="section pt-4">
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/[0.08] shadow-elevate">
            <Image
              src={study.image}
              alt={`${study.title} — ${study.category}`}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent"
            />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div>
              <h2 className="h-display text-balance text-white">The outcome</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-strong">
                {study.summary}
              </p>
              <p className="mt-6 inline-flex rounded-full bg-accent/15 px-4 py-1.5 text-sm font-medium text-accent-soft">
                {study.result}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-primary/15 bg-ink-800/95 p-6 shadow-card">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Stack
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-strong ring-1 ring-primary/15"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <h2 className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Category
              </h2>
              <p className="mt-2 text-sm text-slate-300">{study.category}</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded text-sm font-medium text-primary transition-colors hover:text-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            All case studies
          </Link>
        </div>
      </article>

      <CTASection
        eyebrow="Build something like this"
        title="Want this outcome for your team?"
      />

      <JsonLd
        id="ld-case-study"
        nodes={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Work', path: '/work' },
            { name: study.title, path: `/work/${study.slug}` },
          ]),
          articleSchema,
        ]}
      />
    </>
  );
}
