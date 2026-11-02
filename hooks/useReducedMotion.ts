'use client';

import { useMediaQuery } from './useMediaQuery';

/**
 * usePrefersReducedMotion — honor the OS accessibility setting.
 *
 * Non-essential motion is additionally neutralised in CSS (see the
 * `prefers-reduced-motion` block in `app/globals.css`), so this hook is only
 * needed where JavaScript would otherwise keep running a loop or mount an
 * animation-only subtree.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
