import type { MetadataRoute } from 'next';

import { caseStudies, services } from '@/lib/content';
import { blogPosts } from '@/lib/blog-content';
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
  { path: '/faq', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/careers', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
];

/**
 * sitemap.xml — served at /sitemap.xml and referenced from robots.txt.
 * Includes the dynamic `/work/[slug]` case studies and `/services/[slug]`
 * service sub-pages.
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
    ...services.map((service) => ({
      url: absolute(`/services/${service.slug}`),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // Service sub-pages (specific keyword-targeted pages)
    {
      url: absolute('/services/ai-chatbot-development'),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: absolute('/services/nextjs-development'),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: absolute('/services/flutter-app-development'),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: absolute('/services/react-native-development'),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: absolute('/services/custom-software-development'),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    ...caseStudies.map((study) => ({
      url: absolute(`/work/${study.slug}`),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // Blog posts
    ...blogPosts.map((post) => ({
      url: absolute(`/blog/${post.slug}`),
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
  ];
}

