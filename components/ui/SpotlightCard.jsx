'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * SpotlightCard — glass card with a pointer-follow radial spotlight.
 * Uses a CSS custom property updated on mousemove (no React re-render),
 * so it stays cheap even in dense grids.
 */
export default function SpotlightCard({ children, className, glow = 'primary' }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const ring =
    glow === 'accent'
      ? 'rgba(229,193,88,0.22)'
      : 'rgba(212,175,55,0.22)';

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-primary/15 bg-ink-800/95 p-6 backdrop-blur-md transition-colors duration-300 hover:border-primary/35 gpu',
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(320px circle at var(--mx) var(--my), ${ring}, transparent 65%)`,
          opacity: hovered ? 1 : 0,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
