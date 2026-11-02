import type { SiteConfig } from '@/types';

/**
 * Global site configuration — brand, nav, contact, socials.
 * Single source of truth consumed by Navbar, Footer, metadata and JSON-LD.
 */
const WHATSAPP_NUMBER = '447495928636';
const WHATSAPP_QUOTE_TEXT =
  'Hi Nexus Dev Studio — I want to discuss an AI / full-stack product build.';

export const siteConfig: SiteConfig = {
  name: 'Nexus Dev Studio',
  legalName: 'Nexus Dev Studio',
  tagline: 'AI Engineering & Full-Stack Development.',
  description:
    'Custom AI chatbots, Flutter apps, Next.js web platforms, and workflow automation built by senior engineers.',
  url: 'https://www.nexusdevstudio.tech',
  email: 'info.nexusdevstudio@gmail.com',
  phone: '+44 7495 928636',
  /** Replace with your real Fiverr profile URL */
  fiverrUrl: 'https://www.fiverr.com/hanzla_sajid00',
  /** Digits only for wa.me links */
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}`,
  whatsappQuoteUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_QUOTE_TEXT
  )}`,
  // Single-page landing — nav links scroll to sections on the home page.
  nav: [
    { label: 'Services', href: '/#services' },
    { label: 'Work', href: '/#work' },
    { label: 'Why Us', href: '/#why-us' },
    { label: 'Process', href: '/#process' },
    { label: 'Reviews', href: '/#reviews' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Start Build', href: '/#contact' },
  ],
  cta: {
    label: 'Start a Build',
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      WHATSAPP_QUOTE_TEXT
    )}`,
    external: true,
  },
  socials: [
    { label: 'LinkedIn', href: 'http://linkedin.com/company/nexusdevstudio' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@nexus.devstudio' },
    { label: 'Instagram', href: 'https://www.instagram.com/nexus.devstudio/' },
    { label: 'Facebook', href: 'https://web.facebook.com/devnexusstudio' },
  ],
  // Brand mark — transparent PNG (JPEG kept as source backup)
  logo: '/assets/logo.png',
  // Shared OpenGraph / Twitter card image.
  ogImage: '/assets/banner-image.jpg',
  // Public Spline scene URL — swap for your own scene export.
  splineScene: 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode',
  foundingDate: '2023',
  areaServed: [
    'United Kingdom',
    'United States',
    'Germany',
    'Malaysia',
    'Georgia',
    'Pakistan',
  ],
};

/**
 * Opt-in flag for the WebGL hero scene.
 *
 * The Spline runtime is ~1 MB of JavaScript that compiles shaders and runs a
 * render loop on the main thread. It only ever mounted on desktop (it was
 * gated behind `!isMobile`), which is precisely why desktop scored ~65 while
 * mobile scored ~93 on the same page. The hero already ships a visually
 * equivalent animated gold orb as its fallback — that fallback is now the
 * default on every device. Set `NEXT_PUBLIC_ENABLE_SPLINE=true` to opt the
 * WebGL scene back in.
 */
export const SPLINE_ENABLED = process.env.NEXT_PUBLIC_ENABLE_SPLINE === 'true';
