"use client";

import { motion } from "framer-motion";

const education = [
  {
    degree: "Bachelor of Business Information Technology",
    institution: "Strathmore University",
    period: "2024 – Present",
    location: "Nairobi, Kenya",
    description: "Focused on business technology, data analytics, project management, networking, database systems, and information systems with emphasis on business intelligence solutions.",
    achievements: [
      "Designed and documented a full project charter covering scope, objectives, deliverables, and risks as part of the Project Management unit",
      "Developed a blockchain-based information system prototype for secure data management",
      "Created comprehensive data analytics projects using Power BI, including interactive dashboards and KPI tracking systems",
      "Applied advanced database concepts, including database security, optimization, and implementation of advanced features",
      "Built predictive models and statistical analysis reports for business decision-making",
      "Configured and managed networking solutions, including setup, troubleshooting, and performance optimization in simulated enterprise environments"
    ],
    coursework: [
      "Data Analytics & Visualization",
      "Business Intelligence",
      "Statistical Analysis",
      "Project Management",
      "Database Systems",
      "Software Engineering",
      "Information Systems",
      "Networking",
      "Power BI Development",
      "SQL & Data Mining"
    ]
  },
  {
    degree: "Diploma in Business Information Technology",
    institution: "Strathmore University",
    period: "2023 – 2024",
    location: "Nairobi, Kenya",
    description: "Comprehensive diploma program focused on programming, web development, data analysis, information systems, and business applications. Graduated with Distinction.",
    achievements: [
      "Graduated with Distinction",
      "Built foundational projects in web development and business applications",
      "Completed data analysis projects using Excel and basic statistical methods",
      "Developed strong practical skills in programming and database design",
      "Created business reports and presentations based on data insights"
    ],
    coursework: [
      "Programming Fundamentals",
      "Web Development",
      "Data Analysis Basics",
      "Information Systems",
      "Business Applications",
      "Database Design",
      "Excel Analytics",
      "Report Writing"
    ]
  },
  {
    degree: "Data Analytics Fundamentals Course",
    institution: "Online Certification Platform",
    period: "2024",
    location: "Remote",
    description: "Specialized course focused on data analytics fundamentals, statistical analysis, and data visualization techniques using modern tools and methodologies.",
    achievements: [
      "Completed comprehensive data analytics fundamentals program",
      "Gained hands-on experience with data cleaning and preprocessing techniques",
      "Applied statistical analysis methods to real-world datasets",
      "Created interactive data visualizations and dashboards",
      "Learned advanced Excel functions and Power Query for data manipulation"
    ],
    coursework: [
      "Data Analytics Fundamentals",
      "Statistical Analysis Methods",
      "Data Visualization Techniques",
      "Excel Advanced Analytics",
      "Power Query & Power Pivot",
      "Data Cleaning & Preprocessing",
      "Exploratory Data Analysis",
      "Dashboard Design Principles"
    ]
  }
];

const certifications = [
  {
    name: "IBM Analytics Certified",
    issuer: "IBM",
    date: "2023",
    credentialId: "Mumo Mwangangi"
  },
  {
    name: "Web Developer Certification",
    issuer: "Strathmore University",
    date: "2023",
    credentialId: "DIP2024"
  },
  {
    name: "Diploma in Business Information Technology",
    issuer: "Strathmore University",
    date: "2024",
    credentialId: "DIP2024"
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
