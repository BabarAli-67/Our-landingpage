'use client';

import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Reveal — the core scroll-choreography primitive.
 * Wrap any block to fade/slide it in once on enter. Stagger children by
 * passing `delay`. Honors reduced motion (renders instantly, no transform).
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  once = true,
  className,
  as = 'div',
}) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
