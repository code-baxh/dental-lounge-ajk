"use client";

import { useEffect, useState } from "react";
import { BUSINESS } from "@/lib/site";
import { clock, openStatus } from "@/lib/hours";

/**
 * Live "Open now · until 9pm" / "Closed · opens 10am tomorrow", in clinic time.
 *
 * The server (and the first client render) show the static "Open 7 days"
 * line, so there is no hydration mismatch; the live status replaces it on the
 * same line once the page is interactive, then refreshes every minute.
 * The dot is never the only signal: the words say open or closed too.
 */
export default function OpenStatus({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<ReturnType<typeof openStatus> | null>(null);

  useEffect(() => {
    const tick = () => setStatus(openStatus(new Date()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const text = status?.text ?? `Open 7 days · until ${clock(BUSINESS.openingHours.closes)}`;
  const open = status ? status.open : true;

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden>
        {status?.open && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
        )}
        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${open ? "bg-emerald-500" : "bg-amber-500"}`}
        />
      </span>
      <span>{text}</span>
    </span>
  );
}
