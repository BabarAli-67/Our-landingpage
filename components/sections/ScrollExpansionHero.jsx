'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { siteConfig } from '@/lib/site.config';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import SplineScene from '@/components/ui/SplineScene';
import AmbientLiquid from '@/components/ui/AmbientLiquid';
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion';

/**
 * ScrollExpansionHero — 60fps refactor
 * ------------------------------------------------------------------
 * A pinned, multi-stage hero. A full-bleed media card sits over an ambient
 * Spline scene; on scroll it EXPANDS from a centered framed card to
 * full-screen while the intro copy parts and lifts away.
 *
 * PERFORMANCE:
 *  - The card is `absolute inset-0` (already full size). Expansion is done
 *    with `scale` only — never width/height/margin — so there is zero layout
 *    work per frame. `borderRadius` is the only paint-level property, and it
 *    is cheap (no reflow).
 *  - Every animated value is transform (x / y / scale) or opacity → all run
 *    on the compositor thread.
 *  - `.gpu` adds translate3d + will-change + backface-hidden on the moving
 *    layers.
 *  - Reduced motion renders the final, expanded state with no scroll binding.
 */
export default function ScrollExpansionHero() {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Light spring smooths the scroll signal without a JS scroll loop.
  const p = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  // --- transform-only expansion ---
  const mediaScale = useTransform(p, [0, 0.62], [0.58, 1]); // small card → full-bleed
  const mediaRadius = useTransform(p, [0, 0.62], [34, 0]); // paint-only, cheap
  const mediaY = useTransform(p, [0, 0.62], [24, 0]);

  // Intro copy parts + lifts (translate + opacity only)
  const titleY = useTransform(p, [0, 0.4], [0, -80]);
  const titleOpacity = useTransform(p, [0, 0.34], [1, 0]);
  const leftX = useTransform(p, [0, 0.4], [0, -120]);
  const rightX = useTransform(p, [0, 0.4], [0, 120]);

  // Overlay copy fades in once expanded
  const overlayOpacity = useTransform(p, [0.56, 0.82], [0, 1]);
  const overlayY = useTransform(p, [0.56, 0.82], [40, 0]);

  return (
    <section ref={ref} className="relative h-[280vh]" aria-label="Introduction">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <AmbientLiquid intensity="high" />

        {/* Ambient 3D scene, furthest back (lazy + viewport-gated + mobile-skipped) */}
        <div className="absolute inset-0 opacity-70">
          <SplineScene scene={siteConfig.splineScene} />
        </div>

        {/* Warm grid lines with a soft radial mask */}
        <div className="pointer-events-none absolute inset-0 bg-grid-glow bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000,transparent)]" />

        {/* Intro headline — parts on scroll */}
        <motion.div
          style={reduced ? undefined : { y: titleY, opacity: titleOpacity }}
          className="absolute z-20 flex flex-col items-center px-5 text-center gpu"
        >
          <motion.span style={reduced ? undefined : { x: leftX }} className="eyebrow mb-6">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Agentic AI · Automation · Full-Stack
          </motion.span>

          <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-tightest text-white sm:text-6xl lg:text-7xl">
            <motion.span style={reduced ? undefined : { x: leftX }} className="block">
              We engineer
            </motion.span>
            <motion.span
              style={reduced ? undefined : { x: rightX }}
              className="block text-gradient"
            >
              intelligent software.
            </motion.span>
          </h1>

          <motion.p
            style={reduced ? undefined : { opacity: titleOpacity }}
            className="mt-6 max-w-xl text-lg text-slate-400"
          >
            A high-end software house & AI automation agency building the systems
            that run modern companies.
          </motion.p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <LiquidGlassButton href="/contact" size="lg">
              Start a project
              <ArrowRight className="h-4 w-4" />
            </LiquidGlassButton>
            <LiquidGlassButton href="/work" size="lg" variant="ghost">
              <Play className="h-4 w-4" />
              See our work
            </LiquidGlassButton>
          </div>

          <span className="mt-14 text-xs uppercase tracking-[0.3em] text-slate-500">
            Scroll to explore
          </span>
        </motion.div>

        {/* Expanding media card — scale/translate only */}
        <motion.div
          style={
            reduced
              ? undefined
              : { scale: mediaScale, borderRadius: mediaRadius, y: mediaY }
          }
          className="absolute inset-0 z-10 overflow-hidden border border-white/[0.08] shadow-elevate gpu"
        >
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1600&q=70"
          >
            <source
              src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
              type="video/mp4"
            />
          </video>

          {/* flame-tinted legibility wash */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/10" />
          <div className="pointer-events-none absolute inset-0 bg-radial-fade opacity-70" />

          {/* Overlay copy once expanded */}
          <motion.div
            style={reduced ? undefined : { opacity: overlayOpacity, y: overlayY }}
            className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-16 text-center gpu"
          >
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              From idea to production —{' '}
              <span className="text-gradient">at agency velocity.</span>
            </h2>
            <p className="mt-4 max-w-xl text-slate-300">
              Agents, automations, and products your team can actually ship.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
