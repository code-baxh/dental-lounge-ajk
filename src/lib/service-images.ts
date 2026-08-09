import type { StaticImageData } from "next/image";

import general from "@/assets/service-general.jpg";
import implants from "@/assets/service-implants.jpg";
import orthodontic from "@/assets/service-orthodontic.jpg";
import prosthesis from "@/assets/service-prosthesis.jpg";
import cleaning from "@/assets/service-cleaning.jpg";
import whitening from "@/assets/service-whitening.jpg";
import fillings from "@/assets/service-fillings.jpg";
import rootcanal from "@/assets/service-rootcanal.jpg";
import extraction from "@/assets/service-extraction.jpg";
import cosmetic from "@/assets/service-cosmetic.jpg";

/**
 * Static imports so next/image gets intrinsic width/height at build time —
 * which is what removes the layout shift these <img> tags were causing.
 */
export const SERVICE_IMAGES: Record<string, StaticImageData> = {
  general,
  implants,
  orthodontic,
  prosthesis,
  cleaning,
  whitening,
  fillings,
  rootcanal,
  extraction,
  cosmetic,
};

/**
 * Alt text is a free local-relevance slot, so it names the treatment, the
 * clinic and the location rather than just repeating the card title.
 */
export const imageAlt = (serviceName: string) =>
  `${serviceName} at The Dental Lounge, Fazal Chowk, New Mirpur City, Azad Kashmir`;
