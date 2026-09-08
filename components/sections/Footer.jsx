import Link from 'next/link';
import { Zap, ArrowUpRight, MessageCircle, Linkedin, Github } from 'lucide-react';
import { siteConfig } from '@/lib/site.config';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';

const serviceLinks = [
  { label: 'Custom Web Apps', href: '/#web' },
  { label: 'Mobile Applications', href: '/#apps' },
  { label: 'UI/UX & Prototyping', href: '/#why-us' },
  { label: 'Backend & APIs', href: '/#process' },
];

const exploreLinks = [
  { label: 'Featured Work', href: '/#web' },
  { label: 'Why Us', href: '/#why-us' },
  { label: 'Our Process', href: '/#process' },
  { label: 'Client Reviews', href: '/#contact' },
];

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: Github,
  },
  {
    label: 'X',
    href: 'https://x.com',
    icon: XIcon,
  },
];

const linkCls = 'text-sm text-slate-300 transition-colors hover:text-cyan-400';
const headingCls =
  'mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400';

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-aurora bg-aurora animate-aurora" />

      <div className="mx-auto max-w-7xl px-6 py-16 pb-28 lg:pr-24">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 — Brand */}
          <div className="flex flex-col">
            <Link href="/" className="mb-4 inline-flex items-center gap-2 text-white">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-aurora bg-aurora animate-aurora shadow-glow">
                <Zap className="h-4 w-4" />
              </span>
              <span className="text-lg font-semibold">Nexus Dev Studio</span>
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-slate-400">
              {siteConfig.description}
            </p>
            <LiquidGlassButton
              href={siteConfig.whatsappQuoteUrl}
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
              Get a quote on WhatsApp
              <ArrowUpRight className="h-4 w-4" />
            </LiquidGlassButton>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h3 className={headingCls}>Services</h3>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkCls}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Explore */}
          <div>
            <h3 className={headingCls}>Explore</h3>
            <ul className="flex flex-col gap-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkCls}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3 className={headingCls}>Contact</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={`mailto:${siteConfig.email}`} className={linkCls}>
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkCls}
                >
                  {siteConfig.phone}
                </a>
              </li>
            </ul>

            <div className="mt-4 flex items-center gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-ink-800 text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for projects
            </div>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="mt-16 flex w-full flex-col items-start justify-between gap-4 border-t border-slate-800 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Nexus Dev Studio. All rights reserved.
          </p>
          <div className="flex gap-6 pr-16 sm:pr-20">
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

function XIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.99 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}
