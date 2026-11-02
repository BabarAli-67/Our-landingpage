import type { LucideIcon } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  BLOG TYPES                                                         */
/* ------------------------------------------------------------------ */

export interface BlogPost {
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  readonly content: string;
  readonly author: BlogAuthor;
  readonly publishedAt: string; // ISO 8601 date
  readonly updatedAt?: string; // ISO 8601 date
  readonly readingTime: number; // minutes
  readonly category: BlogCategory;
  readonly tags: readonly string[];
  readonly featured: boolean;
  readonly image: string;
  readonly imageAlt: string;
}

export interface BlogAuthor {
  readonly name: string;
  readonly role: string;
  readonly avatar: string;
  readonly bio?: string;
}

export type BlogCategory =
  | 'AI & Machine Learning'
  | 'Web Development'
  | 'Mobile Development'
  | 'Software Engineering'
  | 'Business & Strategy';

export interface BlogCategoryFilter {
  readonly id: BlogCategory | 'all';
  readonly label: string;
  readonly count: number;
}
