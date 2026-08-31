/**
 * Single source of truth for brand, positioning and contact details.
 *
 * Every claim in here is defensible against the CV. If a number is not in the
 * CV, it does not belong on the site — an inflated stat discounts the real ones.
 */

const fallbackUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const site = {
  url: fallbackUrl.replace(/\/$/, ""),
  name: "Mumo Mwangangi",
  shortName: "Mumo",
  /*
   * Title names both, Data Analyst first — that is the employed profession and
   * the term recruiters search. The site itself leads with the build work,
   * because its job is winning client projects.
   */
  role: "Data Analyst | Full-Stack Developer",
  location: "Nairobi, Kenya",
  locale: "en_KE",

  /** The one sentence the whole site has to earn. */
  positioning:
    "I build the systems businesses run on — and the analytics that explain them.",

  /** Supporting pitch, used under the H1 and in meta descriptions. */
  pitch:
    "Full-stack developer in Nairobi shipping production systems for Kenyan businesses — procurement, accounting, healthcare — in Next.js, Laravel and TypeScript, with M-Pesa where money changes hands. I work as a data analyst too, which is why the systems I build are designed to be reported on from day one.",

  metaDescription:
    "Mumo Mwangangi is a full-stack developer and data analyst in Nairobi, Kenya. Live client systems in procurement, accounting and healthcare built on Next.js and Laravel with M-Pesa integration, plus Power BI analytics including a board-level dashboard adopted by HR at Strathmore University.",

  email: "mskmumo@gmail.com",
  altEmail: "mumo.mwangangi@strathmore.edu",
  phone: "+254 110 018 735",
  /** E.164, no plus — wa.me format. */
  whatsapp: "254110018735",
  cvPath: "/MMwangangi_CV_1.pdf",

  socials: {
    linkedin: "https://www.linkedin.com/in/mumo-mwangangi-6750b027a",
    github: "https://github.com/mskmumo",
    x: "https://twitter.com/mumorealg",
    instagram: "https://instagram.com/mumorealg",
  },
} as const;

export const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#approach", label: "Approach" },
  { href: "/#about", label: "About" },
] as const;

/**
 * Credibility strip. Each of these traces to a line in the CV.
 * `note` is the audit trail — shown on the site so the number is checkable.
 */
export const proofPoints = [
  {
    value: "40%",
    label: "Manual reporting removed",
    note: "Board-level HR dashboard, Strathmore University",
  },
  {
    value: "7",
    label: "Production systems shipped",
    note: "BI, healthcare, procurement, finance, payments",
  },
  {
    value: "3",
    label: "Live client sites",
    note: "Procurement, accounting, healthcare — all public",
  },
  {
    value: "Distinction",
    label: "Diploma, Business IT",
    note: "Strathmore University, 2024",
  },
] as const;
// Kept to exactly four — the hero strip is a four-column grid, and a fifth
// item orphans a cell. "Building since 2023" was dropped rather than one of
// these: a start date is not an achievement, and "7 systems shipped" already
// carries the same information with more weight.

export type Offer = {
  id: string;
  name: string;
  promise: string;
  description: string;
  deliverables: string[];
  fitFor: string;
};

/**
 * Three offers, not six. A list of everything you can do reads as
 * "senior at nothing" — the shortlist is the positioning.
 */
export const offers: Offer[] = [
  {
    id: "systems",
    name: "Web systems & integrations",
    promise: "The operational system underneath the reporting.",
    description:
      "Full-stack applications in Next.js and Laravel for the workflows your organisation runs on — quotes, bookings, records, approvals — including M-Pesa payment integration and the APIs that connect to what you already use. Three of these are live and linked below.",
    deliverables: [
      "Application built front to back, Next.js or Laravel",
      "M-Pesa (Daraja) payment integration and reconciliation",
      "Role-based access for staff and clients",
      "REST APIs and third-party integrations",
      "Deployment, documentation and source handover",
    ],
    fitFor:
      "A process is running on WhatsApp, paper or a spreadsheet and needs to become a system.",
  },
  {
    id: "bi",
    name: "Decision dashboards",
    promise: "Power BI that a leadership team actually opens on Monday.",
    description:
      "I model your data properly, write the DAX behind the numbers, and design the report around the decisions you need to make — not around every column in the source.",
    deliverables: [
      "Data model built for the questions you ask",
      "DAX measures and calculated KPIs",
      "Executive report with drill-through",
      "Scheduled refresh from your live source",
      "Documentation and handover",
    ],
    fitFor:
      "You have data in spreadsheets or a database and no single view of what it is telling you.",
  },
  {
    id: "data",
    name: "Data foundations",
    promise: "Fix the data before you build reports on top of it.",
    description:
      "Database design, cleaning and integration across scattered sources. Most dashboard projects fail here first — so this is where I start when the numbers already disagree with each other.",
    deliverables: [
      "Database design, ERD and normalisation",
      "ETL and integration across sources",
      "Data cleaning and quality checks",
      "SQL views and reporting layer",
      "Warehouse structure for future reporting",
    ],
    fitFor:
      "Two reports give two different answers and nobody is sure which one is right.",
  },
];

