import { BUSINESS, PRACTITIONER, SITE_URL } from "./site";
import { SERVICES, type Faq } from "./services";
import { areaServedNames } from "./areas";

const CLINIC_ID = `${SITE_URL}/#clinic`;
const PERSON_ID = `${SITE_URL}/#dr-jalal-aslam`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * The clinic entity. Typed as Dentist (a recognised MedicalBusiness subtype)
 * rather than the generic LocalBusiness — it describes the entity far more
 * precisely and is the type Google associates with dental queries.
 *
 * Deliberately omitted: aggregateRating. Self-declared ratings that are not
 * backed by verifiable, on-page reviews are a structured-data policy violation
 * and risk a manual action. Once real Google reviews accumulate, surface those.
 */
export function clinicSchema() {
  return {
    "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
    "@id": CLINIC_ID,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    slogan: BUSINESS.tagline,
    url: SITE_URL,
    image: `${SITE_URL}/web-app-manifest-512x512.png`,
    logo: `${SITE_URL}/web-app-manifest-512x512.png`,
    description: `Dental clinic at Fazal Chowk in New Mirpur City, Azad Kashmir, offering general dentistry, root canal treatment, dental implants, orthodontics, crowns, dentures, teeth whitening and cosmetic dentistry. Open 10am to 9pm, seven days a week.`,
    telephone: BUSINESS.phoneIntl,
    email: BUSINESS.email,
    priceRange: "$$",
    currenciesAccepted: "PKR",
    paymentAccepted: "Cash, Bank transfer",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.street,
      addressLocality: BUSINESS.locality,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    },
    hasMap: BUSINESS.mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...BUSINESS.openingHours.days],
        opens: BUSINESS.openingHours.opens,
        closes: BUSINESS.openingHours.closes,
      },
    ],
    areaServed: areaServedNames.map((name) => ({
      "@type": "City",
      name,
      containedInPlace: { "@type": "AdministrativeArea", name: BUSINESS.region },
    })),
    availableLanguage: [
      { "@type": "Language", name: "Urdu" },
      { "@type": "Language", name: "English" },
      { "@type": "Language", name: "Pahari-Pothwari" },
    ],
    medicalSpecialty: "Dentistry",
    founder: { "@id": PERSON_ID },
    employee: { "@id": PERSON_ID },
    sameAs: [...BUSINESS.social],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dental treatments",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalProcedure",
          name: s.name,
          description: s.short,
          url: `${SITE_URL}/services/${s.slug}`,
        },
      })),
    },
  };
}

export function practitionerSchema() {
  const credentials: Record<string, unknown>[] = [];
  if (PRACTITIONER.degree) {
    credentials.push({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: PRACTITIONER.degree,
      recognizedBy: { "@type": "CollegeOrUniversity", name: PRACTITIONER.alumniOf },
    });
  }
  // Only emitted once the clinic supplies a real number — never guessed.
  if (PRACTITIONER.pmdcNumber) {
    credentials.push({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: `PMDC Registration ${PRACTITIONER.pmdcNumber}`,
      recognizedBy: {
        "@type": "Organization",
        name: "Pakistan Medical and Dental Council",
      },
    });
  }

  return {
    "@type": ["Person", "Physician"],
    "@id": PERSON_ID,
    name: PRACTITIONER.name,
    jobTitle: PRACTITIONER.jobTitle,
    medicalSpecialty: "Dentistry",
    url: `${SITE_URL}/about`,
    image: `${SITE_URL}/jalal.jpeg`,
    worksFor: { "@id": CLINIC_ID },
    alumniOf: { "@type": "CollegeOrUniversity", name: PRACTITIONER.alumniOf },
    ...(credentials.length ? { hasCredential: credentials } : {}),
    knowsLanguage: ["Urdu", "English", "Pahari-Pothwari"],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: BUSINESS.name,
    inLanguage: "en-PK",
    publisher: { "@id": CLINIC_ID },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
}

/**
 * FAQPage no longer produces FAQ rich results in Google Search for most sites,
 * but it remains a clean, extractable Q&A structure for AI Overviews, AI Mode
 * and other answer engines — which is the reason we still emit it.
 */
export function faqSchema(faqs: Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function medicalProcedureSchema(opts: {
  name: string;
  description: string;
  url: string;
  howPerformed?: string;
  preparation?: string;
}) {
  return {
    "@type": "MedicalProcedure",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    procedureType: "https://schema.org/NoninvasiveProcedure",
    bodyLocation: "Mouth",
    ...(opts.howPerformed ? { howPerformed: opts.howPerformed } : {}),
    ...(opts.preparation ? { preparation: opts.preparation } : {}),
    provider: { "@id": CLINIC_ID },
  };
}

/** Wraps nodes in a single @graph so entities can cross-reference by @id. */
export function graph(...nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
