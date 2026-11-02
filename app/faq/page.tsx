import type { Metadata } from 'next';

import JsonLd from '@/components/seo/JsonLd';
import FAQ from '@/components/sections/FAQ';
import CTASection from '@/components/sections/CTASection';
import PageHero from '@/components/sections/PageHero';
import { breadcrumbSchema, buildMetadata, faqSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Frequently Asked Questions',
  description:
    'Answers about scope, timelines, pricing, AI integrations, and how Nexus Dev Studio works — before you need to ask.',
  path: '/faq',
});

/**
 * FAQ standalone page — also renders the FAQ section on the homepage, but
 * having a dedicated /faq route lets Google index and surface the FAQ rich
 * result for informational queries independently of the homepage.
 */
export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        lead="Everything you need to know about our process, pricing, and the kind of work we take on."
      />

      <FAQ />

      <CTASection
        eyebrow="Still have questions?"
        title="We're one message away"
        lead="Scope your project with us — no commitment, no surprises."
      />

      <JsonLd
        id="ld-faq-page"
        nodes={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'FAQ', path: '/faq' },
          ]),
          faqSchema(),
        ]}
      />
    </>
  );
}
