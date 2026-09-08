'use client';

import { useEffect, useRef, useState } from 'react';
import { stats } from '@/lib/content';
import Reveal from '@/components/ui/Reveal';
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion';

/**
 * StatsBand — social-proof metric row with count-up on first view.
 */
export default function StatsBand() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 lg:grid-cols-4">
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.06}>
          <div className="flex flex-col items-center gap-2 bg-ink-800/80 px-6 py-10 text-center backdrop-blur">
            <CountUp value={s.value} />
            <span className="text-sm text-slate-400">{s.label}</span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function CountUp({ value }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : null);

  useEffect(() => {
    if (reduced) return;
    const num = parseFloat(value.replace(/[^\d.]/g, ''));
    const suffix = value.replace(/[\d.,]/g, '');
    const prefix = value.startsWith('+') ? '+' : '';
    if (Number.isNaN(num)) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1400;
        const tick = (now) => {
          const t = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          const current = num * eased;
          const rounded = num % 1 === 0 ? Math.round(current) : current.toFixed(1);
          setDisplay(`${prefix}${rounded}${suffix}`);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    if (el) io.observe(el);
    return () => io.disconnect();
  }, [value, reduced]);

  return (
    <span
      ref={ref}
      className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-4xl font-semibold text-transparent sm:text-5xl"
    >
      {display ?? value}
    </span>
  );
}
