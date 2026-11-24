"use client";

import { useEffect, useRef } from "react";

/**
 * A short silent clip that plays like a moving photo: muted, looping, inline
 * on phones, with a poster frame so something shows before it loads.
 *
 * Visitors who ask their device to reduce motion get it paused, with the
 * player controls shown so they can still play it themselves.
 */
export default function LoopingVideo({
  src,
  poster,
  width,
  height,
  label,
  className,
}: {
  src: string;
  poster: string;
  width: number;
  height: number;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (reduce.matches) {
        video.pause();
        video.controls = true;
      } else {
        video.controls = false;
        video.play().catch(() => {
          /* Autoplay refused (e.g. data saver): the poster stays, which is fine. */
        });
      }
    };
    apply();
    reduce.addEventListener("change", apply);
    return () => reduce.removeEventListener("change", apply);
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      width={width}
      height={height}
      aria-label={label}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}
