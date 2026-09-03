'use client';

import { processSteps } from '@/lib/content';
import Reveal from '@/components/ui/Reveal';

/**
 * ProcessTimeline — 4-step engagement path with a connecting aurora line.
 */
export default function ProcessTimeline() {
  return (
    <div className="relative">
      {/* connecting line (desktop) */}
      <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />

      <div className="grid gap-8 lg:grid-cols-4">
        {processSteps.map((step, i) => {
          const Icon = step.icon;
          return (
            <Reveal key={step.title} delay={i * 0.1}>
              <div className="relative flex flex-col gap-4">
                <div className="relative z-10 flex items-center gap-4">
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-white/10 bg-ink-900 text-accent-soft shadow-glow">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-5xl font-semibold text-white/10">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{step.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
