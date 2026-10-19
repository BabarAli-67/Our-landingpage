/**
 * SkipLink — the first focusable element on the page.
 *
 * The header is `position: fixed` and holds seven controls, so a keyboard or
 * screen-reader visitor otherwise traverses the entire navigation on every
 * page before reaching content. Visually hidden until focused, then pinned
 * below the navbar so it is actually readable.
 *
 * Server Component — `href="#main"` needs no JavaScript.
 */
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-ink-950 focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      Skip to main content
    </a>
  );
}
