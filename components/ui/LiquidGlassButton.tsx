'use client';

import Link from 'next/link';
import {
  useCallback,
  useRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';

import { cn } from '@/lib/utils';
import type { ButtonVariant, ControlSize } from '@/types';

type Shared = {
  readonly children: ReactNode;
  readonly variant?: ButtonVariant;
  readonly size?: ControlSize;
  readonly className?: string;
};

type AsLink = Shared &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'> & {
    readonly href: string;
    readonly type?: never;
  };

type AsButton = Shared &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children' | 'type'> & {
    readonly href?: undefined;
    readonly type?: 'button' | 'submit' | 'reset';
  };

export type LiquidGlassButtonProps = AsLink | AsButton;

const SIZES: Record<ControlSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-ink-950 shadow-glow hover:bg-primary-soft',
  accent:
    'bg-transparent text-primary border border-primary/40 hover:bg-primary/10 hover:border-primary',
  ghost:
    'bg-ink-800/80 text-slate-100 border border-white/10 hover:border-primary/30 hover:text-white',
};

const BASE = cn(
  'liquid-edge group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-xl font-medium',
  'transition-[colors,transform] duration-300 gpu cursor-pointer active:scale-[0.97]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950'
);

/**
 * LiquidGlassButton
 * ------------------------------------------------------------------
 * Premium glass control with:
 *  - backdrop-blur frosted body
 *  - chromatic-aberration edge (`.liquid-edge` ::before gradient border)
 *  - a pointer-tracked specular highlight (liquid micro-interaction)
 *  - magnetic pull on the inner label
 *  - shimmer sweep on hover
 *
 * Renders as `<Link>` when `href` is passed, otherwise a `<button>`.
 *
 * PERFORMANCE
 * This used to mount `useMousePosition`, which created two `useMotionValue`s
 * and two framer-motion `useSpring`s per button. Each spring is its own rAF
 * loop, so the home page alone started ~20 of them during hydration and
 * dragged framer-motion onto the critical path for a hover effect. Pointer
 * position is now written straight to two unitless custom properties and
 * interpolated by CSS — same highlight, same magnetic label, no animation
 * library, no re-renders, and no rAF loops at rest.
 *
 * BUG FIX: the magnetic offset was previously built as
 * `calc(${x}px * 10px)`, which multiplies two lengths and is invalid CSS, so
 * the label never actually moved. The unitless `--lx/--ly` form below makes
 * the intended micro-interaction work.
 */
export default function LiquidGlassButton(props: LiquidGlassButtonProps) {
  const { children, variant = 'primary', size = 'md', className } = props;
  const ref = useRef<HTMLElement>(null);

  const onMouseMove = useCallback((event: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty(
      '--lx',
      ((event.clientX - rect.left) / rect.width - 0.5).toFixed(4)
    );
    el.style.setProperty(
      '--ly',
      ((event.clientY - rect.top) / rect.height - 0.5).toFixed(4)
    );
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--lx', '0');
    el.style.setProperty('--ly', '0');
  }, []);

  const surface = (
    <>
      {/* pointer-tracked specular highlight */}
      <span
        aria-hidden="true"
        className="liquid-specular pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {/* shimmer sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      {/* magnetic label — pass icons as children, e.g. <ArrowRight className="h-4 w-4" /> */}
      <span className="liquid-label relative z-10 inline-flex items-center gap-2 [&_svg]:h-4 [&_svg]:w-4">
        {children}
      </span>
    </>
  );

  const classes = cn(BASE, SIZES[size], VARIANTS[variant], className);

  if (props.href !== undefined) {
    const { href, children: _children, variant: _v, size: _s, className: _c, ...rest } = props;
    return (
      <Link
        {...rest}
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={classes}
      >
        {surface}
      </Link>
    );
  }

  const {
    children: _children,
    variant: _v,
    size: _s,
    className: _c,
    href: _h,
    type = 'button',
    ...rest
  } = props;

  return (
    <button
      {...rest}
      type={type}
      ref={ref as React.Ref<HTMLButtonElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={classes}
    >
      {surface}
    </button>
  );
}
