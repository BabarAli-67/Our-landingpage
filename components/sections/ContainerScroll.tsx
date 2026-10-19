import Image from 'next/image';
import type { ReactNode } from 'react';

import type { ScrollRange } from '@/hooks/useScrollStage';
import ScrollStage from '@/components/ui/ScrollStage';
import { blurProps } from '@/lib/image';
import { cn } from '@/lib/utils';
import type { CSSVars } from '@/types/css';

/** `--pc` carries the frame's opacity ramp, originally `[0, 0.4] -> [0.5, 1]`. */
const CONTAINER_RANGES: readonly ScrollRange[] = [{ prop: '--pc', from: 0, to: 0.4 }];

export interface ContainerScrollProps {
  readonly titleComponent?: ReactNode;
  readonly image?: string;
  readonly imageAlt?: string;
  readonly children?: ReactNode;
  /** `sizes` for the framed screenshot. */
  readonly imageSizes?: string;
}

/**
 * ContainerScroll
 * ------------------------------------------------------------------
 * The "device rotates upright on scroll" beat. A perspective container tilts
 * a browser mockup from a reclined 3D angle to flat as it enters.
 *
 * PERFORMANCE
 *  - Animates ONLY rotateX, scale and opacity — all compositor properties.
 *    No width/height/filter animation.
 *  - Scroll progress comes from the shared rAF driver in `useScrollStage`
 *    rather than framer-motion's `useScroll` + `useSpring`, so this section no
 *    longer mounts an animation runtime or its own rAF loop.
 *  - `.gpu` promotes the tilting layer; `perspective` lives on a static parent.
 *  - Reduced motion and small screens fall back to a flat, static frame —
 *    `ScrollStage` omits `data-motion`, so the CSS transforms never apply.
 *
 * Server Component: only the `ScrollStage` wrapper hydrates.
 */
export default function ContainerScroll({
  titleComponent,
  image,
  imageAlt = 'Product dashboard preview',
  children,
  imageSizes = '(max-width: 1024px) 100vw, 1152px',
}: ContainerScrollProps) {
  const perspective: CSSVars = { perspective: '1400px' };

  return (
    <ScrollStage
      stage="container"
      span="enter"
      ranges={CONTAINER_RANGES}
      disableOnMobile
      className="relative flex w-full items-center justify-center"
    >
      <div className="w-full" style={perspective}>
        {titleComponent ? (
          <div className="cs-title mx-auto max-w-5xl text-center gpu">
            {titleComponent}
          </div>
        ) : null}

        <div
          className={cn(
            'cs-frame mx-auto max-w-6xl rounded-[28px] border border-white/[0.08] bg-ink-800/80 p-3 shadow-elevate gpu',
            'ring-1 ring-white/[0.06] [transform-style:preserve-3d]',
            titleComponent && 'mt-10'
          )}
        >
          {/* browser chrome */}
          <div aria-hidden="true" className="flex items-center gap-2 px-3 pb-3 pt-1">
            <span className="h-3 w-3 rounded-full bg-primary/70" />
            <span className="h-3 w-3 rounded-full bg-accent/70" />
            <span className="h-3 w-3 rounded-full bg-ember/70" />
            <div className="ml-3 h-6 flex-1 rounded-full bg-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]" />
          </div>

          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.08]">
            {children ??
              (image ? (
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes={imageSizes}
                  {...blurProps(image)}
                  className="object-cover object-center"
                />
              ) : null)}
            {/* soft top glare + edge glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -bottom-px h-24 bg-gradient-to-t from-primary/10 to-transparent"
            />
          </div>
        </div>
      </div>
    </ScrollStage>
  );
}
