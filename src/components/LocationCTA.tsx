"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const LocationCTA = () => {
  return (
    <section className="py-24 bg-brand text-brand-foreground relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-brand-foreground/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-96 h-96 bg-brand-foreground/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-brand-foreground/10 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8 border border-brand-foreground/20"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">Located in Mirpur, AJK</span>
          </motion.div>

          <motion.h2 
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Ready to Transform Your Smile?
          </motion.h2>
          <motion.p 
            className="text-xl text-brand-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Schedule your appointment today and experience the difference of 
            personalized dental care at The Dental Lounge.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {/* One primary CTA, two subordinate. Previously all three competed:
                a solid light button, a saturated green button and an outline —
                the bright green actually shouted loudest, so the eye landed on
                WhatsApp while "Book Appointment" was the intended primary. */}
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="w-full px-8 py-7 text-lg shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl sm:w-auto"
            >
              <Link href="/contact">
                Book Appointment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-2 border-brand-foreground/40 bg-transparent px-8 py-7 text-lg text-brand-foreground transition-all hover:bg-brand-foreground/10 sm:w-auto"
            >
              <a href="https://wa.me/923453081698" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5 text-[#25D366]" aria-hidden />
                WhatsApp Us
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-2 border-brand-foreground/40 bg-transparent px-8 py-7 text-lg text-brand-foreground transition-all hover:bg-brand-foreground/10 sm:w-auto"
            >
              <a href="tel:+923453081698">
                <Phone className="mr-2 h-5 w-5" aria-hidden />
                Call Now
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationCTA;
