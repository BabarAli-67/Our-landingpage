import Link from 'next/link';
import { Zap, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/site.config';
import { services } from '@/lib/content';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-aurora bg-aurora animate-aurora" />
      <div className="section grain py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2 text-white">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-aurora bg-aurora animate-aurora shadow-glow">
                <Zap className="h-4 w-4" />
              </span>
              <span className="text-lg font-semibold">{siteConfig.name}</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              {siteConfig.description}
            </p>
            <LiquidGlassButton href="/contact" size="sm">
              Book a discovery call
              <ArrowUpRight className="h-4 w-4" />
            </LiquidGlassButton>
          </div>

          <FooterCol title="Company">
            {siteConfig.nav.map((n) => (
              <FooterLink key={n.href} href={n.href}>
                {n.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Services">
            {services.slice(0, 5).map((s) => (
              <FooterLink key={s.slug} href={`/services#${s.slug}`}>
                {s.title}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Connect">
            <FooterLink href={`mailto:${siteConfig.email}`}>{siteConfig.email}</FooterLink>
            <FooterLink href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</FooterLink>
            {siteConfig.socials.map((s) => (
              <FooterLink key={s.label} href={s.href}>
                {s.label}
              </FooterLink>
            ))}
          </FooterCol>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-300">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-300">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {title}
      </h3>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-slate-400 transition-colors hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}
