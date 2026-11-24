/** @type {import('next').NextConfig} */
// Kept in sync with next.config.mjs. Next.js only loads one of these — .mjs
// wins when both exist — but a drifting duplicate is a trap for the next
// person, so both hold the same config.
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Earlier address of the cost guide. Google still shows it (Search Console,
  // Nov 2026) and it returned a 404, so it is sent to the current page.
  async redirects() {
    return [
      {
        source: "/guides/dental-treatment-cost-in-pakistan",
        destination: "/guides/dental-treatment-cost-in-pakistan-2026",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
