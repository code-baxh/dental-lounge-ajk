/** @type {import('next').NextConfig} */
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
