'use client';

import { useMediaQuery } from './useMediaQuery';

/**
 * usePrefersReducedMotion — honor the OS accessibility setting.
 * Every motion component reads this to disable non-essential animation.
 */
export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
