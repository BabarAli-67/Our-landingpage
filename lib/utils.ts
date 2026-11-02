import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn — merge conditional class names and de-dupe Tailwind conflicts.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** clamp a number between min and max */
export const clamp = (v: number, min: number, max: number): number =>
  Math.min(Math.max(v, min), max);

/** map a value from one range to another */
export const mapRange = (
  v: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => outMin + ((v - inMin) * (outMax - outMin)) / (inMax - inMin);

/**
 * Stable per-item animation delay, in seconds, expressed as a CSS value.
 * Keeps the stagger maths out of the components and the value typed.
 */
export const staggerDelay = (index: number, step = 0.08, columns = 3): string =>
  `${((index % columns) * step).toFixed(3)}s`;
