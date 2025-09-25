"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Solutions Inc.",
    period: "2022 - Present",
    location: "Remote",
    description: "Leading development of scalable web applications using React, Next.js, and Node.js. Mentoring junior developers and architecting cloud-based solutions.",
    achievements: [
      "Increased application performance by 40% through optimization",
      "Led a team of 5 developers on multiple projects",
      "Implemented CI/CD pipelines reducing deployment time by 60%"
    ],
    technologies: ["React", "Next.js", "TypeScript", "AWS", "PostgreSQL"]
  },
  {
    title: "Frontend Developer",
    company: "Digital Agency Pro",
    period: "2020 - 2022",
    location: "Nairobi, Kenya",
    description: "Developed responsive web applications and collaborated with design teams to create exceptional user experiences.",
    achievements: [
      "Built 15+ responsive websites with 99% client satisfaction",
      "Reduced page load times by 50% through performance optimization",
      "Implemented modern design systems and component libraries"
    ],
    technologies: ["React", "JavaScript", "Tailwind CSS", "Figma", "Git"]
  },
  {
    title: "Junior Web Developer",
    company: "StartUp Hub",
    period: "2019 - 2020",
    location: "Nairobi, Kenya",
    description: "Started my professional journey building websites and learning modern web development practices.",
    achievements: [
      "Developed 10+ client websites from scratch",
      "Learned and implemented responsive design principles",
      "Collaborated with cross-functional teams"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "WordPress", "PHP"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

export function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24 bg-gradient-to-br from-background to-gray-900/20">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary mb-4">
            Work Experience
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            My professional journey and the impact I've made at various organizations.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary to-accent"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-3 h-3 bg-accent rounded-full border-2 border-background z-10"></div>

              {/* Content card */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-off-white/90 dark:bg-deep-blue/80 rounded-xl p-6 border border-soft-blue/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h3 className="text-lg font-semibold text-primary">
                      {exp.title}
                    </h3>
                    <span className="text-sm text-accent font-medium">
                      {exp.period}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted mb-3">
                    <span className="font-medium">{exp.company}</span>
                    <span className="mx-2">•</span>
                    <span>{exp.location}</span>
                  </div>

                  <p className="text-foreground mb-4 text-sm leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-primary mb-2">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="text-sm text-muted flex items-start">
                          <span className="text-accent mr-2 mt-1">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-sky-blue/20 text-deep-blue dark:bg-sky-blue/30 dark:text-off-white rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
