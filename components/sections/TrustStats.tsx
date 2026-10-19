import StatsBand from '@/components/sections/StatsBand';
import Marquee from '@/components/ui/Marquee';
import Reveal from '@/components/ui/Reveal';
import { trustLogos } from '@/lib/content';

/**
 * TrustStats — social proof band.
 * ------------------------------------------------------------------
 * A quiet "trusted by" wordmark marquee sitting above the animated count-up
 * `StatsBand`. Text wordmarks are placeholders — swap for real client logos
 * when available.
 *
 * Server Component.
 *
 * The wordmarks were `text-white/25`, which is 1.8:1 against the obsidian
 * background and fails WCAG AA outright. They are now `text-muted` (5.5:1)
 * and still read as a recessed, secondary strip.
 */
export default function TrustStats() {
  return (
    <section className="section pt-12 lg:pt-16" aria-labelledby="trust-title">
      <Reveal>
        <h2
          id="trust-title"
          className="text-center text-xs uppercase tracking-[0.28em] text-muted"
        >
          Trusted by teams shipping serious software
        </h2>
      </Reveal>

      <div className="mt-8 [mask-image:linear-gradient(to_right,transparent,#000_14%,#000_86%,transparent)]">
        <Marquee speed={46}>
          {trustLogos.map((name, index) => (
            <span
              key={`${name}-${index}`}
              className="select-none px-8 text-2xl font-semibold tracking-tight text-muted transition-colors hover:text-slate-300 sm:text-3xl"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mt-16">
        <StatsBand />
      </div>
    </section>
  );
}
