import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Car, Check, MapPin, MessageCircle, Phone, Route } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import AreasServed from "@/components/AreasServed";
import { Button } from "@/components/ui/button";
import { AREAS, getArea } from "@/lib/areas";
import { SERVICES } from "@/lib/services";
import { ADDRESS_ONE_LINE, BUSINESS, SITE_URL, TEL_HREF, WHATSAPP_HREF } from "@/lib/site";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/schema";

export function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const area = getArea(params.slug);
  if (!area) return {};

  return {
    title: { absolute: area.metaTitle },
    description: area.metaDescription,
    alternates: { canonical: `/areas/${area.slug}` },
    openGraph: {
      title: area.metaTitle,
      description: area.metaDescription,
      url: `${SITE_URL}/areas/${area.slug}`,
      type: "article",
    },
  };
}

export default function AreaPage({ params }: { params: { slug: string } }) {
  const area = getArea(params.slug);
  if (!area) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Areas We Serve", path: "/areas" },
    { name: area.name, path: `/areas/${area.slug}` },
  ];

  const faqs = [
    {
      q: `How far is The Dental Lounge from ${area.name}?`,
      a: `The clinic is at Sardar Plaza, Fazal Chowk in New Mirpur City — approximately ${area.approxKm} km from ${area.name}, ${area.approxDrive} by road ${area.route}.`,
    },
    {
      q: `Do I need an appointment, or can I walk in from ${area.name}?`,
      a: `Walk-ins are seen when there is a free slot, but if you are travelling ${area.approxDrive} we strongly recommend calling ${BUSINESS.phoneIntlDisplay} or messaging on WhatsApp first. We will confirm a time so the journey is not wasted, and tell you the likely cost before you set off.`,
    },
    {
      q: `What are your opening hours?`,
      a: `${BUSINESS.openingHours.human}. Later appointments suit patients travelling in from ${area.name} after work.`,
    },
    {
      q: `Can treatment be done in fewer visits because of the travel?`,
      a: `Where it is clinically safe, yes. Tell us at the first appointment that you are coming from ${area.name} and we will group work into longer sessions rather than spreading it over more trips.`,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <JsonLd
        data={graph(
          breadcrumbSchema(trail),
          faqSchema(faqs),
          {
            "@type": "WebPage",
            name: area.metaTitle,
            description: area.metaDescription,
            url: `${SITE_URL}/areas/${area.slug}`,
            about: { "@id": `${SITE_URL}/#clinic` },
            mainEntity: { "@id": `${SITE_URL}/#clinic` },
          },
        )}
      />

      <main id="main" className="flex-1">
        <Breadcrumbs trail={trail} />

        <section className="bg-gradient-to-br from-secondary via-background to-muted py-14">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                {area.district}
              </p>
              <h1 className="mb-6 text-balance font-display text-3xl font-bold leading-tight text-foreground md:text-5xl">
                Dentist for {area.name} — The Dental Lounge, Mirpur
              </h1>
              {area.intro.map((para) => (
                <p key={para.slice(0, 40)} className="mb-4 text-lg leading-relaxed text-muted-foreground">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-background py-14">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <div className="mb-12 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-5">
                  <Route className="mb-2 h-5 w-5 text-primary" aria-hidden />
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Distance</p>
                  <p className="font-semibold text-foreground">about {area.approxKm} km</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <Car className="mb-2 h-5 w-5 text-primary" aria-hidden />
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Drive time</p>
                  <p className="font-semibold text-foreground">{area.approxDrive}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <MapPin className="mb-2 h-5 w-5 text-primary" aria-hidden />
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Route</p>
                  <p className="font-semibold text-foreground">{area.route}</p>
                </div>
              </div>

              <h2 className="mb-5 font-display text-2xl font-bold text-foreground md:text-3xl">
                Getting here from {area.name}
              </h2>
              <ul className="mb-12 space-y-3">
                {area.localContext.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="mb-5 font-display text-2xl font-bold text-foreground md:text-3xl">
                What {area.name} patients usually come to us for
              </h2>
              <ul className="mb-12 space-y-3">
                {area.commonReasons.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl border border-border bg-secondary/40 p-6">
                <h2 className="mb-3 font-display text-xl font-bold text-foreground">
                  Where to find us
                </h2>
                <address className="mb-4 not-italic leading-relaxed text-muted-foreground">
                  The Dental Lounge
                  <br />
                  {ADDRESS_ONE_LINE}
                  <br />
                  {BUSINESS.openingHours.human}
                </address>
                <a
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-primary underline underline-offset-2 hover:decoration-2"
                >
                  <MapPin className="h-4 w-4" aria-hidden />
                  Get directions from {area.name} on Google Maps
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Service links — gives each area page a route into the money pages */}
        <section className="bg-secondary/30 py-14">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 font-display text-2xl font-bold text-foreground md:text-3xl">
                Treatments available to {area.name} patients
              </h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                    >
                      <span className="font-medium text-foreground">{s.name}</span>
                      <span className="text-sm text-primary">View →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-background py-14" aria-labelledby="area-faq">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 id="area-faq" className="mb-8 font-display text-2xl font-bold text-foreground md:text-3xl">
                Questions from {area.name} patients
              </h2>
              <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
                {faqs.map((f) => (
                  <details key={f.q} className="group">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-6 font-semibold text-foreground transition-colors hover:text-primary">
                      <h3 className="text-base">{f.q}</h3>
                      <span aria-hidden className="mt-0.5 shrink-0 text-primary transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <div className="px-6 pb-6 leading-relaxed text-muted-foreground">{f.a}</div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-brand py-16 text-brand-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
              Travelling in from {area.name}? Call first.
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-brand-foreground/80">
              We will confirm a time, tell you what the appointment will cost, and make sure the
              journey is worth making.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary">
                <a href={TEL_HREF}>
                  <Phone className="mr-2 h-4 w-4" />
                  {BUSINESS.phoneIntlDisplay}
                </a>
              </Button>
              <Button asChild size="lg" className="border-0 bg-[#25D366] text-[#0A2E1F] hover:bg-[#25D366]/90">
                <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>

        <AreasServed exclude={area.slug} />
      </main>

      <Footer />
    </div>
  );
}
