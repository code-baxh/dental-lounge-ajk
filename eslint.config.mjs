import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Next 16 removed `next lint` and ships its ESLint rules as a flat config only,
 * so this replaces the old .eslintrc.json (same two presets) and lint runs as
 * plain `eslint .`.
 */
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "next-env.d.ts",
    "playwright-report/**",
    "test-results/**",
    "screenshots/**",
    "seo-reports/**",
  ]),
]);
