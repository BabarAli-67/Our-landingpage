'use client';

import { useSmoothScroll } from '@/hooks/useLenisScroll';

/**
 * Thin client boundary that activates smooth-scroll normalization for the
 * whole app while keeping the root layout a Server Component.
 */
export default function SmoothScrollProvider({ children }) {
  useSmoothScroll();
  return children;
}
