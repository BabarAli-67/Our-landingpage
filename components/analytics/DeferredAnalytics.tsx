import Script from 'next/script';

/**
 * DeferredAnalytics
 * ------------------------------------------------------------------
 * The single seam for third-party tags. Nothing is injected unless the
 * matching environment variable is set, so the default build ships no
 * third-party JavaScript at all.
 *
 * WHY `lazyOnload`
 * Analytics are the classic Total Blocking Time regression: an
 * `afterInteractive` tag executes while the main thread is still finishing
 * hydration, and a plain `<script>` in `<head>` blocks parsing outright.
 * `strategy="lazyOnload"` defers execution until after the window `load`
 * event and browser idle, which is strictly after the Lighthouse TBT window
 * and after the page is usable. No measurement a marketing tag performs is
 * worth delaying interactivity for.
 *
 * `preconnect` is deliberately omitted — opening a TLS connection early only
 * helps a request that is on the critical path, and this one explicitly is not.
 *
 * Server Component: `next/script` needs no client boundary of its own.
 */
export default function DeferredAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  if (!gaId && !plausibleDomain) return null;

  return (
    <>
      {plausibleDomain ? (
        <Script
          id="plausible"
          strategy="lazyOnload"
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
        />
      ) : null}

      {gaId ? (
        <>
          <Script
            id="ga-src"
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script id="ga-init" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}',{send_page_view:true});`}
          </Script>
        </>
      ) : null}
    </>
  );
}
