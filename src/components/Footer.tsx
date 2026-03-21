import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import logo from "@/assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image src={logo} alt="The Dental Lounge" className="h-12 w-auto rounded-lg" width={48} height={48} />
              <div>
                <h3 className="font-display text-lg font-semibold">The Dental Lounge</h3>
                <p className="text-xs text-primary-foreground/70">Healthy Teeth, Better Smile</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Your trusted dental care partner in Mirpur, AJK. We provide comprehensive dental services with a focus on patient comfort and quality care.
            </p>
            {/* Social Media Links */}
            <div className="flex gap-3 pt-2">
              <a 
                href="https://www.facebook.com/profile.php?id=61584884788327" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/thedentallounge_mirpur" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.117.6c-.779.263-1.618.65-2.18 1.21-.56.571-.947 1.4-1.21 2.18-.267.788-.468 1.658-.527 2.936C.039 8.333.024 8.74 0 12c0 3.26.015 3.667.072 4.947.06 1.277.261 2.148.528 2.936.271.783.66 1.612 1.213 2.176.571.557 1.4.946 2.18 1.21.778.272 1.648.472 2.926.527 1.28.058 1.687.072 4.947.072s3.667-.015 4.947-.072c1.280-.056 2.148-.256 2.930-.527.783-.264 1.612-.659 2.173-1.213.558-.576.948-1.399 1.213-2.176.267-.788.468-1.658.527-2.936.058-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.261-2.148-.527-2.936-.264-.782-.659-1.611-1.213-2.176-.576-.558-1.398-.947-2.176-1.21-.778-.272-1.648-.472-2.926-.527C15.667.06 15.26.044 12 0zm0 2.16c3.203 0 3.585.009 4.849.064 1.17.054 1.805.244 2.227.404.56.217.96.477 1.382.896.419.42.679.822.896 1.381.164.422.35 1.057.404 2.227.055 1.266.07 1.646.07 4.849s-.015 3.583-.074 4.849c-.054 1.17-.244 1.805-.404 2.227-.217.56-.477.96-.896 1.382-.42.419-.822.679-1.381.896-.422.164-1.057.35-2.227.404-1.266.055-1.646.07-4.849.07s-3.583-.015-4.849-.074c-1.17-.054-1.805-.244-2.227-.404-.56-.217-.96-.477-1.382-.896-.419-.42-.679-.822-.896-1.381-.164-.422-.35-1.057-.404-2.227-.055-1.266-.07-1.646-.07-4.849s.015-3.583.074-4.849c.054-1.17.244-1.805.404-2.227.217-.56.477-.96.896-1.382.42-.419.822-.679 1.381-.896.422-.164 1.057-.35 2.227-.404 1.267-.055 1.647-.07 4.849-.07zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm4.915-10.348c-.796 0-1.441-.645-1.441-1.44s.645-1.44 1.44-1.44c.795 0 1.44.645 1.44 1.44s-.645 1.44-1.44 1.44z" />
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@drjalalaslam?_r=1&_t=ZS-94seo9y0CiT" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                aria-label="TikTok"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.86 2.86 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.54-.05z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-sm text-primary-foreground/80">General Dentistry</li>
              <li className="text-sm text-primary-foreground/80">Teeth Cleaning & Scaling</li>
              <li className="text-sm text-primary-foreground/80">Teeth Whitening</li>
              <li className="text-sm text-primary-foreground/80">Root Canal Treatment</li>
              <li className="text-sm text-primary-foreground/80">Cosmetic Dentistry</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span className="text-sm text-primary-foreground/80">
                  Sardar plaza, Fazal chowk, Mirpur, AJK
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:03453081698" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  0345-3081698
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:thedentalloungmirpur@gmail.com" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  thedentalloungmirpur@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                <span className="text-sm text-primary-foreground/80">
                  10AM - 9PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <p className="text-center text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} The Dental Lounge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
