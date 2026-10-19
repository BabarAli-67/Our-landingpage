import type { Metadata } from 'next';
import {
  ArrowUpRight,
  Clock,
  Coins,
  Globe2,
  GraduationCap,
  MapPin,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

import JsonLd from '@/components/seo/JsonLd';
import CTASection from '@/components/sections/CTASection';
import PageHero from '@/components/sections/PageHero';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Careers',
  description:
    'Join Nexus Dev Studio — build agentic AI, automation, and full-stack products with a senior team.',
  path: '/careers',
});

interface Role {
  readonly title: string;
  readonly team: string;
  readonly location: string;
  readonly type: string;
  readonly stack: readonly string[];
}

interface Perk {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly body: string;
}

const roles: readonly Role[] = [
  {
    title: 'Senior Full-Stack Engineer',
    team: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    stack: ['Next.js', 'Node', 'Postgres'],
  },
  {
    title: 'AI / Agent Engineer',
    team: 'AI',
    location: 'Remote',
    type: 'Full-time',
    stack: ['Python', 'LangChain', 'RAG'],
  },
  {
    title: 'Automation Specialist',
    team: 'Automation',
    location: 'Hybrid',
    type: 'Full-time',
    stack: ['n8n', 'Python', 'APIs'],
  },
  {
    title: 'Mobile Engineer',
    team: 'Mobile',
    location: 'Remote',
    type: 'Contract',
    stack: ['React Native', 'Expo'],
  },
  {
    title: 'Product Designer',
    team: 'Design',
    location: 'Remote',
    type: 'Full-time',
    stack: ['Figma', 'Motion', 'Systems'],
  },
];

const perks: readonly Perk[] = [
  {
    icon: Globe2,
    title: 'Remote-first',
    body: 'Work from anywhere with async-friendly rituals.',
  },
  {
    icon: Coins,
    title: 'Top-of-market pay',
    body: 'Compensation benchmarked to senior global rates.',
  },
  {
    icon: GraduationCap,
    title: 'Learning budget',
    body: 'Annual stipend for courses, conferences, and tools.',
  },
  {
    icon: Sparkles,
    title: 'Real ownership',
    body: 'Ship product to production, not tickets to a backlog.',
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build the systems companies run on"
        lead="We hire senior, trust deeply, and ship fast. If you like owning outcomes end-to-end, you’ll feel at home."
      >
        <div className="mt-8">
          <LiquidGlassButton href="#roles" size="lg">
            See open roles
          </LiquidGlassButton>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="why-here-title">
        <SectionHeading
          id="why-here-title"
          eyebrow="Why here"
          title="A team worth joining"
          className="mb-12"
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <Reveal as="li" key={perk.title} delay={index * 0.08}>
                <SpotlightCard
                  className="h-full"
                  glow={index % 2 ? 'accent' : 'primary'}
                >
                  <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-white/5 text-accent-soft ring-1 ring-white/10">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-semibold text-white">{perk.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-strong">
                    {perk.body}
                  </p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </ul>
      </section>

      <section
        id="roles"
        className="section scroll-mt-28 pt-0"
        aria-labelledby="roles-title"
      >
        <SectionHeading
          id="roles-title"
          eyebrow="Open positions"
          title="Roles we’re hiring for"
          className="mb-12"
        />
        <ul className="flex flex-col gap-4">
          {roles.map((role, index) => (
            <Reveal as="li" key={role.title} delay={(index % 3) * 0.06}>
              <a
                href="/contact"
                aria-label={`Apply for ${role.title} — ${role.type}, ${role.location}`}
                className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white">{role.title}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-strong">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin aria-hidden="true" className="h-4 w-4" /> {role.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock aria-hidden="true" className="h-4 w-4" /> {role.type}
                    </span>
                    <span aria-hidden="true" className="text-muted">
                      ·
                    </span>
                    <span>{role.team}</span>
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {role.stack.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <span
                  aria-hidden="true"
                  className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition-colors group-hover:bg-white/10 sm:self-center"
                >
                  Apply
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </section>

      <CTASection
        eyebrow="Don’t see your role?"
        title="We’re always meeting great people"
        lead="Send us your work. If there’s a fit, we’ll make room."
      />

      <JsonLd
        id="ld-careers"
        nodes={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Careers', path: '/careers' },
          ]),
        ]}
      />
    </>
  );
}
