import { CITY_QUALIFIED } from "./site";

export type Faq = { q: string; a: string };
export type Section = { heading: string; body?: string[]; list?: string[] };

export type PriceBand = {
  low: number;
  high: number;
  /** What the range represents and where it comes from. Never present a market range as this clinic's fee. */
  note: string;
};

export type Service = {
  slug: string;
  name: string;
  /** Urdu / romanised-Urdu term real patients use when searching or asking. */
  urdu: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  short: string;
  image: string;
  duration: string;
  price?: PriceBand;
  intro: string[];
  sections: Section[];
  faqs: Faq[];
  related: string[];
};

const PRICE_DISCLAIMER =
  "This is the typical range published for private clinics across Pakistan, shown so you can budget before you visit. It is not a quote. Your exact cost depends on the tooth, the number of canals or units involved, and the materials you choose — we confirm the full price in writing at your first examination, before any treatment begins.";

export const SERVICES: Service[] = [
  {
    slug: "root-canal-treatment-mirpur",
    name: "Root Canal Treatment",
    urdu: "روٹ کینال / داڑھ کا علاج",
    h1: "Root Canal Treatment in Mirpur, AJK",
    metaTitle: "Root Canal Treatment in Mirpur AJK | The Dental Lounge",
    metaDescription:
      "Gentle, single-visit root canal treatment in Mirpur, Azad Kashmir. Save the tooth instead of losing it. Open 10am–9pm, seven days, at Fazal Chowk. Call +92 345 308 1698.",
    short:
      "Save a badly decayed or infected tooth and end the pain, using modern rotary instruments and proper anaesthesia.",
    image: "rootcanal",
    duration: "60–90 minutes per visit, usually one or two visits",
    price: { low: 7000, high: 25000, note: PRICE_DISCLAIMER },
    intro: [
      "A root canal is what saves a tooth that would otherwise have to come out. When decay or a crack reaches the nerve inside the tooth, the nerve becomes infected — that is the deep, throbbing ache that keeps you awake and does not settle with painkillers. Root canal treatment removes the infected tissue from inside the tooth, disinfects the space, and seals it, so the outer tooth stays in your mouth and keeps doing its job.",
      "The single most common thing patients tell us afterwards is that they wish they had come sooner. The reputation root canals have for being painful comes from an era of poor anaesthesia and hand instruments. Done properly, the procedure relieves pain — it does not cause it.",
    ],
    sections: [
      {
        heading: "Signs you may need a root canal",
        list: [
          "A deep, spontaneous ache that wakes you at night or comes on without being triggered",
          "Lingering sensitivity to hot or cold that lasts more than a few seconds after the drink is gone",
          "Pain when biting down on one particular tooth",
          "A tooth that has darkened compared with its neighbours",
          "A swelling, gum boil, or bad taste tracking from one spot",
          "A large old filling or a cracked tooth that has recently started hurting",
        ],
      },
      {
        heading: "What happens during treatment",
        body: [
          "We start with an X-ray to see the root shape and how far the infection has spread. You are then fully numbed — we do not begin until the tooth is genuinely silent to testing, not just until the anaesthetic has been given.",
          "The tooth is isolated, the infected nerve tissue is removed, and the canals are shaped and disinfected with rotary instruments. The canals are then filled and sealed. Because a root-treated back tooth becomes more brittle, most molars need a crown afterwards to stop them fracturing — we will tell you at the start whether yours does, so the crown cost is never a surprise later.",
        ],
      },
      {
        heading: "Aftercare",
        list: [
          "Mild tenderness for two to three days is normal; ordinary painkillers handle it",
          "Avoid chewing hard food on that side until the permanent filling or crown is placed",
          "Complete the crown if we have advised one — an unrestored root-treated molar often fractures within a year",
          "Come back immediately if swelling increases rather than settles",
        ],
      },
    ],
    faqs: [
      {
        q: "Is a root canal painful?",
        a: "No. The procedure is done under local anaesthetic and the tooth is fully numb throughout — most patients find it comparable to having a filling. The pain people associate with root canals is the infection itself, which is what the treatment removes.",
      },
      {
        q: "How much does a root canal cost in Pakistan?",
        a: "Published ranges for private clinics in Pakistan run from about PKR 7,000 to PKR 25,000 per tooth, and a front tooth with a single canal costs less than a molar with three or four. A crown afterwards is a separate cost. We give you the exact figure in writing after examining and X-raying the tooth.",
      },
      {
        q: "How many visits will I need?",
        a: "Most teeth are completed in one or two visits. A tooth with active swelling or a long-standing abscess sometimes needs an extra appointment with a medicated dressing in between.",
      },
      {
        q: "Can I just have the tooth pulled instead?",
        a: "You can, and it is cheaper on the day. But every gap changes how the neighbouring teeth sit, and replacing the tooth later with an implant or bridge costs several times more than saving it now. We will give you the honest comparison for your specific tooth rather than pushing either option.",
      },
      {
        q: "Do you do root canals for patients visiting from the UK?",
        a: "Yes, and it is a large part of what we do over the summer. If you are in Mirpur for a limited number of weeks, tell us your travel dates at the first appointment and we will plan the treatment — including the crown — to finish before you fly.",
      },
    ],
    related: ["dental-crowns-and-bridges-mirpur", "tooth-extraction-mirpur", "dental-fillings-mirpur"],
  },

  {
    slug: "dental-implants-mirpur",
    name: "Dental Implants",
    urdu: "مصنوعی دانت / ڈینٹل امپلانٹ",
    h1: "Dental Implants in Mirpur, AJK",
    metaTitle: "Dental Implants in Mirpur AJK | The Dental Lounge",
    metaDescription:
      "Permanent dental implants in Mirpur, Azad Kashmir — single tooth, multiple teeth and implant-supported dentures. Free implant assessment. Call +92 345 308 1698.",
    short:
      "A titanium root placed in the jaw and topped with a crown — the closest replacement there is to a natural tooth.",
    image: "implants",
    duration: "Placement 45–60 minutes; 3–6 months total including healing",
    price: { low: 80000, high: 200000, note: PRICE_DISCLAIMER },
    intro: [
      "An implant replaces the root of a missing tooth, not just the visible part. A titanium post is placed into the jawbone, the bone fuses to it over a few months, and a crown is fixed on top. Once it has healed you brush it, chew on it and forget about it.",
      "The reason implants are worth the cost is what happens without one. When a tooth is lost, the bone that used to support it starts to shrink, the teeth either side drift into the gap, and the opposing tooth over-erupts. An implant is the only replacement that loads the bone and stops that process.",
    ],
    sections: [
      {
        heading: "What implants can replace",
        list: [
          "A single missing tooth, without cutting down the healthy teeth on either side",
          "Several missing teeth, using an implant-supported bridge",
          "A full arch, using an implant-retained denture that clips firmly into place",
          "A failing tooth that is about to be extracted — sometimes placed the same day",
        ],
      },
      {
        heading: "The stages",
        body: [
          "Assessment and X-rays first: we measure the bone height and width at the site and check the gum condition. Not every mouth is ready for an implant on day one — heavy smokers, uncontrolled diabetics, and sites with severe bone loss need to be handled differently, and we will say so rather than proceed and hope.",
          "Placement itself is done under local anaesthetic and is usually more comfortable than an extraction. Healing takes three to six months while the bone integrates with the implant. A temporary tooth can be worn in the meantime if the gap shows. Finally the permanent crown is made and fitted.",
        ],
      },
      {
        heading: "Looking after an implant",
        list: [
          "Brush and floss it exactly like a natural tooth — implants do not decay, but the gum around them can become infected",
          "Professional cleaning twice a year; peri-implantitis is the main reason implants are lost",
          "Stop smoking if you can — it is the single biggest risk factor for early implant failure",
          "Wear a night guard if you grind your teeth",
        ],
      },
    ],
    faqs: [
      {
        q: "How much do dental implants cost in Pakistan?",
        a: "Single implants in Pakistan are generally published between PKR 80,000 and PKR 200,000 per tooth including the crown, with the implant brand and any bone grafting driving most of the difference. We quote per case after X-rays, and we will tell you honestly if a bridge would serve you better for less.",
      },
      {
        q: "How long do implants last?",
        a: "With good hygiene and regular check-ups, the implant itself is designed to be permanent. The crown on top is the part that eventually wears and may need replacing after ten to fifteen years.",
      },
      {
        q: "Does it hurt?",
        a: "Placement is done under local anaesthetic. Most patients describe the recovery as easier than a difficult extraction, with mild soreness for two to three days.",
      },
      {
        q: "I am visiting Mirpur from the UK for four weeks — can I have an implant?",
        a: "Often yes, if we plan it. The implant can be placed at the start of your visit and the crown fitted on a later trip, or arranged with your dentist at home. Come in as early in your stay as possible so we have room to work with.",
      },
      {
        q: "What if I do not have enough bone?",
        a: "Bone grafting can rebuild the site, which adds time and cost. We check this at the assessment rather than discovering it mid-procedure.",
      },
    ],
    related: ["dentures-mirpur", "dental-crowns-and-bridges-mirpur", "tooth-extraction-mirpur"],
  },

  {
    slug: "braces-and-orthodontics-mirpur",
    name: "Braces & Orthodontics",
    urdu: "دانتوں کی تار / بریسز",
    h1: "Braces & Orthodontic Treatment in Mirpur, AJK",
    metaTitle: "Braces & Clear Aligners in Mirpur AJK | Dental Lounge",
    metaDescription:
      "Metal braces, ceramic braces and clear aligners in Mirpur, Azad Kashmir. Straighten crowded or protruding teeth. Free orthodontic assessment. Call +92 345 308 1698.",
    short:
      "Metal braces, ceramic braces and clear aligners to correct crowding, gaps, protruding teeth and bite problems.",
    image: "orthodontic",
    duration: "12–24 months typical, reviewed every 4–6 weeks",
    price: { low: 50000, high: 300000, note: PRICE_DISCLAIMER },
    intro: [
      "Orthodontic treatment moves teeth into a better position over months, using gentle continuous force. It is the right treatment for crowded teeth, gaps, front teeth that stick out, and bites that do not meet correctly.",
      "Straightening is not only cosmetic. Crowded and overlapping teeth trap plaque in places a brush cannot reach, which is why they are the teeth that decay and lose gum support first. A well-aligned bite also stops uneven wear on individual teeth.",
    ],
    sections: [
      {
        heading: "Options we offer",
        list: [
          "Metal braces — the most effective and most affordable option, and the right choice for complex cases",
          "Ceramic braces — tooth-coloured brackets that are far less visible in photographs",
          "Clear aligners — removable, near-invisible, best suited to mild and moderate crowding",
          "Retainers — essential after any treatment; teeth drift back without them",
        ],
      },
      {
        heading: "What to expect",
        body: [
          "The first appointment is an assessment: photographs, X-rays and a discussion of what is realistically achievable and how long it will take. You will get a written treatment plan with the total cost and the payment schedule before anything is fitted.",
          "Braces are then fitted — a painless appointment of about an hour. Teeth feel tender for three to four days after fitting and after each adjustment; soft food and ordinary painkillers cover it. You come in every four to six weeks for adjustments.",
        ],
      },
      {
        heading: "Living with braces",
        list: [
          "Avoid sugarcane, hard nuts, bones and toffee — these break brackets and add months to treatment",
          "Brush after every meal; decalcified white marks around brackets are permanent",
          "Use interdental brushes to clean under the wire",
          "Wear your retainer exactly as instructed once the braces come off — this is the part patients skip and regret",
        ],
      },
    ],
    faqs: [
      {
        q: "How much do braces cost in Mirpur?",
        a: "Braces in Pakistan are typically published between PKR 50,000 and PKR 300,000 for a full course, with metal braces at the lower end and clear aligners at the top. Cost depends on how much movement is needed and how long treatment runs. We set out the total and the instalment plan before fitting.",
      },
      {
        q: "What is the right age for braces?",
        a: "Around twelve to fourteen, once most adult teeth are through, is ideal — but there is no upper limit. Adults in their thirties, forties and beyond are treated routinely; healthy teeth and gums matter far more than age.",
      },
      {
        q: "How long will I wear them?",
        a: "Twelve to twenty-four months for most cases. Mild crowding can finish faster; significant bite correction takes longer. We give you an estimate at the assessment and review it as treatment progresses.",
      },
      {
        q: "Can I get braces if I live in Dadyal or Bhimber?",
        a: "Yes — a significant share of our orthodontic patients travel in from Dadyal, Chakswari, Khari Sharif and Bhimber. Because adjustments are only every four to six weeks, the travel is manageable, and we schedule appointments to fit around the journey.",
      },
      {
        q: "Do clear aligners work as well as braces?",
        a: "For mild to moderate crowding, yes. For significant bite correction, rotations and extraction cases, fixed braces remain more predictable. We will tell you which category you fall into rather than selling you the more expensive option by default.",
      },
    ],
    related: ["teeth-cleaning-and-scaling-mirpur", "cosmetic-dentistry-mirpur", "dental-crowns-and-bridges-mirpur"],
  },

  {
    slug: "teeth-cleaning-and-scaling-mirpur",
    name: "Teeth Cleaning & Scaling",
    urdu: "دانتوں کی صفائی / سکیلنگ",
    h1: "Teeth Cleaning & Scaling in Mirpur, AJK",
    metaTitle: "Teeth Scaling & Cleaning in Mirpur AJK | Dental Lounge",
    metaDescription:
      "Professional teeth scaling and polishing in Mirpur, Azad Kashmir. Treat bleeding gums, tartar and bad breath. Open 10am–9pm daily. Call +92 345 308 1698.",
    short:
      "Ultrasonic removal of tartar and stain that brushing cannot shift — the treatment that keeps gums and bone healthy.",
    image: "cleaning",
    duration: "30–45 minutes; deep cleaning may need two visits",
    price: { low: 1500, high: 7000, note: PRICE_DISCLAIMER },
    intro: [
      "Scaling removes hardened tartar from above and below the gum line. Once plaque hardens into tartar it cannot be brushed off, and the bacteria living in it keep the gums permanently inflamed. That inflammation is what causes bleeding gums, bad breath and, over years, the loss of the bone that holds teeth in.",
      "Gum disease is the most common reason adults in Pakistan lose teeth — more common than decay — and it is almost entirely preventable with regular cleaning.",
    ],
    sections: [
      {
        heading: "Signs you are overdue",
        list: [
          "Gums that bleed when you brush — this is never normal, however mild",
          "Persistent bad breath or a bad taste that returns quickly after brushing",
          "Visible yellow or brown deposits at the gum line, especially behind the lower front teeth",
          "Gums that look swollen, shiny or have receded",
          "Teeth that feel slightly loose or have started to drift apart",
          "Heavy staining from tea, paan, chhaliya, gutka or smoking",
        ],
      },
      {
        heading: "What we do",
        body: [
          "An ultrasonic scaler breaks up the tartar with high-frequency vibration and water, then hand instruments clean the areas below the gum line. The teeth are polished to remove surface stain and leave a smooth surface that plaque takes longer to stick to.",
          "If the gum disease is established, a single clean is not enough — we plan deep cleaning quadrant by quadrant under local anaesthetic, and review the gums six weeks later to confirm they have responded.",
        ],
      },
      {
        heading: "A note on paan, chhaliya and gutka",
        body: [
          "Areca nut and tobacco products stain heavily, but staining is the least of the problem. They are a leading cause of oral submucous fibrosis and oral cancer in this region. Every scaling appointment here includes a soft-tissue check of the cheeks, tongue and floor of the mouth — it takes two minutes and it is the check that matters most.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does teeth scaling cost in Pakistan?",
        a: "Routine scaling and polishing is generally published between PKR 1,500 and PKR 7,000 depending on the clinic and how much deposit there is. Deep cleaning for established gum disease costs more because it is done in stages under anaesthetic.",
      },
      {
        q: "Does scaling loosen or damage teeth?",
        a: "No — this is the most common myth we hear. The scaler removes tartar, not tooth. Teeth can feel loose immediately afterwards only if the tartar had been splinting already-mobile teeth, which means the bone loss was there before the cleaning, not caused by it.",
      },
      {
        q: "How often should I have it done?",
        a: "Every six months for most people. Every three to four months if you smoke, use paan or chhaliya, have diabetes, or have already been treated for gum disease.",
      },
      {
        q: "Will it hurt?",
        a: "Routine scaling is not painful, though it can be sensitive if the gums are already inflamed. Deep cleaning below the gum line is done with local anaesthetic.",
      },
      {
        q: "Will my teeth be whiter afterwards?",
        a: "They will return to their natural shade once stain and tartar are removed, which for tea and paan users is a noticeable difference. Scaling does not bleach the tooth itself — that is whitening, a separate treatment.",
      },
    ],
    related: ["teeth-whitening-mirpur", "general-dentistry-mirpur", "dental-fillings-mirpur"],
  },

  {
    slug: "teeth-whitening-mirpur",
    name: "Teeth Whitening",
    urdu: "دانتوں کی سفیدی",
    h1: "Teeth Whitening in Mirpur, AJK",
    metaTitle: "Teeth Whitening in Mirpur AJK | The Dental Lounge",
    metaDescription:
      "Professional teeth whitening in Mirpur, Azad Kashmir. Safe, dentist-supervised bleaching for weddings and events. Book at Fazal Chowk. Call +92 345 308 1698.",
    short:
      "Dentist-supervised bleaching that lightens the tooth itself — several shades, without damaging enamel.",
    image: "whitening",
    duration: "60–90 minutes in clinic, or 10–14 nights at home",
    price: { low: 15000, high: 40000, note: PRICE_DISCLAIMER },
    intro: [
      "Whitening uses a peroxide gel to lighten the natural colour of the tooth from within. It is different from scaling, which removes surface stain and returns teeth to their own shade — whitening takes them lighter than that baseline.",
      "It is the most requested treatment before weddings, and it is also the treatment most often done badly. Shop-bought kits, charcoal powders and unsupervised salon bleaching either do nothing or strip enamel and burn gums. Done under supervision, with the gums properly isolated and the right gel concentration, whitening is safe and predictable.",
    ],
    sections: [
      {
        heading: "Two ways to do it",
        list: [
          "In-clinic whitening — a single 60–90 minute appointment, gums isolated, strongest results the same day. Best when there is an event coming up.",
          "Custom home whitening — impressions are taken, trays are made to fit your teeth exactly, and you wear them with gel for 10 to 14 nights. Slower, gentler on sensitivity, and the trays can be topped up for years.",
          "Combination — an in-clinic session followed by home trays for maintenance, which holds the result longest.",
        ],
      },
      {
        heading: "Before you whiten",
        body: [
          "Teeth must be cleaned first: bleaching over tartar gives a patchy result. Any decay or leaking fillings must be treated, because gel reaching the inside of a tooth causes real pain.",
          "One thing to understand before you start: crowns, veneers and white fillings do not whiten. If you have a white filling in a front tooth, it will stay the shade it is while the natural tooth around it lightens, and may need replacing afterwards to match. We point this out beforehand, not after.",
        ],
      },
      {
        heading: "Making it last",
        list: [
          "Avoid tea, coffee, cola and coloured curries for the first 48 hours while the enamel is most absorbent",
          "Stopping or cutting down paan, chhaliya and smoking makes more difference than any product",
          "Use a straw for cold drinks that stain",
          "Expect to top up once a year with home trays",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does teeth whitening cost in Pakistan?",
        a: "In-clinic professional whitening is generally published between PKR 15,000 and PKR 40,000. Custom home-tray kits are usually less. We confirm the price at your consultation.",
      },
      {
        q: "Is whitening safe for enamel?",
        a: "Dentist-supervised whitening at correct concentrations does not damage enamel. What does damage it is abrasive charcoal and baking-soda scrubbing, and unregulated high-concentration gel applied without gum protection.",
      },
      {
        q: "How long do the results last?",
        a: "Typically one to two years, but it depends entirely on habits. Heavy tea, paan or smoking will pull the shade back within months.",
      },
      {
        q: "Will it make my teeth sensitive?",
        a: "Temporary sensitivity to cold for a day or two is common and settles on its own. We use desensitising gel and can slow the process down if you already have sensitive teeth.",
      },
      {
        q: "Can I whiten before my wedding?",
        a: "Yes, and it is one of the most common reasons people book. Come in three to four weeks before the date so there is time to clean first, whiten, and let any sensitivity settle — not the week of the event.",
      },
    ],
    related: ["teeth-cleaning-and-scaling-mirpur", "cosmetic-dentistry-mirpur", "dental-fillings-mirpur"],
  },

  {
    slug: "dental-fillings-mirpur",
    name: "Dental Fillings",
    urdu: "دانت کی فلنگ / کیڑا لگا دانت",
    h1: "Dental Fillings in Mirpur, AJK",
    metaTitle: "Dental Fillings in Mirpur AJK | The Dental Lounge",
    metaDescription:
      "Tooth-coloured composite fillings in Mirpur, Azad Kashmir. Treat cavities before they reach the nerve. Same-day appointments. Call +92 345 308 1698.",
    short:
      "Tooth-coloured composite that removes decay and rebuilds the tooth before it needs a root canal.",
    image: "fillings",
    duration: "20–40 minutes per tooth",
    intro: [
      "A filling removes decayed tooth structure and replaces it with a material that seals the tooth and restores its shape. Caught early, it is a short, straightforward appointment.",
      "The reason we push people to come early is arithmetic. A small cavity is one visit and a modest fee. The same cavity left for a year becomes a root canal and a crown — several visits and many times the cost. Nothing about a cavity gets better on its own.",
    ],
    sections: [
      {
        heading: "Materials",
        list: [
          "Composite — tooth-coloured resin bonded to the tooth. Our default for almost every case; invisible and conserves more of the natural tooth.",
          "Glass ionomer — releases fluoride, useful for children's teeth and near the gum line",
          "Inlays and onlays — laboratory-made restorations for cavities too large for a direct filling but not large enough to need a full crown",
        ],
      },
      {
        heading: "How to know you have a cavity",
        body: [
          "Often you cannot — decay is painless until it reaches the nerve, which is exactly why check-ups exist. When symptoms do appear, they are usually sensitivity to sweet or cold, food consistently packing between two teeth, a rough edge your tongue keeps finding, or a visible dark spot or hole.",
          "By the time a tooth aches on its own, decay has usually reached the nerve and a filling alone will no longer solve it.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does a filling last?",
        a: "A well-placed composite filling in a well-maintained mouth lasts five to ten years or more. Fillings in heavy grinders, or in patients with a high-sugar diet, wear out faster.",
      },
      {
        q: "Will the filling be visible?",
        a: "No. Composite is shade-matched to your tooth. We use tooth-coloured material even on back teeth as standard.",
      },
      {
        q: "Does it hurt?",
        a: "Small fillings are often done without anaesthetic. Anything deeper is numbed first, and you feel pressure but not pain.",
      },
      {
        q: "My tooth is sensitive after the filling — is that normal?",
        a: "Mild sensitivity to cold for a week or two after a deep filling is normal as the nerve settles. Sensitivity that worsens, or pain on biting that persists beyond two weeks, should be checked — come back and we will look at it.",
      },
    ],
    related: ["root-canal-treatment-mirpur", "general-dentistry-mirpur", "dental-crowns-and-bridges-mirpur"],
  },

  {
    slug: "tooth-extraction-mirpur",
    name: "Tooth Extraction",
    urdu: "دانت نکلوانا / عقل داڑھ",
    h1: "Tooth Extraction & Wisdom Teeth in Mirpur, AJK",
    metaTitle: "Tooth & Wisdom Tooth Extraction in Mirpur AJK",
    metaDescription:
      "Safe, painless tooth and wisdom tooth extraction in Mirpur, Azad Kashmir. Emergency same-day appointments, open until 9pm. Call +92 345 308 1698.",
    short:
      "Painless removal when a tooth cannot be saved, including impacted wisdom teeth, with clear aftercare.",
    image: "extraction",
    duration: "15–45 minutes depending on complexity",
    intro: [
      "Extraction is the last option, not the first. Before removing any tooth we will tell you whether it can realistically be saved and what that would involve, so the decision is yours and it is informed.",
      "Sometimes removal is genuinely the right answer: a tooth broken below the gum, one with severe bone loss, a wisdom tooth that keeps getting infected, or a tooth being removed to make space for orthodontic treatment.",
    ],
    sections: [
      {
        heading: "Wisdom teeth",
        body: [
          "Wisdom teeth cause trouble when there is not enough room for them. Partially erupted ones trap food and bacteria under a flap of gum, which leads to recurring painful infections, and they can decay the healthy molar in front of them.",
          "Not every wisdom tooth needs removing. One that is fully through, cleanable and not causing problems can be left alone. We take an X-ray, look at the root position and its relationship to the nerve, and give you a straight recommendation.",
        ],
      },
      {
        heading: "Aftercare — this part matters",
        list: [
          "Bite firmly on the gauze for 30–45 minutes and do not keep checking it",
          "No rinsing, spitting or straws for 24 hours — this is what dislodges the clot and causes dry socket",
          "No smoking for at least 48 hours; smokers get dry socket several times more often",
          "Soft, cool food for the first day; chew on the other side",
          "From day two, warm salt-water rinses after meals",
          "Some swelling on days two and three is normal. Swelling that increases after day three, with fever or a bad taste, means you should come back.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does extraction hurt?",
        a: "Not during the procedure — the area is fully numb and you feel firm pressure rather than pain. Afterwards, mild discomfort for two to three days is normal and responds to ordinary painkillers.",
      },
      {
        q: "Can I have a tooth out while fasting in Ramadan?",
        a: "Yes. Local anaesthetic does not break the fast, but many patients prefer an appointment after Iftar so that they can take painkillers and eat normally afterwards. We keep evening slots for exactly this and stay open until 9pm.",
      },
      {
        q: "What is dry socket?",
        a: "It is when the blood clot in the socket is lost, exposing bone — a severe ache starting three to four days after the extraction, often with a bad taste. It is treatable in one visit, and it is largely preventable by not smoking, rinsing or using straws for the first 24 hours.",
      },
      {
        q: "Should I replace the tooth afterwards?",
        a: "For back teeth, usually yes — the gap causes drifting and over-eruption over time. For wisdom teeth, no; nothing needs to fill that space.",
      },
      {
        q: "Do you take emergency cases?",
        a: "Yes. We are open 10am to 9pm seven days a week at Fazal Chowk, and we keep slots for acute pain and swelling. Call ahead so we know you are coming.",
      },
    ],
    related: ["dental-implants-mirpur", "root-canal-treatment-mirpur", "dentures-mirpur"],
  },

  {
    slug: "dental-crowns-and-bridges-mirpur",
    name: "Crowns & Bridges",
    urdu: "دانت کا کیپ / برج",
    h1: "Dental Crowns & Bridges in Mirpur, AJK",
    metaTitle: "Dental Crowns & Bridges in Mirpur AJK | Tooth Caps",
    metaDescription:
      "Zirconia and porcelain crowns, bridges and caps in Mirpur, Azad Kashmir. Rebuild broken or root-treated teeth. Call +92 345 308 1698.",
    short:
      "Caps that rebuild broken or root-treated teeth, and bridges that fill a gap using the teeth either side.",
    image: "prosthesis",
    duration: "Two visits, usually 7–10 days apart",
    intro: [
      "A crown — what most patients call a cap — covers a tooth completely, restoring its shape and protecting what remains. A bridge uses the teeth either side of a gap to carry a replacement tooth between them.",
      "The most common reason we fit crowns is to protect root-treated back teeth. A molar that has had a root canal has lost its blood supply and its internal structure; without a crown it fractures, often beyond saving, and the root canal you paid for is wasted.",
    ],
    sections: [
      {
        heading: "When you need a crown",
        list: [
          "After a root canal on a back tooth — this is not optional if you want the tooth to last",
          "A tooth broken or cracked beyond what a filling can hold",
          "A tooth with a very large old filling and little natural structure left",
          "A badly discoloured or misshapen front tooth, for appearance",
          "On top of a dental implant",
        ],
      },
      {
        heading: "Materials",
        list: [
          "Zirconia — very strong and tooth-coloured; our usual recommendation for back teeth",
          "Porcelain-fused-to-metal — strong and long-established, though a dark line can show at the gum over time",
          "All-ceramic — the most natural-looking, best for front teeth",
          "Metal — rarely requested now, but the most durable option of all for a back tooth",
        ],
      },
      {
        heading: "Bridge or implant?",
        body: [
          "A bridge is faster and cheaper, and it does not need surgery — but it means cutting down the two healthy teeth either side of the gap to carry it. An implant costs more and takes months, but leaves the neighbouring teeth untouched and preserves the bone.",
          "If the teeth either side already need crowns, a bridge often makes sense. If they are healthy and untouched, an implant is usually the better long-term decision. We will lay out both for your specific gap.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does a crown last?",
        a: "Ten to fifteen years is typical, and often considerably longer. What usually fails is not the crown but new decay at its margin, which is why cleaning around the edge matters.",
      },
      {
        q: "How many visits does it take?",
        a: "Two. The tooth is prepared and an impression taken at the first, and a temporary crown fitted. The permanent crown is cemented at the second, usually a week to ten days later.",
      },
      {
        q: "Can it be done before I fly back to the UK?",
        a: "Yes, if you allow around two weeks between the two appointments. Tell us your departure date at the first visit and we will schedule the fit before you travel.",
      },
      {
        q: "Will it match my other teeth?",
        a: "Shade is matched against your natural teeth at the preparation appointment. For front teeth we check the shade in daylight and can send the crown back to the lab if it is not right.",
      },
    ],
    related: ["root-canal-treatment-mirpur", "dental-implants-mirpur", "dentures-mirpur"],
  },

  {
    slug: "dentures-mirpur",
    name: "Dentures",
    urdu: "مصنوعی بتیسی / ڈینچر",
    h1: "Dentures in Mirpur, AJK",
    metaTitle: "Dentures in Mirpur AJK | Full & Partial False Teeth",
    metaDescription:
      "Full and partial dentures in Mirpur, Azad Kashmir — comfortable, natural-looking, properly fitted. Repairs and relines too. Call +92 345 308 1698.",
    short:
      "Full and partial removable dentures, fitted properly so they stay put and let you eat comfortably.",
    image: "prosthesis",
    duration: "4–5 appointments over 3–6 weeks",
    intro: [
      "Dentures replace missing teeth and restore the shape of the face and the ability to chew. A partial denture fills gaps where some natural teeth remain; a complete denture replaces a full arch.",
      "The difference between a denture that is worn every day and one that lives in a drawer is entirely in the fitting. That means proper impressions, a recorded bite, and a try-in stage where you see and approve the teeth before they are finished. Skipping stages to save a visit is why so many dentures end up unworn.",
    ],
    sections: [
      {
        heading: "Types",
        list: [
          "Complete dentures — for a full upper or lower arch with no remaining teeth",
          "Partial dentures — acrylic or cobalt-chrome, clipping onto the remaining natural teeth",
          "Immediate dentures — fitted the same day teeth are removed, so you are never without teeth",
          "Implant-retained overdentures — clip onto two or more implants; transformative for lower dentures, which are the ones that never stay in place",
        ],
      },
      {
        heading: "Getting used to them",
        body: [
          "The first two weeks are an adjustment. Expect increased saliva, some difficulty with certain sounds, and sore spots where the denture presses. Sore spots are normal and are fixed in a two-minute adjustment appointment — do not suffer through them, and do not adjust the denture yourself.",
          "Start with soft food cut small, chew on both sides at once to keep the denture stable, and practise reading aloud to get speech back to normal quickly.",
        ],
      },
      {
        heading: "Care",
        list: [
          "Clean over a basin of water so a drop does not crack it",
          "Brush daily with soap and a denture brush, not toothpaste — toothpaste is abrasive and scratches acrylic",
          "Leave them out overnight in water to let the gums recover",
          "Come for a check yearly: gums shrink over time and dentures need relining, usually every few years",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does it take to get dentures?",
        a: "Four to five appointments over three to six weeks. Immediate dentures can be fitted on the day of extraction but will need relining once the gums have healed.",
      },
      {
        q: "Will people be able to tell?",
        a: "A well-made denture is not obvious. At the try-in stage you see the teeth in wax and can ask for changes to shade, shape and position before it is finished.",
      },
      {
        q: "My lower denture will not stay in — can that be fixed?",
        a: "Often yes. Lower complete dentures are the hardest to stabilise because there is far less ridge to hold them. Two implants with clips transform the situation, and it is the single most worthwhile upgrade for anyone struggling with a lower denture.",
      },
      {
        q: "Do you repair broken dentures?",
        a: "Yes, and usually quickly. Bring in all the pieces and do not try to glue them yourself — household glue is toxic and makes a proper repair much harder.",
      },
    ],
    related: ["dental-implants-mirpur", "dental-crowns-and-bridges-mirpur", "tooth-extraction-mirpur"],
  },

  {
    slug: "cosmetic-dentistry-mirpur",
    name: "Cosmetic Dentistry",
    urdu: "دانتوں کی خوبصورتی",
    h1: "Cosmetic Dentistry & Veneers in Mirpur, AJK",
    metaTitle: "Veneers & Cosmetic Dentistry in Mirpur AJK",
    metaDescription:
      "Veneers, bonding and smile makeovers in Mirpur, Azad Kashmir. Wedding smile preparation with a clear plan and honest advice. Call +92 345 308 1698.",
    short:
      "Veneers, bonding and full smile design — planned properly, with honest advice about what is worth doing.",
    image: "cosmetic",
    duration: "Single visit for bonding; 2–3 visits for veneers",
    intro: [
      "Cosmetic dentistry covers everything that improves how a smile looks: closing gaps, reshaping chipped or uneven edges, correcting discoloured teeth and rebuilding worn ones.",
      "Our starting position on cosmetic work is conservative, and we would rather say so upfront. There is a widespread trend of cutting down healthy front teeth for veneers when whitening, bonding or a few months of aligners would have achieved the same result without removing enamel that never grows back. We will always show you the least destructive option that gets you there.",
    ],
    sections: [
      {
        heading: "What we offer",
        list: [
          "Composite bonding — reshaping chips, closing small gaps and correcting edges in one visit, with little or no drilling",
          "Porcelain veneers — thin facings for teeth that are badly discoloured, worn or misshapen",
          "Smile design — planning the whole front set together, so shape, shade and proportion work as one",
          "Gum contouring — for a smile where too much gum shows",
          "Whitening and alignment first, as the foundation for everything else",
        ],
      },
      {
        heading: "How we plan a smile makeover",
        body: [
          "Photographs and a discussion first: what specifically bothers you, and what you want it to look like. Vague briefs produce disappointing results, so we get specific.",
          "Health comes before appearance. Active decay, gum disease and a collapsing bite are treated first — cosmetic work built on an unhealthy foundation fails quickly.",
          "We then sequence the treatment in the order that removes the least tooth structure: align, then whiten, then bond or veneer only what still needs it. You approve the plan and the cost before any drilling.",
        ],
      },
      {
        heading: "Weddings",
        body: [
          "If it is for a wedding, come three to six months ahead, not three weeks. A full makeover cannot be rushed safely, and the last thing anyone wants is a temporary veneer debonding two days before the event. If you have left it late, tell us the date and we will do what is genuinely achievable in the time rather than overpromise.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long do veneers last?",
        a: "Porcelain veneers typically last ten to fifteen years with good care. Composite bonding lasts around five, but is cheaper, reversible and easy to repair.",
      },
      {
        q: "Do veneers ruin your teeth?",
        a: "Porcelain veneers require removing a thin layer of enamel, which is irreversible — the tooth will always need a veneer or crown afterwards. That is precisely why we recommend them only when whitening, bonding or alignment cannot achieve the result.",
      },
      {
        q: "What is the difference between bonding and veneers?",
        a: "Bonding is composite applied directly to the tooth in one visit, with little or no drilling. Veneers are made in a laboratory from porcelain, need enamel removed, and take two to three visits — but they resist staining better and last longer.",
      },
      {
        q: "Can you fix a single chipped front tooth?",
        a: "Usually in one appointment with composite bonding, shade-matched to the neighbouring teeth.",
      },
    ],
    related: ["teeth-whitening-mirpur", "braces-and-orthodontics-mirpur", "dental-crowns-and-bridges-mirpur"],
  },

  {
    slug: "general-dentistry-mirpur",
    name: "General Dentistry & Check-ups",
    urdu: "دانتوں کا معائنہ",
    h1: "General Dentistry & Check-ups in Mirpur, AJK",
    metaTitle: "Dental Check-up in Mirpur AJK | Family Dentist",
    metaDescription:
      "Routine dental check-ups, X-rays and preventive care for the whole family in Mirpur, Azad Kashmir. Open 10am–9pm, seven days. Call +92 345 308 1698.",
    short:
      "Routine examinations, X-rays, oral cancer screening and preventive care for adults and children.",
    image: "general",
    duration: "20–30 minutes",
    price: { low: 500, high: 3000, note: PRICE_DISCLAIMER },
    intro: [
      "A check-up is the cheapest appointment in dentistry and the one that prevents every expensive one that follows. In twenty minutes we examine every tooth, check the gums, screen the soft tissues, and take X-rays where they are needed to see between and beneath the teeth.",
      "Most dental problems are silent until they are serious. Decay between two back teeth is invisible and painless until it reaches the nerve. Gum disease destroys bone without hurting at all. Both are straightforward to treat when found early, and both are expensive once they are not.",
    ],
    sections: [
      {
        heading: "What a check-up includes",
        list: [
          "Examination of every tooth for decay, cracks and failing fillings",
          "Gum assessment — bleeding, pocket depth and recession",
          "Soft-tissue and oral cancer screening of the cheeks, tongue, palate and floor of the mouth",
          "Bite and jaw joint check, including signs of grinding",
          "X-rays where clinically indicated, to see what the eye cannot",
          "A written plan with costs, in priority order — what is urgent, what can wait",
        ],
      },
      {
        heading: "Children",
        body: [
          "Bring children from the age of one, or as soon as the first teeth appear. The point of an early visit is not treatment; it is that the child gets used to the chair while nothing hurts. A child whose first ever dental visit happens because of toothache learns to associate dentistry with pain, and that anxiety follows into adulthood.",
          "We also apply fluoride varnish and fissure sealants, which are quick, painless, and substantially reduce decay in the back teeth where it usually starts.",
        ],
      },
      {
        heading: "Oral cancer screening",
        body: [
          "Paan, chhaliya, gutka, naswar and tobacco use are widespread across Azad Kashmir and Punjab, and oral cancer rates in Pakistan are among the highest in the world. Screening takes two minutes and is part of every examination here. Any ulcer that has not healed in three weeks, any white or red patch, or any restricted mouth opening should be looked at without waiting for a routine appointment.",
        ],
      },
    ],
    faqs: [
      {
        q: "How often should I have a check-up?",
        a: "Every six months for most adults. Every three to four months if you smoke, use paan or chhaliya, have diabetes, or are being treated for gum disease.",
      },
      {
        q: "How much is a consultation in Mirpur?",
        a: "Dentist consultation fees across Mirpur are generally published between PKR 500 and PKR 3,000. Call us for our current fee — we will tell you before you come in, not after.",
      },
      {
        q: "I have not been to a dentist in years and I am embarrassed.",
        a: "We hear this constantly and it changes nothing about how you will be treated. Nobody here will lecture you. We will look, tell you plainly what we find, and sort it out in an order that suits your budget.",
      },
      {
        q: "Do you see children?",
        a: "Yes, from the first tooth onwards, including fluoride varnish and sealants.",
      },
      {
        q: "Do I need X-rays every time?",
        a: "No. X-rays are taken when there is a clinical reason — typically every 12 to 24 months for adults with a low decay rate, more often if there is active disease.",
      },
    ],
    related: ["teeth-cleaning-and-scaling-mirpur", "dental-fillings-mirpur", "root-canal-treatment-mirpur"],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

export const serviceNames = SERVICES.map((s) => s.name);

/** Used for the LocalBusiness hasOfferCatalog node. */
export const offerCatalog = SERVICES.map((s) => ({
  name: s.name,
  description: s.short,
  url: `/services/${s.slug}`,
  areaServed: CITY_QUALIFIED,
}));
