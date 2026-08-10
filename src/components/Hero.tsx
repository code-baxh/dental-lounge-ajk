import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Sparkles } from "lucide-react";
import { GoogleRatingBadge } from "@/components/GoogleRating";

/**
 * Server component. This was "use client" purely to run framer-motion entrance
 * animations, which cost the homepage 2.4s of LCP: every element started at
 * opacity 0 and stayed invisible until the client bundle hydrated. The
 * entrances are now CSS (see globals.css), so the hero ships zero JS and paints
 * with the document.
 *
 * The heading and subheading use .hero-rise — transform only, no opacity —
 * because the subheading is the LCP element and opacity would gate it again.
 */
const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-secondary via-background to-muted overflow-hidden">
      {/* Decorative ambient blobs — aria-hidden, no layout impact. */}
      <div
        className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-blob-a"
        aria-hidden
      />
      <div
        className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-blob-b"
        aria-hidden
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-blob-spin"
        aria-hidden
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="hero-fade-rise inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full mb-8 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" aria-hidden />
            <span className="text-sm font-medium">
              Fazal Chowk, New Mirpur City · Open 10am–9pm, 7 days
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="hero-rise font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
            <span className="text-primary relative">
              Dentist in Mirpur, AJK
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 8C50 2 150 2 198 8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-primary/40"
                />
              </svg>
            </span>
          </h1>

          <p
            className="hero-rise font-display text-2xl md:text-3xl font-semibold text-muted-foreground mb-6"
            style={{ animationDelay: "60ms" }}
          >
            The Dental Lounge — Healthy Teeth, Better Smile
          </p>

          {/* Subheading — this is the LCP element on the homepage. */}
          <p
            className="hero-rise text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ animationDelay: "120ms" }}
          >
            A modern dental clinic at Sardar Plaza, Fazal Chowk in New Mirpur City,
            Azad Kashmir. Root canals, implants, braces, crowns and family check-ups —
            led by Dr. Jalal Aslam, seven days a week until 9pm.
          </p>

          {/* CTA Buttons */}
          <div
            className="hero-fade-rise flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ animationDelay: "180ms" }}
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-7 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5">
              <Link href="/contact">
                Book Appointment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-7 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              <a href="tel:+923453081698">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
            </Button>
          </div>

          {/* Google rating — real, verifiable social proof, linked to source */}
          <div
            className="hero-fade-rise mt-10 flex justify-center"
            style={{ animationDelay: "240ms" }}
          >
            <GoogleRatingBadge />
          </div>

          {/* Trust Indicators */}
          <div
            className="hero-fade-rise mt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto"
            style={{ animationDelay: "300ms" }}
          >
            {/* Concrete, checkable facts rather than unverifiable claims —
                these are the statements AI answers and snippets can lift. */}
            {[
              { value: "10am–9pm", label: "Open every day" },
              { value: "10", label: "Treatments offered" },
              { value: "Fazal Chowk", label: "New Mirpur City" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center group cursor-default transition-transform duration-300 hover:scale-105"
              >
                <div className="text-4xl font-display font-bold text-primary mb-1 transition-transform duration-300 group-hover:scale-110">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden>
        <div className="animate-scroll-nudge">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary/50 rounded-full animate-scroll-dot" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
