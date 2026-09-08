/**
 * Global site configuration — brand, nav, contact, socials.
 * Single source of truth consumed by Navbar, Footer, and metadata.
 */
const WHATSAPP_NUMBER = '447495928636';
const WHATSAPP_QUOTE_TEXT =
  'Hi Nexus Dev Studio — I want a quote for a website / mobile app project.';

export const siteConfig = {
  name: 'Nexus Dev Studio',
  tagline: 'Websites & Mobile Apps.',
  description:
    'Nexus Dev Studio builds high-converting websites and mobile apps — one team, both services, from idea to launch.',
  url: 'https://nexusdevstudio.com',
  email: 'hello@nexusdevstudio.com',
  phone: '+44 7495 928636',
  /** Digits only for wa.me links */
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}`,
  whatsappQuoteUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_QUOTE_TEXT)}`,
  // Single-page landing — nav links scroll to sections on the home page.
  nav: [
    { label: 'Web', href: '/#web' },
    { label: 'Apps', href: '/#apps' },
    { label: 'Why Us', href: '/#why-us' },
    { label: 'Process', href: '/#process' },
    { label: 'Get Quote', href: '/#contact' },
  ],
  cta: {
    label: 'Get a Quote',
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_QUOTE_TEXT)}`,
    external: true,
  },
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'X', href: 'https://x.com' },
  ],
  // Public Spline scene URL — swap for your own scene export.
  splineScene: 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode',
};
