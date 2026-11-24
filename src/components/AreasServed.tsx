import Link from "next/link";
import { Car } from "lucide-react";
import { AREAS } from "@/lib/areas";

/** "around 1 hour 30 minutes" → "1 hr 30 min", "about 15–20 minutes" → "15–20 min". */
const shortDrive = (s: string) =>
  s
    .replace(/^(about|around)\s+/, "")
    .replace(/^one hour$/, "1 hr")
    .replace(/\bhours?\b/, "hr")
    .replace(/\bminutes?\b/, "min");

/**
 * Compact "coming from further away" block.
 *
 * It does two jobs. For visitors from outside Mirpur it answers "is it worth
 * the trip?" with a drive time per town. For search it is the crawlable link
 * hub for the area pages, which would otherwise sit orphaned in the sitemap.
 *
 * Deliberately small and plain: most visitors live in Mirpur and skip it, so
 * it is one short list sorted nearest first, with the town name as the link.
 * It used to be eight cards each headed "Dentist for <town>", which read as
 * written for Google rather than for people. Each area page's own title
 * already carries "Dentist … <town>", so the link text does not need to.
 */
export default function AreasServed({
  exclude,
  heading = "Coming from outside Mirpur?",
}: {
  exclude?: string;
  heading?: string;
}) {
  const areas = AREAS.filter((a) => a.slug !== exclude).sort((a, b) => a.approxKm - b.approxKm);

  return (
    <section className="border-t border-border bg-background py-14" aria-labelledby="areas-heading">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-5xl items-start gap-8 md:grid-cols-[2fr_3fr] md:gap-12">
          <div className="min-w-0">
            <h2
              id="areas-heading"
              className="mb-3 font-display text-2xl font-bold text-foreground md:text-3xl"
            >
              {heading}
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Patients travel to Fazal Chowk from across Mirpur District, Bhimber, Kotli, and
              Dina and Jhelum. If you are coming from further away, we plan treatment into fewer,
              longer visits where it is clinically sensible, so you make fewer trips.
            </p>
          </div>

          <div className="min-w-0">
            <p className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <Car className="h-4 w-4" aria-hidden />
              Typical drive to the clinic
            </p>
            {/* Two columns that read downwards, so the nearest-first order holds
                in each column rather than zig-zagging across the rows. */}
            <ul
              className="grid grid-cols-1 gap-x-8 sm:grid-flow-col sm:grid-cols-2 sm:[grid-template-rows:var(--rows)]"
              style={{ "--rows": `repeat(${Math.ceil(areas.length / 2)}, auto)` } as React.CSSProperties}
            >
              {areas.map((a) => (
                <li key={a.slug} className="border-b border-border">
                  <Link
                    href={`/areas/${a.slug}`}
                    className="group flex items-baseline justify-between gap-4 py-3 transition-colors"
                  >
                    <span className="font-medium text-foreground underline-offset-4 group-hover:text-primary group-hover:underline">
                      {a.name}
                    </span>
                    <span className="whitespace-nowrap text-sm tabular-nums text-muted-foreground">
                      {shortDrive(a.approxDrive)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
