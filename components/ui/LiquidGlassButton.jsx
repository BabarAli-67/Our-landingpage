'use client';

import Link from 'next/link';
import { motion, useMotionTemplate } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useMousePosition } from '@/hooks/useMousePosition';

// framer-motion v11: create the custom motion component once, at module scope
// (motion(Link) inline is deprecated and re-creates the component each render).
const MotionLink = motion.create(Link);

/**
 * LiquidGlassButton
 * ------------------------------------------------------------------
 * Premium glass control with:
 *  - backdrop-blur frosted body
 *  - chromatic-aberration edge (.liquid-edge ::before gradient border)
 *  - a pointer-tracked specular highlight (liquid micro-interaction)
 *  - magnetic pull on the inner label
 *  - shimmer sweep on hover
 *
 * Renders as <Link> when `href` is passed, otherwise a <button>.
 * GPU-only transforms (translate/scale) — never animates layout.
 */
export default function LiquidGlassButton({
  children,
  href,
  onClick,
  variant = 'primary', // 'primary' | 'accent' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  className,
  type = 'button',
  ...props
}) {
  const { ref, x, y, onMouseMove, reset } = useMousePosition({
    stiffness: 220,
    damping: 18,
  });

  // Specular highlight follows the pointer across the surface.
  const glowX = useMotionTemplate`calc(${x}px * 40 + 50%)`;
  const glowY = useMotionTemplate`calc(${y}px * 40 + 50%)`;
  const highlight = useMotionTemplate`radial-gradient(120px circle at ${glowX} ${glowY}, rgba(255,255,255,0.25), transparent 60%)`;
  // Magnetic label offset (subtle).
  const labelX = useMotionTemplate`calc(${x}px * 10px)`;
  const labelY = useMotionTemplate`calc(${y}px * 10px)`;

  const sizes = {
    sm: 'h-10 px-4 text-sm',
    md: 'h-12 px-6 text-sm',
    lg: 'h-14 px-8 text-base',
  };

  const variants = {
    primary:
      'bg-primary text-ink-950 shadow-glow hover:bg-primary-soft',
    accent:
      'bg-transparent text-primary border border-primary/40 hover:bg-primary/10 hover:border-primary',
    ghost: 'bg-ink-800/80 text-slate-100 border border-white/10 hover:border-primary/30 hover:text-white',
  };

  const Comp = href ? MotionLink : motion.button;
  const compProps = href ? { href, onClick } : { type, onClick };

  return (
    <Comp
      {...compProps}
      {...props}
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'liquid-edge group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-xl font-medium',
        'transition-colors duration-300 gpu cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950',
        sizes[size],
        variants[variant],
        className
      )}
    >
      {/* pointer-tracked specular highlight */}
      <motion.span
        aria-hidden
        style={{ background: highlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {/* shimmer sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      {/* magnetic label — pass icons as children, e.g. <ArrowRight className="h-4 w-4" /> */}
      <motion.span
        style={{ x: labelX, y: labelY }}
        className="relative z-10 inline-flex items-center gap-2 [&_svg]:h-4 [&_svg]:w-4"
      >
        {children}
      </motion.span>
    </Comp>
  );
}
