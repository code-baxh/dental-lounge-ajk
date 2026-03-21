import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ServicesPreview from "@/components/ServicesPreview";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import LocationCTA from "@/components/LocationCTA";

export const metadata: Metadata = {
  title: "The Dental Lounge | Dentist in Mirpur AJK",
  description:
    "Welcome to The Dental Lounge — your trusted dental care partner in Mirpur, AJK. We provide comprehensive dental services with a focus on patient comfort, hygiene, and modern techniques.",
  alternates: {
    canonical: "https://thedentalloungemirpur.com.pk",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ServicesPreview />
        <WhyChooseUs />
        <Testimonials />
        <LocationCTA />
      </main>
      <Footer />
    </div>
  );
}
