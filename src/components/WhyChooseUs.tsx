import { Shield, Heart, Sparkles, Clock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Hygiene First",
    description: "We maintain the highest standards of sterilization and cleanliness for your safety.",
  },
  {
    icon: Heart,
    title: "Patient Care",
    description: "Your comfort is our priority. We ensure a gentle and anxiety-free dental experience.",
  },
  {
    icon: Sparkles,
    title: "Modern Equipment",
    description: "State-of-the-art dental technology for precise diagnosis and effective treatment.",
  },
  {
    icon: Clock,
    title: "Convenient Hours",
    description: "Flexible appointment times to fit your busy schedule.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Us?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            At The Dental Lounge, we combine expertise with compassion to deliver 
            exceptional dental care that you can trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
