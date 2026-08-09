import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, MessageCircle, Star } from "lucide-react";
import logo from "@/assets/logo.jpeg";
import { SERVICES } from "@/lib/services";
import { AREAS } from "@/lib/areas";
import {
  BUSINESS,
  GOOGLE_REVIEWS,
  MAILTO_HREF,
  PRACTITIONER,
  TEL_HREF,
  WHATSAPP_HREF,
} from "@/lib/site";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Dr. Jalal Aslam", href: "/about" },
  { name: "Dental Services", href: "/services" },
  { name: "Areas We Serve", href: "/areas" },
  { name: "Dental Health Guides", href: "/guides" },
  { name: "Contact & Booking", href: "/contact" },
];

const Footer = () => {
  return (
    <footer className="bg-brand text-brand-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + NAP. This block is the canonical NAP: it must stay
              byte-identical to the Google Business Profile listing. */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src={logo}
                alt="The Dental Lounge logo — dental clinic in Mirpur, AJK"
                className="h-12 w-auto rounded-lg"
                width={48}
                height={48}
              />
              <div>
                <p className="font-display text-lg font-semibold">{BUSINESS.name}</p>
                <p className="text-xs text-brand-foreground/70">{BUSINESS.tagline}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-brand-foreground/80">
              Dental clinic at Fazal Chowk in New Mirpur City, Azad Kashmir — serving Mirpur
              District, Bhimber, Kotli, and Dina and Jhelum across the Punjab boundary.
            </p>

            <div className="flex gap-3 pt-2">
              <a
                href={BUSINESS.social[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-foreground/70 transition-colors hover:text-brand-foreground"
                aria-label="The Dental Lounge Mirpur on Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={BUSINESS.social[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-foreground/70 transition-colors hover:text-brand-foreground"
                aria-label="The Dental Lounge Mirpur on Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.117.6c-.779.263-1.618.65-2.18 1.21-.56.571-.947 1.4-1.21 2.18-.267.788-.468 1.658-.527 2.936C.039 8.333.024 8.74 0 12c0 3.26.015 3.667.072 4.947.06 1.277.261 2.148.528 2.936.271.783.66 1.612 1.213 2.176.571.557 1.4.946 2.18 1.21.778.272 1.648.472 2.926.527 1.28.058 1.687.072 4.947.072s3.667-.015 4.947-.072c1.280-.056 2.148-.256 2.930-.527.783-.264 1.612-.659 2.173-1.213.558-.576.948-1.399 1.213-2.176.267-.788.468-1.658.527-2.936.058-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.261-2.148-.527-2.936-.264-.782-.659-1.611-1.213-2.176-.576-.558-1.398-.947-2.176-1.21-.778-.272-1.648-.472-2.926-.527C15.667.06 15.26.044 12 0zm0 2.16c3.203 0 3.585.009 4.849.064 1.17.054 1.805.244 2.227.404.56.217.96.477 1.382.896.419.42.679.822.896 1.381.164.422.35 1.057.404 2.227.055 1.266.07 1.646.07 4.849s-.015 3.583-.074 4.849c-.054 1.17-.244 1.805-.404 2.227-.217.56-.477.96-.896 1.382-.42.419-.822.679-1.381.896-.422.164-1.057.35-2.227.404-1.266.055-1.646.07-4.849.07s-3.583-.015-4.849-.074c-1.17-.054-1.805-.244-2.227-.404-.56-.217-.96-.477-1.382-.896-.419-.42-.679-.822-.896-1.381-.164-.422-.35-1.057-.404-2.227-.055-1.266-.07-1.646-.07-4.849s.015-3.583.074-4.849c.054-1.17.244-1.805.404-2.227.217-.56.477-.96.896-1.382.42-.419.822-.679 1.381-.896.422-.164 1.057-.35 2.227-.404 1.267-.055 1.647-.07 4.849-.07zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm4.915-10.348c-.796 0-1.441-.645-1.441-1.44s.645-1.44 1.44-1.44c.795 0 1.44.645 1.44 1.44s-.645 1.44-1.44 1.44z" />
                </svg>
              </a>
              <a
                href={BUSINESS.social[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-foreground/70 transition-colors hover:text-brand-foreground"
                aria-label="Dr. Jalal Aslam on TikTok"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.86 2.86 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.54-.05z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <h2 className="mb-4 font-display text-lg font-semibold">Quick Links</h2>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-brand-foreground/80 transition-colors hover:text-brand-foreground"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="mb-3 mt-6 font-display text-lg font-semibold">Areas We Serve</h2>
            <ul className="space-y-2">
              {AREAS.slice(0, 5).map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/areas/${a.slug}`}
                    className="text-sm text-brand-foreground/80 transition-colors hover:text-brand-foreground"
                  >
                    Dentist for {a.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/areas"
                  className="text-sm font-medium text-brand-foreground/90 underline-offset-4 hover:underline"
                >
                  All areas →
                </Link>
              </li>
            </ul>
          </nav>

          {/* Services — real links, so every service page has a site-wide route in */}
          <nav aria-label="Dental services">
            <h2 className="mb-4 font-display text-lg font-semibold">Our Services</h2>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-brand-foreground/80 transition-colors hover:text-brand-foreground"
                  >
                    {s.name} in Mirpur
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="mb-4 font-display text-lg font-semibold">Contact Us</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <address className="text-sm not-italic text-brand-foreground/80">
                  {BUSINESS.street}
                  <br />
                  {BUSINESS.locality}
                  <br />
                  {BUSINESS.region} {BUSINESS.postalCode}
                  <br />
                  {BUSINESS.country}
                </address>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                <a
                  href={TEL_HREF}
                  className="text-sm text-brand-foreground/80 transition-colors hover:text-brand-foreground"
                >
                  {BUSINESS.phoneIntlDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-foreground/80 transition-colors hover:text-brand-foreground"
                >
                  WhatsApp {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                <a
                  href={MAILTO_HREF}
                  className="break-all text-sm text-brand-foreground/80 transition-colors hover:text-brand-foreground"
                >
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <span className="text-sm text-brand-foreground/80">
                  {BUSINESS.openingHours.human}
                </span>
              </li>
            </ul>

            <div className="mt-4 space-y-2">
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm font-medium text-brand-foreground/90 underline-offset-4 hover:underline"
              >
                Get directions on Google Maps →
              </a>
              {/* Steady review flow is the strongest single lever on local-pack
                  placement, so the ask is on every page. */}
              {/* Lucide SVG rather than a ★ text glyph — the rest of the site
                  renders stars as SVG, and glyph rendering varies by font. */}
              <a
                href={GOOGLE_REVIEWS.writeUrl || GOOGLE_REVIEWS.readUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand-foreground/90 underline-offset-4 hover:underline"
              >
                Leave us a Google review ({GOOGLE_REVIEWS.ratingValue.toFixed(1)}
                <Star className="h-3 w-3 fill-current" aria-hidden />
                from {GOOGLE_REVIEWS.reviewCount}) →
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-brand-foreground/20 pt-8">
          {/* Regulatory identity. Renders only once a real PMDC number is set
              in lib/site.ts — a wrong or placeholder registration number on a
              medical site is worse than none. */}
          {PRACTITIONER.pmdcNumber && (
            <p className="mb-4 text-center text-xs text-brand-foreground/60">
              Dental services provided by {PRACTITIONER.name}
              {PRACTITIONER.degree ? `, ${PRACTITIONER.degree}` : ""} · Registered with the
              Pakistan Medical &amp; Dental Council, registration no.{" "}
              {PRACTITIONER.pmdcNumber}
            </p>
          )}

          <div className="flex flex-col items-center justify-between gap-4 text-sm text-brand-foreground/70 md:flex-row">
            <p>
              © {new Date().getFullYear()} {BUSINESS.name}, {BUSINESS.locality}, {BUSINESS.regionShort}.
              All rights reserved.
            </p>
            <div className="flex gap-5">
              <Link href="/privacy-policy" className="transition-colors hover:text-brand-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition-colors hover:text-brand-foreground">
                Terms &amp; Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
