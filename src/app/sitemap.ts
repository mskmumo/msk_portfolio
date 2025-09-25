import { MetadataRoute } from "next";
import { site } from "@/lib/seo";
import { getAllProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const routes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/work`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/services`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
  ];
  const projects = getAllProjects();
  projects.forEach((p) => {
    routes.push({ url: `${base}/work/${p.slug}`, lastModified: new Date() });
  });
  return routes;
}


