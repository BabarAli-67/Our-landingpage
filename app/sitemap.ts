import type { MetadataRoute } from 'next';

import { caseStudies } from '@/lib/content';
import { siteConfig } from '@/lib/site.config';

interface Entry {
  readonly path: string;
  readonly priority: number;
  readonly changeFrequency: 'weekly' | 'monthly' | 'yearly';
}

const ROUTES: readonly Entry[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/work', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/careers', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
];

/**
 * sitemap.xml — served at /sitemap.xml and referenced from robots.txt.
 * Includes the dynamic `/work/[slug]` case studies.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const absolute = (path: string): string =>
    new URL(path, siteConfig.url).toString();

  return [
    ...ROUTES.map((route) => ({
      url: absolute(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...caseStudies.map((study) => ({
      url: absolute(`/work/${study.slug}`),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
