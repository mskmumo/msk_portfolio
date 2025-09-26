"use client";

import { motion } from "framer-motion";

const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Nairobi",
    period: "2016 - 2020",
    location: "Nairobi, Kenya",
    description: "Focused on software engineering, data structures, algorithms, and web development. Graduated with honors.",
    achievements: [
      "Graduated Magna Cum Laude (GPA: 3.8/4.0)",
      "President of Computer Science Society",
      "Winner of Annual Hackathon 2019"
    ],
    coursework: ["Data Structures", "Algorithms", "Database Systems", "Software Engineering", "Web Development", "Machine Learning"]
  },
  {
    degree: "Full Stack Web Development Bootcamp",
    institution: "FreeCodeCamp",
    period: "2018",
    location: "Online",
    description: "Intensive program covering modern web development technologies and best practices.",
    achievements: [
      "Completed 300+ hours of coursework",
      "Built 5 full-stack projects",
      "Earned all certifications"
    ],
    coursework: ["HTML/CSS", "JavaScript", "React", "Node.js", "MongoDB", "Git"]
  }
];

const certifications = [
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    credentialId: "AWS-CSA-2023-001"
  },
  {
    name: "Google Analytics Certified",
    issuer: "Google",
    date: "2022",
    credentialId: "GA-CERT-2022-456"
  },
  {
    name: "React Developer Certification",
    issuer: "Meta",
    date: "2021",
    credentialId: "META-REACT-2021-789"
  }
];

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
  visible: { opacity: 1, y: 0 }
};

export function Education() {
  return (
    <section id="education" className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Education & Certifications
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            My academic background and professional certifications that have shaped my expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Education Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-xl font-semibold text-primary mb-6">Education</h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="bg-card-bg rounded-xl p-6 border border-border backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-primary mb-1">
                        {edu.degree}
                      </h4>
                      <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-300">
                        <span className="font-medium">{edu.institution}</span>
                        <span className="mx-2">•</span>
                        <span>{edu.location}</span>
                      </div>
                    </div>
                    <span className="text-sm text-primary font-medium mt-2 sm:mt-0">
                      {edu.period}
                    </span>
                  </div>

                  <p className="text-foreground mb-4 text-sm leading-relaxed">
                    {edu.description}
                  </p>

                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-primary mb-2">Achievements:</h5>
                    <ul className="space-y-1">
                      {edu.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="text-sm text-neutral-600 dark:text-neutral-300 flex items-start">
                          <span className="text-primary mr-2 mt-1">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-primary mb-2">Key Coursework:</h5>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="text-xs px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full font-medium"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h3 className="text-xl font-semibold text-primary mb-6">Certifications</h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4 border border-border backdrop-blur-sm"
                >
                  <h4 className="font-semibold text-primary text-sm mb-2">
                    {cert.name}
                  </h4>
                  <div className="text-xs text-neutral-600 dark:text-neutral-300 space-y-1">
                    <div className="flex justify-between">
                      <span>Issuer:</span>
                      <span className="font-medium">{cert.issuer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span className="font-medium">{cert.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ID:</span>
                      <span className="font-mono text-xs">{cert.credentialId}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              variants={itemVariants}
              className="mt-6 p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-border"
            >
              <h4 className="font-semibold text-primary text-sm mb-2">
                Continuous Learning
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                I believe in lifelong learning and regularly update my skills through online courses, 
                workshops, and industry conferences to stay current with the latest technologies.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
