"use client";

import { Shield, Heart, ClipboardList, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { GOOGLE_REVIEWS } from "@/lib/site";

/**
 * Specific, checkable statements only. The previous cards ("highest standards
 * of sterilization", "state-of-the-art dental technology", "flexible
 * appointment times") could have sat on any clinic's site, which is exactly
 * what makes copy read as templated or machine-written. Each card now states
 * something the clinic does, sourced from elsewhere on the site (the about
 * page's hygiene and consultation commitments, the root canal page) or from a
 * patient's own Google review.
 */
const features = [
  {
    icon: Heart,
    title: "No pain, even for root canals",
    description:
      "We do not start until the tooth is fully numb. “I felt no pain, even after the anesthesia wore off,” one root canal patient wrote.",
    color: "from-rose-500/20 to-rose-600/10",
  },
  {
    icon: ClipboardList,
    title: "Every option and cost explained first",
    description:
      "Before any treatment you are told what is wrong, what the options are, what each one costs, and what happens if you do nothing.",
    color: "from-amber-500/20 to-amber-600/10",
  },
  {
    icon: Shield,
    title: "Sterilised for every patient",
    description:
      "Instruments are autoclaved between every patient, and single-use items are used wherever they are required.",
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    icon: Clock,
    title: "Open until 8pm",
    description:
      "10am to 8pm, Saturday to Thursday, so appointments fit around work and school. Closed on Fridays.",
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
            Why patients choose us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Rated {GOOGLE_REVIEWS.ratingValue.toFixed(1)} from {GOOGLE_REVIEWS.reviewCount} Google
            reviews. This is how we work, in four commitments you can hold us to.
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
