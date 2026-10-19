'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';

/** Scrolls the pinned portfolio row to a category's first project. */
export type CategoryHandler = (slug: string) => void;

export interface PortfolioLinkValue {
  /** Register the scroller's handler; returns an unregister function. */
  readonly register: (handler: CategoryHandler) => () => void;
  /** Returns `false` when no scroller is mounted, so callers can fall back. */
  readonly scrollToCategory: (slug: string) => boolean;
}

/**
 * PortfolioLink context
 * ------------------------------------------------------------------
 * Decouples the Services grid from the Horizontal portfolio so a click on a
 * service card can drive the pinned scroller — without prop-drilling across
 * sibling sections.
 *
 *  - `HorizontalPortfolioSection` registers its `scrollToCategory` handler.
 *  - `ServicesGrid` calls `scrollToCategory(slug)`.
 *  - If no provider/handler is mounted (e.g. the standalone /services page),
 *    the consumer falls back to a normal hash navigation, which the portfolio
 *    picks up on load.
 *
 * NOTE: this subsystem is currently unreferenced by any route — the landing
 * page uses `PortfolioShowcase` instead. It is kept, and typed, because it is
 * one import away from being re-enabled.
 */
const PortfolioLinkContext = createContext<PortfolioLinkValue | null>(null);

export function PortfolioProvider({ children }: { readonly children: ReactNode }) {
  const handlerRef = useRef<CategoryHandler | null>(null);

  const register = useCallback((handler: CategoryHandler) => {
    handlerRef.current = handler;
    return () => {
      if (handlerRef.current === handler) handlerRef.current = null;
    };
  }, []);

  const scrollToCategory = useCallback((slug: string) => {
    const handler = handlerRef.current;
    if (!handler) return false;
    handler(slug);
    return true;
  }, []);

  const value = useMemo<PortfolioLinkValue>(
    () => ({ register, scrollToCategory }),
    [register, scrollToCategory]
  );

  return (
    <PortfolioLinkContext.Provider value={value}>
      {children}
    </PortfolioLinkContext.Provider>
  );
}

export const usePortfolioLink = (): PortfolioLinkValue | null =>
  useContext(PortfolioLinkContext);
