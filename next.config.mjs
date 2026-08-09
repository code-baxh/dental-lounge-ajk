/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // Was `unoptimized: true`, which shipped the original ~50KB JPEGs to every
    // device. @netlify/plugin-nextjs supports the Next image optimizer, so
    // these now serve as resized AVIF/WebP — a large win on mobile data, which
    // is how most of this audience browses.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
