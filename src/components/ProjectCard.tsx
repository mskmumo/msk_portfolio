"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
};

export function ProjectCard({ project }: Props) {
  return (
    <motion.article
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300"
    >
      <Link href={`/work/${project.slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(min-width: 1280px) 600px, 100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority={project.featured}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          {project.subtitle ? (
            <p className="text-sm text-neutral mt-2 line-clamp-2">{project.subtitle}</p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((t) => (
              <span 
                key={t} 
                className="text-xs rounded-full px-3 py-1 bg-primary/20 text-primary border border-primary/30 font-medium hover:bg-primary/30 transition-colors duration-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}


