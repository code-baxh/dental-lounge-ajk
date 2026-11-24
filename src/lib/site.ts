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
    days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    opens: "10:00",
    closes: "20:00",
    human: "10:00 AM – 8:00 PM, Saturday to Thursday (closed Friday)",
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
  reviewCount: 42,
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

  lastChecked: "2026-11-14",
} as const;

export type GoogleReviewQuote = {
  /**
   * First name and last initial. The full name is on Google for anyone who
   * follows the link; these patients agreed to post on Google, not to have
   * their full name beside a treatment on the clinic's own site.
   */
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Verbatim review text. Shorten with "…" only; never reword. */
  text: string;
  /**
   * Month and year it was posted. Never Google's relative "2 weeks ago" — on
   * a static page that is wrong a week later.
   */
  when?: string;
  /** Treatment the patient mentions in the review, if any. */
  service?: string;
  /** Shown in the homepage testimonial section. */
  featured?: boolean;
  /**
   * Service page slugs this review is shown on — only treatments the review
   * itself names. A root canal review on the root canal page answers the
   * fear people bring to that search far better than any copy we write.
   */
  services?: string[];
};

/**
 * Real reviews copied verbatim from the Google Business Profile.
 *
 * These replaced four testimonials that came with the original site template
 * and could not be traced to any patient. Invented patient quotes on a
 * medical site are a trust liability, so the homepage testimonial section
 * renders nothing at all while this list is empty.
 *
 * Copied from the listing (GOOGLE_REVIEWS.readUrl) on 2026-11-14. Rules:
 * text verbatim, typos included — shorten only with "…", where Google's own
 * "More" cut it or to skip a sentence; never reword. No Google-translated
 * reviews (not the patient's words), and none written by anyone who works on
 * the clinic or this site.
 */
export const GOOGLE_REVIEW_QUOTES: GoogleReviewQuote[] = [
  {
    author: "Mudassar T.",
    rating: 5,
    text: "If you're scared of root canals, go here! The procedure was gentle, thorough, and I felt no pain, even after the anesthesia wore off.",
    service: "Root canal",
    services: ["root-canal-treatment-mirpur"],
  },
  {
    author: "Aimen J.",
    rating: 5,
    text: "I recently had my root canal treatment (RCT) at TML. After taking opinions from 2–3 doctors, I finally chose Dr. Jalal Aslam, and honestly, I couldn't have made a better choice!…",
    service: "Root canal",
    services: ["root-canal-treatment-mirpur"],
  },
  {
    author: "Zee Z.",
    rating: 5,
    text: "I visited this clinic with my 5year and 9 year kids for check up.the dr was very professional and so friendly with kids.during sweet discussion with kids dr easy first checked and than after injection easy remove the kid's teeth…",
    service: "Children's check-up & extraction",
    services: ["childrens-dentistry-mirpur", "tooth-extraction-mirpur"],
  },
  {
    author: "Areeba M.",
    rating: 5,
    featured: true,
    text: "Hands down the best dental experience I’ve had. I was always scared of dental clinics, but the team here made the whole visit stress-free and comfortable. The office is super clean and modern. Truly the best dental clinic in Mirpur AJK with the best dentist in town. 10/10 recommendation...",
  },
  {
    author: "Harum M.",
    rating: 5,
    text: "I was really nervous at first because of a bad experience in the past. But Dr. Jalal was very kind and took everything at my own pace, explaining each step beforehand. He was very gentle during my root canal and made sure it was painless…",
    service: "Root canal",
    featured: true,
    services: ["root-canal-treatment-mirpur"],
  },
  {
    author: "Nasar G.",
    rating: 5,
    featured: true,
    text: "Absolutely fantastic service. I was visiting from the uk when I required some treatment. The dental lounge came highly recommended and I was not disappointed. Dr Aslam explained everything clearly and went through my options…",
  },
  {
    author: "Abubakar S.",
    rating: 5,
    text: "I got my root canal and crown for my upper two incisors along with scaling from the dental lounge by Dr Jalal Aslam. … His clinic is probably the most advanced and tidy clinic in Mirpur…",
    service: "Root canal, crowns & scaling",
    featured: true,
    services: [
      "root-canal-treatment-mirpur",
      "dental-crowns-and-bridges-mirpur",
      "teeth-cleaning-and-scaling-mirpur",
    ],
  },
  {
    author: "Shahid M.",
    rating: 5,
    featured: true,
    text: "I had visited many dentists in the city as well as in Jhelum but couldn't get satisfied. A friend of mine recommended The Dental Lounge, I was initially reluctant but when I went through procedure I felt the real relief in my teeth. Dr. Jalal is a wonderful guy must visit him if you want to get rid of disturbing pain",
  },
  {
    author: "Talha B.",
    rating: 5,
    featured: true,
    text: "I took my father to Dental Lounge and I found The staff and the doctors so cooperative and well trained. Perhaps it’s the perfect dental clinic in our city.",
  },
];

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
/** Opens the clinic's own Maps listing, where Directions is one tap. */
export const DIRECTIONS_HREF = BUSINESS.mapsUrl;

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
