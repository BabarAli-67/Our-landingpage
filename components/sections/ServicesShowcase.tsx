import { ArrowUpRight } from 'lucide-react';

import Marquee from '@/components/ui/Marquee';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { services, techStack } from '@/lib/content';
import { siteConfig } from '@/lib/site.config';
import { cn } from '@/lib/utils';

/**
 * ServicesShowcase — six core offerings in a responsive interactive grid.
 * Glass SpotlightCards + tech marquee, aligned to the studio theme.
 *
 * Server Component. It carried `'use client'` but owned no state, no effects
 * and no event handlers — the directive alone forced the whole section, the
 * `services`/`techStack` data and six lucide icon components into the client
 * bundle. The only interactive parts are the `SpotlightCard` leaves.
 */
export default function ServicesShowcase() {
  const allTools = techStack.flatMap((group) => group.items);

  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <SectionHeading
        id="services-title"
        align="center"
        eyebrow="Services"
        title="Capabilities engineered for modern products"
        lead="From full-stack platforms and mobile apps to AI integrations, automation, CMS, and performance — senior engineering across the stack."
        className="mb-14"
      />

      <ul className="grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = service.icon;
          const accent = service.accent === 'accent';
          return (
            <Reveal as="li" key={service.slug} delay={(index % 3) * 0.08}>
              <SpotlightCard
                className="group flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7"
                glow={accent ? 'accent' : 'primary'}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={cn(
                      'grid h-12 w-12 shrink-0 place-items-center rounded-2xl ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105',
                      accent
                        ? 'bg-accent/10 text-accent-soft'
                        : 'bg-primary/10 text-primary-soft'
                    )}
                  >
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs tabular-nums text-muted"
                  >
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-strong">
                  {service.excerpt}
                </p>

                <ul className="mt-5 grid grid-cols-2 gap-2">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-xs text-slate-300"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'h-1.5 w-1.5 shrink-0 rounded-full',
                          accent ? 'bg-accent' : 'bg-primary'
                        )}
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                <div
                  aria-hidden="true"
                  className="mt-6 h-px w-full bg-gradient-to-r from-white/10 to-transparent"
                />

                <a
                  href={siteConfig.whatsappQuoteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  // Six links share the visible label, so give each a distinct
                  // accessible name without touching the rendered copy.
                  aria-label={`Discuss ${service.title} with us on WhatsApp`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors group-hover:text-primary-soft"
                >
                  Discuss this service
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </ul>

      <div className="mt-16">
        <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
          Built with a modern, production-grade stack
        </p>
        <div className="relative [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
          <Marquee speed={40}>
            {allTools.map((tool, index) => (
              <span
                key={`${tool}-${index}`}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-slate-300"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-accent"
                />
                {tool}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
