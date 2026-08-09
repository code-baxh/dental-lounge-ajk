import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, GraduationCap, Heart, MapPin, Shield, Users } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationCTA from "@/components/LocationCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import AreasServed from "@/components/AreasServed";
import JsonLd from "@/components/JsonLd";
import { ADDRESS_ONE_LINE, BUSINESS, PRACTITIONER } from "@/lib/site";
import { breadcrumbSchema, graph } from "@/lib/schema";
import drJalal from "../../../public/jalal.jpeg";

export const metadata: Metadata = {
  title: { absolute: "Dr. Jalal Aslam — Dentist in Mirpur AJK | The Dental Lounge" },
  description:
    "Meet Dr. Jalal Aslam, dental surgeon at The Dental Lounge, Fazal Chowk, New Mirpur City. Trained at the Institute of Dentistry, CMH Lahore. Call +92 345 308 1698.",
  alternates: { canonical: "/about" },
};

const trail = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

const values = [
  {
    icon: Heart,
    title: "Patient-Centered Care",
    description: "Every treatment plan is tailored to your needs, your budget and your comfort level.",
  },
  {
    icon: Shield,
    title: "Uncompromising Hygiene",
    description: "Strict sterilisation protocols, single-use items where required, and instruments autoclaved between every patient.",
  },
  {
    icon: Award,
    title: "Honest Advice",
    description: "We tell you what a tooth actually needs — including when the answer is that it needs nothing yet.",
  },
  {
    icon: Users,
    title: "Community Trust",
    description: "Building long-term relationships with families across Mirpur District, Bhimber and Kotli.",
  },
];

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <JsonLd data={graph(breadcrumbSchema(trail))} />

      <main id="main" className="flex-1">
        <Breadcrumbs trail={trail} />

        <section className="bg-gradient-to-br from-secondary via-background to-muted py-14">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              {/* text-balance evens the line lengths; nowrap keeps the place
                  name whole, so "AJK" is never stranded on its own line. */}
              <h1 className="mb-6 text-balance font-display text-3xl font-bold text-foreground md:text-5xl">
                About The Dental Lounge,{" "}
                <span className="whitespace-nowrap text-primary">Mirpur AJK</span>
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground">
                A modern dental clinic at Sardar Plaza, Fazal Chowk in New Mirpur City, Azad
                Kashmir — built to bring current clinical standards to the families of Mirpur
                District without the trip to Islamabad or Lahore.
              </p>
            </div>
          </div>
        </section>

        {/* Practitioner — the core E-E-A-T section for a YMYL medical site */}
        <section className="bg-background py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="grid items-start gap-12 md:grid-cols-2">
                <div className="overflow-hidden rounded-2xl bg-secondary">
                  <Image
                    src={drJalal}
                    alt="Dr. Jalal Aslam, dental surgeon at The Dental Lounge, Fazal Chowk, New Mirpur City, AJK"
                    className="h-full w-full rounded-2xl object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    placeholder="blur"
                    priority
                  />
                </div>
                <div>
                  <h2 className="mb-2 font-display text-3xl font-bold text-foreground">
                    Meet {PRACTITIONER.name}
                  </h2>
                  <p className="mb-5 text-sm font-medium uppercase tracking-wide text-primary">
                    {PRACTITIONER.jobTitle}
                    {PRACTITIONER.degree ? ` · ${PRACTITIONER.degree}` : ""}
                  </p>

                  <div className="mb-6 space-y-3 rounded-xl border border-border bg-card p-5">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Qualified at</p>
                        <p className="text-sm text-muted-foreground">{PRACTITIONER.alumniOf}</p>
                      </div>
                    </div>
                    {PRACTITIONER.pmdcNumber && (
                      <div className="flex items-start gap-3">
                        <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            PMDC registration
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {PRACTITIONER.pmdcNumber}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Practising at</p>
                        <p className="text-sm text-muted-foreground">{ADDRESS_ONE_LINE}</p>
                      </div>
                    </div>
                  </div>

                  <p className="mb-4 leading-relaxed text-muted-foreground">
                    I am Dr. Jalal Aslam, a dental surgeon committed to bringing modern,
                    high-standard oral healthcare to the heart of Mirpur, AJK. My training began
                    at the Institute of Dentistry, CMH Lahore Medical College, where I built a
                    foundation in clinical excellence, ethical practice and patient-first care.
                    Since then my focus has been on closing the gap between advanced dental
                    technology and a gentle, personalised patient experience — the kind of care
                    people in this district previously travelled to Islamabad or Lahore for.
                  </p>
                  <p className="mb-4 leading-relaxed text-muted-foreground">
                    I believe a dental visit should be informative and anxiety-free, not a source
                    of stress. Whether it is a routine cleaning or a complex smile makeover, my
                    priority is a painless, transparent process in which you are an active partner
                    in your own treatment. You will always be told what is wrong, what the options
                    are, what each one costs, and what happens if you do nothing.
                  </p>
                  <p className="leading-relaxed text-muted-foreground">
                    Consultations are available in Urdu, English and Pahari-Pothwari.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="bg-secondary/50 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-8">
                <h2 className="mb-4 font-display text-2xl font-bold text-foreground">Our Vision</h2>
                <p className="leading-relaxed text-muted-foreground">
                  To be the most trusted dental care provider in Mirpur, AJK — known for
                  commitment to excellence, patient comfort, and transforming smiles that boost
                  confidence and improve lives.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-8">
                <h2 className="mb-4 font-display text-2xl font-bold text-foreground">Our Mission</h2>
                <p className="leading-relaxed text-muted-foreground">
                  To provide the Mirpur community with honest, high-quality dental care at a fair
                  and clearly stated price — so that nobody puts off treatment because they do not
                  know what it will cost.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-background py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
                Our Values
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                The principles that guide everything we do at The Dental Lounge.
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <value.icon className="h-8 w-8 text-primary" aria-hidden />
                  </div>
                  <h3 className="mb-3 font-display text-lg font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clinic facts — quotable, checkable statements */}
        <section className="bg-secondary/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 font-display text-2xl font-bold text-foreground md:text-3xl">
                The clinic at a glance
              </h2>
              <dl className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
                {[
                  ["Address", ADDRESS_ONE_LINE],
                  ["Opening hours", BUSINESS.openingHours.human],
                  ["Phone / WhatsApp", `${BUSINESS.phoneIntlDisplay} (${BUSINESS.phoneDisplay})`],
                  ["Languages", "Urdu, English, Pahari-Pothwari"],
                  ["Payment", "Cash and bank transfer, in Pakistani rupees"],
                  ["Treatments", "General dentistry, root canals, implants, orthodontics, crowns and bridges, dentures, scaling, whitening, extractions, cosmetic dentistry"],
                ].map(([label, value]) => (
                  <div key={label} className="grid gap-1 p-5 sm:grid-cols-3">
                    <dt className="text-sm font-semibold text-foreground">{label}</dt>
                    <dd className="text-sm leading-relaxed text-muted-foreground sm:col-span-2">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm text-muted-foreground">
                See the full{" "}
                <Link href="/services" className="font-medium text-primary underline underline-offset-2 hover:decoration-2">
                  list of dental services in Mirpur
                </Link>{" "}
                or the{" "}
                <Link href="/areas" className="font-medium text-primary underline underline-offset-2 hover:decoration-2">
                  areas we serve around Mirpur
                </Link>
                .
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
