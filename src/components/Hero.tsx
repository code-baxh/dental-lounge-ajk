import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoogleRatingBadge } from "@/components/GoogleRating";
import OpenStatus from "@/components/OpenStatus";
import { BUSINESS, PRACTITIONER, TEL_HREF, WHATSAPP_BOOK_HREF } from "@/lib/site";
import heroPhoto from "@/assets/clinic-hero-chair.jpg";
import drAvatar from "@/assets/dr-jalal-avatar.jpg";

/**
 * Answers the four questions a visitor arrives with, in one screen on a phone:
 * is this the right clinic (name, place, a real photo), is it any good (the
 * Google rating, the dentist's face), is it open, and how do I book.
 *
 * It replaces a centred, text-only hero at 90% of the screen height, which on a
 * phone read as a complete page with nothing below it, and kept the rating and
 * any photo below the fold. Booking now goes straight to WhatsApp, which is how
 * most patients here book, instead of through the contact page.
 *
 * Server component apart from the small OpenStatus island. The heading and
 * subheading keep .hero-rise (transform only, no opacity) so they paint at
 * first paint; see globals.css.
 */
const Hero = () => (
  <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary to-background">
    <div className="container mx-auto grid items-center gap-6 px-4 pb-10 pt-4 md:grid-cols-2 md:gap-12 md:py-14 lg:py-20">
      <div>
        <p className="hero-fade-rise mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-sm font-medium text-foreground md:mb-6">
          <OpenStatus />
          <span aria-hidden className="text-muted-foreground">
            ·
          </span>
          <span className="text-muted-foreground">
            Fazal Chowk<span className="hidden sm:inline">, New Mirpur City</span>
          </span>
        </p>

        {/* "Dental clinic" is searched as often as "dentist" here (see the
            metadata note in app/page.tsx), so the H1 carries both. */}
        <h1 className="hero-rise mb-4 font-display text-[2rem] font-bold leading-[1.15] text-foreground sm:text-5xl md:text-[2.75rem] lg:text-[3.5rem]">
          Dentist &amp; Dental Clinic{" "}
          <span className="whitespace-nowrap text-primary">in Mirpur, AJK</span>
        </h1>

        <p
          className="hero-rise mb-5 max-w-xl text-lg leading-relaxed text-muted-foreground md:mb-6 md:text-xl"
          style={{ animationDelay: "60ms" }}
        >
          {PRACTITIONER.name}&rsquo;s clinic at Sardar Plaza, Fazal Chowk. Gentle root canals,
          implants, braces and family check-ups, with every cost explained first.
        </p>

        <div className="hero-fade-rise mb-6 md:mb-8" style={{ animationDelay: "120ms" }}>
          <GoogleRatingBadge />
        </div>

        <div
          className="hero-fade-rise flex flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "180ms" }}
          data-track-location="hero"
        >
          <Button
            asChild
            size="lg"
            className="h-14 bg-[#25D366] px-7 text-base font-semibold text-[#0A2E1F] shadow-lg shadow-[#25D366]/25 hover:bg-[#25D366]/90"
          >
            <a href={WHATSAPP_BOOK_HREF} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" aria-hidden />
              Book on WhatsApp
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-14 border-2 border-primary px-7 text-base font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <a href={TEL_HREF}>
              <Phone className="mr-2 h-5 w-5" aria-hidden />
              Call {BUSINESS.phoneDisplay}
            </a>
          </Button>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Toothache or swelling? We keep same-day slots free.
        </p>
      </div>

      {/* First on phones, so a real photo and the dentist's face are the first
          thing seen; beside the text from tablet width up. In this photo the
          glass door behind the unit is softened (blurred and toned down, with
          feathered edges) so the eye stays on the chair, not the door handle
          and reflections. */}
      <div className="relative order-first md:order-last">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border shadow-xl md:aspect-[4/3] md:rounded-3xl">
          <Image
            src={heroPhoto}
            alt="Dental chair and touch-screen treatment unit at The Dental Lounge, Fazal Chowk, New Mirpur City"
            fill
            priority
            sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1400px) 50vw, 680px"
            className="object-cover"
            placeholder="blur"
          />
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-3 rounded-xl border border-border bg-background/95 py-2 pl-2 pr-4 shadow-lg md:-bottom-6 md:-left-6 md:py-3 md:pl-3 md:pr-5">
          <Image
            src={drAvatar}
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
          />
          <div className="leading-tight">
            <p className="text-sm font-semibold text-foreground">{PRACTITIONER.name}</p>
            <p className="text-xs text-muted-foreground">
              {PRACTITIONER.jobTitle}
              {PRACTITIONER.degree ? `, ${PRACTITIONER.degree}` : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
