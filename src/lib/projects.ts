/**
 * Case studies.
 *
 * Every project here is real and traceable to the CV. Role and status are
 * stated plainly — "prototype" and "team project" are labelled as such,
 * because being precise about what you owned is what makes the flagship
 * project credible.
 */

export type ProjectStatus = "Production" | "Prototype" | "Team project";

export type Outcome = {
  value: string;
  label: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  status: ProjectStatus;
  client?: string;
  period: string;
  role: string;
  discipline: string[];
  summary: string;
  /** Visual fallback when there is no screenshot to show. */
  motif: "bars" | "flow" | "chain" | "grid";
  coverImage?: string;
  gallery?: { src: string; alt: string; caption?: string }[];
  outcomes: Outcome[];
  problem: string;
  approach: string[];
  result: string;
  /** Shown verbatim — the honesty note that keeps the rest believable. */
  caveat?: string;
  stack: string[];
  links?: { demo?: string; repo?: string };
  featured: boolean;
};

const data: Project[] = [
  {
    slug: "staff-establishment-intelligence",
    title: "Staff Establishment Intelligence",
    tagline: "The board-level view of who staffs the university, and where the gaps are.",
    status: "Production",
    client: "Strathmore University — Office of Faculty Affairs",
    period: "Jan 2025 — Present",
    role: "BI developer — data model, DAX, report design, stakeholder requirements",
    discipline: ["Business Intelligence", "Data modelling"],
    summary:
      "A Power BI system that gives HR a single, reconciled view of staffing across faculties — headcount against establishment, staff-to-student ratios and compliance positions — replacing a reporting pack that was rebuilt by hand for every request.",
    motif: "bars",
    coverImage: "/images/projects/powerbi_1.jpg",
    gallery: [
      {
        src: "/images/projects/powerbi_1.jpg",
        alt: "Staff establishment dashboard overview",
        caption: "Executive view — establishment against actual headcount by faculty.",
      },
      {
        src: "/images/projects/powerbi_2.jpg",
        alt: "Staffing ratio and recruitment gap analysis",
        caption: "Drill-through: staff-to-student ratios and open recruitment positions.",
      },
    ],
    outcomes: [
      { value: "40%", label: "Manual reporting workload removed" },
      { value: "Adopted", label: "By HR as the board-level view" },
      { value: "1", label: "Reconciled headcount source" },
    ],
    problem:
      "The Office of Faculty Affairs had to answer questions about staffing levels, staff-to-student ratios and compliance across every faculty — but the underlying numbers lived in separate spreadsheets and system exports that did not agree with each other. Every leadership question meant rebuilding a report by hand, and every rebuild was a chance for two versions of the same figure to end up in the same room.",
    approach: [
      "Started with the decisions, not the data: sat with HR stakeholders to turn workforce-planning questions into a defined set of measures before modelling anything.",
      "Cleaned and integrated the source datasets so that headcount reconciles to the same number regardless of which report you open.",
      "Built the data model and wrote the DAX behind staffing levels, staff-to-student ratios and recruitment gaps.",
      "Designed the report for a board audience — the position first, the detail behind a drill-through, nothing on the front page that does not change a decision.",
      "Automated the KPIs so the pack refreshes on a schedule instead of being reassembled each cycle.",
    ],
    result:
      "The dashboard was adopted by HR as the board-level view of the staff establishment, and cut roughly 40% of the manual reporting workload. Faculty-level workforce planning now runs off it directly, and the recurring argument about whose headcount number was correct went away with the second source.",
    stack: ["Power BI", "DAX", "Power Query", "SQL", "Excel"],
    featured: true,
  },
  {
    slug: "rental-management-mpesa",
    title: "Rental Management & M-Pesa Payments",
    tagline: "Bookings and rent in one system, with every payment tied to a tenancy.",
    status: "Production",
    period: "2024",
    role: "Full-stack developer — data model, application, payment integration",
    discipline: ["Full-stack", "Payments"],
    summary:
      "A Laravel application that moves the landlord–tenant relationship off phone calls and WhatsApp: units and tenancies are records, bookings run through the system, and M-Pesa payments reconcile themselves against the tenancy they belong to.",
    motif: "flow",
    outcomes: [
      { value: "Booking → payment", label: "One continuous flow" },
      { value: "Per tenancy", label: "Every transaction reconciled" },
      { value: "M-Pesa", label: "Daraja STK push integrated" },
    ],
    problem:
      "Landlords and tenants were coordinating viewings, bookings and rent over calls and WhatsApp. Payments arrived as M-Pesa messages with no link to the unit or the tenant they were for, so reconciliation happened from memory and a scroll back through SMS — and disputes were resolved by whoever had kept better notes.",
    approach: [
      "Modelled the domain first — properties, units, tenancies, payments — so that a payment can never exist without the tenancy it settles.",
      "Built the application full-stack in Laravel with separate views for landlords and tenants, each seeing only what their role needs.",
      "Integrated M-Pesa through the Daraja API with STK push, so a tenant confirms payment on their handset and the system records the result.",
      "Wrote every transaction against its tenancy at the moment of confirmation, making the payment history per unit a query rather than a reconstruction.",
    ],
    result:
      "Bookings and payments run in a single system, and each transaction lands against the right tenancy without anyone matching SMS to spreadsheets. The payment history per unit became something a landlord can open rather than reassemble.",
    stack: ["Laravel", "PHP", "MySQL", "M-Pesa Daraja API", "JavaScript"],
    featured: true,
  },
  {
    slug: "blockchain-credential-verification",
    title: "Blockchain Credential Verification",
    tagline: "Checking a Kenyan academic credential without phoning the registry.",
    status: "Prototype",
    period: "2024 — 2025",
    role: "Systems designer and developer",
    discipline: ["Systems design", "Security"],
    summary:
      "A prototype for verifying academic credentials from Kenyan institutions: the issuer writes a tamper-evident record, and anyone holding a certificate can be checked against it without the verifier needing to reach the registry at all.",
    motif: "chain",
    outcomes: [
      { value: "Issue + verify", label: "Both flows working" },
      { value: "No registry call", label: "Verification is independent" },
      { value: "Tamper-evident", label: "Record cannot be edited quietly" },
    ],
    problem:
      "Verifying a Kenyan academic credential means contacting the issuing institution and waiting — sometimes weeks. Employers under time pressure skip the check, which is exactly what makes a forged certificate worth producing. The bottleneck is structural: verification depends on the availability of the one office that issued the document.",
    approach: [
      "Framed the problem as trust without a central gatekeeper: the verifier should not have to depend on the registry answering the phone.",
      "Designed an issuance flow where the institution writes a tamper-evident record of a credential at the point of award.",
      "Built the verification side so a holder's certificate can be checked against that record independently, by anyone, at any time.",
      "Documented the security model alongside the build — what the design protects against, and what it does not.",
    ],
    result:
      "A working prototype demonstrating both issuance and independent verification, with the trust model written down rather than assumed.",
    caveat:
      "A prototype, not a deployed system. It is here because the design problem — establishing trust without a central gatekeeper — is the part worth showing, and because the security model was reasoned through rather than hand-waved.",
    stack: ["Blockchain", "Web application", "Database design"],
    featured: true,
  },
  {
    slug: "university-conference-app",
    title: "University Conference App",
    tagline: "Programme, sessions and speakers in an attendee's pocket.",
    status: "Team project",
    client: "Strathmore University",
    period: "2024",
    role: "Contributing developer — functionality and user experience",
    discipline: ["Mobile", "Team delivery"],
    summary:
      "A mobile application built by a team for a university conference, giving attendees the programme, session details and speaker information on their phones instead of on a printed sheet.",
    motif: "grid",
    outcomes: [
      { value: "Shipped", label: "In use during the conference" },
      { value: "Team of peers", label: "Cross-functional delivery" },
    ],
    problem:
      "Conference attendees were navigating a multi-track programme from print, which goes out of date the moment a session moves and tells you nothing about the speaker you are about to hear.",
    approach: [
      "Worked within a team, taking the parts of the build covering app functionality and the attendee-facing experience.",
      "Focused on the flows an attendee actually repeats — find the next session, check the room, read who is speaking.",
      "Coordinated with the rest of the team on requirements and integration through delivery.",
    ],
    result:
      "The app shipped and was used through the conference.",
    caveat:
      "A team build. I contributed to functionality and user experience — I did not own the whole application, and it would be misleading to present it as mine.",
    stack: ["Mobile development", "JavaScript", "Team delivery"],
    featured: false,
  },
];

export function getAllProjects(): Project[] {
  return data;
}

export function getFeaturedProjects(): Project[] {
  return data.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return data.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const i = data.findIndex((p) => p.slug === slug);
  if (i === -1) return { previous: undefined, next: undefined };
  return {
    previous: i > 0 ? data[i - 1] : undefined,
    next: i < data.length - 1 ? data[i + 1] : undefined,
  };
}
