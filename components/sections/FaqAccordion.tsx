'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import type { Faq } from '@/types';
import type { CSSVars } from '@/types/css';

export interface FaqAccordionProps {
  readonly items: readonly Faq[];
}

/**
 * FaqAccordion — accessible single-open disclosure list.
 *
 * Client leaf: it owns only the open index.
 *
 * Each row is a real `<button>` with `aria-expanded` and `aria-controls`, and
 * the answer region is bound back with `aria-labelledby`, so the relationship
 * is exposed rather than implied.
 *
 * The reveal is a CSS `grid-template-rows: 0fr -> 1fr` transition (see
 * `globals.css`). framer-motion's `height: 'auto'` animation had to measure
 * the content and then drive `height` in JavaScript — a layout pass on every
 * frame of every open and close.
 */
export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [open, setOpen] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `faq-q-${index}`;
        const panelId = `faq-a-${index}`;
        const revealStyle: CSSVars = {
          '--reveal-delay': `${(index * 0.05).toFixed(2)}s`,
        };
        return (
          <div
            key={item.q}
            data-reveal=""
            style={revealStyle}
            className={cn(
              'overflow-hidden rounded-2xl border transition-colors duration-300',
              isOpen
                ? 'border-white/15 bg-white/[0.04]'
                : 'border-white/[0.08] bg-white/[0.02] hover:border-white/15'
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                onClick={() => setOpen(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                <span className="text-base font-medium text-white">{item.q}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-white transition-transform duration-300',
                    isOpen &&
                      'rotate-45 border-transparent bg-gradient-to-br from-primary to-accent'
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              data-open={isOpen}
              className="faq-answer"
            >
              <div>
                <p className="px-6 pb-6 text-sm leading-relaxed text-muted-strong">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
