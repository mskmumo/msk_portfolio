import type { Metadata } from "next";
import { site } from "@/lib/site";

export { site };

const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.role}`,
};

export function defaultMetadata(): Metadata {
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${site.role}`,
      template: `%s · ${site.name}`,
    },
    description: site.metaDescription,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    keywords: [
      "full stack developer Kenya",
      "React developer Nairobi",
      "Vue developer Kenya",
      "Node.js developer Kenya",
      "Python FastAPI developer",
      "payment integration developer Kenya",
      "Next.js developer Nairobi",
      "Laravel developer Nairobi",
      "web developer Nairobi",
      "M-Pesa integration developer",
      "Power BI developer Kenya",
      "business intelligence Nairobi",
      "data analyst Kenya",
      "DAX consultant",
      "dashboard developer Kenya",
      site.name,
    ],
    openGraph: {
      type: "website",
      url: site.url,
      siteName: site.name,
      title: `${site.name} — ${site.role}`,
      description: site.metaDescription,
      locale: site.locale,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${site.role}`,
      description: site.metaDescription,
      images: [ogImage.url],
    },
    // Renders <meta name="google-site-verification"> only once a token is set.
    ...(site.googleSiteVerification
      ? { verification: { google: site.googleSiteVerification } }
      : {}),
    alternates: { canonical: "/" },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    icons: { icon: "/favicon.ico" },
  };
}

/**
 * Person + the services offered. Google reads `knowsAbout` and `sameAs` for
 * entity understanding, which is what makes a name query resolve to you
 * rather than to a namesake.
 */
export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    // Variants people actually type. This is what binds a name query to the
    // domain — "mumorealg" is the handle he uses across every social profile.
    alternateName: ["Mumo", "mumorealg", "Mumo M. Mwangangi"],
    url: site.url,
    email: `mailto:${site.email}`,
    telephone: site.phone,
    jobTitle: site.role,
    description: site.pitch,
    image: `${site.url}/pic_3.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Strathmore University",
      url: "https://strathmore.edu",
    },
    worksFor: {
      "@type": "CollegeOrUniversity",
      name: "Strathmore University",
    },
    knowsAbout: [
      "Full-stack web development",
      "React",
      "Next.js",
      "Vue",
      "React Native",
      "TypeScript",
      "Node.js",
      "Express",
      "Laravel",
      "PHP",
      "Python",
      "FastAPI",
      "Java",
      "SQL",
      "PostgreSQL",
      "Payment integration",
      "M-Pesa integration",
      "Business Intelligence",
      "Power BI",
      "DAX",
      "Data modelling",
      "ETL",
      "Database design",
    ],
    knowsLanguage: ["en", "sw", "de"],
    // sameAs is the strongest signal that this site and those profiles are
    // the same person. Every profile listed must actually exist.
    sameAs: [
      site.socials.linkedin,
      site.socials.github,
      site.socials.x,
      site.socials.instagram,
    ],
  } as const;
}

export function professionalServiceJsonLd() {
  return {
    "@type": "ProfessionalService",
    "@id": `${site.url}/#service`,
    name: `${site.name} — Web Systems & Data Analytics`,
    url: site.url,
    description: site.pitch,
    provider: { "@id": `${site.url}/#person` },
    areaServed: [
      { "@type": "Country", name: "Kenya" },
      { "@type": "Place", name: "Remote, worldwide" },
    ],
    serviceType: [
      "Full-stack web application development",
      "React, Next.js and Vue development",
      "Node.js, Laravel and FastAPI backends",
      "Mobile application development",
      "Checkout and payment integration",
      "M-Pesa payment integration",
      "Power BI dashboard development",
      "Data modelling and ETL",
    ],
  } as const;
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.metaDescription,
    publisher: { "@id": `${site.url}/#person` },
    inLanguage: "en",
  } as const;
}

/**
 * One @graph rather than three loose blocks.
 *
 * Separate scripts leave Google to infer that the Person, the service and the
 * site are the same entity. A single graph with linked @ids states it, which
 * is what a name query needs in order to resolve to this domain.
 */
export function siteGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [personJsonLd(), professionalServiceJsonLd(), websiteJsonLd()],
  } as const;
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  } as const;
}

export function caseStudyJsonLd(input: {
  name: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.name,
    headline: input.name,
    description: input.description,
    url: `${site.url}${input.path}`,
    image: input.image ? `${site.url}${input.image}` : undefined,
    datePublished: input.datePublished,
    keywords: input.keywords?.join(", "),
    author: { "@id": `${site.url}/#person` },
    creator: { "@id": `${site.url}/#person` },
    inLanguage: "en",
  } as const;
}

/** Renders one or more JSON-LD blocks. */
export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Escaping "<" prevents a "</script>" inside any string value from
          // closing the tag early and injecting markup.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
