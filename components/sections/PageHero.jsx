import AmbientLiquid from '@/components/ui/AmbientLiquid';
import Reveal from '@/components/ui/Reveal';

/**
 * PageHero — consistent top-of-page hero for inner routes.
 * Compact, no pinned scroll — keeps inner pages fast and predictable.
 */
export default function PageHero({ eyebrow, title, lead, children }) {
  return (
    <section className="relative overflow-hidden pt-40">
      <AmbientLiquid intensity="low" />
      <div className="pointer-events-none absolute inset-0 bg-grid-glow bg-grid [mask-image:radial-gradient(ellipse_50%_60%_at_50%_0%,#000,transparent)]" />
      <div className="section relative pb-10 pt-0">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {eyebrow ? (
            <Reveal>
              <span className="eyebrow mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {eyebrow}
              </span>
            </Reveal>
          ) : null}
          <Reveal delay={0.05}>
            <h1 className="h-display text-balance text-white">{title}</h1>
          </Reveal>
          {lead ? (
            <Reveal delay={0.1}>
              <p className="mt-5 text-lg leading-relaxed text-slate-400">{lead}</p>
            </Reveal>
          ) : null}
          {children ? <Reveal delay={0.15}>{children}</Reveal> : null}
        </div>
      </div>
    </section>
  );
}
