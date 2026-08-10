import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/services";
import { SERVICE_IMAGES, imageAlt } from "@/lib/service-images";

/**
 * Server component. This was previously a client component purely to run
 * framer-motion scroll animations on the cards — which shipped the whole
 * grid's JS to the browser and delayed the largest above-the-fold content
 * block. CSS transitions give the same feel at zero JS cost.
 */
const FEATURED = [
  "general-dentistry-mirpur",
  "dental-implants-mirpur",
  "braces-and-orthodontics-mirpur",
  "root-canal-treatment-mirpur",
  "teeth-whitening-mirpur",
  "cosmetic-dentistry-mirpur",
];

const ServicesPreview = () => {
  const featured = FEATURED.map((slug) => SERVICES.find((s) => s.slug === slug)!).filter(Boolean);

  return (
    <section className="relative overflow-hidden bg-background py-24" aria-labelledby="services-heading">
      <div className="absolute inset-0 opacity-30" aria-hidden>
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 left-0 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-wider text-primary">
            What We Offer
          </span>
          <h2
            id="services-heading"
            className="mb-5 font-display text-4xl font-bold text-foreground md:text-5xl"
          >
            Dental Services in Mirpur, AJK
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Ten treatments under one roof at Fazal Chowk — from routine check-ups and scaling to
            implants, braces and full smile makeovers.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((service) => (
            <article key={service.slug} className="group">
              <Link
                href={`/services/${service.slug}`}
                className="relative block h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={SERVICE_IMAGES[service.image]}
                    alt={imageAlt(service.name)}
                    fill
                    // 100vw overstated it: the card sits inside the container's
                    // px-4, so on a 412px phone the real slot is ~380px, not
                    // 412 — enough to make next/image serve w=750 instead of
                    // w=384 and roughly double the bytes for no visible gain.
                    sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1024px) calc(50vw - 2rem), 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    placeholder="blur"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent"
                    aria-hidden
                  />
                </div>

                <div className="p-6">
                  <h3 className="mb-2 font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                    {service.name}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {service.short}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Learn about {service.name.toLowerCase()} in Mirpur
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-primary px-8 py-6 text-lg shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25"
          >
            <Link href="/services">
              View all 10 dental services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
