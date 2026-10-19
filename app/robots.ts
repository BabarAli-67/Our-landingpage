import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/site.config';

/**
 * robots.txt — served at /robots.txt.
 *
 * Lighthouse's SEO category audits that a valid robots.txt exists and parses;
 * there was none before, and no sitemap reference for crawlers to follow.
 */
export default function robots(): MetadataRoute.Robots {
  const sitemap = new URL('/sitemap.xml', siteConfig.url).toString();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Nothing user-facing lives under /api; it is the contact webhook relay.
        disallow: ['/api/'],
      },
    ],
    sitemap,
    host: siteConfig.url,
  };
}
