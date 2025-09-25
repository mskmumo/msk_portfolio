import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { projectJsonLd } from "@/lib/seo";

type Params = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} | Mumo Mwangangi`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const project = getProjectBySlug(params.slug);
  if (!project) return notFound();

  return (
    <article className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            projectJsonLd({
              name: project.title,
              description: project.summary,
              url: `https://example.com/work/${project.slug}`,
              image: project.coverImage,
            })
          ),
        }}
      />
      <header className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          {project.title}
        </h1>
        {project.subtitle ? (
          <p className="text-neutral-600 dark:text-neutral-300">{project.subtitle}</p>
        ) : null}
      </header>

      <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-black/10 dark:border-white/15">
        <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold">Role</h2>
            <p className="text-neutral-700 dark:text-neutral-300">{project.role}</p>
          </div>
          {project.tech?.length ? (
            <div>
              <h2 className="font-semibold">Tech</h2>
              <p className="text-neutral-700 dark:text-neutral-300">{project.tech.join(", ")}</p>
            </div>
          ) : null}
          {project.metrics?.length ? (
            <div>
              <h2 className="font-semibold">Metrics</h2>
              <ul className="text-neutral-700 dark:text-neutral-300 list-disc list-inside">
                {project.metrics.map((m) => (
                  <li key={m.label}>
                    <span className="font-medium">{m.label}:</span> {m.value}
                    {m.context ? ` (${m.context})` : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <div className="md:col-span-2 space-y-6">
          {project.problem ? (
            <div>
              <h2 className="font-semibold">Challenge</h2>
              <p className="text-neutral-700 dark:text-neutral-300">{project.problem}</p>
            </div>
          ) : null}
          {project.approach ? (
            <div>
              <h2 className="font-semibold">Approach</h2>
              <p className="text-neutral-700 dark:text-neutral-300">{project.approach}</p>
            </div>
          ) : null}
          {project.solution ? (
            <div>
              <h2 className="font-semibold">Solution</h2>
              <p className="text-neutral-700 dark:text-neutral-300">{project.solution}</p>
            </div>
          ) : null}
          {project.impact ? (
            <div>
              <h2 className="font-semibold">Impact</h2>
              <p className="text-neutral-700 dark:text-neutral-300">{project.impact}</p>
            </div>
          ) : null}
        </div>
      </section>

      {project.gallery?.length ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.gallery.map((img) => (
            <div key={img.src} className="relative aspect-video rounded-lg overflow-hidden border border-black/10 dark:border-white/15">
              <Image src={img.src} alt={img.alt} fill className="object-cover" />
            </div>
          ))}
        </section>
      ) : null}
    </article>
  );
}


