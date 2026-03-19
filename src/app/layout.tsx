import type { Metadata } from "next";
import { RootProvider } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://thedentalloungemirpur.com.pk"),
  title: "The Dental Lounge Mirpur | Best Dentist in Mirpur AJK",
  description:
    "The Dental Lounge Mirpur - Your trusted dental care partner in Mirpur, Azad Kashmir. Professional dental services including teeth cleaning, whitening, root canal, implants, and cosmetic dentistry. Expert care from Dr. Jalal.",
  keywords:
    "dentist Mirpur, The Dental Lounge Mirpur, dental clinic AJK, teeth cleaning, teeth whitening, root canal Mirpur, cosmetic dentistry Mirpur, dental implants, Dr. Jalal, best dentist",
  authors: [{ name: "The Dental Lounge" }],
  openGraph: {
    title: "The Dental Lounge Mirpur | Best Dentist in Mirpur AJK",
    description:
      "The Dental Lounge Mirpur - Healthy Teeth, Better Smile. Professional dental care in Mirpur, Azad Kashmir.",
    url: "https://thedentalloungemirpur.com.pk",
    siteName: "The Dental Lounge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Dental Lounge Mirpur | Best Dentist in Mirpur AJK",
    description:
      "The Dental Lounge Mirpur - Professional dental care in Mirpur, Azad Kashmir.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://thedentalloungemirpur.com.pk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://thedentalloungemirpur.com.pk",
    name: "The Dental Lounge Mirpur",
    image: "https://thedentalloungemirpur.com.pk/logo.png",
    description:
      "The Dental Lounge Mirpur - Professional dental care services in Mirpur, Azad Kashmir. We offer comprehensive dental treatments including general dentistry, teeth cleaning, whitening, root canal, dental implants, orthodontics, and cosmetic dentistry.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sardar plaza, Fazal chowk, Mirpur, Azad Kashmir",
      addressCountry: "PK",
    },
    telephone: "+92-3453081698",
    url: "https://thedentalloungemirpur.com.pk",
    priceRange: "$$",
    sameAs: [
      "https://www.facebook.com/profile.php?id=61584884788327",
      "https://www.instagram.com/thedentallounge_mirpur/",
      "https://www.tiktok.com/@thedentallounge",
    ],
    serviceArea: {
      "@type": "City",
      name: "Mirpur",
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://thedentalloungemirpur.com.pk" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          suppressHydrationWarning
        />
      </head>
      <body>
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
