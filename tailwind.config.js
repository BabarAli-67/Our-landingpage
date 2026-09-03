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
        /* Deep neutral charcoal/slate ramp — the dark base */
        ink: {
          950: '#070708',
          900: '#0B0B0D',
          800: '#101013',
          700: '#17171B',
          600: '#1F1F25',
          500: '#2A2A31',
        },
        /* FLASH TECH flame red — dominant brand tone */
        primary: {
          DEFAULT: '#FF3B2F',
          soft: '#FF6A4D',
          deep: '#B31C10',
        },
        /* Ember orange — secondary tone */
        accent: {
          DEFAULT: '#FF7A18',
          soft: '#FFB25E',
          deep: '#C8500A',
        },
        /* Amber highlight — the bright tip of the flame */
        ember: {
          DEFAULT: '#FFC24B',
          soft: '#FFD98A',
        },
        glass: {
          border: 'rgba(255,255,255,0.08)',
          fill: 'rgba(255,255,255,0.03)',
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
        // Warm-tinted grid lines
        'grid-glow':
          'linear-gradient(to right, rgba(255,59,47,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,59,47,0.055) 1px, transparent 1px)',
        'grid-fine':
          'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
        'radial-fade':
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,59,47,0.28), transparent 60%)',
        // Flame aurora / liquid gradients
        aurora:
          'linear-gradient(110deg, #FF3B2F 0%, #FF7A18 38%, #FFC24B 60%, #FF3B2F 100%)',
        liquid:
          'conic-gradient(from 180deg at 50% 50%, #FF3B2F 0deg, #FF7A18 110deg, #FFC24B 220deg, #FF3B2F 360deg)',
        'chrome-edge':
          'linear-gradient(135deg, rgba(255,255,255,0.55), rgba(255,122,24,0.3) 40%, rgba(255,59,47,0.3) 60%, rgba(255,255,255,0.35))',
      },
      boxShadow: {
        glow: '0 0 44px -10px rgba(255,59,47,0.55)',
        'glow-accent': '0 0 44px -10px rgba(255,122,24,0.55)',
        // Layered glass: crisp top highlight + soft inner floor
        'glass-inset':
          'inset 0 1px 0 0 rgba(255,255,255,0.10), inset 0 -1px 0 0 rgba(0,0,0,0.4)',
        // Tactile premium card: inner highlight + ambient drop
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
        // translate3d keeps this strictly on the compositor
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
            'linear-gradient(120deg, #FFFFFF 0%, #FF6A4D 48%, #FFC24B 100%)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          color: 'transparent',
        },
        // Premium layered glass — soft borders, inner highlight, ambient drop
        '.glass': {
          background: 'rgba(255,255,255,0.03)',
          'backdrop-filter': 'blur(16px) saturate(150%)',
          '-webkit-backdrop-filter': 'blur(16px) saturate(150%)',
          border: '1px solid rgba(255,255,255,0.08)',
          'box-shadow':
            'inset 0 1px 0 0 rgba(255,255,255,0.08), 0 8px 32px -12px rgba(0,0,0,0.7)',
        },
        // GPU hint for scroll-driven containers
        '.gpu': {
          transform: 'translate3d(0,0,0)',
          'will-change': 'transform',
          'backface-visibility': 'hidden',
          '-webkit-backface-visibility': 'hidden',
        },
        // Turn off will-change when idle to save memory (apply on static blocks)
        '.gpu-idle': { 'will-change': 'auto' },
      });
    },
  ],
};
