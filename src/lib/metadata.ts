import type { Metadata } from "next";
import { DEFAULT_SHARE_IMAGE, OPEN_GRAPH_BASE } from "./site";

/**
 * Title, description, canonical and matching share tags for a page.
 *
 * A page that sets no `openGraph` inherits the layout's, which is the
 * homepage's og:title and og:url, so a shared /services link previewed as the
 * homepage. One that sets its own replaces the layout's object whole (Next
 * merges metadata shallowly), image and site name included. This sets all of
 * it together. X needs nothing extra: Next fills the twitter: title,
 * description and image from these.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Full title; the layout's "| The Dental Lounge Mirpur" template is skipped. */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/about"; metadataBase makes it absolute. */
  path: string;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      ...OPEN_GRAPH_BASE,
      type: "website",
      title,
      description,
      url: path,
      images: [DEFAULT_SHARE_IMAGE],
    },
  };
}
