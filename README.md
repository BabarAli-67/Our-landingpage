# FlashLLCTech — Premium Agency Website

High-end software house & AI automation agency site. Next.js (App Router) · Tailwind · Framer Motion · Spline · Lucide.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Architecture

```
FlashLLCTech/
├─ app/                          # App Router
│  ├─ layout.jsx                 # Root: fonts, metadata, Navbar/Footer, smooth-scroll provider
│  ├─ globals.css                # Tokens, base, glass + grain utilities, reduced-motion
│  ├─ page.jsx                   # HOME — full scroll choreography
│  ├─ loading.jsx / not-found.jsx
│  ├─ services/page.jsx
│  ├─ work/page.jsx
│  ├─ about/page.jsx
│  ├─ careers/page.jsx
│  └─ contact/page.jsx
│
├─ components/
│  ├─ providers/
│  │  └─ SmoothScrollProvider.jsx    # client boundary for smooth scroll
│  ├─ ui/                            # reusable primitives
│  │  ├─ LiquidGlassButton.jsx       # ⭐ chromatic-edge glass button (magnetic + shimmer)
│  │  ├─ WaterRippleImage.jsx        # ⭐ SVG-displacement water ripple on hover
│  │  ├─ SplineScene.jsx             # ⭐ lazy, viewport-gated 3D (ssr:false)
│  │  ├─ AmbientLiquid.jsx           # animated liquid/aurora background blobs
│  │  ├─ SpotlightCard.jsx           # pointer-follow spotlight glass card
│  │  ├─ Reveal.jsx                  # scroll-choreography reveal primitive
│  │  ├─ Marquee.jsx                 # infinite logo/tool marquee
│  │  └─ SectionHeading.jsx
│  └─ sections/                      # page-level composed sections
│     ├─ Navbar.jsx / Footer.jsx
│     ├─ ScrollExpansionHero.jsx     # ⭐ pinned scroll media expansion + Spline
│     ├─ ContainerScroll.jsx         # ⭐ 3D device tilt on scroll
│     ├─ SqueezeCarousel.jsx         # ⭐ expanding-panel carousel (hosts ripple images)
│     ├─ CircularVideoTestimonials.jsx # ⭐ circular players + modal + sound toggle
│     ├─ TechStackSection.jsx        # Tech Stack & Capabilities
│     ├─ ServicesGrid.jsx / StatsBand.jsx / ProcessTimeline.jsx
│     ├─ PageHero.jsx / CTASection.jsx / ContactForm.jsx
│
├─ hooks/
│  ├─ useMediaQuery.js               # SSR-safe matchMedia (+ useIsMobile/Desktop)
│  ├─ useReducedMotion.js            # prefers-reduced-motion
│  ├─ useMousePosition.js            # spring-smoothed pointer tracking
│  └─ useLenisScroll.js              # RAF smooth-scroll normalizer (degrades gracefully)
│
├─ lib/
│  ├─ utils.js                       # cn(), clamp, mapRange
│  ├─ site.config.js                 # brand, nav, contact, Spline URL
│  └─ content.js                     # services, techStack, caseStudies, testimonials…
│
├─ tailwind.config.js                # keyframes, glow shadows, gradients, glass plugin
├─ next.config.mjs                   # image formats, optimizePackageImports
└─ postcss.config.mjs / jsconfig.json (@/* alias)
```

## Where each effect lives (UX rationale)

| Effect | Placement |
|---|---|
| Scroll Media Expansion Hero | Home top (pinned) |
| 3D Spline scene | Hero backdrop + Services (lazy, mobile-skipped) |
| Liquid Glass Buttons + Ambient Liquid | Global (nav, hero, CTA) |
| Container Scroll (device tilt) | Home & About — "show the product" beat |
| Squeeze Carousel | Home & Work case studies |
| Water Ripple images | Work cards + inside squeeze panels |
| Circular Video Testimonials | Home, Work, About |
| Tech Stack & Capabilities | Dedicated Home section + Services |
| Scroll Choreography (`Reveal`) | Every section, globally |

## Configuration you’ll want to change

- `lib/site.config.js` → brand, nav, contact, **`splineScene`** URL.
- `lib/content.js` → services, tech stack, case studies, **testimonial video/poster URLs** (swap the sample MP4s for real client reviews).
- `components/sections/ContactForm.jsx` → wire `handleSubmit` to your API route / n8n webhook.

## Performance & 60fps checklist

**3D / Canvas / WebGL**
- Spline loaded via `next/dynamic({ ssr:false })` and mounted only when near-viewport (`IntersectionObserver`), **skipped entirely on mobile & reduced-motion**.
- One 3D scene instance on screen at a time; gradient fallback painted first → zero CLS.
- Pause offscreen media (testimonial previews & hero video pause when not intersecting).

**Animation**
- Animate **transform/opacity only** — never width/height/top/left. `.gpu` utility applies `translateZ(0)` + `will-change`.
- Scroll effects use Framer `useScroll`/`useTransform` (compositor-driven), not scroll listeners doing layout reads.
- Spotlight/magnetic effects update **CSS custom properties**, avoiding React re-renders per pointer move.
- Every animation path honors `prefers-reduced-motion` (CSS global kill-switch + per-component guards).

**Loading & CWV**
- `next/font` (Inter) self-hosted with `display:swap` → no FOIT, no layout shift.
- `next/image` with AVIF/WebP, explicit width/height, and `sizes` on every image.
- Heavy libs tree-shaken via `optimizePackageImports` (lucide-react, framer-motion).
- Fixed aspect ratios on media wrappers reserve space (CLS < 0.1).

**Accessibility**
- 44×44px min touch targets, visible focus rings, aria-labels on icon buttons.
- Modal: `role="dialog"`, `aria-modal`, Esc-to-close, scroll lock.
- Keyboard-operable squeeze carousel (focus expands, arrow keys move).
```
```
