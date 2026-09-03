'use client';

import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/lib/content';
import SpotlightCard from '@/components/ui/SpotlightCard';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';
import { usePortfolioLink } from '@/components/portfolio/PortfolioContext';

/**
 * ServicesGrid — clickable "What We Do" cards, linked to the horizontal
 * portfolio.
 *
 * Each card is a real <button>: clicking a service scrolls the page to that
 * category's first project in <HorizontalPortfolioSection>. When no portfolio
 * is mounted on the page (e.g. the standalone /services route), it falls back
 * to a `/#work-<slug>` navigation that the portfolio resolves on load.
 */
export default function ServicesGrid({ limit }) {
  const list = limit ? services.slice(0, limit) : services;
  const link = usePortfolioLink();
  const router = useRouter();

  const handleSelect = (slug) => {
    // Try the in-page handler first; fall back to a cross-page hash link.
    const handled = link?.scrollToCategory?.(slug);
    if (!handled) router.push(`/#work-${slug}`);
  };

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((s, i) => {
        const Icon = s.icon;
        const accent = s.accent === 'accent';
        return (
          <Reveal key={s.slug} delay={(i % 3) * 0.08}>
            <button
              type="button"
              onClick={() => handleSelect(s.slug)}
              aria-label={`View ${s.title} projects`}
              className="group block h-full w-full cursor-pointer text-left outline-none"
            >
              <SpotlightCard
                className="h-full transition-transform duration-300 group-hover:-translate-y-1 group-focus-visible:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-primary"
                glow={accent ? 'accent' : 'primary'}
              >
                <div id={s.slug} className="flex h-full flex-col scroll-mt-28">
                  <span
                    className={cn(
                      'mb-5 grid h-12 w-12 place-items-center rounded-2xl ring-1 ring-white/10',
                      accent ? 'bg-accent/10 text-accent-soft' : 'bg-primary/10 text-primary-soft'
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
                      <li key={p} className="flex items-center gap-2 text-xs text-slate-300">
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
                    View work
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </SpotlightCard>
            </button>
          </Reveal>
        );
      })}
    </div>
  );
}
