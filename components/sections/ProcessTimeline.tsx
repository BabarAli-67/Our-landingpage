'use client';

import { ArrowRight, ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react';
import { useCallback, useState } from 'react';

import { useIsMobile } from '@/hooks/useMediaQuery';
import { processSteps } from '@/lib/content';
import { cn } from '@/lib/utils';
import type { ProcessStep } from '@/types';
import type { CSSVars } from '@/types/css';

/**
 * Polar placement — icon centres sit exactly on the orbit ring.
 * `radiusPct` is a percentage of half the stage (50 ≈ ring at stage edge).
 */
const ORBIT_RADIUS = 47;

type OrbitSide = 'top' | 'right' | 'bottom' | 'left';

interface OrbitSlot {
  readonly angle: number;
  readonly side: OrbitSide;
}

const ORBIT_SLOTS: readonly OrbitSlot[] = [
  { angle: -90, side: 'top' },
  { angle: 0, side: 'right' },
  { angle: 90, side: 'bottom' },
  { angle: 180, side: 'left' },
];

function polarStyle(angleDeg: number, radiusPct: number): CSSVars {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    left: `${50 + Math.cos(rad) * radiusPct}%`,
    top: `${50 + Math.sin(rad) * radiusPct}%`,
  };
}

const labelSideCls: Record<OrbitSide, string> = {
  top: 'bottom-[calc(100%+0.875rem)] left-1/2 -translate-x-1/2 text-center',
  bottom: 'top-[calc(100%+0.875rem)] left-1/2 -translate-x-1/2 text-center',
  left: 'right-[calc(100%+0.875rem)] top-1/2 -translate-y-1/2 text-right',
  right: 'left-[calc(100%+0.875rem)] top-1/2 -translate-y-1/2 text-left',
};

const RING_GRADIENT: CSSVars = {
  background:
    'conic-gradient(from 0deg, transparent 0deg, rgba(212,175,55,0.22) 90deg, transparent 180deg, rgba(229,193,88,0.18) 270deg, transparent 360deg)',
  maskImage: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 100%)',
  WebkitMaskImage:
    'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 100%)',
};

interface DetailBodyProps {
  readonly active: number;
  readonly total: number;
  readonly step: ProcessStep;
  readonly Icon: LucideIcon;
  readonly progress: number;
  readonly goNext: () => void;
  readonly panelId: string;
}

function DetailBody({
  active,
  total,
  step,
  Icon,
  progress,
  goNext,
  panelId,
}: DetailBodyProps) {
  const barStyle: CSSVars = { width: `${progress}%` };

  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary-soft ring-1 ring-primary/20">
          <Icon aria-hidden="true" className="h-4 w-4" />
        </span>
      </div>

      {/* `aria-live` so stepping through the orbit announces the new step
          instead of silently swapping the text under the reader's cursor. */}
      <div id={panelId} aria-live="polite" className="mt-4">
        <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
          {step.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-strong">{step.body}</p>
      </div>

      {/* Always after the full description — normal document flow only. */}
      <div
        aria-hidden="true"
        className="mt-5 h-1 w-full shrink-0 overflow-hidden rounded-full bg-white/[0.06]"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary-deep via-primary to-accent transition-[width] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={barStyle}
        />
      </div>

      <button
        type="button"
        onClick={goNext}
        className="mt-4 inline-flex w-fit items-center gap-2 rounded text-sm font-medium text-primary transition-colors hover:text-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {active === total - 1 ? 'Back to start' : 'Next step'}
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>
  );
}

const PANEL_ID = 'process-step-detail';

/**
 * ProcessTimeline — interactive circular orbit engagement model.
 * Desktop: 4 nodes on a ring + centred glass detail card.
 * Mobile: compact stepper with the same card content.
 *
 * Client component — it is genuinely interactive.
 *
 * Changes from the previous version:
 *  - The progress bar and the step cross-fade are CSS transitions rather than
 *    framer-motion animations, which removes the library from this section.
 *  - `useIsMobile` now resolves on the first client render (see
 *    `hooks/useMediaQuery.ts`), so the desktop orbit no longer renders and
 *    then get replaced by the mobile stepper after paint.
 *  - The nodes are `aria-pressed` toggle buttons in a labelled group, each
 *    pointing at the detail panel, and the panel is a polite live region so
 *    stepping through the orbit is announced instead of silently swapping the
 *    text. They are deliberately NOT ARIA tabs: a tablist requires a roving
 *    tab index, and a roving tab index without arrow-key handling would make
 *    every inactive step unreachable by keyboard.
 */
