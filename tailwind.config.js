/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Deep navy / midnight blue ramp — page background & surfaces */
        ink: {
          950: '#0a0f1d',
          900: '#0b1329',
          800: '#111a33',
          700: '#162040',
          600: '#1c2a4d',
          500: '#243560',
        },
        /* Bright coral / orange — primary accent (headings & highlights) */
        primary: {
          DEFAULT: '#ff6b4a',
          soft: '#ff8a6e',
          deep: '#e04f2f',
        },
        /* Soft teal / cyan — secondary accent */
        accent: {
          DEFAULT: '#22d3ee',
          soft: '#67e8f9',
          deep: '#0891b2',
        },
        /* Soft sky highlight */
        ember: {
          DEFAULT: '#38bdf8',
          soft: '#7dd3fc',
        },
        glass: {
          border: 'rgba(255,255,255,0.08)',
          fill: 'rgba(17,26,51,0.72)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      backgroundImage: {
        'grid-glow':
          'linear-gradient(to right, rgba(255,107,74,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,107,74,0.06) 1px, transparent 1px)',
        'grid-fine':
          'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
        'radial-fade':
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,107,74,0.22), transparent 60%)',
        aurora:
          'linear-gradient(110deg, #ff6b4a 0%, #22d3ee 45%, #38bdf8 70%, #ff6b4a 100%)',
        liquid:
          'conic-gradient(from 180deg at 50% 50%, #ff6b4a 0deg, #22d3ee 120deg, #38bdf8 230deg, #ff6b4a 360deg)',
        'chrome-edge':
          'linear-gradient(135deg, rgba(255,255,255,0.55), rgba(34,211,238,0.35) 40%, rgba(255,107,74,0.35) 60%, rgba(255,255,255,0.35))',
      },
      boxShadow: {
        glow: '0 0 44px -10px rgba(255,107,74,0.55)',
        'glow-accent': '0 0 44px -10px rgba(34,211,238,0.45)',
        'glass-inset':
          'inset 0 1px 0 0 rgba(255,255,255,0.10), inset 0 -1px 0 0 rgba(0,0,0,0.4)',
        card: 'inset 0 1px 0 0 rgba(255,255,255,0.06), 0 1px 2px 0 rgba(0,0,0,0.4), 0 16px 48px -24px rgba(0,0,0,0.8)',
        elevate: '0 32px 90px -28px rgba(0,0,0,0.85)',
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
        'fade-up': {
          from: { opacity: '0', transform: 'translate3d(0,24px,0)' },
          to: { opacity: '1', transform: 'translate3d(0,0,0)' },
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
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        'glow-breathe': 'glow-breathe 6s ease-in-out infinite',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-gradient': {
          background:
            'linear-gradient(120deg, #FFFFFF 0%, #ff6b4a 52%, #22d3ee 100%)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          color: 'transparent',
        },
        '.glass': {
          background: 'rgba(17,26,51,0.72)',
          'backdrop-filter': 'blur(16px) saturate(150%)',
          '-webkit-backdrop-filter': 'blur(16px) saturate(150%)',
          border: '1px solid rgba(255,255,255,0.08)',
          'box-shadow':
            'inset 0 1px 0 0 rgba(255,255,255,0.08), 0 8px 32px -12px rgba(0,0,0,0.7)',
        },
        '.gpu': {
          transform: 'translate3d(0,0,0)',
          'will-change': 'transform',
          'backface-visibility': 'hidden',
          '-webkit-backface-visibility': 'hidden',
        },
        '.gpu-idle': { 'will-change': 'auto' },
      });
    },
  ],
};
