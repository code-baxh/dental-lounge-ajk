"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Khan",
    review: "Dr. Jalal is incredibly professional and caring. I had a root canal done and it was completely painless. The clinic is clean and modern. Highly recommended!",
    rating: 5,
    service: "Root Canal Treatment",
  },
  {
    name: "Sana Malik",
    review: "Best dental experience I've ever had. The teeth whitening results were amazing and the staff made me feel so comfortable throughout the process.",
    rating: 5,
    service: "Teeth Whitening",
  },
  {
    name: "Usman Raza",
    review: "I was terrified of dentists but Dr. Jalal's gentle approach changed that completely. My whole family now visits The Dental Lounge for regular check-ups.",
    rating: 5,
    service: "General Dentistry",
  },
  {
    name: "Fatima Abbasi",
    review: "Got my dental implants done here and the results are fantastic. They look and feel completely natural. Dr. Jalal explained every step clearly.",
    rating: 5,
    service: "Dental Implants",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-sm font-medium text-primary mb-3 tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5">
            What Our Patients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Don&apos;t just take our word for it — hear from the families who trust us with their smiles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary/20 hover:shadow-xl transition-all duration-300 h-full relative">
                <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
                
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 italic">
                  &quot;{testimonial.review}&quot;
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-primary">{testimonial.service}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
