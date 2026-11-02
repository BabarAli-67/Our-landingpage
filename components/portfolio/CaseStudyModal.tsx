'use client';

import Image from 'next/image';
import { ArrowUpRight, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { blurProps } from '@/lib/image';
import type { PortfolioProject } from '@/types';

export interface CaseStudyModalProps {
  readonly project: PortfolioProject;
  readonly onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, select, textarea';

/**
 * CaseStudyModal — role-dashboard detail dialog.
 *
 * Loaded through `next/dynamic({ ssr: false })` from `PortfolioGrid`, so none
 * of this markup, none of the role screenshots and none of the dialog logic
 * are in the first-load bundle — it arrives only when a visitor opens a case
 * study.
 *
 * ACCESSIBILITY
 * The previous version declared `role="dialog" aria-modal="true"` without
 * implementing any of the contract: focus stayed on the page behind, Tab
 * escaped the dialog, and closing it dropped focus to `<body>`. This version
 * moves focus in on open, traps Tab, restores focus to the trigger on close,
 * and marks the page content behind as `aria-hidden` while open. The backdrop
 * is a plain element with a pointer handler rather than a full-screen
 * `<button>`, which previously appeared in the tab order ahead of the dialog.
 *
 * Enter/exit animation is CSS (`data-open`), so framer-motion is not involved.
 */
export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const roles = project.roles ?? [];
  const [roleId, setRoleId] = useState<string | null>(roles[0]?.id ?? null);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const activeRole = roles.find((role) => role.id === roleId) ?? roles[0] ?? null;
  const titleId = `case-study-${project.id}`;

  // Play the enter transition on the frame after mount.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const requestClose = useCallback(() => {
    setOpen(false);
    // Match the 240ms exit transition in globals.css before unmounting.
    window.setTimeout(onClose, 240);
  }, [onClose]);

  // Focus management, Escape, Tab trapping and scroll lock.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;

    closeRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.preventDefault();
        requestClose();
        return;
      }
      if (event.key !== 'Tab' || !dialog) return;

      const items = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null);
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [requestClose]);

  return (
    <div
      data-open={open}
      className="case-modal fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
    >
      {/* Backdrop: not focusable, so it cannot sit ahead of the dialog in the
          tab order. Clicking it dismisses, which Escape also does. */}
      <div
        aria-hidden="true"
        onClick={requestClose}
        className="case-modal-backdrop absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="case-modal-panel relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-primary/20 bg-ink-800/95 shadow-elevate backdrop-blur-md sm:rounded-3xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-primary/10 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Case study
            </p>
            <h2
              id={titleId}
              className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl"
            >
              {project.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={requestClose}
            aria-label="Close case study"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-primary/20 text-slate-300 transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          {project.tagline ?? project.summary ? (
            <p className="text-sm leading-relaxed text-muted-strong">
              {project.tagline ?? project.summary}
            </p>
          ) : null}

          {roles.length > 0 ? (
            <div className="mt-5">
              <p
                id={`${titleId}-roles`}
                className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
              >
                Role dashboards
              </p>
              <div
                role="group"
                aria-labelledby={`${titleId}-roles`}
                className="mb-3 flex flex-wrap gap-2"
              >
                {roles.map((role) => {
                  const isOn = role.id === activeRole?.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setRoleId(role.id)}
                      aria-pressed={isOn}
                      className={cn(
                        'rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
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
                    alt={`${project.title} — ${activeRole.label} dashboard`}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    {...blurProps(activeRole.image)}
                    className="object-cover object-top"
                  />
                ) : null}
              </div>
            </div>
          ) : null}

          {project.highlights.length > 0 ? (
            <ul className="mt-6 flex flex-col gap-3">
              {project.highlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-slate-300"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-white/[0.04] px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-strong ring-1 ring-primary/15"
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
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {project.websiteLabel ?? 'Live Demo'}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
