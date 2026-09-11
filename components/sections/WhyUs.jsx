'use client';

import { whyUs } from '@/lib/content';
import ContainerScroll from '@/components/sections/ContainerScroll';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

/**
 * WhyUs — Why Choose Us (unified Web + Apps studio).
 */
export default function WhyUs() {
  return (
    <section id="why-us" className="section">
      <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Why choose us"
            title="You bring the problem. We own the fix."
            lead="No account managers, no vague roadmaps — just a small team that scopes it, builds it, and stays after launch."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {whyUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={(i % 2) * 0.08}>
                  <div className="flex flex-col gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.04] text-accent-soft ring-1 ring-white/10">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-base font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-400">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="lg:pt-4">
          <ContainerScroll image="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1400&q=75" />
        </div>
      </div>
    </section>
  );
}
