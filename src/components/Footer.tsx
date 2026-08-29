import { AnchorLink } from "@/components/ui/AnchorLink";
import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import { nav, site, whatsappHref } from "@/lib/site";

export function Footer() {
  const projects = getAllProjects();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="display-md text-foreground">{site.name}</p>
            <p className="mono-meta mt-3">{site.role}</p>
            <p className="prose-body mt-5 max-w-sm text-[0.9375rem]">
              {site.positioning}
            </p>
            <AnchorLink href="/#contact" className="btn btn-primary mt-7">
              Start a project
            </AnchorLink>
          </div>

          <nav className="lg:col-span-2" aria-label="Footer">
            <p className="eyebrow">Site</p>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <AnchorLink
                    href={item.href}
                    className="text-sm text-neutral transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </AnchorLink>
                </li>
              ))}
              <li>
                <AnchorLink
                  href="/#contact"
                  className="text-sm text-neutral transition-colors hover:text-foreground"
                >
                  Contact
                </AnchorLink>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className="eyebrow">Case studies</p>
            <ul className="mt-5 space-y-3">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/work/${project.slug}`}
                    className="text-sm text-neutral transition-colors hover:text-foreground"
                  >
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow">Elsewhere</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-neutral transition-colors hover:text-foreground"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral transition-colors hover:text-foreground"
                >
                  WhatsApp · {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral transition-colors hover:text-foreground"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral transition-colors hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={site.cvPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral transition-colors hover:text-foreground"
                >
                  Download CV
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono-meta">
            © {new Date().getFullYear()} {site.name} · {site.location}
          </p>
          <p className="mono-meta">
            Every figure on this site is on the CV and can be checked.
          </p>
        </div>
      </div>
    </footer>
  );
}
