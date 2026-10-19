import { ArrowUpRight } from 'lucide-react';

import Reveal from '@/components/ui/Reveal';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { services } from '@/lib/content';
import { siteConfig } from '@/lib/site.config';
import { cn } from '@/lib/utils';

export interface ServicesGridProps {
  /** Render only the first N services. */
  readonly limit?: number;
}

/**
 * ServicesGrid — interactive service cards for the /services route.
 * Each card opens a WhatsApp brief for that capability.
 *
 * Server Component: it had `'use client'` but owns no state. Only the
 * `SpotlightCard` leaves hydrate.
 */
export default function ServicesGrid({ limit }: ServicesGridProps) {
  const list = limit ? services.slice(0, limit) : services;

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((service, index) => {
        const Icon = service.icon;
        const accent = service.accent === 'accent';
        return (
          <Reveal as="li" key={service.slug} delay={(index % 3) * 0.08}>
            <a
              href={siteConfig.whatsappQuoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Discuss ${service.title} with us on WhatsApp`}
              className="group block h-full w-full rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            >
              <SpotlightCard
                className="h-full transition-transform duration-300 group-hover:-translate-y-1 group-focus-visible:-translate-y-1"
                glow={accent ? 'accent' : 'primary'}
              >
                <div id={service.slug} className="flex h-full flex-col scroll-mt-28">
                  <span
                    className={cn(
                      'mb-5 grid h-12 w-12 place-items-center rounded-2xl ring-1 ring-white/10',
                      accent
                        ? 'bg-accent/10 text-accent-soft'
                        : 'bg-primary/10 text-primary-soft'
                    )}
                  >
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>

                  <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-strong">
                    {service.excerpt}
                  </p>

                  <ul className="mt-4 grid grid-cols-2 gap-2">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-xs text-slate-300"
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            'h-1.5 w-1.5 rounded-full',
                            accent ? 'bg-accent' : 'bg-primary'
                          )}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors group-hover:text-primary-soft">
                    Discuss this service
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </SpotlightCard>
            </a>
          </Reveal>
        );
      })}
    </ul>
  );
}
