import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ADDRESS_ONE_LINE,
  BUSINESS,
  MAILTO_HREF,
  TEL_HREF,
  WHATSAPP_HREF,
} from "@/lib/site";
import { breadcrumbSchema, graph } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Contact & Book an Appointment | Dentist in Mirpur AJK" },
  description:
    "Book a dental appointment at The Dental Lounge, Sardar Plaza, Fazal Chowk, New Mirpur City, Azad Kashmir. Call +92 345 308 1698 or message on WhatsApp. Open 10am–9pm daily.",
  alternates: { canonical: "/contact" },
};

const trail = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: BUSINESS.phoneIntlDisplay,
    sub: `Local: ${BUSINESS.phoneDisplay}`,
    link: TEL_HREF,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    details: BUSINESS.phoneIntlDisplay,
    sub: "Fastest way to reach us",
    link: WHATSAPP_HREF,
  },
  {
    icon: Mail,
    title: "Email",
    details: BUSINESS.email,
    sub: null,
    link: MAILTO_HREF,
  },
  {
    icon: MapPin,
    title: "Address",
    details: ADDRESS_ONE_LINE,
    sub: "In the centre of New Mirpur City",
    link: BUSINESS.mapsUrl,
  },
  {
    icon: Clock,
    title: "Opening hours",
    details: BUSINESS.openingHours.human,
    sub: "Including evenings and weekends",
    link: null,
  },
];

export default function Contact() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <JsonLd data={graph(breadcrumbSchema(trail))} />

      <main id="main" className="flex-1">
        <Breadcrumbs trail={trail} />

        <section className="bg-gradient-to-br from-secondary via-background to-muted py-14">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-balance font-display text-3xl font-bold text-foreground md:text-5xl">
                Contact The Dental Lounge,{" "}
                <span className="whitespace-nowrap text-primary">Mirpur AJK</span>
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We are at Sardar Plaza, Fazal Chowk in New Mirpur City, open{" "}
                {BUSINESS.openingHours.human}. Call, message on WhatsApp, or send the form below and
                we will confirm a time.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 font-display text-2xl font-bold text-foreground">Get in touch</h2>
                <p className="mb-8 text-muted-foreground">
                  Have a question or want to schedule an appointment? Reach out by phone, WhatsApp,
                  or fill in the form. We usually reply within a few hours during opening times.
                </p>

                <ul className="mb-8 space-y-4">
                  {contactInfo.map((info) => (
                    <li key={info.title}>
                      <Card className="border-border">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                              <info.icon className="h-5 w-5 text-primary" aria-hidden />
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-semibold text-foreground">{info.title}</h3>
                              {info.link ? (
                                <a
                                  href={info.link}
                                  target={info.link.startsWith("http") ? "_blank" : undefined}
                                  rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                                  className="break-words text-muted-foreground transition-colors hover:text-primary"
                                >
                                  {info.details}
                                </a>
                              ) : (
                                <p className="text-muted-foreground">{info.details}</p>
                              )}
                              {/* Full-strength muted, not /70: dimming an
                                  already-muted token drops it to 3.09:1. */}
                              {info.sub && (
                                <p className="mt-0.5 text-xs text-muted-foreground">{info.sub}</p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  size="lg"
                  className="w-full bg-[#25D366] text-[#0A2E1F] hover:bg-[#25D366]/90"
                >
                  <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Chat on WhatsApp
                  </a>
                </Button>

                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  Please do not send detailed medical history or clinical photographs by WhatsApp —
                  bring those to your appointment. For facial swelling, difficulty breathing or
                  swallowing, or uncontrolled bleeding, go to the nearest hospital immediately.
                </p>
              </div>

              <div>
                <Card className="border-border">
                  <CardContent className="p-8">
                    <h2 className="mb-2 font-display text-2xl font-bold text-foreground">
                      Book an appointment
                    </h2>
                    <p className="mb-6 text-muted-foreground">
                      Fill in the form and we will get back to you shortly. Travelling in from
                      Dadyal, Bhimber or Kotli? Mention it and we will group your treatment into
                      fewer visits.
                    </p>
                    <ContactForm />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="bg-secondary/50 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 text-center">
                <h2 className="mb-4 font-display text-3xl font-bold text-foreground">
                  Find us at Fazal Chowk, Mirpur
                </h2>
                <address className="not-italic text-muted-foreground">{ADDRESS_ONE_LINE}</address>
              </div>

              {/* Previously a fixed 600x450 iframe inside an aspect-video box,
                  which overflowed on mobile. Now fluid. */}
              <div className="overflow-hidden rounded-2xl border border-border">
                <iframe
                  src={BUSINESS.mapEmbedSrc}
                  title="Map showing The Dental Lounge at Sardar Plaza, Fazal Chowk, New Mirpur City, AJK"
                  className="aspect-video w-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="mt-6 text-center">
                <a
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline underline-offset-2 hover:decoration-2"
                >
                  Open in Google Maps and get directions →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
