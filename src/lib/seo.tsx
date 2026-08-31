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
 * Person + the services offered. Google reads `knowsAbout` and `makesOffer`
 * for entity understanding, which is what makes a name query resolve to you
 * rather than to a namesake.
 */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
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
      "Next.js",
      "React",
      "TypeScript",
      "Laravel",
      "PHP",
      "Java",
      "SQL",
      "PostgreSQL",
      "M-Pesa integration",
      "Business Intelligence",
      "Power BI",
      "DAX",
      "Data modelling",
      "ETL",
      "Database design",
    ],
    knowsLanguage: ["en", "sw", "de"],
    sameAs: [site.socials.linkedin, site.socials.github, site.socials.x],
  } as const;
}

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#service`,
    name: `${site.name} — Business Intelligence & Web Systems`,
    url: site.url,
    description: site.pitch,
    provider: { "@id": `${site.url}/#person` },
    areaServed: [
      { "@type": "Country", name: "Kenya" },
      { "@type": "Place", name: "Remote, worldwide" },
    ],
    serviceType: [
      "Power BI dashboard development",
      "Data modelling and ETL",
      "Laravel web application development",
      "M-Pesa payment integration",
    ],
  } as const;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": `${site.url}/#person` },
    inLanguage: "en",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
