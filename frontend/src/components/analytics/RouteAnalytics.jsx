import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// The gtag.js snippet in index.html only fires a pageview on the initial load.
// Because this is a single-page app, we send a page_view to the same GA
// property on each client-side route change so analytics tracks every page.
// No second script is loaded — this reuses the gtag() defined in index.html.
const GA_ID = 'G-6SHNJ99MZQ';

export default function RouteAnalytics() {
  const { pathname, search } = useLocation();
  const firstLoad = useRef(true);

  useEffect(() => {
    // The initial pageview is already sent by the gtag snippet in index.html;
    // only report subsequent client-side navigations here.
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_ID, { page_path: pathname + search });
    }
  }, [pathname, search]);

  return null;
}
