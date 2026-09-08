'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion';
import { useIsMobile } from '@/hooks/useMediaQuery';

/**
 * ContainerScroll — 60fps refactor
 * ------------------------------------------------------------------
 * The "device rotates upright on scroll" beat. A perspective container tilts
 * a browser mockup from a reclined 3D angle to flat as it enters.
 *
 * PERFORMANCE:
 *  - Animates ONLY rotateX, scale, translateY and opacity — all compositor
 *    properties. No width/height/filter animation.
 *  - The scroll signal is spring-smoothed (no JS scroll listener).
 *  - `.gpu` promotes the tilting layer; perspective lives on a static parent.
 *  - Reduced motion / mobile fall back to a flat, static frame.
 */
export default function ContainerScroll({ titleComponent, image, children }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  const rotate = useTransform(p, [0, 1], [24, 0]);
  const scale = useTransform(p, [0, 1], [isMobile ? 0.9 : 1.04, 1]);
  const translateY = useTransform(p, [0, 1], [8, -36]);
  const titleY = useTransform(p, [0, 1], [0, -28]);
  const opacity = useTransform(p, [0, 0.4], [0.5, 1]);

  const disabled = reduced || isMobile;

  return (
    <div ref={ref} className="relative -mt-10 flex items-center justify-center py-10">
      <div className="w-full" style={{ perspective: '1400px' }}>
        <motion.div
          style={disabled ? undefined : { y: titleY }}
          className="mx-auto max-w-5xl text-center gpu"
        >
          {titleComponent}
        </motion.div>

        <motion.div
          style={
            disabled ? undefined : { rotateX: rotate, scale, y: translateY, opacity }
          }
          className={cn(
            'mx-auto mt-10 max-w-6xl rounded-[28px] border border-white/[0.08] bg-ink-800/80 p-3 shadow-elevate gpu',
            'ring-1 ring-white/[0.06] [transform-style:preserve-3d]'
          )}
        >
          {/* browser chrome */}
          <div className="flex items-center gap-2 px-3 pb-3 pt-1">
            <span className="h-3 w-3 rounded-full bg-primary/70" />
            <span className="h-3 w-3 rounded-full bg-accent/70" />
            <span className="h-3 w-3 rounded-full bg-ember/70" />
            <div className="ml-3 h-6 flex-1 rounded-full bg-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]" />
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08]">
            {children ?? (
              <Image
                src={image}
                alt="Product dashboard preview"
                width={1600}
                height={1000}
                sizes="(max-width: 1024px) 100vw, 1152px"
                className="h-full w-full object-cover"
              />
            )}
            {/* soft top glare + flame edge glow */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 -bottom-px h-24 bg-gradient-to-t from-primary/10 to-transparent" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
