import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import PageHero from '@/components/sections/PageHero';
import SqueezeCarousel from '@/components/sections/SqueezeCarousel';
import CTASection from '@/components/sections/CTASection';
import SectionHeading from '@/components/ui/SectionHeading';
import WaterRippleImage from '@/components/ui/WaterRippleImage';
import Reveal from '@/components/ui/Reveal';

import { caseStudies } from '@/lib/content';

export const metadata = {
  title: 'Work',
  description: 'Case studies and client outcomes from Nexus Dev Studio.',
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Work that moved a metric"
        lead="A look at the systems we’ve shipped — and what they changed for the teams running them."
      />

      {/* Featured — squeeze carousel */}
      <section className="section pt-10">
        <SqueezeCarousel items={caseStudies} />
      </section>

      {/* Full grid with water-ripple imagery */}
      <section className="section pt-0">
        <SectionHeading eyebrow="More work" title="Recent engagements" className="mb-12" />
        <div className="grid gap-6 md:grid-cols-2">
          {caseStudies.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 2) * 0.08}>
              <Link href={`/work/${c.slug}`} className="group block">
                <WaterRippleImage
                  src={c.image}
                  alt={c.title}
                  width={1200}
                  height={800}
                  className="aspect-[16/10]"
                />
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-slate-500">
                      {c.category}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-white">
                      {c.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">{c.summary}</p>
                  </div>
                  <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-white transition-colors group-hover:bg-white/10">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <span className="mt-3 inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent-soft">
                  {c.result}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
