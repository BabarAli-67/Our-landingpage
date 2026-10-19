import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Facebook, Instagram, type LucideIcon } from 'lucide-react';

import { siteConfig } from '@/lib/site.config';
import type { NavItem, SocialLink } from '@/types';

const serviceLinks: readonly NavItem[] = [
  { label: 'Web App Development', href: '/#services' },
  { label: 'Mobile App Development', href: '/#services' },
  { label: 'AI & Intelligent Integration', href: '/#services' },
  { label: 'Workflow Automation & CRM', href: '/#services' },
  { label: 'CMS & WordPress', href: '/#services' },
  { label: 'SEO & Performance', href: '/#services' },
];

const companyLinks: readonly NavItem[] = [
  { label: 'Featured Work', href: '/#work' },
  { label: 'Why Us', href: '/#why-us' },
  { label: 'Our Process', href: '/#process' },
  { label: 'Client Reviews', href: '/#reviews' },
];

const linkCls = 'text-sm text-muted-strong transition-colors hover:text-primary';
const headingCls =
  'mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted';

function TikTokIcon({ className }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.16 15.2 6.34 6.34 0 0 0 9.5 21.54a6.34 6.34 0 0 0 6.34-6.34V8.81a8.19 8.19 0 0 0 4.76 1.52V6.9a4.85 4.85 0 0 1-1.01-.21z" />
    </svg>
  );
}

const socialIcons: Record<SocialLink['label'], LucideIcon | typeof TikTokIcon> = {
  Instagram,
  Facebook,
  TikTok: TikTokIcon,
};

/**
 * Footer — Server Component (unchanged in that respect), migrated to TSX.
 *
 * Accessibility: the two link columns are now real `<nav>` landmarks labelled
 * by their headings, and `text-slate-500` has been replaced by the `muted`
 * token — at 4.02:1 on this background it failed WCAG AA for normal text,
 * which was one of the accessibility-score blockers.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-primary/15">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-aurora bg-aurora animate-aurora"
      />

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:py-12">
        <div className="grid grid-cols-1 items-start gap-6 text-left md:grid-cols-12 md:gap-10">
          {/* Brand — md:col-span-4 */}
          <div className="flex flex-col gap-4 md:col-span-4">
            <Link
              href="/"
              aria-label={`${siteConfig.name} — home`}
              className="inline-flex w-fit items-center rounded-lg bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={96}
                height={96}
                className="h-12 w-12 bg-transparent object-contain"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-strong">
              {siteConfig.description}
            </p>
          </div>

          {/* Services — md:col-span-3 */}
          <nav aria-labelledby="footer-services" className="md:col-span-3">
            <h2 id="footer-services" className={headingCls}>
              Services
            </h2>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkCls}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company — md:col-span-2 */}
          <nav aria-labelledby="footer-company" className="md:col-span-2">
            <h2 id="footer-company" className={headingCls}>
              Company
            </h2>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkCls}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact — md:col-span-3 */}
          <div className="md:col-span-3">
            <h2 className={headingCls}>Contact</h2>

            <div className="flex flex-col items-start gap-3">
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available for new builds
              </p>

              <a
                href={siteConfig.whatsappQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit max-w-full items-center gap-2 whitespace-nowrap rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Get a quote on WhatsApp
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm text-muted transition-colors hover:text-primary"
              >
                {siteConfig.email}
              </a>

              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Message us on WhatsApp at ${siteConfig.phone}`}
                className="text-sm text-muted transition-colors hover:text-primary"
              >
                {siteConfig.phone}
              </a>

              <ul className="mt-1 flex items-center gap-2.5">
                {siteConfig.socials.map(({ label, href }) => {
                  const Icon = socialIcons[label];
                  return (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${siteConfig.name} on ${label}`}
                        className="grid h-9 w-9 place-items-center rounded-full border border-primary/20 bg-ink-800 text-slate-300 transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-primary/10 pt-6 text-sm text-muted sm:flex-row sm:items-center">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className={linkCls}>
              Privacy
            </Link>
            <Link href="/terms" className={linkCls}>
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
