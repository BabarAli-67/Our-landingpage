import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import type { CSSVars } from '@/types/css';

export interface MarqueeProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly reverse?: boolean;
  /** Full-loop duration in seconds. */
  readonly speed?: number;
}

/**
 * Marquee — infinite horizontal scroll strip (duplicated track).
 * Pauses on hover; pure CSS transform animation (compositor-only).
 *
 * Server Component — it had no reason to be a client island.
 *
 * STRUCTURE
 * The two copies are separate groups so the duplicate can carry `aria-hidden`
 * — otherwise a screen reader announces the entire tool list twice. Each group
 * owns its own `gap-4 pr-4` and the outer track has neither, which keeps each
 * group exactly one full cycle wide so the `-50%` translate still loops
 * seamlessly.
 */
export default function Marquee({
  children,
  className,
  reverse = false,
  speed = 32,
}: MarqueeProps) {
  const style: CSSVars = {
    animationDuration: `${speed}s`,
    animationDirection: reverse ? 'reverse' : 'normal',
  };

  const group = 'flex shrink-0 items-center gap-4 pr-4';

  return (
    <div className={cn('group relative flex overflow-hidden', className)}>
      <div
        className="flex shrink-0 items-center animate-marquee group-hover:[animation-play-state:paused]"
        style={style}
      >
        <div className={group}>{children}</div>
        <div className={group} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
