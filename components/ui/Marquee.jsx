'use client';

import { cn } from '@/lib/utils';

/**
 * Marquee — infinite horizontal scroll strip (duplicated track).
 * Pauses on hover; pure CSS transform animation (compositor-only).
 */
export default function Marquee({ children, className, reverse = false, speed = 32 }) {
  return (
    <div className={cn('group relative flex overflow-hidden', className)}>
      <div
        className="flex shrink-0 items-center gap-4 pr-4 animate-marquee group-hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
