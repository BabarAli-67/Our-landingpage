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
        {/* Left — scrolls with page flow */}
        <div className="min-w-0">
          <SectionHeading
            eyebrow="Why Nexus Dev Studio"
            title="Intelligence in the product. Engineering in the foundation."
            lead="We eliminate operational bottlenecks with custom AI integrations and scalable full-stack systems — giving clients an unfair competitive advantage."
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

        {/* Right — pinned while left content scrolls; releases at section end */}
        <div className="h-fit min-w-0 lg:sticky lg:top-28 lg:self-start">
          <ContainerScroll
            image="/assets/why-us.jpg"
            imageAlt="Nexus Dev Studio — why us platform preview"
          />
        </div>
      </div>
    </section>
  );
}
