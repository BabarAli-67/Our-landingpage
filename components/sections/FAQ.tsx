import FaqAccordion from '@/components/sections/FaqAccordion';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { faqs } from '@/lib/content';

/**
 * FAQ — Server Component shell around the client accordion.
 *
 * The heading, the left rail and the call-to-action are server-rendered; only
 * the disclosure state lives on the client. The answers are in the static HTML
 * either way, which is what lets `faqSchema()` and the rendered copy stay in
 * agreement for the FAQPage rich result.
 */
export default function FAQ() {
  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Left rail */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            title="Answers, before you ask"
            lead="Everything you need to know about scope, timelines, and how we work. Still curious? We’re one message away."
          />
          <Reveal delay={0.1}>
            <div className="mt-8">
              <LiquidGlassButton href="/contact">Talk to us</LiquidGlassButton>
            </div>
          </Reveal>
        </div>

        <FaqAccordion items={faqs} />
      </div>
    </section>
  );
}
