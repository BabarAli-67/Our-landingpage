import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Obsidian — near-black neutrals for bg, cards, surfaces */
        ink: {
          950: '#0F0F11',
          900: '#161618',
          800: '#1C1C1F',
          700: '#242428',
          600: '#2E2E33',
          500: '#3A3A40',
        },
        /* Primary gold — #D4AF37 */
        primary: {
          DEFAULT: '#D4AF37',
          soft: '#E5C158',
          deep: '#C59827',
        },
        /* Warm gold secondary */
        accent: {
          DEFAULT: '#E5C158',
          soft: '#F0D78A',
          deep: '#C59827',
        },
        /* Deep / tertiary gold */
        ember: {
          DEFAULT: '#C59827',
          soft: '#D4AF37',
        },
        glass: {
          border: 'rgba(212,175,55,0.18)',
          fill: 'rgba(28,28,31,0.85)',
        },
        /**
         * `muted` replaces every former `text-slate-500` / `text-slate-600`.
         * Both failed WCAG AA for normal text on the obsidian surfaces
         * (4.02:1 and 2.53:1 against #0F0F11 — AA needs 4.5:1), which is what
         * capped the Lighthouse accessibility score. This is the nearest shade
         * to slate-500 that clears AA on every surface in the palette:
         *   #7c8a9e -> 5.46:1 on ink-950, 5.15:1 on ink-900, 4.85:1 on ink-800.
         */
        muted: {
          DEFAULT: '#7c8a9e',
          strong: '#94a3b8',
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        display: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      backgroundImage: {
        'grid-glow':
          'linear-gradient(to right, rgba(212,175,55,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.07) 1px, transparent 1px)',
        'grid-fine':
          'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
        'radial-fade':
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(212,175,55,0.18), transparent 60%)',
        aurora:
          'linear-gradient(110deg, #C59827 0%, #D4AF37 40%, #E5C158 70%, #C59827 100%)',
        liquid:
          'conic-gradient(from 180deg at 50% 50%, #C59827 0deg, #D4AF37 120deg, #E5C158 230deg, #C59827 360deg)',
        'chrome-edge':
          'linear-gradient(135deg, rgba(255,255,255,0.45), rgba(229,193,88,0.4) 40%, rgba(212,175,55,0.45) 60%, rgba(255,255,255,0.25))',
      },
      boxShadow: {
        glow: '0 0 44px -10px rgba(212,175,55,0.45)',
        'glow-accent': '0 0 44px -10px rgba(229,193,88,0.4)',
        'glass-inset':
          'inset 0 1px 0 0 rgba(255,255,255,0.08), inset 0 -1px 0 0 rgba(0,0,0,0.45)',
        card: 'inset 0 1px 0 0 rgba(255,255,255,0.05), 0 1px 2px 0 rgba(0,0,0,0.45), 0 16px 48px -24px rgba(0,0,0,0.85)',
        elevate: '0 32px 90px -28px rgba(0,0,0,0.9)',
      },
      backgroundSize: {
        grid: '44px 44px',
        aurora: '200% 200%',
      },
      keyframes: {
        'aurora-shift': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'liquid-spin': { to: { transform: 'rotate(360deg)' } },
        float: {
          '0%,100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-14px,0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.35)', opacity: '0' },
          '100%': { opacity: '0' },
        },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        'marquee-x': {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
        'glow-breathe': {
          '0%,100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        aurora: 'aurora-shift 14s ease-in-out infinite',
        'liquid-spin': 'liquid-spin 9s linear infinite',
        float: 'float 7s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4,0,0.2,1) infinite',
        shimmer: 'shimmer 2.2s infinite',
        marquee: 'marquee-x 34s linear infinite',
        'glow-breathe': 'glow-breathe 6s ease-in-out infinite',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.text-gradient': {
          background:
            'linear-gradient(120deg, #FFFFFF 0%, #E5C158 45%, #D4AF37 100%)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          color: 'transparent',
        },
        '.glass': {
          background: 'rgba(28,28,31,0.82)',
          'backdrop-filter': 'blur(16px) saturate(140%)',
          '-webkit-backdrop-filter': 'blur(16px) saturate(140%)',
          border: '1px solid rgba(212,175,55,0.16)',
          'box-shadow':
            'inset 0 1px 0 0 rgba(255,255,255,0.06), 0 8px 32px -12px rgba(0,0,0,0.75)',
        },
        /**
         * `.gpu` promotes an element to its own compositor layer.
         *
         * It deliberately no longer sets `will-change: transform`. A permanent
         * will-change on the ~40 nodes that carry `.gpu` (every card, orb,
         * carousel panel and hero layer) keeps that many GPU layers allocated
         * for the whole session, inflating raster work and VRAM. Opt in for
         * the duration of a real animation with `.will-animate` instead.
         */
        '.gpu': {
          transform: 'translate3d(0,0,0)',
          'backface-visibility': 'hidden',
          '-webkit-backface-visibility': 'hidden',
        },
        '.will-animate': { 'will-change': 'transform' },
        '.gpu-idle': { 'will-change': 'auto' },
        '.scrollbar-none': {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
        },
        '.scrollbar-none::-webkit-scrollbar': { display: 'none' },
      });
    }),
  ],
};

export default config;
