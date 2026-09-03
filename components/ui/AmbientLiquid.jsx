'use client';

import { cn } from '@/lib/utils';

/**
 * AmbientLiquid — animated liquid/aurora blobs behind content.
 * Blurred conic/radial gradients on GPU layers; no JS per frame.
 * Purely decorative (aria-hidden) and cheap to keep on-screen.
 */
export default function AmbientLiquid({ className, intensity = 'md' }) {
  const opacity = intensity === 'high' ? 'opacity-60' : intensity === 'low' ? 'opacity-25' : 'opacity-40';
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <div
        className={cn(
          'absolute -left-32 top-[-10%] h-[38rem] w-[38rem] rounded-full bg-primary/40 blur-[120px] animate-float gpu',
          opacity
        )}
      />
      <div
        className={cn(
          'absolute -right-24 top-1/3 h-[32rem] w-[32rem] rounded-full bg-accent/30 blur-[130px] animate-float gpu',
          opacity
        )}
        style={{ animationDelay: '2s' }}
      />
      <div
        className={cn(
          'absolute bottom-[-20%] left-1/3 h-[30rem] w-[30rem] rounded-full bg-primary-soft/25 blur-[120px] animate-float gpu',
          opacity
        )}
        style={{ animationDelay: '4s' }}
      />
    </div>
  );
}
