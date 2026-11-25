"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const subscribe = () => () => {};

/**
 * Light/dark toggle.
 *
 * Renders a fixed-size placeholder until mounted: `theme` is unknowable during
 * SSR, so rendering the real icon immediately causes a hydration mismatch, and
 * rendering nothing causes the header to shift when it appears.
 * useSyncExternalStore gives false on the server and during hydration, then
 * true, without the extra render a setState-in-effect costs.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  if (!mounted) {
    return (
      <div
        className={`h-11 w-11 shrink-0 ${className}`}
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      // Icon-only control, so it needs an explicit name and a 44px hit area.
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary ${className}`}
    >
      {isDark ? (
        <Sun className="h-[18px] w-[18px]" aria-hidden />
      ) : (
        <Moon className="h-[18px] w-[18px]" aria-hidden />
      )}
    </button>
  );
}
