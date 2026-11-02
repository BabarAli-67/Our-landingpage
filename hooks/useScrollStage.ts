'use client';

import { useEffect, type RefObject } from 'react';

/**
 * useScrollStage
 * ------------------------------------------------------------------
 * Replaces framer-motion's `useScroll` + `useTransform` + `useSpring` chains
 * in the scroll-choreographed sections (the pinned hero and the tilting
 * `ContainerScroll` frame).
 *
 * WHY THIS EXISTS
 * The hero sits above the fold, so anything it imports lands on the critical
 * path. framer-motion's scroll machinery meant ~34 KB gzipped of animation
 * runtime plus a `useSpring` rAF loop had to be parsed, compiled and started
 * before the hero could settle — a direct Total Blocking Time cost on a
 * section whose only dynamic values are nine numbers.
 *
 * HOW IT WORKS
 *  - ONE module-level passive scroll/resize listener and ONE rAF loop are
 *    shared by every mounted stage, however many there are.
 *  - Each frame writes plain custom properties (`--p`, and any named
 *    sub-ranges) onto the stage element. Nothing re-renders in React.
 *  - All interpolation happens in CSS `calc()` against those properties, so
 *    the transforms stay on the compositor exactly as before.
 *  - Element geometry is cached and only re-measured on resize, so the
 *    per-frame path performs no layout reads (the old navbar scroll-spy did
 *    six `getBoundingClientRect()` calls per frame — a forced reflow each).
 *
 * The listener is attached lazily on the first stage and torn down with the
 * last, so a page with no stages pays nothing.
 */

/** A sub-range of the stage's 0..1 progress, published as its own property. */
export interface ScrollRange {
  /** Custom property name to write, e.g. `--pm`. */
  readonly prop: string;
  /** Stage progress at which this sub-range starts (0..1). */
  readonly from: number;
  /** Stage progress at which this sub-range reaches 1 (0..1). */
  readonly to: number;
}

export interface ScrollStageOptions {
  /**
   * Scroll distance that maps to progress 0..1:
   *  - `element`  — the element's own height (framer `['start start','end start']`)
   *  - `enter`    — from the element's top entering the viewport bottom to its
   *                 centre reaching the viewport centre
   *                 (framer `['start end','center center']`)
   */
  readonly span: 'element' | 'enter';
  readonly ranges?: readonly ScrollRange[];
  /** Skip all work (reduced motion, or a mobile fallback to a static frame). */
  readonly disabled?: boolean;
}

interface Stage {
  readonly el: HTMLElement;
  readonly options: ScrollStageOptions;
  /** Cached geometry — refreshed on resize only. */
  top: number;
  height: number;
  /** Last written progress, to skip redundant style writes. */
  last: number;
}

const stages = new Set<Stage>();
let frame = 0;
let listening = false;

const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Absolute document offset of an element without forcing a layout flush. */
function documentTop(el: HTMLElement): number {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

function measure(stage: Stage): void {
  stage.top = documentTop(stage.el);
  stage.height = stage.el.offsetHeight;
}

function progressFor(stage: Stage, scrollY: number, viewport: number): number {
  if (stage.options.span === 'enter') {
    // 0 when the element's top is at the viewport bottom,
    // 1 when the element's centre is at the viewport centre.
    const start = stage.top - viewport;
    const end = stage.top + stage.height / 2 - viewport / 2;
    const distance = end - start;
    return distance <= 0 ? 1 : clamp01((scrollY - start) / distance);
  }
  // 0 when the element's top is at the viewport top,
  // 1 when the element's bottom is at the viewport top.
  return stage.height <= 0 ? 0 : clamp01((scrollY - stage.top) / stage.height);
}

function write(stage: Stage, p: number): void {
  const { el, options } = stage;
  el.style.setProperty('--p', p.toFixed(4));
  if (!options.ranges) return;
  for (const range of options.ranges) {
    const distance = range.to - range.from;
    const sub = distance <= 0 ? (p >= range.to ? 1 : 0) : (p - range.from) / distance;
    el.style.setProperty(range.prop, clamp01(sub).toFixed(4));
  }
}

function tick(): void {
  frame = 0;
  const scrollY = window.scrollY;
  const viewport = window.innerHeight;
  for (const stage of stages) {
    const p = progressFor(stage, scrollY, viewport);
    // 1/2000th of the range is well below a sub-pixel change at these distances.
    if (Math.abs(p - stage.last) < 0.0005) continue;
    stage.last = p;
    write(stage, p);
  }
}

function schedule(): void {
  if (frame === 0) frame = requestAnimationFrame(tick);
}

function onResize(): void {
  for (const stage of stages) {
    measure(stage);
    stage.last = -1;
  }
  schedule();
}

function startListening(): void {
  if (listening) return;
  listening = true;
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
}

function stopListening(): void {
  if (!listening) return;
  listening = false;
  window.removeEventListener('scroll', schedule);
  window.removeEventListener('resize', onResize);
  if (frame !== 0) {
    cancelAnimationFrame(frame);
    frame = 0;
  }
}

export function useScrollStage(
  ref: RefObject<HTMLElement>,
  options: ScrollStageOptions
): void {
  const { span, disabled } = options;
  // `ranges` is a module-level constant at every call site, so the identity is
  // stable; it is intentionally not part of the dependency list.
  const rangeKey = options.ranges?.map((r) => `${r.prop}:${r.from}:${r.to}`).join('|');

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;

    const stage: Stage = { el, options, top: 0, height: 0, last: -1 };
    measure(stage);
    stages.add(stage);
    startListening();
    schedule();

    // Late layout shifts (web fonts, lazy images above the stage) move the
    // cached offsets, so re-measure once the document settles.
    const observer = new ResizeObserver(() => {
      measure(stage);
      stage.last = -1;
      schedule();
    });
    observer.observe(el);

    return () => {
      observer.disconnect();
      stages.delete(stage);
      el.style.removeProperty('--p');
      for (const range of options.ranges ?? []) {
        el.style.removeProperty(range.prop);
      }
      if (stages.size === 0) stopListening();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, span, disabled, rangeKey]);
}
