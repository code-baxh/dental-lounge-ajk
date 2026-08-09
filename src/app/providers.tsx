"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    /* ThemeProvider: follows the OS preference until the visitor picks a
       theme — most people never touch a toggle, so the default has to be
       right. disableTransitionOnChange kills the colour-transition flash
       when switching.

       MotionConfig reducedMotion="user": makes every framer-motion animation
       honour the OS "reduce motion" setting. Without it the site ran seven
       infinite loops (pulsing blobs, a 60s rotation, the scroll indicator)
       that could not be stopped — a real problem for vestibular disorders. */
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {children}
        </TooltipProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
