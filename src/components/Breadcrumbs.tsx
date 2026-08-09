import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { name: string; path: string };

export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  // No header offset here: `body` already carries padding-top: 80px for the
  // fixed header (globals.css). A second offset stacked 112px of dead white
  // space under the header on every page that has breadcrumbs.
  return (
    <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-6 pb-2">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden />}
              {last ? (
                <span aria-current="page" className="text-foreground">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="transition-colors hover:text-primary">
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
