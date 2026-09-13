'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { siteConfig } from '@/lib/site.config';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import SplineScene from '@/components/ui/SplineScene';
import AmbientLiquid from '@/components/ui/AmbientLiquid';
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion';

/**
 * ScrollExpansionHero — pinned expand-on-scroll hero.
 * Banner expands from framed card to full-bleed on scroll.
 */
export default function ScrollExpansionHero() {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  const mediaScale = useTransform(p, [0, 0.62], [0.58, 1]);
  const mediaRadius = useTransform(p, [0, 0.62], [34, 0]);
  const mediaY = useTransform(p, [0, 0.62], [24, 0]);

  const titleY = useTransform(p, [0, 0.4], [0, -80]);
  const titleOpacity = useTransform(p, [0, 0.34], [1, 0]);
  const leftX = useTransform(p, [0, 0.4], [0, -120]);
  const rightX = useTransform(p, [0, 0.4], [0, 120]);

  const overlayOpacity = useTransform(p, [0.56, 0.82], [0, 1]);
  const overlayY = useTransform(p, [0.56, 0.82], [40, 0]);

  return (
    <section ref={ref} className="relative h-[280vh]" aria-label="Introduction">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <AmbientLiquid intensity="high" />

        <div className="absolute inset-0 opacity-70">
          <SplineScene scene={siteConfig.splineScene} />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-grid-glow bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000,transparent)]" />

        <motion.div
          style={reduced ? undefined : { y: titleY, opacity: titleOpacity }}
          className="absolute z-20 flex flex-col items-center px-5 text-center gpu"
        >
          <motion.span style={reduced ? undefined : { x: leftX }} className="eyebrow mb-6">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {siteConfig.name}
          </motion.span>

          <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-tightest text-white sm:text-6xl lg:text-7xl">
            <motion.span style={reduced ? undefined : { x: leftX }} className="block">
              AI-powered products.
            </motion.span>
            <motion.span
              style={reduced ? undefined : { x: rightX }}
              className="block text-gradient"
            >
              Enterprise-grade systems.
            </motion.span>
          </h1>

          <motion.p
            style={reduced ? undefined : { opacity: titleOpacity }}
            className="mt-6 max-w-xl text-lg text-slate-400"
          >
            We engineer intelligent digital products — custom LLM & agentic
            integrations, automated workflows, and high-performance full-stack
            platforms built to scale.
          </motion.p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <LiquidGlassButton
              href={siteConfig.whatsappQuoteUrl}
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
              Start a build
            </LiquidGlassButton>
            <LiquidGlassButton href="/#web" size="lg" variant="ghost">
              View our systems
              <ArrowRight className="h-4 w-4" />
            </LiquidGlassButton>
          </div>

          <span className="mt-14 text-xs uppercase tracking-[0.3em] text-slate-500">
            Scroll to explore the work
          </span>
        </motion.div>

        <motion.div
          style={
            reduced
              ? undefined
              : { scale: mediaScale, borderRadius: mediaRadius, y: mediaY }
          }
          className="absolute inset-0 z-10 overflow-hidden border border-white/[0.08] shadow-elevate gpu"
        >
          <Image
            src="/assets/banner-image.jpg"
            alt="Nexus Dev Studio AI Platform Banner"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/10" />
          <div className="pointer-events-none absolute inset-0 bg-radial-fade opacity-70" />

          <motion.div
            style={reduced ? undefined : { opacity: overlayOpacity, y: overlayY }}
            className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-16 text-center gpu"
          >
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              From intelligence to infrastructure —{' '}
              <span className="text-gradient">shipped as one system.</span>
            </h2>
            <p className="mt-4 max-w-xl text-slate-300">
              Brief us on WhatsApp. Get architecture. Go to production.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
