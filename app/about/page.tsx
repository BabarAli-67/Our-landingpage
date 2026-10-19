import type { Metadata } from 'next';
import { Gauge, HeartHandshake, Layers, Target, type LucideIcon } from 'lucide-react';

import JsonLd from '@/components/seo/JsonLd';
import ContainerScroll from '@/components/sections/ContainerScroll';
import CTASection from '@/components/sections/CTASection';
import PageHero from '@/components/sections/PageHero';
import StatsBand from '@/components/sections/StatsBand';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description:
    'Nexus Dev Studio is a senior software house & AI automation agency. Meet the team and the way we work.',
  path: '/about',
});

interface Value {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly body: string;
}

const values: readonly Value[] = [
  {
    icon: Target,
    title: 'Outcome-obsessed',
    body: 'We optimize for the metric that matters to your business, not lines of code.',
  },
  {
    icon: Layers,
    title: 'Senior by default',
    body: 'No junior hand-offs. The people who scope your work are the people who build it.',
  },
  {
    icon: Gauge,
    title: 'Production from day one',
    body: 'Real environments, real data, real feedback loops — from the first sprint.',
  },
  {
    icon: HeartHandshake,
    title: 'Partners, not vendors',
    body: 'We stay after launch. Most of our work comes from teams we already ship with.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A senior studio for the AI era"
        lead="Nexus Dev Studio is a compact team of engineers and automation specialists building intelligent software for companies that can’t afford to guess."
      />

      <section className="section pt-6" aria-labelledby="craft-title">
        <ContainerScroll
          image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=75"
          imageAlt="The Nexus Dev Studio team reviewing an architecture diagram together"
          titleComponent={
            <SectionHeading
              id="craft-title"
              align="center"
              eyebrow="Our craft"
              title="Small team. Serious systems."
            />
          }
        />
      </section>

      <section className="section pt-0" aria-labelledby="numbers-title">
        <h2 id="numbers-title" className="sr-only">
          Studio by the numbers
        </h2>
        <StatsBand />
      </section>

      <section className="section" aria-labelledby="principles-title">
        <SectionHeading
          id="principles-title"
          eyebrow="What we believe"
          title="Principles that survive contact with deadlines"
          className="mb-12"
        />
        <ul className="grid gap-5 sm:grid-cols-2">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Reveal as="li" key={value.title} delay={(index % 2) * 0.08}>
                <SpotlightCard
                  className="h-full"
                  glow={index % 2 ? 'accent' : 'primary'}
                >
                  <div className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/5 text-accent-soft ring-1 ring-white/10">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        {value.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-strong">
                        {value.body}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </ul>
      </section>

      <CTASection
        eyebrow="Work with us"
        title="Let’s build something worth talking about"
      />

      <JsonLd
        id="ld-about"
        nodes={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ]}
      />
    </>
  );
}
