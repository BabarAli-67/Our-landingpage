import type { Metadata } from 'next';

import PageHero from '@/components/sections/PageHero';
import LegalDocument, { type LegalSection } from '@/components/sections/LegalDocument';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site.config';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: `How ${siteConfig.name} collects, uses and protects the information you share with us.`,
  path: '/privacy',
});

/**
 * Privacy policy.
 *
 * The footer linked to /privacy and /terms on every page, and neither route
 * existed — two site-wide 404s. These pages are a factual starting point
 * written from what the site actually does (a contact form that posts to a
 * webhook, no analytics unless an env var is set); have a lawyer review the
 * wording before launch, and add the specific processors once they are chosen.
 */
const sections: readonly LegalSection[] = [
  {
    heading: 'What we collect',
    body: [
      `We collect only what you choose to send us. When you submit the project brief on our contact page we receive your name, email address, the service you selected, an optional budget range and your message. When you contact us on WhatsApp or by email, we receive whatever that conversation contains.`,
      `We do not run advertising trackers, we do not sell data, and we do not build visitor profiles. Analytics are disabled on this site unless explicitly configured, and if enabled they are limited to aggregate page-level measurement.`,
    ],
  },
  {
    heading: 'Why we use it',
    body: [
      `To reply to your enquiry, scope and quote work, and keep a record of the engagement. That is the entirety of the purpose. We rely on your consent when you submit the form and on legitimate interest in responding to a business enquiry.`,
    ],
  },
  {
    heading: 'Who we share it with',
    body: [
      `Form submissions are delivered to our own customer-relationship tooling so that a human sees them. We use ordinary infrastructure providers — hosting, email — who process data on our behalf under their own data-processing terms. We do not share your enquiry with anyone else.`,
    ],
  },
  {
    heading: 'How long we keep it',
    body: [
      `Enquiries that do not become projects are removed within 24 months. Records relating to work we carried out are kept for as long as we are required to for tax and contractual purposes.`,
    ],
  },
  {
    heading: 'Your rights',
    body: [
      `You can ask us for a copy of what we hold about you, ask us to correct it, or ask us to delete it. Email ${siteConfig.email} and we will respond within 30 days. If you are in the UK or EU you also have the right to complain to your data protection authority.`,
    ],
  },
  {
    heading: 'Cookies',
    body: [
      `This site sets no advertising or tracking cookies. Some interface preferences may be stored locally in your own browser; nothing in that storage reaches our servers.`,
    ],
  },
  {
    heading: 'Changes and contact',
    body: [
      `If this policy changes materially we will update the date below. For anything about your data, email ${siteConfig.email} or message us on WhatsApp at ${siteConfig.phone}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lead={`How ${siteConfig.name} handles the information you share with us.`}
      />
      <LegalDocument sections={sections} />
    </>
  );
}
