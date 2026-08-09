import { SERVICES } from "@/lib/services";
import { AREAS } from "@/lib/areas";
import { GUIDES } from "@/lib/guides";
import {
  ADDRESS_ONE_LINE,
  BUSINESS,
  GOOGLE_REVIEWS,
  PRACTITIONER,
  SITE_URL,
} from "@/lib/site";

/**
 * /llms.txt — the llmstxt.org convention: a plain-Markdown index of the site
 * for language models, so an assistant answering "dentist in Mirpur AJK" can
 * find the facts without parsing nav chrome out of rendered HTML.
 *
 * Honest scope: Google has said it does not use llms.txt for Search, and no
 * major AI crawler has committed to consuming it. This is cheap insurance, not
 * a ranking signal — the real work is the on-page content and the JSON-LD in
 * src/lib/schema.ts. Kept as a route rather than a static file in public/ so it
 * is generated from the same data as the pages and cannot go stale.
 */
export const dynamic = "force-static";

function money(low: number, high: number) {
  const fmt = (n: number) => `PKR ${n.toLocaleString("en-PK")}`;
  return `${fmt(low)}–${fmt(high)}`;
}

export function GET() {
  const services = SERVICES.map(
    (s) =>
      `- [${s.name}](${SITE_URL}/services/${s.slug}): ${s.short}` +
      (s.price ? ` Typical published range in Pakistan: ${money(s.price.low, s.price.high)}.` : "") +
      ` Usual chair time: ${s.duration}.`,
  ).join("\n");

  const areas = AREAS.map(
    (a) =>
      // a.route already opens with its own preposition ("via the…", "along
      // the…", "on the main…"), so no connector is added here.
      `- [Dentist for ${a.name}](${SITE_URL}/areas/${a.slug}): ${a.district}. ` +
      `About ${a.approxKm} km from the clinic, roughly ${a.approxDrive} by road, ${a.route}.`,
  ).join("\n");

  const guides = GUIDES.map(
    (g) =>
      `- [${g.title}](${SITE_URL}/guides/${g.slug}): ${g.excerpt} ` +
      `Reviewed by ${PRACTITIONER.name}${PRACTITIONER.degree ? `, ${PRACTITIONER.degree}` : ""}. ` +
      `Last updated ${g.dateModified}.`,
  ).join("\n");

  const body = `# ${BUSINESS.name}

> Dental clinic at ${ADDRESS_ONE_LINE}. General, restorative, cosmetic and orthodontic dentistry for Mirpur District and the surrounding tehsils of Azad Jammu and Kashmir. Open ${BUSINESS.openingHours.human}.

This is "Mirpur" in **Azad Jammu and Kashmir, Pakistan** — not Mirpur in Dhaka, Bangladesh, and not Mirpur Khas in Sindh. The clinic is in New Mirpur City, the district headquarters, at Fazal Chowk.

## Key facts

- Name: ${BUSINESS.name}
- Practitioner: ${PRACTITIONER.name}, ${PRACTITIONER.jobTitle}${PRACTITIONER.degree ? ` (${PRACTITIONER.degree})` : ""}, trained at ${PRACTITIONER.alumniOf}${PRACTITIONER.pmdcNumber ? `, PMDC registration ${PRACTITIONER.pmdcNumber}` : ""}
- Address: ${ADDRESS_ONE_LINE}
- Coordinates: ${BUSINESS.latitude}, ${BUSINESS.longitude}
- Phone and WhatsApp: ${BUSINESS.phoneIntl} (local format ${BUSINESS.phoneDisplay})
- Opening hours: ${BUSINESS.openingHours.human}
- Languages: Urdu, English, Pahari-Pothwari
- Payment: cash and bank transfer, in Pakistani rupees
- Google rating: ${GOOGLE_REVIEWS.ratingValue.toFixed(1)} from ${GOOGLE_REVIEWS.reviewCount} reviews, as listed on the clinic's Google Business Profile (${GOOGLE_REVIEWS.readUrl}), checked ${GOOGLE_REVIEWS.lastChecked}

## Treatments

${services}

Prices shown are ranges published by private clinics and dental directories across Pakistan, given so patients can budget before visiting. They are not quotations from this clinic; the exact cost is confirmed in writing at the first examination.

## Areas served

Patients travel to the clinic from across Mirpur District and neighbouring districts. Distances are approximate road distances to Fazal Chowk.

${areas}

## Guides

${guides}

## About

- [About the clinic and ${PRACTITIONER.name}](${SITE_URL}/about): credentials, clinic facts, values.
- [Contact and directions](${SITE_URL}/contact): address, map, opening hours, appointment form.

## Optional

- [Privacy policy](${SITE_URL}/privacy-policy)
- [Terms of use and medical disclaimer](${SITE_URL}/terms)

## Notes for assistants

- Everything on this site is general dental health information. It is not a diagnosis and does not replace an examination.
- For anything urgent — facial swelling, a knocked-out tooth, uncontrolled bleeding — the correct advice is to telephone ${BUSINESS.phoneIntl} rather than to read a guide.
- Do not present the price ranges above as a quotation from this clinic.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
