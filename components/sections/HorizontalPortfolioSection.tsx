'use client';

import Image from 'next/image';
import { ArrowUpRight, MousePointerClick } from 'lucide-react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import { usePortfolioLink } from '@/components/portfolio/PortfolioContext';
import ProjectPanel from '@/components/portfolio/ProjectPanel';
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion';
import { firstIndexByCategory, projectCount, projects } from '@/lib/portfolio';
import { clamp } from '@/lib/utils';
import type { CSSVars } from '@/types/css';

const GAP = 16; // px between panels
const PAD = 32; // px track horizontal padding

interface Dims {
  readonly base: number;
  readonly active: number;
  readonly vw: number;
}

function ShowcaseHeading() {
  return (
    <div className="flex max-w-xl flex-col gap-3">
      <span className="eyebrow w-fit">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
        Selected work
      </span>
      <h2
        id="selected-work-title"
        className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
      >
        Outcomes, not just output
        <a
          href="/work"
          className="ml-3 inline-flex translate-y-1 rounded text-muted transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="See all work"
        >
          <ArrowUpRight aria-hidden="true" className="h-6 w-6" />
        </a>
      </h2>
    </div>
  );
}

/**
 * HorizontalPortfolioSection
 * ------------------------------------------------------------------
 * A tall (`min-h-[300vh]`) container with a sticky `h-screen` viewport.
 * Vertical scroll progress [0,1] maps to the row's horizontal translateX
 * (transform only — the heavy, per-frame animation stays on the compositor).
 *
 * The active panel expands (width) via a CSS transition, fired ONLY when the
 * active index changes — never per scroll frame. Because exactly one panel is
 * expanded at a time and (active − base) is constant, the track's total width
 * is invariant, so translateX stays perfectly stable while widths animate.
 *
 * Linkage: registers `scrollToCategory` so a Services card can scroll the page
 * to a category's first project; also honours a `#work-<slug>` hash for
 * cross-page links.
 *
 * NOTE: this section is currently unreferenced by any route — the landing page
 * uses `PortfolioShowcase`. It keeps framer-motion because it maps a scroll
 * position onto a continuous translate with per-frame measurement, and it is
 * the one place in the codebase where that is the right tool. Since it is not
 * mounted anywhere, none of that reaches a user's bundle today.
 */
export default function HorizontalPortfolioSection() {
  const outerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const link = usePortfolioLink();
  const reduced = usePrefersReducedMotion();

  const [dims, setDims] = useState<Dims>({ base: 260, active: 760, vw: 1280 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const maxXRef = useRef(0);

  const effectiveActive = hoverIndex ?? activeIndex;

  /* ---- responsive sizing + constant-sum track math ---- */
  useEffect(() => {
    const compute = (): void => {
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
    window.addEventListener('resize', compute, { passive: true });
    return () => window.removeEventListener('resize', compute);
  }, []);

  /* ---- scroll → horizontal translate (transform only) ---- */
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });

  // Functional transform reads the latest measured maxX each frame — no need
  // to recreate the transform when the viewport resizes.
  const x = useTransform(scrollYProgress, (v: number) => -(v * maxXRef.current));
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Derive the active panel from progress; only setState when it changes.
  useMotionValueEvent(scrollYProgress, 'change', (v: number) => {
    const index = clamp(Math.round(v * (projectCount - 1)), 0, projectCount - 1);
    setActiveIndex((prev) => (prev === index ? prev : index));
  });

  /* ---- click / hash linkage ---- */
  const scrollToCategory = useCallback((slug: string) => {
    const index = firstIndexByCategory[slug];
    if (index === undefined) return;
    const outer = outerRef.current;
    if (!outer) return;
    const outerTop = outer.getBoundingClientRect().top + window.scrollY;
    const scrollable = outer.offsetHeight - window.innerHeight;
    const progress = projectCount > 1 ? index / (projectCount - 1) : 0;
    window.scrollTo({ top: outerTop + progress * scrollable, behavior: 'smooth' });
  }, []);

  // Register the handler so Services cards can drive this section.
  useEffect(() => link?.register(scrollToCategory), [link, scrollToCategory]);

  // Cross-page links land with a #work-<slug> hash.
  useEffect(() => {
    const handle = (): void => {
      const match = window.location.hash.match(/^#work-([a-z-]+)/);
      const slug = match?.[1];
      if (slug) requestAnimationFrame(() => scrollToCategory(slug));
    };
    const timer = window.setTimeout(handle, 300); // let layout settle
    window.addEventListener('hashchange', handle);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('hashchange', handle);
    };
  }, [scrollToCategory]);

  const activeProject = projects[effectiveActive] ?? projects[0];

  /* ---- reduced motion: accessible vertical fallback (no pin) ---- */
  if (reduced || !activeProject) {
    return (
      <section
        id="selected-work"
        className="section"
        aria-labelledby="selected-work-title"
      >
        <ShowcaseHeading />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <li
              key={project.id}
              className="relative overflow-hidden rounded-3xl border border-white/[0.08] shadow-card"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.category}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink-950 to-transparent"
                />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-muted">
                  {project.category}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-muted-strong">{project.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  const trackStyle: CSSVars = { paddingLeft: PAD, paddingRight: PAD, gap: GAP };

  return (
    <section
      id="selected-work"
      ref={outerRef}
      className="relative min-h-[300vh]"
      aria-labelledby="selected-work-title"
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
            aria-live="polite"
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
            style={{ x, ...trackStyle }}
            onMouseLeave={() => setHoverIndex(null)}
            className="flex items-center will-change-transform"
          >
            {projects.map((project, index) => (
              <ProjectPanel
                key={project.id}
                project={project}
                index={index}
                isActive={effectiveActive === index}
                width={effectiveActive === index ? dims.active : dims.base}
                onActivate={() => setHoverIndex(index)}
              />
            ))}
          </motion.ul>
        </div>

        {/* Footer: progress dots + cue */}
        <div className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-5 pb-10 sm:px-8">
          <div role="group" aria-label="Jump to a project" className="flex items-center gap-2">
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => scrollToCategory(project.categorySlug)}
                aria-label={`Go to ${project.title}`}
                aria-current={effectiveActive === index ? 'true' : undefined}
                className={
                  'h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ' +
                  (effectiveActive === index
                    ? 'w-8 bg-gradient-to-r from-primary to-accent'
                    : 'w-4 bg-white/15 hover:bg-white/30')
                }
              />
            ))}
          </div>

          <span className="hidden items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted sm:flex">
            <MousePointerClick aria-hidden="true" className="h-4 w-4" />
            Scroll to explore · hover to expand
          </span>
        </div>

        {/* Scroll progress line */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progressScaleX }}
          className="absolute inset-x-0 bottom-0 z-20 h-0.5 origin-left bg-gradient-to-r from-primary via-accent to-ember"
        />
      </div>
    </section>
  );
}
