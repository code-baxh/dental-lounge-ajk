import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationCTA from "@/components/LocationCTA";
import { 
  Stethoscope, 
  Sparkles, 
  Paintbrush, 
  Heart,
  Wrench,
  CircleOff,
  Smile
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Stethoscope,
    title: "General Dentistry",
    description: "Comprehensive dental care for the whole family. Our general dentistry services include routine check-ups, oral examinations, and preventive care to keep your teeth and gums healthy.",
    features: ["Regular Check-ups", "Oral Health Assessment", "Preventive Care", "Dental X-rays"],
  },
  {
    icon: Sparkles,
    title: "Teeth Cleaning & Scaling",
    description: "Professional cleaning to remove plaque, tartar, and stains that regular brushing can't reach. Regular scaling helps prevent gum disease and keeps your smile fresh.",
    features: ["Plaque Removal", "Tartar Removal", "Polishing", "Gum Health Check"],
  },
  {
    icon: Smile,
    title: "Teeth Whitening",
    description: "Brighten your smile with our professional whitening treatments. We use safe and effective methods to remove stains and give you a noticeably whiter smile.",
    features: ["Professional Whitening", "Stain Removal", "Safe Procedures", "Long-lasting Results"],
  },
  {
    icon: Wrench,
    title: "Dental Fillings",
    description: "Restore damaged or decayed teeth with high-quality dental fillings. We offer tooth-colored fillings that blend naturally with your existing teeth for a seamless look.",
    features: ["Cavity Treatment", "Tooth-colored Options", "Durable Materials", "Natural Appearance"],
  },
  {
    icon: Heart,
    title: "Root Canal Treatment",
    description: "Save your natural tooth with our gentle root canal therapy. Using modern techniques, we make this treatment comfortable and effective, relieving pain and preserving your tooth.",
    features: ["Pain Relief", "Tooth Preservation", "Modern Techniques", "Gentle Procedure"],
  },
  {
    icon: CircleOff,
    title: "Tooth Extraction",
    description: "When a tooth cannot be saved, we provide safe and painless extractions. Our gentle approach ensures minimal discomfort and quick recovery.",
    features: ["Painless Procedure", "Wisdom Teeth", "Quick Recovery", "Post-care Guidance"],
  },
  {
    icon: Paintbrush,
    title: "Cosmetic Dentistry",
    description: "Transform your smile with our cosmetic dental services. From veneers to smile makeovers, we help you achieve the confident smile you've always wanted.",
    features: ["Dental Veneers", "Smile Design", "Bonding", "Aesthetic Enhancements"],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-secondary via-background to-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                Our <span className="text-primary">Services</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We offer a comprehensive range of dental services to address all your 
                oral health needs. Each treatment is delivered with care, precision, 
                and a commitment to your comfort.
              </p>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-8">
              {services.map((service, index) => (
                <Card key={index} className="overflow-hidden border-border hover:border-primary/30 transition-colors">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-3 gap-0">
                      <div className="bg-secondary/50 p-8 flex flex-col justify-center items-center text-center">
                        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                          <service.icon className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-foreground">
                          {service.title}
                        </h3>
                      </div>
                      <div className="md:col-span-2 p-8">
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {service.features.map((feature, idx) => (
                            <span 
                              key={idx}
                              className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <LocationCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
