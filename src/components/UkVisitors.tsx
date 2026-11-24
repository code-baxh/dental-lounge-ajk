import Link from "next/link";
import { ArrowRight, MessageCircle, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_HREF } from "@/lib/site";

const GUIDE_HREF = "/guides/dental-treatment-in-mirpur-visiting-from-uk";

const WHATSAPP_DATES_HREF = `${WHATSAPP_HREF}?text=${encodeURIComponent(
  "Hi, I am visiting Mirpur from the UK. My travel dates are: ",
)}`;

/** Same timings as the UK visitor guide (lib/guides.ts); keep the two in step. */
const TIMINGS = [
  {
    span: "Within two weeks",
    items: "Check-ups and X-rays, scaling, fillings, extractions, root canals and whitening.",
  },
  {
    span: "Three to four weeks",
    items: "Crowns and bridges, a root canal followed by a crown, dentures and veneers.",
  },
  {
    span: "Over more than one trip",
    items: "Implants, which need three to six months to heal, and braces, which take one to two years.",
  },
];

/**
 * Homepage block for visitors from Britain.
 *
 * Search Console (3 months to 22 Nov 2026): the UK sent 48 of 154 clicks, at
 * an 8.3% click-through rate against Pakistan's 2.0%. The UK visitor guide that
 * answers their real question (what can be finished before the flight home)
 * had 21 impressions, because nothing above the footer linked to it.
 * Server component, no JS.
 */
const UkVisitors = () => (
  <section className="border-t border-border bg-background py-20" aria-labelledby="uk-visitors">
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <span className="mb-3 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-primary">
          <Plane className="h-4 w-4" aria-hidden />
          Visiting from the UK?
        </span>
        <h2 id="uk-visitors" className="mb-5 font-display text-3xl font-bold text-foreground md:text-4xl">
          Plan your treatment around your flight home
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Many of our patients are back in Mirpur from Britain for a few weeks. Send us your
          travel dates before your first appointment, and we will plan the work so it is finished
          before you fly.
        </p>
      </div>

      <ul className="mx-auto mb-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        {TIMINGS.map((t) => (
          <li key={t.span} className="rounded-2xl border border-border bg-card p-6">
            <p className="mb-2 font-display text-lg font-semibold text-foreground">{t.span}</p>
            <p className="leading-relaxed text-muted-foreground">{t.items}</p>
          </li>
        ))}
      </ul>

      <div
        className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        data-track-location="uk_visitors"
      >
        <Button asChild size="lg" className="bg-[#25D366] px-8 text-[#0A2E1F] hover:bg-[#25D366]/90">
          <a href={WHATSAPP_DATES_HREF} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-5 w-5" aria-hidden />
            WhatsApp us your dates
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-2 border-primary px-8 text-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Link href={GUIDE_HREF}>
            Read the guide for UK visitors
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

export default UkVisitors;