/** How an engagement actually runs. Sets expectations, reduces buying risk. */
export const engagementProcess = [
  {
    step: "01",
    title: "Scope call",
    body: "We agree what decision the work has to support, who uses the output, and what counts as done. Free, and I will tell you if the project does not need me.",
  },
  {
    step: "02",
    title: "Data and requirements",
    body: "I go into the actual sources — the spreadsheets, the database, the exports — and confirm the numbers can support the questions before anything gets built.",
  },
  {
    step: "03",
    title: "Build in the open",
    body: "You see working versions as they land, not a reveal at the end. Feedback goes in while it is still cheap to change.",
  },
  {
    step: "04",
    title: "Handover and documentation",
    body: "You get the model, the source, the refresh setup and documentation written for whoever maintains it next — including if that is not me.",
  },
] as const;

/**
 * Grouped capabilities. Replaces self-scored percentage bars, which read as
 * junior and are not believable to a technical reviewer.
 */
export const capabilities = [
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript", "PHP", "Java", "SQL", "DAX"],
  },
  {
    group: "Frameworks & platforms",
    items: [
      "Next.js / React",
      "Laravel",
      "Tailwind CSS",
      "REST APIs",
      "Vercel",
      "Cloudflare Workers",
    ],
  },
  {
    group: "Data & BI",
    items: [
      "Power BI",
      "Power Query",
      "Data modelling",
      "PostgreSQL",
      "MySQL / InnoDB",
      "ETL & warehousing",
    ],
  },
  {
    group: "Delivery",
    items: [
      "M-Pesa Daraja",
      "Stakeholder requirements",
      "Agile & OOAD",
      "Technical documentation",
      "Git & GitHub",
      "Illustrator / Canva",
    ],
  },
] as const;

export const experience = [
  {
    role: "Full-Stack Developer — Independent Client Work",
    org: "Clients in Nairobi and remote",
    period: "2025 — Present",
    location: "Nairobi, Kenya",
    summary:
      "Design, build and ship production web systems for Kenyan businesses, front to back.",
    points: [
      "Delivered live sites for a national procurement and supply company and an ICPAK-registered accounting firm, each built solo from design through deployment",
      "Built DrugList, a medicine ordering and supply platform connecting patients, chemists, hospitals, suppliers and insurers across Kenyan healthcare",
      "Integrated M-Pesa Daraja payments, alongside insurance as a second payment path, with reconciliation against the originating order",
      "Modelled the relational schema and reporting layer behind each application",
      "Ran each engagement end to end: requirements, build, deployment and handover",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Laravel",
      "PostgreSQL",
      "M-Pesa Daraja",
      "Tailwind CSS",
    ],
  },
  {
    role: "Data Analytics Intern",
    org: "Strathmore University — Office of Faculty Affairs",
    period: "Jan 2025 — Present",
    location: "Nairobi, Kenya",
    summary:
      "Own the BI layer for the Staff Establishment System, working directly with HR on workforce planning.",
    points: [
      "Designed and deployed Power BI dashboards enabling HR to monitor staff-to-student ratios and compliance",
      "Built data models and automated KPIs in DAX to track staffing levels and recruitment needs",
      "Partnered with HR stakeholders to translate business requirements into BI solutions",
      "Cleaned and integrated multiple datasets to ensure accuracy and consistency",
      "Delivered insights that informed faculty-level workforce planning",
    ],
    stack: ["Power BI", "DAX", "Power Query", "SQL", "Excel"],
  },
  {
    role: "Software Developer — Projects & Academic Work",
    org: "Strathmore University",
    period: "2023 — Present",
    location: "Nairobi, Kenya",
    summary:
      "Build internal web applications and independent systems, mostly full-stack Laravel.",
    points: [
      "Designed and developed internal web applications supporting faculty workflows and student services",
      "Built full-stack systems in Laravel (PHP), with React/JavaScript for specific integrations",
      "Developed a rental management system integrating booking and M-Pesa payments",
      "Worked on a blockchain-based credential verification system for Kenyan institutions",
      "Contributed to a mobile application for a university conference as part of a team",
    ],
    stack: ["Laravel", "PHP", "MySQL", "JavaScript", "React", "M-Pesa API"],
  },
] as const;

export const education = [
  {
    award: "BSc Business Information Technology",
    org: "Strathmore University",
    period: "2024 — Present",
    detail: "Third year, evening programme",
  },
  {
    award: "Diploma in Business Information Technology",
    org: "Strathmore University",
    period: "2023 — 2024",
    detail: "Distinction",
  },
  {
    award: "Data Analytics Fundamentals Programme",
    org: "Certified, May 2024",
    period: "2024",
    detail: "Data mining, warehousing, EDA and visualisation",
  },
  {
    award: "Kenya Certificate of Secondary Education",
    org: "St Charles Lwanga School",
    period: "2019 — 2022",
    detail: "Mean grade B+ · Mathematics A",
  },
] as const;

/**
 * Real, checkable referees in place of invented testimonials.
 * Contact details are deliberately withheld — they belong to the referee,
 * not to this website.
 */
export const references = [
  {
    name: "David Irungu",
    title: "Instructional Specialist, Office of Faculty Affairs",
    org: "Strathmore University",
    relationship: "Supervised the Staff Establishment BI work",
  },
  {
    name: "Wallace Muchiri",
    title: "Lecturer",
    org: "Strathmore University",
    relationship: "Academic and project supervisor",
  },
] as const;

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "Kiswahili", level: "Fluent" },
  { name: "German", level: "Intermediate" },
] as const;

export function whatsappHref(message?: string) {
  const text = encodeURIComponent(
    message ?? `Hi Mumo — I found your portfolio and would like to talk about a project.`,
  );
  return `https://wa.me/${site.whatsapp}?text=${text}`;
}
