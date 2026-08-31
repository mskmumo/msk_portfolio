import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { getFeaturedProjects, type Project } from "@/lib/projects";

/**
 * A list, not a carousel. A carousel hides three quarters of the proof behind
 * a control nobody clicks — for a portfolio the whole point is that the work
 * is visible without interaction.
 */
export function SelectedWork() {
  // Featured only. Seven rows makes the homepage a scroll; the full set lives
  // on /work, which the header action links to.
  const projects = getFeaturedProjects();

  return (
    <Section
      id="work"
      eyebrow="01 — Selected work"
      title="Systems people actually use"
      lede="Live client sites, a healthcare marketplace and the BI system a university HR office runs on. Each one states what I owned — where something is a prototype or a team build, it says so."
      action={
        <Link href="/work" className="btn btn-secondary">
          All seven case studies
        </Link>
      }
    >
      <div className="flex flex-col">
        {projects.map((project, i) => (
          <WorkRow key={project.slug} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}

function WorkRow({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;

  return (
    <Reveal
      as="article"
      className="group border-t border-border py-10 first:border-t-0 first:pt-0 sm:py-14"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <Link
          href={`/work/${project.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className={`lg:col-span-5 ${flipped ? "lg:order-2" : ""}`}
        >
          <ProjectCover
            project={project}
            priority={index === 0}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-[16/11] rounded-lg border border-border"
          />
        </Link>

        <div className={`lg:col-span-7 ${flipped ? "lg:order-1" : ""}`}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="mono-meta tabular">
              {String(index + 1).padStart(2, "0")}
            </span>
            <StatusTag status={project.status} />
            <span className="mono-meta">{project.period}</span>
          </div>

          <h3 className="display-md mt-4 text-foreground balance">
            <Link
              href={`/work/${project.slug}`}
              className="link-underline after:bottom-0"
            >
              {project.title}
            </Link>
          </h3>

          <p className="mt-3 max-w-xl text-[1.0625rem] leading-relaxed text-neutral pretty">
            {project.tagline}
          </p>

          {project.client && (
            <p className="mono-meta mt-4">{project.client}</p>
          )}

          <dl className="mt-7 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
            {project.outcomes.map((outcome) => (
              <div
                key={outcome.label}
                className="flex flex-col-reverse gap-1 bg-background px-4 py-3.5"
              >
                <dt className="text-[0.8125rem] leading-snug text-neutral">
                  {outcome.label}
                </dt>
                <dd className="font-mono text-sm font-medium text-primary tabular">
                  {outcome.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {project.stack.slice(0, 5).map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Read the case study
              <svg
                className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.2,0.6,0.2,1)] group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>

            {/* Anything with a running URL gets a direct route to it — a
                reader who can click through and check the claims is worth
                more than one who takes the write-up on trust. */}
            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-opacity hover:opacity-70"
              >
                Visit the live site
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 3h7v7M13 3 6.5 9.5M11 9.5V13H3V5h3.5" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function StatusTag({ status }: { status: Project["status"] }) {
  return (
    <span className={status === "Production" ? "tag tag-accent" : "tag"}>
      {status}
    </span>
  );
}
