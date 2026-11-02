'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

import { siteConfig } from '@/lib/site.config';
import { blurProps } from '@/lib/image';
import { cn } from '@/lib/utils';
import type { PortfolioProject } from '@/types';

export interface ProjectCardProps {
  readonly project: PortfolioProject;
  readonly onOpenCaseStudy: () => void;
}

/** Object-fit/position classes for a project screenshot. */
function mediaClasses(project: PortfolioProject): string {
  if (project.imageFit === 'contain') return 'object-contain object-top bg-ink-900';
  return project.imagePosition === 'top'
    ? 'object-cover object-top'
    : 'object-cover object-center';
}

/**
 * ProjectCard — one portfolio tile.
 *
 * Client leaf: multi-role projects let the visitor swap the preview
 * screenshot, so the card owns that one piece of state.
 */
export default function ProjectCard({ project, onOpenCaseStudy }: ProjectCardProps) {
  const roles = project.roles ?? [];
  const [roleId, setRoleId] = useState<string | null>(roles[0]?.id ?? null);
  const activeRole = roles.find((role) => role.id === roleId) ?? roles[0] ?? null;
  const previewImage = activeRole?.image ?? project.image;
  const headingId = `project-${project.id}`;

  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-ink-800/95 backdrop-blur-md',
        'transition-colors duration-300 hover:border-primary/35',
        project.featured
          ? 'border-primary/30 shadow-[0_0_0_1px_rgba(212,175,55,0.08)]'
          : 'border-primary/15'
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-700">
        <Image
          src={previewImage}
          alt={
            activeRole
              ? `${project.title} — ${activeRole.label} dashboard`
              : `${project.title} — ${project.categoryLabel} screenshot`
          }
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          {...blurProps(previewImage)}
          className={cn(
            'transition-transform duration-500 group-hover:scale-[1.03]',
            mediaClasses(project)
          )}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent"
        />

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {project.featured ? (
            <span className="rounded-full bg-primary/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-950">
              Featured
            </span>
          ) : null}
          <span className="rounded-full bg-ink-950/70 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-200 backdrop-blur-md">
            {project.categoryLabel}
          </span>
        </div>

        {project.result && roles.length === 0 ? (
          <span className="absolute bottom-3 left-3 max-w-[90%] rounded-full bg-primary/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            {project.result}
          </span>
        ) : null}

        {roles.length > 0 ? (
          <div
            role="group"
            aria-label={`${project.title} — choose a role dashboard`}
            className="absolute inset-x-0 bottom-0 flex gap-1.5 overflow-x-auto p-3 scrollbar-none"
          >
            {roles.map((role) => {
              const isOn = role.id === (activeRole?.id ?? roleId);
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setRoleId(role.id)}
                  aria-pressed={isOn}
                  className={cn(
                    'shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium backdrop-blur-md transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                    isOn
                      ? 'bg-primary text-ink-950'
                      : 'bg-ink-950/70 text-slate-200 ring-1 ring-white/10 hover:bg-ink-950/90'
                  )}
                >
                  {role.label}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <ul className="flex flex-wrap gap-1.5">
          {project.badges.map((badge) => (
            <li
              key={badge}
              className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary-soft ring-1 ring-primary/20"
            >
              {badge}
            </li>
          ))}
        </ul>

        <h3 id={headingId} className="text-lg font-semibold tracking-tight text-white">
          {project.title}
        </h3>

        <p className="text-sm leading-relaxed text-muted-strong">
          {project.tagline ?? project.summary}
        </p>

        {project.highlights.length > 0 ? (
          <ul className="flex flex-col gap-1.5">
            {project.highlights.slice(0, 3).map((item) => {
              // Case-study cards show only the headline half of each highlight.
              const label = project.caseStudy
                ? (item.split('—')[0] ?? item).trim()
                : item;
              return (
                <li key={item} className="flex items-center gap-2 text-xs text-slate-300">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  />
                  {label}
                </li>
              );
            })}
          </ul>
        ) : null}

        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-white/[0.04] px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-strong ring-1 ring-primary/15"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2">
          {project.website ? (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.websiteLabel ?? 'View project'} — ${project.title}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-soft"
            >
              {project.websiteLabel ?? 'View project'}
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          ) : (
            <a
              href={siteConfig.whatsappQuoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Preview or discuss a build like ${project.title} on WhatsApp`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-soft"
            >
              Preview / discuss build
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          )}

          {project.caseStudy ? (
            <button
              type="button"
              onClick={onOpenCaseStudy}
              aria-label={`Open the ${project.title} case study`}
              className="inline-flex items-center gap-1.5 rounded text-sm font-medium text-slate-300 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Case Study / Details
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
