/**
 * Single source of truth for NAP, geo and entity data.
 *
 * Every NAP string rendered anywhere on the site must come from here so it
 * stays byte-identical to the Google Business Profile listing. Inconsistent
 * name/address/phone across a site is one of the most common causes of weak
 * local-pack placement.
 */

export const SITE_URL = "https://thedentalloungemirpur.com.pk";

export const BUSINESS = {
  name: "The Dental Lounge",
  legalName: "The Dental Lounge Mirpur",
  tagline: "Healthy Teeth, Better Smile",

  // Address — keep this exact form everywhere, including citations.
  street: "Sardar Plaza, Fazal Chowk",
  locality: "New Mirpur City",
  region: "Azad Jammu and Kashmir",
  regionShort: "AJK",
  postalCode: "10250",
  country: "Pakistan",
  countryCode: "PK",

  // Phone — E.164 is the canonical form. `phoneDisplay` is for humans in
  // Pakistan; `phoneIntl` is what the UK-based diaspora can actually dial.
  phoneIntl: "+923453081698",
  phoneDisplay: "0345 308 1698",
  phoneIntlDisplay: "+92 345 308 1698",
  whatsapp: "923453081698",
  email: "thedentalloungmirpur@gmail.com",

  // From the clinic's own Google Maps embed.
  latitude: 33.147353,
  longitude: 73.755594,
  mapsUrl: "https://maps.app.goo.gl/MJ273LxUTJ1hXx1d6",
  mapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4367.064681671599!2d73.75559407657603!3d33.14735297351112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391feb2c23e2fbb3%3A0x57817c5738eab132!2sThe%20Dental%20Lounge!5e1!3m2!1sen!2s!4v1773600462287!5m2!1sen!2s",

  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "10:00",
    closes: "21:00",
    human: "10:00 AM – 9:00 PM, seven days a week",
  },

  social: [
    "https://www.facebook.com/profile.php?id=61584884788327",
    "https://www.instagram.com/thedentallounge_mirpur/",
    "https://www.tiktok.com/@drjalalaslam",
  ],
} as const;

/**
 * Google Business Profile rating.
 *
 * Displayed on-site as attributed social proof, linked to the source listing.
 * Deliberately NOT emitted as `aggregateRating` in our own schema, on two
 * explicit points of Google's review-snippet policy:
 *
 *   "If the entity that's being reviewed controls the reviews about itself,
 *    their pages that use LocalBusiness or any other type of Organization
 *    structured data are ineligible for star review feature."
 *   "Don't aggregate reviews or ratings from other websites."
 *
 * Marking these up would earn no stars and would risk a structured-data manual
 * action. Google already surfaces the real rating in the local pack and
 * knowledge panel directly from the Business Profile, so nothing is lost.
 *
 * Keep these numbers current — a stale count is worse than none.
 */
export const GOOGLE_REVIEWS = {
  ratingValue: 5.0,
  reviewCount: 30,
  /** Built from the listing CID (0x57817c5738eab132 → decimal). */
  readUrl: "https://www.google.com/maps?cid=6305457667354308914",

  /**
   * Opens Google's write-a-review box directly. The `lrd` fragment is
   * `<CID>,<mode>` — mode 3 is the review composer, mode 1 the reviews list.
   *
   * Deliberately reduced to the query plus the fragment: the URL this was
   * taken from also carried `rlz` (a Chrome install identifier), `ei`,
   * `sxsrf`, `sca_esv` and `sei` session tokens, and the `oq` partial query.
   * Those are personal to one browser session, expire, and must never be
   * published. Only the CID is durable.
   */
  writeUrl:
    "https://www.google.com/search?q=The+Dental+Lounge+Mirpur#lrd=0x391feb2c23e2fbb3:0x57817c5738eab132,3,,,,",

  lastChecked: "2026-08-10",
} as const;

export const PRACTITIONER = {
  name: "Dr. Jalal Aslam",
  jobTitle: "Dental Surgeon",
  // TODO(clinic): replace with the real degree abbreviation and PMDC number.
  // These are displayed publicly and must be accurate — a wrong registration
  // number on a medical site is worse than none at all.
  degree: "BDS",
  pmdcNumber: "",
  alumniOf: "Institute of Dentistry, CMH Lahore Medical College",
  yearsPracticing: 2,
} as const;

/** Full postal address on one line — for footers and citation copy-paste. */
export const ADDRESS_ONE_LINE = `${BUSINESS.street}, ${BUSINESS.locality}, ${BUSINESS.region} ${BUSINESS.postalCode}, ${BUSINESS.country}`;

export const TEL_HREF = `tel:${BUSINESS.phoneIntl}`;
export const WHATSAPP_HREF = `https://wa.me/${BUSINESS.whatsapp}`;
export const MAILTO_HREF = `mailto:${BUSINESS.email}`;

/**
 * "Mirpur" is ambiguous in search: Mirpur in Dhaka (Bangladesh) and Mirpur
 * Khas (Sindh) both outrank Mirpur AJK for the bare city name. Every title,
 * heading and description should carry a disambiguator.
 */
export const CITY = "Mirpur";
export const CITY_QUALIFIED = "Mirpur, AJK";
export const CITY_FULL = "Mirpur, Azad Kashmir";

export const NEARBY_LANDMARKS = [
  "Fazal Chowk",
  "Sardar Plaza",
  "Allama Iqbal Road",
  "Kachehri Chowk",
  "Shaheed Chowk",
  "Sector F-1",
  "Sector F-2",
  "Sector B-3",
  "Sector C-1",
  "Sector D-2",
  "Mangla Dam",
] as const;
