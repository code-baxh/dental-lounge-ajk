import { BUSINESS, GOOGLE_REVIEWS, PRACTITIONER, SITE_URL } from "./site";
import { SERVICES, type Faq, type Service } from "./services";
import { areaServedPlaces } from "./areas";
import type { Guide } from "./guides";

const CLINIC_ID = `${SITE_URL}/#clinic`;
const PERSON_ID = `${SITE_URL}/#dr-jalal-aslam`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Dr. Jalal's personal channel — it belongs on his Person node, not the clinic's. */
const PERSONAL_PROFILES: string[] = BUSINESS.social.filter((u) => u.includes("tiktok.com"));
const CLINIC_PROFILES: string[] = BUSINESS.social.filter((u) => !u.includes("tiktok.com"));

/**
 * Inline reference to Dr. Jalal for author fields. The full Person node lives in
 * the layout's JSON-LD block; a bare {"@id"} pointing into a different script
 * block is not reliably resolved, which leaves an Article author with no name.
 * Carrying type, name and url inline makes each reference stand on its own.
 */
export const personRef = () => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: PRACTITIONER.name,
  url: `${SITE_URL}/about`,
});

const serviceUrl = (slug: string) => `${SITE_URL}/services/${slug}`;

/**
 * The clinic entity. Typed as Dentist (a recognised MedicalBusiness subtype)
 * rather than the generic LocalBusiness — it describes the entity far more
 * precisely and is the type Google associates with dental queries.
 *
 * Deliberately omitted: aggregateRating and review. Google's review-snippet
 * policy makes a business's own LocalBusiness markup ineligible for stars, and
 * forbids marking up ratings or reviews taken from another site — the Google
 * reviews quoted on the homepage included. The real rating already appears in
 * the local pack and knowledge panel straight from the Business Profile.
 */
export function clinicSchema() {
  return {
    "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
    "@id": CLINIC_ID,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    slogan: BUSINESS.tagline,
    url: SITE_URL,
    // A real photo of the treatment room first. TODO(clinic): add a photo of
    // the front of Sardar Plaza with the sign once one is taken.
    image: [`${SITE_URL}/clinic-treatment-room.jpg`, `${SITE_URL}/web-app-manifest-512x512.png`],
    logo: `${SITE_URL}/web-app-manifest-512x512.png`,
    description: `Dental clinic at Fazal Chowk in New Mirpur City, Azad Kashmir, offering general dentistry, root canal treatment, dental implants, orthodontics, crowns, dentures, teeth whitening and cosmetic dentistry. Open 10am to 9pm Saturday to Thursday, and 4pm to 9pm on Friday.`,
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
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: BUSINESS.openingHours.friday.opens,
        closes: BUSINESS.openingHours.friday.closes,
      },
    ],
    areaServed: areaServedPlaces.map(({ name, region }) => ({
      "@type": "City",
      name,
      containedInPlace: { "@type": "AdministrativeArea", name: region },
    })),
    availableLanguage: [
      { "@type": "Language", name: "Urdu" },
      { "@type": "Language", name: "English" },
      { "@type": "Language", name: "Pahari-Pothwari" },
    ],
    medicalSpecialty: "https://schema.org/Dentistry",
    founder: { "@id": PERSON_ID },
    employee: { "@id": PERSON_ID },
    // The Business Profile (by its CID) alongside the social profiles: it is
    // the strongest identity link there is between this site and the Maps
    // listing, and it helps separate this clinic from the other businesses
    // called "The Dental Lounge".
    sameAs: [...CLINIC_PROFILES, GOOGLE_REVIEWS.readUrl],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dental treatments",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        // No price: the ranges on the site are market ranges for Pakistan,
        // not this clinic's fees, and must never be marked up as an Offer price.
        itemOffered: {
          "@type": "Service",
          "@id": `${serviceUrl(s.slug)}#service`,
          name: s.name,
          description: s.short,
          url: serviceUrl(s.slug),
        },
      })),
    },
  };
}

