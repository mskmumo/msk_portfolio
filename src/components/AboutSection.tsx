"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-background relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/5 via-transparent to-primary/5"></div>
      
      <div className="mx-auto max-w-6xl px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image and social */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="relative w-full max-w-sm mx-auto">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-primary/20 to-secondary/20 p-2">
                <div className="w-full h-full rounded-xl overflow-hidden bg-card-bg">
                  <Image
                    src="/pic_1.jpg"
                    alt="Mumo Mwangangi - Professional Profile"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Social links */}
            <div className="flex justify-center space-x-4">
              {[
                { name: "LinkedIn", href: "https://linkedin.com/in/mumo-mwangangi", icon: "💼" },
                { name: "GitHub", href: "https://github.com/mumorealg", icon: "💻" },
                { name: "Twitter", href: "https://twitter.com/mumorealg", icon: "🐦" },
                { name: "Email", href: "mailto:mumo@example.com", icon: "📧" },
              ].map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-xl transition-all duration-200 hover:scale-110"
                  onClick={() => trackEvent("social_click", { platform: social.name })}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
                I am Professional{" "}
                <span className="text-primary">Business Intelligence</span> Engineer
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 text-lg leading-relaxed mb-4">
                I design and develop services for customers specializing in creating stylish, modern 
                websites, web services and online stores. My passion is to design digital user experiences 
                that transform data into actionable insights.
              </p>
              <p className="text-neutral-600 dark:text-neutral-300 text-lg leading-relaxed">
                I design and develop services for customers specializing in creating stylish, modern 
                websites, web services and interactive dashboards that drive business growth.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="#projects" 
                className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={() => trackEvent("cta_click", { location: "about", label: "my_projects" })}
              >
                My Projects
              </Link>
                <Link 
                  href="/MMwangangi_CV_1.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-200"
                onClick={() => trackEvent("cta_click", { location: "about", label: "download_cv" })}
              >
                <span className="mr-2">📄</span>
                Download CV
              </Link>
            </div>

            {/* Skills tags */}
            <div className="pt-4">
              <h3 className="text-lg font-semibold text-foreground mb-3">Technologies I Work With</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Power BI",
                  "Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "Framer Motion",
                  "DAX",
                  "SQL",
                  "Python",
                  "React",
                  "Node.js",
                ].map((tech) => (
                  <motion.span 
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                    className="text-sm rounded-full px-4 py-2 bg-primary/10 text-primary border border-primary/20 font-medium hover:bg-primary/20 transition-colors duration-200"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


