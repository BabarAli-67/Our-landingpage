import type { Metadata } from 'next';

import AmbientLiquid from '@/components/ui/AmbientLiquid';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section
      className="relative grid min-h-screen place-items-center overflow-hidden px-6 text-center"
      aria-labelledby="not-found-title"
    >
      <AmbientLiquid />
      <div className="relative z-10 flex flex-col items-center">
        <p
          aria-hidden="true"
          className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-8xl font-semibold text-transparent"
        >
          404
        </p>
        <h1 id="not-found-title" className="mt-4 text-2xl font-semibold text-white">
          Page not found
        </h1>
        <p className="mt-2 max-w-sm text-muted-strong">
          The page you’re looking for moved or never existed.
        </p>
        <div className="mt-8">
          <LiquidGlassButton href="/" size="lg">
            Back home
          </LiquidGlassButton>
        </div>
      </div>
    </section>
  );
}
