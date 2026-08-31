import { AnchorLink } from "@/components/ui/AnchorLink";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { StatusTag } from "@/components/SelectedWork";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import {
  getAdjacentProjects,
  getAllProjects,
  getProjectBySlug,
} from "@/lib/projects";
import { JsonLd, breadcrumbJsonLd, caseStudyJsonLd, site } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Case study not found" };

  const description = project.summary;

  return {
    title: project.title,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} · ${site.name}`,
      description,
      url: `${site.url}/work/${project.slug}`,
      images: project.coverImage ? [project.coverImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} · ${site.name}`,
      description,
    },
  };
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(slug);

  return (
    <>
      <JsonLd
        data={[
          caseStudyJsonLd({
            name: project.title,
            description: project.summary,
            path: `/work/${project.slug}`,
            image: project.coverImage,
            keywords: project.stack,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Case studies", path: "/work" },
            { name: project.title, path: `/work/${project.slug}` },
          ]),
        ]}
      />

      {/* --- Header ---------------------------------------------------- */}
      <section className="pb-14 pt-14 sm:pt-20">
        <div className="container-page">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mono-meta">
              <Link href="/" className="link-underline">
                Home
              </Link>
              <span className="px-2">/</span>
              <Link href="/work" className="link-underline">
                Case studies
              </Link>
            </nav>

            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2">
              <StatusTag status={project.status} />
              <span className="mono-meta">{project.period}</span>
              {project.discipline.map((d) => (
                <span key={d} className="mono-meta">
                  · {d}
                </span>
              ))}
            </div>

            <h1 className="display-xl mt-5 max-w-4xl text-foreground balance">
              {project.title}
            </h1>
            <p className="lede mt-6 max-w-2xl pretty">{project.tagline}</p>
          </Reveal>

          <Reveal delay={0.08} className="mt-12">
            <ProjectCover
              project={project}
              priority
              sizes="100vw"
              className="aspect-[16/9] rounded-xl border border-border"
            />
          </Reveal>

          {/* Fact strip — role and client stated up front, because "what did
              you actually do here" is the first question a reviewer has. */}
          <Reveal delay={0.12}>
            <dl className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              <Fact label="Role" value={project.role} />
              {project.client && <Fact label="Client" value={project.client} />}
              <Fact label="Period" value={project.period} />
              <Fact label="Stack" value={project.stack.join(", ")} />
            </dl>
          </Reveal>
        </div>
      </section>

      {/* --- Outcomes -------------------------------------------------- */}
      <section className="border-t border-border bg-surface-2 py-14 sm:py-16">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Outcome</p>
            <dl className="mt-7 grid gap-10 sm:grid-cols-3">
              {project.outcomes.map((outcome) => (
                <div
                  key={outcome.label}
                  className="flex flex-col-reverse gap-3"
                >
                  <dt className="text-[0.9375rem] leading-snug text-neutral">
                    {outcome.label}
                  </dt>
                  <dd className="font-display text-4xl leading-none text-primary tabular sm:text-5xl">
                    {outcome.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* --- Narrative ------------------------------------------------- */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <Reveal>
                <h2 className="eyebrow">The problem</h2>
                <p className="mt-5 font-display text-2xl leading-snug text-foreground balance sm:text-[1.75rem]">
                  {project.summary}
                </p>
                <p className="prose-body mt-6 pretty">{project.problem}</p>
              </Reveal>

              <Reveal className="mt-14">
                <h2 className="eyebrow">What I did</h2>
                <ol className="mt-6 border-t border-border">
                  {project.approach.map((step, i) => (
                    <li
                      key={step}
                      className="grid gap-3 border-b border-border py-6 sm:grid-cols-12 sm:gap-6"
                    >
                      <span className="mono-meta tabular sm:col-span-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[0.9375rem] leading-relaxed text-neutral sm:col-span-11 pretty">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal className="mt-14">
                <h2 className="eyebrow">The result</h2>
                <p className="prose-body mt-5 pretty">{project.result}</p>
              </Reveal>

              {project.caveat && (
                <Reveal className="mt-10">
                  <div className="panel-flat border-l-2 border-l-primary p-5 sm:p-6">
                    <p className="eyebrow">Worth being clear about</p>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-neutral pretty">
                      {project.caveat}
                    </p>
                  </div>
                </Reveal>
              )}
            </div>

            <aside className="lg:col-span-4">
              <Reveal delay={0.06} className="lg:sticky lg:top-28">
                <div className="panel p-6">
                  {/* A link to the running system is the strongest proof a
                      case study can carry — the reader can check every claim
                      above against the real thing. It goes first. */}
                  {project.links?.demo && (
                    <>
                      <p className="eyebrow">See it running</p>
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary mt-4 w-full"
                      >
                        Visit the live site
                        <svg
                          className="h-4 w-4"
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
                      <p className="mono-meta mt-3 break-all">
                        {project.links.demo.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                      </p>
                      <hr className="rule my-6" />
                    </>
                  )}

                  <p className="eyebrow">Built with</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li key={tech} className="tag">
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <hr className="rule my-6" />

                  <p className="text-[0.9375rem] leading-relaxed text-neutral">
                    Have a version of this problem? Tell me about it and I will
                    say whether it is worth building.
                  </p>
                  <AnchorLink href="/#contact" className="btn btn-primary mt-5 w-full">
                    Start a project
                  </AnchorLink>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      {/* --- Gallery --------------------------------------------------- */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="border-t border-border py-16 sm:py-20">
          <div className="container-page">
            <Reveal>
              <p className="eyebrow">From the build</p>
            </Reveal>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {project.gallery.map((shot, i) => (
                <Reveal key={shot.src} as="figure" delay={i * 0.06}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-surface-2">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(min-width: 640px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  {shot.caption && (
                    <figcaption className="mono-meta mt-3">
                      {shot.caption}
                    </figcaption>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- Prev / next ------------------------------------------------ */}
      <nav
        aria-label="More case studies"
        className="border-t border-border bg-surface-2"
      >
        <div className="container-page grid gap-px sm:grid-cols-2">
          {previous ? (
            <Link
              href={`/work/${previous.slug}`}
              className="group -mx-5 border-b border-border px-5 py-10 transition-colors hover:bg-background sm:mx-0 sm:border-b-0 sm:border-r sm:px-8"
            >
              <span className="mono-meta">← Previous</span>
              <span className="display-md mt-3 block text-foreground transition-colors group-hover:text-primary">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}

          {next && (
            <Link
              href={`/work/${next.slug}`}
              className="group -mx-5 px-5 py-10 text-right transition-colors hover:bg-background sm:mx-0 sm:px-8"
            >
              <span className="mono-meta">Next →</span>
              <span className="display-md mt-3 block text-foreground transition-colors group-hover:text-primary">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      </nav>

      <WhatsAppButton message={`Hi Mumo — I read the ${project.title} case study and would like to talk about something similar.`} />
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background p-5">
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-2.5 text-[0.9375rem] leading-snug text-foreground">
        {value}
      </dd>
    </div>
  );
}
