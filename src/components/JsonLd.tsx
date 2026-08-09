/**
 * Renders a JSON-LD block. Server component — the markup is in the initial
 * HTML, which is what both Googlebot and non-JS AI crawlers need.
 */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped for the one character that can break
      // out of a script element.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
