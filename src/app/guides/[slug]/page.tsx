import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, Clock, Phone } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { GUIDES, getGuide, type GuideBlock } from "@/lib/guides";
import { getService } from "@/lib/services";
import { BUSINESS, PRACTITIONER, SITE_URL, TEL_HREF } from "@/lib/site";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/schema";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const guide = getGuide(params.slug);
  if (!guide) return {};

  return {
    title: { absolute: guide.metaTitle },
    description: guide.metaDescription,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `${SITE_URL}/guides/${guide.slug}`,
      type: "article",
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
      authors: [`${SITE_URL}/about`],
    },
  };
}

function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mb-4 mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mb-3 mt-8 font-display text-xl font-semibold text-foreground">
          {block.text}
        </h3>
      );
    case "p":
      return <p className="mb-4 leading-relaxed text-muted-foreground">{block.text}</p>;
    case "ul":
      return (
        <ul className="mb-6 ml-5 list-disc space-y-2">
          {block.items.map((i) => (
            <li key={i} className="leading-relaxed text-muted-foreground">
              {i}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mb-6 ml-5 list-decimal space-y-2">
          {block.items.map((i) => (
            <li key={i} className="leading-relaxed text-muted-foreground">
              {i}
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <aside className="my-8 rounded-2xl border-2 border-primary/30 bg-secondary/50 p-6">
          <p className="mb-2 flex items-center gap-2 font-display text-lg font-bold text-foreground">
            <AlertTriangle className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            {block.title}
          </p>
          <p className="leading-relaxed text-muted-foreground">{block.text}</p>
        </aside>
      );
    case "table":
      return (
        <figure className="my-8">
          {/* Wide tables scroll inside their own container rather than
              pushing the page body sideways on mobile.

              tabIndex + role make that scroll region reachable by keyboard —
              without them a keyboard-only user cannot scroll the table at all
              and simply never sees the right-hand columns (WCAG 2.1.1). */}
          <div
            className="overflow-x-auto rounded-2xl border border-border"
            tabIndex={0}
            role="region"
            aria-label={block.caption ?? "Price table, scrollable horizontally"}
          >
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <thead className="bg-secondary/60">
                <tr>
                  {block.head.map((h) => (
                    <th key={h} className="whitespace-nowrap p-4 font-semibold text-foreground">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {block.rows.map((row) => (
                  <tr key={row[0]} className="align-top">
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        className={
                          i === 0
                            ? "p-4 font-medium text-foreground"
                            : "p-4 text-muted-foreground"
                        }
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-xs text-muted-foreground">{block.caption}</figcaption>
          )}
        </figure>
      );
  }
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = getGuide(params.slug);
  if (!guide) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
    { name: guide.title, path: `/guides/${guide.slug}` },
  ];

  const related = guide.relatedServices.map(getService).filter(Boolean);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <JsonLd
        data={graph(
          {
            "@type": "Article",
            headline: guide.h1,
            description: guide.metaDescription,
            url: `${SITE_URL}/guides/${guide.slug}`,
            datePublished: guide.datePublished,
            dateModified: guide.dateModified,
            inLanguage: "en-PK",
            author: { "@id": `${SITE_URL}/#dr-jalal-aslam` },
            reviewedBy: { "@id": `${SITE_URL}/#dr-jalal-aslam` },
            publisher: { "@id": `${SITE_URL}/#clinic` },
            mainEntityOfPage: `${SITE_URL}/guides/${guide.slug}`,
            about: { "@type": "MedicalEntity", name: "Dentistry" },
          },
          faqSchema(guide.faqs),
          breadcrumbSchema(trail),
        )}
      />

      <main id="main" className="flex-1">
        <Breadcrumbs trail={trail} />

        <article className="bg-background py-10">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h1 className="mb-4 text-balance font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
                {guide.h1}
              </h1>

              {/* Visible authorship and dates — the "Who" and freshness
                  signals Google's helpful-content guidance asks for on YMYL. */}
              <div className="mb-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border pb-6 text-sm text-muted-foreground">
                <span>
                  Reviewed by{" "}
                  <Link href="/about" className="font-medium text-primary underline underline-offset-2 hover:decoration-2">
                    {PRACTITIONER.name}
                  </Link>
                  {PRACTITIONER.degree ? `, ${PRACTITIONER.degree}` : ""}
                </span>
                <span>
                  Updated{" "}
                  <time dateTime={guide.dateModified}>
                    {new Date(guide.dateModified).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  {guide.readingMinutes} min read
                </span>
              </div>

              <p className="mb-8 text-lg leading-relaxed text-foreground">{guide.excerpt}</p>

              {guide.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}

              <aside className="mt-12 rounded-2xl border border-border bg-secondary/40 p-6">
                <p className="mb-2 font-display text-lg font-bold text-foreground">
                  General information, not a diagnosis
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  This guide is general dental health information and cannot replace an
                  examination. See our{" "}
                  <Link href="/terms" className="text-primary underline underline-offset-2 hover:decoration-2">
                    medical disclaimer
                  </Link>
                  . For advice about your own teeth, book an appointment at The Dental Lounge,{" "}
                  {BUSINESS.street}, {BUSINESS.locality} — open {BUSINESS.openingHours.human}.
                </p>
              </aside>
            </div>
          </div>
        </article>

        <FAQ faqs={guide.faqs} heading="Common questions" />

        {related.length > 0 && (
          <section className="bg-background py-14">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-3xl">
                <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
                  Related treatments in Mirpur
                </h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {related.map((r) => (
                    <Link
                      key={r!.slug}
                      href={`/services/${r!.slug}`}
                      className="group rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                    >
                      <h3 className="font-display font-semibold text-foreground transition-colors group-hover:text-primary">
                        {r!.name}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="bg-brand py-14 text-brand-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 font-display text-2xl font-bold md:text-3xl">
              Questions about your own teeth?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-brand-foreground/80">
              Book an examination at Fazal Chowk, New Mirpur City. Open{" "}
              {BUSINESS.openingHours.human}.
            </p>
            <Button asChild size="lg" variant="secondary">
              <a href={TEL_HREF}>
                <Phone className="mr-2 h-4 w-4" />
                {BUSINESS.phoneIntlDisplay}
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
