import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Instagram, Facebook } from 'lucide-react';
import { siteConfig } from '@/lib/site.config';

const serviceLinks = [
  { label: 'Web App Development', href: '/#services' },
  { label: 'Mobile App Development', href: '/#services' },
  { label: 'AI & Intelligent Integration', href: '/#services' },
  { label: 'Workflow Automation & CRM', href: '/#services' },
  { label: 'CMS & WordPress', href: '/#services' },
  { label: 'SEO & Performance', href: '/#services' },
];

const companyLinks = [
  { label: 'Featured Work', href: '/#web' },
  { label: 'Why Us', href: '/#why-us' },
  { label: 'Our Process', href: '/#process' },
  { label: 'Client Reviews', href: '/#reviews' },
];

const linkCls =
  'text-sm text-slate-400 transition-colors hover:text-primary';
const headingCls =
  'mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500';

const socialIcons = {
  Instagram,
  Facebook,
  TikTok: TikTokIcon,
};

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-primary/15">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-aurora bg-aurora animate-aurora" />

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:py-12">
        <div className="grid grid-cols-1 items-start gap-6 text-left md:grid-cols-12 md:gap-10">
          {/* Brand — md:col-span-4 */}
          <div className="flex flex-col gap-4 md:col-span-4">
            <Link href="/" className="inline-flex w-fit items-center bg-transparent">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={96}
                height={96}
                className="h-12 w-12 bg-transparent object-contain"
                style={{ background: 'transparent' }}
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              {siteConfig.description}
            </p>
          </div>

          {/* Services — md:col-span-3 */}
          <div className="md:col-span-3">
            <h3 className={headingCls}>Services</h3>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkCls}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company — md:col-span-2 */}
          <div className="md:col-span-2">
            <h3 className={headingCls}>Company</h3>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkCls}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — md:col-span-3 */}
          <div className="md:col-span-3">
            <h3 className={headingCls}>Contact</h3>

            <div className="flex flex-col items-start gap-3">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available for new builds
              </div>

              <a
                href={siteConfig.whatsappQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit max-w-full items-center gap-2 whitespace-nowrap rounded-lg bg-[#D4AF37] px-4 py-2.5 text-sm font-semibold text-[#0F0F11] transition-colors hover:bg-[#E5C158]"
              >
                Get a quote on WhatsApp
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm text-slate-500 transition-colors hover:text-primary"
              >
                {siteConfig.email}
              </a>

              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-500 transition-colors hover:text-primary"
              >
                {siteConfig.phone}
              </a>

              <div className="mt-1 flex items-center gap-2.5">
                {siteConfig.socials.map(({ label, href }) => {
                  const Icon = socialIcons[label];
                  if (!Icon) return null;
                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid h-9 w-9 place-items-center rounded-full border border-primary/20 bg-ink-800 text-slate-300 transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-primary/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Nexus Dev Studio. All rights reserved.
          </p>
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

function TikTokIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.16 15.2 6.34 6.34 0 0 0 9.5 21.54a6.34 6.34 0 0 0 6.34-6.34V8.81a8.19 8.19 0 0 0 4.76 1.52V6.9a4.85 4.85 0 0 1-1.01-.21z" />
    </svg>
  );
}
