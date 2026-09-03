'use client';

/**
 * useSmoothScroll
 * ------------------------------------------------------------------
 * Intentionally a no-op.
 *
 * A previous version hijacked the wheel event and called window.scrollTo()
 * inside a rAF loop. That is a classic scroll-jank source: it calls
 * preventDefault on every wheel tick, drives layout from JS each frame, and
 * fights the browser's own (already compositor-threaded) scrolling — which
 * is exactly what Framer Motion's `useScroll` reads from.
 *
 * Native scrolling + `scroll-behavior: smooth` (set globally in CSS) is
 * smoother and lets scroll-linked animations stay on the compositor. If you
 * later want inertia, drop in `lenis` and sync it via `lenis.on('scroll')`;
 * this hook is the single seam to do that without touching any component.
 */
export function useSmoothScroll() {
  // No JS scroll interception — keep the main thread free.
}
