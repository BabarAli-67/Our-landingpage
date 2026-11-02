import { jsonLdGraph, type JsonLdNode } from '@/lib/seo';

export interface JsonLdProps {
  /** One or more schema.org nodes, combined into a single `@graph`. */
  readonly nodes: readonly JsonLdNode[];
  /** Stable element id so the graph is easy to find when debugging. */
  readonly id?: string;
}

/**
 * JsonLd — renders a structured-data graph as `application/ld+json`.
 *
 * Server Component. The payload is serialised at build time and emitted inline
 * in the static HTML, so it costs no request and no main-thread execution — a
 * `<script type="application/ld+json">` is never parsed as JavaScript. This is
 * why it is a plain `<script>` and deliberately not `next/script`, which would
 * route it through the client runtime.
 */
export default function JsonLd({ nodes, id = 'ld-graph' }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // Values come from typed, in-repo config — never user input.
      dangerouslySetInnerHTML={{ __html: jsonLdGraph(...nodes) }}
    />
  );
}
