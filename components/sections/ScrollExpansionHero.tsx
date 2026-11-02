import Image from 'next/image';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

import type { ScrollRange } from '@/hooks/useScrollStage';
import { blurProps } from '@/lib/image';
import { siteConfig } from '@/lib/site.config';
import AmbientLiquid from '@/components/ui/AmbientLiquid';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import ScrollStage from '@/components/ui/ScrollStage';
import SplineScene from '@/components/ui/SplineScene';

/**
 * Sub-ranges of the stage's 0..1 progress, matching the original
 * `useTransform` input ranges one for one:
 *   --pm   media scale / radius / rise   [0, 0.62]
 *   --pt   headline rise and side slides [0, 0.40]
 *   --pto  headline + lead fade          [0, 0.34]
 *   --po   closing overlay fade-up       [0.56, 0.82]
 */
const HERO_RANGES: readonly ScrollRange[] = [
  { prop: '--pm', from: 0, to: 0.62 },
  { prop: '--pt', from: 0, to: 0.4 },
  { prop: '--pto', from: 0, to: 0.34 },
  { prop: '--po', from: 0.56, to: 0.82 },
];

/**
 * ScrollExpansionHero — pinned expand-on-scroll hero.
 * Banner expands from a framed card to full-bleed on scroll.
 *
 * ARCHITECTURE
 * This is a Server Component. Everything visible — the headline, the lead, the
 * buttons, the LCP banner image — is server-rendered HTML. The only client
 * code in the section is `ScrollStage` (the scroll driver) and the two button
 * leaves, so the above-the-fold hero no longer pulls framer-motion's scroll
 * and spring runtime onto the critical path. The nine animated values are
 * interpolated in CSS from the progress properties above.
 */
export default function ScrollExpansionHero() {
  return (
    <ScrollStage
      as="section"
      stage="hero"
      span="element"
      ranges={HERO_RANGES}
      className="relative h-[280vh]"
      aria-labelledby="hero-title"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <AmbientLiquid intensity="high" />

        <div className="absolute inset-0 opacity-70">
          <SplineScene scene={siteConfig.splineScene} />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-glow bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000,transparent)]"
        />

        <div className="hero-title absolute z-20 flex flex-col items-center px-5 text-center gpu">
          <span className="hero-shift-left eyebrow mb-6">
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-primary" />
            {siteConfig.name}
          </span>

          <h1
            id="hero-title"
            className="max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-tightest text-white sm:text-6xl lg:text-7xl"
          >
            <span className="hero-shift-left block">AI-powered products.</span>
            <span className="hero-shift-right block text-gradient">
              Enterprise-grade systems.
            </span>
          </h1>

          <p className="hero-lead mt-6 max-w-xl text-lg text-muted-strong">
            We engineer intelligent digital products — custom LLM &amp; agentic
            integrations, automated workflows, and high-performance full-stack
            platforms built to scale.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <LiquidGlassButton
              href={siteConfig.whatsappQuoteUrl}
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              Start a build
            </LiquidGlassButton>
            <LiquidGlassButton href="/#work" size="lg" variant="ghost">
              View our systems
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </LiquidGlassButton>
          </div>

          <span className="mt-14 text-xs uppercase tracking-[0.3em] text-muted">
            Scroll to explore the work
          </span>
        </div>

        <div className="hero-media absolute inset-0 z-10 overflow-hidden border border-white/[0.08] shadow-elevate gpu">
          <Image
            src="/assets/banner-image.jpg"
            alt="Nexus Dev Studio AI platform dashboard, showing an agentic workflow and live metrics"
            fill
            priority
            sizes="100vw"
            {...blurProps('/assets/banner-image.jpg')}
            className="object-cover object-center"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-radial-fade opacity-70"
          />

          <div className="hero-overlay absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-16 text-center gpu">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              From intelligence to infrastructure —{' '}
              <span className="text-gradient">shipped as one system.</span>
            </h2>
            <p className="mt-4 max-w-xl text-slate-300">
              Brief us on WhatsApp. Get architecture. Go to production.
            </p>
          </div>
        </div>
      </div>
    </ScrollStage>
  );
}
