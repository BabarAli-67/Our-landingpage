import { MessageCircle } from 'lucide-react';

import { siteConfig } from '@/lib/site.config';

/**
 * Floating WhatsApp — always-on conversion shortcut (Poster → LP → WhatsApp).
 *
 * Server Component. It was marked `'use client'` but is a static anchor with
 * no state, no effects and no handlers — the directive alone shipped it, and
 * the lucide icon, as a client chunk.
 */
export default function WhatsAppFloat() {
  return (
    <a
      href={siteConfig.whatsappQuoteUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Nexus Dev Studio on WhatsApp"
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 cursor-pointer place-items-center rounded-full bg-[#25D366] text-white shadow-elevate transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
    >
      <MessageCircle aria-hidden="true" className="h-7 w-7" fill="currentColor" />
    </a>
  );
}
