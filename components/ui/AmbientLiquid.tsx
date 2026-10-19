import { cn } from '@/lib/utils';
import type { CSSVars } from '@/types/css';

export type AmbientIntensity = 'low' | 'md' | 'high';

export interface AmbientLiquidProps {
  readonly className?: string;
  readonly intensity?: AmbientIntensity;
}

const OPACITY: Record<AmbientIntensity, string> = {
  high: 'opacity-60',
  md: 'opacity-40',
  low: 'opacity-25',
};

/**
 * AmbientLiquid — animated liquid/aurora orbs behind content.
 *
 * Server Component: purely decorative, no interactivity, no client JS.
 * (It carried `'use client'` for no reason, which shipped it and `cn` to the
 * browser on every page that renders a hero or a CTA band.)
 *
 * ON THE 120px BLUR
 * This was briefly rewritten as `radial-gradient` orbs to avoid rasterising
 * three very large blur surfaces. Comparing it against the original build
 * showed a clear difference: a 120px blur spreads the glow far beyond the
 * element's own box — filling the CTA card edge to edge — whereas a
 * `closest-side` gradient is clipped to the box and falls off much sooner.
 * The blur is kept, because it is load-bearing for the look.
 *
 * It is cheaper than it appears: the blur rasters once into a cached layer and
 * only the `float` transform animates, so there is no per-frame blur cost.
 * `will-animate` restores the explicit `will-change: transform` that `.gpu`
 * used to carry globally, keeping these three layers promoted — which is what
 * makes that caching reliable — without reinstating a permanent `will-change`
 * on the ~40 other nodes that use `.gpu`.
 */
export default function AmbientLiquid({
  className,
  intensity = 'md',
}: AmbientLiquidProps) {
  const opacity = OPACITY[intensity];
  const delay2: CSSVars = { animationDelay: '2s' };
  const delay4: CSSVars = { animationDelay: '4s' };

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <div
        className={cn(
          'absolute -left-32 top-[-10%] h-[38rem] w-[38rem] rounded-full bg-primary/40 blur-[120px] animate-float gpu will-animate',
          opacity
        )}
      />
      <div
        className={cn(
          'absolute -right-24 top-1/3 h-[32rem] w-[32rem] rounded-full bg-accent/30 blur-[130px] animate-float gpu will-animate',
          opacity
        )}
        style={delay2}
      />
      <div
        className={cn(
          'absolute bottom-[-20%] left-1/3 h-[30rem] w-[30rem] rounded-full bg-ember/25 blur-[120px] animate-float gpu will-animate',
          opacity
        )}
        style={delay4}
      />
    </div>
  );
}
