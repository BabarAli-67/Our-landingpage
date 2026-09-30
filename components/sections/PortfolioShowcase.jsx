'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import {
  portfolioFilters,
  portfolioProjects,
} from '@/lib/content';
import { siteConfig } from '@/lib/site.config';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

/**
 * PortfolioShowcase — filterable project grid with AI projects featured first.
 */
export default function PortfolioShowcase() {
  const [active, setActive] = useState(portfolioFilters[0]?.id ?? 'web');
  const [caseStudyProject, setCaseStudyProject] = useState(null);

  const projects = useMemo(() => {
    const list = portfolioProjects.filter((p) =>
      p.categories.includes(active)
    );

    return [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [active]);

  return (
    <section id="work" className="section" aria-label="Portfolio">
      <span id="web" className="sr-only" />
      <span id="apps" className="sr-only" />

      <SectionHeading
        eyebrow="Selected work"
        title="AI-powered products and platforms we’ve shipped"
        lead="From intelligent matching engines to full-stack web and mobile systems — production builds that compound advantage."
        className="mb-10"
      />

      <div
        role="tablist"
        aria-label="Filter projects"
        className="mb-10 flex flex-wrap gap-2"
      >
        {portfolioFilters.map((filter) => {
          const isActive = active === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(filter.id)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
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

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={(i % 3) * 0.06}>
            <ProjectCard
              project={project}
              onOpenCaseStudy={() => setCaseStudyProject(project)}
            />
          </Reveal>
        ))}
      </div>

      {projects.length === 0 ? (
        <p className="py-12 text-center text-sm text-slate-500">
          No projects in this category yet.
        </p>
      ) : null}

      <Reveal delay={0.15}>
        <div className="mt-10">
          <a
            href={siteConfig.whatsappQuoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-soft"
          >
            Building something similar? Brief us.
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </Reveal>

      <CaseStudyModal
        project={caseStudyProject}
        onClose={() => setCaseStudyProject(null)}
      />
    </section>
  );
}

function ProjectCard({ project, onOpenCaseStudy }) {
  const roles = project.roles ?? [];
  const [roleId, setRoleId] = useState(roles[0]?.id ?? null);
  const activeRole = roles.find((r) => r.id === roleId) ?? roles[0];
  const previewImage = activeRole?.image || project.image;

  return (
    <article
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
              : project.title
          }
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className={cn(
            'transition-transform duration-500 group-hover:scale-[1.03]',
            project.imageFit === 'contain'
              ? 'object-contain object-top bg-ink-900'
              : project.imagePosition === 'top'
                ? 'object-cover object-top'
                : 'object-cover object-center'
          )}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />

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

        {project.result && !roles.length ? (
          <span className="absolute bottom-3 left-3 max-w-[90%] rounded-full bg-primary/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            {project.result}
          </span>
        ) : null}

        {roles.length > 0 ? (
          <div className="absolute inset-x-0 bottom-0 flex gap-1.5 overflow-x-auto p-3 scrollbar-none">
            {roles.map((role) => {
              const isOn = role.id === (activeRole?.id ?? roleId);
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setRoleId(role.id)}
                  className={cn(
                    'shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium backdrop-blur-md transition-colors',
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
        <div className="flex flex-wrap gap-1.5">
          {project.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary-soft ring-1 ring-primary/20"
            >
              {badge}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-white">
          {project.title}
        </h3>

        <p className="text-sm leading-relaxed text-slate-400">
          {project.tagline || project.summary}
        </p>

        {project.highlights?.length && !project.caseStudy ? (
          <ul className="flex flex-col gap-1.5">
            {project.highlights.slice(0, 3).map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-xs text-slate-300"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        {project.caseStudy && project.highlights?.length ? (
          <ul className="flex flex-col gap-1.5">
            {project.highlights.slice(0, 3).map((item) => {
              const short = item.split('—')[0].trim();
              return (
                <li
                  key={item}
                  className="flex items-center gap-2 text-xs text-slate-300"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {short}
                </li>
              );
            })}
          </ul>
        ) : null}

        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-white/[0.04] px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-slate-400 ring-1 ring-primary/15"
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
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-soft"
            >
              {project.websiteLabel || 'View project'}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : (
            <a
              href={siteConfig.whatsappQuoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-soft"
            >
              Preview / discuss build
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}

          {project.caseStudy ? (
            <button
              type="button"
              onClick={onOpenCaseStudy}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 transition-colors hover:text-primary"
            >
              Case Study / Details
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function CaseStudyModal({ project, onClose }) {
  const roles = project?.roles ?? [];
  const [roleId, setRoleId] = useState(roles[0]?.id ?? null);

  useEffect(() => {
    if (!project) return undefined;
    setRoleId(project.roles?.[0]?.id ?? null);
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  const activeRole =
    roles.find((r) => r.id === roleId) ?? roles[0] ?? null;

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close case study"
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`case-study-${project.id}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-primary/20 bg-ink-800/95 shadow-elevate backdrop-blur-md sm:rounded-3xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-primary/10 px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Case study
                </p>
                <h3
                  id={`case-study-${project.id}`}
                  className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl"
                >
                  {project.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-primary/20 text-slate-300 transition-colors hover:border-primary/40 hover:text-primary"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
              {project.tagline || project.summary ? (
                <p className="text-sm leading-relaxed text-slate-400">
                  {project.tagline || project.summary}
                </p>
              ) : null}

              {roles.length > 0 ? (
                <div className="mt-5">
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                    Role dashboards
                  </p>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {roles.map((role) => {
                      const isOn = role.id === activeRole?.id;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => setRoleId(role.id)}
                          className={cn(
                            'rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                            isOn
                              ? 'bg-primary text-ink-950'
                              : 'border border-primary/20 bg-ink-900 text-slate-300 hover:border-primary/40'
                          )}
                        >
                          {role.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-primary/15 bg-ink-900">
                    {activeRole ? (
                      <Image
                        src={activeRole.image}
                        alt={`${project.title} — ${activeRole.label}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="object-cover object-top"
                      />
                    ) : null}
                  </div>
                </div>
              ) : null}

              {project.highlights?.length ? (
                <ul className="mt-6 flex flex-col gap-3">
                  {project.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-slate-300"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-white/[0.04] px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-slate-400 ring-1 ring-primary/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.website ? (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-primary-soft"
                >
                  {project.websiteLabel || 'Live Demo'}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
