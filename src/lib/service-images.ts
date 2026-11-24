import type { StaticImageData } from "next/image";

import treatmentRoom from "@/assets/clinic-treatment-room.jpg";
import implantModel from "@/assets/clinic-implant-model.jpg";
import chairLightScreen from "@/assets/clinic-chair-light-screen.jpg";
import plasterModel from "@/assets/clinic-plaster-model.jpg";
import unitControls from "@/assets/clinic-unit-controls.jpg";
import chairGlassWall from "@/assets/clinic-chair-glass-wall.jpg";
import chairAndLight from "@/assets/clinic-chair-and-light.jpg";
import xrayRootCanal from "@/assets/clinic-xray-root-canal.jpg";
import rinsingUnit from "@/assets/clinic-rinsing-unit.jpg";
import roomFromDoor from "@/assets/clinic-room-from-door.jpg";
import bridgeOnModel from "@/assets/clinic-bridge-on-model.jpg";
import drJalalYoungPatient from "@/assets/clinic-dr-jalal-young-patient.jpg";

/**
 * Real photographs taken at the clinic (November 2026), a different one for
 * each treatment page, replacing AI-generated stock images
 * whose alt text had presented them as this clinic. In the X-ray photos the
 * patient's name, ID and image dates are blurred out. In the photos of
 * Dr. Jalal treating a patient, the patient's face is lightly softened; the
 * clinic has confirmed it is fine to show this patient.
 *
 * Static imports so next/image gets intrinsic width/height at build time,
 * which is what prevents layout shift.
 */
export const SERVICE_IMAGES: Record<string, StaticImageData> = {
  general: treatmentRoom,
  implants: implantModel,
  orthodontic: chairLightScreen,
  prosthesis: bridgeOnModel,
  cleaning: unitControls,
  whitening: chairGlassWall,
  fillings: chairAndLight,
  rootcanal: xrayRootCanal,
  extraction: rinsingUnit,
  cosmetic: roomFromDoor,
  dentures: plasterModel,
  children: drJalalYoungPatient,
};

/**
 * Where to centre the photo when a card crops it to a wide strip. Only set
 * where the default centre crop cuts the subject; everything else stays centred.
 */
export const IMAGE_POSITION: Record<string, string> = {
  implants: "50% 35%",
  // Keep the patient's bib in frame.
  children: "50% 100%",
};

const PLACE = "at The Dental Lounge, Fazal Chowk, New Mirpur City";

/**
 * Alt text describes what each photo actually shows. These are photos of the
 * room and equipment, not of the named treatment being carried out, so the
 * alt no longer claims "Root canal treatment at …" over a picture of a chair.
 */
const PHOTO_ALTS: Record<string, string> = {
  general: `The treatment room ${PLACE}`,
  implants: `Teaching model of the teeth and jaws showing dental implants ${PLACE}`,
  orthodontic: `Dental chair, operating light and wall screen ${PLACE}`,
  prosthesis: `A three-tooth bridge on a model of the teeth ${PLACE}`,
  cleaning: `Treatment unit controls and handpieces ${PLACE}`,
  whitening: `Dental chair beside the glass partition ${PLACE}`,
  fillings: `Dental chair and operating light ${PLACE}`,
  rootcanal: `X-ray of a root-filled tooth on the treatment room screen ${PLACE}`,
  extraction: `Dental chair and rinsing unit ${PLACE}`,
  cosmetic: `The treatment room seen from the entrance ${PLACE}`,
  dentures: `Plaster model of a lower jaw on the instrument tray ${PLACE}`,
  children: `Dr. Jalal Aslam examining a young patient's teeth ${PLACE}`,
};

/**
 * Short silent clips shown at the top of a treatment page in place of the
 * photo, keyed by service slug. Kept in public/videos (re-encoded for the web:
 * no audio track, 30fps, faststart) with a poster frame from the clip itself,
 * so nothing jumps when playback starts.
 */
export const SERVICE_VIDEOS: Record<
  string,
  { src: string; poster: string; width: number; height: number; label: string }
> = {
  "dental-crowns-and-bridges-mirpur": {
    src: "/videos/bridge-on-model.mp4",
    poster: "/videos/bridge-on-model.jpg",
    width: 848,
    height: 478,
    label: `Short video of a three-tooth bridge on a model of the teeth ${PLACE}`,
  },
};

export const imageAlt = (serviceName: string, imageKey?: string) =>
  (imageKey && PHOTO_ALTS[imageKey]) ||
  `${serviceName} at The Dental Lounge, Fazal Chowk, New Mirpur City, Azad Kashmir`;
