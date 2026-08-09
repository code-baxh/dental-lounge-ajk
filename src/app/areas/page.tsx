import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationCTA from "@/components/LocationCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { AREAS } from "@/lib/areas";
import { ADDRESS_ONE_LINE, BUSINESS, SITE_URL } from "@/lib/site";
import { breadcrumbSchema, graph } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Areas We Serve Around Mirpur AJK | The Dental Lounge" },
  description:
    "Dental clinic at Fazal Chowk, New Mirpur City, serving Dadyal, Chakswari, Khari Sharif, Islamgarh, Jatlan, Mangla, Bhimber, Kotli, Dina and Jhelum. Call +92 345 308 1698.",
  alternates: { canonical: "/areas" },
};

const trail = [
  { name: "Home", path: "/" },
  { name: "Areas We Serve", path: "/areas" },
];

export default function AreasPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <JsonLd
        data={graph(breadcrumbSchema(trail), {
          "@type": "ItemList",
          name: "Areas served by The Dental Lounge, Mirpur AJK",
          itemListElement: AREAS.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: a.name,
            url: `${SITE_URL}/areas/${a.slug}`,
          })),
        })}
      />

      <main id="main" className="flex-1">
        <Breadcrumbs trail={trail} />

        <section className="bg-gradient-to-br from-secondary via-background to-muted py-14">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h1 className="mb-6 text-balance font-display text-4xl font-bold text-foreground md:text-5xl">
                Areas We Serve Around{" "}
                <span className="whitespace-nowrap text-primary">Mirpur, AJK</span>
              </h1>
              <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                The Dental Lounge is at Sardar Plaza, Fazal Chowk, in New Mirpur City. Mirpur is
                the district hub, so patients travel in regularly from across Mirpur District —
                Dadyal, Chakswari, Khari Sharif, Islamgarh, Jatlan and Mangla — and from the
                neighbouring districts of Bhimber and Kotli.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We also see patients from Dina and Jhelum, just across the boundary in Punjab, who
                find the drive over Mangla shorter than going into Jhelum city.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-5 md:grid-cols-2">
                {AREAS.map((area) => (
                  <article
                    key={area.slug}
                    className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                  >
                    <Link href={`/areas/${area.slug}`}>
                      <h2 className="mb-1 font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                        Dentist for {area.name}
                      </h2>
                      <p className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
                        {area.district} · about {area.approxKm} km · {area.approxDrive}
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {area.intro[0]}
                      </p>
                      <span className="mt-4 inline-block text-sm font-medium text-primary">
                        Read more about {area.name} →
                      </span>
                    </Link>
                  </article>
                ))}
              </div>

              <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-6">
                <h2 className="mb-3 font-display text-xl font-bold text-foreground">
                  Not on the list?
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  These are simply the areas patients most often travel from — we see anyone who
                  can get to the clinic. If you are elsewhere in Azad Kashmir or northern Punjab,
                  call {BUSINESS.phoneIntlDisplay} and we will tell you honestly whether the
                  journey is worth it for what you need.
                </p>
                <address className="mt-4 not-italic text-sm text-muted-foreground">
                  {ADDRESS_ONE_LINE} · {BUSINESS.openingHours.human}
                </address>
              </div>
            </div>
          </div>
        </section>

        <LocationCTA />
      </main>

      <Footer />
    </div>
  );
}
