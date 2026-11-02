'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from 'react';

import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import { siteConfig } from '@/lib/site.config';
import { cn } from '@/lib/utils';
import type { CSSVars } from '@/types/css';

/** Extract the section id from a `/#id` (or `#id`) href. */
const idFromHref = (href: string): string | null =>
  href.includes('#') ? (href.split('#')[1] ?? null) : null;

const SECTION_IDS: readonly string[] = siteConfig.nav
  .map((item) => idFromHref(item.href))
  .filter((id): id is string => id !== null);

/** Absolute document offset without forcing a layout flush per read. */
function documentTop(el: HTMLElement): number {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

interface PillRect {
  readonly left: number;
  readonly width: number;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pill, setPill] = useState<PillRect | null>(null);

  const listRef = useRef<HTMLUListElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const onHome = pathname === '/';

  /**
   * ONE rAF-throttled scroll listener drives both the navbar background flag
   * and the scroll-spy.
   *
   * The previous implementation ran two listeners, and the spy called
   * `getBoundingClientRect()` on all six sections inside every frame — six
   * forced synchronous layouts per scroll frame, which is the classic cause of
   * scroll-linked jank. Section offsets are measured once here and only
   * re-measured when the document actually changes size, so the per-frame path
   * reads nothing from layout.
   */
  useEffect(() => {
    let offsets: ReadonlyArray<{ id: string; top: number }> = [];
    let frame = 0;

    const measure = (): void => {
      if (!onHome) {
        offsets = [];
        return;
      }
      offsets = SECTION_IDS.flatMap((id) => {
        const el = document.getElementById(id);
        return el ? [{ id, top: documentTop(el) }] : [];
      });
    };

    const compute = (): void => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);

      if (!onHome) {
        setActiveId(null);
        return;
      }
      // Just below the fixed navbar, matching the original 140px probe.
      const probe = y + 140;
      let current: string | null = null;
      if (y >= 120) {
        for (const section of offsets) {
          if (section.top <= probe) current = section.id;
        }
      }
      setActiveId(current);
    };

    const schedule = (): void => {
      if (frame === 0) frame = requestAnimationFrame(compute);
    };

    const onResize = (): void => {
      measure();
      schedule();
    };

    measure();
    compute();

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    // Web fonts and lazy images below the fold shift the cached offsets.
    const observer = new ResizeObserver(onResize);
    observer.observe(document.body);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', onResize);
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, [onHome]);

  // Close the mobile menu on route change.
  useEffect(() => setOpen(false), [pathname]);

  /**
   * Position the sliding active pill.
   *
   * Replaces framer-motion's `layoutId="nav-pill"` shared-element transition.
   * Measuring happens only when the active item changes (at most six times),
   * never per frame, and the slide itself is a CSS transform transition.
   */
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || !activeId) {
      setPill(null);
      return;
    }
    const item = list.querySelector<HTMLElement>(`[data-nav-id="${activeId}"]`);
    if (!item) {
      setPill(null);
      return;
    }
    setPill({ left: item.offsetLeft, width: item.offsetWidth });
  }, [activeId]);

  // Smooth-scroll to a section on the current page; otherwise let the router
  // navigate home (the hash is resolved after load).
  const handleNav = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, href: string) => {
      const id = idFromHref(href);
      if (!id) return;
      const el = onHome ? document.getElementById(id) : null;
      if (el) {
        event.preventDefault();
        setOpen(false);
        setActiveId(id);
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      } else {
        // Cross-page: navigate home; App Router scrolls to the hash on arrival.
        event.preventDefault();
        setOpen(false);
        router.push(href);
      }
    },
    [onHome, router]
  );

  const goHome = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (onHome) {
        event.preventDefault();
        setActiveId(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
      }
      setOpen(false);
    },
    [onHome]
  );

  /**
   * Escape closes the mobile sheet and returns focus to the toggle.
   *
   * This is the ARIA disclosure-navigation pattern, not the dialog pattern:
   * focus deliberately stays on the toggle when the sheet opens, Tab then
   * moves naturally through the links (the sheet is the toggle's next sibling
   * in the DOM, so the order already reads correctly) and on out of the menu.
   * There is no focus trap — trapping belongs to a modal dialog, and a
   * disclosure menu is not one. Closing it is what hides the links from the
   * tab order, which `visibility: hidden` handles in CSS.
   */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      setOpen(false);
      toggleRef.current?.focus();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const pillStyle: CSSVars = {
    transform: `translate3d(${pill?.left ?? 0}px, 0, 0)`,
    width: `${pill?.width ?? 0}px`,
    opacity: pill ? 1 : 0,
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Primary"
        className={cn(
          'flex w-full max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500',
          scrolled ? 'glass shadow-elevate' : 'border border-transparent bg-transparent'
        )}
      >
        <Link
          href="/"
          onClick={goHome}
          aria-label={`${siteConfig.name} — back to top`}
          className="flex items-center rounded-full bg-transparent px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={80}
            height={80}
            // `loading="eager"`, not `priority`. The logo is above the fold so
            // it must not lazy-load, but `priority` would also give it
            // `fetchpriority="high"`, putting a 2 KB mark in direct contention
            // with the hero banner — the actual LCP element — for the first
            // connections. Eager loading still gets it into the first paint;
            // it just no longer claims high priority.
            loading="eager"
            className="h-10 w-10 bg-transparent object-contain"
          />
        </Link>

        {/* Desktop links */}
        <ul ref={listRef} className="relative hidden items-center gap-1 md:flex">
          {/* Sliding active pill — one element, CSS-transitioned. */}
          <span
            aria-hidden="true"
            className="nav-pill pointer-events-none absolute inset-y-0 left-0 -z-10 rounded-full bg-white/10"
            style={pillStyle}
          />
          {siteConfig.nav.map((item) => {
            const id = idFromHref(item.href);
            const active = onHome && activeId !== null && activeId === id;
            return (
              <li key={item.href} data-nav-id={id ?? undefined}>
                <Link
                  href={item.href}
                  onClick={(event) => handleNav(event, item.href)}
                  aria-current={active ? 'true' : undefined}
                  className={cn(
                    'relative block rounded-full px-4 py-2 text-sm transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                    active ? 'text-white' : 'text-muted-strong hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <LiquidGlassButton
            href={siteConfig.cta.href}
            size="sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            {siteConfig.cta.label}
          </LiquidGlassButton>
        </div>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="grid h-11 w-11 place-items-center rounded-full glass text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden"
        >
          {open ? (
            <X aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* Mobile sheet — stays mounted and is hidden with `visibility`, which
          both keeps it out of the tab order and lets CSS animate it in and
          out without an AnimatePresence tree. */}
      <div
        id="mobile-menu"
        data-open={open}
        className="nav-sheet absolute inset-x-4 top-20 rounded-3xl glass p-4 shadow-elevate md:hidden"
      >
        <ul className="flex flex-col gap-1">
          {siteConfig.nav.map((item) => {
            const id = idFromHref(item.href);
            const active = onHome && activeId !== null && activeId === id;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={(event) => handleNav(event, item.href)}
                  aria-current={active ? 'true' : undefined}
                  className={cn(
                    'block rounded-2xl px-4 py-3 text-base transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                    active ? 'bg-white/5 text-white' : 'text-slate-200 hover:bg-white/5'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-3 px-2">
          <LiquidGlassButton
            href={siteConfig.cta.href}
            className="w-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            {siteConfig.cta.label}
          </LiquidGlassButton>
        </div>
      </div>
    </header>
  );
}
