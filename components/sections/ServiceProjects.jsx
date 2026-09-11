'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { siteConfig } from '@/lib/site.config';
import { cn } from '@/lib/utils';

/**
 * ServiceProjects — portfolio grid framed around the problem we solved.
 */
export default function ServiceProjects({
  id,
  eyebrow,
  title,
  lead,
  projects,
  accent = 'primary',
  askLabel = 'Got a similar problem? Ask us about it.',
}) {
  return (
    <section id={id} className="section">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        className="mb-12"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.08}>
            <article
              className={cn(
                'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-800/90',
                'transition-colors duration-300 hover:border-white/20'
              )}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-ink-700">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized={project.image?.endsWith('.svg')}
                  className={cn(
                    'transition-transform duration-500 group-hover:scale-[1.03]',
                    project.imageFit === 'contain'
                      ? 'object-contain object-top bg-ink-900'
                      : project.imagePosition === 'top'
                        ? 'object-cover object-top'
                        : 'object-cover object-center'
                  )}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
                <span
                  className={cn(
                    'absolute bottom-3 left-3 max-w-[90%] rounded-full px-3 py-1 text-xs font-medium text-white backdrop-blur-md',
                    accent === 'accent' ? 'bg-accent/30' : 'bg-primary/30'
                  )}
                >
                  {project.result}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                {project.problem ? (
                  <p className="text-sm italic leading-relaxed text-slate-400">
                    Problem: {project.problem}
                  </p>
                ) : null}
                <p className="text-sm leading-relaxed text-slate-300">
                  {project.summary}
                </p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md bg-white/[0.04] px-2 py-1 text-[11px] uppercase tracking-wider text-slate-400 ring-1 ring-white/10"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                {project.website ? (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-accent-soft transition-colors hover:text-white"
                  >
                    {project.websiteLabel || 'Live preview'}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-10 flex justify-start">
          <a
            href={siteConfig.whatsappQuoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-accent-soft transition-colors hover:text-white"
          >
            {askLabel}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
