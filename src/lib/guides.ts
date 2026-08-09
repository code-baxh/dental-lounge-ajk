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
      "What root canals, implants, braces, crowns, scaling and whitening cost in Pakistan in 2026, and what consultations cost in Mirpur AJK — with the ranges private clinics publish.",
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
      "What to do for severe toothache, facial swelling, a knocked-out tooth or a broken filling — what helps, what makes it worse, and where to get emergency dental care in Mirpur AJK.",
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
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
