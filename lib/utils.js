import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn — merge conditional class names and de-dupe Tailwind conflicts.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** clamp a number between min and max */
export const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

/** map a value from one range to another */
export const mapRange = (v, inMin, inMax, outMin, outMax) =>
  outMin + ((v - inMin) * (outMax - outMin)) / (inMax - inMin);
