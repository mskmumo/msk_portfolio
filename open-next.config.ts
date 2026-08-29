import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/*
 * Cloudflare Workers Builds runs `npm run build`, so that script has to be
 * the one that produces .open-next/ — otherwise the deploy step fails with
 * "Could not find compiled Open Next config".
 *
 * But OpenNext builds Next by shelling out to `npm run build` itself, so
 * pointing `build` at `opennextjs-cloudflare build` makes it recurse into
 * itself forever. `buildCommand` redirects that inner call at `build:next`,
 * which is the plain `next build`, breaking the loop.
 *
 * Everything else is default: every page here is static or SSG, and the only
 * dynamic route just calls the Resend HTTP API, so no incremental cache,
 * tag cache or revalidation queue is needed.
 */
const config = defineCloudflareConfig();

config.buildCommand = "npm run build:next";

export default config;
