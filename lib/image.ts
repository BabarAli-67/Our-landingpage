import { blurFor } from '@/lib/image-placeholders';

/** The subset of `next/image` props that enable a blur-up preview. */
export interface BlurProps {
  readonly placeholder?: 'blur';
  readonly blurDataURL?: string;
}

/**
 * blurProps — spread onto `next/image` to show a blurred preview while the
 * real file loads.
 *
 * `next/image` throws if `placeholder="blur"` is passed without a
 * `blurDataURL`, and only local assets under `public/assets` have one (remote
 * Unsplash URLs are not scanned at build time). Returning an empty object for
 * anything unknown keeps that invariant at the one place it matters instead of
 * at every call site.
 */
export function blurProps(src: string): BlurProps {
  const blurDataURL = blurFor(src);
  return blurDataURL ? { placeholder: 'blur', blurDataURL } : {};
}
