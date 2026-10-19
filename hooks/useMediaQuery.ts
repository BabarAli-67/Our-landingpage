'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * useMediaQuery — SSR-safe media query subscription.
 *
 * Built on `useSyncExternalStore` rather than `useState` + `useEffect`.
 * The previous implementation returned `false` on the first client render and
 * then flipped inside an effect, which forced a second render of every client
 * subtree that read it — and in the components that branch on it
 * (`ProcessTimeline`, `ContainerScroll`) that second render swapped the whole
 * layout after paint. `useSyncExternalStore` reads the real value during the
 * very first client render, so there is one render and no post-paint swap.
 *
 * Returns `false` for the server snapshot, which is what the markup is
 * rendered against.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onStoreChange);
      return () => mql.removeEventListener('change', onStoreChange);
    },
    [query]
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query]
  );

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const useIsMobile = (): boolean => useMediaQuery('(max-width: 767px)');
export const useIsDesktop = (): boolean => useMediaQuery('(min-width: 1024px)');
