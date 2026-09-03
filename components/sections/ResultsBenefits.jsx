'use client';

import { benefits } from '@/lib/content';
import SectionHeading from '@/components/ui/SectionHeading';
import SpotlightCard from '@/components/ui/SpotlightCard';
import Reveal from '@/components/ui/Reveal';

/**
 * ResultsBenefits — the "so what" of working with us.
 * Outcome-first cards: each pairs a hard metric with the benefit behind it.
 */
export default function ResultsBenefits() {
  return (
    <section id="results" className="section grain">
      <SectionHeading
        align="center"
        eyebrow="Results & benefits"
        title="Outcomes you can measure"
        lead="We optimise for the number that matters to your business — and build the system that moves it."
        className="mb-16"
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b, i) => {
          const Icon = b.icon;
          const accent = i % 2 === 1;
          return (
            <Reveal key={b.title} delay={(i % 3) * 0.08}>
              <SpotlightCard className="h-full p-7" glow={accent ? 'accent' : 'primary'}>
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.04] text-accent-soft ring-1 ring-white/10">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div className="text-right">
                      <div className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-3xl font-semibold text-transparent">
                        {b.metric}
                      </div>
                      <div className="text-[11px] uppercase tracking-wider text-slate-500">
                        {b.metricLabel}
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {b.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                    {b.body}
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
