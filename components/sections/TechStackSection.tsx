import Marquee from '@/components/ui/Marquee';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { techStack } from '@/lib/content';

/**
 * TechStackSection — dedicated "Tech Stack & Capabilities" showcase.
 * Grouped capability cards + a continuous marquee of the full toolset.
 *
 * Server Component: the `'use client'` directive and the unused framer-motion
 * import pulled the animation library into this route's client bundle for a
 * section that is entirely static.
 */
export default function TechStackSection() {
  const allTools = techStack.flatMap((group) => group.items);

  return (
    <section id="tech" className="section grain" aria-labelledby="tech-title">
      <SectionHeading
        id="tech-title"
        eyebrow="Tech Stack & Capabilities"
        title="The tools we build production systems with"
        lead="From MERN and Next.js to Django, n8n and agentic AI — a stack chosen for scale, speed, and long-term maintainability."
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {techStack.map((group, index) => {
          const Icon = group.icon;
          return (
            <Reveal as="li" key={group.group} delay={index * 0.08}>
              <SpotlightCard className="h-full" glow={index % 2 ? 'accent' : 'primary'}>
                <div className="flex h-full flex-col">
                  <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-white/5 text-accent-soft ring-1 ring-white/10">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-semibold text-white">{group.group}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </ul>

      {/* Continuous capability marquee */}
      <div className="relative mt-12 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <Marquee speed={38}>
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
    </section>
  );
}
