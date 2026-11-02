'use client';

import { useEffect, useRef, useState } from 'react';

export interface CountUpProps {
  /** Formatted stat, e.g. `120+`, `98%`, `40M+`. */
  readonly value: string;
}

/**
 * CountUp — rolls a stat up to its value the first time it scrolls into view.
 *
 * Client leaf. The final value is what renders on the server and on the first
 * client paint, so the number is correct in the static HTML, correct with
 * JavaScript disabled, and correct under `prefers-reduced-motion` — the
 * animation only ever counts up to a value that is already there, which also
 * means it cannot shift layout.
 */
export default function CountUp({ value }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const numeric = Number.parseFloat(value.replace(/[^\d.]/g, ''));
    if (Number.isNaN(numeric)) return;

    const suffix = value.replace(/[\d.,]/g, '');
    const prefix = value.startsWith('+') ? '+' : '';
    const isInteger = numeric % 1 === 0;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        const start = performance.now();
        const duration = 1400;
        const tick = (now: number): void => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          const current = numeric * eased;
          const rounded = isInteger ? Math.round(current) : current.toFixed(1);
          setDisplay(`${prefix}${rounded}${suffix}`);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setDisplay(`${prefix}${isInteger ? 0 : '0.0'}${suffix}`);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span
      ref={ref}
      className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-4xl font-semibold text-transparent sm:text-5xl"
    >
      {display}
    </span>
  );
}
