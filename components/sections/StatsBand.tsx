import CountUp from '@/components/sections/CountUp';
import Reveal from '@/components/ui/Reveal';
import { stats } from '@/lib/content';

/**
 * StatsBand — social-proof metric row with count-up on first view.
 *
 * Server Component shell: the band, the grid and every label are server
 * rendered, and the resolved value is already in the HTML. Only the numeric
 * roll-up is a client leaf.
 */
export default function StatsBand() {
  return (
    <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Reveal as="li" key={stat.label} delay={index * 0.06}>
          <div className="flex h-full flex-col items-center gap-2 bg-ink-800/80 px-6 py-10 text-center backdrop-blur">
            <CountUp value={stat.value} />
            <span className="text-sm text-muted-strong">{stat.label}</span>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
