/** @type {import('next').NextConfig} */
// Kept in sync with next.config.mjs. Next.js only loads one of these — .mjs
// wins when both exist — but a drifting duplicate is a trap for the next
// person, so both hold the same config.
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
