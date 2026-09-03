'use client';

import { useId, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion';

/**
 * WaterRippleImage
 * ------------------------------------------------------------------
 * next/image with a water-warp displacement that runs ONLY while hovered.
 *
 * Perf contract:
 *  - When idle, NO SVG filter is mounted and NO animation runs — the image
 *    is a plain, statically-composited layer. This matters because grids
 *    (e.g. the squeeze carousel) render several of these at once; a
 *    continuously-animating feTurbulence on each would repaint every frame
 *    and stutter the whole page.
 *  - The turbulence <animate> and displacement only exist during hover.
 *  - Pointer ripples are throttled and hover-scoped.
 *  - Fully disabled under prefers-reduced-motion.
 */
export default function WaterRippleImage({
  src,
  alt,
  width = 1200,
  height = 800,
  className,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
}) {
  const filterId = useId().replace(/:/g, '');
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(false);
  const [ripples, setRipples] = useState([]);
  const idRef = useRef(0);
  const lastRef = useRef(0);

  const enabled = active && !reduced;

  const spawnRipple = useCallback(
    (e) => {
      if (reduced) return;
      const now = performance.now();
      if (now - lastRef.current < 110) return; // throttle
      lastRef.current = now;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const id = idRef.current++;
      setRipples((r) => [...r, { id, x, y }]);
      setTimeout(() => setRipples((r) => r.filter((it) => it.id !== id)), 900);
    },
    [reduced]
  );

  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => {
        setActive(false);
        setRipples([]);
      }}
      onMouseMove={active ? spawnRipple : undefined}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-white/[0.08] shadow-card gpu',
        className
      )}
    >
      {/* Filter is mounted only while hovered → zero idle repaint cost */}
      {enabled && (
        <svg className="pointer-events-none absolute h-0 w-0" aria-hidden>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.018"
              numOctaves="2"
              seed="7"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="12s"
                values="0.010 0.016; 0.018 0.010; 0.010 0.016"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="20"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      )}

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        style={enabled ? { filter: `url(#${filterId})` } : undefined}
      />

      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden
          className="pointer-events-none absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 animate-pulse-ring"
          style={{ left: `${r.x}%`, top: `${r.y}%` }}
        />
      ))}

      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/75 via-transparent to-transparent" />
    </div>
  );
}
