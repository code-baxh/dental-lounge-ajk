import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationCTA from "@/components/LocationCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import AreasServed from "@/components/AreasServed";
import JsonLd from "@/components/JsonLd";
import { SERVICES } from "@/lib/services";
import { SERVICE_IMAGES, imageAlt } from "@/lib/service-images";
import { BUSINESS, SITE_URL, TEL_HREF } from "@/lib/site";
import { breadcrumbSchema, graph } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Dental Services in Mirpur AJK | The Dental Lounge" },
  description:
    "All dental treatments at The Dental Lounge, Fazal Chowk, New Mirpur City — root canals, implants, braces, crowns, dentures, scaling, whitening and check-ups. Call +92 345 308 1698.",
  alternates: { canonical: "/services" },
};

const trail = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <JsonLd
        data={graph(
          breadcrumbSchema(trail),
          {
            "@type": "ItemList",
            name: "Dental treatments in Mirpur, AJK",
            itemListElement: SERVICES.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.name,
              url: `${SITE_URL}/services/${s.slug}`,
            })),
          },
        )}
      />

      <main id="main" className="flex-1">
        <Breadcrumbs trail={trail} />

        <section className="bg-gradient-to-br from-secondary via-background to-muted py-14">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-balance font-display text-4xl font-bold text-foreground md:text-5xl">
                Dental Services in{" "}
                <span className="whitespace-nowrap text-primary">Mirpur, AJK</span>
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Ten treatments, all under one roof at Sardar Plaza, Fazal Chowk in New Mirpur
                City. Each page below sets out what the treatment involves, how long it takes,
                what it typically costs in Pakistan, and the questions patients ask us most.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service) => (
                <article
                  key={service.slug}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
                >
                  <Link href={`/services/${service.slug}`} className="block">
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={SERVICE_IMAGES[service.image]}
                        alt={imageAlt(service.name)}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        placeholder="blur"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="mb-1 font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                        {service.name}
                      </h2>
                      <p className="mb-3 text-sm text-muted-foreground" lang="ur" dir="rtl">
                        {service.urdu}
                      </p>
                      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                        {service.short}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                        {service.name} in Mirpur
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Wayfinding by chowk and sector — how people in Mirpur actually
            navigate, and a genuine local-relevance signal. */}
        <section className="bg-secondary/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-5 font-display text-2xl font-bold text-foreground md:text-3xl">
                Finding the clinic in New Mirpur City
              </h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                We are in Sardar Plaza at Fazal Chowk, in the centre of New Mirpur City. If you
                are coming from Kachehri Chowk or Allama Iqbal Road it is a few minutes; the
                sectors — F-1, F-2, B-3, C-1 and D-2 — are all a short drive. Coming in on the
                Mirpur–Jhelum road past Mangla Dam, continue through to Fazal Chowk.
              </p>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                Parking is available at the plaza. If you are travelling from further out —
                Dadyal, Chakswari, Khari Sharif, Islamgarh, Bhimber or Kotli — call ahead on{" "}
                <a href={TEL_HREF} className="font-medium text-primary underline underline-offset-2 hover:decoration-2">
                  {BUSINESS.phoneIntlDisplay}
                </a>{" "}
                and we will confirm a time before you set off.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                Consultations are available in Urdu, English and Pahari-Pothwari. We are open{" "}
                {BUSINESS.openingHours.human}, which includes evenings and both weekend days.
              </p>
            </div>
          </div>
        </section>

        <AreasServed />
        <LocationCTA />
      </main>

      <Footer />
    </div>
  );
}
