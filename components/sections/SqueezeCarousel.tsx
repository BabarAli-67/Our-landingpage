'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useCallback, useState, type KeyboardEvent } from 'react';

import WaterRippleImage from '@/components/ui/WaterRippleImage';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import type { CaseStudy } from '@/types';
import type { CSSVars } from '@/types/css';

export interface SqueezeCarouselProps {
  readonly items: readonly CaseStudy[];
  /**
   * Heading level for each panel title. Defaults to `h3`; pass `h2` when the
   * carousel is the first block after an `h1` so the page's heading order
   * stays sequential.
   */
  readonly headingLevel?: 'h2' | 'h3';
}

/**
 * SqueezeCarousel
 * ------------------------------------------------------------------
 * Expanding-panel ("squeeze") carousel. The active panel grows and the others
 * compress. Driven by `flex-grow` so it animates smoothly and reflows without
 * JS per frame. Hover to expand on desktop, tap on touch, and it is keyboard
 * operable (focus expands, arrow keys move).
 *
 * Each panel hosts a `WaterRippleImage` — the water effect lives here, in the
 * showcase, where it stays special.
 *
 * CHANGES
 *  - framer-motion is gone. The panel body reveal is the same CSS
 *    `grid-template-rows: 0fr -> 1fr` trick the FAQ uses, so no library and no
 *    per-frame height measurement.
 *  - Panels were `<article role="listitem" tabIndex={0}>` inside a
 *    `role="list"`: a focusable element with a click handler and no interactive
 *    role, which is both an ARIA violation and invisible to screen-reader
 *    users as a control. Each panel is now a real `<li>` whose case-study link
 *    is the focusable control, and focusing that link expands the panel.
 */
export default function SqueezeCarousel({
  items,
  headingLevel: Heading = 'h3',
}: SqueezeCarouselProps) {
  const [active, setActive] = useState(0);
  const isMobile = useIsMobile();

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLLIElement>, index: number) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setActive(Math.min(index + 1, items.length - 1));
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setActive(Math.max(index - 1, 0));
      }
    },
    [items.length]
  );

  return (
    <ul className="flex w-full flex-col gap-3 md:h-[30rem] md:flex-row">
      {items.map((item, index) => {
        const isActive = active === index;
        const style: CSSVars = { flexGrow: isActive ? 3 : 1, flexBasis: 0 };
        return (
          <li
            key={item.slug}
            style={style}
            onMouseEnter={isMobile ? undefined : () => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              'group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] gpu',
              'focus-within:ring-2 focus-within:ring-accent',
              'min-h-[16rem] md:min-h-0'
            )}
          >
            {/* Ripple image fills the panel */}
            <div className="absolute inset-0">
              <WaterRippleImage
                src={item.image}
                alt={`${item.title} — ${item.category}`}
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, 40vw"
                className="h-full w-full rounded-none border-0"
              />
            </div>

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent"
            />

            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <span className="mb-2 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-200 backdrop-blur">
                {item.category}
              </span>

              <div
                className={cn(
                  'transition-opacity duration-500',
                  isActive ? 'opacity-100' : 'opacity-90'
                )}
              >
                <Heading className="text-xl font-semibold text-white sm:text-2xl">
                  {item.title}
                </Heading>

                <div data-open={isActive} className="faq-answer">
                  <div>
                    <p className="mt-2 max-w-md text-sm text-slate-300">
                      {item.summary}
                    </p>
                    <ul className="mt-3 flex flex-wrap items-center gap-2">
                      <li className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent-soft">
                        {item.result}
                      </li>
                      {item.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/work/${item.slug}`}
                      aria-label={`View the ${item.title} case study`}
                      className="mt-4 inline-flex items-center gap-1.5 rounded text-sm font-medium text-white hover:text-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      View case study
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
