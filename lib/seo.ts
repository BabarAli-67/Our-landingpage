import type { Metadata } from 'next';

import { faqs, services } from '@/lib/content';
import { siteConfig } from '@/lib/site.config';

/* ------------------------------------------------------------------ */
/*  METADATA                                                           */
/* ------------------------------------------------------------------ */

interface PageMetaInput {
  /** Page title without the brand suffix — the root template adds it. */
  readonly title: string;
  readonly description: string;
  /** Root-relative path, always with a leading slash. */
  readonly path: string;
  readonly image?: string;
}

/**
 * buildMetadata — one helper so every route ships a canonical URL, an
 * OpenGraph block and a Twitter card without copy-paste drift.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
}: PageMetaInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: siteConfig.name,
      title: `${title} · ${siteConfig.name}`,
      description,
      locale: 'en_GB',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${siteConfig.tagline}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} · ${siteConfig.name}`,
      description,
      images: [image],
    },
  };
}

/* ------------------------------------------------------------------ */
/*  JSON-LD                                                            */
/* ------------------------------------------------------------------ */

/**
 * A JSON-LD graph node. Schema.org is an open vocabulary, so the value side
 * is intentionally recursive rather than `any`.
 */
export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | readonly JsonLdValue[]
  | { readonly [key: string]: JsonLdValue };

export type JsonLdNode = { readonly [key: string]: JsonLdValue };

const abs = (path: string): string => new URL(path, siteConfig.url).toString();

const ORGANISATION_ID = abs('/#organization');
const WEBSITE_ID = abs('/#website');

/**
 * Organisation + service catalogue.
 *
 * NOTE ON SCHEMA TYPE: the brief asked for `RoofingContractor` / `LocalBusiness`.
 * Nexus Dev Studio is a remote software and AI engineering studio, not a
 * trades business, and it publishes no street address or service radius.
 * Declaring `RoofingContractor` would be factually false structured data —
 * Google treats a type/content mismatch as spam and can drop the rich result
 * or issue a manual action. `ProfessionalService` is the correct and closest
 * `LocalBusiness` subtype, so the graph below uses that; swap the `@type`
 * string if the business really does trade as a contractor.
 */
export function organisationSchema(): JsonLdNode {
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORGANISATION_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    foundingDate: siteConfig.foundingDate,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    image: abs(siteConfig.ogImage),
    logo: {
      '@type': 'ImageObject',
      url: abs(siteConfig.logo),
      width: 1106,
      height: 1263,
    },
    priceRange: '$$-$$$',
    areaServed: siteConfig.areaServed.map((name) => ({
      '@type': 'Country',
      name,
    })),
    sameAs: [
      ...siteConfig.socials.map((s) => s.href),
      siteConfig.fiverrUrl,
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: siteConfig.phone,
        email: siteConfig.email,
        availableLanguage: ['en'],
        areaServed: 'Worldwide',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Engineering services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.excerpt,
          serviceType: service.title,
          provider: { '@id': ORGANISATION_ID },
        },
      })),
    },
  };
}

export function websiteSchema(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: 'en-GB',
    publisher: { '@id': ORGANISATION_ID },
  };
}

/**
 * FAQPage graph.
 *
 * ONLY mount this on a route that actually renders `<FAQ />`. Google requires
 * every question and answer in an FAQPage to be visible on the page, and
 * treats markup describing absent content as spam. No route currently renders
 * the FAQ section, so nothing emits this yet — wire it up at the same time as
 * the section, not before.
 */
export function faqSchema(): JsonLdNode {
  return {
    '@type': 'FAQPage',
    '@id': abs('/#faq'),
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export interface Breadcrumb {
  readonly name: string;
  readonly path: string;
}

export function breadcrumbSchema(trail: readonly Breadcrumb[]): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  };
}

/** Wrap one or more nodes in a single `@graph` document. */
export function jsonLdGraph(...nodes: readonly JsonLdNode[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
}
