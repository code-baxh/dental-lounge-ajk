import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ServiceCard from "./ServiceCard";
import { ArrowRight, Stethoscope, Sparkles, Paintbrush } from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "General Dentistry",
    description: "Comprehensive dental care including check-ups, cleanings, and preventive treatments.",
  },
  {
    icon: Sparkles,
    title: "Teeth Whitening",
    description: "Professional whitening treatments to brighten your smile safely and effectively.",
  },
  {
    icon: Paintbrush,
    title: "Cosmetic Dentistry",
    description: "Enhance your smile with veneers, bonding, and other cosmetic procedures.",
  },
];

const ServicesPreview = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer a comprehensive range of dental services to keep your smile 
            healthy and beautiful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5">
            <Link to="/services">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
