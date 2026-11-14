import { MapPin, MessageCircle, Phone } from "lucide-react";
import { DIRECTIONS_HREF, TEL_HREF, WHATSAPP_HREF } from "@/lib/site";

/**
 * Persistent one-tap contact bar on phones.
 *
 * Most "dentist near me" / "dentist mirpur" searches happen on a phone, and on
 * mobile the header collapses to a menu button — so before this, calling meant
 * opening the menu or scrolling back to the hero. Server component, zero JS.
 *
 * Fixed-position, so it causes no layout shift; <body> carries matching
 * bottom padding on small screens (layout.tsx) so it never covers the footer.
 */
export default function MobileActionBar() {
  const base =
    "flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-xl text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  return (
    <nav
      aria-label="Contact the clinic"
      data-track-location="mobile_bar"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-3 pt-2 backdrop-blur-md md:hidden print:hidden"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        <a href={TEL_HREF} className={`${base} bg-primary text-primary-foreground hover:bg-primary/90`}>
          <Phone className="h-5 w-5" aria-hidden />
          Call
        </a>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} bg-[#25D366] text-[#0A2E1F] hover:bg-[#25D366]/90`}
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
          WhatsApp
        </a>
        <a
          href={DIRECTIONS_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} border border-border bg-card text-foreground hover:border-primary/40`}
        >
          <MapPin className="h-5 w-5" aria-hidden />
          Directions
        </a>
      </div>
    </nav>
  );
}
