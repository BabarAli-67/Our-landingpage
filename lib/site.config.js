/**
 * Global site configuration — brand, nav, contact, socials.
 * Single source of truth consumed by Navbar, Footer, and metadata.
 */
export const siteConfig = {
  name: 'FlashLLCTech',
  tagline: 'We engineer intelligent software.',
  description:
    'FlashLLCTech is a high-end software house & AI automation agency building agentic AI, enterprise automation, custom CRMs, and full-stack web & mobile products.',
  url: 'https://flashllctech.com',
  email: 'hello@flashllctech.com',
  phone: '+1 (555) 021-8890',
  // Single-page landing — nav links scroll to sections on the home page.
  nav: [
    { label: 'About', href: '/#about' },
    { label: 'Services', href: '/#services' },
    { label: 'Work', href: '/#selected-work' },
    { label: 'Results', href: '/#results' },
    { label: 'FAQ', href: '/#faq' },
  ],
  cta: { label: 'Start a project', href: '/#contact' },
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'X', href: 'https://x.com' },
  ],
  // Public Spline scene URL — swap for your own scene export.
  splineScene: 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode',
};
