import type { ReactNode } from 'react';

import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

export type HeadingAlign = 'left' | 'center';

/** Which heading level the title renders at. */
export type HeadingLevel = 'h2' | 'h3';

export interface SectionHeadingProps {
  readonly title: ReactNode;
  readonly eyebrow?: string;
  readonly lead?: ReactNode;
  readonly align?: HeadingAlign;
  readonly className?: string;
  /**
   * Defaults to `h2`. Override only to keep a page's heading hierarchy
   * sequential — axe fails `heading-order` on any skipped level.
   */
  readonly as?: HeadingLevel;
  /** Ties the heading to its landmark via `aria-labelledby`. */
  readonly id?: string;
}

/**
 * SectionHeading — consistent eyebrow + title + lead across sections.
 * Server Component.
 */
export default function SectionHeading({
  title,
  eyebrow,
  lead,
  align = 'left',
  className,
  as: Tag = 'h2',
  id,
}: SectionHeadingProps) {
  const alignCls =
    align === 'center' ? 'items-center text-center mx-auto' : 'items-start';

  return (
    <div className={cn('flex max-w-3xl flex-col gap-4', alignCls, className)}>
      {eyebrow ? (
        <Reveal>
          <span className="eyebrow">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
            {eyebrow}
          </span>
        </Reveal>
      ) : null}
      <Reveal delay={0.05}>
        <Tag id={id} className="h-display text-balance text-white">
          {title}
        </Tag>
      </Reveal>
      {lead ? (
        <Reveal delay={0.1}>
          <p className="text-lg leading-relaxed text-muted-strong">{lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
