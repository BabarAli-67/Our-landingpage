import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react';

import JsonLd from '@/components/seo/JsonLd';
import ContactForm from '@/components/sections/ContactForm';
import PageHero from '@/components/sections/PageHero';
import Reveal from '@/components/ui/Reveal';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site.config';

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    'Start a project with Nexus Dev Studio. Tell us what you’re building or automating.',
  path: '/contact',
});

interface Channel {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly value: string;
  readonly href?: string;
}

const channels: readonly Channel[] = [
  {
    icon: Mail,
    label: 'Email',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s+/g, '')}`,
  },
  { icon: Clock, label: 'Response time', value: 'Within 1 business day' },
  { icon: MapPin, label: 'Working', value: 'Remote · Global' },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s scope your project"
        lead="Tell us what’s slowing you down. We’ll come back with the fastest sensible path to shipping it."
      />

      <section
        className="section grid gap-10 pt-8 lg:grid-cols-[1fr_1.4fr]"
        aria-labelledby="contact-channels-title"
      >
        <div className="flex flex-col gap-4">
          <h2 id="contact-channels-title" className="sr-only">
            Ways to reach us
          </h2>
          {channels.map((channel, index) => {
            const Icon = channel.icon;
            const inner = (
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur transition-colors hover:border-white/20">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 text-accent-soft ring-1 ring-white/10">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted">
                    {channel.label}
                  </p>
                  <p className="text-sm font-medium text-white">{channel.value}</p>
                </div>
              </div>
            );
            return (
              <Reveal key={channel.label} delay={index * 0.06}>
                {channel.href ? (
                  <a
                    href={channel.href}
                    aria-label={`${channel.label}: ${channel.value}`}
                    className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </section>

      <JsonLd
        id="ld-contact"
        nodes={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ]}
      />
    </>
  );
}
