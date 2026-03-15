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
  Smile,
  Plug,
  AlignCenter,
  Layers
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

import serviceGeneral from "@/assets/service-general.jpg";
import serviceImplants from "@/assets/service-implants.jpg";
import serviceOrthodontic from "@/assets/service-orthodontic.jpg";
import serviceProsthesis from "@/assets/service-prosthesis.jpg";
import serviceCleaning from "@/assets/service-cleaning.jpg";
import serviceWhitening from "@/assets/service-whitening.jpg";
import serviceFillings from "@/assets/service-fillings.jpg";
import serviceRootcanal from "@/assets/service-rootcanal.jpg";
import serviceExtraction from "@/assets/service-extraction.jpg";
import serviceCosmetic from "@/assets/service-cosmetic.jpg";

const services = [
  {
    icon: Stethoscope,
    title: "General Dentistry",
    description: "Comprehensive dental care for the whole family. Our general dentistry services include routine check-ups, oral examinations, and preventive care to keep your teeth and gums healthy.",
    features: ["Regular Check-ups", "Oral Health Assessment", "Preventive Care", "Dental X-rays"],
    image: serviceGeneral,
  },
  {
    icon: Plug,
    title: "Dental Implants",
    description: "Restore missing teeth with permanent, natural-looking dental implants. Our implant solutions provide a strong foundation for replacement teeth that look, feel, and function like natural teeth.",
    features: ["Single Tooth Implants", "Full Arch Restoration", "Implant-Supported Dentures", "Bone Grafting"],
    image: serviceImplants,
  },
  {
    icon: AlignCenter,
    title: "Orthodontic Care",
    description: "Achieve a straighter, more aligned smile with our orthodontic treatments. From traditional braces to modern clear aligners, we offer solutions tailored to your lifestyle and goals.",
    features: ["Metal Braces", "Clear Aligners", "Retainers", "Bite Correction"],
    image: serviceOrthodontic,
  },
  {
    icon: Layers,
    title: "Fixed & Removable Prosthesis",
    description: "Replace missing teeth with custom-crafted prosthetic solutions. We offer both fixed bridges and crowns, as well as removable dentures, designed for comfort, durability, and a natural appearance.",
    features: ["Dental Bridges", "Crowns", "Partial Dentures", "Complete Dentures"],
    image: serviceProsthesis,
  },
  {
    icon: Sparkles,
    title: "Teeth Cleaning & Scaling",
    description: "Professional cleaning to remove plaque, tartar, and stains that regular brushing can't reach. Regular scaling helps prevent gum disease and keeps your smile fresh.",
    features: ["Plaque Removal", "Tartar Removal", "Polishing", "Gum Health Check"],
    image: serviceCleaning,
  },
  {
    icon: Smile,
    title: "Teeth Whitening",
    description: "Brighten your smile with our professional whitening treatments. We use safe and effective methods to remove stains and give you a noticeably whiter smile.",
    features: ["Professional Whitening", "Stain Removal", "Safe Procedures", "Long-lasting Results"],
    image: serviceWhitening,
  },
  {
    icon: Wrench,
    title: "Dental Fillings",
    description: "Restore damaged or decayed teeth with high-quality dental fillings. We offer tooth-colored fillings that blend naturally with your existing teeth for a seamless look.",
    features: ["Cavity Treatment", "Tooth-colored Options", "Durable Materials", "Natural Appearance"],
    image: serviceFillings,
  },
  {
    icon: Heart,
    title: "Root Canal Treatment",
    description: "Save your natural tooth with our gentle root canal therapy. Using modern techniques, we make this treatment comfortable and effective, relieving pain and preserving your tooth.",
    features: ["Pain Relief", "Tooth Preservation", "Modern Techniques", "Gentle Procedure"],
    image: serviceRootcanal,
  },
  {
    icon: CircleOff,
    title: "Tooth Extraction",
    description: "When a tooth cannot be saved, we provide safe and painless extractions. Our gentle approach ensures minimal discomfort and quick recovery.",
    features: ["Painless Procedure", "Wisdom Teeth", "Quick Recovery", "Post-care Guidance"],
    image: serviceExtraction,
  },
  {
    icon: Paintbrush,
    title: "Cosmetic Dentistry",
    description: "Transform your smile with our cosmetic dental services. From veneers to smile makeovers, we help you achieve the confident smile you've always wanted.",
    features: ["Dental Veneers", "Smile Design", "Bonding", "Aesthetic Enhancements"],
    image: serviceCosmetic,
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
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-3 gap-0">
                        <div className="relative overflow-hidden">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover min-h-[200px] md:min-h-full"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r" />
                          <div className="absolute bottom-4 left-4 md:hidden">
                            <h3 className="font-display text-xl font-bold text-white">
                              {service.title}
                            </h3>
                          </div>
                        </div>
                        <div className="md:col-span-2 p-8">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                              <service.icon className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-display text-2xl font-bold text-foreground hidden md:block">
                              {service.title}
                            </h3>
                          </div>
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
                </motion.div>
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
