'use client';

import { useRef, type ReactNode } from 'react';

import { useIsMobile } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion';
import { useScrollStage, type ScrollRange } from '@/hooks/useScrollStage';

export interface ScrollStageProps {
  /** Selects the CSS rule block in `globals.css`. */
  readonly stage: 'hero' | 'container';
  readonly span: 'element' | 'enter';
  readonly ranges?: readonly ScrollRange[];
  /** Fall back to the static resting layout on small screens. */
  readonly disableOnMobile?: boolean;
  readonly className?: string;
  readonly as?: 'section' | 'div';
  readonly children: ReactNode;
  /** Forwarded to the rendered element. */
  readonly id?: string;
  readonly 'aria-label'?: string;
  readonly 'aria-labelledby'?: string;
}

/**
 * ScrollStage — the client boundary for a scroll-choreographed section.
 *
 * This is the ONLY hydrated part of the hero and of `ContainerScroll`. Its
 * children arrive from Server Components already rendered, so the headline,
 * banner, buttons and card content are never shipped as client JavaScript or
 * reconciled on the client; only this wrapper element is.
 *
 * It publishes progress as CSS custom properties (see `useScrollStage`) and
 * sets `data-motion="on"` so the rules in `globals.css` activate. When motion
 * is off — `prefers-reduced-motion`, a small screen, or no JavaScript at all —
 * the attribute is absent and every layer simply renders at its resting state,
 * which is what the framer-motion implementation did by passing
 * `style={undefined}`.
 */
export default function ScrollStage({
  stage,
  span,
  ranges,
  disableOnMobile = false,
  className,
  as: Tag = 'div',
  children,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: ScrollStageProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const disabled = reduced || (disableOnMobile && isMobile);

  useScrollStage(ref, { span, ranges, disabled });

  return (
    <Tag
      // One element, two possible tags — the cast keeps the ref typed without
      // widening it to `any` at the call sites.
      ref={ref as React.Ref<HTMLDivElement & HTMLElement>}
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      data-stage={stage}
      data-motion={disabled ? undefined : 'on'}
      className={className}
    >
      {children}
    </Tag>
  );
}
