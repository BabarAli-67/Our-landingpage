'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * ProjectPanel
 * ------------------------------------------------------------------
 * One panel in the horizontal row.
 *  - Collapsed (inactive): narrow; shows only the icon + vertical title.
 *  - Expanded (active): wide; reveals image, category tag, title,
 *    description, metric and CTA.
 *
 * IMPORTANT (robustness + perf):
 *  - The panel WIDTH is set with an inline style + a CSS `transition-[width]`,
 *    NOT a JS animation. Layout must be deterministic on first paint (and SSR)
 *    and must never collapse if an animation frame doesn't run. The width only
 *    transitions on discrete active changes — never per scroll frame.
 *  - All reveals are CSS opacity/transform transitions (compositor-friendly).
 *  - The heavy per-frame work (the row's translateX) lives in the parent as a
 *    single Framer transform.
 */
export default function ProjectPanel({
  project,
  index,
  isActive,
  width,
  onActivate,
}) {
  const Icon = project.icon;

  return (
    <li
      data-project-index={index}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      tabIndex={0}
      aria-label={`${project.category} — ${project.title}`}
      style={{ width }}
      className={cn(
        'group relative h-[66vh] shrink-0 overflow-hidden rounded-3xl border outline-none gpu',
        'transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        isActive
          ? 'border-white/[0.12] shadow-elevate'
          : 'border-white/[0.06] shadow-card',
        'focus-visible:ring-2 focus-visible:ring-primary'
      )}
    >
      {/* Image layer — scales/brightens on activation (transform + opacity) */}
      <div
        className={cn(
          'absolute inset-0 transition-[transform,opacity] duration-700 ease-out gpu',
          isActive ? 'scale-100 opacity-100' : 'scale-[1.08] opacity-55'
        )}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 82vw, 62vw"
          className="object-cover"
        />
      </div>

      {/* Legibility washes */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-ink-950/10" />
      <div
        className={cn(
          'pointer-events-none absolute inset-0 transition-opacity duration-500',
          isActive ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          background:
            'radial-gradient(60% 60% at 20% 100%, rgba(255,59,47,0.22), transparent 70%)',
        }}
      />

      {/* Index badge */}
      <span className="absolute left-5 top-5 z-10 text-sm font-semibold tabular-nums text-white/50">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Collapsed content: icon + vertical title (fades out when active) */}
      <div
        className={cn(
          'absolute inset-0 z-10 flex flex-col items-center justify-end gap-6 pb-8 transition-opacity duration-300',
          isActive ? 'pointer-events-none opacity-0' : 'opacity-100'
        )}
      >
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.06] text-primary-soft ring-1 ring-white/10 backdrop-blur">
          <Icon className="h-5 w-5" />
        </span>
        <span className="[writing-mode:vertical-rl] rotate-180 whitespace-nowrap text-sm font-medium uppercase tracking-[0.25em] text-white/80">
          {project.title}
        </span>
      </div>

      {/* Expanded content (slides/fades in when active) */}
      <div
        className={cn(
          'absolute inset-0 z-10 flex flex-col justify-end p-8 transition-[transform,opacity] duration-500 ease-out sm:p-10',
          isActive
            ? 'translate-y-0 opacity-100 delay-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        )}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-xs font-medium uppercase tracking-widest text-white backdrop-blur">
            <Icon className="h-3.5 w-3.5 text-primary-soft" />
            {project.category}
          </span>
          <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary-soft ring-1 ring-primary/30">
            {project.metric}
          </span>
        </div>

        <h3 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {project.title}
        </h3>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-300">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-slate-200 ring-1 ring-white/10"
            >
              {t}
            </span>
          ))}
        </div>

        <a
          href={`/work/${project.id}`}
          className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-white transition-colors hover:text-primary-soft"
        >
          View case study
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </li>
  );
}
