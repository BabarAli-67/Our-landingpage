/**
 * Global site configuration — brand, nav, contact, socials.
 * Single source of truth consumed by Navbar, Footer, and metadata.
 */
const WHATSAPP_NUMBER = '447495928636';
const WHATSAPP_QUOTE_TEXT =
  "Hi Nexus Dev Studio — I've got a problem I need solved (website / app).";

export const siteConfig = {
  name: 'Nexus Dev Studio',
  tagline: 'We solve problems. Then we build them.',
  description:
    'Nexus Dev Studio is a small team that takes a business problem — slow website, no app, a broken process — and ships the fix. One team, start to finish.',
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
    { label: 'Work', href: '/#web' },
    { label: 'Apps', href: '/#apps' },
    { label: 'Why Us', href: '/#why-us' },
    { label: 'Process', href: '/#process' },
    { label: 'Reviews', href: '/#reviews' },
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
