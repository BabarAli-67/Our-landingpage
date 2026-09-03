'use client';

import { trustLogos } from '@/lib/content';
import Marquee from '@/components/ui/Marquee';
import StatsBand from '@/components/sections/StatsBand';
import Reveal from '@/components/ui/Reveal';

/**
 * TrustStats — social proof band.
 * ------------------------------------------------------------------
 * A quiet "trusted by" wordmark marquee sitting above the animated
 * count-up StatsBand. Text wordmarks are placeholders — swap for real
 * client logos when available.
 */
export default function TrustStats() {
  return (
    <section className="section pt-12 lg:pt-16">
      <Reveal>
        <p className="text-center text-xs uppercase tracking-[0.28em] text-slate-500">
          Trusted by teams shipping serious software
        </p>
      </Reveal>

      <div className="mt-8 [mask-image:linear-gradient(to_right,transparent,#000_14%,#000_86%,transparent)]">
        <Marquee speed={46}>
          {trustLogos.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="select-none px-8 text-2xl font-semibold tracking-tight text-white/25 transition-colors hover:text-white/50 sm:text-3xl"
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
