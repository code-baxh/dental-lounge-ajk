/**
 * Informational content for research-stage queries — the searches people make
 * weeks before they search "dentist near me". Without these the site can only
 * ever compete for bottom-of-funnel terms, which are the most contested.
 *
 * Each guide is written to be genuinely useful on its own, and each is anchored
 * to something specific about this region (local prices, the UK diaspora, paan
 * and chhaliya use) that a generic national dental site cannot credibly write.
 */

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title: string; text: string }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string };

export type Guide = {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  datePublished: string;
  dateModified: string;
  readingMinutes: number;
  blocks: GuideBlock[];
  faqs: { q: string; a: string }[];
  relatedServices: string[];
};

const SOURCED =
  "Figures are ranges published by private clinics and dental directories across Pakistan, gathered in 2026. They are indicative, not a quotation from this clinic.";

export const GUIDES: Guide[] = [
  {
    slug: "dental-treatment-cost-in-pakistan-2026",
    title: "What dental treatment costs in Pakistan in 2026",
    h1: "What Dental Treatment Costs in Pakistan (2026 Guide)",
    metaTitle: "Dental Treatment Cost in Pakistan 2026 | Price Guide",
    metaDescription:
      "What root canals, implants, braces, crowns, scaling and whitening cost in Pakistan in 2026 — the ranges private clinics publish, and what moves the price.",
    excerpt:
      "Published price ranges for every common dental treatment in Pakistan, what makes each one more or less expensive, and how to avoid the quote that doubles halfway through.",
    datePublished: "2026-08-10",
    dateModified: "2026-08-10",
    readingMinutes: 9,
    blocks: [
      {
        type: "p",
        text: "The most common reason people delay dental treatment is not fear of pain. It is not knowing what it will cost, and being afraid of finding out mid-treatment. This guide sets out the ranges private clinics across Pakistan publish for each common treatment in 2026, so you can walk into a consultation with a realistic expectation.",
      },
      {
        type: "callout",
        title: "How to read these numbers",
        text: SOURCED + " Prices vary by city, by the clinician's experience, and above all by how complicated your specific case is. Ask for a written plan before treatment starts — any clinic worth attending will give you one.",
      },
      { type: "h2", text: "Typical price ranges in Pakistan, 2026" },
      {
        type: "table",
        head: ["Treatment", "Typical published range (PKR)", "What moves the price"],
        rows: [
          ["Consultation / check-up", "500 – 3,000", "Clinic, city, whether X-rays are included"],
          ["Scaling & polishing", "1,500 – 7,000", "How much tartar there is; deep cleaning costs more"],
          ["Deep cleaning (gum disease)", "10,000 – 12,000", "Done in stages under anaesthetic"],
          ["Dental filling", "2,000 – 8,000", "Size of the cavity and the material used"],
          ["Root canal", "7,000 – 25,000", "Front tooth (1 canal) vs molar (3–4 canals)"],
          ["Crown / cap", "15,000 – 60,000", "Zirconia vs porcelain-fused-to-metal vs all-ceramic"],
          ["Tooth extraction", "2,000 – 10,000", "Simple vs surgical or impacted wisdom tooth"],
          ["Dental implant (per tooth)", "80,000 – 200,000", "Implant brand, and whether bone grafting is needed"],
          ["Braces (full course)", "50,000 – 300,000", "Metal vs ceramic vs clear aligners; case complexity"],
          ["Teeth whitening", "15,000 – 40,000", "In-clinic session vs custom home trays"],
          ["Complete dentures", "25,000 – 80,000", "Materials and number of try-in stages"],
        ],
        caption: "Indicative ranges for private clinics in Pakistan, 2026.",
      },
      { type: "h2", text: "The three things that actually change your quote" },
      { type: "h3", text: "1. How many surfaces, canals or units are involved" },
      {
        type: "p",
        text: "A root canal on an upper front tooth has one canal. A lower molar can have four, sometimes with curved roots that take twice as long to negotiate. Both are called \"a root canal\", and the price difference between them can be threefold. The same applies to fillings — a small pit on one surface is not the same job as rebuilding three surfaces of a broken molar.",
      },
      { type: "h3", text: "2. What is not included in the headline number" },
      {
        type: "p",
        text: "This is where most unpleasant surprises come from. A root canal on a back tooth almost always needs a crown afterwards, and a crown is a separate cost — often more than the root canal itself. An implant quote may or may not include the crown on top, and may or may not include bone grafting. Ask specifically: what is the total to finish this tooth, from today to completion?",
      },
      { type: "h3", text: "3. Materials" },
      {
        type: "p",
        text: "Implant systems vary widely in price, and so do crown materials. A cheaper implant is not automatically a bad one, but you are entitled to know which system is being used, because if it fails or needs a component in ten years, obscure systems become a problem. Ask for the brand name.",
      },
      { type: "h2", text: "Questions worth asking before you agree to anything" },
      {
        type: "ol",
        items: [
          "What is the total cost to finish this tooth, including anything that will be needed afterwards?",
          "What happens if I do nothing — how fast will it get worse, and what will it cost then?",
          "Is there a cheaper option that is still clinically sound, and what am I giving up by choosing it?",
          "Can this be paid in instalments across the treatment?",
          "What is included if something goes wrong in the first year?",
        ],
      },
      { type: "h2", text: "Why the cheapest quote is sometimes the most expensive" },
      {
        type: "p",
        text: "An extraction is always cheaper than a root canal on the day. But once a back tooth is gone, the teeth either side drift, the opposing tooth over-erupts, and replacing it later costs several times what saving it would have. The relevant comparison is not root canal versus extraction — it is root canal versus extraction plus implant, three years from now.",
      },
      {
        type: "p",
        text: "The same logic applies to postponing a small filling. Left alone, a cavity that costs a few thousand rupees to fill becomes a root canal and a crown. Nothing about dental decay improves on its own.",
      },
      { type: "h2", text: "What this means if you are in Mirpur" },
      {
        type: "p",
        text: "Consultation fees in Mirpur are generally published between PKR 500 and PKR 3,000. Historically, patients from Mirpur District travelled to Islamabad or Lahore for implants and orthodontics — which added travel and accommodation on top of the treatment fee. That is much less necessary now, and worth factoring into any comparison you are making.",
      },
    ],
    faqs: [
      {
        q: "Why do dental prices vary so much between clinics in Pakistan?",
        a: "Three main reasons: the clinician's training and experience, the materials and equipment used, and the complexity of your specific case. A wide range in published prices usually reflects genuinely different work rather than arbitrary pricing.",
      },
      {
        q: "Can I pay for dental treatment in instalments?",
        a: "Many clinics allow longer treatments such as orthodontics and implants to be paid across the course of treatment. Ask before you start — it is a normal request, not an awkward one.",
      },
      {
        q: "Is dental treatment in Pakistan cheaper than in the UK?",
        a: "Substantially, which is why many British-Kashmiri families arrange treatment during visits home. The important caveat is planning: multi-stage work such as implants and crowns needs enough time in the country to complete, or arranged follow-up with a dentist at home.",
      },
      {
        q: "Should I choose a clinic on price alone?",
        a: "No. Redoing failed dental work costs more than doing it properly the first time, and some of it cannot be undone at all — enamel removed for veneers does not grow back. Judge on the treatment plan, the explanation you are given, and whether the clinic is straight with you about the options.",
      },
    ],
    relatedServices: ["root-canal-treatment-mirpur", "dental-implants-mirpur", "braces-and-orthodontics-mirpur"],
  },

  {
    slug: "dental-treatment-in-mirpur-visiting-from-uk",
    title: "Planning dental treatment during a visit to Mirpur from the UK",
    h1: "Dental Treatment in Mirpur While Visiting from the UK",
    metaTitle: "Dental Treatment in Mirpur for UK Visitors | Guide",
    metaDescription:
      "How to plan dental treatment during a trip to Mirpur AJK from Britain — what finishes in two weeks, what needs longer, and what to arrange before you fly.",
    excerpt:
      "Around 70% of British Pakistanis trace their origins to Mirpur, Kotli and Bhimber. If you are back for a few weeks, here is what dental work can realistically be completed — and what to avoid starting.",
    datePublished: "2026-08-10",
    dateModified: "2026-08-10",
    readingMinutes: 8,
    blocks: [
      {
        type: "p",
        text: "Mirpur is sometimes called Little England for good reason. Around 70% of people recorded as Pakistani in British data trace their ancestry to Azad Kashmir, overwhelmingly to Mirpur, Kotli and Bhimber districts — a pattern set in the 1960s when the construction of Mangla Dam displaced tens of thousands of families and migration to Britain followed. Every summer, thousands of families come back.",
      },
      {
        type: "p",
        text: "A great many of them use the trip to get dental work done. That is a sensible plan, and it goes wrong in one predictable way: treatment started too late in the visit to finish. This guide is about the timing.",
      },
      {
        type: "callout",
        title: "The single most useful thing you can do",
        text: "Tell the clinic your return flight date at the very first appointment — not at the third. Almost everything can be sequenced to fit a fixed window, but only if the clinician knows the deadline before planning treatment rather than halfway through it.",
      },
      { type: "h2", text: "What fits comfortably in a two-week visit" },
      {
        type: "ul",
        items: [
          "Examination, X-rays and a full treatment plan",
          "Scaling and polishing, including deep cleaning in stages",
          "Fillings — several can be done across two or three appointments",
          "Extractions, including most wisdom teeth",
          "Root canal treatment, usually one or two visits",
          "Teeth whitening, in clinic or with home trays you take back with you",
          "Composite bonding for chipped or uneven front teeth",
        ],
      },
      { type: "h2", text: "What needs three to four weeks" },
      {
        type: "ul",
        items: [
          "Crowns and bridges — two appointments about seven to ten days apart, so allow a fortnight minimum after the preparation visit",
          "A root canal followed by a crown on the same tooth — plan for three weeks",
          "Complete or partial dentures, which need four to five appointments across three to six weeks",
          "Porcelain veneers, which involve laboratory work between visits",
        ],
      },
      { type: "h2", text: "What cannot be finished in one trip" },
      {
        type: "p",
        text: "Dental implants and orthodontics both take months by their nature, and no amount of scheduling changes that. An implant needs three to six months for the bone to fuse to the post before the crown goes on. Braces run twelve to twenty-four months with adjustments every four to six weeks.",
      },
      {
        type: "p",
        text: "That does not mean you cannot start. Implants are commonly placed during one visit and restored on the next trip, or the crown is arranged with a dentist in the UK. Orthodontics is harder to split, and starting a course you cannot attend adjustments for is genuinely a bad idea — an untended fixed appliance causes damage.",
      },
      { type: "h2", text: "Before you fly" },
      {
        type: "ol",
        items: [
          "Message the clinic with your dates before you travel, so the first appointment is booked for the day after you land rather than the week you leave.",
          "Ask your UK dentist for any recent X-rays and take copies with you — it saves repeating them.",
          "Bring a list of your medications and any medical conditions, particularly diabetes, blood thinners and bisphosphonates, all of which change dental planning.",
          "Get a written treatment plan with costs at the first appointment, before work begins.",
          "Ask what happens if something needs attention after you return to Britain, and get the treatment details in writing so a UK dentist can pick it up.",
        ],
      },
      { type: "h2", text: "Bringing children and older relatives" },
      {
        type: "p",
        text: "Two groups tend to get overlooked on these trips. The first is children, who often have not been seen by a dentist for the whole period between visits — a check-up, fluoride varnish and fissure sealants take one short appointment and prevent most of what would otherwise develop before the next trip.",
      },
      {
        type: "p",
        text: "The second is elderly parents living in Pakistan year-round, for whom the visit is the practical moment to sort out dentures that no longer fit, or teeth that have been painful for months without anyone arranging anything. Dentures in particular need four to five appointments, so raise it in the first week of your stay rather than the last.",
      },
      { type: "h2", text: "Getting to the clinic" },
      {
        type: "p",
        text: "The Dental Lounge is at Sardar Plaza, Fazal Chowk, in the centre of New Mirpur City — a few minutes from Kachehri Chowk and Allama Iqbal Road, and easy to reach from the sectors. If family are in Dadyal it is roughly 45 minutes, from Chakswari around 35, from Khari Sharif about 15, and from Bhimber about an hour. We are open 10am to 9pm every day, which usually means an appointment can be fitted around whatever else the visit involves.",
      },
      { type: "h2", text: "A note on doing it well rather than quickly" },
      {
        type: "p",
        text: "Compressing treatment is not the same as rushing it. Some stages have biological waiting times that cannot be shortened — bone healing, gum settling, cement setting. A clinic willing to skip those to fit your flight is not doing you a favour. If something genuinely does not fit, the better answer is to do the urgent part now and plan the rest properly for the next visit.",
      },
      {
        type: "p",
        text: "It is also worth being realistic about what you are comparing. Treatment in Pakistan is substantially cheaper than the equivalent private work in Britain, but the comparison only holds if the work is finished and lasts. A crown fitted in a hurry that fails in eighteen months, needing replacement in the UK at UK prices, was not the saving it looked like. Plan the visit properly and the economics are genuinely good; rush it and they are not.",
      },
    ],
    faqs: [
      {
        q: "Can I get a dental implant during a two-week visit to Mirpur?",
        a: "The implant can be placed, but not finished. The post needs three to six months to integrate with the bone before the crown is fitted, so the crown is normally done on a later trip or arranged with your dentist in the UK.",
      },
      {
        q: "Will a UK dentist take over treatment started in Pakistan?",
        a: "Usually yes, provided you have the details in writing — what was done, which materials and which implant system if relevant. Ask for that documentation before you fly home.",
      },
      {
        q: "How far in advance should I book?",
        a: "The summer months are the busiest for visiting patients. Message before you travel rather than after you arrive, so the first appointment is early in your stay and there is room to sequence the rest.",
      },
      {
        q: "Can I be seen in Mirpur if my family is in Dadyal, Bhimber or Kotli?",
        a: "Yes — Mirpur is the district hub and patients travel in from all three routinely. Journey times are roughly 45 minutes from Dadyal, an hour from Bhimber and an hour and a half from Kotli.",
      },
    ],
    relatedServices: ["dental-implants-mirpur", "dental-crowns-and-bridges-mirpur", "root-canal-treatment-mirpur"],
  },

  {
    slug: "toothache-emergency-what-to-do",
    title: "Toothache and dental emergencies: what to do now",
    h1: "Toothache & Dental Emergencies — What To Do Right Now",
    metaTitle: "Toothache Emergency: What To Do | Dentist Mirpur AJK",
    metaDescription:
      "What to do for severe toothache, facial swelling or a knocked-out tooth — what helps, what makes it worse, and where to get emergency dental care in Mirpur.",
    excerpt:
      "Practical first steps for the most common dental emergencies, the home remedies that actively cause harm, and the warning signs that mean you should go to hospital rather than wait.",
    datePublished: "2026-08-10",
    dateModified: "2026-08-10",
    readingMinutes: 7,
    blocks: [
      {
        type: "callout",
        title: "Go to hospital immediately, not to a dental clinic, if you have",
        text: "Swelling that is closing your eye or spreading down your neck; difficulty swallowing, opening your mouth or breathing; a high fever with facial swelling; or bleeding you cannot stop after 20 minutes of firm pressure. A spreading dental infection is a medical emergency and can become life-threatening.",
      },
      { type: "h2", text: "Severe toothache" },
      {
        type: "ul",
        items: [
          "Take the painkiller you would normally take, at the normal dose, on time rather than waiting for the pain to peak",
          "Keep your head elevated, including when sleeping — lying flat increases pressure and pain",
          "Rinse gently with warm salt water",
          "Avoid very hot, very cold and very sweet food and drink",
          "Do not put aspirin directly on the gum — it burns the tissue and does nothing for the tooth",
          "Do not apply heat to the outside of the face if there is any swelling",
        ],
      },
      {
        type: "p",
        text: "Painkillers manage the symptom. They do not treat the cause, and a nerve infection does not resolve on its own. If the pain is severe enough that you are searching for advice at night, book an appointment for the next day.",
      },
      { type: "h2", text: "Facial swelling" },
      {
        type: "p",
        text: "Swelling means the infection has spread beyond the tooth. This needs to be seen the same day. Note the warning signs in the box above — if any apply, go to hospital instead. Antibiotics bought without a prescription are a common shortcut here and a poor one: they may briefly reduce the swelling while the underlying tooth continues to deteriorate, and repeated courses drive resistance.",
      },
      { type: "h2", text: "A knocked-out adult tooth" },
      {
        type: "ol",
        items: [
          "Find the tooth and pick it up by the crown — the white part. Never touch the root.",
          "If it is dirty, rinse it briefly in milk or the patient's own saliva. Do not scrub it and do not use tap water for more than a second.",
          "If you can, put it straight back into the socket and bite gently on a clean cloth to hold it.",
          "If you cannot, keep it in a cup of milk. Milk is far better than water.",
          "Get to a dentist within the hour. Time is the single biggest factor in whether the tooth survives.",
        ],
      },
      {
        type: "p",
        text: "A knocked-out baby tooth is different — do not put it back, as that can damage the developing adult tooth underneath. Have the child seen, but the tooth itself is not replanted.",
      },
      { type: "h2", text: "Broken tooth or lost filling" },
      {
        type: "ul",
        items: [
          "Keep the area clean and chew on the other side",
          "Cover a sharp edge with sugar-free chewing gum or dental wax if it is cutting your tongue",
          "Do not use household glue on a broken tooth or crown under any circumstances",
          "Save the fragment or the crown and bring it with you",
          "Book within a few days — an exposed tooth deteriorates quickly",
        ],
      },
      { type: "h2", text: "Bleeding after an extraction" },
      {
        type: "ol",
        items: [
          "Roll clean gauze or a clean cloth into a firm pad, place it directly over the socket, and bite down hard for 20 minutes without checking it.",
          "Sit upright. Do not lie down.",
          "Do not rinse, spit or use a straw — this is what dislodges the clot.",
          "If it is still bleeding heavily after two full 20-minute attempts, contact the clinic or go to hospital.",
        ],
      },
      { type: "h2", text: "Home remedies that make things worse" },
      {
        type: "ul",
        items: [
          "Aspirin held against the gum — causes a chemical burn",
          "Clove oil applied neat and repeatedly — irritates the tissue; a small amount on cotton is the limit",
          "Heat packs on a swollen face — encourages the infection to spread",
          "Leftover antibiotics from a previous illness, or a course bought over the counter without examination",
          "Trying to lance a gum abscess yourself",
        ],
      },
      { type: "h2", text: "Emergency dental care in Mirpur" },
      {
        type: "p",
        text: "The Dental Lounge is at Fazal Chowk in New Mirpur City and is open 10am to 9pm, seven days a week, with slots kept free each day for acute pain and swelling. Call ahead so we know you are coming, particularly if you are travelling in from Dadyal, Bhimber or Kotli.",
      },
    ],
    faqs: [
      {
        q: "Is toothache an emergency?",
        a: "Severe toothache needs prompt treatment but is not usually a medical emergency. Facial swelling, difficulty swallowing or breathing, or a fever alongside dental pain is an emergency — go to hospital immediately rather than waiting for a dental appointment.",
      },
      {
        q: "Will antibiotics cure my toothache?",
        a: "No. Antibiotics can control a spreading infection temporarily, but the source is inside the tooth and they cannot reach it. The tooth still needs a root canal or extraction, and taking antibiotics without treating the cause simply delays it.",
      },
      {
        q: "How long can I leave a knocked-out tooth before it cannot be saved?",
        a: "The chance of survival falls sharply after about an hour outside the mouth. Store it in milk, not water, and get to a dentist as fast as you can — replanting it yourself immediately is better still.",
      },
      {
        q: "Can I be seen the same day in Mirpur?",
        a: "Yes. We keep daily slots for acute pain, swelling and broken teeth, and we are open until 9pm every day. Call +92 345 308 1698 first so we can hold a time.",
      },
    ],
    relatedServices: ["tooth-extraction-mirpur", "root-canal-treatment-mirpur", "dental-fillings-mirpur"],
  },

  {
    slug: "paan-chhaliya-gutka-and-your-mouth",
    title: "Paan, chhaliya and gutka: what they do to your mouth",
    h1: "Paan, Chhaliya and Gutka — What They Do To Your Mouth",
    metaTitle: "Paan, Chhaliya & Gutka: Oral Health Risks | Guide",
    metaDescription:
      "What areca nut, paan and gutka do to teeth, gums and the mouth lining — early signs of submucous fibrosis and oral cancer, and where to get screened in Mirpur AJK.",
    excerpt:
      "Pakistan has among the highest oral cancer rates in the world, and areca nut is the main reason. What to look for, and why a two-minute check at every dental visit matters more than anything else we do.",
    datePublished: "2026-08-10",
    dateModified: "2026-08-10",
    readingMinutes: 7,
    blocks: [
      {
        type: "p",
        text: "Paan, chhaliya, gutka, mainpuri and naswar are part of daily life across Pakistan and Azad Kashmir. They are also the single biggest preventable cause of serious mouth disease in this population, and the harm is not limited to stained teeth.",
      },
      {
        type: "p",
        text: "This is written to be useful rather than to lecture. If you use these products, knowing what to watch for is worth far more than being told to stop.",
      },
      { type: "h2", text: "What the staining actually is" },
      {
        type: "p",
        text: "The deep red-brown stain from paan and the dark stain from tobacco bind into the enamel surface and into any roughness on it. Scaling and polishing removes most of it. It comes back, and it comes back faster each time, because the enamel surface becomes progressively rougher.",
      },
      { type: "h2", text: "Gum disease and tooth loss" },
      {
        type: "ul",
        items: [
          "Areca nut and tobacco reduce blood flow to the gums, which masks bleeding — so gum disease progresses further before you notice it",
          "The lime paste used in paan is strongly alkaline and abrasive, wearing down the tooth surface and irritating the gum",
          "Holding a quid in the same part of the mouth concentrates all of this in one place, which is why the damage is often worst on one side",
          "Healing after extractions and surgery is slower and more likely to go wrong",
        ],
      },
      { type: "h2", text: "Oral submucous fibrosis" },
      {
        type: "p",
        text: "This is the one most people have not heard of, and it is the one that changes lives. Areca nut causes the soft lining of the mouth to become progressively stiff and fibrous. The tissue loses its elasticity, and the mouth slowly stops opening properly.",
      },
      {
        type: "p",
        text: "It is not reversible. Advanced cases cannot open wide enough to eat normally or to be treated dentally, and it carries a significantly raised risk of turning cancerous. Early signs are worth knowing:",
      },
      {
        type: "ul",
        items: [
          "A burning sensation when eating spicy food that is new or getting worse",
          "The mouth feeling tight, or noticing you cannot open as wide as you used to",
          "Pale, blanched or marble-like patches inside the cheeks",
          "Firm vertical bands you can feel with your finger inside the cheek",
          "Loss of the normal flexibility of the lips or tongue",
        ],
      },
      { type: "h2", text: "Oral cancer — what to check for" },
      {
        type: "p",
        text: "Pakistan has among the highest rates of oral cancer in the world, and it is strongly associated with areca nut and tobacco use. It is also one of the few cancers you can look for yourself, in a mirror, in two minutes.",
      },
      {
        type: "callout",
        title: "Get any of these checked without waiting",
        text: "An ulcer or sore that has not healed in three weeks. A white or red patch anywhere in the mouth. A lump or thickening in the cheek, tongue or neck. Numbness of the lip or tongue. Persistent difficulty swallowing. A loose tooth with no obvious dental cause. Bleeding with no obvious cause.",
      },
      {
        type: "p",
        text: "Caught early, oral cancer is often very treatable. Caught late, it is not. The difference is usually how long someone waited before having a painless ulcer looked at.",
      },
      { type: "h2", text: "Cutting down realistically" },
      {
        type: "ol",
        items: [
          "Count what you actually use in a day for one week — most people underestimate substantially.",
          "Change the trigger rather than fighting the craving: identify the specific times of day, and put something else in that slot.",
          "Switch the hand or the side of the mouth you hold it in, which breaks the automaticity and reduces concentration of damage in one spot.",
          "Do not swap gutka for plain chhaliya assuming it is safe — areca nut alone causes submucous fibrosis without any tobacco at all.",
          "Tell whoever you share these with that you are cutting down; social supply is the hardest part to break.",
        ],
      },
      { type: "h2", text: "What about naswar and shisha?" },
      {
        type: "p",
        text: "Naswar is smokeless tobacco held in the lip or cheek, and it carries the same category of risk as gutka — gum recession at the exact spot it is held, white patches, and raised oral cancer risk. Because it sits in one place for long periods, the damage is often dramatic and very localised: a strip of receded gum and exposed root on one side only.",
      },
      {
        type: "p",
        text: "Shisha is frequently assumed to be milder than cigarettes because the smoke passes through water. It is not. A single session typically involves inhaling over a much longer period than one cigarette, and it carries the same staining, gum disease and oral cancer risks as smoking, plus the infection risk of shared mouthpieces.",
      },
      { type: "h2", text: "If you have already stopped" },
      {
        type: "p",
        text: "The risk falls after stopping, though not immediately and not all the way back to baseline. That makes continued checks worthwhile rather than pointless — the tissue changes that occurred while you were using these products remain worth monitoring for some years afterwards. Scaling and whitening can also deal with the staining that is left behind, which for many people is the visible reminder they most want gone.",
      },
      { type: "h2", text: "What we do at every appointment" },
      {
        type: "p",
        text: "Every examination at The Dental Lounge in Mirpur includes a soft-tissue check of the cheeks, tongue, floor of the mouth and palate, and a check of how far your mouth opens. It takes two minutes, it is not optional, and for this population it is the most valuable part of the visit.",
      },
      {
        type: "p",
        text: "If you use paan, chhaliya, gutka or naswar, tell us — plainly, without embarrassment. Nobody here is going to lecture you about it. What it changes is how closely we look and how often we ask you back, and that is the whole point.",
      },
    ],
    faqs: [
      {
        q: "Is chhaliya without tobacco safe?",
        a: "No. Areca nut on its own causes oral submucous fibrosis and is classified as a carcinogen independently of tobacco. Plain chhaliya and sweet supari carry real risk.",
      },
      {
        q: "Can submucous fibrosis be cured?",
        a: "Established fibrosis cannot be reversed. Treatment can improve symptoms and mouth opening, and stopping areca nut halts progression — which is why recognising the early signs matters so much.",
      },
      {
        q: "How often should I be checked if I use paan or gutka?",
        a: "Every three to four months rather than every six. The check is quick and it is the thing most likely to catch a problem while it is still easy to treat.",
      },
      {
        q: "Can the staining be removed completely?",
        a: "Scaling and polishing removes most surface staining and teeth return close to their natural shade. Deep staining that has penetrated the enamel may need whitening, and it will return with continued use.",
      },
    ],
    relatedServices: ["teeth-cleaning-and-scaling-mirpur", "general-dentistry-mirpur", "teeth-whitening-mirpur"],
  },
  {
    slug: "dental-treatment-during-ramadan",
    title: "Dental treatment and toothache during Ramadan",
    h1: "Dental Treatment and Toothache During Ramadan",
    metaTitle: "Dental Treatment During Ramadan | Fasting & Your Teeth",
    metaDescription:
      "Does a filling break your fast? What to do about toothache while fasting, how to protect your teeth between iftar and suhoor, and when to book in Mirpur.",
    excerpt:
      "Most dental treatment can be done while fasting, and toothache is not something to endure for thirty days. What the common scholarly positions say, what we do differently during Ramadan, and how to time an appointment.",
    datePublished: "2026-09-21",
    dateModified: "2026-09-21",
    readingMinutes: 7,
    blocks: [
      {
        type: "p",
        text: "Every Ramadan we see the same two patterns. People put off treatment they already needed until after Eid, and people endure toothache for weeks because they assume nothing can be done while they are fasting. Neither is necessary, and the second one is how a filling turns into a root canal.",
      },
      {
        type: "callout",
        title: "We are dentists, not scholars",
        text: "What follows describes the positions commonly held by scholars and widely relied on by Muslim patients and clinicians. It is not a fatwa. If a specific procedure worries you, ask an aalim you trust — and tell us what you have been advised, because we can almost always work around it.",
      },
      { type: "h2", text: "Does dental treatment break the fast?" },
      {
        type: "p",
        text: "The general position most scholars take is that dental treatment does not invalidate the fast so long as nothing is deliberately swallowed. The fast is broken by what reaches the stomach intentionally — not by instruments, not by a dentist working in your mouth, and not by the taste of a material.",
      },
      {
        type: "ul",
        items: [
          "Examinations and X-rays — no scholarly concern at all",
          "Fillings, crown preparation and extractions — widely held not to break the fast, provided water and debris are suctioned out rather than swallowed",
          "Local anaesthetic injections — the majority position is that an injection carrying no nutrition does not break the fast",
          "Scaling and polishing — the same principle applies, but it uses the most water of any routine procedure, so it is the one most people prefer to move to the evening",
        ],
      },
      {
        type: "p",
        text: "The practical risk in all of these is accidental swallowing, not the treatment itself. High-volume suction handles that, and if you tell us you are fasting we use it more aggressively and sit you more upright than we otherwise would.",
      },
      { type: "h2", text: "Toothache while fasting" },
      {
        type: "p",
        text: "Severe toothache is a medical problem, and the general principle in Islamic jurisprudence is that genuine medical necessity permits breaking a fast, to be made up later. Most people with toothache never reach that point — but nobody should spend a month in pain on the assumption that treatment has to wait.",
      },
      {
        type: "p",
        text: "Practically: painkillers can be taken at suhoor and after iftar, which covers a good part of the day. If the pain is waking you at night, if there is swelling, or if the tooth hurts to touch, that is an infection and it will not resolve on its own. See someone. Facial swelling that is spreading towards the eye or the floor of the mouth is a hospital matter the same day, fasting or not.",
      },
      { type: "h2", text: "What Ramadan does to your mouth" },
      {
        type: "p",
        text: "Two things change during fasting, and both matter more than people expect.",
      },
      { type: "h3", text: "Dry mouth" },
      {
        type: "p",
        text: "Saliva is the mouth's own defence — it washes away food, neutralises acid and carries minerals back into enamel. Going without water through a long summer day reduces saliva flow considerably, and a dry mouth is a mouth with its guard down. It is also the main reason for the bad breath people notice in themselves during Ramadan, far more than anything they ate at suhoor.",
      },
      {
        type: "ul",
        items: [
          "Drink water steadily between iftar and suhoor rather than in two large amounts",
          "Go easy on tea and coffee after iftar — both increase fluid loss",
          "Breathe through your nose rather than your mouth where you can, particularly while sleeping",
        ],
      },
      { type: "h3", text: "The sugar at both ends of the day" },
      {
        type: "p",
        text: "Iftar is, by long tradition, sweet — dates, mithai, jalebi, Rooh Afza, and more tea than usual. None of that is a problem in itself. The problem is that it arrives on a dry mouth with little saliva to buffer it, and then often continues in small amounts across the whole evening. Enamel is attacked for as long as sugar keeps being reintroduced, so grazing on sweets from iftar until bed is considerably worse than eating the same quantity in one sitting.",
      },
      { type: "h2", text: "Brushing and miswak" },
      {
        type: "p",
        text: "Brush after suhoor and again before bed — not straight after iftar if you have had something acidic, in which case wait about half an hour so you are not brushing softened enamel. Use a fluoride toothpaste and spit rather than rinse, so some fluoride stays on the teeth.",
      },
      {
        type: "p",
        text: "Miswak during fasting hours is accepted by the great majority of scholars, and it is genuinely effective at disrupting plaque. It is not a substitute for a fluoride toothpaste, though — miswak cleans, but it does not remineralise enamel the way fluoride does. Use both, at different times of day.",
      },
      { type: "h2", text: "Booking around fasting hours" },
      {
        type: "p",
        text: "We are open until 9pm seven days a week, which in practice means most Ramadan appointments fall into one of two slots: late morning, when you have energy but have not been fasting long, or after iftar, when nobody minds the water spray. Long treatments and anything involving scaling are easier after iftar. Short appointments, check-ups and reviews are easier in the morning.",
      },
      {
        type: "p",
        text: "One planning note worth knowing: Ramadan falls roughly eleven days earlier each year, so it moves steadily backwards through the seasons. Treatment that needs several visits over a few months — a root canal and crown, a denture, the early stages of an implant — is much easier to sequence if you start before Ramadan rather than trying to fit it inside.",
      },
    ],
    faqs: [
      {
        q: "Does a dental injection break the fast?",
        a: "The majority scholarly position is that an injection which carries no nutritional value does not break the fast, and dental local anaesthetic falls into that category. If you have been advised otherwise, tell us and we will arrange the appointment after iftar instead.",
      },
      {
        q: "Can I have a tooth taken out while fasting?",
        a: "Yes. An extraction does not break the fast provided you do not swallow blood or water deliberately, and we use suction throughout. Afterwards you will be asked to bite on gauze rather than rinse, which suits fasting well.",
      },
      {
        q: "Can I have scaling done during Ramadan?",
        a: "Yes, though it uses more water than any other routine procedure, so most fasting patients prefer an evening appointment. It is the one treatment we actively suggest moving after iftar.",
      },
      {
        q: "Why is my breath worse during Ramadan?",
        a: "Reduced saliva, not food. A dry mouth allows the bacteria responsible for odour to multiply. Drinking enough water between iftar and suhoor, brushing at both ends of the day and cleaning your tongue makes a noticeable difference.",
      },
      {
        q: "Should I just wait until after Eid for treatment?",
        a: "Only if nothing hurts and nothing is actively decaying. Waiting a month with a symptomatic tooth is how a filling becomes a root canal, and a root canal becomes an extraction. A check-up costs you nothing to attend and tells you whether waiting is safe.",
      },
    ],
    relatedServices: ["general-dentistry-mirpur", "teeth-cleaning-and-scaling-mirpur", "root-canal-treatment-mirpur"],
  },

  {
    slug: "replacing-a-missing-tooth-implant-bridge-or-denture",
    title: "Replacing a missing tooth: implant, bridge or denture",
    h1: "Replacing a Missing Tooth: Implant, Bridge or Denture?",
    metaTitle: "Implant vs Bridge vs Denture | Missing Tooth Mirpur AJK",
    metaDescription:
      "The three ways to replace a missing tooth compared — cost, how long each lasts, how many visits, and what happens to the teeth either side if you leave the gap.",
    excerpt:
      "A gap at the back is easy to live with and expensive to ignore. What an implant, a bridge and a denture each actually involve, what they cost in Pakistan, and how to choose between them.",
    datePublished: "2026-09-21",
    dateModified: "2026-09-21",
    readingMinutes: 9,
    blocks: [
      {
        type: "p",
        text: "Losing a front tooth sends people to a dentist within the week. Losing a back one often sends nobody anywhere, because it does not show and chewing adapts. That is the gap that causes the most expensive problems five years later, and the reason is mechanical rather than cosmetic.",
      },
      { type: "h2", text: "What happens if you leave the gap" },
      {
        type: "p",
        text: "Teeth are held in position by their neighbours. Remove one and three things begin, slowly and without symptoms:",
      },
      {
        type: "ol",
        items: [
          "The teeth either side tilt into the space, which opens food traps and makes them harder to clean and more likely to decay",
          "The tooth in the opposing jaw, with nothing to bite against, drifts down or up out of its socket — over-eruption, and it can eventually make the tooth unrestorable",
          "The bone that held the root, no longer loaded by chewing, resorbs and shrinks — which is what later makes an implant harder and sometimes means bone grafting",
        ],
      },
      {
        type: "p",
        text: "None of this hurts, which is precisely why it gets missed. The practical consequence is that the cheapest moment to replace a tooth is early, and the options narrow the longer you wait.",
      },
      { type: "h2", text: "The three options side by side" },
      {
        type: "table",
        head: ["", "Implant", "Bridge", "Denture (partial)"],
        rows: [
          ["What it is", "A titanium post in the jawbone with a crown on top", "A crown on the teeth either side carrying a false tooth between them", "A removable plate carrying one or more false teeth"],
          ["Neighbouring teeth", "Untouched", "Must be filed down, permanently", "Untouched, though clasps rest on them"],
          ["Typical cost (PKR)", "80,000 – 200,000 per tooth", "45,000 – 180,000 for a three-unit bridge", "25,000 – 80,000"],
          ["Time to complete", "3 – 6 months", "2 – 3 weeks", "3 – 6 weeks"],
          ["Typical lifespan", "15+ years, often much longer", "10 – 15 years", "5 – 8 years, with adjustments"],
          ["Preserves jawbone", "Yes", "No", "No"],
          ["Removable", "No", "No", "Yes"],
        ],
        caption: "Indicative ranges for private clinics in Pakistan, 2026. Cost depends heavily on materials and on whether grafting is needed.",
      },
      { type: "h2", text: "When an implant is the right answer" },
      {
        type: "p",
        text: "An implant is the only option that replaces the root as well as the crown, which is why it is the only one that keeps the bone loaded and stops it shrinking. It also leaves the neighbouring teeth entirely alone. If the teeth either side of your gap are healthy and untouched, filing them down to carry a bridge is a genuine loss — you are damaging two sound teeth to fix one missing one.",
      },
      {
        type: "p",
        text: "The trade-offs are cost, and time. Three to six months pass between placing the post and fitting the crown, because the bone has to fuse to the titanium. You are not toothless in the interim — a temporary is provided — but it is not a quick solution, and it is the wrong choice if you need the gap filled before a wedding in six weeks.",
      },
      { type: "h2", text: "When a bridge makes more sense" },
      {
        type: "p",
        text: "A bridge becomes the sensible option when the teeth either side of the gap are already heavily filled or already crowned. In that case they need covering anyway, and using them to carry a bridge costs you nothing you had not already lost. It is also considerably faster — two appointments about ten days apart — and less expensive up front.",
      },
      {
        type: "p",
        text: "The honest downside is that a bridge ties three teeth together. If one abutment fails in ten years, the whole bridge usually comes off and is remade, and the failure is often decay underneath a crown margin where it was hard to clean. Bridges demand good cleaning under the false tooth, with floss threaders or interdental brushes, every day.",
      },
      { type: "h2", text: "When a denture is the right call" },
      {
        type: "p",
        text: "Partial dentures get dismissed too quickly. They are the right answer when several teeth are missing in different parts of the mouth, when the remaining teeth are not strong enough to carry a bridge, or when cost genuinely rules the other two out. A well-made partial restores chewing and appearance for a fraction of the price, and it can be added to later if more teeth are lost.",
      },
      {
        type: "p",
        text: "They are also the reasonable interim step. Some patients have a partial made while saving for implants, which is a perfectly sound plan as long as you understand the bone is still shrinking underneath it.",
      },
      {
        type: "callout",
        title: "If you are visiting from the UK",
        text: "Bridges and dentures both finish comfortably inside a three to four week trip. Implants do not — but they are routinely split across two visits, with the post placed on one trip and the crown fitted on the next. Tell us your travel pattern at the first appointment and we will plan around it rather than around a calendar.",
      },
      { type: "h2", text: "The question to ask yourself first" },
      {
        type: "p",
        text: "Not which is cheapest today, but what this tooth will have cost in ten years. A denture at 40,000 replaced twice is not obviously cheaper than an implant at 150,000 that is still in place. Equally, an implant is not automatically worth it for a back tooth in someone who chews comfortably without it. Both answers are legitimate — what is not legitimate is choosing without being told the difference.",
      },
    ],
    faqs: [
      {
        q: "Do I have to replace a missing back tooth at all?",
        a: "Not always. If the tooth was the very last molar and the bite is stable, leaving it can be reasonable. But that is a judgement made after looking at how the opposing tooth is behaving, not a general rule — over-eruption is the risk, and it is silent.",
      },
      {
        q: "How painful is an implant?",
        a: "The placement is done under local anaesthetic and most patients report it as easier than the extraction that preceded it. Expect some soreness and swelling for two to three days, managed with ordinary painkillers.",
      },
      {
        q: "Can I get an implant if the tooth has been missing for years?",
        a: "Usually, but the bone will have shrunk, and grafting may be needed first — which adds cost and several months. This is the main reason we suggest deciding about replacement early rather than after a decade.",
      },
      {
        q: "Will a bridge or denture look obvious?",
        a: "A well-made one should not. Shade matching is done against your own teeth, and the difficulty is nearly always the gum line rather than the tooth. Ask to see the try-in stage before anything is finalised — that is what it is for.",
      },
      {
        q: "How long do implants last?",
        a: "Studies consistently report high survival rates beyond ten and fifteen years. The variables that matter most are smoking, uncontrolled diabetes and cleaning — an implant can develop the equivalent of gum disease around it and be lost that way.",
      },
    ],
    relatedServices: ["dental-implants-mirpur", "dental-crowns-and-bridges-mirpur", "dentures-mirpur"],
  },

  {
    slug: "braces-vs-clear-aligners-in-pakistan",
    title: "Braces or clear aligners: choosing orthodontic treatment",
    h1: "Braces or Clear Aligners? Choosing Orthodontic Treatment",
    metaTitle: "Braces vs Clear Aligners in Pakistan | Cost & Comparison",
    metaDescription:
      "Metal, ceramic and clear aligners compared for cost, treatment time and what each can actually correct — plus the retainer stage nobody mentions until the end.",
    excerpt:
      "Aligners are not simply a nicer version of braces, and there are cases they cannot treat. What each option does well, what it costs in Pakistan, and why the retainer matters as much as the treatment.",
    datePublished: "2026-09-21",
    dateModified: "2026-09-21",
    readingMinutes: 8,
    blocks: [
      {
        type: "p",
        text: "Most people arriving for an orthodontic consultation have already decided they want clear aligners and are hoping to be told they are a candidate. Often they are. But aligners and braces are not two brands of the same thing — they move teeth by different mechanics, and the difference decides some cases outright.",
      },
      { type: "h2", text: "The options" },
      { type: "h3", text: "Metal braces" },
      {
        type: "p",
        text: "Brackets bonded to the front of each tooth, joined by a wire that is adjusted every four to six weeks. Unfashionable, visible, and still the most capable appliance there is. Nothing else moves teeth as precisely in as many directions, and nothing else handles a severely crowded or rotated case as reliably. They are also the least expensive option by a clear margin.",
      },
      { type: "h3", text: "Ceramic braces" },
      {
        type: "p",
        text: "Mechanically the same as metal, with tooth-coloured brackets. Considerably less visible at conversational distance. They cost more, are slightly bulkier, and the brackets are more brittle — which matters if you play sport or eat a lot of hard food.",
      },
      { type: "h3", text: "Clear aligners" },
      {
        type: "p",
        text: "A sequence of removable transparent trays, each worn about two weeks, each moving the teeth a fraction further. Nearly invisible, removable for eating and cleaning, and far more comfortable than brackets. They are also entirely dependent on you wearing them 20 to 22 hours a day. Treatment that stalls with aligners almost always stalls for that reason.",
      },
      {
        type: "table",
        head: ["", "Metal braces", "Ceramic braces", "Clear aligners"],
        rows: [
          ["Typical cost (PKR)", "50,000 – 150,000", "90,000 – 200,000", "150,000 – 400,000+"],
          ["Visibility", "Visible", "Subtle", "Nearly invisible"],
          ["Typical duration", "12 – 24 months", "12 – 24 months", "6 – 18 months for suitable cases"],
          ["Removable", "No", "No", "Yes — and that is the risk"],
          ["Visit frequency", "Every 4 – 6 weeks", "Every 4 – 6 weeks", "Every 6 – 10 weeks"],
          ["Handles complex cases", "Yes, all of them", "Yes, nearly all", "Mild to moderate only"],
        ],
        caption: "Indicative ranges for private clinics in Pakistan, 2026. Case complexity moves these figures more than anything else.",
      },
      { type: "h2", text: "What aligners genuinely cannot do well" },
      {
        type: "p",
        text: "This is the part that tends to be glossed over. Aligners grip the crown of the tooth and tip it. Braces engage the tooth through a bracket and wire, which gives control over the root as well. That difference shows up in specific movements:",
      },
      {
        type: "ul",
        items: [
          "Large rotations, particularly of round teeth such as premolars and canines",
          "Moving a tooth bodily through bone rather than tipping it",
          "Closing large extraction spaces",
          "Significant bite corrections where the jaws themselves are mismatched",
          "Bringing down a tooth that has not erupted",
        ],
      },
      {
        type: "p",
        text: "Many of these can be managed with attachments bonded to the teeth, elastics, or a hybrid approach that starts with braces and finishes with aligners. What should worry you is a clinic that says yes to aligners before taking X-rays and impressions. The answer is not knowable from looking at your front teeth.",
      },
      { type: "h2", text: "The cost question, properly framed" },
      {
        type: "p",
        text: "Aligners are two to three times the price of metal braces in Pakistan, and the gap is mostly laboratory and licensing cost rather than clinical time. Whether that is worth it is a personal judgement — for an adult in a client-facing job, eighteen months without visible brackets has real value. For a fourteen-year-old, it usually does not, and the compliance requirement makes them a worse clinical bet.",
      },
      {
        type: "p",
        text: "Orthodontics is nearly always paid across the course of treatment rather than up front, which makes the monthly difference smaller than the headline figures suggest. Ask for the schedule in writing before starting.",
      },
      { type: "h2", text: "The stage everyone forgets: retainers" },
      {
        type: "callout",
        title: "Teeth move back. All of them, forever.",
        text: "Orthodontic relapse is not a sign that treatment failed — it is the default behaviour of teeth. Retainers are not an optional extra at the end. They are the part that makes the previous eighteen months permanent, and they are needed indefinitely, not for six months.",
      },
      {
        type: "p",
        text: "Expect either a fixed wire bonded behind the front teeth, a removable retainer worn at night, or both. Ask at the consultation what the retention plan is and what it costs, because a quote that excludes retainers is not a complete quote.",
      },
      { type: "h2", text: "Before any orthodontics starts" },
      {
        type: "p",
        text: "Teeth cannot be moved through unhealthy gums, and decay under a bracket is a miserable problem to fix mid-treatment. Any active gum disease is treated first, and any cavities are filled first. If you use paan or chhaliya, that conversation happens before treatment rather than during it — restricted mouth opening makes orthodontics considerably harder.",
      },
      {
        type: "p",
        text: "One practical point for families abroad: orthodontics is the one treatment that does not split neatly across visits home. Adjustments every four to six weeks are not a formality, and a fixed appliance left untended for a year causes damage rather than merely stalling. If you cannot attend adjustments, aligners with longer review intervals are sometimes workable — but that is a decision to make honestly at the start.",
      },
    ],
    faqs: [
      {
        q: "Am I too old for braces?",
        a: "No. Teeth move at any age — adult treatment is slower than in a teenager because the bone remodels more slowly, but it works. A meaningful share of orthodontic patients are now adults, many of them treated with aligners.",
      },
      {
        q: "How much do braces cost in Pakistan?",
        a: "Published ranges run roughly 50,000 to 150,000 PKR for metal braces and 90,000 to 200,000 for ceramic, with clear aligners from about 150,000 upwards. Complexity and treatment length move these figures more than the clinic does.",
      },
      {
        q: "Do braces hurt?",
        a: "The first few days after fitting and the day or two after each adjustment are achy rather than sharply painful, and ordinary painkillers handle it. Soft food for two days after each visit makes a real difference.",
      },
      {
        q: "Can I switch from aligners to braces partway through?",
        a: "Yes, and it is not unusual if a case turns out to need movements aligners handle poorly. Ask before starting what happens, and what it costs, if the plan needs to change.",
      },
      {
        q: "Will I need teeth taken out?",
        a: "Sometimes, where there is not enough room in the arch for the teeth to line up. It is a decision made from X-rays and measurements, not from appearance, and there is usually more than one legitimate plan. Ask what the alternative is and what it trades off.",
      },
    ],
    relatedServices: ["braces-and-orthodontics-mirpur", "general-dentistry-mirpur", "cosmetic-dentistry-mirpur"],
  },

  {
    slug: "bleeding-gums-and-gum-disease",
    title: "Why your gums bleed when you brush",
    h1: "Why Your Gums Bleed When You Brush",
    metaTitle: "Bleeding Gums & Gum Disease | Dentist Mirpur AJK",
    metaDescription:
      "Bleeding gums are not normal and not caused by brushing too hard. What gingivitis and periodontitis are, which stage can still be reversed, and when to be seen.",
    excerpt:
      "Gum disease is the most common reason adults lose teeth, and it is painless until late. The early stage reverses completely. The later stage does not — which is why the difference is worth knowing.",
    datePublished: "2026-09-21",
    dateModified: "2026-09-21",
    readingMinutes: 7,
    blocks: [
      {
        type: "p",
        text: "If your hands bled every time you washed them you would not conclude that you were washing too hard. Gums are the one part of the body where people reach for that explanation, and it is almost always wrong. Healthy gums do not bleed when brushed. Bleeding means inflammation, and inflammation means bacteria sitting somewhere the brush is not reaching.",
      },
      {
        type: "callout",
        title: "The counter-intuitive part",
        text: "The instinct is to brush that area more gently, or avoid it. That makes it worse, because the plaque causing the inflammation stays put. Cleaning the area properly usually stops the bleeding within one to two weeks.",
      },
      { type: "h2", text: "Two stages, and only one of them reverses" },
      { type: "h3", text: "Gingivitis — the reversible stage" },
      {
        type: "p",
        text: "Plaque sitting along the gum line irritates the gum. It becomes red, slightly swollen and bleeds when disturbed. Nothing has yet been lost. Remove the plaque — properly, including between the teeth — and the gum returns to full health with no lasting damage. This stage is extremely common and entirely fixable.",
      },
      { type: "h3", text: "Periodontitis — the stage that does not reverse" },
      {
        type: "p",
        text: "Left long enough, the inflammation moves below the gum line and begins destroying the bone holding the tooth in. Pockets form between tooth and gum, plaque hardens into tartar inside them where no brush can reach, and the bone recedes. Treatment can halt this and keep the teeth for decades — but the bone already lost does not grow back.",
      },
      {
        type: "ul",
        items: [
          "Gums that bleed when brushing or eating",
          "Persistent bad breath or a bad taste that returns quickly after brushing",
          "Gums that look receded, or teeth that look longer than they used to",
          "Sensitivity at the gum line, where root surface is now exposed",
          "Teeth that feel slightly loose, or that have drifted or spaced out",
          "A gum that is tender to press, or that releases pus",
        ],
      },
      {
        type: "p",
        text: "The last three are late signs. The first two are the ones to act on, and they are the ones most easily dismissed.",
      },
      { type: "h2", text: "Why this matters more here than the average" },
      {
        type: "p",
        text: "Two local factors raise the stakes. The first is diabetes — Pakistan has one of the highest rates in the world, and the relationship with gum disease runs in both directions. Diabetes makes gum disease more severe and harder to control, and untreated gum disease makes blood sugar harder to manage. If you are diabetic, gum health is part of managing the diabetes, not a separate matter.",
      },
      {
        type: "p",
        text: "The second is paan, chhaliya, gutka and naswar, all of which are common across Mirpur District and all of which damage gum tissue directly while masking bleeding. Smoking does the same — nicotine constricts the small blood vessels in the gum, so a smoker's gums often bleed less than a non-smoker's while the disease underneath progresses faster. Absence of bleeding is not reassurance in a smoker.",
      },
      { type: "h2", text: "What treatment actually involves" },
      {
        type: "p",
        text: "For gingivitis: a scale and polish to remove the hardened deposits, and a genuinely specific conversation about cleaning between the teeth, which is where nearly all of this starts. A toothbrush cleans three of the five surfaces of a tooth. Floss or interdental brushes clean the other two, and those two are where gum disease begins.",
      },
      {
        type: "p",
        text: "For periodontitis: deep cleaning below the gum line, usually under local anaesthetic and usually across two or more visits, one section of the mouth at a time. Afterwards, reviews every three to four months rather than every six, because the pockets recolonise. It is a condition managed rather than cured, and managed well it need never cost you a tooth.",
      },
      { type: "h2", text: "What to do between now and an appointment" },
      {
        type: "ol",
        items: [
          "Brush twice daily for two full minutes with a fluoride toothpaste, angling the bristles into the gum line rather than scrubbing across it",
          "Clean between every tooth once a day — interdental brushes if the gaps take them, floss if they do not",
          "Expect some bleeding for the first week or two as you start, and keep going; it should settle rather than worsen",
          "Spit, do not rinse, so fluoride stays on the teeth",
          "If bleeding has not improved after two weeks of genuinely thorough cleaning, that needs looking at rather than more effort",
        ],
      },
      {
        type: "p",
        text: "Mouthwash is not a substitute for any of the above. Chlorhexidine rinses have a real short-term role after treatment, but used long-term they stain teeth and are no replacement for physically removing plaque.",
      },
    ],
    faqs: [
      {
        q: "Is it normal for gums to bleed a little when brushing?",
        a: "No. Common, but not normal. Healthy gums do not bleed when brushed. It is the earliest and most reliable sign of gum inflammation, and at that stage it reverses completely.",
      },
      {
        q: "Am I brushing too hard?",
        a: "Aggressive brushing damages gums and abrades roots, so it is worth correcting — but it is rarely the cause of bleeding. If one area bleeds and the rest does not, that area has plaque, not excess pressure.",
      },
      {
        q: "Can gum disease be cured?",
        a: "Gingivitis, yes — completely. Periodontitis, no; the bone already lost does not return. It can be stabilised indefinitely with treatment and regular maintenance, which is why catching it early matters so much.",
      },
      {
        q: "Does gum disease cause bad breath?",
        a: "It is one of the most common causes. Bacteria in gum pockets produce sulphur compounds, and no amount of mouthwash addresses it while the pockets remain.",
      },
      {
        q: "Will my teeth fall out?",
        a: "Untreated advanced periodontitis is the leading cause of tooth loss in adults. Treated and maintained, most people keep their teeth for life. The determining factor is when it is caught, not how bad it looks today.",
      },
    ],
    relatedServices: ["teeth-cleaning-and-scaling-mirpur", "general-dentistry-mirpur", "dental-implants-mirpur"],
  },
];

/**
 * Newest first, for the blog index. GUIDES keeps its authored order for
 * generateStaticParams and the sitemap, where order carries no meaning.
 */
export const GUIDES_BY_DATE = [...GUIDES].sort(
  (a, b) => Date.parse(b.datePublished) - Date.parse(a.datePublished),
);

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
