import type { Metadata } from 'next';

import PageHero from '@/components/sections/PageHero';
import LegalDocument, { type LegalSection } from '@/components/sections/LegalDocument';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site.config';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description: `The terms that apply to this website and to engagements with ${siteConfig.name}.`,
  path: '/terms',
});

/**
 * Terms of service.
 *
 * Like /privacy, this fixes a site-wide broken footer link. It states the
 * terms the site itself implies — notably that the IP position matches what
 * the marketing copy promises ("you own the system"). Have a lawyer review it
 * and align it with your actual contract template before launch.
 */
const sections: readonly LegalSection[] = [
  {
    heading: 'About these terms',
    body: [
      `These terms govern your use of this website. They are not the contract for a project — engagements are governed by a separate written agreement covering scope, fees, timelines and liability, which takes precedence over anything here.`,
    ],
  },
  {
    heading: 'Using this site',
    body: [
      `You may browse this site and contact us through it. Please do not attempt to disrupt it, scrape it at volume, or use it to send unlawful, misleading or abusive content.`,
    ],
  },
  {
    heading: 'Enquiries and quotes',
    body: [
      `Submitting a brief does not create a contract. Indicative figures, timelines and budget bands shown on this site are illustrative, not offers. Work begins only once scope and fees are agreed in writing.`,
    ],
  },
  {
    heading: 'Intellectual property',
    body: [
      `This site, its copy, its design and its brand marks belong to ${siteConfig.name}. Client names, logos and screenshots shown in our work are the property of their respective owners and appear with permission or as fair reference.`,
      `For delivered project work, ownership transfers as set out in your engagement agreement. Our standard position is the one stated across this site: on full payment you own the code, the infrastructure sits in your accounts, and there is no lock-in to us or to any proprietary layer.`,
    ],
  },
  {
    heading: 'Third-party links and services',
    body: [
      `This site links to external platforms — WhatsApp, Fiverr, client websites, social profiles. We do not control them and are not responsible for their content, availability or terms.`,
    ],
  },
  {
    heading: 'No warranty on site content',
    body: [
      `Content here is provided for information. We keep it accurate but make no warranty that it is complete or current, and it is not technical, legal or financial advice. Nothing in these terms limits liability that cannot lawfully be limited.`,
    ],
  },
  {
    heading: 'Governing law and contact',
    body: [
      `These terms are governed by the laws of England and Wales. Questions about them: email ${siteConfig.email} or message us on WhatsApp at ${siteConfig.phone}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        lead={`The terms that apply to this website and to engagements with ${siteConfig.name}.`}
      />
      <LegalDocument sections={sections} />
    </>
  );
}
