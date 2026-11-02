import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';

import JsonLd from '@/components/seo/JsonLd';
import CTASection from '@/components/sections/CTASection';
import { blogPosts, getBlogPostBySlug } from '@/lib/blog-content';
import { breadcrumbSchema, buildMetadata, type JsonLdNode } from '@/lib/seo';
import { siteConfig } from '@/lib/site.config';

interface RouteParams {
  readonly params: { readonly slug: string };
}

export function generateStaticParams(): Array<{ slug: string }> {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: RouteParams): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return { title: 'Article not found' };

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
  });
}

export default function BlogPostPage({ params }: RouteParams) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const publishedDate = new Date(post.publishedAt);
  const updatedDate = post.updatedAt ? new Date(post.updatedAt) : null;

  const articleSchema: JsonLdNode = {
    '@type': 'Article',
    '@id': new URL(`/blog/${post.slug}#article`, siteConfig.url).toString(),
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: new URL(siteConfig.logo, siteConfig.url).toString(),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': new URL(`/blog/${post.slug}`, siteConfig.url).toString(),
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
  };

  return (
    <>
      <article className="section">
        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
        </div>

        {/* Header */}
        <header className="mx-auto max-w-3xl">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
              {post.category}
            </span>
            <div className="flex items-center gap-1.5 text-muted">
              <Calendar className="h-4 w-4" />
              {publishedDate.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
            <div className="flex items-center gap-1.5 text-muted">
              <Clock className="h-4 w-4" />
              {post.readingTime} min read
            </div>
          </div>

          <h1 className="h-display mb-6 text-balance text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="text-lg leading-relaxed text-muted-strong">{post.excerpt}</p>

          {/* Author */}
          <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white/5">
              <User className="absolute inset-0 m-auto h-6 w-6 text-muted" />
            </div>
            <div>
              <div className="font-medium text-white">{post.author.name}</div>
              <div className="text-sm text-muted">{post.author.role}</div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative mx-auto mt-12 aspect-video max-w-4xl overflow-hidden rounded-xl">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-invert mx-auto mt-12 max-w-3xl prose-headings:font-display prose-headings:font-bold prose-h2:mt-12 prose-h2:text-2xl prose-h2:text-white prose-h3:mt-8 prose-h3:text-xl prose-h3:text-white prose-p:leading-relaxed prose-p:text-muted-strong prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-primary prose-pre:bg-ink-900 prose-pre:border prose-pre:border-white/10 prose-ul:text-muted-strong prose-ol:text-muted-strong prose-li:marker:text-primary prose-table:border-collapse prose-th:border prose-th:border-white/10 prose-th:bg-white/5 prose-th:p-3 prose-th:text-left prose-td:border prose-td:border-white/10 prose-td:p-3">
          {post.content.split('\n').map((paragraph, index) => {
            // Simple markdown rendering - in production, use a proper markdown parser
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={index} id={paragraph.slice(3).toLowerCase().replace(/\s+/g, '-')}>
                  {paragraph.slice(3)}
                </h2>
              );
            }
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} id={paragraph.slice(4).toLowerCase().replace(/\s+/g, '-')}>
                  {paragraph.slice(4)}
                </h3>
              );
            }
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              return <p key={index}><strong>{paragraph.slice(2, -2)}</strong></p>;
            }
            if (paragraph.trim() === '') {
              return null;
            }
            return <p key={index}>{paragraph}</p>;
          })}
        </div>

        {/* Tags */}
        <div className="mx-auto mt-12 max-w-3xl border-t border-white/10 pt-8">
          <div className="text-sm font-medium text-white">Related Topics</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-white/5 px-3 py-1.5 text-sm text-muted transition-colors hover:bg-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        {post.author.bio && (
          <div className="mx-auto mt-12 max-w-3xl rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-start gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-white/5">
                <User className="absolute inset-0 m-auto h-8 w-8 text-muted" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white">{post.author.name}</div>
                <div className="text-sm text-muted">{post.author.role}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-strong">
                  {post.author.bio}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Related Posts - Show other featured posts */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="h-display mb-6 text-2xl font-bold text-white">Related Articles</h2>
          <div className="space-y-4">
            {blogPosts
              .filter((p) => p.slug !== post.slug && p.category === post.category)
              .slice(0, 3)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-primary/30"
                >
                  <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.imageAlt}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white transition-colors group-hover:text-primary line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted line-clamp-2">{relatedPost.excerpt}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </article>

      <CTASection
        eyebrow="Ready to start?"
        title="Let's build your project together"
        lead="Get a free technical consultation and project estimate from our engineering team."
      />

      <JsonLd
        id="ld-blog-post"
        nodes={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          articleSchema,
        ]}
      />
    </>
  );
}
