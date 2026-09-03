'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion';

// Canvas/WebGL must never render on the server.
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => null,
});

/**
 * SplineScene — 60fps refactor
 * ------------------------------------------------------------------
 * Lazy, viewport-gated 3D with an explicit render-loop pause.
 *
 *  - `next/dynamic({ ssr:false })` keeps WebGL off the server and out of the
 *    initial JS.
 *  - Mounts the canvas only once it nears the viewport (IntersectionObserver).
 *  - Skips 3D entirely on mobile / reduced-motion (paints a gradient orb).
 *  - PAUSES the Spline runtime loop when scrolled off-screen and resumes on
 *    return — so it never burns GPU/rAF while you're reading further down.
 *  - Fades in over a fallback orb → zero layout shift.
 */
export default function SplineScene({ scene, className, fallback }) {
  const wrapRef = useRef(null);
  const appRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  const shouldRender3D = !isMobile && !reduced;

  // Mount gate: bring the canvas in slightly before it's visible.
  useEffect(() => {
    if (!shouldRender3D) return;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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
      ([entry]) => {
        const app = appRef.current;
        if (!app) return;
        // react-spline runtime exposes play()/stop() on the app instance.
        if (entry.isIntersecting) app.play?.();
        else app.stop?.();
      },
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shouldRender3D, inView]);

  const onLoad = useCallback((app) => {
    appRef.current = app;
    setLoaded(true);
  }, []);

  return (
    <div
      ref={wrapRef}
      className={cn('relative h-full w-full overflow-hidden gpu', className)}
      aria-hidden
    >
      {/* Fallback flame orb — painted first (zero CLS) */}
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
