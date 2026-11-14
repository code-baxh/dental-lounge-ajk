import { Star, Quote } from "lucide-react";
import { GOOGLE_REVIEWS, GOOGLE_REVIEW_QUOTES, type GoogleReviewQuote } from "@/lib/site";

/**
 * Verbatim patient reviews from the Google Business Profile, each attributed to
 * Google and linked back to the listing so a visitor can check them.
 *
 * Homepage: the `featured` reviews. Service pages pass the reviews that name
 * their treatment, with `compact` for a smaller section. Renders nothing when
 * there are no quotes — no quotes is better than unverifiable ones.
 *
 * Server component — the previous version shipped framer-motion to the client
 * only to fade these cards in.
 */
type Props = {
  quotes?: GoogleReviewQuote[];
  heading?: string;
  id?: string;
  compact?: boolean;
};

const Testimonials = ({
  quotes = GOOGLE_REVIEW_QUOTES.filter((q) => q.featured),
  heading = "What Our Patients Say",
  id = "patient-reviews",
  compact = false,
}: Props) => {
  if (quotes.length === 0) return null;

  return (
    <section
      // Compact sits on service pages between the article and the tinted FAQ,
      // so it takes the page background with a rule instead of a third tint.
      className={`relative overflow-hidden ${
        compact ? "border-t border-border bg-background py-16" : "bg-secondary/30 py-24"
      }`}
      aria-labelledby={id}
    >
      <div className="container relative z-10 mx-auto px-4">
        <div className={`${compact ? "mb-10" : "mb-16"} text-center`}>
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-wider text-primary">
            From our Google reviews
          </span>
          <h2
            id={id}
            className={`mb-5 font-display font-bold text-foreground ${
              compact ? "text-2xl md:text-3xl" : "text-4xl md:text-5xl"
            }`}
          >
            {heading}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Quoted word for word from reviews patients left on Google.{" "}
            <a
              href={GOOGLE_REVIEWS.readUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Read all {GOOGLE_REVIEWS.reviewCount} on Google
            </a>
            .
          </p>
        </div>

        {/* A single review is centred rather than left in half a grid. */}
        <ul
          className={`mx-auto grid grid-cols-1 gap-6 ${
            quotes.length === 1 ? "max-w-2xl" : "max-w-5xl md:grid-cols-2"
          }`}
        >
          {quotes.map((r) => (
            <li key={`${r.author}-${r.text.slice(0, 24)}`}>
              <figure className="relative h-full rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/20 hover:shadow-xl">
                <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/10" aria-hidden />
                <div className="mb-4 flex gap-1" role="img" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < r.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
                      aria-hidden
                    />
                  ))}
                </div>
                <blockquote className="mb-6 leading-relaxed text-muted-foreground">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <figcaption>
                  <p className="font-display font-semibold text-foreground">{r.author}</p>
                  <p className="text-sm text-muted-foreground">
                    Google review{r.when ? ` · ${r.when}` : ""}
                    {r.service ? <span className="text-primary"> · {r.service}</span> : null}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Testimonials;
