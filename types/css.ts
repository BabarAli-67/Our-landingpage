import type { CSSProperties } from 'react';

/**
 * React's `CSSProperties` has no index signature, so custom properties are a
 * type error even though they work at runtime. `CSSVars` adds exactly that —
 * `--*` keys only — which keeps the rest of the style object fully checked
 * and avoids reaching for `any` or a cast at every call site.
 */
export type CSSVars = CSSProperties & {
  readonly [key: `--${string}`]: string | number | undefined;
};
