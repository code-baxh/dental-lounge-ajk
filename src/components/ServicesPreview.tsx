import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Stethoscope, Sparkles, Paintbrush, Plug, AlignCenter, Layers } from "lucide-react";
import { motion } from "framer-motion";

import serviceGeneral from "@/assets/service-general.jpg";
import serviceImplants from "@/assets/service-implants.jpg";
import serviceOrthodontic from "@/assets/service-orthodontic.jpg";
import serviceProsthesis from "@/assets/service-prosthesis.jpg";
import serviceWhitening from "@/assets/service-whitening.jpg";
import serviceCosmetic from "@/assets/service-cosmetic.jpg";

const services = [
  {
    icon: Stethoscope,
    title: "General Dentistry",
    description: "Comprehensive dental care including check-ups, cleanings, and preventive treatments.",
    gradient: "from-blue-500/10 via-blue-400/5 to-transparent",
    image: serviceGeneral,
  },
  {
    icon: Plug,
    title: "Dental Implants",
    description: "Permanent, natural-looking implants to restore missing teeth with confidence.",
    gradient: "from-emerald-500/10 via-emerald-400/5 to-transparent",
    image: serviceImplants,
  },
  {
    icon: AlignCenter,
    title: "Orthodontic Care",
    description: "Braces and aligners to straighten your teeth and perfect your bite.",
    gradient: "from-violet-500/10 via-violet-400/5 to-transparent",
    image: serviceOrthodontic,
  },
  {
    icon: Layers,
    title: "Fixed & Removable Prosthesis",
    description: "Custom bridges, crowns, and dentures for a complete, natural smile.",
    gradient: "from-cyan-500/10 via-cyan-400/5 to-transparent",
    image: serviceProsthesis,
  },
  {
    icon: Sparkles,
    title: "Teeth Whitening",
    description: "Professional whitening treatments to brighten your smile safely and effectively.",
    gradient: "from-amber-500/10 via-amber-400/5 to-transparent",
    image: serviceWhitening,
  },
  {
    icon: Paintbrush,
    title: "Cosmetic Dentistry",
    description: "Enhance your smile with veneers, bonding, and other cosmetic procedures.",
    gradient: "from-rose-500/10 via-rose-400/5 to-transparent",
    image: serviceCosmetic,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const ServicesPreview = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block text-sm font-medium text-primary mb-3 tracking-wider uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            What We Offer
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We offer a comprehensive range of dental services to keep your smile 
            healthy and beautiful.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="group"
            >
              <div className="relative bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-500 h-full hover:-translate-y-2 overflow-hidden">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>
                
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <service.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{service.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
                  
                  {/* Learn more link */}
                  <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all hover:-translate-y-0.5">
            <Link to="/services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;
