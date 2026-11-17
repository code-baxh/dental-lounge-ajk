import { ImageResponse } from "next/og";
import { getGuide } from "@/lib/guides";
import { BUSINESS, PRACTITIONER } from "@/lib/site";

/**
 * One card per guide, carrying its own title. It is the guide's Article
 * `image` in structured data (lib/schema.ts) and its og:image, so a guide
 * shared to WhatsApp — the share button sits at the foot of every guide —
 * previews as that guide rather than the generic clinic card.
 *
 * Same palette and layout as app/opengraph-image.tsx. No dynamic functions,
 * so it is generated with the page's static params rather than per request.
 */
export const alt = "Dental health guide from The Dental Lounge, Mirpur AJK";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function GuideImage({ params }: { params: { slug: string } }) {
  const guide = getGuide(params.slug);
  const title = guide?.title ?? "Dental health guides";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, #3b2a1f 0%, #56402f 55%, #6b503c 100%)",
        padding: "72px 80px",
        fontFamily: "Georgia, serif",
        color: "#faf7f4",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#d9c4b2",
            marginBottom: 28,
          }}
        >
          Dental health guide
        </div>
        <div
          style={{
            display: "flex",
            // Titles run to ~65 characters; the longer ones drop to 60px so
            // they still fit in three lines.
            fontSize: title.length > 48 ? 60 : 72,
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: "2px solid rgba(250, 247, 244, 0.25)",
          paddingTop: 28,
          fontSize: 26,
          color: "#e3d3c5",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#faf7f4" }}>
            {BUSINESS.name}, Mirpur AJK
          </div>
          <div style={{ display: "flex" }}>Reviewed by {PRACTITIONER.name}</div>
        </div>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#faf7f4" }}>
          {BUSINESS.phoneIntlDisplay}
        </div>
      </div>
    </div>,
    size,
  );
}