/**
 * Plain Person. It was typed ["Person", "Physician"], but since schema.org v24
 * Physician is a MedicalOrganization — an office, not a human — so the node
 * claimed to be both a person and an organisation. medicalSpecialty went with
 * it (not a Person property); hasOccupation and knowsAbout carry the same
 * meaning on a Person.
 */
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
    "@type": "Person",
    "@id": PERSON_ID,
    name: PRACTITIONER.name,
    jobTitle: PRACTITIONER.jobTitle,
    hasOccupation: { "@type": "Occupation", name: "Dentist" },
    knowsAbout: ["Dentistry", "Root canal treatment", "Dental implants", "Orthodontics"],
    url: `${SITE_URL}/about`,
    image: `${SITE_URL}/jalal.jpeg`,
    worksFor: { "@id": CLINIC_ID },
    alumniOf: { "@type": "CollegeOrUniversity", name: PRACTITIONER.alumniOf },
    ...(credentials.length ? { hasCredential: credentials } : {}),
    ...(PERSONAL_PROFILES.length ? { sameAs: PERSONAL_PROFILES } : {}),
    knowsLanguage: ["Urdu", "English", "Pahari-Pothwari"],
  };
}

/**
 * alternateName feeds Google's site-name system. "The Dental Lounge" alone is
 * shared with clinics in other cities, so the Mirpur forms are offered too.
 */
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: BUSINESS.name,
    alternateName: ["The Dental Lounge Mirpur", "Dental Lounge Mirpur"],
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
 * Google retired FAQ rich results for all sites in May 2026, so this earns no
 * SERP feature. It is kept as a clean Q&A structure that mirrors the visible
 * FAQ — harmless, and cheap to keep in step with the page.
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

/**
 * A treatment page. Typed both Service and MedicalProcedure: Service supplies
 * `provider` (MedicalProcedure has no such property, so the old markup's
 * provider link was invalid) and is a valid `itemOffered` for the clinic's
 * catalogue; MedicalProcedure keeps the medical meaning and `howPerformed`.
 *
 * No procedureType: every treatment was marked NoninvasiveProcedure, which is
 * false for implants, extractions and root canals. No price, for the reason
 * given in clinicSchema.
 */
export function serviceSchema(service: Service) {
  const url = serviceUrl(service.slug);
  const howPerformed = service.sections
    .find((s) => /what happens|the stages|what we do/i.test(s.heading))
    ?.body?.join(" ");

  return {
    "@type": ["Service", "MedicalProcedure"],
    "@id": `${url}#service`,
    name: service.name,
    description: service.short,
    url,
    bodyLocation: "Mouth",
    ...(howPerformed ? { howPerformed } : {}),
    provider: { "@id": CLINIC_ID },
    areaServed: { "@type": "City", name: "Mirpur" },
  };
}

/**
 * A guide: the WebPage that carries `reviewedBy` (a WebPage property — it was
 * on the Article, where it is not defined) and the Article as its main entity.
 */
export function guideSchema(guide: Guide) {
  const url = `${SITE_URL}/guides/${guide.slug}`;
  return [
    {
      "@type": "WebPage",
      "@id": url,
      url,
      name: guide.metaTitle,
      inLanguage: "en-PK",
      isPartOf: { "@id": WEBSITE_ID },
      reviewedBy: personRef(),
      mainEntity: { "@id": `${url}#article` },
    },
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: guide.h1,
      description: guide.metaDescription,
      // Per-guide card rendered by app/guides/[slug]/opengraph-image.tsx.
      image: `${url}/opengraph-image`,
      url,
      datePublished: guide.datePublished,
      dateModified: guide.dateModified,
      inLanguage: "en-PK",
      author: personRef(),
      publisher: { "@id": CLINIC_ID, name: BUSINESS.name },
      mainEntityOfPage: { "@id": url },
      about: { "@type": "MedicalEntity", name: "Dentistry" },
    },
  ];
}

/** Wraps nodes in a single @graph so entities can cross-reference by @id. */
export function graph(...nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
