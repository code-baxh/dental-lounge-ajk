import Link from "next/link";
import { MapPin } from "lucide-react";
import { AREAS } from "@/lib/areas";

/**
 * Internal-link hub for the area pages. Without a crawlable link block like
 * this, location pages sit orphaned in the sitemap and pick up almost no
 * internal PageRank.
 */
export default function AreasServed({ exclude }: { exclude?: string }) {
  const areas = AREAS.filter((a) => a.slug !== exclude);

  return (
    <section className="border-t border-border bg-background py-20" aria-labelledby="areas-heading">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h2
            id="areas-heading"
            className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl"
          >
            Areas we serve around Mirpur
          </h2>
          <p className="mb-10 max-w-2xl leading-relaxed text-muted-foreground">
            The clinic is at Fazal Chowk in New Mirpur City. Patients travel in regularly from
            across Mirpur District and the neighbouring districts of Bhimber and Kotli, as well as
            from Dina and Jhelum across the Punjab boundary.
          </p>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/areas/${a.slug}`}
                  className="flex h-full items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span>
                    <span className="block font-semibold text-foreground">
                      Dentist for {a.name}
                    </span>
                    <span className="block text-sm text-muted-foreground">
                      about {a.approxKm} km — {a.approxDrive}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
