import { ArrowRight, CalendarClock } from 'lucide-react';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import AmbientLiquid from '@/components/ui/AmbientLiquid';
import Reveal from '@/components/ui/Reveal';

/**
 * CTASection — closing conversion band with liquid backdrop + glass CTAs.
 */
export default function CTASection({
  id,
  eyebrow = 'Let’s build',
  title = 'Have a system worth automating?',
  lead = 'Tell us what’s slowing you down. We’ll show you the fastest path to a smarter, faster stack.',
}) {
  return (
    <section id={id} className="section">
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-ink-900/60 px-6 py-20 text-center backdrop-blur-xl sm:px-16">
          <AmbientLiquid intensity="high" />
          <div className="pointer-events-none absolute inset-0 bg-grid-glow bg-grid [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000,transparent)]" />

          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
            <span className="eyebrow mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {eyebrow}
            </span>
            <h2 className="h-display text-balance text-white">{title}</h2>
            <p className="mt-5 text-lg text-slate-400">{lead}</p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <LiquidGlassButton href="/contact" size="lg">
                Start a project
                <ArrowRight className="h-4 w-4" />
              </LiquidGlassButton>
              <LiquidGlassButton href="/contact" variant="ghost" size="lg">
                <CalendarClock className="h-4 w-4" />
                Book a call
              </LiquidGlassButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
