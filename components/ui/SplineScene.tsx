'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

import { useIsMobile } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion';
import { SPLINE_ENABLED } from '@/lib/site.config';
import { cn } from '@/lib/utils';

/**
 * The subset of the Spline runtime app object this component drives. The
 * library types the `onLoad` argument as its own `Application` class; only
 * `play`/`stop` are used here and both are optional at runtime.
 */
interface SplineApp {
  play?: () => void;
  stop?: () => void;
}

// Canvas/WebGL must never render on the server, and this `import()` is the
// only reference to the Spline runtime — with `SPLINE_ENABLED` false the chunk
// is emitted but never requested, so it costs zero bytes over the wire.
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => null,
});

export interface SplineSceneProps {
  readonly scene: string;
  readonly className?: string;
  readonly fallback?: ReactNode;
}

/**
 * SplineScene — viewport-gated, opt-in 3D.
 *
 * WHY IT IS OFF BY DEFAULT
 * The Spline runtime is ~1 MB of JavaScript that parses, compiles shaders and
 * then drives a WebGL render loop on the main thread. It was gated behind
 * `!isMobile`, which is exactly why the same page measured ~93 on mobile and
 * ~65 on desktop: only desktop paid for it. It renders at `opacity-70` behind
 * a near-full-bleed banner image, and the animated gold orb below — which
 * every mobile visitor, every reduced-motion visitor and every desktop
 * visitor during the first seconds already saw — reads the same at that
 * opacity and depth.
 *
 * The orb is therefore the default on every device. Set
 * `NEXT_PUBLIC_ENABLE_SPLINE=true` to opt the WebGL scene back in; when on, it
 * keeps the original behaviour:
 *  - mounts the canvas only as it nears the viewport (IntersectionObserver),
 *  - skips 3D on mobile / reduced-motion,
 *  - pauses the runtime loop while scrolled off-screen,
 *  - fades in over the orb, so there is no layout shift either way.
 */
export default function SplineScene({ scene, className, fallback }: SplineSceneProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<SplineApp | null>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  const shouldRender3D = SPLINE_ENABLED && !isMobile && !reduced;

  // Mount gate: bring the canvas in slightly before it is visible.
  useEffect(() => {
    if (!shouldRender3D) return;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shouldRender3D]);

  // Pause/resume the runtime loop as the scene enters/leaves the viewport.
  useEffect(() => {
    if (!shouldRender3D || !inView) return;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const app = appRef.current;
        if (!app) return;
        if (entries.some((entry) => entry.isIntersecting)) app.play?.();
        else app.stop?.();
      },
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shouldRender3D, inView]);

  const onLoad = useCallback((app: SplineApp) => {
    appRef.current = app;
    setLoaded(true);
  }, []);

  return (
    <div
      ref={wrapRef}
      className={cn('relative h-full w-full overflow-hidden gpu', className)}
      aria-hidden="true"
    >
      {/* Fallback liquid-gold orb — painted first, so zero CLS */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-700',
          loaded ? 'opacity-0' : 'opacity-100'
        )}
      >
        {fallback ?? (
          <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-liquid opacity-40 blur-3xl animate-liquid-spin" />
        )}
      </div>

      {shouldRender3D && inView ? (
        <div
          className={cn(
            'h-full w-full transition-opacity duration-1000',
            loaded ? 'opacity-100' : 'opacity-0'
          )}
        >
          <Spline scene={scene} onLoad={onLoad} />
        </div>
      ) : null}
    </div>
  );
}
