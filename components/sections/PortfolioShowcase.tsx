import { ArrowUpRight } from 'lucide-react';

import PortfolioGrid from '@/components/portfolio/PortfolioGrid';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { portfolioFilters, portfolioProjects } from '@/lib/content';
import { siteConfig } from '@/lib/site.config';

/**
 * PortfolioShowcase — filterable project grid with AI projects featured first.
 *
 * Server Component shell. The heading, the closing call-to-action and the
 * section landmark are server-rendered; only `PortfolioGrid` (which owns the
 * filter state) is a client island, and the case-study dialog inside it is
 * code-split behind a dynamic import.
 */
export default function PortfolioShowcase() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      {/* Legacy deep-link anchors (/#web, /#apps) kept so existing links and
          QR codes still land in the right place. */}
      <span id="web" className="sr-only" />
      <span id="apps" className="sr-only" />

      <SectionHeading
        id="work-title"
        eyebrow="Selected work"
        title="AI-powered products and platforms we’ve shipped"
        lead="From intelligent matching engines to full-stack web and mobile systems — production builds that compound advantage."
        className="mb-10"
      />

      <PortfolioGrid filters={portfolioFilters} projects={portfolioProjects} />

      <Reveal delay={0.15}>
        <div className="mt-10">
          <a
            href={siteConfig.whatsappQuoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-soft"
          >
            Building something similar? Brief us.
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
