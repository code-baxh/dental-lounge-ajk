import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: "0345-3081698",
    link: "tel:03453081698",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    details: "0345-3081698",
    link: "https://wa.me/923453081698",
  },
  {
    icon: Mail,
    title: "Email",
    details: "thedentalloungmirpur@gmail.com",
    link: "mailto:thedentalloungmirpur@gmail.com",
  },
  {
    icon: MapPin,
    title: "Address",
    details: "Sardar plaza, Fazal chowk, Mirpur, AJK",
    link: "https://maps.app.goo.gl/MJ273LxUTJ1hXx1d6",
  },
  {
    icon: Clock,
    title: "Hours",
    details: "10AM - 9PM",
    link: null,
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-secondary via-background to-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                Contact <span className="text-primary">Us</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ready to book your appointment? Get in touch with us through any
                of the methods below. We&apos;re here to help you achieve a healthier smile.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Information */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Get In Touch
                </h2>
                <p className="text-muted-foreground mb-8">
                  Have questions or want to schedule an appointment? Reach out to us
                  via phone, WhatsApp, or fill out the form. We typically respond within
                  a few hours.
                </p>

                <div className="space-y-4 mb-8">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="border-border">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                            <info.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{info.title}</h3>
                            {info.link ? (
                              <a
                                href={info.link}
                                target={info.link.startsWith("http") ? "_blank" : undefined}
                                rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="text-muted-foreground hover:text-primary transition-colors"
                              >
                                {info.details}
                              </a>
                            ) : (
                              <p className="text-muted-foreground">{info.details}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Quick WhatsApp Button */}
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white"
                >
                  <a
                    href="https://wa.me/923453081698"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="border-border">
                  <CardContent className="p-8">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                      Book an Appointment
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Fill out the form below and we&apos;ll get back to you shortly.
                    </p>
                    <ContactForm />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  Find Us
                </h2>
                <p className="text-muted-foreground">
                  Located in the heart of Mirpur, AJK — easily accessible for all your dental needs.
                </p>
              </div>

              {/* Map Placeholder */}
              <div className="bg-muted rounded-2xl aspect-video flex items-center justify-center border border-border">
                <div className="text-center p-8">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4367.064681671599!2d73.75559407657603!3d33.14735297351112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391feb2c23e2fbb3%3A0x57817c5738eab132!2sThe%20Dental%20Lounge!5e1!3m2!1sen!2s!4v1773600462287!5m2!1sen!2s"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
