import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ServicesPreview from "@/components/ServicesPreview";
import WhyChooseUs from "@/components/WhyChooseUs";
import LocationCTA from "@/components/LocationCTA";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ServicesPreview />
        <WhyChooseUs />
        <LocationCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
