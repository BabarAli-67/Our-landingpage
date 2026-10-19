import type { ReactNode } from 'react';

import AmbientLiquid from '@/components/ui/AmbientLiquid';
import Reveal from '@/components/ui/Reveal';

export interface PageHeroProps {
  readonly title: string;
  readonly eyebrow?: string;
  readonly lead?: string;
  readonly children?: ReactNode;
}

/**
 * PageHero — consistent top-of-page hero for inner routes.
 * Compact, no pinned scroll — keeps inner pages fast and predictable.
 * Server Component.
 */
export default function PageHero({ title, eyebrow, lead, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-40" aria-labelledby="page-title">
      <AmbientLiquid intensity="low" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-glow bg-grid [mask-image:radial-gradient(ellipse_50%_60%_at_50%_0%,#000,transparent)]"
      />
      <div className="section relative pb-10 pt-0">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {eyebrow ? (
            <Reveal>
              <span className="eyebrow mb-6">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
                {eyebrow}
              </span>
            </Reveal>
          ) : null}
          <Reveal delay={0.05}>
            <h1 id="page-title" className="h-display text-balance text-white">
              {title}
            </h1>
          </Reveal>
          {lead ? (
            <Reveal delay={0.1}>
              <p className="mt-5 text-lg leading-relaxed text-muted-strong">{lead}</p>
            </Reveal>
          ) : null}
          {children ? <Reveal delay={0.15}>{children}</Reveal> : null}
        </div>
      </div>
    </section>
  );
}
