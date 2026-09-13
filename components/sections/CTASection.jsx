import { ArrowRight, MessageCircle } from 'lucide-react';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import AmbientLiquid from '@/components/ui/AmbientLiquid';
import Reveal from '@/components/ui/Reveal';
import { siteConfig } from '@/lib/site.config';

/**
 * CTASection — WhatsApp conversion band (Landing Page → WhatsApp).
 */
export default function CTASection({
  id,
  eyebrow = 'Start a build',
  title = 'Ready to engineer your next intelligent system?',
  lead = 'Message us on WhatsApp — share the product, workflow, or platform goal. We’ll reply with a clear architecture path and quote.',
}) {
  return (
    <section id={id} className="section">
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] border border-primary/20 bg-ink-800/90 px-6 py-20 text-center backdrop-blur-xl sm:px-16">
          <AmbientLiquid intensity="high" />
          <div className="pointer-events-none absolute inset-0 bg-grid-glow bg-grid [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000,transparent)]" />

          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
            <span className="eyebrow mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {eyebrow}
            </span>
            <h2 className="h-display text-balance text-white">{title}</h2>
            <p className="mt-5 text-lg text-slate-400">{lead}</p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <LiquidGlassButton
                href={siteConfig.whatsappQuoteUrl}
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                Brief us on WhatsApp
              </LiquidGlassButton>
              <LiquidGlassButton
                href={siteConfig.whatsappUrl}
                variant="ghost"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                {siteConfig.phone}
                <ArrowRight className="h-4 w-4" />
              </LiquidGlassButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
