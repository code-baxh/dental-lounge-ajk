import { ClipboardList, HeartHandshake, ShieldCheck, Zap } from "lucide-react";

/**
 * Specific, checkable statements only. The previous cards ("highest standards
 * of sterilization", "state-of-the-art dental technology", "flexible
 * appointment times") could have sat on any clinic's site, which is exactly
 * what makes copy read as templated or machine-written. Each point states
 * something the clinic does, sourced from elsewhere on the site (the about
 * page's hygiene and consultation commitments, the emergency FAQ, the root
 * canal page) or from a patient's own Google review.
 *
 * Server component. It used framer-motion to fade the cards in on scroll, which
 * left them invisible until the script had loaded; on a slow phone connection
 * that was a blank space where the reasons to choose the clinic should be.
 */
const POINTS = [
  {
    icon: HeartHandshake,
    title: "No pain, even for root canals",
    text: "We do not start until the tooth is fully numb. “I felt no pain, even after the anesthesia wore off,” one root canal patient wrote.",
  },
  {
    icon: ClipboardList,
    title: "Every option and cost explained first",
    text: "Before any treatment you are told what is wrong, what the options are, what each one costs, and what happens if you do nothing.",
  },
  {
    icon: ShieldCheck,
    title: "Sterilised for every patient",
    text: "Instruments are autoclaved between every patient, and single-use items are used wherever they are required.",
  },
  {
    icon: Zap,
    title: "Toothache? Seen the same day",
    text: "We keep slots free every day for pain, swelling and broken teeth. Call or WhatsApp so we know you are coming.",
  },
];

const WhyChooseUs = () => (
  <section
    className="border-t border-border bg-secondary/40 py-14 md:py-20"
    aria-labelledby="why-us"
  >
    <div className="container mx-auto px-4">
      <div className="mb-8 max-w-2xl md:mb-10">
        <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-primary">
          Why The Dental Lounge?
        </span>
        <h2
          id="why-us"
          className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl"
        >
          Why patients choose us
        </h2>
        <p className="text-muted-foreground md:text-lg">
          How we work, in four commitments you can hold us to.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {POINTS.map(({ icon: Icon, title, text }) => (
          <li
            key={title}
            className="flex gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-col md:p-6"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h3 className="mb-1.5 font-display text-lg font-semibold leading-snug text-foreground">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default WhyChooseUs;
