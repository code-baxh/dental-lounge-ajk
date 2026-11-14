"use client";

import { useEffect } from "react";
import { eventForHref, track } from "@/lib/analytics";

/**
 * One delegated listener for the whole site, so every tel:, WhatsApp and Maps
 * link is measured — including ones added later — without wiring an onClick
 * into each of the dozens of call buttons.
 *
 * `link_location` says which button earned the tap. Set it explicitly with
 * data-track-location; otherwise it falls back to header / footer / content.
 */
export default function ConversionTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      const tagged = link.closest<HTMLElement>("[data-track-event]");
      const event = tagged?.dataset.trackEvent ?? eventForHref(href);
      if (!event) return;

      const location =
        link.closest<HTMLElement>("[data-track-location]")?.dataset.trackLocation ??
        (link.closest("header") ? "header" : link.closest("footer") ? "footer" : "content");

      track(event, {
        link_location: location,
        link_text: (link.getAttribute("aria-label") || link.textContent || "").trim().slice(0, 80),
        ...(event === "share" ? { method: "whatsapp", content_type: "guide" } : {}),
      });
    };

    // Capture phase: runs before navigation, and before any handler that
    // might stop propagation.
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
