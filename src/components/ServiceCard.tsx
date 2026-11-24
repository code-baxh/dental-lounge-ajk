import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Wallet } from "lucide-react";
import type { Service } from "@/lib/services";
import { IMAGE_POSITION, SERVICE_IMAGES, imageAlt } from "@/lib/service-images";

const pkr = (n: number) => n.toLocaleString("en-PK");

/**
 * Treatment card for the homepage and /services grids.
 *
 * A real clinic photo on top (each treatment has its own, see
 * lib/service-images.ts), then what people compare: how long it takes and,
 * where there is a published range, what it typically costs in Pakistan
 * (labelled as such, never as this clinic's fee).
 */
export default function ServiceCard({
  service,
  as: Heading = "h3",
  showUrdu = false,
  linkLabel,
}: {
  service: Service;
  as?: "h2" | "h3";
  showUrdu?: boolean;
  linkLabel: string;
}) {
  return (
    <article className="group h-full">
      <Link
        href={`/services/${service.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
      >
        <div className="relative h-48 shrink-0 overflow-hidden">
          <Image
            src={SERVICE_IMAGES[service.image]}
            alt={service.imageAlt ?? imageAlt(service.name, service.image)}
            fill
            // The card sits inside the container's px-4, so on a phone the
            // slot is ~100vw minus 2rem, not 100vw.
            sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1024px) calc(50vw - 2rem), 400px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: IMAGE_POSITION[service.image] }}
            placeholder="blur"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <Heading className="mb-1 font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
            {service.name}
          </Heading>
          {showUrdu && (
            <p className="mb-2 text-sm text-muted-foreground" lang="ur" dir="rtl">
              {service.urdu}
            </p>
          )}
          <p className="mb-5 mt-1 text-sm leading-relaxed text-muted-foreground">{service.short}</p>

          <dl className="mb-5 mt-auto space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex gap-3">
              <dt className="flex w-14 shrink-0 items-center gap-1.5 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                Time
              </dt>
              <dd className="min-w-0 text-foreground">{service.duration}</dd>
            </div>
            {service.price && (
              <div className="flex gap-3">
                <dt className="flex w-14 shrink-0 items-center gap-1.5 text-muted-foreground">
                  <Wallet className="h-3.5 w-3.5" aria-hidden />
                  Cost
                </dt>
                <dd className="min-w-0 text-foreground">
                  <span className="tabular-nums">
                    PKR {pkr(service.price.low)}–{pkr(service.price.high)}
                  </span>{" "}
                  <span className="text-muted-foreground">typical in Pakistan</span>
                </dd>
              </div>
            )}
          </dl>

          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
            {linkLabel}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
