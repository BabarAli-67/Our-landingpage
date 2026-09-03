'use client';

import { ArrowUpRight } from 'lucide-react';
import { homeServices, techStack } from '@/lib/content';
import SectionHeading from '@/components/ui/SectionHeading';
import SpotlightCard from '@/components/ui/SpotlightCard';
import Marquee from '@/components/ui/Marquee';
import Reveal from '@/components/ui/Reveal';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import { cn } from '@/lib/utils';

/**
 * ServicesShowcase — the four core offerings.
 * ------------------------------------------------------------------
 * A premium 2×2 grid of large capability cards (shared SpotlightCard system),
 * closed with a continuous tech marquee so the toolset animation is reused
 * here rather than sitting in its own section.
 */
export default function ServicesShowcase() {
  const allTools = techStack.flatMap((g) => g.items);

  return (
    <section id="services" className="section">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="What we do"
          title="Four ways we build your advantage"
          lead="A focused studio for intelligent products — mobile, AI, conversational, and web. Pick the capability you need; we bring the senior team that ships it."
        />
        <Reveal>
          <LiquidGlassButton href="/services" variant="ghost">
            All services
            <ArrowUpRight className="h-4 w-4" />
          </LiquidGlassButton>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {homeServices.map((s, i) => {
          const Icon = s.icon;
          const accent = s.accent === 'accent';
          return (
            <Reveal key={s.slug} delay={(i % 2) * 0.08}>
              <SpotlightCard
                className="group h-full p-8 transition-transform duration-300 hover:-translate-y-1"
                glow={accent ? 'accent' : 'primary'}
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <span
                      className={cn(
                        'grid h-14 w-14 place-items-center rounded-2xl ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105',
                        accent
                          ? 'bg-accent/10 text-accent-soft'
                          : 'bg-primary/10 text-primary-soft'
                      )}
                    >
                      <Icon className="h-7 w-7" />
                    </span>
                    <span className="text-6xl font-semibold leading-none text-white/[0.06] tabular-nums">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-md flex-1 text-sm leading-relaxed text-slate-400">
                    {s.excerpt}
                  </p>

                  <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2 text-sm text-slate-300"
                      >
                        <span
                          className={cn(
                            'h-1.5 w-1.5 shrink-0 rounded-full',
                            accent ? 'bg-accent' : 'bg-primary'
                          )}
                        />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors group-hover:text-primary-soft">
                    Explore capability
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>

      {/* Reused tech marquee — the toolset behind the four services */}
      <div className="mt-16">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.28em] text-slate-500">
          Built with a modern, production-grade stack
        </p>
        <div className="relative [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
          <Marquee speed={40}>
            {allTools.map((tool, i) => (
              <span
                key={`${tool}-${i}`}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-slate-300"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-accent" />
                {tool}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
