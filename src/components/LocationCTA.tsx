import { Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import OpenStatus from "@/components/OpenStatus";
import { HOURS_ROWS } from "@/lib/hours";
import { BUSINESS, DIRECTIONS_HREF, TEL_HREF, WHATSAPP_BOOK_HREF } from "@/lib/site";

/**
 * Closing band on most pages: how to book, and where and when to come.
 *
 * Booking goes straight to WhatsApp (with the first line typed) or the phone,
 * which is how patients here book; the address, the hours and whether the
 * clinic is open right now sit beside it, so nobody has to scroll to the
 * footer to find them.
 *
 * Server component apart from the OpenStatus island. It used framer-motion to
 * fade everything in, which kept the band invisible until the script loaded,
 * and animated two background blobs forever.
 */
const LocationCTA = () => (
  <section
    className="bg-brand py-14 text-brand-foreground md:py-20"
    aria-labelledby="book-visit"
    data-track-location="location_cta"
  >
    <div className="container mx-auto grid gap-10 px-4 md:grid-cols-[3fr_2fr] md:items-center md:gap-14">
      <div>
        <span className="mb-2 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-brand-foreground/70">
          <MapPin className="h-4 w-4" aria-hidden />
          Fazal Chowk, Mirpur AJK
        </span>
        <h2 id="book-visit" className="mb-4 font-display text-3xl font-bold md:text-5xl">
          Book your appointment
        </h2>
        <p className="mb-8 max-w-xl text-lg leading-relaxed text-brand-foreground/80">
          Message us on WhatsApp or call, tell us what is bothering you, and we will find you a
          time. In pain? We keep same-day slots free.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            asChild
            size="lg"
            className="h-14 bg-[#25D366] px-7 text-base font-semibold text-[#0A2E1F] hover:bg-[#25D366]/90"
          >
            <a href={WHATSAPP_BOOK_HREF} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" aria-hidden />
              Book on WhatsApp
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-14 border-2 border-brand-foreground/40 bg-transparent px-7 text-base font-semibold text-brand-foreground hover:bg-brand-foreground/10 hover:text-brand-foreground"
          >
            <a href={TEL_HREF}>
              <Phone className="mr-2 h-5 w-5" aria-hidden />
              Call {BUSINESS.phoneDisplay}
            </a>
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-brand-foreground/15 bg-brand-foreground/5 p-6 md:p-7">
        <p className="mb-5 font-display text-xl font-semibold">{BUSINESS.name}</p>

        <dl className="space-y-5 text-brand-foreground/90">
          <div className="flex gap-3">
            <dt>
              <MapPin className="mt-0.5 h-5 w-5 text-brand-foreground/70" aria-hidden />
              <span className="sr-only">Address</span>
            </dt>
            <dd className="leading-relaxed">
              {BUSINESS.street}
              <br />
              {BUSINESS.locality}, {BUSINESS.regionShort}
            </dd>
          </div>
          <div className="flex gap-3">
            <dt>
              <Clock className="mt-0.5 h-5 w-5 text-brand-foreground/70" aria-hidden />
              <span className="sr-only">Opening hours</span>
            </dt>
            <dd className="flex-1">
              <OpenStatus className="mb-2 font-medium text-brand-foreground" />
              <table className="w-full text-sm">
                <tbody>
                  {HOURS_ROWS.map(([days, time]) => (
                    <tr key={days}>
                      <th
                        scope="row"
                        className="py-0.5 pr-3 text-left font-normal text-brand-foreground/75"
                      >
                        {days}
                      </th>
                      <td className="py-0.5 text-right tabular-nums">{time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </dd>
          </div>
        </dl>

        <a
          href={DIRECTIONS_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-brand-foreground/30 font-medium transition-colors hover:bg-brand-foreground/10"
        >
          <Navigation className="h-4 w-4" aria-hidden />
          Get directions on Google Maps
        </a>
      </div>
    </div>
  </section>
);

export default LocationCTA;
