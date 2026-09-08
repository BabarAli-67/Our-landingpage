import Reveal from './Reveal';
import { cn } from '@/lib/utils';

/**
 * SectionHeading — consistent eyebrow + title + lead across sections.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  className,
}) {
  const alignCls = align === 'center' ? 'items-center text-center mx-auto' : 'items-start';
  return (
    <div className={cn('flex max-w-3xl flex-col gap-4', alignCls, className)}>
      {eyebrow ? (
        <Reveal>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {eyebrow}
          </span>
        </Reveal>
      ) : null}
      <Reveal delay={0.05}>
        <h2 className="h-display text-balance text-white">{title}</h2>
      </Reveal>
      {lead ? (
        <Reveal delay={0.1}>
          <p className="text-lg leading-relaxed text-slate-400">{lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
