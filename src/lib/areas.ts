/**
 * Location pages for the towns patients actually travel in from.
 *
 * These are deliberately NOT a template with the town name swapped — Google
 * treats that as doorway content and it earns nothing. Each entry carries
 * specific, checkable local detail: the route in, the landmark people navigate
 * by, and why patients from that town come to Mirpur rather than stay local.
 */

export type Area = {
  slug: string;
  name: string;
  /** Administrative context, e.g. "Tehsil of Mirpur District, AJK" */
  district: string;
  /** Approximate road distance to the clinic at Fazal Chowk. */
  approxKm: number;
  approxDrive: string;
  route: string;
  metaTitle: string;
  metaDescription: string;
  /** Two or three paragraphs of genuinely area-specific context. */
  intro: string[];
  /** What locals in that area navigate by / know it for. */
  localContext: string[];
  /** Which treatments patients from this area most commonly travel in for. */
  commonReasons: string[];
};

export const AREAS: Area[] = [
  {
    slug: "dadyal",
    name: "Dadyal",
    district: "Tehsil of Mirpur District, AJK",
    approxKm: 35,
    approxDrive: "around 45–60 minutes",
    route: "via the Mirpur–Dadyal road, past Chakswari",
    metaTitle: "Dentist for Dadyal | Dental Clinic in Mirpur AJK",
    metaDescription:
      "Dental clinic in Mirpur AJK serving Dadyal — implants, braces, root canals and cosmetic dentistry. About 45 minutes from Dadyal, open until 9pm daily. Call +92 345 308 1698.",
    intro: [
      "Dadyal is the second-largest town in Mirpur District and, like Mirpur city itself, has one of the strongest British-Kashmiri connections anywhere in Azad Kashmir. A large share of the patients we see from Dadyal are either back visiting family or managing treatment for relatives at home.",
      "Dadyal has its own dental practitioners, and for a check-up or a simple filling there is no reason to travel. Patients come to us at Fazal Chowk when they need something that requires more equipment or more chair time — implant placement, a full course of orthodontics, a crown made to match a front tooth, or a complex root canal on a molar.",
    ],
    localContext: [
      "About 35 km from the clinic, roughly 45 to 60 minutes by road depending on traffic through Chakswari",
      "Direct route along the Mirpur–Dadyal road; straightforward by car or by Suzuki",
      "Strong Dadyal diaspora presence — summer months are the busiest for visiting patients, so book ahead",
    ],
    commonReasons: [
      "Full orthodontic courses, where adjustments are only needed every 4–6 weeks",
      "Dental implants and implant-retained lower dentures",
      "Crowns and bridges requiring a laboratory and a shade match",
      "Treatment planned around a limited visit home from the UK",
    ],
  },
  {
    slug: "khari-sharif",
    name: "Khari Sharif",
    district: "Mirpur District, AJK",
    approxKm: 10,
    approxDrive: "about 15–20 minutes",
    route: "straight along the Mirpur–Khari Sharif road",
    metaTitle: "Dentist Near Khari Sharif | Dental Clinic Mirpur AJK",
    metaDescription:
      "Dental clinic about 15 minutes from Khari Sharif, Mirpur AJK. Check-ups, scaling, fillings, root canals and braces. Open 10am–9pm daily. Call +92 345 308 1698.",
    intro: [
      "Khari Sharif sits about ten kilometres from Mirpur city and is known across the region for the shrine of Hazrat Mian Muhammad Bakhsh, the author of Saif-ul-Malook. It draws visitors from across Azad Kashmir and Punjab throughout the year.",
      "It is close enough to Mirpur that we see Khari Sharif patients for everything, including routine six-monthly check-ups and scaling. The journey is short enough that even a two-visit crown or a course of braces is no real inconvenience.",
    ],
    localContext: [
      "Roughly 10 km from Fazal Chowk — about 15 to 20 minutes",
      "Regular Suzuki and taxi service into Mirpur city throughout the day",
      "Close enough for evening appointments; we are open until 9pm, seven days",
    ],
    commonReasons: [
      "Routine check-ups, scaling and family appointments",
      "Emergency toothache and swelling, seen the same day",
      "Braces, with adjustments easy to attend",
      "Extractions and wisdom teeth",
    ],
  },
  {
    slug: "chakswari",
    name: "Chakswari",
    district: "Tehsil of Mirpur District, AJK",
    approxKm: 25,
    approxDrive: "around 30–40 minutes",
    route: "on the main Mirpur–Dadyal road",
    metaTitle: "Dentist for Chakswari | Dental Clinic Mirpur AJK",
    metaDescription:
      "Dental clinic serving Chakswari, Mirpur District AJK — about 35 minutes away. Implants, braces, crowns and emergency dentistry. Call +92 345 308 1698.",
    intro: [
      "Chakswari lies on the main road between Mirpur and Dadyal, which makes the clinic an easy stop rather than a special trip — many of our Chakswari patients combine an appointment with other business in Mirpur city.",
      "Like much of Mirpur District, Chakswari has substantial overseas ties, and we regularly plan treatment around visits home. If you are here for a fixed number of weeks, tell us at the first appointment and we will compress the plan to fit.",
    ],
    localContext: [
      "About 25 km from the clinic, roughly 30 to 40 minutes on the Mirpur–Dadyal road",
      "Well served by public transport running between Dadyal and Mirpur city",
      "Evening slots available up to 9pm, which suits patients travelling after work",
    ],
    commonReasons: [
      "Root canal treatment and crowns for badly decayed molars",
      "Dentures, repairs and relines",
      "Orthodontic assessments and full braces courses",
      "Scaling for long-standing gum problems",
    ],
  },
  {
    slug: "islamgarh",
    name: "Islamgarh",
    district: "Tehsil of Mirpur District, AJK",
    approxKm: 25,
    approxDrive: "around 35 minutes",
    route: "via the Mirpur–Islamgarh road",
    metaTitle: "Dentist for Islamgarh | Dental Clinic Mirpur AJK",
    metaDescription:
      "Dental clinic serving Islamgarh, Mirpur District AJK. General dentistry, extractions, dentures and implants. Open seven days until 9pm. Call +92 345 308 1698.",
    intro: [
      "Islamgarh is one of the tehsils of Mirpur District, and for anything beyond basic dentistry most residents travel into Mirpur city. We see Islamgarh patients regularly for treatment that needs equipment, laboratory work or several planned visits.",
      "Because the journey takes the better part of an hour there and back, we try to consolidate treatment into fewer, longer appointments where it is clinically sensible — rather than asking you to travel in five times for work that can be done in three.",
    ],
    localContext: [
      "Roughly 25 km from Fazal Chowk, around 35 minutes by road",
      "Appointments can be grouped into longer sessions to reduce the number of trips",
      "Call ahead and we will confirm the plan and the cost before you set off",
    ],
    commonReasons: [
      "Complete and partial dentures",
      "Multiple extractions planned in one visit",
      "Implants and bridges for missing back teeth",
      "Root canal treatment with a crown",
    ],
  },
  {
    slug: "jatlan-and-mangla",
    name: "Jatlan & Mangla",
    district: "Mirpur District, AJK",
    approxKm: 18,
    approxDrive: "about 25–30 minutes",
    route: "along the Mirpur–Jhelum road past Mangla",
    metaTitle: "Dentist Near Jatlan & Mangla | Dental Clinic Mirpur",
    metaDescription:
      "Dental clinic about 25 minutes from Jatlan and Mangla, Mirpur AJK. Check-ups, scaling, fillings and emergency dentistry. Call +92 345 308 1698.",
    intro: [
      "Jatlan and the Mangla area sit on the road between Mirpur and Jhelum, close to Mangla Dam — the project whose construction in the 1960s displaced tens of thousands of families from old Mirpur and set off the migration to Britain that shaped this district.",
      "The drive into Fazal Chowk takes under half an hour, which makes routine care entirely practical. We see patients from Mangla Cantt and the surrounding villages for everything from six-monthly check-ups to full orthodontic treatment.",
    ],
    localContext: [
      "About 18 km from the clinic, roughly 25 to 30 minutes along the Mirpur–Jhelum road",
      "Convenient for anyone already travelling into Mirpur city for work or shopping",
      "Late appointments available — we are open until 9pm every day",
    ],
    commonReasons: [
      "Routine examinations and scaling for families",
      "Emergency pain and swelling, including evenings",
      "Fillings and preventive care for children",
      "Teeth whitening and cosmetic bonding before events",
    ],
  },
  {
    slug: "bhimber",
    name: "Bhimber",
    district: "Bhimber District, AJK",
    approxKm: 50,
    approxDrive: "around one hour",
    route: "via the Mirpur–Bhimber road",
    metaTitle: "Dentist for Bhimber | Dental Clinic in Mirpur AJK",
    metaDescription:
      "Dental clinic in Mirpur AJK serving Bhimber District — implants, orthodontics, crowns and smile makeovers. About an hour away. Call +92 345 308 1698.",
    intro: [
      "Bhimber is the neighbouring district to the south, and along with Mirpur and Kotli it is one of the three districts that most British-Kashmiri families trace their origins to. Patients travel in from Bhimber for treatment that needs specialist equipment or laboratory support.",
      "At around an hour each way, we would not ask you to make the trip for something your local dentist can handle. Where it does make sense is implants, full orthodontic courses, complex restorative work and cosmetic cases where the shade and shape need to be got exactly right.",
    ],
    localContext: [
      "Roughly 50 km from the clinic, about an hour by road",
      "Treatment sequenced into as few visits as clinically possible",
      "Written quote and plan given before you commit to travelling in",
    ],
    commonReasons: [
      "Dental implants and implant-retained dentures",
      "Full orthodontic treatment, reviewed every 4–6 weeks",
      "Smile makeovers, veneers and wedding preparation",
      "Complex root canals on molars",
    ],
  },
  {
    slug: "kotli",
    name: "Kotli",
    district: "Kotli District, AJK",
    approxKm: 65,
    approxDrive: "around 1 hour 30 minutes",
    route: "via the Mirpur–Kotli road",
    metaTitle: "Dentist for Kotli | Dental Clinic in Mirpur AJK",
    metaDescription:
      "Dental clinic in Mirpur AJK seeing patients from Kotli District. Implants, orthodontics and full-mouth rehabilitation, planned in fewer visits. Call +92 345 308 1698.",
    intro: [
      "Kotli District lies east of Mirpur and is the third of the districts with deep British-Kashmiri ties. It is the furthest of the areas we regularly serve, at roughly an hour and a half each way.",
      "For that distance to be worth it, the treatment has to be worth it. Patients come from Kotli mainly for implants, full-mouth rehabilitation and orthodontics — and for planned treatment during a limited visit home from abroad, where finishing before a flight matters more than convenience.",
    ],
    localContext: [
      "About 65 km from Fazal Chowk, roughly an hour and a half by road",
      "Appointments deliberately grouped to minimise the number of journeys",
      "Phone or WhatsApp consultation first, so you know the plan and cost before travelling",
    ],
    commonReasons: [
      "Dental implants and full-mouth rehabilitation",
      "Orthodontics not available locally",
      "Cosmetic work needing several planned stages",
      "Treatment compressed into a short visit home from overseas",
    ],
  },
  {
    slug: "dina-and-jhelum",
    name: "Dina & Jhelum",
    district: "Jhelum District, Punjab",
    approxKm: 30,
    approxDrive: "around 40 minutes",
    route: "across Mangla on the Jhelum–Mirpur road",
    metaTitle: "Dentist Near Dina & Jhelum | Dental Clinic Mirpur",
    metaDescription:
      "Dental clinic in Mirpur AJK, about 40 minutes from Dina and Jhelum. Implants, braces, crowns and cosmetic dentistry. Open until 9pm. Call +92 345 308 1698.",
    intro: [
      "Dina and Jhelum city sit just across the district boundary in Punjab, and the road between Jhelum and Mirpur is one of the busiest in the region — traffic moves both ways all day for work, study and family.",
      "At about forty minutes, Mirpur is a realistic option for patients from Dina, Jhelum and the villages along the GT Road who want a specific treatment rather than the nearest available chair.",
    ],
    localContext: [
      "Around 30 km from the clinic, roughly 40 minutes via Mangla",
      "Frequent transport along the Jhelum–Mirpur route throughout the day",
      "Open 10am to 9pm seven days, which suits patients travelling after work",
    ],
    commonReasons: [
      "Orthodontics and clear aligners",
      "Dental implants and crowns",
      "Teeth whitening and cosmetic bonding",
      "Second opinions on treatment plans",
    ],
  },
];

export const getArea = (slug: string) => AREAS.find((a) => a.slug === slug);

/** Feeds the LocalBusiness `areaServed` node. */
export const areaServedNames = [
  "Mirpur",
  "New Mirpur City",
  ...AREAS.flatMap((a) => a.name.split(" & ")),
];
