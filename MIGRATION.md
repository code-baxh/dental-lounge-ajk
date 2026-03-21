# The Dental Lounge - Next.js Migration

## Overview

This project has been successfully migrated from **Vite + React Router** to **Next.js 14** with the App Router. This provides better SEO capabilities, server-side rendering, and improved performance.

## What Changed

### Framework & Build System
- ✅ Migrated from Vite to Next.js 14
- ✅ Replaced React Router with Next.js App Router
- ✅ Updated TypeScript configuration for Next.js

### Project Structure
```
OLD (Vite):                    NEW (Next.js):
src/pages/                     src/app/
src/main.tsx                   src/app/layout.tsx (removed)
src/App.tsx                    src/app/page.tsx
vite.config.ts                 next.config.mjs
vitest.config.ts              (tests use Jest)
```

### Key Features
- **App Router**: Uses file-based routing in `src/app/` directory
- **Server Components**: Better performance and SEO
- **Client Components**: Marked with `"use client"` where needed (animations, forms)
- **Metadata**: Configured at the root level with support for per-page metadata
- **Image Optimization**: Built-in Next.js image handling

### Routing
| Route | Type | File |
|-------|------|------|
| `/` | Home | `src/app/page.tsx` |
| `/about` | About Us | `src/app/about/page.tsx` |
| `/services` | Services | `src/app/services/page.tsx` |
| `/contact` | Contact | `src/app/contact/page.tsx` |

## Installation & Development

### Install Dependencies
```bash
npm install --legacy-peer-deps
```

### Run Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

## Component Updates

### Client Components (with "use client" directive)
- `Header.tsx` - Uses `usePathname()` from Next.js
- `Hero.tsx` - Uses Framer Motion animations
- `ServicesPreview.tsx` - Uses Framer Motion animations
- `WhyChooseUs.tsx` - Uses Framer Motion animations
- `Testimonials.tsx` - Uses Framer Motion animations
- `LocationCTA.tsx` - Uses Framer Motion animations
- `ContactForm.tsx` - Uses state management and form handling

### Server Components (default)
- Layout and page components

## Dependencies Removed
- `react-router-dom` - Replaced with Next.js routing
- `vite` - Replaced with Next.js
- `vitest` - Uses Jest instead
- `@vitejs/plugin-react-swc`
- `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`

## Dependencies Added
- `next@14.2.35` - Framework
- `eslint-config-next` - Linting

## Key Configuration Files

### next.config.mjs
```javascript
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};
```

### tsconfig.json
Configured for Next.js with:
- `jsx: "preserve"` (Next.js handles JSX)
- `paths` alias `@/*` pointing to `src/*`
- `incremental: true` for faster builds

### .eslintrc.json
```json
{
  "extends": ["next/core-web-vitals", "next/typescript"]
}
```

## SEO Improvements

With Next.js, we now have:
- ✅ Proper metadata configuration at root level
- ✅ Server-side rendering for better SEO
- ✅ Automatic sitemap generation support
- ✅ Better Open Graph image handling
- ✅ Canonical URLs built-in

### Adding Metadata for Individual Pages
Use the `Metadata` type from `next`:
```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description",
  alternates: {
    canonical: "https://thedentalloungemirpur.com.pk/page",
  },
};
```

Note: Only use `Metadata` in server components or as default exports from page files.

## Deployment

### Recommended Platforms
- **Vercel** (official Next.js hosting) - `npm run build` & `npm start`
- **Netlify** - Configure build command as `npm run build`
- **Docker** - See Dockerfile configuration below

### Environment Variables
Create a `.env.local` file for local development:
```
# Add any required environment variables here
```

## Testing
Tests can be configured using Jest:
```bash
npm test
# or
npm run test:watch
```

## Future Improvements

- [ ] Add Jest/React Testing Library for component testing
- [ ] Implement sitemap.xml generation
- [ ] Add robots.txt configuration
- [ ] Set up Google Search Console integration
- [ ] Add Analytics and Monitoring
- [ ] Implement image optimization with next/image
- [ ] Add API routes for form submission
- [ ] Set up CDN for static assets

## Notes

- React Router `<Link to="/path">` has been replaced with Next.js `<Link href="/path">`
- `useLocation()` has been replaced with `usePathname()` from `next/navigation`
- Images imported as static assets should use `.src` when passed to HTML img tags
- Use `next/image` Image component for optimized images
- CSS modules and Tailwind CSS work as expected

## Support

For Next.js documentation, visit: https://nextjs.org/docs

