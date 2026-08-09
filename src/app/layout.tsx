import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { RootProvider } from "./providers";
import JsonLd from "@/components/JsonLd";
import { BUSINESS, SITE_URL } from "@/lib/site";
import { clinicSchema, graph, practitionerSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

// Self-hosted at build time by next/font — removes the render-blocking
// stylesheet request to fonts.googleapis.com and the layout shift with it.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // Every page inherits the geo qualifier, so no title can ship without it.
    default: "Dentist in Mirpur AJK | The Dental Lounge | Dr. Jalal Aslam",
    template: "%s | The Dental Lounge Mirpur",
  },
  description:
    "Dental clinic at Fazal Chowk, New Mirpur City, Azad Kashmir. Root canals, implants, braces, crowns, whitening and family check-ups. Open 10am–9pm, seven days. Call +92 345 308 1698.",
  applicationName: BUSINESS.name,
  authors: [{ name: "Dr. Jalal Aslam", url: `${SITE_URL}/about` }],
  creator: "The Dental Lounge Mirpur",
  publisher: "The Dental Lounge Mirpur",
  category: "Dentistry",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE_URL,
    siteName: BUSINESS.name,
    title: "Dentist in Mirpur AJK | The Dental Lounge",
    description:
      "Dental clinic at Fazal Chowk, New Mirpur City, Azad Kashmir. Open 10am–9pm, seven days a week.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dentist in Mirpur AJK | The Dental Lounge",
    description:
      "Dental clinic at Fazal Chowk, New Mirpur City, Azad Kashmir. Open 10am–9pm, seven days a week.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  // Geo meta tags are not Google ranking signals, but Bing and several local
  // directories still read them, and they cost nothing.
  other: {
    "geo.region": "PK-JK",
    "geo.placename": "New Mirpur City, Azad Jammu and Kashmir",
    "geo.position": `${BUSINESS.latitude};${BUSINESS.longitude}`,
    ICBM: `${BUSINESS.latitude}, ${BUSINESS.longitude}`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Browser chrome follows the active theme rather than always showing the
  // light-mode brown.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#181310" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning is required by next-themes: it writes the theme
    // class onto <html> before React hydrates, which is what prevents a
    // light-mode flash for dark-mode visitors.
    <html
      lang="en-PK"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <RootProvider>{children}</RootProvider>
        <JsonLd data={graph(clinicSchema(), practitionerSchema(), websiteSchema())} />
        <GoogleAnalytics gaId="G-TJHLCHBH5B" />
      </body>
    </html>
  );
}
