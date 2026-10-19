import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import type { CSSVars } from '@/types/css';

/** Tags a reveal wrapper is allowed to render as. */
export type RevealTag = 'div' | 'section' | 'li' | 'article' | 'span' | 'p';

export interface RevealProps {
  readonly children: ReactNode;
  /** Stagger offset in seconds. */
  readonly delay?: number;
  /** Travel distance in pixels for the slide-up. */
  readonly y?: number;
  readonly className?: string;
  readonly as?: RevealTag;
}

/**
 * Reveal — the core scroll-choreography primitive.
 *
 * This is now a **Server Component**: it ships zero client JavaScript.
 *
 * It previously wrapped each block in a framer-motion component using
 * `whileInView`, which meant ~40 client components, ~40 IntersectionObservers
 * and the whole framer-motion animation runtime on the critical path of a page
 * whose reveals are a single fade-and-rise. All it emits now is a `data-reveal`
 * marker plus two custom properties; the animation itself is declared once in
 * `app/globals.css` and driven either by a native CSS scroll-driven timeline
 * (Chromium) or by the one shared observer in `RevealRuntime` (Safari/Firefox).
 *
 * Reduced motion is honoured in CSS — the element simply renders in place.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = 'div',
}: RevealProps) {
  const Tag = as;
  const style: CSSVars = {
    '--reveal-delay': delay ? `${delay}s` : undefined,
    '--reveal-y': y === 28 ? undefined : `${y}px`,
  };

  return (
    <Tag data-reveal="" className={cn(className)} style={style}>
      {children}
    </Tag>
  );
}
