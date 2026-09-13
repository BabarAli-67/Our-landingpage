import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/site.config';

const serviceLinks = [
  { label: 'AI Engineering', href: '/#why-us' },
  { label: 'Intelligent Platforms', href: '/#web' },
  { label: 'Mobile Product Apps', href: '/#apps' },
  { label: 'Automation & APIs', href: '/#process' },
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

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-primary/15">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-aurora bg-aurora animate-aurora" />

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:py-12">
        <div className="grid grid-cols-1 items-start gap-6 text-left md:grid-cols-12 md:gap-10">
          {/* Brand — md:col-span-4 */}
          <div className="flex flex-col gap-4 md:col-span-4">
            <Link href="/" className="inline-flex w-fit items-center">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={200}
                height={52}
                className="h-11 w-auto object-contain"
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
