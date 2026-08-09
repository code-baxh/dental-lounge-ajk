import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ServicesPreview from "@/components/ServicesPreview";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import GoogleRating from "@/components/GoogleRating";
import LocationCTA from "@/components/LocationCTA";
import AreasServed from "@/components/AreasServed";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import { faqSchema, graph } from "@/lib/schema";
import { ADDRESS_ONE_LINE, BUSINESS, GOOGLE_REVIEWS } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Dentist in Mirpur AJK | The Dental Lounge | Dr. Jalal Aslam" },
  description:
    "Dental clinic at Sardar Plaza, Fazal Chowk, New Mirpur City, Azad Kashmir. Root canals, implants, braces, crowns, whitening and family check-ups. Open 10am–9pm, seven days. Call +92 345 308 1698.",
  alternates: { canonical: "/" },
};

/**
 * Answer-first FAQs targeting the actual queries people type. Note the
 * disambiguation question: "Mirpur" collides with Mirpur in Dhaka and Mirpur
 * Khas in Sindh, and both outrank Mirpur AJK for the bare city name.
 */
const HOME_FAQS = [
  {
    q: "Where is The Dental Lounge in Mirpur?",
    a: `The clinic is at ${ADDRESS_ONE_LINE}. Fazal Chowk is in the centre of New Mirpur City, and we are in Sardar Plaza. Open ${BUSINESS.openingHours.human}.`,
  },
  {
    q: "Is this Mirpur in Azad Kashmir, or Mirpur in Dhaka or Mirpur Khas?",
    a: "This is Mirpur in Azad Jammu and Kashmir, Pakistan — the district city near Mangla Dam, sometimes called New Mirpur City. It is not Mirpur in Dhaka, Bangladesh, and not Mirpur Khas in Sindh.",
  },
  {
    q: "Who is the dentist at The Dental Lounge?",
    a: "Dr. Jalal Aslam, a dental surgeon trained at the Institute of Dentistry, CMH Lahore Medical College. He treats every patient personally.",
  },
  {
    q: "Is The Dental Lounge Mirpur any good — what do patients say?",
    a: `The clinic holds a ${GOOGLE_REVIEWS.ratingValue.toFixed(1)} out of 5 rating from ${GOOGLE_REVIEWS.reviewCount} reviews on its Google Business Profile. Those are verified reviews left by patients on Google, and you can read all of them on the listing.`,
  },
  {
    q: "What are your opening hours?",
    a: `${BUSINESS.openingHours.human}. Evening appointments up to 9pm suit patients travelling in from Dadyal, Chakswari, Khari Sharif and the surrounding areas after work.`,
  },
  {
    q: "Do you see emergency toothache the same day?",
    a: `Yes. We keep slots free each day for acute pain, swelling and broken teeth. Call ${BUSINESS.phoneIntlDisplay} or message us on WhatsApp so we know you are coming.`,
  },
  {
    q: "How much does a dental appointment cost in Mirpur?",
    a: "Consultation fees across Mirpur are generally published between PKR 500 and PKR 3,000. We tell you our fee on the phone before you come in, and you get a written treatment plan with costs before anything is started.",
  },
  {
    q: "Do you treat patients visiting from the UK?",
    a: "Regularly. A large share of Mirpur families have relatives in Britain, and we plan treatment around fixed travel dates so that multi-visit work such as crowns and root canals finishes before the flight home. Tell us your dates at the first appointment.",
  },
  {
    q: "Which areas do you serve besides Mirpur city?",
    a: "Patients travel in from Dadyal, Chakswari, Khari Sharif, Islamgarh, Jatlan and Mangla within Mirpur District, from Bhimber and Kotli districts, and from Dina and Jhelum across the boundary in Punjab.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <JsonLd data={graph(faqSchema(HOME_FAQS))} />
      <main id="main" className="flex-1">
        <Hero />
        <ServicesPreview />
        <WhyChooseUs />
        <GoogleRating />
        <Testimonials />
        <AreasServed />
        <FAQ
          faqs={HOME_FAQS}
          heading="Questions patients ask us"
          intro="Practical answers about the clinic, our hours, costs and how to find us."
        />
        <LocationCTA />
      </main>
      <Footer />
    </div>
  );
}
