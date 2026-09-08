'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, MousePointerClick } from 'lucide-react';

import ProjectPanel from '@/components/portfolio/ProjectPanel';
import { usePortfolioLink } from '@/components/portfolio/PortfolioContext';
import { projects, projectCount, firstIndexByCategory } from '@/lib/portfolio';
import { clamp } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion';
import { useIsMobile } from '@/hooks/useMediaQuery';

const GAP = 16; // px between panels
const PAD = 32; // px track horizontal padding

/**
 * HorizontalPortfolioSection
 * ------------------------------------------------------------------
 * A tall (min-h-[300vh]) container with a sticky h-screen viewport. Vertical
 * scroll progress [0,1] maps to the row's horizontal translateX (transform
 * only — the heavy, per-frame animation stays on the compositor).
 *
 * The active panel expands (width) via a spring, fired ONLY when the active
 * index changes — never per scroll frame. Because exactly one panel is
 * expanded at a time and (active − base) is constant, the track's total width
 * is invariant, so translateX stays perfectly stable while widths animate.
 *
 * Linkage: registers `scrollToCategory` so a Services card can scroll the
 * page to a category's first project; also honors a `#work-<slug>` hash for
 * cross-page links.
 */
export default function HorizontalPortfolioSection() {
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const link = usePortfolioLink();
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const [dims, setDims] = useState({ base: 260, active: 760, vw: 1280 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const maxXRef = useRef(0);

  const effectiveActive = hoverIndex ?? activeIndex;

  /* ---- responsive sizing + constant-sum track math ---- */
  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const mobile = vw < 768;
      const base = mobile ? vw * 0.42 : vw * 0.2;
      const active = mobile ? vw * 0.82 : vw * 0.62;
      const trackContent =
        (projectCount - 1) * base + active + GAP * (projectCount - 1);
      const fullTrack = trackContent + PAD * 2;
      maxXRef.current = Math.max(0, fullTrack - vw);
      setDims({ base, active, vw });
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  /* ---- scroll → horizontal translate (transform only) ---- */
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });

  // Functional transform reads the latest measured maxX each frame — no need
  // to recreate the transform when the viewport resizes.
  const x = useTransform(scrollYProgress, (v) => -(v * maxXRef.current));
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Derive the active panel from progress; only setState when it changes.
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = clamp(Math.round(v * (projectCount - 1)), 0, projectCount - 1);
    setActiveIndex((prev) => (prev === idx ? prev : idx));
  });

  /* ---- click / hash linkage ---- */
  const scrollToCategory = useCallback((slug) => {
    const idx = firstIndexByCategory[slug];
    if (idx == null) return;
    const outer = outerRef.current;
    if (!outer) return;
    const outerTop = outer.getBoundingClientRect().top + window.scrollY;
    const scrollable = outer.offsetHeight - window.innerHeight;
    const progress = projectCount > 1 ? idx / (projectCount - 1) : 0;
    window.scrollTo({ top: outerTop + progress * scrollable, behavior: 'smooth' });
  }, []);

  // Register the handler so Services cards can drive this section.
  useEffect(() => link?.register(scrollToCategory), [link, scrollToCategory]);

  // Cross-page links land with a #work-<slug> hash.
  useEffect(() => {
    const handle = () => {
      const m = window.location.hash.match(/^#work-([a-z-]+)/);
      if (m) requestAnimationFrame(() => scrollToCategory(m[1]));
    };
    const t = setTimeout(handle, 300); // let layout settle on first paint
    window.addEventListener('hashchange', handle);
    return () => {
      clearTimeout(t);
      window.removeEventListener('hashchange', handle);
    };
  }, [scrollToCategory]);

  const activeProject = projects[effectiveActive];

  /* ---- reduced motion: accessible vertical fallback (no pin) ---- */
  if (reduced) {
    return (
      <section id="selected-work" className="section">
        <ShowcaseHeading />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <li
              key={p.id}
              className="relative overflow-hidden rounded-3xl border border-white/[0.08] shadow-card"
            >
              <div className="relative aspect-[16/10]">
                <Image src={p.image} alt={p.title} fill sizes="50vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 to-transparent" />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-slate-500">{p.category}</p>
                <h3 className="mt-1 text-xl font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{p.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section
      id="selected-work"
      ref={outerRef}
      className="relative min-h-[300vh]"
      aria-label="Selected work"
    >
      {/* Sticky pinned viewport */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Header overlay — current category updates smoothly */}
        <div className="relative z-20 mx-auto flex w-full max-w-7xl items-end justify-between px-5 pt-24 sm:px-8">
          <ShowcaseHeading />
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="hidden text-right sm:block"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-primary-soft">
              {activeProject.category}
            </p>
            <p className="text-lg font-semibold text-white">{activeProject.title}</p>
          </motion.div>
        </div>

        {/* The moving row */}
        <div className="flex flex-1 items-center">
          <motion.ul
            ref={trackRef}
            style={{ x, paddingLeft: PAD, paddingRight: PAD, gap: GAP }}
            onMouseLeave={() => setHoverIndex(null)}
            className="flex items-center will-change-transform"
          >
            {projects.map((p, i) => (
              <ProjectPanel
                key={p.id}
                project={p}
                index={i}
                isActive={effectiveActive === i}
                width={effectiveActive === i ? dims.active : dims.base}
                onActivate={() => setHoverIndex(i)}
              />
            ))}
          </motion.ul>
        </div>

        {/* Footer: progress bar + dots + cue */}
        <div className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-5 pb-10 sm:px-8">
          <div className="flex items-center gap-2">
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => scrollToCategory(p.categorySlug)}
                aria-label={`Go to ${p.title}`}
                className={
                  'h-1.5 rounded-full transition-all duration-300 ' +
                  (effectiveActive === i
                    ? 'w-8 bg-gradient-to-r from-primary to-accent'
                    : 'w-4 bg-white/15 hover:bg-white/30')
                }
              />
            ))}
          </div>

          <span className="hidden items-center gap-2 text-xs uppercase tracking-[0.25em] text-slate-500 sm:flex">
            <MousePointerClick className="h-4 w-4" />
            Scroll to explore · hover to expand
          </span>
        </div>

        {/* Scroll progress line */}
        <motion.div
          style={{ scaleX: progressScaleX }}
          className="absolute inset-x-0 bottom-0 z-20 h-0.5 origin-left bg-gradient-to-r from-primary via-accent to-ember"
        />
      </div>
    </section>
  );
}

function ShowcaseHeading() {
  return (
    <div className="flex max-w-xl flex-col gap-3">
      <span className="eyebrow w-fit">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        Selected work
      </span>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Outcomes, not just output
        <a
          href="/work"
          className="ml-3 inline-flex translate-y-1 text-slate-500 transition-colors hover:text-white"
          aria-label="All work"
        >
          <ArrowUpRight className="h-6 w-6" />
        </a>
      </h2>
    </div>
  );
}
