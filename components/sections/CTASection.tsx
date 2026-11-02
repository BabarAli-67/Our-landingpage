import { ArrowRight, MessageCircle } from 'lucide-react';

import AmbientLiquid from '@/components/ui/AmbientLiquid';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import Reveal from '@/components/ui/Reveal';
import { siteConfig } from '@/lib/site.config';

export interface CTASectionProps {
  readonly id?: string;
  readonly eyebrow?: string;
  readonly title?: string;
  readonly lead?: string;
}

/**
 * CTASection — WhatsApp conversion band (Landing Page → WhatsApp).
 * Server Component; only the two button leaves hydrate.
 */
export default function CTASection({
  id,
  eyebrow = 'Start a build',
  title = 'Ready to engineer your next intelligent system?',
  lead = 'Message us on WhatsApp — share the product, workflow, or platform goal. We’ll reply with a clear architecture path and quote.',
}: CTASectionProps) {
  const titleId = id ? `${id}-title` : 'cta-title';

  return (
    <section id={id} className="section" aria-labelledby={titleId}>
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] border border-primary/20 bg-ink-800/90 px-6 py-20 text-center backdrop-blur-xl sm:px-16">
          <AmbientLiquid intensity="high" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-grid-glow bg-grid [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000,transparent)]"
          />

          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
            <span className="eyebrow mb-6">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
              {eyebrow}
            </span>
            <h2 id={titleId} className="h-display text-balance text-white">
              {title}
            </h2>
            <p className="mt-5 text-lg text-muted-strong">{lead}</p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <LiquidGlassButton
                href={siteConfig.whatsappQuoteUrl}
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                Brief us on WhatsApp
              </LiquidGlassButton>
              <LiquidGlassButton
                href={siteConfig.whatsappUrl}
                variant="ghost"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Call or message us on WhatsApp at ${siteConfig.phone}`}
              >
                {siteConfig.phone}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </LiquidGlassButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
