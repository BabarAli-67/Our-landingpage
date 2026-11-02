import ContainerScroll from '@/components/sections/ContainerScroll';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { whyUs } from '@/lib/content';
import { siteConfig } from '@/lib/site.config';

const INSTAGRAM_FALLBACK = 'https://www.instagram.com/nexus.devstudio/';

const instagramUrl: string =
  siteConfig.socials.find((social) => social.label === 'Instagram')?.href ??
  INSTAGRAM_FALLBACK;

/**
 * WhyUs — Why Choose Us (unified Web + Apps studio).
 *
 * Server Component. The only hydrated descendant is the `ScrollStage` inside
 * `ContainerScroll`, which drives the tilting device frame.
 */
export default function WhyUs() {
  return (
    <section id="why-us" className="section" aria-labelledby="why-us-title">
      <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* Left — scrolls with page flow */}
        <div className="min-w-0">
          <SectionHeading
            id="why-us-title"
            eyebrow="Why Nexus Dev Studio"
            title="Intelligence in the product. Engineering in the foundation."
            lead="We eliminate operational bottlenecks with custom AI integrations and scalable full-stack systems — giving clients an unfair competitive advantage."
          />

          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {whyUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal as="li" key={item.title} delay={(index % 2) * 0.08}>
                  <div className="flex flex-col gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.04] text-accent-soft ring-1 ring-white/10">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-strong">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ul>

          <Reveal delay={0.12}>
            <div className="mt-10 border-t border-primary/10 pt-6">
              <p className="text-sm leading-relaxed text-muted-strong">
                A team of 4 specialists covering app, AI, web, WordPress and SEO.
              </p>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex text-sm font-medium text-primary transition-colors hover:text-primary-soft"
              >
                Meet the team and see our latest work → Instagram
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right — pinned while left content scrolls; releases at section end */}
        <div className="h-fit min-w-0 lg:sticky lg:top-28 lg:self-start">
          <ContainerScroll
            image="/assets/why-us.jpg"
            imageAlt="Nexus Dev Studio engineering workspace — platform dashboards under review"
            imageSizes="(max-width: 1024px) 100vw, 640px"
          />
        </div>
      </div>
    </section>
  );
}
