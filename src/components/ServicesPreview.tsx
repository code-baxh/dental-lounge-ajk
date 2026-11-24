import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { SERVICES } from "@/lib/services";
import { IMAGE_POSITION, SERVICE_IMAGES, imageAlt } from "@/lib/service-images";

/**
 * Every treatment as a photo card in a bento grid, the name over the photo, so
 * a visitor finds theirs in one scroll and taps straight through. The full
 * cards, with times and typical costs, stay on /services.
 *
 * One card is shown large: the one with the strongest photo, which is the
 * real one of Dr. Jalal treating a young patient (root canals, the X-ray
 * photo, looked poor at that size). Its tag is quoted word for word from a
 * parent's Google review (see GOOGLE_REVIEW_QUOTES in lib/site.ts).
 *
 * Grid arithmetic, so no cell is left empty: the large card takes 2x2 cells;
 * the last card takes two cells on phones and at 1024px+, one at 640px.
 * 4+10+2 = 16 (2 columns), 4+10+1 = 15 (3 columns), 4+10+2 = 16 (4 columns).
 *
 * The Urdu name sits under each one because many patients know a treatment by
 * that name ("taar" for braces, "kaip" for a crown) rather than the English;
 * small cards show the first term only, so the name fits over the photo.
 *
 * Server component, no JS.
 */
const FEATURED = {
  slug: "childrens-dentistry-mirpur",
  tag: "\u201cSo friendly with kids\u201d, a parent on Google",
};
const ORDERED = [...SERVICES].sort(
  (a, b) => Number(b.slug === FEATURED.slug) - Number(a.slug === FEATURED.slug),
);
const LAST = ORDERED.length - 1;

const span = (i: number) =>
  i === 0 ? "col-span-2 row-span-2" : i === LAST ? "col-span-2 sm:col-span-1 lg:col-span-2" : "";

const ServicesPreview = () => (
  <section
    className="bg-gradient-to-b from-background to-secondary/50 py-14 md:py-20"
    aria-labelledby="services-heading"
  >
    <div className="container mx-auto px-4">
      <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-primary">
            Treatments
          </span>
          <h2
            id="services-heading"
            className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl"
          >
            Dental services in Mirpur, AJK
          </h2>
          <p className="text-muted-foreground md:text-lg">
            Tap a treatment to see what happens, how long it takes and what it typically costs.
          </p>
        </div>
        <Link
          href="/services"
          className="hidden shrink-0 items-center gap-1.5 font-medium text-primary underline-offset-4 hover:underline md:inline-flex"
        >
          Compare all {SERVICES.length} treatments
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      <ul className="grid auto-rows-[10.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:grid-cols-3 sm:gap-4 lg:auto-rows-[13.5rem] lg:grid-cols-4">
        {ORDERED.map((service, i) => {
          const featured = service.slug === FEATURED.slug;
          return (
            <li key={service.slug} className={span(i)}>
              <Link
                href={`/services/${service.slug}`}
                className="group relative flex h-full overflow-hidden rounded-2xl bg-muted shadow-sm ring-1 ring-border transition-shadow duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Image
                  src={SERVICE_IMAGES[service.image]}
                  alt={service.imageAlt ?? imageAlt(service.name, service.image)}
                  fill
                  sizes={
                    featured
                      ? "(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) 66vw, 680px"
                      : "(max-width: 640px) calc(50vw - 1.5rem), (max-width: 1024px) 33vw, 340px"
                  }
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                  style={{ objectPosition: IMAGE_POSITION[service.image] }}
                  placeholder="blur"
                />
                {/* Legibility scrim: dark at the foot, where the name sits. */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
                  aria-hidden
                />

                <div className="relative mt-auto flex w-full items-end justify-between gap-3 p-3 text-white md:p-5">
                  <div className="min-w-0">
                    {featured && (
                      <span className="mb-2 inline-block rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm">
                        {FEATURED.tag}
                      </span>
                    )}
                    <h3
                      className={`font-display font-semibold leading-snug [text-wrap:balance] ${
                        featured ? "text-2xl md:text-3xl" : "text-base md:text-lg"
                      }`}
                    >
                      {service.name}
                    </h3>
                    <p
                      className="mt-0.5 text-left text-xs leading-relaxed text-white/80 md:text-sm"
                      lang="ur"
                      dir="rtl"
                    >
                      {featured ? service.urdu : service.urdu.split(" / ")[0]}
                    </p>
                    {featured && (
                      <p className="mt-2 hidden max-w-md text-sm leading-relaxed text-white/85 sm:block">
                        {service.short}
                      </p>
                    )}
                  </div>
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors duration-200 group-hover:bg-white group-hover:text-foreground md:h-9 md:w-9"
                    aria-hidden
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <Link
        href="/services"
        className="mt-6 flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl border border-border bg-card font-medium text-primary md:hidden"
      >
        Compare all treatments, times and costs
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  </section>
);

export default ServicesPreview;
