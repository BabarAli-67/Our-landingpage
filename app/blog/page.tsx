import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';

import PageHero from '@/components/sections/PageHero';
import Reveal from '@/components/ui/Reveal';
import { blogPosts, getAllCategories } from '@/lib/blog-content';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Blog — AI Development, Mobile Apps & Web Engineering',
  description:
    'Expert guides on AI integration, Flutter vs React Native, custom software costs, Next.js development, and engineering best practices.',
  path: '/blog',
});

export default function BlogPage() {
  const categories = getAllCategories();
  const featured = blogPosts.filter((post) => post.featured);
  const recent = blogPosts.slice(0, 6);

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Engineering insights and technical guides"
        lead="In-depth articles on AI integration, mobile development, web engineering, and the technical decisions behind production software."
      />

      {/* Featured Posts */}
      {featured.length > 0 && (
        <section className="section pt-8">
          <div className="mb-10">
            <h2 className="h-display text-2xl font-bold text-white sm:text-3xl">
              Featured Articles
            </h2>
            <p className="mt-3 text-muted-strong">
              Our most popular guides for building production AI and full-stack systems
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.1}>
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-ink-900/50 backdrop-blur transition-colors hover:border-primary/30">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.imageAlt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="inline-flex rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col p-6">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group-hover:text-primary transition-colors"
                    >
                      <h3 className="text-xl font-semibold text-white line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 flex items-center gap-4 border-t border-white/5 pt-4 text-xs text-muted">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readingTime} min read
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="section pt-12">
        <div className="mb-10">
          <h2 className="h-display text-2xl font-bold text-white sm:text-3xl">All Articles</h2>
          <p className="mt-3 text-muted-strong">
            Technical deep-dives, cost guides, and engineering comparisons
          </p>
        </div>

        <div className="space-y-8">
          {recent.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.05}>
              <article className="group flex flex-col gap-6 overflow-hidden rounded-xl border border-white/10 bg-ink-900/30 p-6 backdrop-blur transition-colors hover:border-primary/30 md:flex-row">
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg md:w-64"
                >
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                <div className="flex flex-1 flex-col">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readingTime} min read
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="group-hover:text-primary mt-3 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-white line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="mt-3 text-sm leading-relaxed text-muted-strong line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-muted"
                      >
                        #{tag.toLowerCase().replace(/\s+/g, '-')}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
