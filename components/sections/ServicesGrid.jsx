'use client';

import { ArrowUpRight } from 'lucide-react';
import { services } from '@/lib/content';
import { siteConfig } from '@/lib/site.config';
import SpotlightCard from '@/components/ui/SpotlightCard';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

/**
 * ServicesGrid — interactive service cards for the /services route.
 * Each card opens a WhatsApp brief for that capability.
 */
export default function ServicesGrid({ limit }) {
  const list = limit ? services.slice(0, limit) : services;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((s, i) => {
        const Icon = s.icon;
        const accent = s.accent === 'accent';
        return (
          <Reveal key={s.slug} delay={(i % 3) * 0.08}>
            <a
              href={siteConfig.whatsappQuoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Discuss ${s.title}`}
              className="group block h-full w-full text-left outline-none"
            >
              <SpotlightCard
                className="h-full transition-transform duration-300 group-hover:-translate-y-1 group-focus-visible:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-primary"
                glow={accent ? 'accent' : 'primary'}
              >
                <div id={s.slug} className="flex h-full flex-col scroll-mt-28">
                  <span
                    className={cn(
                      'mb-5 grid h-12 w-12 place-items-center rounded-2xl ring-1 ring-white/10',
                      accent
                        ? 'bg-accent/10 text-accent-soft'
                        : 'bg-primary/10 text-primary-soft'
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </span>

                  <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                    {s.excerpt}
                  </p>

                  <ul className="mt-4 grid grid-cols-2 gap-2">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2 text-xs text-slate-300"
                      >
                        <span
                          className={cn(
                            'h-1.5 w-1.5 rounded-full',
                            accent ? 'bg-accent' : 'bg-primary'
                          )}
                        />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors group-hover:text-primary-soft">
                    Discuss this service
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </SpotlightCard>
            </a>
          </Reveal>
        );
      })}
    </div>
  );
}
