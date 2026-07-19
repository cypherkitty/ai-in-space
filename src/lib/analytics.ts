import type { Design } from './designs';

export const GA_MEASUREMENT_ID = 'G-NEYK7MHJH9';

type AnalyticsValue = string | number | boolean | undefined;
export type AnalyticsParams = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const configured = () => /^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID);

export function initAnalytics() {
  if (!configured() || typeof window === 'undefined' || document.querySelector(`script[data-ga-id="${GA_MEASUREMENT_ID}"]`)) return;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    ads_data_redaction: true,
    debug_mode: import.meta.env.DEV
  });

  const script = document.createElement('script');
  script.async = true;
  script.dataset.gaId = GA_MEASUREMENT_ID;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.append(script);
}

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (!configured() || typeof window === 'undefined') return;
  window.gtag?.('event', name, params);
}

export function trackPageView(params: AnalyticsParams) {
  trackEvent('page_view', {
    page_title: document.title,
    page_location: window.location.href,
    ...params
  });
}

export function designAnalyticsContext(design: Design): AnalyticsParams {
  return {
    design_id: design.id,
    design_layout: design.layout,
    design_composition: design.composition ?? 'native',
    design_source: design.generated ? 'generated' : 'curated',
    design_visual: design.visual,
    design_exposure: design.exposureBand ?? 'deep',
    design_exposure_amount: design.exposure
  };
}
