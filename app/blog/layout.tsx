import type { Metadata } from 'next';

import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Blog — AI Development, Mobile Apps & Web Engineering',
  description:
    'In-depth guides on AI integration, Flutter vs React Native, custom software development costs, and engineering best practices from our team.',
  path: '/blog',
});

export default function BlogLayout({ children }: { readonly children: React.ReactNode }) {
  return children;
}
