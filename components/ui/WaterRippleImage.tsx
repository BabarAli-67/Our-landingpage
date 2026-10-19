'use client';

import Image from 'next/image';
import {
  useCallback,
  useId,
  useRef,
  useState,
  type MouseEvent,
} from 'react';

import { usePrefersReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';
import type { CSSVars } from '@/types/css';

interface Ripple {
  readonly id: number;
  readonly x: number;
  readonly y: number;
}

export interface WaterRippleImageProps {
  readonly src: string;
  readonly alt: string;
  readonly width?: number;
  readonly height?: number;
  readonly className?: string;
  readonly sizes?: string;
  readonly priority?: boolean;
}

/**
 * WaterRippleImage
 * ------------------------------------------------------------------
 * next/image with a water-warp displacement that runs ONLY while hovered.
 *
 * Perf contract:
 *  - When idle, NO SVG filter is mounted and NO animation runs — the image is
 *    a plain, statically-composited layer. This matters because grids (e.g.
 *    the squeeze carousel) render several of these at once; a continuously
 *    animating feTurbulence on each would repaint every frame and stutter the
 *    whole page.
 *  - The turbulence `<animate>` and displacement only exist during hover.
 *  - Pointer ripples are throttled and hover-scoped.
 *  - Fully disabled under `prefers-reduced-motion`.
 */
export default function WaterRippleImage({
  src,
  alt,
  width = 1200,
  height = 800,
  className,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
}: WaterRippleImageProps) {
  const filterId = useId().replace(/:/g, '');
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(false);
  const [ripples, setRipples] = useState<readonly Ripple[]>([]);
  const idRef = useRef(0);
  const lastRef = useRef(0);
  const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  const enabled = active && !reduced;

  const spawnRipple = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (reduced) return;
      const now = performance.now();
      if (now - lastRef.current < 110) return; // throttle
      lastRef.current = now;

      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      const id = idRef.current++;

      setRipples((current) => [...current, { id, x, y }]);

      const timer = setTimeout(() => {
        timersRef.current.delete(timer);
        setRipples((current) => current.filter((item) => item.id !== id));
      }, 900);
      timersRef.current.add(timer);
    },
    [reduced]
  );

  const onMouseLeave = useCallback(() => {
    setActive(false);
    // Clear the pending removals so they cannot fire into an unmounted or
    // already-reset state.
    timersRef.current.forEach(clearTimeout);
    timersRef.current.clear();
    setRipples([]);
  }, []);

  const filterStyle: CSSVars | undefined = enabled
    ? { filter: `url(#${filterId})` }
    : undefined;

  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={onMouseLeave}
      onMouseMove={active ? spawnRipple : undefined}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-white/[0.08] shadow-card gpu',
        className
      )}
    >
      {/* Filter is mounted only while hovered -> zero idle repaint cost */}
      {enabled ? (
        <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
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
      ) : null}

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        style={filterStyle}
      />

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          aria-hidden="true"
          className="pointer-events-none absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 animate-pulse-ring"
          style={{ left: `${ripple.x}%`, top: `${ripple.y}%` }}
        />
      ))}

      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/75 via-transparent to-transparent" />
    </div>
  );
}
