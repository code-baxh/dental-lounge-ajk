import { Star } from "lucide-react";
import { GOOGLE_REVIEWS } from "@/lib/site";

const reviewsHref = GOOGLE_REVIEWS.writeUrl || GOOGLE_REVIEWS.readUrl;

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  const full = Math.floor(GOOGLE_REVIEWS.ratingValue);
  return (
    <span
      className="inline-flex gap-0.5"
      role="img"
      aria-label={`${GOOGLE_REVIEWS.ratingValue} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${className} ${i < full ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
          aria-hidden
        />
      ))}
    </span>
  );
}

/**
 * Compact inline badge — for headers, hero sections and sidebars.
 */
export function GoogleRatingBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href={GOOGLE_REVIEWS.readUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-primary/30 ${className}`}
    >
      <span className="font-semibold text-foreground">{GOOGLE_REVIEWS.ratingValue.toFixed(1)}</span>
      <Stars className="h-3.5 w-3.5" />
      <span className="text-muted-foreground">
        {GOOGLE_REVIEWS.reviewCount} Google reviews
      </span>
    </a>
  );
}

/**
 * Full section. The rating is attributed to Google and links to the source
 * listing rather than being restated as our own — which is both the honest
 * presentation and the one Google's review-snippet policy permits.
 */
export default function GoogleRating() {
  return (
    <section className="border-y border-border bg-background py-14" aria-labelledby="google-rating">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
            Rated on Google
          </p>

          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="font-display text-5xl font-bold text-foreground">
              {GOOGLE_REVIEWS.ratingValue.toFixed(1)}
            </span>
            <Stars className="h-6 w-6" />
          </div>

          <h2 id="google-rating" className="mb-3 font-display text-2xl font-bold text-foreground">
            {GOOGLE_REVIEWS.ratingValue.toFixed(1)} out of 5, from{" "}
            {GOOGLE_REVIEWS.reviewCount} Google reviews
          </h2>

          <p className="mx-auto mb-6 max-w-xl leading-relaxed text-muted-foreground">
            Every one of these is a verified review left by a patient on our Google Business
            Profile — not a testimonial we wrote. Read them in full, or add your own, on Google.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={GOOGLE_REVIEWS.readUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Read all {GOOGLE_REVIEWS.reviewCount} reviews on Google
            </a>
            <a
              href={reviewsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border-2 border-primary px-6 py-3 font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Leave a review
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
