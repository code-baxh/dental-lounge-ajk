import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { RootProvider } from "./providers";
import JsonLd from "@/components/JsonLd";
import { BUSINESS, SITE_URL } from "@/lib/site";
import { clinicSchema, graph, practitionerSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

const GA_ID = "G-TJHLCHBH5B";

// Self-hosted at build time by next/font — removes the render-blocking
// stylesheet request to fonts.googleapis.com and the layout shift with it.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

// preload: false on the display face. next/font preloads every font file it
// generates, and these two woff2 files are 86KB fetched at high priority — they
// were competing with the document's own render on a throttled connection.
// Inter keeps its preload because it sets all the body copy; Playfair only sets
// headings, and display: swap already renders those in the fallback serif first,
// so preloading it bought a slightly earlier swap at the cost of first paint.
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  preload: false,
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

        {/* Analytics is loaded after the page has settled, not alongside it.
            @next/third-parties' <GoogleAnalytics> injects gtag at
            afterInteractive with a <link rel="preload"> in <head>, which put a
            165KB third-party script (71KB of it unused) on the critical path.
            On the 1.6Mbps link Lighthouse models, that was a large share of the
            3.7s LCP render delay — the hero text was queued behind analytics.

            Trade-off, stated plainly: lazyOnload waits for the load event, so a
            visitor who leaves within the first second or two may not be counted.
            For a clinic measuring traffic trends that is an acceptable price for
            a faster first paint. GA4 enhanced measurement still handles
            client-side route changes on its own. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="lazyOnload"
        />
        <Script id="ga-init" strategy="lazyOnload">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
