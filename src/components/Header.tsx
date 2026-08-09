"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.jpeg";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Areas We Serve", path: "/areas" },
    { name: "Guides", path: "/guides" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) =>
    pathname === path || (path !== "/" && pathname.startsWith(`${path}/`));

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/98 backdrop-blur-md shadow-lg border-b border-border" 
          : "bg-background/95 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* next/image, not a raw <img>: this renders on every page, so the
                missing intrinsic dimensions were causing layout shift site-wide. */}
            <Image
              src={logo}
              alt="The Dental Lounge — dental clinic in Mirpur, AJK"
              width={56}
              height={56}
              priority
              className="h-14 w-auto rounded-lg shadow-md transition-transform duration-200 group-hover:scale-[1.02] group-hover:shadow-lg"
            />
            {/* Deliberately NOT an <h1>: this renders on every page, so it
                gave every page a second H1 competing with the real one. */}
            <div className="hidden sm:block">
              <span className="block font-display text-xl font-semibold text-primary transition-colors group-hover:text-primary/80">
                The Dental Lounge
              </span>
              <span className="block text-xs text-muted-foreground">Dentist in Mirpur, AJK</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-primary/5 ${
                  isActive(link.path) ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            {/* Icon-only control: needs an accessible name and a 44px hit
                area. It had neither — 16px icon in 8px padding = 32px. */}
            <a
              href="https://wa.me/923453081698"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message The Dental Lounge on WhatsApp"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg text-sm text-muted-foreground transition-colors hover:bg-[#25D366]/10 hover:text-[#25D366]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="tel:+923453081698"
              className="flex min-h-[44px] items-center gap-2 rounded-lg px-2 text-sm text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden lg:inline">+92 345 308 1698</span>
            </a>
            <Button asChild className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
              <Link href="/contact">Book Appointment</Link>
            </Button>
          </div>

          {/* Mobile: toggle sits outside the menu so it is reachable in one tap */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
          <motion.button
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg transition-colors hover:bg-primary/5 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              className="md:hidden overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4 border-t border-border">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                          isActive(link.path) 
                            ? "text-primary bg-primary/5" 
                            : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div 
                    className="pt-4 mt-2 border-t border-border space-y-3"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <a 
                      href="tel:+923453081698" 
                      className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      +92 345 308 1698
                    </a>
                    <a 
                      href="https://wa.me/923453081698" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-[#25D366] hover:text-[#25D366]/80 transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                    <Button asChild className="w-full bg-primary hover:bg-primary/90">
                      <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Book Appointment</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
