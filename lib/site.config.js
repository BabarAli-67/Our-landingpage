/**
 * Global site configuration — brand, nav, contact, socials.
 * Single source of truth consumed by Navbar, Footer, and metadata.
 */
const WHATSAPP_NUMBER = '447495928636';
const WHATSAPP_QUOTE_TEXT =
  'Hi Nexus Dev Studio — I want to discuss an AI / full-stack product build.';

export const siteConfig = {
  name: 'Nexus Dev Studio',
  tagline: 'AI Engineering & Full-Stack Development.',
  description:
    'Nexus Dev Studio is a high-performance AI engineering & full-stack studio. We build intelligent digital products, automate business workflows, and scale modern platforms — from custom LLM systems to production-grade web and mobile apps.',
  url: 'https://nexusdevstudio.com',
  email: 'hello@nexusdevstudio.com',
  phone: '+44 7495 928636',
  /** Replace with your real Fiverr profile URL */
  fiverrUrl: 'https://www.fiverr.com/hanzla_sajid00',
  /** Digits only for wa.me links */
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}`,
  whatsappQuoteUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_QUOTE_TEXT)}`,
  // Single-page landing — nav links scroll to sections on the home page.
  nav: [
    { label: 'Platforms', href: '/#web' },
    { label: 'Apps', href: '/#apps' },
    { label: 'Why Us', href: '/#why-us' },
    { label: 'Process', href: '/#process' },
    { label: 'Reviews', href: '/#reviews' },
    { label: 'Start Build', href: '/#contact' },
  ],
  cta: {
    label: 'Start a Build',
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_QUOTE_TEXT)}`,
    external: true,
  },
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'X', href: 'https://x.com' },
  ],
  // Brand mark — drop file at public/assets/logo.jpeg (or update this path)
  logo: '/assets/logo.jpeg',
  // Public Spline scene URL — swap for your own scene export.
  splineScene: 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode',
};
