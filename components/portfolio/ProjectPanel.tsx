'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { ShowcaseProject } from '@/types';
import type { CSSVars } from '@/types/css';

export interface ProjectPanelProps {
  readonly project: ShowcaseProject;
  readonly index: number;
  readonly isActive: boolean;
  /** Pixel width, computed by the parent so the track sum stays invariant. */
  readonly width: number;
  readonly onActivate: () => void;
}

const ACTIVE_WASH: CSSVars = {
  background:
    'radial-gradient(60% 60% at 50% 100%, rgba(212,175,55,0.18), transparent 70%)',
};

/**
 * ProjectPanel
 * ------------------------------------------------------------------
 * One panel in the horizontal row.
 *  - Collapsed (inactive): narrow; shows only the icon + vertical title.
 *  - Expanded (active): wide; reveals image, category tag, title, description,
 *    metric and CTA.
 *
 * IMPORTANT (robustness + perf):
 *  - The panel WIDTH is set with an inline style + a CSS `transition-[width]`,
 *    NOT a JS animation. Layout must be deterministic on first paint (and SSR)
 *    and must never collapse if an animation frame does not run. The width
 *    only transitions on discrete active changes — never per scroll frame.
 *  - All reveals are CSS opacity/transform transitions (compositor-friendly).
 *  - The heavy per-frame work (the row's translateX) lives in the parent as a
 *    single transform.
 */
export default function ProjectPanel({
  project,
  index,
  isActive,
  width,
  onActivate,
}: ProjectPanelProps) {
  const Icon = project.icon;
  const style: CSSVars = { width };

  return (
    <li
      data-project-index={index}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      aria-label={`${project.category} — ${project.title}`}
      style={style}
      className={cn(
        'group relative h-[66vh] shrink-0 overflow-hidden rounded-3xl border outline-none gpu',
        'transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        isActive
          ? 'border-white/[0.12] shadow-elevate'
          : 'border-white/[0.06] shadow-card',
        'focus-within:ring-2 focus-within:ring-primary'
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
          alt={`${project.title} — ${project.category}`}
          fill
          sizes="(max-width: 768px) 82vw, 62vw"
          className="object-cover"
        />
      </div>

      {/* Legibility washes */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-ink-950/10"
      />
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 transition-opacity duration-500',
          isActive ? 'opacity-100' : 'opacity-0'
        )}
        style={ACTIVE_WASH}
      />

      {/* Collapsed state — icon + vertical title */}
      <div
        className={cn(
          'absolute inset-0 z-10 flex flex-col items-center justify-end gap-6 pb-8 transition-opacity duration-300',
          isActive ? 'pointer-events-none opacity-0' : 'opacity-100'
        )}
      >
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.06] text-primary-soft ring-1 ring-white/10 backdrop-blur">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
        <span
          aria-hidden="true"
          className="[writing-mode:vertical-rl] rotate-180 whitespace-nowrap text-sm font-medium uppercase tracking-[0.25em] text-white/80"
        >
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
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-1 text-xs font-medium uppercase tracking-widest text-white backdrop-blur">
            <Icon aria-hidden="true" className="h-3.5 w-3.5 text-primary-soft" />
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

        <ul className="mt-5 flex flex-wrap items-center gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-slate-200 ring-1 ring-white/10"
            >
              {tag}
            </li>
          ))}
        </ul>

        <a
          href={`/work/${project.id}`}
          aria-label={`View the ${project.title} case study`}
          className="mt-6 inline-flex w-fit items-center gap-1.5 rounded text-sm font-medium text-white transition-colors hover:text-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          View case study
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>
    </li>
  );
}
