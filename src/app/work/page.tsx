import { ProjectGrid } from "@/components/ProjectGrid";

export const metadata = {
  title: "Work | Mumo Mwangangi",
  description: "Selected projects and case studies.",
};

export default async function WorkPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Work</h1>
        <p className="text-neutral-600 dark:text-neutral-300 mt-2">
          Selected projects and case studies across BI, web, and design.
        </p>
      </div>
      <ProjectGrid />
    </div>
  );
}


