import { Mail, Phone, MapPin, Clock } from 'lucide-react';

import PageHero from '@/components/sections/PageHero';
import ContactForm from '@/components/sections/ContactForm';
import Reveal from '@/components/ui/Reveal';
import { siteConfig } from '@/lib/site.config';

export const metadata = {
  title: 'Contact',
  description: 'Start a project with Nexus Dev Studio. Tell us what you’re building or automating.',
};

const channels = [
  { icon: Mail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Phone, label: 'Phone', value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
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

      <section className="section grid gap-10 pt-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col gap-4">
          {channels.map((c, i) => {
            const Icon = c.icon;
            const inner = (
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur transition-colors hover:border-white/20">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 text-accent-soft ring-1 ring-white/10">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500">{c.label}</p>
                  <p className="text-sm font-medium text-white">{c.value}</p>
                </div>
              </div>
            );
            return (
              <Reveal key={c.label} delay={i * 0.06}>
                {c.href ? <a href={c.href}>{inner}</a> : inner}
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}
