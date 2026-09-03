'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqs } from '@/lib/content';
import SectionHeading from '@/components/ui/SectionHeading';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

/**
 * FAQ — accessible single-open accordion.
 * Height/opacity reveal via framer-motion; honors reduced motion through the
 * global CSS (transition durations are collapsed). Buttons are real <button>s
 * with aria-expanded for keyboard + screen-reader support.
 */
export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Left rail */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="FAQ"
            title="Answers, before you ask"
            lead="Everything you need to know about scope, timelines, and how we work. Still curious? We’re one message away."
          />
          <Reveal delay={0.1}>
            <div className="mt-8">
              <LiquidGlassButton href="/contact">
                Talk to us
              </LiquidGlassButton>
            </div>
          </Reveal>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.05}>
                <div
                  className={cn(
                    'overflow-hidden rounded-2xl border transition-colors duration-300',
                    isOpen
                      ? 'border-white/15 bg-white/[0.04]'
                      : 'border-white/[0.08] bg-white/[0.02] hover:border-white/15'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  >
                    <span className="text-base font-medium text-white">
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        'grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-white transition-transform duration-300',
                        isOpen && 'rotate-45 bg-gradient-to-br from-primary to-accent border-transparent'
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-slate-400">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
