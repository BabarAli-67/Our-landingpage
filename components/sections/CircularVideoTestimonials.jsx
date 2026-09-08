'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Volume2, VolumeX, Pause, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/useReducedMotion';

/**
 * CircularVideoTestimonials
 * ------------------------------------------------------------------
 * A ring of circular video cards. Each card shows a poster + muted,
 * offscreen-paused preview loop; clicking opens an accessible modal with
 * full playback, a sound toggle and play/pause. Real client reviews.
 *
 * Perf: previews only play while in view (IntersectionObserver) and are
 * muted+playsInline; the modal mounts a single full-res <video> on demand.
 */
export default function CircularVideoTestimonials({ items }) {
  const [openId, setOpenId] = useState(null);
  const activeItem = items.find((t) => t.id === openId);

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {items.map((t, i) => (
          <CircleCard key={t.id} item={t} index={i} onOpen={() => setOpenId(t.id)} />
        ))}
      </div>

      <AnimatePresence>
        {activeItem && (
          <VideoModal item={activeItem} onClose={() => setOpenId(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Circular preview card                                             */
/* ------------------------------------------------------------------ */
function CircleCard({ item, index, onOpen }) {
  const videoRef = useRef(null);
  const wrapRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = wrapRef.current;
    const vid = videoRef.current;
    if (!el || !vid) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) vid.play().catch(() => {});
        else vid.pause();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <motion.button
      ref={wrapRef}
      onClick={onOpen}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex flex-col items-center gap-4 outline-none"
      aria-label={`Play video review from ${item.name}, ${item.role}`}
    >
      <div className="relative">
        {/* animated ring */}
        <span className="absolute -inset-1 rounded-full bg-aurora bg-aurora animate-aurora opacity-70 blur-[2px] transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
        <span className="absolute -inset-1 rounded-full ring-2 ring-white/10" />

        <div className="relative aspect-square w-28 overflow-hidden rounded-full border-2 border-ink-900 sm:w-32 md:w-36 gpu">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={item.video}
            poster={item.poster}
            muted
            loop
            playsInline
            preload="none"
          />
          <div className="absolute inset-0 bg-ink-950/20 transition-colors group-hover:bg-ink-950/0" />
          {/* play affordance */}
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-11 w-11 place-items-center rounded-full glass text-white shadow-glow transition-transform duration-300 group-hover:scale-110">
              <Play className="h-4 w-4 translate-x-[1px]" />
            </span>
          </span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold text-white">{item.name}</p>
        <p className="text-xs text-slate-400">{item.role}</p>
      </div>
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  Modal player                                                      */
/* ------------------------------------------------------------------ */
function VideoModal({ item, onClose }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(true);

  // Autoplay with sound intent; browsers may require muted — handle both.
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = false;
    vid.play().then(() => setPlaying(true)).catch(() => {
      vid.muted = true;
      setMuted(true);
      vid.play().catch(() => {});
    });
  }, []);

  // Esc to close + focus trap-ish (lock scroll)
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const toggleMute = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setMuted(vid.muted);
  }, []);

  const togglePlay = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setPlaying(true);
    } else {
      vid.pause();
      setPlaying(false);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] grid place-items-center bg-ink-950/80 p-4 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label={`Video review from ${item.name}`}
    >
      <motion.div
        initial={{ scale: 0.92, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/12 bg-ink-800 shadow-elevate"
      >
        <div className="relative aspect-video w-full bg-black">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={item.video}
            poster={item.poster}
            playsInline
            loop
            onClick={togglePlay}
          />

          {/* controls */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-ink-950/90 to-transparent p-4">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                aria-label={playing ? 'Pause' : 'Play'}
                className="grid h-10 w-10 place-items-center rounded-full glass text-white hover:bg-white/10"
              >
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <button
                onClick={toggleMute}
                aria-label={muted ? 'Unmute' : 'Mute'}
                className="grid h-10 w-10 place-items-center rounded-full glass text-white hover:bg-white/10"
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="relative flex gap-4 p-6">
          <Quote className="h-8 w-8 shrink-0 text-primary-soft" />
          <div>
            <p className="text-lg font-medium leading-relaxed text-white">
              “{item.quote}”
            </p>
            <p className="mt-3 text-sm text-slate-400">
              <span className="font-semibold text-slate-200">{item.name}</span> ·{' '}
              {item.role}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full glass text-white hover:bg-white/10"
        >
          <X className="h-4 w-4" />
        </button>
      </motion.div>
    </motion.div>
  );
}
