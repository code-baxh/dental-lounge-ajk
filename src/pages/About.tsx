import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationCTA from "@/components/LocationCTA";
import { Award, Heart, Shield, Users } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Patient-Centered Care",
    description: "Every treatment plan is tailored to your unique needs and comfort level.",
  },
  {
    icon: Shield,
    title: "Uncompromising Hygiene",
    description: "We follow strict sterilization protocols to ensure your complete safety.",
  },
  {
    icon: Award,
    title: "Excellence in Service",
    description: "We continuously update our skills and equipment to provide the best care.",
  },
  {
    icon: Users,
    title: "Community Trust",
    description: "Building lasting relationships with families in Mirpur through quality care.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-secondary via-background to-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                About <span className="text-primary">The Dental Lounge</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A modern dental clinic dedicated to providing exceptional care 
                to the families of Mirpur, AJK.
              </p>
            </div>
          </div>
        </section>

        {/* Doctor Introduction */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="bg-secondary rounded-2xl aspect-square flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="font-display text-4xl text-primary">DR</span>
                    </div>
                    <p className="text-muted-foreground text-sm">Doctor Photo</p>
                  </div>
                </div>
                <div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    Meet Dr. Jalal Aslam
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Dr. Jalal Aslam is a dedicated dental professional with years of experience 
                    in providing comprehensive dental care. With a passion for helping patients 
                    achieve their best smiles, Dr. Aslam combines technical expertise with a 
                    gentle, patient-centered approach.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    After completing rigorous dental training, Dr. Aslam has committed to 
                    continuous learning and staying updated with the latest advancements in 
                    dental technology and techniques.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    His philosophy is simple: every patient deserves personalized attention, 
                    honest advice, and treatment that prioritizes their comfort and long-term 
                    oral health.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-card p-8 rounded-2xl border border-border">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                    Our Vision
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To be the most trusted dental care provider in Mirpur, AJK — known for 
                    our commitment to excellence, patient comfort, and transforming smiles 
                    that boost confidence and improve lives.
                  </p>
                </div>
                <div className="bg-card p-8 rounded-2xl border border-border">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                    Our Mission
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide accessible, high-quality dental care using modern techniques 
                    and equipment, while maintaining the highest standards of hygiene and 
                    patient safety. We aim to educate our community about oral health and 
                    make every dental visit a positive experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Values
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do at The Dental Lounge.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <LocationCTA />
      </main>
      <Footer />
    </div>
  );
};

export default About;
