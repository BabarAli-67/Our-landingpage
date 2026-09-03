'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import WaterRippleImage from '@/components/ui/WaterRippleImage';
import { useIsMobile } from '@/hooks/useMediaQuery';

/**
 * SqueezeCarousel
 * ------------------------------------------------------------------
 * Expanding-panel ("squeeze") carousel. The active panel grows and the
 * others compress. Driven by flex-grow so it animates smoothly and reflows
 * without JS per frame. Hover to expand on desktop, tap on touch, and it's
 * keyboard operable (focus expands, arrow keys move).
 *
 * Each panel hosts a WaterRippleImage — the water effect lives here, in the
 * showcase, where it stays special.
 */
export default function SqueezeCarousel({ items }) {
  const [active, setActive] = useState(0);
  const isMobile = useIsMobile();

  const onKeyDown = (e, i) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setActive(Math.min(i + 1, items.length - 1));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActive(Math.max(i - 1, 0));
    }
  };

  return (
    <div
      className="flex w-full flex-col gap-3 md:h-[30rem] md:flex-row"
      role="list"
    >
      {items.map((item, i) => {
        const isActive = active === i;
        return (
          <motion.article
            key={item.slug}
            role="listitem"
            tabIndex={0}
            aria-label={`${item.title} — ${item.result}`}
            onMouseEnter={() => !isMobile && setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              'group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 outline-none transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] gpu',
              'focus-visible:ring-2 focus-visible:ring-accent',
              'min-h-[16rem] md:min-h-0'
            )}
            style={{ flexGrow: isActive ? 3 : 1, flexBasis: 0 }}
          >
            {/* Ripple image fills the panel */}
            <div className="absolute inset-0">
              <WaterRippleImage
                src={item.image}
                alt={item.title}
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, 40vw"
                className="h-full w-full rounded-none border-0"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />

            {/* Collapsed label (vertical hint) */}
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <span className="mb-2 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-200 backdrop-blur">
                {item.category}
              </span>

              <div
                className={cn(
                  'transition-all duration-500',
                  isActive ? 'opacity-100 translate-y-0' : 'opacity-90'
                )}
              >
                <h3 className="text-xl font-semibold text-white sm:text-2xl">
                  {item.title}
                </h3>

                <motion.div
                  initial={false}
                  animate={{
                    height: isActive ? 'auto' : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <p className="mt-2 max-w-md text-sm text-slate-300">
                    {item.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent-soft">
                      {item.result}
                    </span>
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/work/${item.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-accent-soft"
                  >
                    View case study
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
