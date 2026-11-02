/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Fail the build on type or lint errors — the TS migration is only real if
  // it is enforced in CI.
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },

  images: {
    /**
     * WebP only — deliberately NOT AVIF.
     *
     * `next/image` optimises on demand: the first request for each
     * (image, width, quality) triple is encoded synchronously while the
     * browser waits. Measured on this project's own assets with `sharp`
     * installed, at w=640:
     *
     *            AVIF            WebP           delta
     *   admin    1.21s / 16.7kB  0.12s / 19.6kB  +2.8kB for +1.09s
     *   ppsc     0.68s / 19.7kB  0.11s / 24.6kB  +4.9kB for +0.57s
     *   banner   1.84s /  103kB  0.31s /  140kB  + 37kB for +1.53s  (w=1920, LCP)
     *
     * Across the nine project images AVIF saved 18 kB in total and cost just
     * under 4 seconds of encode time. Those seconds are latency a real
     * visitor waits through on any cache miss — and the optimiser cache is
     * cold after every deploy, and cold per region. 2 kB on a card thumbnail
     * does not buy that back.
     *
     * If the AVIF byte savings are wanted later, the right way to get them is
     * to pre-generate the variants at build time, not to encode them while
     * someone is waiting for the page.
     */
    formats: ['image/webp'],

    /**
     * Dropping 3840 from the default device sizes. A 4K-wide re-encode is by
     * far the most expensive variant to produce and is requested by almost
     * nobody; 2048 upscaled on a 4K display is indistinguishable here, and it
     * removes a worst-case stall from the hero's srcset.
     */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],

    // 31d — these are content images, not user uploads.
    minimumCacheTTL: 2678400,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'prod.spline.design' },
    ],
  },

  compiler: {
    // Strip console.* from production bundles (keep errors for the
    // `errors-in-console` Best-Practices audit to stay meaningful).
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },

  experimental: {
    // Per-icon / per-export module resolution: stops a single `lucide-react`
    // or `framer-motion` import from pulling the barrel file into a client chunk.
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
        ],
      },
      {
        // Immutable, content-addressed by filename — safe to cache hard.
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
