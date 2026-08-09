import { ImageResponse } from "next/og";
import { BUSINESS } from "@/lib/site";

/**
 * Generated at build time, so the OG image can never 404 again — the previous
 * metadata pointed at /og-image.png, which was never added to public/. Every
 * WhatsApp and Facebook share of the clinic was rendering as a bare grey link,
 * and WhatsApp is the main referral channel here.
 */
// No edge runtime: that would make this render on demand. Prerendered at
// build time instead, so the image is a static file and costs nothing to serve.
export const alt = "The Dental Lounge — Dentist in Mirpur, AJK";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
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
            The Dental Lounge
          </div>
          <div style={{ display: "flex", fontSize: 86, fontWeight: 700, lineHeight: 1.05 }}>
            Dentist in Mirpur, AJK
          </div>
          <div style={{ display: "flex", fontSize: 36, color: "#e3d3c5", marginTop: 24 }}>
            Healthy Teeth, Better Smile
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
            <div style={{ display: "flex" }}>
              {BUSINESS.street}, {BUSINESS.locality}
            </div>
            <div style={{ display: "flex" }}>Open 10am – 9pm, seven days</div>
          </div>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 700, color: "#faf7f4" }}>
            {BUSINESS.phoneIntlDisplay}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
