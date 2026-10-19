'use client';

import { useEffect } from 'react';

/**
 * RevealRuntime
 * ------------------------------------------------------------------
 * Drives every `[data-reveal]` element on the page. Mounted exactly once, in
 * the root layout.
 *
 * WHAT IT REPLACES
 * `Reveal` used to be a framer-motion component using `whileInView`, so a
 * typical page mounted ~40 client components, each with its own observer, and
 * pulled the full framer-motion animation runtime into the first load. This is
 * ONE observer and one attribute write per element — roughly 0.7 KB of client
 * JavaScript for the whole document — and the behaviour is unchanged: each
 * element animates once, on entry, and never reverses.
 *
 * The hidden starting state is applied pre-paint by the flag script in
 * `app/layout.tsx` (`html[data-reveal-js]`). If JavaScript never runs, that
 * attribute is absent and CSS renders every reveal fully visible, so content
 * can never be stranded at `opacity: 0`.
 *
 * A `MutationObserver` picks up reveals that appear later — filtered portfolio
 * grids, dialog content — so client-rendered blocks animate the same way.
 */
export default function RevealRuntime() {
  useEffect(() => {
    const reveal = (el: Element): void => el.setAttribute('data-revealed', '');
    const PENDING = '[data-reveal]:not([data-revealed])';

    // No observer support, or the visitor asked for less motion: show
    // everything immediately and skip the machinery entirely.
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      document.querySelectorAll(PENDING).forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      // Mirrors the former framer-motion `viewport={{ margin: '-80px' }}`.
      { rootMargin: '0px 0px -80px 0px', threshold: 0 }
    );

    const observe = (scope: ParentNode): void => {
      scope.querySelectorAll(PENDING).forEach((el) => observer.observe(el));
    };

    observe(document);

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.matches(PENDING)) observer.observe(node);
          observe(node);
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
