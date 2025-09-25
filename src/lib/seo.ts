import type { Metadata } from "next";

export const site = {
  name: "Mumo Mwangangi",
  title: "Mumo Mwangangi — BI, Software, Design",
  description:
    "Portfolio showcasing Business Intelligence, software engineering, data storytelling, and design.",
  url: "https://example.com",
  locale: "en_US",
  creator: "@mumo",
  themeColorLight: "#ffffff",
  themeColorDark: "#0a0a0a",
};

export function defaultMetadata(): Metadata {
  return {
    title: {
      default: site.title,
      template: "%s | " + site.name,
    },
    description: site.description,
    metadataBase: new URL(site.url),
    openGraph: {
      type: "website",
      url: site.url,
      title: site.title,
      description: site.description,
      siteName: site.name,
      locale: site.locale,
    },
    twitter: {
      card: "summary_large_image",
      creator: site.creator,
      title: site.title,
      description: site.description,
    },
    icons: {
      icon: "/favicon.ico",
    },
    alternates: {
      canonical: site.url,
    },
    other: {
      "theme-color-light": site.themeColorLight,
      "theme-color-dark": site.themeColorDark,
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    sameAs: ["https://www.linkedin.com/", "https://github.com/"],
    jobTitle: "Business Intelligence Engineer",
  } as const;
}

export function projectJsonLd(input: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.name,
    description: input.description,
    url: input.url,
    image: input.image,
  } as const;
}


