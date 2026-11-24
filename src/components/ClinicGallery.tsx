import Image, { type StaticImageData } from "next/image";
import treatmentRoom from "@/assets/clinic-treatment-room.jpg";
import drJalalAtWork from "@/assets/clinic-dr-jalal-at-work.jpg";
import xrayRoom from "@/assets/clinic-xray-room.jpg";
import cabinetsLighting from "@/assets/clinic-cabinets-lighting.jpg";
import roomFromDoor from "@/assets/clinic-room-from-door.jpg";

const PLACE = "at The Dental Lounge, Fazal Chowk, New Mirpur City";

const PHOTOS: { src: StaticImageData; caption: string; alt: string }[] = [
  { src: treatmentRoom, caption: "The treatment room", alt: `The treatment room ${PLACE}` },
  {
    // The patient's face is lightly softened: see lib/service-images.ts.
    src: drJalalAtWork,
    caption: "Dr. Jalal with a patient",
    alt: `Dr. Jalal Aslam treating a patient in the dental chair ${PLACE}`,
  },
  {
    src: xrayRoom,
    caption: "Digital X-rays, on screen",
    alt: `Digital X-ray on the laptop and wall screen in the treatment room ${PLACE}`,
  },
  {
    src: cabinetsLighting,
    caption: "Cabinets and autoclave",
    alt: `Instrument cabinets and autoclave ${PLACE}`,
  },
  {
    src: roomFromDoor,
    caption: "The room from the entrance",
    alt: `The treatment room seen from the entrance ${PLACE}`,
  },
];

/**
 * Real photographs of the clinic, shown together where several angles of the
 * same room are the point. "What does it look like inside?" is a common
 * question before a first visit, and people search "the dental lounge photos".
 * Server component; the images lazy-load below the fold.
 */
const ClinicGallery = () => (
  <section className="border-t border-border bg-background py-20" aria-labelledby="clinic-gallery">
    <div className="container mx-auto px-4">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="mb-3 inline-block text-sm font-medium uppercase tracking-wider text-primary">
          Inside the clinic
        </span>
        <h2
          id="clinic-gallery"
          className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl"
        >
          Where you will be treated
        </h2>
        <p className="text-lg text-muted-foreground">
          Inside the clinic at Sardar Plaza, Fazal Chowk, photographed in November 2026.
          Patients&rsquo; faces are blurred to protect their privacy.
        </p>
      </div>

      <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
        {PHOTOS.map((p, i) => (
          <li key={p.caption} className={i === 0 ? "col-span-2 md:row-span-2" : undefined}>
            <figure className="relative h-full overflow-hidden rounded-xl border border-border">
              <div
                className={`relative ${i === 0 ? "aspect-[4/3] md:aspect-auto md:h-full" : "aspect-[4/3]"}`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes={
                    i === 0
                      ? "(max-width: 768px) calc(100vw - 2rem), 512px"
                      : "(max-width: 768px) calc(50vw - 1.5rem), 256px"
                  }
                  className="object-cover"
                  placeholder="blur"
                />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-6 text-xs font-medium text-white md:text-sm">
                {p.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ClinicGallery;
