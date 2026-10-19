import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { benefits } from '@/lib/content';

/**
 * ResultsBenefits — the "so what" of working with us.
 * Outcome-first cards: each pairs a hard metric with the benefit behind it.
 *
 * Server Component.
 */
export default function ResultsBenefits() {
  return (
    <section id="results" className="section grain" aria-labelledby="results-title">
      <SectionHeading
        id="results-title"
        align="center"
        eyebrow="Results & benefits"
        title="Outcomes you can measure"
        lead="We optimise for the number that matters to your business — and build the system that moves it."
        className="mb-16"
      />

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          const accent = index % 2 === 1;
          return (
            <Reveal as="li" key={benefit.title} delay={(index % 3) * 0.08}>
              <SpotlightCard className="h-full p-7" glow={accent ? 'accent' : 'primary'}>
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.04] text-accent-soft ring-1 ring-white/10">
                      <Icon aria-hidden="true" className="h-6 w-6" />
                    </span>
                    <p className="text-right">
                      <span className="block bg-gradient-to-br from-white to-slate-400 bg-clip-text text-3xl font-semibold text-transparent">
                        {benefit.metric}
                      </span>
                      <span className="block text-[11px] uppercase tracking-wider text-muted">
                        {benefit.metricLabel}
                      </span>
                    </p>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-strong">
                    {benefit.body}
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
