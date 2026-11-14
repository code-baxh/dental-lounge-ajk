/**
 * GA4 conversion events.
 *
 * For a clinic, a "visit" is not the outcome — a phone call, a WhatsApp
 * message or a directions tap is. Without these events Search Console shows
 * clicks arriving and nothing shows what they did next.
 *
 * Mark these as Key Events in GA4 (Admin → Events): click_to_call,
 * whatsapp_click, get_directions, generate_lead.
 */

type Params = Record<string, string | number | undefined>;

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer || [];

  if (typeof w.gtag === "function") {
    w.gtag("event", event, params);
    return;
  }

  // The inline init in layout.tsx normally defines gtag before any click can
  // happen. If it has not run yet, queue the command in the same Arguments
  // shape gtag uses — gtag.js ignores plain arrays in the dataLayer.
  const dl = w.dataLayer;
  const queue = function () {
    // eslint-disable-next-line prefer-rest-params
    dl.push(arguments);
  } as unknown as (...args: unknown[]) => void;
  queue("event", event, params);
}

/**
 * Classifies a link into a conversion event, or null if it is not one.
 * A `data-track-event` attribute on the link (or an ancestor) overrides this.
 */
export function eventForHref(href: string): string | null {
  if (href.startsWith("tel:")) return "click_to_call";
  if (href.startsWith("mailto:")) return "email_click";
  if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) {
    // wa.me/?text=… with no number is a share, not a message to the clinic.
    return /^https?:\/\/wa\.me\/\?/.test(href) ? "share" : "whatsapp_click";
  }
  // Google review links (GOOGLE_REVIEWS in site.ts) before the generic Maps
  // match: the read link is itself a google.com/maps URL.
  if (/[#&]lrd=/.test(href)) return "write_review_click";
  if (/google\.[a-z.]+\/maps\?cid=/.test(href)) return "view_reviews_click";
  if (/^https?:\/\/(maps\.app\.goo\.gl|(www\.)?google\.[a-z.]+\/maps)/.test(href)) {
    return "get_directions";
  }
  return null;
}
