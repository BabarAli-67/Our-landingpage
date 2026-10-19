import { ArrowUpRight, ExternalLink, Quote, Star } from 'lucide-react';

import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { clientReviews } from '@/lib/content';
import { siteConfig } from '@/lib/site.config';
import { cn } from '@/lib/utils';
import type { ReviewSource } from '@/types';

function SourceBadge({ source }: { readonly source: ReviewSource }) {
  const isFiverr = source === 'fiverr';
  return (
    <span
      className={cn(
        'rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider',
        isFiverr
          ? 'border border-[#1dbf73]/30 bg-[#1dbf73]/10 text-[#1dbf73]'
          : 'border border-accent/30 bg-accent/10 text-accent-soft'
      )}
    >
      {isFiverr ? 'Fiverr' : 'Direct'}
    </span>
  );
}

/**
 * Testimonials — Fiverr + direct client reviews (company names only).
 * Server Component.
 *
 * Accessibility: the star row now carries `role="img"` alongside its
 * `aria-label`. `aria-label` on a generic element with no role is prohibited
 * by ARIA and axe reports it, so the rating was previously announced as five
 * unlabelled graphics.
 */
export default function Testimonials() {
  return (
    <section id="reviews" className="section" aria-labelledby="reviews-title">
      <SectionHeading
        id="reviews-title"
        align="center"
        eyebrow="Client proof"
        title="Teams that shipped with us"
        lead="Feedback from Fiverr clients and companies that trusted Nexus Dev Studio with production builds."
        className="mb-12"
      />

      <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-800/80 px-3 py-1.5 text-xs text-slate-300">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#1dbf73]" />
          Fiverr clients
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-800/80 px-3 py-1.5 text-xs text-slate-300">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
          Direct engagements
        </span>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2">
        {clientReviews.map((review, index) => (
          <Reveal as="li" key={review.id} delay={(index % 2) * 0.06}>
            <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-ink-800/90 p-6 shadow-card">
              <div className="mb-4 flex items-start justify-between gap-3">
                <Quote aria-hidden="true" className="h-5 w-5 shrink-0 text-primary-soft" />
                <SourceBadge source={review.source} />
              </div>

              <div
                role="img"
                aria-label={`Rated ${review.rating} out of 5 stars`}
                className="mb-3 flex gap-0.5"
              >
                {Array.from({ length: review.rating }, (_, star) => (
                  <Star
                    key={star}
                    aria-hidden="true"
                    className="h-3.5 w-3.5 fill-primary text-primary"
                  />
                ))}
              </div>

              <blockquote className="flex-1 text-sm leading-relaxed text-slate-300">
                <p>“{review.quote}”</p>
              </blockquote>

              <footer className="mt-5 flex items-end justify-between gap-3 border-t border-white/10 pt-4">
                <div>
                  <p className="text-sm font-semibold text-white">{review.name}</p>
                  <p className="text-xs text-accent-soft">{review.company}</p>
                  {review.country ? (
                    <p className="text-xs text-muted-strong">{review.country}</p>
                  ) : null}
                </div>
                {review.website ? (
                  <a
                    href={review.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${review.company} at ${review.websiteLabel ?? review.website}`}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary/20 bg-ink-900 px-3 py-1.5 font-mono text-xs text-slate-300 transition-colors hover:text-primary"
                  >
                    {review.websiteLabel ?? review.website}
                    <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
                  </a>
                ) : null}
              </footer>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={0.15}>
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="max-w-md text-sm text-muted-strong">
            Prefer to engage through Fiverr? Review our profile, ratings, and
            delivered work.
          </p>
          <LiquidGlassButton
            href={siteConfig.fiverrUrl}
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            variant="accent"
          >
            View Fiverr profile
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
          </LiquidGlassButton>
        </div>
      </Reveal>
    </section>
  );
}
