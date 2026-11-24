import { BUSINESS } from "./site";

/**
 * Opening-hours helpers, all derived from BUSINESS.openingHours so the live
 * "Open now" status, the hours list and the schema can never disagree.
 */

const WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

type Hours = { opens: string; closes: string };

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** "21:00" → "9pm", "16:30" → "4:30pm". */
export const clock = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 || 12;
  return m ? `${h12}:${String(m).padStart(2, "0")}${suffix}` : `${h12}${suffix}`;
};

export const hoursOn = (day: string): Hours | null => {
  if (day === "Friday") return BUSINESS.openingHours.friday;
  return (BUSINESS.openingHours.days as readonly string[]).includes(day)
    ? BUSINESS.openingHours
    : null;
};

/** Rows for a visible hours list, e.g. ["Saturday to Thursday", "10am – 9pm"]. */
export const HOURS_ROWS: [string, string][] = [
  [
    "Saturday to Thursday",
    `${clock(BUSINESS.openingHours.opens)} – ${clock(BUSINESS.openingHours.closes)}`,
  ],
  [
    "Friday",
    `${clock(BUSINESS.openingHours.friday.opens)} – ${clock(BUSINESS.openingHours.friday.closes)}`,
  ],
];

/**
 * Whether the clinic is open at `now`, in clinic time (Pakistan, UTC+5, no
 * daylight saving), whatever time zone the visitor's phone is in.
 */
export function openStatus(now: Date): { open: boolean; text: string } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Karachi",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const part = (type: string) => parts.find((p) => p.type === type)?.value ?? "";

  const day = part("weekday");
  const minutes = Number(part("hour")) * 60 + Number(part("minute"));
  const today = hoursOn(day);

  if (today && minutes >= toMinutes(today.opens) && minutes < toMinutes(today.closes)) {
    return { open: true, text: `Open now · until ${clock(today.closes)}` };
  }
  if (today && minutes < toMinutes(today.opens)) {
    return { open: false, text: `Closed · opens ${clock(today.opens)} today` };
  }
  const index = WEEK.indexOf(day);
  for (let ahead = 1; ahead <= 7; ahead++) {
    const next = WEEK[(index + ahead) % 7];
    const hours = hoursOn(next);
    if (hours) {
      return {
        open: false,
        text: `Closed · opens ${clock(hours.opens)} ${ahead === 1 ? "tomorrow" : next}`,
      };
    }
  }
  return { open: false, text: "Closed" };
}
