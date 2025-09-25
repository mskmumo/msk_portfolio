import { ProjectCard } from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";

export async function ProjectGrid() {
  const projects = getAllProjects();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </div>
  );
}


