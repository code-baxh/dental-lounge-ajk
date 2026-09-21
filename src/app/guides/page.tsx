import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationCTA from "@/components/LocationCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { GUIDES_BY_DATE } from "@/lib/guides";
import { PRACTITIONER, SITE_URL } from "@/lib/site";
import { breadcrumbSchema, graph } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Dental Health Guides | The Dental Lounge Mirpur" },
  description:
    "Practical dental health guides from The Dental Lounge, Mirpur AJK — treatment costs in Pakistan, planning treatment during a visit from the UK, dental emergencies, and the risks of paan and chhaliya.",
  alternates: { canonical: "/guides" },
};

const trail = [
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
];

export default function GuidesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <JsonLd
        data={graph(breadcrumbSchema(trail), {
          "@type": "Blog",
          name: "Dental health guides — The Dental Lounge, Mirpur AJK",
          url: `${SITE_URL}/guides`,
          inLanguage: "en-PK",
          publisher: { "@id": `${SITE_URL}/#clinic` },
          blogPost: GUIDES_BY_DATE.map((g) => ({
            "@type": "BlogPosting",
            headline: g.h1,
            url: `${SITE_URL}/guides/${g.slug}`,
            datePublished: g.datePublished,
            dateModified: g.dateModified,
            author: { "@id": `${SITE_URL}/#dr-jalal-aslam` },
          })),
        })}
      />

      <main id="main" className="flex-1">
        <Breadcrumbs trail={trail} />

        <section className="bg-gradient-to-br from-secondary via-background to-muted py-14">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h1 className="mb-6 text-balance font-display text-3xl font-bold text-foreground md:text-5xl">
                Dental Health <span className="text-primary">Guides</span>
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Straight answers to the questions patients in Mirpur actually ask — what treatment
                costs, how to plan it around a trip home from Britain, what to do in an emergency,
                how to replace a missing tooth, whether to choose braces or aligners, and the risks
                that matter most in this part of the world. Written and reviewed by{" "}
                <Link href="/about" className="font-medium text-primary underline underline-offset-2 hover:decoration-2">
                  {PRACTITIONER.name}
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
              {GUIDES_BY_DATE.map((g) => (
                <article
                  key={g.slug}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                >
                  <Link href={`/guides/${g.slug}`} className="flex h-full flex-col">
                    <h2 className="mb-3 font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                      {g.title}
                    </h2>
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {g.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3 w-3" aria-hidden />
                        {g.readingMinutes} min read
                      </span>
                      <time dateTime={g.dateModified}>
                        Updated{" "}
                        {new Date(g.dateModified).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <LocationCTA />
      </main>

      <Footer />
    </div>
  );
}
