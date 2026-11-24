import { ArrowUpRight, Quote } from "lucide-react";
import { Stars } from "@/components/GoogleRating";
import { GOOGLE_REVIEWS, GOOGLE_REVIEW_QUOTES } from "@/lib/site";

const quotes = GOOGLE_REVIEW_QUOTES.filter((q) => q.featured);
const MOBILE_COUNT = 3;
const reviewsHref = GOOGLE_REVIEWS.writeUrl || GOOGLE_REVIEWS.readUrl;

/** Warm, distinct tints for the initials, cycled by position. */
const AVATAR_TINTS = [
  "bg-amber-100 text-amber-900 dark:bg-amber-400/20 dark:text-amber-200",
  "bg-rose-100 text-rose-900 dark:bg-rose-400/20 dark:text-rose-200",
  "bg-emerald-100 text-emerald-900 dark:bg-emerald-400/20 dark:text-emerald-200",
  "bg-sky-100 text-sky-900 dark:bg-sky-400/20 dark:text-sky-200",
  "bg-orange-100 text-orange-900 dark:bg-orange-400/20 dark:text-orange-200",
  "bg-violet-100 text-violet-900 dark:bg-violet-400/20 dark:text-violet-200",
];

/** "Areeba M." → "AM". */
const initials = (author: string) =>
  author
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .replace(/[^A-Za-z]/g, "")
    .slice(0, 2)
    .toUpperCase();

/**
 * The homepage's social proof: the Google rating and the patients' own words,
 * on the dark brand band so it stands apart from the light sections around it.
 * Quotes sit in a masonry layout (CSS columns), which suits reviews of very
 * different lengths better than a grid of equal boxes with gaps in them.
 * Phones show three reviews; wider screens all of them.
 *
 * Quotes are verbatim from the Google Business Profile (see lib/site.ts) and
 * the rating links to the listing, so every claim here can be checked.
 * Not marked up as Review or AggregateRating: see the note in lib/site.ts.
 * Server component, no JS.
 */
const HomeReviews = () => {
  if (quotes.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden bg-brand py-16 text-brand-foreground md:py-24"
      aria-labelledby="patient-reviews"
    >
      <Quote
        className="pointer-events-none absolute -right-10 -top-6 h-72 w-72 rotate-180 text-brand-foreground/[0.04] md:h-96 md:w-96"
        aria-hidden
      />

      <div className="container relative mx-auto grid gap-10 px-4 lg:grid-cols-[1fr_2fr] lg:grid-rows-[auto_1fr] lg:gap-x-14">
        <div className="lg:col-start-1 lg:row-start-1">
          <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-brand-foreground/70">
            From our Google reviews
          </span>
          <h2 id="patient-reviews" className="mb-6 font-display text-3xl font-bold md:text-4xl">
            What our patients say
          </h2>

          <a
            href={GOOGLE_REVIEWS.readUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 rounded-2xl border border-brand-foreground/15 bg-brand-foreground/5 px-5 py-4 transition-colors hover:bg-brand-foreground/10"
          >
            <span className="font-display text-5xl font-bold leading-none md:text-6xl">
              {GOOGLE_REVIEWS.ratingValue.toFixed(1)}
            </span>
            <span className="flex flex-col gap-1.5">
              <Stars className="h-5 w-5" />
              <span className="text-sm text-brand-foreground/75">
                from {GOOGLE_REVIEWS.reviewCount} reviews on Google
              </span>
            </span>
            <ArrowUpRight
              className="h-5 w-5 text-brand-foreground/60 transition-colors group-hover:text-brand-foreground"
              aria-hidden
            />
          </a>

          <p className="mt-6 max-w-sm leading-relaxed text-brand-foreground/75">
            Quoted word for word from reviews patients left on Google. Nothing here is written by
            us.
          </p>
        </div>

        <ul className="columns-1 gap-4 md:columns-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 [&>li]:mb-4 [&>li]:break-inside-avoid">
          {quotes.map((r, i) => (
            <li
              key={`${r.author}-${r.text.slice(0, 24)}`}
              className={i >= MOBILE_COUNT ? "hidden md:block" : undefined}
            >
              <figure className="relative rounded-2xl bg-card p-6 text-card-foreground shadow-lg shadow-black/10">
                <Quote
                  className="absolute right-5 top-5 h-8 w-8 rotate-180 text-primary/10"
                  aria-hidden
                />
                <Stars className="h-4 w-4" rating={r.rating} />
                <blockquote
                  className={`mt-3 leading-relaxed text-foreground ${i === 0 ? "text-lg" : ""}`}
                >
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                      AVATAR_TINTS[i % AVATAR_TINTS.length]
                    }`}
                    aria-hidden
                  >
                    {initials(r.author)}
                  </span>
                  <span className="min-w-0 text-sm leading-tight">
                    <span className="block font-semibold text-foreground">{r.author}</span>
                    <span className="text-muted-foreground">
                      Google review{r.when ? ` · ${r.when}` : ""}
                    </span>
                  </span>
                  {r.service ? (
                    <span className="ml-auto shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                      {r.service}
                    </span>
                  ) : null}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-start gap-4 lg:col-start-1 lg:row-start-2 lg:self-start">
          <a
            href={GOOGLE_REVIEWS.readUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-brand-foreground px-6 font-semibold text-brand transition-opacity hover:opacity-90 sm:w-auto"
          >
            Read all {GOOGLE_REVIEWS.reviewCount} reviews on Google
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
          <a
            href={reviewsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center text-sm font-medium text-brand-foreground/80 underline-offset-4 hover:text-brand-foreground hover:underline"
          >
            Been to the clinic? Leave a review
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeReviews;
