'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '@/lib/site.config';
import { cn } from '@/lib/utils';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';

/** Extract the section id from a `/#id` (or `#id`) href. */
const idFromHref = (href) => (href && href.includes('#') ? href.split('#')[1] : null);

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const onHome = pathname === '/';

  // rAF-throttled scroll flag for the navbar background.
  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > 24);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change.
  useEffect(() => setOpen(false), [pathname]);

  // Scroll-spy: highlight the nav item for the section currently under the
  // navbar. A throttled scroll handler that reads each section's absolute top
  // is deterministic across programmatic + user scrolling (an Intersection
  // Observer band misses fast/teleport jumps).
  useEffect(() => {
    if (!onHome) {
      setActiveId(null);
      return;
    }
    const ids = siteConfig.nav.map((n) => idFromHref(n.href)).filter(Boolean);

    let ticking = false;
    const compute = () => {
      ticking = false;
      const pos = window.scrollY + 140; // just below the fixed navbar
      let current = null;
      if (window.scrollY >= 120) {
        for (const id of ids) {
          const el = document.getElementById(id);
          if (!el) continue;
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= pos) current = id;
        }
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [onHome]);

  // Smooth-scroll to a section on the current page; otherwise let the router
  // navigate home (the hash is resolved after load).
  const handleNav = useCallback(
    (e, href) => {
      const id = idFromHref(href);
      if (!id) return;
      const el = onHome ? document.getElementById(id) : null;
      if (el) {
        e.preventDefault();
        setOpen(false);
        setActiveId(id);
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      } else {
        // Cross-page: navigate home; App Router scrolls to the hash on arrival.
        e.preventDefault();
        setOpen(false);
        router.push(href);
      }
    },
    [onHome, router]
  );

  const goHome = useCallback(
    (e) => {
      if (onHome) {
        e.preventDefault();
        setActiveId(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
      }
      setOpen(false);
    },
    [onHome]
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={cn(
          'flex w-full max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500',
          scrolled ? 'glass shadow-elevate' : 'border border-transparent bg-transparent'
        )}
      >
        <Link
          href="/"
          onClick={goHome}
          aria-label={`${siteConfig.name} — back to top`}
          className="flex items-center rounded-full px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={160}
            height={40}
            priority
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => {
            const active = onHome && activeId === idFromHref(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={(e) => handleNav(e, item.href)}
                  aria-current={active ? 'true' : undefined}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm transition-colors',
                    active ? 'text-white' : 'text-slate-400 hover:text-white'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
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
            {...(siteConfig.cta.external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : { onClick: (e) => handleNav(e, siteConfig.cta.href) })}
          >
            {siteConfig.cta.label}
          </LiquidGlassButton>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="grid h-11 w-11 place-items-center rounded-full glass text-white md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-4 top-20 rounded-3xl glass p-4 shadow-elevate md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {siteConfig.nav.map((item) => {
                const active = onHome && activeId === idFromHref(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleNav(e, item.href)}
                      aria-current={active ? 'true' : undefined}
                      className={cn(
                        'block rounded-2xl px-4 py-3 text-base transition-colors',
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
                {...(siteConfig.cta.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : { onClick: (e) => handleNav(e, siteConfig.cta.href) })}
              >
                {siteConfig.cta.label}
              </LiquidGlassButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
