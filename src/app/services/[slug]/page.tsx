import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Phone, MessageCircle, Check, ArrowRight } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import AreasServed from "@/components/AreasServed";
import { Button } from "@/components/ui/button";
import { SERVICES, getService } from "@/lib/services";
import { SERVICE_IMAGES, imageAlt } from "@/lib/service-images";
import { BUSINESS, SITE_URL, TEL_HREF, WHATSAPP_HREF } from "@/lib/site";
import { breadcrumbSchema, faqSchema, graph, medicalProcedureSchema } from "@/lib/schema";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = getService(params.slug);
  if (!service) return {};

  return {
    // `absolute` bypasses the "| The Dental Lounge Mirpur" template — these
    // titles already carry the brand and would otherwise overflow 60 chars.
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${SITE_URL}/services/${service.slug}`,
      type: "article",
    },
  };
}

const pkr = (n: number) => `PKR ${n.toLocaleString("en-PK")}`;

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const image = SERVICE_IMAGES[service.image];
  const related = service.related.map(getService).filter(Boolean);
  const url = `${SITE_URL}/services/${service.slug}`;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <JsonLd
        data={graph(
          medicalProcedureSchema({
            name: `${service.name} in Mirpur, AJK`,
            description: service.metaDescription,
            url,
            howPerformed: service.sections.find((s) => /what happens|the stages|what we do/i.test(s.heading))
              ?.body?.join(" "),
          }),
          faqSchema(service.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
        )}
      />

      <main id="main" className="flex-1">
        <Breadcrumbs
          trail={[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]}
        />

        {/* Hero */}
        <section className="bg-gradient-to-br from-secondary via-background to-muted py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
              <div>
                <h1 className="mb-4 text-balance font-display text-3xl font-bold leading-tight text-foreground md:text-5xl">
                  {service.h1}
                </h1>
                <p className="mb-2 text-lg text-muted-foreground" lang="ur" dir="rtl">
                  {service.urdu}
                </p>
                <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                  {service.short}
                </p>

                <dl className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-border bg-card p-4">
                    <dt className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" aria-hidden /> Typical time
                    </dt>
                    <dd className="text-sm font-semibold text-foreground">{service.duration}</dd>
                  </div>
                  {service.price && (
                    <div className="rounded-xl border border-border bg-card p-4">
                      <dt className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                        Typical cost in Pakistan
                      </dt>
                      <dd className="text-sm font-semibold text-foreground">
                        {pkr(service.price.low)} – {pkr(service.price.high)}
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <Link href="/contact">
                      Book an appointment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="border-0 bg-[#25D366] text-[#0A2E1F] hover:bg-[#25D366]/90"
                  >
                    <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp us
                    </a>
                  </Button>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={image}
                  alt={imageAlt(service.name)}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  placeholder="blur"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <article className="bg-background py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              {service.intro.map((para) => (
                <p key={para.slice(0, 40)} className="mb-5 text-lg leading-relaxed text-muted-foreground">
                  {para}
                </p>
              ))}

              {service.sections.map((section) => (
                <section key={section.heading} className="mt-12">
                  <h2 className="mb-5 font-display text-2xl font-bold text-foreground md:text-3xl">
                    {section.heading}
                  </h2>
                  {section.body?.map((para) => (
                    <p key={para.slice(0, 40)} className="mb-4 leading-relaxed text-muted-foreground">
                      {para}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="space-y-3">
                      {section.list.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-muted-foreground">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {service.price && (
                <aside className="mt-12 rounded-2xl border border-border bg-secondary/40 p-6">
                  <h2 className="mb-3 font-display text-xl font-bold text-foreground">
                    About the price range shown
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{service.price.note}</p>
                </aside>
              )}

              <aside className="mt-8 rounded-2xl border border-border bg-card p-6">
                <h2 className="mb-3 font-display text-xl font-bold text-foreground">
                  Visiting Mirpur from the UK?
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  A large share of our patients are back in Mirpur for a few weeks from Britain.
                  If that is you, tell us your travel dates at the very first appointment. Most
                  treatment — including two-stage work like crowns — can be sequenced to finish
                  before you fly, but only if we know the deadline from the start. Call{" "}
                  <a href={TEL_HREF} className="font-medium text-primary underline underline-offset-2 hover:decoration-2">
                    {BUSINESS.phoneIntlDisplay}
                  </a>{" "}
                  or message us on WhatsApp before you travel and we can plan it in advance.
                </p>
              </aside>
            </div>
          </div>
        </article>

        <FAQ
          faqs={service.faqs}
          heading={`${service.name} in Mirpur — common questions`}
          intro="Straight answers to what patients ask us most about this treatment."
        />

        {/* Related services */}
        {related.length > 0 && (
          <section className="bg-background py-16">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl">
                <h2 className="mb-8 font-display text-2xl font-bold text-foreground md:text-3xl">
                  Related treatments
                </h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {related.map((r) => (
                    <Link
                      key={r!.slug}
                      href={`/services/${r!.slug}`}
                      className="group rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                    >
                      <h3 className="mb-2 font-display font-semibold text-foreground transition-colors group-hover:text-primary">
                        {r!.name} in Mirpur
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{r!.short}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Location CTA */}
        <section className="bg-brand py-16 text-brand-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
              Book {service.name.toLowerCase()} in Mirpur
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-brand-foreground/80">
              The Dental Lounge, {BUSINESS.street}, {BUSINESS.locality}. Open{" "}
              {BUSINESS.openingHours.human}.
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

        <AreasServed />
      </main>

      <Footer />
    </div>
  );
}
