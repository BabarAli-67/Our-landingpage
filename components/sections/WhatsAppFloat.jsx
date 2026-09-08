'use client';

import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/lib/site.config';

/**
 * Floating WhatsApp — always-on conversion shortcut (Poster → LP → WhatsApp).
 */
export default function WhatsAppFloat() {
  return (
    <a
      href={siteConfig.whatsappQuoteUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 cursor-pointer place-items-center rounded-full bg-[#25D366] text-white shadow-elevate transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" />
    </a>
  );
}
