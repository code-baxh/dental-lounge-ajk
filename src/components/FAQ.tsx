import type { Faq } from "@/lib/services";

/**
 * Native <details>/<summary> rather than a JS accordion: the answers are in
 * the initial HTML with no client bundle, which is what AI crawlers and
 * Googlebot's text extraction actually read. Answer-first phrasing in the
 * content itself is what earns the snippet.
 */
export default function FAQ({
  faqs,
  heading = "Frequently asked questions",
  intro,
}: {
  faqs: Faq[];
  heading?: string;
  intro?: string;
}) {
  if (!faqs.length) return null;

  return (
    <section className="bg-secondary/30 py-20" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <h2
            id="faq-heading"
            className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl"
          >
            {heading}
          </h2>
          {intro && <p className="mb-10 text-muted-foreground">{intro}</p>}

          <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {faqs.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-6 font-display text-lg font-semibold text-foreground transition-colors hover:text-primary">
                  <h3 className="text-base font-semibold md:text-lg">{f.q}</h3>
                  <span
                    aria-hidden
                    className="mt-1 shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 leading-relaxed text-muted-foreground">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
