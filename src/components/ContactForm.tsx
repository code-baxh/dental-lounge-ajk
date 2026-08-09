"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    preferredDate: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Create WhatsApp message
    const messageParts = [
      "🦷 *New Appointment Request*",
      "",
      `*Name:* ${formData.name.trim()}`,
      `*Phone:* ${formData.phone.trim()}`,
    ];

    if (formData.email.trim()) {
      messageParts.push(`*Email:* ${formData.email.trim()}`);
    }
    if (formData.preferredDate) {
      messageParts.push(`*Preferred Date:* ${formData.preferredDate}`);
    }
    if (formData.message.trim()) {
      messageParts.push("", `*Message:*`, formData.message.trim());
    }

    const whatsappMessage = encodeURIComponent(messageParts.join("\n"));
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/923453081698?text=${whatsappMessage}`, "_blank");

    toast({
      title: "Opening WhatsApp",
      description: "Complete your booking by sending the message on WhatsApp.",
    });

    setIsSubmitting(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      preferredDate: "",
      message: "",
    });
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-background border-2 focus:border-primary transition-colors h-12"
          />
        </motion.div>
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="03XX-XXXXXXX"
            value={formData.phone}
            onChange={handleChange}
            required
            className="bg-background border-2 focus:border-primary transition-colors h-12"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Label htmlFor="email" className="text-sm font-medium">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            className="bg-background border-2 focus:border-primary transition-colors h-12"
          />
        </motion.div>
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Label htmlFor="preferredDate" className="text-sm font-medium">Preferred Date</Label>
          <Input
            id="preferredDate"
            name="preferredDate"
            type="date"
            value={formData.preferredDate}
            onChange={handleChange}
            className="bg-background border-2 focus:border-primary transition-colors h-12"
          />
        </motion.div>
      </div>

      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Label htmlFor="message" className="text-sm font-medium">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your dental concern or preferred time..."
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="bg-background border-2 focus:border-primary transition-colors resize-none"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <Button
          type="submit"
          size="lg"
          className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-[#0A2E1F] text-lg h-14 shadow-lg shadow-[#25D366]/25 hover:shadow-xl hover:shadow-[#25D366]/30 transition-all hover:-translate-y-0.5"
          disabled={isSubmitting}
        >
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Loader2 className="h-5 w-5 animate-spin" />
                Preparing...
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Send via WhatsApp
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      <motion.div 
        className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <CheckCircle className="h-4 w-4 text-[#25D366]" />
        <p>You&apos;ll be redirected to WhatsApp to complete your booking</p>
      </motion.div>
    </motion.form>
  );
};

export default ContactForm;
