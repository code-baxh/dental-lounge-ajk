import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-secondary via-background to-muted overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium">Now Open in Mirpur, AJK</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Healthy Teeth,{" "}
            <span className="text-primary">Better Smile</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Welcome to The Dental Lounge — your trusted dental care partner. 
            We provide comprehensive dental services with a focus on patient comfort, 
            hygiene, and modern techniques.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
              <Link to="/contact">
                Book Appointment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary/5">
              <a href="tel:03453081698">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Happy Patients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary">10+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary">7</div>
              <div className="text-sm text-muted-foreground">Services</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
