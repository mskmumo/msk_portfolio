"use client";

import { getAllProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";
import Link from "next/link";
import { motion } from "framer-motion";

export function FeaturedProjects() {
  const projects = getAllProjects().filter((p) => p.featured).slice(0, 3);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  return (
    <section id="projects" className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div 
          className="flex items-end justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Featured Projects
          </h2>
          <Link 
            href="/work" 
            className="text-sm text-primary hover:text-accent underline underline-offset-4 transition-colors duration-300 font-medium"
          >
            View all
          </Link>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((p, index) => (
            <motion.div
              key={p.slug}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
