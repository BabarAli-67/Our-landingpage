'use client';

import { createContext, useContext, useRef, useCallback } from 'react';

/**
 * PortfolioLink context
 * ------------------------------------------------------------------
 * Decouples the Services grid from the Horizontal portfolio so a click on a
 * service card can drive the pinned scroller — without prop-drilling across
 * sibling sections.
 *
 *  - HorizontalPortfolioSection registers its `scrollToCategory` handler.
 *  - ServicesGrid calls `scrollToCategory(slug)`.
 *  - If no provider/handler is mounted (e.g. the standalone /services page),
 *    the consumer falls back to a normal hash navigation, which the portfolio
 *    picks up on load.
 */
const PortfolioLinkContext = createContext(null);

export function PortfolioProvider({ children }) {
  const handlerRef = useRef(null);

  const register = useCallback((fn) => {
    handlerRef.current = fn;
    return () => {
      if (handlerRef.current === fn) handlerRef.current = null;
    };
  }, []);

  const scrollToCategory = useCallback((slug) => {
    if (handlerRef.current) {
      handlerRef.current(slug);
      return true;
    }
    return false;
  }, []);

  return (
    <PortfolioLinkContext.Provider value={{ register, scrollToCategory }}>
      {children}
    </PortfolioLinkContext.Provider>
  );
}

export const usePortfolioLink = () => useContext(PortfolioLinkContext);
