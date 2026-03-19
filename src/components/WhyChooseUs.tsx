"use client";

import { Shield, Heart, Sparkles, Clock } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Hygiene First",
    description: "We maintain the highest standards of sterilization and cleanliness for your safety.",
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    icon: Heart,
    title: "Patient Care",
    description: "Your comfort is our priority. We ensure a gentle and anxiety-free dental experience.",
    color: "from-rose-500/20 to-rose-600/10",
  },
  {
    icon: Sparkles,
    title: "Modern Equipment",
    description: "State-of-the-art dental technology for precise diagnosis and effective treatment.",
    color: "from-amber-500/20 to-amber-600/10",
  },
  {
    icon: Clock,
    title: "Convenient Hours",
    description: "Flexible appointment times to fit your busy schedule.",
    color: "from-emerald-500/20 to-emerald-600/10",
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

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 via-secondary/50 to-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
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
            Why The Dental Lounge?
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5">
            Why Choose Us?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            At The Dental Lounge, we combine expertise with compassion to deliver 
            exceptional dental care that you can trust.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="group relative"
              variants={itemVariants}
            >
              <div className="relative bg-background rounded-2xl p-8 shadow-sm border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-500 h-full hover:-translate-y-1">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <motion.div 
                    className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="h-8 w-8 text-primary" />
                  </motion.div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
