'use client';

import dynamic from 'next/dynamic';
import { useCallback, useMemo, useRef, useState, type KeyboardEvent } from 'react';

import ProjectCard from '@/components/portfolio/ProjectCard';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';
import type { PortfolioCategory, PortfolioFilter, PortfolioProject } from '@/types';

// Only fetched when a visitor actually opens a case study, so the dialog's
// markup, its role screenshots and its focus-management logic stay out of the
// first-load JavaScript entirely.
const CaseStudyModal = dynamic(() => import('@/components/portfolio/CaseStudyModal'), {
  ssr: false,
});

export interface PortfolioGridProps {
  readonly filters: readonly PortfolioFilter[];
  readonly projects: readonly PortfolioProject[];
}

const PANEL_ID = 'portfolio-panel';
const tabId = (id: PortfolioCategory): string => `portfolio-tab-${id}`;

/**
 * PortfolioGrid — the interactive half of the portfolio section.
 *
 * ACCESSIBILITY
 * The filter row declared `role="tablist"` and `role="tab"` but had no
 * `aria-controls`, no `tabpanel` and no roving tab index, so assistive
 * technology announced tabs that controlled nothing and keyboard users had to
 * Tab through every filter. It now implements the ARIA Tabs pattern properly:
 * each tab points at the panel, only the selected tab is in the tab order, and
 * Arrow/Home/End move between them.
 */
export default function PortfolioGrid({ filters, projects }: PortfolioGridProps) {
  const firstFilter = filters[0]?.id ?? 'web';
  const [active, setActive] = useState<PortfolioCategory>(firstFilter);
  const [caseStudy, setCaseStudy] = useState<PortfolioProject | null>(null);
  const tablistRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(
    () =>
      projects
        .filter((project) => project.categories.includes(active))
        .slice()
        .sort((a, b) => Number(b.featured) - Number(a.featured)),
    [active, projects]
  );

  const focusTab = useCallback(
    (index: number) => {
      const total = filters.length;
      const next = filters[((index % total) + total) % total];
      if (!next) return;
      setActive(next.id);
      tablistRef.current
        ?.querySelector<HTMLButtonElement>(`#${tabId(next.id)}`)
        ?.focus();
    },
    [filters]
  );

  const onTabKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          focusTab(index + 1);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          focusTab(index - 1);
          break;
        case 'Home':
          event.preventDefault();
          focusTab(0);
          break;
        case 'End':
          event.preventDefault();
          focusTab(filters.length - 1);
          break;
        default:
          break;
      }
    },
    [filters.length, focusTab]
  );

  return (
    <>
      <div
        ref={tablistRef}
        role="tablist"
        aria-label="Filter projects by type"
        className="mb-10 flex flex-wrap gap-2"
      >
        {filters.map((filter, index) => {
          const isActive = active === filter.id;
          return (
            <button
              key={filter.id}
              id={tabId(filter.id)}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={PANEL_ID}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(filter.id)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950',
                isActive
                  ? 'bg-primary text-ink-950'
                  : 'border border-primary/20 bg-ink-800/80 text-slate-300 hover:border-primary/40 hover:text-white'
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div id={PANEL_ID} role="tabpanel" aria-labelledby={tabId(active)}>
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((project, index) => (
            <Reveal as="li" key={project.id} delay={(index % 3) * 0.06}>
              <ProjectCard
                project={project}
                onOpenCaseStudy={() => setCaseStudy(project)}
              />
            </Reveal>
          ))}
        </ul>

        {visible.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted">
            No projects in this category yet.
          </p>
        ) : null}
      </div>

      {caseStudy ? (
        <CaseStudyModal project={caseStudy} onClose={() => setCaseStudy(null)} />
      ) : null}
    </>
  );
}
