export type ProjectMetric = {
  label: string;
  value: string;
  context?: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  role: string;
  client?: string;
  industry?: string;
  tech: string[];
  tags: string[];
  metrics?: ProjectMetric[];
  coverImage: string;
  gallery?: ProjectImage[];
  problem?: string;
  approach?: string;
  solution?: string;
  impact?: string;
  links?: { demo?: string; repo?: string; pdf?: string };
  publishedAt?: string;
  featured?: boolean;
};

const data: Project[] = [
  {
    slug: "power-bi-sales-dashboard",
    title: "Sales Performance Dashboard",
    subtitle: "Power BI + DAX for executive insights",
    summary:
      "Interactive Power BI dashboard surfacing sales trends, cohort retention, and growth drivers.",
    role: "BI Engineer, Designer",
    client: "Confidential",
    industry: "Retail",
    tech: ["Power BI", "DAX", "Azure"],
    tags: ["BI", "Dashboard", "Data"],
    metrics: [
      { label: "Time-to-insight", value: "-40%" },
      { label: "Stakeholder NPS", value: "+30" },
    ],
    coverImage: "/images/projects/powerbi_1.jpg",
    gallery: [
      { src: "/images/projects/powerbi_1.jpg", alt: "Dashboard overview" },
      { src: "/images/projects/powerbi_2.jpg", alt: "Cohort analysis" },
    ],
    problem: "Leaders lacked a single source of truth for sales KPIs.",
    approach:
      "Modeled star schema, optimized DAX measures, and designed executive-friendly visuals.",
    solution:
      "Unified dashboard with drill-through, bookmarks, and role-based views.",
    impact: "Accelerated decision-making and improved revenue forecasting accuracy.",
    links: { pdf: "/case-studies/power-bi-sales-dashboard.pdf" },
    featured: true,
  },
  {
    slug: "nextjs-analytics-app",
    title: "Analytics Web App",
    subtitle: "Next.js + Framer Motion + Tailwind",
    summary:
      "A performant, animated analytics application with interactive charts and API integration.",
    role: "Full-stack Engineer",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    tags: ["Web", "Frontend", "Design"],
    metrics: [{ label: "Lighthouse", value: ">= 95" }],
    coverImage: "/images/projects/powerbi_2.jpg",
    problem: "Needed engaging, accessible data visuals for stakeholders.",
    approach: "Implemented SSG/ISR, lazy-loaded charts, and motion patterns.",
    solution: "Clear IA, responsive layout, and cohesive motion system.",
    impact: "Improved engagement and understanding of KPIs.",
    featured: true,
  },
];

export function getAllProjects(): Project[] {
  return data;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return data.find((p) => p.slug === slug);
}


