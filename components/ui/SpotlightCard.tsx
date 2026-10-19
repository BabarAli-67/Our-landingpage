'use client';

import { useCallback, useRef, type MouseEvent, type ReactNode } from 'react';

import { cn } from '@/lib/utils';
import type { Accent } from '@/types';
import type { CSSVars } from '@/types/css';

export interface SpotlightCardProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly glow?: Accent;
}

const RING: Record<Accent, string> = {
  accent: 'rgba(229,193,88,0.22)',
  primary: 'rgba(212,175,55,0.22)',
};

/**
 * SpotlightCard — glass card with a pointer-follow radial spotlight.
 *
 * Client leaf: it needs pointer coordinates, nothing else. Its children are
 * passed down from Server Components and are never hydrated.
 *
 * The pointer handler writes two CSS custom properties directly on the node —
 * no React state, so moving the mouse across a dense grid triggers zero
 * renders. The hover `useState` this used to carry re-rendered the card on
 * every enter and leave and then duplicated a fade that `group-hover` was
 * already doing in CSS.
 */
export default function SpotlightCard({
  children,
  className,
  glow = 'primary',
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }, []);

  const spotlight: CSSVars = {
    background: `radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), ${RING[glow]}, transparent 65%)`,
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-primary/15 bg-ink-800/95 p-6 backdrop-blur-md transition-colors duration-300 hover:border-primary/35 gpu',
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={spotlight}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