export default function ProcessTimeline() {
  const [active, setActive] = useState(0);
  const isMobile = useIsMobile();

  const total = processSteps.length;
  const step = processSteps[active] ?? processSteps[0];
  const progress = ((active + 1) / total) * 100;

  const goNext = useCallback(() => setActive((i) => (i + 1) % total), [total]);
  const goPrev = useCallback(() => setActive((i) => (i - 1 + total) % total), [total]);

  if (!step) return null;
  const Icon = step.icon;

  const detail = (
    <DetailBody
      active={active}
      total={total}
      step={step}
      Icon={Icon}
      progress={progress}
      goNext={goNext}
      panelId={PANEL_ID}
    />
  );

  if (isMobile) {
    return (
      <div className="mx-auto w-full max-w-md">
        <div
          role="group"
          aria-label="Engagement steps"
          className="mb-6 flex items-center justify-between gap-2 px-1"
        >
          {processSteps.map((item, index) => {
            const NodeIcon = item.icon;
            const isActive = index === active;
            return (
              <button
                key={item.title}
                type="button"
                aria-pressed={isActive}
                aria-controls={PANEL_ID}
                onClick={() => setActive(index)}
                className="group/node flex flex-1 flex-col items-center gap-2.5 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span
                  className={cn(
                    'grid h-12 w-12 place-items-center rounded-2xl border transition-all duration-300',
                    isActive
                      ? 'border-primary/50 bg-primary/15 text-primary-soft shadow-glow'
                      : 'border-primary/15 bg-ink-800 text-muted group-hover/node:border-primary/35'
                  )}
                >
                  <NodeIcon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span
                  className={cn(
                    'max-w-[72px] text-center text-[10px] font-medium uppercase leading-relaxed tracking-wider',
                    isActive ? 'text-white' : 'text-muted'
                  )}
                >
                  {item.title.split(' ')[0]}
                </span>
                <span className="sr-only">{`Step ${index + 1}: ${item.title}`}</span>
              </button>
            );
          })}
        </div>

        <div className="glass rounded-2xl p-5 shadow-card">
          {detail}

          <div className="mt-4 flex items-center justify-between border-t border-primary/10 pt-4">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous step"
              className="inline-flex items-center gap-1 rounded text-sm text-muted-strong transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              Prev
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next step"
              className="inline-flex items-center gap-1 rounded text-sm text-muted-strong transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Next
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex w-full max-w-5xl items-center justify-center px-4 py-20 sm:px-10 sm:py-24 lg:px-16">
      {/* Larger stage → more space between card and nodes */}
      <div className="relative aspect-square w-full max-w-[640px]">
        {/* Soft ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[22%] rounded-full bg-radial-fade opacity-50 animate-glow-breathe"
        />

        {/* Orbit ring — icon centres land on this circumference */}
        <div
          aria-hidden="true"
          className="absolute inset-[3%] rounded-full border border-primary/20 shadow-[inset_0_0_48px_-14px_rgba(212,175,55,0.18)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[3%] rounded-full opacity-80"
          style={RING_GRADIENT}
        />

        {/* Step nodes — icon centred on ring, label spaced outside */}
        <div role="group" aria-label="Engagement steps">
          {processSteps.map((item, index) => {
            const slot = ORBIT_SLOTS[index];
            if (!slot) return null;
            const NodeIcon = item.icon;
            const isActive = index === active;

            return (
              <button
                key={item.title}
                type="button"
                aria-pressed={isActive}
                aria-controls={PANEL_ID}
                onClick={() => setActive(index)}
                className="group/node absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary"
                style={polarStyle(slot.angle, ORBIT_RADIUS)}
              >
                <span
                  className={cn(
                    'relative grid h-14 w-14 place-items-center rounded-2xl border backdrop-blur-md transition-all duration-300',
                    isActive
                      ? 'scale-110 border-primary/50 bg-primary/15 text-primary-soft shadow-glow'
                      : 'border-primary/15 bg-ink-800/95 text-muted-strong group-hover/node:border-primary/35 group-hover/node:text-primary-soft group-hover/node:shadow-glow'
                  )}
                >
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-2xl animate-pulse-ring bg-primary/25"
                    />
                  ) : null}
                  <NodeIcon aria-hidden="true" className="relative h-6 w-6" />
                </span>

                <span
                  className={cn(
                    'pointer-events-none absolute max-w-[140px] text-xs font-medium uppercase leading-relaxed tracking-wider transition-colors duration-300',
                    labelSideCls[slot.side],
                    isActive
                      ? 'text-white'
                      : 'text-muted-strong group-hover/node:text-slate-200'
                  )}
                >
                  {item.title}
                </span>
                <span className="sr-only">{`Step ${index + 1}`}</span>
              </button>
            );
          })}
        </div>

        {/* Centre card — content-sized (no fixed height) so the bar never
            overlaps the text */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-16 sm:p-20">
          <div className="pointer-events-auto glass flex w-full max-w-[17.5rem] flex-col rounded-2xl p-5 shadow-card sm:max-w-[19.5rem] sm:p-6">
            {detail}
          </div>
        </div>
      </div>
    </div>
  );
}
