import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import type { ReactNode } from 'react';

import './globals.css';

import SkipLink from '@/components/a11y/SkipLink';
import DeferredAnalytics from '@/components/analytics/DeferredAnalytics';
import JsonLd from '@/components/seo/JsonLd';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/sections/Navbar';
import RevealRuntime from '@/components/ui/RevealRuntime';
import { organisationSchema, websiteSchema } from '@/lib/seo';
import { siteConfig } from '@/lib/site.config';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700'],
  preload: true,
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
  weight: ['400', '500', '600'],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    'AI engineering studio',
    'full-stack development',
    'custom LLM integration',
    'agentic AI',
    'workflow automation',
    'Next.js development',
    'Flutter app development',
    'custom CRM development',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    locale: 'en_GB',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: siteConfig.logo,
    apple: siteConfig.logo,
  },
  formatDetection: { telephone: true, address: false, email: true },
};

export const viewport: Viewport = {
  themeColor: '#0F0F11',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  // Deliberately NOT setting maximumScale/userScalable — capping zoom fails
  // the `meta-viewport` accessibility audit.
};

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    <html
      lang="en-GB"
      // `data-reveal-js` is static markup, so the scroll-reveal start state is
      // in the first paint with no flash and no inline script. The <noscript>
      // rule below reverses it when scripting is unavailable.
      data-reveal-js=""
      className={`${jakarta.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: '[data-reveal]{opacity:1!important;animation:none!important}',
            }}
          />
        </noscript>

        <SkipLink />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />

        <RevealRuntime />
        <DeferredAnalytics />
        <JsonLd nodes={[organisationSchema(), websiteSchema()]} id="ld-site" />
      </body>
    </html>
  );
}
