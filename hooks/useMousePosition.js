'use client';

import { useRef, useCallback } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

/**
 * useMousePosition — smoothed, element-relative pointer tracking for
 * magnetic buttons, spotlight cards and liquid ripple effects.
 * Returns normalized (-0.5..0.5) spring-driven motion values + a handler.
 */
export function useMousePosition({ stiffness = 150, damping = 20 } = {}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness, damping });
  const sy = useSpring(y, { stiffness, damping });

  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [x, y]
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, x: sx, y: sy, onMouseMove, reset };
}
