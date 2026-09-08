import { Inter } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/site.config';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';

// self-hosted, subset, swap — zero layout shift, one font file.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: siteConfig.name },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#0a0f1d',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen">
        <SmoothScrollProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
