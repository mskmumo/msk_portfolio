import { MetadataRoute } from "next";
import { site } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ""
    },
    sitemap: `${site.url.replace(/\/$/, "")}/sitemap.xml`,
  };
}


