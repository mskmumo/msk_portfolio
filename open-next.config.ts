import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/*
 * Default configuration is correct for this site: every page is static or
 * SSG, and the only dynamic route is /api/contact, which just calls the
 * Resend HTTP API. No incremental cache or queue is needed.
 */
export default defineCloudflareConfig();
