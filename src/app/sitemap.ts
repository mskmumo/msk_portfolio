import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllProjects } from "@/lib/projects";

/**
 * Only routes that exist.
 *
 * The previous sitemap listed /about, /services and /contact, none of which
 * were real pages — a sitemap full of 404s costs crawl budget and trust.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...getAllProjects().map((project) => ({
      url: `${base}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
