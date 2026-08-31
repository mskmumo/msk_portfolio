import { AnchorLink } from "@/components/ui/AnchorLink";
import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { StatusTag } from "@/components/SelectedWork";
import { getAllProjects } from "@/lib/projects";
import { JsonLd, breadcrumbJsonLd, site } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Power BI, Laravel and M-Pesa work by Mumo Mwangangi — including the staff analytics dashboard adopted by HR at Strathmore University. What the problem was, what I built, and what changed.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: `Case studies · ${site.name}`,
    description:
      "Business intelligence and full-stack systems: the problem, the build, and the result.",
    url: `${site.url}/work`,
  },
};

export default function WorkIndex() {
  const projects = getAllProjects();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case studies", path: "/work" },
        ])}
      />

      <section className="border-b border-border pb-16 pt-14 sm:pb-20 sm:pt-20">
        <div className="container-page">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mono-meta">
              <Link href="/" className="link-underline">
                Home
              </Link>
              <span className="px-2">/</span>
              <span className="text-foreground">Case studies</span>
            </nav>
            <h1 className="display-xl mt-7 max-w-3xl text-foreground balance">
              The work, and what it changed
            </h1>
            <p className="lede mt-6 pretty">
              Seven systems built between 2023 and now, including three live client sites. Each one states what I
              owned — where something is a prototype or a team build, it is
              labelled as one.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal
                key={project.slug}
                as="article"
                delay={(i % 2) * 0.06}
                className="group"
              >
                <Link href={`/work/${project.slug}`} className="block">
                  <ProjectCover
                    project={project}
                    priority={i < 2}
                    sizes="(min-width: 640px) 45vw, 100vw"
                    className="aspect-[16/11] rounded-lg border border-border"
                  />

                  <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <StatusTag status={project.status} />
                    <span className="mono-meta">{project.period}</span>
                  </div>

                  <h2 className="display-md mt-3.5 text-foreground balance">
                    <span className="link-underline after:bottom-0">
                      {project.title}
                    </span>
                  </h2>

                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-neutral pretty">
                    {project.tagline}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-20 border-t border-border pt-10">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-lg text-[1.0625rem] leading-relaxed text-neutral pretty">
                If one of these looks like the problem you have, the next step is
                a short call about yours.
              </p>
              <AnchorLink href="/#contact" className="btn btn-primary shrink-0">
                Start a project
              </AnchorLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
