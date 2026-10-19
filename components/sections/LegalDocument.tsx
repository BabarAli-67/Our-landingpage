import Reveal from '@/components/ui/Reveal';

export interface LegalSection {
  readonly heading: string;
  readonly body: readonly string[];
}

export interface LegalDocumentProps {
  readonly sections: readonly LegalSection[];
  /** Shown as the "last updated" line. Defaults to the build date. */
  readonly updated?: string;
}

const FORMATTER = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

/**
 * LegalDocument — shared prose layout for /privacy and /terms.
 *
 * Server Component. Headings are `h2` under the page `h1` from `PageHero`, so
 * the heading order stays sequential.
 */
export default function LegalDocument({ sections, updated }: LegalDocumentProps) {
  const stamp = updated ?? FORMATTER.format(new Date());

  return (
    <article className="section max-w-3xl pt-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        Last updated {stamp}
      </p>

      <div className="mt-10 flex flex-col gap-10">
        {sections.map((section, index) => (
          <Reveal key={section.heading} delay={Math.min(index, 4) * 0.05}>
            <section>
              <h2 className="text-xl font-semibold tracking-tight text-white">
                {section.heading}
              </h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="mt-4 text-sm leading-relaxed text-muted-strong"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          </Reveal>
        ))}
      </div>
    </article>
  );
}
