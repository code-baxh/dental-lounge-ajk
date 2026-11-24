import { Star } from "lucide-react";
import { GOOGLE_REVIEWS } from "@/lib/site";

export function Stars({
  className = "h-4 w-4",
  rating = GOOGLE_REVIEWS.ratingValue,
}: {
  className?: string;
  rating?: number;
}) {
  const full = Math.floor(rating);
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
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
 * Compact inline badge — for headers, hero sections and sidebars. The rating
 * is attributed to Google and links to the source listing rather than being
 * restated as our own, which is both the honest presentation and the one
 * Google's review-snippet policy permits.
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
      <span className="text-muted-foreground">{GOOGLE_REVIEWS.reviewCount} Google reviews</span>
    </a>
  );
}
