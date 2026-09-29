'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { processSteps } from '@/lib/content';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Polar placement — icon centers sit exactly on the orbit ring.
 * radiusPct is % of half the stage (50 ≈ ring at stage edge).
 */
const ORBIT_RADIUS = 47;
const ORBIT_SLOTS = [
  { angle: -90, side: 'top' },
  { angle: 0, side: 'right' },
  { angle: 90, side: 'bottom' },
  { angle: 180, side: 'left' },
];

function polarStyle(angleDeg, radiusPct) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    left: `${50 + Math.cos(rad) * radiusPct}%`,
    top: `${50 + Math.sin(rad) * radiusPct}%`,
  };
}

const labelSideCls = {
  top: 'bottom-[calc(100%+0.875rem)] left-1/2 -translate-x-1/2 text-center',
  bottom: 'top-[calc(100%+0.875rem)] left-1/2 -translate-x-1/2 text-center',
  left: 'right-[calc(100%+0.875rem)] top-1/2 -translate-y-1/2 text-right',
  right: 'left-[calc(100%+0.875rem)] top-1/2 -translate-y-1/2 text-left',
};

/**
 * ProcessTimeline — interactive circular orbit engagement model.
 * Desktop: 4 nodes on a ring + centered glass detail card.
 * Mobile: compact stepper with the same card content.
 */
export default function ProcessTimeline() {
  const [active, setActive] = useState(0);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const total = processSteps.length;
  const step = processSteps[active];
  const Icon = step.icon;
  const progress = ((active + 1) / total) * 100;

  const goNext = () => setActive((i) => (i + 1) % total);
  const goPrev = () => setActive((i) => (i - 1 + total) % total);

  if (isMobile) {
    return (
      <MobileStepper
        active={active}
        setActive={setActive}
        goNext={goNext}
        goPrev={goPrev}
        progress={progress}
        step={step}
        Icon={Icon}
        total={total}
        reduced={reduced}
      />
    );
  }

  return (
    <div className="relative mx-auto flex w-full max-w-5xl items-center justify-center px-4 py-20 sm:px-10 sm:py-24 lg:px-16">
      {/* Larger stage → more space between card and nodes */}
      <div className="relative aspect-square w-full max-w-[640px]">
        {/* Soft ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[22%] rounded-full bg-radial-fade opacity-50 animate-glow-breathe"
        />

        {/* Orbit ring — icon centers land on this circumference */}
        <div
          aria-hidden
          className="absolute inset-[3%] rounded-full border border-primary/20 shadow-[inset_0_0_48px_-14px_rgba(212,175,55,0.18)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[3%] rounded-full opacity-80"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0deg, rgba(212,175,55,0.22) 90deg, transparent 180deg, rgba(229,193,88,0.18) 270deg, transparent 360deg)',
            maskImage:
              'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 100%)',
            WebkitMaskImage:
              'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 100%)',
          }}
        />

        {/* Step nodes — icon centered on ring, label spaced outside */}
        {processSteps.map((s, i) => {
          const slot = ORBIT_SLOTS[i];
          const NodeIcon = s.icon;
          const isActive = i === active;
          const pos = polarStyle(slot.angle, ORBIT_RADIUS);

          return (
            <button
              key={s.title}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              aria-label={`Step ${i + 1}: ${s.title}`}
              className="group/node absolute z-20 -translate-x-1/2 -translate-y-1/2 outline-none"
              style={pos}
            >
              <span
                className={cn(
                  'relative grid h-14 w-14 place-items-center rounded-2xl border backdrop-blur-md transition-all duration-300',
                  isActive
                    ? 'scale-110 border-primary/50 bg-primary/15 text-primary-soft shadow-glow'
                    : 'border-primary/15 bg-ink-800/95 text-slate-400 group-hover/node:border-primary/35 group-hover/node:text-primary-soft group-hover/node:shadow-glow'
                )}
              >
                {isActive ? (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-2xl animate-pulse-ring bg-primary/25"
                  />
                ) : null}
                <NodeIcon className="relative h-6 w-6" />
              </span>

              <span
                className={cn(
                  'pointer-events-none absolute max-w-[140px] text-xs font-medium uppercase leading-relaxed tracking-wider transition-colors duration-300',
                  labelSideCls[slot.side],
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 group-hover/node:text-slate-200'
                )}
              >
                {s.title}
              </span>
            </button>
          );
        })}

        {/* Center card — content-sized (no fixed height) so bar never overlaps text */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-16 sm:p-20">
          <div className="pointer-events-auto glass flex w-full max-w-[17.5rem] flex-col rounded-2xl p-5 shadow-card sm:max-w-[19.5rem] sm:p-6">
            <DetailBody
              active={active}
              total={total}
              step={step}
              Icon={Icon}
              progress={progress}
              goNext={goNext}
              reduced={reduced}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailBody({ active, total, step, Icon, progress, goNext, reduced }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">
          {String(active + 1).padStart(2, '0')} /{' '}
          {String(total).padStart(2, '0')}
        </span>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary-soft ring-1 ring-primary/20">
          <Icon className="h-4 w-4" />
        </span>
      </div>

      <motion.div
        key={step.title}
        initial={reduced ? false : { opacity: 0.35 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="mt-4"
      >
        <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
          {step.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {step.body}
        </p>
      </motion.div>

      {/* Always after full description — normal document flow only */}
      <div
        className="mt-5 h-1 w-full shrink-0 overflow-hidden rounded-full bg-white/[0.06]"
        aria-hidden
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary-deep via-primary to-accent"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <button
        type="button"
        onClick={goNext}
        className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-soft"
      >
        {active === total - 1 ? 'Back to start' : 'Next step'}
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function MobileStepper({
  active,
  setActive,
  goNext,
  goPrev,
  progress,
  step,
  Icon,
  total,
  reduced,
}) {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-6 flex items-center justify-between gap-2 px-1">
        {processSteps.map((s, i) => {
          const NodeIcon = s.icon;
          const isActive = i === active;
          return (
            <button
              key={s.title}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              aria-label={`Step ${i + 1}: ${s.title}`}
              className="group/node flex flex-1 flex-col items-center gap-2.5 outline-none"
            >
              <span
                className={cn(
                  'grid h-12 w-12 place-items-center rounded-2xl border transition-all duration-300',
                  isActive
                    ? 'border-primary/50 bg-primary/15 text-primary-soft shadow-glow'
                    : 'border-primary/15 bg-ink-800 text-slate-500 group-hover/node:border-primary/35'
                )}
              >
                <NodeIcon className="h-5 w-5" />
              </span>
              <span
                className={cn(
                  'max-w-[72px] text-center text-[10px] font-medium uppercase leading-relaxed tracking-wider',
                  isActive ? 'text-white' : 'text-slate-500'
                )}
              >
                {s.title.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      <div className="glass rounded-2xl p-5 shadow-card">
        <DetailBody
          active={active}
          total={total}
          step={step}
          Icon={Icon}
          progress={progress}
          goNext={goNext}
          reduced={reduced}
        />

        <div className="mt-4 flex items-center justify-between border-t border-primary/10 pt-4">
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-primary"
            aria-label="Previous step"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </button>
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-primary"
            aria-label="Next step"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
